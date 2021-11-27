
import '../style/App.css';
import AdminPage from '../pages/AdminPage';
import Profile from '../pages/Profile';

function App() {
  return (
    <div className="App">
     <Profile fname ="Bill" lname= "Gates" passport="12A13445" email="bill@gmail" / >
    </div>
  );
}

export default App;
