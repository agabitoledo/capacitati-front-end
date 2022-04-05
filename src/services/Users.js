import api from "./api";
const getUserList = async () => {
    try {
        return await api.get('user')
    } catch (error) {
        console.log(error);
        return error
    }
}
const login = form => {
    try {
        return api.post('user/login', form)
    } catch (error) {
        console.log('Erro no login: ', error);
        return error;
    }
}

export {getUserList, login};