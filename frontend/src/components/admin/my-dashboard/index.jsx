import MyProfile from "./my-profile";
import MyTickets from "./my-tickets"

import { UserContext } from "../../../context/user-context";
import { useContext, useState } from "react";

import Meetings from "../meeting"


const MyDashboard = () => {
  const { user, handleUpdateUser } = useContext(UserContext);
  const [viewMeetings, setViewMeetings] = useState(false);
  const handleViewMeeting = (value) => {
    setViewMeetings(() => value);
  }

  return (
    <section className='mb-3 flex-1 w-full'>
      <div className='flex flex-col gap-2 w-full items-center'>
        <MyProfile user={user}
          handleUpdateUser={handleUpdateUser}
          handleViewMeeting={handleViewMeeting} />

        {viewMeetings ? <Meetings user={user} /> : <MyTickets user={user} />}
      </div>
    </section>
  )
}

export default MyDashboard;