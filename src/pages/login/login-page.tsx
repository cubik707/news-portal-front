import { Button, Paper, TextField, Typography } from '@mui/material';
import styles from './login-page.module.scss';



const LoginPage = () => {
  return (
    <div className={'flex justify-center items-center h-full'}>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>

        <div className={styles.fieldContainer}>
          <TextField
            label="Имя пользователя"
            error
            helperText="Неверно указано имя пользователя"
            fullWidth
          />
        </div>

        <div className={styles.fieldContainer}>
          <TextField label="Пароль" fullWidth />
        </div>

        <Button size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </Paper>
    </div>
  );
};

export default LoginPage;