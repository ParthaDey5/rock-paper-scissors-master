/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx,html}"
    ],
    darkMode: 'class',
    theme: {
      extend: {
        screens: {
          xm: '300px',
          sm: '640px',
          tablet: '768px',  // ✅ custom name
          md: '821px',      // your override
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
        cursor: {
          pointer: 'url("/icons/cursor3.png"), pointer',
        },
        colors: {
          // Primary gradients
          'scissors-start': 'hsl(39, 89%, 49%)',
          'scissors-end':   'hsl(40, 84%, 53%)',
          'paper-start':    'hsl(230, 89%, 62%)',
          'paper-end':      'hsl(230, 89%, 65%)',
          'rock-start':     'hsl(349, 71%, 52%)',
          'rock-end':       'hsl(349, 70%, 56%)',
          'lizard-start':   'hsl(261, 73%, 60%)',
          'lizard-end':     'hsl(261, 72%, 63%)',
          'spock-start':    'hsl(189, 59%, 53%)',
          'spock-end':      'hsl(189, 58%, 57%)',
  
          // Neutrals
          'text-dark':      'hsl(229, 25%, 31%)',
          'text-score':     'hsl(229, 64%, 46%)',
          'header-outline': 'hsl(217, 16%, 45%)',
           
          // Background
          'bg-start':       'hsl(214, 47%, 23%)',
          'bg-end':         'hsl(237, 49%, 15%)',
        },
        fontFamily: {
          barlow: ['"Barlow Semi Condensed"', 'sans-serif']
        },
        boxShadow: {
          // subtle glow for dark flags or emphasis
          glow: '0 0 2rem 0.4rem hsla(0,0%,100%,0.2)'
        },
        backgroundImage: {
          // radial gradient for the page background
          'radial': 'radial-gradient(circle at top, hsl(214,47%,23%), hsl(237,49%,15%))'
        }
      }
    },
    plugins: []
  }
  