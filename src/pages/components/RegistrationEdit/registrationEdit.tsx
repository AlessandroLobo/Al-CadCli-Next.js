import { useEffect, useState } from "react";
import { ModalInfo } from "../Modal/modalInfo";
import { RegistrationEditProps } from './types';
import axios from "axios";

async function searchClient(searchTerm: string): Promise<any> {
  try {
    const response = await axios.get('/api/clientEdit', {
      params: {
        search: searchTerm,
      },
    });

    console.log('Dados do cliente:', response.data); // Adicionando o console.log aqui

    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export function RegistrationEdit({ clientId, setModalOpen }: RegistrationEditProps) {
  const [modalOpen, setModalOpenState] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  console.log('*************', clientId)

  useEffect(() => {
    console.log('useEffect sendo chamado');

    async function fetchSearchResults() {
      console.log('fetchSearchResults sendo chamada'); // Adicionando o console.log aqui
      const results = await searchClient(clientId.toString());
      setSearchResults(results);
      console.log('Dados da API:', results); // Adicionando o console.log aqui
    }

    fetchSearchResults();
  }, [clientId]);

  return (
    <>
      <ModalInfo isOpen={modalOpen} setIsOpen={() => {
        setModalOpenState(false);
        setModalOpen(false);
      }} backDropClose={true}>
        <h1>Editar Cliente</h1>
        <h1>{clientId}</h1>
        {/* Adicione outros campos aqui, se necessário */}
      </ModalInfo>
    </>
  )
}

export default RegistrationEdit;
