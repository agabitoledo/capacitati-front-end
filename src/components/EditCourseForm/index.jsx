import React from 'react';
import UiButton from '../UserInterface/UiButton';
import styled from 'styled-components';
import * as CourseService from '../../services/Courses';

const FormEditCourse = styled.form`
    max-width: 600px;
    margin: 4px auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
`
const InputAddCourse = styled.input`
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
const EditCourseForm = (props) => {
    const [form, setForm] = React.useState({});
    const [editCourse, setEditCourse] = React.useState();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
        setEditCourse({ ...form, [name]: value })
    };

    const handleSubimit = (e) => {
        e.preventDefault();
        CourseService.updateCourse(props.id, form)
            .then((response) => {
                setEditCourse(response);
                props.updateCourse();
            }).catch((err) => { console.error('ops', err) })
            console.log('newcourse', editCourse)
    };

    return (
        <FormEditCourse
            // action="" method=''
            onSubmit={handleSubimit}
            {...props}
        >
            <InputAddCourse type='text' name='title' placeholder='Título' onChange={handleInput} value={form.title || ''} />
            <InputAddCourse type='text' name='description' placeholder='Descrição' onChange={handleInput} value={form.description || ''} />
            <UiButton type="submit">Atualizar</UiButton >
        </FormEditCourse>

    )
}

export default EditCourseForm;