'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession, Session } from "next-auth";

import { UsuariosPaginadoResponseDTO, UsuariosRequestDTO, UsuariosResponseDTO } from "@/types/usuarios/usuarios.dto";
import { signOut } from "next-auth/react";

async function Logout() {
  await signOut({ redirect: false });
  window.location.href = '/login';
}

const api_url: string = 'http://localhost:3000/usuarios';

export const createUsuario = async (request: UsuariosRequestDTO): Promise<UsuariosResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${api_url}/criar`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
  },
  body: JSON.stringify({ ...request })
  });
  if (response.status != 201) {
    Logout();
    throw new Error('erro ao tentar registrar o usuário');
  };
  const data: UsuariosResponseDTO = await response.json();
  return data;
};

export const getAllUsuarios = async (
    limit: number = 10, offset: number = 0, orderBy: string = '', order: string = ''
): Promise<UsuariosPaginadoResponseDTO> => {
  const session = await getServerSession(authOptions);
  const request_url: string = `${api_url}/buscar-tudo?limit=${limit}&offset=${offset}&orderBy=${orderBy}&order=${order}`;
  const response: Response = await fetch(request_url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) {
    Logout();
    throw new Error('erro ao tentar buscar os usuários');
  }
  const data: UsuariosPaginadoResponseDTO = await response.json();
  return data;
};

export const getOneUsuario = async (id: string): Promise<UsuariosResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${api_url}/buscar-por-id/${id}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) {
    Logout();
    throw new Error('erro ao tentar buscar o usuário');
  }
  const data: UsuariosResponseDTO = await response.json();
  return data;
};

export const listaCompletaUsuarios = async (): Promise<UsuariosResponseDTO[]> => {
  const session = await getServerSession(authOptions);
  const request_url: string = `${api_url}/lista-completa`;
  const response: Response = await fetch(request_url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) {
    Logout();
    throw new Error('erro ao tentar buscar lista completa de usuários');
  }
  const data: UsuariosResponseDTO[] = await response.json();
  return data;
};

export const validaUsuario = async (): Promise<UsuariosResponseDTO> => {
  const session = await getServerSession(authOptions);
  const request_url: string = `${api_url}/valida-usuario`;
  const response: Response = await fetch(request_url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) {
    Logout();
    throw new Error('erro ao tentar validar o usuários');
  }
  const data: UsuariosResponseDTO = await response.json();
  return data;
};

export const buscarNovoUsuario = async (login: string): Promise<Partial<UsuariosResponseDTO>> => {
  const session: Session | null = await getServerSession(authOptions);
  const request_url: string = `${api_url}/buscar-novo?login=${login}`;
  const response: Response = await fetch(request_url, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    }
  });
  if (response.status != 200) throw new Error('erro ao tentar buscar o novo usuários');
  const data: UsuariosResponseDTO = await response.json();
  return data;
};

export const updateUsuario = async (
    id: string, request: Partial<UsuariosRequestDTO>
): Promise<UsuariosResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${api_url}/atualizar/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    },
    body: JSON.stringify({ ...request })
  });
  if (response.status != 200) {
    Logout();
    throw new Error('erro ao tentar atualizar o usuário');
  }
  const data: UsuariosResponseDTO = await response.json();
  return data;
};

export const deleteUsuario = async (id: string): Promise<UsuariosResponseDTO> => {
  const session = await getServerSession(authOptions);
  const response: Response = await fetch(`${api_url}/desativar/${id}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${session?.access_token}`
    },
  });
  if (response.status != 200) {
    Logout();
    throw new Error('erro ao tentar desativar o usuário');
  }
  const data: UsuariosResponseDTO = await response.json();
  return data;
};
