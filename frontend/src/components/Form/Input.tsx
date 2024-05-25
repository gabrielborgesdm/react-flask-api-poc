import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    errorMessage?: string
}

const Input: React.FC<InputProps> = ({ label, name, register, errorMessage, ...otherOptions }) => {

    return (
        <div className="sm:col-span-3">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    {...otherOptions}
                    {...register(name)}
                    id={name}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500 text-xs italic">{errorMessage}</p>
            </div>
        </div>
    )
}

export default Input