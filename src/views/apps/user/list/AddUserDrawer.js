// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
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
import { manageUser } from 'src/store/apps/user'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const registerSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('This field is required!'),
  password: yup.string().required('This field is required!').min(8, 'Must Contain 8 Characters!'),
  name: yup.string().required('This field is required!'),
  status: yup.string().required('This field is required!')
})

const updateSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('This field is required!'),
  name: yup.string().required('This field is required!'),
  status: yup.string().required('This field is required!')
})

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle, information } = props
  const id = information?.id
  let defaultValues

  // ** State
  const [role, setRole] = useState('')
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(id ? updateSchema : registerSchema)
  })
  useEffect(() => {
    defaultValues = {
      email: information?.email,
      status: information?.status,
      name: information?.name,
      password: ''
    }
    reset(defaultValues)
    setRole(information?.role || '')
  }, [id, reset])

  // ** Hooks
  const dispatch = useAppDispatch()

  const onSubmit = data => {
    dispatch(manageUser({ ...data, role, userId: id }))
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
        <Typography variant='h6'>{id ? 'Update User ' : 'Add User'}</Typography>
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
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='Name'
                  onChange={onChange}
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={value}
                  label='Status'
                  onChange={onChange}
                  error={Boolean(errors.status)}
                />
              )}
            />
            {errors.status && <FormHelperText sx={{ color: 'error.main' }}>{errors.status.message}</FormHelperText>}
          </FormControl>

          {!id && (
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    type='password'
                    value={value}
                    label='Password'
                    onChange={onChange}
                    error={Boolean(errors.password)}
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          )}

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel id='role-select'>Select Role</InputLabel>
            <Select
              fullWidth
              value={role}
              id='select-role'
              label='Select Role'
              labelId='role-select'
              onChange={e => setRole(e.target.value)}
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value='ADMIN'>ADMIN</MenuItem>
              <MenuItem value='USER'>USER</MenuItem>
            </Select>
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

export default SidebarAddUser
