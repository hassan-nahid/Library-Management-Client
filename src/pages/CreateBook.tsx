import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAddBookMutation } from "../redux/api/bookApi";
import type { BookFormData } from "../types/bookType";


const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const CreateBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useAddBookMutation();

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = { ...formData };

      // ✅ যদি unchecked থাকে, available পাঠাবে না
      if (!formData.available) {
        delete payload.available;
      }

      await createBook(payload).unwrap();
      toast.success("Book added successfully!");
      navigate("/books");
    } catch (err: any) {
      const errs = err?.data?.error?.errors;
      const msg = errs
        ? Object.values(errs).map((e) => e.message).join(", ")
        : err?.data?.message || "Failed to add book!";
      toast.error(msg);
    }
  };


  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">➕ Add New Book</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-base-100 p-6 rounded-3xl shadow-md border"
      >
        {/* Title */}
        <div>
          <label className="label"><span className="label-text">Title *</span></label>
          <input type="text" name="title" required className="input input-bordered w-full"
            value={formData.title} onChange={handleChange} />
        </div>

        {/* Author */}
        <div>
          <label className="label"><span className="label-text">Author *</span></label>
          <input type="text" name="author" required className="input input-bordered w-full"
            value={formData.author} onChange={handleChange} />
        </div>

        {/* Genre */}
        <div>
          <label className="label"><span className="label-text">Genre *</span></label>
          <select name="genre" required className="select select-bordered w-full"
            value={formData.genre} onChange={handleChange}>
            <option value="" disabled>Select Genre</option>
            {genreOptions.map((g) => (
              <option key={g} value={g}>{g.replace("_", " ")}</option>
            ))}
          </select>
        </div>

        {/* ISBN */}
        <div>
          <label className="label"><span className="label-text">ISBN *</span></label>
          <input type="text" name="isbn" required className="input input-bordered w-full"
            value={formData.isbn} onChange={handleChange} />
        </div>

        {/* Description */}
        <div>
          <label className="label"><span className="label-text">Description</span></label>
          <textarea name="description" className="textarea textarea-bordered w-full"
            value={formData.description} onChange={handleChange} />
        </div>

        {/* Copies */}
        <div>
          <label className="label"><span className="label-text">Copies *</span></label>
          <input type="number" name="copies" min={1} required className="input input-bordered w-full"
            value={formData.copies} onChange={handleChange} />
        </div>

        {/* Availability Checkbox (Fixed as Always True) */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Available</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={formData.available}
              onChange={(e) =>
                setFormData({ ...formData, available: e.target.checked })
              }
            />
          </label>
        </div>




        <div className="text-center mt-12">
          <button className="btn btn-primary px-10" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
