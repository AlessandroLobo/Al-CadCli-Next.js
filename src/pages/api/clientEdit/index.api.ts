import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient({})

export default async function handlerEdit(req: NextApiRequest, res: NextApiResponse) {
  const { clientId } = req.body;

  console.log('Id vindo da requisição:', clientId);

  const client = await prisma.client.findUnique({
    where: {
      id: clientId
    }
  })

  console.log("Dados do cliente:", client);

  res.status(200).json(client);
}
