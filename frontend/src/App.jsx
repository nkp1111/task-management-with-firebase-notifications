import AllRoutes from "./router";
import { AuthProvider } from "./context/auth-context"

function App() {

  return (
    <AuthProvider>
      <AllRoutes />
    </AuthProvider>
  )
}

export default App
