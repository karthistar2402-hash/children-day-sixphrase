import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface ResultDisplayProps {
  studentName: string;
  counter: {
    name: string;
    color: string;
    icon: string;
  };
  onReset: () => void;
}

export const ResultDisplay = ({ studentName, counter, onReset }: ResultDisplayProps) => {
  return (
    <Card className="w-full max-w-md shadow-lg border-border/50 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <CardContent className="pt-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Welcome,</p>
            <h2 className="text-2xl font-bold text-foreground mb-4">{studentName}</h2>
            
            <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
              <p className="text-sm text-muted-foreground">Your assigned counter is:</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-5xl">{counter.icon}</span>
                <h3 className={`text-4xl font-bold ${counter.color}`}>
                  {counter.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <p className="text-sm text-muted-foreground">
              Please proceed to <span className="font-semibold text-foreground">Counter {counter.name}</span> to collect your surprise!
            </p>
            <Button onClick={onReset} variant="outline" className="w-full">
              Check Another Student
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
