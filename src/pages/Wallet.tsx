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
import CustomModal from '../components/common/CustomModal'; //
import { useAnalytics } from '../hooks/useAnalytics';

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}



const SALT = 'ethereum_address_salt'; 

const formatAddress = (address: string) => {
  if (address.length <= 8) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};


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
  const [isModalOpen, setIsModalOpen] = useState(false); // 
  const [inviterInput, setInviterInput] = useState(''); // 
  const [isInviterBound, setIsInviterBound] = useState(false); // 
  const [errorMessage, setErrorMessage] = useState(''); // 
  const [inviterList, setInviterList] = useState<string[]>([]); // 



  const inviteLinkPrefix = "Click to copy the invitation link:";
  const inviteErr ="Failed to bind inviter, please check the invite code or try again";
  const encryptedAddress = address ? CryptoJS.AES.encrypt(address, SALT).toString() : '';
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
        '0x636B03c4f2885E341E9bEE0512Fc0061cC5BAb5b',
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
          '0x636B03c4f2885E341E9bEE0512Fc0061cC5BAb5b',
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
    fetchInviterAddress();
    fetchInviterList(); //
  }, [isConnected, address, signer]);

  const handleConfirm = async () => {
    try {
      if (!signer) {
        throw new Error("Provider is not available");
      }

      const decryptedBytes = CryptoJS.AES.decrypt(inviterInput, SALT);
      const decryptedAddress = decryptedBytes.toString(CryptoJS.enc.Utf8);
      if (!ethers.isAddress(decryptedAddress)) {
        alert("Invalid invite code, please check and try again");
        return; 
      }
      console.log('decryptedAddress', decryptedAddress);

      const contract = new ethers.Contract(
        '0x636B03c4f2885E341E9bEE0512Fc0061cC5BAb5b',
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
    } catch (error) {
      console.error('Error binding inviter:', error);
      setErrorMessage(inviteErr);
    }
  };

  const shareMessage = `https://x.com/intent/tweet?text=${encodeURIComponent(`🚀 I just secured my Early Bird spot in @Yolopadfun  🚀\n\n✅ Exclusive 10% discount\n✅ Special Early Bird Badge with hidden perks & Mining rewards\nI'm ready for the next big thing in Web3 gaming! Who's joining me? 🔥\n\n👉 Grab your spot now: ${newInviteLink}`)} \n`
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
      <HomeContainer>
        <HomeTopButtons 
          onFirstButtonClick={handleConnectWallet}
          onSecondButtonClick={handleBuyToken}
        />
        
        <div className="min-h-screen w-full flex pt-24 justify-center overflow-x-hidden">
      <div className="max-w-[1120px] w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col items-start px-4 py-8">
          {/* Avatar and wallet address section */}
          <div className="flex items-start mb-4 flex-wrap">
            {/* Wallet address */}
            <div className="flex flex-col w-full">
              <span className="font-medium mb-2 pt-4 text-base md:text-lg ">Wallet Address:</span>
              <p className="font-medium mb-4 text-base md:text-lg  break-all">{address}</p>
            </div>
            <p className="font-medium mb-2">
            Inviter {inviterAddress === '0x0000000000000000000000000000000000000000' ? '--' : inviterAddress}
            </p>
          </div>

          {/* Share link */}
          <p className="font-medium mb-2 break-words w-full">
            {inviteLinkPrefix}
          </p>
          <p className="font-medium mb-2 break-words w-full">
            <span 
              onClick={copyToClipboard} 
              className="text-blue-500 cursor-pointer whitespace-normal break-all"
            >
              {newInviteLink}
            </span>
          </p>
          <p 
            className="text-orange-300 w-full mb-4 font-medium mb-1" 
            onClick={handleShareClick}
          >
            Share to X 
          </p>

         
        </div>

        {/* Right content - My invite list */}
        <div className="w-full md:w-1/2 px-4 py-8">
          <h2 className="text-xl font-bold mb-2 text-left">My Invitation List</h2>
          {inviterAddress === '0x0000000000000000000000000000000000000000' && !isInviterBound && ( // Check inviter address
            <button 
              className="bg-gradient-to-r mb-2 from-purple-400 via-pink-300 to-orange-200 text-white px-4 py-2 rounded hover:opacity-80"
              onClick={handleBindInviterClick} // 
            >
             Bind Inviter
            </button>
          )}
          <p className="text-gray-400 w-full mb-2">Share your invitation link to earn 5% rewards when the invited person Create Coin</p>
          {inviterList.length === 0 && (
            <p className=" mb-4">No data yet</p>
          )}
          {inviterList.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b border-orange-200">
                    <th className="px-4 py-2 text-left text-orange-300">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {inviterList.map((inviter, index) => (<tr key={index} className="border-b border-orange-200">
                    <td className="px-4 py-2">{formatAddress(inviter)}</td>
                    <td className="px-4 py-2">0</td>
                  </tr>))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <CustomModal onClose={handleModalClose} onConfirm={handleConfirm} errorMessage={errorMessage}>
          <input 
            type="text" 
            value={inviterInput} 
            onChange={(e) => setInviterInput(e.target.value)}
            placeholder='Enter invite code'
            className="border p-2 w-full mb-4 text-white placeholder-white bg-transparent"
          />
        </CustomModal>
      )}
    </div>
       
      </HomeContainer>
    </>
  );
};

export default Home; 