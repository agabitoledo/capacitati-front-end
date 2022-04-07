import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { getCourseList } from '../../services/Courses';

export default function Homepage () {
    const [courseList, setCourseList] = useState([]);

    useEffect(()=>{
        getCourseList().then(( response )=> {
            setCourseList(response.data)
            console.log('dentro do useeffect', response.data)
        })
    })

    return (
        <div>
            {courseList.map((item) => <Card title={<><span>Curso: </span>{item.title}</>} body={item.description}/>
            )}
        </div>
    )
}