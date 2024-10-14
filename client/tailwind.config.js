/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite-react/tailwind";
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                primary: "#264653",
                secondary: "#111D29",
                lightGrey: "#F7F7F7",
                charcolGrey: "#3C3C3C",
            },
        },
    },
    plugins: [
        // ...
        flowbite.plugin(),
    ],
};
