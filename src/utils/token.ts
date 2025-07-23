const TOKEN_KEY = 'token'

function isLogin() {
  return !!localStorage.getItem(TOKEN_KEY)
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token: string) {
  return localStorage.setItem(TOKEN_KEY, token)
}

function clearToken() {
  return localStorage.removeItem(TOKEN_KEY)
}

export { isLogin, getToken, setToken, clearToken }
