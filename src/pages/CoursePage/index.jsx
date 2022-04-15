import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { checkProgress, generatePdf, getCourseById, getListClass } from '../../services/Courses';
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
    const [lastSeen, setLastSeen] = useState(0);
    const { isAdmin, userInfo } = React.useContext(AuthContext);

    const params = useParams();
    const navigate = useNavigate();

    const getInformation = async (courseId, userId) => {
        const classes = await getListClass(courseId);
        const course = await getCourseById(courseId);
        const progress = await checkProgress(courseId, userId)
        setClassList(classes.data);
        setCourseInfo(course.data[0]);
        setLastSeen(progress.data.lastSeen);

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
                                    disabled={lastSeen + 1 < item.classNumber }
                                    key={item.id}
                                    onClick={() => {
                                       if(lastSeen + 1 >= item.classNumber) navigate(`/aula/${courseInfo.courseId}/${item.classNumber}`)
                                    }}
                                    title={<><b>Aula {item.number}: </b> {item.title} </>}
                                    body={item.description}
                                />
                            ))
                        }
                    </div>
                    <div className="description">
                        <h3 className="title-description">Sobre este curso</h3>
                        <p className="info-description">{courseInfo.description}</p>
                        <UiButton onClick={()=> generatePdf(params.id, userInfo.user.userId)}>
                            Download do certificado
                        </UiButton>
                    </div>
                </CourseContainer>
            </div>
        </>
    )
}

export default CoursePage;