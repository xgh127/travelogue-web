import {doGet} from "../Utils/ajax";

export const getUserAuthByUserName=async (username) => {
    return await doGet('/UserAuth/?UserAuth.UserName=' + username)
}