import HomePage from "@/components/HomePage/HomePage";
import UsersList from "@/components/Users/ListAll/UsersList";
import UserInfo from "@/components/Users/SeeOne/UserInfo";
import UserCreate from "@/components/Users/CreateOne/UserCreate";
import ClientsList from "@/components/Clients/ListAll/ClientsList";
import ClientInfo from "@/components/Clients/SeeOne/ClientInfo";
import ClientCreate from "@/components/Clients/CreateOne/ClientCreate";
import ProjetsList from "@/components/Projets/ListAll/ProjetsList";
import ProjetInfo from "@/components/Projets/SeeOne/ProjetInfo";

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
        name: 'ProjetsInfo',
        path: '/projets/:id',
        component: ProjetInfo,
    },
]

export default routes;