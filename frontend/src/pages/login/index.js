import React, {useState, useCallback} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import SignUpPopUp from './popUp/signUp';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import {auth} from '../../services/authService';

export function LogIn ({isLoged}){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('password');
    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);

    const showHide = useCallback(() => {
        const newType = type === 'text' ? 'password' : 'text';
        setType(newType);
    });

    const handleSubmit = useCallback(async (event) => {       
        event.preventDefault();
        event.stopPropagation();
    
        if(!validated){
            setValidated(validated => !validated);
        }
    
        if(!username || !password || username === '' || password === '')
          return;  

        auth({
            username : username,
            password : password
        }).then(
            response => {
                if(response.status === 200){
                    console.log('Autenticacion correcta');
                    isLoged();
                }else{
                    console.log('Fallo autenticacion');
                }
            }
        );
    });

    const toggleSigIn = useCallback(() => {
        setShowModal(showModal => !showModal);
    });

    return (
        <div className='p-5 mb-100 bg-light text-black'>
            <Container fluid>
                <Row>
                    <Col md={{span: 6, offset:3}}>
                        <br/>
                        <h1>Log In</h1>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 6, offset:3}}>
                        <Form onSubmit={handleSubmit} noValidate validated={validated}>
                            <Card>
                                <Card.Body>
                                    <Form.Group as={Row} className='_6lux' controlId="formUsername">
                                        <InputGroup>
                                            <FloatingLabel className='group-first-element'>
                                                <Form.Control name="username" type="text" placeholder="Username" required
                                                    value={username} 
                                                    onChange={(event) => {setUsername(event.target.value)}}/>
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                                <label style={{paddingLeft:0, marginLeft: '1em'}}>UserName</label>   
                                            </FloatingLabel>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Row} className='_6lux' controlId="formPassword">
                                        <InputGroup>
                                            <FloatingLabel className='group-first-element'> 
                                                <Form.Control className="form-control-rounded" 
                                                    name="password" required
                                                    id="password" type={type} placeholder="Password" 
                                                    value={password}                                                    
                                                    onChange={(event) => {setPassword(event.target.value)}}/>                                               
                                                <label style={{paddingLeft:0, marginLeft: '1em'}}>Password</label>   
                                            </FloatingLabel>
                                            <Button variant="outline-secondary"
                                                    onClick={showHide}
                                                    size="sm">
                                                    {
                                                        type === 'text'?<AiFillEye color='black'/>:<AiFillEyeInvisible color='black'/>
                                                    }
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Row className='_6lux'>
                                        <div className="d-grid gap-2">
                                            <Button variant="primary" type='submit'>
                                                Log In
                                            </Button>
                                        </div>
                                        <div className="d-grid gap-2 pt-1" onClick={toggleSigIn}>
                                            <Button variant="primary" >
                                                Sign Up
                                            </Button>
                                        </div>
                                        <SignUpPopUp show={showModal} setUser={setUsername} handleClose={toggleSigIn} position="right center"/>
                                    </Row>                             
                                </Card.Body>
                            </Card>  
                        </Form>
                    </Col>   
                </Row>   
            </Container>
        </div>
    );
}

export default LogIn