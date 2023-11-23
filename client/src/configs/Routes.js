import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
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
                    path: '/',
                    component: <MainPage />
                }

            ],
            redirect: '/'
        }
    }
}