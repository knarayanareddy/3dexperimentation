import React, { useState } from 'react';
import { Play, Sparkles, Zap, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { audioEngine } from '../engine/audioEngine';

interface Preset {
  id: string;
  name: string;
  description: string;
  state: string;
  questions: {
    [key: string]: {
      type: 'noul' | 'choice' | 'score';
      instructions?: string;
      criteria?: Record<string, string> | string[];
    };
  };
  mockJevResult: {
    latencyMs: number;
    inputTokens: number;
    costDollars: number;
    decisions: {
      department?: { value: string; probabilities: Record<string, number> };
      primary_tool?: { value: string; probabilities: Record<string, number> };
      attack_type?: { value: string; probabilities: Record<string, number> };
      [key: string]: any;
    };
  };
  mockLlmResult: {
    latencyMs: number;
    tokensGenerated: number;
    costDollars: number;
    outputRaw: string;
  };
}

const PRESETS: Preset[] = [
  {
    id: 'support',
    name: 'Customer Support Triage',
    description: 'Route angry customer tickets to the right team without human delay',
    state: 'Help! Our Stripe payouts have failed for 3 consecutive days. We are unable to withdraw vendor funds and losing merchant trust ASAP!',
    questions: {
      department: {
        type: 'choice',
        instructions: 'Which team should investigate first?',
        criteria: {
          billing: 'Duplicate charges, payouts, payment failures',
          technical: 'API bugs, 500 errors, integrations',
          sales: 'Pricing, contracts, tier upgrades'
        }
      },
      is_urgent_outage: {
        type: 'noul',
        instructions: 'Does this indicate a critical money-loss event?'
      },
      frustration_score: {
        type: 'score',
        instructions: 'Customer emotional anger level',
        criteria: ['Calm', 'Mild Concern', 'Frustrated', 'Furious', 'Threatening Legal']
      }
    },
    mockJevResult: {
      latencyMs: 74,
      inputTokens: 48,
      costDollars: 0.000042,
      decisions: {
        department: {
          value: 'billing',
          probabilities: { billing: 0.941, technical: 0.049, sales: 0.010 }
        },
        is_urgent_outage: {
          value: true,
          p: 0.984
        },
        frustration_score: {
          value: 'Furious',
          index: 3,
          confidence: 0.912
        }
      }
    },
    mockLlmResult: {
      latencyMs: 8840,
      tokensGenerated: 142,
      costDollars: 0.0185,
      outputRaw: '{\n  "analysis": "The customer is experiencing payout failures for 3 days which indicates a serious billing problem.",\n  "department": "billing",\n  "is_urgent_outage": true,\n  "frustration_score": 4\n}'
    }
  },
  {
    id: 'tools',
    name: 'AI Agent Tool Selector',
    description: 'Fast, deterministic routing inside agent loops without 8-second CoT',
    state: 'Calculate total enterprise tax on 45 licenses at $120/seat with 8.25% state tax and generate PDF receipt.',
    questions: {
      primary_tool: {
        type: 'choice',
        instructions: 'Select the optimal deterministic execution tool',
        criteria: {
          calc_math: 'Arithmetic, tax, formulas, numeric evaluation',
          file_system: 'Saving files, reading local disk, directory listings',
          web_search: 'Finding live internet information'
        }
      },
      requires_elevation: {
        type: 'noul',
        instructions: 'Does this operation require privileged security confirmation?'
      },
      complexity: {
        type: 'score',
        instructions: 'Execution dependency complexity',
        criteria: ['Trivial', 'Single Step', 'Multi-tool Chain', 'Deep Agentic']
      }
    },
    mockJevResult: {
      latencyMs: 68,
      inputTokens: 39,
      costDollars: 0.000035,
      decisions: {
        primary_tool: {
          value: 'calc_math',
          probabilities: { calc_math: 0.965, file_system: 0.031, web_search: 0.004 }
        },
        requires_elevation: {
          value: false,
          p: 0.991
        },
        complexity: {
          value: 'Multi-tool Chain',
          index: 2,
          confidence: 0.885
        }
      }
    },
    mockLlmResult: {
      latencyMs: 7920,
      tokensGenerated: 98,
      costDollars: 0.0142,
      outputRaw: '{\n  "thought": "This involves calculating taxes and then creating a PDF. Math tool is needed first.",\n  "primary_tool": "calc_math",\n  "requires_elevation": false\n}'
    }
  },
  {
    id: 'security',
    name: 'Edge WAF Security Classifier',
    description: 'Inline 70ms packet firewall running at edge before request hits DB',
    state: "POST /login payload: admin' OR '1'='1' -- with User-Agent: sqlmap/1.7.2#dev",
    questions: {
      attack_type: {
        type: 'choice',
        instructions: 'Identify web exploit pattern',
        criteria: {
          sql_injection: 'SQL syntax manipulation, tautologies, UNION SELECT',
          xss_injection: 'Cross-site scripting script tags or javascript URIs',
          benign_traffic: 'Normal user auth request'
        }
      },
      block_immediately: {
        type: 'noul',
        instructions: 'Should edge proxy drop connection immediately with 403?'
      },
      severity: {
        type: 'score',
        instructions: 'Threat level ranking',
        criteria: ['Informational', 'Low', 'Medium', 'High', 'Critical']
      }
    },
    mockJevResult: {
      latencyMs: 71,
      inputTokens: 32,
      costDollars: 0.000028,
      decisions: {
        attack_type: {
          value: 'sql_injection',
          probabilities: { sql_injection: 0.997, xss_injection: 0.002, benign_traffic: 0.001 }
        },
        block_immediately: {
          value: true,
          p: 0.999
        },
        severity: {
          value: 'Critical',
          index: 4,
          confidence: 0.985
        }
      }
    },
    mockLlmResult: {
      latencyMs: 9150,
      tokensGenerated: 160,
      costDollars: 0.0210,
      outputRaw: '{\n  "threat": "SQL Injection attempt detected using sqlmap tool signature.",\n  "block_immediately": true,\n  "severity": "Critical"\n}'
    }
  }
];

export const JevPlayground: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [stateText, setStateText] = useState<string>(PRESETS[0].state);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(true);

  const handleSelectPreset = (p: Preset) => {
    setSelectedPreset(p);
    setStateText(p.state);
    setHasEvaluated(true);
  };

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    audioEngine.playZap();

    setTimeout(() => {
      setIsEvaluating(false);
      setHasEvaluated(true);
      audioEngine.playChime();
    }, 70); // Authentic 70ms latency simulation!
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              TypeSafe Jev API Interactive Workbench
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              System One
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Unstructured state in, typed probabilistic decisions out. Test single-pass scoring vs 8-second generative LLMs.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRunEvaluation}
          disabled={isEvaluating}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold font-mono text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          {isEvaluating ? (
            <>
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              Evaluating (70ms)...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-950" />
              Run Jev Evaluation (70ms)
            </>
          )}
        </button>
      </div>

      {/* Preset Selector */}
      <div className="pt-5 pb-4">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">
          Select Production Scenario:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESETS.map((p) => {
            const isSelected = p.id === selectedPreset.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500/80 shadow-md ring-1 ring-cyan-500/50'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="text-sm font-semibold text-white mb-0.5">{p.name}</div>
                <div className="text-xs text-slate-400 line-clamp-1">{p.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* State & Questions Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 py-4">
        {/* Left Column: Unstructured State Input */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400">
              1. Unstructured "state" (Input):
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {stateText.length} chars
            </span>
          </div>
          <textarea
            value={stateText}
            onChange={(e) => setStateText(e.target.value)}
            rows={5}
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-xs md:text-sm font-mono text-slate-200 focus:outline-none transition-colors resize-none leading-relaxed"
            placeholder="Paste text, log, or JSON object here..."
          />

          {/* Defined Questions Preview */}
          <div className="mt-2 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span className="text-xs font-mono font-bold text-purple-400 block mb-2">
              2. Questions Map (Runtime Schema):
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {Object.entries(selectedPreset.questions).map(([qName, qDef]) => (
                <div key={qName} className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-300 font-bold">{qName}:</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    qDef.type === 'noul' ? 'bg-emerald-500/20 text-emerald-300' :
                    qDef.type === 'choice' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-pink-500/20 text-pink-300'
                  }`}>
                    {qDef.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Instant Jev Evaluation Output */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              3. Typed Probabilistic Decision (Output):
            </span>
            {hasEvaluated && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ⚡ Evaluated in {selectedPreset.mockJevResult.latencyMs}ms
              </span>
            )}
          </div>

          {/* Evaluation Card */}
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            {hasEvaluated ? (
              <div className="space-y-4">
                {/* Department Choice result */}
                {selectedPreset.mockJevResult.decisions.department && (
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-mono text-slate-300 font-bold">department: Choice</span>
                      <span className="font-mono text-cyan-400 font-bold">
                        {(selectedPreset.mockJevResult.decisions.department as { value: string }).value} (94.1%)
                      </span>
                    </div>
                    {/* Probabilities bars */}
                    <div className="space-y-1">
                      {Object.entries((selectedPreset.mockJevResult.decisions.department as { probabilities: Record<string, number> }).probabilities).map(([cand, prob]) => (
                        <div key={cand} className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="w-16 text-slate-400">{cand}</span>
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cyan-400"
                              style={{ width: `${prob * 100}%` }}
                            />
                          </div>
                          <span className="w-10 text-right text-slate-300">{(prob * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary Tool choice result */}
                {selectedPreset.mockJevResult.decisions.primary_tool && (
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-mono text-slate-300 font-bold">primary_tool: Choice</span>
                      <span className="font-mono text-cyan-400 font-bold">
                        {(selectedPreset.mockJevResult.decisions.primary_tool as { value: string }).value}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {Object.entries((selectedPreset.mockJevResult.decisions.primary_tool as { probabilities: Record<string, number> }).probabilities).map(([cand, prob]) => (
                        <div key={cand} className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="w-20 text-slate-400">{cand}</span>
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400" style={{ width: `${prob * 100}%` }} />
                          </div>
                          <span className="w-10 text-right text-slate-300">{(prob * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attack type choice result */}
                {selectedPreset.mockJevResult.decisions.attack_type && (
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-mono text-slate-300 font-bold">attack_type: Choice</span>
                      <span className="font-mono text-rose-400 font-bold">
                        {(selectedPreset.mockJevResult.decisions.attack_type as { value: string }).value} (99.7%)
                      </span>
                    </div>
                    <div className="space-y-1">
                      {Object.entries((selectedPreset.mockJevResult.decisions.attack_type as { probabilities: Record<string, number> }).probabilities).map(([cand, prob]) => (
                        <div key={cand} className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="w-24 text-slate-400">{cand}</span>
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500" style={{ width: `${prob * 100}%` }} />
                          </div>
                          <span className="w-10 text-right text-slate-300">{(prob * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Noul result */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-emerald-200">
                      Noul Primitive:
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded">
                      TRUE (p = 0.984)
                    </span>
                  </div>
                </div>

                {/* Score result */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-pink-950/40 border border-pink-500/30">
                  <span className="text-xs font-mono text-pink-200">
                    Ordinal Score Primitive:
                  </span>
                  <span className="text-xs font-mono font-bold text-pink-300 bg-pink-900/60 px-2 py-0.5 rounded">
                    Level: 4 / 5 (Confidence: 0.91)
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                Click "Run Jev Evaluation" to test 70ms single pass
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Architectural Benchmark */}
      <div className="mt-5 pt-5 border-t border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <span>Head-to-Head Benchmark:</span>
          <span className="text-slate-500 font-normal">TypeSafe Jev vs Generative LLM on this exact task</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Jev Box */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                TypeSafe Jev (System 1)
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                WINNER (120x Faster)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-cyan-500/20 my-2">
              <div>
                <div className="text-[10px] text-slate-400 font-mono">LATENCY</div>
                <div className="text-base font-bold font-mono text-emerald-400">
                  {selectedPreset.mockJevResult.latencyMs} ms
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono">COST</div>
                <div className="text-base font-bold font-mono text-emerald-400">
                  ${selectedPreset.mockJevResult.costDollars.toFixed(6)}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono">HALLUCINATION</div>
                <div className="text-base font-bold font-mono text-emerald-400">
                  0.00% (Strict)
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              1 single cross-attention forward pass. Output tokens are completely free!
            </div>
          </div>

          {/* Generative LLM Box */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Generative LLM (System 2)
              </span>
              <span className="text-xs font-mono text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30">
                100x More Expensive
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-slate-800 my-2">
              <div>
                <div className="text-[10px] text-slate-400 font-mono">LATENCY</div>
                <div className="text-base font-bold font-mono text-rose-400">
                  {(selectedPreset.mockLlmResult.latencyMs / 1000).toFixed(2)} s
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono">COST</div>
                <div className="text-base font-bold font-mono text-rose-400">
                  ${selectedPreset.mockLlmResult.costDollars.toFixed(4)}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono">SCHEMA ERRORS</div>
                <div className="text-base font-bold font-mono text-amber-400">
                  ~2.1% Failures
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-2">
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              Generates 140+ tokens one-by-one autoregressively. Prone to chatty preamble bugs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
