import { User } from "../entity/User.entity";
import { UserDto } from "./User.dto";

export const toUserDto = (data: User): UserDto => {  
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};