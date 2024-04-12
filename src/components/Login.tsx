import { useState } from "react";
import { useRive } from "@rive-app/react-canvas";
import "./../styles/login.css";
import useClass from "./../hooks/add-class-body";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Col,
  Form,
  Input,
  InputGroup,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const handleLogin = () => {
  alert("Handle login");
  console.info("Http request para login ainda nao desenvolvida");
};

const Login = () => {
  useClass("page-login");
  let navigate = useNavigate();

  const HandleNavigation = () => {
    navigate("/create-account");
  };

  const [modalForgot, setModalForgot] = useState(false);
  const toggle = () => setModalForgot(!modalForgot);

  const { rive, RiveComponent } = useRive({
    src: "./../../public/orange_guy_cat.riv",
    stateMachines: "idle",
    autoplay: true,
  });

  const handleMouseEnter = () => {
    if (rive) {
      rive.play("Cat");
    }
  };

  const handleMouseLeave = () => {
    if (rive) {
      rive.play("idle");
    }
  };

  return (
    <div className="login-container">
      <Container fluid className="h-100">
        <Row className="h-100 no-gutters">
          <Col md="8" className="d-flex align-items-center">
            <div className="container-animation w-100 h-100">
              <RiveComponent
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </Col>
          <Col md="4" className="d-flex align-items-center justify-content-center">
            <div className="login-form-container">
              <Form>
                <div className="text-center mb-4">
                  <h1>Wise to Us</h1>
                  {/* colocar logo  */}
                </div>
                <InputGroup className="mb-3">
                  <Input type="text" placeholder="E-mail" />
                </InputGroup>

                <InputGroup className="mb-3">
                  <Input type="password" placeholder="Senha" />
                </InputGroup>

                <Row form>
                  <Col className="">
                    <Button color="link" onClick={toggle}>
                      Esqueci a senha
                    </Button>
                  </Col>
                </Row>
              </Form>
   
              <div className="button-container">
                <Button
                  className="heartbeat button-53 btn-lg rd-2"
                  color="primary"
                  onClick={HandleNavigation}
                >
                  Acessar!
                </Button>
              </div>
            </div>
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
          <Button color="primary" onClick={toggle}>
            Enviar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Login;
