import { createStackNavigator } from 'react-navigation'

import { CameraRoutes } from '@ui/navigator/routes/camera'

const configs = {
  mode: 'modal',
  headerMode: 'none',
}

export const CameraStack = createStackNavigator(CameraRoutes, configs)
