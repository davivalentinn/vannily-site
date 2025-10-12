import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
interface AccountInfoSectionProps {
  formData: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AccountInfoSection({ formData, onChange }: AccountInfoSectionProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">SOBRE SUA CONTA</h2>

      <div className="relative mb-5">
        <input
          className="peer px-4 py-3 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="Seu email"
          required
        />
        <label
          className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
          htmlFor="email"
        >
          *Seu email
        </label>
      </div>

      <div className="relative mb-5">
        <input
          className="peer px-4 py-3 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => onChange('username', e.target.value)}
          placeholder="Crie um usuário"
          required
        />
        <label
          className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
          htmlFor="username"
        >
          *Crie um usuário
        </label>
      </div>

      <div className="relative mb-5">
        <input
          className="peer px-4 py-3 pr-12 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-backgroundplaceholder-transparent"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={formData.password}
          onChange={(e) => onChange('password', e.target.value)}
          placeholder="Crie uma senha"
          required
        />
        <label
          className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
          htmlFor="password"
        >
          Crie uma senha
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="relative mb-5">
        <input
          className="peer px-4 py-3 pr-12 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => onChange('confirmPassword', e.target.value)}
          placeholder="Confirmar senha"
          required
        />
        <label
          className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
          htmlFor="confirmPassword"
        >
          Confirmar senha
        </label>
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </section>
  );
}
