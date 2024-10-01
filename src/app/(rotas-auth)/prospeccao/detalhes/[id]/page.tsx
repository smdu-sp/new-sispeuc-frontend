'use client'

import Content from "@/components/Content";
import { Card, CardCover, FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
import { useEffect } from "react";
import map from '@/assets/map.png'

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
            <Card variant="plain" sx={{ width: '100%', boxShadow: 'lg', borderRadius: 20, padding: 0 }}>
                <Typography level="h4" padding={'14px'}>Enderedo para visita</Typography>
                <Card variant="solid" sx={{ height: '100%', p: "26px", borderRadius: 0 }}>
                    <CardCover>
                        <img
                            src={map.src}
                            loading="lazy"
                            alt="mapa"
                        />
                    </CardCover>
                    <Card variant="plain" sx={{ padding: '24px' }}>
                        <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Logradouro</FormLabel>
                                <Input type="text"></Input>
                            </FormControl>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Logradouro</FormLabel>
                                <Input type="text"></Input>
                            </FormControl>
                        </Stack>
                        <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Logradouro</FormLabel>
                                <Input type="text"></Input>
                            </FormControl>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Logradouro</FormLabel>
                                <Input type="text"></Input>
                            </FormControl>
                        </Stack>
                    </Card>
                </Card>
            </Card>
        </Content>
    );
}
