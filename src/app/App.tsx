import { createRouter, RouterProvider } from '@tanstack/react-router'

import { routeTree } from '../routeTree.gen'
import { useAuth } from '../shared/auth'

const router = createRouter({
  routeTree,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  context: { authentication: undefined! },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const App = () => {
  const authentication = useAuth()

  console.log(authentication)

  return <RouterProvider router={router} context={{ authentication }} />
}
