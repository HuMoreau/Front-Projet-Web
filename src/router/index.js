import HomePage from "@/components/HomePage/HomePage";
import UsersList from "@/components/Users/ListAll/UsersList";
import UserInfo from "@/components/Users/SeeOne/UserInfo";

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
        name: 'User',
        path: '/user',
        component: UserInfo,
    },
]

export default routes;