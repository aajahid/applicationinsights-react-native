/**
 * ReactNativePlugin.ts
 * @copyright Microsoft 2019
 */
import { CoreUtils, LoggingSeverity, _InternalMessageId, BaseTelemetryPlugin } from '@microsoft/applicationinsights-core-js';
import { ConfigurationManager, SeverityLevel, AnalyticsPluginIdentifier } from '@microsoft/applicationinsights-common';
import DeviceInfo from 'react-native-device-info';
import dynamicProto from '@microsoft/dynamicproto-js';
var ReactNativePlugin = /** @class */ (function (_super) {
    __extends(ReactNativePlugin, _super);
    function ReactNativePlugin(config) {
        var _this = _super.call(this) || this;
        _this.identifier = 'AppInsightsReactNativePlugin';
        _this.priority = 140;
        var _device = {};
        var _config = config || _getDefaultConfig();
        var _analyticsPlugin;
        var _defaultHandler;
        dynamicProto(ReactNativePlugin, _this, function (_self, _base) {
            _self.initialize = function (config, // need `| object` to coerce to interface
            core, extensions) {
                if (!_self.isInitialized()) {
                    _base.initialize(config, core, extensions);
                    var inConfig = config || {};
                    var defaultConfig = _getDefaultConfig();
                    for (var option in defaultConfig) {
                        _config[option] = ConfigurationManager.getConfig(inConfig, option, _self.identifier, _config[option]);
                    }
                    if (!_config.disableDeviceCollection) {
                        _collectDeviceInfo();
                    }
                    if (extensions) {
                        CoreUtils.arrForEach(extensions, function (ext) {
                            var identifier = ext.identifier;
                            if (identifier === AnalyticsPluginIdentifier) {
                                _analyticsPlugin = ext;
                            }
                        });
                    }
                    if (!_config.disableExceptionCollection) {
                        _setExceptionHandler();
                    }
                }
            };
            _self.processTelemetry = function (item, itemCtx) {
                _applyDeviceContext(item);
                _self.processNext(item, itemCtx);
            };
            _self.setDeviceId = function (newId) {
                _device.id = newId;
            };
            _self.setDeviceModel = function (newModel) {
                _device.model = newModel;
            };
            _self.setDeviceType = function (newType) {
                _device.deviceClass = newType;
            };
            /**
             * Automatically collects native device info for this device
             */
            function _collectDeviceInfo() {
                _device.deviceClass = "Handset";
                _device.id = DeviceInfo.getUniqueId(); // Installation ID
                _device.model = DeviceInfo.getModel();
            }
            function _applyDeviceContext(item) {
                if (_device) {
                    item.ext = item.ext || {};
                    item.ext.device = item.ext.device || {};
                    if (typeof _device.id === 'string') {
                        item.ext.device.localId = _device.id;
                    }
                    if (typeof _device.model === 'string') {
                        item.ext.device.model = _device.model;
                    }
                    if (typeof _device.deviceClass === 'string') {
                        item.ext.device.deviceClass = _device.deviceClass;
                    }
                }
            }
            function _setExceptionHandler() {
                var _global = global;
                if (_global && _global.ErrorUtils) {
                    // intercept react-native error handling
                    _defaultHandler = (typeof _global.ErrorUtils.getGlobalHandler === 'function' && _global.ErrorUtils.getGlobalHandler()) || _global.ErrorUtils._globalHandler;
                    _global.ErrorUtils.setGlobalHandler(_trackException.bind(this));
                }
            }
            // default global error handler syntax: handleError(e, isFatal)
            function _trackException(e, isFatal) {
                var exception = { exception: e, severityLevel: SeverityLevel.Error };
                if (_analyticsPlugin) {
                    _analyticsPlugin.trackException(exception);
                }
                else {
                    _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TelemetryInitializerFailed, "Analytics plugin is not available, ReactNative plugin telemetry will not be sent: ");
                }
                // call the _defaultHandler - react native also gets the error
                if (_defaultHandler) {
                    _defaultHandler.call(global, e, isFatal);
                }
            }
        });
        function _getDefaultConfig() {
            return {
                // enable auto collection by default
                disableDeviceCollection: false,
                disableExceptionCollection: false
            };
        }
        return _this;
    }
    ReactNativePlugin.prototype.initialize = function (config, // need `| object` to coerce to interface
    core, extensions) {
        // @DynamicProtoStub -- DO NOT add any code as this will be removed during packaging
    };
    ReactNativePlugin.prototype.processTelemetry = function (env, itemCtx) {
        // @DynamicProtoStub -- DO NOT add any code as this will be removed during packaging
    };
    ReactNativePlugin.prototype.setDeviceId = function (newId) {
        // @DynamicProtoStub -- DO NOT add any code as this will be removed during packaging
    };
    ReactNativePlugin.prototype.setDeviceModel = function (newModel) {
        // @DynamicProtoStub -- DO NOT add any code as this will be removed during packaging
    };
    ReactNativePlugin.prototype.setDeviceType = function (newType) {
        // @DynamicProtoStub -- DO NOT add any code as this will be removed during packaging
    };
    return ReactNativePlugin;
}(BaseTelemetryPlugin));
export { ReactNativePlugin };
//# sourceMappingURL=ReactNativePlugin.js.map