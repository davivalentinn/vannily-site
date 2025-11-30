import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { AccountInfoSection } from "./AccountInfoSection";
import { register } from "../../../../services/register-service";
import { useAuth } from "../../../../context/authContext";

interface FormData {
  fullName: string;
  phone: string;
  receiveOffers: boolean;
  acceptPrivacy: boolean;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  receiveOffers: true,
  acceptPrivacy: true,
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Apenas desloga, sem limpar storage manualmente
    logout();
  }, [logout]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) {
      return "Nome completo é obrigatório";
    }

    if (!formData.phone.trim()) {
      return "Telefone é obrigatório";
    }

    if (!formData.email.trim()) {
      return "Email é obrigatório";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Email inválido";
    }

    if (!formData.username.trim()) {
      return "Usuário é obrigatório";
    }

    if (formData.username.length < 3) {
      return "Usuário deve ter no mínimo 3 caracteres";
    }

    if (!formData.password) {
      return "Senha é obrigatória";
    }

    if (formData.password.length < 6) {
      return "Senha deve ter no mínimo 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      return "As senhas não coincidem";
    }

    if (!formData.acceptPrivacy) {
      return "Você precisa aceitar a política de privacidade";
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
      await register({
        nome: formData.fullName,
        numeroTelefone: formData.phone,
        email: formData.email,
        usuario: formData.username,
        senha: formData.password,
        tipoUsuario: "CLIENTE",
      });

      navigate("/account/login", {
        state: { message: "Conta criada com sucesso! Faça login para continuar." },
      });
    } catch (err: any) {
      console.error("Erro ao criar conta:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Erro ao criar conta. Tente novamente.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white border-4 border-background rounded p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">CRIAR CONTA</h1>
          <p className="text-sm text-gray-600 mt-1 font-semibold">
            *Campos obrigatórios
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <PersonalInfoSection
            formData={{
              fullName: formData.fullName,
              phone: formData.phone,
              receiveOffers: formData.receiveOffers,
              acceptPrivacy: formData.acceptPrivacy,
            }}
            onChange={handleChange}
          />

          <AccountInfoSection
            formData={{
              email: formData.email,
              username: formData.username,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-background hover:bg-background/90 text-white font-bold py-3 px-12 rounded text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
          </button>
        </div>
      </div>
    </div>
  );
}