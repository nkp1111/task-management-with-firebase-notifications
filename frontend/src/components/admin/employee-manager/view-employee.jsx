import { useState, useContext } from 'react'
import DeleteIcon from "../../../assets/delete-trash.svg";
import EditPencilIcon from "../../../assets/edit-pencil.svg";
import { showInputLabel } from "../../../lib/form";

import { EmployeeContext } from "../../../context/employee-context.jsx";


export default function ViewEmployee() {
  const {
    employees,
    handleDeleteEmployees,
    handleUpdateEmployee,
  } = useContext(EmployeeContext);

  const [employeeUpdateData, setEmployeeUpdateData] = useState({
    name: { firstName: "", lastName: "" },
    phone: "",
  });

  return (
    <article className='md:w-2/3 w-[90%] md:mx-0 mx-auto sm:px-8 px-2'>
      <h3 className='mb-6 underline'>Employee List</h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee, index) => (
              <tr key={employee._id}>
                <th>{index + 1}</th>
                <td>{employee.name.firstName}  {employee.name.lastName}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td className='flex gap-4 items-center'>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button className='flex gap-1 items-center tooltip border border-gray-500 rounded-full w-8 h-8 i justify-center' data-tip="Edit" aria-label='Edit' onClick={() => document.getElementById(`update_emp_${employee._id}`)?.showModal()}>
                    <img src={EditPencilIcon} alt="." />
                  </button>
                  <dialog id={`update_emp_${employee._id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Edit Employee -{employee._id}</h3>
                      <p className="py-4">Email: {employee.email}</p>

                      <div className="modal-action">
                        <form method="dialog">

                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="mb-6 relative">
                              <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="input input-bordered w-full"

                                onInput={showInputLabel}
                                onChange={(e) => setEmployeeUpdateData(pre => ({ ...pre, name: { ...pre.name, firstName: e.target.value } }))}
                                value={employeeUpdateData.name.firstName}
                              />
                              <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>First Name</span>
                            </div>

                            <div className="mb-6 relative">
                              <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="input input-bordered w-full"
                                onInput={showInputLabel}
                                onChange={(e) => setEmployeeUpdateData(pre => ({ ...pre, name: { ...pre.name, lastName: e.target.value } }))}
                                value={employeeUpdateData.name.lastName}
                              />
                              <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Last Name</span>
                            </div>
                          </div>

                          <div className="mb-6 relative">
                            <input
                              type="text"
                              name="phone"
                              placeholder="Phone Number"
                              className="input input-bordered w-full"
                              onInput={showInputLabel}
                              onChange={(e) => setEmployeeUpdateData(pre => ({ ...pre, phone: e.target.value }))}
                              value={employeeUpdateData.phone}
                            />
                            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Phone Number</span>
                          </div>

                          <button onClick={() => handleUpdateEmployee(employee._id, employeeUpdateData)} className="btn btn-secondary me-2">Update</button>

                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-secondary text-secondary-content">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>

                  <button className='flex gap-1 items-center tooltip border border-gray-500 rounded-full w-8 h-8 i justify-center' data-tip="Delete" aria-label='Delete' onClick={() => handleDeleteEmployees(employee._id)}>
                    <img src={DeleteIcon} alt="." />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
