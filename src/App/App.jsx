import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

// Components
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import CatForm from '../pages/Forms/CatForm'
import ToyForm from '../pages/Forms/ToyForm'
import CatList from '../pages/CatList/CatList'
import ToyList from '../pages/ToyList/ToyList'
import Header from '../components/Header/Header'
import ToyDetails from '../pages/ToyDetails/ToyDetails'
import CatDetails from '../pages/CatDetails/CatDetails'
import Confirmation from '../pages/Confirmation/Confirmation'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

// Services
import * as catService from '../services/cats'
import * as toyService from '../services/toys'
import * as authService from '../services/authService'

// Image Assets
import CoolCat from '../assets/cool-cat.svg'
import NerdCat from '../assets/nerd-cat.svg'
import HappyCat from '../assets/happy-cat.svg'
import CatInBox from '../assets/cat-in-box.svg'
import TeaCupCat from '../assets/teacup-cat.svg'
import SkaterCat from '../assets/sk8r-boi-cat.svg'

function App() {
  const navigate = useNavigate()
  const [cats, setCats] = useState([])
  const [toys, setToys] = useState([])
  const [user, setUser] = useState(authService.getUser())

  const catImages = [
    SkaterCat, CoolCat,
    NerdCat, HappyCat,
    CatInBox, TeaCupCat,
  ]

  const addCat = async (catData) => {
    const cat = await catService.create(catData)
    setCats([...cats, cat])
  }

  const addToy = async (toyData) => {
    const toy = await toyService.create(toyData)
    setToys([...toys, toy])
  }

  const updateCat = async (catData) => {
    const updatedCat = await catService.update(catData)
    setCats(cats.map((cat) => (
      cat.id === updatedCat.id ? updatedCat : cat
    )))
  }

  const updateToy = async (toyData) => {
    const updatedToy = await toyService.update(toyData)
    setToys(toys.map((toy) => (
      toy.id === updatedToy.id ? updatedToy : toy
    )))
  }

  const deleteCat = async (id) => {
    await catService.deleteOne(id)
    setCats(cats.filter(cat => cat.id !== parseInt(id)))
  }

  const deleteToy = async (id) => {
    await toyService.deleteOne(id)
    setToys(toys.filter(toy => toy.id !== parseInt(id)))
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await catService.getAll()
      setCats(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await toyService.getAll()
      setToys(data)
    }
    fetchData()
  }, [])

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
          <Route path="/toys" element={
            <ProtectedRoute user={user}>
              <ToyList toys={toys} />
            </ProtectedRoute>
          } />
          <Route path="/cats" element={
            <ProtectedRoute user={user}>
              <CatList cats={cats} catImages={catImages} />
            </ProtectedRoute>
          } />
          <Route path="/toys/:id" element={
            <ProtectedRoute user={user}>
              <ToyDetails toys={toys} user={user} />
            </ProtectedRoute>
          } />
          <Route path="/cats/:id" element={
            <ProtectedRoute user={user}>
              <CatDetails catImages={catImages} user={user} />
            </ProtectedRoute>
          } />
          <Route path="/cats/new" element={
            <ProtectedRoute user={user}>
              <CatForm addCat={addCat} user={user} />
            </ProtectedRoute>
          } />
          <Route path="/toys/new" element={
            <ProtectedRoute user={user}>
              <ToyForm addToy={addToy} user={user} />
            </ProtectedRoute>
          } />
          <Route path="/cats/:id/edit" element={
            <ProtectedRoute user={user}>
              <CatForm cats={cats} updateCat={updateCat} user={user} />
            </ProtectedRoute>
          } />
          <Route path="/toys/:id/edit" element={
            <ProtectedRoute user={user}>
              <ToyForm toys={toys} updateToy={updateToy} user={user} />
            </ProtectedRoute>
          } />
          <Route path="/cats/:id/confirmation" element={
            <ProtectedRoute user={user}>
              <Confirmation deleteCat={deleteCat} user={user} />
            </ProtectedRoute>
          } />
          <Route path="/toys/:id/confirmation" element={
            <ProtectedRoute user={user}>
              <Confirmation deleteToy={deleteToy} user={user} />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </>
  )
}

export default App