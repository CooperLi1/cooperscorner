import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 md:px-16 lg:px-32">
      <div className="flex items-center py-6">
        <a href="/" className="text-yellow-400 font-semibold hover:text-yellow-500 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </a>
      </div>
      <div>{children}</div>
    </div>
  );
}
