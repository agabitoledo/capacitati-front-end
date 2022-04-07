import api from "./api";

const getListClass = async (courseId) => {
    try {
       return await api.get(`course/list/${courseId}`)
    } catch (error) {
        console('getListClassService', error)
        return error;
    }
}

const getCourseList = async () => {
    try {
       return await api.get('course')
    } catch (error) {
        console('getCourseListService', error)
        return error;
    }
}
export {getListClass, getCourseList};