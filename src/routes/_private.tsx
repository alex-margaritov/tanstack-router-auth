import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_private')({
  beforeLoad: ({ context }) => {
    const { authentication } = context

    if (!authentication.isLoggedIn) {
      throw redirect({ to: '/login' })
    }
  },
})
