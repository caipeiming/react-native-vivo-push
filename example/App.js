import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, FlatList, View, Text, Platform, TouchableHighlight, StatusBar} from 'react-native';
import {VivoPush, VivoPushEmitter} from 'react-native-vivo-push';

const TN_URL_01 = "http://101.231.204.84:8091/sim/getacptn";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.isMount = true;
        this.initialize = this._initialize.bind(this);
        this.checkManifest = this._checkManifest.bind(this);
        this.turnOnPush = this._turnOnPush.bind(this);
        this.turnOffPush = this._turnOffPush.bind(this);
        this.getRegId = this._getRegId.bind(this);
        this.bindAlias = this._bindAlias.bind(this);
        this.unBindAlias = this._unBindAlias.bind(this);
        this.getAlias = this._getAlias.bind(this);
        this.setTopic = this._setTopic.bind(this);
        this.delTopic = this._delTopic.bind(this);
        this.getTopics = this._getTopics.bind(this);
        this.isSupport = this._isSupport.bind(this);
        this.clearLog = this._clearLog.bind(this);
        this.onVivoPushListener = this._onVivoPushListener.bind(this);
    }

    componentDidMount() {
        VivoPushEmitter.on("Vivo_Push_Response", this.onVivoPushListener);
    }

    componentWillUnmount() {
        this.isMount = false;
        VivoPushEmitter.removeListener('Vivo_Push_Response', this.onVivoPushListener);
    }

    _onVivoPushListener(data) {
        this.showLog(data);
    }

    showLog(msg) {
        let text;
        if (typeof msg == "string") {
            text = msg;
        } else {
            text = JSON.stringify(msg)
        }
        this._list && this._list.addLog(text);
    }

    _clearLog() {
        this._list && this._list.clear();
    }

    _initialize() {
        VivoPush.initialize();
    }

    _checkManifest() {
        VivoPush.checkManifest().then(data => {
            this.showLog(data);
        }).catch(error => {
            this.showLog(error.message);
        });
    }

    _turnOnPush() {
        VivoPush.turnOnPush();
    }

    _turnOffPush() {
        VivoPush.turnOffPush();
    }

    _getRegId() {
        VivoPush.getRegId().then(data => {
            this.showLog(data);
        });
    }

    _bindAlias() {
        VivoPush.bindAlias("alias");
    }

    _unBindAlias() {
        VivoPush.unBindAlias("alias");
    }

    _getAlias() {
        VivoPush.getAlias().then(data => {
            this.showLog(data);
        });
    }

    _setTopic() {
        VivoPush.setTopic("topic");
    }

    _delTopic() {
        VivoPush.delTopic("topic");
    }

    _getTopics() {
        VivoPush.getTopics().then(data => {
            this.showLog(data);
        });
    }

    _isSupport() {
        VivoPush.isSupport().then(data => {
            this.showLog(data);
        });
    }

    render() {
        let key = 0;
        let views = [
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.initialize}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>initialize</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.checkManifest}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>checkManifest</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.turnOnPush}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>turnOnPush</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.turnOffPush}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>turnOffPush</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.getRegId}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>getRegId</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.bindAlias}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>bindAlias</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.unBindAlias}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>unBindAlias</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.getAlias}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>getAlias</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.setTopic}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>setTopic</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.delTopic}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>delTopic</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.getTopics}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>getTopics</Text>
                </View>
            </TouchableHighlight>,
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.isSupport}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>isSupport</Text>
                </View>
            </TouchableHighlight>
        ];
        views.push(
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.clearLog}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>清除控制台</Text>
                </View>
            </TouchableHighlight>
        );
        return (
            <SafeAreaView style={styles.fill}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.fill}>
                    <View style={{flexDirection: 'row', flexWrap: "wrap"}}>
                        {views}
                    </View>
                    <Text style={styles.logText}>控制台：</Text>
                    <ResultView ref={ele => this._list = ele} />
                </View>
            </SafeAreaView>
        );
    } 
}

class ResultView extends Component {
    constructor(props) {
        super(props);
        this.keyPrefix = 0;
        this.dataSource = [];
        this.state = {
            reload: 0
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.reload != nextState.reload;
    }

    updateView() {
        this.setState({
            reload: this.state.reload + 1
        });
    }

    clear() {
        this.dataSource = [];
        this.keyPrefix ++;
        this.updateView();
    }

    addLog(text) {
        this.dataSource.push(this.formatDate("yyyy-MM-dd HH:mm:ss") + `\n` + text);
        this.updateView();
    }

    formatDate (format) {
        let date = new Date();
        var pad = function(n) {
            return n < 10 ? '0' + n : n;
        }
        var year = date.getFullYear();
        var yearShort = year.toString().substring(2);
        var month = date.getMonth() + 1;
        var monthPad = pad(month);
        var dateInMonth = date.getDate();
        var dateInMonthPad = pad(dateInMonth);
        var hour = date.getHours();
        var hourPad = pad(hour);
        var minute = date.getMinutes();
        var minutePad = pad(minute);
        var second = date.getSeconds();
        var secondPad = pad(second);
        return format.replace(/yyyy/g, year).replace(/yy/g, yearShort)
                    .replace(/MM/g, monthPad).replace(/M/g, month)
                    .replace(/dd/g, dateInMonthPad).replace(/d/g, dateInMonth)
                    .replace(/HH/g, hourPad).replace(/H/g, hour)
                    .replace(/mm/g, minutePad).replace(/m/g, minute)
                    .replace(/ss/g, secondPad).replace(/s/g, second);
    }

    render() {
        return (
            <FlatList style={{flex: 1, backgroundColor: "#eee"}} 
                data={this.dataSource}
                keyExtractor={(item, index) => (index + "_" + this.keyPrefix)}
                renderItem={({item}) => {
                    return <Text style={styles.logText}>{item}</Text>
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    fill: {flex: 1, backgroundColor: "#fff", ...Platform.select({android: {padding: 5}, ios: {padding: 10}})},
    touchableHighlight: {marginRight: 10, marginBottom: 10},
    btn: {paddingLeft: 10, paddingRight: 10, height: 45, justifyContent: "center", backgroundColor: "#f2f2f2", margin: 0},
    btnText: {fontSize: 15, color: "#15a659"},
    logText: {padding: 5, color: "#333"},
});