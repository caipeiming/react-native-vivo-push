
package top.cpming.rn.push.vivo;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.vivo.push.IPushActionListener;
import com.vivo.push.PushClient;
import com.vivo.push.util.VivoPushException;

import java.util.List;

public class RNVivoPushModule extends ReactContextBaseJavaModule {
    private final String TAG = "RNVivoPushModule";
    private final ReactApplicationContext reactContext;

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
            promise.reject("1", e);
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
            }
        });
    }

    @ReactMethod
    public void getTopics(Promise promise) {
        List<String> topic = PushClient.getInstance(this.reactContext).getTopics();
        promise.resolve(topic);
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
}