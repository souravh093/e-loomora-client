import { Facebook, Instagram, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">LOOMORA</h2>
            <p className="mt-2 text-gray-600">
              Your one-stop shop for all your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "Home",
                "Products",
                "Comparison",
                "Shops",
                "Recent product",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`${
                      item === "Home"
                        ? "/"
                        : item === "Products"
                        ? "/all-products"
                        : item === "Comparison"
                        ? "/comparison"
                        : item === "Shops"
                        ? "/shops"
                        : item === "Recent product"
                        ? "/recent-viewed"
                        : "/contact"
                    }`}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Newsletter
            </h3>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 flex gap-2 justify-center">
          <p>&copy; 2025 LOOMORA. All rights reserved.</p> 
          <p>Design and Developed by <Link className="text-yellow-700" target="_blank" to={'https://sourave.vercel.app/'}>Sourave Halder</Link></p>
        </div>
      </div>
    </footer>
  );
}