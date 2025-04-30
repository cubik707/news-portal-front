import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../common/hooks';
import { useMeQuery } from '../features/auth/api/auth-api.ts';
import { setIsLoggedIn } from './app-slice.ts';
import { CircularProgress, CssBaseline } from '@mui/material';
import styles from './App.module.scss';
import { authTokenManager } from '../features/auth/lib/auth-token-manager.ts';
import { UserContext } from '../common/context/user-context.tsx';

function App() {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const { data, error, isLoading } = useMeQuery();
  const user = data?.data ?? null;

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
      if (data) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      } else if (error) {
        authTokenManager.removeAccessToken();
      }

    }
  }, [isLoading, data]);

  return (
    <>
      <CssBaseline />
      {isInitialized && (
        <>
          <UserContext.Provider value={{ user, isLoading, error }}>
            <Outlet />
          </UserContext.Provider>
        </>
      )}
      {!isInitialized && (
        <div className={styles.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
    </>
  );
}

export default App;
