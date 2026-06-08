import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import RegisterWork from './screens/RegisterWork'
import PaymentPage from './screens/Payment'
import AdminDashboard from './screens/dash';
import CourtMetrageRoles from './screens/courtMetrageRoles';
import PricingPage from './screens/PricingPage';
import ArtistPage from './screens/ArtistPage';
import RealisateurStudio from './screens/RealisateurStudio ';
import ExpiredPage from './screens/expired';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
