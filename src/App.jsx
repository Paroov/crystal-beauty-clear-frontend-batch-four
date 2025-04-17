
import { BrowserRouter, Route ,Routes } from 'react-router-dom';
import './App.css'
import Header from './components/header.jsx'
import ProductCard from './components/product-card.jsx'
import AdminPage from './pages/adminPage.jsx';
import LoginPage from './pages/loginPage.jsx'

function App() {
  

  return (
    <BrowserRouter>
       <Routes path="/*">
       <Route path="/admin/*" element={<AdminPage />}/>
       <Route path="/login" element={<LoginPage />}/>
       <Route path="/" element={<h1>Home</h1> }/>
       <Route path="/*" element={<h1>404 not found</h1>} />

       </Routes>
    </BrowserRouter>
   
  );
}

export default App
