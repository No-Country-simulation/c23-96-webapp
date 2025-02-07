import React, { useEffect } from "react";

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl transition"
        >
          &times;
        </button>
        {title && (
          <h2 className="text-lg font-semibold text-center mb-4 text-gray-700">
            {title}
          </h2>
        )}
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
