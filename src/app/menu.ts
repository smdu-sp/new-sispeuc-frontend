import { Business, Handyman, Home, Person } from '@mui/icons-material';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FindInPageIcon from '@mui/icons-material/FindInPage';

export interface IMenuOption {
    title:  string;
    href:   string;
    name:   string;
    icon:   any; 
    cor?:    string;
};

export interface IMenu {
    userOptions:    IMenuOption[];
    adminOptions:   IMenuOption[];
}


export const menu: IMenu = {
    userOptions: [
        {
            title: 'Página Inicial',
            href: '/',
            name: '/',
            icon: Home,
            cor: '#000',
        },
        {
            title: 'Prospecção',
            href: '/prospecção',
            name: 'prospecção',
            icon: GroupAddOutlinedIcon,
            cor: '#283593',
        },
        {
            title: 'Cadastramento',
            href: '/cadastramento',
            name: 'cadastramento',
            icon: LocationCityIcon,
            cor: '#d50000',
        },
        {
            title: 'Vistoria',
            href: '/vistoria',
            name: 'vistoria',
            icon: FindInPageIcon,
            cor: '#ffb300',
        },
        {
            title: 'Despacho',
            href: '/despacho',
            name: 'despacho',
            icon: DomainAddIcon,
            cor: '#00b0ff',
        }
    ],
    adminOptions: [
        {
            title: 'Usuários',
            href: '/usuarios',
            name: 'usuarios',
            icon: Person,
            cor: '#000',
        }         
    ]
}