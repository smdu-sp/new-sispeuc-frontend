'use client'

import Content from '@/components/Content';
import { useSearchParams } from 'next/navigation';
import * as usuarioServices from '@/shared/services/usuario.services';
import { IUsuario } from '@/shared/services/usuario.services';
import { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Chip, Input, Tooltip, Typography, useTheme } from '@mui/joy';
import 'react-material-symbols/rounded';
import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const rows = [
  {
    id: '6010',
    endereco: 'Av. Angélica, 2330 - Higienópolis, São Paulo - SP, 01228-200',
    sqld: '12345-678',
    numero: '#208120',
    status: 'Despachado',
    ficha_id: '123456',
    data_prospeccao: '12/04/2024',
    origem: 'SF 2014',
    macroarea: 'Estruturação Metropolitana',
    zona: 'ZEIS-1',
    area: '2000m2',
    matricula: '3901882190-9',
    descricao: 'sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfds'
  },
  {
    id: '6111',
    endereco: 'Av. Angélica, 2330 - Higienópolis, São Paulo - SP, 01228-200',
    sqld: '12345-678',
    numero: '#208120',
    status: 'Cadastrado',
    ficha_id: '123456',
    data_prospeccao: '12/04/2024',
    origem: 'SF 2014',
    macroarea: 'Estruturação Metropolitana',
    zona: 'ZEIS-2',
    area: '2000m2',
    matricula: '3901882190-9',
    descricao: 'sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfds'
  }
];

export default function Prospeccao() {
  const theme = useTheme();
  const backgroudLevel1 = theme.palette.background.level1;
  const router = useRouter();

  const [openRows, setOpenRows] = React.useState<any>({});

  const handleRowToggle = (id: any) => {
    setOpenRows((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
  };

  return (
    <Content
      breadcrumbs={[{ label: 'Vistoria', href: '/vistoria' }]}
      titulo="Vistorias"
      pagina="vistoria"
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', gap: 3, mb: 5 }}>
        {/* <div>
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button
            component="label"
            htmlFor="file-upload"
            sx={{ bgcolor: theme.palette.text.icon, color: 'background.body' }}
            startDecorator={<UploadIcon sx={{ height: 20, width: 20 }} />}
          >
            Importar imóveis
          </Button>
        </div> */}
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
              <th style={{ backgroundColor: backgroudLevel1, width: '5%', paddingLeft: 20 }}>
                <Paper elevation={0} sx={{ height: 20, width: 20, border: '1px rgba(99, 115, 129, 0.3) solid' }} />
              </th>
              <th style={{ backgroundColor: backgroudLevel1 }}>ID</th>
              <th style={{ backgroundColor: backgroudLevel1, width: '10%' }}>Processo</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Vistoria</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Tipologia</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Tipo uso</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Data vistoria</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Area construida constatada</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Area construida não computada</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Lote total constatada</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Cober. total constatada</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Indice Ocupacao</th>
              <th style={{ backgroundColor: backgroudLevel1, width: '5%' }} aria-label="empty" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <Tooltip title={row.descricao} color="neutral" placement="bottom" variant={'outlined'}>
                  <tr>
                    <td style={{ paddingLeft: 20 }}><Checkbox /></td>
                    <td># {row.id}</td>
                    <td>{row.endereco}</td>
                    <td>{row.sqld}</td>
                    <td>{row.sqld}</td>
                    <td>{row.sqld}</td>
                    <td>{row.sqld}</td>
                    <td>{row.sqld}</td>
                    <td>{row.sqld}</td>
                    <td>{row.numero}</td>
                    <td><Chip color="success" variant="soft">{row.status}</Chip></td>
                    <td>
                      <Button onClick={() => { router.push('prospeccao/detalhes/' + row.id) }} sx={{ bgcolor: theme.palette.text.primary, color: backgroudLevel1 }}>
                        Ver Ficha
                      </Button>
                    </td>
                    <td>
                      <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => handleRowToggle(row.id)}
                      >
                        <KeyboardArrowUpIcon sx={{ transition: '0.2s', transform: openRows[row.id] ? 'rotate(-180deg)' : 'rotate(0deg)' }} />
                      </IconButton>
                    </td>
                  </tr>
                </Tooltip>
                <tr>
                  <td style={{ height: 0, padding: 0 }} colSpan={13}>
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
                                <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Esqd boa condição</th>
                                <th style={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}>Esqd boa condição</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.data_prospeccao}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.origem}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.macroarea}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.zona}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.area}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.area}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.area}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.area}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.area}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.area}</td>
                                <td style={{ padding: 0, height: 5, paddingLeft: 8 }}>{row.matricula}</td>
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