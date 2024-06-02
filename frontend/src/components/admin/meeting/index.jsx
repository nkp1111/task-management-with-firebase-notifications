import { useContext } from 'react'
import NewMeeting from "./new-meeting";
import ViewMeeting from "./view-meeting";

import { UserContext } from "../../../context/user-context"

export default function Meetings() {
  const { user } = useContext(UserContext)
  return (
    <section className='mb-3 w-full'>
      <div className='flex md:flex-row flex-col gap-2'>
        <NewMeeting user={user} />
        <ViewMeeting user={user} />
      </div>
    </section>
  )
}
