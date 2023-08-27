import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-start justify-center min-h-screen pt-28">
      <div className="relative bg-white w-auto mx-auto max-w-md m-2 rounded shadow-lg max-h-full overflow-y-auto">
        <button
          className="absolute top-0 right-0 p-0"
          onClick={onClose}
        >
          <AiOutlineClose size={24} className="text-red-500" />
        </button>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
