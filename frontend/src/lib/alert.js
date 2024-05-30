import { toast } from 'react-toastify';

export const notify = (message, action = "") => {
  if (!message) return;
  switch (action) {
    case "success":
      toast.success(message, {
        position: "top-center"
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-center"
      });
      break;
    case "warning":
      toast.warn(message, {
        position: "top-center"
      });
      break;
    case "info":
      toast.info(message, {
        position: "top-center"
      });
      break;
    default:
      toast(message);
  }
};