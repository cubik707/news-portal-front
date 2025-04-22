import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../common/hooks';
import { useMeQuery } from '../features/auth/api/auth-api.ts';
import { setIsLoggedIn } from './app-slice.ts';
import { CircularProgress, CssBaseline } from '@mui/material';
import styles from './App.module.scss';

function App() {
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if(data){
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }

    }
  }, [isLoading, data])

  return (
    <>
      <CssBaseline />
      {isInitialized && (
        <>
          <Outlet />
        </>
      )}
      {!isInitialized && (
        <div className={styles.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
    </>
  )
}

export default App
