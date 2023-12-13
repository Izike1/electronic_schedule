import { useMemo } from 'react';
import MainRouter from './components/MainRouter';
import './configs/colors.scss'
import AuthContext from './hooks/useAuth';
import IsMobileContext from './hooks/useIsMobile';
import getIsMobile from './utils/getIsMobile';


function App() {
  const isMobile = useMemo(getIsMobile, [getIsMobile])
  return (
    <div className="App">
      <IsMobileContext.Provider value={isMobile}>
        <AuthContext.Provider value={{
          isAuth: true,
          role: 'admin'
        }}>
          <MainRouter />
        </AuthContext.Provider>

      </IsMobileContext.Provider>

    </div>
  );
}

export default App;
