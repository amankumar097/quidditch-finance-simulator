
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CircleDollarSign, ChartCandlestick, TrendingUp, Wallet, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: "Dashboard", 
      icon: <CircleDollarSign className="h-5 w-5" />, 
      path: "/" 
    },
    { 
      name: "Market", 
      icon: <ChartCandlestick className="h-5 w-5" />, 
      path: "/market" 
    },
    { 
      name: "Bludger Analysis", 
      icon: <TrendingUp className="h-5 w-5" />, 
      path: "/options" 
    },
    { 
      name: "Portfolio", 
      icon: <Wallet className="h-5 w-5" />, 
      path: "/portfolio" 
    },
    { 
      name: "Seeker Risk", 
      icon: <Shield className="h-5 w-5" />, 
      path: "/risk" 
    }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gringotts-parchment shadow-md border-b border-gringotts-gold">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/gringotts-logo.png" 
                alt="Gringotts Trading" 
                className="h-10 w-10 mr-2" 
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M12 6v6l4 2'%3E%3C/path%3E%3C/svg%3E";
                }}
              />
              <span className="font-wizarding text-xl text-gringotts-burgundy">Gringotts Trading</span>
            </Link>
          </div>
          
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-gringotts-gold text-white"
                    : "text-gringotts-burgundy hover:bg-gringotts-gold/20"
                )}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
