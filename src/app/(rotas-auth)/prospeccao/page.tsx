'use client'

import Content from '@/components/Content';
import { useSearchParams } from 'next/navigation';
import * as usuarioServices from '@/shared/services/usuario.services';
import { IUsuario } from '@/shared/services/usuario.services';
import { useEffect, useState } from 'react';
import { Box, Button, Chip, Input, Typography, useTheme } from '@mui/joy';
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

const rows = [
  {
    id: '#6010',
    endereco: 'Av. Angélica, 2330 - Higienópolis, São Paulo - SP, 01228-200',
    sqld: '12345-678',
    numero: '#208120',
    status: 'Denunciado',
    ficha_id: '123456'
  }
];

export default function Prospeccao() {

  const theme = useTheme()

  const backgroudLevel1 = theme.palette.background.level1;

  const [open, setOpen] = React.useState(false);

  return (
    <Content
      breadcrumbs={[
        { label: 'Prospecção', href: '/prospeccao' },
      ]}
      titulo='Prospecção'
      pagina="Prospecção"
    >
      <Sheet sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, boxShadow: '6px 10px 15px #919EAB1F' }}>
        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
          <Select
            placeholder="Selecione um tipo"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: 350,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.5s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
            }}
          >
            <Option value={0}>ID</Option>
            <Option value={1}>Endereço</Option>
            <Option value={2}>SQLD</Option>
            <Option value={3}>Processo</Option>
            <Option value={4}>Status</Option>
            <Option value={5}>Ação</Option>
          </Select>
          <Input placeholder="Digite aqui..." sx={{ width: '100%' }} />
        </Box>
        <Table
          aria-label="collapsible table"
        >
          <thead>
            <tr>
              <th style={{ backgroundColor: backgroudLevel1 }}>ID</th>
              <th style={{ backgroundColor: backgroudLevel1, width: "25%" }}>Endereço</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>SQLD</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Processo</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Status</th>
              <th style={{ backgroundColor: backgroudLevel1 }}>Ação</th>
              <th style={{backgroundColor: backgroudLevel1, width: "5%" }} aria-label="empty" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <React.Fragment key={row.id}> 
                <tr>
                  <th scope="row">{row.id}</th>
                  <td>{row.endereco}</td>
                  <td>{row.sqld}</td>
                  <td>{row.numero}</td>
                  <td><Chip color='danger' variant='soft' >{row.status}</Chip></td>
                  <td>
                    <Button sx={{ bgcolor: theme.palette.text.primary, color: backgroudLevel1 }} >
                      Ver Ficha
                    </Button>
                  </td>
                  <td>
                    <IconButton
                      aria-label="expand row"
                      variant="plain"
                      color="neutral"
                      size="sm"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </td>
                </tr>
                <tr>
                  <td style={{ height: 0, padding: 0 }} colSpan={7}>
                    {open && (
                      <Sheet
                        variant="soft"
                        sx={{ p: 1, pl: 6 }}
                      >
                        <Typography level="h4" component="div">
                          Outras informações
                        </Typography>
                      </Sheet>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))

            }

          </tbody>
        </Table>
        <Box sx={{ display: 'flex', gap: 2, p: 2, justifyContent: 'end', alignItems: 'center' }}>
          <Typography level='body-sm' sx={{ fontWeight: 'bold' }}>Linhas por página:</Typography>
          <Typography level='body-sm' sx={{ fontWeight: 'bold' }}>5</Typography>
          <Typography level='body-sm' sx={{ fontWeight: 'bold' }}>1-5 de 20</Typography>
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