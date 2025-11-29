import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

export default function Profile() {
  const navigate = useNavigate();
  const { setToken, setUser, user } = useAuth(); // pega o contexto

  function logout() {
    setToken(null);  // limpa o estado global
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");
    localStorage.removeItem("tipo_usuario");

    navigate("/account/login");
  }

  if (!user) {
    return <p>Não autenticado</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
      <p><b>Nome:</b> {user}</p>
      <p><b>Email:</b> {localStorage.getItem("email")}</p>

      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
