import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        userOrEmail: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!formData.userOrEmail || !formData.password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        console.log('Dados de login:', formData);
        alert('Login realizado com sucesso!');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className=" bg-gray-50 flex items-center justify-center py-8 px-4">
            <div className="w-full max-w-5xl bg-white border-4 border-background rounded p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">ENTRAR NA CONTA</h1>
                </div>

                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
                        ENTRAR NA MINHA CONTA
                    </h2>

                    <div className="space-y-6">
                        <div className='grid md:grid-cols-2 gap-12'>
                            <div className="relative">
                                <input
                                    className="peer px-4 py-3 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
                                    type="text"
                                    id="userOrEmail"
                                    value={formData.userOrEmail}
                                    onChange={(e) => handleChange('userOrEmail', e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Usuario ou Email"
                                    required
                                />
                                <label
                                    className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
                                    htmlFor="userOrEmail"
                                >
                                    Usuario ou Email
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    className="peer px-4 py-3 pr-12 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Digite sua senha"
                                    required
                                />
                                <label
                                    className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
                                    htmlFor="password"
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