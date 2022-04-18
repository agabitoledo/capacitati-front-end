import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SideBar from '../../components/Sidebar';
import { getCourseList, deleteCourse } from '../../services/Courses';
import { getUserList, deleteUser } from '../../services/Users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/UserInterface/Modal';
import AddCourseForm from '../../components/AddCourseForm';
import EditCourseForm from '../../components/EditCourseForm';
import CreateUserForm from '../../components/CreateUserForm';
import EditUserForm from '../../components/EditUserForm';
import Perfil from '../../components/Perfil';

const PanelStyled = styled.div`
    display: ${props => props.activeTab ? 'flex' : 'none'};
    box-sizing: border-box;
    width: 100%;
    padding: 16px 5% 0 calc(300px + 5%);
    justify-content: space-between;
    flex-direction: column;
    font-size: 18px;
    color: #CA546B;
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
    color: #222122;
    background: ${(props) => props.index % 2 === 1 ? 'white' : '#f594a7c2'};
    padding: 16px;
    margin: 2px;
    border-radius: 8px;
    &:hover{
    background-color: #CA546B;
    color: #ececec;
    }

`;

const IconEditButton = styled(FontAwesomeIcon)`
    background: none;
    outline: none;
    border: none;
    font-size: 1.2rem;
    color: #333;
    padding-left: 10px;
    &:hover{
    color: #ececec;
    }
`

const IconAddButton = styled(FontAwesomeIcon)`
    background: none;
    outline: none;
    border: none;
    font-size: 1.2rem;
    color: #333;
    padding-left: 10px;
    &:hover{
    color: #ececec;
    }
`
const Administrator = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [typeOfForm, setType] = useState('add');
    const [coursesList, setCoursesList] = useState([]);
    const [userList, setuserList] = useState([])
    const [isOpen, setOpen] = React.useState(false);
    const [courseId, setCourseId] = useState();
    const [userId, setUserId] = useState();

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

    const refreshListUser = () => {
        getUserList().then((response) => {
            setuserList(response.data);
        });
    }
    useEffect(() => {
        refreshListUser();
    }, []);

    const chooseForm = () => {
        switch (typeOfForm) {
            case 'edit-curso':
                return <EditCourseForm
                    id={courseId}
                    updateCourse={() => {
                        refreshListCourse();
                        setOpen(false);
                    }} />

            case 'add-curso':
                return <AddCourseForm
                    updateCourse={() => {
                        refreshListCourse();
                        setOpen(false);
                    }} />

            case 'add-user':
                return <CreateUserForm
                    updateUser={() => {
                        refreshListUser();
                        setOpen(false);
                    }} />

            case 'edit-user':
                return <EditUserForm
                    updateUser={() => {
                        refreshListUser();
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
                                    <IconEditButton icon={faPenToSquare} onClick={() => {
                                        setCourseId(item.courseId)
                                        setType('edit-curso')
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
                    <LiStyled className='teste' >
                        <span key={'add-curso'} onClick={() => {
                            setType('add-curso')
                            setOpen(true)
                        }}>
                            Adicionar curso <IconAddButton onClick={() => setOpen(true)} icon={faCirclePlus} />
                        </span>
                    </LiStyled>
                </ListStyled>
            </PanelStyled>

            <PanelStyled activeTab={activeTab === 1}>
                <h1 className="title-panel">{sidebarOptions[activeTab].label}</h1>
                {
                    userList.map((item, index) => (
                        <LiStyled index={index} key={`${item.userId}-item`}>
                            {item.firstName + '    |    ' + item.email}
                            <span>
                                <IconEditButton icon={faPenToSquare} onClick={() => {
                                    setUserId(item.userId)
                                    setType('edit-user')
                                    setOpen(true)
                                }} />

                                <IconEditButton icon={faXmark} onClick={() => {
                                    deleteUser(item.userId).then(() => {
                                        refreshListUser();
                                    })
                                }} />
                            </span>
                        </LiStyled>
                    ))
                }
                <LiStyled >
                    <span  key={'add-user'} onClick={() => {
                        setType('add-user')
                        setOpen(true)
                    }}>
                        Adicionar usuário <IconAddButton onClick={() => setOpen(true)} icon={faCirclePlus} />
                    </span>
                </LiStyled>
            </PanelStyled>

            <PanelStyled activeTab={activeTab === 2}>
                <h1 className="title-panel">{sidebarOptions[activeTab].label}</h1>
                <Perfil />
            </PanelStyled>
        </div>
    )
}

export default Administrator;