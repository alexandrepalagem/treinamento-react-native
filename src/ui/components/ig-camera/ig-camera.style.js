import { StyleSheet } from 'react-native'

const camera = StyleSheet.create({
  container: {
    flex: 1
  },
  rnCamera: {
    flex: 1
  },
})

const permissionRequest = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    marginTop: 10
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: 'white'
  }
})

export const styles = {
  camera,
  permissionRequest,
}
