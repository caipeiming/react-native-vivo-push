import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, FlatList, View, Text, Platform, TouchableHighlight, StatusBar, ToastAndroid} from 'react-native';
import {VivoPush, VivoPushEmitter, VT_RECEIVE_REG_ID, VT_TURN_ON_PUSH, VT_TURN_OFF_PUSH, VT_BIND_ALIAS, VT_UN_BIND_ALIAS, VT_SET_TOPIC, VT_DEL_TOPIC, VT_MSG_CLICKED} from 'react-native-vivo-push';

import Dialog from './Dialog';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.isMount = true;
        this.init = this._init.bind(this);
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
            text = JSON.stringify(msg);
            if (msg.type != null) {
                let {data, state, type} = msg;
                switch(type) {
                    case VT_RECEIVE_REG_ID:
                        text = "registerId：" + data;
                        break;
                    case VT_TURN_ON_PUSH:
                        if (state != 0) {
                            text = "打开push异常[" + state + "]";
                        } else {
                            text = "打开push成功";
                        }
                        break;
                    case VT_TURN_OFF_PUSH: 
                        if (state != 0) {
                            text = "关闭push异常[" + state + "]";
                        } else {
                            text = "关闭push成功";
                        }
                        break;
                    case VT_BIND_ALIAS:
                        if (state != 0) {
                            text = "设置别名异常[" + state + "]";
                        } else {
                            text = "设置别名成功";
                        }
                        break;
                    case VT_UN_BIND_ALIAS:
                        if (state != 0) {
                            text = "取消别名异常[" + state + "]";
                        } else {
                            text = "取消别名成功";
                        }
                        break;
                    case VT_SET_TOPIC:
                        if (state != 0) {
                            text = "设置标签异常[" + state + "]";
                        } else {
                            text = "设置标签成功";
                        }
                        break;
                    case VT_DEL_TOPIC:
                        if (state != 0) {
                            text = "删除标签异常[" + state + "]";
                        } else {
                            text = "删除标签成功";
                        }
                        break;
                    case VT_MSG_CLICKED:
                        text = "点击了通知：\n" + JSON.stringify(JSON.parse(data), null, 4);
                        break;
                }
            }
        }
        this._list && this._list.addLog(text);
    }

    _clearLog() {
        this._list && this._list.clear();
    }

    _init() {
        VivoPush.init();
    }

    _checkManifest() {
        VivoPush.checkManifest().then(data => {
            this.showLog("AndroidManifest.xml 配置正确");
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
            this.showLog("registerId：" + data);
        }).catch(error => {
            this.showLog(error.message);
        });
    }

    _bindAlias() {
        this._dialog && this._dialog.show({
            key: "alias",
            btnText: "设置别名",
            placeholder: "请输入别名",
            callback: text => {
                if (text == null || text.trim().length == 0) {
                    ToastAndroid.showWithGravity('请填写别名', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    return;
                }
                VivoPush.bindAlias(text);
            }
        });
    }

    _unBindAlias() {
        this._dialog && this._dialog.show({
            key: "alias",
            btnText: "取消别名",
            placeholder: "请输入别名",
            callback: text => {
                if (text == null || text.trim().length == 0) {
                    ToastAndroid.showWithGravity('请填写别名', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    return;
                }
                VivoPush.unBindAlias(text);
            }
        });
    }

    _getAlias() {
        VivoPush.getAlias().then(data => {
            this.showLog(data);
        }).catch(error => {
            this.showLog(error.message);
        });
    }

    _setTopic() {
        this._dialog && this._dialog.show({
            key: "alias",
            btnText: "设置标签",
            placeholder: "请输入标签",
            callback: text => {
                if (text == null || text.trim().length == 0) {
                    ToastAndroid.showWithGravity('请填写标签', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    return;
                }
                VivoPush.setTopic(text);
            }
        });
    }

    _delTopic() {
        this._dialog && this._dialog.show({
            key: "alias",
            btnText: "删除标签",
            placeholder: "请输入标签",
            callback: text => {
                if (text == null || text.trim().length == 0) {
                    ToastAndroid.showWithGravity('请填写标签', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    return;
                }
                VivoPush.delTopic(text);
            }
        });
    }

    _getTopics() {
        VivoPush.getTopics().then(data => {
            if (data == null || data.length == 0) {
                this.showLog("没有标签");
                return;
            }
            this.showLog("标签：" + data.join("，"));
        });
    }

    _isSupport() {
        VivoPush.isSupport().then(data => {
            this.showLog("当前系统是否支持PUSH服务：" + (data ? "支持" : "不支持"));
        });
    }

    render() {
        let key = 0;
        let views = [
            <TouchableHighlight key={key ++} style={styles.touchableHighlight} onPress={this.init}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>init</Text>
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
                <Dialog ref={ele => this._dialog = ele} />
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