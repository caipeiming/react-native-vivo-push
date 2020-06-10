package top.cpming.rn.push.vivo;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.vivo.push.model.UPSNotificationMessage;
import com.vivo.push.sdk.OpenClientPushMessageReceiver;

import java.util.HashMap;

public class PushMessageReceiverImpl extends OpenClientPushMessageReceiver {
    private final String TAG = "PushMessageReceiverImpl";

    @Override
    public void onNotificationMessageClicked(Context context, UPSNotificationMessage upsNotificationMessage) {
        String customContentString = upsNotificationMessage.getSkipContent();
        String notifyString = "通知点击 msgId " + upsNotificationMessage.getMsgId() + " ;customContent=" + customContentString;
        Log.e(TAG, notifyString);

    }

    @Override
    public void onReceiveRegId(Context context, String regId) {
        String responseString = "onReceiveRegId regId = " + regId;
        Log.e(TAG, responseString);
        broadcastMessage(context, RNVivoPushModule.VT_RECEIVE_REG_ID, );
    }

    private void broadcastMessage(Context context, int type, Bundle bundle) {
        bundle.putInt("type", type);
        HashMap<String, String> extra = (HashMap<String, String>) bundle.getSerializable("extra");
        if (extra != null) {
            Bundle extraBundle = new Bundle();
            for (String key : extra.keySet()) {
                String value = extra.get(key);
                extraBundle.putString(key, value);
            }
            bundle.putBundle("extra", extraBundle);
        }
        Intent intent = new Intent("xiaomipush");
        intent.putExtras(bundle);

        LocalBroadcastManager mgr = LocalBroadcastManager.getInstance(context);
        mgr.sendBroadcast(intent);
    }
}
