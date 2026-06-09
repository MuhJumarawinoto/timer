/**
 * Timer PS - Alarm System
 * Bunyi alarm dengan Web Audio API
 */

class TimerAlarm {
  private audioContext: AudioContext | null = null;
  private isPlaying: boolean = false;
  private vibrationInterval: number | null = null;

  /**
   * Inisialisasi Audio Context (perlu user interaction dulu)
   */
  init() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * Mainkan bunyi beep pendek
   */
  private playBeep(frequency: number = 800, duration: number = 0.2) {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'square';

      gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.error('Audio error:', error);
    }
  }

  /**
   * Mainkan bunyi alarm berulang
   * @param duration - Durasi alarm dalam detik (default: 5 menit)
   */
  startAlarm(duration: number = 300) {
    if (this.isPlaying) return;

    this.isPlaying = true;
    let count = 0;
    const maxDuration = duration * 1000;
    const interval = 600; // Setiap 600ms

    // Vibrate untuk Android
    if ('vibrate' in navigator) {
      navigator.vibrate([500, 500]);
    }

    // Mainkan beep pertama
    this.playBeep(1000, 0.3);

    // Loop beep
    const playLoop = () => {
      if (!this.isPlaying) return;

      count += interval;
      if (count >= maxDuration) {
        this.stopAlarm();
        return;
      }

      // Vibrate lagi
      if ('vibrate' in navigator) {
        navigator.vibrate([500, 500]);
      }

      // Mainkan beep
      this.playBeep(1000, 0.3);

      this.vibrationInterval = (setTimeout(playLoop, interval) as unknown as number);
    };

    this.vibrationInterval = (setTimeout(playLoop, interval) as unknown as number);
  }

  /**
   * Stop alarm
   */
  stopAlarm() {
    this.isPlaying = false;

    if (this.vibrationInterval) {
      clearTimeout(this.vibrationInterval);
      this.vibrationInterval = null;
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(0);
    }
  }

  /**
   * Cek apakah alarm sedang berjalan
   */
  isActive(): boolean {
    return this.isPlaying;
  }

  /**
   * Mainkan bunyi notifikasi pendek (untuk event lain)
   */
  notify() {
    this.playBeep(600, 0.1);
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  }

  /**
   * Mainkan bunyi success
   */
  success() {
    this.playBeep(800, 0.15);
    setTimeout(() => this.playBeep(1000, 0.15), 150);
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  }

  /**
   * Mainkan bunyi error
   */
  error() {
    this.playBeep(300, 0.2);
    setTimeout(() => this.playBeep(200, 0.2), 200);
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }
}

// Export singleton instance
export const timerAlarm = new TimerAlarm();

/**
 * Hook Vue 3 untuk menggunakan alarm
 */
export function useTimerAlarm() {
  return {
    init: () => timerAlarm.init(),
    start: (duration?: number) => timerAlarm.startAlarm(duration),
    stop: () => timerAlarm.stopAlarm(),
    isActive: () => timerAlarm.isActive(),
    notify: () => timerAlarm.notify(),
    success: () => timerAlarm.success(),
    error: () => timerAlarm.error()
  };
}

/**
 * Penggunaan di Vue Component:
 *
 * <script setup>
 * import { onMounted, onUnmounted } from 'vue'
 * import { useTimerAlarm } from './alarm'
 *
 * const alarm = useTimerAlarm()
 *
 * onMounted(() => {
 *   // Init saat ada interaksi user
 *   document.addEventListener('click', () => alarm.init(), { once: true })
 * })
 *
 * function timerSelesai() {
 *   alarm.start(300) // Alarm selama 5 menit
 * }
 *
 * function stopAlarm() {
 *   alarm.stop()
 * }
 * </script>
 */
