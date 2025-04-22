import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, setIsLoggedIn } from '../../app/app-slice.ts';
import { useAppDispatch } from '../hooks';
import { authTokenManager } from '../../features/auth/lib/auth-token-manager.ts';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const onClickLogout = () => {
    authTokenManager.removeAccessToken();
    dispatch(setIsLoggedIn({isLoggedIn: false}));
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>WiWiWi</div>
          </a>
          <div className={styles.buttons}>
            {isLoggedIn && (
              <>
                <a href="#">
                  <Button variant="contained">Написать статью</Button>
                </a>
                <a href="#">
                  <Button variant="contained">Личный кабинет</Button>
                </a>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};