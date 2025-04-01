import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import TopButtons from '../components/common/TopButtons';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a1a;
  color: white;
  text-align: center;
  padding: 10px 10px;
  margin-left: 240px;
   @media (max-width: 768px) {
    margin-left: 0;
    padding-bottom: 80px;
  }
`;

const MainTitle = styled.h1`
  font-size: 40px;
  background: linear-gradient(45deg,rgb(113, 248, 212),rgb(8, 188, 140));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5px;
  @media (max-width: 768px) {
   font-size: 30px;
  }
`;

const HomeTopButtons = styled(TopButtons)`
`;

const Home: React.FC = () => {
  const handleConnectWallet = () => {
    console.log('Connecting wallet...');
  };

  const handleBuyToken = () => {
    console.log('Buying token...');
  };

  return (
    <>
      <Sidebar />
      <HomeContainer>
        <HomeTopButtons 
          onFirstButtonClick={handleConnectWallet}
          onSecondButtonClick={handleBuyToken}
        />
        
        <MainTitle>YOU ONLY LAUNCH ONCE</MainTitle>
       
      </HomeContainer>
    </>
  );
};

export default Home; 