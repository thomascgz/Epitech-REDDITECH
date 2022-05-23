import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, TouchableOpacity, Pressable , Image, Linking } from 'react-native'

class Subreddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPress: false,
    };
  }

  logo = () => {
    if (this.props.name.data.icon_img === "" && this.props.name.data.community_icon !== "") {
      return (
        <Image
          style={styles.logo}
          source={{
            uri: this.props.name.data.community_icon.split("?")[0],
          }}
        />
      )
    } else if (this.props.name.data.icon_img === "" && this.props.name.data.community_icon === "") {
      return (
        <Image
          style={styles.logo}
          source={{
            uri: "https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png",
          }}
        />
      )
    } else {
      return (
        <Image
          style={styles.logo}
          source={{
            uri: this.props.name.data.icon_img,
          }}
        />
      )
    }
  }

  render() {
    return (
      <Pressable onPress={() => {this.props.displayDetailForFilm(this.props.name.data)}} style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#f8f8f8' : '#fff'
          },
          styles.main
        ]}>
        <View style={styles.header}>
          {this.logo()}
        </View>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.title_text}>r/{this.props.name.data.display_name}</Text>
          </View>
          <View>
            <Text style={styles.title_text1}> {this.props.name.data.subscribers} Members</Text>
            <Text style={styles.desc_text}>{this.props.name.data.public_description}</Text>
          </View>
        </View>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    flex: 1,
    shadowColor: "#777",
    shadowOffset: {
    	width: 1,
    	height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1
  },
  header: {
  },
  body: {
    flex: 1,
    marginLeft: 10
  },
  title: {
    flexDirection: "row",
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  title_text: {
    fontSize: 15,
    color: '#252527',
    fontWeight: 'bold',
  },
  title_text1: {
    fontSize: 12,
    color: '#555',
  },
  desc_text: {
    fontSize: 13,
    color: '#555',
    overflow: "hidden",
    height: 32,
    marginTop: 8
  },
})

export default Subreddit
