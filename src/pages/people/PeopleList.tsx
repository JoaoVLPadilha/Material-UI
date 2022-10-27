import React from 'react';
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import {
  IListPeople,
  PeopleService,
} from '../../shared/services/api/people/PeopleService';
import ListTools from '../../shared/components/list-tools/ListTools';
import BaseLayout from '../../shared/layouts/BaseLayout';
import { useDebounce } from '../../shared/hooks';

const PeopleList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);

  const [rows, setRows] = React.useState<IListPeople[]>();
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const search = React.useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  React.useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PeopleService.getAll(1, search).then((result) => {
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
  }, [search]);

  return (
    <BaseLayout
      title="People List"
      listTools={
        <ListTools
          showSearchInput
          textSearch={search}
          textButtonNew="New"
          onChangeTextSearch={(text) =>
            setSearchParams({ search: text }, { replace: true })
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
                  <TableCell>Actions</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};

export default PeopleList;
