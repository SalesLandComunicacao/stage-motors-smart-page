const FIPE_BASE = "https://parallelum.com.br/fipe/api/v1/carros";

export interface FipeBrand {
  codigo: string;
  nome: string;
}

export interface FipeModel {
  codigo: number;
  nome: string;
}

export interface FipeYear {
  codigo: string;
  nome: string;
}

export interface FipePrice {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
}

export async function getBrands(): Promise<FipeBrand[]> {
  const res = await fetch(`${FIPE_BASE}/marcas`);
  if (!res.ok) throw new Error("Erro ao buscar marcas");
  return res.json();
}

export async function getModels(brandCode: string): Promise<{ modelos: FipeModel[] }> {
  const res = await fetch(`${FIPE_BASE}/marcas/${brandCode}/modelos`);
  if (!res.ok) throw new Error("Erro ao buscar modelos");
  return res.json();
}

export async function getYears(brandCode: string, modelCode: string): Promise<FipeYear[]> {
  const res = await fetch(`${FIPE_BASE}/marcas/${brandCode}/modelos/${modelCode}/anos`);
  if (!res.ok) throw new Error("Erro ao buscar anos");
  return res.json();
}

export async function getPrice(
  brandCode: string,
  modelCode: string,
  yearCode: string
): Promise<FipePrice> {
  const res = await fetch(
    `${FIPE_BASE}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
  );
  if (!res.ok) throw new Error("Erro ao buscar preço FIPE");
  return res.json();
}
