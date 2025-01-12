import { createFileRoute } from '@tanstack/react-router'

import { ResetPassword } from '../../pages/ResetPassword'

export const Route = createFileRoute('/_public/reset-password')({
  component: ResetPassword,
})
