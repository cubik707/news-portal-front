import * as yup from 'yup';

export const createNewsSchema = yup.object().shape({
  title: yup.string().required('Заголовок обязателен').min(5, 'Минимум 5 символов'),
  content: yup.string().required('Контент обязателен').min(50, 'Минимум 50 символов'),
  image: yup.string().required('Изображение обязательно'),
  categoryId: yup.number().required('Категория обязательна').typeError('Выберите категорию'),
  tags: yup.string().required('Теги обязательны'),
});

export type NewsFormData = yup.InferType<typeof createNewsSchema>;