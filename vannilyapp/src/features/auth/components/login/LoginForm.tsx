import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login as loginService } from "../../../../services/login-service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null); 
  };

  const validateForm = (): string | null => {
    if (!formData.username.trim()) {
      return "Por favor, digite seu usuário ou email";
    }
    if (!formData.password) {
      return "Por favor, digite sua senha";
    }
    return null;
  };

  const handleSubmit = async () => {
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Limpa qualquer lixo de sessão antiga
      localStorage.clear();

      // Chamar serviço de login
      const response = await loginService({
        email: formData.username,
        senha: formData.password,
      });

      console.log("✅ LOGIN RESPONSE:", response);

      // ⭐ CORREÇÃO: Passar TODOS os 5 parâmetros
      login(
        response.token,      // 1. token
        response.nome,       // 2. nome
        response.id,         // 3. id
        response.email,      // 4. email ⬅️ ESTAVA FALTANDO
        response.tipoUsuario // 5. tipoUsuario ⬅️ ESTAVA FALTANDO
      );

      console.log("✅ Dados salvos no localStorage:");
      console.log("- token:", localStorage.getItem("token") ? "✅" : "❌");
      console.log("- nome:", localStorage.getItem("nome"));
      console.log("- userId:", localStorage.getItem("userId"));
      console.log("- email:", localStorage.getItem("email"));
      console.log("- tipoUsuario:", localStorage.getItem("tipoUsuario"));

      // Redirecionar para home
      navigate("/");
    } catch (err: any) {
      console.error("❌ Erro ao fazer login:", err);
      setError(err.response?.data?.message || "Usuário ou senha inválidos");
    } finally {
      setIsLoading(false);
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
              {error}
            </div>
          )}

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
                  disabled={isLoading}
                />
                <label
                  htmlFor="username"
                  className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
                >
                  Usuário ou Email
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-background hover:bg-background/90 text-white font-bold py-3 px-16 rounded text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "ENTRANDO..." : "ENTRAR"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}