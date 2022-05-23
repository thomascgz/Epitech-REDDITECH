import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import { Searchbar } from 'react-native-paper';
import Subreddit from './Subreddit'
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: "",
      subs: ""
    };
  }

  getSubreddit = async (e) => {
    if (e === "") {
        this.setState({list: ""})
    } else {
      try {
        let res = await axios.get("https://oauth.reddit.com/subreddits/search?q=" + e + "", {
          headers: { Authorization: "Bearer " + this.props.name}
        })
        this.setState({list: res.data.data})
      } catch (error) {
        console.error(error);
      }
    }
  };

  getSubscribe = async () => {
    try {
      let res = await axios.get("https://oauth.reddit.com/subreddits/mine/", {
        headers: { Authorization: "Bearer " + this.props.name}
      })
      this.setState({subs: res.data.data})
    } catch (error) {
      console.error(error);
    }
  };

  displayPost = (post) => {
    this.props.nav.navigation.navigate("Post", { post: post, name: this.props.name, subs: this.state.subs})
  }

  render() {
    this.getSubscribe()
    return (
      <View style={styles.main}>
        <View style={styles.body}>
          <FlatList
            ListHeaderComponent={
              <View style={styles.search}>
                <Searchbar
                  style={styles.textinput}
                  placeholder="Search Subreddit"
                  onSubmitEditing={(e) => {this.getSubreddit(e.nativeEvent.text)}}
                />
              </View>
            }
            data={this.state.list.children}
            renderItem={({item}) => <Subreddit name={item} subs={this.state.subs} displayDetailForFilm={this.displayPost}/>}
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
    flex: 1,
  },
  search: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textinput: {
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#f8f8f8',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 5,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    marginTop: 37,
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#252527',
  },
})

export default Search
