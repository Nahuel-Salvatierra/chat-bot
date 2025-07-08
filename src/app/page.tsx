import { Button } from "@/components/ui/button";

import { MessageCircle, Sparkles, ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";
import FooterCard from "@/components/footer-card";
import MainCard from "@/app/ui/main-card";
import RootHeader from "./ui/root-header";

export const metadata: Metadata = {
  title: "Bidoo Chat",
  description: "Experiment with the power of conversational AI",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <RootHeader />
          <MainCard />

          <div className="mt-12 space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button className="px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Start Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold border-2 transition-all duration-300"
                >
                  Create Account
                </Button>
              </Link>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Free • Unlimited • No ads
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <FooterCard
              title="Intelligent Chat"
              description="Converse naturally with advanced AI that understands context and provides useful answers."
              icon={
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              }
            />
            <FooterCard
              title="Instant Answers"
              description="Get quick and accurate answers for any question or task you need."
              icon={
                <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              }
            />
            <FooterCard
              title="Advanced AI"
              description="OpenAI's latest generation technology for an exceptional chat experience."
              icon={
                <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
