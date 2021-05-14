import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import SettingsScreen from '../screens/SettingsScreen'
import NotificationScreen from '../screens/NotificationScreen';
import MyBartersScreen from '../screens/MyBartersScreen'
import CustomSideBarMenu  from './CustomSideBar';
import MyReceivedToysScreen from '../screens/MyRecievedToysScreen'


export const AppDrawerNavigator = createDrawerNavigator({
    Home : {
      screen : AppTabNavigator
      },
    Settings: {
            screen: SettingsScreen
        },
    MyBarters:{
          screen: MyBartersScreen
      },
    Notifications :{
        screen : NotificationScreen
      },
    MyReceivedToys :{
      screen: MyReceivedToysScreen
    },
  },
  {
    contentComponent: CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })

