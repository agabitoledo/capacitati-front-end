import React from 'react';
import './assets/style.scss';
import Header from './components/UserInterface/Header';
import AllRotes from './routes/allRotes.js';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';

export const PageContainer = styled.div`
  padding-top: 80px;
  padding-left: 48px;
`
function App(props) {
  return (
    <BrowserRouter>
      <Header {...props} />
      <PageContainer>
        <AllRotes />
      </PageContainer>
    </BrowserRouter>
  );
}

export default App;