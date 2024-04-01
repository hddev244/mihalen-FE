import React, { useState, useEffect } from 'react';

type Props = {
    message?: string;
    type?: "error" | "success" | "warning";
    className?: string;
}

const Message: React.FC<Props> = ({ message, type = "success", className }) => {
    const [showMessage, setShowMessage] = useState(false);

    // Sử dụng useEffect để hiển thị thông báo và sau đó ẩn nó
    useEffect(() => {
        // Hiển thị thông báo sau 100ms
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 100);

        // Ẩn thông báo sau 1s nếu đã hiển thị
        const hideTimer = setTimeout(() => {
            setShowMessage(false);
        }, 2000); // Ẩn sau 1s

        // Clear timeout khi component unmount hoặc khi showMessage thay đổi
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <>
            {showMessage && (
                <div className={`z-50 shadow-lg bg-white min-w-64 p-4 border-2 border-blue-600 rounded-lg absolute  right-0 transition transform translate-x-0 ease-in-out ${className}`}>
                    <span className="font-semibold text-blue-600">{type}</span> : <span>{message}</span>
                </div>
            )}
        </>
    );
};

export default Message;
