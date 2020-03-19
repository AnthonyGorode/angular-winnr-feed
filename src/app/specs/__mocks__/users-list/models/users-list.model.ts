import {UserMock} from "./user-mock.model";

export interface UserList  {
    type: string;
    payload: {
        doc: {
            id: string,
            data: () => UserMock
        }
    }
};