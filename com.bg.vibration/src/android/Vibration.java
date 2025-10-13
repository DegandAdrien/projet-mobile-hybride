package com.bg.vibration;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.os.Vibrator;
import android.content.Context;

public class Vibration extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("vibrate")) {
            long duration = args.getLong(0);
            this.vibrate(duration, callbackContext);
            return true;
        }
        return false;
    }

    private void vibrate(long duration, CallbackContext callbackContext) {
        Vibrator v = (Vibrator) this.cordova.getActivity().getSystemService(Context.VIBRATOR_SERVICE);
        if (v != null && v.hasVibrator()) {
            v.vibrate(duration);
            callbackContext.success("Vibration OK");
        } else {
            callbackContext.error("Vibration non disponible");
        }
    }
}
