import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'apposmv',
  webDir: 'dist/apposmv',
  server: {
    androidScheme: 'https'
  }
};

export default config;
