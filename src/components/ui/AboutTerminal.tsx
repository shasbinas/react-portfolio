"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DEFAULT_ABOUT_TEXT = "Hey there! 👋 I'm Shasbin AS, a Full Stack MERN Developer. I specialize in building scalable web applications using React.js, Next.js, Node.js, TypeScript, MongoDB, and PostgreSQL. With experience delivering projects for clients worldwide, I focus on creating efficient, user-centric digital products.";

const COMMAND_DELAY_MS = 600;

interface AboutTerminalProps {
  fullText?: string;
  typingSpeed?: number;
  isInView?: boolean;
}

export function AboutTerminal({
  fullText = DEFAULT_ABOUT_TEXT,
  typingSpeed = 15,
  isInView = true,
}: AboutTerminalProps) {
  const [typedText, setTypedText] = useState("");
  const [commandExecuted, setCommandExecuted] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setCommandExecuted(true), COMMAND_DELAY_MS);
    return () => clearTimeout(t);
  }, [isInView]);

  useEffect(() => {
    if (!commandExecuted) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [commandExecuted, fullText, typingSpeed]);

  const isTyping = commandExecuted && typedText.length < fullText.length;
  const isComplete = commandExecuted && typedText.length >= fullText.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl transition-all">
        <div className="flex h-12 shrink-0 select-none items-center justify-between border-b border-white/10 bg-white/[0.05] px-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-4 font-mono text-xs text-slate-500 tracking-wider">shasbin.bio</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-6 font-mono text-sm leading-relaxed sm:p-8">
        <div className="shrink-0 text-primary font-bold">$ cat about.txt</div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto text-slate-300 selection:bg-primary/30 scrollbar-hide">
          {commandExecuted && typedText.length > 0 ? typedText : "\u00A0"}
          {isTyping && <span className="animate-pulse text-primary">_</span>}
          {isComplete && (
            <span className="ml-1 animate-pulse text-primary">█</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
