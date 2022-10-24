import React from 'react'
import { useSearchParams } from 'react-router-dom'
import ListTools from '../../shared/components/list-tools/ListTools'
import BaseLayout from '../../shared/layouts/BaseLayout'

const CitiesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = React.useMemo(() => {
    console.log(searchParams.get('search'))
    return searchParams.get('search') || '';
  }, [searchParams]);

  return (
    <BaseLayout 
    title='Cities List'
    listTools={<ListTools
    showSearchInput
    textSearch={busca}
    textButtonNew='Nova'
    onChangeTextSearch={text => setSearchParams({search: text}, { replace: true})}

    />}
    ></BaseLayout>
  )
}

export default CitiesList