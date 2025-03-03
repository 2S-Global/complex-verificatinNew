import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
      <div><Header />
        <Sidebar />
        {children}
      <Footer />
      </div>
  );
}
