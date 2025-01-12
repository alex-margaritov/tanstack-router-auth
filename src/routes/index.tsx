import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.authentication.isLoggedIn) {
      throw redirect({ to: '/profile' })
    } else {
      throw redirect({ to: '/login' })
    }
  },
})
