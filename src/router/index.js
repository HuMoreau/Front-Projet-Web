import HomePage from "@/components/HomePage/HomePage";
import UsersList from "@/components/Users/ListAll/UsersList";
import UserInfo from "@/components/Users/SeeOne/UserInfo";
import UserCreate from "@/components/Users/CreateOne/UserCreate";
import ClientsList from "@/components/Clients/ListAll/ClientsList";
import ClientInfo from "@/components/Clients/SeeOne/ClientInfo";
import ClientCreate from "@/components/Clients/CreateOne/ClientCreate";
import ProjetsList from "@/components/Projets/ListAll/ProjetsList";
import ProjetInfo from "@/components/Projets/SeeOne/ProjetInfo";
import ProjetCreate from "@/components/Projets/CreateOne/ProjetCreate";
import TicketsList from "@/components/Ticket/ListAll/TicketsList";
import TicketInfo from "@/components/Ticket/SeeOne/TicketInfo";

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomePage,
    },
    {
        name: 'Users',
        path: '/users',
        component: UsersList,
    },
    {
        name: 'UserCreate',
        path: '/users/new',
        component: UserCreate,
    },
    {
        name: 'UserInfo',
        path: '/users/:id',
        component: UserInfo,
    },
    {
        name: 'Clients',
        path: '/clients',
        component: ClientsList,
    },
    {
        name: 'ClientCreate',
        path: '/clients/new',
        component: ClientCreate,
    },
    {
        name: 'ClientInfo',
        path: '/clients/:id',
        component: ClientInfo,
    },
    {
        name: 'Projets',
        path: '/projets',
        component: ProjetsList,
    },
    {
        name: 'ProjetCreate',
        path: '/projets/new',
        component: ProjetCreate,
    },
    {
        name: 'ProjetInfo',
        path: '/projets/:id',
        component: ProjetInfo,
    },
    {
        name: 'Tickets',
        path: '/tickets',
        component: TicketsList,
    },
    {
        name: 'TicketInfo',
        path: '/tickets/:id',
        component: TicketInfo,
    },
]

export default routes;