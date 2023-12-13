// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useAppDispatch } from 'src/store'

// ** Actions Imports
import { manageBank } from 'src/store/apps/bank'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  title: yup.string().required('This field is required!'),
  balance: yup.string().required('This field is required!'),
  address: yup.string().required('This field is required!')
})

const ManageBankDrawer = props => {
  // ** Props
  const { open, toggle, information } = props
  const id = information?.id

  let defaultValues

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  useEffect(() => {
    defaultValues = {
      title: information?.title,
      balance: information?.balance,
      address: information?.address
    }
    reset(defaultValues)
  }, [id, reset])

  // ** Hooks
  const dispatch = useAppDispatch()

  const onSubmit = data => {
    dispatch(manageBank({ ...data, bankId: id }))
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{id ? 'Update Bank Account' : 'Add Bank'}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='Title'
                  onChange={onChange}
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='balance'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='Balance'
                  onChange={onChange}
                  placeholder='$'
                  error={Boolean(errors.balance)}
                />
              )}
            />
            {errors.balance && <FormHelperText sx={{ color: 'error.main' }}>{errors.balance.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='address'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='Address'
                  onChange={onChange}
                  error={Boolean(errors.address)}
                />
              )}
            />
            {errors.address && <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>}
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {id ? 'Update' : 'Submit'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default ManageBankDrawer
