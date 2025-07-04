import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-6 mt-10 border-t">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-xl font-semibold mb-1">BookNest 📚</h2>
        <p className="text-sm mb-1">
         Empowering readers and managing books effortlessly — A Minimal Library Management System.
        </p>
        <p className="text-xs text-gray-500">Copyright © All right reserved - 2025
By Hassan Nahid</p>
   
        <div className="mt-2 flex justify-center gap-4 text-sm">
         
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/books" className="link link-hover">
            All Books
          </Link>
          <Link to="/create-book" className="link link-hover">
            Add Book
          </Link>
          <Link to="/borrow-summary" className="link link-hover">
            Summary
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
