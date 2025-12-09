import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, ChevronDown } from "lucide-react";

export function UserLoggedHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    setIsDropdownOpen(false);
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
    >
      {/* Botão Principal */}
      <button
        className="bg-button px-4 py-1 flex items-center justify-between min-w-[180px] rounded-lg hover:bg-button/90 transition-colors"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center justify-center space-x-1">
          <p className="font-roboto font-normal text-white">{user}</p>
        </div>

        <div className="w-10 h-10 flex items-center justify-center rounded-full ml-3 bg-button border-2 border-primary">
          <i className="ri-user-line text-white"></i>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link
            to="/account/profile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-background/5 transition-colors group"
            onClick={() => setIsDropdownOpen(false)}
          >
            <User className="w-4 h-4 text-background group-hover:text-background" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-background">
              Meu Perfil
            </span>
          </Link>

          <div className="border-t border-gray-100"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors group"
          >
            <LogOut className="w-4 h-4 text-red-600 group-hover:text-red-700" />
            <span className="text-sm font-medium text-red-600 group-hover:text-red-700">
              Sair da Conta
            </span>
          </button>
        </div>
      )}
    </div>
  );
}