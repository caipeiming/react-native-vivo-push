import { VivoPushModule } from './native-module';
import { NativeEventEmitter } from 'react-native'
import {VivoPushEmitter} from './vivo-event';

class Api {
    /**
     * 初始化 oppo push
     */
    init() {
        const nativeEventEmitter = new NativeEventEmitter(VivoPushModule);
        nativeEventEmitter.removeAllListeners('Vivo_Push_Response');
        nativeEventEmitter.addListener('Vivo_Push_Response', (data) => {
            VivoPushEmitter.emit('Vivo_Push_Response', data);
        });

        VivoPushModule.init();
    }

    initialize() {
        VivoPushModule.initialize();
    }

    checkManifest() {
        return VivoPushModule.checkManifest();
    }

    turnOnPush() {
        VivoPushModule.turnOnPush();
    }

    turnOffPush() {
        VivoPushModule.turnOffPush();
    }

    getRegId() {
        return VivoPushModule.getRegId();
    }

    bindAlias(alias: string) {
        VivoPushModule.bindAlias(alias);
    }

    unBindAlias(alias: string) {
        VivoPushModule.unBindAlias(alias);
    }

    getAlias() {
        return VivoPushModule.getAlias();
    }

    setTopic(topic: string) {
        VivoPushModule.setTopic(topic);
    }

    delTopic(topic: string) {
        VivoPushModule.delTopic(topic);
    }

    getTopics() {
        return VivoPushModule.getTopics();
    }

    isSupport() {
        return VivoPushModule.isSupport();
    }
}

export const VivoPush = new Api();