import './ChangeClass.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Grid2 from '@mui/material/Unstable_Grid2'
import change_class from '../../assets/changeClasscode_illustration.png'

import LoadingButton from '@mui/lab/LoadingButton'
import { CircularProgress } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { reset, changeClassCode } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import { FormControl, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangeClass = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const textfieldStyle = {
    mt: 2,
    backgroundColor: '#182240',
    color: '#F0F0F0',
    '& .MuiFormLabel-root': {
      //textfield label
      color: '#42C9A3',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      //textfield label on focused
      color: '#42C9A3',
    },
    '& .MuiOutlinedInput-root': {
      //textfield boder
      '& > fieldset': { borderColor: '#42C9A3' },
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      //textfield boder color on focused
      '& > fieldset': { borderColor: '#42C9A3' },
    },
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': {
        borderColor: '#F0F0F0',
      },
    },
  }

  const { user, token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  )

  const toastID = useRef(null)

  const [currentClassCode, setCurrentClassCode] = useState('')
  const [newClassCode, setNewClassCode] = useState('')

  const notify = () =>
    (toastID.current = toast.loading('Updating Class Code...', {
      autoClose: 10000,
      position: 'top-right',
    }))

  const cancel = async (e) => {
    e.preventDefault()

    if (user.role === 'student') {
      navigate('/dashboard')
      // console.log(currentClassCode)
    } else if (user.role === 'teacher') {
      navigate('/teacher-dashboard')
    } else if (user.role === 'generaluser') {
      navigate('/dashboard')
    }
  }
  const submit = async (e) => {
    e.preventDefault()
    const userInputs = {
      newClassCode,
    }

    const params = {
      userInputs,
      userData: {
        id: user._id,
        token: token,
      },
    }
    notify()
    dispatch(changeClassCode(params))
  }

  useEffect(() => {
    if (isSuccess) {
      setNewClassCode('')
      toast.update(toastID.current, {
        render: 'Class Code Changed!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      })
      // currentClassCode(`${user.userInfo.classCode}`)
      // newClassCode('')

      dispatch(reset())
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
  }, [user, isError, isSuccess, message])

  useEffect(() => {
    setCurrentClassCode(user.userInfo.classCode)
    // eslint-disable-next-line
  }, [user])

  return (
    <div className="change-class">
      <Sidebar />

      <main>
        <header>
          <Grid2 container spacing={0}>
            <Grid2
              xs={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1>
                CHANGE <span>CLASS</span>
              </h1>
              <p>
                Are you enrolled in the correct class? If not, feel free to
                switch classes.
              </p>
            </Grid2>
            <Grid2
              xs={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={change_class} alt="Change class Logo" />
            </Grid2>
          </Grid2>
        </header>

        <form>
          <FormControl fullWidth={true}>
            <Grid2 container spacing={1}>
              <Grid2 xs={4}>
                <div className="profile-container">
                  <div className="img-container">
                    <div
                      className="img"
                      style={{
                        backgroundImage: `url(${user?.userInfo.image})`,
                      }}
                    ></div>
                  </div>

                  <span style={{ marginTop: '8px' }}>
                    School/University: <span>{user?.userInfo.school}</span>
                  </span>
                  <span>
                    Name:{' '}
                    <span>
                      {user?.userInfo.firstName + ' '}
                      {user?.userInfo.middleInitial + ' '}
                      {user?.userInfo.lastName}
                    </span>
                  </span>
                  <span>
                    Email: <span>{user?.email}</span>
                  </span>
                </div>
              </Grid2>
              <Grid2 xs={8}>
                <Grid2 xs={12}>
                  <TextField
                    label="Current Classcode"
                    type="text"
                    name="current_classcode"
                    fullWidth
                    autoComplete="off"
                    sx={textfieldStyle}
                    InputProps={{
                      readOnly: true,
                      sx: { height: 50, color: '#F0F0F0' },
                    }}
                    value={currentClassCode}
                    onChange={(e) => {
                      setCurrentClassCode(e.target.value)
                    }}
                  />
                </Grid2>

                <Grid2 xs={12}>
                  <TextField
                    label="New Classcode"
                    type="text"
                    name="new_classcode"
                    autoComplete="off"
                    fullWidth
                    sx={textfieldStyle}
                    InputProps={{ sx: { height: 50, color: '#F0F0F0' } }}
                    value={newClassCode}
                    onChange={(e) => {
                      setNewClassCode(e.target.value)
                    }}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
            <hr />

            <Grid2
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                onClick={cancel}
                variant="contained"
                sx={{
                  background: 'var(--backgroundColor)',
                  boxShadow: 'none',
                  color: '#F0F0F0',
                  height: 40,
                  mt: 2,
                  mr: 1,
                  width: '150px',
                  borderRadius: '20px',
                  fontSize: '14px',
                }}
              >
                Cancel
              </Button>

              <LoadingButton
                onClick={submit}
                loading={isLoading}
                variant="contained"
                loadingIndicator={
                  <CircularProgress size="1.5em" sx={{ color: '#182240' }} />
                }
                sx={{
                  background: '#42C9A3',
                  color: '#F0F0F0',
                  height: 40,
                  mt: 2,
                  width: '150px',
                  borderRadius: '20px',
                  fontSize: '11px',
                }}
              >
                Change Classcode
              </LoadingButton>
            </Grid2>
          </FormControl>
        </form>
      </main>
    </div>
  )
}

export default ChangeClass
