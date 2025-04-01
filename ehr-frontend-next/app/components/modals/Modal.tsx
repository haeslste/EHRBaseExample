import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded shadow-lg w-11/12 max-w-md mx-auto p-6">
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>
      </div>
    </div>,
    document.body
  );
};
