import { Plugins } from '@capacitor/core';

export function useClipboard() {
  const { Clipboard } = Plugins;

  const copyLink = (url: string) => {
      return Clipboard.write({url});
  }

  return {
      copyLink
  }
}