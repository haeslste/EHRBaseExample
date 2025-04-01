import { FC, ReactNode } from 'react';
import { Modal } from './Modal';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onClose,
}) => (
  <Modal open={open} title={title} onClose={onClose}>
    <div className="mb-4 text-gray-700">{message}</div>
    <div className="flex justify-end space-x-2">
      <button
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={onClose}
      >
        {cancelText}
      </button>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => {
          onConfirm();
          onClose();
        }}
      >
        {confirmText}
      </button>
    </div>
  </Modal>
);
