// src/components/LoginModal/LoginModal.tsx
import React from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose,
  message = "Você precisa estar logado para realizar esta ação."
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate('/account/login');
  };

  const handleRegister = () => {
    onClose();
    navigate('/account/register');
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-bar to-background p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Login Necessário</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-600 text-center text-lg">
            {message}
          </p>

          <div className="space-y-3">
            <Button
              variant="button"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleLogin}
            >
              <LogIn className="w-5 h-5" />
              Fazer Login
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center gap-2 border-2 border-bar text-bar hover:bg-bar hover:text-white transition-colors"
              onClick={handleRegister}
            >
              <UserPlus className="w-5 h-5" />
              Criar Conta
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
            >
              Continuar navegando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;