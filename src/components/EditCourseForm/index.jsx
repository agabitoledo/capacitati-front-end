import React from 'react';
import UiButton from '../UserInterface/UiButton';
import styled from 'styled-components';
import * as CourseService from '../../services/Courses';

const FormEditCourse = styled.form`
    max-width: 450px;
    height: 200px;
    margin: 4px auto;
    padding: 8px;
    display: flex;
    flex-direction: column;

    .ui-button-atualizar {
            background-color: #1F1919;
            border-color: #1F1919;
            color: #f594a7;
        &:hover {
            background-color: #f594a7cf;
            color: #1F1919;
            }
        }
`
const InputAddCourse = styled.input`
font-family: inherit;
  border: 2px solid;
  border-bottom: 2px solid $gray;
  border-radius: 4px;
  border-color: #bebeb6dd;
  outline: 1;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 10px;
  margin: 6px;
  &:hover {
      border-color: #f0b1c0;
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
            <UiButton className="ui-button-atualizar" type="submit">Atualizar curso</UiButton >
        </FormEditCourse>

    )
}

export default EditCourseForm;