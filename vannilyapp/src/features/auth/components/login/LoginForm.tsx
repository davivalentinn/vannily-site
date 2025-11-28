import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../../../../services/login-service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await login({
        email: formData.username,
        senha: formData.password,
      });

      setToken(response.token);
      setUser(response.nome);

      navigate("/"); 
    } catch (error) {
      alert("Usuário ou senha inválidos");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-5xl bg-white border-4 border-background rounded p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ENTRAR NA CONTA</h1>
        </div>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
            ENTRAR NA MINHA CONTA
          </h2>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative">
                <input
                  className="peer px-4 py-3 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Usuário"
                />
                <label
                  htmlFor="username"
                  className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
                >
                  Usuário
                </label>
              </div>

              <div className="relative">
                <input
                  className="peer px-4 py-3 pr-12 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua senha"
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
                >
                  Digite sua senha
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                className="bg-background hover:bg-background/90 text-white font-bold py-3 px-16 rounded text-lg transition-colors duration-200"
              >
                ENTRAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
