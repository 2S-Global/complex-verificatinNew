
import { Inter } from 'next/font/google';

export async function generateMetadata({ params }) {
  return {
    title: `NiceAdmin - Login`, // Dynamically generated title
    description: `Admin Dashboard Login Page`,
  };
}

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
{/*         <link rel="stylesheet" href="/assets/vendor/boxicons/css/boxicons.min.css" />
        <link rel="stylesheet" href="/assets/vendor/quill/quill.snow.css" />
        <link rel="stylesheet" href="/assets/vendor/quill/quill.bubble.css" />
        <link rel="stylesheet" href="/assets/vendor/remixicon/remixicon.css" />
        <link rel="stylesheet" href="/assets/vendor/simple-datatables/style.css" /> */}
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body className={inter.className}>
        {children}
        {/* Vendor JS Files */}
        {/* <script src="/assets/vendor/apexcharts/apexcharts.min.js" defer></script> */}
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" defer></script>


      </body>
    </html>
  );
}
