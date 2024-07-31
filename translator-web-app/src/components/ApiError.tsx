import { useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
  error: string;
  actualWidth: string;
};

const ApiError: React.FC<Props> = ({ ...props }: Props) => {
  const errorRef = useRef<HTMLDivElement>(null);

  setTimeout(() => {
    errorRef.current?.classList.replace('fade-in-anim', 'fade-out-anim');
  }, 5000);

  return (
    <div
      ref={errorRef}
      style={{ width: `${props.actualWidth}px` }}
      className="fade-in-anim flex justify-between bg-rose-500 rounded-lg p-3 absolute"
    >
      <p>{props.error}</p>
      <button
        onClick={() =>
          errorRef.current?.classList.replace('fade-in-anim', 'fade-out-anim')
        }
      >
        <XMarkIcon className="size-6 text-white" />
      </button>
    </div>
  );
};

export default ApiError;
