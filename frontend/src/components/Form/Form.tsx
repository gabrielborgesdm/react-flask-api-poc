import React, { ReactNode } from "react";
import FormControlButtons from "./FormSubmitButtons";

export interface FormMessage {
    value: string;
    isError: boolean;
}
interface FormProps {
    title: string;
    description: string;
    isLoading: boolean;
    onSubmit: () => Promise<void>;
    onReset: () => void;
    message: FormMessage;
    children: ReactNode;
}

const Form: React.FC<FormProps> = ({ title, description, onSubmit, onReset, message, isLoading, children }) => {
    return (
        <form onSubmit={onSubmit}>
            {message.value &&
                <div
                    className={"border px-4 py-3 my-3 rounded relative " +
                        (message.isError ? "bg-red-100 border-red-400 text-red-700" : "bg-teal-100 border-teal-500 text-teal-900")
                    }
                    role="alert"
                >
                    <strong className="font-bold">{message.isError ? "Ops!" : "Yes!"} </strong>
                    <span className="block sm:inline">{message.value}</span>
                </div>
            }
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
                    <hr />
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {children}
                    </div>
                </div>
            </div>

            <FormControlButtons isLoading={isLoading} reset={onReset} />
        </form >
    )
}

export default Form