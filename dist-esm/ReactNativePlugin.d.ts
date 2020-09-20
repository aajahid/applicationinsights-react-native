/**
 * ReactNativePlugin.ts
 * @copyright Microsoft 2019
 */
import { ITelemetryPlugin, ITelemetryItem, IPlugin, IAppInsightsCore, BaseTelemetryPlugin, IProcessTelemetryContext } from '@microsoft/applicationinsights-core-js';
import { IReactNativePluginConfig } from './Interfaces';
export declare class ReactNativePlugin extends BaseTelemetryPlugin {
    identifier: string;
    priority: number;
    _nextPlugin?: ITelemetryPlugin;
    constructor(config?: IReactNativePluginConfig);
    initialize(config?: IReactNativePluginConfig | object, // need `| object` to coerce to interface
    core?: IAppInsightsCore, extensions?: IPlugin[]): void;
    processTelemetry(env: ITelemetryItem, itemCtx?: IProcessTelemetryContext): void;
    setDeviceId(newId: string): void;
    setDeviceModel(newModel: string): void;
    setDeviceType(newType: string): void;
}
