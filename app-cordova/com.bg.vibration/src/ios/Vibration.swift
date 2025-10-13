import AudioToolbox

@objc(Vibration) class Vibration : CDVPlugin {
    @objc(vibrate:)
    func vibrate(command: CDVInvokedUrlCommand) {
        AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: "Vibration OK")
        self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }
}
