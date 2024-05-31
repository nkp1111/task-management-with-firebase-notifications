import NewEmployeeForm from "./new-employee-form";
import ViewEmployee from "./view-employee"

const EmployeeManager = () => {

  return (
    <section className='mb-3'>
      <div className='flex md:flex-row flex-col gap-2'>
        <NewEmployeeForm />
        <ViewEmployee />
      </div>
    </section>
  );
};

export default EmployeeManager;