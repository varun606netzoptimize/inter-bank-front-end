/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
'use client'

// ** Library Imports
import * as React from 'react'
import * as yup from 'yup'
import { Grid, Box, TextField, FormControl, Button, FormHelperText, Typography, Alert, AlertTitle } from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import instance from 'src/axios/instance'
import { endpoint } from 'src/configs/endpoints'
import { useAppDispatch } from 'src/store'
import { bankList } from 'src/store/apps/bank'
import CardContent from '@mui/material/CardContent'

const LoanRequestModal = ({ id, visible }) => {
  const { reset } = useForm({
    mode: 'onChange'
  })

  const handleVisiblity = () => {
    visible(false)
    reset()
  }

  function SendRequest() {
    toast.success('Loan request sent successfully!')
    visible(false)
    reset()
  }

  return (
    <Box p={1}>
      <Grid container spacing={3}>
        <Typography variant='h5' m={5}>
          Are you sure you want to the send Loan Request?
        </Typography>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={SendRequest}>
              Send
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleVisiblity}>
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Grid>
    </Box>
  )
}

export default LoanRequestModal
