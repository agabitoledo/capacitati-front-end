import React from 'react';
import Counter from '../../components/Counter';
import Modal from '../../components/Modal';
import '../../assets/style.scss';
import LoginForm from '../../components/LoginForm';
import * as UserService from '../../services/Users'


function TestePage() {
  const [isModalVisible, setIsModalVisible] = React.useState(false)


  React.useEffect(() => {
    UserService.getUserList()
      .then((response) => console.log(response.data))
      .catch((err) => { console.error('ops! ocorreu um erro' + err) });
  }, [])

  return (
    <>
        <div>
          <Counter initial={0} />
          <button onClick={(e) => setIsModalVisible(true)}>Open</button>
          {isModalVisible ?
            <Modal onClose={() => setIsModalVisible(false)}>
              <h1>MODAL</h1>
              <LoginForm />
            </Modal> : null}
        </div>
        
    </>
  );
}

export default TestePage;
