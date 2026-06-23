import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading...')

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 40)

    // Change loading text
    const textTimer = setInterval(() => {
      const texts = ['Loading...', 'Preparing Assets...', 'Almost Ready...']
      setLoadingText(texts[Math.floor(Math.random() * texts.length)])
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(textTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center grain-overlay"
        style={{ backgroundColor: 'var(--color-bg)' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md w-full px-4 relative z-10">
          {/* Logo/Name Animation */}
          <motion.div
            className="mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-light gradient-text">
              EM
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--color-text-secondary)' }}>Edwin Meleth</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                <motion.div
                  className="h-full"
                  style={{
                    background: 'linear-gradient(90deg, #C9A96E, #E8D5A8, #C9A96E)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
            </motion.div>

            {/* Progress Percentage */}
            <motion.div
              className="mt-4 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{loadingText}</p>
              <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>{progress}%</p>
            </motion.div>
          </div>

          {/* Animated Dots */}
          <motion.div
            className="flex justify-center space-x-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--color-accent)' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingScreen
