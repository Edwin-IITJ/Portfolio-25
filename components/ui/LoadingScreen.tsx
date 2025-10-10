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
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md w-full px-4">
          {/* Logo/Name Animation */}
          <motion.div
            className="mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text">
              EM
            </h1>
            <p className="text-lg text-gray-600 mt-2">Edwin Meleth</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500"
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
              <p className="text-sm text-gray-500">{loadingText}</p>
              <p className="text-sm font-semibold text-primary-600">{progress}%</p>
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
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
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
