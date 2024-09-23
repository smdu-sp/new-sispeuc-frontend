'use client'

import Content from '@/components/Content';
import { useEffect, useState, useContext, useRef } from 'react';
import { Box, Button, Input, Tooltip, Typography, useTheme, IconButton, Dropdown, MenuButton, Menu, MenuItem, ListItemDecorator, ListDivider, Checkbox } from '@mui/joy';
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
import * as vistoriaServices from '@/shared/services/vistorias/vistoria.service';
import { VistoriaResponseDTO } from '@/types/vistorias/vistorias.dto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AlertsContext } from "@/providers/alertsProvider";
import { set } from 'zod';
import { Check, MoreVert } from '@mui/icons-material';
import { MenuList } from '@mui/material';
import ViewWeekSharpIcon from '@mui/icons-material/ViewWeekSharp';
import { MenuContext } from '@/shared/contexts/MenuContext';

export default function Prospeccao() {

  const [processo, setProcesso] = useState<boolean>(true);
  const [imovel, setImovel] = useState<boolean>(true);
  const [tipoVistoria, setTipoVistoria] = useState<boolean>(true);
  const [tipologia, setTipologia] = useState<boolean>(true);
  const [tipoUso, setTipoUso] = useState<boolean>(true);
  const [dataVistoria, setDataVistoria] = useState<boolean>(true);
  const [areaConstruidaTotalConstatada, setAreaConstruidaTotalConstatada] = useState<boolean>(true);
  const [areaLoteTotalConstatada, setAreaLoteTotalConstatada] = useState<boolean>(true);
  const [areaCoberturaTotalConstatada, setAreaCoberturaTotalConstatada] = useState<boolean>(true);
  const [indiceOcupacaoConstatado, setIndiceOcupacaoConstatado] = useState<boolean>(true);
  const [qtdePavimentos, setQtdePavimentos] = useState<boolean>(true);
  const [familiar, setFamiliar] = useState<boolean>(true);
  const [multifamiliar, setMultifamiliar] = useState<boolean>(true);
  const [comercio, setComercio] = useState<boolean>(true);
  const [servico, setServico] = useState<boolean>(true);
  const [industria, setIndustria] = useState<boolean>(true);
  const [usoFachadaBoaCondicao, setUsoFachadaBoaCondicao] = useState<boolean>(true);
  const [usoEsquadriaBoaCondicao, setUsoEsquadriaBoaCondicao] = useState<boolean>(true);
  const [usoPodaVegetacao, setUsoPodaVegetacao] = useState<boolean>(true);
  const [areaConstruidaNaoComputavel, setAreaConstruidaNaoComputavel] = useState<boolean>(true);

  const theme = useTheme();
  const backgroudLevel1 = theme.palette.background.level1;
  const router = useRouter();
  const [rows, setRows] = useState<VistoriaResponseDTO[]>([]);
  const searchParam = useSearchParams();
  const { setAlert } = useContext(AlertsContext);
  const getVistorias = async () => {
    await vistoriaServices.getAllVistorias().then((response) => {
      setRows(response);
    }).then(() => {
    })
  };


  
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
      setAlert('Vistoria Atualizada!', 'Vistoria atualizada com sucesso!', 'success', 3000, Check);
    }
    if (add === '0') {
      setAlert('Vistoria Criada!', 'Vistoria criada com sucesso!', 'success', 3000, Check);

    }
  }

  useEffect(() => {
    getVistorias();
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
      breadcrumbs={[{ label: 'Vistoria', href: '/vistoria' }]}
      titulo="Vistorias"
      pagina="vistoria"
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', gap: 3, mb: 5 }}>
        <Button onClick={() => { router.push('/vistoria/detalhes') }} sx={{ bgcolor: theme.palette.text.primary, color: 'background.body' }} startDecorator={<AddIcon sx={{ height: 20, width: 20 }} />}>Criar ficha em branco</Button>
      </Box>
      <Sheet sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, boxShadow: 'xs' }}>
        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
          <Select
            placeholder="Selecione um tipo"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: 350,
              height: 56,
            }}
          >
            <Option value={0}>ID</Option>
            <Option value={1}>Endereço</Option>
            <Option value={2}>SQLD</Option>
            <Option value={3}>Processo</Option>
            <Option value={4}>Status</Option>
            <Option value={5}>Ação</Option>
          </Select>
          <Input
            startDecorator={<SearchIcon sx={{ width: 25, height: 25 }} />}
            placeholder={'Pesquise por SQL'}
            sx={{ width: '100%', height: 56 }}
          />
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
              sx={{ width: 60 }}
            >
              <ViewWeekSharpIcon sx={{ height: 30, width: 30 }} />
            </MenuButton>
            <Menu placement="bottom-end" sx={{ width: '200' }}>
              <MenuList sx={{ textAlign: 'center', fontWeight: 'bold' }}>Tabela Principal</MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setProcesso(!processo)} checked={processo} label="Processo" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setTipoVistoria(!tipoVistoria)} checked={tipoVistoria} label="Tipo vistoria" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setImovel(!imovel)} checked={imovel} label="Imovel" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setTipologia(!tipologia)} checked={tipologia} label="Tipologia" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setTipoUso(!tipoUso)} checked={tipoUso} label="Tipo uso" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setDataVistoria(!dataVistoria)} checked={dataVistoria} label="Data vistoria" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setAreaConstruidaTotalConstatada(!areaConstruidaTotalConstatada)} checked={areaConstruidaTotalConstatada} label="Area construida constatada" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setAreaLoteTotalConstatada(!areaLoteTotalConstatada)} checked={areaLoteTotalConstatada} label="Lote total constatada" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setAreaCoberturaTotalConstatada(!areaCoberturaTotalConstatada)} checked={areaCoberturaTotalConstatada} label="Cober. total constatada" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setIndiceOcupacaoConstatado(!indiceOcupacaoConstatado)} checked={indiceOcupacaoConstatado} label="Indice Ocupacao" /></MenuList>
              <ListDivider />
              <MenuList sx={{ textAlign: 'center', fontWeight: 'bold' }}>Tabela de Informações</MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setQtdePavimentos(!qtdePavimentos)} checked={qtdePavimentos} label="Quantidade de pavimentos" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setFamiliar(!familiar)} checked={familiar} label="Familiar" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setMultifamiliar(!multifamiliar)} checked={multifamiliar} label="Multi familiar" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setComercio(!comercio)} checked={comercio} label="Comercio" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setServico(!servico)} checked={servico} label="Servico" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setIndustria(!industria)} checked={industria} label="Industria" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setUsoFachadaBoaCondicao(!usoFachadaBoaCondicao)} checked={usoFachadaBoaCondicao} label="Fachada boa condição" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setUsoEsquadriaBoaCondicao(!usoEsquadriaBoaCondicao)} checked={usoEsquadriaBoaCondicao} label="Esquadria boa condição" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setUsoPodaVegetacao(!usoPodaVegetacao)} checked={usoPodaVegetacao} label="Poda Vegetação" /></MenuList>
              <MenuList sx={{ px: 2 }}><Checkbox onChange={() => setAreaConstruidaNaoComputavel(!areaConstruidaNaoComputavel)} checked={areaConstruidaNaoComputavel} label="Area construida não computada" /></MenuList>
            </Menu>
          </Dropdown>
        </Box>
        <Table aria-label="collapsible table" ref={tableRef}>
          <thead>
            <tr>
              <th style={{ backgroundColor: backgroudLevel1 }}>ID</th>
              { processo ? <th style={{ backgroundColor: backgroudLevel1 }}>Processo</th> : null}
              { imovel ? <th style={{ backgroundColor: backgroudLevel1 }}>Imovel</th> : null}
              { tipoVistoria ? <th style={{ backgroundColor: backgroudLevel1 }}>Vistoria</th> : null}
              { tipologia ? <th style={{ backgroundColor: backgroudLevel1 }}>Tipologia</th> : null}
              { tipoUso ? <th style={{ backgroundColor: backgroudLevel1 }}>Tipo uso</th> : null}
              { dataVistoria ? <th style={{ backgroundColor: backgroudLevel1 }}>Data vistoria</th> : null}
              { areaConstruidaTotalConstatada ? <th style={{ backgroundColor: backgroudLevel1 }}>Area construida constatada</th> : null}
              { areaLoteTotalConstatada ? <th style={{ backgroundColor: backgroudLevel1 }}>Lote total constatada</th> : null}
              { areaCoberturaTotalConstatada ? <th style={{ backgroundColor: backgroudLevel1 }}>Cober. total constatada</th> : null}
              { indiceOcupacaoConstatado ? <th style={{ backgroundColor: backgroudLevel1 }}>Indice Ocupacao</th> : null}
              <th style={{ backgroundColor: backgroudLevel1, width: '4%' }} aria-label="empty" />
              <th style={{ backgroundColor: backgroudLevel1, width: '4%' }} aria-label="empty" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row: VistoriaResponseDTO) => (
              <React.Fragment key={row.id}>
                <Tooltip title={row.descricao} color="neutral" placement="bottom" variant={'outlined'}>
                  <tr>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}># {row.id}</td>
                    { processo ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.processoId}</td> : null}
                    { imovel ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.imovelId}</td> : null}
                    { tipoVistoria ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.tipoVistoria}</td> : null}
                    { tipologia ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.tipoTipologia}</td> : null}
                    { tipoUso ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.tipoUso}</td> : null}
                    { dataVistoria ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{new Date(row.dataVistoria).toLocaleDateString()}</td> : null}
                    { areaConstruidaTotalConstatada ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.areaConstruidaTotalConstatada}</td> : null}
                    { areaLoteTotalConstatada ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.areaLoteTotalConstatada}</td> : null}
                    { areaCoberturaTotalConstatada ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.areaCoberturaTotalConstatada}</td> : null}
                    { indiceOcupacaoConstatado ? <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.indiceOcupacaoConstatado}</td> : null}
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
                        <DeleteForeverIcon sx={{ color: theme.palette.text.primary, width: 25, height: 25 }} />
                      </IconButton>
                    </td>
                  </tr>
                </Tooltip>
                {openRows[row.id] && (
                  <Sheet variant="soft" sx={{ p: 1.6, height: '152px', width: tableSize }}>
                    <Box sx={{ bgcolor: 'background.body', p: 1, borderRadius: 10, height: '100%' }}>
                      <Typography sx={{ fontWeight: 900, fontSize: '14px', lineHeight: '22px', pb: 1, pl: 1 }}>
                        Outras informações
                      </Typography>
                      <Table >
                        <thead style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>
                          <tr>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Qtde. pavimentos</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Familiar</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Mult. familiar</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Comercio</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Servico</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Industria</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Fach boa condição</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Esqd boa condição</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Poda vegetação</th>
                            <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Area construida não computada</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.qtdePavimentos}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.unifamiliar ? 'Sim' : 'Não'}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.multifamiliar ? 'Sim' : 'Não'}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.comercio ? 'Sim' : 'Não'}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.servico ? 'Sim' : 'Não'}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.industria ? 'Sim' : 'Não'}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.usoFachadaBoaCondicao ? 'Sim' : 'Não'}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.usoEsquadriaBoaCondicao ? 'Sim' : 'Não'}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.usoPodaVegetacao ? 'Sim' : 'Não'}</td>
                            <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.areaConstruidaNaoComputavel}</td>
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