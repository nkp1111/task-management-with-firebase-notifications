import MyProfile from "./my-profile";
import MyTickets from "./my-tickets"

import { UserContext } from "../../../context/user-context";
import { useContext } from "react";


const MyDashboard = () => {
  const { user, handleUpdateUser } = useContext(UserContext);

  return (
    <section className='mb-3 flex-1 w-full'>
      <div className='flex flex-col gap-2 w-full items-center'>
        <MyProfile user={user} handleUpdateUser={handleUpdateUser} />
        <MyTickets user={user} />
      </div>
    </section>
  )
}

export default MyDashboard;