import { useMemo } from 'react';
import MainRouter from './components/MainRouter';
import './configs/colors.scss'
import AuthContext from './hooks/useAuth';
import IsMobileContext from './hooks/useIsMobile';
import getIsMobile from './utils/getIsMobile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import AppContainer from './components/AppContainer';
import IconLoader from './components/IconLoader';
import { BrowserRouter } from 'react-router-dom';
import AuthContainer from './components/AuthContainer';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <AuthContainer>
            <AppContainer />
          </AuthContainer>
        </Provider>
      </BrowserRouter >
    </div >
  );
}

export default App;
