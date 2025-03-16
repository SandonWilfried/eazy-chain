
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Ship, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-full p-2">
              <Ship className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">CargoCaravan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-foreground"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/services"
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {t("services")}
            </Link>
            <Link
              to="/tracking"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/tracking"
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {t("shipmentTracking")}
            </Link>
            <Link
              to="/passengers"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/passengers"
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {t("passengerShipping")}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/" ? "text-primary" : "text-foreground"
                }`}
              >
                {t("home")}
              </Link>
              <Link
                to="/services"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/services"
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {t("services")}
              </Link>
              <Link
                to="/tracking"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/tracking"
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {t("shipmentTracking")}
              </Link>
              <Link
                to="/passengers"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === "/passengers"
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {t("passengerShipping")}
              </Link>
              <div className="pt-2 flex flex-col space-y-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNav;
