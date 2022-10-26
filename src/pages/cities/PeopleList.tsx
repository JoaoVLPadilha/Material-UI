import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ListTools from '../../shared/components/list-tools/ListTools';
import BaseLayout from '../../shared/layouts/BaseLayout';
import { useDebounce } from '../../shared/hooks/';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

const PeopleList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);
  const search = React.useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  React.useEffect(() => {
    debounce(() => {
      PeopleService.getAll(1, search).then((result) => {
        console.log(result);
        if (result instanceof Error) alert(result.message);
        else console.log(result);
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
    ></BaseLayout>
  );
};

export default PeopleList;
