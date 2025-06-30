import { Facebook, Instagram, Twitter, Send, MapPin, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              LOOMORA
            </h2>
            <p className="text-gray-600 max-w-xs">
              Your one-stop shop for all your needs. Discover quality products at competitive prices.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.facebook.com/sourav.halder.231895/"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/souravbd093/?hl=en"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://x.com/souravehalder1"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-primary after:mt-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/all-products" },
                { name: "Comparison", path: "/comparison" },
                { name: "Shops", path: "/shops" },
                { name: "Recent Products", path: "/recent-viewed" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-primary after:mt-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">259, Hindu Para, charkwaya, Barishal Sadar, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span className="text-gray-600">+88 (013) 076-28955</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span className="text-gray-600">souravehalder925@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 after:content-[''] after:block after:w-10 after:h-0.5 after:bg-primary after:mt-2">
              Newsletter
            </h3>
            <p className="text-gray-600 text-sm">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="mt-4 relative">
              <Input
                type="email"
                placeholder="Your email address"
                className="pr-12 bg-white border-gray-200 focus:border-primary rounded-lg"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1 h-8 w-8 p-0 rounded-md">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-gray-200" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/return-policy" className="hover:text-primary transition-colors">
              Return Policy
            </Link>
            <Link to="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} LOOMORA. All rights reserved.</p>
            <p className="mt-1">
              Design and Developed by{" "}
              <Link
                className="text-primary hover:text-primary/80 font-medium"
                target="_blank"
                to="https://sourave.vercel.app/"
              >
                Sourave Halder
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

