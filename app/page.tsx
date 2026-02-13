"use client"

import { useState } from "react"

type Book = {
  id: number
  title: string
  author: string
}

export default function Page() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "The Great Gatsby", author: "S. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  ])

  const [search, setSearch] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")

  const addBook = () => {
    if (!title || !author) return

    setBooks([
      ...books,
      { id: Date.now(), title, author },
    ])

    setTitle("")
    setAuthor("")
  }

  const removeBook = (id: number) => {
    setBooks(books.filter(book => book.id !== id))
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-black-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Library Management System
        </h1>

        {/* Search + Add Card */}
        <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={addBook}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Add Book
            </button>
          </div>
        </div>

        {/* Book List */}
        <div className="space-y-6">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className="bg-white rounded-xl border shadow-sm p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold text-black">
                  {book.title}
                </h2>
                <p className="text-black font-bold mt-1">
                  by {book.author}
                </p>
              </div>

              <button
                onClick={() => removeBook(book.id)}
                className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
