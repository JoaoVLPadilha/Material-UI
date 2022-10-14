import React from 'react'
import ListTools from '../../shared/components/list-tools/ListTools'
import BaseLayout from '../../shared/layouts/BaseLayout'

const Dashboard: React.FC = () => {
  return (
    <BaseLayout 
    title='Home Page' 
    listTools={
      <ListTools
      showSearchInput
      />
    }
    >
      Testando
    </BaseLayout>
  )
}

export default Dashboard