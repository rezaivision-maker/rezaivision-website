import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Sequence } from "remotion";

export const MyComposition: React.FC = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  
  // Wir unterteilen das Video in 3 Sequenzen
  const sequenceDuration = Math.floor(durationInFrames / 3);

  return (
    <AbsoluteFill className="bg-slate-900">
      
      {/* Sequenz 1: KI Video (LTX 2.3) Platzhalter */}
      <Sequence from={0} durationInFrames={sequenceDuration}>
        <AbsoluteFill className="bg-blue-900 items-center justify-center flex flex-col">
          <div className="text-6xl font-bold text-white mb-4">KI-generiertes Intro</div>
          <div className="text-2xl text-blue-200">(Powered by LTX 2.3)</div>
        </AbsoluteFill>
      </Sequence>

      {/* Sequenz 2: Menschliche Medien (Uploads) */}
      <Sequence from={sequenceDuration} durationInFrames={sequenceDuration}>
        <AbsoluteFill className="bg-emerald-900 items-center justify-center flex flex-col">
          <div className="text-6xl font-bold text-white mb-4">Menschlicher Content</div>
          <div className="text-2xl text-emerald-200">(Deine hochgeladenen Videos & Fotos)</div>
        </AbsoluteFill>
      </Sequence>

      {/* Sequenz 3: Hyperframes (HTML-to-Video) */}
      <Sequence from={sequenceDuration * 2} durationInFrames={sequenceDuration}>
        <AbsoluteFill className="bg-purple-900 items-center justify-center flex flex-col">
          <div className="text-6xl font-bold text-white mb-4">Web-Layout (Hyperframes)</div>
          <div className="text-2xl text-purple-200">(Animierte HTML-Ansicht & Outro)</div>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
