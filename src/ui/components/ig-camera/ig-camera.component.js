import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import Permissions from 'react-native-permissions'

import { styles } from './ig-camera.style'

const CAMERA_PERMITION_TYPE = 'camera'
const MICROPHONE_PERMISSION_TYPE = 'microphone'

export class IgCamera extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cameraPermission: null,
      microphonePermission: null
    }

    this.onRef = this.onRef.bind(this)
    this.takePicture = this.takePicture.bind(this)
    this._requestPermissions = this._requestPermissions.bind(this)
    this._requestCameraPermission = this._requestCameraPermission.bind(this)
    this._requestMicrophonePermission = this._requestMicrophonePermission.bind(this)
    this._checkPermissions = this._checkPermissions.bind(this)
    this._hasPermission = this._hasPermission.bind(this)
  }

  componentDidMount() {
    this._requestPermissions()
  }

  _requestPermissions() {
    this._requestCameraPermission().then(this._requestMicrophonePermission)
  }

  _requestCameraPermission() {
    return Permissions.request(CAMERA_PERMITION_TYPE).then(response => {
      this.setState({ cameraPermission: response })
    })
  }

  _requestMicrophonePermission() {
    return Permissions.request(MICROPHONE_PERMISSION_TYPE).then(response => {
      this.setState({ microphonePermission: response })
    })
  }

  _checkPermissions() {
    const permitionsToCheck = [ CAMERA_PERMITION_TYPE, MICROPHONE_PERMISSION_TYPE ]

    Permissions.checkMultiple(permitionsToCheck).then(({ camera, microphone }) => {
      this.setState({
        cameraPermission: camera,
        microphonePermission: microphone
      })
    })
  }

  _hasPermission() {
    const { cameraPermission, microphonePermission } = this.state

    return cameraPermission === 'authorized' && microphonePermission === 'authorized'
  }

  onRef(reference) {
    this.camera = reference
  }

  async takePicture() {
    if (this.camera && this._hasPermission()) {
      const options = { base64: true, pauseAfterCapture: true }
      const data = await this.camera.takePictureAsync(options)

      this.camera.resumePreview()

      alert(data.uri)
    }
  }

  renderCamera() {
    return (
      <View style={styles.camera.container}>
        <RNCamera
          style={styles.camera.rnCamera}
          ref={this.onRef}
          flashMode={RNCamera.Constants.FlashMode.auto}
          type={RNCamera.Constants.Type.back}
        />
      </View>
    )
  }

  renderPermissionRequest() {
    return (
      <View style={styles.permissionRequest.container}>
        <Text style={styles.permissionRequest.title}>
          Precisamos de permissão para acessar sua câmera e seu microfone!
        </Text>
        <TouchableOpacity
          style={styles.permissionRequest.button}
          onPress={this._requestPermissions}
          activeOpacity={0.8}
        >
          <Text style={styles.permissionRequest.buttonText}>
            PERMITIR
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return !!this._hasPermission() ? this.renderCamera() : this.renderPermissionRequest()
  }
}
