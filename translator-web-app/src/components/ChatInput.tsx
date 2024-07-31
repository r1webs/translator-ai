import { useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

type Props = {
  submit: (val: string) => void;
};

const ChatInput: React.FC<Props> = (props: Props): JSX.Element => {
  const [userInput, setUserInput] = useState<string>('');
  const submitText = () => {
    props.submit(userInput);
    setUserInput('');
  };
  return (
    <div className="mx-2">
      <form
        className="flex items-center p-3"
        name="translateForm"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="w-full h-10 p-3 mr-3 rounded-lg bg-gray-900 border border-gray-600 text-sm text-gray-300"
          type="text"
          placeholder="For e.g. Good morning!"
          id="translateInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className="flex justify-center items-center rounded-lg bg-gray-900 w-10 h-10 border border-gray-600 hover:border-blue-300 focus:border-blue-300 outline-0"
          onClick={submitText}
        >
          <ArrowUpIcon
            className={`size-4 ${userInput ? 'text-gray-300' : 'text-gray-600'}`}
          />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
