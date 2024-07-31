import {
  useEffect,
  useRef,
  useReducer,
  useLayoutEffect,
  useState,
} from 'react';
import ChatInput from '../components/ChatInput';
import SelectLanguages from '../components/SelectLanguages';
import useHttpReqClient from '../hooks/useHttpReqClient';
import { AxiosError } from 'axios';
import ApiError from '../components/ApiError';
import ChatSkeleton from '../components/ChatSkeleton';
import ChatHistory from '../components/ChatHistory';
import { IChatItem } from '../components/Chat.types';

interface IState {
  languagesChosen: Record<string, string>;
  userText: string;
  historyData: IChatItem[];
  apiError: Error | AxiosError | null;
  loading: boolean;
}
interface IAction {
  type: string;
  payload:
    | Record<string, string>
    | string
    | Error
    | AxiosError
    | IChatItem[]
    | boolean
    | null;
}
const initialState = {
  languagesChosen: { from: '', to: '' },
  userText: '',
  historyData: [],
  apiError: null,
  loading: false,
};

function ChatBox() {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Reduces the state based on the given action.
   *
   * @param {IState} state - The current state.
   * @param {IAction} action - The action to be performed.
   * @return {IState} The new state after the action is applied.
   */
  const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          loading: action.payload as boolean,
        };
      case 'ERROR':
        return {
          ...state,
          loading: false,
          apiError:
            action.payload instanceof AxiosError
              ? (action.payload as AxiosError)
              : (action.payload as Error),
        };
      case 'HISTORY':
        return {
          ...state,
          loading: false,
          apiError: null,
          userText: '',
          historyData: action.payload as IChatItem[],
        };
      case 'USER_TEXT':
        return {
          ...state,
          userText: action.payload as string,
        };
      case 'LANGUAGES_CHOSEN':
        return {
          ...state,
          languagesChosen: action.payload as Record<string, string>,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const httpReqClient = useHttpReqClient();

  const [regenItem, setRegenItem] = useState<IChatItem | null>(null);

  const { error, data, isLoading, refetch } = httpReqClient({
    path: 'main/translate',
    method: 'POST',
    body: {
      type: 'translate',
      content: state.userText,
      fromLanguage: state.languagesChosen.from,
      toLanguage: state.languagesChosen.to,
    },
    queryKey: ['translate'],
  });

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: 'LOADING', payload: true });
    }
    if (data) {
      const questionID = regenItem
        ? regenItem.questionId
        : state.historyData[state.historyData.length - 1].id;
      const newHistory = [
        ...state.historyData,
        {
          id: window.crypto.randomUUID(),
          questionId: questionID,
          role: 'assistant',
          content: data.reply,
          fromLang: state.languagesChosen.from,
          toLang: state.languagesChosen.to,
        },
      ];
      dispatch({ type: 'HISTORY', payload: newHistory });
      setRegenItem(null);
    }
    if (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  }, [error, data, isLoading]);

  useEffect(() => {
    if (state.userText !== '') {
      dispatch({ type: 'LOADING', payload: true });
      refetch();
    }
  }, [state.userText]);

  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scroll({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [state.loading]);

  /**
   * Updates the state and refetches the data for a given chat item.
   *
   * @param {IChatItem} chatItem - The chat item to be refetched.
   * @return {void} This function does not return anything.
   */
  const handleRefetch = (chatItem: IChatItem) => {
    setRegenItem(chatItem);
    const userQuestion = state.historyData.find(
      (item) => item.id === chatItem.questionId,
    );
    if (userQuestion) {
      dispatch({ type: 'USER_TEXT', payload: userQuestion.content });
      dispatch({
        type: 'LANGUAGES_CHOSEN',
        payload: { from: chatItem.fromLang, to: chatItem.toLang },
      });
      dispatch({ type: 'LOADING', payload: true });
      setTimeout(() => {
        refetch();
      }, 100);
    }
  };

  /**
   * Submits the user's input text and updates the chat history.
   *
   * @param {string} val - The user's input text.
   * @return {void} This function does not return anything.
   */
  const submitUserText = (val: string) => {
    if (!val) return;
    const newHistory = [
      ...state.historyData,
      {
        id: window.crypto.randomUUID(),
        role: 'user',
        content: val,
        fromLang: state.languagesChosen.from,
        toLang: state.languagesChosen.to,
      },
    ];
    dispatch({ type: 'HISTORY', payload: newHistory });
    dispatch({ type: 'USER_TEXT', payload: val });
  };

  /**
   * Updates the selected languages in the application state.
   *
   * @param {Record<string, string>} langSelected - An object containing the selected languages,
   *                                              where the keys are the language codes and the values
   *                                              are the language names.
   * @return {void} This function does not return anything.
   */
  const handleLangSelection = (langSelected: Record<string, string>) => {
    dispatch({ type: 'LANGUAGES_CHOSEN', payload: langSelected });
  };

  return (
    <div className="w-full flex flex-col h-660">
      <div className="m-3 grow overflow-scroll" ref={chatContainerRef}>
        <ChatHistory
          languagesChosen={state.languagesChosen}
          history={state.historyData || []}
          regen={(chatItem) => handleRefetch(chatItem)}
        />
        {state.loading && <ChatSkeleton />}
        {state.apiError && (
          <ApiError
            actualWidth={
              chatContainerRef.current?.offsetWidth.toString() || '80%'
            }
            error={
              state.apiError instanceof AxiosError &&
              state.apiError.code === 'ERR_NETWORK'
                ? 'The API service went down. Please check.'
                : state.apiError.message
            }
          />
        )}
      </div>
      <div className="w-11/12 grow-0">
        <SelectLanguages
          onError={(e) => dispatch({ type: 'ERROR', payload: e })}
          onLangSelect={handleLangSelection}
          languages={state.languagesChosen}
        />
        <ChatInput submit={(val: string) => submitUserText(val)} />
      </div>
    </div>
  );
}

export default ChatBox;
