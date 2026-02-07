/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#f43f5e',
        tertiary: '#fbbf24',
        quaternary: '#a855f7',
        accent: '#4ade80',
        error: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
        info: '#0ea5e9',
        'color-1': 'var(--color-1)',
        'color-2': 'var(--color-2)',
        'color-3': 'var(--color-3)',
        'color-4': 'var(--color-4)',
      },
      borderRadius: {
        'default': '12px',
      },
      animation: {
        // Modal animations
        'shake': 'shake 0.3s ease-in-out',
        'bounce-in': 'bounce-in 0.4s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
        'fade-out': 'fade-out 0.3s ease-out',
        
        // Pulse animations
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Spin animations
        'spin-slow': 'spin 2s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
        
        // Scale animations
        'scale-up': 'scale-up 0.3s ease-out',
        'scale-down': 'scale-down 0.3s ease-out',
        
        // Flip animations
        'flip-x': 'flip-x 0.6s ease-in-out',
        'flip-y': 'flip-y 0.6s ease-in-out',
        
        // Glow animations
        'glow': 'glow 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        
        // Bounce variations
        'bounce-slow': 'bounce 1.5s infinite',
        'bounce-fast': 'bounce 0.5s infinite',
        
        // Swing animation
        'swing': 'swing 1s ease-in-out infinite',
        
        // Jiggle animation
        'jiggle': 'jiggle 0.4s ease-in-out infinite',
      },
      keyframes: {
        // Shake effect
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-10px)' },
        },
        
        // Bounce in effect
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        
        // Slide down effect
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        // Slide up effect
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        // Fade in effect
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        
        // Fade out effect
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        
        // Scale up effect
        'scale-up': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        
        // Scale down effect
        'scale-down': {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        
        // Flip X effect
        'flip-x': {
          '0%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0)' },
        },
        
        // Flip Y effect
        'flip-y': {
          '0%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0)' },
        },
        
        // Glow effect
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)',
            opacity: '0.8'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
            opacity: '1'
          },
        },
        
        // Glow pulse effect
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(59, 130, 246, 1)'
          },
        },
        
        // Swing effect
        swing: {
          '20%': { transform: 'rotate(15deg)' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '80%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        
        // Jiggle effect
        jiggle: {
          '0%, 100%': { transform: 'skewX(0deg) skewY(0deg)' },
          '25%': { transform: 'skewX(10deg) skewY(10deg)' },
          '50%': { transform: 'skewX(-5deg) skewY(-5deg)' },
          '75%': { transform: 'skewX(5deg) skewY(-10deg)' },
        },
      },
      // Add transition durations
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '750': '750ms',
      },
      // Add transition timing functions
      transitionTimingFunction: {
        'in-elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'out-elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}
