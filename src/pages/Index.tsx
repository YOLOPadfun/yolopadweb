import React, { useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import {
  BurnIcon,
  MintingIcon,
  RewardIcon,
  BurnRewardIcon,
  SecurityIcon,
  TransparentIcon
} from '../components/icons/FeatureIcons';
import TopButtons from '../components/common/TopButtons';
import { useNavigate } from 'react-router-dom';

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

const Subtitle = styled.p`
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const JoinButton = styled.button`
  background: rgba(74, 208, 172, 0.1);
  color: #4ad0ac;
  padding: 12px 30px;
  border: 1px solid #4ad0ac;
  white-space: nowrap;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  align-items: center;
  display: inline-flex;
  transition: all 0.3s ease;
  
  &:hover {
    // background:rgb(83, 148, 95);
    background: rgba(74, 208, 172, 0.2);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: rgba(219, 249, 216, 0.05);
  padding: 30px;
  border-radius: 5px;
  
  svg {
    width: 50px;
    height: 50px;
    margin-bottom: 3px;
  }
  
  h3 {
    margin: 20px 0;
    color: white;
  }
  
  p {
    color: #888;
  }
`;

const HomeTopButtons = styled(TopButtons)`
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    console.log('Connecting wallet...');
  };

  const handleBuyToken = () => {
    console.log('Buying token...');
  };

  const handleJoinClick = () => {
    navigate('/advanced');
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
        <Subtitle>Welcome to the future of token launches</Subtitle>
        <ButtonWrapper>
          <JoinButton onClick={handleJoinClick}>JOIN THE BATTLE</JoinButton>
        </ButtonWrapper>
        
        <FeaturesGrid>
          <FeatureCard>
            <BurnIcon />
            <h3>Burn to Win</h3>
            <p>Burn tokens to increase your rewards in real-time. The more you burn, the more you earn.</p>
          </FeatureCard>
          
          <FeatureCard>
            <MintingIcon />
            <h3>Minting & LP Lock</h3>
            <p>Secure token minting and liquidity locking for a fair and transparent process. Trust in every launch.</p>
          </FeatureCard>
          
          <FeatureCard>
            <RewardIcon />
            <h3>Reward Pools</h3>
            <p>Participate, burn, and earn from the reward pools. The more you contribute, the greater your share.</p>
          </FeatureCard>
        </FeaturesGrid>

        <h2>WHAT MAKES YOLOPAD DIFFERENT?</h2>
        <FeaturesGrid>
          <FeatureCard>
            <BurnRewardIcon />
            <h3>Real-time burn-to-earn rewards</h3>
          </FeatureCard>
          <FeatureCard>
            <SecurityIcon />
            <h3>True token liquidity (Locked by design)</h3>
          </FeatureCard>
          <FeatureCard>
            <TransparentIcon />
            <h3>Fair & transparent minting process</h3>
          </FeatureCard>
        </FeaturesGrid>
      </HomeContainer>
    </>
  );
};

export default Home; 