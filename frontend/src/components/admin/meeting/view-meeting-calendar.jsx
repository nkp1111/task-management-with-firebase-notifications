import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MeetingCalendar = ({ meetings }) => {
  const events = meetings?.map(meeting => ({
    title: meeting.title,
    date: meeting.startTime,
    start: meeting.startTime,
    end: meeting.endTime,
    description: meeting.description,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  );
};


function renderEventContent(eventInfo) {
  return (
    <div className="flex flex-col items-start">
      <div className="font-bold">{eventInfo.event.title}</div>
      <div className="">
        {new Date(eventInfo.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(eventInfo.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      {eventInfo.event.extendedProps.description && (
        <div className="mt-1 text-[0.9rem]">{eventInfo.event.extendedProps.description}</div>
      )}
    </div>
  );
}

export default MeetingCalendar;
