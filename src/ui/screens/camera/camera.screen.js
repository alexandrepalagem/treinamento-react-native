import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import { BaseScreen } from '@ui/screens/base'
import { IgCamera } from '@ui/components/ig-camera'

import { styles } from './camera.style'

export class CameraScreen extends BaseScreen {
  constructor(props) {
    super(props)

    this.state = {
      cameraPermission: null
    }

    this.takePicture = this.takePicture.bind(this)
    this.onRef = this.onRef.bind(this)
  }

  onRef(reference) {
    this.igcamera = reference
  }

  takePicture() {
    this.igcamera.takePicture()
  }

  renderCameraButton() {
    return (
      <TouchableOpacity
        style={styles.shotButton}
        activeOpacity={0.8}
        onPress={this.takePicture}
      />
    )
  }

  renderContent() {
    return (
      <View style={styles.container}>
        <IgCamera  ref={this.onRef} />
        <View style={styles.controlsContainer}>
          {this.renderCameraButton()}
        </View>
      </View>
    )
  }
}
