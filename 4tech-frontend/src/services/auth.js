import { axios4Tech } from './config'

export const login = async (userLogin, password) => {
    try {
        const response = await axios4Tech.post('/auth/login', {
            userLogin,
            password
        });

        if(response.status >= 200 && response.status < 300){
            localStorage.setItem('token', response.data.acess_token);
            localStorage.setItem('userId', response.data._id);

            return response;
        }
    } catch (err) {
        return err
    }   
}