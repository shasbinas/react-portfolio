import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({
  children,
  subtitle,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`mb-10 relative ${className}`}>
      <div className="flex flex-col text-center items-center">
        {/* Main Title */}
        <h2 className="relative group">
          <span className="text-4xl md:text-5xl font-bold text-gradient leading-tight tracking-tight">
            {children}
          </span>
        </h2>
        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl font-medium">
            {subtitle}
          </p>
        )}{' '}
        {/* Decorative elements */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-primary opacity-80"></div>
          <div className="w-1 h-1 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-secondary opacity-80"></div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
