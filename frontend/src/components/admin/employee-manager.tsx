import React, { useState, useEffect, useContext } from 'react';
import { EmployeeContext } from "../../context/employee-context";
import { UserContext } from "../../context/user-context";
import { showInputLabel } from "../../lib/form.js";
import EyeIcon from "../../assets/open-eye.svg";
import CloseEyeIcon from "../../assets/close-eye.svg";


const EmployeeManager = () => {
  const [newEmployee, setNewEmployee] = useState({
    name: {
      firstName: '',
      lastName: '',
    },
    email: '',
    phone: '',
    password: '',
    role: 'employee',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["firstName", "lastName"].includes(name)) {
      setNewEmployee((prevData) => ({ ...prevData, name: { ...prevData.name, [name]: value } }));
    } else {
      setNewEmployee((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const [showPassword, setShowPassword] = useState({ pass: false });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext)

  const {
    employees,
    handleCreateEmployees,
    handleDeleteEmployees,
    handleFetchEmployees,
    handleGetEmployee,
    handleUpdateEmployee,
  } = useContext(EmployeeContext);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    handleCreateEmployees([newEmployee])
  }

  return (
    <section>
      <h2 className='my-3 text-xl text-center capitalize'>Welcome <span className='font-medium'>{user?.name?.firstName + " " + user?.name?.lastName}</span> </h2>
      <div className='flex md:flex-row flex-col gap-2'>
        <form className="bg-white shadow-md rounded px-8 mb-4 md:w-1/3 w-[90%] md:mx-0 mx-auto" onSubmit={handleAddEmployee} noValidate>
          <h3 className="mb-6 underline">Add New Employee</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="mb-6 relative">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered w-full"
                onChange={handleInputChange}
                onInput={showInputLabel}
                value={newEmployee.name.firstName}
                required
              />
              <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>First Name</span>
            </div>

            <div className="mb-6 relative">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                onChange={handleInputChange}
                onInput={showInputLabel}
                value={newEmployee.name.lastName}
                required
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
              onChange={handleInputChange}
              value={newEmployee.phone}
              required
            />
            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Phone Number</span>
          </div>

          <div className="mb-6 relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              onInput={showInputLabel}
              value={newEmployee.email}
              required
            />
            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Email</span>
          </div>

          <div className="mb-6 relative">
            <div
              className='absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer'
              onClick={() => setShowPassword(pre => ({ ...pre, pass: !pre.pass }))}
            >
              {showPassword.pass
                ? <img src={EyeIcon} />
                : <img src={CloseEyeIcon} />}
            </div>
            <input
              type={showPassword.pass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onInput={showInputLabel}
              onChange={handleInputChange}
              value={newEmployee.password}
              required
            />
            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Password</span>
          </div>

          <button type="submit" disabled={loading} className="text-white bg-secondary hover:bg-secondary/90 focus:outline-none font-medium rounded-full text-sm w-full px-5 py-3 text-center mt-2 btn">
            Add Employee
            {loading ? <span className="loading loading-spinner loading-sm ms-1"></span> : null}
          </button>
        </form>

        <article className='md:w-2/3 w-[90%] md:mx-0 mx-auto'>
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
                    <td>
                      <button onClick={() => handleDeleteEmployees(employee._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

      </div>


    </section>
  );
};

export default EmployeeManager;
