import './App.css';
import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import ShopPage from '../ShopPage/ShopPage';
import LearnPage from '../LearnPage/LearnPage';
import NavBar from '../../components/NavBar/NavBar'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <header>
        <NavBar user={user} setUser={setUser} />
      </header>
      <main>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
