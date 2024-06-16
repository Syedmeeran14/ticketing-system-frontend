import Classes from "../components/Mentor/Classes"
import AllTickets from '../components/Mentor/AllTickets'
import MyTickets from '../components/Mentor/MyTickets'
import MentorGuard from '../utils/MentorGuard'
import StudentGuard from '../utils/StudentGuard'
import Login from '../components/Login'
import Class from '../components/Students/Class'
import CreateQuery from "../components/Students/CreateQuery"
import MyQueries from "../components/Students/MyQueries"
import Placements from '../components/Students/Placements'
import Interviews from '../components/Students/Interviews'
import Tasks from '../components/Students/Tasks'
import ViewTicket from '../components/Common/ViewTicket'
import FindTicket from "../components/Mentor/FindTicket"
import StudentTickets from '../components/Mentor/StudentTickets'
import CommonGuard from "./CommonGuard"
import Profile from "../components/Common/Profile"


const AppRoutes = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/classes',
        element: <MentorGuard><Classes/></MentorGuard>
    },
    {
        path: '/profile',
        element: <CommonGuard><Profile/></CommonGuard>
    },
    {
        path: '/tickets',
        element: <MentorGuard><AllTickets/></MentorGuard>
    },
    {
        path: '/tickets/:ticketId',
        element: <CommonGuard><ViewTicket/></CommonGuard>
    },
    {
        path: '/myTickets',
        element: <MentorGuard><MyTickets/></MentorGuard>
    },
    {
        path: '/findTicket',
        element: <MentorGuard><FindTicket/></MentorGuard>
    },
    {
        path: '/studentTickets',
        element: <MentorGuard><StudentTickets/></MentorGuard>
    },
    {
        path: '/class',
        element: <StudentGuard><Class/></StudentGuard>
    },
    {
        path: '/createQuery',
        element: <StudentGuard><CreateQuery/></StudentGuard>
    },
    {
        path: '/MyQueries',
        element: <StudentGuard><MyQueries/></StudentGuard>
    },
    {
        path: '/placements',
        element: <StudentGuard><Placements/></StudentGuard>
    },
    {
        path: '/interviews',
        element: <StudentGuard><Interviews/></StudentGuard>
    },
    {
        path: '/tasks',
        element: <StudentGuard><Tasks/></StudentGuard>
    },
    {
        path: '/',
        element: <Login/>
    }
]


export default AppRoutes