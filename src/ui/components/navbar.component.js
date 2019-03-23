import React, { Component, Fragment } from 'react'

import {
  TouchableWithoutFeedback,
  View,
  Image,
  Platform,
  StatusBar
} from 'react-native'

import { IgIcon } from '@ui/components/ig-icon/ig-icon.component'

import { DIRECT_ROUTES } from '@ui/navigator/routes/direct'

export class NavBar extends Component {
  goToCamera() {

  }

  goToDirect() {
    this.props.navigation.navigate(DIRECT_ROUTES.DIRECT, { 
      title: 'Direct Message NavBar' 
    })
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor={'transparent'} />
        <View
          style={{
            backgroundColor: "yellow",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ...Platform.select({
              ios: {
                height: 90,
                paddingTop: 40,
              },
              android: {
                height: 82,
                paddingTop: 20,
              }
            }),
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderColor: "#ddd"
          }}
        >        
          <TouchableWithoutFeedback
            id="camera"
            onPress={() => this.goToCamera()}
          >
            <IgIcon name='photo-camera' style={{ fontSize: 40, color: 'red' }} />            
          </TouchableWithoutFeedback>
          
          <Image
            source={require("@img/instagram_logo.png")}
            style={{ width: 100, height: 40, resizeMode: "contain" }}
          />

          <TouchableWithoutFeedback
            id="direct"
            onPress={() => this.goToDirect()}
          >
            <Image
              source={require("@img/send.png")}
              style={{ width: 23, height: 23 }}
            />
          </TouchableWithoutFeedback>
        </View>
      </Fragment>
    )
  }
}