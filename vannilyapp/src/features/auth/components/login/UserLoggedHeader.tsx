import { useAuth } from "../../../../context/authContext";
import { Link } from "react-router-dom";

export function UserLoggedHeader() {
  const { user } = useAuth();

  return (
    <Link
      to="/perfil"
      className="bg-button px-4 py-1 flex items-center justify-center rounded-lg text-white/90 font-semibold min-w-[180px]"
    >
      {user}
    </Link>
  );
}
