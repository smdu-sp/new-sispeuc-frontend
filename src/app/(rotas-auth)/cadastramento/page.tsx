'use client'

import Content from '@/components/Content';
import { useEffect, useState, useContext, useRef } from 'react';
import { Box, Button, Input, Tooltip, Typography, useTheme, IconButton, Dropdown, MenuButton, Menu, MenuItem, ListItemDecorator, ListDivider, Checkbox, Stack, Snackbar } from '@mui/joy';
import 'react-material-symbols/rounded';
import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter, useSearchParams } from 'next/navigation';
import * as cadastroServices from '@/shared/services/cadastros/cadastros.service';
import { CadastrosResponseDTO } from '@/types/cadastros/cadastros.dto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AlertsContext } from "@/providers/alertsProvider";
import { Check } from '@mui/icons-material';
import { MenuList } from '@mui/material';
import ViewWeekSharpIcon from '@mui/icons-material/ViewWeekSharp';
import WarningIcon from '@mui/icons-material/Warning';

export default function Prospeccao() {
  const [processo, setProcesso] = useState<boolean>(true);
  const [imovel, setImovel] = useState<boolean>(true);
  const [tipoVistoria, setTipoVistoria] = useState<boolean>(true);
  const [tipologia, setTipologia] = useState<boolean>(true);
  const [tipoUso, setTipoUso] = useState<boolean>(true);
  const [dataVistoria, setDataVistoria] = useState<boolean>(true);
  const [areaConstruidaTotalConstatada, setAreaConstruidaTotalConstatada] = useState<boolean>(false);
  const [areaLoteTotalConstatada, setAreaLoteTotalConstatada] = useState<boolean>(false);
  const [areaCoberturaTotalConstatada, setAreaCoberturaTotalConstatada] = useState<boolean>(false);
  const [indiceOcupacaoConstatado, setIndiceOcupacaoConstatado] = useState<boolean>(false);
  const [qtdePavimentos, setQtdePavimentos] = useState<boolean>(true);
  const [familiar, setFamiliar] = useState<boolean>(true);
  const [multifamiliar, setMultifamiliar] = useState<boolean>(true);
  const [comercio, setComercio] = useState<boolean>(true);
  const [servico, setServico] = useState<boolean>(true);
  const [industria, setIndustria] = useState<boolean>(true);
  const [usoFachadaBoaCondicao, setUsoFachadaBoaCondicao] = useState<boolean>(true);
  const [usoEsquadriaBoaCondicao, setUsoEsquadriaBoaCondicao] = useState<boolean>(true);
  const [usoPodaVegetacao, setUsoPodaVegetacao] = useState<boolean>(true);
  const [areaConstruidaNaoComputavel, setAreaConstruidaNaoComputavel] = useState<boolean>(false);
  const [confirma, setConfirma] = useState(false)
  const [id, setId] = useState('')
  const theme = useTheme();
  const backgroudLevel1 = theme.palette.background.level1;

  const router = useRouter();
  const [rows, setRows] = useState<CadastrosResponseDTO[]>([]);
  const searchParam = useSearchParams();
  const { setAlert } = useContext(AlertsContext);

  const getProcessos = async () => {
    await cadastroServices.getAllProcessos().then((response) => {
      console.log(response);
    }).then(() => {
    })
  };

  const confirmaOperacao = async () => {
    await cadastroServices.deleteCadastro(id)
      .then((response) => {
        if (response) {
          setAlert('Processo Deletado!', 'Processo deletado com sucesso!', 'warning', 3000, WarningIcon);
          setConfirma(false)
          getProcessos()
        }
      })
  }

  const tableRef = useRef<HTMLTableElement>(null);
  const [tableSize, setTableSize] = useState(0);
  useEffect(() => {
    setTableSize(tableRef.current?.offsetWidth || 0);
    const updateSize = () => {
      if (tableRef.current) {
        setTableSize(tableRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [tableSize]);

  const notificacao = () => {
    const att = searchParam.get('att');
    const add = searchParam.get('add');
    if (att === '0') {
      setAlert('Processo Atualizado!', 'Processo atualizado com sucesso!', 'success', 3000, Check);
    }
    if (add === '0') {
      setAlert('Processo Criado!', 'Processo criado com sucesso!', 'success', 3000, Check);

    }
  }

  useEffect(() => {
    getProcessos();
    notificacao();
  }, []);

  const [openRows, setOpenRows] = React.useState<any>({});

  const handleRowToggle = (id: any) => {
    setOpenRows((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  return (
    <Content
      breadcrumbs={[{ label: 'Cadastramento', href: '/cadastramento' }]}
      titulo="Cadastramento"
      pagina="Cadastramento"
    >
      <Snackbar
        variant="solid"
        color="danger"
        size="lg"
        invertedColors
        open={confirma}
        onClose={() => { setConfirma(false); setId('') }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ maxWidth: 360 }}
      >
        <div>
          <Typography level="title-lg">Deletar Vistoria!</Typography>
          <Typography sx={{ mt: 1, mb: 2 }} level="title-md">Tem certeza que desseja deletar esta vistoria?</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="solid" color="primary" onClick={() => confirmaOperacao()}>
              Sim
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setConfirma(false)}
            >
              Não
            </Button>
          </Stack>
        </div>
      </Snackbar>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', gap: 3, mb: 5 }}>
        <Button
          onClick={() => { router.push('/cadastramento/detalhes') }}
          sx={{ bgcolor: theme.palette.text.primary, color: 'background.body', '&:hover': { bgcolor: theme.palette.text.primary, color: 'background.body' } }}
          startDecorator={<AddIcon sx={{ height: 20, width: 20 }} />}>
          Criar Cadastro
        </Button>
      </Box>
      <Sheet sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, boxShadow: 'xs' }}>
        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
          <Select
            placeholder="Selecione um tipo"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: 350,
            }}
          >
            <Option value={0}>Ativos</Option>
            <Option value={1}>Deletados</Option>
          </Select>
          <Input
            startDecorator={<SearchIcon sx={{ width: 20, height: 20 }} />}
            placeholder={'Pesquise por SQL'}
            sx={{ width: '100%' }}
          />
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
              sx={{ width: 40 }}
            >
              <ViewWeekSharpIcon sx={{ height: 20, width: 20 }} />
            </MenuButton>
            <Menu placement="bottom-end">
              <MenuList sx={{ fontWeight: 'bold', pl: 2 }}>Tabela Principal</MenuList>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '50%' }}>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setProcesso(!processo)} checked={processo} label="Processo" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setTipoVistoria(!tipoVistoria)} checked={tipoVistoria} label="Tipo vistoria" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setImovel(!imovel)} checked={imovel} label="Imovel" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setTipologia(!tipologia)} checked={tipologia} label="Tipologia" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setTipoUso(!tipoUso)} checked={tipoUso} label="Tipo uso" /></MenuList>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setDataVistoria(!dataVistoria)} checked={dataVistoria} label="Data vistoria" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setAreaConstruidaTotalConstatada(!areaConstruidaTotalConstatada)} checked={areaConstruidaTotalConstatada} label="Area construida constatada" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setAreaLoteTotalConstatada(!areaLoteTotalConstatada)} checked={areaLoteTotalConstatada} label="Lote total constatada" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setAreaCoberturaTotalConstatada(!areaCoberturaTotalConstatada)} checked={areaCoberturaTotalConstatada} label="Cober. total constatada" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setIndiceOcupacaoConstatado(!indiceOcupacaoConstatado)} checked={indiceOcupacaoConstatado} label="Indice Ocupacao" /></MenuList>
                </Box>
              </Box>
              <ListDivider />
              <MenuList sx={{ p: 2, fontWeight: 'bold' }}>Tabela de Informações</MenuList>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setQtdePavimentos(!qtdePavimentos)} checked={qtdePavimentos} label="Quantidade de pavimentos" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setFamiliar(!familiar)} checked={familiar} label="Familiar" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setMultifamiliar(!multifamiliar)} checked={multifamiliar} label="Multi familiar" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setComercio(!comercio)} checked={comercio} label="Comercio" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setServico(!servico)} checked={servico} label="Servico" /></MenuList>
                </Box>
                <Box>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setIndustria(!industria)} checked={industria} label="Industria" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setUsoFachadaBoaCondicao(!usoFachadaBoaCondicao)} checked={usoFachadaBoaCondicao} label="Fachada boa condição" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setUsoEsquadriaBoaCondicao(!usoEsquadriaBoaCondicao)} checked={usoEsquadriaBoaCondicao} label="Esquadria boa condição" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setUsoPodaVegetacao(!usoPodaVegetacao)} checked={usoPodaVegetacao} label="Poda Vegetação" /></MenuList>
                  <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setAreaConstruidaNaoComputavel(!areaConstruidaNaoComputavel)} checked={areaConstruidaNaoComputavel} label="Area construida não computada" /></MenuList>
                </Box>
              </Box>
            </Menu>
          </Dropdown>
        </Box>
        <Table aria-label="collapsible table" ref={tableRef}>
          <thead>
            <tr>
              <th style={{ backgroundColor: backgroudLevel1 }}>ID</th>
              {processo ? <th style={{ backgroundColor: backgroudLevel1 }}>Atuação Sei</th> : null}
              {imovel ? <th style={{ backgroundColor: backgroudLevel1 }}>Data Atuação</th> : null}
              {tipoVistoria ? <th style={{ backgroundColor: backgroudLevel1 }}>Imovel Contiguidade</th> : null}
              {tipologia ? <th style={{ backgroundColor: backgroudLevel1 }}>Area Total Construida</th> : null}
              {tipoUso ? <th style={{ backgroundColor: backgroudLevel1 }}>Area Lote Total</th> : null}
              {dataVistoria ? <th style={{ backgroundColor: backgroudLevel1 }}>Origem prospequição</th> : null}
              {areaConstruidaTotalConstatada ? <th style={{ backgroundColor: backgroudLevel1 }}>Area construida constatada</th> : null}
              {areaLoteTotalConstatada ? <th style={{ backgroundColor: backgroudLevel1 }}>Lote total constatada</th> : null}
              {areaCoberturaTotalConstatada ? <th style={{ backgroundColor: backgroudLevel1 }}>Origem prospecção</th> : null}
              {indiceOcupacaoConstatado ? <th style={{ backgroundColor: backgroudLevel1 }}>Tipologia prospecção</th> : null}
              {indiceOcupacaoConstatado ? <th style={{ backgroundColor: backgroudLevel1 }}>Data Prospecção</th> : null}
              {indiceOcupacaoConstatado ? <th style={{ backgroundColor: backgroudLevel1 }}>Estado</th> : null}
              {indiceOcupacaoConstatado ? <th style={{ backgroundColor: backgroudLevel1 }}>Usuario</th> : null}
              {indiceOcupacaoConstatado ? <th style={{ backgroundColor: backgroudLevel1 }}>Criado</th> : null}
              <th style={{ backgroundColor: backgroudLevel1, width: '4%' }} aria-label="empty" />
              <th style={{ backgroundColor: backgroudLevel1, width: '4%' }} aria-label="empty" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row: CadastrosResponseDTO) => (
              <React.Fragment key={row.id}>
                <Tooltip title={row.autuacaoSei} color="neutral" placement="bottom" variant={'outlined'}>
                  <tr>
                    <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}># {row.id}</td>
                    {processo ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.autuacaoSei}</td> : null}
                    {imovel ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{new Date(row.autuacaoData).toLocaleDateString()}</td> : null}
                    {tipoVistoria ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.imovelContiguidade}</td> : null}
                    {tipologia ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.areaConstruidaTotal}</td> : null}
                    {tipoUso ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.areaLoteTotal}</td> : null}
                    {dataVistoria ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{new Date(row.prospeccaoOrigem).toLocaleDateString()}</td> : null}
                    {areaConstruidaTotalConstatada ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.prospeccaoTipologia}</td> : null}
                    {areaLoteTotalConstatada ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{new Date(row.prospeccaoData).toLocaleDateString()}</td> : null}
                    {areaCoberturaTotalConstatada ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.estado}</td> : null}
                    {indiceOcupacaoConstatado ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.usuarioId}</td> : null}
                    {indiceOcupacaoConstatado ? <td style={{ cursor: 'pointer' }} onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{new Date(row.criadoEm).toLocaleDateString()}</td> : null}
                    <td>
                      <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => handleRowToggle(row.id)}
                      >
                        <KeyboardArrowUpIcon sx={{ transition: '0.2s', transform: openRows[row.id] ? 'rotate(0deg)' : 'rotate(180deg)' }} />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton size="sm" variant="soft" color="neutral">
                        <DeleteForeverIcon onClick={() => { setConfirma(true) }} sx={{ color: theme.palette.text.primary, width: 25, height: 25 }} />
                      </IconButton>
                    </td>
                  </tr>
                </Tooltip>
                {openRows[row.id] && (
                  <Sheet variant="soft" sx={{ p: 1.6, height: '152px', width: tableSize }}>
                    <Box sx={{ bgcolor: 'background.body', p: 1, borderRadius: 10, height: '100%' }}>
                      <Typography sx={{ fontWeight: 900, fontSize: '14px', lineHeight: '22px', pb: 1, pl: 1 }}>
                        Imovel | Imoves vinculados
                      </Typography>
                      <Table >
                        <thead style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>
                          <tr>
                            {qtdePavimentos ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>ID</th> : null}
                            {familiar ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Id Sei</th> : null}
                            {multifamiliar ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Id sql</th> : null}
                            {comercio ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>SQL Setor</th> : null}
                            {servico ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>SQL Quadra</th> : null}
                            {industria ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>SQL Lote</th> : null}
                            {usoFachadaBoaCondicao ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>SQL digito</th> : null}
                            {usoEsquadriaBoaCondicao ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>SQL Pai</th> : null}
                            {usoPodaVegetacao ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>SQL Filho</th> : null}
                            {areaConstruidaNaoComputavel ? <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Registro Notas Referencia</th> : null}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {qtdePavimentos ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].id}</td> : null}
                            {familiar ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].seiId}</td> : null}
                            {multifamiliar ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].sqlId}</td> : null}
                            {comercio ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].sqlSetor}</td> : null}
                            {servico ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].sqlQuadra}</td> : null}
                            {industria ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].sqlLote}</td> : null}
                            {usoFachadaBoaCondicao ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].sqlDigito}</td> : null}
                            {usoEsquadriaBoaCondicao ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].sqlPai}</td> : null}
                            {usoPodaVegetacao ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].sqlFilho}</td> : null}
                            {areaConstruidaNaoComputavel ? <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.ProcessoImovel[0].registroNotasReferencia}</td> : null}
                          </tr>
                        </tbody>
                      </Table>
                    </Box>
                  </Sheet>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        <Box sx={{ display: 'flex', gap: 2, p: 2, justifyContent: 'end', alignItems: 'center' }}>
          <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>Linhas por página:</Typography>
          <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>5</Typography>
          <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>1-5 de 20</Typography>
          <Box>
            <IconButton>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Sheet>
    </Content>
  );
}