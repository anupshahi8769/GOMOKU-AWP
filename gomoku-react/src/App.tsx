import { Routes, Route, Navigate } from 'react-router-dom';
import {Header, UserProvider} from './components'
import {Home, Login, SignUp, Game, GameHistory, GameHistoryDetail} from './pages'
import './App.module.css';

function App() {
  return (
    <UserProvider>
      <Header />
      <main className="main">
        <Routes>
          <Route path= "/" element={<Home />} />
          <Route path= "login" element={<Login />} />
          <Route path= "sign-up" element={<SignUp />} />
          <Route path= "game" element={<Game />} />
          <Route path= "gamehistory" element={<GameHistory />} />
          <Route path= "gamehistorydetail/:gameId" element={<GameHistoryDetail />} />
          <Route path= "*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </UserProvider>
  )
}

export default App;
