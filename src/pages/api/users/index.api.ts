import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).end
  }

  const { name, email, password } = req.body

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,

    }
  })


  return res.status(201).json(user)
}

