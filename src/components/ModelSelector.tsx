import React from 'react';
import { Brain } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLLMModel, llmModels } from "@/services/LLMService";

interface ModelSelectorProps {
  className?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ className }) => {
  const { selectedModel, selectModel, currentModel } = useLLMModel();

  return (
    <div className={`flex items-center ${className || ''}`}>
      <div className="hidden md:flex items-center mr-2">
        <Brain className="w-4 h-4 mr-1 text-white/70" />
        <span className="text-xs text-white/70">Model:</span>
      </div>
      <Select
        value={selectedModel}
        onValueChange={(value) => selectModel(value as 'gemini-pro' | 'gemini-pro-vision' | 'gemini-ultra')}
      >
        <SelectTrigger className="h-8 w-[140px] bg-white/5 border-none text-white text-xs">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {llmModels.map((model) => (
            <SelectItem key={model.id} value={model.id} className="text-xs">
              <div className="flex flex-col">
                <span>{model.name}</span>
                <span className="text-xs text-muted-foreground">{model.provider}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;