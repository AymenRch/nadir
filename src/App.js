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
     <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      You have to pay.
    </div>
  )
}

export default App
