import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import AllRoutes from "./router";


function App() {

  return (
    <>
      <ToastContainer />
      <AllRoutes />
    </>
  )
}

export default App
