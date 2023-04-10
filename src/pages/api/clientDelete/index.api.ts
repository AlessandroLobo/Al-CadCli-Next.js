import { PrismaClient, Client } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface DeleteClientData {
  id: string;
}

const prisma = new PrismaClient();

export default async function handlerDelete(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  console.log(req.method);

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data: DeleteClientData = req.body;

  console.log('Received data Update:', data);

  if (!data.id) {
    return res.status(400).json({ message: 'Cliente Id not specified' });
  }

  try {
    const deleteClient: Client = await prisma.client.delete({
      where: {
        id: data.id
      }
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting client' });
  }
}
