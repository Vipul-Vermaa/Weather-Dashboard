import Register from './components/auth/Register'
import Login from './components/auth/Login'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SearchCities from './pages/SearchCities'
import {AuthProvider} from './services/AuthProvider'
import PrivateRoute from './services/PrivateRoute'

function App() {

  return (
    <>
      <AuthProvider>
      <Router>
        <Routes>          
          <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path='/searchcity' element={<SearchCities/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
