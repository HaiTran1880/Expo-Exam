import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class Ball extends React.Component {

    componentDidMount() {
        this.position = new Animated.ValueXY(0,0);
        Animated.spring(this.position,{
            toValue : {x:200, y:500},
            useNativeDriver:true,
        }).start()
    }
    render() {
        return (
            <Animated.View style={styles.ball} />
        )
    }
}

const styles = {
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black',
    }
}

export default Ball