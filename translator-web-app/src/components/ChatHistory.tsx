import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useHttpReqClient from '../hooks/useHttpReqClient';
import ReplyFromAI from './ReplyFromAI';
import UserAskedContent from './UserAskedContent';
import {
  TChatHistory,
  IChatItem,
  ILikedItem,
  ILikedItemsResponse,
} from '../components/Chat.types';

interface IProps extends TChatHistory {
  languagesChosen: Record<string, string>;
  regen: (chatItem: IChatItem) => void;
}
interface ILanguages {
  name: string;
  data: Record<string, string>[];
}

/**
 * Renders a chat history component that displays a list of chat items.
 *
 * @param {IProps} props - The props object containing the chat history, and a function to regenerate a chat item.
 * @param {IChatItem[]} props.history - The array of chat items.
 * @param {(chatItem: IChatItem) => void} props.regen - The function to regenerate a chat item.
 * @return {JSX.Element} The chat history component.
 */
const ChatHistory: React.FC<IProps> = ({
  history,
  regen,
}: IProps): JSX.Element => {
  const [likedItem, setLikedItem] = useState<ILikedItem | null>(null);

  const queryClient = useQueryClient();
  const httpReqClient = useHttpReqClient();

  const { refetch } = httpReqClient({
    path: 'main/likes/add',
    method: 'POST',
    body: {
      ...likedItem,
    },
    queryKey: ['likes'],
  });

  useEffect(() => {
    if (likedItem) {
      refetch();
    }
  }, [likedItem]);

  /**
   * Handles the event when a chat item is liked by the user.
   *
   * @param {IChatItem} likedItem - The chat item that was liked by the user.
   * @return {void} This function does not return anything.
   */
  const handleLikedResponse = (likedItem: IChatItem) => {
    const likedList: ILikedItemsResponse | undefined = queryClient.getQueryData(
      ['likes'],
    );
    const isLikedItemExist = likedList?.data.find(
      (item: ILikedItem) => item.id === likedItem.id,
    );
    if (likedList?.data.length && isLikedItemExist) return;

    const languages: ILanguages | undefined = queryClient.getQueryData([
      'languages',
    ]);

    const question = history.find(
      (item: IChatItem) => item.id === likedItem.questionId,
    );
    if (question) {
      const likedResponse = {
        id: likedItem.id,
        fromLang:
          languages?.data.find(
            (item: Record<string, string>) => item.value === likedItem.fromLang,
          )?.name || '',
        toLang:
          languages?.data.find(
            (item: Record<string, string>) => item.value === likedItem.toLang,
          )?.name || '',
        question: question.content,
        answer: likedItem.content,
      };
      setLikedItem(likedResponse);
    }
  };
  return (
    <div className="ml-6 mr-20">
      {history.map((item: IChatItem) => {
        if (item.role === 'user') {
          return <UserAskedContent key={item.id} chatInfo={item} />;
        }
        return (
          <ReplyFromAI
            key={item.id}
            chatInfo={item}
            handleRegen={() => regen(item)}
            addToLikedResponses={() => handleLikedResponse(item)}
          />
        );
      })}
    </div>
  );
};

export default ChatHistory;
