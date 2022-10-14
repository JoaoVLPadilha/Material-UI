import React from 'react'
import { DetailTools } from '../../shared/components'
import BaseLayout from '../../shared/layouts/BaseLayout'
const Dashboard: React.FC = () => {
  return (
    <BaseLayout 
    title='Home Page' 
    listTools={
      <DetailTools></DetailTools>
    }
    >
      Testando
    </BaseLayout>
  )
}

export default Dashboard