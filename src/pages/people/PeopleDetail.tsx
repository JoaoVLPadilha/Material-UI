import React from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as yup from 'yup';

import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { VTextField, useVForm, IVFormErrors } from '../../shared/forms';
import BaseLayout from '../../shared/layouts/BaseLayout';
import { DetailTools } from '../../shared/components';
import AutocompleteCity from './components/AutocompleteCity';

interface IFormData {
  email: string;
  lastName: string;
  cityId: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  lastName: yup.string().required().min(3),
  email: yup.string().required().email(),
  cityId: yup.number().required(),
});

const PeopleDetail: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [name, setName] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);
      PeopleService.getById(+id).then((result) => {
        setUserData(result);
        console.log('userData', userData);
        console.log('string', result);
        setIsLoading(false);
        if (result instanceof Error) alert(result.message);
        else {
          setName(result.lastName);
          console.log(result);

          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        lastName: '',
        cityId: undefined,
        email: '',
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    console.log(data)
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);
        if (id === 'new') {
          PeopleService.create(validateData).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) alert(result.message);
            else {
              if (IsSaveAndClose()) {
                navigate(`/people`);
              } else {
                navigate(`/people/detail/${result}`);
              }
            }
          });
        } else {
          PeopleService.updateById(+id, { id: +id, ...validateData }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) alert(result.message);
              else {
                if (IsSaveAndClose()) {
                  navigate(`/people`);
                }
              }
            },
          );
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
          formRef.current?.setErrors(validationErrors);
        });
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete?')) {
      PeopleService.deleteById(id).then((result) => {
        if (result instanceof Error) alert(result.message);
        else {
          alert('row successfully deleted');
          navigate('/people');
        }
      });
    }
  };

  return (
    <BaseLayout
      title={id === 'new' ? 'New Person' : `${name} Detail`}
      listTools={
        <DetailTools
          buttonNewText="new"
          showButtonNew={id !== 'new'}
          showButtonDelete={id !== 'new'}
          showButtonBack
          showButtonSaveGoBack
          onClickSave={() => save()}
          onClickDelete={() => {
            handleDelete(+id);
          }}
          onClickBack={() => navigate('/people')}
          onClickNew={() => navigate('/people/detail/new')}
          onClickSaveGoBack={() => saveAndClose()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid container item direction="column" spacing={2}>
              {isLoading && (
                <Grid item>
                  <LinearProgress variant="indeterminate" />
                </Grid>
              )}
              <Grid item>
                <Typography variant="h6">General</Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <VTextField
                  disabled={isLoading}
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <VTextField
                  disabled={isLoading}
                  fullWidth
                  label="E-mail"
                  name="email"
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <AutocompleteCity isExternalLoading={isLoading}/>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </BaseLayout>
  );
};

export default PeopleDetail;
