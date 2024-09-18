'use client'

import Content from "@/components/Content";
import { useEffect } from "react";

export default function DetalhesPropriedade(props: any) {
    const { id } = props.params;
    useEffect(() => {
        console.log(id);
    })

    return (
        <Content
            breadcrumbs={[
                { label: 'Prospecção', href: '/prospeccao' },
                { label: 'Ficha', href: `/prospeccao/detalhes/${id ? id : ''}` },
            ]}
            titulo={id ? 'Ficha da propriedade #' + id : 'Ficha em brando'}
            pagina="Prospecção"
        >
        </Content>
    );
}
