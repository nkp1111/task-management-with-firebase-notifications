import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import AllRoutes from "./router";
import { AuthProvider } from "./context/auth-context"
import { UserProvider } from "./context/user-context";

function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <ToastContainer />
        <AllRoutes />
      </UserProvider>
    </AuthProvider>
  )
}

export default App
