import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Review from './pages/Review';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';


function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={
            // "Dashboard sirf logged in users dekh sakte hain — ProtectedRoute pehle token check karega"
            <ProtectedRoute>    
              <Dashboard/>
            </ProtectedRoute>
          } />

          <Route path="/review/:id" element={
            <ProtectedRoute>
              <Review/>
            </ProtectedRoute>
            // :id ek dynamic part hai — matlab /review/abc123 ya /review/xyz456 dono is route se match karenge. abc123 ya xyz456 Review component mein useParams() se milega — har review ka alag unique URL hoga
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;