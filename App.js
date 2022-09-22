import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card, Button } from 'react-native-elements'
import Ball from './src/Ball'
import Deck from './src/Deck'
import MapScreen from './src/screens/MapScreen'

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTY_c6NcEpflIPE0KJD5eTEDL65lsPNNjCkA&usqp=CAU',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'https://qph.cf2.quoracdn.net/main-qimg-d9fce392312d43ac412617322d3578b3-lq',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'https://c4.wallpaperflare.com/wallpaper/930/348/990/great-wall-of-china-wallpaper-preview.jpg',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'https://c0.wallpaperflare.com/preview/698/539/783/china-changji.jpg',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'https://i.insider.com/5e837bdf14f18f671e0dea06?width=1000&format=jpeg&auto=webp',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'https://yourhere.live/wp-content/uploads/2020/07/alex-keda-gDw0-4vbkkY-unsplash.jpg',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'https://i.ytimg.com/vi/GssjGVjaGuQ/maxresdefault.jpg',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'https://www.insidewink.com/wp-content/uploads/2020/04/Jean_Trebek_Beauty_in_Nature.jpg',
  },
]

class App extends React.Component {
  renderCard(item) {
    console.log('item', item)
    return (
      <Card key={item?.id}>
        <Image style={styles.image} resizeMode="cover" source={{ uri: item?.uri }} />
        <Card.Divider />
        <Card.Title>{item?.text}</Card.Title>
        <Text style={{ marginBottom: 10 }}>I can customize the Card further.</Text>
        <Button icon={{ name: 'code' }} backgroundColor="#03A9F4" title="View Now!" />
      </Card>
    )
  }
  renderNoMoreCards() {
    return (
      <Card>
        <Card.Title>All Done!</Card.Title>
        <Text>There's no more content here!</Text>
        <Card.Divider />
        <Button backgroundColor="#03A9F4" title="Get more!" />
      </Card>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Ball/> */}
        {/* <View style={{ height: 100 }} />
        <Deck data={DATA} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} /> */}
        <MapScreen />
        <StatusBar style="auto" />
      </View>
    )
  }
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginRight: 10,
  },
})
