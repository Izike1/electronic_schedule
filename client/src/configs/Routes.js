import AdminAccountsPage from '../pages/AdminPages/AdminAccountsPage'
import AdminFacultiesPage from '../pages/AdminPages/AdminFacultiesPage'
import AdminGroupsPage from '../pages/AdminPages/AdminGroupsPage'
import AnalizePage from '../pages/AnalizePage'
import CommonAnalizePage from '../pages/AnalizePage/CommonAnalizePage'
import TeacherAnalizePage from '../pages/AnalizePage/TeacherAnalizePage'
import AttendancePage from '../pages/AttendancePage'
import AttendanceRedirector from '../pages/AttendancePage/AttedanceRedirector'
import FacultiesPage from '../pages/FacultiesPage'
import GroupsPage from '../pages/GroupsPage'
import GroupRedirector from '../pages/GroupsPage/GroupRedirector'
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
                    path: '/analize',
                    component: <AnalizePage />
                },
                {
                    path: '/analize/subjects',
                    component: <TeacherAnalizePage />
                },
                {
                    path: '/analize/common',
                    component: <CommonAnalizePage />
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
                },
                {
                    path: '/admin/faculties',
                    component: <AdminFacultiesPage />
                },
                {
                    path: '/admin/faculties/:id',
                    component: <AdminGroupsPage />
                },
                {
                    path: '/admin/accounts',
                    component: <AdminAccountsPage />
                }
            ],
            redirect: '/admin/faculties'
        },
        'dean': {
            pages: [
                {
                    path: '/faculties',
                    component: <FacultiesPage />
                },
                {
                    path: '/analize',
                    component: <AnalizePage />
                },
                {
                    path: '/analize/subjects',
                    component: <TeacherAnalizePage />
                },
                {
                    path: '/analize/common',
                    component: <CommonAnalizePage />
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
        },
        'teacher': {
            pages: [
                {
                    path: '/faculties',
                    component: <FacultiesPage />
                },
                {
                    path: '/analize',
                    component: <AnalizePage />
                },
                {
                    path: '/analize/subjects',
                    component: <TeacherAnalizePage />
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
        },
        'headman': {
            pages: [
                {
                    path: '/groups',
                    component: <GroupRedirector />
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
            redirect: '/groups'
        },
        'group': {
            pages: [
                {
                    path: '/groups',
                    component: <GroupRedirector />
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
            redirect: '/groups'
        }
    }
}