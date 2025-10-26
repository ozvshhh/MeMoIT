import React, { Component } from "react";
import { Platform } from "react-native";
import { WebView } from 'react-native-webview';

const WebviewContainer = () => {
    return (
        <WebView
            source={{uri:'https://google.com'}}
            style={{flex: 1}}
        />
    )
}

export default WebviewContainer;