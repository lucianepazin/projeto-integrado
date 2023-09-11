import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import municipios from "./municipios.json" assert { type: "json" };

const dataEstados = [
  { codEstado: 11, nome: "Rondônia" },
  { codEstado: 12, nome: "Acre" },
  { codEstado: 13, nome: "Amazonas" },
  { codEstado: 14, nome: "Roraima" },
  { codEstado: 15, nome: "Pará" },
  { codEstado: 16, nome: "Amapá" },
  { codEstado: 17, nome: "Tocantins" },
  { codEstado: 21, nome: "Maranhão" },
  { codEstado: 22, nome: "Piauí" },
  { codEstado: 23, nome: "Ceará" },
  { codEstado: 24, nome: "Rio Grande do Norte" },
  { codEstado: 25, nome: "Paraíba" },
  { codEstado: 26, nome: "Pernambuco" },
  { codEstado: 27, nome: "Alagoas" },
  { codEstado: 28, nome: "Sergipe" },
  { codEstado: 29, nome: "Bahia" },
  { codEstado: 31, nome: "Minas Gerais" },
  { codEstado: 32, nome: "Espírito Santo" },
  { codEstado: 33, nome: "Rio de Janeiro" },
  { codEstado: 35, nome: "São Paulo" },
  { codEstado: 41, nome: "Paraná" },
  { codEstado: 42, nome: "Santa Catarina" },
  { codEstado: 43, nome: "Rio Grande do Sul" },
  { codEstado: 50, nome: "Mato Grosso do Sul" },
  { codEstado: 51, nome: "Mato Grosso" },
  { codEstado: 52, nome: "Goiás" },
  { codEstado: 53, nome: "Distrito Federal" },
];

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.usuario.upsert({
    where: { email: "pessoa@adotante.com" },
    update: {},
    create: {
      email: "pessoa@adotante.com",
      senha: await hash("123456", 10),
    },
  });
  const pessoaAdotante = await prisma.pessoaAdotante.upsert({
    where: { codUsuario: user.codUsuario },
    update: {},
    create: {
      codUsuario: user.codUsuario,
      nome: "Pessoa Adotante",
      CPF: "12345678910",
      codEndereco: 1,
      telefone: "123456789",
      celular: "123456789",
    },
  });
  const dicinarioEstado = await prisma.DicinarioEstado.createMany({
    data: dataEstados,
    skipDuplicates: true,
  });
  const dicionarioCidade = await prisma.dicionarioCidade.createMany({
    data: municipios,
    skipDuplicates: true,
  });
  console.log("Seed realizado com sucesso.");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
