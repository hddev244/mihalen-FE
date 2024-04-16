import { MessageType } from '@/lib/object';
import React, { useState, useEffect } from 'react';

type Props = {
    message?: string;
    type?: MessageType;
    className?: string;
}

const Message: React.FC<Props> = ({ message, type = "success", className }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [showClose, setShowClose] = useState(false);

    // Sử dụng useEffect để hiển thị thông báo và sau đó ẩn nó
    useEffect(() => {
        // Hiển thị thông báo sau 100ms
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 100);

        // Ẩn thông báo sau 1s nếu đã hiển thị

        // Clear timeout khi component unmount hoặc khi showMessage thay đổi
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {showMessage && (
                <div className={`z-50 shadow-lg bg-white min-w-64 max-w-80 p-4 border-2 border-${type} rounded-lg fixed right-10 top-16  animate-wiggle ${className}`}>
                    <span className={`font-semibold text-${type}`}>{type}</span> : <span>{message}</span>
                </div>
            )}
        </>
    );
};

export default Message;
