import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/HomePage/Home'
import Footer from './components/pages/Footer/Footer'
import SignUp from './components/pages/SignUpPage/SignUp'
import Login from './components/pages/LoginPage/Login'
import {UserContextProvider} from "./UserContext"
import CreatePost from './components/pages/PostsPage/CreatePost'


function App() {
  return (
    <UserContextProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path={'/sign-up'} element={<SignUp />}></Route>
        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/create'} element={<CreatePost/>}></Route>
      </Routes>

      <Footer />
    </Router>
    </UserContextProvider>
  )
}

export default App
