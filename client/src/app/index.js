
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
import SignIn from '../pages/SignIn';


function App() {
  return (
    <div className="App">
    
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="confirm" element={<ConfirmBooking />} />
          <Route path="signIn" element={<SignIn />} />
      </Routes>

    </div>
  );
}

export default App;
