import { zodResolver } from '@hookform/resolvers/zod'
import { Alert } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Link } from '@tanstack/react-router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAuth } from '../shared/auth'

type ResetPasswordFormType = {
  newPassword: string
}

const resetPasswordSchema = z.object({
  newPassword: z
    .string({
      required_error: 'Please enter a password',
    })
    .nonempty(),
})

export const ResetPassword = () => {
  const { updatePassword } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit: SubmitHandler<ResetPasswordFormType> = (data) => {
    updatePassword(data.newPassword)
    reset()
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
                Reset password
              </Typography>
              <Stack direction="column" spacing={2} marginTop="60px">
                <TextField
                  type="password"
                  label="New password"
                  variant="outlined"
                  error={Boolean(errors.newPassword)}
                  helperText={errors.newPassword?.message}
                  {...register('newPassword')}
                />
                {Boolean(errors.root?.message) && (
                  <Typography variant="body1" color="error">
                    {errors.root?.message}
                  </Typography>
                )}
                {isSubmitSuccessful && (
                  <Alert severity="success">
                    You have successfully updated your password
                  </Alert>
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
              <Link to="/login">
                <Button>Back to Sign In</Button>
              </Link>
              <Button type="submit">Submit</Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}
