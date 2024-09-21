'use client'

import Content from "@/components/Content";
import { Box, Button, Card, Divider, FormControl, FormHelperText, FormLabel, Input, Option, Select, Skeleton, Stack, Textarea, Typography } from "@mui/joy";
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
import * as vistoriasServices from "@/shared/services/vistorias/vistoria.service";

const schema = object({
    processoId: z.coerce.number().optional(),
    imovelId: z.coerce.number().optional(),
    tipoVistoria: string().min(1, "Selecione o tipo de vistoria"),
    tipoTipologia: string().min(1, "Selecione o tipo de tipologia"),
    tipoUso: string().min(1, "Selecione o tipo de uso"),
    qtdePavimentos: z.coerce.number(),
    unifamiliar: boolean(),
    multifamiliar: boolean(),
    comercio: boolean(),
    servico: boolean(),
    industria: boolean(),
    usoFachadaBoaCondicao: boolean(),
    usoEsquadriaBoaCondicao: boolean(),
    usoPodaVegetacao: boolean(),
    areaConstruidaTotalConstatada: z.coerce.number(),
    areaLoteTotalConstatada: z.coerce.number(),
    indiceOcupacaoConstatado: z.coerce.number(),
    areaCoberturaTotalConstatada: z.coerce.number(),
    areaConstruidaNaoComputavel: z.coerce.number(),
    descricao: string(),
    dataVistoria: z.coerce.date(),
});
type Schema = Infer<typeof schema>;

