/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Complex site-specific column configuration
                'footer': '360px 300px 240px 300px',
            }
        },
    },
    plugins: [],
};
