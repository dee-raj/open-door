import React, { createContext, useContext, useState } from 'react';
import { guestsData as initialGuestsData } from '@/assets/data/appDatas';

// Define types for the context
interface GuestContextType {
    guestsData: typeof initialGuestsData;
    setGuestsData: React.Dispatch<React.SetStateAction<typeof initialGuestsData>>;
    clearGuestsData: () => void;
}

// Create the context
const GuestContext = createContext<GuestContextType | undefined>(undefined);

// Provider Component
export const GuestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [guestsData, setGuestsData] = useState(initialGuestsData);

    // Clear all guest data
    const clearGuestsData = () => {
        setGuestsData(initialGuestsData.map((guest) => ({ ...guest, count: 0 })));
    };

    return (
        <GuestContext.Provider value={{ guestsData, setGuestsData, clearGuestsData }}>
            {children}
        </GuestContext.Provider>
    );
};

// Hook for consuming the context
export const useGuestContext = () => {
    const context = useContext(GuestContext);
    if (!context) {
        throw new Error('useGuestContext must be used within a GuestProvider');
    }
    return context;
};
