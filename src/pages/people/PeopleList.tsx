import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ListTools from '../../shared/components/list-tools/ListTools';
import BaseLayout from '../../shared/layouts/BaseLayout';
import { useDebounce } from '../../shared/hooks';
import {
  IListPeople,
  PeopleService,
  TTotalCountPeople,
} from '../../shared/services/api/people/PeopleService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const PeopleList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);

  const [rows, setRows] = React.useState<IListPeople[]>([]);
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
          console.log(result);
          setRows(result.data);
          setTotalCount(result.totalCount);
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};

export default PeopleList;
