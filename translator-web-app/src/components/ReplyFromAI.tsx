import React, { useState } from 'react';
import { LanguageIcon, RegenIcon, CopyIcon, LikeIcon, TickIcon } from './Icons';
import { IChatItem } from '../components/Chat.types';

interface Props {
  handleRegen: () => void;
  addToLikedResponses: () => void;
  chatInfo: IChatItem;
}

const ReplyFromAI: React.FC<Props> = ({
  chatInfo,
  handleRegen,
  addToLikedResponses,
}: Props): JSX.Element => {
  const [copyStatus, setCopyStatus] = useState(false);
  /**
   * Copies the content of the chatInfo to the clipboard and updates the copyStatus state.
   *
   * @return {void}
   */
  const copyResponse = (): void => {
    navigator.clipboard
      .writeText(chatInfo.content)
      .then(() => {
        setCopyStatus(true);
        setTimeout(() => {
          setCopyStatus(false);
        }, 2000);
      })
      .catch(() => {
        setCopyStatus(false);
      });
  };
  return (
    <div className="flex mb-4">
      <LanguageIcon class="mt-2 mr-2" />
      <div className="w-full">
        <div className="bg-gray-700 p-4 rounded-lg leading-4 whitespace-pre-wrap text-sm text-gray-300">
          {chatInfo.content}
        </div>
        <div className="mt-2">
          <button
            className="mr-2"
            onClick={handleRegen}
            title="Regenerate response"
          >
            <RegenIcon color="#d1d5db" />
          </button>
          <button className="mr-2" onClick={copyResponse} title="Copy">
            {copyStatus ? (
              <TickIcon color="#d1d5db" />
            ) : (
              <CopyIcon color="#d1d5db" />
            )}
          </button>
          <button
            className="mr-2"
            onClick={addToLikedResponses}
            title="Bookmark"
          >
            <LikeIcon color="#d1d5db" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyFromAI;
