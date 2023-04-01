import { PrismaClient } from "@prisma/client";
import { id } from "date-fns/locale";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient({})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const search = typeof req.query.search === 'string' ? req.query.search : '';

  const session = await getSession({ req })

  const userDb = session?.user?.name; // obtém o ID do usuário da sessão

  const userLogado = await prisma.user.findFirst({
    where: {
      name: { equals: userDb },
    },
  });

  const users = await prisma.client.findMany({
    where: {
      AND: [
        {
          OR: [{ name: { contains: search } },
          { cpf: { contains: search } }]
        },
        { userId: { equals: userLogado?.id } }
      ]
    }
  });


  res.status(200).json(users);
}
