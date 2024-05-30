import React from 'react'

import { EmployeeManager } from "../../components/admin";

export default function AdminPage() {
  return (
    <main className="h-screen overflow-y-auto">
      <h1 className="my-5 text-xl font-bold text-center">Admin dashboard</h1>
      <EmployeeManager />
      {/* <TicketManager /> */}
    </main>
  )
}
