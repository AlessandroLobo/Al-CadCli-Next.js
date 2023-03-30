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

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

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
}
