import {User, UserModelFromJson, UserModelToJson} from "@/app/models/User";
import {BASE_URL} from "@/app/util/global";

//todo create custom class for fetch to handle token and Json stringify and avoid repeating

export const login = async (email: string, password: string) => {
    const res = await fetch(BASE_URL + 'auth/login', {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            'password': password
        })
    });

}