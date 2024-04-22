
import { toast } from 'react-toastify';

const handleApiError = (error, errorMessageMap) => {
  if (error.response && error.response.data) {
    const { data } = error.response;
    // Iterate over errorMessageMap to check if any error matches the received error data
    for (const [errorKey, errorMessage] of Object.entries(errorMessageMap)) {
      if (data && data[errorKey]) {
        toast.error(errorMessage);
        return; // Exit the function after displaying the error message
      }
    }
    toast.error('Ha ocurrido un error al realizar la operación.');
  } else {
    console.error('Error:', error);
    toast.error('Ha ocurrido un error. Por favor, inténtelo de nuevo.');
  }
};

export default handleApiError;
