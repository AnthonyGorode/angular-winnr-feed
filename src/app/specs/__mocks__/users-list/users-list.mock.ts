import { UserMock } from './models/user-mock.model';
import { UserList } from './models/users-list.model';

const user: Array<UserMock> = [
    {
        created_at: "2020-03-16T17:46:07.237Z",
        email: "walberg@gmail.com",
        feeds: [],
        feeds_last_modification: "",
        firstname: "Walberg",
        lastname: "Mark",
        role: "user"
    },
    {
        created_at: "2020-03-16T17:46:07.237Z",
        email: "ruffalo@gmail.com",
        feeds: [],
        feeds_last_modification: "",
        firstname: "Ruffalo",
        lastname: "Mark",
        role: "user"
    },
    {
        created_at: "2020-03-16T17:46:07.237Z",
        email: "hamill@gmail.com",
        feeds: [],
        feeds_last_modification: "",
        firstname: "Hamill",
        lastname: "Mark",
        role: "user"
    }
];

export const userList: Array<UserList> = [
    {
        type: "added",
        payload: {
            doc: {
                id: "0mVjeO0eAFO6shiwNngM8CJ7W2G3",
                data: () => user[0]
            }
        }
    },
    {
        type: "added",
        payload: {
            doc: {
                id: "0mVjeO0eAFO6shiwNngM8CJ7W2G4",
                data: () => user[1]
            }
        }
    },
    {
        type: "added",
        payload: {
            doc: {
                id: "0mVjeO0eAFO6shiwNngM8CJ7W2G5",
                data: () => user[2]
            }
        }
    }
];