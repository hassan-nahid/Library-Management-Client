import { useGetBorrowSummaryQuery } from "../redux/api/borrowApi";
import type { IBorrowSummaryItem } from "../types/bookType";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) {
    return <div className="text-center py-10">Loading borrow summary...</div>;
  }

  if (isError || !data?.data?.length) {
    return <div className="text-center py-10">No borrowed books found.</div>;
  }

  return (
    <div className="mx-4">
      <div className="max-w-4xl mx-auto p-6 rounded-3xl shadow-md border mt-10 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center">📄 Borrowed Books Summary</h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th className="hidden md:table-cell">ISBN</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item: IBorrowSummaryItem, index: number) => (
                <tr key={item.book.isbn}>
                  <td>{index + 1}</td>
                  <td>{item.book.title}</td>
                  <td className="hidden md:table-cell">{item.book.isbn}</td>
                  <td>{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;
