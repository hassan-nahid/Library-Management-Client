import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGetSingleBookQuery, useUpdateBookMutation } from "../redux/api/bookApi";
import type { BookFormData } from "../types/bookType";

const genreOptions = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
];


const EditBook = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: bookData, isLoading } = useGetSingleBookQuery(id || "");
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();


    const [formData, setFormData] = useState<BookFormData>({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 1,
    });

    useEffect(() => {
        if (bookData?.data) {
            const book = bookData.data;
            setFormData({
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                description: book.description || "",
                copies: book.copies,
            });
        }
    }, [bookData]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target;
        const updatedValue =
            type === "checkbox"
                ? checked
                : name === "available"
                    ? value === "true"
                    : value;

        setFormData({
            ...formData,
            [name]: updatedValue,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateBook({ id, data: formData }).unwrap();
            toast.success("Book updated successfully!");
            navigate("/books");
        } catch (err: any) {
            const errs = err?.data?.error?.errors;
            const msg =
                errs
                    ? Object.values(errs).map((e) => e.message).join(", ")
                    : err?.data?.message || "Failed to update book!";
            toast.error(msg);
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading book...</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">✏️ Edit Book</h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-base-100 p-6 rounded-3xl shadow-md border"
            >
                {/* Title */}
                <div>
                    <label className="label"><span className="label-text">Title *</span></label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="input input-bordered w-full"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="label"><span className="label-text">Author *</span></label>
                    <input
                        type="text"
                        name="author"
                        required
                        className="input input-bordered w-full"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="label"><span className="label-text">Genre *</span></label>
                    <select
                        name="genre"
                        required
                        className="select select-bordered w-full"
                        value={formData.genre}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Genre</option>
                        {genreOptions.map((g) => (
                            <option key={g} value={g}>{g.replace("_", " ")}</option>
                        ))}
                    </select>
                </div>

                {/* ISBN */}
                <div>
                    <label className="label"><span className="label-text">ISBN *</span></label>
                    <input
                        type="text"
                        name="isbn"
                        required
                        className="input input-bordered w-full"
                        value={formData.isbn}
                        onChange={handleChange}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Copies */}
                <div>
                    <label className="label"><span className="label-text">Copies *</span></label>
                    <input
                        type="number"
                        name="copies"
                        min={0}
                        required
                        className="input input-bordered w-full"
                        value={formData.copies}
                        onChange={handleChange}
                    />
                </div>


                <div className="text-center mt-6">
                    <button className="btn btn-primary px-10" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update Book"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBook;
