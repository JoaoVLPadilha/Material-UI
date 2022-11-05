import React from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as yup from 'yup';

import { CityService } from '../../shared/services/api/city/CityService';
import { VTextField, useVForm, IVFormErrors } from '../../shared/forms';
import BaseLayout from '../../shared/layouts/BaseLayout';
import { DetailTools } from '../../shared/components';

interface IFormData {
  name: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
});

const CityDetail: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);
      CityService.getById(+id).then((result) => {
        setUserData(result);
        console.log('userData', userData);
        console.log('string', result);
        setIsLoading(false);
        if (result instanceof Error) alert(result.message);
        else {
          setName(result.name);
          console.log(result);

          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        name: '',
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    console.log('oi')
    formValidationSchema
    .validate(data, { abortEarly: false })
    .then((validateData) => {
      console.log('ola')
        setIsLoading(true);
        if (id === 'new') {
          CityService.create(validateData).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) alert(result.message);
            else {
              if (IsSaveAndClose()) {
                navigate(`/city`);
              } else {
                navigate(`/city/detail/${result}`);
              }
            }
          });
        } else {
          CityService.updateById(+id, { id: +id, ...validateData }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) alert(result.message);
              else {
                if (IsSaveAndClose()) {
                  navigate(`/city`);
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
          console.log(errors)
        });
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete?')) {
      CityService.deleteById(id).then((result) => {
        if (result instanceof Error) alert(result.message);
        else {
          alert('row successfully deleted');
          navigate('/city');
        }
      });
    }
  };

  return (
    <BaseLayout
      title={id === 'new' ? 'New City' : `${name} Detail`}
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
          onClickBack={() => navigate('/city')}
          onClickNew={() => navigate('/city/detail/new')}
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

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <VTextField
                    disabled={isLoading}
                    fullWidth
                    label="Name"
                    name="name"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </BaseLayout>
  );
};

export default CityDetail;
