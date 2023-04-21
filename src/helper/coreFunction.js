import jwtDecode from "jwt-decode";

export const checkTokenForExpiry = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token === undefined || token === null) {
    return false;
  }

  const decodedToken = jwtDecode(token);

  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    localStorage.removeItem("token");
    return false;
  }

  return true;
};

export const GetFirstNameFromToken = (token) =>{
  const decodedToken = jwtDecode(token);

  return decodedToken.given_name
}