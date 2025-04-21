import { Box, Button, Card, CardContent, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  surname: string;
  position: string;
  department: string;
}

const RegisterPage = () => {
  const { control, handleSubmit } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-full p-8">
      <Paper
        elevation={6}
        sx={{
          maxWidth: 800,
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden'
        }}
      >

        <Box sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Блок 1: Основная информация */}
              <Grid size={{ xs:12, md:6 }}>
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
                          label="Логин"
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
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Блок 2: Личные данные */}
              <Grid size={{ xs:12, md:6 }}>
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
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Блок 3: Рабочая информация */}
              <Grid  size={{ xs:12 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                      Рабочая информация
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid size={{ xs:12, md:6 }}>
                        <Controller
                          name="position"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Должность"
                              fullWidth
                              margin="normal"
                            />
                          )}
                        />
                      </Grid>
                      <Grid size={{ xs:12, md:6 }}>
                        <Controller
                          name="department"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Отдел"
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

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 2
                }}
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