/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">My eCommerce</h1>
        </Link>
        <div className="flex space-x-4 items-center justify-center">
          <Link
            href="/cart"
            className="text-lg flex items-center gap-2 hover:text-gray-200"
          >
            <span>Cart</span>
            <img src="/icons/shopping-cart-10964.png" alt="cart" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
