import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
    height: 90,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shotButton: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    borderWidth: 12,
    borderColor: 'rgba(255,255,255,.4)'
  }
})
