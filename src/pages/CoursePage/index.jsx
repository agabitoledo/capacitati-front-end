import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById, getListClass } from '../../services/Courses';
import { Card } from '../../components/Card';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import UiButton from '../../components/UserInterface/UiButton';

const CourseContainer = styled.div`
    width: 80%;
    margin: none;
    min-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    color: red;

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
        color: purple;
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

const CoursePage = () => {
    const [classList, setClassList] = useState([]);
    const [courseInfo, setCourseInfo] = useState({});
    const { isAdmin } = React.useContext(AuthContext);

    const params = useParams();
    const navigate = useNavigate();

    const getInformation = async (id) => {
        const classes = await getListClass(id);
        const course = await getCourseById(id);
        setClassList(classes.data);
        setCourseInfo(course.data[0]);
    };

    useEffect(() => {
        getInformation(params.id);
    }, [params.id]);

    return (
        <>
            <div>
                <CourseContainer>
                    <div className="list-row">
                        <div className="title-header">{courseInfo.title}</div>
                        {
                            isAdmin &&
                            <UiButton onClick={() => navigate(`/nova-aula/${courseInfo.courseId}`)}>Adicionar aula</UiButton>
                        }
                        {
                            classList && classList.map((item) => (
                                <Card
                                    key={item.id}
                                    onClick={() => navigate(`/aula/${courseInfo.courseId}/${item.classNumber}`)}
                                    title={<><b>Aula {item.number}: </b> {item.title} </>}
                                    body={item.description}
                                />
                            ))
                        }
                    </div>
                    <div className="description">
                        <h3 className="title-description">Sobre este curso</h3>
                        <p className="info-description">{courseInfo.description}</p>
                    </div>
                </CourseContainer>
            </div>
        </>
    )
}

export default CoursePage;