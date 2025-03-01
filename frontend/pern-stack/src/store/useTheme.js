import {create} from "zustand";

export const useTheme = create((set) => 
(
    {
        theme:localStorage.getItem('preferd-theme') || 'light',
        setTheme: (theme) => {
            localStorage.setItem('preferd-theme',theme)
            set({theme})
        },
    }
)
)
