import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import TestPage from '../pages/TestPage';
import Homepage from '../pages/Homepage';
import CoursePage from '../pages/CoursePage';
import Administrator from '../pages/Administrator';

const AllRotes = () => {
    return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/aula/:id" element={<CoursePage />} />
                <Route path="/admin" element={<Administrator />} />
                <Route path="/teste" element={<TestPage />} />
            </Routes>
    )
}

export default AllRotes;
