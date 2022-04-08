import api from "./api";

const getListClass = async (courseId) => {
    try {
       return await api.get(`course/list/${courseId}`)
    } catch (error) {
        console.error('getListClassService', error)
        return error;
    }
}

const getCourseList = async () => {
    try {
       return await api.get('course')
    } catch (error) {
        console.error('getCourseListService', error)
        return error;
    }
}

const getCourseById = async (courseId) => {
    try {
        return await api.get(`course/${courseId}`)
    } catch (error) {
        console.error('getCourseByIdService - erro na busca deste curso', error)
        return error;
    }
}

export {getListClass, getCourseList, getCourseById};