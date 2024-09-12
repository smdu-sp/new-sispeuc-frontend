'use client'

import Content from '@/components/Content';
import { useSearchParams } from 'next/navigation';
import * as usuarioServices from '@/shared/services/usuario.services';
import { IUsuario } from '@/shared/services/usuario.services';
import { useContext, useEffect, useState } from 'react';

export default function Home() {

  const [nome, setNome] = useState('');

  useEffect(() => {
    usuarioServices.validaUsuario()
      .then((response: IUsuario) => {
        setNome(response.nome);
      });
  }, [])

  return (
    <Content
      titulo={'Olá ' + nome + ', boas vindas ao SISPEUC 👋'}
      pagina='/'
    >
    </Content>
  );
}