import React, { useContext } from 'react';
import { Context } from '..';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const NavBar = observer( () => {
    const { user } = useContext(Context)
    const history = useHistory()

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>BuyDevise</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>Admin panel</Button>
                        <Button variant={"outline-light"} onClick={() => logout()} className="ml-2">Log out</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                    
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)} >Authorization</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;