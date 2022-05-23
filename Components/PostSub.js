import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Linking } from 'react-native'
import Post from './Post'

class PostSub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hot: "",
      best: "",
      new: "",
      sort: 1,
      join: false,
      index: false,
      auth: false,
    };
  }

  getBest () {
    if (this.state.sort === 1 && this.state.auth === false) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.props.navigation.state.params.name);

      fetch("https://oauth.reddit.com/r/" + this.props.navigation.state.params.post.display_name + "/best", {
        method:'GET',
        headers: headers
       })
      .then(res => res.json())
      .then(json => {
        this.setState({best: json.data, auth: true})
      });
    }
  };

  getHot () {
    if (this.state.sort === 2 && this.state.auth === false) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.props.navigation.state.params.name);

      fetch("https://oauth.reddit.com/r/" + this.props.navigation.state.params.post.display_name + "/hot", {
        method:'GET',
        headers: headers
       })
      .then(res => res.json())
      .then(json => {
        this.setState({hot: json.data, auth: true})
      })
    }
  };

  getNew () {
    if (this.state.sort === 3 && this.state.auth === false) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.props.navigation.state.params.name);

      fetch("https://oauth.reddit.com/r/" + this.props.navigation.state.params.post.display_name + "/new", {
        method:'GET',
        headers: headers
       })
      .then(res => res.json())
      .then(json => {
        this.setState({new: json.data, auth: true})
      });
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

  logo = () => {
    if (this.props.navigation.state.params.post.icon_img !== "") {
      return (
        <Image
          style={styles.logo}
          source={{
            uri: this.props.navigation.state.params.post.icon_img,
          }}
        />
      )
    } else if (this.props.navigation.state.params.post.icon_img === "" && this.props.navigation.state.params.post.community_icon === "") {
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
            uri: this.props.navigation.state.params.post.community_icon.split("?")[0],
          }}
        />
      )
    }
  }

  checkJoin () {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.props.navigation.state.params.name);
    headers.append('Content-Type', 'application/json');
    this.state.index = true
    if (this.state.join === false) {
      fetch("https://oauth.reddit.com/api/subscribe?sr_name=" + this.props.navigation.state.params.post.display_name + "&action=sub", {
        method:'POST',
        headers: headers
      })
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => ({join: !prevState.join}))
      });
    } else {
      fetch("https://oauth.reddit.com/api/subscribe?sr_name=" + this.props.navigation.state.params.post.display_name + "&action=unsub", {
        method:'POST',
        headers: headers
      })
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => ({join: !prevState.join}))
      });
    }
  };

  render() {
    this.getBest()
    this.getHot()
    this.getNew()
    for (var x = 0; x < this.props.navigation.state.params.subs.dist ; x++) {
      if (this.props.navigation.state.params.post.display_name === this.props.navigation.state.params.subs.children[x].data.display_name && this.state.index === false) {
        this.state.join = true
      }
    }
    return (
      <View style={styles.main}>
        <View style={styles.body}>
          <FlatList
            ListHeaderComponent={
              <View>
                <View style={styles.name}>
                  {this.logo()}
                  <Text style={styles.textI}>
                    r/{this.props.navigation.state.params.post.display_name}
                  </Text>
                  <TouchableOpacity onPress={() => {this.checkJoin()}} style={styles.buttonj}>
                    <Text style={styles.button_text}>{this.state.join ? "Joined" : "Join"}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.type}>
                  <TouchableOpacity onPress={() => {this.setState({sort: 1, auth: false})}} style={styles.button}>
                    <Text style={[this.state.sort === 1 ? styles.desc_textS : styles.desc_text]}>Best</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.setState({sort: 2, auth: false})}} style={styles.button}>
                    <Text style={[this.state.sort === 2 ? styles.desc_textS : styles.desc_text]}>Hot</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.setState({sort: 3, auth: false})}} style={styles.button}>
                    <Text style={[this.state.sort === 3 ? styles.desc_textS : styles.desc_text]}>New</Text>
                  </TouchableOpacity>
                </View>
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
  body: {
    flex: 1,
  },
  text: {
    marginTop: 5,
    fontSize: 20,
    color: '#252527',
  },
  textI: {
    fontSize: 18,
    marginTop: 15,
    color: '#252527',
  },
  type: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  name: {
    alignItems: "center",
    marginBottom: 5,
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
  logo: {
    width: 156,
    marginTop: 25,
    height: 156,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#555"
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
  buttonj: {
    width: 100,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 2,
    borderColor: "#f8f8f8",
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 2.65,
    elevation: 2,
  },
  button_text: {
    fontSize: 18,
    color: '#0079d3',
    fontWeight: 'bold',
  },
})

export default PostSub
