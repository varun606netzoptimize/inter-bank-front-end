/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable lines-around-comment */
/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */

// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { bankList, deleteBank } from 'src/store/apps/bank'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/bank/TableHeader'
import { useAppDispatch, useAppSelector } from 'src/store'
import ManageBankDrawer from 'src/views/apps/bank/ManageBankDrawer'
import { Button, Dialog, DialogContent } from '@mui/material'
import LoanRequestModal from '../loanRequestModal'
import CircularProgress from '@mui/material'

const CardTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.6,
  fontWeight: 500,
  fontSize: '1.125rem',
  letterSpacing: '0.15px',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem'
  }
}))

import { DataGrid } from '@mui/x-data-grid'

// ** renders client column
const renderClient = row => {
  if (row.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor}
        sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

export default function bankRequests() {
  // states
  const [selectedBank, setSelectedBank] = useState(null)
  const [loanAmount, setLoanAmount] = useState(null)
  const [requestedAmount, setRequestedAmount] = useState(0)
  const [requestedToBanks, setRequestedToBanks] = useState([])

  const [pageSize, setPageSize] = useState(10)

  const [openInvitationModal, setOpenInvitationModal] = useState(false)
  const [getId, setGetId] = useState('')
  const [anchorInvitationStatus, setAnchorInvitationStatus] = useState(null)
  const openStatusRowOption = Boolean(anchorInvitationStatus)
  const [selectedBankId, setSelectedBankId] = useState(null)
  const [showLoanSelection, setShowLoanSelection] = useState(false)
  const [sendRequestModal, setSendRequestModal] = useState(false)

  const handleViewStatus = (event, bankId) => {
    setAnchorInvitationStatus(event.currentTarget)
    setSelectedBankId(bankId)
  }

  const handleCloseStatus = () => {
    setAnchorInvitationStatus(null)
    setSelectedBankId(null)
  }

  const PrintLoanAmount = () => {
    setShowLoanSelection(true)
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'bankName',
      headerName: 'Bank Name',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.bankName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'City',
      field: 'city',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {row?.city}
          </Typography>
        )
      }
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'State',
      field: 'state',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {row?.state}
          </Typography>
        )
      }
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'FDIC Number',
      field: 'fdicNum',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {row?.fdicNum}
          </Typography>
        )
      }
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'FDIC Region',
      field: 'fdicRegion',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {row?.fdicRegion}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Total Assets',
      field: 'totalAssets',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {Number(row?.totalAssets).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Credit Limit',
      field: 'creditLimit',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {Number(row?.creditLimit).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Stake Holder',
      field: 'stakeHolder',
      renderCell: ({ row }) => {
        if (row.invitation && row.invitation.length > 0) {
          return (
            <>
              <Button onClick={e => handleViewStatus(e, row.id)}>View</Button>
              <Menu
                keepMounted
                anchorEl={anchorInvitationStatus}
                open={row.id === selectedBankId && openStatusRowOption}
                onClose={handleCloseStatus}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                PaperProps={{ style: { minWidth: '8rem' } }}
              >
                <MenuItem sx={{ '& svg': { mr: 2 } }}>
                  {row.invitation.map((el, index) => (
                    <Box key={index}>
                      <Typography style={{ display: 'flex', alignItems: 'center', gap: '10px' }} p={2}>
                        {el.ceoEmail}:
                        {el.isCeoVerified ? (
                          <Typography sx={{ paddingY: 2, color: el.isCeoVerified ? 'green' : 'orange' }}>
                            Accepted
                          </Typography>
                        ) : (
                          <Typography sx={{ paddingY: 2, color: el.isCeoVerified ? 'green' : 'orange' }}>
                            Pending
                          </Typography>
                        )}
                      </Typography>
                      <Typography style={{ display: 'flex', alignItems: 'center', gap: '10px' }} p={2}>
                        {el.cfoEmail}:{' '}
                        {el.isCfoVerified ? (
                          <Typography sx={{ paddingY: 2, color: el.isCfoVerified ? 'green' : 'orange' }}>
                            Accepted
                          </Typography>
                        ) : (
                          <Typography sx={{ paddingY: 2, color: el.isCfoVerified ? 'green' : 'orange' }}>
                            Pending
                          </Typography>
                        )}
                      </Typography>
                      <Typography style={{ display: 'flex', alignItems: 'center', gap: '10px' }} p={2}>
                        {el.stakeHolderEmail}:{' '}
                        {el.isStakeHolderVerified ? (
                          <Typography sx={{ paddingY: 2, color: el.isStakeHolderVerified ? 'green' : 'orange' }}>
                            Accepted
                          </Typography>
                        ) : (
                          <Typography sx={{ paddingY: 2, color: el.isStakeHolderVerified ? 'green' : 'orange' }}>
                            Pending
                          </Typography>
                        )}
                      </Typography>
                    </Box>
                  ))}
                </MenuItem>
              </Menu>
            </>
          )
        } else {
          return (
            <Button
              onClick={() => {
                setOpenInvitationModal(true)
                setGetId(row.id)
              }}
              noWrap
              sx={{ fontWeight: 500, color: 'primary', textTransform: 'capitalize' }}
            >
              INVITE
            </Button>
          )
        }
      }
    }
  ]

  const dispatch = useAppDispatch()
  const store = useAppSelector(state => state.bank.bank)

  useEffect(() => {
    dispatch(bankList())
  }, [dispatch])

  const handleRowSelectionChange = selectionModel => {
    if (selectionModel && selectionModel.length > 0) {
      // Map through the selected rows and extract their balances
      const selectedRowData = selectionModel.map(selectedId => {
        const selectedRow = store.find(row => row.id === selectedId)
        const creditLimit =
          typeof selectedRow.creditLimit === 'string'
            ? Number(selectedRow.creditLimit.replace(/[$,]/g, '')) || 0
            : selectedRow.creditLimit || 0

        return selectedRow
          ? {
              id: selectedRow.id,
              bankName: selectedRow.bankName,
              creditLimit
            }
          : null
      })

      console.log('Selected Row Data:', selectedRowData)
      setRequestedToBanks(selectedRowData)

      // Calculate the sum of balances
      const sumOfBalances = selectedRowData.reduce((acc, { creditLimit }) => acc + creditLimit, 0)

      setRequestedAmount(sumOfBalances)

      // Log both the array and its sum
      console.log(
        'Selected Rows Balances:',
        selectedRowData.map(({ creditLimit }) => creditLimit)
      )
      console.log('Sum of Balances:', sumOfBalances)
    }
  }

  const handleBankChange = event => {
    const selectedBankId = event.target.value
    const selectedBankData = store.find(bank => bank.id === selectedBankId)
    setSelectedBank(selectedBankData)
  }

  const filteredBanks = store.filter(bank => bank.id !== (selectedBank ? selectedBank.id : null))

  const topcards = [
    {
      title: 'Selected Bank',
      data: selectedBank?.bankName,
      bgcolor: 'primary',
      icon: 'tabler:building'
    },
    {
      title: 'Required Amount',
      data: Number(loanAmount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }),
      bgcolor: 'error',
      icon: 'tabler:currency-dollar'
    },
    {
      title: 'Requested Amount',
      data: requestedAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }),
      bgcolor: 'warning',
      icon: 'tabler:currency-dollar'
    }
  ]

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Manage Loan Requests' />

          {/* selection bar */}
          <CardContent
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}
          >
            {/* Bank & loan Selection bar */}
            <Grid container spacing={6}>
              {/* select bank */}
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='bank-select'>Select Bank</InputLabel>
                  <Select
                    fullWidth
                    id='select-bank'
                    label='Select Bank'
                    labelId='bank-select'
                    inputProps={{ placeholder: 'Select Bank' }}
                    value={selectedBank ? selectedBank.id : ''}
                    onChange={handleBankChange}
                  >
                    <MenuItem value=''>Select Bank</MenuItem>
                    {store.map(bank => (
                      <MenuItem key={bank.id} value={bank.id}>
                        {bank?.bankName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* Define Loan Amount */}
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    value={loanAmount}
                    label='Enter Amount'
                    placeholder='$'
                    type='number'
                    onChange={amount => setLoanAmount(amount.target.value)}
                  />
                </FormControl>
              </Grid>

              {/* Proceed Button */}
              <Grid item sm={4} xs={12} style={{ marginTop: '4px' }}>
                {/* <FormControl fullWidth> */}
                <Button
                  variant='contained'
                  size='large'
                  onClick={() => PrintLoanAmount()}
                  disabled={
                    loanAmount === null ||
                    Number(loanAmount) < 1 ||
                    loanAmount === '' ||
                    selectedBank === null ||
                    selectedBank === ''
                  }
                >
                  Proceed
                </Button>
                {/* </FormControl> */}
              </Grid>
            </Grid>
          </CardContent>

          {/* Bank Details */}
          <Box
            style={{
              display: showLoanSelection ? 'block' : 'none'
            }}
          >
            {/* Bank Name and other details (change this to breadcrumb) */}
            <CardContent style={{ marginTop: '-56px' }}>
              <Grid container spacing={6} mt={3}>
                {topcards.map((topcard, i) => (
                  <Grid item xs={12} sm={4} key={i}>
                    <Box bgcolor={topcard.bgcolor + '.light'} textAlign='center' style={{ borderRadius: '10px' }}>
                      <CardContent>
                        <Typography color={'white'} mt={1} variant='subtitle1' fontWeight={400}>
                          {topcard.title}
                        </Typography>
                        <Typography color={'white'} variant='h6' fontWeight={600}>
                          {topcard.data}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>

            {/* table */}
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={filteredBanks}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onSelectionModelChange={handleRowSelectionChange}
            />

            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                color='success'
                size='large'
                disabled={requestedAmount >= loanAmount ? false : true}
                onClick={() => setSendRequestModal(true)}
              >
                Send Request
              </Button>
            </CardContent>
            <Dialog
              BackdropProps={{
                style: {
                  backgroundColor: 'rgba(0, 0, 0, 0.50)',
                  boxShadow: 'none'
                }
              }}
              open={sendRequestModal}
              fullWidth={true}
              onClose={() => setSendRequestModal(false)}
            >
              <DialogContent>
                <LoanRequestModal
                  visible={setSendRequestModal}
                  requestedBy={selectedBank}
                  requestedAmount={requestedAmount}
                  requestedTo={requestedToBanks}
                />
              </DialogContent>
            </Dialog>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}
