
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				solana: {
					purple: '#9945FF',
					green: '#14F195',
					teal: '#00C2FF',
					dark: '#121212',
					light: '#F5F5F5',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'pulse-slow': 'pulse-slow 3s infinite',
				'gradient-shift': 'gradient-shift 10s ease infinite',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite'
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(135deg, #9945FF 0%, #00C2FF 50%, #14F195 100%)',
				'card-gradient': 'linear-gradient(to right bottom, rgba(153, 69, 255, 0.05), rgba(0, 194, 255, 0.05))',
				'card-gradient-hover': 'linear-gradient(to right bottom, rgba(153, 69, 255, 0.1), rgba(0, 194, 255, 0.1))',
				'shimmer-gradient': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
				'glass-gradient': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
				'glass-shine': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 80%)',
				'purple-gradient': 'linear-gradient(135deg, rgba(153, 69, 255, 0.8) 0%, rgba(153, 69, 255, 0.2) 100%)',
				'blue-gradient': 'linear-gradient(135deg, rgba(0, 194, 255, 0.8) 0%, rgba(0, 194, 255, 0.2) 100%)',
				'green-gradient': 'linear-gradient(135deg, rgba(20, 241, 149, 0.8) 0%, rgba(20, 241, 149, 0.2) 100%)',
			},
			boxShadow: {
				'glass': '0 8px 32px rgba(0, 0, 0, 0.05)',
				'neon': '0 0 15px rgba(153, 69, 255, 0.5)',
				'soft': '0 10px 30px -15px rgba(0, 0, 0, 0.15)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
