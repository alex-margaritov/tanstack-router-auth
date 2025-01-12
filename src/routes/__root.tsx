import Container from '@mui/material/Container'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { AuthContext } from '../shared/auth'

type RouterContext = {
  authentication: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Container maxWidth="md" sx={{ minHeight: '100vh' }}>
      <Outlet />
      <TanStackRouterDevtools />
    </Container>
  ),
})
