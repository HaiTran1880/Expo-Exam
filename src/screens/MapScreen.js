import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { ActivityIndicator } from 'react-native'
export default class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    },
  }
  componentDidMount() {
    this.setState({ mapLoaded: true })
  }
  onRegionChangeComplete(region) {
    this.setState({ region: region })
  }
  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
