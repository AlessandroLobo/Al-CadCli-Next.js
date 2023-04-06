import { useState } from "react"

interface Genders {
  id: number
  value: string;
  label: string;
}

export const useGenders = () => {
  const [genders, setGenders] = useState([
    { id: 0, value: '', label: '' },
    { id: 1, value: 'Nasculino', label: 'Masculino' },
    { id: 2, value: 'Feminino', label: 'Feminino' },
    { id: 3, value: 'Nao-binario', label: 'Não-binário' },
    { id: 4, value: 'Agenero', label: 'Agênero' },
    { id: 5, value: 'Genderqueer', label: 'Genderqueer' },
    { id: 6, value: 'Transgenero', label: 'Transgênero' },
    { id: 7, value: 'Outro', label: 'Outro' },
    { id: 8, value: 'Prefiro-nao-dizer', label: 'Prefiro não dizer' },
  ]);

  return genders;
};
