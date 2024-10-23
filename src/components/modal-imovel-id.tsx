'use client'

import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import ApartmentIcon from '@mui/icons-material/Apartment';

import { Autocomplete } from '@mui/joy';
import { getAllProspeccoes } from '@/shared/services/prospeccoes/prospeccoes.service';
import { useRouter } from 'next/navigation';

export default function ModalImovelId(
    { open, setOpen }: 
    { open: boolean, setOpen: Function }
) {
  const [ imoveisLabel, setImoveisLabel ] = React.useState<any>();
  const [ imovelId, setImovelId ] = React.useState<number>();
  const router = useRouter();

  React.useEffect(() => {
    getAllProspeccoes(10, 0, 'atualizadoEm', 'asc')
      .then(r => {
        const lbl: any = [];
        r.forEach(r => {
          lbl.push({ label: r.enderecoLogradouro + ', ' + r.enderecoNumero, value: r.id });
        });
        setImoveisLabel(lbl);
      });
  }, []);

  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Associar imóvel</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Logradouro</FormLabel>
                <Stack spacing={2}>
                  <Autocomplete
                    required
                    startDecorator={<ApartmentIcon />}
                    placeholder="Imóveis"
                    options={imoveisLabel}
                    onChange={(e: any) => setImovelId(imoveisLabel[e.target.value].value)}
                  />
                </Stack>
              </FormControl>
              <Button 
                type="submit" 
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/vistoria/detalhes' + `?imovelId=${imovelId}`)
                }}
              >
                Associar
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
