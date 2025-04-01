import React from 'react';
import styled from 'styled-components';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const TopButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-bottom: 5px;
  padding: 10px 0;
`;

const Button = styled.button`
  background: rgba(74, 208, 172, 0.1);
  color: #4ad0ac;
  padding: 8px 16px;
  border: 1px solid #4ad0ac;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 208, 172, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

interface TopButtonsProps {
  onFirstButtonClick?: () => void;
  onSecondButtonClick?: () => void;
  firstButtonText?: string;
  secondButtonText?: string;
  className?: string;
}

const TopButtons: React.FC<TopButtonsProps> = ({
  onFirstButtonClick,
  onSecondButtonClick,
  firstButtonText = "Connect Wallet",
  secondButtonText = "Create Coin",
//   secondButtonText = "Buy $YOLO",
  className
}) => {
  return (
    <TopButtonsContainer className={className}>
      {/* <Button onClick={onFirstButtonClick}>
        <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"/>
        <circle cx="16" cy="12" r="1.5"/>
        </svg>
        {firstButtonText}
        </Button> */}
      <Button onClick={onSecondButtonClick}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/>
        </svg>
        {secondButtonText}
      </Button>
        <ConnectButton />
    </TopButtonsContainer>
  );
};

export default TopButtons; 