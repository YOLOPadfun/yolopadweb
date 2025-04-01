import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  bsc,
  // sonic
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'YOLOPad',
  projectId: '064a385b821b8d0eb0df7e5d5ea08d94',
  chains: [
    bsc,
    // sonic,
  ],
  ssr: true,
});
