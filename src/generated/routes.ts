/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DevicesController } from './../devices/DevicesController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "DeviceType.HeatAlarm": {
        "dataType": "refEnum",
        "enums": ["HA"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ThermalDeviceConfiguration": {
        "dataType": "refObject",
        "properties": {
            "deviceType": {"ref":"DeviceType.HeatAlarm","required":true},
            "temperatureLowThreshold": {"dataType":"double","required":true},
            "temperatureHighThreshold": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceType.EnvironmentalSensor": {
        "dataType": "refEnum",
        "enums": ["ES"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EnvironmentalDeviceConfiguration": {
        "dataType": "refObject",
        "properties": {
            "deviceType": {"ref":"DeviceType.EnvironmentalSensor","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceType.SmokeAlarm": {
        "dataType": "refEnum",
        "enums": ["SA"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SmokeDeviceConfiguration": {
        "dataType": "refObject",
        "properties": {
            "deviceType": {"ref":"DeviceType.SmokeAlarm","required":true},
            "concentrationHighThreshold": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Device": {
        "dataType": "refObject",
        "properties": {
            "series": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Series information must not be shorter than 3 characters!","value":3}}},
            "modelName": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Model name must not be shorter than 3 characters!","value":3}}},
            "deviceConfiguration": {"dataType":"union","subSchemas":[{"ref":"ThermalDeviceConfiguration"},{"ref":"EnvironmentalDeviceConfiguration"},{"ref":"SmokeDeviceConfiguration"}],"required":true},
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateErrorJSON": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"enum","enums":["Validation failed"],"required":true},
            "details": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceCreationParams": {
        "dataType": "refObject",
        "properties": {
            "series": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Series information must not be shorter than 3 characters!","value":3}}},
            "modelName": {"dataType":"string","required":true,"validators":{"minLength":{"errorMsg":"Model name must not be shorter than 3 characters!","value":3}}},
            "deviceConfiguration": {"dataType":"union","subSchemas":[{"ref":"ThermalDeviceConfiguration"},{"ref":"EnvironmentalDeviceConfiguration"},{"ref":"SmokeDeviceConfiguration"}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceConfiguration": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"ThermalDeviceConfiguration"},{"ref":"EnvironmentalDeviceConfiguration"},{"ref":"SmokeDeviceConfiguration"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AlarmStatus": {
        "dataType": "refEnum",
        "enums": ["N","A"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ThermalDataPoint": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "dataPointType": {"dataType":"enum","enums":["T"],"required":true},
            "temperature": {"dataType":"double","required":true},
            "alarmStatus": {"ref":"AlarmStatus","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EnvironmentalDataPoint": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "dataPointType": {"dataType":"enum","enums":["E"],"required":true},
            "temperature": {"dataType":"double","required":true},
            "humidity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SmokeDataPoint": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "dataPointType": {"dataType":"enum","enums":["S"],"required":true},
            "concentration": {"dataType":"double","required":true},
            "alarmStatus": {"ref":"AlarmStatus","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DataPoint": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"ThermalDataPoint"},{"ref":"EnvironmentalDataPoint"},{"ref":"SmokeDataPoint"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        app.get('/devices/:deviceId',
            ...(fetchMiddlewares<RequestHandler>(DevicesController)),
            ...(fetchMiddlewares<RequestHandler>(DevicesController.prototype.getDeviceDetails)),

            async function DevicesController_getDeviceDetails(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DevicesController();

              await templateService.apiHandler({
                methodName: 'getDeviceDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/devices',
            ...(fetchMiddlewares<RequestHandler>(DevicesController)),
            ...(fetchMiddlewares<RequestHandler>(DevicesController.prototype.listDevices)),

            async function DevicesController_listDevices(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DevicesController();

              await templateService.apiHandler({
                methodName: 'listDevices',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/devices',
            ...(fetchMiddlewares<RequestHandler>(DevicesController)),
            ...(fetchMiddlewares<RequestHandler>(DevicesController.prototype.registerDevice)),

            async function DevicesController_registerDevice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceCreationParams: {"in":"body","name":"deviceCreationParams","required":true,"ref":"DeviceCreationParams"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DevicesController();

              await templateService.apiHandler({
                methodName: 'registerDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/devices/:deviceId/configuration',
            ...(fetchMiddlewares<RequestHandler>(DevicesController)),
            ...(fetchMiddlewares<RequestHandler>(DevicesController.prototype.updateDeviceConfiguration)),

            async function DevicesController_updateDeviceConfiguration(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"string"},
                    deviceConfiguration: {"in":"body","name":"deviceConfiguration","required":true,"ref":"DeviceConfiguration"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DevicesController();

              await templateService.apiHandler({
                methodName: 'updateDeviceConfiguration',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/devices/:deviceId/datapoint',
            ...(fetchMiddlewares<RequestHandler>(DevicesController)),
            ...(fetchMiddlewares<RequestHandler>(DevicesController.prototype.getDeviceDataPoint)),

            async function DevicesController_getDeviceDataPoint(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DevicesController();

              await templateService.apiHandler({
                methodName: 'getDeviceDataPoint',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/devices/:deviceId/delete',
            ...(fetchMiddlewares<RequestHandler>(DevicesController)),
            ...(fetchMiddlewares<RequestHandler>(DevicesController.prototype.deleteDevice)),

            async function DevicesController_deleteDevice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DevicesController();

              await templateService.apiHandler({
                methodName: 'deleteDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
