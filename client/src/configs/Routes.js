import AttendancePage from '../pages/AttendancePage'
import AttendanceRedirector from '../pages/AttendancePage/AttedanceRedirector'
import FacultiesPage from '../pages/FacultiesPage'
import GroupsPage from '../pages/GroupsPage'
import LoginPage from '../pages/LoginPage'
export const RoutesConfig = {
    public: {
        pages: [
            {
                path: '/login',
                component: <LoginPage />
            }
        ],
        redirect: '/login'
    },
    private: {
        'admin': {
            pages: [
                {
                    path: '/faculties',
                    component: <FacultiesPage />
                },
                {
                    path: '/faculties/:id',
                    component: <GroupsPage />
                },
                {
                    path: '/groups/:id',
                    component: <AttendanceRedirector />
                },
                {
                    path: '/groups/:id/:date',
                    component: <AttendancePage />
                }
            ],
            redirect: '/faculties'
        }
    }
}