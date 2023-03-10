const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        colors: {
            current: 'currentColor',
            transparent: 'transparent',
            white: '#fff',
            black: '#000',
            primary: {
                50: '#e0e8ef',
                100: '#cbdeed',
                200: '#a1ceec',
                300: '#80c1e8',
                400: '#66b4e6',
                500: '#4398d1',
                600: '#2b8ed3',
                700: '#116bab',
                800: '#0d5587',
                900: '#073656',
            },
            gray: {
                50: '#f9fafb',
                100: '#f4f5f7',
                200: '#e5e7eb',
                300: '#d2d6dc',
                400: '#9fa6b2',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#252f3f',
                900: '#161e2e',
            },
            red: {
                50: '#fdf2f2',
                100: '#fde8e8',
                200: '#fbd5d5',
                300: '#f8b4b4',
                400: '#f98080',
                500: '#f05252',
                600: '#e02424',
                700: '#c81e1e',
                800: '#9b1c1c',
                900: '#771d1d',
            },
            orange: {
                50: '#fff8f1',
                100: '#feecdc',
                200: '#fcd9bd',
                300: '#fdba8c',
                400: '#ff8a4c',
                500: '#ff5a1f',
                600: '#d03801',
                700: '#b43403',
                800: '#8a2c0d',
                900: '#73230d',
            },
            yellow: {
                50: '#fdfdea',
                100: '#fdf6b2',
                200: '#fce96a',
                300: '#faca15',
                400: '#e3a008',
                500: '#c27803',
                600: '#9f580a',
                700: '#8e4b10',
                800: '#723b13',
                900: '#633112',
            },
            green: {
                50: '#f3faf7',
                100: '#def7ec',
                200: '#bcf0da',
                300: '#84e1bc',
                400: '#31c48d',
                500: '#0e9f6e',
                600: '#057a55',
                700: '#046c4e',
                800: '#03543f',
                900: '#014737',
            },
            blue: {
                50: '#e0e8ef',
                100: '#cbdeed',
                200: '#a1ceec',
                300: '#80c1e8',
                400: '#66b4e6',
                500: '#4398d1',
                600: '#2b8ed3',
                700: '#116bab',
                800: '#0d5587',
                900: '#073656',
            },
        },
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
