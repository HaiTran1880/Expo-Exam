import React, { Component } from 'react'
import { LayoutAnimation, UIManager } from 'react-native'
import { View, Animated, StyleSheet, Text, PanResponder, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('screen').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

class Deck extends React.Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  }

  constructor(props) {
    super(props)
    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('swipe_right')
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('swipe_left')
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      },
    })
    this.panResponder = panResponder
    this.state = { panResponder, position, index: 0 }
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start()
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props
    const item = data[this.state.index]

    direction = 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    this.state.position.setValue({ x: 0, y: 0 })
    this.setState({ index: this.state.index + 1 })
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => this.onSwipeComplete(direction))
  }
  renderCards() {
    return this.props.data
      .map((item, i) => {
        if (this.state.index >= this.props.data.length) {
          return this.props.renderNoMoreCards()
        }
        if (i < this.state.index) {
          return null
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item.id}
              style={[this.getCartStyle(), styles.cardStyle]}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          )
        }
        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      })
      .reverse()
  }

  getCartStyle() {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    })
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 })
    }
  }
  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring()
  }

  render() {
    return <View>{this.renderCards()}</View>
  }
}

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
  cardStyle: {
    position: 'absolute',
    width: '100%',
  },
}

export default Deck
