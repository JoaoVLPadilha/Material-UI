import React from 'react'
import ToolBar from '../../shared/components/tool-bar/ToolBar'
import BaseLayout from '../../shared/layouts/BaseLayout'

const Dashboard: React.FC = () => {
  return (
    <BaseLayout 
    title='Home Page' 
    toolBar={
      <ToolBar
      showSearchInput
      />
    }
    >
      Testando
    </BaseLayout>
  )
}

export default Dashboard