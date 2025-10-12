import React, { useState } from 'react';

// PersonalInfoSection.tsx
interface PersonalInfoSectionProps {
  formData: {
    fullName: string;
    phone: string;
    receiveOffers: boolean;
    acceptPrivacy: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
}

export function PersonalInfoSection({ formData, onChange }: PersonalInfoSectionProps) {
  return (
    <section className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">INFORMAÇÕES PESSOAIS</h2>

      <div className="relative mb-5">
        <input
          className="peer px-4 py-3 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="Nome completo"
          required
        />
        <label
          className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
          htmlFor="fullName"
        >
          *Nome completo
        </label>
      </div>

      <div className="relative mb-5">
        <input
          className="peer px-4 py-3 text-gray-800 border-2 border-gray-400 rounded w-full focus:outline-none focus:border-background placeholder-transparent"
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="DDD e número de celular"
          required
        />
        <label
          className="absolute left-3 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-background"
          htmlFor="phone"
        >
          *DDD e número de celular
        </label>
      </div>

      <div className="flex items-start mb-4">
        <input
          type="checkbox"
          id="receiveOffers"
          checked={formData.receiveOffers}
          onChange={(e) => onChange('receiveOffers', e.target.checked)}
          className="w-5 h-5 mt-0.5 accent-background cursor-pointer flex-shrink-0"
        />
        <label htmlFor="receiveOffers" className="ml-3 text-sm text-gray-700 cursor-pointer">
          Quero receber <strong>ofertas</strong> e <strong>novidades</strong> da loja Vinnaly por <strong>e-mail</strong>
        </label>
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="acceptPrivacy"
          checked={formData.acceptPrivacy}
          onChange={(e) => onChange('acceptPrivacy', e.target.checked)}
          className="w-5 h-5 mt-0.5 accent-background cursor-pointer flex-shrink-0"
          required
        />
        <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-700 cursor-pointer">
          Concordo com o uso dos meus dados para compra e experiência no site conforme a{' '}
          <strong>Política de privacidade</strong>
        </label>
      </div>
    </section>
  );
}