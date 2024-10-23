import React from "react";
import { Check } from "lucide-react";

interface Step {
  text: string;
}

interface MultiStepLoaderProps {
  steps: Step[];
  activeStep: number;
}

export function MultiStepLoader({ steps, activeStep }: MultiStepLoaderProps): JSX.Element | null {
  if (activeStep === -1) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60">
      <div className="flex flex-col justify-center w-full h-full" style={{ paddingTop: "20%" }}>
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        
        <div className="transform transition-transform duration-500 ease-in-out space-y-6 w-64 relative mx-auto"
             style={{
               transform: `translateY(${-activeStep * 48}px)`,
             }}>
          {steps.map((step, index): JSX.Element => {
            const distance = Math.abs(index - activeStep);
            
            let opacity = 0;
            if (distance <= 1) {
              opacity = 1;
            } else if (distance === 2) {
              opacity = 0.6;
            } else if (distance === 3) {
              opacity = 0.2;
            }

            const translateY = distance > 3 ? (index < activeStep ? -20 : 20) : 0;
            
            return (
              <div
                key={index}
                className="flex items-center space-x-3 transition-all duration-700"
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  pointerEvents: distance > 3 ? 'none' : 'auto'
                }}
              >
                <div className={`
                  flex items-center justify-center w-6 h-6 rounded-full 
                  transition-all duration-500 flex-shrink-0
                  ${index <= activeStep 
                    ? 'bg-[#39C3EF] shadow-lg shadow-[#39C3EF]/30' 
                    : 'border-2 border-gray-500'
                  }
                `}>
                  {index < activeStep ? (
                    <Check className="w-4 h-4 stroke-[3] text-black" />
                  ) : index === activeStep ? (
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                  ) : null}
                </div>
                <span className={`
                  text-sm font-medium transition-all duration-500 text-left
                  ${index <= activeStep ? 'text-white' : 'text-gray-400'}
                  ${index === activeStep ? 'text-[#39C3EF]' : ''}
                `}>
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}