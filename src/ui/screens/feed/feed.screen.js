import React from 'react'
import {
  ScrollView,
  View,
  StatusBar,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { BaseScreen } from '@ui/screens/base'

import { StorageService } from '@ui/services'

import api from '@api/feed.json'

import { Post } from '@ui/components/post.component'

export class FeedScreen extends BaseScreen {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      colors: [],
      latitude: '',
      longitude: '',
    }
  }

  componentDidMount() {
    StorageService.getObject('colors').then(colors => {
      if(colors) {
        this.setState({ colors })
      }
    })
  }

  _addColorToArray() {
    let colors = [...this.state.colors, this.state.text]
    StorageService.setObject('colors', colors).then(() => {
      this.setState({ colors, text: '' })
    })
  }

  _removeColor(color) {
    let colors = this.state.colors.filter(c => c !== color)
    StorageService.setObject('colors', colors).then(() => {
      this.setState({ colors })
    })
  }

  _renderStorageSection() {
    return (
      <View style={styles.storageContainer}>
        <View>
          <Text style={styles.inputLabel}>Adicione uma nova cor:</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ text })}
            autoCorrect={false}
            value={this.state.text}
            onSubmitEditing={() => this._addColorToArray()}
          />

          <TouchableOpacity onPress={() => this._addColorToArray()} style={styles.button}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.colorsContainer}>
          <Text style={styles.colorsTitle}>{`(${this.state.colors.length}) Cores 🌈`}</Text>
          {this.state.colors.map((color, index) => (
            <View style={styles.colorItem} key={index}>
              <Text style={styles.colorItemText}>{color}</Text>
              <TouchableOpacity onPress={() => this._removeColor(color)} style={styles.colorButton}>
                <Text style={styles.colorButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    )
  }

  _getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude})
      },
      error => {
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
  }

  _renderLocationSection() {
    return (
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => this._getLocation()} style={styles.locationButton}>
          <Text style={styles.locationButtonText}>Minha localização</Text>
        </TouchableOpacity>

        <View style={{paddingVertical: 20}}>
          <Text>{`${this.state.latitude} ${this.state.longitude}`}</Text>
        </View>
      </View>
    )
  }

  renderContent() {
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View>
          {this._renderStorageSection()}
          {/* {this._renderLocationSection()} */}

          {api.feed.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </View>
      </ScrollView>
    )
  }

  screenWillFocus() {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true)
    }
  }
}

const styles = StyleSheet.create({
  storageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 6,
    flex: 1,
    marginRight: 15,
  },
  inputLabel: {
    fontSize: 22,
    marginBottom: 5,
  },
  button: {
    height: 40,
    backgroundColor: '#81c784',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
  },
  colorsContainer: {
    paddingVertical: 20,
  },
  colorsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    alignItems: 'center',
  },
  colorItemText: {
    flex: 1,
  },
  colorButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 6,
  },
  colorButtonText: {
    color: '#fff',
  },
  locationButton: {
    height: 40,
    backgroundColor: '#ffca28',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 6,
  },
  locationButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
})
