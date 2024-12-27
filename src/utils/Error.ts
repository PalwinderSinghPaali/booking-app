import { toasterError } from "@/components/core/Toaster";
import { getErrorMessage } from "./errorHandler";

export interface IErrorHandler {
  refresh?: boolean;
  toast?: string;
  snackBar?: string;
  validation?: boolean;
  signOut?: boolean;
}

function refresh() {
  return { refresh: true };
}

function signOut() {
  return { signOut: true };
}

function snackBar(message: string) {
  return { snackBar: message };
}

function toast(message: string) {
  return { toast: message };
}

export const errorCodes: { [key: string]: IErrorHandler } = {
  ERR_INVALID_TOKEN: refresh(),
  ERR_AUTH_TOKEN_MISSING: refresh(),
  ERR_ACCESS_TOKEN_MISSING: refresh(),
  ERR_ACCESS_TOKEN_EXPIRED: refresh(),
  ERR_AUTH_TOKEN_EXPIRED: refresh(),
  ERR_INVALID_ACCESS_TOKEN: refresh(),
  ERR_AUTH_WRONG_REFRESH_TOKEN: signOut(),
  ERR_NOT_AUTHORIZED: toast("Not authorized"),
  ERR_PAYMENT_FAILED: toast("Payment failed!"),
  ERR_WRONG_COUPON: toast("Coupon is invalid!"),
  ERR_AUTH_WRONG_USERNAME_OR_PASSWORD: toast("Wrong email or password"),
  ERR_AUTH_WRONG_PASSWORD_RESET_TOKEN: toast("Reset Token expired"),
  ERR_AUTH_USERNAME_OR_EMAIL_ALREADY_EXIST: toast("Email already exists"),
  ERR_AUTH_PASSWORD_RESET_WRONG_EMAIL: toast("Email does not exist"),
  ERR_AUTH_REFRESH_EXPIRED: signOut(),
  ERR_VALIDATION: toast("Validation Error"),
};

async function handle(res: any) {
  // Nothing to handle
  if (res.status == 200) return res;

  // Error can't be handled by handler
  if (!res.error.code) {
    return toast(`An Error occurred | Code: ${res.status}`);
  }

  const error: IErrorHandler | undefined = errorCodes[res.error.code];

  // Error not defined
  if (!error) {
    return toast(`${getErrorMessage(res.error.code)}`);
  }

  if (error.toast) {
    return error;
  }

  if (error.signOut) {
    return error;
  }

  if (error.refresh) {
    return error;
  }


  toasterError(`An Error occurred | Code: ${res.status}`);
  return res;
}

export default { handle };
