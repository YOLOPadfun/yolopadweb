import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import TopButtons from '../components/common/TopButtons';
import { useNavigate } from 'react-router-dom';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers'; //
import CryptoJS from 'crypto-js'; 

import { useMemo } from 'react'
import { type Config, useConnectorClient } from 'wagmi'
import { clientToSigner } from '../utils/provider'; // 
import CustomModal from '../components/common/CustomModal'; 
import Loading from '../components/common/Loading'; 

import { useAnalytics } from '../hooks/useAnalytics';

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}



const SALT = 'ethereum_address_salt'; 

const formatAddress = (address: string) => {
  if (address.length <= 8) return address;
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
};

const HomeTopButtons = styled(TopButtons)`
`;

const WalletContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a1a;
  color: white;
  padding: 10px 10px;
  margin-left: 240px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-bottom: 80px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  width: 100%;
`;

const WalletSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Label = styled.span`
  display: block;
  color: #4ad0ac;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Value = styled.p`
  color: white;
  font-size: 16px;
  margin-bottom: 16px;
  word-break: break-all;
`;

const CopyLink = styled.span`
  color: #4ad0ac;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ShareButton = styled.button`
  background: none;
  border: 1px solid #4ad0ac;
  color: #4ad0ac;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: rgba(74, 208, 172, 0.1);
  }
`;

const BindButton = styled.button`
  background: #4ad0ac;
  border: none;
  border-radius: 8px;
  color: #0a0a1a;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #3ab090;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  th {
    color: #4ad0ac;
    font-weight: normal;
  }
