package top.cpming.rn.push.vivo;

import android.content.Context;

import com.vivo.push.model.UPSNotificationMessage;
import com.vivo.push.sdk.OpenClientPushMessageReceiver;

public class PushMessageReceiverImpl extends OpenClientPushMessageReceiver {
    @Override
    public void onNotificationMessageClicked(Context context, UPSNotificationMessage upsNotificationMessage) {
        String customContentString = upsNotificationMessage.getSkipContent();
        String notifyString = "通知点击 msgId " + upsNotificationMessage.getMsgId() + " ;customContent=" + customContentString;
        Log.d(TAG, notifyString);

        // Demo更新界面展示代码，应用请在这里加入自己的处理逻辑
        updateContent(notifyString);
    }

    @Override
    public void onReceiveRegId(Context context, String regId) {
        String responseString = "onReceiveRegId regId = " + regId;
        Log.d(TAG, responseString);
        updateContent(responseString);
    }
}