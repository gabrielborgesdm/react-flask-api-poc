import React, { useEffect, useState } from 'react';
import { Book } from 'types/book';
import ManagementService from 'services/managementService';
import { useFilterHook } from 'components/Hooks/UseFilterHook';

const managementService = new ManagementService()


const Books: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([])
    const { handleChangeFilter, shouldFilterInWith } = useFilterHook();

    useEffect(() => {
        loadBooks()
    }, [])

    const loadBooks = async () => {
        const books = await managementService.getBooks()
        books.forEach(book => {
            book.authorsNames = book.authors.map(author => author.name).join(";  ")
        })

        setBooks(books)
    }


    return (
        <>
            <div className="flex items-center py-2 justify-between">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search" onChange={handleChangeFilter} className="block py-3 ps-10 text-sm border rounded-lg w-80 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search for items" />
                </div>
                <button className="max-sm:w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    + Add book
                </button>
            </div>
            <hr />
            <div className='block max-h-[78dvh] overflow-y-auto'>
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
                    <tbody>
                        {books?.length > 0 && books.map(({ id, title, pages, authorsNames }: Book) => (
                            shouldFilterInWith(title, pages, id, authorsNames) && (
                                <tr key={id} className="border-b hover:bg-gray-50">
                                    <th scope="row" className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {title}
                                    </th>
                                    <td className="px-1 py-4">
                                        {Number.isInteger(pages) ? `${pages} pages` : "Not informed"}
                                    </td>
                                    <td className="px-1 py-4">
                                        {
                                            <span className='block max-w-52 truncate'>{authorsNames}</span>
                                        }
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table >
            </div>
        </>
    );
};

export default Books;