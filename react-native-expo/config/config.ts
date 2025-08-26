import Constants from 'expo-constants';

export const config = {
  gatewayUrl: Constants.expoConfig?.extra?.gatewayUrl || 'http://chicago-vibe-coding-event.safetunnel.io/',
};