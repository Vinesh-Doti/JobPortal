(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    bootstrap: null,
    error: null,
    errorOnce: null,
    event: null,
    info: null,
    prefixes: null,
    ready: null,
    trace: null,
    wait: null,
    warn: null,
    warnOnce: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    bootstrap: function() {
        return bootstrap;
    },
    error: function() {
        return error;
    },
    errorOnce: function() {
        return errorOnce;
    },
    event: function() {
        return event;
    },
    info: function() {
        return info;
    },
    prefixes: function() {
        return prefixes;
    },
    ready: function() {
        return ready;
    },
    trace: function() {
        return trace;
    },
    wait: function() {
        return wait;
    },
    warn: function() {
        return warn;
    },
    warnOnce: function() {
        return warnOnce;
    }
});
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-client] (ecmascript)");
const prefixes = {
    wait: (0, _picocolors.white)((0, _picocolors.bold)('○')),
    error: (0, _picocolors.red)((0, _picocolors.bold)('⨯')),
    warn: (0, _picocolors.yellow)((0, _picocolors.bold)('⚠')),
    ready: '▲',
    info: (0, _picocolors.white)((0, _picocolors.bold)(' ')),
    event: (0, _picocolors.green)((0, _picocolors.bold)('✓')),
    trace: (0, _picocolors.magenta)((0, _picocolors.bold)('»'))
};
const LOGGING_METHOD = {
    log: 'log',
    warn: 'warn',
    error: 'error'
};
function prefixedLog(prefixType, ...message) {
    if ((message[0] === '' || message[0] === undefined) && message.length === 1) {
        message.shift();
    }
    const consoleMethod = prefixType in LOGGING_METHOD ? LOGGING_METHOD[prefixType] : 'log';
    const prefix = prefixes[prefixType];
    // If there's no message, don't print the prefix but a new line
    if (message.length === 0) {
        console[consoleMethod]('');
    } else {
        // Ensure if there's ANSI escape codes it's concatenated into one string.
        // Chrome DevTool can only handle color if it's in one string.
        if (message.length === 1 && typeof message[0] === 'string') {
            console[consoleMethod](' ' + prefix + ' ' + message[0]);
        } else {
            console[consoleMethod](' ' + prefix, ...message);
        }
    }
}
function bootstrap(...message) {
    // logging format: ' <prefix> <message>'
    // e.g. ' ✓ Compiled successfully'
    // Add spaces to align with the indent of other logs
    console.log('   ' + message.join(' '));
}
function wait(...message) {
    prefixedLog('wait', ...message);
}
function error(...message) {
    prefixedLog('error', ...message);
}
function warn(...message) {
    prefixedLog('warn', ...message);
}
function ready(...message) {
    prefixedLog('ready', ...message);
}
function info(...message) {
    prefixedLog('info', ...message);
}
function event(...message) {
    prefixedLog('event', ...message);
}
function trace(...message) {
    prefixedLog('trace', ...message);
}
const warnOnceCache = new _lrucache.LRUCache(10000, (value)=>value.length);
function warnOnce(...message) {
    const key = message.join(' ');
    if (!warnOnceCache.has(key)) {
        warnOnceCache.set(key, key);
        warn(...message);
    }
}
const errorOnceCache = new _lrucache.LRUCache(10000, (value)=>value.length);
function errorOnce(...message) {
    const key = message.join(' ');
    if (!errorOnceCache.has(key)) {
        errorOnceCache.set(key, key);
        error(...message);
    }
} //# sourceMappingURL=log.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/output/format.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatExpire: null,
    formatRevalidate: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatExpire: function() {
        return formatExpire;
    },
    formatRevalidate: function() {
        return formatRevalidate;
    }
});
const timeUnits = [
    {
        label: 'y',
        seconds: 31536000
    },
    {
        label: 'w',
        seconds: 604800
    },
    {
        label: 'd',
        seconds: 86400
    },
    {
        label: 'h',
        seconds: 3600
    },
    {
        label: 'm',
        seconds: 60
    },
    {
        label: 's',
        seconds: 1
    }
];
function humanReadableTimeRounded(seconds) {
    // Find the largest fitting unit.
    let candidateIndex = timeUnits.length - 1;
    for(let i = 0; i < timeUnits.length; i++){
        if (seconds >= timeUnits[i].seconds) {
            candidateIndex = i;
            break;
        }
    }
    const candidate = timeUnits[candidateIndex];
    const value = seconds / candidate.seconds;
    const isExact = Number.isInteger(value);
    // For days and weeks only, check if using the next smaller unit yields an
    // exact result.
    if (!isExact && (candidate.label === 'd' || candidate.label === 'w')) {
        const nextUnit = timeUnits[candidateIndex + 1];
        const nextValue = seconds / nextUnit.seconds;
        if (Number.isInteger(nextValue)) {
            return `${nextValue}${nextUnit.label}`;
        }
    }
    if (isExact) {
        return `${value}${candidate.label}`;
    }
    return `≈${Math.round(value)}${candidate.label}`;
}
function formatRevalidate(cacheControl) {
    const { revalidate } = cacheControl;
    return revalidate ? humanReadableTimeRounded(revalidate) : '';
}
function formatExpire(cacheControl) {
    const { expire } = cacheControl;
    return expire ? humanReadableTimeRounded(expire) : '';
} //# sourceMappingURL=format.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/output/store.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatTrigger: null,
    store: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatTrigger: function() {
        return formatTrigger;
    },
    store: function() {
        return store;
    }
});
const _unistore = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/unistore/unistore.js [app-client] (ecmascript)"));
const _trace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/index.js [app-client] (ecmascript)");
const _swc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const MAX_LOG_SKIP_DURATION_MS = 3000;
function formatTrigger(trigger) {
    // Format dynamic sitemap routes to simpler file path
    // e.g., /sitemap.xml[] -> /sitemap.xml
    if (trigger.includes('[__metadata_id__]')) {
        trigger = trigger.replace('/[__metadata_id__]', '/[id]');
    }
    if (trigger.length > 1 && trigger.endsWith('/')) {
        trigger = trigger.slice(0, -1);
    }
    return trigger;
}
const store = (0, _unistore.default)({
    appUrl: null,
    bindAddr: null,
    bootstrap: true,
    logging: true
});
let lastStore = {
    appUrl: null,
    bindAddr: null,
    bootstrap: true,
    logging: true
};
function hasStoreChanged(nextStore) {
    if ([
        ...new Set([
            ...Object.keys(lastStore),
            ...Object.keys(nextStore)
        ])
    ].every((key)=>Object.is(lastStore[key], nextStore[key]))) {
        return false;
    }
    lastStore = nextStore;
    return true;
}
let startTime = 0;
let trigger = '' // default, use empty string for trigger
;
let triggerUrl = undefined;
let loadingLogTimer = null;
let traceSpan = null;
let logging = true;
store.subscribe((state)=>{
    // Update persisted logging state
    if ('logging' in state) {
        logging = state.logging;
    }
    // If logging is disabled, do not log
    if (!logging) {
        return;
    }
    if (!hasStoreChanged(state)) {
        return;
    }
    if (state.bootstrap) {
        return;
    }
    if (state.loading) {
        if (state.trigger) {
            trigger = formatTrigger(state.trigger);
            triggerUrl = state.url;
            if (trigger !== 'initial') {
                traceSpan = (0, _trace.trace)('compile-path', undefined, {
                    trigger: trigger
                });
                if (!loadingLogTimer) {
                    // Only log compiling if compiled is not finished quickly
                    loadingLogTimer = setTimeout(()=>{
                        if (triggerUrl && triggerUrl !== trigger && __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_TRIGGER_URL) {
                            _log.wait(`Compiling ${trigger} (${triggerUrl}) ...`);
                        } else {
                            _log.wait(`Compiling ${trigger} ...`);
                        }
                    }, MAX_LOG_SKIP_DURATION_MS);
                }
            }
        }
        if (startTime === 0) {
            startTime = Date.now();
        }
        return;
    }
    if (state.errors) {
        // Log compilation errors
        _log.error(state.errors[0]);
        startTime = 0;
        // Ensure traces are flushed after each compile in development mode
        (0, _trace.flushAllTraces)();
        (0, _swc.teardownTraceSubscriber)();
        return;
    }
    let timeMessage = '';
    if (startTime) {
        const time = Date.now() - startTime;
        startTime = 0;
        timeMessage = ' ' + (time > 2000 ? `in ${Math.round(time / 100) / 10}s` : `in ${time}ms`);
    }
    let modulesMessage = '';
    if (state.totalModulesCount) {
        modulesMessage = ` (${state.totalModulesCount} modules)`;
    }
    if (state.warnings) {
        _log.warn(state.warnings.join('\n\n'));
        // Ensure traces are flushed after each compile in development mode
        (0, _trace.flushAllTraces)();
        (0, _swc.teardownTraceSubscriber)();
        return;
    }
    if (state.typeChecking) {
        _log.info(`bundled ${trigger}${timeMessage}${modulesMessage}, type checking...`);
        return;
    }
    if (trigger === 'initial') {
        trigger = '';
    } else {
        if (loadingLogTimer) {
            clearTimeout(loadingLogTimer);
            loadingLogTimer = null;
        }
        if (traceSpan) {
            traceSpan.stop();
            traceSpan = null;
        }
        trigger = '';
    }
    // Ensure traces are flushed after each compile in development mode
    (0, _trace.flushAllTraces)();
    (0, _swc.teardownTraceSubscriber)();
}); //# sourceMappingURL=store.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/output/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    reportTrigger: null,
    watchCompilers: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    reportTrigger: function() {
        return reportTrigger;
    },
    watchCompilers: function() {
        return watchCompilers;
    }
});
const _unistore = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/unistore/unistore.js [app-client] (ecmascript)"));
const _formatwebpackmessages = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/format-webpack-messages.js [app-client] (ecmascript)"));
const _store = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/store.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const buildStore = (0, _unistore.default)({
    // @ts-expect-error initial value
    client: {},
    // @ts-expect-error initial value
    server: {},
    // @ts-expect-error initial value
    edgeServer: {}
});
let buildWasDone = false;
let clientWasLoading = true;
let serverWasLoading = true;
let edgeServerWasLoading = false;
buildStore.subscribe((state)=>{
    const { client, server, edgeServer, trigger, url } = state;
    const { appUrl } = _store.store.getState();
    if (client.loading || server.loading || (edgeServer == null ? void 0 : edgeServer.loading)) {
        _store.store.setState({
            bootstrap: false,
            appUrl: appUrl,
            // If it takes more than 3 seconds to compile, mark it as loading status
            loading: true,
            trigger,
            url
        }, true);
        clientWasLoading = !buildWasDone && clientWasLoading || client.loading;
        serverWasLoading = !buildWasDone && serverWasLoading || server.loading;
        edgeServerWasLoading = !buildWasDone && edgeServerWasLoading || edgeServer.loading;
        buildWasDone = false;
        return;
    }
    buildWasDone = true;
    let partialState = {
        bootstrap: false,
        appUrl: appUrl,
        loading: false,
        typeChecking: false,
        totalModulesCount: (clientWasLoading ? client.totalModulesCount : 0) + (serverWasLoading ? server.totalModulesCount : 0) + (edgeServerWasLoading ? (edgeServer == null ? void 0 : edgeServer.totalModulesCount) || 0 : 0),
        hasEdgeServer: !!edgeServer
    };
    if (client.errors && clientWasLoading) {
        // Show only client errors
        _store.store.setState({
            ...partialState,
            errors: client.errors,
            warnings: null
        }, true);
    } else if (server.errors && serverWasLoading) {
        _store.store.setState({
            ...partialState,
            errors: server.errors,
            warnings: null
        }, true);
    } else if (edgeServer.errors && edgeServerWasLoading) {
        _store.store.setState({
            ...partialState,
            errors: edgeServer.errors,
            warnings: null
        }, true);
    } else {
        // Show warnings from all of them
        const warnings = [
            ...client.warnings || [],
            ...server.warnings || [],
            ...edgeServer.warnings || []
        ];
        _store.store.setState({
            ...partialState,
            errors: null,
            warnings: warnings.length === 0 ? null : warnings
        }, true);
    }
});
function watchCompilers(client, server, edgeServer) {
    buildStore.setState({
        client: {
            loading: true
        },
        server: {
            loading: true
        },
        edgeServer: {
            loading: true
        },
        trigger: 'initial',
        url: undefined
    });
    function tapCompiler(key, compiler, onEvent) {
        compiler.hooks.invalid.tap(`NextJsInvalid-${key}`, ()=>{
            onEvent({
                loading: true
            });
        });
        compiler.hooks.done.tap(`NextJsDone-${key}`, (stats)=>{
            const { errors, warnings } = (0, _formatwebpackmessages.default)(stats.toJson({
                preset: 'errors-warnings',
                moduleTrace: true
            }));
            const hasErrors = !!(errors == null ? void 0 : errors.length);
            const hasWarnings = !!(warnings == null ? void 0 : warnings.length);
            onEvent({
                loading: false,
                totalModulesCount: stats.compilation.modules.size,
                errors: hasErrors ? errors : null,
                warnings: hasWarnings ? warnings : null
            });
        });
    }
    tapCompiler(_constants.COMPILER_NAMES.client, client, (status)=>{
        if (!status.loading && !buildStore.getState().server.loading && !buildStore.getState().edgeServer.loading && status.totalModulesCount > 0) {
            buildStore.setState({
                client: status,
                trigger: undefined,
                url: undefined
            });
        } else {
            buildStore.setState({
                client: status
            });
        }
    });
    tapCompiler(_constants.COMPILER_NAMES.server, server, (status)=>{
        if (!status.loading && !buildStore.getState().client.loading && !buildStore.getState().edgeServer.loading && status.totalModulesCount > 0) {
            buildStore.setState({
                server: status,
                trigger: undefined,
                url: undefined
            });
        } else {
            buildStore.setState({
                server: status
            });
        }
    });
    tapCompiler(_constants.COMPILER_NAMES.edgeServer, edgeServer, (status)=>{
        if (!status.loading && !buildStore.getState().client.loading && !buildStore.getState().server.loading && status.totalModulesCount > 0) {
            buildStore.setState({
                edgeServer: status,
                trigger: undefined,
                url: undefined
            });
        } else {
            buildStore.setState({
                edgeServer: status
            });
        }
    });
}
function reportTrigger(trigger, url) {
    buildStore.setState({
        trigger,
        url
    });
} //# sourceMappingURL=index.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/app-segment-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    AppSegmentConfigSchemaKeys: null,
    parseAppSegmentConfig: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppSegmentConfigSchemaKeys: function() {
        return AppSegmentConfigSchemaKeys;
    },
    parseAppSegmentConfig: function() {
        return parseAppSegmentConfig;
    }
});
const _zod = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/zod/index.cjs [app-client] (ecmascript)");
const _zod1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/zod.js [app-client] (ecmascript)");
const CookieSchema = _zod.z.object({
    name: _zod.z.string(),
    value: _zod.z.string(),
    httpOnly: _zod.z.boolean().optional(),
    path: _zod.z.string().optional()
}).strict();
const RuntimeSampleSchema = _zod.z.object({
    cookies: _zod.z.array(CookieSchema).optional(),
    headers: _zod.z.array(_zod.z.tuple([
        _zod.z.string(),
        _zod.z.string()
    ])).optional(),
    params: _zod.z.record(_zod.z.union([
        _zod.z.string(),
        _zod.z.array(_zod.z.string())
    ])).optional(),
    searchParams: _zod.z.record(_zod.z.union([
        _zod.z.string(),
        _zod.z.array(_zod.z.string()),
        _zod.z.undefined()
    ])).optional()
}).strict();
const StaticPrefetchSchema = _zod.z.object({
    mode: _zod.z.literal('static'),
    from: _zod.z.array(_zod.z.string()).optional(),
    expectUnableToVerify: _zod.z.boolean().optional()
}).strict();
const RuntimePrefetchSchema = _zod.z.object({
    mode: _zod.z.literal('runtime'),
    samples: _zod.z.array(RuntimeSampleSchema).min(1),
    from: _zod.z.array(_zod.z.string()).optional(),
    expectUnableToVerify: _zod.z.boolean().optional()
}).strict();
const PrefetchSchema = _zod.z.discriminatedUnion('mode', [
    StaticPrefetchSchema,
    RuntimePrefetchSchema
]);
/**
 * The schema for configuration for a page.
 */ const AppSegmentConfigSchema = _zod.z.object({
    /**
   * The number of seconds to revalidate the page or false to disable revalidation.
   */ revalidate: _zod.z.union([
        _zod.z.number().int().nonnegative(),
        _zod.z.literal(false)
    ]).optional(),
    /**
   * Whether the page supports dynamic parameters.
   */ dynamicParams: _zod.z.boolean().optional(),
    /**
   * The dynamic behavior of the page.
   */ dynamic: _zod.z.enum([
        'auto',
        'error',
        'force-static',
        'force-dynamic'
    ]).optional(),
    /**
   * The caching behavior of the page.
   */ fetchCache: _zod.z.enum([
        'auto',
        'default-cache',
        'only-cache',
        'force-cache',
        'force-no-store',
        'default-no-store',
        'only-no-store'
    ]).optional(),
    /**
   * How this segment should be prefetched.
   */ unstable_prefetch: PrefetchSchema.optional(),
    /**
   * The preferred region for the page.
   */ preferredRegion: _zod.z.union([
        _zod.z.string(),
        _zod.z.array(_zod.z.string())
    ]).optional(),
    /**
   * The runtime to use for the page.
   */ runtime: _zod.z.enum([
        'edge',
        'nodejs'
    ]).optional(),
    /**
   * The maximum duration for the page in seconds.
   */ maxDuration: _zod.z.number().int().nonnegative().optional()
});
function parseAppSegmentConfig(data, route) {
    const parsed = AppSegmentConfigSchema.safeParse(data, {
        errorMap: (issue, ctx)=>{
            if (issue.path.length === 1) {
                switch(issue.path[0]){
                    case 'revalidate':
                        {
                            return {
                                message: `Invalid revalidate value ${JSON.stringify(ctx.data)} on "${route}", must be a non-negative number or false`
                            };
                        }
                    case 'unstable_prefetch':
                        {
                            return {
                                // @TODO replace this link with a link to the docs when they are written
                                message: `Invalid unstable_prefetch value ${JSON.stringify(ctx.data)} on "${route}", must be an object with a mode of "static" or "runtime". Read more at https://nextjs.org/docs/messages/invalid-prefetch-configuration`
                            };
                        }
                    default:
                }
            }
            return {
                message: ctx.defaultError
            };
        }
    });
    if (!parsed.success) {
        throw (0, _zod1.formatZodError)(`Invalid segment configuration options detected for "${route}". Read more at https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config`, parsed.error);
    }
    return parsed.data;
}
const AppSegmentConfigSchemaKeys = AppSegmentConfigSchema.keyof().options; //# sourceMappingURL=app-segment-config.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/app-segments.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    collectFallbackRouteParams: null,
    collectSegments: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    collectFallbackRouteParams: function() {
        return collectFallbackRouteParams;
    },
    collectSegments: function() {
        return collectSegments;
    }
});
const _appsegmentconfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/app-segment-config.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
const _checks = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-modules/checks.js [app-client] (ecmascript)");
const _clientandserverreferences = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/client-and-server-references.js [app-client] (ecmascript)");
const _getsegmentparam = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/get-segment-param.js [app-client] (ecmascript)");
const _appdirmodule = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/app-dir-module.js [app-client] (ecmascript)");
const _segment = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/utils.js [app-client] (ecmascript)");
/**
 * Parses the app config and attaches it to the segment.
 */ function attach(segment, userland, route) {
    // If the userland is not an object, then we can't do anything with it.
    if (typeof userland !== 'object' || userland === null) {
        return;
    }
    // Try to parse the application configuration.
    const config = (0, _appsegmentconfig.parseAppSegmentConfig)(userland, route);
    // If there was any keys on the config, then attach it to the segment.
    if (Object.keys(config).length > 0) {
        segment.config = config;
    }
    if ('generateStaticParams' in userland && typeof userland.generateStaticParams === 'function') {
        var _segment_config;
        segment.generateStaticParams = userland.generateStaticParams;
        // Validate that `generateStaticParams` makes sense in this context.
        if (((_segment_config = segment.config) == null ? void 0 : _segment_config.runtime) === 'edge') {
            throw Object.defineProperty(new Error('Edge runtime is not supported with `generateStaticParams`.'), "__NEXT_ERROR_CODE", {
                value: "E502",
                enumerable: false,
                configurable: true
            });
        }
    }
}
/**
 * Walks the loader tree and collects the generate parameters for each segment.
 *
 * @param routeModule the app page route module
 * @returns the segments for the app page route module
 */ async function collectAppPageSegments(routeModule) {
    // We keep track of unique segments, since with parallel routes, it's possible
    // to see the same segment multiple times.
    const uniqueSegments = new Map();
    const queue = [
        [
            routeModule.userland.loaderTree,
            [],
            false
        ]
    ];
    while(queue.length > 0){
        const [loaderTree, currentSegments, isParallelRouteSegment] = queue.shift();
        const [name, parallelRoutes] = loaderTree;
        // Process current node
        const { mod: userland, filePath } = await (0, _appdirmodule.getLayoutOrPageModule)(loaderTree);
        const isClientComponent = userland && (0, _clientandserverreferences.isClientReference)(userland);
        const { param: paramName, type: paramType } = (0, _getsegmentparam.getSegmentParam)(name) ?? {};
        const segment = {
            name,
            paramName,
            paramType,
            filePath,
            config: undefined,
            isDynamicSegment: !!paramName,
            generateStaticParams: undefined,
            isParallelRouteSegment
        };
        // Only server components can have app segment configurations
        if (!isClientComponent) {
            attach(segment, userland, routeModule.definition.pathname);
        }
        // Create a unique key for the segment
        const segmentKey = getSegmentKey(segment);
        if (!uniqueSegments.has(segmentKey)) {
            uniqueSegments.set(segmentKey, segment);
        }
        const updatedSegments = [
            ...currentSegments,
            segment
        ];
        // If this is a page segment, we've reached a leaf node
        if (name === _segment.PAGE_SEGMENT_KEY) {
            // Add all segments in the current path, preferring non-parallel segments
            updatedSegments.forEach((seg)=>{
                const key = getSegmentKey(seg);
                if (!uniqueSegments.has(key)) {
                    uniqueSegments.set(key, seg);
                }
            });
        }
        // Add all parallel routes to the queue
        for(const parallelRouteKey in parallelRoutes){
            const parallelRoute = parallelRoutes[parallelRouteKey];
            queue.push([
                parallelRoute,
                updatedSegments,
                // A parallel route segment is one that descends from a segment that is
                // not children or descends from a parallel route segment.
                isParallelRouteSegment || parallelRouteKey !== 'children'
            ]);
        }
    }
    return Array.from(uniqueSegments.values());
}
function getSegmentKey(segment) {
    return `${segment.name}-${segment.filePath ?? ''}-${segment.paramName ?? ''}-${segment.isParallelRouteSegment ? 'pr' : 'np'}`;
}
/**
 * Collects the segments for a given app route module.
 *
 * @param routeModule the app route module
 * @returns the segments for the app route module
 */ function collectAppRouteSegments(routeModule) {
    // Get the pathname parts, slice off the first element (which is empty).
    const parts = routeModule.definition.pathname.split('/').slice(1);
    if (parts.length === 0) {
        throw Object.defineProperty(new _invarianterror.InvariantError('Expected at least one segment'), "__NEXT_ERROR_CODE", {
            value: "E580",
            enumerable: false,
            configurable: true
        });
    }
    // Generate all the segments.
    const segments = parts.map((name)=>{
        const { param: paramName, type: paramType } = (0, _getsegmentparam.getSegmentParam)(name) ?? {};
        return {
            name,
            paramName,
            paramType,
            filePath: undefined,
            isDynamicSegment: !!paramName,
            config: undefined,
            generateStaticParams: undefined,
            isParallelRouteSegment: undefined
        };
    });
    // We know we have at least one, we verified this above. We should get the
    // last segment which represents the root route module.
    const segment = segments[segments.length - 1];
    segment.filePath = routeModule.definition.filename;
    // Extract the segment config from the userland module.
    attach(segment, routeModule.userland, routeModule.definition.pathname);
    return segments;
}
function collectSegments(routeModule) {
    if ((0, _checks.isAppRouteRouteModule)(routeModule)) {
        return collectAppRouteSegments(routeModule);
    }
    if ((0, _checks.isAppPageRouteModule)(routeModule)) {
        return collectAppPageSegments(routeModule);
    }
    throw Object.defineProperty(new _invarianterror.InvariantError('Expected a route module to be one of app route or page'), "__NEXT_ERROR_CODE", {
        value: "E568",
        enumerable: false,
        configurable: true
    });
}
function collectFallbackRouteParams(routeModule) {
    const uniqueSegments = new Map();
    const queue = [
        [
            routeModule.userland.loaderTree,
            false
        ]
    ];
    while(queue.length > 0){
        const [loaderTree, isParallelRouteSegment] = queue.shift();
        const [name, parallelRoutes] = loaderTree;
        // Handle this segment (if it's a dynamic segment param).
        const segmentParam = (0, _getsegmentparam.getSegmentParam)(name);
        if (segmentParam) {
            const key = `${name}-${segmentParam.param}-${isParallelRouteSegment ? 'pr' : 'np'}`;
            if (!uniqueSegments.has(key)) {
                uniqueSegments.set(key, (0, _utils.createFallbackRouteParam)(segmentParam.param, segmentParam.type, isParallelRouteSegment));
            }
        }
        // Add all of this segment's parallel routes to the queue.
        for(const parallelRouteKey in parallelRoutes){
            const parallelRoute = parallelRoutes[parallelRouteKey];
            queue.push([
                parallelRoute,
                // A parallel route segment is one that descends from a segment that is
                // not children or descends from a parallel route segment.
                isParallelRouteSegment || parallelRouteKey !== 'children'
            ]);
        }
    }
    return Array.from(uniqueSegments.values());
} //# sourceMappingURL=app-segments.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/collect-root-param-keys.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "collectRootParamKeys", {
    enumerable: true,
    get: function() {
        return collectRootParamKeys;
    }
});
const _getsegmentparam = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/get-segment-param.js [app-client] (ecmascript)");
const _checks = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-modules/checks.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
function collectAppPageRootParamKeys(routeModule) {
    let rootParams = [];
    let current = routeModule.userland.loaderTree;
    while(current){
        var _getSegmentParam;
        const [name, parallelRoutes, modules] = current;
        // If this is a dynamic segment, then we collect the param.
        const param = (_getSegmentParam = (0, _getsegmentparam.getSegmentParam)(name)) == null ? void 0 : _getSegmentParam.param;
        if (param) {
            rootParams.push(param);
        }
        // If this has a layout module, then we've found the root layout because
        // we return once we found the first layout.
        if (typeof modules.layout !== 'undefined') {
            return rootParams;
        }
        // This didn't include a root layout, so we need to continue. We don't need
        // to collect from other parallel routes because we can't have a parallel
        // route above a root layout.
        current = parallelRoutes.children;
    }
    // If we didn't find a root layout, then we don't have any params.
    return [];
}
function collectRootParamKeys(routeModule) {
    if ((0, _checks.isAppRouteRouteModule)(routeModule)) {
        return [];
    }
    if ((0, _checks.isAppPageRouteModule)(routeModule)) {
        return collectAppPageRootParamKeys(routeModule);
    }
    throw Object.defineProperty(new _invarianterror.InvariantError('Expected a route module to be one of app route or page'), "__NEXT_ERROR_CODE", {
        value: "E568",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=collect-root-param-keys.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/pages/pages-segment-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PagesSegmentConfigSchemaKeys: null,
    parsePagesSegmentConfig: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PagesSegmentConfigSchemaKeys: function() {
        return PagesSegmentConfigSchemaKeys;
    },
    parsePagesSegmentConfig: function() {
        return parsePagesSegmentConfig;
    }
});
const _zod = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/zod/index.cjs [app-client] (ecmascript)");
const _zod1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/zod.js [app-client] (ecmascript)");
/**
 * The schema for the page segment config.
 */ const PagesSegmentConfigSchema = _zod.z.object({
    /**
   * The runtime to use for the page.
   */ runtime: _zod.z.enum([
        'edge',
        'experimental-edge',
        'nodejs'
    ]).optional(),
    /**
   * The maximum duration for the page render.
   */ maxDuration: _zod.z.number().optional(),
    /**
   * The exported config object for the page.
   */ config: _zod.z.object({
        /**
       * The runtime to use for the page.
       */ runtime: _zod.z.enum([
            'edge',
            'experimental-edge',
            'nodejs'
        ]).optional(),
        /**
       * The maximum duration for the page render.
       */ maxDuration: _zod.z.number().optional()
    }).optional()
});
function parsePagesSegmentConfig(data, route) {
    const parsed = PagesSegmentConfigSchema.safeParse(data, {});
    if (!parsed.success) {
        throw (0, _zod1.formatZodError)(`Invalid segment configuration options detected for "${route}". Read more at https://nextjs.org/docs/messages/invalid-page-config`, parsed.error);
    }
    return parsed.data;
}
const PagesSegmentConfigSchemaKeys = PagesSegmentConfigSchema.keyof().options; //# sourceMappingURL=pages-segment-config.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/middleware/middleware-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    MiddlewareConfigInputSchema: null,
    MiddlewareConfigInputSchemaKeys: null,
    SourceSchema: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MiddlewareConfigInputSchema: function() {
        return MiddlewareConfigInputSchema;
    },
    MiddlewareConfigInputSchemaKeys: function() {
        return MiddlewareConfigInputSchemaKeys;
    },
    SourceSchema: function() {
        return SourceSchema;
    }
});
const _picomatch = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)"));
const _zod = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/zod/index.cjs [app-client] (ecmascript)");
const _trytoparsepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/try-to-parse-path.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const RouteHasSchema = _zod.z.discriminatedUnion('type', [
    _zod.z.object({
        type: _zod.z.enum([
            'header',
            'query',
            'cookie'
        ]),
        key: _zod.z.string({
            required_error: 'key is required when type is header, query or cookie'
        }),
        value: _zod.z.string({
            invalid_type_error: 'value must be a string'
        }).optional()
    }).strict(),
    _zod.z.object({
        type: _zod.z.literal('host'),
        value: _zod.z.string({
            required_error: 'host must have a value'
        })
    }).strict()
]);
const SourceSchema = _zod.z.string({
    required_error: 'source is required'
}).max(4096, 'exceeds max built length of 4096 for route').superRefine((val, ctx)=>{
    if (!val.startsWith('/')) {
        return ctx.addIssue({
            code: _zod.z.ZodIssueCode.custom,
            message: `source must start with /`
        });
    }
    const { error, regexStr } = (0, _trytoparsepath.tryToParsePath)(val);
    if (error || !regexStr) {
        ctx.addIssue({
            code: _zod.z.ZodIssueCode.custom,
            message: `Invalid source '${val}': ${error.message}`
        });
    }
});
const MiddlewareMatcherInputSchema = _zod.z.object({
    locale: _zod.z.union([
        _zod.z.literal(false),
        _zod.z.undefined()
    ]).optional(),
    has: _zod.z.array(RouteHasSchema).optional(),
    missing: _zod.z.array(RouteHasSchema).optional(),
    source: SourceSchema
}).strict();
const MiddlewareConfigMatcherInputSchema = _zod.z.union([
    SourceSchema,
    _zod.z.array(_zod.z.union([
        SourceSchema,
        MiddlewareMatcherInputSchema
    ], {
        invalid_type_error: 'must be an array of strings or middleware matchers'
    }))
]);
const GlobSchema = _zod.z.string().superRefine((val, ctx)=>{
    try {
        (0, _picomatch.default)(val);
    } catch (err) {
        ctx.addIssue({
            code: _zod.z.ZodIssueCode.custom,
            message: `Invalid glob pattern '${val}': ${err.message}`
        });
    }
});
const MiddlewareConfigInputSchema = _zod.z.object({
    /**
   * The matcher for the middleware.
   */ matcher: MiddlewareConfigMatcherInputSchema.optional(),
    /**
   * The regions that the middleware should run in.
   */ regions: _zod.z.union([
        _zod.z.string(),
        _zod.z.array(_zod.z.string())
    ]).optional(),
    /**
   * A glob, or an array of globs, ignoring dynamic code evaluation for specific
   * files. The globs are relative to your application root folder.
   */ unstable_allowDynamic: _zod.z.union([
        GlobSchema,
        _zod.z.array(GlobSchema)
    ]).optional()
});
const MiddlewareConfigInputSchemaKeys = MiddlewareConfigInputSchema.keyof().options; //# sourceMappingURL=middleware-config.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createFallbackRouteParam: null,
    encodeParam: null,
    normalizePathname: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createFallbackRouteParam: function() {
        return createFallbackRouteParam;
    },
    encodeParam: function() {
        return encodeParam;
    },
    normalizePathname: function() {
        return normalizePathname;
    }
});
function encodeParam(value, encoder) {
    let replaceValue;
    if (Array.isArray(value)) {
        replaceValue = value.map(encoder).join('/');
    } else {
        replaceValue = encoder(value);
    }
    return replaceValue;
}
function normalizePathname(pathname) {
    return pathname.replace(/\\/g, '/').replace(/(?!^)\/$/, '');
}
function createFallbackRouteParam(paramName, paramType, isParallelRouteParam) {
    return {
        paramName,
        paramType,
        isParallelRouteParam
    };
} //# sourceMappingURL=utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/app.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assignErrorIfEmpty: null,
    buildAppStaticPaths: null,
    calculateFallbackMode: null,
    filterUniqueParams: null,
    generateAllParamCombinations: null,
    generateRouteStaticParams: null,
    resolveParallelRouteParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assignErrorIfEmpty: function() {
        return assignErrorIfEmpty;
    },
    buildAppStaticPaths: function() {
        return buildAppStaticPaths;
    },
    calculateFallbackMode: function() {
        return calculateFallbackMode;
    },
    filterUniqueParams: function() {
        return filterUniqueParams;
    },
    generateAllParamCombinations: function() {
        return generateAllParamCombinations;
    },
    generateRouteStaticParams: function() {
        return generateRouteStaticParams;
    },
    resolveParallelRouteParams: function() {
        return resolveParallelRouteParams;
    }
});
const _nodepath = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _runwithafter = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/after/run-with-after.js [app-client] (ecmascript)");
const _workstore = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/async-storage/work-store.js [app-client] (ecmascript)");
const _fallback = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/fallback.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/utils.js [app-client] (ecmascript)");
const _escapepathdelimiters = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/escape-path-delimiters.js [app-client] (ecmascript)"));
const _createincrementalcache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/export/helpers/create-incremental-cache.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
const _getsegmentparam = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/get-segment-param.js [app-client] (ecmascript)");
const _parseloadertree = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/parse-loader-tree.js [app-client] (ecmascript)");
const _interceptionroutes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [app-client] (ecmascript)");
const _emptygeneratestaticparamserror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/errors/empty-generate-static-params-error.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function filterUniqueParams(childrenRouteParams, routeParams) {
    // A Map is used to store unique parameter combinations. The key of the Map
    // is a string representation of the parameter combination, and the value
    // is the actual `Params` object.
    const unique = new Map();
    // Iterate over each parameter object in the input array.
    for (const params of routeParams){
        let key = '' // Initialize an empty string to build the unique key for the current `params` object.
        ;
        // Iterate through the `routeParamKeys` (which are assumed to be sorted).
        // This consistent order is crucial for generating a stable and unique key
        // for each parameter combination.
        for (const { paramName: paramKey } of childrenRouteParams){
            const value = params[paramKey];
            // Construct a part of the key using the parameter key and its value.
            // A type prefix (`A:` for Array, `S:` for String, `U:` for undefined) is added to the value
            // to prevent collisions. For example, `['a', 'b']` and `'a,b'` would
            // otherwise generate the same string representation, leading to incorrect
            // deduplication. This ensures that different types with the same string
            // representation are treated as distinct.
            let valuePart;
            if (Array.isArray(value)) {
                valuePart = `A:${value.join(',')}`;
            } else if (value === undefined) {
                valuePart = `U:undefined`;
            } else {
                valuePart = `S:${value}`;
            }
            key += `${paramKey}:${valuePart}|`;
        }
        // If the generated key is not already in the `unique` Map, it means this
        // parameter combination is unique so far. Add it to the Map.
        if (!unique.has(key)) {
            unique.set(key, params);
        }
    }
    // Convert the Map's values (the unique `Params` objects) back into an array
    // and return it.
    return Array.from(unique.values());
}
function generateAllParamCombinations(childrenRouteParams, routeParams, rootParamKeys) {
    // A Map is used to store unique combinations of Route Parameters.
    // The key of the Map is a string representation of the Route Parameter
    // combination, and the value is the `Params` object containing only
    // the Route Parameters.
    const combinations = new Map();
    // Determine the minimum index where all Root Parameters are included.
    // This optimization ensures we only generate combinations that include
    // a complete set of Root Parameters, preventing invalid Static Shells.
    //
    // For example, if rootParamKeys = ['lang', 'region'] and routeParamKeys = ['lang', 'region', 'slug']:
    // - 'lang' is at index 0, 'region' is at index 1
    // - minIndexForCompleteRootParams = max(0, 1) = 1
    // - We'll only generate combinations starting from index 1 (which includes both lang and region)
    let minIndexForCompleteRootParams = -1;
    if (rootParamKeys.length > 0) {
        // Find the index of the last Root Parameter in routeParamKeys.
        // This tells us the minimum combination length needed to include all Root Parameters.
        for (const rootParamKey of rootParamKeys){
            const index = childrenRouteParams.findIndex((param)=>param.paramName === rootParamKey);
            if (index === -1) {
                // Root Parameter not found in Route Parameters - this shouldn't happen in normal cases
                // but we handle it gracefully by treating it as if there are no Root Parameters.
                // This allows the function to fall back to generating all sub-combinations.
                minIndexForCompleteRootParams = -1;
                break;
            }
            // Track the highest index among all Root Parameters.
            // This ensures all Root Parameters are included in any generated combination.
            minIndexForCompleteRootParams = Math.max(minIndexForCompleteRootParams, index);
        }
    }
    // Iterate over each Static Parameter object in the input array.
    // Each params object represents one potential route combination (e.g., { lang: 'en', region: 'US', slug: 'home' })
    for (const params of routeParams){
        // Generate all possible prefix combinations for this Static Parameter set.
        // For routeParamKeys = ['lang', 'region', 'slug'], we'll generate combinations at:
        // - i=0: { lang: 'en' }
        // - i=1: { lang: 'en', region: 'US' }
        // - i=2: { lang: 'en', region: 'US', slug: 'home' }
        //
        // The iteration order is crucial for generating stable and unique keys
        // for each Route Parameter combination.
        for(let i = 0; i < childrenRouteParams.length; i++){
            // Skip generating combinations that don't include all Root Parameters.
            // This prevents creating invalid Static Shells that are missing required Root Parameters.
            //
            // For example, if Root Parameters are ['lang', 'region'] and minIndexForCompleteRootParams = 1:
            // - Skip i=0 (would only include 'lang', missing 'region')
            // - Process i=1 and higher (includes both 'lang' and 'region')
            if (minIndexForCompleteRootParams >= 0 && i < minIndexForCompleteRootParams) {
                continue;
            }
            // Initialize data structures for building this specific combination
            const combination = {};
            const keyParts = [];
            let hasAllRootParams = true;
            // Build the sub-combination with parameters from index 0 to i (inclusive).
            // This creates a prefix of the full parameter set, building up combinations incrementally.
            //
            // For example, if routeParamKeys = ['lang', 'region', 'slug'] and i = 1:
            // - j=0: Add 'lang' parameter
            // - j=1: Add 'region' parameter
            // Result: { lang: 'en', region: 'US' }
            for(let j = 0; j <= i; j++){
                const { paramName: routeKey } = childrenRouteParams[j];
                // Check if the parameter exists in the original params object and has a defined value.
                // This handles cases where generateStaticParams doesn't provide all possible parameters,
                // or where some parameters are optional/undefined.
                if (!params.hasOwnProperty(routeKey) || params[routeKey] === undefined) {
                    // If this missing parameter is a Root Parameter, mark the combination as invalid.
                    // Root Parameters are required for Static Shells, so we can't generate partial combinations without them.
                    if (rootParamKeys.includes(routeKey)) {
                        hasAllRootParams = false;
                    }
                    break;
                }
                const value = params[routeKey];
                combination[routeKey] = value;
                // Construct a unique key part for this parameter to enable deduplication.
                // We use type prefixes to prevent collisions between different value types
                // that might have the same string representation.
                //
                // Examples:
                // - Array ['foo', 'bar'] becomes "A:foo,bar"
                // - String "foo,bar" becomes "S:foo,bar"
                // - This prevents collisions between ['foo', 'bar'] and "foo,bar"
                let valuePart;
                if (Array.isArray(value)) {
                    valuePart = `A:${value.join(',')}`;
                } else {
                    valuePart = `S:${value}`;
                }
                keyParts.push(`${routeKey}:${valuePart}`);
            }
            // Build the final unique key by joining all parameter parts.
            // This key is used for deduplication in the combinations Map.
            // Format: "lang:S:en|region:S:US|slug:A:home,about"
            const currentKey = keyParts.join('|');
            // Only add the combination if it meets our criteria:
            // 1. hasAllRootParams: Contains all required Root Parameters
            // 2. !combinations.has(currentKey): Is not a duplicate of an existing combination
            //
            // This ensures we only generate valid, unique parameter combinations for Static Shells.
            if (hasAllRootParams && !combinations.has(currentKey)) {
                combinations.set(currentKey, combination);
            }
        }
    }
    // Convert the Map's values back into an array and return the final result.
    // The Map ensures all combinations are unique, and we return only the
    // parameter objects themselves, discarding the internal deduplication keys.
    return Array.from(combinations.values());
}
function calculateFallbackMode(dynamicParams, fallbackRootParams, baseFallbackMode) {
    return dynamicParams ? fallbackRootParams.length > 0 ? _fallback.FallbackMode.BLOCKING_STATIC_RENDER : baseFallbackMode ?? _fallback.FallbackMode.NOT_FOUND : _fallback.FallbackMode.NOT_FOUND;
}
/**
 * Validates the parameters to ensure they're accessible and have the correct
 * types.
 *
 * @param page - The page to validate.
 * @param regex - The route regex.
 * @param isRoutePPREnabled - Whether the route has partial prerendering enabled.
 * @param childrenRouteParamSegments - The keys of the parameters.
 * @param rootParamKeys - The keys of the root params.
 * @param routeParams - The list of parameters to validate.
 * @returns The list of validated parameters.
 */ function validateParams(page, isRoutePPREnabled, childrenRouteParamSegments, rootParamKeys, routeParams) {
    const valid = [];
    // Validate that if there are any root params, that the user has provided at
    // least one value for them only if we're using partial prerendering.
    if (isRoutePPREnabled && rootParamKeys.length > 0) {
        if (routeParams.length === 0 || rootParamKeys.some((key)=>routeParams.some((params)=>!(key in params)))) {
            if (rootParamKeys.length === 1) {
                throw Object.defineProperty(new Error(`A required root parameter (${rootParamKeys[0]}) was not provided in generateStaticParams for ${page}, please provide at least one value.`), "__NEXT_ERROR_CODE", {
                    value: "E622",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new Error(`Required root params (${rootParamKeys.join(', ')}) were not provided in generateStaticParams for ${page}, please provide at least one value for each.`), "__NEXT_ERROR_CODE", {
                value: "E621",
                enumerable: false,
                configurable: true
            });
        }
    }
    for (const params of routeParams){
        const item = {};
        for (const { paramName: key, paramType } of childrenRouteParamSegments){
            const { repeat, optional } = (0, _getsegmentparam.getParamProperties)(paramType);
            let paramValue = params[key];
            if (optional && params.hasOwnProperty(key) && (paramValue === null || paramValue === undefined || paramValue === false)) {
                paramValue = [];
            }
            // A parameter is missing, so the rest of the params are not accessible.
            // We only support this when the route has partial prerendering enabled.
            // This will make it so that the remaining params are marked as missing so
            // we can generate a fallback route for them.
            if (!paramValue && isRoutePPREnabled) {
                break;
            }
            // Perform validation for the parameter based on whether it's a repeat
            // parameter or not.
            if (repeat) {
                if (!Array.isArray(paramValue)) {
                    throw Object.defineProperty(new Error(`A required parameter (${key}) was not provided as an array received ${typeof paramValue} in generateStaticParams for ${page}`), "__NEXT_ERROR_CODE", {
                        value: "E618",
                        enumerable: false,
                        configurable: true
                    });
                }
            } else {
                if (typeof paramValue !== 'string') {
                    throw Object.defineProperty(new Error(`A required parameter (${key}) was not provided as a string received ${typeof paramValue} in generateStaticParams for ${page}`), "__NEXT_ERROR_CODE", {
                        value: "E617",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            item[key] = paramValue;
        }
        valid.push(item);
    }
    return valid;
}
function assignErrorIfEmpty(prerenderedRoutes, childrenRouteParams) {
    // If there are no routes to process, exit early.
    if (prerenderedRoutes.length === 0) {
        return;
    }
    // Initialize the root of the Trie. This node represents the starting point
    // before any parameters have been considered.
    const root = {
        children: new Map(),
        routes: []
    };
    // Phase 1: Build the Trie.
    // Iterate over each prerendered route and insert it into the Trie.
    // Each route's concrete parameter values form a path in the Trie.
    for (const route of prerenderedRoutes){
        let currentNode = root // Start building the path from the root for each route.
        ;
        // Iterate through the sorted parameter keys. The order of keys is crucial
        // for ensuring that routes with the same concrete parameters follow the
        // same path in the Trie, regardless of the original order of properties
        // in the `params` object.
        for (const { paramName: key } of childrenRouteParams){
            // Check if the current route actually has a concrete value for this parameter.
            // If a dynamic segment is not filled (i.e., it's a fallback), it won't have
            // this property, and we stop building the path for this route at this point.
            if (route.params.hasOwnProperty(key)) {
                const value = route.params[key];
                // Generate a unique key for the parameter's value. This is critical
                // to prevent collisions between different data types that might have
                // the same string representation (e.g., `['a', 'b']` vs `'a,b'`).
                // A type prefix (`A:` for Array, `S:` for String, `U:` for undefined)
                // is added to the value to prevent collisions. This ensures that
                // different types with the same string representation are treated as
                // distinct.
                let valueKey;
                if (Array.isArray(value)) {
                    valueKey = `A:${value.join(',')}`;
                } else if (value === undefined) {
                    valueKey = `U:undefined`;
                } else {
                    valueKey = `S:${value}`;
                }
                // Look for a child node corresponding to this `valueKey` from the `currentNode`.
                let childNode = currentNode.children.get(valueKey);
                if (!childNode) {
                    // If the child node doesn't exist, create a new one and add it to
                    // the current node's children.
                    childNode = {
                        children: new Map(),
                        routes: []
                    };
                    currentNode.children.set(valueKey, childNode);
                }
                // Move deeper into the Trie to the `childNode` for the next parameter.
                currentNode = childNode;
            }
        }
        // After processing all concrete parameters for the route, add the full
        // `PrerenderedRoute` object to the `routes` array of the `currentNode`.
        // This node represents the unique concrete parameter combination for this route.
        currentNode.routes.push(route);
    }
    // Phase 2: Traverse the Trie to assign the `throwOnEmptyStaticShell` property.
    // This is done using an iterative Depth-First Search (DFS) approach with an
    // explicit stack to avoid JavaScript's recursion depth limits (stack overflow)
    // for very deep routing structures.
    const stack = [
        root
    ] // Initialize the stack with the root node.
    ;
    while(stack.length > 0){
        const node = stack.pop() // Pop the next node to process from the stack.
        ;
        // `hasChildren` indicates if this node has any more specific concrete
        // parameter combinations branching off from it. If true, it means this
        // node represents a prefix for other, more specific routes.
        const hasChildren = node.children.size > 0;
        // If the current node has routes associated with it (meaning, routes whose
        // concrete parameters lead to this node's path in the Trie).
        if (node.routes.length > 0) {
            // Determine the minimum number of fallback parameters among all routes
            // that are associated with this current Trie node. This is used to
            // identify if a route should not throw on empty static shell relative to another route *at the same level*
            // of concrete parameters, but with fewer fallback parameters.
            let minFallbacks = Infinity;
            for (const r of node.routes){
                // `fallbackRouteParams?.length ?? 0` handles cases where `fallbackRouteParams`
                // might be `undefined` or `null`, treating them as 0 length.
                minFallbacks = Math.min(minFallbacks, r.fallbackRouteParams ? r.fallbackRouteParams.length : 0);
            }
            // Now, for each `PrerenderedRoute` associated with this node:
            for (const route of node.routes){
                // A route is ok not to throw on an empty static shell (and thus
                // `throwOnEmptyStaticShell` should be `false`) if either of the
                // following conditions is met:
                // 1. `hasChildren` is true: This node has further concrete parameter children.
                //    This means the current route is a parent to more specific routes (e.g.,
                //    `/blog/[slug]` should not throw when concrete routes like `/blog/first-post` exist).
                // OR
                // 2. `route.fallbackRouteParams.length > minFallbacks`: This route has
                //    more fallback parameters than another route at the same Trie node.
                //    This implies the current route is a more general version that should not throw
                //    compared to a more specific route that has fewer fallback parameters
                //    (e.g., `/1234/[...slug]` should not throw relative to `/[id]/[...slug]`).
                if (hasChildren || route.fallbackRouteParams && route.fallbackRouteParams.length > minFallbacks) {
                    route.throwOnEmptyStaticShell = false // Should not throw on empty static shell.
                    ;
                } else {
                    route.throwOnEmptyStaticShell = true // Should throw on empty static shell.
                    ;
                }
            }
        }
        // Add all children of the current node to the stack. This ensures that
        // the traversal continues to explore deeper paths in the Trie.
        for (const child of node.children.values()){
            stack.push(child);
        }
    }
}
function resolveParallelRouteParams(loaderTree, params, pathname, fallbackRouteParams) {
    // Stack-based traversal with depth and parallel route key tracking
    const stack = [
        {
            tree: loaderTree,
            depth: 0,
            parallelKey: 'children'
        }
    ];
    // Parse pathname into segments for depth-based resolution
    const pathSegments = pathname.split('/').filter(Boolean);
    while(stack.length > 0){
        const { tree, depth, parallelKey } = stack.pop();
        const { segment, parallelRoutes } = (0, _parseloadertree.parseLoaderTree)(tree);
        // Only process segments that are in parallel routes (not the main 'children' route)
        if (parallelKey !== 'children') {
            const segmentParam = (0, _getsegmentparam.getSegmentParam)(segment);
            if (segmentParam && !params.hasOwnProperty(segmentParam.param)) {
                const { param: paramName, type: paramType } = segmentParam;
                switch(paramType){
                    case 'catchall':
                    case 'optional-catchall':
                    case 'catchall-intercepted-(..)(..)':
                    case 'catchall-intercepted-(.)':
                    case 'catchall-intercepted-(..)':
                    case 'catchall-intercepted-(...)':
                        // If there are any non-parallel fallback route segments, we can't use the
                        // pathname to derive the value because it's not complete. We can make
                        // this assumption because routes are resolved left to right.
                        if (fallbackRouteParams.some((param)=>!param.isParallelRouteParam)) {
                            fallbackRouteParams.push((0, _utils.createFallbackRouteParam)(paramName, paramType, true));
                            break;
                        }
                        // For catchall routes in parallel segments, derive from pathname
                        // using depth to determine which segments to use
                        const remainingSegments = pathSegments.slice(depth);
                        // Process segments to handle any embedded dynamic params
                        // Track if we encounter any unknown param placeholders
                        let hasUnknownParam = false;
                        const processedSegments = remainingSegments.flatMap((pathSegment)=>{
                            const param = (0, _getsegmentparam.getSegmentParam)(pathSegment);
                            if (param) {
                                // If the segment is a param placeholder, check if we have its value
                                if (!params.hasOwnProperty(param.param)) {
                                    // Unknown param placeholder in pathname - can't derive full value
                                    hasUnknownParam = true;
                                    return undefined;
                                }
                                // If the segment matches a param, return the param value
                                // We don't encode values here as that's handled during retrieval.
                                return params[param.param];
                            }
                            // Otherwise it's a static segment
                            return pathSegment;
                        }).filter((s)=>s !== undefined);
                        // If we encountered any unknown param placeholders, we can't derive
                        // the full catch-all value from the pathname, so mark as fallback.
                        if (hasUnknownParam) {
                            fallbackRouteParams.push((0, _utils.createFallbackRouteParam)(paramName, paramType, true));
                            break;
                        }
                        if (processedSegments.length > 0) {
                            params[paramName] = processedSegments;
                        } else if (paramType === 'optional-catchall') {
                            params[paramName] = [];
                        } else {
                            // We shouldn't be able to match a catchall segment without any path
                            // segments if it's not an optional catchall
                            throw Object.defineProperty(new _invarianterror.InvariantError(`Unexpected empty path segments match for a pathname "${pathname}" with param "${paramName}" of type "${paramType}"`), "__NEXT_ERROR_CODE", {
                                value: "E792",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        break;
                    case 'dynamic':
                    case 'dynamic-intercepted-(..)(..)':
                    case 'dynamic-intercepted-(.)':
                    case 'dynamic-intercepted-(..)':
                    case 'dynamic-intercepted-(...)':
                        // For regular dynamic parameters, take the segment at this depth
                        if (depth < pathSegments.length) {
                            const pathSegment = pathSegments[depth];
                            const param = (0, _getsegmentparam.getSegmentParam)(pathSegment);
                            // Check if the segment at this depth is a placeholder for an unknown param
                            if (param && !params.hasOwnProperty(param.param)) {
                                // The segment is a placeholder like [category] and we don't have the value
                                fallbackRouteParams.push((0, _utils.createFallbackRouteParam)(paramName, paramType, true));
                                break;
                            }
                            // If the segment matches a param, use the param value from params object
                            // Otherwise it's a static segment, just use it directly
                            // We don't encode values here as that's handled during retrieval
                            params[paramName] = param ? params[param.param] : pathSegment;
                        } else {
                            // No segment at this depth, mark as fallback.
                            fallbackRouteParams.push((0, _utils.createFallbackRouteParam)(paramName, paramType, true));
                        }
                        break;
                    default:
                        paramType;
                }
            }
        }
        // Calculate next depth - increment if this is not a route group and not empty
        let nextDepth = depth;
        // Route groups are like (marketing) or (dashboard), NOT interception routes like (.)photo
        // Interception routes start with markers like (.), (..), (...), (..)(..)) and should increment depth
        const isInterceptionRoute = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((marker)=>segment.startsWith(marker));
        const isRouteGroup = !isInterceptionRoute && segment.startsWith('(') && segment.endsWith(')');
        if (!isRouteGroup && segment !== '') {
            nextDepth++;
        }
        // Add all parallel routes to the stack for processing.
        for (const [key, route] of Object.entries(parallelRoutes)){
            stack.push({
                tree: route,
                depth: nextDepth,
                parallelKey: key
            });
        }
    }
}
async function generateRouteStaticParams(segments, store, isRoutePPREnabled) {
    // Early return if no segments to process
    if (segments.length === 0) return [];
    const queue = [
        {
            segmentIndex: 0,
            params: []
        }
    ];
    let currentParams = [];
    while(queue.length > 0){
        var _current_config;
        const { segmentIndex, params } = queue.shift();
        // If we've processed all segments, this is our final result
        if (segmentIndex >= segments.length) {
            currentParams = params;
            break;
        }
        const current = segments[segmentIndex];
        // Skip segments without generateStaticParams and continue to next
        if (typeof current.generateStaticParams !== 'function') {
            queue.push({
                segmentIndex: segmentIndex + 1,
                params
            });
            continue;
        }
        // Configure fetchCache if specified
        if (((_current_config = current.config) == null ? void 0 : _current_config.fetchCache) !== undefined) {
            store.fetchCache = current.config.fetchCache;
        }
        const nextParams = [];
        // If there are parent params, we need to process them.
        if (params.length > 0) {
            // Process each parent parameter combination
            for (const parentParams of params){
                const result = await current.generateStaticParams({
                    params: parentParams
                });
                if (result.length > 0) {
                    // Merge parent params with each result item
                    for (const item of result){
                        nextParams.push({
                            ...parentParams,
                            ...item
                        });
                    }
                } else if (isRoutePPREnabled) {
                    (0, _emptygeneratestaticparamserror.throwEmptyGenerateStaticParamsError)();
                } else {
                    // No results, just pass through parent params
                    nextParams.push(parentParams);
                }
            }
        } else {
            // No parent params, call generateStaticParams with empty object
            const result = await current.generateStaticParams({
                params: {}
            });
            if (result.length === 0 && isRoutePPREnabled) {
                (0, _emptygeneratestaticparamserror.throwEmptyGenerateStaticParamsError)();
            }
            nextParams.push(...result);
        }
        // Add next segment to work queue
        queue.push({
            segmentIndex: segmentIndex + 1,
            params: nextParams
        });
    }
    return currentParams;
}
async function buildAppStaticPaths({ dir, page, distDir, cacheComponents, authInterrupts, segments, isrFlushToDisk, cacheHandler, cacheLifeProfiles, requestHeaders, cacheHandlers, cacheMaxMemorySize, fetchCacheKeyPrefix, nextConfigOutput, ComponentMod, isRoutePPREnabled = false, buildId, rootParamKeys }) {
    if (segments.some((generate)=>{
        var _generate_config;
        return ((_generate_config = generate.config) == null ? void 0 : _generate_config.dynamicParams) === true;
    }) && nextConfigOutput === 'export') {
        throw Object.defineProperty(new Error('"dynamicParams: true" cannot be used with "output: export". See more info here: https://nextjs.org/docs/app/building-your-application/deploying/static-exports'), "__NEXT_ERROR_CODE", {
            value: "E393",
            enumerable: false,
            configurable: true
        });
    }
    ComponentMod.patchFetch();
    const incrementalCache = await (0, _createincrementalcache.createIncrementalCache)({
        dir,
        distDir,
        cacheHandler,
        cacheHandlers,
        requestHeaders,
        fetchCacheKeyPrefix,
        flushToDisk: isrFlushToDisk,
        cacheMaxMemorySize
    });
    const childrenRouteParamSegments = [];
    // These are all the parallel fallback route params that will be included when
    // we're emitting the route for the base route.
    const parallelFallbackRouteParams = [];
    // First pass: collect all non-parallel route param names.
    // This allows us to filter out parallel route params that duplicate non-parallel ones.
    const nonParallelParamNames = new Set();
    for (const segment of segments){
        if (!segment.paramName || !segment.paramType) continue;
        if (!segment.isParallelRouteSegment) {
            nonParallelParamNames.add(segment.paramName);
        }
    }
    // Second pass: collect segments, ensuring non-parallel route params take precedence.
    for (const segment of segments){
        // If this segment doesn't have a param name then it's not param that we
        // need to resolve.
        if (!segment.paramName || !segment.paramType) continue;
        if (segment.isParallelRouteSegment) {
            // Skip parallel route params that are already defined as non-parallel route params.
            // Non-parallel route params take precedence because they appear in the URL pathname.
            if (nonParallelParamNames.has(segment.paramName)) {
                continue;
            }
            // Collect parallel fallback route params for the base route.
            // The actual parallel route param resolution is now handled by
            // resolveParallelRouteParams using the loader tree.
            parallelFallbackRouteParams.push((0, _utils.createFallbackRouteParam)(segment.paramName, segment.paramType, true));
        } else {
            // Collect all the route param keys that are not parallel route params.
            // These are the ones that will be included in the request pathname.
            childrenRouteParamSegments.push({
                name: segment.name,
                paramName: segment.paramName,
                paramType: segment.paramType
            });
        }
    }
    const afterRunner = new _runwithafter.AfterRunner();
    const store = (0, _workstore.createWorkStore)({
        page,
        renderOpts: {
            incrementalCache,
            cacheLifeProfiles,
            supportsDynamicResponse: true,
            cacheComponents,
            experimental: {
                authInterrupts
            },
            waitUntil: afterRunner.context.waitUntil,
            onClose: afterRunner.context.onClose,
            onAfterTaskError: afterRunner.context.onTaskError
        },
        buildId,
        previouslyRevalidatedTags: []
    });
    const routeParams = await ComponentMod.workAsyncStorage.run(store, generateRouteStaticParams, segments, store, isRoutePPREnabled);
    await afterRunner.executeAfter();
    let lastDynamicSegmentHadGenerateStaticParams = false;
    for (const segment of segments){
        var _segment_config;
        // Check to see if there are any missing params for segments that have
        // dynamicParams set to false.
        if (segment.paramName && segment.isDynamicSegment && ((_segment_config = segment.config) == null ? void 0 : _segment_config.dynamicParams) === false) {
            for (const params of routeParams){
                if (segment.paramName in params) continue;
                const relative = segment.filePath ? _nodepath.default.relative(dir, segment.filePath) : undefined;
                throw Object.defineProperty(new Error(`Segment "${relative}" exports "dynamicParams: false" but the param "${segment.paramName}" is missing from the generated route params.`), "__NEXT_ERROR_CODE", {
                    value: "E280",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        if (segment.isDynamicSegment && typeof segment.generateStaticParams !== 'function') {
            lastDynamicSegmentHadGenerateStaticParams = false;
        } else if (typeof segment.generateStaticParams === 'function') {
            lastDynamicSegmentHadGenerateStaticParams = true;
        }
    }
    // Determine if all the segments have had their parameters provided.
    const hadAllParamsGenerated = childrenRouteParamSegments.length === 0 || routeParams.length > 0 && routeParams.every((params)=>{
        for (const { paramName } of childrenRouteParamSegments){
            if (paramName in params) continue;
            return false;
        }
        return true;
    });
    // TODO: dynamic params should be allowed to be granular per segment but
    // we need additional information stored/leveraged in the prerender
    // manifest to allow this behavior.
    const dynamicParams = segments.every((segment)=>{
        var _segment_config;
        return ((_segment_config = segment.config) == null ? void 0 : _segment_config.dynamicParams) !== false;
    });
    const supportsRoutePreGeneration = hadAllParamsGenerated || ("TURBOPACK compile-time value", "development") === 'production';
    const fallbackMode = dynamicParams ? supportsRoutePreGeneration ? isRoutePPREnabled ? _fallback.FallbackMode.PRERENDER : _fallback.FallbackMode.BLOCKING_STATIC_RENDER : undefined : _fallback.FallbackMode.NOT_FOUND;
    const prerenderedRoutesByPathname = new Map();
    // Convert rootParamKeys to Set for O(1) lookup.
    const rootParamSet = new Set(rootParamKeys);
    if (hadAllParamsGenerated || isRoutePPREnabled) {
        let paramsToProcess = routeParams;
        if (isRoutePPREnabled) {
            // Discover all unique combinations of the routeParams so we can generate
            // routes that won't throw on empty static shell for each of them if
            // they're available.
            paramsToProcess = generateAllParamCombinations(childrenRouteParamSegments, routeParams, rootParamKeys);
            // The fallback route params for this route is a combination of the
            // parallel route params and the non-parallel route params.
            const fallbackRouteParams = [
                ...childrenRouteParamSegments.map(({ paramName, paramType: type })=>(0, _utils.createFallbackRouteParam)(paramName, type, false)),
                ...parallelFallbackRouteParams
            ];
            // Add the base route, this is the route with all the placeholders as it's
            // derived from the `page` string.
            prerenderedRoutesByPathname.set(page, {
                params: {},
                pathname: page,
                encodedPathname: page,
                fallbackRouteParams,
                fallbackMode: calculateFallbackMode(dynamicParams, rootParamKeys, fallbackMode),
                fallbackRootParams: rootParamKeys,
                throwOnEmptyStaticShell: true
            });
        }
        filterUniqueParams(childrenRouteParamSegments, validateParams(page, isRoutePPREnabled, childrenRouteParamSegments, rootParamKeys, paramsToProcess)).forEach((params)=>{
            let pathname = page;
            let encodedPathname = page;
            const fallbackRouteParams = [];
            for (const { paramName: key, paramType: type } of childrenRouteParamSegments){
                const paramValue = params[key];
                if (!paramValue) {
                    if (isRoutePPREnabled) {
                        // Mark remaining params as fallback params.
                        fallbackRouteParams.push((0, _utils.createFallbackRouteParam)(key, type, false));
                        for(let i = childrenRouteParamSegments.findIndex((param)=>param.paramName === key) + 1; i < childrenRouteParamSegments.length; i++){
                            fallbackRouteParams.push((0, _utils.createFallbackRouteParam)(childrenRouteParamSegments[i].paramName, childrenRouteParamSegments[i].paramType, false));
                        }
                        break;
                    } else {
                        // This route is not complete, and we aren't performing a partial
                        // prerender, so we should return, skipping this route.
                        return;
                    }
                }
                const segment = childrenRouteParamSegments.find(({ paramName })=>paramName === key);
                if (!segment) {
                    throw Object.defineProperty(new _invarianterror.InvariantError(`Param ${key} not found in childrenRouteParamSegments ${childrenRouteParamSegments.map(({ paramName })=>paramName).join(', ')}`), "__NEXT_ERROR_CODE", {
                        value: "E894",
                        enumerable: false,
                        configurable: true
                    });
                }
                pathname = pathname.replace(segment.name, (0, _utils.encodeParam)(paramValue, (value)=>(0, _escapepathdelimiters.default)(value, true)));
                encodedPathname = encodedPathname.replace(segment.name, (0, _utils.encodeParam)(paramValue, encodeURIComponent));
            }
            // Resolve parallel route params from the loader tree if this is from an
            // app page.
            if ('loaderTree' in ComponentMod.routeModule.userland && Array.isArray(ComponentMod.routeModule.userland.loaderTree)) {
                resolveParallelRouteParams(ComponentMod.routeModule.userland.loaderTree, params, pathname, fallbackRouteParams);
            }
            const fallbackRootParams = [];
            for (const { paramName, isParallelRouteParam } of fallbackRouteParams){
                // Only add the param to the fallback root params if it's not a
                // parallel route param. They won't contribute to the request pathname.
                if (isParallelRouteParam) continue;
                // If the param is a root param then we can add it to the fallback
                // root params.
                if (rootParamSet.has(paramName)) {
                    fallbackRootParams.push(paramName);
                }
            }
            pathname = (0, _utils.normalizePathname)(pathname);
            prerenderedRoutesByPathname.set(pathname, {
                params,
                pathname,
                encodedPathname: (0, _utils.normalizePathname)(encodedPathname),
                fallbackRouteParams,
                fallbackMode: calculateFallbackMode(dynamicParams, fallbackRootParams, fallbackMode),
                fallbackRootParams,
                throwOnEmptyStaticShell: true
            });
        });
    }
    const prerenderedRoutes = prerenderedRoutesByPathname.size > 0 || lastDynamicSegmentHadGenerateStaticParams ? [
        ...prerenderedRoutesByPathname.values()
    ] : undefined;
    // Now we have to set the throwOnEmptyStaticShell for each of the routes.
    if (prerenderedRoutes && cacheComponents) {
        assignErrorIfEmpty(prerenderedRoutes, childrenRouteParamSegments);
    }
    return {
        fallbackMode,
        prerenderedRoutes
    };
} //# sourceMappingURL=app.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/pages.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildPagesStaticPaths", {
    enumerable: true,
    get: function() {
        return buildPagesStaticPaths;
    }
});
const _normalizelocalepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [app-client] (ecmascript)");
const _fallback = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/fallback.js [app-client] (ecmascript)");
const _escapepathdelimiters = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/escape-path-delimiters.js [app-client] (ecmascript)"));
const _removetrailingslash = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [app-client] (ecmascript)");
const _routematcher = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-matcher.js [app-client] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-regex.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/utils.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function buildPagesStaticPaths({ page, getStaticPaths, configFileName, locales, defaultLocale }) {
    const prerenderedRoutesByPathname = new Map();
    const _routeRegex = (0, _routeregex.getRouteRegex)(page);
    const _routeMatcher = (0, _routematcher.getRouteMatcher)(_routeRegex);
    // Get the default list of allowed params.
    const routeParameterKeys = Object.keys(_routeMatcher(page));
    const staticPathsResult = await getStaticPaths({
        // We create a copy here to avoid having the types of `getStaticPaths`
        // change. This ensures that users can't mutate this array and have it
        // poison the reference.
        locales: [
            ...locales ?? []
        ],
        defaultLocale
    });
    const expectedReturnVal = `Expected: { paths: [], fallback: boolean }\n` + `See here for more info: https://nextjs.org/docs/messages/invalid-getstaticpaths-value`;
    if (!staticPathsResult || typeof staticPathsResult !== 'object' || Array.isArray(staticPathsResult)) {
        throw Object.defineProperty(new Error(`Invalid value returned from getStaticPaths in ${page}. Received ${typeof staticPathsResult} ${expectedReturnVal}`), "__NEXT_ERROR_CODE", {
            value: "E241",
            enumerable: false,
            configurable: true
        });
    }
    const invalidStaticPathKeys = Object.keys(staticPathsResult).filter((key)=>!(key === 'paths' || key === 'fallback'));
    if (invalidStaticPathKeys.length > 0) {
        throw Object.defineProperty(new Error(`Extra keys returned from getStaticPaths in ${page} (${invalidStaticPathKeys.join(', ')}) ${expectedReturnVal}`), "__NEXT_ERROR_CODE", {
            value: "E38",
            enumerable: false,
            configurable: true
        });
    }
    if (!(typeof staticPathsResult.fallback === 'boolean' || staticPathsResult.fallback === 'blocking')) {
        throw Object.defineProperty(new Error(`The \`fallback\` key must be returned from getStaticPaths in ${page}.\n` + expectedReturnVal), "__NEXT_ERROR_CODE", {
            value: "E243",
            enumerable: false,
            configurable: true
        });
    }
    const toPrerender = staticPathsResult.paths;
    if (!Array.isArray(toPrerender)) {
        throw Object.defineProperty(new Error(`Invalid \`paths\` value returned from getStaticPaths in ${page}.\n` + `\`paths\` must be an array of strings or objects of shape { params: [key: string]: string }`), "__NEXT_ERROR_CODE", {
            value: "E83",
            enumerable: false,
            configurable: true
        });
    }
    toPrerender.forEach((entry)=>{
        // For a string-provided path, we must make sure it matches the dynamic
        // route.
        if (typeof entry === 'string') {
            entry = (0, _removetrailingslash.removeTrailingSlash)(entry);
            const localePathResult = (0, _normalizelocalepath.normalizeLocalePath)(entry, locales);
            let cleanedEntry = entry;
            if (localePathResult.detectedLocale) {
                cleanedEntry = entry.slice(localePathResult.detectedLocale.length + 1);
            } else if (defaultLocale) {
                entry = `/${defaultLocale}${entry}`;
            }
            const params = _routeMatcher(cleanedEntry);
            if (!params) {
                throw Object.defineProperty(new Error(`The provided path \`${cleanedEntry}\` does not match the page: \`${page}\`.`), "__NEXT_ERROR_CODE", {
                    value: "E481",
                    enumerable: false,
                    configurable: true
                });
            }
            // If leveraging the string paths variant the entry should already be
            // encoded so we decode the segments ensuring we only escape path
            // delimiters
            const pathname = entry.split('/').map((segment)=>(0, _escapepathdelimiters.default)(decodeURIComponent(segment), true)).join('/');
            if (!prerenderedRoutesByPathname.has(pathname)) {
                prerenderedRoutesByPathname.set(pathname, {
                    params,
                    pathname,
                    encodedPathname: entry,
                    fallbackRouteParams: undefined,
                    fallbackMode: (0, _fallback.parseStaticPathsResult)(staticPathsResult.fallback),
                    fallbackRootParams: undefined,
                    throwOnEmptyStaticShell: undefined
                });
            }
        } else {
            const invalidKeys = Object.keys(entry).filter((key)=>key !== 'params' && key !== 'locale');
            if (invalidKeys.length) {
                throw Object.defineProperty(new Error(`Additional keys were returned from \`getStaticPaths\` in page "${page}". ` + `URL Parameters intended for this dynamic route must be nested under the \`params\` key, i.e.:` + `\n\n\treturn { params: { ${routeParameterKeys.map((k)=>`${k}: ...`).join(', ')} } }` + `\n\nKeys that need to be moved: ${invalidKeys.join(', ')}.\n`), "__NEXT_ERROR_CODE", {
                    value: "E322",
                    enumerable: false,
                    configurable: true
                });
            }
            const { params = {} } = entry;
            let builtPage = page;
            let encodedBuiltPage = page;
            routeParameterKeys.forEach((validParamKey)=>{
                const { repeat, optional } = _routeRegex.groups[validParamKey];
                let paramValue = params[validParamKey];
                if (optional && params.hasOwnProperty(validParamKey) && (paramValue === null || paramValue === undefined || paramValue === false)) {
                    paramValue = [];
                }
                if (repeat && !Array.isArray(paramValue) || !repeat && typeof paramValue !== 'string' || typeof paramValue === 'undefined') {
                    throw Object.defineProperty(new Error(`A required parameter (${validParamKey}) was not provided as ${repeat ? 'an array' : 'a string'} received ${typeof paramValue} in getStaticPaths for ${page}`), "__NEXT_ERROR_CODE", {
                        value: "E620",
                        enumerable: false,
                        configurable: true
                    });
                }
                let replaced = `[${repeat ? '...' : ''}${validParamKey}]`;
                if (optional) {
                    replaced = `[${replaced}]`;
                }
                builtPage = builtPage.replace(replaced, (0, _utils.encodeParam)(paramValue, (value)=>(0, _escapepathdelimiters.default)(value, true)));
                encodedBuiltPage = encodedBuiltPage.replace(replaced, (0, _utils.encodeParam)(paramValue, encodeURIComponent));
            });
            if (!builtPage && !encodedBuiltPage) {
                return;
            }
            if (entry.locale && !(locales == null ? void 0 : locales.includes(entry.locale))) {
                throw Object.defineProperty(new Error(`Invalid locale returned from getStaticPaths for ${page}, the locale ${entry.locale} is not specified in ${configFileName}`), "__NEXT_ERROR_CODE", {
                    value: "E358",
                    enumerable: false,
                    configurable: true
                });
            }
            const curLocale = entry.locale || defaultLocale || '';
            const pathname = (0, _utils.normalizePathname)(`${curLocale ? `/${curLocale}` : ''}${curLocale && builtPage === '/' ? '' : builtPage}`);
            if (!prerenderedRoutesByPathname.has(pathname)) {
                prerenderedRoutesByPathname.set(pathname, {
                    params,
                    pathname,
                    encodedPathname: (0, _utils.normalizePathname)(`${curLocale ? `/${curLocale}` : ''}${curLocale && encodedBuiltPage === '/' ? '' : encodedBuiltPage}`),
                    fallbackRouteParams: undefined,
                    fallbackMode: (0, _fallback.parseStaticPathsResult)(staticPathsResult.fallback),
                    fallbackRootParams: undefined,
                    throwOnEmptyStaticShell: undefined
                });
            }
        }
    });
    return {
        fallbackMode: (0, _fallback.parseStaticPathsResult)(staticPathsResult.fallback),
        prerenderedRoutes: [
            ...prerenderedRoutesByPathname.values()
        ]
    };
} //# sourceMappingURL=pages.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NestedMiddlewareError: null,
    RSPACK_DEFAULT_LAYERS_REGEX: null,
    collectMeta: null,
    collectRoutesUsingEdgeRuntime: null,
    copyTracedFiles: null,
    detectConflictingPaths: null,
    difference: null,
    getDefinedNamedExports: null,
    getPossibleInstrumentationHookFilenames: null,
    getPossibleMiddlewareFilenames: null,
    getSupportedBrowsers: null,
    hasCustomGetInitialProps: null,
    isAppBuiltinPage: null,
    isCustomErrorPage: null,
    isInstrumentationHookFile: null,
    isInstrumentationHookFilename: null,
    isMiddlewareFile: null,
    isMiddlewareFilename: null,
    isPageStatic: null,
    isProxyFile: null,
    isReservedPage: null,
    isWebpackAppPagesLayer: null,
    isWebpackBundledLayer: null,
    isWebpackClientOnlyLayer: null,
    isWebpackDefaultLayer: null,
    printBuildErrors: null,
    printCustomRoutes: null,
    printTreeView: null,
    reduceAppConfig: null,
    shouldUseReactServerCondition: null,
    unique: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NestedMiddlewareError: function() {
        return NestedMiddlewareError;
    },
    RSPACK_DEFAULT_LAYERS_REGEX: function() {
        return RSPACK_DEFAULT_LAYERS_REGEX;
    },
    collectMeta: function() {
        return collectMeta;
    },
    collectRoutesUsingEdgeRuntime: function() {
        return collectRoutesUsingEdgeRuntime;
    },
    copyTracedFiles: function() {
        return copyTracedFiles;
    },
    detectConflictingPaths: function() {
        return detectConflictingPaths;
    },
    difference: function() {
        return difference;
    },
    getDefinedNamedExports: function() {
        return getDefinedNamedExports;
    },
    getPossibleInstrumentationHookFilenames: function() {
        return getPossibleInstrumentationHookFilenames;
    },
    getPossibleMiddlewareFilenames: function() {
        return getPossibleMiddlewareFilenames;
    },
    getSupportedBrowsers: function() {
        return getSupportedBrowsers;
    },
    hasCustomGetInitialProps: function() {
        return hasCustomGetInitialProps;
    },
    isAppBuiltinPage: function() {
        return isAppBuiltinPage;
    },
    isCustomErrorPage: function() {
        return isCustomErrorPage;
    },
    isInstrumentationHookFile: function() {
        return isInstrumentationHookFile;
    },
    isInstrumentationHookFilename: function() {
        return isInstrumentationHookFilename;
    },
    isMiddlewareFile: function() {
        return isMiddlewareFile;
    },
    isMiddlewareFilename: function() {
        return isMiddlewareFilename;
    },
    isPageStatic: function() {
        return isPageStatic;
    },
    isProxyFile: function() {
        return isProxyFile;
    },
    isReservedPage: function() {
        return isReservedPage;
    },
    isWebpackAppPagesLayer: function() {
        return isWebpackAppPagesLayer;
    },
    isWebpackBundledLayer: function() {
        return isWebpackBundledLayer;
    },
    isWebpackClientOnlyLayer: function() {
        return isWebpackClientOnlyLayer;
    },
    isWebpackDefaultLayer: function() {
        return isWebpackDefaultLayer;
    },
    printBuildErrors: function() {
        return printBuildErrors;
    },
    printCustomRoutes: function() {
        return printCustomRoutes;
    },
    printTreeView: function() {
        return printTreeView;
    },
    reduceAppConfig: function() {
        return reduceAppConfig;
    },
    shouldUseReactServerCondition: function() {
        return shouldUseReactServerCondition;
    },
    unique: function() {
        return unique;
    }
});
const _ppr = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/experimental/ppr.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/require-hook.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/node-polyfill-crypto.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/node-environment.js [app-client] (ecmascript)");
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _texttable = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/text-table/index.js [app-client] (ecmascript)"));
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _reactis = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react-is/index.js [app-client] (ecmascript)");
const _stripansi = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/strip-ansi/index.js [app-client] (ecmascript)"));
const _browserslist = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/browserslist/index.js [app-client] (ecmascript)"));
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _isdynamic = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [app-client] (ecmascript)");
const _findpagefile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/find-page-file.js [app-client] (ecmascript)");
const _isedgeruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-edge-runtime.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _loadcomponents = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/load-components.js [app-client] (ecmascript)");
const _trace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/index.js [app-client] (ecmascript)");
const _setuphttpagentenv = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/setup-http-agent-env.js [app-client] (ecmascript)");
const _asyncsema = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/async-sema/index.js [app-client] (ecmascript)");
const _normalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js [app-client] (ecmascript)");
const _sandbox = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/web/sandbox/index.js [app-client] (ecmascript)");
const _routekind = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-kind.js [app-client] (ecmascript)");
const _appsegments = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/app-segments.js [app-client] (ecmascript)");
const _createincrementalcache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/export/helpers/create-incremental-cache.js [app-client] (ecmascript)");
const _collectrootparamkeys = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/collect-root-param-keys.js [app-client] (ecmascript)");
const _app = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/app.js [app-client] (ecmascript)");
const _pages = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/pages.js [app-client] (ecmascript)");
const _format = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/format.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/utils.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// Use `print()` for expected console output
const print = console.log;
const RESERVED_PAGE = /^\/(_app|_error|_document|api(\/|$))/;
function unique(main, sub) {
    return [
        ...new Set([
            ...main,
            ...sub
        ])
    ];
}
function difference(main, sub) {
    const a = new Set(main);
    const b = new Set(sub);
    return [
        ...a
    ].filter((x)=>!b.has(x));
}
function isMiddlewareFilename(file) {
    return file === _constants.MIDDLEWARE_FILENAME || file === `src/${_constants.MIDDLEWARE_FILENAME}` || file === _constants.PROXY_FILENAME || file === `src/${_constants.PROXY_FILENAME}`;
}
function isInstrumentationHookFilename(file) {
    return file === _constants.INSTRUMENTATION_HOOK_FILENAME || file === `src/${_constants.INSTRUMENTATION_HOOK_FILENAME}`;
}
const filterAndSortList = (list, routeType, hasCustomApp)=>{
    let pages;
    if (routeType === 'app') {
        // filter out static app route of /favicon.ico and /_global-error
        pages = list.filter((e)=>{
            if (e === '/favicon.ico') return false;
            // Hide static /_global-error from build output
            if (e === '/_global-error') return false;
            return true;
        });
    } else {
        // filter built-in pages
        pages = list.slice().filter((e)=>!(e === '/_document' || e === '/_error' || !hasCustomApp && e === '/_app'));
    }
    return pages.sort((a, b)=>a.localeCompare(b));
};
function collectRoutesUsingEdgeRuntime(input) {
    const routesUsingEdgeRuntime = {};
    for (const [route, info] of input.entries()){
        if ((0, _isedgeruntime.isEdgeRuntime)(info.runtime)) {
            routesUsingEdgeRuntime[route] = 0;
        }
    }
    return routesUsingEdgeRuntime;
}
function printBuildErrors(entrypoints, isDev) {
    // Issues that we want to stop the server from executing
    const topLevelFatalIssues = [];
    // Issues that are true errors, but we believe we can keep running and allow the user to address the issue
    const topLevelErrors = [];
    // Issues that are warnings but should not affect the running of the build
    const topLevelWarnings = [];
    // Track seen formatted error messages to avoid duplicates
    const seenFatalIssues = new Set();
    const seenErrors = new Set();
    const seenWarnings = new Set();
    for (const issue of entrypoints.issues){
        // We only want to completely shut down the server
        if (issue.severity === 'fatal' || issue.severity === 'bug') {
            const formatted = (0, _utils.formatIssue)(issue);
            if (!seenFatalIssues.has(formatted)) {
                seenFatalIssues.add(formatted);
                topLevelFatalIssues.push(formatted);
            }
        } else if ((0, _utils.isRelevantWarning)(issue)) {
            const formatted = (0, _utils.formatIssue)(issue);
            if (!seenWarnings.has(formatted)) {
                seenWarnings.add(formatted);
                topLevelWarnings.push(formatted);
            }
        } else if (issue.severity === 'error') {
            const formatted = (0, _utils.formatIssue)(issue);
            if (isDev) {
                // We want to treat errors as recoverable in development
                // so that we can show the errors in the site and allow users
                // to respond to the errors when necessary. In production builds
                // though we want to error out and stop the build process.
                if (!seenErrors.has(formatted)) {
                    seenErrors.add(formatted);
                    topLevelErrors.push(formatted);
                }
            } else {
                if (!seenFatalIssues.has(formatted)) {
                    seenFatalIssues.add(formatted);
                    topLevelFatalIssues.push(formatted);
                }
            }
        }
    }
    // TODO: print in order by source location so issues from the same file are displayed together and then add a summary at the end about the number of warnings/errors
    if (topLevelWarnings.length > 0) {
        console.warn(`Turbopack build encountered ${topLevelWarnings.length} warnings:\n${topLevelWarnings.join('\n')}`);
    }
    if (topLevelErrors.length > 0) {
        console.error(`Turbopack build encountered ${topLevelErrors.length} errors:\n${topLevelErrors.join('\n')}`);
    }
    if (topLevelFatalIssues.length > 0) {
        throw Object.defineProperty(new Error(`Turbopack build failed with ${topLevelFatalIssues.length} errors:\n${topLevelFatalIssues.join('\n')}`), "__NEXT_ERROR_CODE", {
            value: "E425",
            enumerable: false,
            configurable: true
        });
    }
}
async function printTreeView(lists, pageInfos, { pagesDir, pageExtensions, middlewareManifest, functionsConfigManifest, useStaticPages404, hasGSPAndRevalidateZero }) {
    var _lists_app, _middlewareManifest_middleware_, _middlewareManifest_middleware, // functions-config-manifest instead of middleware-manifest.
    _functionsConfigManifest_functions;
    // Can be overridden for test purposes to omit the build duration output.
    const MIN_DURATION = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_PRIVATE_DETERMINISTIC_BUILD_OUTPUT ? Infinity // Don't ever log build durations.
     : 300;
    const getPrettyDuration = (_duration)=>{
        const duration = `${_duration} ms`;
        // green for 300-1000ms
        if (_duration < 1000) return (0, _picocolors.green)(duration);
        // yellow for 1000-2000ms
        if (_duration < 2000) return (0, _picocolors.yellow)(duration);
        // red for >= 2000ms
        return (0, _picocolors.red)((0, _picocolors.bold)(duration));
    };
    // Check if we have a custom app.
    const hasCustomApp = !!(pagesDir && await (0, _findpagefile.findPageFile)(pagesDir, '/_app', pageExtensions, false));
    // Collect all the symbols we use so we can print the icons out.
    const usedSymbols = new Set();
    const messages = [];
    const printFileTree = async ({ list, routerType })=>{
        const filteredPages = filterAndSortList(list, routerType, hasCustomApp);
        if (filteredPages.length === 0) {
            return;
        }
        let showRevalidate = false;
        let showExpire = false;
        for (const page of filteredPages){
            var _pageInfos_get;
            const cacheControl = (_pageInfos_get = pageInfos.get(page)) == null ? void 0 : _pageInfos_get.initialCacheControl;
            if (cacheControl == null ? void 0 : cacheControl.revalidate) {
                showRevalidate = true;
            }
            if (cacheControl == null ? void 0 : cacheControl.expire) {
                showExpire = true;
            }
            if (showRevalidate && showExpire) {
                break;
            }
        }
        messages.push([
            routerType === 'app' ? 'Route (app)' : 'Route (pages)',
            showRevalidate ? 'Revalidate' : '',
            showExpire ? 'Expire' : ''
        ].filter((entry)=>entry !== '').map((entry)=>(0, _picocolors.underline)(entry)));
        filteredPages.forEach((item, i, arr)=>{
            var _pageInfo_ssgPageDurations, _pageInfo_ssgPageRoutes;
            const border = i === 0 ? arr.length === 1 ? '─' : '┌' : i === arr.length - 1 ? '└' : '├';
            const pageInfo = pageInfos.get(item);
            const totalDuration = ((pageInfo == null ? void 0 : pageInfo.pageDuration) || 0) + ((pageInfo == null ? void 0 : (_pageInfo_ssgPageDurations = pageInfo.ssgPageDurations) == null ? void 0 : _pageInfo_ssgPageDurations.reduce((a, b)=>a + (b || 0), 0)) || 0);
            let symbol;
            if (item === '/_app' || item === '/_app.server') {
                symbol = ' ';
            } else if ((0, _isedgeruntime.isEdgeRuntime)(pageInfo == null ? void 0 : pageInfo.runtime)) {
                symbol = 'ƒ';
            } else if (pageInfo == null ? void 0 : pageInfo.isRoutePPREnabled) {
                if (// dynamic page
                (pageInfo == null ? void 0 : pageInfo.hasEmptyStaticShell) || // ensure we don't mark dynamic paths that postponed as being dynamic
                // since in this case we're able to partially prerender it
                pageInfo.isDynamicAppRoute && !pageInfo.hasPostponed) {
                    symbol = 'ƒ';
                } else if (!(pageInfo == null ? void 0 : pageInfo.hasPostponed)) {
                    symbol = '○';
                } else {
                    symbol = '◐';
                }
            } else if (pageInfo == null ? void 0 : pageInfo.isStatic) {
                symbol = '○';
            } else if (pageInfo == null ? void 0 : pageInfo.isSSG) {
                symbol = '●';
            } else {
                symbol = 'ƒ';
            }
            if (hasGSPAndRevalidateZero.has(item)) {
                usedSymbols.add('ƒ');
                messages.push([
                    `${border} ƒ ${item}${totalDuration > MIN_DURATION ? ` (${getPrettyDuration(totalDuration)})` : ''}`,
                    showRevalidate && (pageInfo == null ? void 0 : pageInfo.initialCacheControl) ? (0, _format.formatRevalidate)(pageInfo.initialCacheControl) : '',
                    showExpire && (pageInfo == null ? void 0 : pageInfo.initialCacheControl) ? (0, _format.formatExpire)(pageInfo.initialCacheControl) : ''
                ]);
            }
            usedSymbols.add(symbol);
            messages.push([
                `${border} ${symbol} ${item}${totalDuration > MIN_DURATION ? ` (${getPrettyDuration(totalDuration)})` : ''}`,
                showRevalidate && (pageInfo == null ? void 0 : pageInfo.initialCacheControl) ? (0, _format.formatRevalidate)(pageInfo.initialCacheControl) : '',
                showExpire && (pageInfo == null ? void 0 : pageInfo.initialCacheControl) ? (0, _format.formatExpire)(pageInfo.initialCacheControl) : ''
            ]);
            if (pageInfo == null ? void 0 : (_pageInfo_ssgPageRoutes = pageInfo.ssgPageRoutes) == null ? void 0 : _pageInfo_ssgPageRoutes.length) {
                var _pageInfo_ssgPageDurations1;
                const totalRoutes = pageInfo.ssgPageRoutes.length;
                const contSymbol = i === arr.length - 1 ? ' ' : '│';
                // HERE
                let routes;
                if ((_pageInfo_ssgPageDurations1 = pageInfo.ssgPageDurations) == null ? void 0 : _pageInfo_ssgPageDurations1.some((d)=>d > MIN_DURATION)) {
                    const previewPages = totalRoutes === 8 ? 8 : Math.min(totalRoutes, 7);
                    const routesWithDuration = pageInfo.ssgPageRoutes.map((route, idx)=>({
                            route,
                            duration: pageInfo.ssgPageDurations[idx] || 0
                        })).sort(({ duration: a }, { duration: b })=>// keep too small durations in original order at the end
                        a <= MIN_DURATION && b <= MIN_DURATION ? 0 : b - a);
                    routes = routesWithDuration.slice(0, previewPages);
                    const remainingRoutes = routesWithDuration.slice(previewPages);
                    if (remainingRoutes.length) {
                        const remaining = remainingRoutes.length;
                        const avgDuration = Math.round(remainingRoutes.reduce((total, { duration })=>total + duration, 0) / remainingRoutes.length);
                        routes.push({
                            route: `[+${remaining} more paths]`,
                            duration: 0,
                            avgDuration
                        });
                    }
                } else {
                    const previewPages = totalRoutes === 4 ? 4 : Math.min(totalRoutes, 3);
                    routes = pageInfo.ssgPageRoutes.slice(0, previewPages).map((route)=>({
                            route,
                            duration: 0
                        }));
                    if (totalRoutes > previewPages) {
                        const remaining = totalRoutes - previewPages;
                        routes.push({
                            route: `[+${remaining} more paths]`,
                            duration: 0
                        });
                    }
                }
                routes.forEach(({ route, duration, avgDuration }, index, { length })=>{
                    var _pageInfos_get;
                    const innerSymbol = index === length - 1 ? '└' : '├';
                    const initialCacheControl = (_pageInfos_get = pageInfos.get(route)) == null ? void 0 : _pageInfos_get.initialCacheControl;
                    messages.push([
                        `${contSymbol} ${innerSymbol} ${route}${duration > MIN_DURATION ? ` (${getPrettyDuration(duration)})` : ''}${avgDuration && avgDuration > MIN_DURATION ? ` (avg ${getPrettyDuration(avgDuration)})` : ''}`,
                        showRevalidate && initialCacheControl ? (0, _format.formatRevalidate)(initialCacheControl) : '',
                        showExpire && initialCacheControl ? (0, _format.formatExpire)(initialCacheControl) : ''
                    ]);
                });
            }
        });
    };
    // If enabled, then print the tree for the app directory.
    if (lists.app) {
        await printFileTree({
            routerType: 'app',
            list: lists.app
        });
        messages.push([
            '',
            '',
            '',
            ''
        ]);
    }
    pageInfos.set('/404', {
        ...pageInfos.get('/404') || pageInfos.get('/_error'),
        isStatic: useStaticPages404
    });
    // If there's no app /_notFound page present, then the 404 is still using the pages/404
    if (!lists.pages.includes('/404') && !((_lists_app = lists.app) == null ? void 0 : _lists_app.includes(_constants1.UNDERSCORE_NOT_FOUND_ROUTE))) {
        lists.pages = [
            ...lists.pages,
            '/404'
        ];
    }
    // Print the tree view for the pages directory.
    await printFileTree({
        routerType: 'pages',
        list: lists.pages
    });
    if (((_middlewareManifest_middleware = middlewareManifest.middleware) == null ? void 0 : (_middlewareManifest_middleware_ = _middlewareManifest_middleware['/']) == null ? void 0 : _middlewareManifest_middleware_.files.length) > 0 || ((_functionsConfigManifest_functions = functionsConfigManifest.functions) == null ? void 0 : _functionsConfigManifest_functions['/_middleware'])) {
        messages.push([]);
        messages.push([
            'ƒ Proxy (Middleware)'
        ]);
    }
    print((0, _texttable.default)(messages, {
        align: [
            'l',
            'r',
            'r',
            'r'
        ],
        stringLength: (str)=>(0, _stripansi.default)(str).length
    }));
    const staticFunctionInfo = lists.app ? 'generateStaticParams' : 'getStaticProps';
    print();
    print((0, _texttable.default)([
        usedSymbols.has('○') && [
            '○',
            '(Static)',
            'prerendered as static content'
        ],
        usedSymbols.has('●') && [
            '●',
            '(SSG)',
            `prerendered as static HTML (uses ${(0, _picocolors.cyan)(staticFunctionInfo)})`
        ],
        usedSymbols.has('◐') && [
            '◐',
            '(Partial Prerender)',
            'prerendered as static HTML with dynamic server-streamed content'
        ],
        usedSymbols.has('ƒ') && [
            'ƒ',
            '(Dynamic)',
            `server-rendered on demand`
        ]
    ].filter((x)=>x), {
        align: [
            'l',
            'l',
            'l'
        ],
        stringLength: (str)=>(0, _stripansi.default)(str).length
    }));
    print();
}
function printCustomRoutes({ redirects, rewrites, headers }) {
    const printRoutes = (routes, type)=>{
        const isRedirects = type === 'Redirects';
        const isHeaders = type === 'Headers';
        print((0, _picocolors.underline)(type));
        /*
        ┌ source
        ├ permanent/statusCode
        └ destination
     */ const routesStr = routes.map((route)=>{
            let routeStr = `┌ source: ${route.source}\n`;
            if (!isHeaders) {
                const r = route;
                routeStr += `${isRedirects ? '├' : '└'} destination: ${r.destination}\n`;
            }
            if (isRedirects) {
                const r = route;
                routeStr += `└ ${r.statusCode ? `status: ${r.statusCode}` : `permanent: ${r.permanent}`}\n`;
            }
            if (isHeaders) {
                const r = route;
                routeStr += `└ headers:\n`;
                for(let i = 0; i < r.headers.length; i++){
                    const header = r.headers[i];
                    const last = i === headers.length - 1;
                    routeStr += `  ${last ? '└' : '├'} ${header.key}: ${header.value}\n`;
                }
            }
            return routeStr;
        }).join('\n');
        print(`${routesStr}\n`);
    };
    print();
    if (redirects.length) {
        printRoutes(redirects, 'Redirects');
    }
    if (headers.length) {
        printRoutes(headers, 'Headers');
    }
    const combinedRewrites = [
        ...rewrites.beforeFiles,
        ...rewrites.afterFiles,
        ...rewrites.fallback
    ];
    if (combinedRewrites.length) {
        printRoutes(combinedRewrites, 'Rewrites');
    }
}
async function isPageStatic({ dir, page, distDir, configFileName, httpAgentOptions, locales, defaultLocale, parentId, pageRuntime, edgeInfo, pageType, cacheComponents, authInterrupts, originalAppPath, isrFlushToDisk, cacheMaxMemorySize, nextConfigOutput, cacheHandler, cacheHandlers, cacheLifeProfiles, pprConfig, buildId, sriEnabled }) {
    // Skip page data collection for synthetic _global-error routes
    if (page === _constants1.UNDERSCORE_GLOBAL_ERROR_ROUTE) {
        return {
            isStatic: true,
            isRoutePPREnabled: false,
            prerenderFallbackMode: undefined,
            prerenderedRoutes: undefined,
            rootParamKeys: undefined,
            hasStaticProps: false,
            hasServerProps: false,
            isNextImageImported: false,
            appConfig: {}
        };
    }
    await (0, _createincrementalcache.createIncrementalCache)({
        cacheHandler,
        cacheHandlers,
        distDir,
        dir,
        flushToDisk: isrFlushToDisk,
        cacheMaxMemorySize
    });
    const isPageStaticSpan = (0, _trace.trace)('is-page-static-utils', parentId);
    return isPageStaticSpan.traceAsyncFn(async ()=>{
        (0, _setuphttpagentenv.setHttpClientAndAgentOptions)({
            httpAgentOptions
        });
        let componentsResult;
        let prerenderedRoutes;
        let prerenderFallbackMode;
        let appConfig = {};
        let rootParamKeys;
        const pathIsEdgeRuntime = (0, _isedgeruntime.isEdgeRuntime)(pageRuntime);
        if (pathIsEdgeRuntime) {
            const runtime = await (0, _sandbox.getRuntimeContext)({
                paths: edgeInfo.files.map((file)=>_path.default.join(distDir, file)),
                edgeFunctionEntry: {
                    ...edgeInfo,
                    wasm: (edgeInfo.wasm ?? []).map((binding)=>({
                            ...binding,
                            filePath: _path.default.join(distDir, binding.filePath)
                        }))
                },
                name: edgeInfo.name,
                useCache: true,
                distDir
            });
            const mod = (await runtime.context._ENTRIES[`middleware_${edgeInfo.name}`]).ComponentMod;
            // This is not needed during require.
            const buildManifest = {};
            componentsResult = {
                Component: mod.default,
                Document: mod.Document,
                App: mod.App,
                routeModule: mod.routeModule,
                page,
                ComponentMod: mod,
                pageConfig: mod.config || {},
                buildManifest,
                reactLoadableManifest: {},
                getServerSideProps: mod.getServerSideProps,
                getStaticPaths: mod.getStaticPaths,
                getStaticProps: mod.getStaticProps
            };
        } else {
            componentsResult = await (0, _loadcomponents.loadComponents)({
                distDir,
                page: originalAppPath || page,
                isAppPath: pageType === 'app',
                isDev: false,
                sriEnabled,
                needsManifestsForLegacyReasons: true
            });
        }
        const { Component, routeModule } = componentsResult;
        const Comp = Component;
        let isRoutePPREnabled = false;
        if (pageType === 'app') {
            const ComponentMod = componentsResult.ComponentMod;
            let segments;
            try {
                segments = await (0, _appsegments.collectSegments)(// checked above that the page type is 'app'.
                routeModule);
            } catch (err) {
                throw Object.defineProperty(new Error(`Failed to collect configuration for ${page}`, {
                    cause: err
                }), "__NEXT_ERROR_CODE", {
                    value: "E434",
                    enumerable: false,
                    configurable: true
                });
            }
            appConfig = originalAppPath === _constants1.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY ? {} : reduceAppConfig(segments);
            if (appConfig.dynamic === 'force-static' && pathIsEdgeRuntime) {
                _log.warn(`Page "${page}" is using runtime = 'edge' which is currently incompatible with dynamic = 'force-static'. Please remove either "runtime" or "force-static" for correct behavior`);
            }
            rootParamKeys = (0, _collectrootparamkeys.collectRootParamKeys)(routeModule);
            // A page supports partial prerendering if it is an app page and either
            // the whole app has PPR enabled or this page has PPR enabled when we're
            // in incremental mode.
            isRoutePPREnabled = routeModule.definition.kind === _routekind.RouteKind.APP_PAGE && (0, _ppr.checkIsRoutePPREnabled)(pprConfig);
            // If force dynamic was set and we don't have PPR enabled, then set the
            // revalidate to 0.
            // TODO: (PPR) remove this once PPR is enabled by default
            if (appConfig.dynamic === 'force-dynamic' && !isRoutePPREnabled) {
                appConfig.revalidate = 0;
            }
            // If the page is dynamic and we're not in edge runtime, then we need to
            // build the static paths. The edge runtime doesn't support static
            // paths.
            if ((0, _isdynamic.isDynamicRoute)(page) && !pathIsEdgeRuntime) {
                ;
                ({ prerenderedRoutes, fallbackMode: prerenderFallbackMode } = await (0, _app.buildAppStaticPaths)({
                    dir,
                    page,
                    cacheComponents,
                    authInterrupts,
                    segments,
                    distDir,
                    requestHeaders: {},
                    isrFlushToDisk,
                    cacheMaxMemorySize,
                    cacheHandler,
                    cacheLifeProfiles,
                    ComponentMod,
                    nextConfigOutput,
                    isRoutePPREnabled,
                    buildId,
                    rootParamKeys
                }));
            }
        } else {
            if (!Comp || !(0, _reactis.isValidElementType)(Comp) || typeof Comp === 'string') {
                throw Object.defineProperty(new Error('INVALID_DEFAULT_EXPORT'), "__NEXT_ERROR_CODE", {
                    value: "E457",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        const hasGetInitialProps = !!(Comp == null ? void 0 : Comp.getInitialProps);
        const hasStaticProps = !!componentsResult.getStaticProps;
        const hasStaticPaths = !!componentsResult.getStaticPaths;
        const hasServerProps = !!componentsResult.getServerSideProps;
        // A page cannot be prerendered _and_ define a data requirement. That's
        // contradictory!
        if (hasGetInitialProps && hasStaticProps) {
            throw Object.defineProperty(new Error(_constants.SSG_GET_INITIAL_PROPS_CONFLICT), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
        if (hasGetInitialProps && hasServerProps) {
            throw Object.defineProperty(new Error(_constants.SERVER_PROPS_GET_INIT_PROPS_CONFLICT), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
        if (hasStaticProps && hasServerProps) {
            throw Object.defineProperty(new Error(_constants.SERVER_PROPS_SSG_CONFLICT), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
        const pageIsDynamic = (0, _isdynamic.isDynamicRoute)(page);
        // A page cannot have static parameters if it is not a dynamic page.
        if (hasStaticProps && hasStaticPaths && !pageIsDynamic) {
            throw Object.defineProperty(new Error(`getStaticPaths can only be used with dynamic pages, not '${page}'.` + `\nLearn more: https://nextjs.org/docs/routing/dynamic-routes`), "__NEXT_ERROR_CODE", {
                value: "E356",
                enumerable: false,
                configurable: true
            });
        }
        if (hasStaticProps && pageIsDynamic && !hasStaticPaths) {
            throw Object.defineProperty(new Error(`getStaticPaths is required for dynamic SSG pages and is missing for '${page}'.` + `\nRead more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value`), "__NEXT_ERROR_CODE", {
                value: "E255",
                enumerable: false,
                configurable: true
            });
        }
        if (hasStaticProps && hasStaticPaths) {
            ;
            ({ prerenderedRoutes, fallbackMode: prerenderFallbackMode } = await (0, _pages.buildPagesStaticPaths)({
                page,
                locales,
                defaultLocale,
                configFileName,
                getStaticPaths: componentsResult.getStaticPaths
            }));
        }
        const isNextImageImported = globalThis.__NEXT_IMAGE_IMPORTED;
        let isStatic = false;
        if (!hasStaticProps && !hasGetInitialProps && !hasServerProps) {
            isStatic = true;
        }
        // When PPR is enabled, any route may be completely static, so
        // mark this route as static.
        if (isRoutePPREnabled) {
            isStatic = true;
        }
        return {
            isStatic,
            isRoutePPREnabled,
            prerenderFallbackMode,
            prerenderedRoutes,
            rootParamKeys,
            hasStaticProps,
            hasServerProps,
            isNextImageImported,
            appConfig
        };
    }).catch((err)=>{
        if (err.message === 'INVALID_DEFAULT_EXPORT') {
            throw err;
        }
        console.error(err);
        throw Object.defineProperty(new Error(`Failed to collect page data for ${page}`), "__NEXT_ERROR_CODE", {
            value: "E414",
            enumerable: false,
            configurable: true
        });
    });
}
function reduceAppConfig(segments) {
    const config = {};
    for (const segment of segments){
        const { dynamic, fetchCache, preferredRegion, revalidate, runtime, maxDuration } = segment.config || {};
        // TODO: should conflicting configs here throw an error
        // e.g. if layout defines one region but page defines another
        if (typeof preferredRegion !== 'undefined') {
            config.preferredRegion = preferredRegion;
        }
        if (typeof dynamic !== 'undefined') {
            config.dynamic = dynamic;
        }
        if (typeof fetchCache !== 'undefined') {
            config.fetchCache = fetchCache;
        }
        if (typeof revalidate !== 'undefined') {
            config.revalidate = revalidate;
        }
        // Any revalidate number overrides false, and shorter revalidate overrides
        // longer (initially).
        if (typeof revalidate === 'number' && (typeof config.revalidate !== 'number' || revalidate < config.revalidate)) {
            config.revalidate = revalidate;
        }
        if (typeof runtime !== 'undefined') {
            config.runtime = runtime;
        }
        if (typeof maxDuration !== 'undefined') {
            config.maxDuration = maxDuration;
        }
    }
    return config;
}
async function hasCustomGetInitialProps({ page, distDir, checkingApp, sriEnabled }) {
    const { ComponentMod } = await (0, _loadcomponents.loadComponents)({
        distDir,
        page: page,
        isAppPath: false,
        isDev: false,
        sriEnabled,
        needsManifestsForLegacyReasons: true
    });
    let mod = ComponentMod;
    if (checkingApp) {
        mod = await mod._app || mod.default || mod;
    } else {
        mod = mod.default || mod;
    }
    mod = await mod;
    return mod.getInitialProps !== mod.origGetInitialProps;
}
async function getDefinedNamedExports({ page, distDir, sriEnabled }) {
    const { ComponentMod } = await (0, _loadcomponents.loadComponents)({
        distDir,
        page: page,
        isAppPath: false,
        isDev: false,
        sriEnabled,
        needsManifestsForLegacyReasons: true
    });
    return Object.keys(ComponentMod).filter((key)=>{
        return typeof ComponentMod[key] !== 'undefined';
    });
}
function detectConflictingPaths(combinedPages, ssgPages, additionalGeneratedSSGPaths) {
    const conflictingPaths = new Map();
    const dynamicSsgPages = [
        ...ssgPages
    ].filter((page)=>(0, _isdynamic.isDynamicRoute)(page));
    const additionalSsgPathsByPath = {};
    additionalGeneratedSSGPaths.forEach((paths, pathsPage)=>{
        additionalSsgPathsByPath[pathsPage] ||= {};
        paths.forEach((curPath)=>{
            const currentPath = curPath.toLowerCase();
            additionalSsgPathsByPath[pathsPage][currentPath] = curPath;
        });
    });
    additionalGeneratedSSGPaths.forEach((paths, pathsPage)=>{
        paths.forEach((curPath)=>{
            const lowerPath = curPath.toLowerCase();
            let conflictingPage = combinedPages.find((page)=>page.toLowerCase() === lowerPath);
            if (conflictingPage) {
                conflictingPaths.set(lowerPath, [
                    {
                        path: curPath,
                        page: pathsPage
                    },
                    {
                        path: conflictingPage,
                        page: conflictingPage
                    }
                ]);
            } else {
                let conflictingPath;
                conflictingPage = dynamicSsgPages.find((page)=>{
                    if (page === pathsPage) return false;
                    conflictingPath = additionalGeneratedSSGPaths.get(page) == null ? undefined : additionalSsgPathsByPath[page][lowerPath];
                    return conflictingPath;
                });
                if (conflictingPage && conflictingPath) {
                    conflictingPaths.set(lowerPath, [
                        {
                            path: curPath,
                            page: pathsPage
                        },
                        {
                            path: conflictingPath,
                            page: conflictingPage
                        }
                    ]);
                }
            }
        });
    });
    if (conflictingPaths.size > 0) {
        let conflictingPathsOutput = '';
        conflictingPaths.forEach((pathItems)=>{
            pathItems.forEach((pathItem, idx)=>{
                const isDynamic = pathItem.page !== pathItem.path;
                if (idx > 0) {
                    conflictingPathsOutput += 'conflicts with ';
                }
                conflictingPathsOutput += `path: "${pathItem.path}"${isDynamic ? ` from page: "${pathItem.page}" ` : ' '}`;
            });
            conflictingPathsOutput += '\n';
        });
        _log.error('Conflicting paths returned from getStaticPaths, paths must be unique per page.\n' + 'See more info here: https://nextjs.org/docs/messages/conflicting-ssg-paths\n\n' + conflictingPathsOutput);
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(1);
    }
}
async function copyTracedFiles(dir, distDir, pageKeys, appPageKeys, tracingRoot, serverConfig, middlewareManifest, hasNodeMiddleware, hasInstrumentationHook, staticPages) {
    const outputPath = _path.default.join(distDir, 'standalone');
    // Clean up standalone directory first.
    await _fs.promises.rm(outputPath, {
        recursive: true,
        force: true
    });
    let moduleType = false;
    const nextConfig = {
        ...serverConfig,
        distDir: `./${_path.default.relative(dir, distDir)}`
    };
    try {
        const packageJsonPath = _path.default.join(distDir, '../package.json');
        const packageJsonContent = await _fs.promises.readFile(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        moduleType = packageJson.type === 'module';
        // we always copy the package.json to the standalone
        // folder to ensure any resolving logic is maintained
        const packageJsonOutputPath = _path.default.join(outputPath, _path.default.relative(tracingRoot, dir), 'package.json');
        await _fs.promises.mkdir(_path.default.dirname(packageJsonOutputPath), {
            recursive: true
        });
        await _fs.promises.writeFile(packageJsonOutputPath, packageJsonContent);
    } catch  {}
    const copiedFiles = new Set();
    async function handleTraceFiles(traceFilePath) {
        const traceData = JSON.parse(await _fs.promises.readFile(traceFilePath, 'utf8'));
        const copySema = new _asyncsema.Sema(10, {
            capacity: traceData.files.length
        });
        const traceFileDir = _path.default.dirname(traceFilePath);
        await Promise.all(traceData.files.map(async (relativeFile)=>{
            await copySema.acquire();
            const tracedFilePath = _path.default.join(traceFileDir, relativeFile);
            const fileOutputPath = _path.default.join(outputPath, _path.default.relative(tracingRoot, tracedFilePath));
            if (!copiedFiles.has(fileOutputPath)) {
                copiedFiles.add(fileOutputPath);
                await _fs.promises.mkdir(_path.default.dirname(fileOutputPath), {
                    recursive: true
                });
                const symlink = await _fs.promises.readlink(tracedFilePath).catch(()=>null);
                if (symlink) {
                    try {
                        await _fs.promises.symlink(symlink, fileOutputPath);
                    } catch (e) {
                        if (e.code !== 'EEXIST') {
                            throw e;
                        }
                    }
                } else {
                    await _fs.promises.copyFile(tracedFilePath, fileOutputPath);
                }
            }
            await copySema.release();
        }));
    }
    async function handleEdgeFunction(page) {
        var _page_wasm, _page_assets;
        async function handleFile(file) {
            const originalPath = _path.default.join(distDir, file);
            const fileOutputPath = _path.default.join(outputPath, _path.default.relative(tracingRoot, distDir), file);
            await _fs.promises.mkdir(_path.default.dirname(fileOutputPath), {
                recursive: true
            });
            await _fs.promises.copyFile(originalPath, fileOutputPath);
        }
        await Promise.all([
            page.files.map(handleFile),
            (_page_wasm = page.wasm) == null ? void 0 : _page_wasm.map((file)=>handleFile(file.filePath)),
            (_page_assets = page.assets) == null ? void 0 : _page_assets.map((file)=>handleFile(file.filePath))
        ]);
    }
    const edgeFunctionHandlers = [];
    for (const middleware of Object.values(middlewareManifest.middleware)){
        if (isMiddlewareFilename(middleware.name)) {
            edgeFunctionHandlers.push(handleEdgeFunction(middleware));
        }
    }
    for (const page of Object.values(middlewareManifest.functions)){
        edgeFunctionHandlers.push(handleEdgeFunction(page));
    }
    await Promise.all(edgeFunctionHandlers);
    for (const page of pageKeys){
        if (middlewareManifest.functions.hasOwnProperty(page)) {
            continue;
        }
        const route = (0, _normalizepagepath.normalizePagePath)(page);
        if (staticPages.has(route)) {
            continue;
        }
        const pageFile = _path.default.join(distDir, 'server', 'pages', `${(0, _normalizepagepath.normalizePagePath)(page)}.js`);
        const pageTraceFile = `${pageFile}.nft.json`;
        await handleTraceFiles(pageTraceFile).catch((err)=>{
            if (err.code !== 'ENOENT' || page !== '/404' && page !== '/500') {
                _log.warn(`Failed to copy traced files for ${pageFile}`, err);
            }
        });
    }
    if (hasNodeMiddleware) {
        const middlewareFile = _path.default.join(distDir, 'server', 'middleware.js');
        const middlewareTrace = `${middlewareFile}.nft.json`;
        await handleTraceFiles(middlewareTrace);
    }
    if (appPageKeys) {
        for (const page of appPageKeys){
            if (middlewareManifest.functions.hasOwnProperty(page)) {
                continue;
            }
            const pageFile = _path.default.join(distDir, 'server', 'app', `${page}.js`);
            const pageTraceFile = `${pageFile}.nft.json`;
            await handleTraceFiles(pageTraceFile).catch((err)=>{
                _log.warn(`Failed to copy traced files for ${pageFile}`, err);
            });
        }
    }
    if (hasInstrumentationHook) {
        await handleTraceFiles(_path.default.join(distDir, 'server', 'instrumentation.js.nft.json'));
    }
    await handleTraceFiles(_path.default.join(distDir, 'next-server.js.nft.json'));
    const serverOutputPath = _path.default.join(outputPath, _path.default.relative(tracingRoot, dir), 'server.js');
    await _fs.promises.mkdir(_path.default.dirname(serverOutputPath), {
        recursive: true
    });
    await _fs.promises.writeFile(serverOutputPath, `${moduleType ? `performance.mark('next-start');
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import module from 'node:module'
const require = module.createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
` : `const path = require('path')`}

const dir = path.join(__dirname)

process.env.NODE_ENV = 'production'
process.chdir(__dirname)

const currentPort = parseInt(process.env.PORT, 10) || 3000
const hostname = process.env.HOSTNAME || '0.0.0.0'

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)
const nextConfig = ${JSON.stringify(nextConfig)}

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)

require('next')
const { startServer } = require('next/dist/server/lib/start-server')

if (
  Number.isNaN(keepAliveTimeout) ||
  !Number.isFinite(keepAliveTimeout) ||
  keepAliveTimeout < 0
) {
  keepAliveTimeout = undefined
}

startServer({
  dir,
  isDev: false,
  config: nextConfig,
  hostname,
  port: currentPort,
  allowRetry: false,
  keepAliveTimeout,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});`);
}
function isReservedPage(page) {
    return RESERVED_PAGE.test(page);
}
function isAppBuiltinPage(page) {
    return /next[\\/]dist[\\/](esm[\\/])?client[\\/]components[\\/]builtin[\\/]/.test(page);
}
function isCustomErrorPage(page) {
    return page === '/404' || page === '/500';
}
function isMiddlewareFile(file) {
    return file === `/${_constants.MIDDLEWARE_FILENAME}` || file === `/src/${_constants.MIDDLEWARE_FILENAME}` || file === `/${_constants.PROXY_FILENAME}` || file === `/src/${_constants.PROXY_FILENAME}`;
}
function isProxyFile(file) {
    return file === `/${_constants.PROXY_FILENAME}` || file === `/src/${_constants.PROXY_FILENAME}`;
}
function isInstrumentationHookFile(file) {
    return file === `/${_constants.INSTRUMENTATION_HOOK_FILENAME}` || file === `/src/${_constants.INSTRUMENTATION_HOOK_FILENAME}`;
}
function getPossibleInstrumentationHookFilenames(folder, extensions) {
    const files = [];
    for (const extension of extensions){
        files.push(_path.default.join(folder, `${_constants.INSTRUMENTATION_HOOK_FILENAME}.${extension}`), _path.default.join(folder, `src`, `${_constants.INSTRUMENTATION_HOOK_FILENAME}.${extension}`));
    }
    return files;
}
function getPossibleMiddlewareFilenames(folder, extensions) {
    return extensions.flatMap((extension)=>[
            _path.default.join(folder, `${_constants.MIDDLEWARE_FILENAME}.${extension}`),
            _path.default.join(folder, `${_constants.PROXY_FILENAME}.${extension}`)
        ]);
}
class NestedMiddlewareError extends Error {
    constructor(nestedFileNames, mainDir, pagesOrAppDir){
        super(`Nested Middleware is not allowed, found:\n` + `${nestedFileNames.map((file)=>`pages${file}`).join('\n')}\n` + `Please move your code to a single file at ${_path.default.join(_path.default.posix.sep, _path.default.relative(mainDir, _path.default.resolve(pagesOrAppDir, '..')), 'middleware')} instead.\n` + `Read More - https://nextjs.org/docs/messages/nested-middleware`);
    }
}
function getSupportedBrowsers(dir, isDevelopment) {
    let browsers;
    try {
        const browsersListConfig = _browserslist.default.loadConfig({
            path: dir,
            env: isDevelopment ? 'development' : 'production'
        });
        // Running `browserslist` resolves `extends` and other config features into a list of browsers
        if (browsersListConfig && browsersListConfig.length > 0) {
            browsers = (0, _browserslist.default)(browsersListConfig);
        }
    } catch  {}
    // When user has browserslist use that target
    if (browsers && browsers.length > 0) {
        return browsers;
    }
    // Uses modern browsers as the default.
    return _constants1.MODERN_BROWSERSLIST_TARGET;
}
function shouldUseReactServerCondition(layer) {
    return Boolean(layer && _constants.WEBPACK_LAYERS.GROUP.serverOnly.includes(layer));
}
function isWebpackClientOnlyLayer(layer) {
    return Boolean(layer && _constants.WEBPACK_LAYERS.GROUP.clientOnly.includes(layer));
}
function isWebpackDefaultLayer(layer) {
    return layer === null || layer === undefined || layer === _constants.WEBPACK_LAYERS.pagesDirBrowser || layer === _constants.WEBPACK_LAYERS.pagesDirEdge || layer === _constants.WEBPACK_LAYERS.pagesDirNode;
}
function isWebpackBundledLayer(layer) {
    return Boolean(layer && _constants.WEBPACK_LAYERS.GROUP.bundled.includes(layer));
}
function isWebpackAppPagesLayer(layer) {
    return Boolean(layer && _constants.WEBPACK_LAYERS.GROUP.appPages.includes(layer));
}
function collectMeta({ status, headers }) {
    const meta = {};
    if (status !== 200) {
        meta.status = status;
    }
    if (headers && Object.keys(headers).length) {
        meta.headers = {};
        // normalize header values as initialHeaders
        // must be Record<string, string>
        for(const key in headers){
            // set-cookie is already handled - the middleware cookie setting case
            // isn't needed for the prerender manifest since it can't read cookies
            if (key === 'x-middleware-set-cookie') continue;
            let value = headers[key];
            if (Array.isArray(value)) {
                if (key === 'set-cookie') {
                    value = value.join(',');
                } else {
                    value = value[value.length - 1];
                }
            }
            if (typeof value === 'string') {
                meta.headers[key] = value;
            }
        }
    }
    return meta;
}
const RSPACK_DEFAULT_LAYERS_REGEX = new RegExp(`^(|${[
    _constants.WEBPACK_LAYERS.pagesDirBrowser,
    _constants.WEBPACK_LAYERS.pagesDirEdge,
    _constants.WEBPACK_LAYERS.pagesDirNode
].join('|')})$`); //# sourceMappingURL=utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/swc/options.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getJestSWCOptions: null,
    getLoaderSWCOptions: null,
    getParserOptions: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getJestSWCOptions: function() {
        return getJestSWCOptions;
    },
    getLoaderSWCOptions: function() {
        return getLoaderSWCOptions;
    },
    getParserOptions: function() {
        return getParserOptions;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _escaperegexp = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/escape-regexp.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const nextDirname = _path.default.dirname("[project]/JobPortal/frontend/node_modules/next/package.json (json)");
const nextDistPath = new RegExp(`${(0, _escaperegexp.escapeStringRegexp)(nextDirname)}[\\/]dist[\\/](shared[\\/]lib|client|pages)`);
const nodeModulesPath = /[\\/]node_modules[\\/]/;
const regeneratorRuntimePath = "[project]/JobPortal/frontend/node_modules/next/dist/compiled/regenerator-runtime/runtime.js [app-client] (ecmascript)";
function isTypeScriptFile(filename) {
    return filename.endsWith('.ts') || filename.endsWith('.tsx');
}
function isCommonJSFile(filename) {
    return filename.endsWith('.cjs');
}
// Ensure Next.js internals and .cjs files are output as CJS modules,
// By default all modules are output as ESM or will treated as CJS if next-swc/auto-cjs plugin detects file is CJS.
function shouldOutputCommonJs(filename) {
    return isCommonJSFile(filename) || nextDistPath.test(filename);
}
function getParserOptions({ filename, jsConfig, ...rest }) {
    var _jsConfig_compilerOptions;
    const isTSFile = filename.endsWith('.ts');
    const hasTsSyntax = isTypeScriptFile(filename);
    const enableDecorators = Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.experimentalDecorators);
    return {
        ...rest,
        syntax: hasTsSyntax ? 'typescript' : 'ecmascript',
        dynamicImport: true,
        decorators: enableDecorators,
        // Exclude regular TypeScript files from React transformation to prevent e.g. generic parameters and angle-bracket type assertion from being interpreted as JSX tags.
        [hasTsSyntax ? 'tsx' : 'jsx']: !isTSFile,
        importAssertions: true
    };
}
function getBaseSWCOptions({ filename, jest, development, hasReactRefresh, globalWindow, esm, modularizeImports, swcPlugins, compilerOptions, resolvedBaseUrl, jsConfig, supportedBrowsers, swcCacheDir, serverComponents, serverReferenceHashSalt, bundleLayer, isCacheComponents, cacheHandlers, useCacheEnabled, trackDynamicImports }) {
    var _jsConfig_compilerOptions, _jsConfig_compilerOptions1, _jsConfig_compilerOptions2, _jsConfig_compilerOptions3, _jsConfig_compilerOptions4, _jsConfig_experimental;
    const isReactServerLayer = (0, _utils.shouldUseReactServerCondition)(bundleLayer);
    const isAppRouterPagesLayer = (0, _utils.isWebpackAppPagesLayer)(bundleLayer);
    const parserConfig = getParserOptions({
        filename,
        jsConfig
    });
    const paths = jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.paths;
    const enableDecorators = Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions1 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions1.experimentalDecorators);
    const emitDecoratorMetadata = Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions2 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions2.emitDecoratorMetadata);
    const useDefineForClassFields = Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions3 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions3.useDefineForClassFields);
    const plugins = (swcPlugins ?? []).filter(Array.isArray).map(([name, options])=>[
            (()=>{
                const e = new Error("Cannot find module as expression is too dynamic");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })(),
            options
        ]);
    return {
        jsc: {
            ...resolvedBaseUrl && paths ? {
                baseUrl: resolvedBaseUrl.baseUrl,
                paths
            } : {},
            externalHelpers: !__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.pnp && !jest,
            parser: parserConfig,
            experimental: {
                keepImportAttributes: true,
                emitAssertForImportAttributes: true,
                plugins,
                cacheRoot: swcCacheDir
            },
            transform: {
                // Enables https://github.com/swc-project/swc/blob/0359deb4841be743d73db4536d4a22ac797d7f65/crates/swc_ecma_ext_transforms/src/jest.rs
                ...jest ? {
                    hidden: {
                        jest: true
                    }
                } : {},
                legacyDecorator: enableDecorators,
                decoratorMetadata: emitDecoratorMetadata,
                useDefineForClassFields: useDefineForClassFields,
                react: {
                    importSource: (jsConfig == null ? void 0 : (_jsConfig_compilerOptions4 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions4.jsxImportSource) ?? ((compilerOptions == null ? void 0 : compilerOptions.emotion) && !isReactServerLayer ? '@emotion/react' : 'react'),
                    runtime: 'automatic',
                    pragmaFrag: 'React.Fragment',
                    throwIfNamespace: true,
                    development: !!development,
                    useBuiltins: true,
                    refresh: !!hasReactRefresh
                },
                optimizer: {
                    simplify: false,
                    globals: jest ? null : {
                        typeofs: {
                            window: globalWindow ? 'object' : 'undefined'
                        },
                        envs: {
                            NODE_ENV: development ? '"development"' : '"production"'
                        }
                    }
                },
                regenerator: {
                    importPath: regeneratorRuntimePath
                }
            }
        },
        sourceMaps: jest ? 'inline' : undefined,
        removeConsole: compilerOptions == null ? void 0 : compilerOptions.removeConsole,
        // disable "reactRemoveProperties" when "jest" is true
        // otherwise the setting from next.config.js will be used
        reactRemoveProperties: jest ? false : compilerOptions == null ? void 0 : compilerOptions.reactRemoveProperties,
        // Map the k-v map to an array of pairs.
        modularizeImports: modularizeImports ? Object.fromEntries(Object.entries(modularizeImports).map(([mod, config])=>[
                mod,
                {
                    ...config,
                    transform: typeof config.transform === 'string' ? config.transform : Object.entries(config.transform).map(([key, value])=>[
                            key,
                            value
                        ])
                }
            ])) : undefined,
        relay: compilerOptions == null ? void 0 : compilerOptions.relay,
        // Always transform styled-jsx and error when `client-only` condition is triggered
        styledJsx: (compilerOptions == null ? void 0 : compilerOptions.styledJsx) ?? {
            useLightningcss: (jsConfig == null ? void 0 : (_jsConfig_experimental = jsConfig.experimental) == null ? void 0 : _jsConfig_experimental.useLightningcss) ?? false
        },
        // Disable css-in-js libs (without client-only integration) transform on server layer for server components
        ...!isReactServerLayer && {
            emotion: getEmotionOptions(compilerOptions == null ? void 0 : compilerOptions.emotion, development),
            styledComponents: getStyledComponentsOptions(compilerOptions == null ? void 0 : compilerOptions.styledComponents, development)
        },
        serverComponents: serverComponents && !jest ? {
            isReactServerLayer,
            cacheComponentsEnabled: isCacheComponents,
            useCacheEnabled
        } : undefined,
        serverActions: isAppRouterPagesLayer && !jest ? {
            isReactServerLayer,
            isDevelopment: development,
            useCacheEnabled,
            hashSalt: serverReferenceHashSalt,
            cacheKinds: [
                'default',
                'remote',
                'private'
            ].concat(cacheHandlers ? Object.keys(cacheHandlers) : [])
        } : undefined,
        // For app router we prefer to bundle ESM,
        // On server side of pages router we prefer CJS.
        preferEsm: esm,
        lintCodemodComments: true,
        trackDynamicImports: trackDynamicImports,
        debugFunctionName: development,
        ...supportedBrowsers && supportedBrowsers.length > 0 ? {
            cssEnv: {
                targets: supportedBrowsers
            }
        } : {}
    };
}
function getStyledComponentsOptions(styledComponentsConfig, development) {
    if (!styledComponentsConfig) {
        return null;
    } else if (typeof styledComponentsConfig === 'object') {
        return {
            ...styledComponentsConfig,
            displayName: styledComponentsConfig.displayName ?? Boolean(development)
        };
    } else {
        return {
            displayName: Boolean(development)
        };
    }
}
function getEmotionOptions(emotionConfig, development) {
    if (!emotionConfig) {
        return null;
    }
    let autoLabel = !!development;
    if (typeof emotionConfig === 'object' && emotionConfig.autoLabel) {
        switch(emotionConfig.autoLabel){
            case 'never':
                autoLabel = false;
                break;
            case 'always':
                autoLabel = true;
                break;
            case 'dev-only':
                break;
            default:
                emotionConfig.autoLabel;
        }
    }
    return {
        enabled: true,
        autoLabel,
        sourcemap: development,
        ...typeof emotionConfig === 'object' && {
            importMap: emotionConfig.importMap,
            labelFormat: emotionConfig.labelFormat,
            sourcemap: development && emotionConfig.sourceMap
        }
    };
}
function getJestSWCOptions({ isServer, filename, esm, modularizeImports, swcPlugins, compilerOptions, jsConfig, resolvedBaseUrl, pagesDir, serverReferenceHashSalt }) {
    let baseOptions = getBaseSWCOptions({
        filename,
        jest: true,
        development: false,
        hasReactRefresh: false,
        globalWindow: !isServer,
        modularizeImports,
        swcPlugins,
        compilerOptions,
        jsConfig,
        resolvedBaseUrl,
        supportedBrowsers: undefined,
        esm,
        // Don't apply server layer transformations for Jest
        // Disable server / client graph assertions for Jest
        bundleLayer: undefined,
        serverComponents: false,
        serverReferenceHashSalt
    });
    const useCjsModules = shouldOutputCommonJs(filename);
    return {
        ...baseOptions,
        env: {
            targets: {
                // Targets the current version of Node.js
                node: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.node
            }
        },
        module: {
            type: esm && !useCjsModules ? 'es6' : 'commonjs'
        },
        disableNextSsg: true,
        pagesDir
    };
}
function getLoaderSWCOptions({ // resolvedBaseUrl,
filename, development, isServer, pagesDir, appDir, isPageFile, isCacheComponents, hasReactRefresh, modularizeImports, optimizeServerReact, optimizePackageImports, swcPlugins, compilerOptions, jsConfig, supportedBrowsers, swcCacheDir, relativeFilePathFromRoot, serverComponents, serverReferenceHashSalt, bundleLayer, esm, cacheHandlers, useCacheEnabled, trackDynamicImports }) {
    let baseOptions = getBaseSWCOptions({
        filename,
        development,
        globalWindow: !isServer,
        hasReactRefresh,
        modularizeImports,
        swcPlugins,
        compilerOptions,
        jsConfig,
        // resolvedBaseUrl,
        supportedBrowsers,
        swcCacheDir,
        bundleLayer,
        serverComponents,
        serverReferenceHashSalt,
        esm: !!esm,
        isCacheComponents,
        cacheHandlers,
        useCacheEnabled,
        trackDynamicImports
    });
    baseOptions.fontLoaders = {
        fontLoaders: [
            'next/font/local',
            'next/font/google'
        ],
        relativeFilePathFromRoot
    };
    baseOptions.cjsRequireOptimizer = {
        packages: {
            'next/server': {
                transforms: {
                    NextRequest: 'next/dist/server/web/spec-extension/request',
                    NextResponse: 'next/dist/server/web/spec-extension/response',
                    ImageResponse: 'next/dist/server/web/spec-extension/image-response',
                    userAgentFromString: 'next/dist/server/web/spec-extension/user-agent',
                    userAgent: 'next/dist/server/web/spec-extension/user-agent'
                }
            }
        }
    };
    if (optimizeServerReact && isServer && !development) {
        baseOptions.optimizeServerReact = {
            optimize_use_state: false
        };
    }
    // Modularize import optimization for barrel files
    if (optimizePackageImports) {
        baseOptions.autoModularizeImports = {
            packages: optimizePackageImports
        };
    }
    const isNodeModules = nodeModulesPath.test(filename);
    const isAppBrowserLayer = bundleLayer === _constants.WEBPACK_LAYERS.appPagesBrowser;
    const moduleResolutionConfig = shouldOutputCommonJs(filename) ? {
        module: {
            type: 'commonjs'
        }
    } : {};
    let options;
    if (isServer) {
        options = {
            ...baseOptions,
            ...moduleResolutionConfig,
            // Disables getStaticProps/getServerSideProps tree shaking on the server compilation for pages
            disableNextSsg: true,
            isDevelopment: development,
            isServerCompiler: isServer,
            pagesDir,
            appDir,
            preferEsm: !!esm,
            isPageFile,
            env: {
                targets: {
                    // Targets the current version of Node.js
                    node: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.node
                }
            }
        };
    } else {
        options = {
            ...baseOptions,
            ...moduleResolutionConfig,
            disableNextSsg: !isPageFile,
            isDevelopment: development,
            isServerCompiler: isServer,
            pagesDir,
            appDir,
            isPageFile,
            ...supportedBrowsers && supportedBrowsers.length > 0 ? {
                env: {
                    targets: supportedBrowsers
                }
            } : {}
        };
        if (!options.env) {
            // Matches default @babel/preset-env behavior
            options.jsc.target = 'es5';
        }
    }
    // For node_modules in app browser layer, we don't need to do any server side transformation.
    // Only keep server actions transform to discover server actions from client components.
    if (isAppBrowserLayer && isNodeModules) {
        var _options_jsc_transform_optimizer_globals;
        options.disableNextSsg = true;
        options.isPageFile = false;
        options.optimizeServerReact = undefined;
        options.cjsRequireOptimizer = undefined;
        // Disable optimizer for node_modules in app browser layer, to avoid unnecessary replacement.
        // e.g. typeof window could result differently in js worker or browser.
        if (((_options_jsc_transform_optimizer_globals = options.jsc.transform.optimizer.globals) == null ? void 0 : _options_jsc_transform_optimizer_globals.typeofs) && !filename.includes(nextDirname)) {
            delete options.jsc.transform.optimizer.globals.typeofs.window;
        }
    }
    return options;
} //# sourceMappingURL=options.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createDefineEnv: null,
    getBinaryMetadata: null,
    getBindingsSync: null,
    getModuleNamedExports: null,
    getSupportedArchTriples: null,
    initCustomTraceSubscriber: null,
    isReactCompilerRequired: null,
    loadBindings: null,
    lockfilePatchPromise: null,
    minify: null,
    parse: null,
    teardownTraceSubscriber: null,
    transform: null,
    transformSync: null,
    warnForEdgeRuntime: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createDefineEnv: function() {
        return createDefineEnv;
    },
    getBinaryMetadata: function() {
        return getBinaryMetadata;
    },
    getBindingsSync: function() {
        return getBindingsSync;
    },
    getModuleNamedExports: function() {
        return getModuleNamedExports;
    },
    getSupportedArchTriples: function() {
        return getSupportedArchTriples;
    },
    initCustomTraceSubscriber: function() {
        return initCustomTraceSubscriber;
    },
    isReactCompilerRequired: function() {
        return isReactCompilerRequired;
    },
    loadBindings: function() {
        return loadBindings;
    },
    lockfilePatchPromise: function() {
        return lockfilePatchPromise;
    },
    minify: function() {
        return minify;
    },
    parse: function() {
        return parse;
    },
    teardownTraceSubscriber: function() {
        return teardownTraceSubscriber;
    },
    transform: function() {
        return transform;
    },
    transformSync: function() {
        return transformSync;
    },
    warnForEdgeRuntime: function() {
        return warnForEdgeRuntime;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _url = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/native-url/index.js [app-client] (ecmascript)");
const _os = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/os-browserify/browser.js [app-client] (ecmascript)");
const _triples = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/@napi-rs/triples/index.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _options = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/options.js [app-client] (ecmascript)");
const _swcloadfailure = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/swc-load-failure.js [app-client] (ecmascript)");
const _patchincorrectlockfile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/patch-incorrect-lockfile.js [app-client] (ecmascript)");
const _downloadswc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/download-swc.js [app-client] (ecmascript)");
const _util = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/util/util.js [app-client] (ecmascript)");
const _defineenv = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/define-env.js [app-client] (ecmascript)");
const _internalerror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/internal-error.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const nextVersion = "16.0.7";
const ArchName = (0, _os.arch)();
const PlatformName = (0, _os.platform)();
function infoLog(...args) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PRIVATE_BUILD_WORKER) {
        return;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DEBUG) {
        _log.info(...args);
    }
}
function getSupportedArchTriples() {
    const { darwin, win32, linux, freebsd, android } = _triples.platformArchTriples;
    return {
        darwin,
        win32: {
            arm64: win32.arm64,
            ia32: win32.ia32.filter((triple)=>triple.abi === 'msvc'),
            x64: win32.x64.filter((triple)=>triple.abi === 'msvc')
        },
        linux: {
            // linux[x64] includes `gnux32` abi, with x64 arch.
            x64: linux.x64.filter((triple)=>triple.abi !== 'gnux32'),
            arm64: linux.arm64,
            // This target is being deprecated, however we keep it in `knownDefaultWasmFallbackTriples` for now
            arm: linux.arm
        },
        // Below targets are being deprecated, however we keep it in `knownDefaultWasmFallbackTriples` for now
        freebsd: {
            x64: freebsd.x64
        },
        android: {
            arm64: android.arm64,
            arm: android.arm
        }
    };
}
const triples = (()=>{
    var _supportedArchTriples_PlatformName, _platformArchTriples_PlatformName;
    const supportedArchTriples = getSupportedArchTriples();
    const targetTriple = (_supportedArchTriples_PlatformName = supportedArchTriples[PlatformName]) == null ? void 0 : _supportedArchTriples_PlatformName[ArchName];
    // If we have supported triple, return it right away
    if (targetTriple) {
        return targetTriple;
    }
    // If there isn't corresponding target triple in `supportedArchTriples`, check if it's excluded from original raw triples
    // Otherwise, it is completely unsupported platforms.
    let rawTargetTriple = (_platformArchTriples_PlatformName = _triples.platformArchTriples[PlatformName]) == null ? void 0 : _platformArchTriples_PlatformName[ArchName];
    if (rawTargetTriple) {
        _log.warn(`Trying to load next-swc for target triple ${rawTargetTriple}, but there next-swc does not have native bindings support`);
    } else {
        _log.warn(`Trying to load next-swc for unsupported platforms ${PlatformName}/${ArchName}`);
    }
    return [];
})();
// Allow to specify an absolute path to the custom turbopack binary to load.
// If one of env variables is set, `loadNative` will try to use specified
// binary instead. This is thin, naive interface
// - `loadBindings` will not validate neither path nor the binary.
//
// Note these are internal flag: there's no stability, feature guarantee.
const __INTERNAL_CUSTOM_TURBOPACK_BINDINGS = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__INTERNAL_CUSTOM_TURBOPACK_BINDINGS;
function checkVersionMismatch(pkgData) {
    const version = pkgData.version;
    if (version && version !== nextVersion) {
        _log.warn(`Mismatching @next/swc version, detected: ${version} while Next.js is on ${nextVersion}. Please ensure these match`);
    }
}
// These are the platforms we'll try to load wasm bindings first,
// only try to load native bindings if loading wasm binding somehow fails.
// Fallback to native binding is for migration period only,
// once we can verify loading-wasm-first won't cause visible regressions,
// we'll not include native bindings for these platform at all.
const knownDefaultWasmFallbackTriples = [
    'x86_64-unknown-freebsd',
    'aarch64-linux-android',
    'arm-linux-androideabi',
    'armv7-unknown-linux-gnueabihf',
    'i686-pc-windows-msvc'
];
// The last attempt's error code returned when cjs require to native bindings fails.
// If node.js throws an error without error code, this should be `unknown` instead of undefined.
// For the wasm-first targets (`knownDefaultWasmFallbackTriples`) this will be `unsupported_target`.
let lastNativeBindingsLoadErrorCode = undefined;
// Used to cache racing calls to `loadBindings`
let pendingBindings;
// The cached loaded bindings
let loadedBindings = undefined;
let downloadWasmPromise;
let swcTraceFlushGuard;
let downloadNativeBindingsPromise = undefined;
const lockfilePatchPromise = {};
function getBindingsSync() {
    if (!loadedBindings) {
        if (pendingBindings) {
            throw Object.defineProperty(new Error('Bindings not loaded yet, but they are being loaded, did you forget to await?'), "__NEXT_ERROR_CODE", {
                value: "E906",
                enumerable: false,
                configurable: true
            });
        }
        throw Object.defineProperty(new Error('bindings not loaded yet.  Either call `loadBindings` to wait for them to be available or ensure that `installBindings` has already been called.'), "__NEXT_ERROR_CODE", {
            value: "E907",
            enumerable: false,
            configurable: true
        });
    }
    return loadedBindings;
}
async function loadBindings(useWasmBinary = false) {
    if (loadedBindings) {
        return loadedBindings;
    }
    if (pendingBindings) {
        return pendingBindings;
    }
    // Increase Rust stack size as some npm packages being compiled need more than the default.
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.RUST_MIN_STACK) {
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.RUST_MIN_STACK = '8388608';
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_TEST_WASM) {
        useWasmBinary = true;
    }
    // rust needs stdout to be blocking, otherwise it will throw an error (on macOS at least) when writing a lot of data (logs) to it
    // see https://github.com/napi-rs/napi-rs/issues/1630
    // and https://github.com/nodejs/node/blob/main/doc/api/process.md#a-note-on-process-io
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout._handle != null) {
        // @ts-ignore
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout._handle.setBlocking == null ? void 0 : __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout._handle.setBlocking.call(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout._handle, true);
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stderr._handle != null) {
        // @ts-ignore
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stderr._handle.setBlocking == null ? void 0 : __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stderr._handle.setBlocking.call(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stderr._handle, true);
    }
    pendingBindings = new Promise(async (resolve, reject)=>{
        if (!lockfilePatchPromise.cur) {
            // always run lockfile check once so that it gets patched
            // even if it doesn't fail to load locally
            lockfilePatchPromise.cur = (0, _patchincorrectlockfile.patchIncorrectLockfile)(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd()).catch(console.error);
        }
        let attempts = [];
        const disableWasmFallback = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_DISABLE_SWC_WASM;
        const unsupportedPlatform = triples.some((triple)=>!!(triple == null ? void 0 : triple.raw) && knownDefaultWasmFallbackTriples.includes(triple.raw));
        const isWebContainer = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.webcontainer;
        // Normal execution relies on the param `useWasmBinary` flag to load, but
        // in certain cases where there isn't a native binary we always load wasm fallback first.
        const shouldLoadWasmFallbackFirst = !disableWasmFallback && useWasmBinary || unsupportedPlatform || isWebContainer;
        if (!unsupportedPlatform && useWasmBinary) {
            _log.warn(`experimental.useWasmBinary is not an option for supported platform ${PlatformName}/${ArchName} and will be ignored.`);
        }
        if (shouldLoadWasmFallbackFirst) {
            lastNativeBindingsLoadErrorCode = 'unsupported_target';
            const fallbackBindings = await tryLoadWasmWithFallback(attempts);
            if (fallbackBindings) {
                return resolve(fallbackBindings);
            }
        }
        // Trickle down loading `fallback` bindings:
        //
        // - First, try to load native bindings installed in node_modules.
        // - If that fails with `ERR_MODULE_NOT_FOUND`, treat it as case of https://github.com/npm/cli/issues/4828
        // that host system where generated package lock is not matching to the guest system running on, try to manually
        // download corresponding target triple and load it. This won't be triggered if native bindings are failed to load
        // with other reasons than `ERR_MODULE_NOT_FOUND`.
        // - Lastly, falls back to wasm binding where possible.
        try {
            return resolve(loadNative());
        } catch (a) {
            if (Array.isArray(a) && a.every((m)=>m.includes('it was not installed'))) {
                let fallbackBindings = await tryLoadNativeWithFallback(attempts);
                if (fallbackBindings) {
                    return resolve(fallbackBindings);
                }
            }
            attempts = attempts.concat(a);
        }
        // For these platforms we already tried to load wasm and failed, skip reattempt
        if (!shouldLoadWasmFallbackFirst && !disableWasmFallback) {
            const fallbackBindings = await tryLoadWasmWithFallback(attempts);
            if (fallbackBindings) {
                return resolve(fallbackBindings);
            }
        }
        await logLoadFailure(attempts, true);
        // Reject the promise to propagate the error (process.exit was removed to allow telemetry flush)
        reject(Object.defineProperty(new Error(`Failed to load SWC binary for ${PlatformName}/${ArchName}, see more info here: https://nextjs.org/docs/messages/failed-loading-swc`), "__NEXT_ERROR_CODE", {
            value: "E909",
            enumerable: false,
            configurable: true
        }));
    });
    loadedBindings = await pendingBindings;
    pendingBindings = undefined;
    return loadedBindings;
}
async function tryLoadNativeWithFallback(attempts) {
    const nativeBindingsDirectory = _path.default.join(_path.default.dirname("[project]/JobPortal/frontend/node_modules/next/package.json (json)"), 'next-swc-fallback');
    if (!downloadNativeBindingsPromise) {
        downloadNativeBindingsPromise = (0, _downloadswc.downloadNativeNextSwc)(nextVersion, nativeBindingsDirectory, triples.map((triple)=>triple.platformArchABI));
    }
    await downloadNativeBindingsPromise;
    try {
        return loadNative(nativeBindingsDirectory);
    } catch (a) {
        attempts.push(...[].concat(a));
    }
    return undefined;
}
// helper for loadBindings
async function tryLoadWasmWithFallback(attempts) {
    try {
        let bindings = await loadWasm('');
        // @ts-expect-error TODO: this event has a wrong type.
        (0, _swcloadfailure.eventSwcLoadFailure)({
            wasm: 'enabled',
            nativeBindingsErrorCode: lastNativeBindingsLoadErrorCode
        });
        return bindings;
    } catch (a) {
        attempts.push(...[].concat(a));
    }
    try {
        // if not installed already download wasm package on-demand
        // we download to a custom directory instead of to node_modules
        // as node_module import attempts are cached and can't be re-attempted
        // x-ref: https://github.com/nodejs/modules/issues/307
        const wasmDirectory = _path.default.join(_path.default.dirname("[project]/JobPortal/frontend/node_modules/next/package.json (json)"), 'wasm');
        if (!downloadWasmPromise) {
            downloadWasmPromise = (0, _downloadswc.downloadWasmSwc)(nextVersion, wasmDirectory);
        }
        await downloadWasmPromise;
        let bindings = await loadWasm(wasmDirectory);
        // @ts-expect-error TODO: this event has a wrong type.
        (0, _swcloadfailure.eventSwcLoadFailure)({
            wasm: 'fallback',
            nativeBindingsErrorCode: lastNativeBindingsLoadErrorCode
        });
        // still log native load attempts so user is
        // aware it failed and should be fixed
        for (const attempt of attempts){
            _log.warn(attempt);
        }
        return bindings;
    } catch (a) {
        attempts.push(...[].concat(a));
    }
}
function loadBindingsSync() {
    let attempts = [];
    try {
        return loadNative();
    } catch (a) {
        attempts = attempts.concat(a);
    }
    // Fire-and-forget telemetry logging (loadBindingsSync must remain synchronous)
    // Worker error handler will await telemetry.flush() before exit
    logLoadFailure(attempts);
    throw Object.defineProperty(new Error('Failed to load bindings', {
        cause: attempts
    }), "__NEXT_ERROR_CODE", {
        value: "E424",
        enumerable: false,
        configurable: true
    });
}
let loggingLoadFailure = false;
/**
 * Logs SWC load failure telemetry and error messages.
 *
 * Note: Does NOT call process.exit() - errors must propagate to caller's error handler
 * which will await telemetry.flush() before exit (critical for worker threads with async telemetry).
 */ async function logLoadFailure(attempts, triedWasm = false) {
    // make sure we only emit the event and log the failure once
    if (loggingLoadFailure) return;
    loggingLoadFailure = true;
    for (let attempt of attempts){
        _log.warn(attempt);
    }
    // @ts-expect-error TODO: this event has a wrong type.
    await (0, _swcloadfailure.eventSwcLoadFailure)({
        wasm: triedWasm ? 'failed' : undefined,
        nativeBindingsErrorCode: lastNativeBindingsLoadErrorCode
    });
    await (lockfilePatchPromise.cur || Promise.resolve());
    _log.error(`Failed to load SWC binary for ${PlatformName}/${ArchName}, see more info here: https://nextjs.org/docs/messages/failed-loading-swc`);
}
function createDefineEnv({ isTurbopack, clientRouterFilters, config, dev, distDir, projectPath, fetchCacheKeyPrefix, hasRewrites, middlewareMatchers, rewrites }) {
    let defineEnv = {
        client: [],
        edge: [],
        nodejs: []
    };
    for (const variant of Object.keys(defineEnv)){
        defineEnv[variant] = rustifyOptionEnv((0, _defineenv.getDefineEnv)({
            isTurbopack,
            clientRouterFilters,
            config,
            dev,
            distDir,
            projectPath,
            fetchCacheKeyPrefix,
            hasRewrites,
            isClient: variant === 'client',
            isEdgeServer: variant === 'edge',
            isNodeServer: variant === 'nodejs',
            middlewareMatchers,
            rewrites
        }));
    }
    return defineEnv;
}
function rustifyEnv(env) {
    return Object.entries(env).filter(([_, value])=>value != null).map(([name, value])=>({
            name,
            value
        }));
}
function rustifyOptionEnv(env) {
    return Object.entries(env).map(([name, value])=>({
            name,
            value
        }));
}
// TODO(sokra) Support wasm option.
function bindingToApi(binding, _wasm) {
    const cancel = new class Cancel extends Error {
    }();
    /**
   * Utility function to ensure all variants of an enum are handled.
   */ function invariant(never, computeMessage) {
        throw Object.defineProperty(new Error(`Invariant: ${computeMessage(never)}`), "__NEXT_ERROR_CODE", {
            value: "E193",
            enumerable: false,
            configurable: true
        });
    }
    /**
   * Calls a native function and streams the result.
   * If useBuffer is true, all values will be preserved, potentially buffered
   * if consumed slower than produced. Else, only the latest value will be
   * preserved.
   */ function subscribe(useBuffer, nativeFunction) {
        // A buffer of produced items. This will only contain values if the
        // consumer is slower than the producer.
        let buffer = [];
        // A deferred value waiting for the next produced item. This will only
        // exist if the consumer is faster than the producer.
        let waiting;
        let canceled = false;
        // The native function will call this every time it emits a new result. We
        // either need to notify a waiting consumer, or buffer the new result until
        // the consumer catches up.
        function emitResult(err, value) {
            if (waiting) {
                let { resolve, reject } = waiting;
                waiting = undefined;
                if (err) reject(err);
                else resolve(value);
            } else {
                const item = {
                    err,
                    value
                };
                if (useBuffer) buffer.push(item);
                else buffer[0] = item;
            }
        }
        async function* createIterator() {
            const task = await nativeFunction(emitResult);
            try {
                while(!canceled){
                    if (buffer.length > 0) {
                        const item = buffer.shift();
                        if (item.err) throw item.err;
                        yield item.value;
                    } else {
                        // eslint-disable-next-line no-loop-func
                        yield new Promise((resolve, reject)=>{
                            waiting = {
                                resolve,
                                reject
                            };
                        });
                    }
                }
            } catch (e) {
                if (e === cancel) return;
                throw e;
            } finally{
                if (task) {
                    binding.rootTaskDispose(task);
                }
            }
        }
        const iterator = createIterator();
        iterator.return = async ()=>{
            canceled = true;
            if (waiting) waiting.reject(cancel);
            return {
                value: undefined,
                done: true
            };
        };
        return iterator;
    }
    async function rustifyProjectOptions(options) {
        return {
            ...options,
            nextConfig: await serializeNextConfig(options.nextConfig, _path.default.join(options.rootPath, options.projectPath)),
            env: rustifyEnv(options.env)
        };
    }
    async function rustifyPartialProjectOptions(options) {
        return {
            ...options,
            nextConfig: options.nextConfig && await serializeNextConfig(options.nextConfig, _path.default.join(options.rootPath, options.projectPath)),
            env: options.env && rustifyEnv(options.env)
        };
    }
    class ProjectImpl {
        constructor(nativeProject){
            this._nativeProject = nativeProject;
        }
        async update(options) {
            await binding.projectUpdate(this._nativeProject, await rustifyPartialProjectOptions(options));
        }
        async writeAnalyzeData(appDirOnly) {
            const napiResult = await binding.projectWriteAnalyzeData(this._nativeProject, appDirOnly);
            return napiResult;
        }
        async writeAllEntrypointsToDisk(appDirOnly) {
            const napiEndpoints = await binding.projectWriteAllEntrypointsToDisk(this._nativeProject, appDirOnly);
            if ('routes' in napiEndpoints) {
                return napiEntrypointsToRawEntrypoints(napiEndpoints);
            } else {
                return {
                    issues: napiEndpoints.issues,
                    diagnostics: napiEndpoints.diagnostics
                };
            }
        }
        entrypointsSubscribe() {
            const subscription = subscribe(false, async (callback)=>binding.projectEntrypointsSubscribe(this._nativeProject, callback));
            return async function*() {
                for await (const entrypoints of subscription){
                    if ('routes' in entrypoints) {
                        yield napiEntrypointsToRawEntrypoints(entrypoints);
                    } else {
                        yield {
                            issues: entrypoints.issues,
                            diagnostics: entrypoints.diagnostics
                        };
                    }
                }
            }();
        }
        hmrEvents(identifier) {
            return subscribe(true, async (callback)=>binding.projectHmrEvents(this._nativeProject, identifier, callback));
        }
        hmrIdentifiersSubscribe() {
            return subscribe(false, async (callback)=>binding.projectHmrIdentifiersSubscribe(this._nativeProject, callback));
        }
        traceSource(stackFrame, currentDirectoryFileUrl) {
            return binding.projectTraceSource(this._nativeProject, stackFrame, currentDirectoryFileUrl);
        }
        getSourceForAsset(filePath) {
            return binding.projectGetSourceForAsset(this._nativeProject, filePath);
        }
        getSourceMap(filePath) {
            return binding.projectGetSourceMap(this._nativeProject, filePath);
        }
        getSourceMapSync(filePath) {
            return binding.projectGetSourceMapSync(this._nativeProject, filePath);
        }
        updateInfoSubscribe(aggregationMs) {
            return subscribe(true, async (callback)=>binding.projectUpdateInfoSubscribe(this._nativeProject, aggregationMs, callback));
        }
        compilationEventsSubscribe(eventTypes) {
            return subscribe(true, async (callback)=>{
                binding.projectCompilationEventsSubscribe(this._nativeProject, callback, eventTypes);
            });
        }
        invalidateFileSystemCache() {
            return binding.projectInvalidateFileSystemCache(this._nativeProject);
        }
        shutdown() {
            return binding.projectShutdown(this._nativeProject);
        }
        onExit() {
            return binding.projectOnExit(this._nativeProject);
        }
    }
    class EndpointImpl {
        constructor(nativeEndpoint){
            this._nativeEndpoint = nativeEndpoint;
        }
        async writeToDisk() {
            return await binding.endpointWriteToDisk(this._nativeEndpoint);
        }
        async clientChanged() {
            const clientSubscription = subscribe(false, async (callback)=>binding.endpointClientChangedSubscribe(this._nativeEndpoint, callback));
            await clientSubscription.next();
            return clientSubscription;
        }
        async serverChanged(includeIssues) {
            const serverSubscription = subscribe(false, async (callback)=>binding.endpointServerChangedSubscribe(this._nativeEndpoint, includeIssues, callback));
            await serverSubscription.next();
            return serverSubscription;
        }
    }
    async function serializeNextConfig(nextConfig, projectPath) {
        // Avoid mutating the existing `nextConfig` object. NOTE: This is only a shallow clone.
        let nextConfigSerializable = {
            ...nextConfig
        };
        nextConfigSerializable.generateBuildId = await (nextConfigSerializable.generateBuildId == null ? void 0 : nextConfigSerializable.generateBuildId.call(nextConfigSerializable));
        // TODO: these functions takes arguments, have to be supported in a different way
        nextConfigSerializable.exportPathMap = {};
        nextConfigSerializable.webpack = nextConfigSerializable.webpack && {};
        if (nextConfigSerializable.modularizeImports) {
            nextConfigSerializable.modularizeImports = Object.fromEntries(Object.entries(nextConfigSerializable.modularizeImports).map(([mod, config])=>[
                    mod,
                    {
                        ...config,
                        transform: typeof config.transform === 'string' ? config.transform : Object.entries(config.transform)
                    }
                ]));
        }
        // loaderFile is an absolute path, we need it to be relative for turbopack.
        if (nextConfigSerializable.images.loaderFile) {
            nextConfigSerializable.images = {
                ...nextConfigSerializable.images,
                loaderFile: './' + _path.default.relative(projectPath, nextConfigSerializable.images.loaderFile)
            };
        }
        // cacheHandler can be an absolute path, we need it to be relative for turbopack.
        if (nextConfigSerializable.cacheHandler) {
            nextConfigSerializable.cacheHandler = './' + (_path.default.isAbsolute(nextConfigSerializable.cacheHandler) ? _path.default.relative(projectPath, nextConfigSerializable.cacheHandler) : nextConfigSerializable.cacheHandler);
        }
        if (nextConfigSerializable.cacheHandlers) {
            nextConfigSerializable.cacheHandlers = Object.fromEntries(Object.entries(nextConfigSerializable.cacheHandlers).filter(([_, value])=>value != null).map(([key, value])=>[
                    key,
                    './' + (_path.default.isAbsolute(value) ? _path.default.relative(projectPath, value) : value)
                ]));
        }
        if (nextConfigSerializable.turbopack != null) {
            // clone to allow in-place mutations
            const turbopack = {
                ...nextConfigSerializable.turbopack
            };
            if (turbopack.rules) {
                turbopack.rules = serializeTurbopackRules(turbopack.rules);
            }
            nextConfigSerializable.turbopack = turbopack;
        }
        return JSON.stringify(nextConfigSerializable, null, 2);
    }
    // converts regexes to a `RegexComponents` object so that it can be JSON-serialized when passed to
    // Turbopack
    function serializeRuleCondition(cond) {
        function regexComponents(regex) {
            return {
                source: regex.source,
                flags: regex.flags
            };
        }
        if (typeof cond === 'string') {
            return cond;
        } else if ('all' in cond) {
            return {
                ...cond,
                all: cond.all.map(serializeRuleCondition)
            };
        } else if ('any' in cond) {
            return {
                ...cond,
                any: cond.any.map(serializeRuleCondition)
            };
        } else if ('not' in cond) {
            return {
                ...cond,
                not: serializeRuleCondition(cond.not)
            };
        } else {
            return {
                ...cond,
                path: cond.path == null ? undefined : cond.path instanceof RegExp ? {
                    type: 'regex',
                    value: regexComponents(cond.path)
                } : {
                    type: 'glob',
                    value: cond.path
                },
                content: cond.content && regexComponents(cond.content)
            };
        }
    }
    // Note: Returns an updated `turbopackRules` with serialized conditions. Does not mutate in-place.
    function serializeTurbopackRules(turbopackRules) {
        const serializedRules = {};
        for (const [glob, rule] of Object.entries(turbopackRules)){
            if (Array.isArray(rule)) {
                serializedRules[glob] = rule.map((item)=>{
                    if (typeof item !== 'string' && 'loaders' in item) {
                        return serializeConfigItem(item, glob);
                    } else {
                        checkLoaderItem(item, glob);
                        return item;
                    }
                });
            } else {
                serializedRules[glob] = serializeConfigItem(rule, glob);
            }
        }
        return serializedRules;
        //TURBOPACK unreachable
        ;
        function serializeConfigItem(rule, glob) {
            if (!rule) return rule;
            for (const item of rule.loaders){
                checkLoaderItem(item, glob);
            }
            let serializedRule = rule;
            if (rule.condition != null) {
                serializedRule = {
                    ...rule,
                    condition: serializeRuleCondition(rule.condition)
                };
            }
            return serializedRule;
        }
        function checkLoaderItem(loaderItem, glob) {
            if (typeof loaderItem !== 'string' && !(0, _util.isDeepStrictEqual)(loaderItem, JSON.parse(JSON.stringify(loaderItem)))) {
                throw Object.defineProperty(new Error(`loader ${loaderItem.loader} for match "${glob}" does not have serializable options. ` + 'Ensure that options passed are plain JavaScript objects and values.'), "__NEXT_ERROR_CODE", {
                    value: "E491",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    function napiEntrypointsToRawEntrypoints(entrypoints) {
        const routes = new Map();
        for (const { pathname, ...nativeRoute } of entrypoints.routes){
            let route;
            const routeType = nativeRoute.type;
            switch(routeType){
                case 'page':
                    route = {
                        type: 'page',
                        htmlEndpoint: new EndpointImpl(nativeRoute.htmlEndpoint),
                        dataEndpoint: new EndpointImpl(nativeRoute.dataEndpoint)
                    };
                    break;
                case 'page-api':
                    route = {
                        type: 'page-api',
                        endpoint: new EndpointImpl(nativeRoute.endpoint)
                    };
                    break;
                case 'app-page':
                    route = {
                        type: 'app-page',
                        pages: nativeRoute.pages.map((page)=>({
                                originalName: page.originalName,
                                htmlEndpoint: new EndpointImpl(page.htmlEndpoint),
                                rscEndpoint: new EndpointImpl(page.rscEndpoint)
                            }))
                    };
                    break;
                case 'app-route':
                    route = {
                        type: 'app-route',
                        originalName: nativeRoute.originalName,
                        endpoint: new EndpointImpl(nativeRoute.endpoint)
                    };
                    break;
                case 'conflict':
                    route = {
                        type: 'conflict'
                    };
                    break;
                default:
                    {
                        const _exhaustiveCheck = routeType;
                        invariant(nativeRoute, ()=>`Unknown route type: ${_exhaustiveCheck}`);
                    }
            }
            routes.set(pathname, route);
        }
        const napiMiddlewareToMiddleware = (middleware)=>({
                endpoint: new EndpointImpl(middleware.endpoint),
                isProxy: middleware.isProxy
            });
        const middleware = entrypoints.middleware ? napiMiddlewareToMiddleware(entrypoints.middleware) : undefined;
        const napiInstrumentationToInstrumentation = (instrumentation)=>({
                nodeJs: new EndpointImpl(instrumentation.nodeJs),
                edge: new EndpointImpl(instrumentation.edge)
            });
        const instrumentation = entrypoints.instrumentation ? napiInstrumentationToInstrumentation(entrypoints.instrumentation) : undefined;
        return {
            routes,
            middleware,
            instrumentation,
            pagesDocumentEndpoint: new EndpointImpl(entrypoints.pagesDocumentEndpoint),
            pagesAppEndpoint: new EndpointImpl(entrypoints.pagesAppEndpoint),
            pagesErrorEndpoint: new EndpointImpl(entrypoints.pagesErrorEndpoint),
            issues: entrypoints.issues,
            diagnostics: entrypoints.diagnostics
        };
    }
    return async function createProject(options, turboEngineOptions) {
        return new ProjectImpl(await binding.projectNew(await rustifyProjectOptions(options), turboEngineOptions || {}, {
            throwTurbopackInternalError: _internalerror.throwTurbopackInternalError
        }));
    };
}
// helper for loadWasm
async function loadWasmRawBindings(importPath = '') {
    let attempts = [];
    // Used by `run-tests` to force use of a locally-built wasm binary. This environment variable is
    // unstable and subject to change.
    const testWasmDir = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_TEST_WASM_DIR;
    if (testWasmDir) {
        // assume these are node.js bindings and don't need a call to `.default()`
        const rawBindings = await Promise.resolve().then(()=>{
            const e = new Error("Cannot find module as expression is too dynamic");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        });
        infoLog(`next-swc build: wasm build ${testWasmDir}`);
        return rawBindings;
    } else {
        for (let pkg of [
            '@next/swc-wasm-nodejs',
            '@next/swc-wasm-web'
        ]){
            try {
                let pkgPath = pkg;
                if (importPath) {
                    // the import path must be exact when not in node_modules
                    pkgPath = _path.default.join(importPath, pkg, 'wasm.js');
                }
                const importedRawBindings = await Promise.resolve().then(()=>{
                    const e = new Error("Cannot find module as expression is too dynamic");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                });
                let rawBindings;
                if (pkg === '@next/swc-wasm-web') {
                    // https://rustwasm.github.io/docs/wasm-bindgen/examples/without-a-bundler.html
                    // `default` must be called to initialize the module
                    rawBindings = await importedRawBindings.default();
                } else {
                    rawBindings = importedRawBindings;
                }
                infoLog(`next-swc build: wasm build ${pkg}`);
                return rawBindings;
            } catch (e) {
                // Only log attempts for loading wasm when loading as fallback
                if (importPath) {
                    if ((e == null ? void 0 : e.code) === 'ERR_MODULE_NOT_FOUND') {
                        attempts.push(`Attempted to load ${pkg}, but it was not installed`);
                    } else {
                        attempts.push(`Attempted to load ${pkg}, but an error occurred: ${e.message ?? e}`);
                    }
                }
            }
        }
    }
    throw attempts;
}
// helper for tryLoadWasmWithFallback / loadBindings.
async function loadWasm(importPath = '') {
    const rawBindings = await loadWasmRawBindings(importPath);
    function removeUndefined(obj) {
        // serde-wasm-bindgen expect that `undefined` values map to `()` in rust, but we want to treat
        // those fields as non-existent, so remove them before passing them to rust.
        //
        // The native (non-wasm) bindings use `JSON.stringify`, which strips undefined values.
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(removeUndefined);
        }
        const newObj = {};
        for (const [k, v] of Object.entries(obj)){
            if (typeof v !== 'undefined') {
                newObj[k] = removeUndefined(v);
            }
        }
        return newObj;
    }
    // Note wasm binary does not support async intefaces yet, all async
    // interface coereces to sync interfaces.
    let wasmBindings = {
        css: {
            lightning: {
                transform: function(_options) {
                    throw Object.defineProperty(new Error('`css.lightning.transform` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                        value: "E330",
                        enumerable: false,
                        configurable: true
                    });
                },
                transformStyleAttr: function(_options) {
                    throw Object.defineProperty(new Error('`css.lightning.transformStyleAttr` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                        value: "E324",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        },
        isWasm: true,
        transform (src, options) {
            return rawBindings.transform(src.toString(), removeUndefined(options));
        },
        transformSync (src, options) {
            return rawBindings.transformSync(src.toString(), removeUndefined(options));
        },
        minify (src, options) {
            return rawBindings.minify(src.toString(), removeUndefined(options));
        },
        minifySync (src, options) {
            return rawBindings.minifySync(src.toString(), removeUndefined(options));
        },
        parse (src, options) {
            return rawBindings.parse(src.toString(), removeUndefined(options));
        },
        getTargetTriple () {
            return undefined;
        },
        turbo: {
            createProject (_options, _turboEngineOptions) {
                throw Object.defineProperty(new Error('`turbo.createProject` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                    value: "E403",
                    enumerable: false,
                    configurable: true
                });
            },
            startTurbopackTraceServer (_traceFilePath, _port) {
                throw Object.defineProperty(new Error('`turbo.startTurbopackTraceServer` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                    value: "E13",
                    enumerable: false,
                    configurable: true
                });
            }
        },
        mdx: {
            compile (src, options) {
                return rawBindings.mdxCompile(src, removeUndefined(getMdxOptions(options)));
            },
            compileSync (src, options) {
                return rawBindings.mdxCompileSync(src, removeUndefined(getMdxOptions(options)));
            }
        },
        reactCompiler: {
            isReactCompilerRequired (_filename) {
                return Promise.resolve(true);
            }
        },
        rspack: {
            getModuleNamedExports (_resourcePath) {
                throw Object.defineProperty(new Error('`rspack.getModuleNamedExports` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                    value: "E709",
                    enumerable: false,
                    configurable: true
                });
            },
            warnForEdgeRuntime (_source, _isProduction) {
                throw Object.defineProperty(new Error('`rspack.warnForEdgeRuntime` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                    value: "E712",
                    enumerable: false,
                    configurable: true
                });
            }
        },
        expandNextJsTemplate (content, templatePath, nextPackageDirPath, replacements, injections, imports) {
            return rawBindings.expandNextJsTemplate(content, templatePath, nextPackageDirPath, replacements, injections, imports);
        },
        lockfileTryAcquire (_filePath) {
            throw Object.defineProperty(new Error('`lockfileTryAcquire` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                value: "E855",
                enumerable: false,
                configurable: true
            });
        },
        lockfileTryAcquireSync (_filePath) {
            throw Object.defineProperty(new Error('`lockfileTryAcquireSync` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                value: "E856",
                enumerable: false,
                configurable: true
            });
        },
        lockfileUnlock (_lockfile) {
            throw Object.defineProperty(new Error('`lockfileUnlock` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                value: "E857",
                enumerable: false,
                configurable: true
            });
        },
        lockfileUnlockSync (_lockfile) {
            throw Object.defineProperty(new Error('`lockfileUnlockSync` is not supported by the wasm bindings.'), "__NEXT_ERROR_CODE", {
                value: "E858",
                enumerable: false,
                configurable: true
            });
        }
    };
    return wasmBindings;
}
/**
 * Loads the native (non-wasm) bindings. Prefer `loadBindings` over this API, as that includes a
 * wasm fallback.
 */ function loadNative(importPath) {
    if (loadedBindings) {
        return loadedBindings;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_TEST_WASM) {
        throw Object.defineProperty(new Error('cannot run loadNative when `NEXT_TEST_WASM` is set'), "__NEXT_ERROR_CODE", {
            value: "E714",
            enumerable: false,
            configurable: true
        });
    }
    const customBindings = !!__INTERNAL_CUSTOM_TURBOPACK_BINDINGS ? (()=>{
        const e = new Error("Cannot find module as expression is too dynamic");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })() : null;
    let bindings = customBindings;
    let attempts = [];
    const NEXT_TEST_NATIVE_DIR = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_TEST_NATIVE_DIR;
    for (const triple of triples){
        if (NEXT_TEST_NATIVE_DIR) {
            try {
                // Use the binary directly to skip `pnpm pack` for testing as it's slow because of the large native binary.
                bindings = (()=>{
                    const e = new Error("Cannot find module 'unknown'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                })();
                infoLog('next-swc build: local built @next/swc from NEXT_TEST_NATIVE_DIR');
                break;
            } catch (e) {}
        } else {
            try {
                bindings = (()=>{
                    const e = new Error("Cannot find module 'unknown'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                })();
                infoLog('next-swc build: local built @next/swc');
                break;
            } catch (e) {}
        }
    }
    if (!bindings) {
        for (const triple of triples){
            let pkg = importPath ? _path.default.join(importPath, `@next/swc-${triple.platformArchABI}`, `next-swc.${triple.platformArchABI}.node`) : `@next/swc-${triple.platformArchABI}`;
            try {
                bindings = (()=>{
                    const e = new Error("Cannot find module as expression is too dynamic");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                })();
                if (!importPath) {
                    checkVersionMismatch((()=>{
                        const e = new Error("Cannot find module 'unknown'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })());
                }
                break;
            } catch (e) {
                if ((e == null ? void 0 : e.code) === 'MODULE_NOT_FOUND') {
                    attempts.push(`Attempted to load ${pkg}, but it was not installed`);
                } else {
                    attempts.push(`Attempted to load ${pkg}, but an error occurred: ${e.message ?? e}`);
                }
                lastNativeBindingsLoadErrorCode = (e == null ? void 0 : e.code) ?? 'unknown';
            }
        }
    }
    if (bindings) {
        loadedBindings = {
            isWasm: false,
            transform (src, options) {
                var _options_jsc;
                const isModule = typeof src !== 'undefined' && typeof src !== 'string' && !__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(src);
                options = options || {};
                if (options == null ? void 0 : (_options_jsc = options.jsc) == null ? void 0 : _options_jsc.parser) {
                    options.jsc.parser.syntax = options.jsc.parser.syntax ?? 'ecmascript';
                }
                return bindings.transform(isModule ? JSON.stringify(src) : src, isModule, toBuffer(options));
            },
            transformSync (src, options) {
                var _options_jsc;
                if (typeof src === 'undefined') {
                    throw Object.defineProperty(new Error("transformSync doesn't implement reading the file from filesystem"), "__NEXT_ERROR_CODE", {
                        value: "E292",
                        enumerable: false,
                        configurable: true
                    });
                } else if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(src)) {
                    throw Object.defineProperty(new Error("transformSync doesn't implement taking the source code as Buffer"), "__NEXT_ERROR_CODE", {
                        value: "E387",
                        enumerable: false,
                        configurable: true
                    });
                }
                const isModule = typeof src !== 'string';
                options = options || {};
                if (options == null ? void 0 : (_options_jsc = options.jsc) == null ? void 0 : _options_jsc.parser) {
                    options.jsc.parser.syntax = options.jsc.parser.syntax ?? 'ecmascript';
                }
                return bindings.transformSync(isModule ? JSON.stringify(src) : src, isModule, toBuffer(options));
            },
            minify (src, options) {
                return bindings.minify(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(src), toBuffer(options ?? {}));
            },
            minifySync (src, options) {
                return bindings.minifySync(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(src), toBuffer(options ?? {}));
            },
            parse (src, options) {
                return bindings.parse(src, toBuffer(options ?? {}));
            },
            getTargetTriple: bindings.getTargetTriple,
            initCustomTraceSubscriber: bindings.initCustomTraceSubscriber,
            teardownTraceSubscriber: bindings.teardownTraceSubscriber,
            turbo: {
                createProject: bindingToApi(customBindings ?? bindings, false),
                startTurbopackTraceServer (traceFilePath, port) {
                    _log.warn(`Turbopack trace server started. View trace at https://trace.nextjs.org${port != null ? `?port=${port}` : ''}`);
                    (customBindings ?? bindings).startTurbopackTraceServer(traceFilePath, port);
                }
            },
            mdx: {
                compile (src, options) {
                    return bindings.mdxCompile(src, toBuffer(getMdxOptions(options)));
                },
                compileSync (src, options) {
                    bindings.mdxCompileSync(src, toBuffer(getMdxOptions(options)));
                }
            },
            css: {
                lightning: {
                    transform (transformOptions) {
                        return bindings.lightningCssTransform(transformOptions);
                    },
                    transformStyleAttr (transformAttrOptions) {
                        return bindings.lightningCssTransformStyleAttribute(transformAttrOptions);
                    }
                }
            },
            reactCompiler: {
                isReactCompilerRequired: (filename)=>{
                    return bindings.isReactCompilerRequired(filename);
                }
            },
            rspack: {
                getModuleNamedExports: function(resourcePath) {
                    return bindings.getModuleNamedExports(resourcePath);
                },
                warnForEdgeRuntime: function(source, isProduction) {
                    return bindings.warnForEdgeRuntime(source, isProduction);
                }
            },
            expandNextJsTemplate (content, templatePath, nextPackageDirPath, replacements, injections, imports) {
                return bindings.expandNextJsTemplate(content, templatePath, nextPackageDirPath, replacements, injections, imports);
            },
            lockfileTryAcquire (filePath) {
                return bindings.lockfileTryAcquire(filePath);
            },
            lockfileTryAcquireSync (filePath) {
                return bindings.lockfileTryAcquireSync(filePath);
            },
            lockfileUnlock (lockfile) {
                return bindings.lockfileUnlock(lockfile);
            },
            lockfileUnlockSync (lockfile) {
                return bindings.lockfileUnlockSync(lockfile);
            }
        };
        return loadedBindings;
    }
    throw attempts;
}
/// Build a mdx options object contains default values that
/// can be parsed with serde_wasm_bindgen.
function getMdxOptions(options = {}) {
    return {
        ...options,
        development: options.development ?? false,
        jsx: options.jsx ?? false,
        mdxType: options.mdxType ?? 'commonMark'
    };
}
function toBuffer(t) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(t));
}
async function transform(src, options) {
    let bindings = getBindingsSync();
    return bindings.transform(src, options);
}
function transformSync(src, options) {
    const bindings = loadBindingsSync();
    return bindings.transformSync(src, options);
}
function minify(src, options) {
    const bindings = getBindingsSync();
    return bindings.minify(src, options);
}
function isReactCompilerRequired(filename) {
    const bindings = getBindingsSync();
    return bindings.reactCompiler.isReactCompilerRequired(filename);
}
async function parse(src, options) {
    const bindings = getBindingsSync();
    const parserOptions = (0, _options.getParserOptions)(options);
    const parsed = await bindings.parse(src, parserOptions);
    return JSON.parse(parsed);
}
function getBinaryMetadata() {
    var _loadedBindings_getTargetTriple;
    return {
        target: loadedBindings == null ? void 0 : (_loadedBindings_getTargetTriple = loadedBindings.getTargetTriple) == null ? void 0 : _loadedBindings_getTargetTriple.call(loadedBindings)
    };
}
function initCustomTraceSubscriber(traceFileName) {
    if (!swcTraceFlushGuard) {
        var _getBindingsSync_initCustomTraceSubscriber, _getBindingsSync;
        // Wasm binary doesn't support trace emission
        swcTraceFlushGuard = (_getBindingsSync_initCustomTraceSubscriber = (_getBindingsSync = getBindingsSync()).initCustomTraceSubscriber) == null ? void 0 : _getBindingsSync_initCustomTraceSubscriber.call(_getBindingsSync, traceFileName);
    }
}
function once(fn) {
    let executed = false;
    return function() {
        if (!executed) {
            executed = true;
            fn();
        }
    };
}
const teardownTraceSubscriber = once(()=>{
    try {
        if (swcTraceFlushGuard) {
            var _getBindingsSync_teardownTraceSubscriber, _getBindingsSync;
            (_getBindingsSync_teardownTraceSubscriber = (_getBindingsSync = getBindingsSync()).teardownTraceSubscriber) == null ? void 0 : _getBindingsSync_teardownTraceSubscriber.call(_getBindingsSync, swcTraceFlushGuard);
        }
    } catch (e) {
    // Suppress exceptions, this fn allows to fail to load native bindings
    }
});
async function getModuleNamedExports(resourcePath) {
    return getBindingsSync().rspack.getModuleNamedExports(resourcePath);
}
async function warnForEdgeRuntime(source, isProduction) {
    return getBindingsSync().rspack.warnForEdgeRuntime(source, isProduction);
} //# sourceMappingURL=index.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/swc/install-bindings.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * This module provides a way to install SWC bindings without eagerly loading the entire swc/index module.
 *
 * The swc/index module can transitively load other modules (like webpack-config) that import React,
 * and React's entry point checks process.env.NODE_ENV at require time to decide whether to load
 * the development or production bundle. By deferring the require of swc/index until this function
 * is called, we ensure NODE_ENV is set before React is loaded.
 */ /**
 * Loads and caches the native bindings. This is idempotent and should be called early so bindings
 * can be accessed synchronously later.
 *
 * @param useWasmBinary - Whether to use WASM bindings instead of native bindings
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "installBindings", {
    enumerable: true,
    get: function() {
        return installBindings;
    }
});
async function installBindings(useWasmBinary = false) {
    // Lazy require to avoid loading swc/index (and transitively webpack-config/React)
    // before NODE_ENV is set
    const { loadBindings } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
    await loadBindings(useWasmBinary);
} //# sourceMappingURL=install-bindings.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/define-env.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
             * Cloud providers can set this environment variable to allow users
             * and library authors to have different implementations based on
             * the runtime they are running with, if it's not using `edge-runtime`
             */ var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDefineEnv", {
    enumerable: true,
    get: function() {
        return getDefineEnv;
    }
});
const _nodepath = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _needsexperimentalreact = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/needs-experimental-react.js [app-client] (ecmascript)");
const _ppr = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/experimental/ppr.js [app-client] (ecmascript)");
const _staticenv = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/static-env.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Serializes the DefineEnv config so that it can be inserted into the code by Webpack/Turbopack, JSON stringifies each value.
 */ function serializeDefineEnv(defineEnv) {
    const defineEnvStringified = {};
    for(const key in defineEnv){
        const value = defineEnv[key];
        defineEnvStringified[key] = JSON.stringify(value);
    }
    return defineEnvStringified;
}
function getImageConfig(config, dev) {
    var _config_images, _config_images1, _config_images2;
    return {
        'process.env.__NEXT_IMAGE_OPTS': {
            deviceSizes: config.images.deviceSizes,
            imageSizes: config.images.imageSizes,
            qualities: config.images.qualities,
            path: config.images.path,
            loader: config.images.loader,
            dangerouslyAllowSVG: config.images.dangerouslyAllowSVG,
            unoptimized: config == null ? void 0 : (_config_images = config.images) == null ? void 0 : _config_images.unoptimized,
            ...dev ? {
                // additional config in dev to allow validating on the client
                domains: config.images.domains,
                remotePatterns: (_config_images1 = config.images) == null ? void 0 : _config_images1.remotePatterns,
                localPatterns: (_config_images2 = config.images) == null ? void 0 : _config_images2.localPatterns,
                output: config.output
            } : {}
        }
    };
}
function getDefineEnv({ isTurbopack, clientRouterFilters, config, dev, distDir, projectPath, fetchCacheKeyPrefix, hasRewrites, isClient, isEdgeServer, isNodeServer, middlewareMatchers, omitNonDeterministic, rewrites }) {
    var _config_experimental, _config_experimental_staleTimes, _config_experimental_staleTimes1, _config_experimental_staleTimes2, _config_experimental_staleTimes3, _config_i18n, _config_compiler;
    const nextPublicEnv = (0, _staticenv.getNextPublicEnvironmentVariables)();
    const nextConfigEnv = (0, _staticenv.getNextConfigEnv)(config);
    const isPPREnabled = (0, _ppr.checkIsAppPPREnabled)(config.experimental.ppr);
    const isCacheComponentsEnabled = !!config.cacheComponents;
    const isUseCacheEnabled = !!config.experimental.useCache;
    const defineEnv = {
        // internal field to identify the plugin config
        __NEXT_DEFINE_ENV: true,
        ...nextPublicEnv,
        ...nextConfigEnv,
        ...!isEdgeServer ? {} : {
            EdgeRuntime: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_EDGE_RUNTIME_PROVIDER ?? 'edge-runtime',
            // process should be only { env: {...} } for edge runtime.
            // For ignore avoid warn on `process.emit` usage but directly omit it.
            'process.emit': false
        },
        'process.turbopack': isTurbopack,
        'process.env.TURBOPACK': isTurbopack,
        'process.env.__NEXT_BUNDLER': isTurbopack ? 'Turbopack' : __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_RSPACK ? 'Rspack' : 'Webpack',
        // minimal mode is enforced when an adapter is configured
        'process.env.MINIMAL_MODE': Boolean(config.experimental.adapterPath),
        // TODO: enforce `NODE_ENV` on `process.env`, and add a test:
        'process.env.NODE_ENV': dev || config.experimental.allowDevelopmentBuild ? 'development' : 'production',
        'process.env.NEXT_RUNTIME': isEdgeServer ? 'edge' : isNodeServer ? 'nodejs' : '',
        'process.env.NEXT_MINIMAL': '',
        'process.env.__NEXT_APP_NAV_FAIL_HANDLING': Boolean(config.experimental.appNavFailHandling),
        'process.env.__NEXT_PPR': isPPREnabled,
        'process.env.__NEXT_CACHE_COMPONENTS': isCacheComponentsEnabled,
        'process.env.__NEXT_USE_CACHE': isUseCacheEnabled,
        'process.env.NEXT_DEPLOYMENT_ID': ((_config_experimental = config.experimental) == null ? void 0 : _config_experimental.useSkewCookie) ? false : config.deploymentId || false,
        // Propagates the `__NEXT_EXPERIMENTAL_STATIC_SHELL_DEBUGGING` environment
        // variable to the client.
        'process.env.__NEXT_EXPERIMENTAL_STATIC_SHELL_DEBUGGING': ("TURBOPACK compile-time value", false) || false,
        'process.env.__NEXT_FETCH_CACHE_KEY_PREFIX': fetchCacheKeyPrefix ?? '',
        ...isTurbopack ? {} : {
            'process.env.__NEXT_MIDDLEWARE_MATCHERS': middlewareMatchers ?? []
        },
        'process.env.__NEXT_MANUAL_CLIENT_BASE_PATH': config.experimental.manualClientBasePath ?? false,
        'process.env.__NEXT_CLIENT_ROUTER_DYNAMIC_STALETIME': JSON.stringify(isNaN(Number((_config_experimental_staleTimes = config.experimental.staleTimes) == null ? void 0 : _config_experimental_staleTimes.dynamic)) ? 0 : (_config_experimental_staleTimes1 = config.experimental.staleTimes) == null ? void 0 : _config_experimental_staleTimes1.dynamic),
        'process.env.__NEXT_CLIENT_ROUTER_STATIC_STALETIME': JSON.stringify(isNaN(Number((_config_experimental_staleTimes2 = config.experimental.staleTimes) == null ? void 0 : _config_experimental_staleTimes2.static)) ? 5 * 60 // 5 minutes
         : (_config_experimental_staleTimes3 = config.experimental.staleTimes) == null ? void 0 : _config_experimental_staleTimes3.static),
        'process.env.__NEXT_CLIENT_ROUTER_FILTER_ENABLED': config.experimental.clientRouterFilter ?? true,
        'process.env.__NEXT_CLIENT_ROUTER_S_FILTER': (clientRouterFilters == null ? void 0 : clientRouterFilters.staticFilter) ?? false,
        'process.env.__NEXT_CLIENT_ROUTER_D_FILTER': (clientRouterFilters == null ? void 0 : clientRouterFilters.dynamicFilter) ?? false,
        'process.env.__NEXT_CLIENT_VALIDATE_RSC_REQUEST_HEADERS': Boolean(config.experimental.validateRSCRequestHeaders),
        'process.env.__NEXT_DYNAMIC_ON_HOVER': Boolean(config.experimental.dynamicOnHover),
        'process.env.__NEXT_OPTIMISTIC_CLIENT_CACHE': config.experimental.optimisticClientCache ?? true,
        'process.env.__NEXT_MIDDLEWARE_PREFETCH': config.experimental.proxyPrefetch ?? 'flexible',
        'process.env.__NEXT_CROSS_ORIGIN': config.crossOrigin,
        'process.browser': isClient,
        'process.env.__NEXT_TEST_MODE': ("TURBOPACK compile-time value", false) ?? false,
        // This is used in client/dev-error-overlay/hot-dev-client.js to replace the dist directory
        ...dev && (isClient ?? isEdgeServer) ? {
            'process.env.__NEXT_DIST_DIR': distDir
        } : {},
        // This is used in devtools to strip the project path in edge runtime,
        // as there's only a dummy `dir` value (`.`) as edge runtime doesn't have concept of file system.
        ...dev && isEdgeServer ? {
            'process.env.__NEXT_EDGE_PROJECT_DIR': isTurbopack ? _nodepath.default.relative(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), projectPath) : projectPath
        } : {},
        'process.env.__NEXT_BASE_PATH': config.basePath,
        'process.env.__NEXT_CASE_SENSITIVE_ROUTES': Boolean(config.experimental.caseSensitiveRoutes),
        'process.env.__NEXT_REWRITES': rewrites,
        'process.env.__NEXT_TRAILING_SLASH': config.trailingSlash,
        'process.env.__NEXT_DEV_INDICATOR': config.devIndicators !== false,
        'process.env.__NEXT_DEV_INDICATOR_POSITION': config.devIndicators === false ? 'bottom-left' // This will not be used as the indicator is disabled.
         : config.devIndicators.position ?? 'bottom-left',
        'process.env.__NEXT_STRICT_MODE': config.reactStrictMode === null ? false : config.reactStrictMode,
        'process.env.__NEXT_STRICT_MODE_APP': config.reactStrictMode === null ? true : config.reactStrictMode,
        'process.env.__NEXT_OPTIMIZE_CSS': (config.experimental.optimizeCss && !dev) ?? false,
        'process.env.__NEXT_SCRIPT_WORKERS': (config.experimental.nextScriptWorkers && !dev) ?? false,
        'process.env.__NEXT_SCROLL_RESTORATION': config.experimental.scrollRestoration ?? false,
        ...getImageConfig(config, dev),
        'process.env.__NEXT_ROUTER_BASEPATH': config.basePath,
        'process.env.__NEXT_HAS_REWRITES': hasRewrites,
        'process.env.__NEXT_CONFIG_OUTPUT': config.output,
        'process.env.__NEXT_I18N_SUPPORT': !!config.i18n,
        'process.env.__NEXT_I18N_DOMAINS': ((_config_i18n = config.i18n) == null ? void 0 : _config_i18n.domains) ?? false,
        'process.env.__NEXT_I18N_CONFIG': config.i18n || '',
        'process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE': config.skipProxyUrlNormalize,
        'process.env.__NEXT_EXTERNAL_MIDDLEWARE_REWRITE_RESOLVE': config.experimental.externalProxyRewritesResolve ?? false,
        'process.env.__NEXT_MANUAL_TRAILING_SLASH': config.skipTrailingSlashRedirect,
        'process.env.__NEXT_HAS_WEB_VITALS_ATTRIBUTION': (config.experimental.webVitalsAttribution && config.experimental.webVitalsAttribution.length > 0) ?? false,
        'process.env.__NEXT_WEB_VITALS_ATTRIBUTION': config.experimental.webVitalsAttribution ?? false,
        'process.env.__NEXT_LINK_NO_TOUCH_START': config.experimental.linkNoTouchStart ?? false,
        'process.env.__NEXT_ASSET_PREFIX': config.assetPrefix,
        'process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS': !!config.experimental.authInterrupts,
        'process.env.__NEXT_TELEMETRY_DISABLED': Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_TELEMETRY_DISABLED),
        ...isNodeServer || isEdgeServer ? {
            // Fix bad-actors in the npm ecosystem (e.g. `node-formidable`)
            // This is typically found in unmaintained modules from the
            // pre-webpack era (common in server-side code)
            'global.GENTLY': false
        } : undefined,
        ...isNodeServer || isEdgeServer ? {
            'process.env.__NEXT_EXPERIMENTAL_REACT': (0, _needsexperimentalreact.needsExperimentalReact)(config)
        } : undefined,
        'process.env.__NEXT_MULTI_ZONE_DRAFT_MODE': config.experimental.multiZoneDraftMode ?? false,
        'process.env.__NEXT_TRUST_HOST_HEADER': config.experimental.trustHostHeader ?? false,
        'process.env.__NEXT_ALLOWED_REVALIDATE_HEADERS': config.experimental.allowedRevalidateHeaderKeys ?? [],
        ...isNodeServer ? {
            'process.env.__NEXT_RELATIVE_DIST_DIR': config.distDir,
            'process.env.__NEXT_RELATIVE_PROJECT_DIR': _nodepath.default.relative(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), projectPath)
        } : {},
        'process.env.__NEXT_BROWSER_DEBUG_INFO_IN_TERMINAL': JSON.stringify(config.experimental.browserDebugInfoInTerminal || false),
        'process.env.__NEXT_MCP_SERVER': !!config.experimental.mcpServer,
        // The devtools need to know whether or not to show an option to clear the
        // bundler cache. This option may be removed later once Turbopack's
        // filesystem cache feature is more stable.
        //
        // This environment value is currently best-effort:
        // - It's possible to disable the webpack filesystem cache, but it's
        //   unlikely for a user to do that.
        // - Rspack's filesystem cache is unstable and requires a different
        //   configuration than webpack to enable (which we don't do).
        //
        // In the worst case we'll show an option to clear the cache, but it'll be a
        // no-op that just restarts the development server.
        'process.env.__NEXT_BUNDLER_HAS_PERSISTENT_CACHE': !isTurbopack || (config.experimental.turbopackFileSystemCacheForDev ?? false),
        'process.env.__NEXT_REACT_DEBUG_CHANNEL': config.experimental.reactDebugChannel ?? false
    };
    const userDefines = ((_config_compiler = config.compiler) == null ? void 0 : _config_compiler.define) ?? {};
    for(const key in userDefines){
        if (defineEnv.hasOwnProperty(key)) {
            throw Object.defineProperty(new Error(`The \`compiler.define\` option is configured to replace the \`${key}\` variable. This variable is either part of a Next.js built-in or is already configured.`), "__NEXT_ERROR_CODE", {
                value: "E688",
                enumerable: false,
                configurable: true
            });
        }
        defineEnv[key] = userDefines[key];
    }
    if (isNodeServer || isEdgeServer) {
        var _config_compiler1;
        const userDefinesServer = ((_config_compiler1 = config.compiler) == null ? void 0 : _config_compiler1.defineServer) ?? {};
        for(const key in userDefinesServer){
            if (defineEnv.hasOwnProperty(key)) {
                throw Object.defineProperty(new Error(`The \`compiler.defineServer\` option is configured to replace the \`${key}\` variable. This variable is either part of a Next.js built-in or is already configured.`), "__NEXT_ERROR_CODE", {
                    value: "E689",
                    enumerable: false,
                    configurable: true
                });
            }
            defineEnv[key] = userDefinesServer[key];
        }
    }
    const serializedDefineEnv = serializeDefineEnv(defineEnv);
    // we delay inlining these values until after the build
    // with flying shuttle enabled so we can update them
    // without invalidating entries
    if (!dev && omitNonDeterministic) {
        // client uses window. instead of leaving process.env
        // in case process isn't polyfilled on client already
        // since by this point it won't be added by webpack
        const safeKey = (key)=>isClient ? `window.${key.split('.').pop()}` : key;
        for(const key in nextPublicEnv){
            serializedDefineEnv[key] = safeKey(key);
        }
        for(const key in nextConfigEnv){
            serializedDefineEnv[key] = safeKey(key);
        }
        for (const key of [
            'process.env.NEXT_DEPLOYMENT_ID'
        ]){
            serializedDefineEnv[key] = safeKey(key);
        }
    }
    return serializedDefineEnv;
} //# sourceMappingURL=define-env.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/next-config-ts/require-hook.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    deregisterHook: null,
    registerHook: null,
    requireFromString: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    deregisterHook: function() {
        return deregisterHook;
    },
    registerHook: function() {
        return registerHook;
    },
    requireFromString: function() {
        return requireFromString;
    }
});
const _nodemodule = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'node:module': Unsupported external type Url for commonjs reference");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _nodefs = (()=>{
    const e = new Error("Cannot find module 'node:fs': Unsupported external type Url for commonjs reference");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _nodepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const oldJSHook = /*TURBOPACK member replacement*/ __turbopack_context__.t.extensions['.js'];
const extensions = [
    '.ts',
    '.cts',
    '.mts',
    '.cjs',
    '.mjs'
];
function registerHook(swcOptions) {
    // lazy require swc since it loads React before even setting NODE_ENV
    // resulting loading Development React on Production
    const { transformSync } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
    /*TURBOPACK member replacement*/ __turbopack_context__.t.extensions['.js'] = function(mod, oldFilename) {
        try {
            return oldJSHook(mod, oldFilename);
        } catch (error) {
            if (error.code !== 'ERR_REQUIRE_ESM') {
                throw error;
            }
            // calling oldJSHook throws ERR_REQUIRE_ESM, so run _compile manually
            // TODO: investigate if we can remove readFileSync
            const content = (0, _nodefs.readFileSync)(oldFilename, 'utf8');
            const { code } = transformSync(content, swcOptions);
            mod._compile(code, oldFilename);
        }
    };
    for (const ext of extensions){
        const oldHook = /*TURBOPACK member replacement*/ __turbopack_context__.t.extensions[ext] ?? oldJSHook;
        /*TURBOPACK member replacement*/ __turbopack_context__.t.extensions[ext] = function(mod, oldFilename) {
            const _compile = mod._compile;
            mod._compile = function(code, filename) {
                const swc = transformSync(code, swcOptions);
                return _compile.call(this, swc.code, filename);
            };
            return oldHook(mod, oldFilename);
        };
    }
}
function deregisterHook() {
    /*TURBOPACK member replacement*/ __turbopack_context__.t.extensions['.js'] = oldJSHook;
    extensions.forEach((ext)=>delete /*TURBOPACK member replacement*/ __turbopack_context__.t.extensions[ext]);
}
function requireFromString(code, filename) {
    const paths = _nodemodule.default._nodeModulePaths((0, _nodepath.dirname)(filename));
    const m = new _nodemodule.default(filename, module.parent);
    m.paths = paths;
    m._compile(code, filename);
    return m.exports;
} //# sourceMappingURL=require-hook.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/next-config-ts/transpile-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transpileConfig", {
    enumerable: true,
    get: function() {
        return transpileConfig;
    }
});
const _nodepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _promises = (()=>{
    const e = new Error("Cannot find module 'node:fs/promises': Unsupported external type Url for commonjs reference");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _nodeurl = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/native-url/index.js [app-client] (ecmascript)");
const _requirehook = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/next-config-ts/require-hook.js [app-client] (ecmascript)");
const _log = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)");
const _installdependencies = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/install-dependencies.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/utils.js [app-client] (ecmascript)");
function resolveSWCOptions(cwd, compilerOptions) {
    var _process_versions, _process;
    return {
        jsc: {
            parser: {
                syntax: 'typescript'
            },
            ...compilerOptions.paths ? {
                paths: compilerOptions.paths
            } : {},
            ...compilerOptions.baseUrl ? {
                baseUrl: (0, _nodepath.resolve)(cwd, compilerOptions.baseUrl)
            } : compilerOptions.paths ? {
                baseUrl: cwd
            } : {}
        },
        module: {
            type: 'commonjs'
        },
        isModule: 'unknown',
        env: {
            targets: {
                // Setting the Node.js version can reduce unnecessary code generation.
                node: ((_process = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]) == null ? void 0 : (_process_versions = _process.versions) == null ? void 0 : _process_versions.node) ?? '20.19.0'
            }
        }
    };
}
// Ported from next/src/lib/verify-typescript-setup.ts
// Although this overlaps with the later `verifyTypeScriptSetup`,
// it is acceptable since the time difference in the worst case is trivial,
// as we are only preparing to install the dependencies once more.
async function verifyTypeScriptSetup(cwd, configFileName) {
    try {
        // Quick module check.
        "[project]/JobPortal/frontend/node_modules/typescript/lib/typescript.js [app-client] (ecmascript)";
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'MODULE_NOT_FOUND') {
            (0, _log.warn)(`Installing TypeScript as it was not found while loading "${configFileName}".`);
            await (0, _installdependencies.installDependencies)(cwd, [
                {
                    pkg: 'typescript'
                }
            ], true).catch((err)=>{
                if (err && typeof err === 'object' && 'command' in err) {
                    console.error(`Failed to install TypeScript, please install it manually to continue:\n` + err.command + '\n');
                }
                throw err;
            });
        }
    }
}
async function getTsConfig(cwd) {
    const ts = (()=>{
        const e = new Error("Cannot find module as expression is too dynamic");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
    // NOTE: This doesn't fully cover the edge case for setting
    // "typescript.tsconfigPath" in next config which is currently
    // a restriction.
    const tsConfigPath = ts.findConfigFile(cwd, ts.sys.fileExists, 'tsconfig.json');
    if (!tsConfigPath) {
        // It is ok to not return ts.getDefaultCompilerOptions() because
        // we are only looking for paths and baseUrl from tsConfig.
        return {};
    }
    const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    const parsedCommandLine = ts.parseJsonConfigFileContent(configFile.config, ts.sys, cwd);
    return parsedCommandLine.options;
}
async function transpileConfig({ nextConfigPath, configFileName, cwd }) {
    try {
        // envs are passed to the workers and preserve the flag
        if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_NODE_NATIVE_TS_LOADER_ENABLED === 'true') {
            try {
                // Node.js v22.10.0+
                // Value is 'strip' or 'transform' based on how the feature is enabled.
                // https://nodejs.org/api/process.html#processfeaturestypescript
                // TODO: Remove `as any` once we bump @types/node to v22.10.0+
                if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].features.typescript) {
                    // Run import() here to catch errors and fallback to legacy resolution.
                    return (await Promise.resolve().then(()=>{
                        const e = new Error("Cannot find module as expression is too dynamic");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })).default;
                }
                if ((0, _utils.getNodeOptionsArgs)().includes('--no-experimental-strip-types') || __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].execArgv.includes('--no-experimental-strip-types')) {
                    (0, _log.warnOnce)(`Skipped resolving "${configFileName}" using Node.js native TypeScript resolution because it was disabled by the "--no-experimental-strip-types" flag.` + ' Falling back to legacy resolution.' + ' Learn more: https://nextjs.org/docs/app/api-reference/config/typescript#using-nodejs-native-typescript-resolver-for-nextconfigts');
                }
                // Feature is not enabled, fallback to legacy resolution for current session.
                __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_NODE_NATIVE_TS_LOADER_ENABLED = 'false';
            } catch (cause) {
                (0, _log.warnOnce)(`Failed to import "${configFileName}" using Node.js native TypeScript resolution.` + ' Falling back to legacy resolution.' + ' Learn more: https://nextjs.org/docs/app/api-reference/config/typescript#using-nodejs-native-typescript-resolver-for-nextconfigts', {
                    cause
                });
                // Once failed, fallback to legacy resolution for current session.
                __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_NODE_NATIVE_TS_LOADER_ENABLED = 'false';
            }
        }
        // Ensure TypeScript is installed to use the API.
        await verifyTypeScriptSetup(cwd, configFileName);
        const compilerOptions = await getTsConfig(cwd);
        return handleCJS({
            cwd,
            nextConfigPath,
            compilerOptions
        });
    } catch (cause) {
        throw Object.defineProperty(new Error(`Failed to transpile "${configFileName}".`, {
            cause
        }), "__NEXT_ERROR_CODE", {
            value: "E797",
            enumerable: false,
            configurable: true
        });
    }
}
async function handleCJS({ cwd, nextConfigPath, compilerOptions }) {
    const swcOptions = resolveSWCOptions(cwd, compilerOptions);
    let hasRequire = false;
    try {
        var _config_experimental;
        const nextConfigString = await (0, _promises.readFile)(nextConfigPath, 'utf8');
        // lazy require swc since it loads React before even setting NODE_ENV
        // resulting loading Development React on Production
        const { loadBindings } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
        const bindings = await loadBindings();
        const { code } = await bindings.transform(nextConfigString, swcOptions);
        // register require hook only if require exists
        if (code.includes('require(')) {
            (0, _requirehook.registerHook)(swcOptions);
            hasRequire = true;
        }
        // filename & extension don't matter here
        const config = (0, _requirehook.requireFromString)(code, (0, _nodepath.resolve)(cwd, 'next.config.compiled.js'));
        // At this point we have already loaded the bindings without this configuration setting due to the `transform` call above.
        // Possibly we fell back to wasm in which case, it all works out but if not we need to warn
        // that the configuration was ignored.
        if ((config == null ? void 0 : (_config_experimental = config.experimental) == null ? void 0 : _config_experimental.useWasmBinary) && !bindings.isWasm) {
            (0, _log.warn)('Using a next.config.ts file is incompatible with `experimental.useWasmBinary` unless ' + '`--experimental-next-config-strip-types` is also passed.\nSetting `useWasmBinary` to `false');
            config.experimental.useWasmBinary = false;
        }
        return config;
    } catch (error) {
        throw error;
    } finally{
        if (hasRequire) {
            (0, _requirehook.deregisterHook)();
        }
    }
} //# sourceMappingURL=transpile-config.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/deployment-id.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDeploymentIdQueryOrEmptyString", {
    enumerable: true,
    get: function() {
        return getDeploymentIdQueryOrEmptyString;
    }
});
function getDeploymentIdQueryOrEmptyString() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return '';
} //# sourceMappingURL=deployment-id.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/normalize-catchall-routes.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizeCatchAllRoutes", {
    enumerable: true,
    get: function() {
        return normalizeCatchAllRoutes;
    }
});
const _interceptionroutes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [app-client] (ecmascript)");
const _apppathnamenormalizer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/normalizers/built/app/app-pathname-normalizer.js [app-client] (ecmascript)");
function normalizeCatchAllRoutes(appPaths, normalizer = new _apppathnamenormalizer.AppPathnameNormalizer()) {
    const catchAllRoutes = [
        ...new Set(Object.values(appPaths).flat().filter(isCatchAllRoute) // Sorting is important because we want to match the most specific path.
        .sort((a, b)=>b.split('/').length - a.split('/').length))
    ];
    // interception routes should only be matched by a single entrypoint
    // we don't want to push a catch-all route to an interception route
    // because it would mean the interception would be handled by the wrong page component
    const filteredAppPaths = Object.keys(appPaths).filter((route)=>!(0, _interceptionroutes.isInterceptionRouteAppPath)(route));
    for (const appPath of filteredAppPaths){
        for (const catchAllRoute of catchAllRoutes){
            const normalizedCatchAllRoute = normalizer.normalize(catchAllRoute);
            const normalizedCatchAllRouteBasePath = normalizedCatchAllRoute.slice(0, normalizedCatchAllRoute.search(catchAllRouteRegex));
            if (appPath.startsWith(normalizedCatchAllRouteBasePath) && // check if there's not already a slot value that could match the catch-all
            !appPaths[appPath].some((path)=>hasMatchedSlots(path, catchAllRoute))) {
                // optional catch-all routes are not currently supported, but leaving this logic in place
                // for when they are eventually supported.
                if (isOptionalCatchAll(catchAllRoute)) {
                    // optional catch-all routes should match both the root segment and any segment after it
                    // for example, `/[[...slug]]` should match `/` and `/foo` and `/foo/bar`
                    appPaths[appPath].push(catchAllRoute);
                } else if (isCatchAll(catchAllRoute)) {
                    // regular catch-all (single bracket) should only match segments after it
                    // for example, `/[...slug]` should match `/foo` and `/foo/bar` but not `/`
                    if (normalizedCatchAllRouteBasePath !== appPath) {
                        appPaths[appPath].push(catchAllRoute);
                    }
                }
            }
        }
    }
}
function hasMatchedSlots(path1, path2) {
    const slots1 = path1.split('/').filter(isMatchableSlot);
    const slots2 = path2.split('/').filter(isMatchableSlot);
    // if the catch-all route does not have the same number of slots as the app path, it can't match
    if (slots1.length !== slots2.length) return false;
    // compare the slots in both paths. For there to be a match, each slot must be the same
    for(let i = 0; i < slots1.length; i++){
        if (slots1[i] !== slots2[i]) return false;
    }
    return true;
}
/**
 * Returns true for slots that should be considered when checking for match compatibility.
 * Excludes children slots because these are similar to having a segment-level `page`
 * which would cause a slot length mismatch when comparing it to a catch-all route.
 */ function isMatchableSlot(segment) {
    return segment.startsWith('@') && segment !== '@children';
}
const catchAllRouteRegex = /\[?\[\.\.\./;
function isCatchAllRoute(pathname) {
    // Optional catch-all slots are not currently supported, and as such they are not considered when checking for match compatability.
    return !isOptionalCatchAll(pathname) && isCatchAll(pathname);
}
function isOptionalCatchAll(pathname) {
    return pathname.includes('[[...');
}
function isCatchAll(pathname) {
    return pathname.includes('[...');
} //# sourceMappingURL=normalize-catchall-routes.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/duration-to-string.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Time thresholds in seconds
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    durationToString: null,
    hrtimeBigIntDurationToString: null,
    hrtimeDurationToString: null,
    hrtimeToSeconds: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    durationToString: function() {
        return durationToString;
    },
    hrtimeBigIntDurationToString: function() {
        return hrtimeBigIntDurationToString;
    },
    hrtimeDurationToString: function() {
        return hrtimeDurationToString;
    },
    hrtimeToSeconds: function() {
        return hrtimeToSeconds;
    }
});
const SECONDS_IN_MINUTE = 60;
const MINUTES_THRESHOLD_SECONDS = 120 // 2 minutes
;
const SECONDS_THRESHOLD_HIGH = 40;
const SECONDS_THRESHOLD_LOW = 2;
const MILLISECONDS_PER_SECOND = 1000;
// Time thresholds and conversion factors for nanoseconds
const NANOSECONDS_PER_SECOND = 1000000000;
const NANOSECONDS_PER_MILLISECOND = 1000000;
const NANOSECONDS_PER_MICROSECOND = 1000;
const NANOSECONDS_IN_MINUTE = 60000000000 // 60 * 1_000_000_000
;
const MINUTES_THRESHOLD_NANOSECONDS = 120000000000 // 2 minutes in nanoseconds
;
const SECONDS_THRESHOLD_HIGH_NANOSECONDS = 40000000000 // 40 seconds in nanoseconds
;
const SECONDS_THRESHOLD_LOW_NANOSECONDS = 2000000000 // 2 seconds in nanoseconds
;
const MILLISECONDS_THRESHOLD_NANOSECONDS = 2000000 // 2 milliseconds in nanoseconds
;
function durationToString(compilerDuration) {
    if (compilerDuration > MINUTES_THRESHOLD_SECONDS) {
        return `${(compilerDuration / SECONDS_IN_MINUTE).toFixed(1)}min`;
    } else if (compilerDuration > SECONDS_THRESHOLD_HIGH) {
        return `${compilerDuration.toFixed(0)}s`;
    } else if (compilerDuration > SECONDS_THRESHOLD_LOW) {
        return `${compilerDuration.toFixed(1)}s`;
    } else {
        return `${(compilerDuration * MILLISECONDS_PER_SECOND).toFixed(1)}ms`;
    }
}
/**
 * Converts a nanosecond duration to a human-readable string format.
 * Formats duration based on magnitude for optimal readability:
 * - >= 2 minutes: show in minutes with 1 decimal place (e.g., "2.5min")
 * - >= 40 seconds: show in whole seconds (e.g., "45s")
 * - >= 2 seconds: show in seconds with 1 decimal place (e.g., "3.2s")
 * - >= 2 milliseconds: show in whole milliseconds (e.g., "250ms")
 * - < 2 milliseconds: show in whole microseconds (e.g., "500µs")
 *
 * @param durationBigInt - Duration in nanoseconds as a BigInt
 * @returns Formatted duration string with appropriate unit and precision
 */ function durationToStringWithNanoseconds(durationBigInt) {
    const duration = Number(durationBigInt);
    if (duration >= MINUTES_THRESHOLD_NANOSECONDS) {
        return `${(duration / NANOSECONDS_IN_MINUTE).toFixed(1)}min`;
    } else if (duration >= SECONDS_THRESHOLD_HIGH_NANOSECONDS) {
        return `${(duration / NANOSECONDS_PER_SECOND).toFixed(0)}s`;
    } else if (duration >= SECONDS_THRESHOLD_LOW_NANOSECONDS) {
        return `${(duration / NANOSECONDS_PER_SECOND).toFixed(1)}s`;
    } else if (duration >= MILLISECONDS_THRESHOLD_NANOSECONDS) {
        return `${(duration / NANOSECONDS_PER_MILLISECOND).toFixed(0)}ms`;
    } else {
        return `${(duration / NANOSECONDS_PER_MICROSECOND).toFixed(0)}µs`;
    }
}
function hrtimeToSeconds(hrtime) {
    // hrtime is a tuple of [seconds, nanoseconds]
    return hrtime[0] + hrtime[1] / NANOSECONDS_PER_SECOND;
}
function hrtimeBigIntDurationToString(hrtime) {
    return durationToStringWithNanoseconds(hrtime);
}
function hrtimeDurationToString(hrtime) {
    return durationToString(hrtimeToSeconds(hrtime));
} //# sourceMappingURL=duration-to-string.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/sort-by-page-exts.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sortByPageExts", {
    enumerable: true,
    get: function() {
        return sortByPageExts;
    }
});
const _posix = (()=>{
    const e = new Error("Cannot find module 'path/posix'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
function sortByPageExts(pageExtensions) {
    return (a, b)=>{
        // prioritize entries according to pageExtensions order
        // for consistency as fs order can differ across systems
        // NOTE: this is reversed so preferred comes last and
        // overrides prior
        const aExt = (0, _posix.extname)(a);
        const bExt = (0, _posix.extname)(b);
        const aNoExt = a.substring(0, a.length - aExt.length);
        const bNoExt = b.substring(0, b.length - bExt.length);
        if (aNoExt !== bNoExt) return 0;
        // find extension index (skip '.' as pageExtensions doesn't have it)
        const aExtIndex = pageExtensions.indexOf(aExt.substring(1));
        const bExtIndex = pageExtensions.indexOf(bExt.substring(1));
        return bExtIndex - aExtIndex;
    };
} //# sourceMappingURL=sort-by-page-exts.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/lockfile.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Lockfile", {
    enumerable: true,
    get: function() {
        return Lockfile;
    }
});
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _swc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const RETRY_DELAY_MS = 10;
const MAX_RETRY_MS = 1000;
class Lockfile {
    constructor(bindings, nativeLockfile){
        this.bindings = bindings;
        this.nativeLockfile = nativeLockfile;
    }
    /**
   * Attempts to create or acquire an exclusive lockfile on disk. Lockfiles are
   * best-effort, depending on the platform.
   *
   * - If we fail to acquire the lock, we return `undefined`.
   * - If we're on wasm, this always returns a dummy `Lockfile` object.
   */ static tryAcquire(path, unlockOnExit = true) {
        const bindings = (0, _swc.getBindingsSync)();
        if (bindings.isWasm) {
            _log.info(`Skipping creating a lockfile at ${(0, _picocolors.cyan)(path)} because we're using WASM bindings`);
            return new Lockfile(bindings, undefined);
        } else {
            let nativeLockfile;
            try {
                nativeLockfile = bindings.lockfileTryAcquireSync(path);
            } catch (e) {
                // this happens if there's an IO error (e.g. `ENOENT`), which is
                // different than if we just didn't acquire the lock
                throw Object.defineProperty(new Error('An IO error occurred while attempting to create and acquire the lockfile', {
                    cause: e
                }), "__NEXT_ERROR_CODE", {
                    value: "E859",
                    enumerable: false,
                    configurable: true
                });
            }
            if (nativeLockfile != null) {
                const jsLockfile = new Lockfile(bindings, nativeLockfile);
                if (unlockOnExit) {
                    const exitListener = ()=>{
                        // Best-Effort: If we don't do this, the operating system will
                        // release the lock for us. This gives an opportunity to delete the
                        // unlocked lockfile (which is not otherwise deleted on POSIX).
                        //
                        // This must be synchronous because `process.on('exit', ...)` is
                        // synchronous.
                        jsLockfile.unlockSync();
                    };
                    __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].on('exit', exitListener);
                    jsLockfile.listener = exitListener;
                }
                return jsLockfile;
            } else {
                return undefined;
            }
        }
    }
    /**
   * Attempts to create or acquire a lockfile using `Lockfile.tryAcquire`. If
   * that returns `undefined`, indicating that another process or caller has the
   * lockfile, then this will output an error message and exit the process with
   * a non-zero exit code.
   *
   * This will retry a small number of times. This can be useful when running
   * processes in a loop, e.g. if cleanup isn't fully synchronous due to child
   * parent/processes.
   */ static async acquireWithRetriesOrExit(path, processName, unlockOnExit = true) {
        const startMs = Date.now();
        let lockfile;
        while(Date.now() - startMs < MAX_RETRY_MS){
            lockfile = Lockfile.tryAcquire(path, unlockOnExit);
            if (lockfile !== undefined) break;
            await new Promise((resolve)=>setTimeout(resolve, RETRY_DELAY_MS));
        }
        if (lockfile === undefined) {
            _log.error(`Unable to acquire lock at ${(0, _picocolors.cyan)(path)}, is another instance of ${(0, _picocolors.cyan)(processName)} running?`);
            _log.info(`${(0, _picocolors.bold)('Suggestion:')} If you intended to restart ${(0, _picocolors.cyan)(processName)}, terminate the other process, and then try again.`);
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(1);
        }
        return lockfile;
    }
    /**
   * Releases the lockfile and closes the file descriptor.
   *
   * If this is not called, the lock will be released by the operating system
   * when the file handle is closed during process exit.
   */ async unlock() {
        const { nativeLockfile, listener } = this;
        if (nativeLockfile !== undefined) {
            await this.bindings.lockfileUnlock(nativeLockfile);
        }
        if (listener !== undefined) {
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].off('exit', listener);
        }
    }
    /**
   * A blocking version of `unlock`.
   */ unlockSync() {
        const { nativeLockfile, listener } = this;
        if (nativeLockfile !== undefined) {
            this.bindings.lockfileUnlockSync(nativeLockfile);
        }
        if (listener !== undefined) {
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].off('exit', listener);
        }
    }
} //# sourceMappingURL=lockfile.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/analysis/extract-const-value.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NoSuchDeclarationError: null,
    UnsupportedValueError: null,
    extractExportedConstValue: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NoSuchDeclarationError: function() {
        return NoSuchDeclarationError;
    },
    UnsupportedValueError: function() {
        return UnsupportedValueError;
    },
    extractExportedConstValue: function() {
        return extractExportedConstValue;
    }
});
class NoSuchDeclarationError extends Error {
}
function isExportDeclaration(node) {
    return node.type === 'ExportDeclaration';
}
function isVariableDeclaration(node) {
    return node.type === 'VariableDeclaration';
}
function isIdentifier(node) {
    return node.type === 'Identifier';
}
function isBooleanLiteral(node) {
    return node.type === 'BooleanLiteral';
}
function isNullLiteral(node) {
    return node.type === 'NullLiteral';
}
function isStringLiteral(node) {
    return node.type === 'StringLiteral';
}
function isNumericLiteral(node) {
    return node.type === 'NumericLiteral';
}
function isArrayExpression(node) {
    return node.type === 'ArrayExpression';
}
function isObjectExpression(node) {
    return node.type === 'ObjectExpression';
}
function isKeyValueProperty(node) {
    return node.type === 'KeyValueProperty';
}
function isRegExpLiteral(node) {
    return node.type === 'RegExpLiteral';
}
function isTemplateLiteral(node) {
    return node.type === 'TemplateLiteral';
}
function isTsSatisfiesExpression(node) {
    return node.type === 'TsSatisfiesExpression';
}
class UnsupportedValueError extends Error {
    constructor(message, paths){
        super(message);
        // Generating "path" that looks like "config.runtime[0].value"
        let codePath;
        if (paths) {
            codePath = '';
            for (const path of paths){
                if (path[0] === '[') {
                    // "array" + "[0]"
                    codePath += path;
                } else {
                    if (codePath === '') {
                        codePath = path;
                    } else {
                        // "object" + ".key"
                        codePath += `.${path}`;
                    }
                }
            }
        }
        this.path = codePath;
    }
}
function extractValue(node, path) {
    if (isNullLiteral(node)) {
        return null;
    } else if (isBooleanLiteral(node)) {
        // e.g. true / false
        return node.value;
    } else if (isStringLiteral(node)) {
        // e.g. "abc"
        return node.value;
    } else if (isNumericLiteral(node)) {
        // e.g. 123
        return node.value;
    } else if (isRegExpLiteral(node)) {
        // e.g. /abc/i
        return new RegExp(node.pattern, node.flags);
    } else if (isIdentifier(node)) {
        switch(node.value){
            case 'undefined':
                return undefined;
            default:
                throw new UnsupportedValueError(`Unknown identifier "${node.value}"`, path);
        }
    } else if (isArrayExpression(node)) {
        // e.g. [1, 2, 3]
        const arr = [];
        for(let i = 0, len = node.elements.length; i < len; i++){
            const elem = node.elements[i];
            if (elem) {
                if (elem.spread) {
                    // e.g. [ ...a ]
                    throw new UnsupportedValueError('Unsupported spread operator in the Array Expression', path);
                }
                arr.push(extractValue(elem.expression, path && [
                    ...path,
                    `[${i}]`
                ]));
            } else {
                // e.g. [1, , 2]
                //         ^^
                arr.push(undefined);
            }
        }
        return arr;
    } else if (isObjectExpression(node)) {
        // e.g. { a: 1, b: 2 }
        const obj = {};
        for (const prop of node.properties){
            if (!isKeyValueProperty(prop)) {
                // e.g. { ...a }
                throw new UnsupportedValueError('Unsupported spread operator in the Object Expression', path);
            }
            let key;
            if (isIdentifier(prop.key)) {
                // e.g. { a: 1, b: 2 }
                key = prop.key.value;
            } else if (isStringLiteral(prop.key)) {
                // e.g. { "a": 1, "b": 2 }
                key = prop.key.value;
            } else {
                throw new UnsupportedValueError(`Unsupported key type "${prop.key.type}" in the Object Expression`, path);
            }
            obj[key] = extractValue(prop.value, path && [
                ...path,
                key
            ]);
        }
        return obj;
    } else if (isTemplateLiteral(node)) {
        // e.g. `abc`
        if (node.expressions.length !== 0) {
            // TODO: should we add support for `${'e'}d${'g'}'e'`?
            throw new UnsupportedValueError('Unsupported template literal with expressions', path);
        }
        // When TemplateLiteral has 0 expressions, the length of quasis is always 1.
        // Because when parsing TemplateLiteral, the parser yields the first quasi,
        // then the first expression, then the next quasi, then the next expression, etc.,
        // until the last quasi.
        // Thus if there is no expression, the parser ends at the frst and also last quasis
        //
        // A "cooked" interpretation where backslashes have special meaning, while a
        // "raw" interpretation where backslashes do not have special meaning
        // https://exploringjs.com/impatient-js/ch_template-literals.html#template-strings-cooked-vs-raw
        const [{ cooked, raw }] = node.quasis;
        return cooked ?? raw;
    } else if (isTsSatisfiesExpression(node)) {
        return extractValue(node.expression);
    } else {
        throw new UnsupportedValueError(`Unsupported node type "${node.type}"`, path);
    }
}
function extractExportedConstValue(module1, exportedName) {
    for (const moduleItem of module1.body){
        if (!isExportDeclaration(moduleItem)) {
            continue;
        }
        const declaration = moduleItem.declaration;
        if (!isVariableDeclaration(declaration)) {
            continue;
        }
        if (declaration.kind !== 'const') {
            continue;
        }
        for (const decl of declaration.declarations){
            if (isIdentifier(decl.id) && decl.id.value === exportedName && decl.init) {
                return extractValue(decl.init, [
                    exportedName
                ]);
            }
        }
    }
    throw new NoSuchDeclarationError();
} //# sourceMappingURL=extract-const-value.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/analysis/parse-module.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseModule", {
    enumerable: true,
    get: function() {
        return parseModule;
    }
});
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-client] (ecmascript)");
const _withpromisecache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/with-promise-cache.js [app-client] (ecmascript)");
const _crypto = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
const _swc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
const parseModule = (0, _withpromisecache.withPromiseCache)(new _lrucache.LRUCache(500), async (filename, content)=>(0, _swc.parse)(content, {
        isModule: 'unknown',
        filename
    }).catch(()=>null), (_, content)=>(0, _crypto.createHash)('sha1').update(content).digest('hex')); //# sourceMappingURL=parse-module.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/analysis/get-page-static-info.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getAppPageStaticInfo: null,
    getMiddlewareMatchers: null,
    getPageStaticInfo: null,
    getPagesPageStaticInfo: null,
    getRSCModuleInformation: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getAppPageStaticInfo: function() {
        return getAppPageStaticInfo;
    },
    getMiddlewareMatchers: function() {
        return getMiddlewareMatchers;
    },
    getPageStaticInfo: function() {
        return getPageStaticInfo;
    },
    getPagesPageStaticInfo: function() {
        return getPagesPageStaticInfo;
    },
    getRSCModuleInformation: function() {
        return getRSCModuleInformation;
    }
});
const _fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-client] (ecmascript)");
const _extractconstvalue = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/analysis/extract-const-value.js [app-client] (ecmascript)");
const _parsemodule = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/analysis/parse-module.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
const _trytoparsepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/try-to-parse-path.js [app-client] (ecmascript)");
const _isapiroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-api-route.js [app-client] (ecmascript)");
const _isedgeruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-edge-runtime.js [app-client] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _pagetypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/page-types.js [app-client] (ecmascript)");
const _appsegmentconfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/app-segment-config.js [app-client] (ecmascript)");
const _zod = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/zod.js [app-client] (ecmascript)");
const _pagessegmentconfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/pages/pages-segment-config.js [app-client] (ecmascript)");
const _middlewareconfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/middleware/middleware-config.js [app-client] (ecmascript)");
const _apppaths = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-client] (ecmascript)");
const _normalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const PARSE_PATTERN = /(?<!(_jsx|jsx-))runtime|preferredRegion|getStaticProps|getServerSideProps|generateStaticParams|export const|generateImageMetadata|generateSitemaps|middleware|proxy/;
const CLIENT_MODULE_LABEL = /\/\* __next_internal_client_entry_do_not_use__ ([^ ]*) (cjs|auto) \*\//;
const ACTION_MODULE_LABEL = /\/\* __next_internal_action_entry_do_not_use__ (\{[^}]+\}) \*\//;
const CLIENT_DIRECTIVE = 'use client';
const SERVER_ACTION_DIRECTIVE = 'use server';
function getRSCModuleInformation(source, isReactServerLayer) {
    const actionsJson = source.match(ACTION_MODULE_LABEL);
    const parsedActionsMeta = actionsJson ? JSON.parse(actionsJson[1]) : undefined;
    const clientInfoMatch = source.match(CLIENT_MODULE_LABEL);
    const isClientRef = !!clientInfoMatch;
    if (!isReactServerLayer) {
        return {
            type: _constants1.RSC_MODULE_TYPES.client,
            actionIds: parsedActionsMeta,
            isClientRef
        };
    }
    const clientRefsString = clientInfoMatch == null ? void 0 : clientInfoMatch[1];
    const clientRefs = clientRefsString ? clientRefsString.split(',') : [];
    const clientEntryType = clientInfoMatch == null ? void 0 : clientInfoMatch[2];
    const type = clientInfoMatch ? _constants1.RSC_MODULE_TYPES.client : _constants1.RSC_MODULE_TYPES.server;
    return {
        type,
        actionIds: parsedActionsMeta,
        clientRefs,
        clientEntryType,
        isClientRef
    };
}
/**
 * Receives a parsed AST from SWC and checks if it belongs to a module that
 * requires a runtime to be specified. Those are:
 *   - Modules with `export function getStaticProps | getServerSideProps`
 *   - Modules with `export { getStaticProps | getServerSideProps } <from ...>`
 *   - Modules with `export const runtime = ...`
 */ function checkExports(ast, expectedExports, page) {
    const exportsSet = new Set([
        'getStaticProps',
        'getServerSideProps',
        'generateImageMetadata',
        'generateSitemaps',
        'generateStaticParams'
    ]);
    if (!Array.isArray(ast == null ? void 0 : ast.body)) {
        return {};
    }
    try {
        let getStaticProps = false;
        let getServerSideProps = false;
        let generateImageMetadata = false;
        let generateSitemaps = false;
        let generateStaticParams = false;
        let exports1 = new Set();
        let directives = new Set();
        let hasLeadingNonDirectiveNode = false;
        for (const node of ast.body){
            var _node_declaration, _node_declaration1, _node_declaration_identifier, _node_declaration2;
            // There should be no non-string literals nodes before directives
            if (node.type === 'ExpressionStatement' && node.expression.type === 'StringLiteral') {
                if (!hasLeadingNonDirectiveNode) {
                    const directive = node.expression.value;
                    if (CLIENT_DIRECTIVE === directive) {
                        directives.add('client');
                    }
                    if (SERVER_ACTION_DIRECTIVE === directive) {
                        directives.add('server');
                    }
                }
            } else {
                hasLeadingNonDirectiveNode = true;
            }
            if (node.type === 'ExportDeclaration' && ((_node_declaration = node.declaration) == null ? void 0 : _node_declaration.type) === 'VariableDeclaration') {
                var _node_declaration3;
                for (const declaration of (_node_declaration3 = node.declaration) == null ? void 0 : _node_declaration3.declarations){
                    if (expectedExports.includes(declaration.id.value)) {
                        exports1.add(declaration.id.value);
                    }
                }
            }
            if (node.type === 'ExportDeclaration' && ((_node_declaration1 = node.declaration) == null ? void 0 : _node_declaration1.type) === 'FunctionDeclaration' && exportsSet.has((_node_declaration_identifier = node.declaration.identifier) == null ? void 0 : _node_declaration_identifier.value)) {
                const id = node.declaration.identifier.value;
                getServerSideProps = id === 'getServerSideProps';
                getStaticProps = id === 'getStaticProps';
                generateImageMetadata = id === 'generateImageMetadata';
                generateSitemaps = id === 'generateSitemaps';
                generateStaticParams = id === 'generateStaticParams';
            }
            if (node.type === 'ExportDeclaration' && ((_node_declaration2 = node.declaration) == null ? void 0 : _node_declaration2.type) === 'VariableDeclaration') {
                var _node_declaration_declarations_, _node_declaration4;
                const id = (_node_declaration4 = node.declaration) == null ? void 0 : (_node_declaration_declarations_ = _node_declaration4.declarations[0]) == null ? void 0 : _node_declaration_declarations_.id.value;
                if (exportsSet.has(id)) {
                    getServerSideProps = id === 'getServerSideProps';
                    getStaticProps = id === 'getStaticProps';
                    generateImageMetadata = id === 'generateImageMetadata';
                    generateSitemaps = id === 'generateSitemaps';
                    generateStaticParams = id === 'generateStaticParams';
                }
            }
            if (node.type === 'ExportNamedDeclaration') {
                for (const specifier of node.specifiers){
                    var _specifier_orig;
                    if (specifier.type === 'ExportSpecifier' && ((_specifier_orig = specifier.orig) == null ? void 0 : _specifier_orig.type) === 'Identifier') {
                        const value = specifier.orig.value;
                        if (!getServerSideProps && value === 'getServerSideProps') {
                            getServerSideProps = true;
                        }
                        if (!getStaticProps && value === 'getStaticProps') {
                            getStaticProps = true;
                        }
                        if (!generateImageMetadata && value === 'generateImageMetadata') {
                            generateImageMetadata = true;
                        }
                        if (!generateSitemaps && value === 'generateSitemaps') {
                            generateSitemaps = true;
                        }
                        if (!generateStaticParams && value === 'generateStaticParams') {
                            generateStaticParams = true;
                        }
                        if (expectedExports.includes(value) && !exports1.has(value)) {
                            // An export was found that was actually a re-export, and not a
                            // literal value. We should warn here.
                            _log.warn(`Next.js can't recognize the exported \`${value}\` field in "${page}", it may be re-exported from another file. The default config will be used instead.`);
                        }
                    }
                }
            }
        }
        return {
            getStaticProps,
            getServerSideProps,
            generateImageMetadata,
            generateSitemaps,
            generateStaticParams,
            directives,
            exports: exports1
        };
    } catch  {}
    return {};
}
function validateMiddlewareProxyExports({ ast, page, pageFilePath, isDev }) {
    // Check if this is middleware/proxy
    const isMiddleware = page === `/${_constants.MIDDLEWARE_FILENAME}` || page === `/src/${_constants.MIDDLEWARE_FILENAME}`;
    const isProxy = page === `/${_constants.PROXY_FILENAME}` || page === `/src/${_constants.PROXY_FILENAME}`;
    if (!isMiddleware && !isProxy) {
        return;
    }
    if (!ast || !Array.isArray(ast.body)) {
        return;
    }
    const fileName = isProxy ? _constants.PROXY_FILENAME : _constants.MIDDLEWARE_FILENAME;
    // Parse AST to get export info (since checkExports doesn't return middleware/proxy info)
    let hasDefaultExport = false;
    let hasMiddlewareExport = false;
    let hasProxyExport = false;
    for (const node of ast.body){
        var _node_declaration, _node_declaration1;
        if (node.type === 'ExportDefaultDeclaration' || node.type === 'ExportDefaultExpression') {
            hasDefaultExport = true;
        }
        if (node.type === 'ExportDeclaration' && ((_node_declaration = node.declaration) == null ? void 0 : _node_declaration.type) === 'FunctionDeclaration') {
            var _node_declaration_identifier;
            const id = (_node_declaration_identifier = node.declaration.identifier) == null ? void 0 : _node_declaration_identifier.value;
            if (id === 'middleware') {
                hasMiddlewareExport = true;
            }
            if (id === 'proxy') {
                hasProxyExport = true;
            }
        }
        if (node.type === 'ExportDeclaration' && ((_node_declaration1 = node.declaration) == null ? void 0 : _node_declaration1.type) === 'VariableDeclaration') {
            var _node_declaration_declarations_, _node_declaration2;
            const id = (_node_declaration2 = node.declaration) == null ? void 0 : (_node_declaration_declarations_ = _node_declaration2.declarations[0]) == null ? void 0 : _node_declaration_declarations_.id.value;
            if (id === 'middleware') {
                hasMiddlewareExport = true;
            }
            if (id === 'proxy') {
                hasProxyExport = true;
            }
        }
        if (node.type === 'ExportNamedDeclaration') {
            for (const specifier of node.specifiers){
                var _specifier_orig;
                if (specifier.type === 'ExportSpecifier' && ((_specifier_orig = specifier.orig) == null ? void 0 : _specifier_orig.type) === 'Identifier') {
                    // Use the exported name if it exists (for aliased exports like `export { foo as proxy }`),
                    // otherwise fall back to the original name (for simple re-exports like `export { proxy }`)
                    const exportedIdentifier = specifier.exported || specifier.orig;
                    const value = exportedIdentifier.value;
                    if (value === 'middleware') {
                        hasMiddlewareExport = true;
                    }
                    if (value === 'proxy') {
                        hasProxyExport = true;
                    }
                }
            }
        }
    }
    const hasValidExport = hasDefaultExport || isMiddleware && hasMiddlewareExport || isProxy && hasProxyExport;
    const relativePath = (0, _path.relative)(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), pageFilePath);
    const resolvedPath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
    if (!hasValidExport) {
        const message = `The file "${resolvedPath}" must export a function, either as a default export or as a named "${fileName}" export.\n` + `This function is what Next.js runs for every request handled by this ${fileName === 'proxy' ? 'proxy (previously called middleware)' : 'middleware'}.\n\n` + `Why this happens:\n` + (isProxy ? "- You are migrating from `middleware` to `proxy`, but haven't updated the exported function.\n" : '') + `- The file exists but doesn't export a function.\n` + `- The export is not a function (e.g., an object or constant).\n` + `- There's a syntax error preventing the export from being recognized.\n\n` + `To fix it:\n` + `- Ensure this file has either a default or "${fileName}" function export.\n\n` + `Learn more: https://nextjs.org/docs/messages/middleware-to-proxy`;
        if (isDev) {
            // errorOnce as proxy/middleware runs per request including multiple
            // internal _next/ routes and spams logs.
            _log.errorOnce(message);
        } else {
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
}
async function tryToReadFile(filePath, shouldThrow) {
    try {
        return await _fs.promises.readFile(filePath, {
            encoding: 'utf8'
        });
    } catch (error) {
        if (shouldThrow) {
            error.message = `Next.js ERROR: Failed to read file ${filePath}:\n${error.message}`;
            throw error;
        }
    }
}
function getMiddlewareMatchers(matcherOrMatchers, nextConfig) {
    const matchers = Array.isArray(matcherOrMatchers) ? matcherOrMatchers : [
        matcherOrMatchers
    ];
    const { i18n } = nextConfig;
    return matchers.map((matcher)=>{
        matcher = typeof matcher === 'string' ? {
            source: matcher
        } : matcher;
        const originalSource = matcher.source;
        let { source, ...rest } = matcher;
        const isRoot = source === '/';
        if ((i18n == null ? void 0 : i18n.locales) && matcher.locale !== false) {
            source = `/:nextInternalLocale((?!_next/)[^/.]{1,})${isRoot ? '' : source}`;
        }
        source = `/:nextData(_next/data/[^/]{1,})?${source}${isRoot ? `(${nextConfig.i18n ? '|\\.json|' : ''}/?index|/?index\\.json)?` : '{(\\.json)}?'}`;
        if (nextConfig.basePath) {
            source = `${nextConfig.basePath}${source}`;
        }
        // Validate that the source is still.
        const result = _middlewareconfig.SourceSchema.safeParse(source);
        if (!result.success) {
            (0, _zod.reportZodError)('Failed to parse middleware source', result.error);
            // We need to exit here because middleware being built occurs before we
            // finish setting up the server. Exiting here is the only way to ensure
            // that we don't hang.
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(1);
        }
        return {
            ...rest,
            // We know that parsed.regexStr is not undefined because we already
            // checked that the source is valid.
            regexp: (0, _trytoparsepath.tryToParsePath)(result.data).regexStr,
            originalSource: originalSource || source
        };
    });
}
function parseMiddlewareConfig(page, rawConfig, nextConfig) {
    // If there's no config to parse, then return nothing.
    if (typeof rawConfig !== 'object' || !rawConfig) return {};
    const input = _middlewareconfig.MiddlewareConfigInputSchema.safeParse(rawConfig);
    if (!input.success) {
        (0, _zod.reportZodError)(`${page} contains invalid middleware config`, input.error);
        // We need to exit here because middleware being built occurs before we
        // finish setting up the server. Exiting here is the only way to ensure
        // that we don't hang.
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(1);
    }
    const config = {};
    if (input.data.matcher) {
        config.matchers = getMiddlewareMatchers(input.data.matcher, nextConfig);
    }
    if (input.data.unstable_allowDynamic) {
        config.unstable_allowDynamic = Array.isArray(input.data.unstable_allowDynamic) ? input.data.unstable_allowDynamic : [
            input.data.unstable_allowDynamic
        ];
    }
    if (input.data.regions) {
        config.regions = input.data.regions;
    }
    return config;
}
const apiRouteWarnings = new _lrucache.LRUCache(250);
function warnAboutExperimentalEdge(apiRoute) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (apiRoute && apiRouteWarnings.has(apiRoute)) {
        return;
    }
    _log.warn(apiRoute ? `${apiRoute} provided runtime 'experimental-edge'. It can be updated to 'edge' instead.` : `You are using an experimental edge runtime, the API might change.`);
    if (apiRoute) {
        apiRouteWarnings.set(apiRoute, 1);
    }
}
let hadUnsupportedValue = false;
const warnedUnsupportedValueMap = new _lrucache.LRUCache(250, ()=>1);
function warnAboutUnsupportedValue(pageFilePath, page, error) {
    hadUnsupportedValue = true;
    const isProductionBuild = ("TURBOPACK compile-time value", "development") === 'production';
    if (// duplicated due to webpack build worker having fresh
    // module scope for each compiler
    __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_COMPILER_NAME !== 'server' || isProductionBuild && warnedUnsupportedValueMap.has(pageFilePath)) {
        return;
    }
    warnedUnsupportedValueMap.set(pageFilePath, true);
    const message = `Next.js can't recognize the exported \`config\` field in ` + (page ? `route "${page}"` : `"${pageFilePath}"`) + ':\n' + error.message + (error.path ? ` at "${error.path}"` : '') + '.\n' + 'Read More - https://nextjs.org/docs/messages/invalid-page-config';
    // for a build we use `Log.error` instead of throwing
    // so that all errors can be logged before exiting the process
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
}
async function getAppPageStaticInfo({ pageFilePath, nextConfig, isDev, page }) {
    const content = await tryToReadFile(pageFilePath, !isDev);
    if (!content || !PARSE_PATTERN.test(content)) {
        return {
            type: _pagetypes.PAGE_TYPES.APP,
            config: undefined,
            runtime: undefined,
            preferredRegion: undefined,
            maxDuration: undefined,
            hadUnsupportedValue: false
        };
    }
    const ast = await (0, _parsemodule.parseModule)(pageFilePath, content);
    validateMiddlewareProxyExports({
        ast,
        page,
        pageFilePath,
        isDev
    });
    const { generateStaticParams, generateImageMetadata, generateSitemaps, exports: exports1, directives } = checkExports(ast, _appsegmentconfig.AppSegmentConfigSchemaKeys, page);
    const { type: rsc } = getRSCModuleInformation(content, true);
    const exportedConfig = {};
    if (exports1) {
        for (const property of exports1){
            try {
                exportedConfig[property] = (0, _extractconstvalue.extractExportedConstValue)(ast, property);
            } catch (e) {
                if (e instanceof _extractconstvalue.UnsupportedValueError) {
                    warnAboutUnsupportedValue(pageFilePath, page, e);
                }
            }
        }
    }
    try {
        exportedConfig.config = (0, _extractconstvalue.extractExportedConstValue)(ast, 'config');
    } catch (e) {
        if (e instanceof _extractconstvalue.UnsupportedValueError) {
            warnAboutUnsupportedValue(pageFilePath, page, e);
        }
    // `export config` doesn't exist, or other unknown error thrown by swc, silence them
    }
    const route = (0, _apppaths.normalizeAppPath)(page);
    const config = (0, _appsegmentconfig.parseAppSegmentConfig)(exportedConfig, route);
    // Prevent edge runtime and generateStaticParams in the same file.
    if ((0, _isedgeruntime.isEdgeRuntime)(config.runtime) && generateStaticParams) {
        throw Object.defineProperty(new Error(`Page "${page}" cannot use both \`export const runtime = 'edge'\` and export \`generateStaticParams\`.`), "__NEXT_ERROR_CODE", {
            value: "E42",
            enumerable: false,
            configurable: true
        });
    }
    // Prevent use client and generateStaticParams in the same file.
    if ((directives == null ? void 0 : directives.has('client')) && generateStaticParams) {
        throw Object.defineProperty(new Error(`Page "${page}" cannot use both "use client" and export function "generateStaticParams()".`), "__NEXT_ERROR_CODE", {
            value: "E475",
            enumerable: false,
            configurable: true
        });
    }
    if ('unstable_prefetch' in config && !nextConfig.cacheComponents) {
        throw Object.defineProperty(new Error(`Page "${page}" cannot use \`export const unstable_prefetch = ...\` without enabling \`cacheComponents\`.`), "__NEXT_ERROR_CODE", {
            value: "E905",
            enumerable: false,
            configurable: true
        });
    }
    return {
        type: _pagetypes.PAGE_TYPES.APP,
        rsc,
        generateImageMetadata,
        generateSitemaps,
        generateStaticParams,
        config,
        middleware: parseMiddlewareConfig(page, exportedConfig.config, nextConfig),
        runtime: config.runtime,
        preferredRegion: config.preferredRegion,
        maxDuration: config.maxDuration,
        hadUnsupportedValue
    };
}
async function getPagesPageStaticInfo({ pageFilePath, nextConfig, isDev, page }) {
    var _config_config, _config_config1, _config_config2;
    const content = await tryToReadFile(pageFilePath, !isDev);
    if (!content || !PARSE_PATTERN.test(content)) {
        return {
            type: _pagetypes.PAGE_TYPES.PAGES,
            config: undefined,
            runtime: undefined,
            preferredRegion: undefined,
            maxDuration: undefined,
            hadUnsupportedValue: false
        };
    }
    const ast = await (0, _parsemodule.parseModule)(pageFilePath, content);
    validateMiddlewareProxyExports({
        ast,
        page,
        pageFilePath,
        isDev
    });
    const { getServerSideProps, getStaticProps, exports: exports1 } = checkExports(ast, _pagessegmentconfig.PagesSegmentConfigSchemaKeys, page);
    const { type: rsc } = getRSCModuleInformation(content, true);
    const exportedConfig = {};
    if (exports1) {
        for (const property of exports1){
            try {
                exportedConfig[property] = (0, _extractconstvalue.extractExportedConstValue)(ast, property);
            } catch (e) {
                if (e instanceof _extractconstvalue.UnsupportedValueError) {
                    warnAboutUnsupportedValue(pageFilePath, page, e);
                }
            }
        }
    }
    try {
        exportedConfig.config = (0, _extractconstvalue.extractExportedConstValue)(ast, 'config');
    } catch (e) {
        if (e instanceof _extractconstvalue.UnsupportedValueError) {
            warnAboutUnsupportedValue(pageFilePath, page, e);
        }
    // `export config` doesn't exist, or other unknown error thrown by swc, silence them
    }
    // Validate the config.
    const route = (0, _normalizepagepath.normalizePagePath)(page);
    const config = (0, _pagessegmentconfig.parsePagesSegmentConfig)(exportedConfig, route);
    const isAnAPIRoute = (0, _isapiroute.isAPIRoute)(route);
    let resolvedRuntime = config.runtime ?? ((_config_config = config.config) == null ? void 0 : _config_config.runtime);
    if ((0, _utils.isProxyFile)(page) && resolvedRuntime) {
        const relativePath = (0, _path.relative)(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), pageFilePath);
        const resolvedPath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
        const message = `Route segment config is not allowed in Proxy file at "${resolvedPath}". Proxy always runs on Node.js runtime. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy`;
        if (isDev) {
            // errorOnce as proxy/middleware runs per request including multiple
            // internal _next/ routes and spams logs.
            _log.errorOnce(message);
            resolvedRuntime = _constants.SERVER_RUNTIME.nodejs;
        } else {
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    if (resolvedRuntime === _constants.SERVER_RUNTIME.experimentalEdge) {
        warnAboutExperimentalEdge(isAnAPIRoute ? page : null);
    }
    if (!(0, _utils.isProxyFile)(page) && resolvedRuntime === _constants.SERVER_RUNTIME.edge && page && !isAnAPIRoute) {
        const message = `Page ${page} provided runtime 'edge', the edge runtime for rendering is currently experimental. Use runtime 'experimental-edge' instead.`;
        if (isDev) {
            _log.error(message);
        } else {
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    return {
        type: _pagetypes.PAGE_TYPES.PAGES,
        getStaticProps,
        getServerSideProps,
        rsc,
        config,
        middleware: parseMiddlewareConfig(page, exportedConfig.config, nextConfig),
        runtime: resolvedRuntime,
        preferredRegion: (_config_config1 = config.config) == null ? void 0 : _config_config1.regions,
        maxDuration: config.maxDuration ?? ((_config_config2 = config.config) == null ? void 0 : _config_config2.maxDuration),
        hadUnsupportedValue
    };
}
async function getPageStaticInfo(params) {
    if (params.pageType === _pagetypes.PAGE_TYPES.APP) {
        return getAppPageStaticInfo(params);
    }
    return getPagesPageStaticInfo(params);
} //# sourceMappingURL=get-page-static-info.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/load-entrypoint.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loadEntrypoint", {
    enumerable: true,
    get: function() {
        return loadEntrypoint;
    }
});
const _promises = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs/promises'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _swc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// NOTE: this should be updated if this loader file is moved.
const PACKAGE_ROOT = _path.default.normalize(_path.default.join(("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/next/dist/build"), '../..'));
const TEMPLATE_SRC_FOLDER = _path.default.normalize(_path.default.join(("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/next/dist/build"), './templates'));
const TEMPLATES_ESM_FOLDER = _path.default.normalize(_path.default.join(("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/next/dist/build"), '../../dist/esm/build/templates'));
async function loadEntrypoint(entrypoint, replacements, injections, imports) {
    const templatePath = _path.default.resolve(_path.default.join(TEMPLATES_ESM_FOLDER, `${entrypoint}.js`));
    let content = await _promises.default.readFile(templatePath);
    return (0, _swc.getBindingsSync)().expandNextJsTemplate(content, _path.default.join(TEMPLATE_SRC_FOLDER, `${entrypoint}.js`).replace(/\\/g, '/'), PACKAGE_ROOT.replace(/\\/g, '/'), replacements, injections ?? {}, imports ?? {});
} //# sourceMappingURL=load-entrypoint.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/get-static-info-including-layouts.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getStaticInfoIncludingLayouts", {
    enumerable: true,
    get: function() {
        return getStaticInfoIncludingLayouts;
    }
});
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _fs = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _getpagestaticinfo = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/analysis/get-page-static-info.js [app-client] (ecmascript)");
const _pagetypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/page-types.js [app-client] (ecmascript)");
const _isapppageroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-app-page-route.js [app-client] (ecmascript)");
const _entryconstants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/entry-constants.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function getStaticInfoIncludingLayouts({ isInsideAppDir, pageExtensions, pageFilePath, appDir, config: nextConfig, isDev, page }) {
    // TODO: sync types for pages: PAGE_TYPES, ROUTER_TYPE, 'app' | 'pages', etc.
    const pageType = isInsideAppDir ? _pagetypes.PAGE_TYPES.APP : _pagetypes.PAGE_TYPES.PAGES;
    const pageStaticInfo = await (0, _getpagestaticinfo.getPageStaticInfo)({
        nextConfig,
        pageFilePath,
        isDev,
        page,
        pageType
    });
    if (pageStaticInfo.type === _pagetypes.PAGE_TYPES.PAGES || !appDir) {
        return pageStaticInfo;
    }
    // Skip inheritance for global-error pages - always use default config
    if (page === _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY) {
        return pageStaticInfo;
    }
    const segments = [
        pageStaticInfo
    ];
    // inherit from layout files only if it's a page route and not a builtin page
    if ((0, _isapppageroute.isAppPageRoute)(page) && !(0, _utils.isAppBuiltinPage)(pageFilePath)) {
        const layoutFiles = [];
        const potentialLayoutFiles = pageExtensions.map((ext)=>'layout.' + ext);
        let dir = (0, _path.dirname)(pageFilePath);
        // Uses startsWith to not include directories further up.
        while(dir.startsWith(appDir)){
            for (const potentialLayoutFile of potentialLayoutFiles){
                const layoutFile = (0, _path.join)(dir, potentialLayoutFile);
                if (!_fs.default.existsSync(layoutFile)) {
                    continue;
                }
                layoutFiles.push(layoutFile);
            }
            // Walk up the directory tree
            dir = (0, _path.join)(dir, '..');
        }
        for (const layoutFile of layoutFiles){
            const layoutStaticInfo = await (0, _getpagestaticinfo.getAppPageStaticInfo)({
                nextConfig,
                pageFilePath: layoutFile,
                isDev,
                page,
                pageType: isInsideAppDir ? _pagetypes.PAGE_TYPES.APP : _pagetypes.PAGE_TYPES.PAGES
            });
            segments.unshift(layoutStaticInfo);
        }
    }
    const config = (0, _utils.reduceAppConfig)(segments);
    return {
        ...pageStaticInfo,
        config,
        runtime: config.runtime,
        preferredRegion: config.preferredRegion,
        maxDuration: config.maxDuration
    };
} //# sourceMappingURL=get-static-info-including-layouts.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/entries.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    collectAppFiles: null,
    collectPagesFiles: null,
    combineSlots: null,
    createEntrypoints: null,
    createPagesMapping: null,
    createRelativeFilePath: null,
    extractSlotsFromAppRoutes: null,
    extractSlotsFromDefaultFiles: null,
    finalizeEntrypoint: null,
    getAppEntry: null,
    getAppLoader: null,
    getClientEntry: null,
    getEdgeServerEntry: null,
    getInstrumentationEntry: null,
    getPageFilePath: null,
    getPageFromPath: null,
    processAppRoutes: null,
    processLayoutRoutes: null,
    processPageRoutes: null,
    runDependingOnPageType: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    collectAppFiles: function() {
        return collectAppFiles;
    },
    collectPagesFiles: function() {
        return collectPagesFiles;
    },
    combineSlots: function() {
        return combineSlots;
    },
    createEntrypoints: function() {
        return createEntrypoints;
    },
    createPagesMapping: function() {
        return createPagesMapping;
    },
    createRelativeFilePath: function() {
        return createRelativeFilePath;
    },
    extractSlotsFromAppRoutes: function() {
        return extractSlotsFromAppRoutes;
    },
    extractSlotsFromDefaultFiles: function() {
        return extractSlotsFromDefaultFiles;
    },
    finalizeEntrypoint: function() {
        return finalizeEntrypoint;
    },
    getAppEntry: function() {
        return getAppEntry;
    },
    getAppLoader: function() {
        return getAppLoader;
    },
    getClientEntry: function() {
        return getClientEntry;
    },
    getEdgeServerEntry: function() {
        return getEdgeServerEntry;
    },
    getInstrumentationEntry: function() {
        return getInstrumentationEntry;
    },
    getPageFilePath: function() {
        return getPageFilePath;
    },
    getPageFromPath: function() {
        return getPageFromPath;
    },
    processAppRoutes: function() {
        return processAppRoutes;
    },
    processLayoutRoutes: function() {
        return processLayoutRoutes;
    },
    processPageRoutes: function() {
        return processPageRoutes;
    },
    runDependingOnPageType: function() {
        return runDependingOnPageType;
    }
});
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _querystring = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/querystring-es3/index.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
const _isapiroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-api-route.js [app-client] (ecmascript)");
const _isedgeruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-edge-runtime.js [app-client] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _getpagestaticinfo = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/analysis/get-page-static-info.js [app-client] (ecmascript)");
const _normalizepathsep = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [app-client] (ecmascript)");
const _normalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js [app-client] (ecmascript)");
const _apppaths = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-client] (ecmascript)");
const _nextmiddlewareloader = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js [app-client] (ecmascript)");
const _isapprouteroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-app-route-route.js [app-client] (ecmascript)");
const _getmetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-client] (ecmascript)");
const _nextrouteloader = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js [app-client] (ecmascript)");
const _isinternalcomponent = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-internal-component.js [app-client] (ecmascript)");
const _ismetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/is-metadata-route.js [app-client] (ecmascript)");
const _routekind = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-kind.js [app-client] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/loaders/utils.js [app-client] (ecmascript)");
const _normalizecatchallroutes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/normalize-catchall-routes.js [app-client] (ecmascript)");
const _pagetypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/page-types.js [app-client] (ecmascript)");
const _recursivereaddir = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/recursive-readdir.js [app-client] (ecmascript)");
const _segment = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)");
const _ensureleadingslash = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js [app-client] (ecmascript)");
const _entryconstants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/entry-constants.js [app-client] (ecmascript)");
const _getstaticinfoincludinglayouts = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/get-static-info-including-layouts.js [app-client] (ecmascript)");
async function collectAppFiles(appDir, validFileMatcher) {
    // Collect app pages, layouts, and default files in a single directory traversal
    const allAppFiles = await (0, _recursivereaddir.recursiveReadDir)(appDir, {
        pathnameFilter: (absolutePath)=>validFileMatcher.isAppRouterPage(absolutePath) || validFileMatcher.isRootNotFound(absolutePath) || validFileMatcher.isAppLayoutPage(absolutePath) || validFileMatcher.isAppDefaultPage(absolutePath),
        ignorePartFilter: (part)=>part.startsWith('_')
    });
    // Separate app pages, layouts, and defaults
    const appPaths = allAppFiles.filter((absolutePath)=>validFileMatcher.isAppRouterPage(absolutePath) || validFileMatcher.isRootNotFound(absolutePath));
    const layoutPaths = allAppFiles.filter((absolutePath)=>validFileMatcher.isAppLayoutPage(absolutePath));
    const defaultPaths = allAppFiles.filter((absolutePath)=>validFileMatcher.isAppDefaultPage(absolutePath));
    return {
        appPaths,
        layoutPaths,
        defaultPaths
    };
}
async function collectPagesFiles(pagesDir, validFileMatcher) {
    return (0, _recursivereaddir.recursiveReadDir)(pagesDir, {
        pathnameFilter: validFileMatcher.isPageFile
    });
}
function createRelativeFilePath(baseDir, filePath, prefix, isSrcDir) {
    const privatePrefix = prefix === 'pages' ? 'private-next-pages' : 'private-next-app-dir';
    const srcPrefix = isSrcDir ? 'src/' : '';
    return (0, _path.join)(baseDir, filePath.replace(new RegExp(`^${privatePrefix}/`), `${srcPrefix}${prefix}/`));
}
function processPageRoutes(mappedPages, baseDir, isSrcDir) {
    const pageRoutes = [];
    const pageApiRoutes = [];
    for (const [route, filePath] of Object.entries(mappedPages)){
        const relativeFilePath = createRelativeFilePath(baseDir, filePath, 'pages', isSrcDir);
        if (route.startsWith('/api/')) {
            pageApiRoutes.push({
                route: (0, _normalizepathsep.normalizePathSep)(route),
                filePath: relativeFilePath
            });
        } else {
            // Filter out _app, _error, _document
            if ((0, _utils.isReservedPage)(route)) continue;
            pageRoutes.push({
                route: (0, _normalizepathsep.normalizePathSep)(route),
                filePath: relativeFilePath
            });
        }
    }
    return {
        pageRoutes,
        pageApiRoutes
    };
}
function extractSlotsFromAppRoutes(mappedAppPages) {
    const slots = [];
    for (const [page] of Object.entries(mappedAppPages)){
        if (page === _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY || page === _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY) {
            continue;
        }
        const segments = page.split('/');
        for(let i = segments.length - 1; i >= 0; i--){
            const segment = segments[i];
            if ((0, _segment.isParallelRouteSegment)(segment)) {
                const parentPath = (0, _apppaths.normalizeAppPath)(segments.slice(0, i).join('/'));
                const slotName = segment.slice(1);
                // Check if the slot already exists
                if (slots.some((s)=>s.name === slotName && s.parent === parentPath)) continue;
                slots.push({
                    name: slotName,
                    parent: parentPath
                });
                break;
            }
        }
    }
    return slots;
}
function extractSlotsFromDefaultFiles(mappedDefaultFiles) {
    const slots = [];
    for (const [route] of Object.entries(mappedDefaultFiles)){
        const segments = route.split('/');
        for(let i = segments.length - 1; i >= 0; i--){
            const segment = segments[i];
            if ((0, _segment.isParallelRouteSegment)(segment)) {
                const parentPath = (0, _apppaths.normalizeAppPath)(segments.slice(0, i).join('/'));
                const slotName = segment.slice(1);
                // Check if the slot already exists
                if (slots.some((s)=>s.name === slotName && s.parent === parentPath)) continue;
                slots.push({
                    name: slotName,
                    parent: parentPath
                });
                break;
            }
        }
    }
    return slots;
}
function combineSlots(...slotArrays) {
    const slotSet = new Set();
    const result = [];
    for (const slots of slotArrays){
        for (const slot of slots){
            const key = `${slot.name}:${slot.parent}`;
            if (!slotSet.has(key)) {
                slotSet.add(key);
                result.push(slot);
            }
        }
    }
    return result;
}
function processAppRoutes(mappedAppPages, validFileMatcher, baseDir, isSrcDir) {
    const appRoutes = [];
    const appRouteHandlers = [];
    for (const [page, filePath] of Object.entries(mappedAppPages)){
        if (page === _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY || page === _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY) {
            continue;
        }
        const relativeFilePath = createRelativeFilePath(baseDir, filePath, 'app', isSrcDir);
        if (validFileMatcher.isAppRouterRoute(filePath)) {
            appRouteHandlers.push({
                route: (0, _apppaths.normalizeAppPath)((0, _normalizepathsep.normalizePathSep)(page)),
                filePath: relativeFilePath
            });
        } else {
            appRoutes.push({
                route: (0, _apppaths.normalizeAppPath)((0, _normalizepathsep.normalizePathSep)(page)),
                filePath: relativeFilePath
            });
        }
    }
    return {
        appRoutes,
        appRouteHandlers
    };
}
function processLayoutRoutes(mappedAppLayouts, baseDir, isSrcDir) {
    const layoutRoutes = [];
    for (const [route, filePath] of Object.entries(mappedAppLayouts)){
        const relativeFilePath = createRelativeFilePath(baseDir, filePath, 'app', isSrcDir);
        layoutRoutes.push({
            route: (0, _ensureleadingslash.ensureLeadingSlash)((0, _apppaths.normalizeAppPath)((0, _normalizepathsep.normalizePathSep)(route)).replace(/\/layout$/, '')),
            filePath: relativeFilePath
        });
    }
    return layoutRoutes;
}
function getPageFromPath(pagePath, pageExtensions) {
    let page = (0, _normalizepathsep.normalizePathSep)(pagePath.replace(new RegExp(`\\.+(${pageExtensions.join('|')})$`), ''));
    page = page.replace(/\/index$/, '');
    return page === '' ? '/' : page;
}
function getPageFilePath({ absolutePagePath, pagesDir, appDir, rootDir }) {
    if (absolutePagePath.startsWith(_constants.PAGES_DIR_ALIAS) && pagesDir) {
        return absolutePagePath.replace(_constants.PAGES_DIR_ALIAS, pagesDir);
    }
    if (absolutePagePath.startsWith(_constants.APP_DIR_ALIAS) && appDir) {
        return absolutePagePath.replace(_constants.APP_DIR_ALIAS, appDir);
    }
    if (absolutePagePath.startsWith(_constants.ROOT_DIR_ALIAS)) {
        return absolutePagePath.replace(_constants.ROOT_DIR_ALIAS, rootDir);
    }
    return (()=>{
        const e = new Error("Cannot find module as expression is too dynamic");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
}
async function createPagesMapping({ isDev, pageExtensions, pagePaths, pagesType, pagesDir, appDir, appDirOnly }) {
    const isAppRoute = pagesType === 'app';
    const pages = {};
    const promises = pagePaths.map(async (pagePath)=>{
        // Do not process .d.ts files as routes
        if (pagePath.endsWith('.d.ts') && pageExtensions.includes('ts')) {
            return;
        }
        let pageKey = getPageFromPath(pagePath, pageExtensions);
        if (isAppRoute) {
            pageKey = pageKey.replace(/%5F/g, '_');
            if (pageKey === _constants1.UNDERSCORE_NOT_FOUND_ROUTE) {
                pageKey = _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY;
            }
            if (pageKey === _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE) {
                pageKey = _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY;
            }
        }
        const normalizedPath = (0, _normalizepathsep.normalizePathSep)((0, _path.join)(pagesType === 'pages' ? _constants.PAGES_DIR_ALIAS : pagesType === 'app' ? _constants.APP_DIR_ALIAS : _constants.ROOT_DIR_ALIAS, pagePath));
        let route = pagesType === 'app' ? (0, _getmetadataroute.normalizeMetadataRoute)(pageKey) : pageKey;
        if (pagesType === 'app' && (0, _ismetadataroute.isMetadataRouteFile)(pagePath, pageExtensions, true)) {
            const filePath = (0, _path.join)(appDir, pagePath);
            const staticInfo = await (0, _getpagestaticinfo.getPageStaticInfo)({
                nextConfig: {},
                pageFilePath: filePath,
                isDev,
                page: pageKey,
                pageType: pagesType
            });
            route = (0, _getmetadataroute.normalizeMetadataPageToRoute)(route, !!(staticInfo.generateImageMetadata || staticInfo.generateSitemaps));
        }
        pages[route] = normalizedPath;
    });
    await Promise.all(promises);
    switch(pagesType){
        case _pagetypes.PAGE_TYPES.ROOT:
            {
                return pages;
            }
        case _pagetypes.PAGE_TYPES.APP:
            {
                const hasAppPages = Object.keys(pages).length > 0;
                // Whether to emit App router 500.html entry, which only presents in production and only app router presents
                const hasAppGlobalError = !isDev && appDirOnly;
                return {
                    // If there's any app pages existed, add a default /_not-found route as 404.
                    // If there's any custom /_not-found page, it will override the default one.
                    ...hasAppPages && {
                        [_entryconstants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY]: "[project]/JobPortal/frontend/node_modules/next/dist/client/components/builtin/global-not-found.js [app-client] (ecmascript)"
                    },
                    ...hasAppGlobalError && {
                        [_entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY]: "[project]/JobPortal/frontend/node_modules/next/dist/client/components/builtin/app-error.js [app-client] (ecmascript)"
                    },
                    ...pages
                };
            }
        case _pagetypes.PAGE_TYPES.PAGES:
            {
                if (isDev) {
                    delete pages['/_app'];
                    delete pages['/_error'];
                    delete pages['/_document'];
                }
                // In development we always alias these to allow Webpack to fallback to
                // the correct source file so that HMR can work properly when a file is
                // added or removed.
                const root = isDev && pagesDir ? _constants.PAGES_DIR_ALIAS : 'next/dist/pages';
                // If there are no user pages routes, treat this as app-dir-only mode.
                // The pages/ folder could be present and the initial appDirOnly is treated as false, but no valid routes are found.
                if (Object.keys(pages).length === 0 && !appDirOnly) {
                    appDirOnly = true;
                }
                return {
                    // Don't add default pages entries if this is an app-router-only build
                    ...(isDev || !appDirOnly) && {
                        '/_app': `${root}/_app`,
                        '/_error': `${root}/_error`,
                        '/_document': `${root}/_document`,
                        ...pages
                    }
                };
            }
        default:
            {
                return {};
            }
    }
}
function getEdgeServerEntry(opts) {
    var _opts_config_experimental_sri;
    if (opts.pagesType === 'app' && (0, _isapprouteroute.isAppRouteRoute)(opts.page) && opts.appDirLoader) {
        const loaderParams = {
            absolutePagePath: opts.absolutePagePath,
            page: opts.page,
            appDirLoader: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(opts.appDirLoader || '').toString('base64'),
            nextConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(opts.config)).toString('base64'),
            preferredRegion: opts.preferredRegion,
            middlewareConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(opts.middlewareConfig || {})).toString('base64'),
            cacheHandlers: JSON.stringify(opts.config.cacheHandlers || {})
        };
        return {
            import: `next-edge-app-route-loader?${(0, _querystring.stringify)(loaderParams)}!`,
            layer: _constants.WEBPACK_LAYERS.reactServerComponents
        };
    }
    if ((0, _utils.isMiddlewareFile)(opts.page)) {
        var _opts_middleware;
        const loaderParams = {
            absolutePagePath: opts.absolutePagePath,
            page: opts.page,
            rootDir: opts.rootDir,
            matchers: ((_opts_middleware = opts.middleware) == null ? void 0 : _opts_middleware.matchers) ? (0, _nextmiddlewareloader.encodeMatchers)(opts.middleware.matchers) : '',
            preferredRegion: opts.preferredRegion,
            middlewareConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(opts.middlewareConfig || {})).toString('base64')
        };
        return {
            import: `next-middleware-loader?${(0, _querystring.stringify)(loaderParams)}!`,
            layer: _constants.WEBPACK_LAYERS.middleware,
            filename: opts.isDev ? 'middleware.js' : undefined
        };
    }
    if ((0, _isapiroute.isAPIRoute)(opts.page)) {
        const loaderParams = {
            absolutePagePath: opts.absolutePagePath,
            page: opts.page,
            rootDir: opts.rootDir,
            preferredRegion: opts.preferredRegion,
            middlewareConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(opts.middlewareConfig || {})).toString('base64')
        };
        return {
            import: `next-edge-function-loader?${(0, _querystring.stringify)(loaderParams)}!`,
            layer: _constants.WEBPACK_LAYERS.apiEdge
        };
    }
    const loaderParams = {
        absolute500Path: opts.pages['/500'] || '',
        absoluteAppPath: opts.pages['/_app'],
        absoluteDocumentPath: opts.pages['/_document'],
        absoluteErrorPath: opts.pages['/_error'],
        absolutePagePath: opts.absolutePagePath,
        dev: opts.isDev,
        isServerComponent: opts.isServerComponent,
        page: opts.page,
        stringifiedConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(opts.config)).toString('base64'),
        pagesType: opts.pagesType,
        appDirLoader: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(opts.appDirLoader || '').toString('base64'),
        sriEnabled: !opts.isDev && !!((_opts_config_experimental_sri = opts.config.experimental.sri) == null ? void 0 : _opts_config_experimental_sri.algorithm),
        cacheHandler: opts.config.cacheHandler,
        preferredRegion: opts.preferredRegion,
        middlewareConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(opts.middlewareConfig || {})).toString('base64'),
        serverActions: opts.config.experimental.serverActions,
        cacheHandlers: JSON.stringify(opts.config.cacheHandlers || {})
    };
    return {
        import: `next-edge-ssr-loader?${JSON.stringify(loaderParams)}!`,
        // The Edge bundle includes the server in its entrypoint, so it has to
        // be in the SSR layer — we later convert the page request to the RSC layer
        // via a webpack rule.
        layer: opts.appDirLoader ? _constants.WEBPACK_LAYERS.serverSideRendering : undefined
    };
}
function getInstrumentationEntry(opts) {
    // the '../' is needed to make sure the file is not chunked
    const filename = `${opts.isEdgeServer ? 'edge-' : opts.isDev ? '' : '../'}${_constants.INSTRUMENTATION_HOOK_FILENAME}.js`;
    return {
        import: opts.absolutePagePath,
        filename,
        layer: _constants.WEBPACK_LAYERS.instrument
    };
}
function getAppLoader() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BUILTIN_APP_LOADER ? `builtin:next-app-loader` : 'next-app-loader';
}
function getAppEntry(opts) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_RSPACK && __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BUILTIN_APP_LOADER) {
        ;
        opts.projectRoot = (0, _path.normalize)((0, _path.join)(("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/next/dist/build"), '../../..'));
    }
    return {
        import: `${getAppLoader()}?${(0, _querystring.stringify)(opts)}!`,
        layer: _constants.WEBPACK_LAYERS.reactServerComponents
    };
}
function getClientEntry(opts) {
    const loaderOptions = {
        absolutePagePath: opts.absolutePagePath,
        page: opts.page
    };
    const pageLoader = `next-client-pages-loader?${(0, _querystring.stringify)(loaderOptions)}!`;
    // Make sure next/router is a dependency of _app or else chunk splitting
    // might cause the router to not be able to load causing hydration
    // to fail
    return opts.page === '/_app' ? [
        pageLoader,
        "[project]/JobPortal/frontend/node_modules/next/dist/client/router.js [app-client] (ecmascript)"
    ] : pageLoader;
}
function runDependingOnPageType(params) {
    if (params.pageType === _pagetypes.PAGE_TYPES.ROOT && (0, _utils.isInstrumentationHookFile)(params.page)) {
        params.onServer();
        params.onEdgeServer();
        return;
    }
    if ((0, _utils.isProxyFile)(params.page)) {
        params.onServer();
        return;
    }
    if ((0, _utils.isMiddlewareFile)(params.page)) {
        if (params.pageRuntime === 'nodejs') {
            params.onServer();
            return;
        } else {
            params.onEdgeServer();
            return;
        }
    }
    if ((0, _isapiroute.isAPIRoute)(params.page)) {
        if ((0, _isedgeruntime.isEdgeRuntime)(params.pageRuntime)) {
            params.onEdgeServer();
            return;
        }
        params.onServer();
        return;
    }
    if (params.page === '/_document') {
        params.onServer();
        return;
    }
    if (params.page === '/_app' || params.page === '/_error' || params.page === '/404' || params.page === '/500') {
        params.onClient();
        params.onServer();
        return;
    }
    if ((0, _isedgeruntime.isEdgeRuntime)(params.pageRuntime)) {
        params.onClient();
        params.onEdgeServer();
        return;
    }
    params.onClient();
    params.onServer();
    return;
}
async function createEntrypoints(params) {
    const { config, pages, pagesDir, isDev, rootDir, rootPaths, appDir, appPaths, pageExtensions } = params;
    const edgeServer = {};
    const server = {};
    const client = {};
    let middlewareMatchers = undefined;
    let appPathsPerRoute = {};
    if (appDir && appPaths) {
        for(const pathname in appPaths){
            const normalizedPath = (0, _apppaths.normalizeAppPath)(pathname);
            const actualPath = appPaths[pathname];
            if (!appPathsPerRoute[normalizedPath]) {
                appPathsPerRoute[normalizedPath] = [];
            }
            appPathsPerRoute[normalizedPath].push(getPageFromPath(actualPath, pageExtensions).replace(_constants.APP_DIR_ALIAS, ''));
        }
        // TODO: find a better place to do this
        (0, _normalizecatchallroutes.normalizeCatchAllRoutes)(appPathsPerRoute);
        // Make sure to sort parallel routes to make the result deterministic.
        appPathsPerRoute = Object.fromEntries(Object.entries(appPathsPerRoute).map(([k, v])=>[
                k,
                v.sort()
            ]));
    }
    const getEntryHandler = (mappings, pagesType)=>async (page)=>{
            const bundleFile = (0, _normalizepagepath.normalizePagePath)(page);
            const clientBundlePath = _path.posix.join(pagesType, bundleFile);
            const serverBundlePath = pagesType === _pagetypes.PAGE_TYPES.PAGES ? _path.posix.join('pages', bundleFile) : pagesType === _pagetypes.PAGE_TYPES.APP ? _path.posix.join('app', bundleFile) : bundleFile.slice(1);
            const absolutePagePath = mappings[page];
            // Handle paths that have aliases
            const pageFilePath = getPageFilePath({
                absolutePagePath,
                pagesDir,
                appDir,
                rootDir
            });
            const isInsideAppDir = !!appDir && (absolutePagePath.startsWith(_constants.APP_DIR_ALIAS) || absolutePagePath.startsWith(appDir));
            const staticInfo = await (0, _getstaticinfoincludinglayouts.getStaticInfoIncludingLayouts)({
                isInsideAppDir,
                pageExtensions,
                pageFilePath,
                appDir,
                config,
                isDev,
                page
            });
            // TODO(timneutkens): remove this
            const isServerComponent = isInsideAppDir && staticInfo.rsc !== _constants1.RSC_MODULE_TYPES.client;
            if ((0, _utils.isMiddlewareFile)(page)) {
                var _staticInfo_middleware;
                middlewareMatchers = ((_staticInfo_middleware = staticInfo.middleware) == null ? void 0 : _staticInfo_middleware.matchers) ?? [
                    {
                        regexp: '.*',
                        originalSource: '/:path*'
                    }
                ];
            }
            const isInstrumentation = (0, _utils.isInstrumentationHookFile)(page) && pagesType === _pagetypes.PAGE_TYPES.ROOT;
            runDependingOnPageType({
                page,
                pageRuntime: staticInfo.runtime,
                pageType: pagesType,
                onClient: ()=>{
                    if (isServerComponent || isInsideAppDir) {
                    // We skip the initial entries for server component pages and let the
                    // server compiler inject them instead.
                    } else {
                        client[clientBundlePath] = getClientEntry({
                            absolutePagePath,
                            page
                        });
                    }
                },
                onServer: ()=>{
                    if (pagesType === 'app' && appDir) {
                        const matchedAppPaths = appPathsPerRoute[(0, _apppaths.normalizeAppPath)(page)];
                        server[serverBundlePath] = getAppEntry({
                            page,
                            name: serverBundlePath,
                            pagePath: absolutePagePath,
                            appDir,
                            appPaths: matchedAppPaths,
                            pageExtensions,
                            basePath: config.basePath,
                            assetPrefix: config.assetPrefix,
                            nextConfigOutput: config.output,
                            preferredRegion: staticInfo.preferredRegion,
                            middlewareConfig: (0, _utils1.encodeToBase64)(staticInfo.middleware || {}),
                            isGlobalNotFoundEnabled: config.experimental.globalNotFound ? true : undefined
                        });
                    } else if (isInstrumentation) {
                        server[serverBundlePath.replace('src/', '')] = getInstrumentationEntry({
                            absolutePagePath,
                            isEdgeServer: false,
                            isDev: false
                        });
                    } else if ((0, _utils.isMiddlewareFile)(page)) {
                        server[serverBundlePath.replace('src/', '')] = getEdgeServerEntry({
                            ...params,
                            rootDir,
                            absolutePagePath: absolutePagePath,
                            bundlePath: clientBundlePath,
                            isDev: false,
                            isServerComponent,
                            page,
                            middleware: staticInfo == null ? void 0 : staticInfo.middleware,
                            pagesType,
                            preferredRegion: staticInfo.preferredRegion,
                            middlewareConfig: staticInfo.middleware
                        });
                    } else if ((0, _isapiroute.isAPIRoute)(page)) {
                        server[serverBundlePath] = [
                            (0, _nextrouteloader.getRouteLoaderEntry)({
                                kind: _routekind.RouteKind.PAGES_API,
                                page,
                                absolutePagePath,
                                preferredRegion: staticInfo.preferredRegion,
                                middlewareConfig: staticInfo.middleware || {}
                            })
                        ];
                    } else if (!(0, _utils.isMiddlewareFile)(page) && !(0, _isinternalcomponent.isInternalComponent)(absolutePagePath) && !(0, _isinternalcomponent.isNonRoutePagesPage)(page)) {
                        server[serverBundlePath] = [
                            (0, _nextrouteloader.getRouteLoaderEntry)({
                                kind: _routekind.RouteKind.PAGES,
                                page,
                                pages,
                                absolutePagePath,
                                preferredRegion: staticInfo.preferredRegion,
                                middlewareConfig: staticInfo.middleware ?? {}
                            })
                        ];
                    } else {
                        server[serverBundlePath] = [
                            absolutePagePath
                        ];
                    }
                },
                onEdgeServer: ()=>{
                    let appDirLoader = '';
                    if (isInstrumentation) {
                        edgeServer[serverBundlePath.replace('src/', '')] = getInstrumentationEntry({
                            absolutePagePath,
                            isEdgeServer: true,
                            isDev: false
                        });
                    } else {
                        if (pagesType === 'app') {
                            const matchedAppPaths = appPathsPerRoute[(0, _apppaths.normalizeAppPath)(page)];
                            appDirLoader = getAppEntry({
                                name: serverBundlePath,
                                page,
                                pagePath: absolutePagePath,
                                appDir: appDir,
                                appPaths: matchedAppPaths,
                                pageExtensions,
                                basePath: config.basePath,
                                assetPrefix: config.assetPrefix,
                                nextConfigOutput: config.output,
                                // This isn't used with edge as it needs to be set on the entry module, which will be the `edgeServerEntry` instead.
                                // Still passing it here for consistency.
                                preferredRegion: staticInfo.preferredRegion,
                                middlewareConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(staticInfo.middleware || {})).toString('base64'),
                                isGlobalNotFoundEnabled: config.experimental.globalNotFound ? true : undefined
                            }).import;
                        }
                        edgeServer[serverBundlePath] = getEdgeServerEntry({
                            ...params,
                            rootDir,
                            absolutePagePath: absolutePagePath,
                            bundlePath: clientBundlePath,
                            isDev: false,
                            isServerComponent,
                            page,
                            middleware: staticInfo == null ? void 0 : staticInfo.middleware,
                            pagesType,
                            appDirLoader,
                            preferredRegion: staticInfo.preferredRegion,
                            middlewareConfig: staticInfo.middleware
                        });
                    }
                }
            });
        };
    const promises = [];
    if (appPaths) {
        const entryHandler = getEntryHandler(appPaths, _pagetypes.PAGE_TYPES.APP);
        promises.push(Promise.all(Object.keys(appPaths).map(entryHandler)));
    }
    if (rootPaths) {
        promises.push(Promise.all(Object.keys(rootPaths).map(getEntryHandler(rootPaths, _pagetypes.PAGE_TYPES.ROOT))));
    }
    promises.push(Promise.all(Object.keys(pages).map(getEntryHandler(pages, _pagetypes.PAGE_TYPES.PAGES))));
    await Promise.all(promises);
    // Optimization: If there's only one instrumentation hook in edge compiler, which means there's no edge server entry.
    // We remove the edge instrumentation entry from edge compiler as it can be pure server side.
    if (edgeServer.instrumentation && Object.keys(edgeServer).length === 1) {
        delete edgeServer.instrumentation;
    }
    return {
        client,
        server,
        edgeServer,
        middlewareMatchers
    };
}
function finalizeEntrypoint({ name, compilerType, value, isServerComponent, hasAppDir }) {
    const entry = typeof value !== 'object' || Array.isArray(value) ? {
        import: value
    } : value;
    const isApi = name.startsWith('pages/api/');
    const isInstrumentation = (0, _utils.isInstrumentationHookFilename)(name);
    switch(compilerType){
        case _constants1.COMPILER_NAMES.server:
            {
                const layer = isApi ? _constants.WEBPACK_LAYERS.apiNode : isInstrumentation ? _constants.WEBPACK_LAYERS.instrument : isServerComponent ? _constants.WEBPACK_LAYERS.reactServerComponents : name.startsWith('pages/') ? _constants.WEBPACK_LAYERS.pagesDirNode : undefined;
                return {
                    publicPath: isApi ? '' : undefined,
                    runtime: isApi ? 'webpack-api-runtime' : 'webpack-runtime',
                    layer,
                    ...entry
                };
            }
        case _constants1.COMPILER_NAMES.edgeServer:
            {
                return {
                    layer: isApi ? _constants.WEBPACK_LAYERS.apiEdge : (0, _utils.isMiddlewareFilename)(name) || isInstrumentation ? _constants.WEBPACK_LAYERS.middleware : name.startsWith('pages/') ? _constants.WEBPACK_LAYERS.pagesDirEdge : undefined,
                    library: {
                        name: [
                            '_ENTRIES',
                            `middleware_[name]`
                        ],
                        type: 'assign'
                    },
                    runtime: _constants1.EDGE_RUNTIME_WEBPACK,
                    asyncChunks: false,
                    ...entry
                };
            }
        case _constants1.COMPILER_NAMES.client:
            {
                const isAppLayer = hasAppDir && (name === _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP || name === _constants1.APP_CLIENT_INTERNALS || name.startsWith('app/'));
                if (name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS && name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN && name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP && name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH) {
                    if (isAppLayer) {
                        return {
                            dependOn: _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP,
                            layer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                            ...entry
                        };
                    }
                    return {
                        dependOn: name.startsWith('pages/') && name !== 'pages/_app' ? 'pages/_app' : _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN,
                        layer: _constants.WEBPACK_LAYERS.pagesDirBrowser,
                        ...entry
                    };
                }
                if (isAppLayer) {
                    return {
                        layer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                        ...entry
                    };
                }
                return {
                    layer: _constants.WEBPACK_LAYERS.pagesDirBrowser,
                    ...entry
                };
            }
        default:
            return compilerType;
    }
} //# sourceMappingURL=entries.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/build-context.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NextBuildContext: null,
    getPluginState: null,
    getProxiedPluginState: null,
    resumePluginState: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NextBuildContext: function() {
        return NextBuildContext;
    },
    getPluginState: function() {
        return getPluginState;
    },
    getProxiedPluginState: function() {
        return getProxiedPluginState;
    },
    resumePluginState: function() {
        return resumePluginState;
    }
});
// A layer for storing data that is used by plugins to communicate with each
// other between different steps of the build process. This is only internal
// to Next.js and will not be a part of the final build output.
// These states don't need to be deeply merged.
let pluginState = {};
function resumePluginState(resumedState) {
    Object.assign(pluginState, resumedState);
}
function getProxiedPluginState(initialState) {
    return new Proxy(pluginState, {
        get (target, key) {
            if (typeof target[key] === 'undefined') {
                return target[key] = initialState[key];
            }
            return target[key];
        },
        set (target, key, value) {
            target[key] = value;
            return true;
        }
    });
}
function getPluginState() {
    return pluginState;
}
const NextBuildContext = {}; //# sourceMappingURL=build-context.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/load-jsconfig.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    parseJsonFile: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return loadJsConfig;
    },
    parseJsonFile: function() {
        return parseJsonFile;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _fs = /*#__PURE__*/ _interop_require_wildcard((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _getTypeScriptConfiguration = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/typescript/getTypeScriptConfiguration.js [app-client] (ecmascript)");
const _iserror = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)"));
const _hasnecessarydependencies = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/has-necessary-dependencies.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
let TSCONFIG_WARNED = false;
function parseJsonFile(filePath) {
    const JSON5 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/json5/index.js [app-client] (ecmascript)");
    const contents = (0, _fs.readFileSync)(filePath, 'utf8');
    // Special case an empty file
    if (contents.trim() === '') {
        return {};
    }
    try {
        return JSON5.parse(contents);
    } catch (err) {
        if (!(0, _iserror.default)(err)) throw err;
        const { codeFrameColumns } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/code-frame.js [app-client] (ecmascript)");
        const codeFrame = codeFrameColumns(String(contents), {
            start: {
                line: err.lineNumber || 0,
                column: err.columnNumber || 0
            }
        }, {
            message: err.message,
            highlightCode: true
        });
        throw Object.defineProperty(new Error(`Failed to parse "${filePath}":\n${codeFrame}`), "__NEXT_ERROR_CODE", {
            value: "E232",
            enumerable: false,
            configurable: true
        });
    }
}
async function loadJsConfig(dir, config) {
    var _jsConfig_compilerOptions;
    let typeScriptPath;
    try {
        const deps = (0, _hasnecessarydependencies.hasNecessaryDependencies)(dir, [
            {
                pkg: 'typescript',
                file: 'typescript/lib/typescript.js',
                exportsRestrict: true
            }
        ]);
        typeScriptPath = deps.resolved.get('typescript');
    } catch  {}
    const tsConfigFileName = config.typescript.tsconfigPath || 'tsconfig.json';
    const tsConfigPath = _path.default.join(dir, tsConfigFileName);
    const useTypeScript = Boolean(typeScriptPath && _fs.default.existsSync(tsConfigPath));
    let implicitBaseurl;
    let jsConfig;
    // jsconfig is a subset of tsconfig
    if (useTypeScript) {
        if (tsConfigFileName !== 'tsconfig.json' && TSCONFIG_WARNED === false) {
            TSCONFIG_WARNED = true;
            _log.info(`Using tsconfig file: ${tsConfigFileName}`);
        }
        const ts = await Promise.resolve((()=>{
            const e = new Error("Cannot find module as expression is too dynamic");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })());
        const tsConfig = await (0, _getTypeScriptConfiguration.getTypeScriptConfiguration)(ts, tsConfigPath, true);
        jsConfig = {
            compilerOptions: tsConfig.options
        };
        implicitBaseurl = _path.default.dirname(tsConfigPath);
    }
    const jsConfigPath = _path.default.join(dir, 'jsconfig.json');
    if (!useTypeScript && _fs.default.existsSync(jsConfigPath)) {
        jsConfig = parseJsonFile(jsConfigPath);
        implicitBaseurl = _path.default.dirname(jsConfigPath);
    }
    let resolvedBaseUrl;
    if (jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.baseUrl) {
        resolvedBaseUrl = {
            baseUrl: _path.default.resolve(dir, jsConfig.compilerOptions.baseUrl),
            isImplicit: false
        };
    } else {
        if (implicitBaseurl) {
            resolvedBaseUrl = {
                baseUrl: implicitBaseurl,
                isImplicit: true
            };
        }
    }
    return {
        useTypeScript,
        jsConfig,
        resolvedBaseUrl,
        jsConfigPath: useTypeScript ? tsConfigPath : _fs.default.existsSync(jsConfigPath) ? jsConfigPath : undefined
    };
} //# sourceMappingURL=load-jsconfig.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/get-babel-config-file.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getBabelConfigFile", {
    enumerable: true,
    get: function() {
        return getBabelConfigFile;
    }
});
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const BABEL_CONFIG_FILES = [
    '.babelrc',
    '.babelrc.json',
    '.babelrc.js',
    '.babelrc.mjs',
    '.babelrc.cjs',
    'babel.config.js',
    'babel.config.json',
    'babel.config.mjs',
    'babel.config.cjs'
];
function getBabelConfigFile(dir) {
    for (const filename of BABEL_CONFIG_FILES){
        const configFilePath = (0, _path.join)(dir, filename);
        const exists = (0, _fs.existsSync)(configFilePath);
        if (!exists) {
            continue;
        }
        return configFilePath;
    }
} //# sourceMappingURL=get-babel-config-file.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/handle-externals.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// When on Windows, we also want to check for Windows-specific
// absolute paths.
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isResourceInPackages: null,
    makeExternalHandler: null,
    resolveExternal: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isResourceInPackages: function() {
        return isResourceInPackages;
    },
    makeExternalHandler: function() {
        return makeExternalHandler;
    },
    resolveExternal: function() {
        return resolveExternal;
    }
});
const _requirehook = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/require-hook.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/isomorphic/path.js [app-client] (ecmascript)"));
const _webpackconfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack-config.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _normalizepathsep = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const reactPackagesRegex = /^(react|react-dom|react-server-dom-webpack)($|\/)/;
const pathSeparators = '[/\\\\]';
const optionalEsmPart = `((${pathSeparators}esm)?${pathSeparators})`;
const externalFileEnd = '(\\.external(\\.js)?)$';
const nextDist = `next${pathSeparators}dist`;
const externalPattern = new RegExp(`${nextDist}${optionalEsmPart}.*${externalFileEnd}`);
const nodeModulesRegex = /node_modules[/\\].*\.[mc]?js$/;
function isResourceInPackages(resource, packageNames, packageDirMapping) {
    if (!packageNames) return false;
    return packageNames.some((p)=>packageDirMapping && packageDirMapping.has(p) ? resource.startsWith(packageDirMapping.get(p) + _path.default.sep) : resource.includes(_path.default.sep + _path.default.join('node_modules', p.replace(/\//g, _path.default.sep)) + _path.default.sep));
}
async function resolveExternal(dir, esmExternalsConfig, context, request, isEsmRequested, getResolve, isLocalCallback, baseResolveCheck = true, esmResolveOptions = _webpackconfig.NODE_ESM_RESOLVE_OPTIONS, nodeResolveOptions = _webpackconfig.NODE_RESOLVE_OPTIONS, baseEsmResolveOptions = _webpackconfig.NODE_BASE_ESM_RESOLVE_OPTIONS, baseResolveOptions = _webpackconfig.NODE_BASE_RESOLVE_OPTIONS) {
    const esmExternals = !!esmExternalsConfig;
    const looseEsmExternals = esmExternalsConfig === 'loose';
    let res = null;
    let isEsm = false;
    const preferEsmOptions = esmExternals && isEsmRequested ? [
        true,
        false
    ] : [
        false
    ];
    for (const preferEsm of preferEsmOptions){
        const resolveOptions = preferEsm ? esmResolveOptions : nodeResolveOptions;
        const resolve = getResolve(resolveOptions);
        // Resolve the import with the webpack provided context, this
        // ensures we're resolving the correct version when multiple
        // exist.
        try {
            ;
            [res, isEsm] = await resolve(context, request);
        } catch (err) {
            res = null;
        }
        if (!res) {
            continue;
        }
        // ESM externals can only be imported (and not required).
        // Make an exception in loose mode.
        if (!isEsmRequested && isEsm && !looseEsmExternals) {
            continue;
        }
        if (isLocalCallback) {
            return {
                localRes: isLocalCallback(res)
            };
        }
        // Bundled Node.js code is relocated without its node_modules tree.
        // This means we need to make sure its request resolves to the same
        // package that'll be available at runtime. If it's not identical,
        // we need to bundle the code (even if it _should_ be external).
        if (baseResolveCheck) {
            let baseRes;
            let baseIsEsm;
            try {
                const baseResolve = getResolve(isEsm ? baseEsmResolveOptions : baseResolveOptions);
                [baseRes, baseIsEsm] = await baseResolve(dir, request);
            } catch (err) {
                baseRes = null;
                baseIsEsm = false;
            }
            // Same as above: if the package, when required from the root,
            // would be different from what the real resolution would use, we
            // cannot externalize it.
            // if request is pointing to a symlink it could point to the same file,
            // the resolver will resolve symlinks so this is handled
            if (baseRes !== res || isEsm !== baseIsEsm) {
                res = null;
                continue;
            }
        }
        break;
    }
    return {
        res,
        isEsm
    };
}
function makeExternalHandler({ config, optOutBundlingPackageRegex, transpiledPackages, dir }) {
    var _config_experimental;
    let resolvedExternalPackageDirs;
    const looseEsmExternals = ((_config_experimental = config.experimental) == null ? void 0 : _config_experimental.esmExternals) === 'loose';
    return async function handleExternals(context, request, dependencyType, layer, getResolve) {
        // We need to externalize internal requests for files intended to
        // not be bundled.
        const isLocal = request.startsWith('.') || // Always check for unix-style path, as webpack sometimes
        // normalizes as posix.
        _path.default.posix.isAbsolute(request) || __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform === 'win32' && _path.default.win32.isAbsolute(request);
        // make sure import "next" shows a warning when imported
        // in pages/components
        if (request === 'next') {
            return `commonjs next/dist/lib/import-next-warning`;
        }
        const isAppLayer = (0, _utils.isWebpackBundledLayer)(layer);
        // Relative requires don't need custom resolution, because they
        // are relative to requests we've already resolved here.
        // Absolute requires (require('/foo')) are extremely uncommon, but
        // also have no need for customization as they're already resolved.
        if (!isLocal) {
            if (/^next$/.test(request)) {
                return `commonjs ${request}`;
            }
            if (reactPackagesRegex.test(request) && !isAppLayer) {
                return `commonjs ${request}`;
            }
            // Handle Bun builtins as external modules
            if (request === 'bun' || request.startsWith('bun:')) {
                return `commonjs ${request}`;
            }
            const notExternalModules = /^(?:private-next-pages\/|next\/(?:dist\/pages\/|(?:app|cache|document|link|form|head|image|legacy\/image|constants|dynamic|script|navigation|headers|router|compat\/router|server)$)|string-hash|private-next-rsc-action-validate|private-next-rsc-action-client-wrapper|private-next-rsc-server-reference|private-next-rsc-cache-wrapper|private-next-rsc-track-dynamic-import$)/;
            if (notExternalModules.test(request)) {
                return;
            }
        }
        // @swc/helpers should not be external as it would
        // require hoisting the package which we can't rely on
        if (request.includes('@swc/helpers')) {
            return;
        }
        // BARREL_OPTIMIZATION_PREFIX is a special marker that tells Next.js to
        // optimize the import by removing unused exports. This has to be compiled.
        if (request.startsWith(_constants.BARREL_OPTIMIZATION_PREFIX)) {
            return;
        }
        // When in esm externals mode, and using import, we resolve with
        // ESM resolving options.
        // Also disable esm request when appDir is enabled
        const isEsmRequested = dependencyType === 'esm';
        // Don't bundle @vercel/og nodejs bundle for nodejs runtime.
        // TODO-APP: bundle route.js with different layer that externals common node_module deps.
        // Make sure @vercel/og is loaded as ESM for Node.js runtime
        if ((0, _utils.shouldUseReactServerCondition)(layer) && request === 'next/dist/compiled/@vercel/og/index.node.js') {
            return `module ${request}`;
        }
        // Specific Next.js imports that should remain external
        // TODO-APP: Investigate if we can remove this.
        if (request.startsWith('next/dist/')) {
            // Non external that needs to be transpiled
            // Image loader needs to be transpiled
            if (/^next[\\/]dist[\\/]shared[\\/]lib[\\/]image-loader/.test(request)) {
                return;
            }
            if (/^next[\\/]dist[\\/]compiled[\\/]next-server/.test(request)) {
                return `commonjs ${request}`;
            }
            if (/^next[\\/]dist[\\/]shared[\\/](?!lib[\\/]router[\\/]router)/.test(request) || /^next[\\/]dist[\\/]compiled[\\/].*\.c?js$/.test(request)) {
                return `commonjs ${request}`;
            }
            if (/^next[\\/]dist[\\/]esm[\\/]shared[\\/](?!lib[\\/]router[\\/]router)/.test(request) || /^next[\\/]dist[\\/]compiled[\\/].*\.mjs$/.test(request)) {
                return `module ${request}`;
            }
            return resolveNextExternal(request);
        }
        // TODO-APP: Let's avoid this resolve call as much as possible, and eventually get rid of it.
        const resolveResult = await resolveExternal(dir, config.experimental.esmExternals, context, request, isEsmRequested, getResolve, isLocal ? resolveNextExternal : undefined);
        if ('localRes' in resolveResult) {
            return resolveResult.localRes;
        }
        // Forcedly resolve the styled-jsx installed by next.js,
        // since `resolveExternal` cannot find the styled-jsx dep with pnpm
        if (request === 'styled-jsx/style') {
            resolveResult.res = _requirehook.defaultOverrides['styled-jsx/style'];
        }
        const { res, isEsm } = resolveResult;
        // If the request cannot be resolved we need to have
        // webpack "bundle" it so it surfaces the not found error.
        if (!res) {
            return;
        }
        const isOptOutBundling = optOutBundlingPackageRegex.test(res);
        // Apply bundling rules to all app layers.
        // Since handleExternals only handle the server layers, we don't need to exclude client here
        if (!isOptOutBundling && isAppLayer) {
            return;
        }
        // ESM externals can only be imported (and not required).
        // Make an exception in loose mode.
        if (!isEsmRequested && isEsm && !looseEsmExternals && !isLocal) {
            throw Object.defineProperty(new Error(`ESM packages (${request}) need to be imported. Use 'import' to reference the package instead. https://nextjs.org/docs/messages/import-esm-externals`), "__NEXT_ERROR_CODE", {
                value: "E310",
                enumerable: false,
                configurable: true
            });
        }
        const externalType = isEsm ? 'module' : 'commonjs';
        // Default pages have to be transpiled
        if (/node_modules[/\\]@babel[/\\]runtime[/\\]/.test(res)) {
            return;
        }
        // Webpack itself has to be compiled because it doesn't always use module relative paths
        if (/node_modules[/\\]webpack/.test(res) || /node_modules[/\\]css-loader/.test(res)) {
            return;
        }
        // If a package should be transpiled by Next.js, we skip making it external.
        // It doesn't matter what the extension is, as we'll transpile it anyway.
        if (transpiledPackages && !resolvedExternalPackageDirs) {
            resolvedExternalPackageDirs = new Map();
            // We need to resolve all the external package dirs initially.
            for (const pkg of transpiledPackages){
                const pkgRes = await resolveExternal(dir, config.experimental.esmExternals, context, pkg + '/package.json', isEsmRequested, getResolve, isLocal ? resolveNextExternal : undefined);
                if (pkgRes.res) {
                    resolvedExternalPackageDirs.set(pkg, _path.default.dirname(pkgRes.res));
                }
            }
        }
        const resolvedBundlingOptOutRes = resolveBundlingOptOutPackages({
            resolvedRes: res,
            config,
            resolvedExternalPackageDirs,
            isAppLayer,
            externalType,
            isOptOutBundling,
            request,
            transpiledPackages
        });
        if (resolvedBundlingOptOutRes) {
            return resolvedBundlingOptOutRes;
        }
        // if here, we default to bundling the file
        return;
    };
}
function resolveBundlingOptOutPackages({ resolvedRes, config, resolvedExternalPackageDirs, isAppLayer, externalType, isOptOutBundling, request, transpiledPackages }) {
    if (nodeModulesRegex.test(resolvedRes)) {
        const shouldBundlePages = !isAppLayer && config.bundlePagesRouterDependencies && !isOptOutBundling;
        const shouldBeBundled = shouldBundlePages || isResourceInPackages(resolvedRes, transpiledPackages, resolvedExternalPackageDirs);
        if (!shouldBeBundled) {
            return `${externalType} ${request}` // Externalize if not bundled or opted out
            ;
        }
    }
}
/**
 * @param localRes the full path to the file
 * @returns the externalized path
 * @description returns an externalized path if the file is a Next.js file and ends with either `.shared-runtime.js` or `.external.js`
 * This is used to ensure that files used across the rendering runtime(s) and the user code are one and the same. The logic in this function
 * will rewrite the require to the correct bundle location depending on the layer at which the file is being used.
 */ function resolveNextExternal(localRes) {
    const isExternal = externalPattern.test(localRes);
    // if the file ends with .external, we need to make it a commonjs require in all cases
    // this is used mainly to share the async local storage across the routing, rendering and user layers.
    if (isExternal) {
        // it's important we return the path that starts with `next/dist/` here instead of the absolute path
        // otherwise NFT will get tripped up
        return `commonjs ${(0, _normalizepathsep.normalizePathSep)(localRes.replace(/.*?next[/\\]dist/, 'next/dist'))}`;
    }
} //# sourceMappingURL=handle-externals.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/webpack-config-rules/resolve.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    edgeConditionName: null,
    getMainField: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    edgeConditionName: function() {
        return edgeConditionName;
    },
    getMainField: function() {
        return getMainField;
    }
});
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const edgeConditionName = 'edge-light';
const mainFieldsPerCompiler = {
    // For default case, prefer CJS over ESM on server side. e.g. pages dir SSR
    [_constants.COMPILER_NAMES.server]: [
        'main',
        'module'
    ],
    [_constants.COMPILER_NAMES.client]: [
        'browser',
        'module',
        'main'
    ],
    // For bundling-all strategy, prefer ESM over CJS
    'server-esm': [
        'module',
        'main'
    ]
};
function getMainField(compilerType, preferEsm) {
    if (compilerType === _constants.COMPILER_NAMES.edgeServer) {
        return [
            'edge-light',
            '...'
        ];
    } else if (compilerType === _constants.COMPILER_NAMES.client) {
        return mainFieldsPerCompiler[_constants.COMPILER_NAMES.client];
    }
    // Prefer module fields over main fields for isomorphic packages on server layer
    return preferEsm ? mainFieldsPerCompiler['server-esm'] : mainFieldsPerCompiler[_constants.COMPILER_NAMES.server];
} //# sourceMappingURL=resolve.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/next-dir-paths.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXT_PROJECT_ROOT: null,
    NEXT_PROJECT_ROOT_DIST: null,
    NEXT_PROJECT_ROOT_DIST_CLIENT: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_PROJECT_ROOT: function() {
        return NEXT_PROJECT_ROOT;
    },
    NEXT_PROJECT_ROOT_DIST: function() {
        return NEXT_PROJECT_ROOT_DIST;
    },
    NEXT_PROJECT_ROOT_DIST_CLIENT: function() {
        return NEXT_PROJECT_ROOT_DIST_CLIENT;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const NEXT_PROJECT_ROOT = _path.default.join(("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/next/dist/build"), '..', '..');
const NEXT_PROJECT_ROOT_DIST = _path.default.join(NEXT_PROJECT_ROOT, 'dist');
const NEXT_PROJECT_ROOT_DIST_CLIENT = _path.default.join(NEXT_PROJECT_ROOT_DIST, 'client'); //# sourceMappingURL=next-dir-paths.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/create-compiler-aliases.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createAppRouterApiAliases: null,
    createNextApiEsmAliases: null,
    createServerOnlyClientOnlyAliases: null,
    createVendoredReactAliases: null,
    createWebpackAliases: null,
    getOptimizedModuleAliases: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createAppRouterApiAliases: function() {
        return createAppRouterApiAliases;
    },
    createNextApiEsmAliases: function() {
        return createNextApiEsmAliases;
    },
    createServerOnlyClientOnlyAliases: function() {
        return createServerOnlyClientOnlyAliases;
    },
    createVendoredReactAliases: function() {
        return createVendoredReactAliases;
    },
    createWebpackAliases: function() {
        return createWebpackAliases;
    },
    getOptimizedModuleAliases: function() {
        return getOptimizedModuleAliases;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
const _requirehook = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/require-hook.js [app-client] (ecmascript)");
const _webpackconfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack-config.js [app-client] (ecmascript)");
const _nextdirpaths = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/next-dir-paths.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const isReact19 = typeof _react.use === 'function';
function createWebpackAliases({ distDir, isClient, isEdgeServer, dev, config, pagesDir, appDir, dir, reactProductionProfiling }) {
    const pageExtensions = config.pageExtensions;
    const customAppAliases = {};
    const customDocumentAliases = {};
    // tell webpack where to look for _app and _document
    // using aliases to allow falling back to the default
    // version when removed or not present
    if (dev) {
        const nextDistPath = 'next/dist/' + (isEdgeServer ? 'esm/' : '');
        customAppAliases[`${_constants.PAGES_DIR_ALIAS}/_app`] = [
            ...pagesDir ? pageExtensions.reduce((prev, ext)=>{
                prev.push(_path.default.join(pagesDir, `_app.${ext}`));
                return prev;
            }, []) : [],
            `${nextDistPath}pages/_app.js`
        ];
        customAppAliases[`${_constants.PAGES_DIR_ALIAS}/_error`] = [
            ...pagesDir ? pageExtensions.reduce((prev, ext)=>{
                prev.push(_path.default.join(pagesDir, `_error.${ext}`));
                return prev;
            }, []) : [],
            `${nextDistPath}pages/_error.js`
        ];
        customDocumentAliases[`${_constants.PAGES_DIR_ALIAS}/_document`] = [
            ...pagesDir ? pageExtensions.reduce((prev, ext)=>{
                prev.push(_path.default.join(pagesDir, `_document.${ext}`));
                return prev;
            }, []) : [],
            `${nextDistPath}pages/_document.js`
        ];
    }
    return {
        '@vercel/og$': 'next/dist/server/og/image-response',
        // Avoid bundling both entrypoints in React 19 when we just need one.
        // Also avoids bundler warnings in React 18 where react-dom/server.edge doesn't exist.
        'next/dist/server/ReactDOMServerPages': isReact19 ? 'react-dom/server.edge' : 'react-dom/server.browser',
        // Alias next/dist imports to next/dist/esm assets,
        // let this alias hit before `next` alias.
        ...isEdgeServer ? {
            'next/dist/api': 'next/dist/esm/api',
            'next/dist/build': 'next/dist/esm/build',
            'next/dist/client': 'next/dist/esm/client',
            'next/dist/shared': 'next/dist/esm/shared',
            'next/dist/pages': 'next/dist/esm/pages',
            'next/dist/lib': 'next/dist/esm/lib',
            'next/dist/server': 'next/dist/esm/server',
            ...createNextApiEsmAliases()
        } : undefined,
        // For RSC server bundle
        ...!(0, _webpackconfig.hasExternalOtelApiPackage)() && {
            '@opentelemetry/api': 'next/dist/compiled/@opentelemetry/api'
        },
        ...config.images.loaderFile ? {
            'next/dist/shared/lib/image-loader': config.images.loaderFile,
            ...isEdgeServer && {
                'next/dist/esm/shared/lib/image-loader': config.images.loaderFile
            }
        } : undefined,
        'styled-jsx/style$': _requirehook.defaultOverrides['styled-jsx/style'],
        'styled-jsx$': _requirehook.defaultOverrides['styled-jsx'],
        'next/dist/compiled/next-devtools': isClient ? 'next/dist/compiled/next-devtools' : 'next/dist/next-devtools/dev-overlay.shim.js',
        ...customAppAliases,
        ...customDocumentAliases,
        ...pagesDir ? {
            [_constants.PAGES_DIR_ALIAS]: pagesDir
        } : {},
        ...appDir ? {
            [_constants.APP_DIR_ALIAS]: appDir
        } : {},
        [_constants.ROOT_DIR_ALIAS]: dir,
        ...isClient ? {
            'private-next-instrumentation-client': [
                _path.default.join(dir, 'src', 'instrumentation-client'),
                _path.default.join(dir, 'instrumentation-client'),
                'private-next-empty-module'
            ],
            // disable typechecker, webpack5 allows aliases to be set to false to create a no-op module
            'private-next-empty-module': false
        } : {},
        [_constants.DOT_NEXT_ALIAS]: distDir,
        ...isClient || isEdgeServer ? getOptimizedModuleAliases() : {},
        ...reactProductionProfiling ? getReactProfilingInProduction() : {},
        [_constants.RSC_ACTION_VALIDATE_ALIAS]: 'next/dist/build/webpack/loaders/next-flight-loader/action-validate',
        [_constants.RSC_ACTION_CLIENT_WRAPPER_ALIAS]: 'next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper',
        [_constants.RSC_ACTION_PROXY_ALIAS]: 'next/dist/build/webpack/loaders/next-flight-loader/server-reference',
        [_constants.RSC_ACTION_ENCRYPTION_ALIAS]: 'next/dist/server/app-render/encryption',
        [_constants.RSC_CACHE_WRAPPER_ALIAS]: 'next/dist/build/webpack/loaders/next-flight-loader/cache-wrapper',
        [_constants.RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS]: 'next/dist/build/webpack/loaders/next-flight-loader/track-dynamic-import',
        '@swc/helpers/_': _path.default.join(_path.default.dirname("[project]/JobPortal/frontend/node_modules/@swc/helpers/package.json (json)"), '_'),
        setimmediate: 'next/dist/compiled/setimmediate'
    };
}
function createServerOnlyClientOnlyAliases(isServer) {
    return isServer ? {
        'server-only$': 'next/dist/compiled/server-only/empty',
        'client-only$': 'next/dist/compiled/client-only/error',
        'next/dist/compiled/server-only$': 'next/dist/compiled/server-only/empty',
        'next/dist/compiled/client-only$': 'next/dist/compiled/client-only/error'
    } : {
        'server-only$': 'next/dist/compiled/server-only/index',
        'client-only$': 'next/dist/compiled/client-only/index',
        'next/dist/compiled/client-only$': 'next/dist/compiled/client-only/index',
        'next/dist/compiled/server-only': 'next/dist/compiled/server-only/index'
    };
}
function createNextApiEsmAliases() {
    const mapping = {
        head: 'next/dist/api/head',
        image: 'next/dist/api/image',
        constants: 'next/dist/api/constants',
        router: 'next/dist/api/router',
        dynamic: 'next/dist/api/dynamic',
        script: 'next/dist/api/script',
        link: 'next/dist/api/link',
        form: 'next/dist/api/form',
        navigation: 'next/dist/api/navigation',
        headers: 'next/dist/api/headers',
        og: 'next/dist/api/og',
        server: 'next/dist/api/server',
        // pages api
        document: 'next/dist/api/document',
        app: 'next/dist/api/app'
    };
    const aliasMap = {};
    // Handle fully specified imports like `next/image.js`
    for (const [key, value] of Object.entries(mapping)){
        const nextApiFilePath = _path.default.join(_nextdirpaths.NEXT_PROJECT_ROOT, key);
        aliasMap[nextApiFilePath + '.js'] = value;
    }
    return aliasMap;
}
function createAppRouterApiAliases(isServerOnlyLayer) {
    const mapping = {
        head: 'next/dist/client/components/noop-head',
        dynamic: 'next/dist/api/app-dynamic',
        link: 'next/dist/client/app-dir/link',
        form: 'next/dist/client/app-dir/form'
    };
    if (isServerOnlyLayer) {
        mapping['navigation'] = 'next/dist/api/navigation.react-server';
        mapping['link'] = 'next/dist/client/app-dir/link.react-server';
    }
    const aliasMap = {};
    for (const [key, value] of Object.entries(mapping)){
        const nextApiFilePath = _path.default.join(_nextdirpaths.NEXT_PROJECT_ROOT, key);
        aliasMap[nextApiFilePath + '.js'] = value;
    }
    return aliasMap;
}
function createVendoredReactAliases(bundledReactChannel, { layer, isBrowser, isEdgeServer, reactProductionProfiling }) {
    const environmentCondition = isBrowser ? 'browser' : isEdgeServer ? 'edge' : 'nodejs';
    const reactCondition = (0, _utils.shouldUseReactServerCondition)(layer) ? 'server' : 'client';
    // ✅ Correct alias
    // ❌ Incorrect alias i.e. importing this entrypoint should throw an error.
    // ❔ Alias that may produce correct code in certain conditions.Keep until react-markup is available.
    let reactAlias;
    if (environmentCondition === 'browser' && reactCondition === 'client') {
        // prettier-ignore
        reactAlias = {
            // file:///./../compiled/react/package.json
            react$: /* ✅ */ `next/dist/compiled/react${bundledReactChannel}`,
            'react/compiler-runtime$': /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/compiler-runtime`,
            'react/jsx-dev-runtime$': /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/jsx-dev-runtime`,
            'react/jsx-runtime$': /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/jsx-runtime`,
            // file:///./../compiled/react-dom/package.json
            'react-dom$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}`,
            'react-dom/client$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/client`,
            'react-dom/server$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
            'react-dom/server.browser$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
            // optimizations to ignore the legacy build of react-dom/server in `server.edge` build
            'react-dom/server.edge$': /* ❌ */ `next/dist/build/webpack/alias/react-dom-server${bundledReactChannel}.js`,
            'react-dom/static$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.browser`,
            'react-dom/static.browser$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.browser`,
            'react-dom/static.edge$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.edge`,
            // file:///./../compiled/react-server-dom-webpack/package.json
            'react-server-dom-webpack/client$': /* ✅ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/client.browser`,
            'react-server-dom-webpack/server$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.browser`,
            'react-server-dom-webpack/server.node$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.node`,
            'react-server-dom-webpack/static$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/static.browser`
        };
    } else if (environmentCondition === 'browser' && reactCondition === 'server') {
        // prettier-ignore
        reactAlias = {
            // file:///./../compiled/react/package.json
            react$: /* ❌ */ `next/dist/compiled/react${bundledReactChannel}`,
            'react/compiler-runtime$': /* ❌ */ `next/dist/compiled/react${bundledReactChannel}/compiler-runtime`,
            'react/jsx-dev-runtime$': /* ❌ */ `next/dist/compiled/react${bundledReactChannel}/jsx-dev-runtime`,
            'react/jsx-runtime$': /* ❌ */ `next/dist/compiled/react${bundledReactChannel}/jsx-runtime`,
            // file:///./../compiled/react-dom/package.json
            'react-dom$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}`,
            'react-dom/client$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/client`,
            'react-dom/server$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
            'react-dom/server.browser$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
            // optimizations to ignore the legacy build of react-dom/server in `server.edge` build
            'react-dom/server.edge$': /* ❌ */ `next/dist/build/webpack/alias/react-dom-server${bundledReactChannel}.js`,
            'react-dom/static$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.browser`,
            'react-dom/static.browser$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.browser`,
            'react-dom/static.edge$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.edge`,
            // file:///./../compiled/react-server-dom-webpack/package.json
            'react-server-dom-webpack/client$': /* ✅ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/client.browser`,
            'react-server-dom-webpack/server$': /* ✅ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.browser`,
            'react-server-dom-webpack/server.node$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.node`,
            'react-server-dom-webpack/static$': /* ✅ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/static.browser`
        };
    } else if (environmentCondition === 'nodejs' && reactCondition === 'client') {
        // prettier-ignore
        reactAlias = {
            // file:///./../compiled/react/package.json
            react$: /* ✅ */ `next/dist/server/route-modules/app-page/vendored/ssr/react`,
            'react/compiler-runtime$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/ssr/react-compiler-runtime`,
            'react/jsx-dev-runtime$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime`,
            'react/jsx-runtime$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime`,
            // file:///./../compiled/react-dom/package.json
            'react-dom$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/ssr/react-dom`,
            'react-dom/client$': /* ❔ */ `next/dist/compiled/react-dom${bundledReactChannel}/client`,
            'react-dom/server$': /* ❔ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.node`,
            'react-dom/server.browser$': /* ❔ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
            // optimizations to ignore the legacy build of react-dom/server in `server.edge` build
            'react-dom/server.edge$': /* ✅ */ `next/dist/build/webpack/alias/react-dom-server${bundledReactChannel}.js`,
            'react-dom/static$': /* ❔ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.node`,
            'react-dom/static.browser$': /* ❔ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.browser`,
            'react-dom/static.edge$': /* ❔ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.edge`,
            // file:///./../compiled/react-server-dom-webpack/package.json
            'react-server-dom-webpack/client$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/ssr/react-server-dom-webpack-client`,
            'react-server-dom-webpack/server$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.node`,
            'react-server-dom-webpack/server.node$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.node`,
            'react-server-dom-webpack/static$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/static.node`
        };
    } else if (environmentCondition === 'nodejs' && reactCondition === 'server') {
        // prettier-ignore
        reactAlias = {
            // file:///./../compiled/react/package.json
            react$: /* ✅ */ `next/dist/server/route-modules/app-page/vendored/rsc/react`,
            'react/compiler-runtime$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/rsc/react-compiler-runtime`,
            'react/jsx-dev-runtime$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime`,
            'react/jsx-runtime$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime`,
            // file:///./../compiled/react-dom/package.json
            'react-dom$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/rsc/react-dom`,
            'react-dom/client$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/client`,
            'react-dom/server$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.node`,
            'react-dom/server.browser$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
            // optimizations to ignore the legacy build of react-dom/server in `server.edge` build
            'react-dom/server.edge$': /* ❌ */ `next/dist/build/webpack/alias/react-dom-server${bundledReactChannel}.js`,
            'react-dom/static$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.node`,
            'react-dom/static.browser$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.browser`,
            'react-dom/static.edge$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.edge`,
            // file:///./../compiled/react-server-dom-webpack/package.json
            'react-server-dom-webpack/client$': /* ❔ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/client.node`,
            'react-server-dom-webpack/server$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-webpack-server`,
            'react-server-dom-webpack/server.node$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-webpack-server`,
            'react-server-dom-webpack/static$': /* ✅ */ `next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-webpack-static`
        };
    } else if (environmentCondition === 'edge' && reactCondition === 'client') {
        // prettier-ignore
        reactAlias = {
            // file:///./../compiled/react/package.json
            react$: /* ✅ */ `next/dist/compiled/react${bundledReactChannel}`,
            'react/compiler-runtime$': /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/compiler-runtime`,
            'react/jsx-dev-runtime$': /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/jsx-dev-runtime`,
            'react/jsx-runtime$': /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/jsx-runtime`,
            // file:///./../compiled/react-dom/package.json
            'react-dom$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}`,
            'react-dom/client$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/client`,
            'react-dom/server$': /* ✅ */ `next/dist/build/webpack/alias/react-dom-server${bundledReactChannel}.js`,
            'react-dom/server.browser$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
            // optimizations to ignore the legacy build of react-dom/server in `server.edge` build
            'react-dom/server.edge$': /* ✅ */ `next/dist/build/webpack/alias/react-dom-server${bundledReactChannel}.js`,
            'react-dom/static$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.edge`,
            'react-dom/static.browser$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.browser`,
            'react-dom/static.edge$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.edge`,
            // file:///./../compiled/react-server-dom-webpack/package.json
            'react-server-dom-webpack/client$': /* ✅ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/client.edge`,
            'react-server-dom-webpack/server$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.edge`,
            'react-server-dom-webpack/server.node$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.node`,
            'react-server-dom-webpack/static$': /* ❌ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/static.edge`
        };
    } else if (environmentCondition === 'edge' && reactCondition === 'server') {
        // prettier-ignore
        reactAlias = {
            // file:///./../compiled/react/package.json
            react$: /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/react.react-server`,
            'react/compiler-runtime$': /* ❌ */ `next/dist/compiled/react${bundledReactChannel}/compiler-runtime`,
            'react/jsx-dev-runtime$': /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/jsx-dev-runtime.react-server`,
            'react/jsx-runtime$': /* ✅ */ `next/dist/compiled/react${bundledReactChannel}/jsx-runtime.react-server`,
            // file:///./../compiled/react-dom/package.json
            'react-dom$': /* ✅ */ `next/dist/compiled/react-dom${bundledReactChannel}/react-dom.react-server`,
            'react-dom/client$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/client`,
            'react-dom/server$': /* ❌ */ `next/dist/build/webpack/alias/react-dom-server${bundledReactChannel}.js`,
            'react-dom/server.browser$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/server.browser`,
            // optimizations to ignore the legacy build of react-dom/server in `server.edge` build
            'react-dom/server.edge$': /* ❌ */ `next/dist/build/webpack/alias/react-dom-server${bundledReactChannel}.js`,
            'react-dom/static$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.edge`,
            'react-dom/static.browser$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.browser`,
            'react-dom/static.edge$': /* ❌ */ `next/dist/compiled/react-dom${bundledReactChannel}/static.edge`,
            // file:///./../compiled/react-server-dom-webpack/package.json
            'react-server-dom-webpack/client$': /* ❔ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/client.edge`,
            'react-server-dom-webpack/server$': /* ✅ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.edge`,
            'react-server-dom-webpack/server.node$': /* ✅ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/server.node`,
            'react-server-dom-webpack/static$': /* ✅ */ `next/dist/compiled/react-server-dom-webpack${bundledReactChannel}/static.edge`
        };
        // prettier-ignore
        reactAlias[`next/dist/compiled/react${bundledReactChannel}$`] = reactAlias[`react$`];
        // prettier-ignore
        reactAlias[`next/dist/compiled/react${bundledReactChannel}/compiler-runtime$`] = reactAlias[`react/compiler-runtime$`];
        // prettier-ignore
        reactAlias[`next/dist/compiled/react${bundledReactChannel}/jsx-dev-runtime$`] = reactAlias[`react/jsx-dev-runtime$`];
        // prettier-ignore
        reactAlias[`next/dist/compiled/react${bundledReactChannel}/jsx-runtime$`] = reactAlias[`react/jsx-runtime$`];
        // prettier-ignore
        reactAlias[`next/dist/compiled/react-dom${bundledReactChannel}$`] = reactAlias[`react-dom$`];
    } else {
        throw Object.defineProperty(new Error(`Unsupported environment condition "${environmentCondition}" and react condition "${reactCondition}". This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
            value: "E717",
            enumerable: false,
            configurable: true
        });
    }
    if (reactProductionProfiling) {
        reactAlias['react-dom/client$'] = `next/dist/compiled/react-dom${bundledReactChannel}/profiling`;
    }
    const alias = reactAlias;
    alias['@vercel/turbopack-ecmascript-runtime/browser/dev/hmr-client/hmr-client.ts'] = `next/dist/client/dev/noop-turbopack-hmr`;
    return alias;
}
function getOptimizedModuleAliases() {
    return {
        unfetch: "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/fetch/index.js [app-client] (ecmascript)",
        'isomorphic-unfetch': "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/fetch/index.js [app-client] (ecmascript)",
        'whatwg-fetch': "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/fetch/whatwg-fetch.js [app-client] (ecmascript)",
        'object-assign': "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/object-assign.js [app-client] (ecmascript)",
        'object.assign/auto': "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/object.assign/auto.js [app-client] (ecmascript)",
        'object.assign/implementation': "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/object.assign/implementation.js [app-client] (ecmascript)",
        'object.assign/polyfill': "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/object.assign/polyfill.js [app-client] (ecmascript)",
        'object.assign/shim': "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/object.assign/shim.js [app-client] (ecmascript)",
        url: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/native-url/index.js [app-client] (ecmascript)"
    };
}
function getReactProfilingInProduction() {
    return {
        'react-dom/client$': 'react-dom/profiling'
    };
} //# sourceMappingURL=create-compiler-aliases.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/util.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "consumeIterator", {
    enumerable: true,
    get: function() {
        return consumeIterator;
    }
});
function consumeIterator(iter) {
    while(true){
        const { value, done } = iter.next();
        if (done) {
            return value;
        }
    }
} //# sourceMappingURL=util.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/commonjs.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return CommonJSModulePlugin;
    }
});
const _plugintransformmodulescommonjs = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/plugin-transform-modules-commonjs.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function CommonJSModulePlugin(...args) {
    const commonjs = (0, _plugintransformmodulescommonjs.default)(...args);
    return {
        visitor: {
            Program: {
                exit (path, state) {
                    let foundModuleExports = false;
                    path.traverse({
                        MemberExpression (expressionPath) {
                            if (expressionPath.node.object.name !== 'module') return;
                            if (expressionPath.node.property.name !== 'exports') return;
                            foundModuleExports = true;
                        }
                    });
                    if (!foundModuleExports) {
                        return;
                    }
                    commonjs.visitor.Program.exit.call(this, path, state);
                }
            }
        }
    };
} //# sourceMappingURL=commonjs.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/next-page-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return nextPageConfig;
    }
});
const _core = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/core.js [app-client] (ecmascript)");
const CONFIG_KEY = 'config';
function errorMessage(state, details) {
    const pageName = (state.filename || '').split(state.cwd || '').pop() || 'unknown';
    return `Invalid page config export found. ${details} in file ${pageName}. See: https://nextjs.org/docs/messages/invalid-page-config`;
}
function nextPageConfig({ types: t }) {
    return {
        visitor: {
            Program: {
                enter (path, state) {
                    path.traverse({
                        ExportDeclaration (exportPath, exportState) {
                            var _exportPath_node_specifiers;
                            if (_core.types.isExportNamedDeclaration(exportPath.node) && ((_exportPath_node_specifiers = exportPath.node.specifiers) == null ? void 0 : _exportPath_node_specifiers.some((specifier)=>{
                                return (t.isIdentifier(specifier.exported) ? specifier.exported.name : specifier.exported.value) === CONFIG_KEY;
                            })) && _core.types.isStringLiteral(exportPath.node.source)) {
                                throw Object.defineProperty(new Error(errorMessage(exportState, 'Expected object but got export from')), "__NEXT_ERROR_CODE", {
                                    value: "E394",
                                    enumerable: false,
                                    configurable: true
                                });
                            }
                        },
                        ExportNamedDeclaration (exportPath, exportState) {
                            var _exportPath_node_declaration, _exportPath_scope_getBinding;
                            if (exportState.bundleDropped || !exportPath.node.declaration && exportPath.node.specifiers.length === 0) {
                                return;
                            }
                            const declarations = [
                                ...((_exportPath_node_declaration = exportPath.node.declaration) == null ? void 0 : _exportPath_node_declaration.declarations) || [],
                                (_exportPath_scope_getBinding = exportPath.scope.getBinding(CONFIG_KEY)) == null ? void 0 : _exportPath_scope_getBinding.path.node
                            ].filter(Boolean);
                            for (const specifier of exportPath.node.specifiers){
                                if ((t.isIdentifier(specifier.exported) ? specifier.exported.name : specifier.exported.value) === CONFIG_KEY) {
                                    // export {} from 'somewhere'
                                    if (_core.types.isStringLiteral(exportPath.node.source)) {
                                        throw Object.defineProperty(new Error(errorMessage(exportState, `Expected object but got import`)), "__NEXT_ERROR_CODE", {
                                            value: "E394",
                                            enumerable: false,
                                            configurable: true
                                        });
                                    // import hello from 'world'
                                    // export { hello as config }
                                    } else if (_core.types.isIdentifier(specifier.local)) {
                                        var _exportPath_scope_getBinding1;
                                        if (_core.types.isImportSpecifier((_exportPath_scope_getBinding1 = exportPath.scope.getBinding(specifier.local.name)) == null ? void 0 : _exportPath_scope_getBinding1.path.node)) {
                                            throw Object.defineProperty(new Error(errorMessage(exportState, `Expected object but got import`)), "__NEXT_ERROR_CODE", {
                                                value: "E394",
                                                enumerable: false,
                                                configurable: true
                                            });
                                        }
                                    }
                                }
                            }
                            for (const declaration of declarations){
                                if (!_core.types.isIdentifier(declaration.id, {
                                    name: CONFIG_KEY
                                })) {
                                    continue;
                                }
                                let { init } = declaration;
                                if (_core.types.isTSAsExpression(init)) {
                                    init = init.expression;
                                }
                                if (!_core.types.isObjectExpression(init)) {
                                    const got = init ? init.type : 'undefined';
                                    throw Object.defineProperty(new Error(errorMessage(exportState, `Expected object but got ${got}`)), "__NEXT_ERROR_CODE", {
                                        value: "E394",
                                        enumerable: false,
                                        configurable: true
                                    });
                                }
                                for (const prop of init.properties){
                                    if (_core.types.isSpreadElement(prop)) {
                                        throw Object.defineProperty(new Error(errorMessage(exportState, `Property spread is not allowed`)), "__NEXT_ERROR_CODE", {
                                            value: "E394",
                                            enumerable: false,
                                            configurable: true
                                        });
                                    }
                                }
                            }
                        }
                    }, state);
                }
            }
        }
    };
} //# sourceMappingURL=next-page-config.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/next-page-disallow-re-export-all-exports.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return NextPageDisallowReExportAllExports;
    }
});
function NextPageDisallowReExportAllExports() {
    return {
        visitor: {
            ExportAllDeclaration (path) {
                var _path_node_loc, _path_node_loc1;
                const err = Object.defineProperty(new SyntaxError(`Using \`export * from '...'\` in a page is disallowed. Please use \`export { default } from '...'\` instead.\n` + `Read more: https://nextjs.org/docs/messages/export-all-in-page`), "__NEXT_ERROR_CODE", {
                    value: "E555",
                    enumerable: false,
                    configurable: true
                });
                err.code = 'BABEL_PARSE_ERROR';
                err.loc = ((_path_node_loc = path.node.loc) == null ? void 0 : _path_node_loc.start) ?? ((_path_node_loc1 = path.node.loc) == null ? void 0 : _path_node_loc1.end) ?? path.node.loc;
                throw err;
            }
        }
    };
} //# sourceMappingURL=next-page-disallow-re-export-all-exports.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/next-ssg-transform.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    EXPORT_NAME_GET_SERVER_PROPS: null,
    EXPORT_NAME_GET_STATIC_PATHS: null,
    EXPORT_NAME_GET_STATIC_PROPS: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    EXPORT_NAME_GET_SERVER_PROPS: function() {
        return EXPORT_NAME_GET_SERVER_PROPS;
    },
    EXPORT_NAME_GET_STATIC_PATHS: function() {
        return EXPORT_NAME_GET_STATIC_PATHS;
    },
    EXPORT_NAME_GET_STATIC_PROPS: function() {
        return EXPORT_NAME_GET_STATIC_PROPS;
    },
    default: function() {
        return nextTransformSsg;
    }
});
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const EXPORT_NAME_GET_STATIC_PROPS = 'getStaticProps';
const EXPORT_NAME_GET_STATIC_PATHS = 'getStaticPaths';
const EXPORT_NAME_GET_SERVER_PROPS = 'getServerSideProps';
const ssgExports = new Set([
    EXPORT_NAME_GET_STATIC_PROPS,
    EXPORT_NAME_GET_STATIC_PATHS,
    EXPORT_NAME_GET_SERVER_PROPS,
    // legacy methods added so build doesn't fail from importing
    // server-side only methods
    `unstable_getStaticProps`,
    `unstable_getStaticPaths`,
    `unstable_getServerProps`,
    `unstable_getServerSideProps`
]);
function decorateSsgExport(t, path, state) {
    const gsspName = state.isPrerender ? _constants1.STATIC_PROPS_ID : _constants1.SERVER_PROPS_ID;
    const gsspId = t.identifier(gsspName);
    const addGsspExport = (exportPath)=>{
        if (state.done) {
            return;
        }
        state.done = true;
        const [pageCompPath] = exportPath.replaceWithMultiple([
            t.exportNamedDeclaration(t.variableDeclaration(// this runs in `Program#exit`, no ES2015 transforms (preset env)
            // will be ran against this code.
            'var', [
                t.variableDeclarator(gsspId, t.booleanLiteral(true))
            ]), [
                t.exportSpecifier(gsspId, gsspId)
            ]),
            exportPath.node
        ]);
        exportPath.scope.registerDeclaration(pageCompPath);
    };
    path.traverse({
        ExportDefaultDeclaration (exportDefaultPath) {
            addGsspExport(exportDefaultPath);
        },
        ExportNamedDeclaration (exportNamedPath) {
            addGsspExport(exportNamedPath);
        }
    });
}
const isDataIdentifier = (name, state)=>{
    if (ssgExports.has(name)) {
        if (name === EXPORT_NAME_GET_SERVER_PROPS) {
            if (state.isPrerender) {
                throw Object.defineProperty(new Error(_constants.SERVER_PROPS_SSG_CONFLICT), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
            state.isServerProps = true;
        } else {
            if (state.isServerProps) {
                throw Object.defineProperty(new Error(_constants.SERVER_PROPS_SSG_CONFLICT), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
            state.isPrerender = true;
        }
        return true;
    }
    return false;
};
function nextTransformSsg({ types: t }) {
    function getIdentifier(path) {
        const parentPath = path.parentPath;
        if (parentPath.type === 'VariableDeclarator') {
            const pp = parentPath;
            const name = pp.get('id');
            return name.node.type === 'Identifier' ? name : null;
        }
        if (parentPath.type === 'AssignmentExpression') {
            const pp = parentPath;
            const name = pp.get('left');
            return name.node.type === 'Identifier' ? name : null;
        }
        if (path.node.type === 'ArrowFunctionExpression') {
            return null;
        }
        return path.node.id && path.node.id.type === 'Identifier' ? path.get('id') : null;
    }
    function isIdentifierReferenced(ident) {
        const b = ident.scope.getBinding(ident.node.name);
        if (b == null ? void 0 : b.referenced) {
            // Functions can reference themselves, so we need to check if there's a
            // binding outside the function scope or not.
            if (b.path.type === 'FunctionDeclaration') {
                return !b.constantViolations.concat(b.referencePaths) // Check that every reference is contained within the function:
                .every((ref)=>ref.findParent((p)=>p === b.path));
            }
            return true;
        }
        return false;
    }
    function markFunction(path, state) {
        const ident = getIdentifier(path);
        if ((ident == null ? void 0 : ident.node) && isIdentifierReferenced(ident)) {
            state.refs.add(ident);
        }
    }
    function markImport(path, state) {
        const local = path.get('local');
        if (isIdentifierReferenced(local)) {
            state.refs.add(local);
        }
    }
    return {
        visitor: {
            Program: {
                enter (path, state) {
                    state.refs = new Set();
                    state.isPrerender = false;
                    state.isServerProps = false;
                    state.done = false;
                    path.traverse({
                        VariableDeclarator (variablePath, variableState) {
                            if (variablePath.node.id.type === 'Identifier') {
                                const local = variablePath.get('id');
                                if (isIdentifierReferenced(local)) {
                                    variableState.refs.add(local);
                                }
                            } else if (variablePath.node.id.type === 'ObjectPattern') {
                                const pattern = variablePath.get('id');
                                const properties = pattern.get('properties');
                                properties.forEach((p)=>{
                                    const local = p.get(p.node.type === 'ObjectProperty' ? 'value' : p.node.type === 'RestElement' ? 'argument' : function() {
                                        throw Object.defineProperty(new Error('invariant'), "__NEXT_ERROR_CODE", {
                                            value: "E400",
                                            enumerable: false,
                                            configurable: true
                                        });
                                    }());
                                    if (isIdentifierReferenced(local)) {
                                        variableState.refs.add(local);
                                    }
                                });
                            } else if (variablePath.node.id.type === 'ArrayPattern') {
                                const pattern = variablePath.get('id');
                                const elements = pattern.get('elements');
                                elements.forEach((e)=>{
                                    var _e_node, _e_node1;
                                    let local;
                                    if (((_e_node = e.node) == null ? void 0 : _e_node.type) === 'Identifier') {
                                        local = e;
                                    } else if (((_e_node1 = e.node) == null ? void 0 : _e_node1.type) === 'RestElement') {
                                        local = e.get('argument');
                                    } else {
                                        return;
                                    }
                                    if (isIdentifierReferenced(local)) {
                                        variableState.refs.add(local);
                                    }
                                });
                            }
                        },
                        FunctionDeclaration: markFunction,
                        FunctionExpression: markFunction,
                        ArrowFunctionExpression: markFunction,
                        ImportSpecifier: markImport,
                        ImportDefaultSpecifier: markImport,
                        ImportNamespaceSpecifier: markImport,
                        ExportNamedDeclaration (exportNamedPath, exportNamedState) {
                            const specifiers = exportNamedPath.get('specifiers');
                            if (specifiers.length) {
                                specifiers.forEach((s)=>{
                                    if (isDataIdentifier(t.isIdentifier(s.node.exported) ? s.node.exported.name : s.node.exported.value, exportNamedState)) {
                                        s.remove();
                                    }
                                });
                                if (exportNamedPath.node.specifiers.length < 1) {
                                    exportNamedPath.remove();
                                }
                                return;
                            }
                            const decl = exportNamedPath.get('declaration');
                            if (decl == null || decl.node == null) {
                                return;
                            }
                            switch(decl.node.type){
                                case 'FunctionDeclaration':
                                    {
                                        const name = decl.node.id.name;
                                        if (isDataIdentifier(name, exportNamedState)) {
                                            exportNamedPath.remove();
                                        }
                                        break;
                                    }
                                case 'VariableDeclaration':
                                    {
                                        const inner = decl.get('declarations');
                                        inner.forEach((d)=>{
                                            if (d.node.id.type !== 'Identifier') {
                                                return;
                                            }
                                            const name = d.node.id.name;
                                            if (isDataIdentifier(name, exportNamedState)) {
                                                d.remove();
                                            }
                                        });
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }
                        }
                    }, state);
                    if (!state.isPrerender && !state.isServerProps) {
                        return;
                    }
                    const refs = state.refs;
                    let count;
                    function sweepFunction(sweepPath) {
                        const ident = getIdentifier(sweepPath);
                        if ((ident == null ? void 0 : ident.node) && refs.has(ident) && !isIdentifierReferenced(ident)) {
                            ++count;
                            if (t.isAssignmentExpression(sweepPath.parentPath.node) || t.isVariableDeclarator(sweepPath.parentPath.node)) {
                                sweepPath.parentPath.remove();
                            } else {
                                sweepPath.remove();
                            }
                        }
                    }
                    function sweepImport(sweepPath) {
                        const local = sweepPath.get('local');
                        if (refs.has(local) && !isIdentifierReferenced(local)) {
                            ++count;
                            sweepPath.remove();
                            if (sweepPath.parent.specifiers.length === 0) {
                                sweepPath.parentPath.remove();
                            }
                        }
                    }
                    do {
                        ;
                        path.scope.crawl();
                        count = 0;
                        path.traverse({
                            // eslint-disable-next-line no-loop-func
                            VariableDeclarator (variablePath) {
                                if (variablePath.node.id.type === 'Identifier') {
                                    const local = variablePath.get('id');
                                    if (refs.has(local) && !isIdentifierReferenced(local)) {
                                        ++count;
                                        variablePath.remove();
                                    }
                                } else if (variablePath.node.id.type === 'ObjectPattern') {
                                    const pattern = variablePath.get('id');
                                    const beforeCount = count;
                                    const properties = pattern.get('properties');
                                    properties.forEach((p)=>{
                                        const local = p.get(p.node.type === 'ObjectProperty' ? 'value' : p.node.type === 'RestElement' ? 'argument' : function() {
                                            throw Object.defineProperty(new Error('invariant'), "__NEXT_ERROR_CODE", {
                                                value: "E400",
                                                enumerable: false,
                                                configurable: true
                                            });
                                        }());
                                        if (refs.has(local) && !isIdentifierReferenced(local)) {
                                            ++count;
                                            p.remove();
                                        }
                                    });
                                    if (beforeCount !== count && pattern.get('properties').length < 1) {
                                        variablePath.remove();
                                    }
                                } else if (variablePath.node.id.type === 'ArrayPattern') {
                                    const pattern = variablePath.get('id');
                                    const beforeCount = count;
                                    const elements = pattern.get('elements');
                                    elements.forEach((e)=>{
                                        var _e_node, _e_node1;
                                        let local;
                                        if (((_e_node = e.node) == null ? void 0 : _e_node.type) === 'Identifier') {
                                            local = e;
                                        } else if (((_e_node1 = e.node) == null ? void 0 : _e_node1.type) === 'RestElement') {
                                            local = e.get('argument');
                                        } else {
                                            return;
                                        }
                                        if (refs.has(local) && !isIdentifierReferenced(local)) {
                                            ++count;
                                            e.remove();
                                        }
                                    });
                                    if (beforeCount !== count && pattern.get('elements').length < 1) {
                                        variablePath.remove();
                                    }
                                }
                            },
                            FunctionDeclaration: sweepFunction,
                            FunctionExpression: sweepFunction,
                            ArrowFunctionExpression: sweepFunction,
                            ImportSpecifier: sweepImport,
                            ImportDefaultSpecifier: sweepImport,
                            ImportNamespaceSpecifier: sweepImport
                        });
                    }while (count)
                    decorateSsgExport(t, path, state);
                }
            }
        }
    };
} //# sourceMappingURL=next-ssg-transform.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/next-font-unsupported.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return NextPageDisallowReExportAllExports;
    }
});
function NextPageDisallowReExportAllExports() {
    return {
        visitor: {
            ImportDeclaration (path) {
                if ([
                    '@next/font/local',
                    '@next/font/google',
                    'next/font/local',
                    'next/font/google'
                ].includes(path.node.source.value)) {
                    var _path_node_loc, _path_node_loc1;
                    const err = Object.defineProperty(new SyntaxError(`"next/font" requires SWC although Babel is being used due to a custom babel config being present.\nRead more: https://nextjs.org/docs/messages/babel-font-loader-conflict`), "__NEXT_ERROR_CODE", {
                        value: "E542",
                        enumerable: false,
                        configurable: true
                    });
                    err.code = 'BABEL_PARSE_ERROR';
                    err.loc = ((_path_node_loc = path.node.loc) == null ? void 0 : _path_node_loc.start) ?? ((_path_node_loc1 = path.node.loc) == null ? void 0 : _path_node_loc1.end) ?? path.node.loc;
                    throw err;
                }
            }
        }
    };
} //# sourceMappingURL=next-font-unsupported.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/get-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return getConfig;
    }
});
const _nodefs = (()=>{
    const e = new Error("Cannot find module 'node:fs': Unsupported external type Url for commonjs reference");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _nodeutil = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/util/util.js [app-client] (ecmascript)");
const _json5 = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/json5/index.js [app-client] (ecmascript)"));
const _core = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/core.js [app-client] (ecmascript)");
const _corelibconfig = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/core-lib-config.js [app-client] (ecmascript)"));
const _util = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/util.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _swc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
const _installbindings = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/install-bindings.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const nextDistPath = /(next[\\/]dist[\\/]shared[\\/]lib)|(next[\\/]dist[\\/]client)|(next[\\/]dist[\\/]pages)/;
function shouldSkipBabel(transformMode, configFilePath, hasReactCompiler) {
    return transformMode === 'standalone' && configFilePath == null && !hasReactCompiler;
}
const fileExtensionRegex = /\.([a-z]+)$/;
async function getCacheCharacteristics(loaderOptions, source, filename) {
    var _fileExtensionRegex_exec;
    let isStandalone, isServer, pagesDir;
    switch(loaderOptions.transformMode){
        case 'default':
            isStandalone = false;
            isServer = loaderOptions.isServer;
            pagesDir = loaderOptions.pagesDir;
            break;
        case 'standalone':
            isStandalone = true;
            break;
        default:
            throw Object.defineProperty(new Error(`unsupported transformMode in loader options: ${(0, _nodeutil.inspect)(loaderOptions)}`), "__NEXT_ERROR_CODE", {
                value: "E811",
                enumerable: false,
                configurable: true
            });
    }
    const isPageFile = pagesDir != null && filename.startsWith(pagesDir);
    const isNextDist = nextDistPath.test(filename);
    const hasModuleExports = source.indexOf('module.exports') !== -1;
    const fileExt = ((_fileExtensionRegex_exec = fileExtensionRegex.exec(filename)) == null ? void 0 : _fileExtensionRegex_exec[1]) || 'unknown';
    let { reactCompilerPlugins, reactCompilerExclude, configFile: configFilePath, transformMode } = loaderOptions;
    // Compute `hasReactCompiler` as part of the cache characteristics / key,
    // rather than inside of `getFreshConfig`:
    // - `isReactCompilerRequired` depends on the file contents
    // - `node_modules` and `reactCompilerExclude` depend on the file path, which
    //   isn't part of the cache characteristics
    let hasReactCompiler = reactCompilerPlugins != null && reactCompilerPlugins.length !== 0 && !loaderOptions.isServer && !/[/\\]node_modules[/\\]/.test(filename) && // Assumption: `reactCompilerExclude` is cheap because it should only
    // operate on the file path and *not* the file contents (it's sync)
    !(reactCompilerExclude == null ? void 0 : reactCompilerExclude(filename));
    // `isReactCompilerRequired` is expensive to run (parses/visits with SWC), so
    // only run it if there's a good chance we might be able to skip calling Babel
    // entirely (speculatively call `shouldSkipBabel`).
    //
    // Otherwise, we can let react compiler handle this logic for us. It should
    // behave equivalently.
    if (hasReactCompiler && shouldSkipBabel(transformMode, configFilePath, /*hasReactCompiler*/ false)) {
        hasReactCompiler &&= await (0, _swc.isReactCompilerRequired)(filename);
    }
    return {
        isStandalone,
        isServer,
        isPageFile,
        isNextDist,
        hasModuleExports,
        hasReactCompiler,
        fileExt,
        configFilePath
    };
}
/**
 * Return an array of Babel plugins, conditioned upon loader options and
 * source file characteristics.
 */ function getPlugins(loaderOptions, cacheCharacteristics) {
    const { isServer, isPageFile, isNextDist, hasModuleExports } = cacheCharacteristics;
    const { development, hasReactRefresh } = loaderOptions;
    const applyCommonJsItem = hasModuleExports ? (0, _core.createConfigItem)(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/commonjs.js [app-client] (ecmascript)"), {
        type: 'plugin'
    }) : null;
    const reactRefreshItem = hasReactRefresh ? (0, _core.createConfigItem)([
        __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react-refresh/babel.js [app-client] (ecmascript)"),
        {
            skipEnvCheck: true
        }
    ], {
        type: 'plugin'
    }) : null;
    const pageConfigItem = !isServer && isPageFile ? (0, _core.createConfigItem)([
        __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/next-page-config.js [app-client] (ecmascript)")
    ], {
        type: 'plugin'
    }) : null;
    const disallowExportAllItem = !isServer && isPageFile ? (0, _core.createConfigItem)([
        __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/next-page-disallow-re-export-all-exports.js [app-client] (ecmascript)")
    ], {
        type: 'plugin'
    }) : null;
    const transformDefineItem = (0, _core.createConfigItem)([
        "[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/plugin-transform-define.js [app-client] (ecmascript)",
        {
            'process.env.NODE_ENV': development ? 'development' : 'production',
            'typeof window': isServer ? 'undefined' : 'object',
            'process.browser': isServer ? false : true
        },
        'next-js-transform-define-instance'
    ], {
        type: 'plugin'
    });
    const nextSsgItem = !isServer && isPageFile ? (0, _core.createConfigItem)([
        "[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/next-ssg-transform.js [app-client] (ecmascript)"
    ], {
        type: 'plugin'
    }) : null;
    const commonJsItem = isNextDist ? (0, _core.createConfigItem)(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/plugin-transform-modules-commonjs.js [app-client] (ecmascript)"), {
        type: 'plugin'
    }) : null;
    const nextFontUnsupported = (0, _core.createConfigItem)([
        __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/babel/plugins/next-font-unsupported.js [app-client] (ecmascript)")
    ], {
        type: 'plugin'
    });
    return [
        reactRefreshItem,
        pageConfigItem,
        disallowExportAllItem,
        applyCommonJsItem,
        transformDefineItem,
        nextSsgItem,
        commonJsItem,
        nextFontUnsupported
    ].filter(Boolean);
}
const isJsonFile = /\.(json|babelrc)$/;
const isJsFile = /\.js$/;
/**
 * While this function does block execution while reading from disk, it
 * should not introduce any issues.  The function is only invoked when
 * generating a fresh config, and only a small handful of configs should
 * be generated during compilation.
 */ function getCustomBabelConfig(configFilePath) {
    if (isJsonFile.exec(configFilePath)) {
        const babelConfigRaw = (0, _nodefs.readFileSync)(configFilePath, 'utf8');
        return _json5.default.parse(babelConfigRaw);
    } else if (isJsFile.exec(configFilePath)) {
        return (()=>{
            const e = new Error("Cannot find module as expression is too dynamic");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })();
    }
    throw Object.defineProperty(new Error('The Next.js Babel loader does not support .mjs or .cjs config files.'), "__NEXT_ERROR_CODE", {
        value: "E477",
        enumerable: false,
        configurable: true
    });
}
let babelConfigWarned = false;
/**
 * Check if custom babel configuration from user only contains options that
 * can be migrated into latest Next.js features supported by SWC.
 *
 * This raises soft warning messages only, not making any errors yet.
 */ function checkCustomBabelConfigDeprecation(config) {
    if (!config || Object.keys(config).length === 0) {
        return;
    }
    const { plugins, presets, ...otherOptions } = config;
    if (Object.keys(otherOptions ?? {}).length > 0) {
        return;
    }
    if (babelConfigWarned) {
        return;
    }
    babelConfigWarned = true;
    const isPresetReadyToDeprecate = !presets || presets.length === 0 || presets.length === 1 && presets[0] === 'next/babel';
    const pluginReasons = [];
    const unsupportedPlugins = [];
    if (Array.isArray(plugins)) {
        for (const plugin of plugins){
            const pluginName = Array.isArray(plugin) ? plugin[0] : plugin;
            // [NOTE]: We cannot detect if the user uses babel-plugin-macro based transform plugins,
            // such as `styled-components/macro` in here.
            switch(pluginName){
                case 'styled-components':
                case 'babel-plugin-styled-components':
                    pluginReasons.push(`\t- 'styled-components' can be enabled via 'compiler.styledComponents' in 'next.config.js'`);
                    break;
                case '@emotion/babel-plugin':
                    pluginReasons.push(`\t- '@emotion/babel-plugin' can be enabled via 'compiler.emotion' in 'next.config.js'`);
                    break;
                case 'babel-plugin-relay':
                    pluginReasons.push(`\t- 'babel-plugin-relay' can be enabled via 'compiler.relay' in 'next.config.js'`);
                    break;
                case 'react-remove-properties':
                    pluginReasons.push(`\t- 'react-remove-properties' can be enabled via 'compiler.reactRemoveProperties' in 'next.config.js'`);
                    break;
                case 'transform-remove-console':
                    pluginReasons.push(`\t- 'transform-remove-console' can be enabled via 'compiler.removeConsole' in 'next.config.js'`);
                    break;
                default:
                    unsupportedPlugins.push(pluginName);
                    break;
            }
        }
    }
    if (isPresetReadyToDeprecate && unsupportedPlugins.length === 0) {
        _log.warn(`It looks like there is a custom Babel configuration that can be removed${pluginReasons.length > 0 ? ':' : '.'}`);
        if (pluginReasons.length > 0) {
            _log.warn(`Next.js supports the following features natively: `);
            _log.warn(pluginReasons.join(''));
            _log.warn(`For more details configuration options, please refer https://nextjs.org/docs/architecture/nextjs-compiler#supported-features`);
        }
    }
}
/**
 * Generate a new, flat Babel config, ready to be handed to Babel-traverse.
 * This config should have no unresolved overrides, presets, etc.
 *
 * The config returned by this function is cached, so the function should not
 * depend on file-specific configuration or configuration that could change
 * across invocations without a process restart.
 */ async function getFreshConfig(ctx, cacheCharacteristics, loaderOptions, target) {
    const { transformMode } = loaderOptions;
    const { hasReactCompiler, configFilePath, fileExt } = cacheCharacteristics;
    let customConfig = configFilePath && getCustomBabelConfig(configFilePath);
    if (shouldSkipBabel(transformMode, configFilePath, hasReactCompiler)) {
        // Optimization: There's nothing useful to do, bail out and skip babel on
        // this file
        return null;
    }
    checkCustomBabelConfigDeprecation(customConfig);
    // We can assume that `reactCompilerPlugins` does not change without a process
    // restart (it's safe to cache), as it's specified in the `next.config.js`,
    // which always causes a full restart of `next dev` if changed.
    const reactCompilerPluginsIfEnabled = hasReactCompiler ? loaderOptions.reactCompilerPlugins ?? [] : [];
    let isServer, pagesDir, srcDir, development;
    if (transformMode === 'default') {
        isServer = loaderOptions.isServer;
        pagesDir = loaderOptions.pagesDir;
        srcDir = loaderOptions.srcDir;
        development = loaderOptions.development;
    }
    let options = {
        babelrc: false,
        cloneInputAst: false,
        // Use placeholder file info. `updateBabelConfigWithFileDetails` will
        // replace this after caching.
        filename: `basename.${fileExt}`,
        inputSourceMap: undefined,
        sourceFileName: `basename.${fileExt}`,
        // Set the default sourcemap behavior based on Webpack's mapping flag,
        // but allow users to override if they want.
        sourceMaps: loaderOptions.sourceMaps === undefined ? ctx.sourceMap : loaderOptions.sourceMaps
    };
    const baseCaller = {
        name: 'next-babel-turbo-loader',
        supportsStaticESM: true,
        supportsDynamicImport: true,
        // Provide plugins with insight into webpack target.
        // https://github.com/babel/babel-loader/issues/787
        target,
        // Webpack 5 supports TLA behind a flag. We enable it by default
        // for Babel, and then webpack will throw an error if the experimental
        // flag isn't enabled.
        supportsTopLevelAwait: true,
        isServer,
        srcDir,
        pagesDir,
        isDev: development,
        transformMode,
        ...loaderOptions.caller
    };
    options.plugins = [
        ...transformMode === 'default' ? getPlugins(loaderOptions, cacheCharacteristics) : [],
        ...reactCompilerPluginsIfEnabled,
        ...(customConfig == null ? void 0 : customConfig.plugins) || []
    ];
    // target can be provided in babelrc
    options.target = isServer ? undefined : customConfig == null ? void 0 : customConfig.target;
    // env can be provided in babelrc
    options.env = customConfig == null ? void 0 : customConfig.env;
    options.presets = (()=>{
        // If presets is defined the user will have next/babel in their babelrc
        if (customConfig == null ? void 0 : customConfig.presets) {
            return customConfig.presets;
        }
        // If presets is not defined the user will likely have "env" in their babelrc
        if (customConfig) {
            return undefined;
        }
        // If no custom config is provided the default is to use next/babel
        return [
            'next/babel'
        ];
    })();
    options.overrides = loaderOptions.overrides;
    options.caller = {
        ...baseCaller,
        hasJsxRuntime: transformMode === 'default' ? loaderOptions.hasJsxRuntime : undefined
    };
    // Babel does strict checks on the config so undefined is not allowed
    if (typeof options.target === 'undefined') {
        delete options.target;
    }
    Object.defineProperty(options.caller, 'onWarning', {
        enumerable: false,
        writable: false,
        value: (reason)=>{
            if (!(reason instanceof Error)) {
                reason = Object.defineProperty(new Error(reason), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
            ctx.emitWarning(reason);
        }
    });
    const loadedOptions = (0, _core.loadOptions)(options);
    const config = (0, _util.consumeIterator)((0, _corelibconfig.default)(loadedOptions));
    return config;
}
/**
 * Each key returned here corresponds with a Babel config that can be shared.
 * The conditions of permissible sharing between files is dependent on specific
 * file attributes and Next.js compiler states: `CharacteristicsGermaneToCaching`.
 */ function getCacheKey(cacheCharacteristics) {
    const { isStandalone, isServer, isPageFile, isNextDist, hasModuleExports, hasReactCompiler, fileExt, configFilePath } = cacheCharacteristics;
    const flags = 0 | (isStandalone ? 1 : 0) | (isServer ? 2 : 0) | (isPageFile ? 4 : 0) | (isNextDist ? 8 : 0) | (hasModuleExports ? 16 : 0) | (hasReactCompiler ? 32 : 0);
    // separate strings with null bytes, assuming null bytes are not valid in file
    // paths
    return `${configFilePath || ''}\x00${fileExt}\x00${flags}`;
}
const configCache = new Map();
const configFiles = new Set();
/**
 * Applies file-specific values to a potentially-cached configuration object.
 */ function updateBabelConfigWithFileDetails(cachedConfig, loaderOptions, filename, inputSourceMap) {
    if (cachedConfig == null) {
        return null;
    }
    return {
        ...cachedConfig,
        options: {
            ...cachedConfig.options,
            cwd: loaderOptions.cwd,
            root: loaderOptions.cwd,
            filename,
            inputSourceMap,
            // Ensure that Webpack will get a full absolute path in the sourcemap
            // so that it can properly map the module back to its internal cached
            // modules.
            sourceFileName: filename
        }
    };
}
async function getConfig(ctx, { source, target, loaderOptions, filename, inputSourceMap }) {
    // Install bindings early so they are definitely available to the loader.
    // When run by webpack in next this is already done with correct configuration so this is a no-op.
    // In turbopack loaders are run in a subprocess so it may or may not be done.
    await (0, _installbindings.installBindings)();
    const cacheCharacteristics = await getCacheCharacteristics(loaderOptions, source, filename);
    if (loaderOptions.configFile) {
        // Ensures webpack invalidates the cache for this loader when the config file changes
        ctx.addDependency(loaderOptions.configFile);
    }
    const cacheKey = getCacheKey(cacheCharacteristics);
    const cachedConfig = configCache.get(cacheKey);
    if (cachedConfig !== undefined) {
        return updateBabelConfigWithFileDetails(cachedConfig, loaderOptions, filename, inputSourceMap);
    }
    if (loaderOptions.configFile && !configFiles.has(loaderOptions.configFile)) {
        configFiles.add(loaderOptions.configFile);
        _log.info(`Using external babel configuration from ${loaderOptions.configFile}`);
    }
    const freshConfig = await getFreshConfig(ctx, cacheCharacteristics, loaderOptions, target);
    configCache.set(cacheKey, freshConfig);
    return updateBabelConfigWithFileDetails(freshConfig, loaderOptions, filename, inputSourceMap);
} //# sourceMappingURL=get-config.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/transform.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*
 * Partially adapted from @babel/core (MIT license).
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return transform;
    }
});
const _traverse = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/traverse.js [app-client] (ecmascript)"));
const _generator = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/generator.js [app-client] (ecmascript)"));
const _corelibnormalizefile = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/core-lib-normalize-file.js [app-client] (ecmascript)"));
const _corelibnormalizeopts = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/core-lib-normalize-opts.js [app-client] (ecmascript)"));
const _corelibblockhoistplugin = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/core-lib-block-hoist-plugin.js [app-client] (ecmascript)"));
const _corelibpluginpass = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/core-lib-plugin-pass.js [app-client] (ecmascript)"));
const _getconfig = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/get-config.js [app-client] (ecmascript)"));
const _util = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/util.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getTraversalParams(file, pluginPairs) {
    const passPairs = [];
    const passes = [];
    const visitors = [];
    for (const plugin of pluginPairs.concat((0, _corelibblockhoistplugin.default)())){
        const pass = new _corelibpluginpass.default(file, plugin.key, plugin.options);
        passPairs.push([
            plugin,
            pass
        ]);
        passes.push(pass);
        visitors.push(plugin.visitor);
    }
    return {
        passPairs,
        passes,
        visitors
    };
}
function invokePluginPre(file, passPairs) {
    for (const [{ pre }, pass] of passPairs){
        if (pre) {
            pre.call(pass, file);
        }
    }
}
function invokePluginPost(file, passPairs) {
    for (const [{ post }, pass] of passPairs){
        if (post) {
            post.call(pass, file);
        }
    }
}
function transformAstPass(file, pluginPairs, parentSpan) {
    const { passPairs, passes, visitors } = getTraversalParams(file, pluginPairs);
    invokePluginPre(file, passPairs);
    const visitor = _traverse.default.visitors.merge(visitors, passes, file.opts.wrapPluginVisitorMethod);
    parentSpan.traceChild('babel-turbo-traverse').traceFn(()=>(0, _traverse.default)(file.ast, visitor, file.scope));
    invokePluginPost(file, passPairs);
}
function transformAst(file, babelConfig, parentSpan) {
    for (const pluginPairs of babelConfig.passes){
        transformAstPass(file, pluginPairs, parentSpan);
    }
}
async function transform(ctx, source, inputSourceMap, loaderOptions, filename, target, parentSpan) {
    const getConfigSpan = parentSpan.traceChild('babel-turbo-get-config');
    const babelConfig = await (0, _getconfig.default)(ctx, {
        source,
        loaderOptions,
        inputSourceMap: inputSourceMap ?? undefined,
        target,
        filename
    });
    if (!babelConfig) {
        return {
            code: source,
            map: inputSourceMap ?? null
        };
    }
    getConfigSpan.stop();
    const normalizeSpan = parentSpan.traceChild('babel-turbo-normalize-file');
    const file = (0, _util.consumeIterator)((0, _corelibnormalizefile.default)(babelConfig.passes, (0, _corelibnormalizeopts.default)(babelConfig), source));
    normalizeSpan.stop();
    const transformSpan = parentSpan.traceChild('babel-turbo-transform');
    transformAst(file, babelConfig, transformSpan);
    transformSpan.stop();
    const generateSpan = parentSpan.traceChild('babel-turbo-generate');
    const { code, map } = (0, _generator.default)(file.ast, file.opts.generatorOpts, file.code);
    generateSpan.stop();
    return {
        code,
        map
    };
} //# sourceMappingURL=transform.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _transform = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/transform.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function nextBabelLoader(ctx, parentTrace, inputSource, inputSourceMap) {
    const filename = ctx.resourcePath;
    // Ensure `.d.ts` are not processed.
    if (filename.endsWith('.d.ts')) {
        return [
            inputSource,
            inputSourceMap
        ];
    }
    const target = ctx.target;
    const loaderOptions = parentTrace.traceChild('get-options') // @ts-ignore TODO: remove ignore once webpack 5 types are used
    .traceFn(()=>ctx.getOptions());
    if (loaderOptions.exclude && loaderOptions.exclude(filename)) {
        return [
            inputSource,
            inputSourceMap
        ];
    }
    const loaderSpanInner = parentTrace.traceChild('next-babel-turbo-transform');
    const { code: transformedSource, map: outputSourceMap } = await loaderSpanInner.traceAsyncFn(async ()=>await (0, _transform.default)(ctx, inputSource, inputSourceMap, loaderOptions, filename, target, loaderSpanInner));
    return [
        transformedSource,
        outputSourceMap
    ];
}
function nextBabelLoaderOuter(inputSource, inputSourceMap) {
    const callback = this.async();
    const loaderSpan = this.currentTraceSpan.traceChild('next-babel-turbo-loader');
    loaderSpan.traceAsyncFn(()=>nextBabelLoader(this, loaderSpan, inputSource, inputSourceMap)).then(([transformedSource, outputSourceMap])=>callback == null ? void 0 : callback(/* err */ null, transformedSource, outputSourceMap ?? inputSourceMap), (err)=>{
        callback == null ? void 0 : callback(err);
    });
}
// check this type matches `webpack.LoaderDefinitionFunction`, but be careful
// not to publicly rely on the webpack type since the generated typescript
// declarations will be wrong.
const _nextBabelLoaderOuter = nextBabelLoaderOuter;
const _default = nextBabelLoaderOuter; //# sourceMappingURL=index.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/get-babel-loader-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getBabelLoader: null,
    getReactCompilerLoader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getBabelLoader: function() {
        return getBabelLoader;
    },
    getReactCompilerLoader: function() {
        return getReactCompilerLoader;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getReactCompiler() {
    try {
        return (()=>{
            const e = new Error("Cannot find module 'babel-plugin-react-compiler'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })();
    } catch  {
        throw Object.defineProperty(new Error('Failed to load the `babel-plugin-react-compiler`. It is required to use the React Compiler. Please install it.'), "__NEXT_ERROR_CODE", {
            value: "E78",
            enumerable: false,
            configurable: true
        });
    }
}
const getReactCompilerPlugins = (maybeOptions, isServer, isDev)=>{
    if (!maybeOptions || isServer) {
        return undefined;
    }
    const environment = {
        enableNameAnonymousFunctions: isDev
    };
    const options = typeof maybeOptions === 'boolean' ? {} : maybeOptions;
    const compilerOptions = {
        ...options,
        environment
    };
    return [
        [
            getReactCompiler(),
            compilerOptions
        ]
    ];
};
const getBabelLoader = (useSWCLoader, babelConfigFile, isServer, distDir, pagesDir, cwd, srcDir, dev, isClient, reactCompilerOptions, reactCompilerExclude)=>{
    if (!useSWCLoader) {
        // Make sure these options are kept in sync with
        // `packages/next/src/build/get-babel-loader-config.ts`
        const options = {
            transformMode: 'default',
            configFile: babelConfigFile,
            isServer,
            distDir,
            pagesDir,
            cwd,
            srcDir: _path.default.dirname(srcDir),
            development: dev,
            hasReactRefresh: dev && isClient,
            hasJsxRuntime: true,
            reactCompilerPlugins: getReactCompilerPlugins(reactCompilerOptions, isServer, dev),
            reactCompilerExclude
        };
        return {
            loader: "[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/index.js [app-client] (ecmascript)",
            options
        };
    }
    return undefined;
};
/**
 * Get a separate babel loader for the react compiler, only used if Babel is not
 * configured through e.g. .babelrc. If user have babel config, this should be configured in the babel loader itself.
 * Note from react compiler:
 * > For best results, compiler must run as the first plugin in your Babel pipeline so it receives input as close to the original source as possible.
 */ const getReactCompilerLoader = (reactCompilerOptions, cwd, isServer, reactCompilerExclude, isDev)=>{
    const reactCompilerPlugins = getReactCompilerPlugins(reactCompilerOptions, isServer, isDev);
    if (!reactCompilerPlugins) {
        return undefined;
    }
    const babelLoaderOptions = {
        transformMode: 'standalone',
        cwd,
        reactCompilerPlugins,
        isServer
    };
    if (reactCompilerExclude) {
        babelLoaderOptions.reactCompilerExclude = reactCompilerExclude;
    }
    return {
        loader: "[project]/JobPortal/frontend/node_modules/next/dist/build/babel/loader/index.js [app-client] (ecmascript)",
        options: babelLoaderOptions
    };
}; //# sourceMappingURL=get-babel-loader-config.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/build/webpack-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NODE_BASE_ESM_RESOLVE_OPTIONS: null,
    NODE_BASE_RESOLVE_OPTIONS: null,
    NODE_ESM_RESOLVE_OPTIONS: null,
    NODE_RESOLVE_OPTIONS: null,
    attachReactRefresh: null,
    babelIncludeRegexes: null,
    default: null,
    getCacheDirectories: null,
    hasExternalOtelApiPackage: null,
    loadProjectInfo: null,
    nextImageLoaderRegex: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NODE_BASE_ESM_RESOLVE_OPTIONS: function() {
        return NODE_BASE_ESM_RESOLVE_OPTIONS;
    },
    NODE_BASE_RESOLVE_OPTIONS: function() {
        return NODE_BASE_RESOLVE_OPTIONS;
    },
    NODE_ESM_RESOLVE_OPTIONS: function() {
        return NODE_ESM_RESOLVE_OPTIONS;
    },
    NODE_RESOLVE_OPTIONS: function() {
        return NODE_RESOLVE_OPTIONS;
    },
    attachReactRefresh: function() {
        return attachReactRefresh;
    },
    babelIncludeRegexes: function() {
        return babelIncludeRegexes;
    },
    default: function() {
        return getBaseWebpackConfig;
    },
    getCacheDirectories: function() {
        return getCacheDirectories;
    },
    hasExternalOtelApiPackage: function() {
        return hasExternalOtelApiPackage;
    },
    loadProjectInfo: function() {
        return loadProjectInfo;
    },
    nextImageLoaderRegex: function() {
        return nextImageLoaderRegex;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _ReactRefreshWebpackPlugin = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/ReactRefreshWebpackPlugin.js [app-client] (ecmascript)"));
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _crypto = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)"));
const _webpack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/webpack/webpack.js [app-client] (ecmascript)");
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _defineenv = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/define-env.js [app-client] (ecmascript)");
const _escaperegexp = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/escape-regexp.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _entries = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/entries.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _config = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/config/index.js [app-client] (ecmascript)");
const _forcecompleteruntime = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/force-complete-runtime.js [app-client] (ecmascript)"));
const _middlewareplugin = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/middleware-plugin.js [app-client] (ecmascript)"));
const _buildmanifestplugin = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/build-manifest-plugin.js [app-client] (ecmascript)"));
const _jsconfigpathsplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/jsconfig-paths-plugin.js [app-client] (ecmascript)");
const _pagesmanifestplugin = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/pages-manifest-plugin.js [app-client] (ecmascript)"));
const _profilingplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/profiling-plugin.js [app-client] (ecmascript)");
const _reactloadableplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/react-loadable-plugin.js [app-client] (ecmascript)");
const _wellknownerrorsplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/wellknown-errors-plugin/index.js [app-client] (ecmascript)");
const _css = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/config/blocks/css/index.js [app-client] (ecmascript)");
const _copyfileplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/copy-file-plugin.js [app-client] (ecmascript)");
const _flightmanifestplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/flight-manifest-plugin.js [app-client] (ecmascript)");
const _flightcliententryplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/flight-client-entry-plugin.js [app-client] (ecmascript)");
const _rspackflightcliententryplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/rspack-flight-client-entry-plugin.js [app-client] (ecmascript)");
const _nexttypesplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/next-types-plugin/index.js [app-client] (ecmascript)");
const _loadjsconfig = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/load-jsconfig.js [app-client] (ecmascript)"));
const _subresourceintegrityplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/subresource-integrity-plugin.js [app-client] (ecmascript)");
const _nextfontmanifestplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/next-font-manifest-plugin.js [app-client] (ecmascript)");
const _memorywithgccacheplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/memory-with-gc-cache-plugin.js [app-client] (ecmascript)");
const _getbabelconfigfile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/get-babel-config-file.js [app-client] (ecmascript)");
const _needsexperimentalreact = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/needs-experimental-react.js [app-client] (ecmascript)");
const _handleexternals = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/handle-externals.js [app-client] (ecmascript)");
const _resolve = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack-config-rules/resolve.js [app-client] (ecmascript)");
const _optionalpeerdependencyresolveplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/optional-peer-dependency-resolve-plugin.js [app-client] (ecmascript)");
const _createcompileraliases = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/create-compiler-aliases.js [app-client] (ecmascript)");
const _utils2 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/export/utils.js [app-client] (ecmascript)");
const _csschunkingplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/css-chunking-plugin.js [app-client] (ecmascript)");
const _getbabelloaderconfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/get-babel-loader-config.js [app-client] (ecmascript)");
const _nextdirpaths = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/next-dir-paths.js [app-client] (ecmascript)");
const _getrspack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/get-rspack.js [app-client] (ecmascript)");
const _rspackprofilingplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/rspack-profiling-plugin.js [app-client] (ecmascript)");
const _getwebpackbundler = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/get-webpack-bundler.js [app-client] (ecmascript)"));
const _requirehook = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/require-hook.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const EXTERNAL_PACKAGES = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/server-external-packages.json (json)");
const DEFAULT_TRANSPILED_PACKAGES = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/default-transpiled-packages.json (json)");
if (parseInt(_react.default.version) < 18) {
    throw Object.defineProperty(new Error('Next.js requires react >= 18.2.0 to be installed.'), "__NEXT_ERROR_CODE", {
        value: "E480",
        enumerable: false,
        configurable: true
    });
}
const babelIncludeRegexes = [
    /next[\\/]dist[\\/](esm[\\/])?shared[\\/]lib/,
    /next[\\/]dist[\\/](esm[\\/])?client/,
    /next[\\/]dist[\\/](esm[\\/])?pages/,
    /[\\/](strip-ansi|ansi-regex|styled-jsx)[\\/]/
];
const browserNonTranspileModules = [
    // Transpiling `process/browser` will trigger babel compilation error due to value replacement.
    // TypeError: Property left of AssignmentExpression expected node to be of a type ["LVal"] but instead got "BooleanLiteral"
    // e.g. `process.browser = true` will become `true = true`.
    /[\\/]node_modules[\\/]process[\\/]browser/,
    // Exclude precompiled react packages from browser compilation due to SWC helper insertion (#61791),
    // We fixed the issue but it's safer to exclude them from compilation since they don't need to be re-compiled.
    /[\\/]next[\\/]dist[\\/]compiled[\\/](react|react-dom|react-server-dom-webpack)(-experimental)?($|[\\/])/
];
const precompileRegex = /[\\/]next[\\/]dist[\\/]compiled[\\/]/;
const asyncStoragesRegex = /next[\\/]dist[\\/](esm[\\/])?server[\\/]app-render[\\/](work-async-storage|action-async-storage|dynamic-access-async-storage|work-unit-async-storage)/;
// Support for NODE_PATH
const nodePathList = (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NODE_PATH || '').split(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ':').filter((p)=>!!p);
const baseWatchOptions = Object.freeze({
    aggregateTimeout: 5,
    ignored: /^((?:[^/]*(?:\/|$))*)(\.(git|next)|node_modules)(\/((?:[^/]*(?:\/|$))*)(?:$|\/))?/
});
function isModuleCSS(module1) {
    return module1.type === `css/mini-extract` || // extract-css-chunks-webpack-plugin (old)
    module1.type === `css/extract-chunks` || // extract-css-chunks-webpack-plugin (new)
    module1.type === `css/extract-css-chunks`;
}
const devtoolRevertWarning = (0, _utils1.execOnce)((devtool)=>{
    console.warn((0, _picocolors.yellow)((0, _picocolors.bold)('Warning: ')) + (0, _picocolors.bold)(`Reverting webpack devtool to '${devtool}'.\n`) + 'Changing the webpack devtool in development mode will cause severe performance regressions.\n' + 'Read more: https://nextjs.org/docs/messages/improper-devtool');
});
let loggedSwcDisabled = false;
let loggedIgnoredCompilerOptions = false;
const reactRefreshLoaderName = 'next/dist/compiled/@next/react-refresh-utils/dist/loader';
function getReactRefreshLoader() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_RSPACK ? 'builtin:react-refresh-loader' : "[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/loader.js [app-client] (ecmascript)";
}
function attachReactRefresh(webpackConfig, targetLoader) {
    var _webpackConfig_module_rules, _webpackConfig_module;
    const reactRefreshLoader = getReactRefreshLoader();
    (_webpackConfig_module = webpackConfig.module) == null ? void 0 : (_webpackConfig_module_rules = _webpackConfig_module.rules) == null ? void 0 : _webpackConfig_module_rules.forEach((rule)=>{
        if (rule && typeof rule === 'object' && 'use' in rule) {
            const curr = rule.use;
            // When the user has configured `defaultLoaders.babel` for a input file:
            if (curr === targetLoader) {
                rule.use = [
                    reactRefreshLoader,
                    curr
                ];
            } else if (Array.isArray(curr) && curr.some((r)=>r === targetLoader) && // Check if loader already exists:
            !curr.some((r)=>r === reactRefreshLoader || r === reactRefreshLoaderName)) {
                const idx = curr.findIndex((r)=>r === targetLoader);
                // Clone to not mutate user input
                rule.use = [
                    ...curr
                ];
                // inject / input: [other, babel] output: [other, refresh, babel]:
                rule.use.splice(idx, 0, reactRefreshLoader);
            }
        }
    });
}
const NODE_RESOLVE_OPTIONS = {
    dependencyType: 'commonjs',
    modules: [
        'node_modules'
    ],
    fallback: false,
    exportsFields: [
        'exports'
    ],
    importsFields: [
        'imports'
    ],
    conditionNames: [
        'node',
        'require'
    ],
    descriptionFiles: [
        'package.json'
    ],
    extensions: [
        '.js',
        '.json',
        '.node'
    ],
    enforceExtensions: false,
    symlinks: true,
    mainFields: [
        'main'
    ],
    mainFiles: [
        'index'
    ],
    roots: [],
    fullySpecified: false,
    preferRelative: false,
    preferAbsolute: false,
    restrictions: []
};
const NODE_BASE_RESOLVE_OPTIONS = {
    ...NODE_RESOLVE_OPTIONS,
    alias: false
};
const NODE_ESM_RESOLVE_OPTIONS = {
    ...NODE_RESOLVE_OPTIONS,
    alias: false,
    dependencyType: 'esm',
    conditionNames: [
        'node',
        'import'
    ],
    fullySpecified: true
};
const NODE_BASE_ESM_RESOLVE_OPTIONS = {
    ...NODE_ESM_RESOLVE_OPTIONS,
    alias: false
};
const nextImageLoaderRegex = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i;
async function loadProjectInfo({ dir, config, dev }) {
    const { jsConfig, jsConfigPath, resolvedBaseUrl } = await (0, _loadjsconfig.default)(dir, config);
    const supportedBrowsers = (0, _utils.getSupportedBrowsers)(dir, dev);
    return {
        jsConfig,
        jsConfigPath,
        resolvedBaseUrl,
        supportedBrowsers
    };
}
function hasExternalOtelApiPackage() {
    try {
        (()=>{
            const e = new Error("Cannot find module '@opentelemetry/api'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })();
        return true;
    } catch  {
        return false;
    }
}
const UNSAFE_CACHE_REGEX = /[\\/]pages[\\/][^\\/]+(?:$|\?|#)/;
const NEGATIVE_UNSAFE_CACHE_REGEX = new RegExp(`^(?!.*${UNSAFE_CACHE_REGEX.source}).*$`);
function getCacheDirectories(configs) {
    return new Set(configs.map((cfg)=>{
        if (typeof cfg.cache === 'object' && cfg.cache.type === 'filesystem') {
            return cfg.cache.cacheDirectory;
        }
        return null;
    }).filter((dir)=>dir != null));
}
async function getBaseWebpackConfig(dir, { buildId, encryptionKey, config, compilerType, dev = false, entrypoints, isDevFallback = false, pagesDir, reactProductionProfiling = false, rewrites, originalRewrites, originalRedirects, runWebpackSpan, appDir, middlewareMatchers, noMangling, jsConfig, jsConfigPath, resolvedBaseUrl, supportedBrowsers, clientRouterFilters, fetchCacheKeyPrefix, isCompileMode, previewProps }) {
    var _config_compiler, _config_compiler1, _config_compiler2, _jsConfig_compilerOptions, _config_compiler3, _jsConfig_compilerOptions1, _config_compiler4, _config_experimental, _config_watchOptions, _config_experimental_sri, _config_experimental_sri1, _jsConfig_compilerOptions2, // if the config is added/removed
    _webpackConfig_resolve_plugins, _webpackConfig_resolve, _config_experimental1, _config_compiler5, _config_compiler6, _config_compiler7, _config_compiler8, _config_compiler9, _webpack5Config_plugins, _webpackConfig_module, _webpackConfig_module1, _webpackConfig_module_rules, _webpackConfig_module2;
    const bundler = (0, _getwebpackbundler.default)();
    const isClient = compilerType === _constants1.COMPILER_NAMES.client;
    const isEdgeServer = compilerType === _constants1.COMPILER_NAMES.edgeServer;
    const isNodeServer = compilerType === _constants1.COMPILER_NAMES.server;
    const isRspack = Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_RSPACK);
    const FlightClientEntryPlugin = isRspack && __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BUILTIN_FLIGHT_CLIENT_ENTRY_PLUGIN ? _rspackflightcliententryplugin.RspackFlightClientEntryPlugin : _flightcliententryplugin.FlightClientEntryPlugin;
    // If the current compilation is aimed at server-side code instead of client-side code.
    const isNodeOrEdgeCompilation = isNodeServer || isEdgeServer;
    const hasRewrites = rewrites.beforeFiles.length > 0 || rewrites.afterFiles.length > 0 || rewrites.fallback.length > 0;
    const hasAppDir = !!appDir;
    const disableOptimizedLoading = true;
    const bundledReactChannel = (0, _needsexperimentalreact.needsExperimentalReact)(config) ? '-experimental' : '';
    const babelConfigFile = (0, _getbabelconfigfile.getBabelConfigFile)(dir);
    if (!dev && (0, _utils2.hasCustomExportOutput)(config)) {
        config.distDir = '.next';
    }
    const distDir = _path.default.join(dir, config.distDir);
    let useSWCLoader = !babelConfigFile || config.experimental.forceSwcTransforms;
    let SWCBinaryTarget = undefined;
    if (useSWCLoader) {
        var _require_getBinaryMetadata, _require_getBinaryMetadata1, _require;
        // TODO: we do not collect wasm target yet
        const binaryTarget = (_require = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)")) == null ? void 0 : (_require_getBinaryMetadata1 = _require.getBinaryMetadata) == null ? void 0 : (_require_getBinaryMetadata = _require_getBinaryMetadata1.call(_require)) == null ? void 0 : _require_getBinaryMetadata.target;
        SWCBinaryTarget = binaryTarget ? [
            `swc/target/${binaryTarget}`,
            true
        ] : undefined;
    }
    if (!loggedSwcDisabled && !useSWCLoader && babelConfigFile) {
        _log.info(`Disabled SWC as replacement for Babel because of custom Babel configuration "${_path.default.relative(dir, babelConfigFile)}" https://nextjs.org/docs/messages/swc-disabled`);
        loggedSwcDisabled = true;
    }
    // since `pages` doesn't always bundle by default we need to
    // auto-include optimizePackageImports in transpilePackages
    const finalTranspilePackages = (config.transpilePackages || []).concat(DEFAULT_TRANSPILED_PACKAGES);
    for (const pkg of config.experimental.optimizePackageImports || []){
        if (!finalTranspilePackages.includes(pkg)) {
            finalTranspilePackages.push(pkg);
        }
    }
    if (!loggedIgnoredCompilerOptions && !useSWCLoader && config.compiler) {
        _log.info('`compiler` options in `next.config.js` will be ignored while using Babel https://nextjs.org/docs/messages/ignored-compiler-options');
        loggedIgnoredCompilerOptions = true;
    }
    const excludeCache = {};
    function exclude(excludePath) {
        const cached = excludeCache[excludePath];
        if (cached !== undefined) {
            return cached;
        }
        const shouldExclude = excludePath.includes('node_modules') && !babelIncludeRegexes.some((r)=>r.test(excludePath)) && !(0, _handleexternals.isResourceInPackages)(excludePath, finalTranspilePackages);
        excludeCache[excludePath] = shouldExclude;
        return shouldExclude;
    }
    const shouldIncludeExternalDirs = config.experimental.externalDir || !!config.transpilePackages;
    const codeCondition = {
        test: {
            or: [
                /\.(tsx|ts|js|cjs|mjs|jsx)$/,
                /__barrel_optimize__/
            ]
        },
        ...shouldIncludeExternalDirs ? {} : {
            include: [
                dir,
                ...babelIncludeRegexes
            ]
        },
        exclude
    };
    const babelLoader = (0, _getbabelloaderconfig.getBabelLoader)(useSWCLoader, babelConfigFile, isNodeOrEdgeCompilation, distDir, pagesDir, dir, appDir || pagesDir, dev, isClient, config.reactCompiler, codeCondition.exclude);
    const reactCompilerLoader = babelLoader ? undefined : (0, _getbabelloaderconfig.getReactCompilerLoader)(config.reactCompiler, dir, isNodeOrEdgeCompilation, codeCondition.exclude, dev);
    let swcTraceProfilingInitialized = false;
    const getSwcLoader = (extraOptions)=>{
        var _config_experimental;
        if ((config == null ? void 0 : (_config_experimental = config.experimental) == null ? void 0 : _config_experimental.swcTraceProfiling) && !swcTraceProfilingInitialized) {
            var _require_initCustomTraceSubscriber, _require;
            // This will init subscribers once only in a single process lifecycle,
            // even though it can be called multiple times.
            // Subscriber need to be initialized _before_ any actual swc's call (transform, etcs)
            // to collect correct trace spans when they are called.
            swcTraceProfilingInitialized = true;
            (_require = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)")) == null ? void 0 : (_require_initCustomTraceSubscriber = _require.initCustomTraceSubscriber) == null ? void 0 : _require_initCustomTraceSubscriber.call(_require, _path.default.join(distDir, `swc-trace-profile-${Date.now()}.json`));
        }
        const useBuiltinSwcLoader = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.BUILTIN_SWC_LOADER;
        if (isRspack && useBuiltinSwcLoader) {
            var _jsConfig_compilerOptions, _jsConfig_compilerOptions1;
            return {
                loader: 'builtin:next-swc-loader',
                options: {
                    isServer: isNodeOrEdgeCompilation,
                    rootDir: dir,
                    pagesDir,
                    appDir,
                    hasReactRefresh: dev && isClient,
                    transpilePackages: finalTranspilePackages,
                    supportedBrowsers,
                    swcCacheDir: _path.default.join(dir, (config == null ? void 0 : config.distDir) ?? '.next', 'cache', 'swc'),
                    serverReferenceHashSalt: encryptionKey,
                    // rspack specific options
                    pnp: Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.pnp),
                    optimizeServerReact: Boolean(config.experimental.optimizeServerReact),
                    modularizeImports: config.modularizeImports,
                    decorators: Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.experimentalDecorators),
                    emitDecoratorMetadata: Boolean(jsConfig == null ? void 0 : (_jsConfig_compilerOptions1 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions1.emitDecoratorMetadata),
                    regeneratorRuntimePath: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/regenerator-runtime/runtime.js [app-client] (ecmascript)",
                    ...extraOptions
                }
            };
        }
        return {
            loader: 'next-swc-loader',
            options: {
                isServer: isNodeOrEdgeCompilation,
                compilerType,
                rootDir: dir,
                pagesDir,
                appDir,
                hasReactRefresh: dev && isClient,
                nextConfig: config,
                jsConfig,
                transpilePackages: finalTranspilePackages,
                supportedBrowsers,
                swcCacheDir: _path.default.join(dir, (config == null ? void 0 : config.distDir) ?? '.next', 'cache', 'swc'),
                serverReferenceHashSalt: encryptionKey,
                ...extraOptions
            }
        };
    };
    // RSC loaders, prefer ESM, set `esm` to true
    const swcServerLayerLoader = getSwcLoader({
        serverComponents: true,
        bundleLayer: _constants.WEBPACK_LAYERS.reactServerComponents,
        esm: true
    });
    const swcSSRLayerLoader = getSwcLoader({
        serverComponents: true,
        bundleLayer: _constants.WEBPACK_LAYERS.serverSideRendering,
        esm: true
    });
    const swcBrowserLayerLoader = getSwcLoader({
        serverComponents: true,
        bundleLayer: _constants.WEBPACK_LAYERS.appPagesBrowser,
        esm: true
    });
    // Default swc loaders for pages doesn't prefer ESM.
    const swcDefaultLoader = getSwcLoader({
        serverComponents: true,
        esm: false
    });
    const defaultLoaders = {
        babel: useSWCLoader ? swcDefaultLoader : babelLoader
    };
    const appServerLayerLoaders = hasAppDir ? [
        // When using Babel, we will have to add the SWC loader
        // as an additional pass to handle RSC correctly.
        // This will cause some performance overhead but
        // acceptable as Babel will not be recommended.
        swcServerLayerLoader,
        babelLoader,
        reactCompilerLoader
    ].filter(Boolean) : [];
    const instrumentLayerLoaders = [
        'next-flight-loader',
        // When using Babel, we will have to add the SWC loader
        // as an additional pass to handle RSC correctly.
        // This will cause some performance overhead but
        // acceptable as Babel will not be recommended.
        swcServerLayerLoader,
        babelLoader
    ].filter(Boolean);
    const middlewareLayerLoaders = [
        'next-flight-loader',
        // When using Babel, we will have to use SWC to do the optimization
        // for middleware to tree shake the unused default optimized imports like "next/server".
        // This will cause some performance overhead but
        // acceptable as Babel will not be recommended.
        getSwcLoader({
            serverComponents: true,
            bundleLayer: _constants.WEBPACK_LAYERS.middleware
        }),
        babelLoader
    ].filter(Boolean);
    const reactRefreshLoaders = dev && isClient ? [
        getReactRefreshLoader()
    ] : [];
    // client components layers: SSR or browser
    const createClientLayerLoader = ({ isBrowserLayer, reactRefresh })=>[
            ...reactRefresh ? reactRefreshLoaders : [],
            {
                // This loader handles actions and client entries
                // in the client layer.
                loader: 'next-flight-client-module-loader'
            },
            ...hasAppDir ? [
                // When using Babel, we will have to add the SWC loader
                // as an additional pass to handle RSC correctly.
                // This will cause some performance overhead but
                // acceptable as Babel will not be recommended.
                isBrowserLayer ? swcBrowserLayerLoader : swcSSRLayerLoader,
                babelLoader,
                reactCompilerLoader
            ].filter(Boolean) : []
        ];
    const appBrowserLayerLoaders = createClientLayerLoader({
        isBrowserLayer: true,
        // reactRefresh for browser layer is applied conditionally to user-land source
        reactRefresh: false
    });
    const appSSRLayerLoaders = createClientLayerLoader({
        isBrowserLayer: false,
        reactRefresh: true
    });
    // Loader for API routes needs to be differently configured as it shouldn't
    // have RSC transpiler enabled, so syntax checks such as invalid imports won't
    // be performed.
    const apiRoutesLayerLoaders = useSWCLoader ? getSwcLoader({
        serverComponents: false,
        bundleLayer: _constants.WEBPACK_LAYERS.apiNode
    }) : defaultLoaders.babel;
    const pageExtensions = config.pageExtensions;
    const outputPath = isNodeOrEdgeCompilation ? _path.default.join(distDir, _constants1.SERVER_DIRECTORY) : distDir;
    const conditionNames = [
        ...isEdgeServer ? [
            _resolve.edgeConditionName
        ] : [],
        // inherits Webpack's default conditions
        '...'
    ];
    const reactServerConditionNames = [
        'react-server',
        // We could just use `'...'`. Explicit spread makes it more obvious.
        ...conditionNames
    ];
    const reactRefreshEntry = isRspack ? "[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/rspack-runtime.js [app-client] (ecmascript)" : "[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/runtime.js [app-client] (ecmascript)";
    const clientEntries = isClient ? {
        // Backwards compatibility
        'main.js': [],
        ...dev ? {
            [_constants1.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH]: reactRefreshEntry
        } : {},
        [_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN]: `./` + _path.default.relative(dir, _path.default.join(_nextdirpaths.NEXT_PROJECT_ROOT_DIST_CLIENT, dev ? `next-dev.js` : 'next.js')).replace(/\\/g, '/'),
        ...hasAppDir ? {
            [_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP]: dev ? [
                reactRefreshEntry,
                `./` + _path.default.relative(dir, _path.default.join(_nextdirpaths.NEXT_PROJECT_ROOT_DIST_CLIENT, 'app-next-dev.js')).replace(/\\/g, '/')
            ] : [
                `./` + _path.default.relative(dir, _path.default.join(_nextdirpaths.NEXT_PROJECT_ROOT_DIST_CLIENT, 'app-next.js')).replace(/\\/g, '/')
            ]
        } : {}
    } : undefined;
    const resolveConfig = {
        conditionNames,
        // Disable .mjs for node_modules bundling
        extensions: [
            '.js',
            '.mjs',
            '.tsx',
            '.ts',
            '.jsx',
            '.json',
            '.wasm'
        ],
        extensionAlias: config.experimental.extensionAlias,
        modules: [
            'node_modules',
            ...nodePathList
        ],
        alias: (0, _createcompileraliases.createWebpackAliases)({
            distDir,
            isClient,
            isEdgeServer,
            dev,
            config,
            pagesDir,
            appDir,
            dir,
            reactProductionProfiling
        }),
        ...isClient ? {
            fallback: {
                process: "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)"
            }
        } : undefined,
        // default main fields use pages dir ones, and customize app router ones in loaders.
        mainFields: (0, _resolve.getMainField)(compilerType, false),
        plugins: [
            isNodeServer ? new _optionalpeerdependencyresolveplugin.OptionalPeerDependencyResolverPlugin() : undefined
        ].filter(Boolean),
        ...isRspack && jsConfigPath ? {
            // Skip paths that are routed to a .d.ts file
            restrictions: [
                /^(?!.*\.d\.ts$).*$/
            ],
            tsConfig: {
                configFile: jsConfigPath
            }
        } : {}
    };
    // Packages which will be split into the 'framework' chunk.
    // Only top-level packages are included, e.g. nested copies like
    // 'node_modules/meow/node_modules/object-assign' are not included.
    const nextFrameworkPaths = [];
    const topLevelFrameworkPaths = [];
    const visitedFrameworkPackages = new Set();
    // Adds package-paths of dependencies recursively
    const addPackagePath = (packageName, relativeToPath, paths)=>{
        try {
            if (visitedFrameworkPackages.has(packageName)) {
                return;
            }
            visitedFrameworkPackages.add(packageName);
            const packageJsonPath = (()=>{
                const e = new Error("Cannot find module 'unknown'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })();
            // Include a trailing slash so that a `.startsWith(packagePath)` check avoids false positives
            // when one package name starts with the full name of a different package.
            // For example:
            //   "node_modules/react-slider".startsWith("node_modules/react")  // true
            //   "node_modules/react-slider".startsWith("node_modules/react/") // false
            const directory = _path.default.join(packageJsonPath, '../');
            // Returning from the function in case the directory has already been added and traversed
            if (paths.includes(directory)) return;
            paths.push(directory);
            const dependencies = (()=>{
                const e = new Error("Cannot find module as expression is too dynamic");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })().dependencies || {};
            for (const name of Object.keys(dependencies)){
                addPackagePath(name, directory, paths);
            }
        } catch (_) {
        // don't error on failing to resolve framework packages
        }
    };
    for (const packageName of [
        'react',
        'react-dom',
        ...hasAppDir ? [
            `next/dist/compiled/react${bundledReactChannel}`,
            `next/dist/compiled/react-dom${bundledReactChannel}`
        ] : []
    ]){
        addPackagePath(packageName, dir, topLevelFrameworkPaths);
    }
    addPackagePath('next', dir, nextFrameworkPaths);
    const crossOrigin = config.crossOrigin;
    // The `serverExternalPackages` should not conflict with
    // the `transpilePackages`.
    if (config.serverExternalPackages && finalTranspilePackages) {
        const externalPackageConflicts = finalTranspilePackages.filter((pkg)=>{
            var _config_serverExternalPackages;
            return (_config_serverExternalPackages = config.serverExternalPackages) == null ? void 0 : _config_serverExternalPackages.includes(pkg);
        });
        if (externalPackageConflicts.length > 0) {
            throw Object.defineProperty(new Error(`The packages specified in the 'transpilePackages' conflict with the 'serverExternalPackages': ${externalPackageConflicts.join(', ')}`), "__NEXT_ERROR_CODE", {
                value: "E173",
                enumerable: false,
                configurable: true
            });
        }
    }
    // For original request, such as `package name`
    const optOutBundlingPackages = EXTERNAL_PACKAGES.concat(...config.serverExternalPackages || []).filter((pkg)=>!(finalTranspilePackages == null ? void 0 : finalTranspilePackages.includes(pkg)));
    // For resolved request, such as `absolute path/package name/foo/bar.js`
    const optOutBundlingPackageRegex = new RegExp(`[/\\\\]node_modules[/\\\\](${optOutBundlingPackages.map((p)=>p.replace(/\//g, '[/\\\\]')).join('|')})[/\\\\]`);
    const transpilePackagesRegex = new RegExp(`[/\\\\]node_modules[/\\\\](${finalTranspilePackages == null ? void 0 : finalTranspilePackages.map((p)=>p.replace(/\//g, '[/\\\\]')).join('|')})[/\\\\]`);
    const handleExternals = (0, _handleexternals.makeExternalHandler)({
        config,
        optOutBundlingPackageRegex,
        transpiledPackages: finalTranspilePackages,
        dir
    });
    const pageExtensionsRegex = new RegExp(`\\.(${pageExtensions.join('|')})$`);
    const aliasCodeConditionTest = [
        codeCondition.test,
        pageExtensionsRegex
    ];
    const builtinModules = (()=>{
        const e = new Error("Cannot find module 'module'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })().builtinModules;
    const bunExternals = [
        'bun:ffi',
        'bun:jsc',
        'bun:sqlite',
        'bun:test',
        'bun:wrap',
        'bun'
    ];
    const shouldEnableSlowModuleDetection = !!config.experimental.slowModuleDetection && dev;
    const getParallelism = ()=>{
        const override = Number(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_WEBPACK_PARALLELISM);
        if (shouldEnableSlowModuleDetection) {
            if (override) {
                console.warn('NEXT_WEBPACK_PARALLELISM is specified but will be ignored due to experimental.slowModuleDetection being enabled.');
            }
            return 1;
        }
        return override || undefined;
    };
    const telemetryPlugin = !dev && isClient && new (__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin.js [app-client] (ecmascript)")).TelemetryPlugin(new Map([
        [
            'swcLoader',
            useSWCLoader
        ],
        [
            'swcRelay',
            !!((_config_compiler = config.compiler) == null ? void 0 : _config_compiler.relay)
        ],
        [
            'swcStyledComponents',
            !!((_config_compiler1 = config.compiler) == null ? void 0 : _config_compiler1.styledComponents)
        ],
        [
            'swcReactRemoveProperties',
            !!((_config_compiler2 = config.compiler) == null ? void 0 : _config_compiler2.reactRemoveProperties)
        ],
        [
            'swcExperimentalDecorators',
            !!(jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.experimentalDecorators)
        ],
        [
            'swcRemoveConsole',
            !!((_config_compiler3 = config.compiler) == null ? void 0 : _config_compiler3.removeConsole)
        ],
        [
            'swcImportSource',
            !!(jsConfig == null ? void 0 : (_jsConfig_compilerOptions1 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions1.jsxImportSource)
        ],
        [
            'swcEmotion',
            !!((_config_compiler4 = config.compiler) == null ? void 0 : _config_compiler4.emotion)
        ],
        [
            'transpilePackages',
            !!config.transpilePackages
        ],
        [
            'skipProxyUrlNormalize',
            !!config.skipProxyUrlNormalize
        ],
        [
            'skipTrailingSlashRedirect',
            !!config.skipTrailingSlashRedirect
        ],
        [
            'modularizeImports',
            !!config.modularizeImports
        ],
        // If esmExternals is not same as default value, it represents customized usage
        [
            'esmExternals',
            config.experimental.esmExternals !== true
        ],
        SWCBinaryTarget
    ].filter(Boolean)));
    let webpackConfig = {
        parallelism: getParallelism(),
        ...isNodeServer ? {
            externalsPresets: {
                node: true
            }
        } : {},
        // @ts-ignore
        externals: !isRspack && (isClient || isEdgeServer ? // TODO: should we warn/error for this instead?
        [
            'next',
            ...isEdgeServer ? [
                {
                    '@builder.io/partytown': '{}',
                    'next/dist/compiled/etag': '{}'
                },
                (0, _middlewareplugin.getEdgePolyfilledModules)(),
                _middlewareplugin.handleWebpackExternalForEdgeRuntime
            ] : []
        ] : [
            ...builtinModules,
            ...bunExternals,
            ({ context, request, dependencyType, contextInfo, getResolve })=>handleExternals(context, request, dependencyType, contextInfo.issuerLayer, (options)=>{
                    const resolveFunction = getResolve(options);
                    return (resolveContext, requestToResolve)=>new Promise((resolve, reject)=>{
                            resolveFunction(resolveContext, requestToResolve, (err, result, resolveData)=>{
                                var _resolveData_descriptionFileData;
                                if (err) return reject(err);
                                if (!result) return resolve([
                                    null,
                                    false
                                ]);
                                const isEsm = /\.js$/i.test(result) ? (resolveData == null ? void 0 : (_resolveData_descriptionFileData = resolveData.descriptionFileData) == null ? void 0 : _resolveData_descriptionFileData.type) === 'module' : /\.mjs$/i.test(result);
                                resolve([
                                    result,
                                    isEsm
                                ]);
                            });
                        });
                })
        ]),
        optimization: {
            emitOnErrors: !dev,
            checkWasmTypes: false,
            nodeEnv: false,
            splitChunks: (()=>{
                // server chunking
                if (dev) {
                    if (isNodeServer) {
                        /*
              In development, we want to split code that comes from `node_modules` into their own chunks.
              This is because in development, we often need to reload the user bundle due to changes in the code.
              To work around this, we put all the vendor code into separate chunks so that we don't need to reload them.
              This is safe because the vendor code doesn't change between reloads.
            */ const extractRootNodeModule = (modulePath)=>{
                            // This regex is used to extract the root node module name to be used as the chunk group name.
                            // example: ../../node_modules/.pnpm/next@10/foo/node_modules/bar -> next@10
                            const regex = /node_modules(?:\/|\\)\.?(?:pnpm(?:\/|\\))?([^/\\]+)/;
                            const match = modulePath.match(regex);
                            return match ? match[1] : null;
                        };
                        return {
                            cacheGroups: {
                                // this chunk configuration gives us a separate chunk for each top level module in node_modules
                                // or a hashed chunk if we can't extract the module name.
                                vendor: {
                                    chunks: 'all',
                                    reuseExistingChunk: true,
                                    test: /[\\/]node_modules[\\/]/,
                                    minSize: 0,
                                    minChunks: 1,
                                    maxAsyncRequests: 300,
                                    maxInitialRequests: 300,
                                    name: (module1)=>{
                                        const moduleId = module1.nameForCondition();
                                        const rootModule = extractRootNodeModule(moduleId);
                                        if (rootModule) {
                                            return `vendor-chunks/${rootModule}`;
                                        } else {
                                            const hash = _crypto.default.createHash('sha1').update(moduleId);
                                            hash.update(moduleId);
                                            return `vendor-chunks/${hash.digest('hex')}`;
                                        }
                                    }
                                },
                                // disable the default chunk groups
                                default: false,
                                defaultVendors: false
                            }
                        };
                    }
                    return false;
                }
                if (isNodeServer || isEdgeServer) {
                    return {
                        filename: `${isEdgeServer ? `edge-chunks/` : ''}[name].js`,
                        chunks: 'all',
                        minChunks: 2
                    };
                }
                const frameworkCacheGroup = {
                    chunks: 'all',
                    name: 'framework',
                    // Ensures the framework chunk is not created for App Router.
                    layer: _utils.isWebpackDefaultLayer,
                    test (module1) {
                        const resource = module1.nameForCondition == null ? void 0 : module1.nameForCondition.call(module1);
                        return resource ? topLevelFrameworkPaths.some((pkgPath)=>resource.startsWith(pkgPath)) : false;
                    },
                    priority: 40,
                    // Don't let webpack eliminate this chunk (prevents this chunk from
                    // becoming a part of the commons chunk)
                    enforce: true
                };
                const libCacheGroup = {
                    test (module1) {
                        var _module_type;
                        return !((_module_type = module1.type) == null ? void 0 : _module_type.startsWith('css')) && module1.size() > 160000 && /node_modules[/\\]/.test(module1.nameForCondition() || '');
                    },
                    name (module1) {
                        const hash = _crypto.default.createHash('sha1');
                        if (isModuleCSS(module1)) {
                            module1.updateHash(hash);
                        } else {
                            if (!module1.libIdent) {
                                throw Object.defineProperty(new Error(`Encountered unknown module type: ${module1.type}. Please open an issue.`), "__NEXT_ERROR_CODE", {
                                    value: "E487",
                                    enumerable: false,
                                    configurable: true
                                });
                            }
                            hash.update(module1.libIdent({
                                context: dir
                            }));
                        }
                        // Ensures the name of the chunk is not the same between two modules in different layers
                        // E.g. if you import 'button-library' in App Router and Pages Router we don't want these to be bundled in the same chunk
                        // as they're never used on the same page.
                        if (module1.layer) {
                            hash.update(module1.layer);
                        }
                        return hash.digest('hex').substring(0, 8);
                    },
                    priority: 30,
                    minChunks: 1,
                    reuseExistingChunk: true
                };
                // client chunking
                return {
                    // Keep main and _app chunks unsplitted in webpack 5
                    // as we don't need a separate vendor chunk from that
                    // and all other chunk depend on them so there is no
                    // duplication that need to be pulled out.
                    chunks: isRspack ? /^(?!(polyfills|main|pages\/_app)$).*$/ : (chunk)=>!/^(polyfills|main|pages\/_app)$/.test(chunk.name),
                    cacheGroups: isRspack ? {
                        framework: {
                            chunks: 'all',
                            name: 'framework',
                            layer: _utils.RSPACK_DEFAULT_LAYERS_REGEX,
                            test: new RegExp(`^(${topLevelFrameworkPaths.map((p)=>`(${(0, _escaperegexp.escapeStringRegexp)(p)})`).join('|')})`),
                            priority: 40,
                            enforce: true
                        },
                        lib: {
                            test: /[/]node_modules[/](?!.*\.(css|scss|sass|less|styl)$)/,
                            name: 'lib',
                            chunks: 'all',
                            priority: 30,
                            minChunks: 1,
                            reuseExistingChunk: true
                        }
                    } : {
                        framework: frameworkCacheGroup,
                        lib: libCacheGroup
                    },
                    maxInitialRequests: 25,
                    minSize: 20000
                };
            })(),
            runtimeChunk: isClient ? {
                name: _constants1.CLIENT_STATIC_FILES_RUNTIME_WEBPACK
            } : undefined,
            minimize: !dev && (isClient || isEdgeServer || isNodeServer && config.experimental.serverMinification),
            minimizer: [
                // Minify JavaScript
                isRspack ? new ((0, _getrspack.getRspackCore)()).SwcJsMinimizerRspackPlugin({
                    // JS minimizer configuration
                    // options should align with crates/napi/src/minify.rs#patch_opts
                    minimizerOptions: {
                        compress: {
                            inline: 2,
                            global_defs: {
                                'process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE': false
                            }
                        },
                        mangle: !noMangling && {
                            reserved: [
                                'AbortSignal'
                            ],
                            disableCharFreq: !isClient
                        }
                    }
                }) : (compiler)=>{
                    // @ts-ignore No typings yet
                    const { MinifyPlugin } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/minify-webpack-plugin/src/index.js [app-client] (ecmascript)");
                    new MinifyPlugin({
                        noMangling,
                        disableCharFreq: !isClient
                    }).apply(compiler);
                },
                // Minify CSS
                // By default, Rspack uses LightningCSS for CSS minification.
                // Rspack uses css-minimizer-plugin by default for compatibility.
                isRspack && (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ((_config_experimental = config.experimental) == null ? void 0 : _config_experimental.useLightningcss) === undefined || config.experimental.useLightningcss) ? new ((0, _getrspack.getRspackCore)()).LightningCssMinimizerRspackPlugin({
                    // CSS minimizer configuration
                    minimizerOptions: {
                        targets: supportedBrowsers
                    }
                }) : (compiler)=>{
                    const { CssMinimizerPlugin } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/css-minimizer-plugin.js [app-client] (ecmascript)");
                    new CssMinimizerPlugin({
                        postcssOptions: {
                            map: {
                                // `inline: false` generates the source map in a separate file.
                                // Otherwise, the CSS file is needlessly large.
                                inline: false,
                                // `annotation: false` skips appending the `sourceMappingURL`
                                // to the end of the CSS file. Webpack already handles this.
                                annotation: false
                            }
                        }
                    }).apply(compiler);
                }
            ]
        },
        context: dir,
        // Kept as function to be backwards compatible
        entry: async ()=>{
            return {
                ...clientEntries ? clientEntries : {},
                ...entrypoints
            };
        },
        watchOptions: Object.freeze({
            ...baseWatchOptions,
            poll: (_config_watchOptions = config.watchOptions) == null ? void 0 : _config_watchOptions.pollIntervalMs
        }),
        output: {
            // we must set publicPath to an empty value to override the default of
            // auto which doesn't work in IE11
            publicPath: `${config.assetPrefix ? config.assetPrefix.endsWith('/') ? config.assetPrefix.slice(0, -1) : config.assetPrefix : ''}/_next/`,
            path: !dev && isNodeServer ? _path.default.join(outputPath, 'chunks') : outputPath,
            // On the server we don't use hashes
            filename: isNodeOrEdgeCompilation ? dev || isEdgeServer ? `[name].js` : `../[name].js` : `static/chunks/${isDevFallback ? 'fallback/' : ''}[name]${dev ? '' : '-[contenthash]'}.js`,
            library: isClient || isEdgeServer ? '_N_E' : undefined,
            libraryTarget: isClient || isEdgeServer ? 'assign' : 'commonjs2',
            hotUpdateChunkFilename: 'static/webpack/[id].[fullhash].hot-update.js',
            hotUpdateMainFilename: 'static/webpack/[fullhash].[runtime].hot-update.json',
            // This saves chunks with the name given via `import()`
            chunkFilename: isNodeOrEdgeCompilation ? '[name].js' : `static/chunks/${isDevFallback ? 'fallback/' : ''}${dev ? '[name]' : '[name].[contenthash]'}.js`,
            strictModuleExceptionHandling: true,
            crossOriginLoading: crossOrigin,
            // if `sources[number]` is not an absolute path, it's is resolved
            // relative to the location of the source map file (https://tc39.es/source-map/#resolving-sources).
            // However, Webpack's `resource-path` is relative to the app dir.
            // TODO: Either `sourceRoot` should be populated with the root and then we can use `[resource-path]`
            // or we need a way to resolve return `path.relative(sourceMapLocation, info.resourcePath)`
            devtoolModuleFilenameTemplate: dev ? '[absolute-resource-path]' : undefined,
            webassemblyModuleFilename: 'static/wasm/[modulehash].wasm',
            hashFunction: 'xxhash64',
            hashDigestLength: 16
        },
        performance: false,
        resolve: resolveConfig,
        resolveLoader: {
            // The loaders Next.js provides
            alias: [
                'error-loader',
                'next-swc-loader',
                'next-client-pages-loader',
                'next-image-loader',
                'next-metadata-image-loader',
                'next-style-loader',
                'next-flight-loader',
                'next-flight-client-entry-loader',
                'next-flight-action-entry-loader',
                'next-flight-client-module-loader',
                'next-flight-server-reference-proxy-loader',
                'empty-loader',
                'next-middleware-loader',
                'next-edge-function-loader',
                'next-edge-app-route-loader',
                'next-edge-ssr-loader',
                'next-middleware-asset-loader',
                'next-middleware-wasm-loader',
                'next-app-loader',
                'next-route-loader',
                'next-font-loader',
                'next-invalid-import-error-loader',
                'next-metadata-route-loader',
                'modularize-import-loader',
                'next-barrel-loader',
                'next-error-browser-binary-loader',
                'next-root-params-loader'
            ].reduce((alias, loader)=>{
                // using multiple aliases to replace `resolveLoader.modules`
                alias[loader] = _path.default.join(("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/next/dist/build"), 'webpack', 'loaders', loader);
                return alias;
            }, {}),
            modules: [
                'node_modules',
                ...nodePathList
            ],
            plugins: []
        },
        module: {
            rules: [
                {
                    issuerLayer: {
                        not: [
                            _constants.WEBPACK_LAYERS.middleware,
                            _constants.WEBPACK_LAYERS.instrument
                        ]
                    },
                    resolve: {
                        conditionNames: [
                            config.cacheComponents ? 'next-js' : '',
                            '...'
                        ].filter(Boolean)
                    }
                },
                // Alias server-only and client-only to proper exports based on bundling layers
                {
                    issuerLayer: {
                        or: [
                            ..._constants.WEBPACK_LAYERS.GROUP.serverOnly,
                            ..._constants.WEBPACK_LAYERS.GROUP.neutralTarget
                        ]
                    },
                    resolve: {
                        // Error on client-only but allow server-only
                        alias: (0, _createcompileraliases.createServerOnlyClientOnlyAliases)(true)
                    }
                },
                {
                    issuerLayer: {
                        not: [
                            ..._constants.WEBPACK_LAYERS.GROUP.serverOnly,
                            ..._constants.WEBPACK_LAYERS.GROUP.neutralTarget
                        ]
                    },
                    resolve: {
                        // Error on server-only but allow client-only
                        alias: (0, _createcompileraliases.createServerOnlyClientOnlyAliases)(false)
                    }
                },
                // Detect server-only / client-only imports and error in build time
                {
                    test: [
                        /^client-only$/,
                        /next[\\/]dist[\\/]compiled[\\/]client-only[\\/]error/
                    ],
                    loader: 'next-invalid-import-error-loader',
                    issuerLayer: {
                        or: _constants.WEBPACK_LAYERS.GROUP.serverOnly
                    },
                    options: {
                        message: "'client-only' cannot be imported from a Server Component module. It should only be used from a Client Component."
                    }
                },
                {
                    test: [
                        /^server-only$/,
                        /next[\\/]dist[\\/]compiled[\\/]server-only[\\/]index/
                    ],
                    loader: 'next-invalid-import-error-loader',
                    issuerLayer: {
                        not: [
                            ..._constants.WEBPACK_LAYERS.GROUP.serverOnly,
                            ..._constants.WEBPACK_LAYERS.GROUP.neutralTarget
                        ]
                    },
                    options: {
                        message: "'server-only' cannot be imported from a Client Component module. It should only be used from a Server Component."
                    }
                },
                // Potential the bundle introduced into middleware and api can be poisoned by client-only
                // but not being used, so we disabled the `client-only` erroring on these layers.
                // `server-only` is still available.
                {
                    test: [
                        /^client-only$/,
                        /next[\\/]dist[\\/]compiled[\\/]client-only[\\/]error/
                    ],
                    loader: 'empty-loader',
                    issuerLayer: {
                        or: _constants.WEBPACK_LAYERS.GROUP.neutralTarget
                    }
                },
                ...isNodeServer ? [] : [
                    {
                        test: /[\\/].*?\.node$/,
                        loader: 'next-error-browser-binary-loader'
                    }
                ],
                ...hasAppDir ? [
                    {
                        // Make sure that AsyncLocalStorage module instance is shared between server and client
                        // layers.
                        layer: _constants.WEBPACK_LAYERS.shared,
                        test: asyncStoragesRegex
                    },
                    // Convert metadata routes to separate layer
                    {
                        resourceQuery: new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadataRoute),
                        layer: _constants.WEBPACK_LAYERS.reactServerComponents
                    },
                    {
                        // Ensure that the app page module is in the client layers, this
                        // enables React to work correctly for RSC.
                        layer: _constants.WEBPACK_LAYERS.serverSideRendering,
                        test: /next[\\/]dist[\\/](esm[\\/])?server[\\/]route-modules[\\/]app-page[\\/]module/
                    },
                    {
                        issuerLayer: _utils.isWebpackBundledLayer,
                        resolve: {
                            alias: (0, _createcompileraliases.createNextApiEsmAliases)()
                        }
                    },
                    {
                        issuerLayer: _utils.shouldUseReactServerCondition,
                        resolve: {
                            alias: (0, _createcompileraliases.createAppRouterApiAliases)(true)
                        }
                    },
                    {
                        issuerLayer: _utils.isWebpackClientOnlyLayer,
                        resolve: {
                            alias: (0, _createcompileraliases.createAppRouterApiAliases)(false)
                        }
                    }
                ] : [],
                ...hasAppDir && !isClient ? [
                    {
                        issuerLayer: _utils.shouldUseReactServerCondition,
                        test: {
                            // Resolve it if it is a source code file, and it has NOT been
                            // opted out of bundling.
                            and: [
                                aliasCodeConditionTest,
                                {
                                    not: [
                                        optOutBundlingPackageRegex,
                                        asyncStoragesRegex
                                    ]
                                }
                            ]
                        },
                        resourceQuery: {
                            // Do not apply next-flight-loader to imports generated by the
                            // next-metadata-image-loader, to avoid generating unnecessary
                            // and conflicting entries in the flight client entry plugin.
                            // These are already covered by the next-metadata-route-loader
                            // entries.
                            not: [
                                new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadata),
                                new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadataImageMeta)
                            ]
                        },
                        resolve: {
                            mainFields: (0, _resolve.getMainField)(compilerType, true),
                            conditionNames: reactServerConditionNames,
                            // If missing the alias override here, the default alias will be used which aliases
                            // react to the direct file path, not the package name. In that case the condition
                            // will be ignored completely.
                            alias: (0, _createcompileraliases.createVendoredReactAliases)(bundledReactChannel, {
                                // No server components profiling
                                reactProductionProfiling,
                                layer: _constants.WEBPACK_LAYERS.reactServerComponents,
                                isBrowser: isClient,
                                isEdgeServer
                            })
                        },
                        use: 'next-flight-loader'
                    }
                ] : [],
                ...getNextRootParamsRules({
                    isRootParamsEnabled: config.experimental.rootParams ?? // `cacheComponents` implies `experimental.rootParams`.
                    config.cacheComponents ?? false,
                    isClient,
                    appDir,
                    pageExtensions
                }),
                // TODO: FIXME: do NOT webpack 5 support with this
                // x-ref: https://github.com/webpack/webpack/issues/11467
                ...!config.experimental.fullySpecified ? [
                    {
                        test: /\.m?js/,
                        resolve: {
                            fullySpecified: false
                        }
                    }
                ] : [],
                ...hasAppDir && isEdgeServer ? [
                    // The Edge bundle includes the server in its entrypoint, so it has to
                    // be in the SSR layer — here we convert the actual page request to
                    // the RSC layer via a webpack rule.
                    {
                        resourceQuery: new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.edgeSSREntry),
                        layer: _constants.WEBPACK_LAYERS.reactServerComponents
                    }
                ] : [],
                ...hasAppDir ? [
                    {
                        // Alias react-dom for ReactDOM.preload usage.
                        // Alias react for switching between default set and share subset.
                        oneOf: [
                            {
                                issuerLayer: _utils.shouldUseReactServerCondition,
                                test: {
                                    // Resolve it if it is a source code file, and it has NOT been
                                    // opted out of bundling.
                                    and: [
                                        aliasCodeConditionTest,
                                        {
                                            not: [
                                                optOutBundlingPackageRegex,
                                                asyncStoragesRegex
                                            ]
                                        }
                                    ]
                                },
                                resolve: {
                                    // It needs `conditionNames` here to require the proper asset,
                                    // when react is acting as dependency of compiled/react-dom.
                                    alias: (0, _createcompileraliases.createVendoredReactAliases)(bundledReactChannel, {
                                        reactProductionProfiling,
                                        layer: _constants.WEBPACK_LAYERS.reactServerComponents,
                                        isBrowser: isClient,
                                        isEdgeServer
                                    })
                                }
                            },
                            {
                                test: aliasCodeConditionTest,
                                issuerLayer: _constants.WEBPACK_LAYERS.serverSideRendering,
                                resolve: {
                                    alias: (0, _createcompileraliases.createVendoredReactAliases)(bundledReactChannel, {
                                        reactProductionProfiling,
                                        layer: _constants.WEBPACK_LAYERS.serverSideRendering,
                                        isBrowser: isClient,
                                        isEdgeServer
                                    })
                                }
                            }
                        ]
                    },
                    {
                        test: aliasCodeConditionTest,
                        issuerLayer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                        resolve: {
                            alias: (0, _createcompileraliases.createVendoredReactAliases)(bundledReactChannel, {
                                reactProductionProfiling,
                                layer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                                isBrowser: isClient,
                                isEdgeServer
                            })
                        }
                    }
                ] : [],
                // Do not apply react-refresh-loader to node_modules for app router browser layer
                ...hasAppDir && dev && isClient ? [
                    {
                        test: codeCondition.test,
                        exclude: [
                            // exclude unchanged modules from react-refresh
                            codeCondition.exclude,
                            transpilePackagesRegex,
                            precompileRegex
                        ],
                        issuerLayer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                        use: reactRefreshLoaders,
                        resolve: {
                            mainFields: (0, _resolve.getMainField)(compilerType, true)
                        }
                    }
                ] : [],
                {
                    oneOf: [
                        {
                            ...codeCondition,
                            issuerLayer: _constants.WEBPACK_LAYERS.apiNode,
                            use: apiRoutesLayerLoaders,
                            // In Node.js, switch back to normal URL handling.
                            // We won't bundle `new URL()` cases in Node.js bundler layer.
                            parser: {
                                url: true
                            }
                        },
                        {
                            ...codeCondition,
                            issuerLayer: _constants.WEBPACK_LAYERS.apiEdge,
                            use: apiRoutesLayerLoaders
                        },
                        {
                            test: codeCondition.test,
                            issuerLayer: _constants.WEBPACK_LAYERS.middleware,
                            use: middlewareLayerLoaders,
                            resolve: {
                                mainFields: (0, _resolve.getMainField)(compilerType, true),
                                conditionNames: reactServerConditionNames,
                                alias: (0, _createcompileraliases.createVendoredReactAliases)(bundledReactChannel, {
                                    reactProductionProfiling,
                                    layer: _constants.WEBPACK_LAYERS.middleware,
                                    isBrowser: isClient,
                                    isEdgeServer
                                })
                            }
                        },
                        {
                            test: codeCondition.test,
                            issuerLayer: _constants.WEBPACK_LAYERS.instrument,
                            use: instrumentLayerLoaders,
                            resolve: {
                                mainFields: (0, _resolve.getMainField)(compilerType, true),
                                conditionNames: reactServerConditionNames,
                                alias: (0, _createcompileraliases.createVendoredReactAliases)(bundledReactChannel, {
                                    reactProductionProfiling,
                                    layer: _constants.WEBPACK_LAYERS.instrument,
                                    isBrowser: isClient,
                                    isEdgeServer
                                })
                            }
                        },
                        ...hasAppDir ? [
                            {
                                test: codeCondition.test,
                                issuerLayer: _utils.shouldUseReactServerCondition,
                                exclude: asyncStoragesRegex,
                                use: appServerLayerLoaders
                            },
                            {
                                test: codeCondition.test,
                                resourceQuery: new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.edgeSSREntry),
                                use: appServerLayerLoaders
                            },
                            {
                                test: codeCondition.test,
                                issuerLayer: _constants.WEBPACK_LAYERS.appPagesBrowser,
                                // Exclude the transpilation of the app layer due to compilation issues
                                exclude: browserNonTranspileModules,
                                use: appBrowserLayerLoaders,
                                resolve: {
                                    mainFields: (0, _resolve.getMainField)(compilerType, true)
                                }
                            },
                            {
                                test: codeCondition.test,
                                issuerLayer: _constants.WEBPACK_LAYERS.serverSideRendering,
                                exclude: asyncStoragesRegex,
                                use: appSSRLayerLoaders,
                                resolve: {
                                    mainFields: (0, _resolve.getMainField)(compilerType, true)
                                }
                            }
                        ] : [],
                        {
                            ...codeCondition,
                            use: [
                                ...reactRefreshLoaders,
                                defaultLoaders.babel,
                                reactCompilerLoader
                            ].filter(Boolean)
                        }
                    ]
                },
                ...!config.images.disableStaticImages ? [
                    {
                        test: nextImageLoaderRegex,
                        loader: 'next-image-loader',
                        issuer: {
                            not: _css.regexLikeCss
                        },
                        dependency: {
                            not: [
                                'url'
                            ]
                        },
                        resourceQuery: {
                            not: [
                                new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadata),
                                new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadataRoute),
                                new RegExp(_constants.WEBPACK_RESOURCE_QUERIES.metadataImageMeta)
                            ]
                        },
                        options: {
                            isDev: dev,
                            compilerType,
                            basePath: config.basePath,
                            assetPrefix: config.assetPrefix
                        }
                    }
                ] : [],
                ...isEdgeServer ? [
                    {
                        resolve: {
                            fallback: {
                                process: "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)"
                            }
                        }
                    }
                ] : isClient ? [
                    {
                        resolve: {
                            fallback: config.experimental.fallbackNodePolyfills === false ? {
                                assert: false,
                                buffer: false,
                                constants: false,
                                crypto: false,
                                domain: false,
                                http: false,
                                https: false,
                                os: false,
                                path: false,
                                punycode: false,
                                process: false,
                                querystring: false,
                                stream: false,
                                string_decoder: false,
                                sys: false,
                                timers: false,
                                tty: false,
                                util: false,
                                vm: false,
                                zlib: false,
                                events: false,
                                setImmediate: false
                            } : {
                                assert: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/assert/assert.js [app-client] (ecmascript)",
                                buffer: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)",
                                constants: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/constants-browserify/constants.json (json)",
                                crypto: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)",
                                domain: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/domain-browser/index.js [app-client] (ecmascript)",
                                http: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/stream-http/index.js [app-client] (ecmascript)",
                                https: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/https-browserify/index.js [app-client] (ecmascript)",
                                os: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/os-browserify/browser.js [app-client] (ecmascript)",
                                path: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)",
                                punycode: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/punycode/punycode.js [app-client] (ecmascript)",
                                process: "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
                                // Handled in separate alias
                                querystring: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/querystring-es3/index.js [app-client] (ecmascript)",
                                stream: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/stream-browserify/index.js [app-client] (ecmascript)",
                                string_decoder: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/string_decoder/string_decoder.js [app-client] (ecmascript)",
                                sys: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/util/util.js [app-client] (ecmascript)",
                                timers: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/timers-browserify/main.js [app-client] (ecmascript)",
                                tty: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/tty-browserify/index.js [app-client] (ecmascript)",
                                // Handled in separate alias
                                // url: require.resolve('url'),
                                util: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/util/util.js [app-client] (ecmascript)",
                                vm: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/vm-browserify/index.js [app-client] (ecmascript)",
                                zlib: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/browserify-zlib/index.js [app-client] (ecmascript)",
                                events: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/events/events.js [app-client] (ecmascript)",
                                setImmediate: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/setimmediate/setImmediate.js [app-client] (ecmascript)"
                            }
                        }
                    }
                ] : [],
                {
                    // Mark `image-response.js` as side-effects free to make sure we can
                    // tree-shake it if not used.
                    test: /[\\/]next[\\/]dist[\\/](esm[\\/])?server[\\/]og[\\/]image-response\.js/,
                    sideEffects: false
                },
                // Mark the action-client-wrapper module as side-effects free to make sure
                // the individual transformed module of client action can be tree-shaken.
                // This will make modules processed by `next-flight-server-reference-proxy-loader` become side-effects free,
                // then on client side the module ids will become tree-shakable.
                // e.g. the output of client action module will look like:
                // `export { a } from 'next-flight-server-reference-proxy-loader?id=idOfA&name=a!
                // `export { b } from 'next-flight-server-reference-proxy-loader?id=idOfB&name=b!
                {
                    test: /[\\/]next[\\/]dist[\\/](esm[\\/])?build[\\/]webpack[\\/]loaders[\\/]next-flight-loader[\\/]action-client-wrapper\.js/,
                    sideEffects: false
                },
                {
                    // This loader rule should be before other rules, as it can output code
                    // that still contains `"use client"` or `"use server"` statements that
                    // needs to be re-transformed by the RSC compilers.
                    // This loader rule works like a bridge between user's import and
                    // the target module behind a package's barrel file. It reads SWC's
                    // analysis result from the previous loader, and directly returns the
                    // code that only exports values that are asked by the user.
                    test: /__barrel_optimize__/,
                    use: ({ resourceQuery })=>{
                        var _resourceQuery_match;
                        const names = (((_resourceQuery_match = resourceQuery.match(/\?names=([^&]+)/)) == null ? void 0 : _resourceQuery_match[1]) || '').split(',');
                        return [
                            {
                                loader: 'next-barrel-loader',
                                options: {
                                    names,
                                    swcCacheDir: _path.default.join(dir, (config == null ? void 0 : config.distDir) ?? '.next', 'cache', 'swc')
                                },
                                // This is part of the request value to serve as the module key.
                                // The barrel loader are no-op re-exported modules keyed by
                                // export names.
                                ident: 'next-barrel-loader:' + resourceQuery
                            }
                        ];
                    }
                },
                {
                    resolve: {
                        alias: {
                            next: _nextdirpaths.NEXT_PROJECT_ROOT
                        }
                    }
                }
            ]
        },
        plugins: [
            // In prod Webpack will already have a runtime for all reachable chunks.
            // During dev, it will update the runtime as chunks come in which may be too late for Flight.
            //
            // TODO: Rspack currently does not support the hooks and chunk methods required by ForceCompleteRuntimePlugin.
            dev && !isRspack && new _forcecompleteruntime.default(),
            isNodeServer && new bundler.NormalModuleReplacementPlugin(/\.\/(.+)\.shared-runtime$/, function(resource) {
                const moduleName = _path.default.basename(resource.request, '.shared-runtime');
                const layer = resource.contextInfo.issuerLayer;
                let runtime;
                switch(layer){
                    case _constants.WEBPACK_LAYERS.serverSideRendering:
                    case _constants.WEBPACK_LAYERS.reactServerComponents:
                    case _constants.WEBPACK_LAYERS.appPagesBrowser:
                    case _constants.WEBPACK_LAYERS.actionBrowser:
                        runtime = 'app-page';
                        break;
                    case null:
                    case undefined:
                    default:
                        runtime = 'pages';
                }
                resource.request = `next/dist/server/route-modules/${runtime}/vendored/contexts/${moduleName}`;
            }),
            dev && new _memorywithgccacheplugin.MemoryWithGcCachePlugin({
                maxGenerations: 5
            }),
            dev && isClient && (isRspack ? new (__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/ReactRefreshRspackPlugin.js [app-client] (ecmascript)")).default() : new _ReactRefreshWebpackPlugin.default(_webpack.webpack)),
            // Makes sure `Buffer` and `process` are polyfilled in client and flight bundles (same behavior as webpack 4)
            (isClient || isEdgeServer) && new bundler.ProvidePlugin({
                // Buffer is used by getInlineScriptSource
                Buffer: [
                    "[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)",
                    'Buffer'
                ],
                // Avoid process being overridden when in web run time
                ...isClient && {
                    process: [
                        "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)"
                    ]
                }
            }),
            new ((0, _getwebpackbundler.default)()).DefinePlugin((0, _defineenv.getDefineEnv)({
                isTurbopack: false,
                config,
                dev,
                distDir,
                projectPath: dir,
                fetchCacheKeyPrefix,
                hasRewrites,
                isClient,
                isEdgeServer,
                isNodeServer,
                middlewareMatchers,
                omitNonDeterministic: isCompileMode,
                rewrites
            })),
            isClient && new _reactloadableplugin.ReactLoadablePlugin({
                filename: _constants1.REACT_LOADABLE_MANIFEST,
                pagesDir,
                appDir,
                runtimeAsset: `server/${_constants1.MIDDLEWARE_REACT_LOADABLE_MANIFEST}.js`,
                dev
            }),
            isNodeServer && !dev && new (__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/next-trace-entrypoints-plugin.js [app-client] (ecmascript)")).TraceEntryPointsPlugin({
                rootDir: dir,
                appDir: appDir,
                pagesDir: pagesDir,
                esmExternals: config.experimental.esmExternals,
                outputFileTracingRoot: config.outputFileTracingRoot,
                appDirEnabled: hasAppDir,
                traceIgnores: [],
                compilerType
            }),
            // Moment.js is an extremely popular library that bundles large locale files
            // by default due to how Webpack interprets its code. This is a practical
            // solution that requires the user to opt into importing specific locales.
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            config.excludeDefaultMomentLocales && new bundler.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/
            }),
            ...dev ? (()=>{
                // Even though require.cache is server only we have to clear assets from both compilations
                // This is because the client compilation generates the build manifest that's used on the server side
                const { NextJsRequireCacheHotReloader } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/nextjs-require-cache-hot-reloader.js [app-client] (ecmascript)");
                const devPlugins = [
                    new NextJsRequireCacheHotReloader({
                        serverComponents: hasAppDir
                    })
                ];
                if (isClient || isEdgeServer) {
                    devPlugins.push(new bundler.HotModuleReplacementPlugin());
                }
                return devPlugins;
            })() : [],
            !dev && new bundler.IgnorePlugin({
                resourceRegExp: /react-is/,
                contextRegExp: /next[\\/]dist[\\/]/
            }),
            isNodeOrEdgeCompilation && new _pagesmanifestplugin.default({
                dev,
                appDirEnabled: hasAppDir,
                isEdgeRuntime: isEdgeServer,
                distDir: !dev ? distDir : undefined
            }),
            // MiddlewarePlugin should be after DefinePlugin so NEXT_PUBLIC_*
            // replacement is done before its process.env.* handling
            isEdgeServer && new _middlewareplugin.default({
                dev,
                sriEnabled: !dev && !!((_config_experimental_sri = config.experimental.sri) == null ? void 0 : _config_experimental_sri.algorithm),
                rewrites,
                edgeEnvironments: {
                    __NEXT_BUILD_ID: buildId,
                    NEXT_SERVER_ACTIONS_ENCRYPTION_KEY: encryptionKey,
                    __NEXT_PREVIEW_MODE_ID: previewProps.previewModeId,
                    __NEXT_PREVIEW_MODE_SIGNING_KEY: previewProps.previewModeSigningKey,
                    __NEXT_PREVIEW_MODE_ENCRYPTION_KEY: previewProps.previewModeEncryptionKey
                }
            }),
            isClient && new _buildmanifestplugin.default({
                buildId,
                rewrites,
                isDevFallback,
                appDirEnabled: hasAppDir,
                clientRouterFilters
            }),
            isRspack ? new _rspackprofilingplugin.RspackProfilingPlugin({
                runWebpackSpan
            }) : new _profilingplugin.ProfilingPlugin({
                runWebpackSpan,
                rootDir: dir
            }),
            new _wellknownerrorsplugin.WellKnownErrorsPlugin(),
            isClient && new _copyfileplugin.CopyFilePlugin({
                // file path to build output of `@next/polyfill-nomodule`
                filePath: "[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/polyfill-nomodule.js [app-client] (ecmascript)",
                cacheKey: "16.0.7",
                name: `static/chunks/polyfills${dev ? '' : '-[hash]'}.js`,
                minimize: false,
                info: {
                    [_constants1.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL]: 1,
                    // This file is already minified
                    minimized: true
                }
            }),
            hasAppDir && (isClient ? new _flightmanifestplugin.ClientReferenceManifestPlugin({
                dev,
                appDir,
                experimentalInlineCss: !!config.experimental.inlineCss
            }) : new FlightClientEntryPlugin({
                appDir,
                dev,
                isEdgeServer,
                encryptionKey
            })),
            hasAppDir && !isClient && new _nexttypesplugin.NextTypesPlugin({
                dir,
                distDir: config.distDir,
                appDir,
                dev,
                isEdgeServer,
                pageExtensions: config.pageExtensions,
                originalRewrites,
                originalRedirects
            }),
            !dev && isClient && !!((_config_experimental_sri1 = config.experimental.sri) == null ? void 0 : _config_experimental_sri1.algorithm) && new _subresourceintegrityplugin.SubresourceIntegrityPlugin(config.experimental.sri.algorithm),
            isClient && new _nextfontmanifestplugin.NextFontManifestPlugin({
                appDir
            }),
            !dev && isClient && config.experimental.cssChunking && (isRspack ? new ((0, _getrspack.getRspackCore)()).experiments.CssChunkingPlugin({
                strict: config.experimental.cssChunking === 'strict',
                nextjs: true
            }) : new _csschunkingplugin.CssChunkingPlugin(config.experimental.cssChunking === 'strict')),
            telemetryPlugin,
            !dev && isNodeServer && new (__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin.js [app-client] (ecmascript)")).TelemetryPlugin(new Map()),
            shouldEnableSlowModuleDetection && new (__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/slow-module-detection-plugin.js [app-client] (ecmascript)")).default({
                compilerType,
                ...config.experimental.slowModuleDetection
            }),
            isRspack && new ((0, _getrspack.getRspackCore)()).NextExternalsPlugin({
                compilerType,
                config,
                optOutBundlingPackageRegex,
                finalTranspilePackages,
                dir,
                defaultOverrides: _requirehook.defaultOverrides
            })
        ].filter(Boolean)
    };
    // Support tsconfig and jsconfig baseUrl
    // Only add the baseUrl if it's explicitly set in tsconfig/jsconfig
    if (resolvedBaseUrl && !resolvedBaseUrl.isImplicit) {
        var _webpackConfig_resolve_modules, _webpackConfig_resolve1;
        (_webpackConfig_resolve1 = webpackConfig.resolve) == null ? void 0 : (_webpackConfig_resolve_modules = _webpackConfig_resolve1.modules) == null ? void 0 : _webpackConfig_resolve_modules.push(resolvedBaseUrl.baseUrl);
    }
    (_webpackConfig_resolve = webpackConfig.resolve) == null ? void 0 : (_webpackConfig_resolve_plugins = _webpackConfig_resolve.plugins) == null ? void 0 : _webpackConfig_resolve_plugins.unshift(new _jsconfigpathsplugin.JsConfigPathsPlugin((jsConfig == null ? void 0 : (_jsConfig_compilerOptions2 = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions2.paths) || {}, resolvedBaseUrl));
    const webpack5Config = webpackConfig;
    if (isEdgeServer) {
        var _webpack5Config_module_rules, _webpack5Config_module, _webpack5Config_module_rules1, _webpack5Config_module1, _webpack5Config_module_rules2, _webpack5Config_module2;
        (_webpack5Config_module = webpack5Config.module) == null ? void 0 : (_webpack5Config_module_rules = _webpack5Config_module.rules) == null ? void 0 : _webpack5Config_module_rules.unshift({
            test: /\.wasm$/,
            loader: 'next-middleware-wasm-loader',
            type: 'javascript/auto',
            resourceQuery: /module/i
        });
        (_webpack5Config_module1 = webpack5Config.module) == null ? void 0 : (_webpack5Config_module_rules1 = _webpack5Config_module1.rules) == null ? void 0 : _webpack5Config_module_rules1.unshift({
            dependency: 'url',
            loader: 'next-middleware-asset-loader',
            type: 'javascript/auto',
            layer: _constants.WEBPACK_LAYERS.edgeAsset
        });
        (_webpack5Config_module2 = webpack5Config.module) == null ? void 0 : (_webpack5Config_module_rules2 = _webpack5Config_module2.rules) == null ? void 0 : _webpack5Config_module_rules2.unshift({
            issuerLayer: _constants.WEBPACK_LAYERS.edgeAsset,
            type: 'asset/source'
        });
    }
    webpack5Config.experiments = {
        layers: true,
        cacheUnaffected: true,
        buildHttp: Array.isArray(config.experimental.urlImports) ? {
            allowedUris: config.experimental.urlImports,
            cacheLocation: _path.default.join(dir, 'next.lock/data'),
            lockfileLocation: _path.default.join(dir, 'next.lock/lock.json')
        } : config.experimental.urlImports ? {
            cacheLocation: _path.default.join(dir, 'next.lock/data'),
            lockfileLocation: _path.default.join(dir, 'next.lock/lock.json'),
            ...config.experimental.urlImports
        } : undefined
    };
    if (isRspack) {
        // The layers experiment is now stable in Rspack
        delete webpack5Config.experiments.layers;
    }
    webpack5Config.module.parser = {
        javascript: {
            url: 'relative'
        }
    };
    webpack5Config.module.generator = {
        asset: {
            filename: 'static/media/[name].[hash:8][ext]'
        }
    };
    if (!webpack5Config.output) {
        webpack5Config.output = {};
    }
    if (isClient) {
        webpack5Config.output.trustedTypes = 'nextjs#bundler';
    }
    if (isClient || isEdgeServer) {
        webpack5Config.output.enabledLibraryTypes = [
            'assign'
        ];
    }
    // This enables managedPaths for all node_modules
    // and also for the unplugged folder when using yarn pnp
    // It also add the yarn cache to the immutable paths
    webpack5Config.snapshot = {};
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.pnp === '3') {
        webpack5Config.snapshot.managedPaths = [
            /^(.+?(?:[\\/]\.yarn[\\/]unplugged[\\/][^\\/]+)?[\\/]node_modules[\\/])/
        ];
    } else {
        webpack5Config.snapshot.managedPaths = [
            /^(.+?[\\/]node_modules[\\/])/
        ];
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.pnp === '3') {
        webpack5Config.snapshot.immutablePaths = [
            /^(.+?[\\/]cache[\\/][^\\/]+\.zip[\\/]node_modules[\\/])/
        ];
    }
    if (dev) {
        if (!webpack5Config.optimization) {
            webpack5Config.optimization = {};
        }
        // For Server Components, it's necessary to have provided exports collected
        // to generate the correct flight manifest.
        if (!hasAppDir) {
            webpack5Config.optimization.providedExports = false;
        }
        webpack5Config.optimization.usedExports = false;
    }
    const configVars = JSON.stringify({
        optimizePackageImports: config == null ? void 0 : (_config_experimental1 = config.experimental) == null ? void 0 : _config_experimental1.optimizePackageImports,
        crossOrigin: config.crossOrigin,
        pageExtensions: pageExtensions,
        trailingSlash: config.trailingSlash,
        devIndicatorsPosition: config.devIndicators === false ? undefined : config.devIndicators.position,
        productionBrowserSourceMaps: !!config.productionBrowserSourceMaps,
        reactStrictMode: config.reactStrictMode,
        optimizeCss: config.experimental.optimizeCss,
        nextScriptWorkers: config.experimental.nextScriptWorkers,
        scrollRestoration: config.experimental.scrollRestoration,
        basePath: config.basePath,
        excludeDefaultMomentLocales: config.excludeDefaultMomentLocales,
        assetPrefix: config.assetPrefix,
        disableOptimizedLoading,
        isEdgeRuntime: isEdgeServer,
        reactProductionProfiling,
        webpack: !!config.webpack,
        hasRewrites,
        swcLoader: useSWCLoader,
        removeConsole: (_config_compiler5 = config.compiler) == null ? void 0 : _config_compiler5.removeConsole,
        reactRemoveProperties: (_config_compiler6 = config.compiler) == null ? void 0 : _config_compiler6.reactRemoveProperties,
        styledComponents: (_config_compiler7 = config.compiler) == null ? void 0 : _config_compiler7.styledComponents,
        relay: (_config_compiler8 = config.compiler) == null ? void 0 : _config_compiler8.relay,
        emotion: (_config_compiler9 = config.compiler) == null ? void 0 : _config_compiler9.emotion,
        modularizeImports: config.modularizeImports,
        imageLoaderFile: config.images.loaderFile,
        clientTraceMetadata: config.experimental.clientTraceMetadata,
        serverSourceMaps: config.experimental.serverSourceMaps,
        serverReferenceHashSalt: encryptionKey
    });
    const cache = {
        type: 'filesystem',
        // Disable memory cache in development in favor of our own MemoryWithGcCachePlugin.
        maxMemoryGenerations: dev ? 0 : Infinity,
        // Includes:
        //  - Next.js location on disk (some loaders use absolute paths and some resolve options depend on absolute paths)
        //  - Next.js version
        //  - next.config.js keys that affect compilation
        version: `${("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/next/dist/build")}|${"16.0.7"}|${configVars}`,
        cacheDirectory: _path.default.join(distDir, 'cache', 'webpack'),
        // For production builds, it's more efficient to compress all cache files together instead of compression each one individually.
        // So we disable compression here and allow the build runner to take care of compressing the cache as a whole.
        // For local development, we still want to compress the cache files individually to avoid I/O bottlenecks
        // as we are seeing 1~10 seconds of fs I/O time from user reports.
        compression: dev ? 'gzip' : false
    };
    // Adds `next.config.js` as a buildDependency when custom webpack config is provided
    if (config.webpack && config.configFile) {
        cache.buildDependencies = {
            config: [
                config.configFile
            ],
            // We don't want to use the webpack default buildDependencies as we already include the next.js version
            defaultWebpack: []
        };
    } else {
        cache.buildDependencies = {
            // We don't want to use the webpack default buildDependencies as we already include the next.js version
            defaultWebpack: []
        };
    }
    (_webpack5Config_plugins = webpack5Config.plugins) == null ? void 0 : _webpack5Config_plugins.push((compiler)=>{
        compiler.hooks.done.tap('next-build-dependencies', (stats)=>{
            const buildDependencies = stats.compilation.buildDependencies;
            const nextPackage = _path.default.dirname("[project]/JobPortal/frontend/node_modules/next/package.json (json)");
            // Remove all next.js build dependencies, they are already covered by the cacheVersion
            // and next.js also imports the output files which leads to broken caching.
            for (const dep of buildDependencies){
                if (dep.startsWith(nextPackage)) {
                    buildDependencies.delete(dep);
                }
            }
        });
    });
    webpack5Config.cache = cache;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_WEBPACK_LOGGING) {
        const infra = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_WEBPACK_LOGGING.includes('infrastructure');
        const profileClient = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_WEBPACK_LOGGING.includes('profile-client');
        const profileServer = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_WEBPACK_LOGGING.includes('profile-server');
        const summaryClient = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_WEBPACK_LOGGING.includes('summary-client');
        const summaryServer = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_WEBPACK_LOGGING.includes('summary-server');
        const profile = profileClient && isClient || profileServer && isNodeOrEdgeCompilation;
        const summary = summaryClient && isClient || summaryServer && isNodeOrEdgeCompilation;
        const logDefault = !infra && !profile && !summary;
        if (logDefault || infra) {
            webpack5Config.infrastructureLogging = {
                level: 'verbose',
                debug: /FileSystemInfo/
            };
        }
        if (logDefault || profile) {
            webpack5Config.plugins.push((compiler)=>{
                compiler.hooks.done.tap('next-webpack-logging', (stats)=>{
                    console.log(stats.toString({
                        colors: true,
                        logging: logDefault ? 'log' : 'verbose'
                    }));
                });
            });
        } else if (summary) {
            webpack5Config.plugins.push((compiler)=>{
                compiler.hooks.done.tap('next-webpack-logging', (stats)=>{
                    console.log(stats.toString({
                        preset: 'summary',
                        colors: true,
                        timings: true
                    }));
                });
            });
        }
        if (profile) {
            const ProgressPlugin = _webpack.webpack.ProgressPlugin;
            webpack5Config.plugins.push(new ProgressPlugin({
                profile: true
            }));
            webpack5Config.profile = true;
        }
    }
    webpackConfig = await (0, _config.buildConfiguration)(webpackConfig, {
        supportedBrowsers,
        rootDirectory: dir,
        customAppFile: pagesDir ? new RegExp((0, _escaperegexp.escapeStringRegexp)(_path.default.join(pagesDir, `_app`))) : undefined,
        hasAppDir,
        isDevelopment: dev,
        isServer: isNodeOrEdgeCompilation,
        isEdgeRuntime: isEdgeServer,
        targetWeb: isClient || isEdgeServer,
        assetPrefix: config.assetPrefix || '',
        sassOptions: config.sassOptions,
        productionBrowserSourceMaps: config.productionBrowserSourceMaps,
        future: config.future,
        experimental: config.experimental,
        disableStaticImages: config.images.disableStaticImages,
        transpilePackages: config.transpilePackages,
        serverSourceMaps: config.experimental.serverSourceMaps
    });
    // @ts-ignore Cache exists
    webpackConfig.cache.name = `${webpackConfig.name}-${webpackConfig.mode}${isDevFallback ? '-fallback' : ''}`;
    if (dev) {
        if (webpackConfig.module) {
            if (isRspack) {
                ;
                webpackConfig.module.unsafeCache = NEGATIVE_UNSAFE_CACHE_REGEX;
            } else {
                webpackConfig.module.unsafeCache = (module1)=>!UNSAFE_CACHE_REGEX.test(module1.resource);
            }
        } else {
            if (isRspack) {
                ;
                webpackConfig.module = {
                    unsafeCache: NEGATIVE_UNSAFE_CACHE_REGEX
                };
            } else {
                webpackConfig.module = {
                    unsafeCache: (module1)=>!UNSAFE_CACHE_REGEX.test(module1.resource)
                };
            }
        }
    }
    let originalDevtool = webpackConfig.devtool;
    if (typeof config.webpack === 'function') {
        var _webpackConfig_plugins, _webpack5Config_experiments, _webpack5Config_experiments1;
        const pluginCountBefore = (_webpackConfig_plugins = webpackConfig.plugins) == null ? void 0 : _webpackConfig_plugins.length;
        webpackConfig = config.webpack(webpackConfig, {
            dir,
            dev,
            isServer: isNodeOrEdgeCompilation,
            buildId,
            config,
            defaultLoaders,
            totalPages: Object.keys(entrypoints).length,
            webpack: bundler,
            ...isNodeOrEdgeCompilation ? {
                nextRuntime: isEdgeServer ? 'edge' : 'nodejs'
            } : {}
        });
        if (telemetryPlugin && pluginCountBefore) {
            var _webpackConfig_plugins1;
            const pluginCountAfter = (_webpackConfig_plugins1 = webpackConfig.plugins) == null ? void 0 : _webpackConfig_plugins1.length;
            if (pluginCountAfter) {
                const pluginsChanged = pluginCountAfter !== pluginCountBefore;
                telemetryPlugin.addUsage('webpackPlugins', pluginsChanged ? 1 : 0);
            }
        }
        if (!webpackConfig) {
            throw Object.defineProperty(new Error(`Webpack config is undefined. You may have forgot to return properly from within the "webpack" method of your ${config.configFileName}.\n` + 'See more info here https://nextjs.org/docs/messages/undefined-webpack-config'), "__NEXT_ERROR_CODE", {
                value: "E297",
                enumerable: false,
                configurable: true
            });
        }
        if (dev && originalDevtool !== webpackConfig.devtool) {
            webpackConfig.devtool = originalDevtool;
            devtoolRevertWarning(originalDevtool);
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const webpack5Config = webpackConfig;
        // disable lazy compilation of entries as next.js has it's own method here
        if (((_webpack5Config_experiments = webpack5Config.experiments) == null ? void 0 : _webpack5Config_experiments.lazyCompilation) === true) {
            webpack5Config.experiments.lazyCompilation = {
                entries: false
            };
        } else if (typeof ((_webpack5Config_experiments1 = webpack5Config.experiments) == null ? void 0 : _webpack5Config_experiments1.lazyCompilation) === 'object' && webpack5Config.experiments.lazyCompilation.entries !== false) {
            webpack5Config.experiments.lazyCompilation.entries = false;
        }
        if (typeof webpackConfig.then === 'function') {
            console.warn('> Promise returned in next config. https://nextjs.org/docs/messages/promise-in-next-config');
        }
    }
    const rules = ((_webpackConfig_module = webpackConfig.module) == null ? void 0 : _webpackConfig_module.rules) || [];
    const customSvgRule = rules.find((rule)=>rule && typeof rule === 'object' && rule.loader !== 'next-image-loader' && 'test' in rule && rule.test instanceof RegExp && rule.test.test('.svg') || false);
    if (customSvgRule && hasAppDir) {
        // Create React aliases for SVG components that were transformed using a
        // custom webpack config with e.g. the `@svgr/webpack` loader, or the
        // `babel-plugin-inline-react-svg` plugin.
        rules.push({
            test: customSvgRule.test,
            oneOf: [
                _constants.WEBPACK_LAYERS.reactServerComponents,
                _constants.WEBPACK_LAYERS.serverSideRendering,
                _constants.WEBPACK_LAYERS.appPagesBrowser
            ].map((layer)=>({
                    issuerLayer: layer,
                    resolve: {
                        alias: (0, _createcompileraliases.createVendoredReactAliases)(bundledReactChannel, {
                            reactProductionProfiling,
                            layer,
                            isBrowser: isClient,
                            isEdgeServer
                        })
                    }
                }))
        });
    }
    if (!config.images.disableStaticImages) {
        const nextImageRule = rules.find((rule)=>rule && typeof rule === 'object' && rule.loader === 'next-image-loader');
        if (customSvgRule && nextImageRule && typeof nextImageRule === 'object') {
            // Exclude svg if the user already defined it in custom
            // webpack config such as the `@svgr/webpack` loader, or
            // the `babel-plugin-inline-react-svg` plugin.
            nextImageRule.test = /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i;
        }
    }
    if (config.experimental.craCompat && ((_webpackConfig_module1 = webpackConfig.module) == null ? void 0 : _webpackConfig_module1.rules) && webpackConfig.plugins) {
        // CRA allows importing non-webpack handled files with file-loader
        // these need to be the last rule to prevent catching other items
        // https://github.com/facebook/create-react-app/blob/fddce8a9e21bf68f37054586deb0c8636a45f50b/packages/react-scripts/config/webpack.config.js#L594
        const fileLoaderExclude = [
            /\.(js|mjs|jsx|ts|tsx|json)$/
        ];
        const fileLoader = {
            exclude: fileLoaderExclude,
            issuer: fileLoaderExclude,
            type: 'asset/resource'
        };
        const topRules = [];
        const innerRules = [];
        for (const rule of webpackConfig.module.rules){
            if (!rule || typeof rule !== 'object') continue;
            if (rule.resolve) {
                topRules.push(rule);
            } else {
                if (rule.oneOf && !(rule.test || rule.exclude || rule.resource || rule.issuer)) {
                    rule.oneOf.forEach((r)=>innerRules.push(r));
                } else {
                    innerRules.push(rule);
                }
            }
        }
        webpackConfig.module.rules = [
            ...topRules,
            {
                oneOf: [
                    ...innerRules,
                    fileLoader
                ]
            }
        ];
    }
    // Backwards compat with webpack-dev-middleware options object
    if (typeof config.webpackDevMiddleware === 'function') {
        const options = config.webpackDevMiddleware({
            watchOptions: webpackConfig.watchOptions
        });
        if (options.watchOptions) {
            webpackConfig.watchOptions = options.watchOptions;
        }
    }
    function canMatchCss(rule) {
        if (!rule) {
            return false;
        }
        const fileNames = [
            '/tmp/NEXTJS_CSS_DETECTION_FILE.css',
            '/tmp/NEXTJS_CSS_DETECTION_FILE.scss',
            '/tmp/NEXTJS_CSS_DETECTION_FILE.sass',
            '/tmp/NEXTJS_CSS_DETECTION_FILE.less',
            '/tmp/NEXTJS_CSS_DETECTION_FILE.styl'
        ];
        if (rule instanceof RegExp && fileNames.some((input)=>rule.test(input))) {
            return true;
        }
        if (typeof rule === 'function') {
            if (fileNames.some((input)=>{
                try {
                    if (rule(input)) {
                        return true;
                    }
                } catch  {}
                return false;
            })) {
                return true;
            }
        }
        if (Array.isArray(rule) && rule.some(canMatchCss)) {
            return true;
        }
        return false;
    }
    const hasUserCssConfig = ((_webpackConfig_module2 = webpackConfig.module) == null ? void 0 : (_webpackConfig_module_rules = _webpackConfig_module2.rules) == null ? void 0 : _webpackConfig_module_rules.some((rule)=>canMatchCss(rule.test) || canMatchCss(rule.include))) ?? false;
    if (hasUserCssConfig) {
        var _webpackConfig_module_rules1, _webpackConfig_module3, _webpackConfig_plugins2, _webpackConfig_optimization_minimizer, _webpackConfig_optimization;
        // only show warning for one build
        if (isNodeOrEdgeCompilation) {
            console.warn((0, _picocolors.yellow)((0, _picocolors.bold)('Warning: ')) + (0, _picocolors.bold)('Built-in CSS support is being disabled due to custom CSS configuration being detected.\n') + 'See here for more info: https://nextjs.org/docs/messages/built-in-css-disabled\n');
        }
        if ((_webpackConfig_module3 = webpackConfig.module) == null ? void 0 : (_webpackConfig_module_rules1 = _webpackConfig_module3.rules) == null ? void 0 : _webpackConfig_module_rules1.length) {
            // Remove default CSS Loaders
            webpackConfig.module.rules.forEach((r)=>{
                if (!r || typeof r !== 'object') return;
                if (Array.isArray(r.oneOf)) {
                    r.oneOf = r.oneOf.filter((o)=>o[Symbol.for('__next_css_remove')] !== true);
                }
            });
        }
        if ((_webpackConfig_plugins2 = webpackConfig.plugins) == null ? void 0 : _webpackConfig_plugins2.length) {
            // Disable CSS Extraction Plugin
            webpackConfig.plugins = webpackConfig.plugins.filter((p)=>p.__next_css_remove !== true);
        }
        if ((_webpackConfig_optimization = webpackConfig.optimization) == null ? void 0 : (_webpackConfig_optimization_minimizer = _webpackConfig_optimization.minimizer) == null ? void 0 : _webpackConfig_optimization_minimizer.length) {
            // Disable CSS Minifier
            webpackConfig.optimization.minimizer = webpackConfig.optimization.minimizer.filter((e)=>e.__next_css_remove !== true);
        }
    }
    // Inject missing React Refresh loaders so that development mode is fast:
    if (dev && isClient) {
        attachReactRefresh(webpackConfig, defaultLoaders.babel);
    }
    // Backwards compat for `main.js` entry key
    // and setup of dependencies between entries
    // we can't do that in the initial entry for
    // backward-compat reasons
    const originalEntry = webpackConfig.entry;
    if (typeof originalEntry !== 'undefined') {
        const updatedEntry = async ()=>{
            const entry = typeof originalEntry === 'function' ? await originalEntry() : originalEntry;
            // Server compilation doesn't have main.js
            if (clientEntries && Array.isArray(entry['main.js']) && entry['main.js'].length > 0) {
                const originalFile = clientEntries[_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN];
                entry[_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN] = [
                    ...entry['main.js'],
                    originalFile
                ];
            }
            delete entry['main.js'];
            for (const name of Object.keys(entry)){
                entry[name] = (0, _entries.finalizeEntrypoint)({
                    value: entry[name],
                    compilerType,
                    name,
                    hasAppDir
                });
            }
            return entry;
        };
        // @ts-ignore webpack 5 typings needed
        webpackConfig.entry = updatedEntry;
    }
    if (!dev && typeof webpackConfig.entry === 'function') {
        // entry is always a function
        webpackConfig.entry = await webpackConfig.entry();
    }
    return webpackConfig;
}
function getNextRootParamsRules({ isRootParamsEnabled, isClient, appDir, pageExtensions }) {
    // Match resolved import of 'next/root-params'
    const nextRootParamsModule = _path.default.join(_nextdirpaths.NEXT_PROJECT_ROOT, 'root-params.js');
    const createInvalidImportRule = (message)=>{
        return {
            resource: nextRootParamsModule,
            loader: 'next-invalid-import-error-loader',
            options: {
                message
            }
        };
    };
    // Hard-error if the flag is not enabled, regardless of if we're on the server or on the client.
    if (!isRootParamsEnabled) {
        return [
            createInvalidImportRule("'next/root-params' can only be imported when `experimental.rootParams` is enabled.")
        ];
    }
    // If there's no app-dir (and thus no layouts), there's no sensible way to use 'next/root-params',
    // because we wouldn't generate any getters.
    if (!appDir) {
        return [
            createInvalidImportRule("'next/root-params' can only be used with the App Directory.")
        ];
    }
    // In general, the compiler should prevent importing 'next/root-params' from client modules, but it doesn't catch everything.
    // If an import slips through our validation, make it error.
    const invalidClientImportRule = createInvalidImportRule("'next/root-params' cannot be imported from a Client Component module. It should only be used from a Server Component.");
    // in the browser compilation we can skip the server rules, because we know all imports will be invalid.
    if (isClient) {
        return [
            invalidClientImportRule
        ];
    }
    return [
        {
            oneOf: [
                {
                    resource: nextRootParamsModule,
                    issuerLayer: _utils.shouldUseReactServerCondition,
                    loader: 'next-root-params-loader',
                    options: {
                        appDir,
                        pageExtensions
                    }
                },
                // if the rule above didn't match, we're in the SSR layer (or something else that isn't server-only).
                invalidClientImportRule
            ]
        }
    ];
} //# sourceMappingURL=webpack-config.js.map
}),
]);

//# sourceMappingURL=661c0_next_dist_build_66ce105c._.js.map