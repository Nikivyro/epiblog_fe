import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import UserPage from './pages/UserPage';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path='/me' element={<UserPage/>}/>
            <Route path='/' element={<Home/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
