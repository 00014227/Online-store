import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {observer} from 'mobx-react-lite'
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
         
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)

        } catch (e) {
            alert(e.response.data.message)
        }
      
    
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}>

            <Card style={{ width: 600 }} className="p-5">
                <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className='d-felx flex-column'>
                    <Form.Control
                        className='mt-2'
                        placeholder='Enter your email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Enter your password...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                        <div>

                            Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                        </div>
                        :
                        <div>
                            Have account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
                        </div>
                        }
                        <Button  variant={"outline-success"} onClick={click}>
                            
                            {isLogin ? "Log in" : "Registration"}
                        </Button>
                    </Row>

                </Form>
            </Card>

        </Container>
    );
});

export default Auth;