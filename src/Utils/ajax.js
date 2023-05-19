export const ip='http://202.120.40.86:14642/rmp-resource-service/project/6445eac80e11cd00158d189d/resource';

export const doJSONPost = async(url, json) => {

    let opts = {
        method: "POST",
        mode:"cors",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
        // credentials: "include",
    }

    let response = await fetch(ip+ url, opts);
    let responseJSON = await response.json();
    console.log("response="+responseJSON);
    return responseJSON;
}
export const doGet = async(url) => {
    let opts = {
        method: "GET",
        headers: {
            Accept: 'application/json',
        },
        // credentials: "include"
    }

    let response = await fetch(ip + url, opts);
    let responseJSON = await response.json();
    return responseJSON;
}
export const doJSONPut = async(url, json) => {
    let opts = {
        method: "PUT",
        mode: "cors",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
        // credentials: "include"
    }

    let response = await fetch(ip + url, opts);
    let responseJSON = await response.json();
    return responseJSON;
}
export const doDelete = async(url) => {
    let opts = {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
        },
        // credentials: "include"
    }

    let response = await fetch(ip + url, opts);
    let responseJSON = await response.json();
    return responseJSON;
}
export const doCommonGet = async(url) => {
    let opts = {
        method: "GET",
        headers: {
            Accept: 'application/json',
        },
        // credentials: "include"
    }

    let response = await fetch(url, opts);
    let responseJSON = await response.json();
    return responseJSON;
}
export const  getRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};