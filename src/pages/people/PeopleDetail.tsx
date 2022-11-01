import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTools } from '../../shared/components';
import BaseLayout from '../../shared/layouts/BaseLayout';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';

interface IFormData {
  email: string;
  lastName: string;
  cityId: number;
}

const PeopleDetail: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = React.useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [name, setName] = React.useState('');

  React.useEffect(() => {console.log(name)}, [name])

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
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    setIsLoading(true);
    if (id === 'new') {
      PeopleService.create(data).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) alert(result.message);
        else navigate(`/people/detail/${result}`);
      });
    } else {
      PeopleService.updateById(+id, { id: +id, ...data }).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) alert(result.message);
      });
    }
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
          onClickSave={() => formRef.current?.submitForm()}
          onClickDelete={() => {
            handleDelete(+id);
          }}
          onClickBack={() => navigate('/people')}
          onClickNew={() => navigate('/people/detail/new')}
          onClickSaveGoBack={() => formRef.current?.submitForm()}
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
                <Typography variant="h6">Geral</Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <VTextField disabled={isLoading} fullWidth label="Last Name" name="lastName" onChange={(e) => setName(e.target.value)}/>
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <VTextField disabled={isLoading} fullWidth label="E-mail" name="email" />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <VTextField disabled={isLoading} fullWidth label="City Id" name="cityId" />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </BaseLayout>
  );
};

export default PeopleDetail;
