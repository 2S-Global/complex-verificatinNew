
import { Inter } from 'next/font/google';
import { PaymentProvider } from "../app/context/PaymentContext";


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/img/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Nunito:300,400,600,700|Poppins:300,400,500,600,700"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" />

        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body className={inter.className}>
        
      <PaymentProvider>
          {children}
        </PaymentProvider>
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" defer></script>
        <script src="/assets/js/main.js" defer></script>
      </body>
    </html>
  );
}
