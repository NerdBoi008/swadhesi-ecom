import React from 'react'

interface NotifictionHeaderProps { 
    children?: React.ReactNode | null;
    variant?: 'info' | 'warning' | 'error';
}

const NotifictionHeader = ({ children, variant = 'info' }: NotifictionHeaderProps) => {

    const style = (() => {
        switch (variant) {
            case 'info':
                return 'bg-[#F2CC8F] text-black';
            case 'warning':
                return 'bg-orange-300 text-orange-800';
            case 'error':
                return 'bg-red-300 text-red-800';
            default:
                return 'bg-[#F2CC8F] text-black';
        }
    })();

    if (!children) return null;

    return (
        <div className={`${style} text-xs p-2 flex items-center justify-center`}>    
            {children}
        </div>
    )
}

export default NotifictionHeader