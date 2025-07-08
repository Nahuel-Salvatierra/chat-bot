import { MessageCircle, Sparkles } from "lucide-react";

export default function MainCard() {
  return (
    <div className="flex justify-center mt-12">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <div className="relative rounded-2xl p-8 shadow-xl bg-card">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
                <MessageCircle className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Conversational Intelligence
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
            Discover a new way to interact with AI. Ask, create, explore, and
            get instant answers.
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Real-time answers</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Intuitive and modern interface</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Powered by OpenAI GPT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
