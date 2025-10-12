import { useState } from "react";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { AccountInfoSection } from "./AccountInfoSection";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    receiveOffers: true,
    acceptPrivacy: true,
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.email || !formData.username || !formData.password) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    if (!formData.acceptPrivacy) {
      alert('Você precisa aceitar a política de privacidade para continuar!');
      return;
    }

    console.log('Dados do formulário:', formData);
    alert('Conta criada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white border-4 border-background rounded p-8">
        <div className="mb-8">
          <h1 className="">CRIAR CONTA</h1>
          <p className="text-sm text-gray-600 mt-1 font-semibold">*Campos obrigatórios</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <PersonalInfoSection
            formData={{
              fullName: formData.fullName,
              phone: formData.phone,
              receiveOffers: formData.receiveOffers,
              acceptPrivacy: formData.acceptPrivacy
            }}
            onChange={handleChange}
          />

          <AccountInfoSection
            formData={{
              email: formData.email,
              username: formData.username,
              password: formData.password,
              confirmPassword: formData.confirmPassword
            }}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-background hover:bg-background/90 text-white font-bold py-3 px-12 rounded text-lg transition-colors duration-200"
          >
            CRIAR CONTA
          </button>
        </div>
      </div>
    </div>
  );
}