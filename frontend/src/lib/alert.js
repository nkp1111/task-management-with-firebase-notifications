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
        position: "top-left"
      });
      break;
    case "warning":
      toast.warn(message, {
        position: "bottom-left"
      });
      break;
    case "info":
      toast.info(message, {
        position: "bottom-center"
      });
      break;
    default:
      toast(message);
  }
};