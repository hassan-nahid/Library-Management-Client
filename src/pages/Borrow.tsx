import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import {
  useGetSingleBookQuery,
} from "../redux/api/bookApi";
import { useBorrowBookMutation } from "../redux/api/borrowApi";

const Borrow = () => {
  const { bookId} = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: bookData, isLoading } = useGetSingleBookQuery(bookId || "");
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantity || !dueDate) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      await borrowBook({
        book: bookId,
        quantity,
        dueDate,
      }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err: any) {
      const msg = err?.data?.message || "Failed to borrow book!";
      toast.error(msg);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading book details...</div>;
  }

  const book = bookData?.data;
  if (!book) {
    return <div className="text-center py-10">Book not found!</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-3xl shadow-md border mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Borrow Book</h2>

      <div className="space-y-3 mb-6">
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Available Copies:</strong> {book.copies}</p>
        <p><strong>Status:</strong> {book.available ? "Available" : "Unavailable"}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="label"><span className="label-text">Quantity</span></label>
          <input
            type="number"
            min={1}
            max={book.copies}
            className="input input-bordered w-full"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="label"><span className="label-text">Due Date</span></label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={book.copies === 0 || !book.available || isBorrowing}
          >
            {isBorrowing ? "Borrowing..." : "Borrow Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Borrow;
