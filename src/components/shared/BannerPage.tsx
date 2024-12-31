import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function BannerPage({ title }: { title: string }) {
  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="py-4 ">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li className="font-semibold text-white">
                <span>{title}</span>
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {title}
          </h1>

          <div className="h-1 w-24 bg-yellow-500 mb-6"></div>
        </div>
      </div>
    </div>
  );
}