import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brote.habitos',
  appName: 'Brote',
  webDir: 'dist',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'always'
  }
};

export default config;