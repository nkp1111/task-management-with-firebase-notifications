import { useState, useContext } from 'react'
import { MeetingContext } from "../../../context/meeting-context.jsx";
import ViewMeetingTable from "./view-meeting-table";
import ViewMeetingCalendar from "./view-meeting-calendar"



export default function ViewMeeting({ user }) {
  const [showMyMeeting, setShowMyMeeting] = useState(true);
  const [showMeetingTable, setShowMeetingTable] = useState(true);
  const {
    handleDeleteMeeting,
    handleUpdateMeeting,
    userMeetings,
    employeesMeetings,
  } = useContext(MeetingContext);


  const meetingsToShow = showMyMeeting ? userMeetings : employeesMeetings;
  return (
    <article className='w-[90%] md:mx-0 mx-auto sm:p-8 p-2'>
      <div className="flex justify-between gap-2 mb-6">
        <div className="flex gap-2">
          {user?.role === "admin" ? (
            <>
              <h3 className={`${showMyMeeting ? "underline" : "cursor-pointer"}`}
                onClick={() => !showMyMeeting && setShowMyMeeting(true)}
              >My meetings</h3>
              <h4 className={`${showMyMeeting ? "cursor-pointer" : "underline"}`}
                onClick={() => showMyMeeting && setShowMyMeeting(false)}
              >Employee meetings</h4>
            </>
          ) : (
            <h3 className="underline">My meetings</h3>
          )}
        </div>

        <div className="flex gap-2">
          <div className={`${showMeetingTable ? "underline" : "cursor-pointer"}`}
            onClick={() => !showMeetingTable && setShowMeetingTable(true)}
          >Table View</div>
          <div className={`${showMeetingTable ? "cursor-pointer" : "underline"}`}
            onClick={() => showMeetingTable && setShowMeetingTable(false)}
          >Calendar View</div>
        </div>
      </div>

      <div className="overflow-x-auto">

        {showMeetingTable
          ? <ViewMeetingTable
            meetings={meetingsToShow}
            handleDeleteMeeting={handleDeleteMeeting}
            handleUpdateMeeting={handleUpdateMeeting}
          />
          : <ViewMeetingCalendar meetings={meetingsToShow} />}

      </div>
    </article>
  )
}
