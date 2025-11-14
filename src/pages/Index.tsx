import { useState } from "react";
import { DistributionForm } from "@/components/DistributionForm";
import { ResultDisplay } from "@/components/ResultDisplay";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Gift } from "lucide-react";
import logo from "@/assets/logo.png";
import jainLogo from "@/assets/jain-logo.png";

interface Counter {
  name: string;
  color: string;
  icon: string;
  location: string;
}

const Index = () => {
  const [result, setResult] = useState<{ studentName: string; counter: Counter } | null>(null);
  const [isDistributionEnded, setIsDistributionEnded] = useState(false);

  const handleResult = (studentName: string, counter: Counter) => {
    setResult({ studentName, counter });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Logos */}
      <div className="absolute top-6 left-6 animate-in fade-in-50 slide-in-from-left-4 duration-700">
        <img src={logo} alt="Six Phrase Veranda Enterprise" className="h-12 md:h-16 w-auto" />
      </div>
      
      <div className="absolute top-6 right-6 animate-in fade-in-50 slide-in-from-right-4 duration-700">
        <img src={jainLogo} alt="JGI JAIN Deemed-to-be University" className="h-10 md:h-14 w-auto" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12 mt-8 animate-in fade-in-50 slide-in-from-top-4 duration-700">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Gift className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Children's Day Goodies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to the Children's Day gift distribution! Enter your details below to discover your assigned counter.
          </p>
        </header>

        {/* Countdown Timer */}
        {!result && (
          <CountdownTimer onDistributionEnd={() => setIsDistributionEnded(true)} />
        )}

        {/* Instructions */}
        {!result && !isDistributionEnded && (
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8 shadow-sm animate-in fade-in-50 slide-in-from-top-4 duration-700 delay-100">
            <h2 className="text-xl font-semibold text-foreground mb-3">How It Works</h2>
            <ol className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-semibold text-primary">1.</span>
                <span>Enter your full name and register ID (USN) in the form below</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">2.</span>
                <span>Click "Find My Counter" to get your assigned counter and location</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">3.</span>
                <span>Visit the assigned location to collect your Children's Day goodie</span>
              </li>
            </ol>
          </div>
        )}

        {/* Main Content */}
        <div className="flex justify-center animate-in fade-in-50 zoom-in-95 duration-700 delay-200">
          {result ? (
            <ResultDisplay
              studentName={result.studentName}
              counter={result.counter}
              onReset={handleReset}
            />
          ) : (
            <DistributionForm onResult={handleResult} disabled={isDistributionEnded} />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-muted-foreground animate-in fade-in-50 duration-1000 delay-300">
          <p>Each register ID (USN) is consistently assigned to the same counter</p>
          <p className="mt-1">Distribution time: 2:00 PM - 2:30 PM</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
