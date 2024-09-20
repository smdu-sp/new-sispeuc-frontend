'use client'

import Content from "@/components/Content";
import { Box, Card, CardCover, FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
import { useEffect } from "react";
import img from '@/assets/Background_vistoria.png'
export default function DetalhesPropriedade(props: any) {
    const { id } = props.params;
    useEffect(() => {
        console.log(id);
    })

    return (
        <Content
            breadcrumbs={[
                { label: 'Vistoria', href: '/vistoria' },
                { label: 'Vistoria', href: `/vistoria/detalhes/${id ? id : ''}` },
            ]}
            titulo={id ? 'Detalhes da vistoria #' + id : 'Cadastro de vitoria'}
            pagina="vistoria"
        >
            <Card variant="plain" sx={{ width: '100%', boxShadow: 'lg', borderRadius: 20, padding: 0 }}>
                <Typography level="h4" padding={'14px'}>Enderedo para visita</Typography>
                <Card variant="solid" sx={{ height: '100%', p: "26px",borderRadius: 0 }}>
                    <CardCover>
                        <img
                            src={img.src}
                            loading="lazy"
                            alt=""
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
