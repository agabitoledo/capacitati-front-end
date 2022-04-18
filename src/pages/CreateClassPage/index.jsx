import React  from 'react';
import styled from 'styled-components';
import CreateClassForm from '../../components/CreateClassForm';
import { getListClass } from '../../services/Courses';
import { useParams } from 'react-router-dom';

const CreateClassContainer = styled.div`
    width: 80%;
    margin: none;
    min-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;

    .list-row {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        width: 60%;
        margin-right: 20px;
        .title-header {
            font-size: 58px;
            font-weight: normal;
            margin: 16px 0;
        }
    }

    .description {
        width: 35%;
        color: #1A1414;
        margin-top: 24px;
        .title-description{
            font-size: 32px;
            font-weight: normal;
            margin: 8px 0;
        }
        .info-description {
            font-size: 16px;
            line-height: 1.4;
        }
    }
`

const CreateClassPage = (props) => {
    const [list, setList] = React.useState([]);

    const listagemDeAulas = async (courseId) => {
        const listagem = await getListClass(courseId);
        setList(listagem.data)
    }

    console.log('sera que foi', listagemDeAulas)
    console.log(' foi', list)
    const params = useParams();

    return (
        <div>
            <CreateClassContainer>
                    <CreateClassForm courseId={params.courseId}/>
            </CreateClassContainer>
        </div>
    )
}

export default CreateClassPage;