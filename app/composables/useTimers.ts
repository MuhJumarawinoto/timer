import { toRaw } from 'vue'

export const useActiveTimers = () => {
  const activeTimers = useState('activeTimers', () => [])
  const isInitialized = useState('activeTimersInitialized', () => false)
  let saveTimeout: ReturnType<typeof setTimeout> | null = null

  // Load from storage on client side only
  onMounted(() => {
    if (!isInitialized.value && import.meta.client) {
      isInitialized.value = true
      const saved = localStorage.getItem('ps-timer-active')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed.timers) {
            const lastSaved = new Date(parsed.lastSaved)
            const now = new Date()
            const timeDiff = Math.floor((now - lastSaved) / 1000)

            activeTimers.value = parsed.timers.map((timer: any) => {
              if (!timer.isPaused && !timer.isFinished && timer.remainingTime > 0) {
                const newRemainingTime = timer.remainingTime - timeDiff
                return {
                  ...timer,
                  remainingTime: newRemainingTime > 0 ? newRemainingTime : 0,
                  isFinished: newRemainingTime <= 0
                }
              }
              return timer
            })
          }
        } catch (e) {
          console.error('Error loading timers:', e)
        }
      }
    }
  })

  // Watch for changes and save to storage (client only)
  if (import.meta.client) {
    watch(activeTimers, () => {
      if (saveTimeout) clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        const data = {
          timers: toRaw(activeTimers.value),
          lastSaved: new Date().toISOString()
        }
        localStorage.setItem('ps-timer-active', JSON.stringify(data))
      }, 300)
    }, { deep: true })
  }

  return activeTimers
}

export const useSavedTimers = () => {
  const savedTimers = useState('savedTimers', () => [])
  const isInitialized = useState('savedTimersInitialized', () => false)
  let saveTimeout: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    if (!isInitialized.value && import.meta.client) {
      isInitialized.value = true
      const saved = localStorage.getItem('ps-timer-saved')
      if (saved) {
        try {
          savedTimers.value = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading saved timers:', e)
        }
      }
    }
  })

  if (import.meta.client) {
    watch(savedTimers, () => {
      if (saveTimeout) clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        localStorage.setItem('ps-timer-saved', JSON.stringify(toRaw(savedTimers.value)))
      }, 300)
    }, { deep: true })
  }

  return savedTimers
}

export const useSavedPresets = () => {
  const savedPresets = useState('savedPresets', () => [])
  const isInitialized = useState('savedPresetsInitialized', () => false)
  let saveTimeout: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    if (!isInitialized.value && import.meta.client) {
      isInitialized.value = true
      const saved = localStorage.getItem('ps-timer-presets')
      if (saved) {
        try {
          savedPresets.value = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading presets:', e)
        }
      }
    }
  })

  if (import.meta.client) {
    watch(savedPresets, () => {
      if (saveTimeout) clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        localStorage.setItem('ps-timer-presets', JSON.stringify(toRaw(savedPresets.value)))
      }, 300)
    }, { deep: true })
  }

  return savedPresets
}

export const useHistory = () => {
  const history = useState('history', () => [])
  const isInitialized = useState('historyInitialized', () => false)
  let saveTimeout: ReturnType<typeof setTimeout> | null = null

  onMounted(() => {
    if (!isInitialized.value && import.meta.client) {
      isInitialized.value = true
      const saved = localStorage.getItem('ps-timer-history')
      if (saved) {
        try {
          history.value = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading history:', e)
        }
      }
    }
  })

  if (import.meta.client) {
    watch(history, () => {
      if (saveTimeout) clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        localStorage.setItem('ps-timer-history', JSON.stringify(toRaw(history.value)))
      }, 300)
    }, { deep: true })
  }

  return history
}
