import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user-context";
import Admin from "../../components/admin";
import { generateToken, messaging } from "../../lib/notifications/firebase";
import { onMessage, getMessaging } from "firebase/messaging";
import { receiveNotification } from "../../service/notification"
import { notify } from "../../lib/alert";

export default function AdminPage() {
  const { user, setUserFromLocalStorage } = useContext(UserContext);
  useEffect(() => {
    setUserFromLocalStorage()
    generateToken().then(async token => {
      if (token) {
        // fetch notifications
        const result = await receiveNotification(token);
        // console.log('Receiving notification:', result);
      }
    })
    onMessage(messaging, (payload) => {
      if (payload && payload.data) {
        const { title, body, icon } = payload.data;
        notify(body.slice(0, 50) + "...", "success")
      }
      // console.log(payload, "receiving message");
    })
  }, []);

  return (
    <main className="h-screen overflow-y-auto">
      <h1 className="my-5 text-xl font-bold text-center">{user?.role === "employee" ? "Employee" : "Admin"} dashboard</h1>
      <Admin />
    </main>
  )
}
