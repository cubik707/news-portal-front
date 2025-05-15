import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

export const AmendmentLayout = () => {
  // Mock data
  const amendments = [
    { id: 1, user: 'Иван Иванов', type: 'Изменение данных', date: '2024-05-15', status: 'На рассмотрении' },
    { id: 2, user: 'Петр Петров', type: 'Обновление документа', date: '2024-05-14', status: 'Принято' },
    { id: 3, user: 'Сидор Сидоров', type: 'Корректировка реквизитов', date: '2024-05-13', status: 'Отклонено' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Заявки на изменения
        </Typography>
        <Button variant="contained" color="primary">
          Обновить список
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Пользователь</TableCell>
              <TableCell>Тип изменения</TableCell>
              <TableCell>Дата создания</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amendments.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={
                      row.status === 'Принято' ? 'success' :
                        row.status === 'Отклонено' ? 'error' : 'primary'
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ mr: 1 }}
                    disabled={row.status !== 'На рассмотрении'}
                  >
                    Принять
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    disabled={row.status !== 'На рассмотрении'}
                  >
                    Отклонить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Показано {amendments.length} из {amendments.length} заявок
        </Typography>
      </Box>
    </Container>
  );
};