import { useContext, useState } from 'react';
import { UserContext } from "../../context/user-context";

import EmployeeManager from "./employee-manager";
import MyDashboard from "./my-dashboard"

const Admin = () => {

  const { user } = useContext(UserContext);
  const [viewMyDashboard, setViewMyDashboard] = useState(true);

  return (
    <section className='mb-3'>
      <div className="mx-auto my-6 sm:px-8 px-2 flex flex-col">
        <h2 className=' text-xl capitalize text-start'>Welcome <span className='font-medium'>{user?.name?.firstName + " " + user?.name?.lastName}</span> </h2>

        <div role="tablist" className="tabs tabs-boxed mx-auto">
          <a role="tab" className={`tab ${viewMyDashboard ? "tab-active" : ""}`}
            onClick={() => setViewMyDashboard(true)}>My dashboard</a>
          <a role="tab" className={`tab ${!viewMyDashboard ? "tab-active" : ""}`}
            onClick={() => setViewMyDashboard(false)}>Employee Manager</a>
        </div>
      </div>
      <div className='flex md:flex-row flex-col gap-2 sm:px-8 px-2 w-full'>
        {viewMyDashboard ? <MyDashboard /> : <EmployeeManager />}
      </div>
    </section>
  );
};

export default Admin;