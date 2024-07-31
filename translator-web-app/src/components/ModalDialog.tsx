import { useEffect, useRef } from 'react';
import { CrossIcon } from './Icons';

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  children: JSX.Element;
}
const ModalDialog = ({ show, handleClose, children }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef.current && show) {
      const modal = modalRef.current.querySelector('.fade-out-anim');
      modalRef.current.classList.remove('hidden');
      modal?.classList.replace('fade-out-anim', 'fade-in-anim');
    }
  }, [show]);

  const hideModal = () => {
    if (modalRef.current) {
      const modal = modalRef.current.querySelector('.fade-in-anim');
      modal?.classList.replace('fade-in-anim', 'fade-out-anim');
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.classList.add('hidden');
          handleClose();
        }
      }, 800);
    }
  };

  return (
    <div
      ref={modalRef}
      className="hidden fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity"
    >
      <div className="flex min-h-full items-end justify-center text-center sm:items-center">
        <div className="fade-out-anim relative min-h-32 max-h-80 transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl sm:min-w-lg sm:max-w-2xl p-6">
          <CrossIcon
            class="absolute top-2 right-2 cursor-pointer"
            color="#d1d5db"
            onClick={hideModal}
          />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
