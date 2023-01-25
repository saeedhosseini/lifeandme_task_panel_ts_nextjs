export declare type User = {
    id: number|null,
    name: string,
    email: string,
    password: string|null,
    birthDay: Date,
    age: number,
    createdAt: Date | null
}

export function UserModelFromJson(object: any): User {
    return {
        id: object['id'],
        name: object['name'],
        email: object['email'],
        password: object['password'],
        birthDay: new Date(object['birth_day']),
        age: object['age'],
        createdAt: object['created_at'] != null ? new Date(object['created_at']) : null,
    }
}

export function UserModelToJson(user: User): Object {
    return {
        name: user.name,
        email: user.email,
        birth_day: user.birthDay.toJSON(),
        age: user.age,
        password: user.password,
    }
}