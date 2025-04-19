import { Button, Paper, TextField, Typography } from '@mui/material';
import styles from './login-page.module.scss';



const LoginPage = () => {

  return (
    <div className={'flex justify-center items-center h-full'}>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>
        <TextField
          className={styles.field}
          label="E-Mail"
          error
          helperText="Неверно указана почта"
          fullWidth
        />
        <TextField className={styles.field} label="Пароль" fullWidth />
        <Button size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </Paper>
    </div>
  );
};

export default LoginPage;