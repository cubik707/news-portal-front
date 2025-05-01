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
import { useState } from 'react';
import { useRegisterMutation } from '../../api/auth-api.ts';
import { RegisterArgs } from '../../api/auth-api.types.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorResponse } from '../../../../common/types';
import { useNavigate } from 'react-router-dom';
import registerSchema from '../../model/register-schema.ts';



const RegisterPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
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
      alert(res.data)
      navigate('/login');
    } catch (err: any) {
      const errorData = err as { data?: ErrorResponse };

      setRegisterError(
        errorData?.data?.message || 'Ошибка при регистрации.',
      );
    } finally {
      reset({ ...data, password: '' });
    }
  };

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