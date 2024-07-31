import React from 'react';
import { UserIcon } from './Icons';
import { IChatItem } from '../components/Chat.types';

interface IProps {
  chatInfo: IChatItem;
}

const UserAskedContent: React.FC<IProps> = ({
  chatInfo,
}: IProps): JSX.Element => (
  <div className="flex mb-4">
    <div className="w-full bg-gray-900 p-4 rounded-lg text-sm text-gray-300">
      {chatInfo.content}
    </div>
    <UserIcon class="mt-2 ml-2" />
  </div>
);

export default UserAskedContent;
