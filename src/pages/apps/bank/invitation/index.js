/* eslint-disable padding-line-between-statements */
import * as React from 'react'
import * as yup from 'yup'
import { Grid, Box, TextField, FormControl, Button, FormHelperText, Typography } from '@mui/material'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  stakeholders: yup.array().of(
    yup.object().shape({
      role: yup.string().required('This field is required!'),
      name: yup.string().required('This field is required!'),
      email: yup.string().email('Enter a valid email').required('This field is required!')
    })
  )
})

const Invitation = ({ id, closeModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      stakeholders: [
        { role: 'CEO', name: '', email: '' },
        { role: 'CFO', name: '', email: '' }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stakeholders'
  })

  const onSubmit = async formData => {
    const value = {
      bankId: id,
      stakeholders: formData.stakeholders.map(stakeholder => ({
        role: stakeholder.role,
        name: stakeholder.name,
        email: stakeholder.email
      }))
    }

    console.log('value:', value)

    // Your API request logic here
  }

  const addStakeholder = () => {
    append({ role: '', name: '', email: '' })
  }

  const removeStakeholder = index => {
    remove(index)
  }

  const handleClose = () => {
    closeModal(false)
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Typography variant='h4'>Invite Stakeholders</Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
          {fields.map((stakeholder, index) => (
            <Grid container spacing={6} key={stakeholder.id} style={{ marginTop: '-14px' }}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name={`stakeholders[${index}].role`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        value={value}
                        label='Role'
                        onChange={onChange}
                        error={Boolean(errors.stakeholders?.[index]?.role)}
                      />
                    )}
                  />
                  {errors.stakeholders?.[index]?.role && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.stakeholders[index].role.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name={`stakeholders[${index}].name`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        value={value}
                        label='Name'
                        onChange={onChange}
                        error={Boolean(errors.stakeholders?.[index]?.name)}
                      />
                    )}
                  />
                  {errors.stakeholders?.[index]?.name && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.stakeholders[index].name.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name={`stakeholders[${index}].email`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        type='email'
                        value={value}
                        label='Email'
                        onChange={onChange}
                        error={Boolean(errors.stakeholders?.[index]?.email)}
                      />
                    )}
                  />
                  {errors.stakeholders?.[index]?.email && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.stakeholders[index].email.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {index >= 2 && (
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-28px' }}>
                  <Button
                    variant='outlined'
                    size='small'
                    color='error'
                    sx={{ ml: 2 }}
                    onClick={() => removeStakeholder(index)}
                  >
                    Remove
                  </Button>
                </Grid>
              )}
            </Grid>
          ))}
          <Button
            variant='outlined'
            color='success'
            sx={{ mr: 3 }}
            style={{ marginTop: '14px' }}
            onClick={addStakeholder}
          >
            Add Stakeholder
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '14px' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {'Submit'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}

export default Invitation
