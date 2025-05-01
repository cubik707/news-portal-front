import { Button, TextField, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';

type FormData = {
  comment: string;
};

export const ChangeRequestForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>Запрос на изменение данных</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('comment')}
          label="Что нужно изменить?"
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Отправить запрос</Button>
      </form>
    </Paper>
  );
};
