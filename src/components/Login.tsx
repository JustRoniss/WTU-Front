import { useState } from 'react';
import './../styles/login.css'
import useClass from './../hooks/add-class-body'
import { useNavigate } from 'react-router-dom';
import {
   Container,
   Col,
   Form,
   Input,
   InputGroup,
   Row,
   Card,
   CardBody,
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,

} from 'reactstrap'

const handleLogin = () => {
    alert("Handle login");
    console.info("Http request para login ainda nao desenvolvida");
}



const Login = () => {
    useClass('page-login')
    let navigate = useNavigate();

    const HandleNavigation = () => {
        navigate('/create-account'); 
    };
   
    const [modalForgot, setModalForgot] = useState(false); 
    const toggle = () => setModalForgot(!modalForgot)

    return (
        <div className="login-container">
              <Container>
                <Row className="justify-content-center align-items-center login-row">
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <Form>
                                    <div className="text-center mb-4">
                                        <h1>Wise to Us</h1>
                                        {/* colocar logo  */}
                                    </div>
                                    <InputGroup className="mb-3">
                                        <Input type="text" placeholder="E-mail"/>
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <Input type="password" placeholder="Senha"/>
                                    </InputGroup>

                                    <Row form>
                                        <Col>
                                            <Button color="primary" onClick={handleLogin}>Acessar!</Button>
                                        </Col>
                                        <Col className="text-right">
                                            <Button color="link" onClick={toggle}>Esqueci a senha</Button>
                                        </Col>
                                    </Row>
                                </Form>

                                <p className='mt-5 text-center'>Não possui uma conta?</p>
                                <div className='button-container'>
                                    <Button className='heartbeat button-53 btn-lg rd-2' color="primary" onClick={HandleNavigation}>Cadastre-se</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>


            <Modal isOpen={modalForgot} toggle={toggle}>
                <ModalHeader toggle={toggle}>Recuperação de Senha</ModalHeader>
                <ModalBody>
                    <Form>
                        <InputGroup className="mb-3">
                            <Input type="email" placeholder="Digite seu e-mail" />
                        </InputGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Enviar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default Login;