import { User } from "src/users/user.entity"


export type CurentUserType = {
    user: User,
    iat: number,
    exp: number
}