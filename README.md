
# react-native-vivo-push

[![npm version](https://img.shields.io/npm/v/react-native-vivo-push.svg)](https://www.npmjs.com/package/react-native-vivo-push)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

react-native-vivo-push 使用 [Android PUSH-SDK API接口文档（2.9.0版本）](https://dev.vivo.com.cn/documentCenter/doc/364)

vivo推送是vivo公司向开发者提供的消息推送服务，通过在云端与客户端之间建立一条稳定、可靠的长连接，为开发者提供向客户端应用实时推送消息的服务，支持百亿级的通知/消息推送，秒级触达移动用户。。

## 安装

```
$ yarn add react-native-vivo-push
```

### Link

- **React Native 0.60+**

[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) 在构建应用时已自动链接此模块。 

- **React Native <= 0.59**

```bash
$ react-native link react-native-vivo-push
```

### Android 配置

在 `AndroidManifest.xml` 文件中添加以下配置：

```
<application
    ...>
    <!-- Vivo Push开放平台中应用的 appid 和 api key -->
    <meta-data
        android:name="com.vivo.push.api_key"
        android:value="在开放平台申请的app_key" />
    <meta-data
        android:name="com.vivo.push.app_id"
        android:value="在开放平台申请的app_id" />
    ...
</application>
```

## 使用

```javascript
import { VivoPush,
    VivoPushEmitter,
    VT_RECEIVE_REG_ID,
    VT_TURN_ON_PUSH,
    VT_TURN_OFF_PUSH,
    VT_BIND_ALIAS,
    VT_UN_BIND_ALIAS,
    VT_SET_TOPIC,
    VT_DEL_TOPIC,
    VT_MSG_CLICKED } from "react-native-vivo-push";
```

## API 和使用示例

  - [init](#init)
  - [checkManifest](#checkManifest)
  - [turnOnPush](#turnOnPush)
  - [turnOffPush](#turnOffPush)
  - [getRegId](#getRegId)
  - [bindAlias](#bindAlias)
  - [unBindAlias](#unBindAlias)
  - [getAlias](#getAlias)
  - [setTopic](#setTopic)
  - [delTopic](#delTopic)
  - [getTopics](#getTopics)
  - [isSupport](#isSupport)
  - [constants](#constants)
  - [VivoPushEmitter](#VivoPushEmitter)

### `init`

初始化push服务，可以提高后台发送消息的实时性。尽量在准备vivo推送前调用。

**定义**:

```js
init(): void
```

**Example**:

```js
VivoPush.init();
```

### `checkManifest`

校验接入是否异常。

**定义**:

```js
checkManifest(): Promise
```

**Returns**:

`Promise` 对象。如果当前配置错误，将抛出异常。

**Example**:

```js
VivoPush.checkManifest().then(() => {
    console.log("AndroidManifest.xml 配置正确");
}).catch(error => {
    console.log(error.message);
});
```

### `turnOnPush`

打开PUSH

**定义**:

```js
turnOnPush(): void
```

**Example**:

```js
VivoPush.turnOnPush();
```

### `turnOffPush`

关闭PUSH

**定义**:

```js
turnOffPush(): void
```

**Example**:

```js
VivoPush.turnOffPush();
```

### `getRegId`

获取当前设备的当前应用的唯一标识。

**定义**:

```js
getRegId(): Promise
```

**Returns**:

`Promise` 对象。如果存在唯一标识并且不为空，返回标识的字符串。

**Example**:

```js
VivoPush.getRegId().then(data => {
    console.log("regId：" + data);
}).catch(error => {
    console.log(error.message);
});
```

### `bindAlias`

设置应用别名。

**定义**:

```js
bindAlias(alias: string): void
```

**Example**:

```js
let alias = "别名";
VivoPush.bindAlias(alias);
```

### `unBindAlias`

取消应用别名

**定义**:

```js
unBindAlias(alias: string): void
```

**Example**:

```js
let alias = "别名";
VivoPush.unBindAlias(alias);
```

### `getAlias`

获取应用别名

**定义**:

```js
getAlias(): Promise
```
**Returns**:

`Promise` 对象。如果成功，返回应用别名的字符串。

**Example**:

```js
VivoPush.getAlias().then(data => {
    console.log(data);
}).catch(error => {
    console.log(error.message);
});
```

### `setTopic`

设置标签

**定义**:

```js
setTopic(topic: string): void
```

**Example**:

```js
let topic = "标签";
VivoPush.setTopic(topic);
```

### `delTopic`

删除标签

**定义**:

```js
delTopic(topic: string): void
```

**Example**:

```js
let topic = "标签";
VivoPush.delTopic(topic);
```

### `getTopics`

获取标签

**定义**:

```js
getTopics(): Promise
```

**Returns**:

`Promise` 对象。返回标签的字符串数组。

**Example**:

```js
VivoPush.getTopics().then(data => {
    if (data == null || data.length == 0) {
        console.log("没有标签");
        return;
    }
    console.log("标签：" + data.join("，"));
});
```

### `isSupport`

当前系统是否支持PUSH

**定义**:

```js
isSupport(): Promise
```

**Returns**:

包含当前系统是否支持PUSH的 `Promise` 对象，支持为 `true`，否则为 `false`

**Example**:

```js
VivoPush.isSupport().then(data => {
    console.log("当前系统是否支持PUSH服务：" + (data ? "支持" : "不支持"));
});
```

### `constants`

该常量用于事件订阅返回的数据类型

**定义**:

```js
VT_RECEIVE_REG_ID               // 获取当前设备的当前应用的唯一标识
VT_TURN_ON_PUSH                 // 打开PUSH
VT_TURN_OFF_PUSH                // 关闭PUSH
VT_BIND_ALIAS                   // 设置应用别名
VT_UN_BIND_ALIAS                // 取消应用别名
VT_SET_TOPIC                    // 设置标签
VT_DEL_TOPIC                    // 删除标签
VT_MSG_CLICKED                  // 点击通知
```

### `VivoPushEmitter`

用于事件订阅

**Example**:

```js
export default class App extends Component {
    constructor(props) {
        super(props);
        this.onVivoPushListener = this._onVivoPushListener.bind(this);
    }
    
    componentDidMount() {
        VivoPushEmitter.on("Vivo_Push_Response", this.onVivoPushListener);
    }

    componentWillUnmount() {
        VivoPushEmitter.removeListener('Vivo_Push_Response', this.onVivoPushListener);
    }
    
    _onVivoPushListener(data) {
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
        console.log(text);
    }
}
```

## Demo

- Demo 代码参考 [example](https://github.com/caipeiming/react-native-vivo-push/tree/master/example)

修改 `AndroidManifest.xml` 的 `com.vivo.push.api_key` 和 `com.vivo.push.app_id`，为您的应用在 vivo 推送平台申请的 `app_key` 和 `app_id`。

- 安卓手机也可以直接下载并安装已编译的 [apk](https://github.com/caipeiming/react-native-vivo-push/releases)