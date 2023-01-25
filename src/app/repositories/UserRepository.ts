import {User, UserModelFromJson, UserModelToJson} from "@/app/models/User";
import {BASE_URL} from "@/app/util/global";
import {PaginationData} from "@/app/models/PaginationData";

//todo create custom class for fetch to handle token and Json stringify and avoid repeating

export const indexUser = async (page: number) => {
    const res = await fetch(BASE_URL + 'users?page=' + page, {
        method: "GET",
        headers: {
            //    'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    });
    return (await res.json()).data as PaginationData<Object>
}

export const addUser = async (user: User) => {
    const res = await fetch(BASE_URL + 'users', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            //      'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(UserModelToJson(user)),
    });
}

export const updateUser = async (user: User) => {
    const res = await fetch(BASE_URL + 'users/' + user.id, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            //       'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(UserModelToJson(user)),
    });
}

export const removeUser = async (userID: number) => {
    const res = await fetch(BASE_URL + 'users/' + userID, {
        method: "DELETE",
        headers: {
            //        'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
    });
}