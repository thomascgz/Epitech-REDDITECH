import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image, Linking } from 'react-native'

class Post extends React.Component {
  logo = () => {
    if (this.props.name.data.post_hint === "image") {
      return (
        <Image
          style={styles.logo1}
          source={{
            uri: this.props.name.data.url,
          }}
        />
      )
    } else if (this.props.name.data.post_hint === "link" || this.props.name.data.post_hint === "rich:video" || this.props.name.data.post_hint === "hosted:video" || this.props.name.data.thumbnail.indexOf("/") !== -1) {
      return (
        <View style={styles.vlogo1l}>
          <Text style={styles.llogo1l}
            onPress={() => Linking.openURL(this.props.name.data.url)}>
            {this.props.name.data.url}
          </Text>
          <Image
            style={styles.logo1l}
            source={{
              uri: this.props.name.data.thumbnail,
            }}
          />
        </View>
      )
    } else if (this.props.name.data.post_hint !== "link" && this.props.name.data.post_hint !== "rich:video" && this.props.name.data.post_hint !== "hosted:video" ) {
      return (
        <Text style={styles.tlogo1l}>
          {this.props.name.data.selftext}
        </Text>
      )
    }
  }
  
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png",
            }}
          />
          <View>
            <Text style={styles.desc_text}>r/{this.props.name.data.subreddit}</Text>
            <Text style={styles.desc_text1}>u/{this.props.name.data.author} · {this.props.name.data.domain}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.title_text}>{this.props.name.data.title}</Text>
        </View>
          {this.logo()}
        <View style={styles.foot}>
          <View style={styles.foot1}>
            <Image
              style={styles.logo2}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/929/929769.png",
              }}
            />
            <Text>
              {" "}{this.props.name.data.score}{" "}
            </Text>
            <Image
              style={styles.logo2}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/929/929750.png",
              }}
            />
          </View>
          <View style={styles.foot2}>
            <Image
              style={styles.logo2}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/685/685887.png",
              }}
            />
            <Text>
              {" "}{this.props.name.data.num_comments}
            </Text>
          </View>
          <View style={styles.foot3}>
            <Image
              style={styles.logo2}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2089/2089736.png",
              }}
            />
            <Text>
              {" "}Partager
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 15,
    shadowColor: "#777",
    shadowOffset: {
    	width: 1,
    	height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.00,
    elevation: 2
  },
  header: {
    flexDirection: "row",
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  body: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  foot: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "space-between"
  },
  foot1: {
    flexDirection: "row",
    alignItems: "center",
  },
  foot2: {
    flexDirection: "row",
    alignItems: "center",
  },
  foot3: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  logo1: {
    width: 390,
    height : 300,
    marginBottom: 10,
  },
  ytbv: {
    width: 390,
    height : 300,
    marginBottom: 10,
  },
  vlogo1l: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20
  },
  tlogo1l: {
    overflow: "hidden",
    height: 100,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  llogo1l: {
    color: "#0079d3",
    overflow: "hidden",
    height: 30,
    width: 175,
    marginTop: 10
  },
  logo1l: {
    width: 150,
    height : 150,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  logo2: {
    width: 20,
    height: 20,
  },
  title_text: {
    fontSize: 18,
    color: '#252527',
    fontWeight: 'bold',
  },
  desc_text: {
    fontSize: 12,
    color: '#555',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  desc_text1: {
    fontSize: 12,
    color: '#555',
    marginLeft: 10
  },
})

export default Post
