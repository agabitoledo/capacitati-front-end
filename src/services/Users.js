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

const createUser = async (form) => {
    try {
        return await api.post('user', form)
    } catch (error) {
        console.log("erro ao criar o usuario", error);
        return error
    }
}

const deleteUser = async (id) => {
    try {
        return await api.delete(`user/${id}`);
    } catch (error) {
        console.error('Erro na exclusão do usuário', error);
        return error;
    }
}

const updateUser = async (id, body) => {
    try {
        return await api.put(`user/${id}`, body);
    } catch (error) {
        console.error('Erro na edição/atualização do usuário', error);
        return error;
    }
}


export {getUserList, login, createUser, deleteUser, updateUser};