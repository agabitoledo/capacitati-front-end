import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SideBar from '../../components/Sidebar';
import { getCourseList, deleteCourse } from '../../services/Courses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/UserInterface/Modal';
import AddCourseForm from '../../components/AddCourseForm';
import EditCourseForm from '../../components/EditCourseForm';

const PanelStyled = styled.div`
    display: ${props => props.activeTab ? 'flex' : 'none'};
    box-sizing: border-box;
    width: 100%;
    padding: 16px 5% 0 calc(300px + 5%);
    justify-content: space-between;
    flex-direction: column;
    font-size: 18px;
    color: #452;
`
const ListStyled = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
`;

const LiStyled = styled.li`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    //TODO: COLOCAR PROPS DE COR DEPOIS DE PALETA DEFINIDA
    color: purple;
    background: ${(props) => props.index % 2 === 1 ? 'white' : 'pink'};
    padding: 16px;
`;

const IconEditButton = styled(FontAwesomeIcon)`
    color: red;
    background: none;
    outline: none;
    border: none;
    font-size: 1.2rem;
    color: #333;
    padding-left: 10px;
`

const IconAddButton = styled(FontAwesomeIcon)`
    color: red;
    background: none;
    outline: none;
    border: none;
    font-size: 1.2rem;
    color: #333;
    padding-left: 10px;
`
const Administrator = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [typeOfForm, setType] = useState('add');
    const [coursesList, setCoursesList] = useState([]);
    const [isOpen, setOpen] = React.useState(false);
    const [courseId, setCourseId] = useState();

    const params = useParams();
    const sidebarOptions = [
        {
            label: 'Gerenciar Cursos',
            id: 0
        },
        {
            label: 'Gerenciar Alunos',
            id: 1
        },
        {
            label: 'Perfil',
            id: 2
        },
    ];

    const refreshListCourse = () => {
        getCourseList().then((response) => {
            setCoursesList(response.data);
        });
    }
    useEffect(() => {
        refreshListCourse();
    }, []);

    const chooseForm = () => {
        switch (typeOfForm) {
            case 'edit':
                return <EditCourseForm
                    id={courseId}
                    updateCourse={() => {
                        refreshListCourse();
                        setOpen(false);
                    }} />

            case 'add':
                return <AddCourseForm
                    updateCourse={() => {
                        refreshListCourse();
                        setOpen(false);
                    }} />

            default:
                break;
        }
    }
    return (
        <div>
            {
                isOpen &&
                <Modal onClose={() => setOpen(false)}>
                    {
                        chooseForm()
                    }
                </Modal>
            }

            <SideBar props={sidebarOptions} handleSelect={(value) => setActiveTab(value)} activeTab={activeTab} />
            <PanelStyled activeTab={activeTab === 0}>
                <h1 className="title-panel">{sidebarOptions[activeTab].label}</h1>
                <ListStyled>
                    {
                        coursesList.map((item, index) => (
                            <LiStyled index={index} key={`${item.courseId}-item`}>
                                {item.title}
                                <span>
                                    <IconEditButton teste={'edit'} icon={faPenToSquare} onClick={() => {
                                        setCourseId(item.courseId)
                                        setType('edit')
                                        setOpen(true)
                                    }} />

                                    <IconEditButton icon={faXmark} onClick={() => {
                                        //TODO: CRIAR MODAL DE CONFIRMAÇÃO
                                        deleteCourse(item.courseId).then(() => {
                                            refreshListCourse();
                                        })
                                    }} />
                                </span>
                            </LiStyled>
                        ))
                    }
                    <LiStyled >
                        <span key={'add-curso'} onClick={() => {
                            setType('add')
                            setOpen(true)
                        }}>
                            Adicionar curso <IconAddButton onClick={() => setOpen(true)} icon={faCirclePlus} />
                        </span>
                    </LiStyled>
                </ListStyled>
            </PanelStyled>

            <PanelStyled activeTab={activeTab === 1}>
                <h1 className="title-panel">{sidebarOptions[activeTab].label}</h1>
            </PanelStyled>

            <PanelStyled activeTab={activeTab === 2}>
                <h1 className="title-panel">{sidebarOptions[activeTab].label}</h1>
            </PanelStyled>
            <h1>dosjhdoaijdoaj {params.bulhufas}</h1>
        </div>
    )
}

export default Administrator;