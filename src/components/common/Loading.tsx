import React from 'react';
import styled from 'styled-components';

interface LoadingProps {
  message?: string;
}

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  color: #ffffff;
  text-align: center;
  font-family: 'Arial', sans-serif;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid  #4ad0ac; 
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <LoadingOverlay>
      <LoadingContent>
        <div className="spinner" />
        <div>{message}</div>
      </LoadingContent>
    </LoadingOverlay>
  );
};

export default Loading; 