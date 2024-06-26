import ViewTickets from "./view-tickets";
import NewTicketForm from "./new-ticket-form";

export default function MyTickets({ user }) {
  return (
    <section className='mb-3 w-full'>
      <div className='flex md:flex-row flex-col gap-2'>
        <NewTicketForm />
        <ViewTickets user={user} />
      </div>
    </section>
  )
}
