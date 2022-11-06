import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { DetailTools } from '../../shared/components';
import ListTools from '../../shared/components/list-tools/ListTools';
import BaseLayout from '../../shared/layouts/BaseLayout';
import { CityService } from '../../shared/services/api/city/CityService';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
const Dashboard: React.FC = () => {
  const [isLoadingCity, setIsLoadingCity] = React.useState(true);
  const [totalCountCity, setTotalCountCity] = React.useState(0);
  
  const [isLoadingPeople, setIsLoadingPeople] = React.useState(true);
  const [totalCountPeople, setTotalCountPeople] = React.useState(0);

  React.useEffect(() => {
    setIsLoadingCity(true);
    setIsLoadingPeople(true);

    CityService.getAll(1).then((result) => {
      setIsLoadingCity(false);
      console.log(result);

      if (result instanceof Error) alert(result.message);
      else {
        setTotalCountCity(result.totalCount);
      }
    });

    PeopleService.getAll(1).then((result) => {
      setIsLoadingPeople(false);
      console.log(result);

      if (result instanceof Error) alert(result.message);
      else {
        setTotalCountPeople(result.totalCount);
      }
    });
  }, []);

  return (
    <BaseLayout
      title="Home Page"
      listTools={<ListTools showButtonNew={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total People
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {isLoadingPeople ? <Skeleton><Typography variant="h1">{totalCountPeople}</Typography></Skeleton>: <Typography variant="h1">{totalCountPeople}</Typography>}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total City
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {isLoadingCity ? <Skeleton><Typography variant="h1">{totalCountCity}</Typography></Skeleton>: <Typography variant="h1">{totalCountCity}</Typography>}
                  </Box>
                </CardContent>{' '}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};

export default Dashboard;
