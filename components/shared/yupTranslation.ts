import * as yup from "yup";

export const mixed = {
  default: "O campo é inválido.",
  required: "O campo é obrigatório.",
  oneOf: "Deve ter um dos seguintes valores: ${values}.",
  notOneOf: "Não deve ter nenhum dos seguintes valores: ${values}.",
  notType: "O campo é inválido.",
  defined: "Não deve ser indefinido.",
};

export const string = {
  length: ({ length }: any) =>
    `Deve ter exatamente ${length} ${
      length === 1 ? "caractere" : "caracteres"
    }.`,
  min: ({ min }: any) =>
    `Deve ter pelo menos ${min} ${min === 1 ? "caractere" : "caracteres"}.`,
  max: ({ max }: any) =>
    `Deve ter no máximo ${max} ${max === 1 ? "caractere" : "caracteres"}.`,
  matches: 'Deve corresponder ao padrão: "${regex}".',
  email: "Email inválido.",
  url: "URL inválida.",
  trim: "Não deve conter espaços adicionais no início nem no fim.",
  lowercase: "Deve estar em letras minúsculas.",
  uppercase: "Deve estar em letras maiúsculas.",
};

export const number = {
  min: "Deve ser maior ou igual a ${min}.",
  max: "Deve ser menor ou igual a ${max}.",
  lessThan: "Deve ser menor que ${less}.",
  moreThan: "Deve ser maior que ${more}.",
  notEqual: "Não deve ser igual a ${notEqual}.",
  positive: "Deve ser um número positivo.",
  negative: "Deve ser um número negativo.",
  integer: "Deve ser um número inteiro.",
};

export const date = {
  min: "Data inválida.",
  max: "Data inválida.",
};

export const boolean = {};

export const object = {
  noUnknown: "Existem chaves desconhecidas: ${unknown}.",
};

export const array = {
  min: ({ min }: any) =>
    `Deve ter pelo menos ${min} ${min === 1 ? "item" : "itens"}.`,
  max: ({ max }: any) =>
    `Deve ter no máximo ${max} ${max === 1 ? "item" : "itens"}.`,
};

yup.setLocale({
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
});

export default yup;
