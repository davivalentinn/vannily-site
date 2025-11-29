import { useAuth } from "../../../../context/authContext";
import { Link } from "react-router-dom";

export function UserLoggedHeader() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link
      to="/account/profile"
      className="bg-button px-4 py-1 flex items-center justify-center rounded-lg text-white/90 font-semibold min-w-[180px]"
    >
      {user}
    </Link>
  );
  
}
