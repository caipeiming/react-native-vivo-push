
package top.cpming.rn.push.vivo;

import android.util.Log;

import androidx.annotation.Nullable;
import androidx.lifecycle.ViewModel;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.vivo.push.IPushActionListener;
import com.vivo.push.PushClient;
import com.vivo.push.util.VivoPushException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RNVivoPushModule extends ReactContextBaseJavaModule {
    private final String TAG = "RNVivoPushModule";
    private final ReactApplicationContext reactContext;

    public final static int VT_RECEIVE_REG_ID = 1;
    public final static int VT_TURN_ON_PUSH = 2;
    public final static int VT_TURN_OFF_PUSH = 3;
    public final static int VT_BIND_ALIAS = 4;
    public final static int VT_UN_BIND_ALIAS = 5;
    public final static int VT_SET_TOPIC = 6;
    public final static int VT_DEL_TOPIC = 7;

    public RNVivoPushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNVivoPush";
    }


    @ReactMethod
    public void initialize() {
        PushClient.getInstance(this.reactContext).initialize();
    }

    @ReactMethod
    public void checkManifest(Promise promise) {
        try {
            PushClient.getInstance(this.reactContext).checkManifest();
            promise.resolve(true);
        } catch (VivoPushException e) {
            e.printStackTrace();
            promise.reject("1", e.getMessage(), e);
        }
    }

    @ReactMethod
    public void turnOnPush() {
        PushClient.getInstance(this.reactContext).turnOnPush(new IPushActionListener() {
            @Override
            public void onStateChanged(int state) {
                if (state != 0) {
                    showLog("打开push异常[" + state + "]");
                } else {
                    showLog("打开push成功");
                }
                WritableMap response = Arguments.createMap();
                response.putInt("type", VT_TURN_ON_PUSH);
                response.putInt("state", state);
                sendEvent(response);
            }
        });
    }

    @ReactMethod
    public void turnOffPush() {
        PushClient.getInstance(this.reactContext).turnOffPush(new IPushActionListener() {
            @Override
            public void onStateChanged(int state) {
                if (state != 0) {
                    showLog("关闭push异常[" + state + "]");
                } else {
                    showLog("关闭push成功");
                }
                WritableMap response = Arguments.createMap();
                response.putInt("type", VT_TURN_OFF_PUSH);
                response.putInt("state", state);
                sendEvent(response);
            }
        });
    }

    @ReactMethod
    public void getRegId(Promise promise) {
        String regId = PushClient.getInstance(this.reactContext).getRegId();
        promise.resolve(regId);
    }

    @ReactMethod
    public void bindAlias(String alias) {
        PushClient.getInstance(this.reactContext).bindAlias(alias, new IPushActionListener() {
            @Override
            public void onStateChanged(int state) {
                if (state != 0) {
                    showLog("设置别名异常[" + state + "]");
                } else {
                    showLog("设置别名成功");
                }
                WritableMap response = Arguments.createMap();
                response.putInt("type", VT_BIND_ALIAS);
                response.putInt("state", state);
                sendEvent(response);
            }
        });
    }

    @ReactMethod
    public void unBindAlias(String alias) {
        PushClient.getInstance(this.reactContext).unBindAlias(alias, new IPushActionListener() {
            @Override
            public void onStateChanged(int state) {
                if (state != 0) {
                    showLog("取消别名异常[" + state + "]");
                } else {
                    showLog("取消别名成功");
                }
                WritableMap response = Arguments.createMap();
                response.putInt("type", VT_UN_BIND_ALIAS);
                response.putInt("state", state);
                sendEvent(response);
            }
        });
    }

    @ReactMethod
    public void getAlias(Promise promise) {
        String alias = PushClient.getInstance(this.reactContext).getAlias();
        promise.resolve(alias);
    }

    @ReactMethod
    public void setTopic(String topic) {
        PushClient.getInstance(this.reactContext).setTopic(topic, new IPushActionListener() {
            @Override
            public void onStateChanged(int state) {
                if (state != 0) {
                    showLog("设置标签异常[" + state + "]");
                } else {
                    showLog("设置标签成功");
                }
                WritableMap response = Arguments.createMap();
                response.putInt("type", VT_SET_TOPIC);
                response.putInt("state", state);
                sendEvent(response);
            }
        });
    }

    @ReactMethod
    public void delTopic(String topic) {
        PushClient.getInstance(this.reactContext).delTopic(topic, new IPushActionListener() {
            @Override
            public void onStateChanged(int state) {
                if (state != 0) {
                    showLog("删除标签异常[" + state + "]");
                } else {
                    showLog("删除标签成功");
                }
                WritableMap response = Arguments.createMap();
                response.putInt("type", VT_DEL_TOPIC);
                response.putInt("state", state);
                sendEvent(response);
            }
        });
    }

    @ReactMethod
    public void getTopics(Promise promise) {
        List<String> topic = PushClient.getInstance(this.reactContext).getTopics();
        promise.resolve(Arguments.fromList(topic));
    }

    @ReactMethod
    public void isSupport(Promise promise) {
        boolean isSupport = PushClient.getInstance(this.reactContext).isSupport();
        promise.resolve(isSupport);
    }

    private void showLog(String msg) {
        if (BuildConfig.DEBUG) {
            Log.e(TAG, msg);
        }
    }

    private void sendEvent(WritableMap response) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("Vivo_Push_Response", response);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("VT_TURN_ON_PUSH", VT_TURN_ON_PUSH);
        constants.put("VT_TURN_OFF_PUSH", VT_TURN_OFF_PUSH);
        constants.put("VT_BIND_ALIAS", VT_BIND_ALIAS);
        constants.put("VT_UN_BIND_ALIAS", VT_UN_BIND_ALIAS);
        constants.put("VT_SET_TOPIC", VT_SET_TOPIC);
        constants.put("VT_DEL_TOPIC", VT_DEL_TOPIC);
        return constants;
    }
}