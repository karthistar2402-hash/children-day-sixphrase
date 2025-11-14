import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  studentName: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  registerId: z.string().trim().min(5, "Register ID must be at least 5 characters").regex(/\d{5,}/, "Register ID must contain at least 5 digits"),
});

const counterMapping = [
  { name: "Apple", color: "text-slate-700", icon: "🍎", location: "Reception" },
  { name: "Google", color: "text-red-600", icon: "🔍", location: "Amphitheatre" },
  { name: "Microsoft", color: "text-blue-600", icon: "🪟", location: "Library" },
  { name: "Meta", color: "text-blue-700", icon: "👁️", location: "Chemistry Lab" },
  { name: "JusPay", color: "text-purple-600", icon: "💳", location: "Physics Lab" },
  { name: "PayTm", color: "text-cyan-600", icon: "💰", location: "Cothas" },
  { name: "Yahoo!", color: "text-violet-600", icon: "📧", location: "Tuck Shop" },
  { name: "Capgemini", color: "text-indigo-600", icon: "💼", location: "Second Floor Lobby" },
  { name: "Adobe", color: "text-rose-600", icon: "🎨", location: "Placement Cell" },
  { name: "OpenAI", color: "text-green-600", icon: "🤖", location: "Seminar Hall" },
];

interface DistributionFormProps {
  onResult: (studentName: string, counter: typeof counterMapping[0]) => void;
  disabled?: boolean;
}

export const DistributionForm = ({ onResult, disabled = false }: DistributionFormProps) => {
  const [studentName, setStudentName] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [errors, setErrors] = useState<{ studentName?: string; registerId?: string }>({});

  const calculateCounter = (regId: string): typeof counterMapping[0] => {
    // Extract last 5 digits
    const digits = regId.replace(/\D/g, '');
    const last5 = digits.slice(-5);
    
    // Convert to number and mod 10
    const number = parseInt(last5, 10);
    const index = number % 10;
    
    return counterMapping[index];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = formSchema.parse({ studentName, registerId });
      const assignedCounter = calculateCounter(validatedData.registerId);
      
      setErrors({});
      onResult(validatedData.studentName, assignedCounter);
      toast.success("Counter assigned successfully!");
      
      // Reset form
      setStudentName("");
      setRegisterId("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { studentName?: string; registerId?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please check the form for errors");
      }
    }
  };

  return (
    <Card className={`w-full max-w-md shadow-lg border-border/50 ${disabled ? "opacity-60" : ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Get Your Counter</CardTitle>
        <CardDescription>Enter your details to find out which counter you're assigned to</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              type="text"
              placeholder="Enter your full name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={errors.studentName ? "border-destructive" : ""}
              disabled={disabled}
            />
            {errors.studentName && (
              <p className="text-sm text-destructive">{errors.studentName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="registerId">Register ID (USN)</Label>
            <Input
              id="registerId"
              type="text"
              placeholder="Enter your register ID"
              value={registerId}
              onChange={(e) => setRegisterId(e.target.value)}
              className={errors.registerId ? "border-destructive" : ""}
              disabled={disabled}
            />
            {errors.registerId && (
              <p className="text-sm text-destructive">{errors.registerId}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={disabled}>
            Find My Counter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
