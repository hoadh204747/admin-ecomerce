import {message} from "antd"

const success = (mess) => {
    message.success(mess);
  };
  
  const error = (mess) => {
    message.error(mess);
  };
  
  const warning = (mess) => {
    message.warning(mess);
  };

  export {success, error, warning}