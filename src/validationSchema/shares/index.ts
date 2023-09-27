import * as yup from 'yup';

export const shareValidationSchema = yup.object().shape({
  url: yup.string().required(),
  expiry_date: yup.date().nullable(),
  pdf_id: yup.string().nullable().required(),
});
