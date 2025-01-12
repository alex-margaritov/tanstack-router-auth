import { useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'

const LOCAL_STORAGE_PASSWORD_KEY = 'password'
const LOCAL_STORAGE_IS_LOGGED_IN_KEY = 'isLoggedIn'

export const USER = 'admin'
export const DEFAULT_PASSWORD = 'password'

export const useAuth = () => {
  const [password, setPassword] = useLocalStorageState(
    LOCAL_STORAGE_PASSWORD_KEY,
    { defaultValue: DEFAULT_PASSWORD }
  )
  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState(
    LOCAL_STORAGE_IS_LOGGED_IN_KEY,
    { defaultValue: 'false' }
  )

  const signIn = useCallback(
    (payload: { login: string; password: string }) => {
      if (payload.login !== USER) {
        throw new Error('Incorrect user name')
      }

      if (payload.password !== password) {
        throw new Error('Password is incorrect')
      }

      setIsLoggedIn('true')
    },
    [password, setIsLoggedIn]
  )

  const signOut = useCallback(() => {
    setIsLoggedIn('false')
  }, [setIsLoggedIn])

  const updatePassword = useCallback(
    (newPassword: string) => {
      setPassword(newPassword)
    },
    [setPassword]
  )

  return { signIn, signOut, updatePassword, isLoggedIn: isLoggedIn === 'true' }
}

export type AuthContext = ReturnType<typeof useAuth>
