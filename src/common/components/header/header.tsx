import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, setIsLoggedIn } from '../../../app/app-slice.ts';
import { useAppDispatch } from '../../hooks';
import { authTokenManager } from '../../../features/auth/lib/auth-token-manager.ts';
import { Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useUser } from '../../context/user-context.tsx';
import { UserRole } from '../../../features/user/types/user-role.enum.ts';
import LinearProgress from '@mui/material/LinearProgress';


export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const { user, isLoading } = useUser();

  const isEditor = user?.roles.includes(UserRole.EDITOR);

  const onClickLogout = () => {
    authTokenManager.removeAccessToken();
    dispatch(setIsLoggedIn({ isLoggedIn: false }));
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 0,
          minHeight: 'var(--header-height)',
        }} disableGutters
        >
          <Box display="flex" alignItems="center">
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              sx={{
                fontWeight: 700,
                px: 3,
                borderRadius: 1,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  bgcolor: 'primary.dark',
                },
              }}
            >
              WiWiWi
            </Button>
          </Box>

          <Box display="flex" gap={1}>
            {isLoggedIn && (
              <>
                {isEditor && (<Button
                  component={Link}
                  to="/news/create"
                  variant="outlined"
                  color="primary"
                  startIcon={<ArticleIcon />}
                  sx={{
                    textTransform: 'none',
                    px: 3,
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 },
                  }}
                >
                  Написать статью
                </Button>)}
                <Button
                  component={Link}
                  to="/account/profile"
                  variant="outlined"
                  color="secondary"
                  startIcon={<AccountCircleIcon />}
                  sx={{
                    textTransform: 'none',
                    px: 3,
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 },
                  }}
                >
                  Профиль
                </Button>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                  startIcon={<ExitToAppIcon />}
                  sx={{
                    textTransform: 'none',
                    px: 3,
                    '&:hover': {
                      bgcolor: 'error.dark',
                    },
                    boxShadow: 'none',
                  }}
                >
                  Выйти
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      {isLoading && <LinearProgress/>}
    </AppBar>
  );
};