import { FormEvent, useState } from "react";
import { useRive } from "@rive-app/react-canvas";
import "./../styles/login.css";
import { Radio, RadioChangeEvent, Space } from "antd";
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
  Label
} from "reactstrap";


const LoginForm = () => {
  const [modalForgot, setModalForgot] = useState(false);
  const toggle = () => setModalForgot(!modalForgot);

  const handleLogin = () => {
    alert("Handle login");
    console.info("Http request para login ainda nao desenvolvida");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InputGroup className="mb-3 w-50">
          <Input type="text" placeholder="E-mail" />
        </InputGroup>
        <InputGroup className=" w-50">
          <Input type="password" placeholder="Senha" />
        </InputGroup>
      </div>
      <Row >
        <Col className="">
          <Button color="link" onClick={toggle}>
            Esqueci a senha
          </Button>
        </Col>
      </Row>
      <div className="button-container">
        <Button
          className="heartbeat button-53 btn-lg rd-2"
          color="primary"
          onClick={handleLogin}
        >
          Acessar!
        </Button>
      </div>

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
    </>
  );
};


const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasNumber && hasUpper && hasLower && hasSpecial;
  };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError('As senhas não coincidem.');
    } else if (!validatePassword(password)){
      setError('A senha deve conter ao menos 8 caracteres, incluindo números, letras maiúsculas, letras minúsculas e caracteres especiais.');
      return;
    }
    else {
      setError('');
      console.log('Submit:', { fullName, email, password });
      // Envio pro backend aqui
    }
  };
  return (
    <Form className="sign-up-form" onSubmit={handleSignUp}>
      <div className="input-group-horizontal">
        <div className="input-half">
          <Label for="fullNameInput">Digite seu nome completo</Label>
          <Input id="fullNameInput" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="input-half">
          <Label for="emailInput">Digite seu e-mail</Label>
          <Input id="emailInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div className="input-group-horizontal mt-3">
        <div className="input-half">
          <Label for="passInput">Digite a senha</Label>
          <Input id="passInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-half">
          <Label for="repeatPassInput">Repita a senha</Label>
          <Input id="repeatPassInput" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>
      </div>
      <div className='button-container'>
        <Button type="submit" color="primary" className="button-53 heartbeat w-100 mt-5">Criar conta</Button>
      </div>
    </Form>
  );
};


const Login = () => {
  const [radioOption, setRadioOption] = useState("login");


  const onchange = ({ target: { value } }: RadioChangeEvent) => {
    setRadioOption(value);
  };

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
          <Col md="8" className="d-flex align-items-center p-0">
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
              <div className="text-center mb-4">
                <h1>Wise to Us</h1>
                {/* colocar logo  */}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Space direction="horizontal" className="mb-4">
                  <Radio.Group onChange={onchange} value={radioOption}>
                    <Radio.Button value="login">Login</Radio.Button>
                    <Radio.Button value="cadastro">Cadastro</Radio.Button>
                  </Radio.Group>
                </Space>
              </div>
              {radioOption === "login" ? <LoginForm /> : <SignUpForm />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
