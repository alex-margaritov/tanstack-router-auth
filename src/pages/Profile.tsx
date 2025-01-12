import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

import { useAuth } from '../shared/auth'

export const Profile = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    signOut()
    void navigate({ to: '/login' })
  }, [navigate, signOut])

  return (
    <Container maxWidth="md" sx={{ height: '100vh', alignContent: 'center' }}>
      <Stack spacing={6}>
        <Stack spacing={4}>
          <Typography variant="h4" component="h4" align="center">
            This is your private profile <br />
            But it it looks like someone has stole it!
          </Typography>
          <Typography variant="h1" component="h1" align="center">
            ಠ_ಠ
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="center">
          <Button onClick={handleLogout}>Logout</Button>
        </Stack>
      </Stack>
    </Container>
  )
}
