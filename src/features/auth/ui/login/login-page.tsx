import { Button, LinearProgress, Link, Paper, TextField, Typography } from '@mui/material';
import styles from './login-page.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { selectIsLoggedIn, setIsLoggedIn } from '../../../../app/app-slice.ts';
import { useLoginMutation } from '../../api/auth-api.ts';
import { LoginArgs } from '../../api/auth-api.types.ts';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { authTokenManager } from '../../lib/auth-token-manager.ts';
import { ErrorResponse } from '../../../../common/types';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Имя пользователя обязательно')
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Только латинские буквы, цифры и подчеркивание'
    ),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Минимум 6 символов')
    .max(30, 'Максимум 30 символов'),
});

const LoginPage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<LoginArgs> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
      authTokenManager.setAccessToken(res.data.token);
    } catch (err: any) {
      const errorData = err as { data?: ErrorResponse };

      setLoginError(
        errorData?.data?.message || 'Ошибка при входе. Проверьте имя пользователя и пароль.'
      );
    } finally {
      reset({ ...data, password: '' });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center h-full">
      {isLoading && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />
      )}

      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Вход в аккаунт
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fieldContainer}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Имя пользователя"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  fullWidth
                />
              )}
            />
          </div>

          <div className={styles.fieldContainer}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Пароль"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                />
              )}
            />
          </div>

          {loginError && (
            <Typography color="error" sx={{marginBottom: '1rem'}}>
              {loginError}
            </Typography>
          )}

          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            Войти
          </Button>


          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Нет аккаунта?{' '}
            <Link href="/register" underline="hover">
              Зарегистрируйтесь
            </Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;