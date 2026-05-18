export const useAuth = () => {
  const logout = () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
      if (import.meta.client) {
        localStorage.removeItem('ps-timer-auth')
      }
      navigateTo('/')
      if (import.meta.client) {
        location.reload()
      }
    }
  }

  return {
    logout
  }
}
