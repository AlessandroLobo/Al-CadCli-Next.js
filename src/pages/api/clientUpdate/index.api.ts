import { PrismaClient, Client } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface UpdateClientData {
  id: {
    id: string;
  };
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  birthdate?: string;
  phone?: string;
  gender?: string;
  zipCode?: string;
  city?: string;
  address?: string;
  number?: string;
  state?: string;
}
export default async function handlerUpdate(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data: UpdateClientData = req.body;

  console.log('Received data:', data.id.id); // adicionado

  if (!data.id) {
    return res.status(400).json({ message: 'Client ID not specified' });
  }

  try {
    const client: Client | null = await prisma.client.findUnique({
      where: {
        id: data.id.id,
      },
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const updatedClient: Client = await prisma.client.update({
      where: {
        id: data.id.id,
      },
      data: {
        name: data.name ? data.name.toUpperCase() : undefined, // Faz a validação dos dados atualizados
        cpf: data.cpf,
        email: data.email,
        password: data.password,
        birthdate: data.birthdate,
        phoneNumber: data.phone,
        gender: data.gender,
        zipCode: data.zipCode,
        city: data.city,
        address: data.address,
        addressNumber: data.number,
        state: data.state,
      },
    });

    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating client' });
  } finally {
    await prisma.$disconnect();
  }
}
