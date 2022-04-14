import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import TestPage from '../pages/TestPage';
import Homepage from '../pages/Homepage';
import CoursePage from '../pages/CoursePage';
import Administrator from '../pages/Administrator';
import CreateClassPage from '../pages/CreateClassPage';

const AllRotes = () => {
    return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/curso/:id" element={<CoursePage />} />
                <Route path="/nova-aula/:courseId" element={<CreateClassPage />} />
                <Route path="/admin" element={<Administrator />} />
                <Route path="/teste" element={<TestPage />} />
            </Routes>
    )
}

export default AllRotes;
