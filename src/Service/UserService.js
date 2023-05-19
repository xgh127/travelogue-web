import {doDelete, doGet, doJSONPost} from "../Utils/ajax";
import {message} from "antd";
import {Constant} from "../Utils/constant";
const bcrypt = require('bcryptjs');
/**
 * 查询用户
 * @param username 用户名
 * @returns {Promise<any>}
 */
export const getUser = async (username) => {
    let url = "/User/?User.UserName=" + username;
    return await doGet(url)
};
/**
 * 添加用户
 * @param user 用户信息
 * @returns {Promise<any>}
 */
export const postUser = (user) => {
    let url = "/User";
    return doJSONPost(url, user)
};
/**
 * 修改用户
 * @param user 修改的用户信息
 * @returns {Promise<any>}
 */
export const putUser = (user) => {
    let url = "/User";
    return doJSONPost(url, user)
};
/**
 * 删除用户
 * @param username
 * @returns {Promise<any>}
 */
export const deleteUser = (username) => {
    let url = "/User/?User.UserName=" + username;
    return doDelete(url)
};
export const loginCheck = async (rawPassword, resp) => {
    if (resp.code !== 0) {
        message.error(resp.message);
    } else if (resp.data === null) {
        message.error("用户名不存在");
    } else {
        // alert(resp.data[0].password);
        try {
            const res = await new Promise((resolve, reject) => {
                bcrypt.compare(rawPassword, resp.data[0].UserAuth.password, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            return res;
        } catch (error) {
            console.error(error);
        }
    }

    return false;
};
export const getUserByUserName=async (username) => {
    let url = "/User/?User.UserName=" + username;
    // alert("enter getUserByUserName")
    return await doGet(url)
};

export const logout=()=>
{
    localStorage.removeItem(Constant.USER);
    console.log( localStorage.getItem(Constant.USER));
    message.success("删除localstorage，退出成功！");
};
export const checkLogin=()=>{
    return localStorage.getItem(Constant.USER) !== null;

};
