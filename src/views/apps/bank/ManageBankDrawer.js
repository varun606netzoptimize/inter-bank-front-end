/* eslint-disable react-hooks/exhaustive-deps */
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
  bankName: yup.string().required('This field is required!'),
  city: yup.string().required('This field is required!'),
  state: yup.string().required('This field is required!'),
  fdicNum: yup.number().required('This field is required!'),
  fdicRegion: yup.string().required('This field is required!'),
  totalAssets: yup.number().required('This field is required!'),
  creditLimit: yup.number().required('This field is required!')
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
      bankName: information?.bankName,
      city: information?.city,
      state: information?.state,
      fdicNum: Number(information?.fdicNum),
      fdicRegion: information?.fdicRegion,
      totalAssets: Number(information?.totalAssets),
      creditLimit: Number(information?.creditLimit)
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
        <Typography variant='h6'>{id ? 'Update Bank Account' : 'Add New Bank'}</Typography>
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
              name='bankName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='Bank Name'
                  onChange={onChange}
                  error={Boolean(errors.bankName)}
                />
              )}
            />
            {errors.bankName && <FormHelperText sx={{ color: 'error.main' }}>{errors.bankName.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='city'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='City'
                  onChange={onChange}
                  error={Boolean(errors.city)}
                />
              )}
            />
            {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='state'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='State'
                  onChange={onChange}
                  error={Boolean(errors.state)}
                />
              )}
            />
            {errors.state && <FormHelperText sx={{ color: 'error.main' }}>{errors.state.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='fdicNum'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  type='number'
                  label='FDIC Number'
                  onChange={onChange}
                  error={Boolean(errors.fdicNum)}
                />
              )}
            />
            {errors.fdicNum && <FormHelperText sx={{ color: 'error.main' }}>{errors.fdicNum.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='fdicRegion'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='FDIC Region'
                  onChange={onChange}
                  error={Boolean(errors.fdicRegion)}
                />
              )}
            />
            {errors.fdicRegion && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.fdicRegion.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='totalAssets'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='Total Assets'
                  type='number'
                  onChange={onChange}
                  placeholder='$'
                  error={Boolean(errors.totalAssets)}
                />
              )}
            />
            {errors.totalAssets && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.totalAssets.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='creditLimit'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='Credit Limit'
                  type='number'
                  onChange={onChange}
                  placeholder='$'
                  error={Boolean(errors.creditLimit)}
                />
              )}
            />
            {errors.creditLimit && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.creditLimit.message}</FormHelperText>
            )}
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
