import { Link } from "react-router-dom";
import { useDeleteBookMutation, useGetAllBooksQuery } from "../redux/api/bookApi";
import Swal from "sweetalert2";
import type { IErrorResponse, IBook } from "../types/bookType";

const Home = () => {
  const { data, isLoading } = useGetAllBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();

  const books = [...(data?.data || [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);



  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id).unwrap();

        Swal.fire({
          title: "Deleted!",
          text: "The book has been deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err: unknown) {
        const error = err as IErrorResponse;
        Swal.fire({
          title: "Error!",
          text: error?.data?.message || "Failed to delete the book.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }
  };


  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="flex items-center justify-center px-4 pt-10">
        <div className="max-w-3xl w-full rounded-3xl shadow-md border p-10 text-center">
          <h1 className="text-xl md:text-2xl lg:text-5xl font-bold mb-4">
            BookNest 📚
          </h1>
          <p className="text-lg mb-8">
            Welcome to <span className="font-semibold text-primary">BookNest</span> — a minimal, fast and elegant library management system.
            Manage your books and borrowing effortlessly.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link to="/books" className="btn btn-primary px-8 btn-lg">
              Browse Books
            </Link>
            <Link to="/create-book" className="btn btn-outline btn-lg">
              Add a Book
            </Link>
          </div>
        </div>
      </div>

      {/* Book Preview Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">📘 Latest Books</h2>

        {isLoading ? (
          <div className="text-center py-6">Loading books...</div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book: IBook) => (
              <div key={book._id} className="card rounded-3xl border bg-base-100 shadow-md p-5">
                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                <p className="text-sm text-gray-500">by {book.author}</p>
                <p className="text-xs mt-2">Genre: {book.genre}</p>
                <p className="text-xs">ISBN: {book.isbn}</p>
                <p className="text-xs">Copies: {book.copies}</p>
                <div className="mt-4 flex gap-2">
                  <Link
                    to={`/books/${book._id}`}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/borrow/${book._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Borrow
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        <div className="text-center mt-10">
          <Link to="/books" className="btn btn-wide btn-primary">
            Show More Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
