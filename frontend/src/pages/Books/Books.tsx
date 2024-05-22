import React, { useEffect, useState } from 'react';
import './Books.css';
import { Book } from 'types/book';
import ManagementService from 'services/managementService';
import { BookTableRow } from './BookTableRow';

const managementService = new ManagementService()


const Books: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        loadBooks()
    }, [])

    const loadBooks = async () => {
        const books = await managementService.getBooks()
        setBooks(books)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <div className="relative">
                    Add author
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs uppercase ">
                    <tr>

                        <th scope="col" className="px-1 py-3">
                            Book title
                        </th>
                        <th scope="col" className="px-1 py-3">
                            Pages
                        </th>
                        <th scope="col" className="px-1 py-3">
                            Authors
                        </th>
                    </tr>
                </thead>
                <tbody>{books?.length > 0 && books.map(book => <BookTableRow key={book.id} book={book} />)}</tbody>
            </table>
        </div>
    );
};

export default Books;