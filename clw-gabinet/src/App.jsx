import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ChooseCard from './pages/ChooseCard'
// import ChildrenCard from './pages/cards/ChildrenCard'
import ChildrenCard from './pages/cards/ChildrenCard'
import AddUser from './pages/AddUser'
import LowVisionCard from './pages/cards/LowVisionCard'
import ChildrenControlCard from './pages/cards/ChildrenControlCard'
import AdultCard from './pages/cards/AdultCard'
import LinesCard from './pages/cards/LinesCard'
import ChildrenCardInfo from './pages/cards-info/ChildrenCardInfo'
import AdultCardInfo from './pages/cards-info/AdultCardInfo'
import ChildrenControlCardInfo from './pages/cards-info/ChildrenControlCardInfo'
import LowVisionCardInfo from './pages/cards-info/LowVisionCardInfo'
import LinesCardInfo from './pages/cards-info/LinesCardInfo'
import SearchCard from './pages/SearchCard'
import AdultControlCardInfo from './pages/cards-info/AdultControlCardInfo'
import AdultControlCard from './pages/cards/AdultControlCard'
import ChooseCardChildren from './pages/ChooseCardChildren'
import ChooseCardAdult from './pages/ChooseCardAdult'
import ManageUsers from './pages/ManageUsers'


function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return <p>Ładowanie...</p>

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/choose-card" element={user ? <ChooseCard /> : <Navigate to="/login" />} />
      <Route path="/search-card" element={user ? <SearchCard /> : <Navigate to="/login" />} />
      <Route path='/manage-users' element={user ? <ManageUsers /> : <Navigate to="/login" />}/>
      <Route path='/choose-card/children' element={user ? <ChooseCardChildren /> : <Navigate to="/login" />}/>
      <Route path='/add-user' element={user ? <AddUser /> : <Navigate to="/login" />}/>
      <Route path='/choose-card/adult' element={user ? <ChooseCardAdult /> : <Navigate to="/login" />}/>


      <Route path='/card/adult/info/:id' element={user ? <AdultCardInfo /> : <Navigate to="/login" />}/>
      <Route path='/card/children/info/:id' element={user ? <ChildrenCardInfo /> : <Navigate to="/login" />}/>
      <Route path='/card/children-control/info/:id' element={user ? <ChildrenControlCardInfo /> : <Navigate to="/login" />}/>
      <Route path='/card/low-vision/info/:id' element={user ? <LowVisionCardInfo /> : <Navigate to="/login" />}/>
      <Route path='/card/lines/info/:id' element={user ? <LinesCardInfo /> : <Navigate to="/login" />}/>
      <Route path='/card/adult-control/info/:id' element={user ? <AdultControlCardInfo /> : <Navigate to="/login" />}/>



      <Route path='/card/children/edit/:id' element={user ? <ChildrenCard /> : <Navigate to="/login" />}/>
      <Route path='/card/low-vision/edit/:id' element={user ? <LowVisionCard /> : <Navigate to="/login" />}/>
      <Route path='/card/children-control/edit/:id' element={user ? <ChildrenControlCard /> : <Navigate to="/login" />}/>
      <Route path='/card/adult/edit/:id' element={user ? <AdultCard /> : <Navigate to="/login" />}/>
      <Route path='/card/lines/edit/:id' element={user ? <LinesCard /> : <Navigate to="/login" />}/>
      <Route path='/card/adult-control/edit/:id' element={user ? <AdultControlCard /> : <Navigate to="/login" />}/>


      <Route path='/card/children' element={user ? <ChildrenCard /> : <Navigate to="/login" />}/>
      <Route path='/card/low-vision' element={user ? <LowVisionCard /> : <Navigate to="/login" />}/>
      <Route path='/card/children-control' element={user ? <ChildrenControlCard /> : <Navigate to="/login" />}/>
      <Route path='/card/adult' element={user ? <AdultCard /> : <Navigate to="/login" />}/>
      <Route path='/card/adult-control' element={user ? <AdultControlCard /> : <Navigate to="/login" />}/>
      <Route path='/card/lines' element={user ? <LinesCard /> : <Navigate to="/login" />}/>



      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}