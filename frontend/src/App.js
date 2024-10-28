import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Jobitemdetails from './components/Jobitemdetails';
import Signup from './components/Signup';
import CreateUserProfile from './components/Createuserprofile';
import Notfound from './components/Notfound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-user-profile" element={<ProtectedRoute element={CreateUserProfile} />} />
      <Route path="/" element={<ProtectedRoute element={Home} />} />
      <Route path="/jobs" element={<ProtectedRoute element={Jobs} />} />
      <Route path="/jobs/:id" element={<ProtectedRoute element={Jobitemdetails} />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  </BrowserRouter>
);

export default App;


