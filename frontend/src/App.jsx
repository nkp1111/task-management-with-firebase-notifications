import AllRoutes from "./router";
import { AuthProvider } from "./context/auth-context"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <AuthProvider>
      <ToastContainer />
      <AllRoutes />
    </AuthProvider>
  )
}

export default App
