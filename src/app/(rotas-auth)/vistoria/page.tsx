'use client'

import Content from '@/components/Content';
import { useEffect, useState } from 'react';
import { Box, Button, Input, Tooltip, Typography, useTheme } from '@mui/joy';
import 'react-material-symbols/rounded';
import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
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
import { useRouter } from 'next/navigation';
import * as vistoriaServices from '@/shared/services/vistorias/vistoria.service';
import { VistoriaResponseDTO } from '@/types/vistorias/vistorias.dto';

export default function Prospeccao() {

  const theme = useTheme();
  const backgroudLevel1 = theme.palette.background.level1;
  const router = useRouter();
  const [rows, setRows] = useState<VistoriaResponseDTO[]>([]);

  const getVistorias = async () => {
    await vistoriaServices.getAllVistorias().then((response) => {
      setRows(response);
    })
  };

  useEffect(() => {
    getVistorias();
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
        </Box>
        <Table aria-label="collapsible table">
          <thead>
            <tr>
              {/* <th style={{ backgroundColor: backgroudLevel1, width: '5%', paddingLeft: 20 }}>
                <Paper elevation={0} sx={{ height: 20, width: 20, border: '1px rgba(99, 115, 129, 0.3) solid' }} />
              </th> */}
              <th style={{ backgroundColor: backgroudLevel1 }}>ID</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Processo</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Imovel</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Vistoria</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Tipologia</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Tipo uso</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Data vistoria</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Area construida constatada</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Lote total constatada</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Cober. total constatada</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Indice Ocupacao</th>
              <th style={{ backgroundColor: backgroudLevel1, width: '5%' }} aria-label="empty" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row: VistoriaResponseDTO) => (
              <React.Fragment key={row.id}>
                <Tooltip title={row.descricao} color="neutral" placement="bottom" variant={'outlined'}>
                  <tr>
                    {/* <td style={{ paddingLeft: 20 }}><Checkbox /></td> */}
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}># {row.id}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.processoId}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.imovelId}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.tipoVistoria}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.tipoTipologia}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.tipoUso}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{new Date(row.dataVistoria).toLocaleDateString()}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.areaConstruidaTotalConstatada}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.areaLoteTotalConstatada}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.areaCoberturaTotalConstatada}</td>
                    <td onClick={() => { router.push('/vistoria/detalhes/' + row.id) }}>{row.indiceOcupacaoConstatado}</td>
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
                  </tr>
                </Tooltip>
                <tr>
                  <td style={{ height: 0, padding: 0 }} colSpan={12}>
                    {openRows[row.id] && (
                      <Sheet variant="soft" sx={{ p: 1.6, height: '152px' }}>
                        <Box sx={{ bgcolor: 'background.body', p: 1, borderRadius: 10, height: '100%' }}>
                          <Typography sx={{ fontWeight: 900, fontSize: '14px', lineHeight: '22px', pb: 1, pl: 1 }}>
                            Outras informações
                          </Typography>
                          <Table>
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
                  </td>
                </tr>
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