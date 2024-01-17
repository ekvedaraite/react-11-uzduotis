import './scss/styles.scss'
import AddPet from './pages/AddPetPage'
import PetLogsPage from './pages/PetLogsPage'
import PetListPage from "./pages/PetListPage"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AddLogPage from './pages/AddLogPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-pet" element={<AddPet />} />
        <Route path='/pet-logs/:id' element={<PetLogsPage />} />
        <Route path='/add-log/:id' element={<AddLogPage />} />
        <Route path="/" element={<PetListPage />} />
      </Routes>
    </Router>
  )
}

export default App
