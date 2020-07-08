import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Modal, View, Text, Platform, TouchableHighlight, Dimensions, TouchableOpacity, TextInput} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
export const TOUCHABLE_UNDERLAY_COLOR = "#dddce0";

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reloadCount: 1,
        };
        this.myProps = {...this.props};
        this.isMount = true;
        this.onConfirmPress = this._onConfirmPress.bind(this);
        this.onCloseBonusPress = this._onCloseBonusPress.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.reloadCount != this.state.reloadCount;
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    show(params) {
        if (this.myProps.show) {
            return;
        }
        this.myProps = Object.assign({}, this.myProps, params);
        this.myProps.show = true;
        this.myProps.value = "";
        this.safeSetState();
    }

    safeSetState() {
        this.setState({reloadCount: this.state.reloadCount + 1});
    }

    _onCloseBonusPress() {
        if (!this.myProps.show) {
            return;
        }
        this.myProps.show = false;
        this.safeSetState();
    }

    _onConfirmPress() {
        this._onCloseBonusPress();
        let {callback, value} = this.myProps;
        callback && callback(value);
    }

    render() {
        let {show, btnText, placeholder} = this.myProps;
        let style = {};
        if (!show) {
            return null;
        }
        return(
            <Modal animationType={"fade"} transparent={true} visible={true} onRequestClose={this.onCloseBonusPress}>
                <View style = {[styles.modalContainer]} >
                    <TouchableOpacity activeOpacity={1} style={{backgroundColor: "#000000aa", position: "absolute", left: 0, top: 0, right: 0, bottom: 0}} onPress={this.onCloseBonusPress} />
                    <View style={{width: deviceWidth - 80, backgroundColor: "#fff", borderRadius: 5, paddingTop: 15}}>
                        <TextInput style={{height: 45, width: "100%", paddingLeft: 10, paddingRight: 10, justifyContent: "center", backgroundColor: "#efeff4", fontSize: 16}} placeholder={placeholder} autoFocus={true} onChangeText={text => {
                            this.myProps.value = text;
                        }} />
                        <TouchableHighlight underlayColor={TOUCHABLE_UNDERLAY_COLOR} style={{height: 50, marginTop: 5, justifyContent: "center", alignItems: "center"}} onPress={this.onConfirmPress}>
                            <Text style={{fontSize: 16, color: "#333"}}>{btnText}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}

var styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "transparent"},
});