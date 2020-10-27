import { Plugins } from '@capacitor/core';

export function useGeolocation() {
  const { Geolocation } = Plugins;

  const getCurrentPosition = () => {
      return Geolocation.getCurrentPosition()
  }

  return {
      getCurrentPosition
  }
}
