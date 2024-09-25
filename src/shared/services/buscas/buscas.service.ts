'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { ImovelResponseDto, ProcessoResponseDTO } from "@/types/cadastros/cadastros.dto"
import { VistoriaResponseDTO } from "@/types/vistorias/vistorias.dto"
import { getServerSession } from "next-auth";

export const buscarPorId = async (
  model: string, query: string
): Promise<VistoriaResponseDTO | ProcessoResponseDTO | ImovelResponseDto> => {
  const session = await getServerSession(authOptions);
  const url: string = `http://localhost:3000/buscas/buscar-por-id?model=${model}&query=${query}`;
  const response: Response = await fetch(url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status !== 200) throw new Error('Erro ao buscar a query');
  const data: VistoriaResponseDTO | ProcessoResponseDTO | ImovelResponseDto = await response.json();
  return data;
}
