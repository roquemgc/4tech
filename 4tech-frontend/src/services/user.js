import { axios4Tech } from './config'

export const user = {
    register: async (userLogin, userName, password) => {
        return await axios4Tech.post('/user', {
            userLogin,
            userName,
            password
        });
    }
}   