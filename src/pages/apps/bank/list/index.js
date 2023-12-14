/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'

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
import Invitation from '../invitation'

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

const RowOptions = ({ id, data }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [openBankModal, setOpenBankModal] = useState(false)
  const [bankInfo, setEditBankInfo] = useState([])

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteBank({ id: id }))
    handleRowOptionsClose()
  }
  const toggleManageBankDrawer = value => {
    setEditBankInfo(value)
    setOpenBankModal(!openBankModal)
    handleRowOptionsClose()
  }
  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
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
        <MenuItem onClick={() => toggleManageBankDrawer(data)} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
        <ManageBankDrawer information={bankInfo} open={openBankModal} toggle={toggleManageBankDrawer} />
      </Menu>
    </>
  )
}

const UserList = () => {
  const [openInvitationModal, setOpenInvitationModal] = useState(false)
  const [getId, setGetId] = useState('')
  const [anchorInvitationStatus, setAnchorInvitationStatus] = useState(null)
  const openStatusRowOption = Boolean(anchorInvitationStatus)
  const [selectedBankId, setSelectedBankId] = useState(null)

  const handleViewStatus = (event, bankId) => {
    setAnchorInvitationStatus(event.currentTarget)
    setSelectedBankId(bankId)
  }

  const handleCloseStatus = () => {
    setAnchorInvitationStatus(null)
    setSelectedBankId(null)
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
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.id} data={row} />
    }
  ]

  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [openBankModal, setOpenBankModal] = useState(false)

  const dispatch = useAppDispatch()
  const store = useAppSelector(state => state.bank.bank)

  useEffect(() => {
    dispatch(bankList())
  }, [dispatch])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])
  const toggleManageBankDrawer = () => setOpenBankModal(!openBankModal)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Manage Banks' />

          {/* Send Invitation */}
          <Dialog
            BackdropProps={{
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.50)',
                boxShadow: 'none'
              }
            }}
            open={openInvitationModal}
            fullWidth={true}
            onClose={() => setOpenInvitationModal(false)}
          >
            <DialogContent>
              <Invitation closeModal={setOpenInvitationModal} id={getId} />
            </DialogContent>
          </Dialog>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleManageBankDrawer} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      <ManageBankDrawer open={openBankModal} toggle={toggleManageBankDrawer} />
    </Grid>
  )
}

export default UserList
