import { useContext, useEffect, useRef, useState } from 'react';
import useHttpReqClient from '../hooks/useHttpReqClient';
import { LikeIcon, CrossIcon, RightArrow } from './Icons';
import ModalDialog from './ModalDialog';
import { ILikedItem, ILikedItemsResponse } from './Chat.types';
import { LikesContext } from '../App';
// import { useQueryClient } from "@tanstack/react-query"

interface IProps {
  list: ILikedItemsResponse | null;
}

const LikedList: React.FC<IProps> = ({ list }: IProps) => {
  const [modalData, setModalData] = useState<ILikedItem | null>(null);
  const [deleteID, setDeleteID] = useState<string | null>(null);

  const listRef = useRef<HTMLUListElement>(null);

  const setLikesList = useContext(LikesContext);
  const httpReqClient = useHttpReqClient();
  const { data } = httpReqClient({
    path: 'main/likes/list',
    method: 'GET',
    queryKey: ['likes'],
    enableFetch: true,
  });

  const deleteReq = useHttpReqClient();

  const { data: postDeleteData, refetch } = deleteReq({
    path: `main/likes/${deleteID}`,
    method: 'DELETE',
    queryKey: ['likes'],
  });

  useEffect(() => {
    if (data && setLikesList) {
      setLikesList(data);
    }
    if (postDeleteData) {
      setDeleteID(null);
    }
    if (deleteID) {
      refetch();
    }
  }, [data, deleteID, postDeleteData]);

  const truncateString = (str: string) => {
    if (str?.length > 25) {
      return str.slice(0, 25) + '...';
    } else {
      return str;
    }
  };
  /**
   * Highlights a list item by changing its background color and icon opacity.
   *
   * @param {string} id - The ID of the list item to highlight.
   * @param {'OVER' | 'OUT'} event - The type of event that triggered the highlight.
   * @return {void} This function does not return anything.
   */
  const highLightListItem = (id: string, event: 'OVER' | 'OUT') => {
    if (listRef.current) {
      Array.from(listRef.current.children).forEach((item) => {
        if (item.id === id && event === 'OVER') {
          item.className = 'p-2 bg-gray-900 rounded-lg cursor-pointer relative';
          item.children[0].className = 'absolute top-2 right-2 opacity-60';
        } else if (item.id === id && event === 'OUT') {
          item.className = 'p-2  cursor-pointer relative';
          item.children[0].className = 'absolute top-2 right-2 opacity-60';
        }
      });
    }
  };

  const handleDeleteItem = (id: string, event: React.MouseEvent) => {
    setDeleteID(id);
    event.stopPropagation();
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex w-10 h-10 border border-gray-400 rounded-3xl justify-center items-center m-auto mt-6">
        <LikeIcon color="#9ca3af" />
      </div>
      <ul ref={listRef} className="p-3">
        {list &&
          list.data.map(
            (item: ILikedItem) =>
              item.id && (
                <li
                  id={item.id}
                  className="p-2 cursor-pointer relative"
                  key={item.id}
                  onMouseOver={() => highLightListItem(item.id, 'OVER')}
                  onMouseOut={() => highLightListItem(item.id, 'OUT')}
                  onClick={() => setModalData(item)}
                >
                  <CrossIcon
                    color="#9ca3af"
                    class="absolute top-2 right-2 opacity-0"
                    onClick={(event) => handleDeleteItem(item.id, event)}
                  />
                  <h4 className="text-xs text-gray-500">
                    {item.fromLang} to {item.toLang}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {truncateString(item.question)}
                  </p>
                </li>
              ),
          )}
      </ul>
      <ModalDialog show={!!modalData} handleClose={() => setModalData(null)}>
        <div>
          {modalData && (
            <div>
              <h2 className="flex items-center text-sm text-gray-400">
                {modalData.fromLang}
                <RightArrow class="mx-1" />
                {modalData.toLang}
              </h2>
              <div className="overflow-y-scroll max-h-48">
                <h3 className="text-3xl font-extralight text-gray-400">
                  {modalData.question}
                </h3>
                <p className="text-gray-300 ml-2 mt-2 pl-2 border-l-2 border-gray-400">
                  {modalData.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      </ModalDialog>
    </div>
  );
};

export default LikedList;
