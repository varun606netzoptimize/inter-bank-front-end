/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
'use client'

// ** Library Imports
import * as React from 'react'
import * as yup from 'yup'
import { Grid, Box, TextField, FormControl, Button, FormHelperText, Typography } from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import instance from 'src/axios/instance'
import { endpoint } from 'src/configs/endpoints'
import { useAppDispatch } from 'src/store'
import { bankList } from 'src/store/apps/bank'

const schema = yup.object().shape({
  emailToCEO: yup.string().email('Enter a valid email').required('This field is required!'),
  emailToCFO: yup.string().email('Enter a valid email').required('This field is required!'),
  stakeHolder: yup.string().email('Enter a valid email').required('This field is required!')
})
// eslint-disable-next-line padding-line-between-statements
const Invitation = ({ id, closeModal }) => {
  const dispatch = useAppDispatch()
  const defaultValues = {
    emailToCEO: '',
    emailToCFO: '',
    stakeHolder: ''
  }
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

  const onSubmit = async emailData => {
    const value = {
      bankId: id,
      emailToCEO: emailData.emailToCEO,
      emailToCFO: emailData.emailToCFO,
      stakeHolder: emailData.stakeHolder
    }
    const response = await instance
      .post(endpoint.invite, value, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_SENDGRID_KEY
        }
      })
      .then(res => {
        toast.success(res.data)
        closeModal(false)
      })
      .then(() => dispatch(bankList()))
      .catch(err => {
        closeModal(false)
        toast.error(err?.response?.data.error)
      })
  }

  const handleClose = () => {
    closeModal(false)
    reset()
  }
  return (
    <Box p={1}>
      <Grid container spacing={3}>
        <Typography variant='h2' m={9}>
          Send an invitation
        </Typography>
        <Grid item xs={12} display='flex' alignItems='stretch'>
          <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='emailToCEO'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      type='email'
                      value={value}
                      label='Email CEO'
                      onChange={onChange}
                      error={Boolean(errors.emailToCEO)}
                    />
                  )}
                />
                {errors.emailToCEO && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.emailToCEO.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='emailToCFO'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      type='email'
                      value={value}
                      label='Email CFO'
                      onChange={onChange}
                      error={Boolean(errors.emailToCFO)}
                    />
                  )}
                />
                {errors.emailToCFO && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.emailToCFO.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='stakeHolder'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      type='email'
                      value={value}
                      label='Optional'
                      onChange={onChange}
                      error={Boolean(errors.stakeHolder)}
                    />
                  )}
                />
                {errors.stakeHolder && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.stakeHolder.message}</FormHelperText>
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
        </Grid>
      </Grid>
    </Box>
  )
}
export default Invitation
