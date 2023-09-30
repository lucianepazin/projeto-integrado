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
      complemento: "Complemento A",
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

  const pet1 = await prisma.pet.upsert({
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

  const pet2 = await prisma.pet.upsert({
    where: { codPet: 2 },
    update: {},
    create: {
      tipo: "Cachorro",
      nome: "Chow",
      dataNascimento: new Date("2022-06-01"),
      fotoUrl: "https://images.dog.ceo/breeds/chow/n02112137_5022.jpg",
      cor: "Caramelo",
      porte: "Pequeno",
      descricao: `Chow é um cachorro muito fofinho. Adote!`,
      instituicao: "ONG 2",
      telefone: "123456789",
      codCidade: 4122503,
      codEstado: 41,
    },
  });

  const pet3 = await prisma.pet.upsert({
    where: { codPet: 3 },
    update: {},
    create: {
      tipo: "Cachorro",
      nome: "Panda",
      dataNascimento: new Date("2020-06-01"),
      fotoUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_13702.jpg",
      cor: "Misto",
      porte: "Grande",
      descricao: `O Panda é um majestoso São Bernardo, um verdadeiro gigante de pêlo macio e olhos gentis. Ele é um cachorro incrivelmente grande e robusto, com uma pelagem densa e fofa que se destaca pela sua coloração predominantemente branca, pontuada por manchas pretas e marrons distintivas, que lembram o pelagem de um panda, o que lhe confere seu nome especial.`,
      instituicao: "ONG 3",
      telefone: "123456789",
      codCidade: 4122503,
      codEstado: 41,
    },
  });

  const pet4 = await prisma.pet.upsert({
    where: { codPet: 4 },
    update: {},
    create: {
      tipo: "Cachorro",
      nome: "Tutu",
      dataNascimento: new Date("2012-08-15"),
      fotoUrl:
        "https://images.dog.ceo/breeds/retriever-golden/Z6A_4459-Edit_200808.jpg",
      cor: "Bege",
      porte: "Médio",
      descricao: `Tutu é um adorável Golden Retriever, conhecido por sua personalidade amigável e leal.`,
      instituicao: "Abrigo de Animais XYZ",
      telefone: "987654321",
      codCidade: 5201603,
      codEstado: 52,
    },
  });

  const pet5 = await prisma.pet.upsert({
    where: { codPet: 5 },
    update: {},
    create: {
      tipo: "Cachorro",
      nome: "Pudim",
      dataNascimento: new Date("2020-06-01"),
      fotoUrl:
        "https://images.dog.ceo/breeds/poodle-standard/n02113799_2504.jpg",
      cor: "Marrom",
      porte: "Médio",
      descricao: `Docinho igual pudim!`,
      instituicao: "ONG 3",
      telefone: "123456789",
      codCidade: 4122503,
      codEstado: 41,
    },
  });

  const pet6 = await prisma.pet.upsert({
    where: { codPet: 6 },
    update: {},
    create: {
      tipo: "Cachorro",
      nome: "Luna",
      dataNascimento: new Date("2017-04-10"),
      fotoUrl: "https://images.dog.ceo/breeds/husky/n02110185_5871.jpg",
      cor: "Branco e Cinza",
      porte: "Médio",
      descricao: `Luna é uma Husky Siberiana, conhecida por sua pelagem espessa e olhos azuis hipnotizantes.`,
      instituicao: "Associação de Proteção Animal ABC",
      telefone: "51989892020",
      codCidade: 5222054,
      codEstado: 52,
    },
  });

  const pet1ONG = await prisma.petsONG.upsert({
    where: { codPetsONG: 1 },
    update: {},
    create: {
      codPessoaONG: pessoaONG.codPessoaONG,
      codPet: pet1.codPet,
    },
  });
  const pet2ONG = await prisma.petsONG.upsert({
    where: { codPetsONG: 2 },
    update: {},
    create: {
      codPessoaONG: pessoaONG.codPessoaONG,
      codPet: pet2.codPet,
    },
  });
  const pet3ONG = await prisma.petsONG.upsert({
    where: { codPetsONG: 3 },
    update: {},
    create: {
      codPessoaONG: pessoaONG.codPessoaONG,
      codPet: pet3.codPet,
    },
  });
  const pet4ONG = await prisma.petsONG.upsert({
    where: { codPetsONG: 4 },
    update: {},
    create: {
      codPessoaONG: pessoaONG.codPessoaONG,
      codPet: pet4.codPet,
    },
  });
  const pet5ONG = await prisma.petsONG.upsert({
    where: { codPetsONG: 5 },
    update: {},
    create: {
      codPessoaONG: pessoaONG.codPessoaONG,
      codPet: pet5.codPet,
    },
  });
  const pet6ONG = await prisma.petsONG.upsert({
    where: { codPetsONG: 6 },
    update: {},
    create: {
      codPessoaONG: pessoaONG.codPessoaONG,
      codPet: pet6.codPet,
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