export default function DetalhesVistorias(props: any) {

    const [processoId, setProcesso] = useState<number>();
    const [imovelId, setIdImovel] = useState<number>();
    const [tipoVistoria, setTipoVistoria] = useState('');
    const [tipoTipologia, setTipoTipologia] = useState('');
    const [tipoUso, setTipoUso] = useState('');
    const [qtdePavimentos, setQtdePavimentos] = useState(0);
    const [unifamiliar, setUnifamiliar] = useState(false);
    const [multifamiliar, setMultifamiliar] = useState<boolean>(false);
    const [comercio, setComercio] = useState<boolean>(false);
    const [servico, setServico] = useState<boolean>(false);
    const [industria, setIndustria] = useState<boolean>(false);
    const [usoFachadaBoaCondicao, setUsoFachadaBoaCondicao] = useState<boolean>(false);
    const [usoEsquadriaBoaCondicao, setUsoEsquadriaBoaCondicao] = useState<boolean>(false);
    const [usoPodaVegetacao, setUsoPodaVegetacao] = useState<boolean>(false);
    const [areaConstruidaTotalConstatada, setAreaConstruidaTotalConstatada] = useState(0);
    const [areaLoteTotalConstatada, setAreaLoteTotalConstatada] = useState(0);
    const [indiceOcupacaoConstatado, setIndiceOcupacaoConstatado] = useState(0);
    const [areaCoberturaTotalConstatada, setAreaCoberturaTotalConstatada] = useState(0);
    const [areaConstruidaNaoComputavel, setAreaConstruidaNaoComputavel] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [dataVistoria, setDataVistoria] = useState<Date>(new Date());
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
            processoId,
            imovelId,
            tipoVistoria,
            tipoTipologia,
            tipoUso,
            qtdePavimentos,
            unifamiliar,
            multifamiliar,
            comercio,
            servico,
            industria,
            usoFachadaBoaCondicao,
            usoEsquadriaBoaCondicao,
            usoPodaVegetacao,
            areaConstruidaTotalConstatada,
            areaLoteTotalConstatada,
            indiceOcupacaoConstatado,
            areaCoberturaTotalConstatada,
            areaConstruidaNaoComputavel,
            descricao,
            dataVistoria
        }
    });

    const getById = async () => {
        vistoriasServices.getOneVistoria(id)
            .then((v) => {
                if (v) {
                    setProcesso(v.processoId);
                    setIdImovel(v.imovelId);
                    setTipoVistoria(v.tipoVistoria);
                    setTipoTipologia(v.tipoTipologia);
                    setTipoUso(v.tipoUso);
                    setQtdePavimentos(parseInt(v.qtdePavimentos.toString()));
                    setUnifamiliar(v.unifamiliar);
                    setMultifamiliar(v.multifamiliar);
                    setComercio(v.comercio);
                    setServico(v.servico);
                    setIndustria(v.industria);
                    setUsoFachadaBoaCondicao(v.usoFachadaBoaCondicao);
                    setUsoEsquadriaBoaCondicao(v.usoEsquadriaBoaCondicao);
                    setUsoPodaVegetacao(v.usoPodaVegetacao);
                    setAreaConstruidaTotalConstatada(v.areaConstruidaTotalConstatada);
                    setAreaLoteTotalConstatada(v.areaLoteTotalConstatada);
                    setIndiceOcupacaoConstatado(v.indiceOcupacaoConstatado);
                    setAreaCoberturaTotalConstatada(v.areaCoberturaTotalConstatada);
                    setAreaConstruidaNaoComputavel(v.areaConstruidaNaoComputavel);
                    setDescricao(v.descricao);
                    setDataVistoria(v.dataVistoria);
                    setCarregando(false);
                }
            })
    }

    useEffect(() => {
        id ? getById() : setCarregando(false);
    })
    const onSubmit = async (data: Schema) => {
        if (id) {
            await vistoriasServices.updateVistoria(id, data)
                .then((v) => {
                    if (v) {
                        router.push('/vistoria?att=0');
                    }
                })
        } else {
            await vistoriasServices.createVistoria(data)
                .then((v) => {
                    if (v) {
                        router.push('/vistoria?add=0');
                    }
                })
        }
    };

    const theme = useTheme();

    return (
        <Content
            breadcrumbs={[
                { label: 'Vistoria', href: '/vistoria' },
            ]}
            titulo={'Cadastro de vitoria'}
            pagina="vistoria"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={2}>
                    <Card variant="plain" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 20, padding: 0 }}>
                        <Typography level="h4" sx={{ pl: 3, pt: 2, pb: 1 }} >Vistoria</Typography>
                        <Divider />
                        <Box sx={{ padding: '24px', pt: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.processoId)}>
                                    <FormLabel>ID Processo</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="processoId"
                                        control={control}
                                        defaultValue={Number(processoId)}
                                        render={({ field: { ref, onChange, value, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="number"
                                                    error={Boolean(errors.processoId)}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : '';
                                                        onChange(newValue);
                                                    }}
                                                    {...field}
                                                />
                                                {errors.processoId && <FormHelperText color="danger">
                                                    {errors.processoId?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.imovelId)}>
                                    <FormLabel>ID imovel</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="imovelId"
                                        control={control}
                                        defaultValue={Number(imovelId)}
                                        render={({ field: { ref, onChange, value, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="number"
                                                    error={Boolean(errors.imovelId)}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : '';
                                                        onChange(newValue);
                                                    }}
                                                    {...field}
                                                />
                                                {errors.imovelId && <FormHelperText color="danger">
                                                    {errors.imovelId?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                            <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.tipoVistoria)}>
                                    <FormLabel>Tipo Vistoria</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="tipoVistoria"
                                        control={control}
                                        defaultValue={tipoVistoria}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={''} aria-selected></Option>
                                                    <Option value={'presencial'}>Presencial</Option>
                                                    <Option value={'remota'}>Remota</Option>
                                                    <Option value={'NC'}>NC</Option>
                                                </Select>
                                                {errors.tipoVistoria && <FormHelperText>
                                                    {errors.tipoVistoria?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.tipoTipologia)}>
                                    <FormLabel>Tipo Tipologia</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="tipoTipologia"
                                        control={control}
                                        defaultValue={tipoTipologia}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={''} aria-selected></Option>
                                                    <Option value={'naoEdificado'}>Não Edificado</Option>
                                                    <Option value={'naoUtilizado'}>Não Utilizado</Option>
                                                    <Option value={'subutilizado'}>Subutilizado</Option>
                                                </Select>
                                                {errors.tipoTipologia && <FormHelperText>
                                                    {errors.tipoTipologia?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.tipoUso)}>
                                    <FormLabel>Tipo Uso</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="tipoUso"
                                        control={control}
                                        defaultValue={tipoUso}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={''} aria-selected></Option>
                                                    <Option value={'residencial'}>Residencial</Option>
                                                    <Option value={'misto'}>Misto</Option>
                                                    <Option value={'naoResidencial'}>Não Residencial</Option>
                                                </Select>
                                                {errors.tipoUso && <FormHelperText>
                                                    {errors.tipoUso?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.qtdePavimentos)}>
                                    <FormLabel>Quantidade de Pavimentos</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="qtdePavimentos"
                                        control={control}
                                        defaultValue={Number(qtdePavimentos)}
                                        render={({ field: { ref, onChange, value, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="number"
                                                    error={Boolean(errors.qtdePavimentos)}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : '';
                                                        onChange(newValue);
                                                    }}
                                                    {...field}
                                                />
                                                {errors.qtdePavimentos && <FormHelperText color="danger">
                                                    {errors.qtdePavimentos?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                        </Box>
                    </Card>
                    <Card variant="plain" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 20, padding: 0 }}>
                        <Typography level="h4" sx={{ pl: 3, pt: 2, pb: 1 }}>Características Imóvel</Typography>
                        <Divider />
                        <Box sx={{ padding: '24px', pt: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.unifamiliar)}>
                                    <FormLabel>Unidade Familiar</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="unifamiliar"
                                        control={control}
                                        defaultValue={unifamiliar}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={false}>Não</Option>
                                                    <Option value={true}>Sim</Option>
                                                </Select>
                                                {errors.unifamiliar && <FormHelperText>
                                                    {errors.unifamiliar?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.multifamiliar)}>
                                    <FormLabel>Multi Familiar</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="multifamiliar"
                                        control={control}
                                        defaultValue={multifamiliar}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={false}>Não</Option>
                                                    <Option value={true}>Sim</Option>
                                                </Select>
                                                {errors.multifamiliar && <FormHelperText>
                                                    {errors.multifamiliar?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.comercio)}>
                                    <FormLabel>Comercio</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="comercio"
                                        control={control}
                                        defaultValue={comercio}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={false}>Não</Option>
                                                    <Option value={true}>Sim</Option>
                                                </Select>
                                                {errors.comercio && <FormHelperText>
                                                    {errors.comercio?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.servico)}>
                                    <FormLabel>Serviço</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="servico"
                                        control={control}
                                        defaultValue={servico}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={false}>Não</Option>
                                                    <Option value={true}>Sim</Option>
                                                </Select>
                                                {errors.servico && <FormHelperText>
                                                    {errors.servico?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                            <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.industria)}>
                                    <FormLabel>Industria</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="industria"
                                        control={control}
                                        defaultValue={industria}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={false}>Não</Option>
                                                    <Option value={true}>Sim</Option>
                                                </Select>
                                                {errors.industria && <FormHelperText>
                                                    {errors.industria?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.usoFachadaBoaCondicao)}>
                                    <FormLabel>Uso Fachada Boa Condição</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="usoFachadaBoaCondicao"
                                        control={control}
                                        defaultValue={usoFachadaBoaCondicao}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={false}>Não</Option>
                                                    <Option value={true}>Sim</Option>
                                                </Select>
                                                {errors.usoFachadaBoaCondicao && <FormHelperText>
                                                    {errors.usoFachadaBoaCondicao?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.usoEsquadriaBoaCondicao)}>
                                    <FormLabel>Uso Esquadria Boa Condição</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="usoEsquadriaBoaCondicao"
                                        control={control}
                                        defaultValue={usoEsquadriaBoaCondicao}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={false}>Não</Option>
                                                    <Option value={true}>Sim</Option>
                                                </Select>
                                                {errors.usoEsquadriaBoaCondicao && <FormHelperText>
                                                    {errors.usoEsquadriaBoaCondicao?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.usoPodaVegetacao)}>
                                    <FormLabel>Uso poda Vegertação</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="usoPodaVegetacao"
                                        control={control}
                                        defaultValue={usoPodaVegetacao}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Select
                                                    {...field}
                                                    onChange={(_, value) => field.onChange(value)}
                                                >
                                                    <Option value={false}>Não</Option>
                                                    <Option value={true}>Sim</Option>
                                                </Select>
                                                {errors.usoPodaVegetacao && <FormHelperText>
                                                    {errors.usoPodaVegetacao?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                        </Box>
                    </Card>
                    <Card variant="plain" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 20, padding: 0 }}>
                        <Typography level="h4" sx={{ pl: 3, pt: 2, pb: 1 }}>Areas</Typography>
                        <Divider />
                        <Box sx={{ padding: '24px', pt: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'column', xl: 'row' }}>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.areaConstruidaTotalConstatada)}>
                                    <FormLabel>Area Construida Total Constatada</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="areaConstruidaTotalConstatada"
                                        control={control}
                                        defaultValue={areaConstruidaTotalConstatada}
                                        render={({ field: { ref, onChange, value, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="number"
                                                    error={Boolean(errors.areaConstruidaTotalConstatada)}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : '';
                                                        onChange(newValue);
                                                    }}
                                                    {...field}
                                                />
                                                {errors.areaConstruidaTotalConstatada && <FormHelperText color="danger">
                                                    {errors.areaConstruidaTotalConstatada?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.areaLoteTotalConstatada)}>
                                    <FormLabel>Area Lote Total Constatada</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="areaLoteTotalConstatada"
                                        control={control}
                                        defaultValue={areaLoteTotalConstatada}
                                        render={({ field: { ref, onChange, value, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="number"
                                                    error={Boolean(errors.areaLoteTotalConstatada)}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : '';
                                                        onChange(newValue);
                                                    }}
                                                    {...field}
                                                />
                                                {errors.areaLoteTotalConstatada && <FormHelperText color="danger">
                                                    {errors.areaLoteTotalConstatada?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.indiceOcupacaoConstatado)}>
                                    <FormLabel>Indice Ocupação Constatado</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="indiceOcupacaoConstatado"
                                        control={control}
                                        defaultValue={indiceOcupacaoConstatado}
                                        render={({ field: { ref, onChange, value, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="number"
                                                    error={Boolean(errors.indiceOcupacaoConstatado)}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : '';
                                                        onChange(newValue);
                                                    }}
                                                    {...field}
                                                />
                                                {errors.indiceOcupacaoConstatado && <FormHelperText color="danger">
                                                    {errors.indiceOcupacaoConstatado?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                            <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'column', xl: 'row' }}>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.areaCoberturaTotalConstatada)}>
                                    <FormLabel>Area Cobertura Total Constatada</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="areaCoberturaTotalConstatada"
                                        control={control}
                                        defaultValue={areaCoberturaTotalConstatada}
                                        render={({ field: { ref, onChange, value, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="number"
                                                    error={Boolean(errors.areaCoberturaTotalConstatada)}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : '';
                                                        onChange(newValue);
                                                    }}
                                                    {...field}
                                                />
                                                {errors.areaCoberturaTotalConstatada && <FormHelperText color="danger">
                                                    {errors.areaCoberturaTotalConstatada?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.areaConstruidaNaoComputavel)}>
                                    <FormLabel>Area Construida Nao Computavel</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="areaConstruidaNaoComputavel"
                                        control={control}
                                        defaultValue={areaConstruidaNaoComputavel}
                                        render={({ field: { ref, onChange, value, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="number"
                                                    error={Boolean(errors.areaConstruidaNaoComputavel)}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const newValue = e.target.value ? Number(e.target.value) : '';
                                                        onChange(newValue);
                                                    }}
                                                    {...field}
                                                />
                                                {errors.areaConstruidaNaoComputavel && <FormHelperText color="danger">
                                                    {errors.areaConstruidaNaoComputavel?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                        </Box>
                    </Card>
                    <Card variant="plain" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 20, padding: 0 }}>
                        <Typography level="h4" sx={{ pl: 3, pt: 2, pb: 1 }}>Finalização</Typography>
                        <Divider />
                        <Box sx={{ padding: '24px', pt: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Stack sx={{ width: '100%', gap: 2 }} direction={{ sm: 'column', md: 'column', lg: 'column', xl: 'row' }}>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.descricao)}>
                                    <FormLabel>Descrição</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="descricao"
                                        control={control}
                                        defaultValue={descricao}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Textarea
                                                    error={Boolean(errors.descricao)}
                                                    {...field}
                                                />
                                                {errors.descricao && <FormHelperText color="danger">
                                                    {errors.descricao?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                                <FormControl sx={{ width: '100%' }} error={Boolean(errors.dataVistoria)}>
                                    <FormLabel>Data Vistoria</FormLabel>
                                    {carregando ? <Skeleton variant="text" level="h1" /> : <Controller
                                        name="dataVistoria"
                                        control={control}
                                        defaultValue={new Date(dataVistoria.toLocaleString().split('T')[0])}
                                        render={({ field: { ref, ...field } }) => {
                                            return (<>
                                                <Input
                                                    type="date"
                                                    placeholder="Prazo"
                                                    error={Boolean(errors.dataVistoria)}
                                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                    onChange={(event) => {
                                                        const newValue = new Date(event.target.value);
                                                        field.onChange(newValue);
                                                    }}
                                                    onBlur={field.onBlur}
                                                    disabled={field.disabled}
                                                    name={field.name}
                                                />
                                                {errors.dataVistoria && <FormHelperText color="danger">
                                                    {errors.dataVistoria?.message}
                                                </FormHelperText>}
                                            </>);
                                        }}
                                    />}
                                </FormControl>
                            </Stack>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="submit" disabled={isValid ? false : true} sx={{ bgcolor: theme.palette.text.primary, color: 'background.body' }}>Enviar Vistoria</Button>
                            </Box>
                        </Box>
                    </Card>
                </Stack>
            </form>
        </Content >
    );
}
