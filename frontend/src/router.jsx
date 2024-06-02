import {
  BrowserRouter,
} from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./components/auth-check";
import Auth from "./pages/auth";
import Admin from "./pages/admin";
import { AuthProvider } from "./context/auth-context"
import { UserProvider } from "./context/user-context";
import { EmployeeProvider } from "./context/employee-context";
import { TicketProvider } from "./context/ticket-context"
import { MeetingProvider } from "./context/meeting-context";


export default function AllRoutes() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <EmployeeProvider>
              <TicketProvider>
                <MeetingProvider>
                  <Routes>
                    <Route path="/" element={<Auth />} />

                    {/* Checks if user logged in or not */}
                    <Route element={<RequireAuth />}>
                      {/* protected routes defined here  */}
                      <Route path="/admin" element={<Admin />} />
                    </Route>
                  </Routes>
                </MeetingProvider>
              </TicketProvider>
            </EmployeeProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter >
    </>
  )
}
