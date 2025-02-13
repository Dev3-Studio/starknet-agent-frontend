import type { Config } from "tailwindcss"
import scrollbarHide from 'tailwind-scrollbar-hide'

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px',
  		},
  	},
  	extend: {
  		colors: {
  			border: 'hsla(var(--border))',
  			input: 'hsla(var(--input))',
  			ring: 'hsla(var(--ring))',
  			background: 'hsla(var(--background))',
  			foreground: 'hsla(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsla(var(--primary))',
  				foreground: 'hsla(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsla(var(--secondary))',
  				foreground: 'hsla(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsla(var(--destructive))',
  				foreground: 'hsla(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsla(var(--muted))',
  				foreground: 'hsla(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsla(var(--accent))',
  				foreground: 'hsla(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsla(var(--popover))',
  				foreground: 'hsla(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsla(var(--card))',
  				foreground: 'hsla(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsla(var(--chart-1))',
  				'2': 'hsla(var(--chart-2))',
  				'3': 'hsla(var(--chart-3))',
  				'4': 'hsla(var(--chart-4))',
  				'5': 'hsla(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsla(var(--sidebar-background))',
  				foreground: 'hsla(var(--sidebar-foreground))',
  				primary: 'hsla(var(--sidebar-primary))',
  				'primary-foreground': 'hsla(var(--sidebar-primary-foreground))',
  				accent: 'hsla(var(--sidebar-accent))',
  				'accent-foreground': 'hsla(var(--sidebar-accent-foreground))',
  				border: 'hsla(var(--sidebar-border))',
  				ring: 'hsla(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
	    spacing: {
			  'custom': '63rem',
	    },
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
	    backgroundImage: {
		    'hero-gradient': 'linear-gradient(to bottom, #706dc0, #34335a)',
	    },
		  
  	}
  },
  plugins: [
	  require("tailwindcss-animate"),
	  scrollbarHide
  ],
} satisfies Config

export default config