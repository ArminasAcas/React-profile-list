import React from 'react'
import ReactDOM from 'react-dom/client'
import ProfilePage from './pages/ProfilePage.tsx'
import "./css/ProfilePage.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ProfilePage />
  </React.StrictMode>,
)

let page = document.getElementById('root');
if (page) page.classList.add("page");
