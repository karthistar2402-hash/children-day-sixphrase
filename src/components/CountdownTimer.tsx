import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  onDistributionEnd: () => void;
}

export const CountdownTimer = ({ onDistributionEnd }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState<"before" | "active" | "ended">("before");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Set distribution times for today
      const startTime = new Date(today);
      startTime.setHours(14, 0, 0, 0); // 2:00 PM
      
      const endTime = new Date(today);
      endTime.setHours(14, 30, 0, 0); // 2:30 PM

      const currentTime = now.getTime();
      const startTimestamp = startTime.getTime();
      const endTimestamp = endTime.getTime();

      if (currentTime < startTimestamp) {
        // Before start time
        const diff = startTimestamp - currentTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")}`);
        setStatus("before");
      } else if (currentTime >= startTimestamp && currentTime < endTimestamp) {
        // During distribution time
        const diff = endTimestamp - currentTime;
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`);
        setStatus("active");
      } else {
        // After end time
        setTimeLeft("");
        setStatus("ended");
        onDistributionEnd();
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [onDistributionEnd]);

  return (
    <div className="bg-card border border-border/50 rounded-lg p-6 mb-8 shadow-lg animate-in fade-in-50 slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Clock className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          {status === "before" && "Distribution Starts In"}
          {status === "active" && "Distribution Ends In"}
          {status === "ended" && "Gift Distribution Closed"}
        </h2>
      </div>
      
      {status !== "ended" ? (
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-bold text-primary tracking-wider">
            {timeLeft}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {status === "before" && "Distribution time: 2:00 PM - 2:30 PM"}
            {status === "active" && "Hurry! Submit your details now"}
          </p>
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground">
          The gift distribution window has closed. Thank you!
        </p>
      )}
    </div>
  );
};
