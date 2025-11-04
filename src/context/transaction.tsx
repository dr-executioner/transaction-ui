import { createContext, useState, useContext, type SetStateAction } from "react";

type TransactionIdType = {
    id: string;
    setId: React.Dispatch<SetStateAction<string>>;
};

const TransactionIdContext = createContext<TransactionIdType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const [id, setId] = useState("");

    return (
        <TransactionIdContext.Provider value={{ id, setId }}>
            {children}
        </TransactionIdContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTransactionContext = () => {
    const ctx = useContext(TransactionIdContext);

    if (!ctx) {
        throw new Error("useTransactionContext must be used inside a TransactionProvider");
    }

    return ctx;
};
