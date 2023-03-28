import React from 'react'
import cardStyle from "../styles/Card.module.css";
import Button from './Button';
import toastr from "toastr";

import { useGrantAccess } from "../api/ApiClient";

function Card({email}) {

    const grantAccess = useGrantAccess();

    const handleGrantAccess = async (email) =>{

      console.log(email);
        await grantAccess(email)
          .then((response) => {
            if (response.data.successful) {
              console.log("successful");
              toastr.success("Access granted");
            } else {
              console.log(response.data.errorMessage);
            }
          })
          .catch((error) => {
            toastr.error("Unauthorized")
            console.log(error);
          });
    }


  return (
    <div className={cardStyle.card}>
      <h3>{email}</h3>
      <Button
        width="40px"
        borderRadius="50%"
        height="40px"
        click={() => handleGrantAccess(email)}
      ></Button>
    </div>
  );
}

export default Card