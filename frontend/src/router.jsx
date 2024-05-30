import {
  BrowserRouter,
} from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/auth-check";
import Login from "./pages/login";
import Admin from "./pages/admin";


export default function AllRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Checks if user logged in or not */}
          <Route element={<RequireAuth />}>
            {/* protected routes defined here  */}
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
