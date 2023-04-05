import { useEffect, useState } from "react";
import { ModalInfo } from "../Modal/modalInfo";
import { RegistrationEditProps } from './types';
import axios from "axios";

interface ClientData {
  name: string;
  email: string;
  phone: string;
  // Adicione outros campos, se necessário
}

async function searchClient(clientId: string): Promise<ClientData> {
  try {
    const response = await axios.post('../api/clientEdit', { clientId });
    console.log('Dados do cliente:', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function RegistrationEdit({ clientId, setModalOpen }: RegistrationEditProps) {
  const [modalOpen, setModalOpenState] = useState(true);
  const [clientData, setClientData] = useState<ClientData | null>(null);

  useEffect(() => {
    async function fetchClientData() {
      console.log('fetchClientData sendo chamada');
      try {
        const data = await searchClient(clientId);
        console.log('clientId', clientId)
        setClientData(data);
        console.log('Dados da API:', data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchClientData();
  }, [clientId]);

  return (
    <>
      <ModalInfo isOpen={modalOpen} setIsOpen={() => {
        setModalOpenState(false);
        setModalOpen(false);
      }} backDropClose={true}>
        <h1>Editar Cliente</h1>
        {clientData ? (
          <>
            <h2>Nome: {clientData.name}</h2>
            <h2>Email: {clientData.email}</h2>
            <h2>Telefone: {clientData.phone}</h2>
            {/* Adicione outros campos aqui, se necessário */}
          </>
        ) : (
          <h2>Carregando...</h2>
        )}
      </ModalInfo>
    </>
  )
}

export default RegistrationEdit;
