package top.cpming.rn.push.vivo;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.JsonReader;
import android.util.Log;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.vivo.push.model.UPSNotificationMessage;
import com.vivo.push.sdk.OpenClientPushMessageReceiver;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class PushMessageReceiverImpl extends OpenClientPushMessageReceiver {
    private final String TAG = "PushMessageReceiverImpl";

    @Override
    public void onNotificationMessageClicked(Context context, UPSNotificationMessage upsNotificationMessage) {
        JSONObject json = new JSONObject();
        try {
            json.put("mTargetType", upsNotificationMessage.getTargetType());
            json.put("mTragetContent", upsNotificationMessage.getTragetContent());
            json.put("mTitle", upsNotificationMessage.getTitle());
            json.put("mContent", upsNotificationMessage.getContent());
            json.put("mNotifyType", upsNotificationMessage.getNotifyType());
            json.put("mPurePicUrl", upsNotificationMessage.getPurePicUrl());
            json.put("mIconUrl", upsNotificationMessage.getIconUrl());
            json.put("mCoverUrl", upsNotificationMessage.getCoverUrl());
            json.put("mSkipContent", upsNotificationMessage.getSkipContent());
            json.put("mSkipType", upsNotificationMessage.getSkipType());
            json.put("mShowTime", upsNotificationMessage.isShowTime());
            json.put("mMsgId", upsNotificationMessage.getMsgId());
            json.put("mParams", new JSONObject(upsNotificationMessage.getParams()));
            json.put("mIsMacroReplace", upsNotificationMessage.isMacroReplace());
            json.put("mAdClickCheckUrl", upsNotificationMessage.getAdClickCheckUrl());
            json.put("mCompatibleType", upsNotificationMessage.getCompatibleType());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.e(TAG, json.toString());
        Bundle bundle = new Bundle();
        bundle.putString("data", json.toString());
        broadcastMessage(context, RNVivoPushModule.VT_MSG_CLICKED, bundle);
    }

    @Override
    public void onReceiveRegId(Context context, String regId) {
        String responseString = "onReceiveRegId regId = " + regId;
        Log.e(TAG, responseString);
        Bundle bundle = new Bundle();
        bundle.putString("data", regId);
        broadcastMessage(context, RNVivoPushModule.VT_RECEIVE_REG_ID, bundle);
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
        Intent intent = new Intent("vivo_push");
        intent.putExtras(bundle);

        LocalBroadcastManager mgr = LocalBroadcastManager.getInstance(context);
        mgr.sendBroadcast(intent);
    }
}
