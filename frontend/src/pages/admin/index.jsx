import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user-context";
import Admin from "../../components/admin";
import { generateToken, messaging } from "../../lib/notifications/firebase";
import { onMessage } from "firebase/messaging";

export default function AdminPage() {
  const { user, setUserFromLocalStorage } = useContext(UserContext);
  useEffect(() => {
    setUserFromLocalStorage()
    generateToken().then(token => {
      if (token) {
        // fetch notifications
      }
    })
    onMessage(messaging, (payload) => {
      console.log(payload, "receiving message");
    })
  }, []);

  return (
    <main className="h-screen overflow-y-auto">
      <h1 className="my-5 text-xl font-bold text-center">{user?.role === "employee" ? "Employee" : "Admin"} dashboard</h1>
      <Admin />
    </main>
  )
}
