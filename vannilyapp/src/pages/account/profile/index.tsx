import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  HeadphonesIcon, 
  Heart,
  Settings,
  Camera,
  LogOut,
  AlertCircle
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, userId } = useAuth();
  const [userData, setUserData] = useState({
    id: 0,
    nome: "",
    email: "",
    usuario: "",
    sobrenome: "",
    tipoUsuario: "",
    avatar: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState("");
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account/login");
      return;
    }

    const idFromStorage = localStorage.getItem("userId");
    const id = idFromStorage ? parseInt(idFromStorage) : (userId ? parseInt(userId.toString()) : 0);
    const nome = localStorage.getItem("nome") || "Usuário";
    const email = localStorage.getItem("email") || "";
    const tipoUsuario = localStorage.getItem("tipoUsuario") || localStorage.getItem("role") || "";
    const usuario = localStorage.getItem("usuario") || "";
    const sobrenome = localStorage.getItem("sobrenome") || "";
    const avatar = localStorage.getItem("avatar") || "";

    console.log("DADOS CARREGADOS DO LOCALSTORAGE:");
    console.log("ID:", id);
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Tipo Usuário:", tipoUsuario);
    console.log("Usuário (apelido):", usuario);
    console.log("Sobrenome:", sobrenome);
    console.log("Avatar:", avatar);

    setUserData({ 
      id, 
      nome, 
      email, 
      usuario,
      sobrenome,
      tipoUsuario,
      avatar 
    });
    setEditedUsuario(usuario);
  }, [isAuthenticated, userId, navigate]);

  function handleLogout() {
    logout();
    navigate("/account/login");
  }

  function handleSaveData() {
    // Salvar apelido editado no localStorage
    localStorage.setItem("usuario", editedUsuario);
    setUserData(prev => ({ ...prev, usuario: editedUsuario }));
    setIsEditing(false);
    alert("Dados alterados com sucesso!");
  }

  const menuItems = [
    {
      title: "MINHAS COMPRAS",
      icon: ShoppingBag,
      description: "Compras realizadas, o que, onde e quando.",
      link: "/cart",
      badge: null
    },
    {
      title: "ENDEREÇO",
      icon: MapPin,
      description: "Meus endereços dos meus pedidos.",
      link: "/perfil/enderecos",
      badge: "0"
    },
    {
      title: "PAGAMENTOS",
      icon: CreditCard,
      description: "Verifique seus pagamentos, contas e bancos",
      link: "/perfil/pagamentos",
      badge: "0"
    },
    {
      title: "CONFIGURAÇÕES",
      icon: Settings,
      description: "Altere idioma, tamanho da letra, e sua segurança",
      link: "/perfil/configuracoes",
      badge: null
    },
    {
      title: "ATENDIMENTO AO CLIENTE",
      icon: HeadphonesIcon,
      description: "Explorar opções de atendimento e Fale conosco",
      link: "/suporte",
      badge: null
    },
    {
      title: "MEUS FAVORITOS",
      icon: Heart,
      description: "Veja sua lista de produtos favoritados no momento!",
      link: "/favorites",
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Debug Info */}
        {(!userData.nome || !userData.email || userData.nome === "Usuário") && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-yellow-800 mb-2">⚠️ Dados não carregados</h3>
                <p className="text-sm text-yellow-700 mb-3">
                  Parece que os dados do usuário não foram carregados corretamente do localStorage.
                </p>
                <button 
                  onClick={() => setShowDebug(!showDebug)}
                  className="text-sm underline text-yellow-800 font-semibold"
                >
                  {showDebug ? "Ocultar" : "Ver"} informações de debug
                </button>
                
                {showDebug && (
                  <div className="mt-3 bg-white border border-yellow-200 rounded p-3 text-xs font-mono">
                    <p><strong>localStorage.userId:</strong> {localStorage.getItem("userId") || "❌ null"}</p>
                    <p><strong>localStorage.nome:</strong> {localStorage.getItem("nome") || "❌ null"}</p>
                    <p><strong>localStorage.email:</strong> {localStorage.getItem("email") || "❌ null"}</p>
                    <p><strong>localStorage.usuario:</strong> {localStorage.getItem("usuario") || "❌ null"}</p>
                    <p><strong>localStorage.tipoUsuario:</strong> {localStorage.getItem("tipoUsuario") || "❌ null"}</p>
                    <p><strong>localStorage.token:</strong> {localStorage.getItem("token") ? "✅ Existe" : "❌ null"}</p>
                    <hr className="my-2" />
                    <p><strong>userData.nome:</strong> {userData.nome}</p>
                    <p><strong>userData.email:</strong> {userData.email}</p>
                    <p><strong>userData.usuario:</strong> {userData.usuario}</p>
                    <p><strong>userData.id:</strong> {userData.id}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Seção de Dados Pessoais */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-background">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-8 bg-background rounded"></div>
            DADOS PESSOAIS
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-background/30 overflow-hidden bg-gradient-to-br from-background/10 to-background/20 flex items-center justify-center">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-background/60" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-background text-white p-2 rounded-full shadow-lg hover:bg-background/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Informações do Usuário */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {userData.nome || "Nome não encontrado"}
                  {userData.usuario && (
                    <span className="text-background"> (@{userData.usuario})</span>
                  )}
                </h3>
                {userData.tipoUsuario && (
                  <span className="px-3 py-1 bg-background/10 text-background text-xs font-bold rounded-full">
                    {userData.tipoUsuario}
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Insira o seu apelido: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Digite seu apelido/usuário"
                    value={editedUsuario}
                    onChange={(e) => {
                      setEditedUsuario(e.target.value);
                      setIsEditing(true);
                    }}
                    className="w-full px-4 py-2 border-2 border-background/30 rounded-lg focus:outline-none focus:border-background"
                  />
                  {userData.usuario && (
                    <p className="text-xs text-gray-500 mt-1">
                      Apelido atual: <strong>@{userData.usuario}</strong>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData.email || "Email não encontrado"}
                    disabled
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleSaveData}
                  disabled={!isEditing}
                  className="px-6 py-2 bg-background text-white rounded-lg font-semibold hover:bg-background/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Alterar meus Dados
                  <span className="text-yellow-300">🔒</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2 border-2 border-background text-background rounded-lg font-semibold hover:bg-background/5 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair da Conta
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Menu */}
        <div className="grid md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white rounded-lg shadow-md p-6 border-2 border-background/20 hover:border-background hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-background/10 p-3 rounded-lg group-hover:bg-background/20 transition-colors">
                  <item.icon className="w-6 h-6 text-background" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-800 text-sm">
                      {item.title}
                    </h3>
                    {item.badge !== null && (
                      <span className="bg-background text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Histórico de Compras */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8 border-2 border-background/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-8 bg-background rounded"></div>
              HISTÓRICO
            </h2>
            <span className="text-background font-semibold">01 - 05</span>
          </div>

          {/* Histórico de produtos */}
          <div className="text-center text-gray-500 py-8">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma compra realizada ainda</p>
            {userData.id > 0 && (
              <p className="text-sm mt-2">ID do Usuário: {userData.id}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}