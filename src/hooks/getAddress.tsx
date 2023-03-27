import axios from 'axios';

interface AddressInfo {
  city: string;
  address: string;
  state: string;
}

export const getAddress = async (zipCode: string): Promise<AddressInfo | null> => {
  try {
    // Faz uma requisição GET para a API do BrasilAPI usando o CEP informado pelo usuário
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${zipCode}`);

    // Retorna as informações de endereço
    return {
      city: response.data.city,
      address: `${response.data.street}`,
      state: response.data.state,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
