
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
import SignInPage from '../pages/SignInPage';
import ChooseSeats from '../pages/ChooseSeats';
import Tagline from '../pages/Tagline';
import StepperPage from '../components/StepperPage';


function App() {
  return (
    <div className="App">
    
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="confirm" element={<ConfirmBooking />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="seats" element={<ChooseSeats />} />
          <Route path="tag" element={<Tagline />} />
          <Route path="step" element={<StepperPage/>} />
      </Routes>


    </div>
  );
}

export default App;
