import * as yup from 'yup';

export const notificationValidationSchema = yup.object().shape({
  message: yup.string().required(),
  sent_at: yup.date().nullable(),
  pdf_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
