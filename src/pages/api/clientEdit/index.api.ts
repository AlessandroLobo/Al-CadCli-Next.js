import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient({})

export default async function handlerEdit(req: NextApiRequest, res: NextApiResponse) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id || '';

  console.log('Id vindo da requisição----', id)

  const client = await prisma.client.findUnique({
    where: {
      id: parseInt(id).toString()
    }
  })

  console.log("Dados do cliente:", client);

  res.json(client); // Envia os dados do cliente como resposta
}
