'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { VistoriaRequestDTO, VistoriaResponseDTO } from "@/types/vistorias/vistorias.dto";
import { getServerSession } from "next-auth";

const api_url = 'http://localhost:3000/vistorias';

export const createVistoria = async (request: VistoriaRequestDTO): Promise<VistoriaResponseDTO> => {
    const session = await getServerSession(authOptions);
    const response: Response = await fetch(`${api_url}/criar-vistoria`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ ...request })
    });
    if (response.status != 201) throw new Error('erro ao tentar registrar a vistoria');
    const data: VistoriaResponseDTO = await response.json();
    return data;
};

export const getAllVistorias = async (
    limit: number, offset: number, orderBy: string, order: string
): Promise<VistoriaResponseDTO[]> => {
    const session = await getServerSession(authOptions);
    const response: Response = await fetch(`${api_url}/buscar-vistorias?limit=${limit}&offset=${offset}&orderBy=${orderBy}&order=${order}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
        }
    });
    if (response.status != 200) throw new Error('erro ao tentar buscar as vistorias');
    const data: VistoriaResponseDTO[] = await response.json();
    return data;
};

export const getOneVistoria = async (id: string): Promise<VistoriaResponseDTO> => {
    const session = await getServerSession(authOptions);
    const response: Response = await fetch(`${api_url}/buscar-vistoria/${id}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
        }
    });
    if (response.status != 200) throw new Error('erro ao tentar buscar a vistoria');
    const data: VistoriaResponseDTO = await response.json();
    return data;
};

export const updateVistoria = async (id: string, request: VistoriaRequestDTO): Promise<VistoriaResponseDTO> => {
    const session = await getServerSession(authOptions);
    const response: Response = await fetch(`${api_url}/atualizar-vistoria/${id}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ ...request })
    });
    if (response.status != 200) throw new Error('erro ao tentar atualizar a vistoria');
    const data: VistoriaResponseDTO = await response.json();
    return data;
};

export const deleteVistoria = async (id: string): Promise<VistoriaResponseDTO> => {
    const session = await getServerSession(authOptions);
    const response: Response = await fetch(`${api_url}/excluir-vistoria/${id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${session?.access_token}`
        },
    });
    if (response.status != 200) throw new Error('erro ao tentar excluir a vistoria');
    const data: VistoriaResponseDTO = await response.json();
    return data;
};
