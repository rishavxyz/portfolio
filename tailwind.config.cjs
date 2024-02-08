const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Arimo', ...defaultTheme.fontFamily.sans],
			dsiplay: ["'Bebas Neue'", ...defaultTheme.fontFamily.sans],
			serif: ["'Noto Serif'", ...defaultTheme.fontFamily.serif],
			code: ["'Ubuntu Mono'", ...defaultTheme.fontFamily.mono]
		},
		extend: {
			screens: {
				mouse: { raw: '(hover:hover)' }
			},
			colors: {
				surface: '#121212',
				'on-surface': '#f5fcff'
			},
			typography: function ({ theme }) {
				return {
					surface: {
						css: {
							'--tw-prose-body': theme('colors.surface'),
							'--tw-prose-headings': theme('colors.surface'),
							'--tw-prose-lead': theme('colors.neutral[700]'),
							'--tw-prose-links': theme('colors.surface'),
							'--tw-prose-bold': theme('colors.surface'),
							'--tw-prose-counters': theme('colors.neutral[600]'),
							'--tw-prose-bullets': theme('colors.neutral[400]'),
							'--tw-prose-hr': theme('colors.neutral[400]'),
							'--tw-prose-quotes': theme('colors.surface'),
							'--tw-prose-quote-borders': theme('colors.neutral[400]'),
							'--tw-prose-captions': theme('colors.neutral[700]'),
							'--tw-prose-code': theme('colors.surface'),
							'--tw-prose-pre-bg': theme('colors.neutral[100]'),
							'--tw-prose-pre-code': theme('colors.surface'),
							'--tw-prose-th-borders': theme('colors.neutral[400]'),
							'--tw-prose-td-borders': theme('colors.neutral[300]'),
							'--tw-prose-invert-body': theme('colors.["on-surface"]'),
							'--tw-prose-invert-headings': theme('colors.white'),
							'--tw-prose-invert-lead': theme('colors.neutral[300]'),
							'--tw-prose-invert-links': theme('colors.white'),
							'--tw-prose-invert-bold': theme('colors.white'),
							'--tw-prose-invert-counters': theme('colors.neutral[400]'),
							'--tw-prose-invert-bullets': theme('colors.neutral[600]'),
							'--tw-prose-invert-hr': theme('colors.neutral[700]'),
							'--tw-prose-invert-quotes': theme('colors.neutral[100]'),
							'--tw-prose-invert-quote-borders': theme('colors.neutral[700]'),
							'--tw-prose-invert-captions': theme('colors.neutral[400]'),
							'--tw-prose-invert-code': theme('colors.white'),
							'--tw-prose-invert-pre-code': theme('colors.neutral[300]'),
							'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
							'--tw-prose-invert-th-borders': theme('colors.neutral[600]'),
							'--tw-prose-invert-td-borders': theme('colors.neutral[700]')
						}
					}
				};
			}
		}
	},

	plugins: [forms, typography]
};

module.exports = config;
