import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LikedList from './components/LikedList';
import { AIIcon } from './components/Icons';
import { ILikedItemsResponse } from './components/Chat.types';
import './App.css';

type TSetLikedItems = (likedItems: ILikedItemsResponse) => void;

const queryClient = new QueryClient();
export const LikesContext = createContext<TSetLikedItems | null>(null);
function App() {
  const [likedItems, setLikedItems] = useState<ILikedItemsResponse | null>(
    null,
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LikesContext.Provider value={setLikedItems}>
        <div className="bg-gray-900 flex h-screen w-screen items-center justify-center">
          <div className="bg-gray-800 flex w-1060 h-660 border border-gray-600 rounded-lg shadow-md shadow-gray-950 relative">
            <div className="absolute flex items-center -top-10">
              <AIIcon class="mr-2" />
              <h1 className="rajdhani-medium text-lg">Language AI Assistant</h1>
            </div>
            <a
              href="https://github.com/ollama/ollama/"
              target="_blank"
              className="ribbon_link"
            >
              <div
                className="ribbon_container"
                onClick={() =>
                  window.open('https://github.com/ollama/ollama/', '_blank')
                }
              >
                <div className="ribbon_line1">powered by</div>
                <div className="ribbon_line2">Ollama</div>
              </div>
            </a>
            <aside
              className={`py-3 ${likedItems && likedItems.data.length > 0 ? 'transition-all duration-200 w-1/5 border-r border-gray-600 h-660' : 'transition-all duration-200 w-0'}`}
            >
              <LikedList list={likedItems} />
            </aside>
            <div className="w-4/5">
              <main>
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </LikesContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
