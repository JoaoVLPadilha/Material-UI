import React from 'react';
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import {
  IListPeople,
  PeopleService,
} from '../../shared/services/api/people/PeopleService';
import ListTools from '../../shared/components/list-tools/ListTools';
import BaseLayout from '../../shared/layouts/BaseLayout';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';

const PeopleList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate()

  const [rows, setRows] = React.useState<IListPeople[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const search = React.useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = React.useMemo(() => {
    return Number(searchParams.get('page') || '1');
  }, [searchParams]);

  React.useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PeopleService.getAll(page, search).then((result) => {
        setIsLoading(false);
        console.log(result);

        if (result instanceof Error) alert(result.message);
        else {
          console.log(result.data);
          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [search, page]);

  const handleDelete = (id: number) =>{
    if(confirm('Are you sure you want to delete?')){
      PeopleService.deleteById(id)
      .then(result =>{
        if (result instanceof Error)
          alert(result.message)
        else{
          setRows(oldRows => {
            return [...oldRows.filter(oldRow => oldRow.id !== id)]
          })
          alert('row successfully deleted')
        }
      })
    }
  }

  return (
    <BaseLayout
      title="People List"
      listTools={
        <ListTools
          showSearchInput
          textSearch={search}
          textButtonNew="New"
          onClickNew={() => navigate('detail/new')}
          onChangeTextSearch={(text) =>
            setSearchParams({  page: '1', search: text }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton size='small' onClick={() => handleDelete(row.id)}>
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton size='small' onClick={() => navigate(`detail/${row.id}`)}>
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.ROW_LIMITS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.ROW_LIMITS)}
                    onChange={(_, newPage) => setSearchParams({search, page: newPage.toString()}, {replace: true})}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};

export default PeopleList;
