import { useContext } from 'react';
import { UserContext } from "../../context/user-context.jsx";

import NewEmployeeForm from "./new-employee-form";
import ViewEmployee from "./view-employee"

const EmployeeManager = () => {

  const { user } = useContext(UserContext);
  return (
    <section className='mb-3'>
      <h2 className='my-3 text-xl text-center capitalize'>Welcome <span className='font-medium'>{user?.name?.firstName + " " + user?.name?.lastName}</span> </h2>
      <div className='flex md:flex-row flex-col gap-2'>
        <NewEmployeeForm />
        <ViewEmployee />
      </div>
    </section>
  );
};

export default EmployeeManager;
