import React from 'react'

import { FEED_ROUTES } from './feed.route'

import { FeedScreen } from '@ui/screens/feed'

import { NavBar } from '@ui/components'

export const FeedRoutes = {
  [FEED_ROUTES.FEED]: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      header: <NavBar navigation={navigation} />
    }),
  },
}