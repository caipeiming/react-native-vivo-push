
package top.cpming.rn.push.vivo;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNVivoPushModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNVivoPushModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNVivoPush";
  }
}