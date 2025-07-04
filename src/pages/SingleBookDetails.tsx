import { useParams, Link } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/api/bookApi";

const SingleBookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetSingleBookQuery(id || "");

  const book = data?.data;

  if (isLoading) return <div className="text-center py-10">Loading book...</div>;
  if (error || !book) return <div className="text-center text-red-500 py-10">Failed to load book.</div>;

  return (
    <div className="px-4 md:px-10 py-8 max-w-3xl mx-auto min-h-screen">
      <div className="bg-base-100  p-8 rounded-3xl shadow-md border space-y-6">
        <h2 className="text-3xl font-bold text-center">{book.title}</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-base">Author:</h4>
            <p>{book.author}</p>
          </div>
          <div>
            <h4 className="font-semibold text-base">Genre:</h4>
            <p>{book.genre}</p>
          </div>
          <div>
            <h4 className="font-semibold text-base">ISBN:</h4>
            <p>{book.isbn}</p>
          </div>
          <div>
            <h4 className="font-semibold text-base">Copies:</h4>
            <p>{book.copies}</p>
          </div>
          <div>
            <h4 className="font-semibold text-base">Status:</h4>
            <span
              className={`badge ${book.available ? "badge-success" : "badge-error"}`}
            >
              {book.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-base">Description:</h4>
          <p className="text-gray-600">{book.description || "No description provided."}</p>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Link to={`/edit-book/${book._id}`} className="btn btn-warning btn-sm">
            Edit
          </Link>
          <Link to={`/borrow/${book._id}`} className="btn btn-primary btn-sm">
            Borrow
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBookDetails;
