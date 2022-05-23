import React from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, ActivityIndicator, Image, Pressable } from 'react-native'
import Search from '../Components/Search'
import PostSub from '../Components/PostSub'
import {createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

var access_token = ""

const RedditechStackNavigator = createStackNavigator({
  Search: {
    screen: (e) => {
      return <Search name={access_token} nav={e}/>
    },
    navigationOptions: {
      title: 'Search',
      headerStyle: {
        backgroundColor: '#fff',
        height: 76,
        borderBottomWidth: 0.3,
        borderBottomColor: '#bbb',
      },
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#252527',
        marginBottom: 0,
        height: 50,
      },
    }
  },
  Post: {
    screen: PostSub,
    navigationOptions: {
      title: 'Post',
      headerStyle: {
        backgroundColor: '#fff',
        height: 76,
        borderBottomWidth: 0.4,
        borderBottomColor: '#bbb',
      },
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#252527',
        marginBottom: 0,
        height: 50,
      },
    }
  }
})

const Subnav = createAppContainer(RedditechStackNavigator)

export default function nav(props) {
  access_token = props.name
  if (access_token === "")
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' />
      </View>
    )
  else
    return <Subnav/>
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
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#252527',
  },
})
