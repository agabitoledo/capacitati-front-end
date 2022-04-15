import api from "./api";

const getListClass = async (courseId) => {
    try {
       return await api.get(`course/list/${courseId}`)
    } catch (error) {
        console.error('getListClassService', error);
        return error;
    }
}

const getCourseList = async () => {
    try {
       return await api.get('course');
    } catch (error) {
        console.error('getCourseListService', error);
        return error;
    }
}

const getCourseById = async (courseId) => {
    try {
        return await api.get(`course/${courseId}`);
    } catch (error) {
        console.error('getCourseByIdService - erro na busca deste curso', error);
        return error;
    }
}

const createCourse = async (form) => {
    try {
        return await api.post('course', form);
    } catch (error) {
        console.error('createCourseService - Erro na criação do curso', error);
        return error;
    }
}

const  updateCourse = async (id, body) => {
    try {
        return await api.put(`course/${id}`, body);
    } catch (error) {
        console.error('updateCourseService - Erro na edição/atualização do curso', error);
        return error;
    }
}

const deleteCourse = async (id) => {
    try {
        return await api.delete(`course/${id}`);
    } catch (error) {
        console.error('deleteCourseService - Erro na exclusão do curso', error);
        return error;
    }
}

const createVideoClass = async (form) => {
    try {
        return await api.post(`course/video`, form);
    } catch (error) {
        console.error('createVideoClass - Erro na criaçãol da aula do curso', error);
        return error;
    }
}

const videoPathUpload = async (body, courseId, classNumber) => {
    let formData = new FormData();
    formData.append('videoPath', body)
    try {
        return await api.post(`course/upload/${courseId}/${classNumber}`, formData);
    } catch (error) {
        console.error('videoPathUpload - Erro no upload do video', error);
        return error;
    }
};

const getVideo = async (courseId, classNumber) => {
    try {
        return await api.get(`course/${courseId}/${classNumber}`);
    } catch (error) {
        console.error('getVideo - Erro na busca do v[ideo', error);
        return error;
    }
}

const getClass = async (courseId, classNumber) => {
    try {
        return await api.get(`course/video/${courseId}/${classNumber}`);
    } catch (error) {
        console.error('get class - Erro na busca do v[ideo', error);
        return error;
    }
}
export {getListClass, getCourseList, getCourseById, createCourse, updateCourse, deleteCourse, createVideoClass, videoPathUpload, getVideo, getClass};