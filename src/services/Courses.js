import api from "./api";

const getListClass = async (courseId) => {
    try {
       return await api.get(`course/list/${courseId}`)
    } catch (error) {
        console('getListClassService', error)
        return error;
    }
}

export {getListClass};