import { Author } from "types/author";
import { Book } from "types/book";

interface BookListItemProps {
    book: Book
}

export const BookTableRow = ({ book }: BookListItemProps) => {

    return (
        <tr className="border-b hover:bg-gray-50">
            <th scope="row" className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap">
                {book.title}
            </th>
            <td className="px-1 py-4">
                {Number.isInteger(book.pages) ? `${book.pages} pages` : "Not informed"}
            </td>
            <td className="px-1 py-4">
                {
                    book.authors.map((author) => (
                        <a key={author.id} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{author.name} </a>
                    ))
                }
            </td>
        </tr>
    )
}