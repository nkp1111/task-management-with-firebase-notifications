import { useContext } from "react";
import { UserContext } from "../../context/user-context";
import Admin from "../../components/admin";

export default function AdminPage() {
  const { user } = useContext(UserContext);

  return (
    <main className="h-screen overflow-y-auto">
      <h1 className="my-5 text-xl font-bold text-center">{user?.role === "employee" ? "Employee" : "Admin"} dashboard</h1>
      <Admin />
      {/* <TicketManager /> */}
    </main>
  )
}
