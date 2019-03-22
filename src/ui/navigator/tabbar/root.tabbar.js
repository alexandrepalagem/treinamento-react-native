import { createBottomTabNavigator } from 'react-navigation'

import { FeedStack } from '@ui/navigator/stacks/feed'

export const RootTabBar = createBottomTabNavigator(
  {
    FeedStack: {
      screen: FeedStack
    },
  }
)