/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Complex site-specific column configuration
                'footer': '30% 20% 20% 30%',
            }
        },
    },
    plugins: [],
};
