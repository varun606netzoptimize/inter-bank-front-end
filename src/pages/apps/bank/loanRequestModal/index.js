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
import CircularProgress from '@mui/material/CircularProgress'

const LoanRequestModal = ({ id, visible, requestedBy, requestedAmount, requestedTo }) => {
  const { reset } = useForm({
    mode: 'onChange'
  })

  const handleVisiblity = () => {
    visible(false)
    reset()
  }

  function SendRequest() {
    visible(false)
    reset()
  }

  const [loading, setLoading] = React.useState(false)

  async function SendLoanRequest() {
    const requestedToIds = requestedTo.map(item => item.id)

    const postData = {
      bankId: requestedToIds,
      amount: requestedAmount,
      crisisBank: requestedBy.id
    }

    console.log('endpoint: ', endpoint.manageRequest, 'postData:', postData)

    setLoading(true)

    const response = await instance
      .post(endpoint.manageRequest, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_SENDGRID_KEY
        }
      })
      .then(res => {
        toast.success('Loan request sent successfully!')
        handleVisiblity()
        setLoading(false)
        console.log('api request sent:', res.data)
      })
      .catch(err => {
        console.log('could not send api request', err.response)
        toast.error('Loan request failed!')
        setLoading(false)
      })
  }

  return (
    <Box p={1}>
      <Grid container spacing={3}>
        <Typography variant='h5' m={5}>
          Are you sure you want to the send Loan Request?
        </Typography>

        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={SendLoanRequest}>
              {loading ? (
                <CardContent
                  sx={{
                    padding: '0px',
                    paddingBottom: '0px !important',
                    height: '24px',
                    overflow: 'hidden'
                  }}
                >
                  <CircularProgress color='secondary' size={24} />
                </CardContent>
              ) : (
                'Send'
              )}
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
