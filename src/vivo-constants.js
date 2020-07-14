import { Platform } from 'react-native';
import { VivoPushModule } from './native-module'

export const VT_RECEIVE_REG_ID = Platform.OS === "ios" ? null : VivoPushModule.VT_RECEIVE_REG_ID;
export const VT_TURN_ON_PUSH = Platform.OS === "ios" ? null : VivoPushModule.VT_TURN_ON_PUSH;
export const VT_TURN_OFF_PUSH = Platform.OS === "ios" ? null : VivoPushModule.VT_TURN_OFF_PUSH;
export const VT_BIND_ALIAS = Platform.OS === "ios" ? null : VivoPushModule.VT_BIND_ALIAS;
export const VT_UN_BIND_ALIAS = Platform.OS === "ios" ? null : VivoPushModule.VT_UN_BIND_ALIAS;
export const VT_SET_TOPIC = Platform.OS === "ios" ? null : VivoPushModule.VT_SET_TOPIC;
export const VT_DEL_TOPIC = Platform.OS === "ios" ? null : VivoPushModule.VT_DEL_TOPIC;
export const VT_MSG_CLICKED = Platform.OS === "ios" ? null : VivoPushModule.VT_MSG_CLICKED;