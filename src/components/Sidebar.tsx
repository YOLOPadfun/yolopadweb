import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background: #0a0a1a;
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
`;

const LogoImg = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;

  img {
    width: 150px;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #e3e7e6;
  text-decoration: none;
  transition: all 0.3s;
  
  &.active {
    color: #4ad0ac;
    svg {
      fill: #4ad0ac;
    }
    
    &:hover {
      color: white;
    }
  }
  
  &:hover {
    background: #4ad0ac;
    color: white;
    svg {
      fill: white;
    }
  }
  
  svg {
    margin-right: 12px;
    width: 25px;
    height: 25px;
  }
`;

const MoreButtonWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 180px;
  background: #1a1b23;
  border-radius: 8px;
  padding: 8px 0;
  margin-top: 4px;
  margin-left: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #e3e7e6;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(74, 208, 172, 0.1);
    color: #4ad0ac;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 8px;
`;

const SocialIcon = styled.a`
  color: #e3e7e6;
  &:hover {
    color: #4ad0ac;
  }
`;

const MoreButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 20px;
  background: none;
  border: none;
  color: ${props => props.isActive ? '#4ad0ac' : '#e3e7e6'};
  cursor: pointer;
  
  &:hover {
    background: #4ad0ac;
    color: white;
    
    svg {
      fill: ${props => props.isActive ? '#4ad0ac' : 'white'};
    }
  }
  
  svg {
    margin-right: 12px;
    width: 25px;
    height: 25px;
    fill: ${props => props.isActive ? '#4ad0ac' : 'currentColor'};
  }
`;

const FooterContainer = styled.div`
  padding: 20px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`;

const FooterText = styled.div`
  color: #e3e7e6;
  font-size: 12px;
  margin-bottom: 8px;
`;

const Copyright = styled.div`
  color: #888;
  font-size: 12px;
`;

const NavContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Sidebar = () => {
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SidebarContainer>
      <NavContent>
        <LogoImg to="/">
          <img src="/logo_svg.svg" alt="Logo" />
        </LogoImg>
        
        <NavItem to="/" end>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"/>
          </svg>
          Home
        </NavItem>
        
        <NavItem to="/advanced">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"/>
          </svg>
          Advanced
        </NavItem>
        
        <NavItem to="/create">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Create Coin
        </NavItem>
        z 2
        <MoreButtonWrapper ref={moreRef}>
          <MoreButton 
            isActive={isMoreOpen}
            onClick={() => setIsMoreOpen(!isMoreOpen)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            more
          </MoreButton>

          <DropdownMenu isOpen={isMoreOpen}>
            <MenuItem href="">How it works</MenuItem>
            <MenuItem href="">
              Support
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                style={{ marginLeft: '8px', width: '16px', height: '16px' }}
              >
                <path d="M18 10.82a1 1 0 0 0-1 1V19H7V7h7.18a1 1 0 0 0 0-2H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7.18a1 1 0 0 0-1-1z"/>
                <path d="M21.92 2.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 2h-6a1 1 0 0 0 0 2h3.59l-8.29 8.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L20 5.41V9a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38z"/>
              </svg>
            </MenuItem>
            
            <SocialLinks>
              <SocialIcon href="https://x.com/Yolopadfun" target="_blank">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://t.me" target="_blank">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.38-.49 1.03-.75 4.03-1.75 6.72-2.91 8.07-3.48 3.85-1.63 4.64-1.91 5.17-1.91.11 0 .37.03.54.17.14.12.18.28.2.45-.02.05-.02.1-.02.14z"/>
                </svg>
              </SocialIcon>
            </SocialLinks>
          </DropdownMenu>
        </MoreButtonWrapper>
      </NavContent>

      <FooterContainer>
        <FooterText>
          Email: contact@yolopad.fun
        </FooterText>
        <Copyright>
          © 2025 YOLOPad. All rights reserved.
        </Copyright>
      </FooterContainer>
    </SidebarContainer>
  );
};

export default Sidebar; 