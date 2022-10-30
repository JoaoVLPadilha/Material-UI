import React from 'react'
import { Box, LinearProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { DetailTools } from '../../shared/components'
import BaseLayout from '../../shared/layouts/BaseLayout'
import { PeopleService } from '../../shared/services/api/people/PeopleService'

const PeopleDetail:React.FC = () => {
  const {id = 'new'} = useParams<'id'>()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = React.useState(false)
  const [name, setNome] = React.useState('')

  React.useEffect(() => {
    if (id !== 'new'){
      setIsLoading(true)
      PeopleService.getById(+id)
      .then((result) =>{
        setIsLoading(false)
        if(result instanceof Error)
          alert(result.message)
        else{
          setNome(result.lastName)
          console.log(result)
        }
      })
    }
  }, [id])

  const handleSave = () =>{
    console.log('save')
  }

  const handleDelete = (id: number) =>{
    if(confirm('Are you sure you want to delete?')){
      PeopleService.deleteById(id)
      .then(result =>{
        if (result instanceof Error)
          alert(result.message)
        else{
          alert('row successfully deleted')
            navigate('/people')
        }
      })
    }
  }


  return (
    <BaseLayout title={id === 'new' ? 'New Person': `${name} Detail`}
    listTools={<DetailTools
    buttonNewText='new'
    showButtonNew={id !== 'new'}
    showButtonDelete={id !== 'new'}
    showButtonBack
    showButtonSaveGoBack

    onClickSave={() => {handleSave}}
    onClickDelete={() => {handleDelete(+id)}}
    onClickBack={() => navigate('/people')}
    onClickNew={() => navigate('/people/detail/new')}
      />
    }>
      {(
        isLoading && (<LinearProgress variant='indeterminate'/>)
      )}
      <Box>
        newId {id}
      </Box>
    </BaseLayout>
  )
}

export default PeopleDetail