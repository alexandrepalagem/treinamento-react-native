import React, { Fragment } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import api from '@api/direct.json'

import { styles } from './direct.style'

const backIcon = require('@img/back.png')
const addIcon = require('@img/add.png')
const searchIcon = require('@img/search.png')
const cameraIcon = require('@img/camera.png')
const cameraIcon2 = require('@img/camera2.png')

import { BaseScreen } from '@ui/screens/base'

export class DirectScreen extends BaseScreen {
  _renderNavBar() {
    return (
      <View
        style={styles.navbarContainer}
      >
        <Image
          source={backIcon}
          resizeMode='contain'
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.navbarTitle}>
            Direct
          </Text>
        </View>
        <Image
          source={addIcon}
          resizeMode='contain'
          style={styles.icon}
        />
      </View>
    )
  }

  _renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <Image source={searchIcon} style={styles.icon}/>
        <Text style={styles.searchPlaceholder}>
          Pesquisar
        </Text>
      </View>
    )
  }

  _renderContact(contact) {
    return (
      <View style={styles.contactContainer} key={contact.id}>
        <Image
          source={{ uri: contact.photo }}
          style={styles.contactPhoto}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text>{contact.user}</Text>
        </View>
        <Image source={cameraIcon} style={styles.icon} />
      </View>
    )
  }

  _renderCameraButton() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.cameraButton}>
        <Image source={cameraIcon2} style={styles.cameraButtonIcon} />
        <Text style={styles.cameraButtonText}>
          Camera
        </Text>
      </TouchableOpacity>
    )
  }

  _renderContacts() {
    return api.contacts.map(contact => this._renderContact(contact))
  }

  renderContent() {
    return (
      <Fragment>
        {this._renderSearch()}
        <ScrollView>
          {this._renderContacts()}
        </ScrollView>
        {this._renderCameraButton()}
      </Fragment>
    )
  }
}
