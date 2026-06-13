import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from "remotion";

export const MyComposition: React.FC = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-slate-900 items-center justify-center flex flex-col">
      <div
        style={{ opacity }}
        className="text-8xl font-bold text-white font-sans text-center mb-8"
      >
        Rezaemotion
      </div>
      <div className="text-4xl text-gray-300 font-sans">
        AI Video Production Engine
      </div>
    </AbsoluteFill>
  );
};
