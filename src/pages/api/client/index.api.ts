import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({})

interface UserName {
  id?: string,
  name?: string | null,
  email?: string | null,
  image?: string | null,
}

interface Data {
  id?: string,
  name: string,
  cpf: string,
  email: string,
  password: string,
  birthdate: string,
  phone: string,
  gender: string,
  zipCode: string,
  city: string,
  address: string,
  number: string,
  state: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  console.log('Chamada para a função handler de atualização de cliente recebida.');

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  if (req.method === 'POST') {
    const birthdateObj = new Date('1974-09-30T00:00:00Z');
    // Agora `birthdateObj` contém uma data válida no formato ISO 8601

    const { name, cpf, email, password, birthdate, phone, gender, zipCode, city, address, number, state }: Data = req.body;

    const userName = session.user!.name

    try {
      const existingUserName = await prisma.user.findFirst({
        where: {
          name: userName,
        },
      });

      const userNameId = existingUserName?.id

      const existingCpf = await prisma.client.findFirst({
        where: {
          cpf: cpf,
        },
      });

      // const dbCpf = existingCpf?.cpf
      // console.log(dbCpf)
      console.log(cpf)

      if (existingCpf) {
        return res.status(409).json({ message: 'Cpf já cadastrado' })
      }

      if (!existingUserName) {
        return res.status(401).json({ message: 'User not found' })
      }

      const client = await prisma.client.create({
        data: {
          name,
          cpf,
          email,
          password,
          birthdate: birthdateObj, // Use o objeto de data criado anteriormente
          phoneNumber: phone,
          gender,
          zipCode,
          city,
          address,
          addressNumber: number,
          state,
          user: {
            connect: {
              id: userNameId ?? undefined
            }
          }
        }
      })
      return res.status(201).json(client)
    } catch (error) {
      console.error(error)
      return res.status(500).end()
    }
  } else if (req.method === 'PUT') {
    const { id, name, cpf, email, password, birthdate, phone, gender, zipCode, city, address, number, state }: Data = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID do cliente não especificado' });
    }

    try {
      const existingClient = await prisma.client.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingClient) {
        return res.status(404).json({ message: 'Cliente não encontrado' })
      }

      const updatedClient = await prisma.client.update({
        where: { id: id },
        data: {
          name: name,
          cpf: cpf,
          email: email,
          password: password,
          birthdate: birthdate,
          phoneNumber: phone,
          gender: gender,
          zipCode: zipCode,
          city: city,
          address: address,
          addressNumber: number,
          state: state
        }
      })

      return res.status(200).json(updatedClient)
    } catch (error) {
      console.error(error)
      return res.status(500).end()
    }
  } else {
    return res.status(405).end()
  }
}
