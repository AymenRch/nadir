import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import RegisterWork from './screens/RegisterWork'
import PaymentPage from './screens/Payment'
import AdminDashboard from './screens/dash';
import CourtMetrageRoles from './screens/courtMetrageRoles';
import PricingPage from './screens/PricingPage';
import ArtistPage from './screens/ArtistPage';
import RealisateurStudio from './screens/RealisateurStudio ';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/RegisterWork" element={<RegisterWork/>} />
      <Route path="/Payment" element={<PaymentPage />} />
      <Route path="/Admin" element={<AdminDashboard />} />
      <Route path="/court-metrage" >
        <Route path="roles" element={<CourtMetrageRoles />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="artist" element={<ArtistPage />} />
        <Route path="studio" element={<RealisateurStudio />} />
      </Route>
    </Routes>
  )
}

export default App