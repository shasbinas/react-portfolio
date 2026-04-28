import { FileText, Mail } from 'lucide-react';
import { Link } from '../Link';

export function ActionButtons() {
  return (
    <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
      <a
        href="/assets/resume/Shasbin_AS_Resume_2025.pdf"
        className="flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-[0_10px_20px_-10px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1"
      >
        <FileText className="w-5 h-5" />
        <span>View Resume</span>
      </a>
      <Link
        href="#contact"
        className="flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/20 hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-1"
      >
        <Mail className="w-5 h-5" />
        <span>Contact Me</span>
      </Link>
    </div>
  );
}
