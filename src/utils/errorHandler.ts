export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'ERR_EMAIL_ALREADY_EXIST':
      return 'Sorry, that email address is already used!';
    case 'ERR_WRONG_PASSWORD':
      return 'Wrong Password';
    case 'ERR_AUTH_WRONG_USERNAME_OR_PASSWORD':
      return 'Wrong Email Id';
      case 'ERR_AUTH_WRONG_TOKEN':
        return "Token Expired"
        case 'ERR_USER_NOT_FOUND' :
          return "User not Found"
        case 'ERR_ACCOUNT_NOT_VERIFIED':
          return "User not verified Yet"
          case 'ERR_TOKEN_GENERATE_FAILED':
            return "Token Generated Failed"
          case "User is already activated":
          return "You can Login Direct .Your Account is Verified Already !"
          case "Verification Token is Invalid":
            return "Verification Token is Invalid"
            case "Verification Token is Expired":
              return "Token Expired"
              case "ERR_HANDLE_ALREADY_EXIST":
                return "Handle has already been taken"
         
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
