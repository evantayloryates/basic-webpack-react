

const useDeviceInfo = () => {
  return {
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
  }
}

export default useDeviceInfo;