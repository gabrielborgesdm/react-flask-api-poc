
interface FormControlButtonsProps {
    reset: () => void;
    isLoading: boolean;
}
const FormControlButtons: React.FC<FormControlButtonsProps> = ({ isLoading, reset }) => {

    return (
        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
                type="button"
                disabled={isLoading}
                className={`text-sm font-semibold leading-6 ${isLoading ? "text-gray-200" : "text-gray-900"}`}
                onClick={reset}
            >
                Reset
            </button>
            <button
                type="submit"
                disabled={isLoading}
                className={`bg-indigo-600 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm` +
                    (
                        isLoading ? " bg-gray-200" : " hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    )
                }
            >
                {isLoading ? "Loading" : "Save"}
            </button>
        </div >
    )
}


export default FormControlButtons