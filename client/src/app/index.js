
import '../style/App.css';
import AdminPage from '../pages/AdminPage';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import MyBookings from '../pages/MyBookings';
import {
  Routes,
  Route
} from "react-router-dom";
import ConfirmBooking from '../pages/ConfirmBooking';


function App() {
  return (
    <div className="App">
    
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="confirm" element={<ConfirmBooking />} />
      </Routes>

    </div>
  );
}

export default App;
