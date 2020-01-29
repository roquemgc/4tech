import { axios4Tech } from './config'

export const getPosts = async (page = 0) => {
    return await axios4Tech.get(`/user-activity/${page}`);
};

