export default {
  darkMode: 'class',
  content: ['./app/components/**/*.{js,vue,ts}', './app/layouts/**/*.vue', './app/pages/**/*.vue', './app/plugins/**/*.{js,ts}', './nuxt.config.{js,ts}'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 4s ease-in-out'
      },
      keyframes: (theme: (arg0: string) => any) => ({
        fadeOut: {
          '0%': { opacity: theme('opacity.100') },
          '100%': { opacity: theme('opacity.0') }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
