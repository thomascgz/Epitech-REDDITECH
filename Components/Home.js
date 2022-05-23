import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, TouchableOpacity, ScrollView, Image } from 'react-native'
import Post from './Post'
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hot: "",
      best: "",
      new: "",
      sort: 1,
    };
  }

  getPost = async () => {
    try {
      let res = await axios.get("https://oauth.reddit.com/best", {
        headers: { Authorization: "Bearer " + this.props.name}
      })
      let res1 = await axios.get("https://oauth.reddit.com/hot", {
        headers: { Authorization: "Bearer " + this.props.name}
      })
      let res2 = await axios.get("https://oauth.reddit.com/new", {
        headers: { Authorization: "Bearer " + this.props.name}
      })
      this.setState({
        best: res.data.data,
        hot: res1.data.data,
        new: res2.data.data
      })
    } catch (error) {
      console.error(error);
    }
  };

  sort = () => {
    if (this.state.sort === 1)
      return this.state.best.children
    if (this.state.sort === 2)
      return this.state.hot.children
    if (this.state.sort === 3)
      return this.state.new.children
  }

  render() {
    this.getPost()
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.text}>
              Home
          </Text>
        </View>
        <View style={styles.body}>
          <FlatList
            ListHeaderComponent={
              <View style={styles.type}>
                <TouchableOpacity onPress={() => {this.setState({sort: 1})}} style={styles.button}>
                  <Text style={[this.state.sort === 1 ? styles.desc_textS : styles.desc_text]}>Best</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({sort: 2})}} style={styles.button}>
                  <Text style={[this.state.sort === 2 ? styles.desc_textS : styles.desc_text]}>Hot</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.setState({sort: 3})}} style={styles.button}>
                  <Text style={[this.state.sort === 3 ? styles.desc_textS : styles.desc_text]}>New</Text>
                </TouchableOpacity>
              </View>
            }
            data={this.sort()}
            renderItem={({item}) => <Post name={item}/>}
            keyExtractor={(item) => item.data.id}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 75,
    flex: 0.10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bbb',
  },
  body: {
    flex: 0.90,
  },
  text: {
    marginTop: 37,
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#252527',
  },
  type: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  desc_text: {
    fontSize: 13,
    color: '#555',
    fontWeight: 'bold',
  },
  desc_textS: {
    fontSize: 13,
    color: '#ff4500',
    fontWeight: 'bold',
  },
  button: {
    width: 70,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#f8f8f8",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
})

export default Home
