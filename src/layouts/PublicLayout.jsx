import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* IMPORTANT: padding top fixes fixed navbar overlap */}
      <main className="flex-1 pt-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;