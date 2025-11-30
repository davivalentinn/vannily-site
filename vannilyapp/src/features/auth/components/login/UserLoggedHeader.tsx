import { useAuth } from "../../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export function UserLoggedHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    // ❌ NÃO LIMPA localStorage.clear() (isso apagava coisas indevidas)
    // Apenas chama o logout do contexto (que já remove token e usuário)
    logout();

    // Redireciona corretamente
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/account/profile"
        className="bg-button px-4 py-1 flex items-center justify-center rounded-lg text-white/90 font-semibold min-w-[180px] hover:bg-button/90 transition-colors"
      >
        {user}
      </Link>
    </div>
  );
}
