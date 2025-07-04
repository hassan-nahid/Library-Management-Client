import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteBookMutation, useGetAllBooksQuery } from "../redux/api/bookApi";
import type { IBook, IErrorResponse } from "../types/bookType";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 10;

const Books = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetAllBooksQuery({ page: currentPage, limit: ITEMS_PER_PAGE });
  const [deleteBook] = useDeleteBookMutation();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load books.</p>;

  const books: IBook[] = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);


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
        const message = error?.data?.message || "Failed to delete the book.";

        Swal.fire({
          title: "Error!",
          text: message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  return (
    <div className="px-4 md:px-10 py-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 All Books</h2>

      <div className="overflow-x-auto mb-6 rounded-3xl shadow-md border">
        <table className="table table-zebra table-sm md:table-md bg-base-100">
          <thead className="bg-base-200">
            <tr>
              <th>Title</th>
              <th className="hidden md:table-cell">Author</th>
              <th className="hidden md:table-cell">Genre</th>
              <th className="hidden md:table-cell">ISBN</th>
              <th className="hidden md:table-cell">Copies</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book: IBook) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td className="hidden md:table-cell">{book.author}</td>
                <td className="hidden md:table-cell">{book.genre}</td>
                <td className="hidden md:table-cell">{book.isbn}</td>
                <td className="hidden md:table-cell">{book.copies}</td>
                <td>
                  <span className={`badge ${book.available ? "badge-success" : "badge-error"}`}>
                    {book.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="flex flex-wrap justify-center gap-2">
                  <Link to={`/books/${book._id}`} className="btn btn-sm btn-info">View</Link>
                  <Link to={`/edit-book/${book._id}`} className="btn btn-sm btn-warning">Edit</Link>
                  <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-error">Delete</button>
                  <Link to={`/borrow/${book._id}`} className="btn btn-sm btn-primary">Borrow</Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Books;
