import { Book } from "types/book"
import axios from "services/requestClientService"

export default class ManagementService {
    getBooks = async (): Promise<Book[]> => {
        let books = []
        try {
            const url = `${process.env.REACT_APP_API_URL}/books/`
            console.log(url)
            const response = await axios.get(url)
            if (response.data?.length) {
                books = response.data
            }
        } catch (error) {
            console.log(error)

        }

        return books
    }
}
