// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <Link href="/" className="text-white hover:text-gray-300 mx-4">
          Home
        </Link>
        <Link href="/login" className="text-white hover:text-gray-300 mx-4">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
