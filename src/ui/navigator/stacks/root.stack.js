import { createStackNavigator } from 'react-navigation'

import { RootTabBar } from '@ui/navigator/tabbar'
import { CameraStack } from '@ui/navigator/stacks/camera'

export const RootStack = createStackNavigator(
  {
    RootTabBar: {
      screen: RootTabBar,
      navigationOptions: {
        header: null
      }
    },
    CameraStack: {
      screen: CameraStack,
      navigationOptions: {
        header: null
      }
    }
  }
)


