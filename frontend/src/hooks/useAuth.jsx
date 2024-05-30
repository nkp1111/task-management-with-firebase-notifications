import {
  getValueFromLocalStorage,
} from "../lib/store"

const useAuth = () => {

  const result = getValueFromLocalStorage("task_user");

  let id = null;
  let role = null;

  if (result) {
    id = result._id;
    role = result.role;
    return { id, role };
  }


  return { id, role };
};

export default useAuth;