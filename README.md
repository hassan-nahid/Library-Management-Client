# 📚 Library Management Client

A modern, user-friendly frontend for managing books in a library system. Built using **React**, **TypeScript**, **Redux Toolkit Query**, and **Tailwind CSS with DaisyUI**. This application interacts with a RESTful API backend to perform all core book operations.

---

## 🌐 Live Demo

🔗 [View Live Site](https://library-management-client-peach.vercel.app)

> ✅ Optimized for Desktop and Mobile  

---

## ⚙️ Tech Stack

- ⚛️ **React** with **TypeScript**
- ⚙️ **Redux Toolkit Query (RTK Query)** for data fetching
- 💅 **Tailwind CSS** with **DaisyUI** for UI components
- 🔗 **React Router DOM** for routing
- 🔔 **React Hot Toast** & **SweetAlert2** for notifications and alerts
- 📦 **Vercel** for deployment

---

## 🧩 Features

- 📖 List all books with pagination support
- ➕ Add new books with form validation
- 📝 Edit existing books (including genre, availability, and copies)
- 🗑️ Delete books with confirmation modal
- 🔍 View full book details
- ✅ Auto-status update (e.g., if copies = 0 ➝ status becomes "Unavailable")
- 🎨 Beautiful and responsive UI using DaisyUI

---
## 📌 Use Cases

### 1. 🔍 View All Books
- Go to the main book listing page.
- Browse all books with pagination.
- Each book displays its title, author, genre, availability status, and number of copies.

### 2. ➕ Add a New Book
- Click the “Add Book” button in the navbar or home page.
- Fill out the form with title, author, genre, ISBN, description, and copies.
- Click “Submit” to add the book.
- A toast notification will confirm successful addition.

### 3. 📝 Edit an Existing Book
- Click the “Edit” button on any book card.
- Update book information as needed.
- Submit the form to save changes.
- Success message appears and list updates automatically.

### 4. 🗑️ Delete a Book
- Click the “Delete” button on any book.
- A confirmation modal will appear (via SweetAlert2).
- Confirm deletion to permanently remove the book.
- Success alert will show after deletion.

### 5. 📘 View Book Details
- Click on the book’s title or “View Details” button.
- See all info including full description, ISBN, author, genre, copies, and status.

### 6. ✅ Availability Status Logic
- The app automatically updates a book’s status:
  - If `copies > 0` → status: **Available**
  - If `copies === 0` → status: **Unavailable**

### 7. 📱 Mobile-Responsive Usage
- Access the app from any device.
- UI and features are fully optimized for both mobile and desktop views.

---

## 📁 Folder Structure
```
src/
├── components/
│     └── Navbar.tsx
│     └── Footer.tsx
├── pages/
│   ├── Books.tsx
│   ├── AddBook.tsx
│   ├── EditBook.tsx
│   └── BookDetails.tsx
├── redux/
│   └── store.ts
│   └── api/
│       └── ApiSlice.ts
|       └── bookApi.ts
|       └── borrowApi.ts
├── types/
│   └── bookType.ts
├── routes/
│   └── routes.tsx
├── Layouts/
│   └── MainLayouts.tsx
├── App.tsx
└── main.tsx
```

---

## 🔧 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hassan-nahid/Library-Management-Client.git
cd Library-Management-Client
```
### 2️⃣ Install Dependencies
```
npm install
```
### 2️⃣ Start Application
```
npm run dev
```
### 3️⃣ 🔗 API Integration
All API requests are handled using Redux Toolkit Query. The base URL for your backend should be set in apiSlice.ts:
```
<!-- src/redux/api/ApiSlice.ts -->
const baseUrl = "https://your-api-url";
```

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later) or yarn
