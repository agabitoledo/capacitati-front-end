import React from 'react';
import { useNavigate } from 'react-router-dom';
import UiButton from '../UserInterface/UiButton';
import styled from 'styled-components';
import * as CourseService from '../../services/Courses';
import { useParams } from 'react-router-dom';

const FormCreateClass = styled.form`
    max-width: 600px;
    margin: 4px auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
`
const InputCreateClass = styled.input`
font-family: inherit;
  border: 1px solid;
  border-bottom: 2px solid $gray;
  border-radius: 4px;
  border-color: #bebeb6dd;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 10px;
  margin: 6px;
  /* background: #458; */
  &:hover {
      border-color: #d1d12cdd;
  }
`
const CreateClassForm = (props) => {
    const [form, setForm] = React.useState({});
    const [newClass, setNewClass] = React.useState();
    const [step, setStep] = React.useState(0);
    const [videoFile, setVideoFile] = React.useState(null);

    const params = useParams;
    const navigate = useNavigate();

    React.useEffect(() => {
        CourseService.getListClass(props.courseId).then((resp) =>
            setForm({ ...form, classNumber: resp.data.length + 1 })
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.courseId]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
        setNewClass({ ...form, [name]: value })
    };

    const handleSubimit = (e) => {
        e.preventDefault();
        CourseService.createVideoClass({ ...form, courseId: params.id })
        setStep(1)
    };


    const handleUpload = async (e) => {
        e.preventDefault();
        if (videoFile === null) {
            alert('Nenhum video selecionado');
            return null;
        }
        const upload = await CourseService.videoPathUpload(videoFile, params.courseId, form.classNumber);
        navigate(`curso/${params.id}`);
        console.log(upload.data)
    };

    const getStep = () => {
        switch (step) {
            case 0:
                return (
                    <div>
                        <FormCreateClass
                            // action="" method=''
                            // onSubmit={handleSubimit}
                            {...props}
                        >
                            <InputCreateClass type='text' name='title' placeholder='Título' onChange={handleInput} value={form.title || ''} />
                            <InputCreateClass type='text' name='classNumber' placeholder='Numero da aula' onChange={handleInput} value={form.classNumber || ''} />
                            <InputCreateClass type='text' name='courseIdRefVideos' placeholder='Id do curso que a aula pertence' onChange={handleInput} value={form.courseIdRefVideos || ''} />
                            <InputCreateClass type='text' name='description' placeholder='Descrição da aula' onChange={handleInput} value={form.description || ''} />
                            <UiButton type="submit" onClick={(e)=>handleSubimit(e)}>Criar nova aula</UiButton >
                        </FormCreateClass>
                    </div>
                )

            case 1:
                return (
                <div>
                    <FormCreateClass>
                        <h5>Título da aula: {form.title}</h5>
                        <h5>Descrição: {form.description}</h5>
                        <h5>Video:</h5>
                        <input
                            id='file'
                            type='file'
                            onChange={(event) => setVideoFile(event.target.files[0])}
                        />
                        <UiButton onClick={(e) => handleUpload(e)}>Enviar</UiButton>
                    </FormCreateClass>
                </div>)
            default:
                return <h1>nao foi fewito ainda</h1>
        }
    }

    return (
        <FormCreateClass >
            {getStep()}
        </FormCreateClass>
    )
}

export default CreateClassForm;