import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import dataEstados from "./estados.json" assert { type: "json" };
import municipios from "./municipios.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.usuario.upsert({
    where: { email: "pessoa@adotante.com" },
    update: {},
    create: {
      email: "pessoa@adotante.com",
      senha: await hash("123456", 10),
      habilitado: true,
    },
  });

  const dicionarioEstado = await prisma.DicionarioEstado.createMany({
    data: dataEstados,
    skipDuplicates: true,
  });
  const dicionarioCidade = await prisma.dicionarioCidade.createMany({
    data: municipios,
    skipDuplicates: true,
  });
  const endereco = await prisma.endereco.upsert({
    where: { codEndereco: 1 },
    update: {},
    create: {
      logradouro: "Rua A",
      numero: "123",
      bairro: "Bairro A",
      completemento: "Complemento A",
      CEP: "12345678",
      codCidade: 1200104,
      codEstado: 12,
    },
  });

  const pessoaAdotante = await prisma.pessoaAdotante.upsert({
    where: { codUsuario: user.codUsuario },
    update: {},
    create: {
      codUsuario: user.codUsuario,
      nome: "Pessoa Adotante",
      CPF: "67347164060",
      codEndereco: 1,
      telefone: "123456789",
      celular: "123456789",
    },
  });

  const userONG = await prisma.usuario.upsert({
    where: { email: "pessoa@ong.com" },
    update: {},
    create: {
      email: "pessoa@ong.com",
      senha: await hash("123456", 10),
      habilitado: true,
    },
  });

  const pessoaONG = await prisma.pessoaONG.upsert({
    where: { codUsuario: userONG.codUsuario },
    update: {},
    create: {
      nomeONG: "ONG 1",
      CNPJ: "97115138000178",
      nomeResp: "Pessoa ONG",
      CPFResp: "92997705061",
      telefone: "123456789",
      codEndereco: 1,
      codUsuario: userONG.codUsuario,
    },
  });

  const pet = await prisma.pet.upsert({
    where: { codPet: 1 },
    update: {},
    create: {
      tipo: "Cachorro",
      nome: "Pedro",
      dataNascimento: new Date("2021-01-01"),
      fotoUrl: "https://images.dog.ceo/breeds/tervuren/yoda_in_car.jpg",
      cor: "Preto",
      porte: "Grande",
      descricao: `Ele possui uma pelagem preta, o que lhe confere uma aparência imponente e elegante.
      Pedro pertence ao porte grande, o que significa que ele é um cão de tamanho considerável e
       pode ter uma presença imponente e majestosa.
      Ele vive em Brasiléia, uma cidade localizada no estado do Acre, Brasil. 
      Com sua pelagem escura e seu porte grande, Pedro pode ser um cão imponente e carinhoso,
       pronto para explorar a natureza exuberante da região do Acre e
       desfrutar de longas caminhadas ao ar livre com seu dono.`,
      instituicao: "ONG 1",
      telefone: "123456789",
      codCidade: 1200104,
      codEstado: 12,
    },
  });

  const petsONG = await prisma.petsONG.upsert({
    where: { codPetsONG: 1 },
    update: {},
    create: {
      codPessoaONG: pessoaONG.codPessoaONG,
      codPet: pet.codPet,
    },
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
