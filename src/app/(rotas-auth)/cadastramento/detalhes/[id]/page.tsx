'use client'

import React from 'react';
import Content from "@/components/Content";
import { Box, Button, Card, Divider, FormControl, FormHelperText, FormLabel, IconButton, Input, Option, Select, Skeleton, Stack, Textarea, Tooltip, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import {
    infer as Infer,
    number,
    object,
    string,
    boolean,
    date,
    z
} from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as cadastroServices from "@/shared/services/cadastros/cadastros.service";
import * as cep from "@/shared/services/cep/cep.service";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveIcon from '@mui/icons-material/Remove';
import { CepResponseDTO } from '@/shared/services/cep/cep.service';

const schema = object({
    autuacaoSei: string(),
    autuacaoData: date(),
    imovelContiguidade: boolean(),
    areaConstruidaTotal: z.coerce.number(),
    areaLoteTotal: z.coerce.number(),
    prospeccaoOrigem: string().min(1, "Selecione o tipo de vistoria"),
    prospeccaoTipologia: string().min(1, "Selecione o tipo de vistoria"),
    prospeccaoData: date(),
    estado: string(),
    sqlSetor: z.coerce.number(),
    sqlQuadra: z.coerce.number(),
    sqlLote: z.coerce.number(),
    sqlDigito: z.coerce.number(),
    sqlPai: z.coerce.number(),
    sqlFilho: z.coerce.number(),
    registroNotasReferencia: string(),
    enderecoLogradouro: string(),
    enderecoNumero: string(),
    enderecoComplemento: string(),
    enderecoReferencia: string(),
    enderecoDistrito: string(),
    enderecoCep: string(),
    enderecoSubprefeitura: string(),
    enderecoSubprefeituraSigla: string(),
    enderecoMacroarea: string(),
    enderecoMacroareaSigla: string(),
    enderecoZona: string(),
    enderecoZonaSigla: string(),
    areaConstruidaTotalRegistrada: z.coerce.number(),
    areaLoteTotalRegistrada: z.coerce.number(),
    areaCoeficienteAproveitamento: z.coerce.number(),
    areaCoeficienteAproveitamentoMinimo: z.coerce.number(),
    geoEpsg: z.coerce.number(),
    decretoNumero: string(),
    decretoTipo: string(),
    tombamentoCompresp: string(),
    tombamentoCondephat: string(),
    tombamentoIphan: string(),
});
type Schema = Infer<typeof schema>;

export default function DetalhesPropriedade(props: any) {

    //Dados Processo
    const [autuacaoSei, setAutuacaoSei] = useState('');
    const [autuacaoData, setAutuacaoData] = useState(new Date());
    const [imovelContiguidade, setImovelContiguidade] = useState(false);
    const [areaConstruidaTotal, setAreaConstruidaTotal] = useState(0);
    const [areaLoteTotal, setAreaLoteTotal] = useState(0);
    const [prospeccaoOrigem, setProspeccaoOrigem] = useState('');
    const [prospeccaoTipologia, setProspeccaoTipologia] = useState('');
    const [prospeccaoData, setProspeccaoData] = useState(new Date());
    const [estado, setEstado] = useState('');

    //Dados imoveis
    const [sqlSetor, setSqlSetor] = useState<number>(0);
    const [sqlQuadra, setSqlQuadra] = useState<number>(0);
    const [sqlLote, setSqlLote] = useState<number>(0);
    const [sqlDigito, setSqlDigito] = useState<number>(0);
    const [sqlPai, setSqlPai] = useState<number>(0);
    const [sqlFilho, setSqlFilho] = useState<number>(0);
    //Endereço
    const [registroNotasReferencia, setRegistroNotasReferencia] = useState('');
    /*#*/const [enderecoLogradouro, setEnderecoLogradouro] = useState('');
    const [enderecoNumero, setEnderecoNumero] = useState('');
    const [enderecoComplemento, setEnderecoComplemento] = useState('');
    const [enderecoReferencia, setEnderecoReferencia] = useState('');
    const [enderecoDistrito, setEnderecoDistrito] = useState('');
    /*#*/const [enderecoCep, setEnderecoCep] = useState('');
    const [enderecoSubprefeitura, setEnderecoSubprefeitura] = useState('');
    const [enderecoSubprefeituraSigla, setEnderecoSubprefeituraSigla] = useState('');
    const [enderecoMacroarea, setEnderecoMacroarea] = useState('');
    const [enderecoMacroareaSigla, setEnderecoMacroareaSigla] = useState('');
    const [enderecoZona, setEnderecoZona] = useState('');
    const [enderecoZonaSigla, setEnderecoZonaSigla] = useState('');
    //area
    const [areaConstruidaTotalRegistrada, setAreaConstruidaTotalRegistrada] = useState<number>(0);
    const [areaLoteTotalRegistrada, setAreaLoteTotalRegistrada] = useState<number>(0);
    const [areaCoeficienteAproveitamento, setAreaCoeficienteAproveitamento] = useState<number>(0);
    const [areaCoeficienteAproveitamentoMinimo, setAreaCoeficienteAproveitamentoMinimo] = useState<number>(0);
    //Finalização
    const [geoEpsg, setGeoEpsg] = useState<number>(0);
    const [decretoNumero, setDecretoNumero] = useState('');
    const [decretoTipo, setDecretoTipo] = useState('');
    const [tombamentoCompresp, setTombamentoCompresp] = useState('');
    const [tombamentoCondephat, setTombamentoCondephat] = useState('');
    const [tombamentoIphan, setTombamentoIphan] = useState('');

    /*---------//---------*/

    const [exibirImovel, setExibirImovel] = useState(false);
    const [imoveis, setImoveis] = useState([]);

    const [carregando, setCarregando] = useState(true);
    const { id } = props.params;
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        values: {
            autuacaoSei,
            autuacaoData,
            imovelContiguidade,
            areaConstruidaTotal,
            areaLoteTotal,
            prospeccaoOrigem,
            prospeccaoTipologia,
            prospeccaoData,
            estado,
            sqlSetor,
            sqlQuadra,
            sqlLote,
            sqlDigito,
            sqlPai,
            sqlFilho,
            registroNotasReferencia,
            enderecoLogradouro,
            enderecoNumero,
            enderecoComplemento,
            enderecoReferencia,
            enderecoDistrito,
            enderecoCep,
            enderecoSubprefeitura,
            enderecoSubprefeituraSigla,
            enderecoMacroarea,
            enderecoMacroareaSigla,
            enderecoZona,
            enderecoZonaSigla,
            areaConstruidaTotalRegistrada,
            areaLoteTotalRegistrada,
            areaCoeficienteAproveitamento,
            areaCoeficienteAproveitamentoMinimo,
            geoEpsg,
            decretoNumero,
            decretoTipo,
            tombamentoCompresp,
            tombamentoCondephat,
            tombamentoIphan
        }
    });

    const getById = async () => {
        cadastroServices.getOneProcesso(id)
            .then((v) => {
                if (v) {
                    setAutuacaoSei(v.autuacaoSei);
                    setAutuacaoData(v.autuacaoData);
                    setImovelContiguidade(v.imovelContiguidade);
                    setAreaConstruidaTotal(v.areaConstruidaTotal);
                    setAreaLoteTotal(v.areaLoteTotal);
                    setProspeccaoOrigem(v.prospeccaoOrigem);
                    setProspeccaoTipologia(v.prospeccaoTipologia);
                    setProspeccaoData(v.prospeccaoData);
                    setEstado(v.estado);
                    setCarregando(false);
                }
            })
    }

    useEffect(() => {
        id ? getById() : setCarregando(false);
    })

    const buscaCep = (valueCep: string) => {
        cep.getCep(valueCep)
            .then((v: CepResponseDTO) => {
                if (v) {
                    console.log(v);
                }
            })
    }

    const onSubmit = async (data: Schema) => {
        if (id) {
            await cadastroServices.updateProcesso(id, data)
                .then((v) => {
                    if (v) {
                        router.push('/cadastramento?att=0');
                    }
                })
        } else if (imoveis.length === 0) {
            await cadastroServices.createProcesso(data)
                .then((v) => {
                    if (v) {
                        router.push('/cadastramento?add=0');
                    }
                })
        } else {
            // await cadastroServices.createCadastro(data)
            //     .then((v) => {
            //         if (v) {
            //             router.push('/cadastramento?add=0');
            //         }
            //     })
        }
    };

    const theme = useTheme();

    return (
        <Content
            breadcrumbs={[
                { label: 'Cadastramento', href: '/cadastramento' },
                { label: 'Processo', href: `/cadastramento/detalhes/${id ? id : ''}` },
            ]}
            titulo={id ? 'Processo #' + id : 'Processo'}
            pagina="cadastramento"
        >

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={2}>
                    <Stack gap={2}>
                        <Card variant="plain" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 20, padding: 0 }}>
                            <Typography level="h4" sx={{ pl: 3, pt: 2, pb: 1 }} >Registro de processo</Typography>
                            <Divider />
                            <Box sx={{ padding: '24px', pt: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.autuacaoSei)}>
                                        <FormLabel>Atuacao Sei</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="autuacaoSei"
                                            control={control}
                                            defaultValue={autuacaoSei}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        error={Boolean(errors.autuacaoSei)}
                                                        {...field}
                                                    />
                                                    {errors.autuacaoSei && <FormHelperText color="danger">
                                                        {errors.autuacaoSei?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.autuacaoData)}>
                                        <FormLabel>Data autuação</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="autuacaoData"
                                            control={control}
                                            defaultValue={new Date(autuacaoData.toLocaleString().split('T')[0])}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="date"
                                                        placeholder="Prazo"
                                                        error={Boolean(errors.autuacaoData)}
                                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                        onChange={(event) => {
                                                            const newValue = new Date(event.target.value);
                                                            field.onChange(newValue);
                                                        }}
                                                        onBlur={field.onBlur}
                                                        disabled={field.disabled}
                                                        name={field.name}
                                                    />
                                                    {errors.autuacaoData && <FormHelperText color="danger">
                                                        {errors.autuacaoData?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.imovelContiguidade)}>
                                        <FormLabel>Imovel Contibuidade</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="imovelContiguidade"
                                            control={control}
                                            defaultValue={imovelContiguidade}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Select
                                                        {...field}
                                                        onChange={(_, value) => field.onChange(value)}
                                                    >
                                                        <Option value={false}>Não</Option>
                                                        <Option value={true}>Sim</Option>
                                                    </Select>
                                                    {errors.imovelContiguidade && <FormHelperText>
                                                        {errors.imovelContiguidade?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.areaConstruidaTotal)}>
                                        <FormLabel>Quantidade de Pavimentos</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="areaConstruidaTotal"
                                            control={control}
                                            defaultValue={Number(areaConstruidaTotal)}
                                            render={({ field: { ref, onChange, value, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        error={Boolean(errors.areaConstruidaTotal)}
                                                        value={value}
                                                        onChange={(e) => {
                                                            const newValue = e.target.value ? Number(e.target.value) : '';
                                                            onChange(newValue);
                                                        }}
                                                        {...field}
                                                    />
                                                    {errors.areaConstruidaTotal && <FormHelperText color="danger">
                                                        {errors.areaConstruidaTotal?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.areaLoteTotal)}>
                                        <FormLabel>Area lote total</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="areaLoteTotal"
                                            control={control}
                                            defaultValue={Number(areaLoteTotal)}
                                            render={({ field: { ref, onChange, value, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="number"
                                                        error={Boolean(errors.areaLoteTotal)}
                                                        value={value}
                                                        onChange={(e) => {
                                                            const newValue = e.target.value ? Number(e.target.value) : '';
                                                            onChange(newValue);
                                                        }}
                                                        {...field}
                                                    />
                                                    {errors.areaLoteTotal && <FormHelperText color="danger">
                                                        {errors.areaLoteTotal?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>

                                </Stack>
                                <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.prospeccaoOrigem)}>
                                        <FormLabel>Origem Prospecção</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prospeccaoOrigem"
                                            control={control}
                                            defaultValue={prospeccaoOrigem}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Select
                                                        {...field}
                                                        onChange={(_, value) => field.onChange(value)}
                                                    >
                                                        <Option value={''}></Option>
                                                        <Option value={'mapaColaborativo'}>Não</Option>
                                                        <Option value={'outros'}>Sim</Option>
                                                    </Select>
                                                    {errors.prospeccaoOrigem && <FormHelperText>
                                                        {errors.prospeccaoOrigem?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.prospeccaoTipologia)}>
                                        <FormLabel>Tipologia Prospecção</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prospeccaoTipologia"
                                            control={control}
                                            defaultValue={prospeccaoTipologia}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Select
                                                        {...field}
                                                        onChange={(_, value) => field.onChange(value)}
                                                    >
                                                        <Option value={''}></Option>
                                                        <Option value={'residencial'}>Residencial</Option>
                                                        <Option value={'comercial'}>Comercial</Option>
                                                        <Option value={'industrial'}>Industrial</Option>
                                                        <Option value={'misto'}>Misto</Option>
                                                        <Option value={'outros'}>Outros</Option>
                                                    </Select>
                                                    {errors.prospeccaoTipologia && <FormHelperText>
                                                        {errors.prospeccaoTipologia?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.prospeccaoData)}>
                                        <FormLabel>Data prospecção</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="prospeccaoData"
                                            control={control}
                                            defaultValue={new Date(prospeccaoData.toLocaleString().split('T')[0])}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        type="date"
                                                        placeholder="Prazo"
                                                        error={Boolean(errors.prospeccaoData)}
                                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                        onChange={(event) => {
                                                            const newValue = new Date(event.target.value);
                                                            field.onChange(newValue);
                                                        }}
                                                        onBlur={field.onBlur}
                                                        disabled={field.disabled}
                                                        name={field.name}
                                                    />
                                                    {errors.prospeccaoData && <FormHelperText color="danger">
                                                        {errors.autuacaoData?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.estado)}>
                                        <FormLabel>Estado</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="estado"
                                            control={control}
                                            defaultValue={estado}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        error={Boolean(errors.estado)}
                                                        {...field}
                                                    />
                                                    {errors.estado && <FormHelperText color="danger">
                                                        {errors.estado?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type="submit"
                                        sx={{
                                            bgcolor: theme.palette.text.primary,
                                            color: 'background.body', '&:hover': { bgcolor: theme.palette.text.primary, color: 'background.body' }
                                        }}>Enviar Processo</Button>
                                </Box>
                            </Box>

                        </Card>
                    </Stack>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'start', gap: 3 }}>
                        <Button
                            onClick={() => { setExibirImovel(!exibirImovel) }}
                            sx={{ bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' }, color: 'text.primary' }}
                            startDecorator={!exibirImovel ? <AddIcon sx={{ height: 20, width: 20 }} /> : <RemoveIcon sx={{ height: 20, width: 20 }} />}>
                            Inserir Imovel
                        </Button>
                    </Box>
                    <Stack gap={2} sx={{ display: exibirImovel ? 'flex' : 'none' }}>
                        <Card variant="plain" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 20, padding: 0 }}>
                            <Typography level="h4"
                                endDecorator={
                                    <Tooltip title="Clique para visualizar imóveis já registrados" color="neutral" placement="top" variant='soft'>
                                        <IconButton>
                                            <VisibilityIcon sx={{ height: 20, width: 20 }} />
                                        </IconButton>
                                    </Tooltip>
                                } sx={{ pl: 3, pt: 2, pb: 1 }} >Imóvel</Typography>
                            <Divider />
                            <Box sx={{ padding: '24px', pt: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.enderecoCep)}>
                                        <FormLabel>Cep</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="enderecoCep"
                                            control={control}
                                            defaultValue={enderecoCep}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        error={Boolean(errors.enderecoCep)}
                                                        {...field}
                                                    />
                                                    {errors.enderecoCep && <FormHelperText color="danger">
                                                        {errors.enderecoCep?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                    <FormControl sx={{ width: '100%' }} error={Boolean(errors.enderecoLogradouro)}>
                                        <FormLabel>Endereco Logradouro</FormLabel>
                                        {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                            name="enderecoLogradouro"
                                            control={control}
                                            defaultValue={enderecoLogradouro}
                                            render={({ field: { ref, ...field } }) => {
                                                return (<>
                                                    <Input
                                                        error={Boolean(errors.enderecoLogradouro)}
                                                        {...field}
                                                    />
                                                    {errors.enderecoLogradouro && <FormHelperText color="danger">
                                                        {errors.enderecoLogradouro?.message}
                                                    </FormHelperText>}
                                                </>);
                                            }}
                                        />}
                                    </FormControl>
                                </Stack>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type="submit" sx={{ bgcolor: theme.palette.text.primary, color: 'background.body', '&:hover': { bgcolor: theme.palette.text.primary, color: 'background.body' } }}>Salvar imóvel</Button>
                                </Box>
                            </Box>
                        </Card>
                    </Stack>
                </Stack>
            </form>
        </Content >
    );
}
