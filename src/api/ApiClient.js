import axios from "axios";
import ApiRoutes from "./ApiRoutes";


 axios.defaults.baseURL = ApiRoutes.BASE_URL;

 // Hook to fetch thousand questions
 export function useFetchThousandQuestions(){
    async function fetchThousandQuestions(token) {
        var response = axios.get(ApiRoutes.FetchThousandQuestions, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    }

    return fetchThousandQuestions;
 }

 // Hook to add question to revision table
 export function useAddRevisionQuestion(){
    async function addRevisionQuestion(question, token){
        var response = axios.post(
            ApiRoutes.AddRevisionQuestion, question, {
                headers: {Authorization: `Bearer ${token}`}
            }
        )

        return response;
    }

    return addRevisionQuestion;
 }

 // Hook to fetch revision questions
 export function useFetchRevisionQuestions(){
    async function fetchRevisionQuestions(token){
        var response = axios.get(
            ApiRoutes.FetchRevisionQuestions,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return response;
    }

    return fetchRevisionQuestions;
 }

 // Hook to fetch fesor questions
 export function useFetchFesorQuestions(){
    async function fetchFesorQuestions(token){
        var response = axios.get(ApiRoutes.FetchFesorQuestions, {
            headers: {Authorization: `Bearer ${token}`}
        });

        return response;
    }

    return fetchFesorQuestions;
 }

 // Hook to login user
 export function useLoginUser(){
    async function loginUser(formData){
        var response = axios.post(ApiRoutes.LoginUser, formData)

        return response;
    }

    return loginUser;
 }

 // Hook to register a user
 export function useRegisterUser(){
    async function registerUser(formData){
        var response = axios.post(ApiRoutes.RegisterUser, formData)

        return response;
    }

    return registerUser;
 }

 export function useFetchUsers(){
    async function fetchUsers(pageIndex){
        var response = axios.get(`${ApiRoutes.FetchAllUsers}?pageIndex=${pageIndex}`);

        return response;
    }

    return fetchUsers;
 }

 export function useGrantAccess(){
    async function grantAccess(email){
        var response = axios.get(`${ApiRoutes.GrantAccess}?email=${email}`);

        return response;
    }

    return grantAccess;
 }

 export function useFetchUserByEmail(){
    async function fetchUserByEmail(email){
        var response = axios.get(`${ApiRoutes.FetchUser}?email=${email}`)

        return response;
    }

    return fetchUserByEmail;
 }