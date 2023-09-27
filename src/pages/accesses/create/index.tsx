import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createAccess } from 'apiSdk/accesses';
import { accessValidationSchema } from 'validationSchema/accesses';
import { PdfInterface } from 'interfaces/pdf';
import { UserInterface } from 'interfaces/user';
import { getPdfs } from 'apiSdk/pdfs';
import { getUsers } from 'apiSdk/users';
import { AccessInterface } from 'interfaces/access';

function AccessCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AccessInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAccess(values);
      resetForm();
      router.push('/accesses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AccessInterface>({
    initialValues: {
      access_type: '',
      pdf_id: (router.query.pdf_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: accessValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Accesses',
              link: '/accesses',
            },
            {
              label: 'Create Access',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Access
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.access_type}
            label={'Access Type'}
            props={{
              name: 'access_type',
              placeholder: 'Access Type',
              value: formik.values?.access_type,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<PdfInterface>
            formik={formik}
            name={'pdf_id'}
            label={'Select Pdf'}
            placeholder={'Select Pdf'}
            fetcher={getPdfs}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/accesses')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'access',
    operation: AccessOperationEnum.CREATE,
  }),
)(AccessCreatePage);
