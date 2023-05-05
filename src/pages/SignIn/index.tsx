import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Copyright from '@/component/CopyRight'
import { formSchema } from './yupSchema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '@/redux/store'
import { loginUser } from '@/services/authService'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
interface SignInFormInputs {
  usernameOrEmail: string
  password: string
}
const schema = formSchema

function SignIn() {
  const login = useSelector(selectAuth).login
  const user = login?.user ? login.user : null

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.accessToken) {
      toast.info('You already login')
      navigate('/')
    }
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data: SignInFormInputs) => {
    const request = {
      username: data.usernameOrEmail,
      password: data.password
    }
    loginUser(request, dispatch, navigate)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='usernameOrEmail'
            label='Email Address'
            autoComplete='email'
            autoFocus
            {...register('usernameOrEmail')}
            error={!!errors.usernameOrEmail}
            helperText={errors.usernameOrEmail?.message}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright></Copyright>
    </Container>
  )
}

export default SignIn
