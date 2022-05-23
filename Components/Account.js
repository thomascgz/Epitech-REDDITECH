import React from 'react'
import { WebView } from 'react-native-webview';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, ScrollView, Switch, TouchableOpacity } from 'react-native'
import axios from "axios";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      image: " ",
      karma: "",
      description: "",
      over_18: "",
      show_p: "",
      email_private_m: "",
      email_user_nf: "",
      email_user_m: "",
      email_upvote_p: "",
      index: false
    };
  }

  getInfo = async () => {
    try {
      let res = await axios.get("https://oauth.reddit.com/api/v1/me", {
        headers: { Authorization: "Bearer " + this.props.name}
      })
      let res1 = await fetch("https://oauth.reddit.com/api/v1/me/prefs", {
        headers: { Authorization: "Bearer " + this.props.name, 'Content-Type': "application/json"},
        method: 'PATCH',
        body: JSON.stringify({
          over_18: this.state.over_18,
          show_presence: this.state.show_p,
          email_private_message: this.state.email_private_m,
          email_user_new_follower: this.state.email_user_nf,
          email_username_mention: this.state.email_user_m,
          email_upvote_post: this.state.email_upvote_p,
        })
      })
      if (this.state.index === false) {
        let res2 = await axios.get("https://oauth.reddit.com/api/v1/me/prefs", {
          headers: { Authorization: "Bearer " + this.props.name}
        })
        this.setState({
          over_18: res2.data.over_18,
          show_p: res2.data.show_presence,
          email_private_m: res2.data.email_private_message,
          email_user_nf: res2.data.email_user_new_follower,
          email_user_m: res2.data.email_username_mention,
          email_upvote_p: res2.data.email_upvote_post,
          index: true
        })
      }
      this.setState({
        image: res.data.subreddit.icon_img,
        username: res.data.subreddit.display_name,
        karma: res.data.total_karma,
        description: res.data.subreddit.public_description,
      })
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    this.getInfo()
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.text}>
              Account
          </Text>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.top}>
              <Image
                style={styles.logo}
                source={{
                  uri: this.state.image.split("?")[0],
                }}
              />
              <Text style={styles.textI}>
                {this.state.username}
              </Text>
              <Text style={styles.textI}>
                {this.state.karma} Karma(s)
              </Text>
            </View>
            <Text style={styles.textT}>
              {" "}Description:
            </Text>
            <Text style={styles.textI}>
              {"  "}{this.state.description}
            </Text>
            <Text style={styles.textT}>
              {" "}Settings:
            </Text>
            <View style={styles.settings}>
              <Text style={styles.textI}>
                {"  "}Email Private Message
              </Text>
              <Switch style={styles.switch}
                trackColor={{ false: "#500", true: "#6a994e" }}
                thumbColor={this.state.email_private_m ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {this.state.email_private_m = !this.state.email_private_m}}
                value={this.state.email_private_m}
              />
            </View>
            <View style={styles.settings}>
              <Text style={styles.textIs}>
                {"  "}Email User New Follow
              </Text>
              <Switch style={styles.switch}
                trackColor={{ false: "#500", true: "#6a994e" }}
                thumbColor={this.state.email_user_nf ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {this.state.email_user_nf = !this.state.email_user_nf}}
                value={this.state.email_user_nf}
              />
            </View>
            <View style={styles.settings}>
              <Text style={styles.textIs}>
                {"  "}Email Username Mention
              </Text>
              <Switch style={styles.switch}
                trackColor={{ false: "#500", true: "#6a994e" }}
                thumbColor={this.state.email_user_m ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {this.state.email_user_m = !this.state.email_user_m}}
                value={this.state.email_user_m}
              />
            </View>
            <View style={styles.settings}>
              <Text style={styles.textIs}>
                {"  "}Email UpVote Post
              </Text>
              <Switch style={styles.switch}
                trackColor={{ false: "#500", true: "#6a994e" }}
                thumbColor={this.state.email_upvote_p ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {this.state.email_upvote_p = !this.state.email_upvote_p}}
                value={this.state.email_upvote_p}
              />
            </View>
            <View style={styles.settings}>
              <Text style={styles.textIs}>
                {"  "}Show Presence
              </Text>
              <Switch style={styles.switch}
                trackColor={{ false: "#500", true: "#6a994e" }}
                thumbColor={this.state.show_p ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {this.state.show_p = !this.state.show_p}}
                value={this.state.show_p}
              />
            </View>
            <View style={styles.settings}>
              <Text style={styles.textIs}>
                {"  "}Over 18
              </Text>
              <Switch style={styles.switch}
                trackColor={{ false: "#500", true: "#6a994e" }}
                thumbColor={this.state.over_18 ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {this.state.over_18 = !this.state.over_18}}
                value={this.state.over_18}
              />
            </View>
          </ScrollView>
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
    width: "100%"
  },
  top: {
    alignItems: 'center',
  },
  settings: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
  },
  switch: {
    marginRight: 15,
  },
  text: {
    marginTop: 37,
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#252527',
  },
  textT: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#252527',
  },
  textI: {
    fontSize: 18,
    marginTop: 15,
    color: '#252527',
  },
  textIs: {
    fontSize: 18,
    marginTop: 15,
    color: '#252527',
  },
  logo: {
    width: 256,
    marginTop: 25,
    height: 256,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#555"
  },
  icon: {
    width: 25,
    height: 25
  },
  button: {
    width: 300,
    height: 45,
    backgroundColor: '#ff4500',
    marginBottom: 75,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#ff2000",
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

export default Account
