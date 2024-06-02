import { useState, useContext } from 'react'
import EyeIcon from "../../../assets/open-eye.svg";
import CloseEyeIcon from "../../../assets/close-eye.svg";
import { showInputLabel } from "../../../lib/form";
import { EmployeeContext } from "../../../context/employee-context.jsx";

export default function NewEmployeeForm() {

  const [loading, setLoading] = useState(false);
  const [newEmployeeLocal, setNewEmployeeLocal] = useState({
    name: {
      firstName: '',
      lastName: '',
    },
    email: '',
    phone: '',
    password: '',
    role: 'employee',
  });
  const [showPassword, setShowPassword] = useState({ pass: false });

  const {
    handleCreateEmployees,
  } = useContext(EmployeeContext);


  const handleAddEmployee = (e, newEmployeeLocal) => {
    setLoading(true)
    e.preventDefault();
    handleCreateEmployees([newEmployeeLocal])
    setLoading(false);
    setNewEmployeeLocal({
      name: {
        firstName: '',
        lastName: '',
      },
      email: '',
      phone: '',
      password: '',
      role: 'employee',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["firstName", "lastName"].includes(name)) {
      setNewEmployeeLocal((prevData) => ({ ...prevData, name: { ...prevData.name, [name]: value } }));
    } else {
      setNewEmployeeLocal((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <form className="bg-white shadow-md rounded sm:p-8 p-2 mb-4 md:w-1/3 w-[90%] md:mx-0 mx-auto" onSubmit={(e) => handleAddEmployee(e, newEmployeeLocal)} noValidate>
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
            value={newEmployeeLocal.name.firstName}
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
            value={newEmployeeLocal.name.lastName}
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
          value={newEmployeeLocal.phone}
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
          value={newEmployeeLocal.email}
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
          value={newEmployeeLocal.password}
          required
        />
        <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Password</span>
      </div>

      <button type="submit" disabled={loading} className="text-primary-content bg-primary hover:bg-primary/90 focus:outline-none font-medium rounded-full text-sm w-full px-5 py-3 text-center mt-2 btn disabled:bg-primary disabled:text-primary-content">
        Add Employee
        {loading ? <span className="loading loading-spinner loading-sm ms-1"></span> : null}
      </button>
    </form>
  )
}
