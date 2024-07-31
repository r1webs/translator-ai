import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import ChatBox from './views/Chatbox.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: 'translator',
        element: <ChatBox />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
