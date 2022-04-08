import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { getCourseList } from '../../services/Courses';
import styled from 'styled-components';

const ListRow = styled.div`
    width: 80%;
    margin: auto;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
`

export default function Homepage() {
    const [courseList, setCourseList] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getCourseList().then((response) => {
            setCourseList(response.data)
            console.log('dentro do useeffect', response.data)
        })
    })

    return (
        <div>
            <ListRow>
                {
                    courseList.map((item) => (
                        <Card
                            key={item.id + '-course'}
                            title={<><span>Curso: </span>{item.title}</>}
                            body={item.description}
                            onClick={() => navigate(`/aula/${item.courseId}`)} //Id is the CourseId, in this case.
                        />
                    ))
                }
            </ListRow>

        </div>
    )
}