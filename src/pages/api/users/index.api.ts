import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, password } = req.body;

  try {

    const existingUserName = await prisma.user.findFirst({
      where: {
        name: name,
      },
    });

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    
    console.log(existingUser)
    
    if (existingUser || existingUserName) {
      // Retorna uma mensagem informando que o usuário já existe
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    // Cria um novo usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      // A violação de chave única ocorreu devido ao campo "email" duplicado.
      return res.status(409).json({ message: 'Usúario ou endereço de e-mail já está em uso.' });
    } else {
      // Outro erro ocorreu durante a criação do usuário.
      console.error(error);
      return res.status(500).json({ message: 'Ocorreu um erro interno do servidor.' });
    }
  }
}
