import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClass, getVideo } from '../../services/Courses';
import styled from 'styled-components';
import VideoPlayer from '../../components/VideoPlayer';
import { Card } from '../../components/Card';
import { AuthContext } from '../../contexts/AuthContext';
import { checkProgress } from '../../services/Courses';

const ContainerClass = styled.div`
    width: 80%;
    margin: none;
    min-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    color: red;

    .video-row {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        width: 60%;
        margin-right: 20px;
        margin-top: 30px;
        .title-header {
            font-size: 46px;
            font-weight: normal;
            margin: 16px 0;
            .muted {
                color:#054d0b;
            }
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

const ClassPage = () => {
    const [classList, setClassList] = useState([]);
    const [videoPath, setVideoPath] = useState('');
    const [nextClassInfo, setNext] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const [lastSeen, setLastSeen] = useState(0);


    const params = useParams();
    const navigate = useNavigate();

    const getInformation = async (id, number) => {
        const currentClass = await getClass(id, number);
        const nextClass = await getClass(id, Number(number) + 1);
        const video = await getVideo(id, number);
        const progress = await checkProgress(id, userInfo.user.userId);
        setClassList(currentClass.data);
        setVideoPath(video.data);
        setNext(nextClass.data);
        setLastSeen(progress.data.lastSeen);
    };

    useEffect(() => {
        getInformation(params.id, params.number);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id, params.number]);

    const handleWatched = (value) => {
        setLastSeen(value);
    };

    return (
        <>
            <div>
                <ContainerClass>

                    <div className="video-row">
                        {videoPath !== ''
                            &&
                            <VideoPlayer
                                videoPath={videoPath}
                                courseId={params.courseId}
                                userId={userInfo.user.userId}
                                classNumber={params.classNumber}
                                handleWatched={handleWatched}
                            />
                        }
                        <div className="title-header">
                            <span className="muted">Aula: {classList.classNumber} - </span>
                            {classList.title}
                        </div>
                    </div>

                    <div className="description">
                        <h3 className="title-description">Sobre este curso</h3>
                        <p className="info-description">{classList.description}</p>
                        {
                            nextClassInfo === undefined
                                ? <Card title={"Me desculpe"} body={"Em breve vamos trazer uma nova aula para você!"} />
                                : <Card
                                    disabled={lastSeen + 1 < nextClassInfo.classNumber}
                                    title={nextClassInfo.title} onClick={() => {
                                        setVideoPath()
                                        navigate(`/aula/${params.id}/${nextClassInfo.classNumber}`)
                                    }
                                    }
                                />
                        }
                    </div>

                </ContainerClass>
            </div>
        </>
    );
};

export default ClassPage;