import React from 'react';
import { BookOpen, CheckCircle, Flame, ShieldAlert, Cpu } from 'lucide-react';

export const ArchitectureGuide: React.FC = () => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-8 shadow-2xl backdrop-blur-md space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen className="w-5 h-5" />
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            The Deep Architecture of TypeSafe Jev
          </h2>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Technical Specification
          </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Comprehensive engineering guide explaining the machine learning theory, cognitive foundation, and economic mechanics behind System One AI decisions.
        </p>
      </div>

      {/* Grid of 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Cognitive Foundations */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-3 font-semibold text-sm">
              <Cpu className="w-4 h-4" />
              1. Kahneman's Cognitive Duality
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
              In <em>Thinking, Fast and Slow</em>, Daniel Kahneman divides cognition into two distinct modes:
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-cyan-300">System 1 (Jev):</strong> Operates automatically and quickly, with little or no effort and no sense of voluntary control. Reflexive feature matching.
              </li>
              <li className="p-2 rounded bg-slate-900 border border-slate-800">
                <strong className="text-purple-300">System 2 (LLMs):</strong> Allocates attention to effortful mental operations, including complex computations and reasoning chains.
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
            Key Insight: Calling System 2 for System 1 tasks burns 100x compute unnecessarily.
          </div>
        </div>

        {/* Pillar 2: Jevons Paradox Economics */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-3 font-semibold text-sm">
              <Flame className="w-4 h-4" />
              2. The Jevons Paradox (1865)
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
              William Stanley Jevons published <em>The Coal Question</em> after James Watt quadrupled steam engine thermal efficiency.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 mb-2">
              dQ / dη &gt; 0
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When the cost of power dropped by 80%, Britain didn't burn less coal; total consumption grew 10-fold because steam power became viable in factories, ships, and looms. At <strong>$0.042/1M tokens</strong>, AI decisions enter database triggers and synchronous microservices.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
            Threshold: From human review ($1) → big LLM ($0.02) → inline Jev ($0.00004).
          </div>
        </div>

        {/* Pillar 3: Discriminator vs Generator */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-3 font-semibold text-sm">
              <CheckCircle className="w-4 h-4" />
              3. The Math: Discriminative Forward Pass
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
              Why is Jev fundamentally immune to JSON syntax corruption and chatty hallucinations?
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold">✓</span>
                <span><strong>No Autoregressive Decoder:</strong> Does not generate text token-by-token. There is no string formatting loop to break.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold">✓</span>
                <span><strong>Single Forward Pass:</strong> Projects state tokens and candidate criterion descriptors into joint cross-attention embeddings in 1 pass (~70ms).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold">✓</span>
                <span><strong>Bounded Probability:</strong> Directly computes softmax over candidate pool. Sum of probabilities is mathematically bounded to 1.0.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
            Latency breakdown: 70ms single pass vs 8,800ms autoregressive generation.
          </div>
        </div>

        {/* Pillar 4: The Error Cascade Risk */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 mb-3 font-semibold text-sm">
              <ShieldAlert className="w-4 h-4" />
              4. Jev's Paradox: The Error Cascade
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
              When decisions are cheap enough to run on every incoming webhook and database row, volume multiplies by 1,000x:
            </p>
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 font-mono text-xs text-rose-300 mb-3 space-y-1">
              <div>Daily Decisions: 500,000,000</div>
              <div>Error Rate: 2.0%</div>
              <div className="text-rose-400 font-bold">Absolute Failures: 10,000,000 / day!</div>
            </div>
            <p className="text-xs text-slate-400">
              <strong>The Solution:</strong> Calibrated confidence scores. If confidence drops below threshold (e.g. 0.85), activate a circuit breaker to route to System 2 or human triage.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
            Rule of thumb: Calibration is more critical than accuracy at scale.
          </div>
        </div>
      </div>

      {/* The Primitives Reference Table */}
      <div className="pt-6 border-t border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 font-mono">
          TypeSafe Jev Primitives Matrix:
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                <th className="p-3">Primitive</th>
                <th className="p-3">Return Type</th>
                <th className="p-3">Required Parameters</th>
                <th className="p-3">Output Structure</th>
                <th className="p-3">Best Used For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-850/40">
                <td className="p-3 font-bold text-emerald-400">noul</td>
                <td className="p-3">boolean</td>
                <td className="p-3 text-slate-400">instructions</td>
                <td className="p-3 text-emerald-300">{`{ value: true, p: 0.984 }`}</td>
                <td className="p-3 text-slate-400">Security gates, outage detection, boolean flags</td>
              </tr>
              <tr className="hover:bg-slate-850/40">
                <td className="p-3 font-bold text-cyan-400">choice</td>
                <td className="p-3">string enum</td>
                <td className="p-3 text-slate-400">instructions, criteria map (up to 255)</td>
                <td className="p-3 text-cyan-300">{`{ value: "billing", probabilities: {...} }`}</td>
                <td className="p-3 text-slate-400">Ticket triage, agent tool routing, intent classifying</td>
              </tr>
              <tr className="hover:bg-slate-850/40">
                <td className="p-3 font-bold text-pink-400">score</td>
                <td className="p-3">ordered scale</td>
                <td className="p-3 text-slate-400">instructions, criteria array (2–10)</td>
                <td className="p-3 text-pink-300">{`{ value: "Furious", index: 3, confidence: 0.91 }`}</td>
                <td className="p-3 text-slate-400">Sentiment rating, severity levels, risk grading</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
