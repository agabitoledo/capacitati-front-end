import React from 'react';
import UiButton from '../UserInterface/UiButton';
import styled from 'styled-components';
import * as CourseService from '../../services/Courses';

const FormAddCourse = styled.form`
    max-width: 600px;
    margin: 4px auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
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
const AddCourseForm = (props) => {
    const [form, setForm] = React.useState({});
    const [newCourse, setNewCourse] = React.useState();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
        setNewCourse({ ...form, [name]: value })
    };

    const handleSubimit = (e) => {
        e.preventDefault();
        CourseService.createCourse(form)
            .then((response) => {
                setNewCourse(response);
                props.updateCourse();
            }).catch((err) => { console.error('ops', err) })
            console.log('newcourse', newCourse)
    };

    return (
        <FormAddCourse
            // action="" method=''
            onSubmit={handleSubimit}
            {...props}
        >
            <InputAddCourse type='text' name='title' placeholder='Título' onChange={handleInput} value={form.title || ''} />
            <InputAddCourse type='text' name='description' placeholder='Descrição' onChange={handleInput} value={form.description || ''} />
            <UiButton type="submit">Salvar</UiButton >
        </FormAddCourse>
    )
}

export default AddCourseForm;