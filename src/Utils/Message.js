import {message} from "antd";

export const LoginSuccessFully=()=>
{
    message.success("验证通过！欢迎来到交游记！");
}
export const  RegisterSuccessMsg=() =>
{
    message.success("注册成功！交游记欢迎你的加入！");
}
export const  RegisterFailMsg=() =>
{
    message.error("注册失败！请检查你的信息！");
}

export const  PostSuccessMsg=() =>
{
    message.success("发布成功！");
}

export const  PostFailMsg=() =>
{
    message.error("发布失败！请检查你的信息！");
}