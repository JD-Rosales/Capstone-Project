import './AccountActivation.css'
import Sidebar from '../../../components/Sidebar/Sidebar'
import manageRequestIllustration from '../../../assets/accountActivation_illustration.png'
import noDataAvailable_illustration from '../../../assets/noDataAvailable_illustration.png'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getUnactivated,
  updateAccountStatus,
  reset,
} from '../../../features/teacher/teacherSlice'
import {
  deleteAccount,
  reset as authReset,
} from '../../../features/auth/authSlice'
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Box,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

const textStyle = {
  color: '#fff',
}

const AccountActivation = () => {
  const dispatch = useDispatch()

  const toastID = useRef(null)
  const notify = () =>
    (toastID.current = toast.loading('Activating Account...', {
      autoClose: false,
      position: 'top-right',
    }))

  const toastID2 = useRef(null)
  const notify2 = () =>
    (toastID2.current = toast.loading('Deleting Teacher Account...', {
      autoClose: false,
      position: 'top-right',
    }))

  // state from teacherSlice
  const { data, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.teacher,
  )

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
      setTableData(data.teachers)
      toast.update(toastID.current, {
        render: 'Success',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })
    }

    if (isError) {
      toast.update(toastID.current, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      })
      dispatch(reset())
    }

    // eslint-disable-next-line
  }, [data, isSuccess, isError, isLoading, message])

  // state from authSlice
  const {
    user: auth,
    token,
    isSuccess: authSuccess,
    isError: authError,
    isLoading: authLoading,
    message: authMessage,
  } = useSelector((state) => state.auth)

  useEffect(() => {
    if (authSuccess) {
      const params = {
        token,
      }
      dispatch(getUnactivated(params))
      dispatch(authReset())
      toast.update(toastID2.current, {
        render: 'Success',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })
    }

    if (authError) {
      dispatch(authReset())
      toast.update(toastID2.current, {
        render: authMessage,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      })
    }

    // eslint-disable-next-line
  }, [auth, authSuccess, authError, authLoading, authMessage])

  const [selectedID, setSelectedID] = useState(null)

  // State for Table
  const [tableData, setTableData] = useState([])
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(5)
  const [pageCount, setPageCount] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  useEffect(() => {
    if (tableData.length > 0) {
      const count = tableData.length / rowsPerPage

      setPageCount(Math.ceil(count))
    }
    // eslint-disable-next-line
  }, [tableData])

  // State for Table

  // State for Menu
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const updateStatus = () => {
    const params = {
      id: selectedID,
      token: token,
    }
    notify()
    dispatch(updateAccountStatus(params))
  }

  const deleteTeacherAccount = () => {
    notify2()
    dispatch(deleteAccount(selectedID))
  }

  useEffect(() => {
    const params = {
      token,
    }
    dispatch(getUnactivated(params))
    // eslint-disable-next-line
  }, [])

  return (
    <div className="account-activation">
      <Sidebar />

      <header>
        <div className="header-text">
          <h1>
            Account <span>Activation</span>
          </h1>

          <p>
            Manage and activate the user's accounts in an easy-peasy way, all in
            one place.
          </p>
        </div>
        <div className="header-img">
          <img src={manageRequestIllustration} alt="Illustration" />
        </div>
      </header>

      <main>
        <TableContainer
          sx={{
            borderTopRightRadius: '20px',

            borderTopLeftRadius: '20px',

            marginTop: 2,
            height: 410,
            overflow: 'hidden',
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    // backgroundColor: 'var(--aquaGreen)',
                    borderTopLeftRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    background: 'var(--navyBlue)',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      background: 'var(--navyBlue)',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    Email
                  </Typography>
                </TableCell>

                <TableCell
                  sx={{
                    background: 'var(--navyBlue)',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      background: 'var(--navyBlue)',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    School
                  </Typography>
                </TableCell>

                <TableCell
                  sx={{
                    background: 'var(--navyBlue)',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      background: 'var(--navyBlue)',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    Full Name
                  </Typography>
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderTopRightRadius: '20px',
                    borderBottomRightRadius: '20px',
                    background: 'var(--navyBlue)',
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      background: 'var(--navyBlue)',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '40px',
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ color: 'var(--aquaGreen)', margin: '10px 0' }}
                      >
                        No Data Available
                      </Typography>

                      <img
                        height="150px"
                        src={noDataAvailable_illustration}
                        alt="No Data Available"
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                tableData
                  .slice(
                    (page - 1) * rowsPerPage,
                    (page - 1) * rowsPerPage + rowsPerPage,
                  )
                  .map((data) => {
                    return (
                      <TableRow key={data._id}>
                        <TableCell
                          sx={{
                            padding: '0 0 0 5',
                            width: '30%',
                          }}
                        >
                          <Typography sx={textStyle}>{data.email}</Typography>
                        </TableCell>

                        <TableCell
                          sx={{
                            padding: '0 0 0 5',
                            width: '30%',
                          }}
                        >
                          <Typography sx={textStyle}>
                            {data.userInfo.school}
                          </Typography>
                        </TableCell>

                        <TableCell
                          sx={{
                            padding: '0 0 0 5',
                            width: '30%',
                          }}
                        >
                          <Typography sx={textStyle}>
                            {data.userInfo.lastName + ' '}
                            {data.userInfo.firstName + ' '}
                            {data.userInfo.middleInitial}
                          </Typography>
                        </TableCell>

                        <TableCell align="center" sx={{ padding: 1 }}>
                          <IconButton
                            sx={{
                              color: 'var(--aquaGreen)',
                              transition: '0.3s',
                              '&:hover': {
                                backgroundColor: 'var(--aquaGreen)',
                                color: '#fff',
                              },
                            }}
                          >
                            <DoneIcon
                              onClick={() => {
                                handleMenuClose()
                                updateStatus()
                              }}
                            />
                          </IconButton>
                          <IconButton
                            sx={{
                              color: '#F06292',
                              transition: '0.3s',
                              '&:hover': {
                                backgroundColor: '#F06292',
                                color: '#fff',
                              },
                            }}
                          >
                            <CloseIcon
                              onClick={() => {
                                handleMenuClose()
                                deleteTeacherAccount()
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  )
}

export default AccountActivation
