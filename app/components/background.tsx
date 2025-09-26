"use client";

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* animated color wash (light + dark themes) */}
      <div
        className={[
          "absolute inset-0 transform-gpu will-change-transform",
          // Light mode
          "bg-[radial-gradient(1000px_600px_at_10%_-10%,theme(colors.indigo.300/35),transparent),radial-gradient(900px_500px_at_110%_10%,theme(colors.fuchsia.300/28),transparent),radial-gradient(900px_600px_at_50%_110%,theme(colors.cyan.300/30),transparent)]",
          // Dark mode
          "dark:bg-[radial-gradient(1000px_600px_at_10%_-10%,theme(colors.indigo.500/20),transparent),radial-gradient(900px_500px_at_110%_10%,theme(colors.fuchsia.500/18),transparent),radial-gradient(900px_600px_at_50%_110%,theme(colors.cyan.500/20),transparent)]",
          // Animation (uses the keyframe you added above)
          "animate-[slow-pan_22s_ease-in-out_infinite]",
        ].join(" ")}
      />

      {/* soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,transparent,rgba(0,0,0,0.08))] dark:bg-[radial-gradient(60%_60%_at_50%_40%,transparent,rgba(0,0,0,0.35))]" />

      {/* faint dot texture (optional) */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.10] bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:14px_14px] text-white" />
    </div>
  );
}
