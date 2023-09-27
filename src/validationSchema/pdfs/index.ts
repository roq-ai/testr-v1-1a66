import * as yup from 'yup';

export const pdfValidationSchema = yup.object().shape({
  name: yup.string().required(),
  path: yup.string().required(),
  expiry_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
});
