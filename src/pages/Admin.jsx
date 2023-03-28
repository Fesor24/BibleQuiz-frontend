import React, {useEffect, useState} from 'react'
import { useFetchUserByEmail, useFetchUsers } from '../api/ApiClient';
import RequireAuth from '../components/Auth/requireAuth';
import cardStyle from "../styles/Card.module.css"
import Button from '../components/Button';
import Card from '../components/Card';
import toastr from 'toastr';

function Admin() {

    const [users, setUsers] = useState([]);

    const [searchUser, setSearchUser] = useState();

    const fetchUsers = useFetchUsers();

    const fetchUserByEmail = useFetchUserByEmail();

    const [pageIndex, setPageIndex] = useState(1);

    const handleNextPage =() => {
        setPageIndex(pageIndex + 1)
    }

     const handlePreviousPage =() => {
        setPageIndex(pageIndex - 1);
    }

    useEffect(() => {

        const fetchAllUsers = async() =>{
            await fetchUsers(pageIndex)
            .then((response) => {
                if (response.data.successful){
                    console.log(response.data.result)
                    setUsers(response.data.result);
                }
                else{
                    console.log(response.data.erroorMessaage)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }

       
        fetchAllUsers();
    }, [pageIndex])

    const handleFetchUserByEmail = async () =>{
      await fetchUserByEmail(searchUser)
        .then((response) => {
          if (response.data.successful) {
            setUsers(response.data.result);
            console.log(response.data.result);
          } else {
            console.log(response.data.errorMessage);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    const handleSearchUser = (e) =>{
      setSearchUser(e.target.value);
    }

    const handleReset = () =>{
      setPageIndex(1);
      setSearchUser('');
    }

  return (
    <div className={cardStyle.container}>
      <div className={cardStyle.searchBox}>
        <input
          type="text"
          className={cardStyle.input}
          value={searchUser}
          onChange={handleSearchUser}
        />
        &nbsp;&nbsp;
        <Button click={handleFetchUserByEmail}>
          {/* <i class="fa-solid fa-magnifying-glass"></i> */}
        </Button>
        &nbsp;&nbsp;
        <Button click={handleReset}>
          {/* <i class="fa-solid fa-magnifying-glass"></i> */}
        </Button>
      </div>

      <div className={cardStyle.cardWrapper}>
        {users?.map((e) => (
          <Card key={e.id} email={e.email} />
        ))}
      </div>

      <div className={cardStyle.buttonWrapper}>
        <Button
          width="60px"
          borderRadius="50%"
          height="60px"
          click={handlePreviousPage}
        >
          <i class="fa-solid fa-arrow-left"></i>
        </Button>
        &nbsp;
        <Button
          width="60px"
          borderRadius="50%"
          height="60px"
          click={handleNextPage}
        >
          <i class="fa-sharp fa-solid fa-arrow-right"></i>
        </Button>
      </div>
    </div>
  );
}

export default RequireAuth(Admin);