import * as yup from 'yup';

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

export default schema;