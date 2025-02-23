import { toast } from "react-toastify";
export const showMessage = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
  }
};
