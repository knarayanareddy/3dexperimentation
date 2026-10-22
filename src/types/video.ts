export interface Shot {
  id: string;
  chapterId: string;
  startTime: number;
  endTime: number;
  cue: string;
  read: string;
  speaker:
    // Jev + evolution films
    | 'Narrator' | 'Clawd' | 'Engineer' | 'Jevons'
    // Uber film cast
    | 'Rider' | 'Driver' | 'Official'
    // OpenAI film cast
    | 'Sam' | 'Ilya' | 'Researcher' | 'Board';
  visualPrompt: string;
  codeSnippet?: string;
  technicalNote?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  startTime: number;
  endTime: number;
  duration: number;
  themeColor: string;
  accentColor: string;
  summary: string;
  shots: Shot[];
}

export interface ScriptItem {
  time: number;
  endTime: number;
  chapterId: string;
  speaker: string;
  text: string;
  keywords: string[];
}

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  t: number; // current time in seconds
  dt: number; // delta time
  chapterProgress: number; // 0 to 1 within chapter
  globalProgress: number; // 0 to 1 across entire video
  chapter: Chapter;
  shot: Shot;
  speaking: boolean;
  themeColor: string;
}
