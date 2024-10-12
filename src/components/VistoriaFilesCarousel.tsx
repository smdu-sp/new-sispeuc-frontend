'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { VistoriaAssetDto } from '@/types/vistorias/vistorias.dto';

export default function VistoriaFilesCarousel(
    { vistoriaAssets, selectedIndex, setSelectedIndex }: 
    { 
        vistoriaAssets: VistoriaAssetDto[], 
        selectedIndex: number, 
        setSelectedIndex: Function 
    }
) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = vistoriaAssets.length;

  React.useEffect(() => {
    selectedIndex && setActiveStep(selectedIndex);
  });

  const handleNext = () => {
    setSelectedIndex(selectedIndex + 1);
};

  const handleBack = () => {
    setSelectedIndex(selectedIndex - 1);
  };

  return (
    <Box key={vistoriaAssets[selectedIndex ? selectedIndex : 0].id}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{vistoriaAssets[selectedIndex ? selectedIndex : 0].nomeArquivo}</Typography>
      </Paper>
      <Box 
        sx={{ 
            p: 2,
            maxHeight: '80vh', 
            overflowY: 'scroll'
        }}
      >
        <img 
            style={{ width: '800px', padding: 5 }}     
            src={vistoriaAssets[selectedIndex ? selectedIndex : 0].url} 
            alt={vistoriaAssets[selectedIndex ? selectedIndex : 0].nomeArquivo} 
        />
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={selectedIndex ? selectedIndex : 0}
        nextButton={
          <Button
            variant='outlined' 
            color='inherit'
            size="small"
            onClick={handleNext}
            disabled={selectedIndex === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button 
            variant='outlined' 
            color='inherit' 
            size="small" 
            onClick={handleBack} 
            disabled={selectedIndex === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}
