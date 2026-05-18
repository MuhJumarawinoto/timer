// Base API fetch function
const apiFetch = async (url: string, options?: RequestInit) => {
  const token = import.meta.client ? localStorage.getItem('ps-timer-token') : null

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers
    }
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Terjadi kesalahan' }))
    throw new Error(error.message || 'Terjadi kesalahan')
  }

  return response.json()
}

// Active Timers API
export const useActiveTimersApi = () => {
  const timers = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTimers = async () => {
    loading.value = true
    error.value = null
    try {
      timers.value = await apiFetch('/api/timers')
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const createTimer = async (data: any) => {
    loading.value = true
    try {
      const newTimer = await apiFetch('/api/timers', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      timers.value.push(newTimer)
      return newTimer
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateTimer = async (id: number, data: any) => {
    try {
      const updated = await apiFetch(`/api/timers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      const index = timers.value.findIndex(t => t.id === id)
      if (index !== -1) {
        timers.value[index] = updated
      }
      return updated
    } catch (e: any) {
      error.value = e.message
      throw e
    }
  }

  const deleteTimer = async (id: number) => {
    try {
      await apiFetch(`/api/timers/${id}`, { method: 'DELETE' })
      timers.value = timers.value.filter(t => t.id !== id)
    } catch (e: any) {
      error.value = e.message
      throw e
    }
  }

  // Auto-fetch on mount
  onMounted(() => {
    fetchTimers()
  })

  return {
    timers,
    loading,
    error,
    fetchTimers,
    createTimer,
    updateTimer,
    deleteTimer
  }
}

// History API
export const useHistoryApi = () => {
  const history = ref<any[]>([])
  const loading = ref(false)

  const fetchHistory = async () => {
    loading.value = true
    try {
      history.value = await apiFetch('/api/history')
    } finally {
      loading.value = false
    }
  }

  const addToHistory = async (data: any) => {
    try {
      const entry = await apiFetch('/api/history', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      history.value.unshift(entry)
      return entry
    } catch (e: any) {
      console.error('Failed to add to history:', e)
      throw e
    }
  }

  onMounted(() => {
    fetchHistory()
  })

  return {
    history,
    loading,
    fetchHistory,
    addToHistory
  }
}

// Saved Timers API
export const useSavedTimersApi = () => {
  const savedTimers = ref<any[]>([])
  const loading = ref(false)

  const fetchSavedTimers = async () => {
    loading.value = true
    try {
      savedTimers.value = await apiFetch('/api/saved-timers')
    } finally {
      loading.value = false
    }
  }

  const saveTimer = async (data: any) => {
    try {
      const saved = await apiFetch('/api/saved-timers', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      savedTimers.value.push(saved)
      return saved
    } catch (e: any) {
      console.error('Failed to save timer:', e)
      throw e
    }
  }

  const deleteSavedTimer = async (id: number) => {
    try {
      await apiFetch(`/api/saved-timers/${id}`, { method: 'DELETE' })
      savedTimers.value = savedTimers.value.filter(t => t.id !== id)
    } catch (e: any) {
      console.error('Failed to delete saved timer:', e)
      throw e
    }
  }

  onMounted(() => {
    fetchSavedTimers()
  })

  return {
    savedTimers,
    loading,
    fetchSavedTimers,
    saveTimer,
    deleteSavedTimer
  }
}

// Auth API
export const useAuthApi = () => {
  const login = async (username: string, password: string) => {
    try {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      })

      if (response.success && import.meta.client) {
        localStorage.setItem('ps-timer-token', response.token)
        localStorage.setItem('ps-timer-auth', JSON.stringify({
          isLoggedIn: true,
          username: response.user.username,
          userId: response.user.id
        }))
      }

      return response
    } catch (e: any) {
      throw e
    }
  }

  const logout = () => {
    if (import.meta.client) {
      localStorage.removeItem('ps-timer-token')
      localStorage.removeItem('ps-timer-auth')
    }
    navigateTo('/login')
  }

  const checkAuth = () => {
    if (import.meta.client) {
      const auth = localStorage.getItem('ps-timer-auth')
      return auth ? JSON.parse(auth) : null
    }
    return null
  }

  return {
    login,
    logout,
    checkAuth
  }
}
