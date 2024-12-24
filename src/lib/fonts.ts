import localFont from 'next/font/local';

const airbnb = localFont({
  src: [
    {
      path: '../assets/fonts/AirbnbCerealVF_W_Wght.woff2',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AirbnbCerealVF_Arabic_W_Wght.woff2',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AirbnbCerealVF_Cyril_W_Wght.woff2',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AirbnbCerealVF_Hebrew_W_Wght.woff2',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AirbnbCerealVF_Italics_W_Wght.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-airbnb',
});

export { airbnb };
