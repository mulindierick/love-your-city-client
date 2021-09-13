import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
    const [isValidForm, setIsValidForm] = useState(true)

    const displayFormNotValid = () => {
        setIsValidForm(false)
        setTimeout(() => setIsValidForm(true), 5000)
    }

    return <AppContext.Provider value={{ isValidForm, displayFormNotValid }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}