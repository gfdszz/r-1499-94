
import { Menu, LogIn, LogOut, UserCircle, Wrench } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  // Determine if this is the home page (for styling)
  const isHomePage = location.pathname === "/";

  const handleGetStarted = () => {
    navigate("/contact");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className={`${isHomePage ? 'absolute' : ''} w-full z-50 ${!isHomePage ? 'bg-estate-800 py-4' : ''}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="text-3xl font-display text-white tracking-wide hover:opacity-90 transition-opacity">Elite Real Estate</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/properties" className="text-white hover:text-white/80 transition-colors font-medium">Properties</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white hover:text-white/80 transition-colors font-medium flex items-center">
                  Services
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <Link to="/furniture">
                  <DropdownMenuItem>
                    <span>Furniture</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/#services">
                  <DropdownMenuItem>
                    <Wrench className="mr-2 h-4 w-4" />
                    <span>Home Services</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Maintenance</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Regular Inspection</DropdownMenuItem>
                        <DropdownMenuItem>Seasonal Maintenance</DropdownMenuItem>
                        <DropdownMenuItem>Handyman Services</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Electrical</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>System Inspection</DropdownMenuItem>
                        <DropdownMenuItem>Fixture Installation</DropdownMenuItem>
                        <DropdownMenuItem>Wiring Upgrade</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Plumbing</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Leak Detection</DropdownMenuItem>
                        <DropdownMenuItem>Fixture Installation</DropdownMenuItem>
                        <DropdownMenuItem>Emergency Services</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/about" className="text-white hover:text-white/80 transition-colors font-medium">About</Link>
            <Link to="/#testimonials" className="text-white hover:text-white/80 transition-colors font-medium">Testimonials</Link>
            <Link to="/contact" className="text-white hover:text-white/80 transition-colors font-medium">Contact</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full overflow-hidden bg-white/10 hover:bg-white/20">
                    <UserCircle className="h-5 w-5 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-normal text-sm text-gray-500">Signed in as</div>
                    <div className="font-medium truncate">{user?.user_metadata?.name || user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <UserCircle className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="text-black border-white bg-white hover:bg-white/90 font-semibold shadow-md"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-12">
                  <Link to="/properties" className="text-lg font-medium">Properties</Link>
                  <Link to="/furniture" className="text-lg font-medium">Furniture</Link>
                  <Link to="/#services" className="text-lg font-medium flex items-center">
                    <Wrench className="mr-2 h-4 w-4" />
                    Home Services
                  </Link>
                  <Link to="/about" className="text-lg font-medium">About</Link>
                  <Link to="/#testimonials" className="text-lg font-medium">Testimonials</Link>
                  <Link to="/contact" className="text-lg font-medium">Contact</Link>
                  
                  {user ? (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="px-1">
                        <div className="text-sm text-gray-500">Signed in as</div>
                        <div className="font-medium truncate">{user?.user_metadata?.name || user?.email}</div>
                      </div>
                      <Button 
                        className="w-full bg-estate-800 hover:bg-estate-700 text-white font-semibold shadow-md"
                        onClick={() => navigate("/dashboard")}
                      >
                        <UserCircle className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full border-estate-800 text-estate-800 hover:bg-estate-50"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-4 border-t">
                      <Button 
                        variant="outline"
                        className="w-full border-estate-800 text-estate-800 hover:bg-estate-50"
                        onClick={() => navigate("/login")}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                      <Button 
                        className="w-full bg-estate-800 hover:bg-estate-700 text-white font-semibold shadow-md"
                        onClick={() => navigate("/register")}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
