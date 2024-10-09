'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { CadastrosRequestDTO, CadastrosResponseDTO, ProcessoRequestDTO, ProcessoResponseDTO } from "@/types/cadastros/cadastros.dto";
import { getServerSession } from "next-auth";

const cadastros_api_url: string = 'http://localhost:3000/cadastros';
const processos_api_url: string = 'http://localhost:3000/processos';

// cadastros
export const createCadastro = async (
  request: CadastrosRequestDTO
): Promise<CadastrosResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${cadastros_api_url}/criar-cadastro`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    },
    body: JSON.stringify({ ...request })
  });
  if (response.status != 201) throw new Error('erro ao tentar registrar o cadastro');
  const data: CadastrosResponseDTO = await response.json();
  return data;
};

export const getAllCadastros = async (
  limit: number = 10, offset: number = 0, orderBy: string = '', order: string = ''
): Promise<CadastrosResponseDTO[]> => {
  const session = await getServerSession(authOptions);
  const request_url: string = `${cadastros_api_url}/buscar-cadastros?limit=${limit}&offset=${offset}&orderBy=${orderBy}&order=${order}`;
  const response: Response = await fetch(request_url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) throw new Error('erro ao tentar buscar os cadastros');
  const data: CadastrosResponseDTO[] = await response.json();
  return data;
};

export const getOneCadastro = async (id: string): Promise<CadastrosResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${cadastros_api_url}/buscar-cadastro/${id}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) throw new Error('erro ao tentar buscar o cadastro');
  const data: CadastrosResponseDTO = await response.json();
  return data;
};

export const deleteCadastro = async (id: string): Promise<CadastrosResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${cadastros_api_url}/excluir-cadastro/${id}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${session?.access_token}`
    },
  });
  if (response.status != 200) throw new Error('erro ao tentar excluir o cadastro');
  const data: CadastrosResponseDTO = await response.json();
  return data;
};

// processos
export const createProcesso = async (
  request: ProcessoRequestDTO
): Promise<ProcessoResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${processos_api_url}/criar-processo`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    },
    body: JSON.stringify({ ...request })
  });
  console.log(response);
  if (response.status != 201) throw new Error('erro ao tentar registrar o cadastro');
  const data: ProcessoResponseDTO = await response.json();
  return data;
};

export const getAllProcessos = async (
  limit: number = 10, offset: number = 0, orderBy: string = '', order: string = ''
): Promise<ProcessoResponseDTO[]> => {
  const session = await getServerSession(authOptions);
  const request_url: string = `${processos_api_url}/buscar-processos?limit=${limit}&offset=${offset}&orderBy=${orderBy}&order=${order}`;
  const response: Response = await fetch(request_url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) throw new Error('erro ao tentar buscar os cadastros');
  const data: ProcessoResponseDTO[] = await response.json();
  return data;
};

export const getOneProcesso = async (id: string): Promise<ProcessoResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${processos_api_url}/buscar-processo/${id}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) throw new Error('erro ao tentar buscar o cadastro');
  const data: ProcessoResponseDTO = await response.json();
  return data;
};

export const updateProcesso = async (
  id: string, request: Partial<ProcessoRequestDTO>
): Promise<ProcessoResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${processos_api_url}/atualizar-processo/${id}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    },
    body: JSON.stringify({ ...request })
  });
  if (response.status != 200) throw new Error('erro ao tentar atualizar a prospecção');
  const data: ProcessoResponseDTO = await response.json();
  return data;
};

export const deleteProcesso = async (id: string): Promise<ProcessoResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${processos_api_url}/excluir-processo/${id}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${session?.access_token}`
    },
  });
  if (response.status != 200) throw new Error('erro ao tentar excluir o cadastro');
  const data: ProcessoResponseDTO = await response.json();
  return data;
};
