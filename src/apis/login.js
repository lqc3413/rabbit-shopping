import http from '@/utils/http'

export const Login = (account, password) => {
  return http.post('/login', {
      account: account,
      password: password
    
  })
}