`;
const ModalInput = styled.input`
  width: 95%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  margin-right: -10px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #4ad0ac;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    console.log('Connecting wallet...');
  };

  const handleBuyToken = () => {
    navigate('/create');
  };
  const { isConnected, address } = useAccount();
  const { sendEvent } = useAnalytics();
  const signer = useEthersSigner();
  const [inviterAddress, setInviterAddress] = useState<string | null>(null); // New state management
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 
  const [inviterInput, setInviterInput] = useState(''); // 
  const [isInviterBound, setIsInviterBound] = useState(false); // 
  const [errorMessage, setErrorMessage] = useState(''); // 
  const [inviterList, setInviterList] = useState<string[]>([]); // 
  const [encryptedAddress, setEncryptedAddress] = useState('');

  const inviteLinkPrefix = "Click to copy the invitation link:";
  const inviteErr ="Failed to bind inviter, please check the invite code or try again";
  const newInviteLink = `https://yolopad.fun/mywallet?refer=${encodeURIComponent(encryptedAddress)}`; // 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newInviteLink).then(() => {
      alert("Invite link copied to clipboard!");
    });
    sendEvent('button_click', {
      button_name: 'copy_invite_link_button',
      page_location: 'subscription_page'
    });
  };

  const handleBindInviterClick = () => {
    setIsModalOpen(true);
    sendEvent('button_click', {
      button_name: 'bind_inviter_button',
      page_location: 'subscription_page'
    });
  };

  const handleModalClose = () => {
    setInviterInput(''); // 
    setIsModalOpen(false); // 
    setErrorMessage(''); // 
  };

  const fetchInviterAddress = async () => {
    if (isConnected && address && signer) {
      const contract = new ethers.Contract(
        '0xF5b23a86768BD4c927D1154bB169F41698154e3F',
        ['function getCurrentInviter(address _user) external view returns (address)'],
        signer
      );

      const inviter = await contract.getCurrentInviter(address);
      setInviterAddress(inviter);
       const urlParams = new URLSearchParams(window.location.search);
      const referAddressParam = urlParams.get('refer');
      const referAddress = referAddressParam ? decodeURIComponent(referAddressParam) : null; //
      if (referAddress && !isInviterBound) {
        if (!inviter || inviter === '0x0000000000000000000000000000000000000000') {
           setInviterInput(referAddress); 
           setIsModalOpen(true);
        
          }
       }else{
        console.log('referAddress', 'referAddress');
       }
    }
  };

  const fetchInviterList = async () => {
    if (isConnected && address && signer) {
      try {
        const contract = new ethers.Contract(
          '0xF5b23a86768BD4c927D1154bB169F41698154e3F',
          ['function getInviteInfo(address _invitee) external view returns (address[] memory)'],
          signer
        );

        const inviteInfo = await contract.getInviteInfo(address);
        setInviterList(inviteInfo); 
      } catch (error) {
        console.error('Error fetching inviter list:', error);
      }
    }
  };

  useEffect(() => {
    if (address) {
      const encrypted = CryptoJS.AES.encrypt(address, SALT).toString();
      setEncryptedAddress(encrypted);
    } else {
      setEncryptedAddress('');
    }
  }, [address]);

  useEffect(() => {
    fetchInviterAddress();
    fetchInviterList(); //
  }, [isConnected, address, signer]);

  const handleConfirm = async () => {
    try {
      if (!signer) {
        throw new Error("Provider is not available");
      }

    //   const decryptedBytes = CryptoJS.AES.decrypt(inviterInput, SALT);
    //   const decryptedAddress = decryptedBytes.toString(CryptoJS.enc.Utf8);
    let decryptedAddress: string;
    if (ethers.isAddress(inviterInput)) {
      decryptedAddress = inviterInput;
    } else {
      const decryptedBytes = CryptoJS.AES.decrypt(inviterInput, SALT);
      decryptedAddress = decryptedBytes.toString(CryptoJS.enc.Utf8);
    }

      if (!ethers.isAddress(decryptedAddress)) {
        alert("Invalid invite code, please check and try again");
        return; 
      }
      setIsLoading(true)
      console.log('decryptedAddress', decryptedAddress);

      const contract = new ethers.Contract(
        '0xF5b23a86768BD4c927D1154bB169F41698154e3F',
        ['function bindInvitation(address _inviter) external'],
        signer
      );

      const tx = await contract.bindInvitation(decryptedAddress);
      await tx.wait();

      setIsInviterBound(true);
      setInviterInput('')
      setIsModalOpen(false);
      fetchInviterAddress();
      fetchInviterList();
      setErrorMessage('');
      sendEvent('button_click', {
        button_name: 'bind_inviter_button',
        page_location: 'mywallet_page'
      });
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error binding inviter:', error);
      setErrorMessage(inviteErr);
    }
  };

  const shareMessage = `https://x.com/intent/tweet?text=${encodeURIComponent(`Get in before the burn starts.I'm already minting.  @Yolopadfun is live — join now 👇: ${newInviteLink}`)} \n`
  const handleShareClick = () => {
    sendEvent('share_click', {
      share_platform: 'twitter',
      share_location: 'subscription_page'
    });
    
    window.open(
        shareMessage,
      '_blank'
    );
  };

  return (
    <>
      <Sidebar />
      <WalletContainer>
        <HomeTopButtons 
          onFirstButtonClick={handleConnectWallet}
          onSecondButtonClick={handleBuyToken}
        />
        {isConnected ? (
        <ContentWrapper>
          <WalletSection>
            <Label>Wallet Address</Label>
            <Value>{address}</Value>
            
            <Label>Inviter</Label>
            <Value>
              {inviterAddress === '0x0000000000000000000000000000000000000000' 
                ? '--' 
                : inviterAddress ? formatAddress(inviterAddress) : '--'}
            </Value>
            
            <Label>{inviteLinkPrefix}</Label>
            <Value>
              <CopyLink onClick={copyToClipboard}>
                {newInviteLink}
              </CopyLink>
            </Value>
            <Value style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Share your invitation link to earn rewards 
            </Value>
            
            <ShareButton onClick={handleShareClick}>
              Share to X
            </ShareButton>
          </WalletSection>

          <WalletSection>
            <Label>My Invitation List</Label>
            {inviterAddress === '0x0000000000000000000000000000000000000000' && !isInviterBound && (
              <ShareButton onClick={handleBindInviterClick}>
                Bind Inviter
              </ShareButton>
            )}
            
            {inviterList.length === 0 ? (
              <Value>No data yet</Value>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {inviterList.map((inviter, index) => (
                    <tr key={index}>
                      <td>{formatAddress(inviter)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </WalletSection>
        </ContentWrapper>
       ) : (
        <ContentWrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ConnectButton />
        </ContentWrapper>
        )}
        {isModalOpen && (
          <CustomModal onClose={handleModalClose} onConfirm={handleConfirm} errorMessage={errorMessage}>
            <ModalInput 
              type="text" 
              value={inviterInput} 
              onChange={(e) => setInviterInput(e.target.value)}
              placeholder='Enter invite code'
              className="border p-2 w-full mb-4 text-white placeholder-white bg-transparent"
            />
          </CustomModal>
        )}
        {isLoading && (
            <Loading />

        )}
      </WalletContainer>
    </>
  );
};

export default Home; 