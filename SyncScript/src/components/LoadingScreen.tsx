import { useState, useEffect } from "react";

const APP_NAME = "SyncScript";

export default function LoadingScreen() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    console.log("LoadingScreen mounted");
    // Wait for letters to fall (animation duration)
    const animationTimer = setTimeout(() => {
      console.log("Animation complete");
      setAnimationComplete(true);
    }, 2500); // 10 letters * 0.1s delay + 0.8s animation + buffer

    return () => clearTimeout(animationTimer);
  }, []);

  useEffect(() => {
    if (!animationComplete) return;

    console.log("Starting progress bar");
    // Start progress bar after animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Increment by 2% every interval
      });
    }, 30); // Update every 30ms for smooth animation

    return () => clearInterval(interval);
  }, [animationComplete]);

  useEffect(() => {
    if (progress === 100) {
      console.log("Progress complete, hiding loading screen");
      const timer = setTimeout(() => {
        setLoadingComplete(true);
      }, 300); // Small delay after reaching 100%
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (loadingComplete) {
    console.log("Loading screen hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background graph-paper">
      <div className="flex gap-1 mb-20">
        {APP_NAME.split("").map((letter, index) => (
          <span
            key={index}
            className="text-6xl font-sketch font-bold text-primary animate-fall-in inline-block"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0 // Start invisible until animation kicks in
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Progress Bar */}
      {animationComplete && (
        <div className="w-80 max-w-md">
          <div className="sketchy-border-sm bg-card p-2 mb-2">
            <div className="h-4 bg-paper-dark rounded-sm overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="text-center text-muted-foreground font-sketch text-sm">
            Loading... {progress}%
          </div>
        </div>
      )}

      {/* Footer loading text */}
      {!animationComplete && (
        <div className="absolute bottom-10 text-muted-foreground font-sketch animate-pulse">
          Initializing Workspace...
        </div>
      )}
    </div>
  );
}

