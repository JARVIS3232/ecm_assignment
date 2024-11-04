const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-center text-white mt-8">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} My eCommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
