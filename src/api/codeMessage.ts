const SYSTEM = {
  401: "Invalid authentication!",
  404: "Request not found!",
  500: "Internal Server Error!",
  502: "Bad Gateway"
};

const USERS = {
  EC_10000: "Network Error!",
  EC_10001: "Email or password is wrong!",
  EC_10002: "Information is not complete!",
  EC_10003: "This mailbox is already used!"
};

export default Object.assign(SYSTEM, USERS);
