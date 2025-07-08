import { Bot } from "lucide-react";

export default function RootHeader() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-center items-center space-x-2">
        <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl md:text-6xl font-bold ">Bidoo Chat</h1>
      </div>
      <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
        Experiment with the power of conversational AI
      </p>
    </div>
  );
}
