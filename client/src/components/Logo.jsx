import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
  color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Tagline = styled.div`
  font-size: 24px;
  text-align: center;
  background-color: #d2b48c;
  padding: 10px;
  color: #8b4513;
  font-weight: bold;
  border-radius: 8px;
  font-family: 'Courier New', Courier, monospace;
  white-space: pre;
  margin: 0 20px;
`;

const LogoImage = styled.img`
  width: 350px;
  height: auto;
  padding: 0;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: #d2b48c;
  color: #8b4513;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  width: calc(50% - 10px);
  display: flex;
  justify-content: center;
`;

const Modal = styled.div`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Logo = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar>
        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
          <Tagline>
            The place to spill the tea...{"\n"}on coffee!
          </Tagline>
        </LogoContainer>
        <ButtonGroup>
          <ButtonContainer>
            <Button as={Link} to="/">Home</Button>
          </ButtonContainer>
          {Auth.loggedIn() ? (
            <>
              <ButtonContainer>
                <Button as={Link} to="/dashboard">Dashboard</Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button as="a" href="/" onClick={() => Auth.logout()}>Logout</Button>
              </ButtonContainer>
            </>
          ) : (
            <>
              <ButtonContainer>
                <Button as={Link} to="/signup">Signup</Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button as={Link} to="/login">Login</Button>
              </ButtonContainer>
            </>
          )}
          <ButtonContainer>
            <Button onClick={toggleModal}>About</Button>
          </ButtonContainer>
        </ButtonGroup>
      </Navbar>
      <Modal $show={showModal}>
        <ModalContent>
          <CloseButton onClick={toggleModal}>&times;</CloseButton>
          <h2>About BeanBanter</h2>
          <p>
            Welcome to BeanBanter, your go-to app for tracking and rating coffee shops. 
            Join us to discover new favorites and share your experiences with the community.
          </p>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Logo;
