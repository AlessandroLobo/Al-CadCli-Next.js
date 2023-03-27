import { useState } from "react"

interface Genres {
  id: number
  value: string;
  label: string;
}

export const useGenres = () => {
  const [genres, setGenres] = useState([
    { id: 0, value: '', label: '' },
    { id: 1, value: 'masculino', label: 'Masculino' },
    { id: 2, value: 'feminino', label: 'Feminino' },
    { id: 3, value: 'nao-binario', label: 'Não-binário' },
    { id: 4, value: 'agenero', label: 'Agênero' },
    { id: 5, value: 'genderqueer', label: 'Genderqueer' },
    { id: 6, value: 'transgenero', label: 'Transgênero' },
    { id: 7, value: 'outro', label: 'Outro' },
    { id: 8, value: 'prefiro-nao-dizer', label: 'Prefiro não dizer' },
  ]);

  return genres;
};
