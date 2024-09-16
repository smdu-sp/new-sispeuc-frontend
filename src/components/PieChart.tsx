import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { blue } from '@mui/material/colors';

export const desktopOS = [
    {
        label: 'Prospectados',
        value: 9.2,
    },
    {
        label: 'Cadastrados',
        value: 28.4,
    },
    {
        label: 'Em vistoria',
        value: 34.7,
    },
    {
        label: 'Despachados',
        value: 27.7,
    },
];

export const valueFormatter = (item: { value: number }) => `${item.value}%`;

export default function PieArcLabel() {
    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.value}%`,
                    arcLabelMinAngle: 3,
                    arcLabelRadius: '80%',
                    ...data,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    letterSpacing: 1
                }
            }}
            height={400}
            colors={['#003562', '#FF5630', '#FFAB00', '#1877F2']}
        />
    );
}

const data = {
    data: desktopOS,
    valueFormatter,
};