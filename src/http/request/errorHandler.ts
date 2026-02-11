import { ResponseCode } from "./enum";

const ErrorHandle = {
  [ResponseCode.Fail]() {
    console.log("FAIL");
  },
  [ResponseCode.BAD_REQUEST]() {
    console.log("BAD_REQUEST");
  },
  [ResponseCode.No_AUTHENTICATION]() {
    console.log("NO_AUTHENTICATION");
  },
};

export default ErrorHandle;
