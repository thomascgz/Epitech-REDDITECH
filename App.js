import React, { useState } from 'react';
import Nav from './Components/Navigation'
import { StyleSheet, View, TextInput, Text, FlatList, ActivityIndicator, Button, Image, Pressable, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import qs from 'qs';

export default function App() {
  const [code, setCode] = useState("ko");
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState("");
  const [req, setReq] = useState(false);

  const webViewChange = newNavState => {
    const { url } = newNavState;
    var regex = /[?&]([^=#]+)=([^&#]*)/g, params = {}, match;
    while (match = regex.exec(url)) {
      params[match[1]] = match[2];
    }
    if (params.code)
      setCode(params.code)
  };

  const getToken = () => {
    if (req === false) {
      let base64 = require('base-64');
      let url = 'https://www.reddit.com/api/v1/access_token';
      let username = '9wRNIP0XJPHdEtmjbh_Sow';
      let password = 'wGJ0o92pf1Sob8SG54TKyCitSq0WrQ';
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
      const data = qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://uj-g5r.anonymous.b-dev-501-par-5-1-redditech-harone-saadouni.exp.direct:80'
      });

      fetch(url, {
        method:'POST',
        headers: headers,
        body: data
       })
      .then(res => res.json())
      .then(json => {
        setReq(true)
        setToken(json.access_token)
        console.log(json.access_token)
      });
    }
  };

  if (code === "") {
    return (
      <WebView
        style={styles.webview}
        source={{uri: 'https://www.reddit.com/api/v1/authorize.compact?client_id=9wRNIP0XJPHdEtmjbh_Sow&response_type=code&state=test&redirect_uri=http://uj-g5r.anonymous.b-dev-501-par-5-1-redditech-harone-saadouni.exp.direct:80&duration=permanent&scope=identity+edit+flair+history+modconfig+modflair+modlog+modposts+modwiki+mysubreddits+account+privatemessages+read+report+save+submit+subscribe+vote+wikiedit+wikiread'}}
        onNavigationStateChange={webViewChange}
      />
    );
  }  else if (code !== "ko") {
    return (
      <View style={styles.main}>
        {getToken()}
        <Nav name={token}/>
      </View>
    )
  } else {
    return (
      <View style={styles.main}>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => {setCode("")}} style={styles.button}>
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
      flex: 1,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
})
