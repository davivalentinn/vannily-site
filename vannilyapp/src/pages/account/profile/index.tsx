import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

export default function Profile() {
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // usando apenas funções reais do contexto

  function handleLogout() {
    logout(); // já limpa token + usuário + localStorage corretamente
    navigate("/account/login"); // redireciona após logout
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
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
