import React from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, Image, Pressable } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper';
import Account from '../Components/Account'
import Home from '../Components/Home'
import Subnav from '../Components/Subnav'
import {createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

var access_token = ""

const RedditechTabNavigator = createBottomTabNavigator({
      Home: {
        screen: () => {
          return <Home name={access_token}/>
        },
        navigationOptions: {
          tabBarIcon: () => {
            return <Image
            source={require('../Assets/homepage.png')}
            style={styles.icon}/>
          }
        }
      },
      Search: {
        screen: () => {
          return <Subnav name={access_token}/>
        },
        navigationOptions: {
          tabBarIcon: () => {
            return <Image
              source={require('../Assets/search.png')}
              style={styles.icon}/>
          }
        }
      },
      Account: {
        screen: () => {
          return <Account name={access_token}/>
        },
        navigationOptions: {
          tabBarIcon: () => {
            return <Image
            source={require('../Assets/user.png')}
            style={styles.icon}/>
          }
        }
      },
    },
    {
      tabBarOptions: {
        activeBackgroundColor: '#fff',
        activeTintColor: '#ff4500',
        inactiveBackgroundColor: '#fff',
        showLabel: true,
        showIcon: true,
        style: {
          backgroundColor: '#fff',
          paddingTop: 5,
        },
        labelStyle: {
          fontSize: 10,
        },
      }
    }
  )

const Nav = createAppContainer(RedditechTabNavigator)

export default function nav(props) {
  access_token = props.name
  if (access_token === "")
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true} color="#ff4500"/>
      </View>
    )
  else
    return <Nav/>
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 27,
    height: 27
  },
})
