import React from 'react';
import styled from 'styled-components';

interface CustomModalProps {
  onClose: () => void;
  onConfirm: () => void;
  errorMessage?: string;
  children: React.ReactNode;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.33);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: rgba(10, 10, 26, 0.95);
  border: 1px solid rgba(74, 208, 172, 0.1);
  border-radius: 16px;
  max-width: 480px;
  width: 100%;
  padding: 24px;
`;

const ModalTitle = styled.h2`
  color: #4ad0ac;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 14px;
  margin-bottom: 12px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #4ad0ac;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  &:focus {
    outline: none; 
  }
`;

const CancelButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ConfirmButton = styled(Button)`
  background: #4ad0ac;
  color: #0a0a1a;
  &:hover {
    background: #3ab090;
  }
`;

const CustomModal: React.FC<CustomModalProps> = ({ onClose, onConfirm, errorMessage, children }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Bind Inviter</ModalTitle>
        
        {errorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}

        <InputContainer>
          {children}
        </InputContainer>

        <ButtonGroup>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomModal; 