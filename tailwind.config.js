/** @type {import('tailwindcss').Config} */  
import tailwindcssAnimated from 'tailwindcss-animated';  

export default {  
  content: [  
    "./index.html",  
    "./src/**/*.{js,ts,jsx,tsx}",  
  ],  
  theme: {  
    extend: {  
      colors:  {  
        // Defina suas cores personalizadas aqui  
      },  
      backgroundImage: {  
        // Defina suas imagens de fundo personalizadas aqui  
      }  
    },  
  },  
  plugins: [  
    tailwindcssAnimated,  
  ],  
} 