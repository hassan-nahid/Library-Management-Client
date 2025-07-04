import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Books from "../pages/Books";
import SingleBookDetails from "../pages/SingleBookDetails";
import CreateBook from "../pages/CreateBook";
import EditBook from "../pages/EditBook";
import Borrow from "../pages/Borrow";
import BorrowSummary from "../pages/BorrowSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
        {
            path:"/",
            element:<Home/>,
        },
        {
            path:"/books",
            element:<Books/>,
        },
        {
            path:"/books/:id",
            element:<SingleBookDetails/>,
        },
        {
            path:"/create-book",
            element:<CreateBook/>,
        },
        {
            path:"/edit-book/:id",
            element:<EditBook/>,
        },
        {
            path:"/borrow/:bookId",
            element:<Borrow/>,
        },
        {
            path:"/borrow-summary",
            element:<BorrowSummary/>,
        },
    ]
  },
]);