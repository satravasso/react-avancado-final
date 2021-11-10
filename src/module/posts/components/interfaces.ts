export interface dataEntrega {
  nome: string;
  cpf: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface dataPagamento {
  nome: string;
  numero: string;
  data: Date;
  cvv: string;
}
