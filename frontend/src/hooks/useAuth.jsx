import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';

import { authCookieName } from "../constant/auth"

const useAuth = () => {
  const [cookies] = useCookies([authCookieName]);
  const token = cookies.authCookieName;
  console.log('token from auth', token);
  let id = null;
  let role = null;

  if (token) {
    const decoded = jwtDecode(token);
    id = decoded._id;
    role = decoded.role;
    return { id, role };
  }


  return { id, role };
};

export default useAuth;