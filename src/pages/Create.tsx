import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import TopButtons from '../components/common/TopButtons';


// import { pinata } from "../utils/config"

const HomeTopButtons = styled(TopButtons)`
`;

const CreateContainer = styled.div`
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

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  color: #4ad0ac;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    outline: none;
    border-color: #4ad0ac;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  min-height: 100px;
  font-size: 16px;
  resize: vertical;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    outline: none;
    border-color: #4ad0ac;
  }
`;

const UploadArea = styled.div`
  width: 100%;
  height: 250px;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #4ad0ac;
  }
`;

const UploadContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: rgba(10, 10, 26, 0.8);
`;

const UploadIcon = styled.div`
  margin-bottom: 10px;
  svg {
    width: 24px;
    height: 24px;
    fill: #4ad0ac;
  }
`;

const UploadText = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-bottom: 8px;
`;

const SelectFileButton = styled.button`
  background: none;
  border: 1px solid #4ad0ac;
  color: #4ad0ac;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: rgba(74, 208, 172, 0.1);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const CreateButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #4ad0ac;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #3ab090;
  }
`;

const Tip = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #4ad0ac;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 4px;
`;

const TickerInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  span {
    position: absolute;
    left: 12px;
    color: white;
    font-size: 16px;
  }
  
  input {
    padding-left: 24px;
  }
`;

const PreviewContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const RequiredMark = styled.span`
  color: #ff4d4d;
  margin-left: 4px;
`;

const Create: React.FC = () => {
  const handleConnectWallet = () => {
    console.log('Connecting wallet...');
  };

  const handleBuyToken = () => {
    console.log('Buying token...');
  };
  const [showMore, setShowMore] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ticker, setTicker] = useState('');
  const [tickerError, setTickerError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [telegramError, setTelegramError] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [twitterError, setTwitterError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedFile, setSelectedFile]: any = useState();
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      setFileType(isVideo ? 'video' : 'image');
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTicker(value);
    
    if (value.length > 10) {
      setTickerError('Ticker cannot be more than 10 characters');
    } else {
      setTickerError('');
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    
    if (value.length > 180) {
      setDescriptionError('Description cannot be more than 180 characters');
    } else {
      setDescriptionError('');
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTelegramLink(value);
    
    if (value && !value.startsWith('https://t.me/')) {
      setTelegramError('Please enter a valid Telegram link (https://t.me/...)');
    } else {
      setTelegramError('');
    }
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWebsiteLink(value);
    
    if (value && !isValidUrl(value)) {
      setWebsiteError('Please enter a valid website URL');
    } else {
      setWebsiteError('');
    }
  };

  const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTwitterLink(value);
    
    if (value && !value.startsWith('https://x.com/') && !value.startsWith('https://twitter.com/')) {
      setTwitterError('Please enter a valid Twitter/X link');
    } else {
      setTwitterError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError('');
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!name.trim()) {
      errors.push('Name is required');
      setNameError('Name is required');
    }
    
    if (!ticker.trim()) {
      errors.push('Ticker is required');
      setTickerError('Ticker is required');
    }
    
    if (!previewUrl) {
      errors.push('Image or video is required');
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form is valid, submitting...');
      try {

      } catch (error) {
        console.log(error);
      }
      alert("DO NOT FOMO")
    } else {
      console.log('Form validation failed:', formErrors);
    }
  };

  return (
    <>
      <Sidebar />
      <CreateContainer>
      <HomeTopButtons 
          onFirstButtonClick={handleConnectWallet}
          onSecondButtonClick={handleBuyToken}
        />
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              Name
              <RequiredMark>*</RequiredMark>
            </Label>
            <InputWrapper>
              <Input 
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            </InputWrapper>
            {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>
              Ticker
              <RequiredMark>*</RequiredMark>
            </Label>
            <TickerInput>
              <span>$</span>
              <Input 
                type="text"
                value={ticker}
                onChange={handleTickerChange}
              />
            </TickerInput>
            {tickerError && <ErrorMessage>{tickerError}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Description</Label>
            <TextArea 
              value={description}
              onChange={handleDescriptionChange}
              maxLength={180}
            />
            {descriptionError && <ErrorMessage>{descriptionError}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>
              Image or video
              <RequiredMark>*</RequiredMark>
            </Label>
            <UploadArea onClick={handleFileSelect}>
              {previewUrl && (
                <PreviewContainer>
                  {fileType === 'video' ? (
                    <video 
                      src={previewUrl} 
                      controls
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </PreviewContainer>
              )}
              <UploadContent>
                <UploadIcon>
                  <svg viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </UploadIcon>
                <UploadText>Select an image or video</UploadText>
                <SelectFileButton type="button">Select file</SelectFileButton>
              </UploadContent>
            </UploadArea>
            {formErrors.includes('Image or video is required') && (
              <ErrorMessage>Image or video is required</ErrorMessage>
            )}
            <FileInput 
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </FormGroup>
          
          <ShowMoreButton 
            type="button" 
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Hide more options ↑' : 'Show more options ↓'}
          </ShowMoreButton>
          
          {showMore && (
            <>
              <FormGroup>
                <Label>Telegram link</Label>
                <InputWrapper>
                  <Input 
                    type="text" 
                    placeholder="(optional)" 
                    value={telegramLink}
                    onChange={handleTelegramChange}
                  />
                </InputWrapper>
                {telegramError && <ErrorMessage>{telegramError}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label>Website link</Label>
                <InputWrapper>
                  <Input 
                    type="text" 
                    placeholder="(optional)" 
                    value={websiteLink}
                    onChange={handleWebsiteChange}
                  />
                </InputWrapper>
                {websiteError && <ErrorMessage>{websiteError}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <Label>Twitter or X link</Label>
                <InputWrapper>
                  <Input 
                    type="text" 
                    placeholder="(optional)" 
                    value={twitterLink}
                    onChange={handleTwitterChange}
                  />
                </InputWrapper>
                {twitterError && <ErrorMessage>{twitterError}</ErrorMessage>}
              </FormGroup>
            </>
          )}
          
          <CreateButton type="submit">Create Coin</CreateButton>
          <Tip>Tip: coin data cannot be changed after creation</Tip>
        </Form>
      </CreateContainer>
    </>
  );
};

export default Create; 