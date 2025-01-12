import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from '@tanstack/react-router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { DEFAULT_PASSWORD, useAuth, USER } from '../shared/auth'

type LoginFormType = {
  login: string
  password: string
}

const loginSchema = z.object({
  login: z
    .string({
      required_error: 'Please enter a login',
    })
    .nonempty(),
  password: z
    .string({
      required_error: 'Please enter a password',
    })
    .nonempty(),
})

export const Login = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    try {
      signIn(data)
      void navigate({ to: '/profile' })
    } catch (error) {
      if (error instanceof Error) {
        setError('root', { message: error.message })
      } else {
        setError('root', { message: 'Unknown error' })
      }
    }
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid size={{ xs: 12, sm: 9 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Card>
            <CardContent>
              <Typography variant="h3" align="center">
                Sign In
              </Typography>
              <Stack direction="column" spacing={2} marginTop="60px">
                <Typography variant="body2">
                  For this demo user name is <em>{USER}</em> and default
                  password is <em>{DEFAULT_PASSWORD}</em>
                </Typography>
                <TextField
                  label="Email"
                  variant="outlined"
                  error={Boolean(errors.login)}
                  helperText={errors.login?.message}
                  {...register('login')}
                />
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  {...register('password')}
                />
                {Boolean(errors.root?.message) && (
                  <Typography variant="body1" color="error">
                    {errors.root?.message}
                  </Typography>
                )}
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                paddingLeft: '8rem',
                paddingRight: '8rem',
                justifyContent: 'space-between',
              }}
            >
              <Link to="/reset-password">
                <Button>Reset password</Button>
              </Link>
              <Button type="submit">Submit</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}
