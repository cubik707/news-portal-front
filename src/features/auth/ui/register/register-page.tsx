import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { selectIsLoggedIn, setIsLoggedIn } from '../../../../app/app-slice.ts';
import { useState } from 'react';
import { useRegisterMutation } from '../../api/auth-api.ts';
import * as yup from 'yup';
import { RegisterArgs } from '../../api/auth-api.types.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { authTokenManager } from '../../lib/auth-token-manager.ts';
import { ErrorResponse } from '../../../../common/types';
import { Navigate } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Имя пользователя обязательно')
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Только латинские буквы, цифры и подчеркивание',
    ),

  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Минимум 6 символов')
    .max(30, 'Максимум 30 символов'),

  email: yup
    .string()
    .required('Email обязателен')
    .email('Некорректный email')
    .max(50, 'Максимум 50 символов'),

  lastName: yup
    .string()
    .required('Фамилия обязательна')
    .min(2, 'Минимум 2 символа')
    .max(30, 'Максимум 30 символов')
    .matches(
      /^[а-яА-ЯёЁa-zA-Z\-]+$/,
      'Только буквы и дефис',
    ),

  firstName: yup
    .string()
    .required('Имя обязательно')
    .min(2, 'Минимум 2 символа')
    .max(30, 'Максимум 30 символов')
    .matches(
      /^[а-яА-ЯёЁa-zA-Z\-]+$/,
      'Только буквы и дефис',
    ),

  surname: yup
    .string()
    .max(30, 'Максимум 30 символов')
    .matches(
      /^[а-яА-ЯёЁa-zA-Z\-]*$/,
      'Только буквы и дефис',
    ),

  position: yup
    .string()
    .required('Должность обязательна')
    .min(3, 'Минимум 3 символа')
    .max(50, 'Максимум 50 символов'),

  department: yup
    .string()
    .required('Отдел обязателен')
    .min(3, 'Минимум 3 символа')
    .max(50, 'Максимум 50 символов'),
});

const RegisterPage = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      lastName: '',
      firstName: '',
      surname: '',
      department: '',
      position: '',
    },
  });

  const onSubmit = async (data: Omit<RegisterArgs, 'surname'> & {
    surname?: string;
  }) => {
    try {
      const submitData = {
        ...data,
        surname: data.surname || '',
      };
      const res = await register(submitData).unwrap();
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
      authTokenManager.setAccessToken(res.data.token);
    } catch (err: any) {
      const errorData = err as { data?: ErrorResponse };

      setRegisterError(
        errorData?.data?.message || 'Ошибка при регистрации.',
      );
    } finally {
      reset({ ...data, password: '' });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center h-full p-8">
      <Paper
        elevation={6}
        sx={{
          maxWidth: 800,
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >

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

        <Box sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Блок 1: Основная информация */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                      Основная информация
                    </Typography>

                    <Controller
                      name="username"
                      control={control}
                      rules={{ required: 'Обязательное поле' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Имя пользователя"
                          error={!!errors.username}
                          helperText={errors.username?.message}
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          type="email"
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />

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
                          margin="normal"
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Блок 2: Личные данные */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                      Личные данные
                    </Typography>

                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Фамилия"
                          error={!!errors.lastName}
                          helperText={errors.lastName?.message}
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />

                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Имя"
                          error={!!errors.firstName}
                          helperText={errors.firstName?.message}
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />

                    <Controller
                      name="surname"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Отчество"
                          error={!!errors.surname}
                          helperText={errors.surname?.message}
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Блок 3: Рабочая информация */}
              <Grid size={{ xs: 12 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                      Рабочая информация
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name="position"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Должность"
                              error={!!errors.position}
                              helperText={errors.position?.message}
                              fullWidth
                              margin="normal"
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name="department"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Отдел"
                              error={!!errors.department}
                              helperText={errors.department?.message}
                              fullWidth
                              margin="normal"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {registerError && (
              <Typography color="error" sx={{marginBottom: '1rem'}}>
                {registerError}
              </Typography>
            )}

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                }}
                disabled={isLoading}
              >
                Зарегистрироваться
              </Button>
            </Box>

            <Typography sx={{ mt: 2, textAlign: 'center' }}>
              Есть аккаунт?{' '}
              <Link href="/login" underline="hover">
                Войти
              </Link>
            </Typography>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default RegisterPage;