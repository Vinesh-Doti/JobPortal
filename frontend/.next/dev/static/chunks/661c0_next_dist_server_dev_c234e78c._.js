(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/file-logger.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    FileLogger: null,
    getFileLogger: null,
    test__resetFileLogger: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    FileLogger: function() {
        return FileLogger;
    },
    getFileLogger: function() {
        return getFileLogger;
    },
    test__resetFileLogger: function() {
        return test__resetFileLogger;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class FileLogger {
    initialize(distDir, mcpServerEnabled) {
        this.logFilePath = _path.default.join(distDir, 'logs', `next-development.log`);
        this.mcpServerEnabled = mcpServerEnabled;
        if (this.isInitialized) {
            return;
        }
        // Only initialize if mcpServer is enabled
        if (!this.mcpServerEnabled) {
            return;
        }
        try {
            // Clean up the log file on each initialization
            // ensure the directory exists
            _fs.default.mkdirSync(_path.default.dirname(this.logFilePath), {
                recursive: true
            });
            _fs.default.writeFileSync(this.logFilePath, '');
            this.isInitialized = true;
        } catch (error) {
            console.error(error);
        }
    }
    formatTimestamp() {
        // Use performance.now() instead of Date.now() for avoid sync IO of cache components
        const now = performance.now();
        const hours = Math.floor(now / 3600000).toString().padStart(2, '0');
        const minutes = Math.floor(now % 3600000 / 60000).toString().padStart(2, '0');
        const seconds = Math.floor(now % 60000 / 1000).toString().padStart(2, '0');
        const milliseconds = Math.floor(now % 1000).toString().padStart(3, '0');
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    formatLogEntry(entry) {
        const { timestamp, source, level, message } = entry;
        const levelPadded = level.toUpperCase().padEnd(7, ' ') // Pad level to 7 characters for alignment
        ;
        const sourcePadded = source === 'Browser' ? source : 'Server ';
        return `[${timestamp}] ${sourcePadded} ${levelPadded} ${message}\n`;
    }
    scheduleFlush() {
        // Debounce the flush
        if (this.flushTimer) {
            clearTimeout(this.flushTimer);
            this.flushTimer = null;
        }
        // Delay the log flush to ensure more logs can be batched together asynchronously
        this.flushTimer = setTimeout(()=>{
            this.flush();
        }, 100);
    }
    getLogQueue() {
        return this.logQueue;
    }
    flush() {
        if (this.logQueue.length === 0) {
            return;
        }
        // Only flush to disk if mcpServer is enabled
        if (!this.mcpServerEnabled) {
            this.logQueue = [] // Clear the queue without writing
            ;
            this.flushTimer = null;
            return;
        }
        try {
            // Ensure the directory exists before writing
            const logDir = _path.default.dirname(this.logFilePath);
            if (!_fs.default.existsSync(logDir)) {
                _fs.default.mkdirSync(logDir, {
                    recursive: true
                });
            }
            const logsToWrite = this.logQueue.join('');
            // Writing logs to files synchronously to ensure they're written before returning
            _fs.default.appendFileSync(this.logFilePath, logsToWrite);
            this.logQueue = [];
        } catch (error) {
            console.error('Failed to flush logs to file:', error);
        } finally{
            this.flushTimer = null;
        }
    }
    enqueueLog(formattedEntry) {
        this.logQueue.push(formattedEntry);
        // Cancel existing timer and start a new one to ensure all logs are flushed together
        if (this.flushTimer) {
            clearTimeout(this.flushTimer);
            this.flushTimer = null;
        }
        this.scheduleFlush();
    }
    log(source, level, message) {
        // Don't log anything if mcpServer is disabled
        if (!this.mcpServerEnabled) {
            return;
        }
        if (!this.isInitialized) {
            return;
        }
        const logEntry = {
            timestamp: this.formatTimestamp(),
            source,
            level,
            message
        };
        const formattedEntry = this.formatLogEntry(logEntry);
        this.enqueueLog(formattedEntry);
    }
    logServer(level, message) {
        this.log('Server', level, message);
    }
    logBrowser(level, message) {
        this.log('Browser', level, message);
    }
    // Force flush all queued logs immediately
    forceFlush() {
        if (this.flushTimer) {
            clearTimeout(this.flushTimer);
            this.flushTimer = null;
        }
        this.flush();
    }
    // Cleanup method to flush logs on process exit
    destroy() {
        this.forceFlush();
    }
    constructor(){
        this.logFilePath = '';
        this.isInitialized = false;
        this.logQueue = [];
        this.flushTimer = null;
        this.mcpServerEnabled = false;
    }
}
// Singleton instance
let fileLogger = null;
function getFileLogger() {
    if (!fileLogger || ("TURBOPACK compile-time value", "development") === 'test') {
        fileLogger = new FileLogger();
    }
    return fileLogger;
}
function test__resetFileLogger() {
    if (fileLogger) {
        fileLogger.destroy();
    }
    fileLogger = null;
} //# sourceMappingURL=file-logger.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/node-stack-frames.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getServerError", {
    enumerable: true,
    get: function() {
        return getServerError;
    }
});
const _stacktraceparser = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/stacktrace-parser/stack-trace-parser.cjs.js [app-client] (ecmascript)");
const _errorsource = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/error-source.js [app-client] (ecmascript)");
function getFilesystemFrame(frame) {
    const f = {
        ...frame
    };
    if (typeof f.file === 'string') {
        if (f.file.startsWith('/') || // Win32:
        /^[a-z]:\\/i.test(f.file) || // Win32 UNC:
        f.file.startsWith('\\\\')) {
            f.file = `file://${f.file}`;
        }
    }
    return f;
}
function getServerError(error, type) {
    if (error.name === 'TurbopackInternalError') {
        // If this is an internal Turbopack error we shouldn't show internal details
        // to the user. These are written to a log file instead.
        const turbopackInternalError = Object.defineProperty(new Error('An unexpected Turbopack error occurred. Please see the output of `next dev` for more details.'), "__NEXT_ERROR_CODE", {
            value: "E167",
            enumerable: false,
            configurable: true
        });
        (0, _errorsource.decorateServerError)(turbopackInternalError, type);
        return turbopackInternalError;
    }
    let n;
    try {
        throw Object.defineProperty(new Error(error.message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    } catch (e) {
        n = e;
    }
    n.name = error.name;
    try {
        n.stack = `${n.toString()}\n${(0, _stacktraceparser.parse)(error.stack).map(getFilesystemFrame).map((f)=>{
            let str = `    at ${f.methodName}`;
            if (f.file) {
                let loc = f.file;
                if (f.lineNumber) {
                    loc += `:${f.lineNumber}`;
                    if (f.column) {
                        loc += `:${f.column}`;
                    }
                }
                str += ` (${loc})`;
            }
            return str;
        }).join('\n')}`;
    } catch  {
        n.stack = error.stack;
    }
    (0, _errorsource.decorateServerError)(n, type);
    return n;
} //# sourceMappingURL=node-stack-frames.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/static-paths-worker.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loadStaticPaths", {
    enumerable: true,
    get: function() {
        return loadStaticPaths;
    }
});
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/require-hook.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/node-environment.js [app-client] (ecmascript)");
const _appsegments = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/app-segments.js [app-client] (ecmascript)");
const _loadcomponents = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/load-components.js [app-client] (ecmascript)");
const _setuphttpagentenv = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/setup-http-agent-env.js [app-client] (ecmascript)");
const _checks = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-modules/checks.js [app-client] (ecmascript)");
const _ppr = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/experimental/ppr.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
const _collectrootparamkeys = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/segment-config/app/collect-root-param-keys.js [app-client] (ecmascript)");
const _app = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/app.js [app-client] (ecmascript)");
const _pages = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/static-paths/pages.js [app-client] (ecmascript)");
const _createincrementalcache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/export/helpers/create-incremental-cache.js [app-client] (ecmascript)");
async function loadStaticPaths({ dir, distDir, pathname, config, httpAgentOptions, locales, defaultLocale, isAppPath, page, isrFlushToDisk, fetchCacheKeyPrefix, cacheMaxMemorySize, requestHeaders, cacheHandler, cacheHandlers, cacheLifeProfiles, nextConfigOutput, buildId, authInterrupts, sriEnabled }) {
    // this needs to be initialized before loadComponents otherwise
    // "use cache" could be missing it's cache handlers
    await (0, _createincrementalcache.createIncrementalCache)({
        dir,
        distDir,
        cacheHandler,
        cacheHandlers,
        requestHeaders,
        fetchCacheKeyPrefix,
        flushToDisk: isrFlushToDisk,
        cacheMaxMemorySize
    });
    // update work memory runtime-config
    (0, _setuphttpagentenv.setHttpClientAndAgentOptions)({
        httpAgentOptions
    });
    const components = await (0, _loadcomponents.loadComponents)({
        distDir,
        // In `pages/`, the page is the same as the pathname.
        page: page || pathname,
        isAppPath,
        isDev: true,
        sriEnabled,
        needsManifestsForLegacyReasons: true
    });
    if (isAppPath) {
        const routeModule = components.routeModule;
        const segments = await (0, _appsegments.collectSegments)(// above that the page type is 'app'.
        routeModule);
        const isRoutePPREnabled = (0, _checks.isAppPageRouteModule)(routeModule) && (0, _ppr.checkIsRoutePPREnabled)(config.pprConfig);
        const rootParamKeys = (0, _collectrootparamkeys.collectRootParamKeys)(routeModule);
        return (0, _app.buildAppStaticPaths)({
            dir,
            page: pathname,
            cacheComponents: config.cacheComponents,
            segments,
            distDir,
            requestHeaders,
            cacheHandler,
            cacheLifeProfiles,
            isrFlushToDisk,
            fetchCacheKeyPrefix,
            cacheMaxMemorySize,
            ComponentMod: components.ComponentMod,
            nextConfigOutput,
            isRoutePPREnabled,
            buildId,
            authInterrupts,
            rootParamKeys
        });
    } else if (!components.getStaticPaths) {
        // We shouldn't get to this point since the worker should only be called for
        // SSG pages with getStaticPaths.
        throw Object.defineProperty(new _invarianterror.InvariantError(`Failed to load page with getStaticPaths for ${pathname}`), "__NEXT_ERROR_CODE", {
            value: "E605",
            enumerable: false,
            configurable: true
        });
    }
    return (0, _pages.buildPagesStaticPaths)({
        page: pathname,
        getStaticPaths: components.getStaticPaths,
        configFileName: config.configFileName,
        locales,
        defaultLocale
    });
} //# sourceMappingURL=static-paths-worker.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/log-requests.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ignoreLoggingIncomingRequests: null,
    logRequests: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ignoreLoggingIncomingRequests: function() {
        return ignoreLoggingIncomingRequests;
    },
    logRequests: function() {
        return logRequests;
    }
});
const _durationtostring = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/duration-to-string.js [app-client] (ecmascript)");
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _url = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/url.js [app-client] (ecmascript)");
const _requestmeta = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/request-meta.js [app-client] (ecmascript)");
function ignoreLoggingIncomingRequests(request, loggingConfig) {
    var _loggingConfig_incomingRequests;
    // If it's boolean use the boolean value
    if (typeof (loggingConfig == null ? void 0 : loggingConfig.incomingRequests) === 'boolean') {
        return !loggingConfig.incomingRequests;
    }
    // Any of the value on the chain is falsy, will not ignore the request.
    const ignore = loggingConfig == null ? void 0 : (_loggingConfig_incomingRequests = loggingConfig.incomingRequests) == null ? void 0 : _loggingConfig_incomingRequests.ignore;
    // If ignore is not set, don't ignore anything
    if (!ignore) {
        return false;
    }
    // If array of RegExp, ignore if any pattern matches
    return ignore.some((pattern)=>pattern.test(request.url));
}
function logRequests(request, response, loggingConfig, requestStartTime, requestEndTime, devRequestTimingMiddlewareStart, devRequestTimingMiddlewareEnd, devRequestTimingInternalsEnd) {
    if (!ignoreLoggingIncomingRequests(request, loggingConfig)) {
        logIncomingRequests(request, requestStartTime, requestEndTime, response.statusCode, devRequestTimingMiddlewareStart, devRequestTimingMiddlewareEnd, devRequestTimingInternalsEnd);
    }
    if (request.fetchMetrics) {
        for (const fetchMetric of request.fetchMetrics){
            logFetchMetric(fetchMetric, loggingConfig);
        }
    }
}
function logIncomingRequests(request, requestStartTime, requestEndTime, statusCode, devRequestTimingMiddlewareStart, devRequestTimingMiddlewareEnd, devRequestTimingInternalsEnd) {
    const isRSC = (0, _requestmeta.getRequestMeta)(request, 'isRSCRequest');
    const url = isRSC ? (0, _url.stripNextRscUnionQuery)(request.url) : request.url;
    const statusCodeColor = statusCode < 200 ? _picocolors.white : statusCode < 300 ? _picocolors.green : statusCode < 400 ? _picocolors.blue : statusCode < 500 ? _picocolors.yellow : _picocolors.red;
    const coloredStatus = statusCodeColor(statusCode.toString());
    const totalRequestTime = requestEndTime - requestStartTime;
    const times = [];
    let middlewareTime;
    if (devRequestTimingMiddlewareStart && devRequestTimingMiddlewareEnd) {
        middlewareTime = devRequestTimingMiddlewareEnd - devRequestTimingMiddlewareStart;
        times.push([
            'proxy.ts',
            middlewareTime
        ]);
    }
    if (devRequestTimingInternalsEnd) {
        let frameworkTime = devRequestTimingInternalsEnd - requestStartTime;
        /* Middleware runs during the internals so we have to subtract it from the framework time */ if (middlewareTime) {
            frameworkTime -= middlewareTime;
        }
        // Insert as the first item to be rendered in the list
        times.unshift([
            'compile',
            frameworkTime
        ]);
        times.push([
            'render',
            requestEndTime - devRequestTimingInternalsEnd
        ]);
    }
    return writeLine(`${request.method} ${url} ${coloredStatus} in ${(0, _durationtostring.hrtimeBigIntDurationToString)(totalRequestTime)}${times.length > 0 ? (0, _picocolors.dim)(` (${times.map(([label, time])=>`${label}: ${(0, _durationtostring.hrtimeBigIntDurationToString)(time)}`).join(', ')})`) : ''}`);
}
function logFetchMetric(fetchMetric, loggingConfig) {
    var _loggingConfig_fetches;
    let { cacheReason, cacheStatus, cacheWarning, end, method, start, status, url } = fetchMetric;
    if (cacheStatus === 'hmr' && !(loggingConfig == null ? void 0 : (_loggingConfig_fetches = loggingConfig.fetches) == null ? void 0 : _loggingConfig_fetches.hmrRefreshes)) {
        // Cache hits during HMR refreshes are intentionally not logged, unless
        // explicitly enabled in the logging config.
        return;
    }
    if (loggingConfig == null ? void 0 : loggingConfig.fetches) {
        if (url.length > 48 && !loggingConfig.fetches.fullUrl) {
            url = truncateUrl(url);
        }
        writeLine((0, _picocolors.white)(`${method} ${url} ${status} in ${Math.round(end - start)}ms ${formatCacheStatus(cacheStatus)}`), 1);
        if (cacheStatus === 'skip' || cacheStatus === 'miss') {
            writeLine((0, _picocolors.gray)(`Cache ${cacheStatus === 'skip' ? 'skipped' : 'missed'} reason: (${(0, _picocolors.white)(cacheReason)})`), 2);
        }
    } else if (cacheWarning) {
        // When logging for fetches is not enabled, we still want to print any
        // associated warnings, so we print the request first to provide context.
        writeLine((0, _picocolors.white)(`${method} ${url}`), 1);
    }
    if (cacheWarning) {
        writeLine(`${(0, _picocolors.yellow)((0, _picocolors.bold)('⚠'))} ${(0, _picocolors.white)(cacheWarning)}`, 2);
    }
}
function writeLine(text, indentationLevel = 0) {
    __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout.write(` ${'│ '.repeat(indentationLevel)}${text}\n`);
}
function truncate(text, maxLength) {
    return maxLength !== undefined && text.length > maxLength ? text.substring(0, maxLength) + '..' : text;
}
function truncateUrl(url) {
    const { protocol, host, pathname, search } = new URL(url);
    return protocol + '//' + truncate(host, 16) + truncate(pathname, 24) + truncate(search, 16);
}
function formatCacheStatus(cacheStatus) {
    switch(cacheStatus){
        case 'hmr':
            return (0, _picocolors.green)('(HMR cache)');
        case 'hit':
            return (0, _picocolors.green)('(cache hit)');
        case 'miss':
        case 'skip':
            return (0, _picocolors.yellow)(`(cache ${cacheStatus})`);
        default:
            return cacheStatus;
    }
} //# sourceMappingURL=log-requests.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/next-dev-server.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return DevServer;
    }
});
const _requestmeta = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/request-meta.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _fs = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _jestworker = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/jest-worker/index.js [app-client] (ecmascript)");
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
const _findpagesdir = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/find-pages-dir.js [app-client] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _nextserver = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/next-server.js [app-client] (ecmascript)"));
const _normalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js [app-client] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-client] (ecmascript)");
const _removepathprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-client] (ecmascript)");
const _storage = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/storage.js [app-client] (ecmascript)");
const _trace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/index.js [app-client] (ecmascript)");
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-client] (ecmascript)");
const _findpagefile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/find-page-file.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/utils.js [app-client] (ecmascript)");
const _coalescedfunction = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/coalesced-function.js [app-client] (ecmascript)");
const _loaddefaulterrorcomponents = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/load-default-error-components.js [app-client] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _iserror = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)"));
const _utils2 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _formatservererror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/format-server-error.js [app-client] (ecmascript)");
const _devroutematchermanager = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-matcher-managers/dev-route-matcher-manager.js [app-client] (ecmascript)");
const _devpagesroutematcherprovider = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-matcher-providers/dev/dev-pages-route-matcher-provider.js [app-client] (ecmascript)");
const _devpagesapiroutematcherprovider = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-matcher-providers/dev/dev-pages-api-route-matcher-provider.js [app-client] (ecmascript)");
const _devapppageroutematcherprovider = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-matcher-providers/dev/dev-app-page-route-matcher-provider.js [app-client] (ecmascript)");
const _devapprouteroutematcherprovider = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-matcher-providers/dev/dev-app-route-route-matcher-provider.js [app-client] (ecmascript)");
const _nodemanifestloader = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-matcher-providers/helpers/manifest-loaders/node-manifest-loader.js [app-client] (ecmascript)");
const _batchedfilereader = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-matcher-providers/dev/helpers/file-reader/batched-file-reader.js [app-client] (ecmascript)");
const _defaultfilereader = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-matcher-providers/dev/helpers/file-reader/default-file-reader.js [app-client] (ecmascript)");
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-client] (ecmascript)");
const _middlewareroutematcher = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/middleware-route-matcher.js [app-client] (ecmascript)");
const _detachedpromise = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/detached-promise.js [app-client] (ecmascript)");
const _ispostpone = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-client] (ecmascript)");
const _generateinterceptionroutesrewrites = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/generate-interception-routes-rewrites.js [app-client] (ecmascript)");
const _buildcustomroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/build-custom-route.js [app-client] (ecmascript)");
const _errorsource = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/error-source.js [app-client] (ecmascript)");
const _logrequests = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/log-requests.js [app-client] (ecmascript)");
const _fallback = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/fallback.js [app-client] (ecmascript)");
const _instrumentationglobalsexternal = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/instrumentation-globals.external.js [app-client] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-regex.js [app-client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
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
// Load ReactDevOverlay only when needed
let PagesDevOverlayBridgeImpl;
const ReactDevOverlay = (props)=>{
    if (PagesDevOverlayBridgeImpl === undefined) {
        PagesDevOverlayBridgeImpl = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup.js [app-client] (ecmascript)").PagesDevOverlayBridge;
    }
    return _react.createElement(PagesDevOverlayBridgeImpl, props);
};
class DevServer extends _nextserver.default {
    getStaticPathsWorker() {
        const worker = new _jestworker.Worker("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/static-paths-worker.js [app-client] (ecmascript)", {
            maxRetries: 1,
            // For dev server, it's not necessary to spin up too many workers as long as you are not doing a load test.
            // This helps reusing the memory a lot.
            numWorkers: 1,
            enableWorkerThreads: this.nextConfig.experimental.workerThreads,
            forkOptions: {
                env: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env,
                    // discard --inspect/--inspect-brk flags from process.env.NODE_OPTIONS. Otherwise multiple Node.js debuggers
                    // would be started if user launch Next.js in debugging mode. The number of debuggers is linked to
                    // the number of workers Next.js tries to launch. The only worker users are interested in debugging
                    // is the main Next.js one
                    NODE_OPTIONS: (0, _utils.getFormattedNodeOptionsWithoutInspect)()
                }
            }
        });
        worker.getStdout().pipe(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout);
        worker.getStderr().pipe(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stderr);
        return worker;
    }
    constructor(options){
        try {
            // Increase the number of stack frames on the server
            Error.stackTraceLimit = 50;
        } catch  {}
        super({
            ...options,
            dev: true
        }), /**
   * The promise that resolves when the server is ready. When this is unset
   * the server is ready.
   */ this.ready = new _detachedpromise.DetachedPromise();
        this.bundlerService = options.bundlerService;
        this.startServerSpan = options.startServerSpan ?? (0, _trace.trace)('start-next-dev-server');
        this.renderOpts.dev = true;
        this.renderOpts.ErrorDebug = ReactDevOverlay;
        this.staticPathsCache = new _lrucache.LRUCache(5 * 1024 * 1024, function length(value) {
            var _JSON_stringify;
            return ((_JSON_stringify = JSON.stringify(value.staticPaths)) == null ? void 0 : _JSON_stringify.length) ?? 0;
        });
        const { pagesDir, appDir } = (0, _findpagesdir.findPagesDir)(this.dir);
        this.pagesDir = pagesDir;
        this.appDir = appDir;
        if (this.nextConfig.experimental.serverComponentsHmrCache) {
            this.serverComponentsHmrCache = new _lrucache.LRUCache(this.nextConfig.cacheMaxMemorySize, function length(value) {
                return JSON.stringify(value).length;
            });
        }
    }
    getServerComponentsHmrCache() {
        return this.serverComponentsHmrCache;
    }
    getRouteMatchers() {
        const { pagesDir, appDir } = (0, _findpagesdir.findPagesDir)(this.dir);
        const ensurer = {
            ensure: async (match, pathname)=>{
                await this.ensurePage({
                    definition: match.definition,
                    page: match.definition.page,
                    clientOnly: false,
                    url: pathname
                });
            }
        };
        const matchers = new _devroutematchermanager.DevRouteMatcherManager(super.getRouteMatchers(), ensurer, this.dir);
        const extensions = this.nextConfig.pageExtensions;
        const extensionsExpression = new RegExp(`\\.(?:${extensions.join('|')})$`);
        // If the pages directory is available, then configure those matchers.
        if (pagesDir) {
            const fileReader = new _batchedfilereader.BatchedFileReader(new _defaultfilereader.DefaultFileReader({
                // Only allow files that have the correct extensions.
                pathnameFilter: (pathname)=>extensionsExpression.test(pathname)
            }));
            matchers.push(new _devpagesroutematcherprovider.DevPagesRouteMatcherProvider(pagesDir, extensions, fileReader, this.localeNormalizer));
            matchers.push(new _devpagesapiroutematcherprovider.DevPagesAPIRouteMatcherProvider(pagesDir, extensions, fileReader, this.localeNormalizer));
        }
        if (appDir) {
            // We create a new file reader for the app directory because we don't want
            // to include any folders or files starting with an underscore. This will
            // prevent the reader from wasting time reading files that we know we
            // don't care about.
            const fileReader = new _batchedfilereader.BatchedFileReader(new _defaultfilereader.DefaultFileReader({
                // Ignore any directory prefixed with an underscore.
                ignorePartFilter: (part)=>part.startsWith('_')
            }));
            // TODO: Improve passing of "is running with Turbopack"
            const isTurbopack = !!("TURBOPACK compile-time value", true);
            matchers.push(new _devapppageroutematcherprovider.DevAppPageRouteMatcherProvider(appDir, extensions, fileReader, isTurbopack));
            matchers.push(new _devapprouteroutematcherprovider.DevAppRouteRouteMatcherProvider(appDir, extensions, fileReader, isTurbopack));
        }
        return matchers;
    }
    getBuildId() {
        return 'development';
    }
    async prepareImpl() {
        var _this_ready;
        (0, _trace.setGlobal)('distDir', this.distDir);
        (0, _trace.setGlobal)('phase', _constants1.PHASE_DEVELOPMENT_SERVER);
        // Use existing telemetry instance from traceGlobals instead of creating a new one.
        // Creating a new instance would overwrite the existing one, causing any telemetry
        // events recorded to the original instance to be lost during cleanup/flush.
        const existingTelemetry = _shared.traceGlobals.get('telemetry');
        const telemetry = existingTelemetry || new _storage.Telemetry({
            distDir: this.distDir
        });
        await super.prepareImpl();
        await this.matchers.reload();
        (_this_ready = this.ready) == null ? void 0 : _this_ready.resolve();
        this.ready = undefined;
        // In dev, this needs to be called after prepare because the build entries won't be known in the constructor
        this.interceptionRoutePatterns = this.getinterceptionRoutePatterns();
        // This is required by the tracing subsystem.
        (0, _trace.setGlobal)('appDir', this.appDir);
        (0, _trace.setGlobal)('pagesDir', this.pagesDir);
        // Only set telemetry if it wasn't already set
        if (!existingTelemetry) {
            (0, _trace.setGlobal)('telemetry', telemetry);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].on('unhandledRejection', (reason)=>{
            if ((0, _ispostpone.isPostpone)(reason)) {
                // React postpones that are unhandled might end up logged here but they're
                // not really errors. They're just part of rendering.
                return;
            }
            this.logErrorWithOriginalStack(reason, 'unhandledRejection');
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].on('uncaughtException', (err)=>{
            this.logErrorWithOriginalStack(err, 'uncaughtException');
        });
    }
    async hasPage(pathname) {
        let normalizedPath;
        try {
            normalizedPath = (0, _normalizepagepath.normalizePagePath)(pathname);
        } catch (err) {
            console.error(err);
            // if normalizing the page fails it means it isn't valid
            // so it doesn't exist so don't throw and return false
            // to ensure we return 404 instead of 500
            return false;
        }
        if ((0, _utils2.isMiddlewareFile)(normalizedPath)) {
            return (0, _findpagefile.findPageFile)(this.dir, normalizedPath, this.nextConfig.pageExtensions, false).then(Boolean);
        }
        let appFile = null;
        let pagesFile = null;
        if (this.appDir) {
            appFile = await (0, _findpagefile.findPageFile)(this.appDir, normalizedPath + '/page', this.nextConfig.pageExtensions, true);
        }
        if (this.pagesDir) {
            pagesFile = await (0, _findpagefile.findPageFile)(this.pagesDir, normalizedPath, this.nextConfig.pageExtensions, false);
        }
        if (appFile && pagesFile) {
            return false;
        }
        return Boolean(appFile || pagesFile);
    }
    async runMiddleware(params) {
        try {
            const result = await super.runMiddleware({
                ...params,
                onWarning: (warn)=>{
                    this.logErrorWithOriginalStack(warn, 'warning');
                }
            });
            if ('finished' in result) {
                return result;
            }
            result.waitUntil.catch((error)=>{
                this.logErrorWithOriginalStack(error, 'unhandledRejection');
            });
            return result;
        } catch (error) {
            if (error instanceof _utils1.DecodeError) {
                throw error;
            }
            /**
       * We only log the error when it is not a MiddlewareNotFound error as
       * in that case we should be already displaying a compilation error
       * which is what makes the module not found.
       */ if (!(error instanceof _utils1.MiddlewareNotFoundError)) {
                this.logErrorWithOriginalStack(error);
            }
            const err = (0, _iserror.getProperError)(error);
            (0, _errorsource.decorateServerError)(err, _constants1.COMPILER_NAMES.edgeServer);
            const { request, response, parsedUrl } = params;
            /**
       * When there is a failure for an internal Next.js request from
       * middleware we bypass the error without finishing the request
       * so we can serve the required chunks to render the error.
       */ if (request.url.includes('/_next/static') || request.url.includes('/__nextjs_original-stack-frame') || request.url.includes('/__nextjs_source-map') || request.url.includes('/__nextjs_error_feedback')) {
                return {
                    finished: false
                };
            }
            response.statusCode = 500;
            await this.renderError(err, request, response, parsedUrl.pathname);
            return {
                finished: true
            };
        }
    }
    async runEdgeFunction(params) {
        try {
            return super.runEdgeFunction({
                ...params,
                onError: (err)=>this.logErrorWithOriginalStack(err, 'app-dir'),
                onWarning: (warn)=>{
                    this.logErrorWithOriginalStack(warn, 'warning');
                }
            });
        } catch (error) {
            if (error instanceof _utils1.DecodeError) {
                throw error;
            }
            this.logErrorWithOriginalStack(error, 'warning');
            const err = (0, _iserror.getProperError)(error);
            const { req, res, page } = params;
            res.statusCode = 500;
            await this.renderError(err, req, res, page);
            return null;
        }
    }
    getRequestHandler() {
        const handler = super.getRequestHandler();
        return (req, res, parsedUrl)=>{
            const request = this.normalizeReq(req);
            const response = this.normalizeRes(res);
            const loggingConfig = this.nextConfig.logging;
            if (loggingConfig !== false) {
                // The closure variable is not used here because the request handler may be invoked twice for one request when middleware is added in the application.
                // By setting the start time we can ensure that the middleware timing is correctly included.
                if (!(0, _requestmeta.getRequestMeta)(req, 'devRequestTimingStart')) {
                    const requestStart = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hrtime.bigint();
                    (0, _requestmeta.addRequestMeta)(req, 'devRequestTimingStart', requestStart);
                }
                const isMiddlewareRequest = (0, _requestmeta.getRequestMeta)(req, 'middlewareInvoke') ?? false;
                if (!isMiddlewareRequest) {
                    response.originalResponse.once('close', ()=>{
                        // NOTE: The route match is only attached to the request's meta data
                        // after the request handler is created, so we need to check it in the
                        // close handler and not before.
                        const routeMatch = (0, _requestmeta.getRequestMeta)(req).match;
                        if (!routeMatch) {
                            return;
                        }
                        // The closure variable is not used here because the request handler may be invoked twice for one request when middleware is added in the application.
                        // By setting the start time we can ensure that the middleware timing is correctly included.
                        const requestStart = (0, _requestmeta.getRequestMeta)(req, 'devRequestTimingStart');
                        if (!requestStart) {
                            return;
                        }
                        const requestEnd = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hrtime.bigint();
                        (0, _logrequests.logRequests)(request, response, loggingConfig, requestStart, requestEnd, (0, _requestmeta.getRequestMeta)(req, 'devRequestTimingMiddlewareStart'), (0, _requestmeta.getRequestMeta)(req, 'devRequestTimingMiddlewareEnd'), (0, _requestmeta.getRequestMeta)(req, 'devRequestTimingInternalsEnd'));
                    });
                }
            }
            return handler(request, response, parsedUrl);
        };
    }
    async handleRequest(req, res, parsedUrl) {
        const span = (0, _trace.trace)('handle-request', undefined, {
            url: req.url
        });
        const result = await span.traceAsyncFn(async ()=>{
            var _this_ready;
            await ((_this_ready = this.ready) == null ? void 0 : _this_ready.promise);
            (0, _requestmeta.addRequestMeta)(req, 'PagesErrorDebug', this.renderOpts.ErrorDebug);
            return await super.handleRequest(req, res, parsedUrl);
        });
        const memoryUsage = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memoryUsage();
        span.traceChild('memory-usage', {
            url: req.url,
            'memory.rss': String(memoryUsage.rss),
            'memory.heapUsed': String(memoryUsage.heapUsed),
            'memory.heapTotal': String(memoryUsage.heapTotal)
        }).stop();
        return result;
    }
    async run(req, res, parsedUrl) {
        var _this_ready;
        await ((_this_ready = this.ready) == null ? void 0 : _this_ready.promise);
        const { basePath } = this.nextConfig;
        let originalPathname = null;
        // TODO: see if we can remove this in the future
        if (basePath && (0, _pathhasprefix.pathHasPrefix)(parsedUrl.pathname || '/', basePath)) {
            // strip basePath before handling dev bundles
            // If replace ends up replacing the full url it'll be `undefined`, meaning we have to default it to `/`
            originalPathname = parsedUrl.pathname;
            parsedUrl.pathname = (0, _removepathprefix.removePathPrefix)(parsedUrl.pathname || '/', basePath);
        }
        const { pathname } = parsedUrl;
        if (pathname.startsWith('/_next')) {
            if (_fs.default.existsSync((0, _path.join)(this.publicDir, '_next'))) {
                throw Object.defineProperty(new Error(_constants.PUBLIC_DIR_MIDDLEWARE_CONFLICT), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
        }
        if (originalPathname) {
            // restore the path before continuing so that custom-routes can accurately determine
            // if they should match against the basePath or not
            parsedUrl.pathname = originalPathname;
        }
        try {
            return await super.run(req, res, parsedUrl);
        } catch (error) {
            const err = (0, _iserror.getProperError)(error);
            (0, _formatservererror.formatServerError)(err);
            this.logErrorWithOriginalStack(err);
            if (!res.sent) {
                res.statusCode = 500;
                try {
                    return await this.renderError(err, req, res, pathname, {
                        __NEXT_PAGE: (0, _iserror.default)(err) && err.page || pathname || ''
                    });
                } catch (internalErr) {
                    console.error(internalErr);
                    res.body('Internal Server Error').send();
                }
            }
        }
    }
    logErrorWithOriginalStack(err, type) {
        this.bundlerService.logErrorWithOriginalStack(err, type);
    }
    getPagesManifest() {
        return _nodemanifestloader.NodeManifestLoader.require((0, _path.join)(this.serverDistDir, _constants1.PAGES_MANIFEST)) ?? undefined;
    }
    getAppPathsManifest() {
        if (!this.enabledDirectories.app) return undefined;
        return _nodemanifestloader.NodeManifestLoader.require((0, _path.join)(this.serverDistDir, _constants1.APP_PATHS_MANIFEST)) ?? undefined;
    }
    getinterceptionRoutePatterns() {
        const rewrites = (0, _generateinterceptionroutesrewrites.generateInterceptionRoutesRewrites)(Object.keys(this.appPathRoutes ?? {}), this.nextConfig.basePath).map((route)=>new RegExp((0, _buildcustomroute.buildCustomRoute)('rewrite', route).regex));
        if (this.nextConfig.output === 'export' && rewrites.length > 0) {
            _log.error('Intercepting routes are not supported with static export.\nRead more: https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features');
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(1);
        }
        return rewrites ?? [];
    }
    async getMiddleware() {
        var _this_middleware;
        // We need to populate the match
        // field as it isn't serializable
        if (((_this_middleware = this.middleware) == null ? void 0 : _this_middleware.match) === null) {
            this.middleware.match = (0, _middlewareroutematcher.getMiddlewareRouteMatcher)(this.middleware.matchers || []);
        }
        return this.middleware;
    }
    getNextFontManifest() {
        return undefined;
    }
    async hasMiddleware() {
        return this.hasPage(this.actualMiddlewareFile);
    }
    async ensureMiddleware(url) {
        return this.ensurePage({
            page: this.actualMiddlewareFile,
            clientOnly: false,
            definition: undefined,
            url
        });
    }
    async loadInstrumentationModule() {
        let instrumentationModule;
        if (this.actualInstrumentationHookFile && await this.ensurePage({
            page: this.actualInstrumentationHookFile,
            clientOnly: false,
            definition: undefined
        }).then(()=>true).catch(()=>false)) {
            try {
                instrumentationModule = await (0, _instrumentationglobalsexternal.getInstrumentationModule)(this.dir, this.nextConfig.distDir);
            } catch (err) {
                err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
                throw err;
            }
        }
        return instrumentationModule;
    }
    async runInstrumentationHookIfAvailable() {
        await (0, _instrumentationglobalsexternal.ensureInstrumentationRegistered)(this.dir, this.nextConfig.distDir);
    }
    async ensureEdgeFunction({ page, appPaths, url }) {
        return this.ensurePage({
            page,
            appPaths,
            clientOnly: false,
            definition: undefined,
            url
        });
    }
    generateRoutes(_dev) {
    // In development we expose all compiled files for react-error-overlay's line show feature
    // We use unshift so that we're sure the routes is defined before Next's default routes
    // routes.unshift({
    //   match: getPathMatch('/_next/development/:path*'),
    //   type: 'route',
    //   name: '_next/development catchall',
    //   fn: async (req, res, params) => {
    //     const p = pathJoin(this.distDir, ...(params.path || []))
    //     await this.serveStatic(req, res, p)
    //     return {
    //       finished: true,
    //     }
    //   },
    // })
    }
    async getStaticPaths({ pathname, urlPathname, requestHeaders, page, isAppPath }) {
        // we lazy load the staticPaths to prevent the user
        // from waiting on them for the page to load in dev mode
        const __getStaticPaths = async ()=>{
            const { configFileName, httpAgentOptions } = this.nextConfig;
            const { locales, defaultLocale } = this.nextConfig.i18n || {};
            const staticPathsWorker = this.getStaticPathsWorker();
            try {
                var _this_nextConfig_experimental_sri;
                const pathsResult = await staticPathsWorker.loadStaticPaths({
                    dir: this.dir,
                    distDir: this.distDir,
                    pathname,
                    config: {
                        pprConfig: this.nextConfig.experimental.ppr,
                        configFileName,
                        cacheComponents: Boolean(this.nextConfig.cacheComponents)
                    },
                    httpAgentOptions,
                    locales,
                    defaultLocale,
                    page,
                    isAppPath,
                    requestHeaders,
                    cacheHandler: this.nextConfig.cacheHandler,
                    cacheHandlers: this.nextConfig.cacheHandlers,
                    cacheLifeProfiles: this.nextConfig.cacheLife,
                    fetchCacheKeyPrefix: this.nextConfig.experimental.fetchCacheKeyPrefix,
                    isrFlushToDisk: this.nextConfig.experimental.isrFlushToDisk,
                    cacheMaxMemorySize: this.nextConfig.cacheMaxMemorySize,
                    nextConfigOutput: this.nextConfig.output,
                    buildId: this.buildId,
                    authInterrupts: Boolean(this.nextConfig.experimental.authInterrupts),
                    sriEnabled: Boolean((_this_nextConfig_experimental_sri = this.nextConfig.experimental.sri) == null ? void 0 : _this_nextConfig_experimental_sri.algorithm)
                });
                return pathsResult;
            } finally{
                // we don't re-use workers so destroy the used one
                staticPathsWorker.end();
            }
        };
        const result = this.staticPathsCache.get(pathname);
        const nextInvoke = (0, _coalescedfunction.withCoalescedInvoke)(__getStaticPaths)(`staticPaths-${pathname}`, []).then(async (res)=>{
            var _res_value;
            const { prerenderedRoutes, fallbackMode: fallback } = res.value;
            if (isAppPath) {
                var _result_prerenderedRoutes;
                if (this.nextConfig.output === 'export') {
                    if (!prerenderedRoutes) {
                        throw Object.defineProperty(new Error(`Page "${page}" is missing exported function "generateStaticParams()", which is required with "output: export" config.`), "__NEXT_ERROR_CODE", {
                            value: "E353",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    if (!prerenderedRoutes.some((item)=>item.pathname === urlPathname)) {
                        throw Object.defineProperty(new Error(`Page "${page}" is missing param "${pathname}" in "generateStaticParams()", which is required with "output: export" config.`), "__NEXT_ERROR_CODE", {
                            value: "E443",
                            enumerable: false,
                            configurable: true
                        });
                    }
                }
                // Since generateStaticParams run on the background, when accessing the
                // devFallbackParams during the render, it is still set to the previous
                // result from the cache. Therefore when the result has changed, re-render
                // the Server Component to sync the devFallbackParams with the new result.
                if (isAppPath && this.nextConfig.cacheComponents && // Ensure this is not the first invocation.
                result && ((_result_prerenderedRoutes = result.prerenderedRoutes) == null ? void 0 : _result_prerenderedRoutes.length) !== (prerenderedRoutes == null ? void 0 : prerenderedRoutes.length)) {
                    this.bundlerService.triggerHMR({
                        type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_COMPONENT_CHANGES,
                        hash: `generateStaticParams-${Date.now()}`
                    });
                }
            }
            if (!isAppPath && this.nextConfig.output === 'export') {
                if (fallback === _fallback.FallbackMode.BLOCKING_STATIC_RENDER) {
                    throw Object.defineProperty(new Error('getStaticPaths with "fallback: blocking" cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export'), "__NEXT_ERROR_CODE", {
                        value: "E11",
                        enumerable: false,
                        configurable: true
                    });
                } else if (fallback === _fallback.FallbackMode.PRERENDER) {
                    throw Object.defineProperty(new Error('getStaticPaths with "fallback: true" cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export'), "__NEXT_ERROR_CODE", {
                        value: "E210",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            const value = {
                staticPaths: prerenderedRoutes == null ? void 0 : prerenderedRoutes.map((route)=>route.pathname),
                prerenderedRoutes,
                fallbackMode: fallback
            };
            if (((_res_value = res.value) == null ? void 0 : _res_value.fallbackMode) !== undefined && // This matches the hasGenerateStaticParams logic we do during build.
            (!isAppPath || prerenderedRoutes && prerenderedRoutes.length > 0)) {
                // we write the static paths to partial manifest for
                // fallback handling inside of entry handler's
                const rawExistingManifest = await _fs.default.promises.readFile((0, _path.join)(this.distDir, _constants1.PRERENDER_MANIFEST), 'utf8');
                const existingManifest = JSON.parse(rawExistingManifest);
                for (const staticPath of value.staticPaths || []){
                    existingManifest.routes[staticPath] = {};
                }
                existingManifest.dynamicRoutes[pathname] = {
                    dataRoute: null,
                    dataRouteRegex: null,
                    fallback: (0, _fallback.fallbackModeToFallbackField)(res.value.fallbackMode, page),
                    fallbackRevalidate: false,
                    fallbackExpire: undefined,
                    fallbackHeaders: undefined,
                    fallbackStatus: undefined,
                    fallbackRootParams: undefined,
                    fallbackRouteParams: undefined,
                    fallbackSourceRoute: pathname,
                    prefetchDataRoute: undefined,
                    prefetchDataRouteRegex: undefined,
                    routeRegex: (0, _routeregex.getRouteRegex)(pathname).re.source,
                    experimentalPPR: undefined,
                    renderingMode: undefined,
                    allowHeader: []
                };
                const updatedManifest = JSON.stringify(existingManifest);
                if (updatedManifest !== rawExistingManifest) {
                    await _fs.default.promises.writeFile((0, _path.join)(this.distDir, _constants1.PRERENDER_MANIFEST), updatedManifest);
                }
            }
            this.staticPathsCache.set(pathname, value);
            return value;
        }).catch((err)=>{
            this.staticPathsCache.remove(pathname);
            if (!result) throw err;
            _log.error(`Failed to generate static paths for ${pathname}:`);
            console.error(err);
        });
        if (result) {
            return result;
        }
        return nextInvoke;
    }
    async ensurePage(opts) {
        await this.bundlerService.ensurePage(opts);
    }
    async findPageComponents({ locale, page, query, params, isAppPath, appPaths = null, shouldEnsure, url }) {
        var _this_ready;
        await ((_this_ready = this.ready) == null ? void 0 : _this_ready.promise);
        const compilationErr = await this.getCompilationError(page);
        if (compilationErr) {
            // Wrap build errors so that they don't get logged again
            throw new _nextserver.WrappedBuildError(compilationErr);
        }
        if (shouldEnsure || this.serverOptions.customServer) {
            await this.ensurePage({
                page,
                appPaths,
                clientOnly: false,
                definition: undefined,
                url
            });
        }
        this.nextFontManifest = super.getNextFontManifest();
        return await super.findPageComponents({
            page,
            query,
            params,
            locale,
            isAppPath,
            shouldEnsure,
            url
        });
    }
    async getFallbackErrorComponents(url) {
        await this.bundlerService.getFallbackErrorComponents(url);
        return await (0, _loaddefaulterrorcomponents.loadDefaultErrorComponents)(this.distDir);
    }
    async getCompilationError(page) {
        return await this.bundlerService.getCompilationError(page);
    }
    async instrumentationOnRequestError(...args) {
        await super.instrumentationOnRequestError(...args);
        const err = args[0];
        this.logErrorWithOriginalStack(err, 'app-dir');
    }
} //# sourceMappingURL=next-dev-server.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/get-source-map-from-file.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSourceMapFromFile", {
    enumerable: true,
    get: function() {
        return getSourceMapFromFile;
    }
});
const _promises = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs/promises'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _url = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/native-url/index.js [app-client] (ecmascript)"));
const _datauritobuffer = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/data-uri-to-buffer/index.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getSourceMapUrl(fileContents) {
    const regex = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;
    let match = null;
    for(;;){
        let next = regex.exec(fileContents);
        if (next == null) {
            break;
        }
        match = next;
    }
    if (!(match && match[1])) {
        return null;
    }
    return match[1].toString();
}
async function getSourceMapFromFile(filename) {
    filename = filename.startsWith('file://') ? _url.default.fileURLToPath(filename) : filename;
    let fileContents;
    try {
        fileContents = await _promises.default.readFile(filename, 'utf-8');
    } catch (error) {
        throw Object.defineProperty(new Error(`Failed to read file contents of ${filename}.`, {
            cause: error
        }), "__NEXT_ERROR_CODE", {
            value: "E466",
            enumerable: false,
            configurable: true
        });
    }
    const sourceUrl = getSourceMapUrl(fileContents);
    if (!sourceUrl) {
        return undefined;
    }
    if (sourceUrl.startsWith('data:')) {
        let buffer;
        try {
            buffer = (0, _datauritobuffer.default)(sourceUrl);
        } catch (error) {
            throw Object.defineProperty(new Error(`Failed to parse source map URL for ${filename}.`, {
                cause: error
            }), "__NEXT_ERROR_CODE", {
                value: "E199",
                enumerable: false,
                configurable: true
            });
        }
        if (buffer.type !== 'application/json') {
            throw Object.defineProperty(new Error(`Unknown source map type for ${filename}: ${buffer.typeFull}.`), "__NEXT_ERROR_CODE", {
                value: "E113",
                enumerable: false,
                configurable: true
            });
        }
        try {
            return JSON.parse(buffer.toString());
        } catch (error) {
            throw Object.defineProperty(new Error(`Failed to parse source map for ${filename}.`, {
                cause: error
            }), "__NEXT_ERROR_CODE", {
                value: "E318",
                enumerable: false,
                configurable: true
            });
        }
    }
    const sourceMapFilename = _path.default.resolve(_path.default.dirname(filename), decodeURIComponent(sourceUrl));
    try {
        const sourceMapContents = await _promises.default.readFile(sourceMapFilename, 'utf-8');
        return JSON.parse(sourceMapContents.toString());
    } catch (error) {
        throw Object.defineProperty(new Error(`Failed to parse source map ${sourceMapFilename}.`, {
            cause: error
        }), "__NEXT_ERROR_CODE", {
            value: "E220",
            enumerable: false,
            configurable: true
        });
    }
} //# sourceMappingURL=get-source-map-from-file.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/middleware-webpack.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createOriginalStackFrame: null,
    getIgnoredSources: null,
    getOriginalStackFrames: null,
    getOverlayMiddleware: null,
    getSourceMapMiddleware: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createOriginalStackFrame: function() {
        return createOriginalStackFrame;
    },
    getIgnoredSources: function() {
        return getIgnoredSources;
    },
    getOriginalStackFrames: function() {
        return getOriginalStackFrames;
    },
    getOverlayMiddleware: function() {
        return getOverlayMiddleware;
    },
    getSourceMapMiddleware: function() {
        return getSourceMapMiddleware;
    }
});
const _module = (()=>{
    const e = new Error("Cannot find module 'module'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _url = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/native-url/index.js [app-client] (ecmascript)");
const _sourcemap08 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/source-map08/source-map.js [app-client] (ecmascript)");
const _getsourcemapfromfile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/get-source-map-from-file.js [app-client] (ecmascript)");
const _sourcemaps = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/source-maps.js [app-client] (ecmascript)");
const _launcheditor = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/launch-editor.js [app-client] (ecmascript)");
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/shared.js [app-client] (ecmascript)");
const _middlewareresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/middleware-response.js [app-client] (ecmascript)");
const _webpackmodulepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/webpack-module-path.js [app-client] (ecmascript)");
const _util = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/util/util.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function shouldIgnoreSource(sourceURL) {
    return sourceURL.includes('node_modules') || // Only relevant for when Next.js is symlinked e.g. in the Next.js monorepo
    sourceURL.includes('next/dist') || sourceURL.startsWith('node:');
}
function getModuleById(id, compilation) {
    const { chunkGraph, modules } = compilation;
    return [
        ...modules
    ].find((module1)=>chunkGraph.getModuleId(module1) === id);
}
function findModuleNotFoundFromError(errorMessage) {
    var _errorMessage_match;
    return errorMessage == null ? void 0 : (_errorMessage_match = errorMessage.match(/'([^']+)' module/)) == null ? void 0 : _errorMessage_match[1];
}
function getSourcePath(source) {
    if (source.startsWith('file://')) {
        return (0, _url.fileURLToPath)(source);
    }
    return source.replace(/^(webpack:\/\/\/|webpack:\/\/|webpack:\/\/_N_E\/)/, '');
}
/**
 * @returns 1-based lines and 0-based columns
 */ async function findOriginalSourcePositionAndContent(sourceMap, position) {
    let consumer;
    try {
        consumer = await new _sourcemap08.SourceMapConsumer(sourceMap);
    } catch (cause) {
        console.error(Object.defineProperty(new Error(`${sourceMap.file}: Invalid source map. Only conformant source maps can be used to find the original code.`, {
            cause
        }), "__NEXT_ERROR_CODE", {
            value: "E635",
            enumerable: false,
            configurable: true
        }));
        return null;
    }
    try {
        const sourcePosition = consumer.originalPositionFor({
            line: position.line1 ?? 1,
            // 0-based columns out requires 0-based columns in.
            column: (position.column1 ?? 1) - 1
        });
        if (!sourcePosition.source) {
            return null;
        }
        const sourceContent = consumer.sourceContentFor(sourcePosition.source, /* returnNullOnMissing */ true) ?? null;
        return {
            sourcePosition,
            sourceContent
        };
    } finally{
        consumer.destroy();
    }
}
function getIgnoredSources(sourceMap) {
    const ignoreList = new Set(sourceMap.ignoreList ?? []);
    const moduleFilenames = (sourceMap == null ? void 0 : sourceMap.sources) ?? [];
    for(let index = 0; index < moduleFilenames.length; index++){
        // bundlerFilePath case: webpack://./app/page.tsx
        const webpackSourceURL = moduleFilenames[index];
        // Format the path to the normal file path
        const formattedFilePath = (0, _webpackmodulepath.formatFrameSourceFile)(webpackSourceURL);
        if (shouldIgnoreSource(formattedFilePath)) {
            ignoreList.add(index);
        }
    }
    const ignoredSources = sourceMap.sources.map((source, index)=>{
        var _sourceMap_sourcesContent;
        return {
            url: source,
            ignored: ignoreList.has(sourceMap.sources.indexOf(source)),
            content: ((_sourceMap_sourcesContent = sourceMap.sourcesContent) == null ? void 0 : _sourceMap_sourcesContent[index]) ?? null
        };
    });
    return ignoredSources;
}
function isIgnoredSource(source, sourcePosition) {
    if (sourcePosition.source == null) {
        return true;
    }
    for (const ignoredSource of source.ignoredSources){
        if (ignoredSource.ignored && ignoredSource.url === sourcePosition.source) {
            return true;
        }
    }
    return false;
}
function findOriginalSourcePositionAndContentFromCompilation(moduleId, importedModule, compilation) {
    var _module_buildInfo_importLocByPath, _module_buildInfo;
    const module1 = getModuleById(moduleId, compilation);
    return (module1 == null ? void 0 : (_module_buildInfo = module1.buildInfo) == null ? void 0 : (_module_buildInfo_importLocByPath = _module_buildInfo.importLocByPath) == null ? void 0 : _module_buildInfo_importLocByPath.get(importedModule)) ?? null;
}
async function createOriginalStackFrame({ ignoredByDefault, source, rootDirectory, frame, errorMessage }) {
    var // The callsite will point to the column of the variable name instead of the
    // name of the enclosing function.
    // TODO(NDX-531): Spy on prepareStackTrace to get the enclosing line number for method name mapping.
    // default is not a valid identifier in JS so webpack uses a custom variable when it's an unnamed default export
    // Resolve it back to `default` for the method name if the source position didn't have the method.
    _frame_methodName_replace, _frame_methodName;
    const moduleNotFound = findModuleNotFoundFromError(errorMessage);
    const result = await (()=>{
        if (moduleNotFound) {
            if (source.type === 'file') {
                return undefined;
            }
            return findOriginalSourcePositionAndContentFromCompilation(source.moduleId, moduleNotFound, source.compilation);
        }
        return findOriginalSourcePositionAndContent(source.sourceMap, frame);
    })();
    if (!result) {
        return null;
    }
    const { sourcePosition, sourceContent } = result;
    if (!sourcePosition.source) {
        return null;
    }
    const ignored = ignoredByDefault || isIgnoredSource(source, sourcePosition) || // If the source file is externals, should be excluded even it's not ignored source.
    // e.g. webpack://next/dist/.. needs to be ignored
    shouldIgnoreSource(source.moduleURL);
    const sourcePath = getSourcePath((sourcePosition.source.includes('|') ? source.moduleURL : sourcePosition.source) || source.moduleURL);
    const filePath = _path.default.resolve(rootDirectory, sourcePath);
    const resolvedFilePath = _path.default.relative(rootDirectory, filePath);
    const traced = {
        file: resolvedFilePath,
        line1: sourcePosition.line,
        column1: sourcePosition.column === null ? null : sourcePosition.column + 1,
        methodName: (_frame_methodName = frame.methodName) == null ? void 0 : (_frame_methodName_replace = _frame_methodName.replace('__WEBPACK_DEFAULT_EXPORT__', 'default')) == null ? void 0 : _frame_methodName_replace.replace('__webpack_exports__.', ''),
        arguments: [],
        ignored
    };
    return {
        originalStackFrame: traced,
        originalCodeFrame: (0, _shared.getOriginalCodeFrame)(traced, sourceContent)
    };
}
async function getSourceMapFromCompilation(id, compilation) {
    try {
        const module1 = getModuleById(id, compilation);
        if (!module1) {
            return undefined;
        }
        // @ts-expect-error The types for `CodeGenerationResults.get` require a
        // runtime to be passed as second argument, but apparently it also works
        // without it.
        const codeGenerationResult = compilation.codeGenerationResults.get(module1);
        const source = codeGenerationResult == null ? void 0 : codeGenerationResult.sources.get('javascript');
        return (source == null ? void 0 : source.map()) ?? undefined;
    } catch (err) {
        console.error(`Failed to lookup module by ID ("${id}"):`, err);
        return undefined;
    }
}
async function getSource(frame, options) {
    let sourceURL = frame.file ?? '';
    const { getCompilations } = options;
    sourceURL = (0, _sourcemaps.devirtualizeReactServerURL)(sourceURL);
    let nativeSourceMap;
    try {
        nativeSourceMap = (0, _module.findSourceMap)(sourceURL);
    } catch (cause) {
        throw Object.defineProperty(new Error(`${sourceURL}: Invalid source map. Only conformant source maps can be used to find the original code.`, {
            cause
        }), "__NEXT_ERROR_CODE", {
            value: "E635",
            enumerable: false,
            configurable: true
        });
    }
    if (nativeSourceMap !== undefined) {
        const sourceMapPayload = nativeSourceMap.payload;
        return {
            type: 'file',
            sourceMap: (0, _sourcemaps.findApplicableSourceMapPayload)((frame.line1 ?? 1) - 1, (frame.column1 ?? 1) - 1, sourceMapPayload),
            ignoredSources: getIgnoredSources(sourceMapPayload),
            moduleURL: sourceURL
        };
    }
    if (_path.default.isAbsolute(sourceURL)) {
        sourceURL = (0, _url.pathToFileURL)(sourceURL).href;
    }
    if (sourceURL.startsWith('file:')) {
        const sourceMap = await (0, _getsourcemapfromfile.getSourceMapFromFile)(sourceURL);
        return sourceMap ? {
            type: 'file',
            sourceMap,
            ignoredSources: getIgnoredSources(sourceMap),
            moduleURL: sourceURL
        } : undefined;
    }
    // webpack-internal:///./src/hello.tsx => ./src/hello.tsx
    // webpack://_N_E/./src/hello.tsx => ./src/hello.tsx
    const moduleId = sourceURL.replace(/^(webpack-internal:\/\/\/|webpack:\/\/(_N_E\/)?)/, '').replace(/\?\d+$/, '');
    // (rsc)/./src/hello.tsx => ./src/hello.tsx
    const moduleURL = moduleId.replace(/^(\(.*\)\/?)/, '');
    for (const compilation of getCompilations()){
        const sourceMap = await getSourceMapFromCompilation(moduleId, compilation);
        if (sourceMap) {
            const ignoredSources = getIgnoredSources(sourceMap);
            return {
                type: 'bundle',
                sourceMap,
                compilation,
                moduleId,
                moduleURL,
                ignoredSources
            };
        }
    }
    return undefined;
}
async function getOriginalStackFrames({ isServer, isEdgeServer, isAppDirectory, frames, clientStats, serverStats, edgeServerStats, rootDirectory }) {
    const frameResponses = await Promise.all(frames.map((frame)=>getOriginalStackFrame({
            isServer,
            isEdgeServer,
            isAppDirectory,
            frame,
            clientStats,
            serverStats,
            edgeServerStats,
            rootDirectory
        }).then((value)=>{
            return {
                status: 'fulfilled',
                value
            };
        }, (reason)=>{
            return {
                status: 'rejected',
                reason: (0, _util.inspect)(reason, {
                    colors: false
                })
            };
        })));
    (0, _shared.ignoreListAnonymousStackFramesIfSandwiched)(frameResponses);
    return frameResponses;
}
async function getOriginalStackFrame({ isServer, isEdgeServer, isAppDirectory, frame, clientStats, serverStats, edgeServerStats, rootDirectory }) {
    const filename = frame.file ?? '';
    const source = await getSource(frame, {
        getCompilations: ()=>{
            const compilations = [];
            // Try Client Compilation first. In `pages` we leverage
            // `isClientError` to check. In `app` it depends on if it's a server
            // / client component and when the code throws. E.g. during HTML
            // rendering it's the server/edge compilation.
            if (!isEdgeServer && !isServer || isAppDirectory) {
                var _clientStats;
                const compilation = (_clientStats = clientStats()) == null ? void 0 : _clientStats.compilation;
                if (compilation) {
                    compilations.push(compilation);
                }
            }
            // Try Server Compilation. In `pages` this could be something
            // imported in getServerSideProps/getStaticProps as the code for
            // those is tree-shaken. In `app` this finds server components and
            // code that was imported from a server component. It also covers
            // when client component code throws during HTML rendering.
            if (isServer || isAppDirectory) {
                var _serverStats;
                const compilation = (_serverStats = serverStats()) == null ? void 0 : _serverStats.compilation;
                if (compilation) {
                    compilations.push(compilation);
                }
            }
            // Try Edge Server Compilation. Both cases are the same as Server
            // Compilation, main difference is that it covers `runtime: 'edge'`
            // pages/app routes.
            if (isEdgeServer || isAppDirectory) {
                var _edgeServerStats;
                const compilation = (_edgeServerStats = edgeServerStats()) == null ? void 0 : _edgeServerStats.compilation;
                if (compilation) {
                    compilations.push(compilation);
                }
            }
            return compilations;
        }
    });
    let defaultNormalizedStackFrameLocation = frame.file;
    if (defaultNormalizedStackFrameLocation !== null && defaultNormalizedStackFrameLocation.startsWith('file://')) {
        defaultNormalizedStackFrameLocation = _path.default.relative(rootDirectory, (0, _url.fileURLToPath)(defaultNormalizedStackFrameLocation));
    }
    // This stack frame is used for the one that couldn't locate the source or source mapped frame
    const defaultStackFrame = {
        file: defaultNormalizedStackFrameLocation,
        line1: frame.line1,
        column1: frame.column1,
        methodName: frame.methodName,
        ignored: shouldIgnoreSource(filename),
        arguments: []
    };
    if (!source) {
        // return original stack frame with no source map
        return {
            originalStackFrame: defaultStackFrame,
            originalCodeFrame: null
        };
    }
    defaultStackFrame.ignored ||= (0, _sourcemaps.sourceMapIgnoreListsEverything)(source.sourceMap);
    const originalStackFrameResponse = await createOriginalStackFrame({
        ignoredByDefault: defaultStackFrame.ignored,
        frame,
        source,
        rootDirectory
    });
    if (!originalStackFrameResponse) {
        return {
            originalStackFrame: defaultStackFrame,
            originalCodeFrame: null
        };
    }
    return originalStackFrameResponse;
}
function getOverlayMiddleware(options) {
    const { rootDirectory, isSrcDir, clientStats, serverStats, edgeServerStats } = options;
    return async function(req, res, next) {
        const { pathname, searchParams } = new URL(`http://n${req.url}`);
        if (pathname === '/__nextjs_original-stack-frames') {
            if (req.method !== 'POST') {
                return _middlewareresponse.middlewareResponse.badRequest(res);
            }
            const body = await new Promise((resolve, reject)=>{
                let data = '';
                req.on('data', (chunk)=>{
                    data += chunk;
                });
                req.on('end', ()=>resolve(data));
                req.on('error', reject);
            });
            try {
                const { frames, isServer, isEdgeServer, isAppDirectory } = JSON.parse(body);
                return _middlewareresponse.middlewareResponse.json(res, await getOriginalStackFrames({
                    isServer,
                    isEdgeServer,
                    isAppDirectory,
                    frames,
                    clientStats,
                    serverStats,
                    edgeServerStats,
                    rootDirectory
                }));
            } catch (err) {
                return _middlewareresponse.middlewareResponse.badRequest(res);
            }
        } else if (pathname === '/__nextjs_launch-editor') {
            const frame = {
                file: searchParams.get('file'),
                methodName: searchParams.get('methodName'),
                line1: parseInt(searchParams.get('line1') ?? '1', 10) || 1,
                column1: parseInt(searchParams.get('column1') ?? '1', 10) || 1,
                arguments: searchParams.getAll('arguments').filter(Boolean)
            };
            if (!frame.file) return _middlewareresponse.middlewareResponse.badRequest(res);
            let openEditorResult;
            const isAppRelativePath = searchParams.get('isAppRelativePath') === '1';
            if (isAppRelativePath) {
                const relativeFilePath = searchParams.get('file') || '';
                const appPath = _path.default.join('app', isSrcDir ? 'src' : '', relativeFilePath);
                openEditorResult = await (0, _launcheditor.openFileInEditor)(appPath, 1, 1, rootDirectory);
            } else {
                // TODO: How do we differentiate layers and actual file paths with round brackets?
                // frame files may start with their webpack layer, like (middleware)/middleware.js
                const filePath = frame.file.replace(/^\([^)]+\)\//, '');
                openEditorResult = await (0, _launcheditor.openFileInEditor)(filePath, frame.line1, frame.column1 ?? 1, rootDirectory);
            }
            if (openEditorResult.error) {
                console.error('Failed to launch editor:', openEditorResult.error);
                return _middlewareresponse.middlewareResponse.internalServerError(res, openEditorResult.error);
            }
            if (!openEditorResult.found) {
                return _middlewareresponse.middlewareResponse.notFound(res);
            }
            return _middlewareresponse.middlewareResponse.noContent(res);
        }
        return next();
    };
}
function getSourceMapMiddleware(options) {
    const { clientStats, serverStats, edgeServerStats } = options;
    return async function(req, res, next) {
        const { pathname, searchParams } = new URL(`http://n${req.url}`);
        if (pathname !== '/__nextjs_source-map') {
            return next();
        }
        const filename = searchParams.get('filename');
        if (!filename) {
            return _middlewareresponse.middlewareResponse.badRequest(res);
        }
        let source;
        try {
            source = await getSource({
                file: filename,
                // Webpack doesn't use Index Source Maps
                line1: null,
                column1: null
            }, {
                getCompilations: ()=>{
                    const compilations = [];
                    for (const stats of [
                        clientStats(),
                        serverStats(),
                        edgeServerStats()
                    ]){
                        if (stats == null ? void 0 : stats.compilation) {
                            compilations.push(stats.compilation);
                        }
                    }
                    return compilations;
                }
            });
        } catch (error) {
            return _middlewareresponse.middlewareResponse.internalServerError(res, error);
        }
        if (!source) {
            return _middlewareresponse.middlewareResponse.noContent(res);
        }
        return _middlewareresponse.middlewareResponse.json(res, source.sourceMap);
    };
} //# sourceMappingURL=middleware-webpack.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/dev-indicator-server-state.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "devIndicatorServerState", {
    enumerable: true,
    get: function() {
        return devIndicatorServerState;
    }
});
const devIndicatorServerState = {
    disabledUntil: 0
}; //# sourceMappingURL=dev-indicator-server-state.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/messages.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    FAST_REFRESH_RUNTIME_RELOAD: null,
    createBinaryHmrMessageData: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    FAST_REFRESH_RUNTIME_RELOAD: function() {
        return FAST_REFRESH_RUNTIME_RELOAD;
    },
    createBinaryHmrMessageData: function() {
        return createBinaryHmrMessageData;
    }
});
const _invarianterror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const FAST_REFRESH_RUNTIME_RELOAD = 'Fast Refresh had to perform a full reload due to a runtime error.';
const textEncoder = new TextEncoder();
function createBinaryHmrMessageData(message) {
    switch(message.type){
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK:
            {
                const { requestId, chunk } = message;
                const requestIdBytes = textEncoder.encode(requestId);
                const requestIdLength = requestIdBytes.length;
                if (requestIdLength > 255) {
                    throw Object.defineProperty(new _invarianterror.InvariantError('Request ID is too long for the binary HMR message.'), "__NEXT_ERROR_CODE", {
                        value: "E805",
                        enumerable: false,
                        configurable: true
                    });
                }
                const chunkLength = chunk ? chunk.length : 0;
                const totalLength = 2 + requestIdLength + chunkLength;
                const data = new Uint8Array(totalLength);
                const view = new DataView(data.buffer);
                view.setUint8(0, _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK);
                view.setUint8(1, requestIdLength);
                textEncoder.encodeInto(requestId, data.subarray(2, 2 + requestIdLength));
                if (chunk) {
                    data.set(chunk, 2 + requestIdLength);
                }
                return data;
            }
        default:
            {
                throw Object.defineProperty(new _invarianterror.InvariantError(`Invalid binary HMR message of type ${message.type}`), "__NEXT_ERROR_CODE", {
                    value: "E809",
                    enumerable: false,
                    configurable: true
                });
            }
    }
} //# sourceMappingURL=messages.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-middleware.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Based on https://github.com/webpack-contrib/webpack-hot-middleware/blob/9708d781ae0e46179cf8ea1a94719de4679aaf53/middleware.js
// Included License below
// Copyright JS Foundation and other contributors
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// 'Software'), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WebpackHotMiddleware", {
    enumerable: true,
    get: function() {
        return WebpackHotMiddleware;
    }
});
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const _devindicatorserverstate = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/dev-indicator-server-state.js [app-client] (ecmascript)");
const _messages = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/messages.js [app-client] (ecmascript)");
function isMiddlewareStats(stats) {
    for (const key of stats.compilation.entrypoints.keys()){
        if ((0, _utils.isMiddlewareFilename)(key)) {
            return true;
        }
    }
    return false;
}
function statsToJson(stats) {
    if (!stats) return {};
    return stats.toJson({
        all: false,
        errors: true,
        hash: true,
        warnings: true
    });
}
function getStatsForSyncEvent(clientStats, serverStats) {
    if (!clientStats) return serverStats == null ? void 0 : serverStats.stats;
    if (!serverStats) return clientStats == null ? void 0 : clientStats.stats;
    // Prefer the server compiler stats if it has errors.
    // Otherwise we may end up in a state where the client compilation is the latest but without errors.
    // This causes the error overlay to not display the build error.
    if (serverStats.stats.hasErrors()) {
        return serverStats.stats;
    }
    // Return the latest stats
    return serverStats.ts > clientStats.ts ? serverStats.stats : clientStats.stats;
}
class WebpackHotMiddleware {
    constructor(compilers, versionInfo, devtoolsFrontendUrl, config, devToolsConfig){
        this.versionInfo = versionInfo;
        this.devtoolsFrontendUrl = devtoolsFrontendUrl;
        this.config = config;
        this.devToolsConfig = devToolsConfig;
        this.clientsWithoutHtmlRequestId = new Set();
        this.clientsByHtmlRequestId = new Map();
        this.closed = false;
        this.clientLatestStats = null;
        this.middlewareLatestStats = null;
        this.serverLatestStats = null;
        this.onClientInvalid = ()=>{
            var _this_serverLatestStats;
            if (this.closed || ((_this_serverLatestStats = this.serverLatestStats) == null ? void 0 : _this_serverLatestStats.stats.hasErrors())) return;
            this.publish({
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILDING
            });
        };
        this.onClientDone = (statsResult)=>{
            var _this_serverLatestStats;
            this.clientLatestStats = {
                ts: Date.now(),
                stats: statsResult
            };
            if (this.closed || ((_this_serverLatestStats = this.serverLatestStats) == null ? void 0 : _this_serverLatestStats.stats.hasErrors())) return;
            this.publishStats(statsResult);
        };
        this.onServerInvalid = ()=>{
            var _this_serverLatestStats, _this_clientLatestStats;
            if (!((_this_serverLatestStats = this.serverLatestStats) == null ? void 0 : _this_serverLatestStats.stats.hasErrors())) return;
            this.serverLatestStats = null;
            if ((_this_clientLatestStats = this.clientLatestStats) == null ? void 0 : _this_clientLatestStats.stats) {
                this.publishStats(this.clientLatestStats.stats);
            }
        };
        this.onServerDone = (statsResult)=>{
            if (this.closed) return;
            if (statsResult.hasErrors()) {
                this.serverLatestStats = {
                    ts: Date.now(),
                    stats: statsResult
                };
                this.publishStats(statsResult);
            }
        };
        this.onEdgeServerInvalid = ()=>{
            var _this_middlewareLatestStats, _this_clientLatestStats;
            if (!((_this_middlewareLatestStats = this.middlewareLatestStats) == null ? void 0 : _this_middlewareLatestStats.stats.hasErrors())) return;
            this.middlewareLatestStats = null;
            if ((_this_clientLatestStats = this.clientLatestStats) == null ? void 0 : _this_clientLatestStats.stats) {
                this.publishStats(this.clientLatestStats.stats);
            }
        };
        this.onEdgeServerDone = (statsResult)=>{
            if (this.closed) return;
            if (!isMiddlewareStats(statsResult)) {
                this.onServerInvalid();
                this.onServerDone(statsResult);
            }
            if (statsResult.hasErrors()) {
                this.middlewareLatestStats = {
                    ts: Date.now(),
                    stats: statsResult
                };
                this.publishStats(statsResult);
            }
        };
        this./**
   * To sync we use the most recent stats but also we append middleware
   * errors. This is because it is possible that middleware fails to compile
   * and we still want to show the client overlay with the error while
   * the error page should be rendered just fine.
   */ onHMR = (client, htmlRequestId)=>{
            if (this.closed) return;
            if (htmlRequestId) {
                this.clientsByHtmlRequestId.set(htmlRequestId, client);
            } else {
                this.clientsWithoutHtmlRequestId.add(client);
            }
            client.addEventListener('close', ()=>{
                if (htmlRequestId) {
                    this.clientsByHtmlRequestId.delete(htmlRequestId);
                } else {
                    this.clientsWithoutHtmlRequestId.delete(client);
                }
            });
            const syncStats = getStatsForSyncEvent(this.clientLatestStats, this.serverLatestStats);
            if (syncStats) {
                var _this_middlewareLatestStats;
                const stats = statsToJson(syncStats);
                const middlewareStats = statsToJson((_this_middlewareLatestStats = this.middlewareLatestStats) == null ? void 0 : _this_middlewareLatestStats.stats);
                if (_devindicatorserverstate.devIndicatorServerState.disabledUntil < Date.now()) {
                    _devindicatorserverstate.devIndicatorServerState.disabledUntil = 0;
                }
                this.publish({
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SYNC,
                    hash: stats.hash,
                    errors: [
                        ...stats.errors || [],
                        ...middlewareStats.errors || []
                    ],
                    warnings: [
                        ...stats.warnings || [],
                        ...middlewareStats.warnings || []
                    ],
                    versionInfo: this.versionInfo,
                    debug: {
                        devtoolsFrontendUrl: this.devtoolsFrontendUrl
                    },
                    devIndicator: _devindicatorserverstate.devIndicatorServerState,
                    devToolsConfig: this.devToolsConfig
                });
            }
        };
        this.publishStats = (statsResult)=>{
            const stats = statsResult.toJson({
                all: false,
                hash: true,
                warnings: true,
                errors: true,
                moduleTrace: true
            });
            this.publish({
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILT,
                hash: stats.hash,
                warnings: stats.warnings || [],
                errors: stats.errors || []
            });
        };
        this.getClient = (htmlRequestId)=>{
            return this.clientsByHtmlRequestId.get(htmlRequestId);
        };
        this.publishToClient = (client, message)=>{
            if (this.closed) {
                return;
            }
            const data = typeof message.type === 'number' ? (0, _messages.createBinaryHmrMessageData)(message) : JSON.stringify(message);
            client.send(data);
        };
        this.publish = (message)=>{
            if (this.closed) {
                return;
            }
            for (const wsClient of [
                ...this.clientsWithoutHtmlRequestId,
                ...this.clientsByHtmlRequestId.values()
            ]){
                this.publishToClient(wsClient, message);
            }
        };
        this.publishToLegacyClients = (message)=>{
            if (this.closed) {
                return;
            }
            // Clients with a request ID are inferred App Router clients. If Cache
            // Components is not enabled, we consider those legacy clients. Pages
            // Router clients are also considered legacy clients. TODO: Maybe mark
            // clients as App Router / Pages Router clients explicitly, instead of
            // inferring it from the presence of a request ID.
            if (!this.config.cacheComponents) {
                for (const wsClient of this.clientsByHtmlRequestId.values()){
                    this.publishToClient(wsClient, message);
                }
            }
            for (const wsClient of this.clientsWithoutHtmlRequestId){
                this.publishToClient(wsClient, message);
            }
        };
        this.close = ()=>{
            if (this.closed) {
                return;
            }
            // Can't remove compiler plugins, so we just set a flag and noop if closed
            // https://github.com/webpack/tapable/issues/32#issuecomment-350644466
            this.closed = true;
            for (const wsClient of [
                ...this.clientsWithoutHtmlRequestId,
                ...this.clientsByHtmlRequestId.values()
            ]){
                // it's okay to not cleanly close these websocket connections, this is dev
                wsClient.terminate();
            }
            this.clientsWithoutHtmlRequestId.clear();
            this.clientsByHtmlRequestId.clear();
        };
        this.deleteClient = (client, htmlRequestId)=>{
            if (htmlRequestId) {
                this.clientsByHtmlRequestId.delete(htmlRequestId);
            } else {
                this.clientsWithoutHtmlRequestId.delete(client);
            }
        };
        this.hasClients = ()=>{
            return this.clientsWithoutHtmlRequestId.size + this.clientsByHtmlRequestId.size > 0;
        };
        this.getClientCount = ()=>{
            return this.clientsWithoutHtmlRequestId.size + this.clientsByHtmlRequestId.size;
        };
        compilers[0].hooks.invalid.tap('webpack-hot-middleware', this.onClientInvalid);
        compilers[0].hooks.done.tap('webpack-hot-middleware', this.onClientDone);
        compilers[1].hooks.invalid.tap('webpack-hot-middleware', this.onServerInvalid);
        compilers[1].hooks.done.tap('webpack-hot-middleware', this.onServerDone);
        compilers[2].hooks.done.tap('webpack-hot-middleware', this.onEdgeServerDone);
        compilers[2].hooks.invalid.tap('webpack-hot-middleware', this.onEdgeServerInvalid);
    }
    updateDevToolsConfig(newConfig) {
        this.devToolsConfig = newConfig;
    }
} //# sourceMappingURL=hot-middleware.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/on-demand-entry-handler.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ADDED: null,
    BUILDING: null,
    BUILT: null,
    EntryTypes: null,
    findPagePathData: null,
    getEntries: null,
    getEntryKey: null,
    getInvalidator: null,
    onDemandEntryHandler: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ADDED: function() {
        return ADDED;
    },
    BUILDING: function() {
        return BUILDING;
    },
    BUILT: function() {
        return BUILT;
    },
    EntryTypes: function() {
        return EntryTypes;
    },
    findPagePathData: function() {
        return findPagePathData;
    },
    getEntries: function() {
        return getEntries;
    },
    getEntryKey: function() {
        return getEntryKey;
    },
    getInvalidator: function() {
        return getInvalidator;
    },
    onDemandEntryHandler: function() {
        return onDemandEntryHandler;
    }
});
const _debug = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/debug/index.js [app-client] (ecmascript)"));
const _events = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/events/events.js [app-client] (ecmascript)");
const _findpagefile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/find-page-file.js [app-client] (ecmascript)");
const _entries = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/entries.js [app-client] (ecmascript)");
const _getstaticinfoincludinglayouts = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/get-static-info-including-layouts.js [app-client] (ecmascript)");
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _normalizepathsep = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [app-client] (ecmascript)");
const _normalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js [app-client] (ecmascript)");
const _ensureleadingslash = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js [app-client] (ecmascript)");
const _removepagepathtail = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/remove-page-path-tail.js [app-client] (ecmascript)");
const _output = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/index.js [app-client] (ecmascript)");
const _getroutefromentrypoint = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/get-route-from-entrypoint.js [app-client] (ecmascript)"));
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _segment = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const _apppageroutedefinition = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-definitions/app-page-route-definition.js [app-client] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/scheduler.js [app-client] (ecmascript)");
const _batcher = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/batcher.js [app-client] (ecmascript)");
const _apppaths = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-client] (ecmascript)");
const _pagetypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/page-types.js [app-client] (ecmascript)");
const _flightdatahelpers = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/flight-data-helpers.js [app-client] (ecmascript)");
const _geterrors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/tools/get-errors.js [app-client] (ecmascript)");
const _getpagemetadata = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/tools/get-page-metadata.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug.default)('next:on-demand-entry-handler');
/**
 * Returns object keys with type inferred from the object key
 */ const keys = Object.keys;
const COMPILER_KEYS = keys(_constants.COMPILER_INDEXES);
function treePathToEntrypoint(segmentPath, parentPath) {
    const [parallelRouteKey, segment] = segmentPath;
    // TODO-APP: modify this path to cover parallelRouteKey convention
    const path = (parentPath ? parentPath + '/' : '') + (parallelRouteKey !== 'children' && !segment.startsWith('@') ? `@${parallelRouteKey}/` : '') + (segment === '' ? 'page' : segment);
    // Last segment
    if (segmentPath.length === 2) {
        return path;
    }
    const childSegmentPath = (0, _flightdatahelpers.getNextFlightSegmentPath)(segmentPath);
    return treePathToEntrypoint(childSegmentPath, path);
}
function convertDynamicParamTypeToSyntax(dynamicParamTypeShort, param) {
    switch(dynamicParamTypeShort){
        case 'c':
        case 'ci(..)(..)':
        case 'ci(.)':
        case 'ci(..)':
        case 'ci(...)':
            return `[...${param}]`;
        case 'oc':
            return `[[...${param}]]`;
        case 'd':
        case 'di(..)(..)':
        case 'di(.)':
        case 'di(..)':
        case 'di(...)':
            return `[${param}]`;
        default:
            throw Object.defineProperty(new Error('Unknown dynamic param type'), "__NEXT_ERROR_CODE", {
                value: "E378",
                enumerable: false,
                configurable: true
            });
    }
}
function getEntryKey(compilerType, pageBundleType, page) {
    // TODO: handle the /children slot better
    // this is a quick hack to handle when children is provided as children/page instead of /page
    const pageKey = page.replace(/(@[^/]+)\/children/g, '$1');
    return `${compilerType}@${pageBundleType}@${pageKey}`;
}
function getPageBundleType(pageBundlePath) {
    // Handle special case for /_error
    if (pageBundlePath === '/_error') return _pagetypes.PAGE_TYPES.PAGES;
    if ((0, _utils.isMiddlewareFilename)(pageBundlePath)) return _pagetypes.PAGE_TYPES.ROOT;
    return pageBundlePath.startsWith('pages/') ? _pagetypes.PAGE_TYPES.PAGES : pageBundlePath.startsWith('app/') ? _pagetypes.PAGE_TYPES.APP : _pagetypes.PAGE_TYPES.ROOT;
}
function getEntrypointsFromTree(tree, isFirst, parentPath = []) {
    const [segment, parallelRoutes] = tree;
    const currentSegment = Array.isArray(segment) ? convertDynamicParamTypeToSyntax(segment[2], segment[0]) : segment;
    const isPageSegment = currentSegment.startsWith(_segment.PAGE_SEGMENT_KEY);
    const currentPath = [
        ...parentPath,
        isPageSegment ? '' : currentSegment
    ];
    if (!isFirst && isPageSegment) {
        // TODO get rid of '' at the start of tree
        return [
            treePathToEntrypoint(currentPath.slice(1))
        ];
    }
    return Object.keys(parallelRoutes).reduce((paths, key)=>{
        const childTree = parallelRoutes[key];
        const childPages = getEntrypointsFromTree(childTree, false, [
            ...currentPath,
            key
        ]);
        return [
            ...paths,
            ...childPages
        ];
    }, []);
}
const ADDED = Symbol('added');
const BUILDING = Symbol('building');
const BUILT = Symbol('built');
var EntryTypes = /*#__PURE__*/ function(EntryTypes) {
    EntryTypes[EntryTypes["ENTRY"] = 0] = "ENTRY";
    EntryTypes[EntryTypes["CHILD_ENTRY"] = 1] = "CHILD_ENTRY";
    return EntryTypes;
}({});
const entriesMap = new Map();
// remove /server from end of output for server compiler
const normalizeOutputPath = (dir)=>dir.replace(/[/\\]server$/, '');
const getEntries = (dir)=>{
    dir = normalizeOutputPath(dir);
    const entries = entriesMap.get(dir) || {};
    entriesMap.set(dir, entries);
    return entries;
};
const invalidators = new Map();
const getInvalidator = (dir)=>{
    dir = normalizeOutputPath(dir);
    return invalidators.get(dir);
};
const doneCallbacks = new _events.EventEmitter();
const lastClientAccessPages = [
    ''
];
const lastServerAccessPagesForAppDir = [
    ''
];
// Make sure only one invalidation happens at a time
// Otherwise, webpack hash gets changed and it'll force the client to reload.
class Invalidator {
    constructor(multiCompiler){
        this.building = new Set();
        this.rebuildAgain = new Set();
        this.multiCompiler = multiCompiler;
    }
    shouldRebuildAll() {
        return this.rebuildAgain.size > 0;
    }
    invalidate(compilerKeys = COMPILER_KEYS) {
        for (const key of compilerKeys){
            var _this_multiCompiler_compilers_COMPILER_INDEXES_key_watching;
            // If there's a current build is processing, we won't abort it by invalidating.
            // (If aborted, it'll cause a client side hard reload)
            // But let it to invalidate just after the completion.
            // So, it can re-build the queued pages at once.
            if (this.building.has(key)) {
                this.rebuildAgain.add(key);
                continue;
            }
            this.building.add(key);
            (_this_multiCompiler_compilers_COMPILER_INDEXES_key_watching = this.multiCompiler.compilers[_constants.COMPILER_INDEXES[key]].watching) == null ? void 0 : _this_multiCompiler_compilers_COMPILER_INDEXES_key_watching.invalidate();
        }
    }
    startBuilding(compilerKey) {
        this.building.add(compilerKey);
    }
    doneBuilding(compilerKeys = []) {
        const rebuild = [];
        for (const key of compilerKeys){
            this.building.delete(key);
            if (this.rebuildAgain.has(key)) {
                rebuild.push(key);
                this.rebuildAgain.delete(key);
            }
        }
        if (rebuild.length > 0) {
            this.invalidate(rebuild);
        }
    }
    willRebuild(compilerKey) {
        return this.rebuildAgain.has(compilerKey);
    }
}
function disposeInactiveEntries(entries, maxInactiveAge) {
    Object.keys(entries).forEach((entryKey)=>{
        const entryData = entries[entryKey];
        const { lastActiveTime, status, dispose, bundlePath } = entryData;
        // TODO-APP: implement disposing of CHILD_ENTRY
        if (entryData.type === 1) {
            return;
        }
        // For the root middleware and the instrumentation hook files,
        // we don't dispose them periodically as it's needed for every request.
        if ((0, _utils.isMiddlewareFilename)(bundlePath) || (0, _utils.isInstrumentationHookFilename)(bundlePath)) {
            return;
        }
        if (dispose) return;
        // This means this entry is currently building or just added
        // We don't need to dispose those entries.
        if (status !== BUILT) return;
        // We should not build the last accessed page even we didn't get any pings
        // Sometimes, it's possible our XHR ping to wait before completing other requests.
        // In that case, we should not dispose the current viewing page
        if (lastClientAccessPages.includes(entryKey) || lastServerAccessPagesForAppDir.includes(entryKey)) return;
        if (lastActiveTime && Date.now() - lastActiveTime > maxInactiveAge) {
            entries[entryKey].dispose = true;
        }
    });
}
// Normalize both app paths and page paths
function tryToNormalizePagePath(page) {
    try {
        return (0, _normalizepagepath.normalizePagePath)(page);
    } catch (err) {
        console.error(err);
        throw new _utils1.PageNotFoundError(page);
    }
}
async function findPagePathData(rootDir, page, extensions, pagesDir, appDir, isGlobalNotFoundEnabled) {
    const normalizedPagePath = tryToNormalizePagePath(page);
    let pagePath = null;
    const isInstrumentation = (0, _utils.isInstrumentationHookFile)(normalizedPagePath);
    if ((0, _utils.isMiddlewareFile)(normalizedPagePath) || isInstrumentation) {
        pagePath = await (0, _findpagefile.findPageFile)(rootDir, normalizedPagePath, extensions, false);
        if (!pagePath) {
            throw new _utils1.PageNotFoundError(normalizedPagePath);
        }
        const pageUrl = (0, _ensureleadingslash.ensureLeadingSlash)((0, _removepagepathtail.removePagePathTail)((0, _normalizepathsep.normalizePathSep)(pagePath), {
            extensions
        }));
        let bundlePath = normalizedPagePath;
        let pageKey = _path.posix.normalize(pageUrl);
        if (isInstrumentation || (0, _utils.isMiddlewareFile)(normalizedPagePath)) {
            bundlePath = bundlePath.replace('/src', '');
            pageKey = page.replace('/src', '');
        }
        return {
            filename: (0, _path.join)(rootDir, pagePath),
            bundlePath: bundlePath.slice(1),
            page: pageKey
        };
    }
    // Check appDir first falling back to pagesDir
    if (appDir) {
        if (page === _constants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY) {
            // Load `global-not-found` when global-not-found is enabled.
            // Prefer to load it when both `global-not-found` and root `not-found` present.
            if (isGlobalNotFoundEnabled) {
                const globalNotFoundPath = await (0, _findpagefile.findPageFile)(appDir, 'global-not-found', extensions, true);
                if (globalNotFoundPath) {
                    return {
                        filename: (0, _path.join)(appDir, globalNotFoundPath),
                        bundlePath: `app${_constants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY}`,
                        page: _constants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY
                    };
                }
            } else {
                // Then if global-not-found.js doesn't exist then load not-found.js
                const notFoundPath = await (0, _findpagefile.findPageFile)(appDir, 'not-found', extensions, true);
                if (notFoundPath) {
                    return {
                        filename: (0, _path.join)(appDir, notFoundPath),
                        bundlePath: `app${_constants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY}`,
                        page: _constants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY
                    };
                }
            }
            // If they're not presented, then fallback to global-not-found
            return {
                filename: "[project]/JobPortal/frontend/node_modules/next/dist/client/components/builtin/global-not-found.js [app-client] (ecmascript)",
                bundlePath: `app${_constants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY}`,
                page: _constants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY
            };
        }
        pagePath = await (0, _findpagefile.findPageFile)(appDir, normalizedPagePath, extensions, true);
        if (pagePath) {
            const pageUrl = (0, _ensureleadingslash.ensureLeadingSlash)((0, _removepagepathtail.removePagePathTail)((0, _normalizepathsep.normalizePathSep)(pagePath), {
                keepIndex: true,
                extensions
            }));
            return {
                filename: (0, _path.join)(appDir, pagePath),
                bundlePath: _path.posix.join('app', pageUrl),
                page: _path.posix.normalize(pageUrl)
            };
        }
    }
    if (!pagePath && pagesDir) {
        pagePath = await (0, _findpagefile.findPageFile)(pagesDir, normalizedPagePath, extensions, false);
    }
    if (pagePath !== null && pagesDir) {
        const pageUrl = (0, _ensureleadingslash.ensureLeadingSlash)((0, _removepagepathtail.removePagePathTail)((0, _normalizepathsep.normalizePathSep)(pagePath), {
            extensions
        }));
        return {
            filename: (0, _path.join)(pagesDir, pagePath),
            bundlePath: _path.posix.join('pages', (0, _normalizepagepath.normalizePagePath)(pageUrl)),
            page: _path.posix.normalize(pageUrl)
        };
    }
    if (page === '/_error') {
        return {
            filename: "[project]/JobPortal/frontend/node_modules/next/dist/pages/_error.js [app-client] (ecmascript)",
            bundlePath: page,
            page: (0, _normalizepathsep.normalizePathSep)(page)
        };
    } else {
        throw new _utils1.PageNotFoundError(normalizedPagePath);
    }
}
function onDemandEntryHandler({ hotReloader, maxInactiveAge, multiCompiler, nextConfig, pagesBufferLength, pagesDir, rootDir, appDir }) {
    const hasAppDir = !!appDir;
    let curInvalidator = getInvalidator(multiCompiler.outputPath);
    const curEntries = getEntries(multiCompiler.outputPath);
    if (!curInvalidator) {
        curInvalidator = new Invalidator(multiCompiler);
        invalidators.set(multiCompiler.outputPath, curInvalidator);
    }
    const startBuilding = (compilation)=>{
        const compilationName = compilation.name;
        curInvalidator.startBuilding(compilationName);
    };
    for (const compiler of multiCompiler.compilers){
        compiler.hooks.make.tap('NextJsOnDemandEntries', startBuilding);
    }
    function getPagePathsFromEntrypoints(type, entrypoints) {
        const pagePaths = [];
        for (const entrypoint of entrypoints.values()){
            const page = (0, _getroutefromentrypoint.default)(entrypoint.name, hasAppDir);
            if (page) {
                var _entrypoint_name;
                const pageBundleType = ((_entrypoint_name = entrypoint.name) == null ? void 0 : _entrypoint_name.startsWith('app/')) ? _pagetypes.PAGE_TYPES.APP : _pagetypes.PAGE_TYPES.PAGES;
                pagePaths.push(getEntryKey(type, pageBundleType, page));
            } else if ((0, _utils.isMiddlewareFilename)(entrypoint.name) || (0, _utils.isInstrumentationHookFilename)(entrypoint.name)) {
                pagePaths.push(getEntryKey(type, _pagetypes.PAGE_TYPES.ROOT, `/${entrypoint.name}`));
            }
        }
        return pagePaths;
    }
    for (const compiler of multiCompiler.compilers){
        compiler.hooks.done.tap('NextJsOnDemandEntries', ()=>{
            var _getInvalidator;
            return (_getInvalidator = getInvalidator(compiler.outputPath)) == null ? void 0 : _getInvalidator.doneBuilding([
                compiler.name
            ]);
        });
    }
    multiCompiler.hooks.done.tap('NextJsOnDemandEntries', (multiStats)=>{
        var _getInvalidator;
        const [clientStats, serverStats, edgeServerStats] = multiStats.stats;
        const entryNames = [
            ...getPagePathsFromEntrypoints(_constants.COMPILER_NAMES.client, clientStats.compilation.entrypoints),
            ...getPagePathsFromEntrypoints(_constants.COMPILER_NAMES.server, serverStats.compilation.entrypoints),
            ...edgeServerStats ? getPagePathsFromEntrypoints(_constants.COMPILER_NAMES.edgeServer, edgeServerStats.compilation.entrypoints) : []
        ];
        for (const name of entryNames){
            const entry = curEntries[name];
            if (!entry) {
                continue;
            }
            if (entry.status !== BUILDING) {
                continue;
            }
            entry.status = BUILT;
            doneCallbacks.emit(name);
        }
        (_getInvalidator = getInvalidator(multiCompiler.outputPath)) == null ? void 0 : _getInvalidator.doneBuilding([
            ...COMPILER_KEYS
        ]);
    });
    const pingIntervalTime = Math.max(1000, Math.min(5000, maxInactiveAge));
    setInterval(function() {
        disposeInactiveEntries(curEntries, maxInactiveAge);
    }, pingIntervalTime + 1000).unref();
    function handleAppDirPing(tree) {
        const pages = getEntrypointsFromTree(tree, true);
        for (const page of pages){
            for (const compilerType of [
                _constants.COMPILER_NAMES.client,
                _constants.COMPILER_NAMES.server,
                _constants.COMPILER_NAMES.edgeServer
            ]){
                const entryKey = getEntryKey(compilerType, _pagetypes.PAGE_TYPES.APP, `/${page}`);
                const entryInfo = curEntries[entryKey];
                // If there's no entry, it may have been invalidated and needs to be re-built.
                if (!entryInfo) {
                    continue;
                }
                // We don't need to maintain active state of anything other than BUILT entries
                if (entryInfo.status !== BUILT) continue;
                // If there's an entryInfo
                if (!lastServerAccessPagesForAppDir.includes(entryKey)) {
                    lastServerAccessPagesForAppDir.unshift(entryKey);
                    // Maintain the buffer max length
                    // TODO: verify that the current pageKey is not at the end of the array as multiple entrypoints can exist
                    if (lastServerAccessPagesForAppDir.length > pagesBufferLength) {
                        lastServerAccessPagesForAppDir.pop();
                    }
                }
                entryInfo.lastActiveTime = Date.now();
                entryInfo.dispose = false;
            }
        }
    }
    function handlePing(pg) {
        const page = (0, _normalizepathsep.normalizePathSep)(pg);
        for (const compilerType of [
            _constants.COMPILER_NAMES.client,
            _constants.COMPILER_NAMES.server,
            _constants.COMPILER_NAMES.edgeServer
        ]){
            const entryKey = getEntryKey(compilerType, _pagetypes.PAGE_TYPES.PAGES, page);
            const entryInfo = curEntries[entryKey];
            // If there's no entry, it may have been invalidated and needs to be re-built.
            if (!entryInfo) {
                // if (page !== lastEntry) client pings, but there's no entry for page
                if (compilerType === _constants.COMPILER_NAMES.client) {
                    return;
                }
                continue;
            }
            // We don't need to maintain active state of anything other than BUILT entries
            if (entryInfo.status !== BUILT) continue;
            // If there's an entryInfo
            if (!lastClientAccessPages.includes(entryKey)) {
                lastClientAccessPages.unshift(entryKey);
                // Maintain the buffer max length
                if (lastClientAccessPages.length > pagesBufferLength) {
                    lastClientAccessPages.pop();
                }
            }
            entryInfo.lastActiveTime = Date.now();
            entryInfo.dispose = false;
        }
        return;
    }
    async function ensurePageImpl({ page, appPaths, definition, isApp, url }) {
        const stalledTime = 60;
        const stalledEnsureTimeout = setTimeout(()=>{
            debug(`Ensuring ${page} has taken longer than ${stalledTime}s, if this continues to stall this may be a bug`);
        }, stalledTime * 1000);
        try {
            let route;
            if (definition) {
                route = definition;
            } else {
                route = await findPagePathData(rootDir, page, nextConfig.pageExtensions, pagesDir, appDir, !!nextConfig.experimental.globalNotFound);
            }
            const isInsideAppDir = !!appDir && route.filename.startsWith(appDir);
            if (typeof isApp === 'boolean' && isApp !== isInsideAppDir) {
                Error.stackTraceLimit = 15;
                throw Object.defineProperty(new Error(`Ensure bailed, found path "${route.page}" does not match ensure type (${isApp ? 'app' : 'pages'})`), "__NEXT_ERROR_CODE", {
                    value: "E419",
                    enumerable: false,
                    configurable: true
                });
            }
            const pageBundleType = getPageBundleType(route.bundlePath);
            const addEntry = (compilerType)=>{
                const entryKey = getEntryKey(compilerType, pageBundleType, route.page);
                if (curEntries[entryKey] && // there can be an overlap in the entryKey for the instrumentation hook file and a page named the same
                // this is a quick fix to support this scenario by overwriting the instrumentation hook entry, since we only use it one time
                // any changes to the instrumentation hook file will require a restart of the dev server anyway
                !(0, _utils.isInstrumentationHookFilename)(curEntries[entryKey].bundlePath)) {
                    curEntries[entryKey].dispose = false;
                    curEntries[entryKey].lastActiveTime = Date.now();
                    if (curEntries[entryKey].status === BUILT) {
                        return {
                            entryKey,
                            newEntry: false,
                            shouldInvalidate: false
                        };
                    }
                    return {
                        entryKey,
                        newEntry: false,
                        shouldInvalidate: true
                    };
                }
                curEntries[entryKey] = {
                    type: 0,
                    appPaths,
                    absolutePagePath: route.filename,
                    request: route.filename,
                    bundlePath: route.bundlePath,
                    dispose: false,
                    lastActiveTime: Date.now(),
                    status: ADDED
                };
                return {
                    entryKey: entryKey,
                    newEntry: true,
                    shouldInvalidate: true
                };
            };
            const staticInfo = await (0, _getstaticinfoincludinglayouts.getStaticInfoIncludingLayouts)({
                page,
                pageFilePath: route.filename,
                isInsideAppDir,
                pageExtensions: nextConfig.pageExtensions,
                isDev: true,
                config: nextConfig,
                appDir
            });
            const added = new Map();
            const isServerComponent = isInsideAppDir && staticInfo.rsc !== _constants.RSC_MODULE_TYPES.client;
            let pageRuntime = staticInfo.runtime;
            (0, _entries.runDependingOnPageType)({
                page: route.page,
                pageRuntime,
                pageType: pageBundleType,
                onClient: ()=>{
                    // Skip adding the client entry for app / Server Components.
                    if (isServerComponent || isInsideAppDir) {
                        return;
                    }
                    added.set(_constants.COMPILER_NAMES.client, addEntry(_constants.COMPILER_NAMES.client));
                },
                onServer: ()=>{
                    added.set(_constants.COMPILER_NAMES.server, addEntry(_constants.COMPILER_NAMES.server));
                    const edgeServerEntry = getEntryKey(_constants.COMPILER_NAMES.edgeServer, pageBundleType, route.page);
                    if (curEntries[edgeServerEntry] && !(0, _utils.isInstrumentationHookFile)(route.page)) {
                        // Runtime switched from edge to server
                        delete curEntries[edgeServerEntry];
                    }
                },
                onEdgeServer: ()=>{
                    added.set(_constants.COMPILER_NAMES.edgeServer, addEntry(_constants.COMPILER_NAMES.edgeServer));
                    const serverEntry = getEntryKey(_constants.COMPILER_NAMES.server, pageBundleType, route.page);
                    if (curEntries[serverEntry] && !(0, _utils.isInstrumentationHookFile)(route.page)) {
                        // Runtime switched from server to edge
                        delete curEntries[serverEntry];
                    }
                }
            });
            const addedValues = [
                ...added.values()
            ];
            const entriesThatShouldBeInvalidated = [
                ...added.entries()
            ].filter(([, entry])=>entry.shouldInvalidate);
            const hasNewEntry = addedValues.some((entry)=>entry.newEntry);
            if (hasNewEntry) {
                const routePage = isApp ? route.page : (0, _apppaths.normalizeAppPath)(route.page);
                // If proxy file, remove the leading slash from "/proxy" to "proxy".
                (0, _output.reportTrigger)((0, _utils.isMiddlewareFile)(routePage) ? routePage.slice(1) : routePage, url);
            }
            if (entriesThatShouldBeInvalidated.length > 0) {
                const invalidatePromise = Promise.all(entriesThatShouldBeInvalidated.map(([compilerKey, { entryKey }])=>{
                    return new Promise((resolve, reject)=>{
                        doneCallbacks.once(entryKey, (err)=>{
                            if (err) {
                                return reject(err);
                            }
                            // If the invalidation also triggers a rebuild, we need to
                            // wait for that additional build to prevent race conditions.
                            const needsRebuild = curInvalidator.willRebuild(compilerKey);
                            if (needsRebuild) {
                                doneCallbacks.once(entryKey, (rebuildErr)=>{
                                    if (rebuildErr) {
                                        return reject(rebuildErr);
                                    }
                                    resolve();
                                });
                            } else {
                                resolve();
                            }
                        });
                    });
                }));
                curInvalidator.invalidate([
                    ...added.keys()
                ]);
                await invalidatePromise;
            }
        } finally{
            clearTimeout(stalledEnsureTimeout);
        }
    }
    // Make sure that we won't have multiple invalidations ongoing concurrently.
    const batcher = _batcher.Batcher.create({
        // The cache key here is composed of the elements that affect the
        // compilation, namely, the page, whether it's client only, and whether
        // it's an app page. This ensures that we don't have multiple compilations
        // for the same page happening concurrently.
        //
        // We don't include the whole match because it contains match specific
        // parameters (like route params) that would just bust this cache. Any
        // details that would possibly bust the cache should be listed here.
        cacheKeyFn: (options)=>JSON.stringify(options),
        // Schedule the invocation of the ensurePageImpl function on the next tick.
        schedulerFn: _scheduler.scheduleOnNextTick
    });
    return {
        async ensurePage ({ page, appPaths = null, definition, isApp, url }) {
            // If the route is actually an app page route, then we should have access
            // to the app route definition, and therefore, the appPaths from it.
            if (!appPaths && definition && (0, _apppageroutedefinition.isAppPageRouteDefinition)(definition)) {
                appPaths = definition.appPaths;
            }
            // Wrap the invocation of the ensurePageImpl function in the pending
            // wrapper, which will ensure that we don't have multiple compilations
            // for the same page happening concurrently.
            return batcher.batch({
                page,
                appPaths,
                definition,
                isApp
            }, async ()=>{
                await ensurePageImpl({
                    page,
                    appPaths,
                    definition,
                    isApp,
                    url
                });
            });
        },
        onHMR (client, getHmrServerError) {
            let bufferedHmrServerError = null;
            client.addEventListener('close', ()=>{
                bufferedHmrServerError = null;
            });
            client.addEventListener('message', ({ data })=>{
                try {
                    const error = getHmrServerError();
                    // New error occurred: buffered error is flushed and new error occurred
                    if (!bufferedHmrServerError && error) {
                        hotReloader.send({
                            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ERROR,
                            errorJSON: (0, _utils1.stringifyError)(error)
                        });
                        bufferedHmrServerError = null;
                    }
                    const parsedData = JSON.parse(typeof data !== 'string' ? data.toString() : data);
                    if (parsedData.event === _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER.PING) {
                        if (parsedData.appDirRoute) {
                            handleAppDirPing(parsedData.tree);
                        } else {
                            handlePing(parsedData.page);
                        }
                    } else if (parsedData.event === _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER.MCP_ERROR_STATE_RESPONSE) {
                        (0, _geterrors.handleErrorStateResponse)(parsedData.requestId, parsedData.errorState, parsedData.url);
                    } else if (parsedData.event === _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER.MCP_PAGE_METADATA_RESPONSE) {
                        (0, _getpagemetadata.handlePageMetadataResponse)(parsedData.requestId, parsedData.segmentTrieData, parsedData.url);
                    }
                } catch  {}
            });
        }
    };
} //# sourceMappingURL=on-demand-entry-handler.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/require-cache.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteCache", {
    enumerable: true,
    get: function() {
        return deleteCache;
    }
});
const _iserror = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)"));
const _realpath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/realpath.js [app-client] (ecmascript)");
const _loadmanifestexternal = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/load-manifest.external.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function deleteFromRequireCache(filePath) {
    try {
        filePath = (0, _realpath.realpathSync)(filePath);
    } catch (e) {
        if ((0, _iserror.default)(e) && e.code !== 'ENOENT') throw e;
    }
    const mod = __turbopack_context__.c[filePath];
    if (mod) {
        // remove the child reference from all parent modules
        for (const parent of Object.values(__turbopack_context__.c)){
            if (parent == null ? void 0 : parent.children) {
                const idx = parent.children.indexOf(mod);
                if (idx >= 0) parent.children.splice(idx, 1);
            }
        }
        // remove parent references from external modules
        for (const child of mod.children){
            child.parent = null;
        }
        delete __turbopack_context__.c[filePath];
        return true;
    }
    return false;
}
function deleteCache(filePath) {
    // try to clear it from the fs cache
    (0, _loadmanifestexternal.clearManifestCache)(filePath);
    deleteFromRequireCache(filePath);
} //# sourceMappingURL=require-cache.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/middleware-turbopack.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getOriginalStackFrames: null,
    getOverlayMiddleware: null,
    getSourceMapMiddleware: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getOriginalStackFrames: function() {
        return getOriginalStackFrames;
    },
    getOverlayMiddleware: function() {
        return getOverlayMiddleware;
    },
    getSourceMapMiddleware: function() {
        return getSourceMapMiddleware;
    }
});
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/shared.js [app-client] (ecmascript)");
const _middlewareresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/middleware-response.js [app-client] (ecmascript)");
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _launcheditor = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/launch-editor.js [app-client] (ecmascript)");
const _sourcemap08 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/source-map08/source-map.js [app-client] (ecmascript)");
const _sourcemaps = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/source-maps.js [app-client] (ecmascript)");
const _nodemodule = (()=>{
    const e = new Error("Cannot find module 'node:module': Unsupported external type Url for commonjs reference");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _nodeurl = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/native-url/index.js [app-client] (ecmascript)");
const _nodeutil = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/util/util.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function shouldIgnorePath(modulePath) {
    return modulePath.includes('node_modules') || // Only relevant for when Next.js is symlinked e.g. in the Next.js monorepo
    modulePath.includes('next/dist') || modulePath.startsWith('node:');
}
const currentSourcesByFile = new Map();
/**
 * @returns 1-based lines and 1-based columns
 */ async function batchedTraceSource(project, frame) {
    const file = frame.file ? decodeURIComponent(frame.file) : undefined;
    if (!file) return;
    // For node internals they cannot traced the actual source code with project.traceSource,
    // we need an early return to indicate it's ignored to avoid the unknown scheme error from `project.traceSource`.
    if (file.startsWith('node:')) {
        return {
            frame: {
                file,
                line1: frame.line ?? null,
                column1: frame.column ?? null,
                methodName: frame.methodName ?? '<unknown>',
                ignored: true,
                arguments: []
            },
            source: null
        };
    }
    const currentDirectoryFileUrl = (0, _nodeurl.pathToFileURL)(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd()).href;
    const sourceFrame = await project.traceSource(frame, currentDirectoryFileUrl);
    if (!sourceFrame) {
        return {
            frame: {
                file,
                line1: frame.line ?? null,
                column1: frame.column ?? null,
                methodName: frame.methodName ?? '<unknown>',
                ignored: shouldIgnorePath(file),
                arguments: []
            },
            source: null
        };
    }
    let source = null;
    const originalFile = sourceFrame.originalFile;
    // Don't look up source for node_modules or internals. These can often be large bundled files.
    const ignored = shouldIgnorePath(originalFile ?? sourceFrame.file) || // isInternal means resource starts with turbopack:///[turbopack]
    !!sourceFrame.isInternal;
    if (originalFile && !ignored) {
        let sourcePromise = currentSourcesByFile.get(originalFile);
        if (!sourcePromise) {
            sourcePromise = project.getSourceForAsset(originalFile);
            currentSourcesByFile.set(originalFile, sourcePromise);
            setTimeout(()=>{
                // Cache file reads for 100ms, as frames will often reference the same
                // files and can be large.
                currentSourcesByFile.delete(originalFile);
            }, 100);
        }
        source = await sourcePromise;
    }
    // TODO: get ignoredList from turbopack source map
    const ignorableFrame = {
        file: sourceFrame.file,
        line1: sourceFrame.line ?? null,
        column1: sourceFrame.column ?? null,
        methodName: // The callsite will point to the column of the variable name instead of the
        // name of the enclosing function.
        // TODO(NDX-531): Spy on prepareStackTrace to get the enclosing line number for method name mapping.
        frame.methodName ?? '<unknown>',
        ignored,
        arguments: []
    };
    return {
        frame: ignorableFrame,
        source
    };
}
function parseFile(fileParam) {
    if (!fileParam) {
        return undefined;
    }
    return (0, _sourcemaps.devirtualizeReactServerURL)(fileParam);
}
function createStackFrames(body) {
    const { frames, isServer } = body;
    return frames.map((frame)=>{
        const file = parseFile(frame.file);
        if (!file) {
            return undefined;
        }
        return {
            file,
            methodName: frame.methodName ?? '<unknown>',
            line: frame.line1 ?? undefined,
            column: frame.column1 ?? undefined,
            isServer
        };
    }).filter((f)=>f !== undefined);
}
function createStackFrame(searchParams) {
    const file = parseFile(searchParams.get('file'));
    if (!file) {
        return undefined;
    }
    return {
        file,
        methodName: searchParams.get('methodName') ?? '<unknown>',
        line: parseInt(searchParams.get('line1') ?? '0', 10) || undefined,
        column: parseInt(searchParams.get('column1') ?? '0', 10) || undefined,
        isServer: searchParams.get('isServer') === 'true'
    };
}
/**
 * @returns 1-based lines and 1-based columns
 */ async function nativeTraceSource(frame) {
    const sourceURL = frame.file;
    let sourceMapPayload;
    try {
        var _findSourceMap;
        sourceMapPayload = (_findSourceMap = (0, _nodemodule.findSourceMap)(sourceURL)) == null ? void 0 : _findSourceMap.payload;
    } catch (cause) {
        throw Object.defineProperty(new Error(`${sourceURL}: Invalid source map. Only conformant source maps can be used to find the original code.`, {
            cause
        }), "__NEXT_ERROR_CODE", {
            value: "E635",
            enumerable: false,
            configurable: true
        });
    }
    if (sourceMapPayload !== undefined) {
        let consumer;
        try {
            consumer = await new _sourcemap08.SourceMapConsumer(sourceMapPayload);
        } catch (cause) {
            throw Object.defineProperty(new Error(`${sourceURL}: Invalid source map. Only conformant source maps can be used to find the original code.`, {
                cause
            }), "__NEXT_ERROR_CODE", {
                value: "E635",
                enumerable: false,
                configurable: true
            });
        }
        let traced;
        try {
            const originalPosition = consumer.originalPositionFor({
                line: frame.line ?? 1,
                // 0-based columns out requires 0-based columns in.
                column: (frame.column ?? 1) - 1
            });
            if (originalPosition.source === null) {
                traced = null;
            } else {
                const sourceContent = consumer.sourceContentFor(originalPosition.source, /* returnNullOnMissing */ true) ?? null;
                traced = {
                    originalPosition,
                    sourceContent
                };
            }
        } finally{
            consumer.destroy();
        }
        if (traced !== null) {
            var // The callsite will point to the column of the variable name instead of the
            // name of the enclosing function.
            // TODO(NDX-531): Spy on prepareStackTrace to get the enclosing line number for method name mapping.
            _frame_methodName_replace, _frame_methodName;
            const { originalPosition, sourceContent } = traced;
            const applicableSourceMap = (0, _sourcemaps.findApplicableSourceMapPayload)((frame.line ?? 1) - 1, (frame.column ?? 1) - 1, sourceMapPayload);
            // TODO(veil): Upstream a method to sourcemap consumer that immediately says if a frame is ignored or not.
            let ignored = false;
            if (applicableSourceMap === undefined) {
                console.error('No applicable source map found in sections for frame', frame);
            } else {
                var _applicableSourceMap_ignoreList;
                // TODO: O(n^2). Consider moving `ignoreList` into a Set
                const sourceIndex = applicableSourceMap.sources.indexOf(originalPosition.source);
                ignored = ((_applicableSourceMap_ignoreList = applicableSourceMap.ignoreList) == null ? void 0 : _applicableSourceMap_ignoreList.includes(sourceIndex)) ?? // When sourcemap is not available, fallback to checking `frame.file`.
                // e.g. In pages router, nextjs server code is not bundled into the page.
                shouldIgnorePath(frame.file);
            }
            const originalStackFrame = {
                methodName: ((_frame_methodName = frame.methodName) == null ? void 0 : (_frame_methodName_replace = _frame_methodName.replace('__WEBPACK_DEFAULT_EXPORT__', 'default')) == null ? void 0 : _frame_methodName_replace.replace('__webpack_exports__.', '')) || '<unknown>',
                file: originalPosition.source,
                line1: originalPosition.line,
                column1: originalPosition.column === null ? null : originalPosition.column + 1,
                // TODO: c&p from async createOriginalStackFrame but why not frame.arguments?
                arguments: [],
                ignored
            };
            return {
                frame: originalStackFrame,
                source: sourceContent
            };
        }
    }
    return undefined;
}
async function createOriginalStackFrame(project, projectPath, frame) {
    const traced = await nativeTraceSource(frame) ?? // TODO(veil): When would the bundler know more than native?
    // If it's faster, try the bundler first and fall back to native later.
    await batchedTraceSource(project, frame);
    if (!traced) {
        return null;
    }
    let normalizedStackFrameLocation = traced.frame.file;
    if (normalizedStackFrameLocation !== null && normalizedStackFrameLocation.startsWith('file://')) {
        normalizedStackFrameLocation = _path.default.relative(projectPath, (0, _nodeurl.fileURLToPath)(normalizedStackFrameLocation));
    }
    return {
        originalStackFrame: {
            arguments: traced.frame.arguments,
            file: normalizedStackFrameLocation,
            line1: traced.frame.line1,
            column1: traced.frame.column1,
            ignored: traced.frame.ignored,
            methodName: traced.frame.methodName
        },
        originalCodeFrame: (0, _shared.getOriginalCodeFrame)(traced.frame, traced.source)
    };
}
function getOverlayMiddleware({ project, projectPath, isSrcDir }) {
    return async function(req, res, next) {
        const { pathname, searchParams } = new URL(req.url, 'http://n');
        if (pathname === '/__nextjs_original-stack-frames') {
            if (req.method !== 'POST') {
                return _middlewareresponse.middlewareResponse.badRequest(res);
            }
            const body = await new Promise((resolve, reject)=>{
                let data = '';
                req.on('data', (chunk)=>{
                    data += chunk;
                });
                req.on('end', ()=>resolve(data));
                req.on('error', reject);
            });
            const request = JSON.parse(body);
            const result = await getOriginalStackFrames({
                project,
                projectPath,
                frames: request.frames,
                isServer: request.isServer,
                isEdgeServer: request.isEdgeServer,
                isAppDirectory: request.isAppDirectory
            });
            (0, _shared.ignoreListAnonymousStackFramesIfSandwiched)(result);
            return _middlewareresponse.middlewareResponse.json(res, result);
        } else if (pathname === '/__nextjs_launch-editor') {
            const isAppRelativePath = searchParams.get('isAppRelativePath') === '1';
            let openEditorResult;
            if (isAppRelativePath) {
                const relativeFilePath = searchParams.get('file') || '';
                const appPath = _path.default.join('app', isSrcDir ? 'src' : '', relativeFilePath);
                openEditorResult = await (0, _launcheditor.openFileInEditor)(appPath, 1, 1, projectPath);
            } else {
                const frame = createStackFrame(searchParams);
                if (!frame) return _middlewareresponse.middlewareResponse.badRequest(res);
                openEditorResult = await (0, _launcheditor.openFileInEditor)(frame.file, frame.line ?? 1, frame.column ?? 1, projectPath);
            }
            if (openEditorResult.error) {
                return _middlewareresponse.middlewareResponse.internalServerError(res, openEditorResult.error);
            }
            if (!openEditorResult.found) {
                return _middlewareresponse.middlewareResponse.notFound(res);
            }
            return _middlewareresponse.middlewareResponse.noContent(res);
        }
        return next();
    };
}
function getSourceMapMiddleware(project) {
    return async function(req, res, next) {
        const { pathname, searchParams } = new URL(req.url, 'http://n');
        if (pathname !== '/__nextjs_source-map') {
            return next();
        }
        let filename = searchParams.get('filename');
        if (!filename) {
            return _middlewareresponse.middlewareResponse.badRequest(res);
        }
        let nativeSourceMap;
        try {
            nativeSourceMap = (0, _nodemodule.findSourceMap)(filename);
        } catch (cause) {
            return _middlewareresponse.middlewareResponse.internalServerError(res, Object.defineProperty(new Error(`${filename}: Invalid source map. Only conformant source maps can be used to find the original code.`, {
                cause
            }), "__NEXT_ERROR_CODE", {
                value: "E635",
                enumerable: false,
                configurable: true
            }));
        }
        if (nativeSourceMap !== undefined) {
            const sourceMapPayload = nativeSourceMap.payload;
            return _middlewareresponse.middlewareResponse.json(res, sourceMapPayload);
        }
        try {
            // Turbopack chunk filenames might be URL-encoded.
            filename = decodeURI(filename);
        } catch  {
            return _middlewareresponse.middlewareResponse.badRequest(res);
        }
        if (_path.default.isAbsolute(filename)) {
            filename = (0, _nodeurl.pathToFileURL)(filename).href;
        }
        try {
            const sourceMapString = await project.getSourceMap(filename);
            if (sourceMapString) {
                return _middlewareresponse.middlewareResponse.jsonString(res, sourceMapString);
            }
        } catch (cause) {
            return _middlewareresponse.middlewareResponse.internalServerError(res, Object.defineProperty(new Error(`Failed to get source map for '${filename}'. This is a bug in Next.js`, {
                cause
            }), "__NEXT_ERROR_CODE", {
                value: "E719",
                enumerable: false,
                configurable: true
            }));
        }
        _middlewareresponse.middlewareResponse.noContent(res);
    };
}
async function getOriginalStackFrames({ project, projectPath, frames, isServer, isEdgeServer, isAppDirectory }) {
    const stackFrames = createStackFrames({
        frames,
        isServer,
        isEdgeServer,
        isAppDirectory
    });
    return Promise.all(stackFrames.map(async (frame)=>{
        try {
            const stackFrame = await createOriginalStackFrame(project, projectPath, frame);
            if (stackFrame === null) {
                return {
                    status: 'rejected',
                    reason: 'Failed to create original stack frame'
                };
            }
            return {
                status: 'fulfilled',
                value: stackFrame
            };
        } catch (error) {
            return {
                status: 'rejected',
                reason: (0, _nodeutil.inspect)(error, {
                    colors: false
                })
            };
        }
    }));
} //# sourceMappingURL=middleware-turbopack.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/source-map.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getConsoleLocation: null,
    getSourceMappedStackFrames: null,
    mapFramesUsingBundler: null,
    withLocation: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getConsoleLocation: function() {
        return getConsoleLocation;
    },
    getSourceMappedStackFrames: function() {
        return getSourceMappedStackFrames;
    },
    mapFramesUsingBundler: function() {
        return mapFramesUsingBundler;
    },
    withLocation: function() {
        return withLocation;
    }
});
const _middlewarewebpack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/middleware-webpack.js [app-client] (ecmascript)");
const _middlewareturbopack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/middleware-turbopack.js [app-client] (ecmascript)");
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _parsestack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/parse-stack.js [app-client] (ecmascript)");
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function mapFramesUsingBundler(frames, ctx) {
    switch(ctx.bundler){
        case 'webpack':
            {
                const { isServer, isEdgeServer, isAppDirectory, clientStats, serverStats, edgeServerStats, rootDirectory } = ctx;
                const res = await (0, _middlewarewebpack.getOriginalStackFrames)({
                    isServer,
                    isEdgeServer,
                    isAppDirectory,
                    frames,
                    clientStats,
                    serverStats,
                    edgeServerStats,
                    rootDirectory
                });
                return res;
            }
        case 'turbopack':
            {
                const { project, projectPath, isServer, isEdgeServer, isAppDirectory } = ctx;
                const res = await (0, _middlewareturbopack.getOriginalStackFrames)({
                    project,
                    projectPath,
                    frames,
                    isServer,
                    isEdgeServer,
                    isAppDirectory
                });
                return res;
            }
        default:
            {
                return null;
            }
    }
}
// converts _next/static/chunks/... to file:///.next/static/chunks/... for parseStack
// todo: where does next dev overlay handle this case and re-use that logic
function preprocessStackTrace(stackTrace, distDir) {
    return stackTrace.split('\n').map((line)=>{
        const match = line.match(/^(\s*at\s+.*?)\s+\(([^)]+)\)$/);
        if (match) {
            const [, prefix, location] = match;
            if (location.startsWith('_next/static/') && distDir) {
                const normalizedDistDir = distDir.replace(/\\/g, '/').replace(/\/$/, '');
                const absolutePath = normalizedDistDir + '/' + location.slice('_next/'.length);
                const fileUrl = `file://${_path.default.resolve(absolutePath)}`;
                return `${prefix} (${fileUrl})`;
            }
        }
        return line;
    }).join('\n');
}
const cache = new _lrucache.LRUCache(25);
async function getSourceMappedStackFramesInternal(stackTrace, ctx, distDir, ignore = true) {
    try {
        var _filteredFrames_find;
        const normalizedStack = preprocessStackTrace(stackTrace, distDir);
        const frames = (0, _parsestack.parseStack)(normalizedStack, distDir);
        if (frames.length === 0) {
            return {
                kind: 'stack',
                stack: stackTrace
            };
        }
        const mappingResults = await mapFramesUsingBundler(frames, ctx);
        const processedFrames = mappingResults.map((result, index)=>({
                result,
                originalFrame: frames[index]
            })).map(({ result, originalFrame })=>{
            var _originalStackFrame_file;
            if (result.status === 'rejected') {
                return {
                    kind: 'rejected',
                    frameText: formatStackFrame(originalFrame),
                    codeFrame: null
                };
            }
            const { originalStackFrame, originalCodeFrame } = result.value;
            if ((originalStackFrame == null ? void 0 : originalStackFrame.ignored) && ignore) {
                return {
                    kind: 'ignored'
                };
            }
            // should we apply this generally to dev overlay (dev overlay does not ignore chrome-extension://)
            if (originalStackFrame == null ? void 0 : (_originalStackFrame_file = originalStackFrame.file) == null ? void 0 : _originalStackFrame_file.startsWith('chrome-extension://')) {
                return {
                    kind: 'ignored'
                };
            }
            return {
                kind: 'success',
                // invariant: if result is not rejected and not ignored, then original stack frame exists
                // verifiable by tracing `getOriginalStackFrame`. The invariant exists because of bad types
                frameText: formatStackFrame(originalStackFrame),
                codeFrame: originalCodeFrame
            };
        });
        const allIgnored = processedFrames.every((frame)=>frame.kind === 'ignored');
        // we want to handle **all** ignored vs all/some rejected differently
        // if all are ignored we should show no frames
        // if all are rejected, we want to fallback to showing original stack frames
        if (allIgnored) {
            return {
                kind: 'all-ignored'
            };
        }
        const filteredFrames = processedFrames.filter((frame)=>frame.kind !== 'ignored');
        if (filteredFrames.length === 0) {
            return {
                kind: 'stack',
                stack: stackTrace
            };
        }
        const stackOutput = filteredFrames.map((frame)=>frame.frameText).join('\n');
        const firstFrameCode = (_filteredFrames_find = filteredFrames.find((frame)=>frame.codeFrame)) == null ? void 0 : _filteredFrames_find.codeFrame;
        if (firstFrameCode) {
            return {
                kind: 'with-frame-code',
                frameCode: firstFrameCode,
                stack: stackOutput,
                frames: filteredFrames
            };
        }
        // i don't think this a real case, but good for exhaustion
        return {
            kind: 'mapped-stack',
            stack: stackOutput,
            frames: filteredFrames
        };
    } catch (error) {
        return {
            kind: 'stack',
            stack: stackTrace
        };
    }
}
async function getSourceMappedStackFrames(stackTrace, ctx, distDir, ignore = true) {
    const cacheKey = `sm_${stackTrace}-${ctx.bundler}-${ctx.isAppDirectory}-${ctx.isEdgeServer}-${ctx.isServer}-${distDir}-${ignore}`;
    const cacheItem = cache.get(cacheKey);
    if (cacheItem) {
        return cacheItem;
    }
    const result = await getSourceMappedStackFramesInternal(stackTrace, ctx, distDir, ignore);
    cache.set(cacheKey, result);
    return result;
}
function formatStackFrame(frame) {
    const functionName = frame.methodName || '<anonymous>';
    const location = frame.file && frame.line1 ? `${frame.file}:${frame.line1}${frame.column1 ? `:${frame.column1}` : ''}` : frame.file || '<unknown>';
    return `    at ${functionName} (${location})`;
}
const withLocation = async ({ original, stack }, ctx, distDir, config)=>{
    if (typeof config === 'object' && config.showSourceLocation === false) {
        return original;
    }
    if (!stack) {
        return original;
    }
    const res = await getSourceMappedStackFrames(stack, ctx, distDir);
    const location = getConsoleLocation(res);
    if (!location) {
        return original;
    }
    return [
        ...original,
        (0, _picocolors.dim)(`(${location})`)
    ];
};
const getConsoleLocation = (mapped)=>{
    if (mapped.kind !== 'mapped-stack' && mapped.kind !== 'with-frame-code') {
        return null;
    }
    const first = mapped.frames.at(0);
    if (!first) {
        return null;
    }
    // we don't want to show the name of parent function (at <fn> thing in stack), just source location for minimal noise
    const match = first.frameText.match(/\(([^)]+)\)/);
    const locationText = match ? match[1] : first.frameText;
    return locationText;
}; //# sourceMappingURL=source-map.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/receive-logs.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    handleClientFileLogs: null,
    handleLog: null,
    receiveBrowserLogsTurbopack: null,
    receiveBrowserLogsWebpack: null,
    restoreUndefined: null,
    stripFormatSpecifiers: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleClientFileLogs: function() {
        return handleClientFileLogs;
    },
    handleLog: function() {
        return handleLog;
    },
    receiveBrowserLogsTurbopack: function() {
        return receiveBrowserLogsTurbopack;
    },
    receiveBrowserLogsWebpack: function() {
        return receiveBrowserLogsWebpack;
    },
    restoreUndefined: function() {
        return restoreUndefined;
    },
    stripFormatSpecifiers: function() {
        return stripFormatSpecifiers;
    }
});
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _util = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/util/util.js [app-client] (ecmascript)"));
const _sourcemap = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/source-map.js [app-client] (ecmascript)");
const _forwardlogsshared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/forward-logs-shared.js [app-client] (ecmascript)");
const _console = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/lib/console.js [app-client] (ecmascript)");
const _filelogger = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/file-logger.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function restoreUndefined(x) {
    if (x === _forwardlogsshared.UNDEFINED_MARKER) return undefined;
    if (Array.isArray(x)) return x.map(restoreUndefined);
    if (x && typeof x === 'object') {
        for(let k in x){
            x[k] = restoreUndefined(x[k]);
        }
    }
    return x;
}
function cleanConsoleArgsForFileLogging(args) {
    /**
   * Use formatConsoleArgs to strip out background and color format specifiers
   * and keep only the original string content for file logging
   */ try {
        return (0, _console.formatConsoleArgs)(args);
    } catch  {
        // Fallback to simple string conversion if formatting fails
        return args.map((arg)=>typeof arg === 'string' ? arg : _util.default.inspect(arg, {
                depth: 2
            })).join(' ');
    }
}
const methods = [
    'log',
    'info',
    'warn',
    'debug',
    'table',
    'error',
    'assert',
    'dir',
    'dirxml',
    'group',
    'groupCollapsed',
    'groupEnd'
];
const methodsToSkipInspect = new Set([
    'table',
    'dir',
    'dirxml',
    'group',
    'groupCollapsed',
    'groupEnd'
]);
// we aren't overriding console, we're just making a (slightly convoluted) helper for replaying user console methods
const forwardConsole = {
    ...console,
    ...Object.fromEntries(methods.map((method)=>[
            method,
            (...args)=>console[method](...args.map((arg)=>methodsToSkipInspect.has(method) || typeof arg !== 'object' || arg === null ? arg : _util.default.inspect(arg, {
                        depth: Infinity,
                        colors: true
                    })))
        ]))
};
async function deserializeArgData(arg) {
    try {
        // we want undefined to be represented as it would be in the browser from the user's perspective (otherwise it would be stripped away/shown as null)
        if (arg === _forwardlogsshared.UNDEFINED_MARKER) {
            return restoreUndefined(arg);
        }
        return restoreUndefined(JSON.parse(arg));
    } catch  {
        return arg;
    }
}
const colorError = (mapped, config)=>{
    const colorFn = (config == null ? void 0 : config.applyColor) === undefined || config.applyColor ? _picocolors.red : (x)=>x;
    switch(mapped.kind){
        case 'mapped-stack':
        case 'stack':
            {
                return ((config == null ? void 0 : config.prefix) ? colorFn(config == null ? void 0 : config.prefix) : '') + `\n${colorFn(mapped.stack)}`;
            }
        case 'with-frame-code':
            {
                return ((config == null ? void 0 : config.prefix) ? colorFn(config == null ? void 0 : config.prefix) : '') + `\n${colorFn(mapped.stack)}\n${mapped.frameCode}`;
            }
        // a more sophisticated version of this allows the user to config if they want ignored frames (but we need to be sure to source map them)
        case 'all-ignored':
            {
                return (config == null ? void 0 : config.prefix) ? colorFn(config == null ? void 0 : config.prefix) : '';
            }
        default:
            {}
    }
    mapped;
};
function processConsoleFormatStrings(args) {
    /**
   * this handles the case formatting is applied to the console log
   * otherwise we will see the format specifier directly in the terminal output
   */ if (args.length > 0 && typeof args[0] === 'string') {
        const formatString = args[0];
        if (formatString.includes('%s') || formatString.includes('%d') || formatString.includes('%i') || formatString.includes('%f') || formatString.includes('%o') || formatString.includes('%O') || formatString.includes('%c')) {
            try {
                const formatted = _util.default.format(...args);
                return [
                    formatted
                ];
            } catch  {
                return args;
            }
        }
    }
    return args;
}
function stripFormatSpecifiers(args) {
    if (args.length === 0 || typeof args[0] !== 'string') return args;
    const fmtIn = String(args[0]);
    const rest = args.slice(1);
    if (!fmtIn.includes('%')) return args;
    let fmtOut = '';
    let argPtr = 0;
    for(let i = 0; i < fmtIn.length; i++){
        if (fmtIn[i] !== '%') {
            fmtOut += fmtIn[i];
            continue;
        }
        if (fmtIn[i + 1] === '%') {
            fmtOut += '%';
            i++;
            continue;
        }
        const token = fmtIn[++i];
        if (!token) {
            fmtOut += '%';
            continue;
        }
        if ('csdifoOj'.includes(token) || token === 'O') {
            if (argPtr < rest.length) {
                if (token === 'c') {
                    argPtr++;
                } else if (token === 'o' || token === 'O' || token === 'j') {
                    const obj = rest[argPtr++];
                    fmtOut += _util.default.inspect(obj, {
                        depth: 2,
                        colors: false
                    });
                } else {
                    // string(...) is safe for remaining specifiers
                    fmtOut += String(rest[argPtr++]);
                }
            }
            continue;
        }
        fmtOut += '%' + token;
    }
    const result = [
        fmtOut
    ];
    if (argPtr < rest.length) {
        result.push(...rest.slice(argPtr));
    }
    return result;
}
async function prepareFormattedErrorArgs(entry, ctx, distDir) {
    const mapped = await (0, _sourcemap.getSourceMappedStackFrames)(entry.stack, ctx, distDir);
    return [
        colorError(mapped, {
            prefix: entry.prefix
        })
    ];
}
async function prepareConsoleArgs(entry, ctx, distDir) {
    const deserialized = await Promise.all(entry.args.map(async (arg)=>{
        if (arg.kind === 'arg') {
            const data = await deserializeArgData(arg.data);
            if (entry.method === 'warn' && typeof data === 'string') {
                return (0, _picocolors.yellow)(data);
            }
            return data;
        }
        if (!arg.stack) return (0, _picocolors.red)(arg.prefix);
        const mapped = await (0, _sourcemap.getSourceMappedStackFrames)(arg.stack, ctx, distDir);
        return colorError(mapped, {
            prefix: arg.prefix,
            applyColor: false
        });
    }));
    return processConsoleFormatStrings(deserialized);
}
async function prepareConsoleErrorArgs(entry, ctx, distDir) {
    const deserialized = await Promise.all(entry.args.map(async (arg)=>{
        if (arg.kind === 'arg') {
            if (arg.isRejectionMessage) return (0, _picocolors.red)(arg.data);
            return deserializeArgData(arg.data);
        }
        if (!arg.stack) return (0, _picocolors.red)(arg.prefix);
        const mapped = await (0, _sourcemap.getSourceMappedStackFrames)(arg.stack, ctx, distDir);
        return colorError(mapped, {
            prefix: arg.prefix
        });
    }));
    const mappedStack = await (0, _sourcemap.getSourceMappedStackFrames)(entry.consoleErrorStack, ctx, distDir);
    /**
   * don't show the stack + codeblock when there are errors present, since:
   * - it will look overwhelming to see 2 stacks and 2 code blocks
   * - the user already knows where the console.error is at because we append the location
   */ const location = (0, _sourcemap.getConsoleLocation)(mappedStack);
    if (entry.args.some((a)=>a.kind === 'formatted-error-arg')) {
        const result = stripFormatSpecifiers(deserialized);
        if (location) {
            result.push((0, _picocolors.dim)(`(${location})`));
        }
        return result;
    }
    const result = [
        ...processConsoleFormatStrings(deserialized),
        colorError(mappedStack)
    ];
    if (location) {
        result.push((0, _picocolors.dim)(`(${location})`));
    }
    return result;
}
async function handleTable(entry, browserPrefix, ctx, distDir) {
    const deserializedArgs = await Promise.all(entry.args.map(async (arg)=>{
        if (arg.kind === 'formatted-error-arg') {
            return {
                stack: arg.stack
            };
        }
        return deserializeArgData(arg.data);
    }));
    const location = await (async ()=>{
        if (!entry.consoleMethodStack) {
            return;
        }
        const frames = await (0, _sourcemap.getSourceMappedStackFrames)(entry.consoleMethodStack, ctx, distDir);
        return (0, _sourcemap.getConsoleLocation)(frames);
    })();
    // we can't inline pass browser prefix, but it looks better multiline for table anyways
    forwardConsole.log(browserPrefix);
    forwardConsole.table(...deserializedArgs);
    if (location) {
        forwardConsole.log((0, _picocolors.dim)(`(${location})`));
    }
}
async function handleTrace(entry, browserPrefix, ctx, distDir) {
    const deserializedArgs = await Promise.all(entry.args.map(async (arg)=>{
        if (arg.kind === 'formatted-error-arg') {
            if (!arg.stack) return (0, _picocolors.red)(arg.prefix);
            const mapped = await (0, _sourcemap.getSourceMappedStackFrames)(arg.stack, ctx, distDir);
            return colorError(mapped, {
                prefix: arg.prefix
            });
        }
        return deserializeArgData(arg.data);
    }));
    if (!entry.consoleMethodStack) {
        forwardConsole.log(browserPrefix, ...deserializedArgs, '[Trace unavailable]');
        return;
    }
    // TODO(rob): refactor so we can re-use result and not re-run the entire source map to avoid trivial post processing
    const [mapped, mappedIgnored] = await Promise.all([
        (0, _sourcemap.getSourceMappedStackFrames)(entry.consoleMethodStack, ctx, distDir, false),
        (0, _sourcemap.getSourceMappedStackFrames)(entry.consoleMethodStack, ctx, distDir)
    ]);
    const location = (0, _sourcemap.getConsoleLocation)(mappedIgnored);
    forwardConsole.log(browserPrefix, ...deserializedArgs, `\n${mapped.stack}`, ...location ? [
        `\n${(0, _picocolors.dim)(`(${location})`)}`
    ] : []);
}
async function handleDir(entry, browserPrefix, ctx, distDir) {
    const loggableEntry = await prepareConsoleArgs(entry, ctx, distDir);
    const consoleMethod = forwardConsole[entry.method] || forwardConsole.log;
    if (entry.consoleMethodStack) {
        const mapped = await (0, _sourcemap.getSourceMappedStackFrames)(entry.consoleMethodStack, ctx, distDir);
        const location = (0, _picocolors.dim)(`(${(0, _sourcemap.getConsoleLocation)(mapped)})`);
        const originalWrite = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout.write.bind(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout);
        let captured = '';
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout.write = (chunk)=>{
            captured += chunk;
            return true;
        };
        try {
            consoleMethod(...loggableEntry);
        } finally{
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout.write = originalWrite;
        }
        const preserved = captured.replace(/\r?\n$/, '');
        originalWrite(`${browserPrefix}${preserved} ${location}\n`);
        return;
    }
    consoleMethod(browserPrefix, ...loggableEntry);
}
async function handleDefaultConsole(entry, browserPrefix, ctx, distDir, config, isServerLog) {
    const consoleArgs = await prepareConsoleArgs(entry, ctx, distDir);
    const withStackEntry = await (0, _sourcemap.withLocation)({
        original: consoleArgs,
        stack: entry.consoleMethodStack || null
    }, ctx, distDir, config);
    const consoleMethod = forwardConsole[entry.method] || forwardConsole.log;
    consoleMethod(browserPrefix, ...withStackEntry);
    // Process enqueued logs and write to file
    // Log to file with correct source based on context
    const fileLogger = (0, _filelogger.getFileLogger)();
    // Use cleaned console args to strip out background and color format specifiers
    const message = cleanConsoleArgsForFileLogging(consoleArgs);
    if (isServerLog) {
        fileLogger.logServer(entry.method.toUpperCase(), message);
    } else {
        fileLogger.logBrowser(entry.method.toUpperCase(), message);
    }
}
async function handleLog(entries, ctx, distDir, config) {
    // Determine the source based on the context
    const isServerLog = ctx.isServer || ctx.isEdgeServer;
    const browserPrefix = isServerLog ? (0, _picocolors.cyan)('[server]') : (0, _picocolors.cyan)('[browser]');
    const fileLogger = (0, _filelogger.getFileLogger)();
    for (const entry of entries){
        try {
            switch(entry.kind){
                case 'console':
                    {
                        switch(entry.method){
                            case 'table':
                                {
                                    // timeout based abort on source mapping result
                                    await handleTable(entry, browserPrefix, ctx, distDir);
                                    break;
                                }
                            // ignore frames
                            case 'trace':
                                {
                                    await handleTrace(entry, browserPrefix, ctx, distDir);
                                    break;
                                }
                            case 'dir':
                                {
                                    await handleDir(entry, browserPrefix, ctx, distDir);
                                    break;
                                }
                            case 'dirxml':
                                {
                                // xml log thing maybe needs an impl
                                // fallthrough
                                }
                            case 'group':
                            case 'groupCollapsed':
                            case 'groupEnd':
                                {
                                // [browser] undefined (app/page.tsx:8:11) console.group
                                // fallthrough
                                }
                            case 'assert':
                                {
                                // check console assert
                                // fallthrough
                                }
                            case 'log':
                            case 'info':
                            case 'debug':
                            case 'error':
                            case 'warn':
                                {
                                    await handleDefaultConsole(entry, browserPrefix, ctx, distDir, config, isServerLog);
                                    break;
                                }
                            default:
                                {
                                    entry;
                                }
                        }
                        break;
                    }
                // any logged errors are anything that are logged as "red" in the browser but aren't only an Error (console.error, Promise.reject(100))
                case 'any-logged-error':
                    {
                        const consoleArgs = await prepareConsoleErrorArgs(entry, ctx, distDir);
                        forwardConsole.error(browserPrefix, ...consoleArgs);
                        // Process enqueued logs and write to file
                        fileLogger.logBrowser('ERROR', cleanConsoleArgsForFileLogging(consoleArgs));
                        break;
                    }
                // formatted error is an explicit error event (rejections, uncaught errors)
                case 'formatted-error':
                    {
                        const formattedArgs = await prepareFormattedErrorArgs(entry, ctx, distDir);
                        forwardConsole.error(browserPrefix, ...formattedArgs);
                        // Process enqueued logs and write to file
                        fileLogger.logBrowser('ERROR', cleanConsoleArgsForFileLogging(formattedArgs));
                        break;
                    }
                default:
                    {}
            }
        } catch  {
            switch(entry.kind){
                case 'any-logged-error':
                    {
                        const consoleArgs = await prepareConsoleErrorArgs(entry, ctx, distDir);
                        forwardConsole.error(browserPrefix, ...consoleArgs);
                        // Process enqueued logs and write to file
                        fileLogger.logBrowser('ERROR', cleanConsoleArgsForFileLogging(consoleArgs));
                        break;
                    }
                case 'console':
                    {
                        const consoleMethod = forwardConsole[entry.method] || forwardConsole.log;
                        const consoleArgs = await prepareConsoleArgs(entry, ctx, distDir);
                        consoleMethod(browserPrefix, ...consoleArgs);
                        // Process enqueued logs and write to file
                        fileLogger.logBrowser('ERROR', cleanConsoleArgsForFileLogging(consoleArgs));
                        break;
                    }
                case 'formatted-error':
                    {
                        forwardConsole.error(browserPrefix, `${entry.prefix}\n`, entry.stack);
                        // Process enqueued logs and write to file
                        fileLogger.logBrowser('ERROR', cleanConsoleArgsForFileLogging([
                            `${entry.prefix}\n${entry.stack}`
                        ]));
                        break;
                    }
                default:
                    {}
            }
        }
    }
}
async function receiveBrowserLogsWebpack(opts) {
    const { entries, router, sourceType, clientStats, serverStats, edgeServerStats, rootDirectory, distDir } = opts;
    const isAppDirectory = router === 'app';
    const isServer = sourceType === 'server';
    const isEdgeServer = sourceType === 'edge-server';
    const ctx = {
        bundler: 'webpack',
        isServer,
        isEdgeServer,
        isAppDirectory,
        clientStats,
        serverStats,
        edgeServerStats,
        rootDirectory
    };
    await handleLog(entries, ctx, distDir, opts.config);
}
async function receiveBrowserLogsTurbopack(opts) {
    const { entries, router, sourceType, project, projectPath, distDir } = opts;
    const isAppDirectory = router === 'app';
    const isServer = sourceType === 'server';
    const isEdgeServer = sourceType === 'edge-server';
    const ctx = {
        bundler: 'turbopack',
        project,
        projectPath,
        isServer,
        isEdgeServer,
        isAppDirectory
    };
    await handleLog(entries, ctx, distDir, opts.config);
}
async function handleClientFileLogs(logs) {
    const fileLogger = (0, _filelogger.getFileLogger)();
    for (const log of logs){
        fileLogger.logBrowser(log.level, log.message);
    }
} //# sourceMappingURL=receive-logs.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/debug-channel.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    connectReactDebugChannel: null,
    connectReactDebugChannelForHtmlRequest: null,
    deleteReactDebugChannelForHtmlRequest: null,
    setReactDebugChannelForHtmlRequest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    connectReactDebugChannel: function() {
        return connectReactDebugChannel;
    },
    connectReactDebugChannelForHtmlRequest: function() {
        return connectReactDebugChannelForHtmlRequest;
    },
    deleteReactDebugChannelForHtmlRequest: function() {
        return deleteReactDebugChannelForHtmlRequest;
    },
    setReactDebugChannelForHtmlRequest: function() {
        return setReactDebugChannelForHtmlRequest;
    }
});
const _nodewebstreamshelper = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/stream-utils/node-web-streams-helper.js [app-client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const reactDebugChannelsByHtmlRequestId = new Map();
function connectReactDebugChannel(requestId, debugChannel, sendToClient) {
    const reader = debugChannel.readable.pipeThrough((0, _nodewebstreamshelper.createBufferedTransformStream)({
        maxBufferByteLength: 128 * 1024
    })).getReader();
    const stop = ()=>{
        sendToClient({
            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK,
            requestId,
            chunk: null
        });
    };
    const onError = (err)=>{
        console.error(Object.defineProperty(new Error('React debug channel stream error', {
            cause: err
        }), "__NEXT_ERROR_CODE", {
            value: "E810",
            enumerable: false,
            configurable: true
        }));
        stop();
    };
    const progress = (entry)=>{
        if (entry.done) {
            stop();
        } else {
            sendToClient({
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK,
                requestId,
                chunk: entry.value
            });
            reader.read().then(progress, onError);
        }
    };
    reader.read().then(progress, onError);
}
function connectReactDebugChannelForHtmlRequest(htmlRequestId, sendToClient) {
    const debugChannel = reactDebugChannelsByHtmlRequestId.get(htmlRequestId);
    if (!debugChannel) {
        return;
    }
    reactDebugChannelsByHtmlRequestId.delete(htmlRequestId);
    connectReactDebugChannel(htmlRequestId, debugChannel, sendToClient);
}
function setReactDebugChannelForHtmlRequest(htmlRequestId, debugChannel) {
    // TODO: Clean up after a timeout, in case the client never connects, e.g.
    // when CURL'ing the page, or loading the page with JavaScript disabled etc.
    reactDebugChannelsByHtmlRequestId.set(htmlRequestId, debugChannel);
}
function deleteReactDebugChannelForHtmlRequest(htmlRequestId) {
    reactDebugChannelsByHtmlRequestId.delete(htmlRequestId);
} //# sourceMappingURL=debug-channel.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/parse-version-info.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseVersionInfo", {
    enumerable: true,
    get: function() {
        return parseVersionInfo;
    }
});
const _semver = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/semver/index.js [app-client] (ecmascript)"));
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
function parseVersionInfo(o) {
    const latest = _semver.parse(o.latest);
    const canary = _semver.parse(o.canary);
    const installedParsed = _semver.parse(o.installed);
    const installed = o.installed;
    if (installedParsed && latest && canary) {
        if (installedParsed.major < latest.major) {
            // Old major version
            return {
                staleness: 'stale-major',
                expected: latest.raw,
                installed
            };
        } else if (installedParsed.prerelease[0] === 'canary' && _semver.lt(installedParsed, canary)) {
            // Matching major, but old canary
            return {
                staleness: 'stale-prerelease',
                expected: canary.raw,
                installed
            };
        } else if (!installedParsed.prerelease.length && _semver.lt(installedParsed, latest)) {
            // Stable, but not the latest
            if (installedParsed.minor === latest.minor) {
                // Same major and minor, but not the latest patch
                return {
                    staleness: 'stale-patch',
                    expected: latest.raw,
                    installed
                };
            }
            return {
                staleness: 'stale-minor',
                expected: latest.raw,
                installed
            };
        } else if (_semver.gt(installedParsed, latest) && installedParsed.version !== canary.version) {
            // Newer major version
            return {
                staleness: 'newer-than-npm',
                installed
            };
        } else {
            // Latest and greatest
            return {
                staleness: 'fresh',
                installed
            };
        }
    }
    return {
        installed: (installedParsed == null ? void 0 : installedParsed.raw) ?? '0.0.0',
        staleness: 'unknown'
    };
} //# sourceMappingURL=parse-version-info.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-shared-utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getVersionInfo: null,
    matchNextPageBundleRequest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getVersionInfo: function() {
        return getVersionInfo;
    },
    matchNextPageBundleRequest: function() {
        return matchNextPageBundleRequest;
    }
});
const _pathmatch = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/path-match.js [app-client] (ecmascript)");
const _parseversioninfo = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/parse-version-info.js [app-client] (ecmascript)");
const matchNextPageBundleRequest = (0, _pathmatch.getPathMatch)('/_next/static/chunks/pages/:path*.js(\\.map|)');
async function getVersionInfo() {
    let installed = '0.0.0';
    try {
        installed = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/package.json (json)").version;
        let res;
        try {
            // use NPM registry regardless user using Yarn
            res = await fetch('https://registry.npmjs.org/-/package/next/dist-tags');
        } catch  {
        // ignore fetch errors
        }
        if (!res || !res.ok) return {
            installed,
            staleness: 'unknown'
        };
        const { latest, canary } = await res.json();
        return (0, _parseversioninfo.parseVersionInfo)({
            installed,
            latest,
            canary
        });
    } catch (e) {
        console.error(e);
        return {
            installed,
            staleness: 'unknown'
        };
    }
} //# sourceMappingURL=hot-reloader-shared-utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-webpack.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    renderScriptError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return HotReloaderWebpack;
    },
    renderScriptError: function() {
        return renderScriptError;
    }
});
const _webpack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/webpack/webpack.js [app-client] (ecmascript)");
const _middlewarewebpack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/middleware-webpack.js [app-client] (ecmascript)");
const _hotmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-middleware.js [app-client] (ecmascript)");
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _entries = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/entries.js [app-client] (ecmascript)");
const _getstaticinfoincludinglayouts = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/get-static-info-including-layouts.js [app-client] (ecmascript)");
const _output = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/index.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _webpackconfig = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack-config.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
const _recursivedelete = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/recursive-delete.js [app-client] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _findpagefile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/find-page-file.js [app-client] (ecmascript)");
const _ondemandentryhandler = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/on-demand-entry-handler.js [app-client] (ecmascript)");
const _denormalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/denormalize-page-path.js [app-client] (ecmascript)");
const _normalizepathsep = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [app-client] (ecmascript)");
const _getroutefromentrypoint = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/get-route-from-entrypoint.js [app-client] (ecmascript)"));
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _trace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/index.js [app-client] (ecmascript)");
const _iserror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)");
const _ws = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/ws/index.js [app-client] (ecmascript)"));
const _fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _isapiroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-api-route.js [app-client] (ecmascript)");
const _nextrouteloader = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js [app-client] (ecmascript)");
const _isinternalcomponent = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-internal-component.js [app-client] (ecmascript)");
const _routekind = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-kind.js [app-client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const _pagetypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/page-types.js [app-client] (ecmascript)");
const _messages = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/messages.js [app-client] (ecmascript)");
const _utils2 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/utils.js [app-client] (ecmascript)");
const _getnexterrorfeedbackmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/get-next-error-feedback-middleware.js [app-client] (ecmascript)");
const _getdevoverlayfontmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/font/get-dev-overlay-font-middleware.js [app-client] (ecmascript)");
const _devindicatormiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/dev-indicator-middleware.js [app-client] (ecmascript)");
const _getwebpackbundler = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/get-webpack-bundler.js [app-client] (ecmascript)"));
const _restartdevservermiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/restart-dev-server-middleware.js [app-client] (ecmascript)");
const _cacheinvalidation = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/cache-invalidation.js [app-client] (ecmascript)");
const _receivelogs = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/receive-logs.js [app-client] (ecmascript)");
const _devtoolsconfigmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/devtools-config-middleware.js [app-client] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)");
const _debugchannel = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/debug-channel.js [app-client] (ecmascript)");
const _hotreloadersharedutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-shared-utils.js [app-client] (ecmascript)");
const _getmcpmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/get-mcp-middleware.js [app-client] (ecmascript)");
const _formaterrors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/tools/utils/format-errors.js [app-client] (ecmascript)");
const _mcptelemetrytracker = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/mcp-telemetry-tracker.js [app-client] (ecmascript)");
const _filelogger = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/file-logger.js [app-client] (ecmascript)");
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
const MILLISECONDS_IN_NANOSECOND = BigInt(1000000);
function diff(a, b) {
    return new Set([
        ...a
    ].filter((v)=>!b.has(v)));
}
const wsServer = new _ws.default.Server({
    noServer: true
});
async function renderScriptError(res, error, { verbose = true } = {}) {
    // Asks CDNs and others to not to cache the errored page
    res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    if (error.code === 'ENOENT') {
        return {
            finished: undefined
        };
    }
    if (verbose) {
        console.error(error.stack);
    }
    res.statusCode = 500;
    res.end('500 - Internal Error');
    return {
        finished: true
    };
}
function addCorsSupport(req, res) {
    // Only rewrite CORS handling when URL matches a hot-reloader middleware
    if (!req.url.startsWith('/__next')) {
        return {
            preflight: false
        };
    }
    if (!req.headers.origin) {
        return {
            preflight: false
        };
    }
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    // Based on https://github.com/primus/access-control/blob/4cf1bc0e54b086c91e6aa44fb14966fa5ef7549c/index.js#L158
    if (req.headers['access-control-request-headers']) {
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    }
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return {
            preflight: true
        };
    }
    return {
        preflight: false
    };
}
// Iteratively look up the issuer till it ends up at the root
function findEntryModule(module1, compilation) {
    for(;;){
        const issuer = compilation.moduleGraph.getIssuer(module1);
        if (!issuer) return module1;
        module1 = issuer;
    }
}
function erroredPages(compilation) {
    const failedPages = {};
    for (const error of compilation.errors){
        if (!error.module) {
            continue;
        }
        const entryModule = findEntryModule(error.module, compilation);
        const { name } = entryModule;
        if (!name) {
            continue;
        }
        // Only pages have to be reloaded
        const enhancedName = (0, _getroutefromentrypoint.default)(name);
        if (!enhancedName) {
            continue;
        }
        if (!failedPages[enhancedName]) {
            failedPages[enhancedName] = [];
        }
        failedPages[enhancedName].push(error);
    }
    return failedPages;
}
class HotReloaderWebpack {
    constructor(dir, { config, isSrcDir, pagesDir, distDir, buildId, encryptionKey, previewProps, rewrites, appDir, telemetry, resetFetch, lockfile, onDevServerCleanup }){
        this.clientError = null;
        this.serverError = null;
        this.hmrServerError = null;
        this.pagesMapping = {};
        this.versionInfo = {
            staleness: 'unknown',
            installed: '0.0.0'
        };
        this.reloadAfterInvalidation = false;
        this.cacheStatusesByRequestId = new Map();
        this.hasAppRouterEntrypoints = false;
        this.hasPagesRouterEntrypoints = false;
        this.buildId = buildId;
        this.encryptionKey = encryptionKey;
        this.dir = dir;
        this.isSrcDir = isSrcDir;
        this.middlewares = [];
        this.pagesDir = pagesDir;
        this.appDir = appDir;
        this.distDir = distDir;
        this.clientStats = null;
        this.serverStats = null;
        this.edgeServerStats = null;
        this.serverPrevDocumentHash = null;
        this.telemetry = telemetry;
        this.resetFetch = resetFetch;
        this.lockfile = lockfile;
        this.config = config;
        this.previewProps = previewProps;
        this.rewrites = rewrites;
        this.hotReloaderSpan = (0, _trace.trace)('hot-reloader', undefined, {
            version: "16.0.7"
        });
        // Ensure the hotReloaderSpan is flushed immediately as it's the parentSpan for all processing
        // of the current `next dev` invocation.
        this.hotReloaderSpan.stop();
        // Initialize log monitor for file logging
        // Enable logging by default in development mode
        const mcpServerEnabled = !!config.experimental.mcpServer;
        const fileLogger = (0, _filelogger.getFileLogger)();
        fileLogger.initialize(this.distDir, mcpServerEnabled);
        onDevServerCleanup == null ? void 0 : onDevServerCleanup(async ()=>{
            await (lockfile == null ? void 0 : lockfile.unlock());
        });
    }
    async run(req, res, parsedUrl) {
        // Usually CORS support is not needed for the hot-reloader (this is dev only feature)
        // With when the app runs for multi-zones support behind a proxy,
        // the current page is trying to access this URL via assetPrefix.
        // That's when the CORS support is needed.
        const { preflight } = addCorsSupport(req, res);
        if (preflight) {
            return {};
        }
        // When a request comes in that is a page bundle, e.g. /_next/static/<buildid>/pages/index.js
        // we have to compile the page using on-demand-entries, this middleware will handle doing that
        // by adding the page to on-demand-entries, waiting till it's done
        // and then the bundle will be served like usual by the actual route in server/index.js
        const handlePageBundleRequest = async (pageBundleRes, parsedPageBundleUrl)=>{
            const { pathname } = parsedPageBundleUrl;
            if (!pathname) return {};
            const params = (0, _hotreloadersharedutils.matchNextPageBundleRequest)(pathname);
            if (!params) return {};
            let decodedPagePath;
            try {
                decodedPagePath = `/${params.path.map((param)=>decodeURIComponent(param)).join('/')}`;
            } catch (_) {
                throw Object.defineProperty(new _utils1.DecodeError('failed to decode param'), "__NEXT_ERROR_CODE", {
                    value: "E528",
                    enumerable: false,
                    configurable: true
                });
            }
            const page = (0, _denormalizepagepath.denormalizePagePath)(decodedPagePath);
            if (page === '/_error' || _constants1.BLOCKED_PAGES.indexOf(page) === -1) {
                try {
                    await this.ensurePage({
                        page,
                        clientOnly: true,
                        url: req.url
                    });
                } catch (error) {
                    return await renderScriptError(pageBundleRes, (0, _iserror.getProperError)(error));
                }
                const errors = await this.getCompilationErrors(page);
                if (errors.length > 0) {
                    return await renderScriptError(pageBundleRes, errors[0], {
                        verbose: false
                    });
                }
            }
            return {};
        };
        const { finished } = await handlePageBundleRequest(res, parsedUrl);
        for (const middleware of this.middlewares){
            let calledNext = false;
            await middleware(req, res, ()=>{
                calledNext = true;
            });
            if (!calledNext) {
                return {
                    finished: true
                };
            }
        }
        return {
            finished
        };
    }
    setHmrServerError(error) {
        this.hmrServerError = error;
    }
    clearHmrServerError() {
        if (this.hmrServerError) {
            this.setHmrServerError(null);
            this.send({
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                data: 'clear hmr server error'
            });
        }
    }
    async refreshServerComponents(hash) {
        this.send({
            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_COMPONENT_CHANGES,
            hash
        });
    }
    onHMR(req, _socket, head, callback) {
        wsServer.handleUpgrade(req, req.socket, head, (client)=>{
            var _this_onDemandEntries;
            const htmlRequestId = req.url ? new URL(req.url, 'http://n').searchParams.get('id') : null;
            if (!this.webpackHotMiddleware) {
                throw Object.defineProperty(new _invarianterror.InvariantError('Did not start HotReloaderWebpack.'), "__NEXT_ERROR_CODE", {
                    value: "E804",
                    enumerable: false,
                    configurable: true
                });
            }
            this.webpackHotMiddleware.onHMR(client, htmlRequestId);
            (_this_onDemandEntries = this.onDemandEntries) == null ? void 0 : _this_onDemandEntries.onHMR(client, ()=>this.hmrServerError);
            const enableCacheComponents = this.config.cacheComponents;
            // Clients with a request ID are inferred App Router clients. If Cache
            // Components is not enabled, we consider those legacy clients. Pages
            // Router clients are also considered legacy clients. TODO: Maybe mark
            // clients as App Router / Pages Router clients explicitly, instead of
            // inferring it from the presence of a request ID.
            const isLegacyClient = !htmlRequestId || !enableCacheComponents;
            callback(client, {
                isLegacyClient
            });
            client.addEventListener('message', async ({ data })=>{
                data = typeof data !== 'string' ? data.toString() : data;
                try {
                    const payload = JSON.parse(data);
                    let traceChild;
                    switch(payload.event){
                        case 'span-end':
                            {
                                traceChild = {
                                    name: payload.spanName,
                                    startTime: BigInt(Math.floor(payload.startTime)) * MILLISECONDS_IN_NANOSECOND,
                                    attrs: payload.attributes,
                                    endTime: BigInt(Math.floor(payload.endTime)) * MILLISECONDS_IN_NANOSECOND
                                };
                                break;
                            }
                        case 'client-hmr-latency':
                            {
                                traceChild = {
                                    name: payload.event,
                                    startTime: BigInt(payload.startTime) * MILLISECONDS_IN_NANOSECOND,
                                    endTime: BigInt(payload.endTime) * MILLISECONDS_IN_NANOSECOND,
                                    attrs: {
                                        updatedModules: payload.updatedModules.map((m)=>m.replace(`(${_constants.WEBPACK_LAYERS.appPagesBrowser})/`, '').replace(/^\.\//, '[project]/')),
                                        page: payload.page,
                                        isPageHidden: payload.isPageHidden
                                    }
                                };
                                break;
                            }
                        case 'client-reload-page':
                        case 'client-success':
                            {
                                traceChild = {
                                    name: payload.event
                                };
                                break;
                            }
                        case 'client-error':
                            {
                                traceChild = {
                                    name: payload.event,
                                    attrs: {
                                        errorCount: payload.errorCount
                                    }
                                };
                                break;
                            }
                        case 'client-warning':
                            {
                                traceChild = {
                                    name: payload.event,
                                    attrs: {
                                        warningCount: payload.warningCount
                                    }
                                };
                                break;
                            }
                        case 'client-removed-page':
                        case 'client-added-page':
                            {
                                traceChild = {
                                    name: payload.event,
                                    attrs: {
                                        page: payload.page || ''
                                    }
                                };
                                break;
                            }
                        case 'client-full-reload':
                            {
                                const { event, stackTrace, hadRuntimeError } = payload;
                                traceChild = {
                                    name: event,
                                    attrs: {
                                        stackTrace: stackTrace ?? ''
                                    }
                                };
                                if (hadRuntimeError) {
                                    _log.warn(_messages.FAST_REFRESH_RUNTIME_RELOAD);
                                    break;
                                }
                                let fileMessage = '';
                                if (stackTrace) {
                                    var _exec;
                                    const file = (_exec = /Aborted because (.+) is not accepted/.exec(stackTrace)) == null ? void 0 : _exec[1];
                                    if (file) {
                                        // `file` is filepath in `pages/` but it can be a webpack url.
                                        // If it's a webpack loader URL, it will include the app-pages layer
                                        if (file.startsWith(`(${_constants.WEBPACK_LAYERS.appPagesBrowser})/`)) {
                                            const fileUrl = new URL(file, 'file://');
                                            const cwd = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd();
                                            const modules = fileUrl.searchParams.getAll('modules').map((filepath)=>filepath.slice(cwd.length + 1)).filter((filepath)=>!filepath.startsWith('node_modules'));
                                            if (modules.length > 0) {
                                                fileMessage = ` when ${modules.join(', ')} changed`;
                                            }
                                        } else if (file.startsWith(`(${_constants.WEBPACK_LAYERS.pagesDirBrowser})/`)) {
                                            const cleanedFilePath = file.slice(`(${_constants.WEBPACK_LAYERS.pagesDirBrowser})/`.length);
                                            fileMessage = ` when ${cleanedFilePath} changed`;
                                        } else {
                                            fileMessage = ` when ${file} changed`;
                                        }
                                    }
                                }
                                _log.warn(`Fast Refresh had to perform a full reload${fileMessage}. Read more: https://nextjs.org/docs/messages/fast-refresh-reload`);
                                break;
                            }
                        case 'browser-logs':
                            {
                                if (this.config.experimental.browserDebugInfoInTerminal) {
                                    await (0, _receivelogs.receiveBrowserLogsWebpack)({
                                        entries: payload.entries,
                                        router: payload.router,
                                        sourceType: payload.sourceType,
                                        clientStats: ()=>this.clientStats,
                                        serverStats: ()=>this.serverStats,
                                        edgeServerStats: ()=>this.edgeServerStats,
                                        rootDirectory: this.dir,
                                        distDir: this.distDir,
                                        config: this.config.experimental.browserDebugInfoInTerminal
                                    });
                                }
                                break;
                            }
                        case 'client-file-logs':
                            {
                                // Always log to file regardless of terminal flag
                                await (0, _receivelogs.handleClientFileLogs)(payload.logs);
                                break;
                            }
                        case 'ping':
                            {
                                break;
                            }
                        default:
                            {
                                break;
                            }
                    }
                    if (traceChild) {
                        this.hotReloaderSpan.manualTraceChild(traceChild.name, traceChild.startTime, traceChild.endTime, {
                            ...traceChild.attrs,
                            clientId: payload.id
                        });
                    }
                } catch (_) {
                // invalid WebSocket message
                }
            });
            if (htmlRequestId) {
                (0, _debugchannel.connectReactDebugChannelForHtmlRequest)(htmlRequestId, this.sendToClient.bind(this, client));
                if (enableCacheComponents) {
                    const status = this.cacheStatusesByRequestId.get(htmlRequestId);
                    if (status) {
                        this.sendToClient(client, {
                            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CACHE_INDICATOR,
                            state: status
                        });
                        this.cacheStatusesByRequestId.delete(htmlRequestId);
                    }
                }
            }
            client.on('close', ()=>{
                var _this_webpackHotMiddleware;
                (_this_webpackHotMiddleware = this.webpackHotMiddleware) == null ? void 0 : _this_webpackHotMiddleware.deleteClient(client, htmlRequestId);
                if (htmlRequestId) {
                    (0, _debugchannel.deleteReactDebugChannelForHtmlRequest)(htmlRequestId);
                }
            });
        });
    }
    async clean(span) {
        return span.traceChild('clean').traceAsyncFn(()=>(0, _recursivedelete.recursiveDeleteSyncWithAsyncRetries)((0, _path.join)(this.dir, this.config.distDir), /^(cache|lock)/));
    }
    async getWebpackConfig(span) {
        const webpackConfigSpan = span.traceChild('get-webpack-config');
        const pageExtensions = this.config.pageExtensions;
        return webpackConfigSpan.traceAsyncFn(async ()=>{
            const pagePaths = !this.pagesDir ? [] : await webpackConfigSpan.traceChild('get-page-paths').traceAsyncFn(()=>Promise.all([
                    (0, _findpagefile.findPageFile)(this.pagesDir, '/_app', pageExtensions, false),
                    (0, _findpagefile.findPageFile)(this.pagesDir, '/_document', pageExtensions, false)
                ]));
            this.pagesMapping = await webpackConfigSpan.traceChild('create-pages-mapping').traceAsyncFn(()=>(0, _entries.createPagesMapping)({
                    isDev: true,
                    pageExtensions: this.config.pageExtensions,
                    pagesType: _pagetypes.PAGE_TYPES.PAGES,
                    pagePaths: pagePaths.filter((i)=>typeof i === 'string'),
                    pagesDir: this.pagesDir,
                    appDir: this.appDir,
                    appDirOnly: Boolean(this.appDir && !this.pagesDir)
                }));
            const entrypoints = await webpackConfigSpan.traceChild('create-entrypoints').traceAsyncFn(()=>(0, _entries.createEntrypoints)({
                    appDir: this.appDir,
                    buildId: this.buildId,
                    config: this.config,
                    envFiles: [],
                    isDev: true,
                    pages: this.pagesMapping,
                    pagesDir: this.pagesDir,
                    previewMode: this.previewProps,
                    rootDir: this.dir,
                    pageExtensions: this.config.pageExtensions
                }));
            const commonWebpackOptions = {
                dev: true,
                buildId: this.buildId,
                encryptionKey: this.encryptionKey,
                config: this.config,
                pagesDir: this.pagesDir,
                rewrites: this.rewrites,
                originalRewrites: this.config._originalRewrites,
                originalRedirects: this.config._originalRedirects,
                runWebpackSpan: this.hotReloaderSpan,
                appDir: this.appDir,
                previewProps: this.previewProps
            };
            return webpackConfigSpan.traceChild('generate-webpack-config').traceAsyncFn(async ()=>{
                const info = await (0, _webpackconfig.loadProjectInfo)({
                    dir: this.dir,
                    config: commonWebpackOptions.config,
                    dev: true
                });
                return Promise.all([
                    // order is important here
                    (0, _webpackconfig.default)(this.dir, {
                        ...commonWebpackOptions,
                        compilerType: _constants1.COMPILER_NAMES.client,
                        entrypoints: entrypoints.client,
                        ...info
                    }),
                    (0, _webpackconfig.default)(this.dir, {
                        ...commonWebpackOptions,
                        compilerType: _constants1.COMPILER_NAMES.server,
                        entrypoints: entrypoints.server,
                        ...info
                    }),
                    (0, _webpackconfig.default)(this.dir, {
                        ...commonWebpackOptions,
                        compilerType: _constants1.COMPILER_NAMES.edgeServer,
                        entrypoints: entrypoints.edgeServer,
                        ...info
                    })
                ]);
            });
        });
    }
    async buildFallbackError() {
        if (this.fallbackWatcher) return;
        const info = await (0, _webpackconfig.loadProjectInfo)({
            dir: this.dir,
            config: this.config,
            dev: true
        });
        const fallbackConfig = await (0, _webpackconfig.default)(this.dir, {
            previewProps: this.previewProps,
            runWebpackSpan: this.hotReloaderSpan,
            dev: true,
            compilerType: _constants1.COMPILER_NAMES.client,
            config: this.config,
            buildId: this.buildId,
            encryptionKey: this.encryptionKey,
            appDir: this.appDir,
            pagesDir: this.pagesDir,
            rewrites: {
                beforeFiles: [],
                afterFiles: [],
                fallback: []
            },
            originalRewrites: {
                beforeFiles: [],
                afterFiles: [],
                fallback: []
            },
            originalRedirects: [],
            isDevFallback: true,
            entrypoints: (await (0, _entries.createEntrypoints)({
                appDir: this.appDir,
                buildId: this.buildId,
                config: this.config,
                envFiles: [],
                isDev: true,
                pages: {
                    '/_app': 'next/dist/pages/_app',
                    '/_error': 'next/dist/pages/_error'
                },
                pagesDir: this.pagesDir,
                previewMode: this.previewProps,
                rootDir: this.dir,
                pageExtensions: this.config.pageExtensions
            })).client,
            ...info
        });
        const fallbackCompiler = (0, _getwebpackbundler.default)()(fallbackConfig);
        this.fallbackWatcher = await new Promise((resolve)=>{
            let bootedFallbackCompiler = false;
            fallbackCompiler.watch(fallbackConfig.watchOptions, (_err)=>{
                if (!bootedFallbackCompiler) {
                    bootedFallbackCompiler = true;
                    resolve(true);
                }
            });
        });
    }
    async tracedGetVersionInfo(span) {
        const versionInfoSpan = span.traceChild('get-version-info');
        return versionInfoSpan.traceAsyncFn(async ()=>(0, _hotreloadersharedutils.getVersionInfo)());
    }
    async start() {
        const startSpan = this.hotReloaderSpan.traceChild('start');
        startSpan.stop() // Stop immediately to create an artificial parent span
        ;
        this.versionInfo = await this.tracedGetVersionInfo(startSpan);
        const nodeOptions = (0, _utils2.getParsedNodeOptions)();
        const nodeDebugType = (0, _utils2.getNodeDebugType)(nodeOptions);
        if (nodeDebugType && !this.devtoolsFrontendUrl) {
            const debugPort = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debugPort;
            let debugInfo;
            try {
                // It requires to use 127.0.0.1 instead of localhost for server-side fetching.
                const debugInfoList = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((res)=>res.json());
                // There will be only one item for current process, so always get the first item.
                debugInfo = debugInfoList[0];
            } catch  {}
            if (debugInfo) {
                this.devtoolsFrontendUrl = debugInfo.devtoolsFrontendUrl;
            }
        }
        await this.clean(startSpan);
        // Ensure distDir exists before writing package.json
        await _fs.promises.mkdir(this.distDir, {
            recursive: true
        });
        const initialDevToolsConfig = await (0, _devtoolsconfigmiddleware.getDevToolsConfig)(this.distDir);
        const distPackageJsonPath = (0, _path.join)(this.distDir, 'package.json');
        // Ensure commonjs handling is used for files in the distDir (generally .next)
        // Files outside of the distDir can be "type": "module"
        await _fs.promises.writeFile(distPackageJsonPath, '{"type": "commonjs"}');
        this.activeWebpackConfigs = await this.getWebpackConfig(startSpan);
        for (const config of this.activeWebpackConfigs){
            const defaultEntry = config.entry;
            config.entry = async (...args)=>{
                var _this_multiCompiler;
                const outputPath = ((_this_multiCompiler = this.multiCompiler) == null ? void 0 : _this_multiCompiler.outputPath) || '';
                const entries = (0, _ondemandentryhandler.getEntries)(outputPath);
                // @ts-ignore entry is always a function
                const entrypoints = await defaultEntry(...args);
                const isClientCompilation = config.name === _constants1.COMPILER_NAMES.client;
                const isNodeServerCompilation = config.name === _constants1.COMPILER_NAMES.server;
                const isEdgeServerCompilation = config.name === _constants1.COMPILER_NAMES.edgeServer;
                await Promise.all(Object.keys(entries).map(async (entryKey)=>{
                    const entryData = entries[entryKey];
                    const { bundlePath, dispose } = entryData;
                    const result = /^(client|server|edge-server)@(app|pages|root)@(.*)/g.exec(entryKey);
                    const [, key /* pageType */ , , page] = result // this match should always happen
                    ;
                    if (key === _constants1.COMPILER_NAMES.client && !isClientCompilation) return;
                    if (key === _constants1.COMPILER_NAMES.server && !isNodeServerCompilation) return;
                    if (key === _constants1.COMPILER_NAMES.edgeServer && !isEdgeServerCompilation) return;
                    const isEntry = entryData.type === _ondemandentryhandler.EntryTypes.ENTRY;
                    const isChildEntry = entryData.type === _ondemandentryhandler.EntryTypes.CHILD_ENTRY;
                    // Check if the page was removed or disposed and remove it
                    if (isEntry) {
                        const pageExists = !dispose && (0, _fs.existsSync)(entryData.absolutePagePath);
                        if (!pageExists) {
                            delete entries[entryKey];
                            return;
                        }
                    }
                    // For child entries, if it has an entry file and it's gone, remove it
                    if (isChildEntry) {
                        if (entryData.absoluteEntryFilePath) {
                            const pageExists = !dispose && (0, _fs.existsSync)(entryData.absoluteEntryFilePath);
                            if (!pageExists) {
                                delete entries[entryKey];
                                return;
                            }
                        }
                    }
                    // Ensure _error is considered a `pages` page.
                    if (page === '/_error') {
                        this.hasPagesRouterEntrypoints = true;
                    }
                    const hasAppDir = !!this.appDir;
                    const isAppPath = hasAppDir && bundlePath.startsWith('app/');
                    const staticInfo = isEntry ? await (0, _getstaticinfoincludinglayouts.getStaticInfoIncludingLayouts)({
                        isInsideAppDir: isAppPath,
                        pageExtensions: this.config.pageExtensions,
                        pageFilePath: entryData.absolutePagePath,
                        appDir: this.appDir,
                        config: this.config,
                        isDev: true,
                        page
                    }) : undefined;
                    const isServerComponent = isAppPath && (staticInfo == null ? void 0 : staticInfo.rsc) !== _constants1.RSC_MODULE_TYPES.client;
                    const pageType = entryData.bundlePath.startsWith('pages/') ? _pagetypes.PAGE_TYPES.PAGES : entryData.bundlePath.startsWith('app/') ? _pagetypes.PAGE_TYPES.APP : _pagetypes.PAGE_TYPES.ROOT;
                    if (pageType === 'pages') {
                        this.hasPagesRouterEntrypoints = true;
                    }
                    if (pageType === 'app') {
                        this.hasAppRouterEntrypoints = true;
                    }
                    const isInstrumentation = (0, _utils.isInstrumentationHookFile)(page) && pageType === _pagetypes.PAGE_TYPES.ROOT;
                    let pageRuntime = staticInfo == null ? void 0 : staticInfo.runtime;
                    (0, _entries.runDependingOnPageType)({
                        page,
                        pageRuntime,
                        pageType,
                        onEdgeServer: ()=>{
                            // TODO-APP: verify if child entry should support.
                            if (!isEdgeServerCompilation || !isEntry) return;
                            entries[entryKey].status = _ondemandentryhandler.BUILDING;
                            if (isInstrumentation) {
                                const normalizedBundlePath = bundlePath.replace('src/', '');
                                entrypoints[normalizedBundlePath] = (0, _entries.finalizeEntrypoint)({
                                    compilerType: _constants1.COMPILER_NAMES.edgeServer,
                                    name: normalizedBundlePath,
                                    value: (0, _entries.getInstrumentationEntry)({
                                        absolutePagePath: entryData.absolutePagePath,
                                        isEdgeServer: true,
                                        isDev: true
                                    }),
                                    isServerComponent: true,
                                    hasAppDir
                                });
                                return;
                            }
                            const appDirLoader = isAppPath ? (0, _entries.getAppEntry)({
                                name: bundlePath,
                                page,
                                appPaths: entryData.appPaths,
                                pagePath: _path.posix.join(_constants.APP_DIR_ALIAS, (0, _path.relative)(this.appDir, entryData.absolutePagePath).replace(/\\/g, '/')),
                                appDir: this.appDir,
                                pageExtensions: this.config.pageExtensions,
                                rootDir: this.dir,
                                isDev: true,
                                tsconfigPath: this.config.typescript.tsconfigPath,
                                basePath: this.config.basePath,
                                assetPrefix: this.config.assetPrefix,
                                nextConfigOutput: this.config.output,
                                preferredRegion: staticInfo == null ? void 0 : staticInfo.preferredRegion,
                                middlewareConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify((staticInfo == null ? void 0 : staticInfo.middleware) || {})).toString('base64'),
                                isGlobalNotFoundEnabled: this.config.experimental.globalNotFound ? true : undefined
                            }).import : undefined;
                            entrypoints[bundlePath] = (0, _entries.finalizeEntrypoint)({
                                compilerType: _constants1.COMPILER_NAMES.edgeServer,
                                name: bundlePath,
                                value: (0, _entries.getEdgeServerEntry)({
                                    absolutePagePath: entryData.absolutePagePath,
                                    rootDir: this.dir,
                                    buildId: this.buildId,
                                    bundlePath,
                                    config: this.config,
                                    isDev: true,
                                    page,
                                    pages: this.pagesMapping,
                                    isServerComponent,
                                    appDirLoader,
                                    pagesType: isAppPath ? _pagetypes.PAGE_TYPES.APP : _pagetypes.PAGE_TYPES.PAGES,
                                    preferredRegion: staticInfo == null ? void 0 : staticInfo.preferredRegion
                                }),
                                hasAppDir
                            });
                        },
                        onClient: ()=>{
                            if (!isClientCompilation) return;
                            if (isChildEntry) {
                                entries[entryKey].status = _ondemandentryhandler.BUILDING;
                                entrypoints[bundlePath] = (0, _entries.finalizeEntrypoint)({
                                    name: bundlePath,
                                    compilerType: _constants1.COMPILER_NAMES.client,
                                    value: entryData.request,
                                    hasAppDir
                                });
                            } else {
                                entries[entryKey].status = _ondemandentryhandler.BUILDING;
                                entrypoints[bundlePath] = (0, _entries.finalizeEntrypoint)({
                                    name: bundlePath,
                                    compilerType: _constants1.COMPILER_NAMES.client,
                                    value: (0, _entries.getClientEntry)({
                                        absolutePagePath: entryData.absolutePagePath,
                                        page
                                    }),
                                    hasAppDir
                                });
                            }
                        },
                        onServer: ()=>{
                            // TODO-APP: verify if child entry should support.
                            if (!isNodeServerCompilation || !isEntry) return;
                            entries[entryKey].status = _ondemandentryhandler.BUILDING;
                            let relativeRequest = (0, _path.relative)(config.context, entryData.absolutePagePath);
                            if (!(0, _path.isAbsolute)(relativeRequest) && !relativeRequest.startsWith('../')) {
                                relativeRequest = `./${relativeRequest}`;
                            }
                            let value;
                            if (isInstrumentation) {
                                value = (0, _entries.getInstrumentationEntry)({
                                    absolutePagePath: entryData.absolutePagePath,
                                    isEdgeServer: false,
                                    isDev: true
                                });
                                entrypoints[bundlePath] = (0, _entries.finalizeEntrypoint)({
                                    compilerType: _constants1.COMPILER_NAMES.server,
                                    name: bundlePath,
                                    isServerComponent: true,
                                    value,
                                    hasAppDir
                                });
                            } else if ((0, _utils.isMiddlewareFile)(page)) {
                                value = (0, _entries.getEdgeServerEntry)({
                                    absolutePagePath: entryData.absolutePagePath,
                                    rootDir: this.dir,
                                    buildId: this.buildId,
                                    bundlePath,
                                    config: this.config,
                                    isDev: true,
                                    page,
                                    pages: this.pagesMapping,
                                    isServerComponent,
                                    pagesType: _pagetypes.PAGE_TYPES.PAGES,
                                    preferredRegion: staticInfo == null ? void 0 : staticInfo.preferredRegion
                                });
                            } else if (isAppPath) {
                                // This path normalization is critical for webpack to resolve the next internals as entry.
                                const pagePath = entryData.absolutePagePath.startsWith((0, _path.dirname)("[project]/JobPortal/frontend/node_modules/next/package.json (json)")) ? entryData.absolutePagePath : _path.posix.join(_constants.APP_DIR_ALIAS, (0, _path.relative)(this.appDir, entryData.absolutePagePath).replace(/\\/g, '/'));
                                value = (0, _entries.getAppEntry)({
                                    name: bundlePath,
                                    page,
                                    appPaths: entryData.appPaths,
                                    pagePath,
                                    appDir: this.appDir,
                                    pageExtensions: this.config.pageExtensions,
                                    rootDir: this.dir,
                                    isDev: true,
                                    tsconfigPath: this.config.typescript.tsconfigPath,
                                    basePath: this.config.basePath,
                                    assetPrefix: this.config.assetPrefix,
                                    nextConfigOutput: this.config.output,
                                    preferredRegion: staticInfo == null ? void 0 : staticInfo.preferredRegion,
                                    middlewareConfig: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify((staticInfo == null ? void 0 : staticInfo.middleware) || {})).toString('base64'),
                                    isGlobalNotFoundEnabled: this.config.experimental.globalNotFound ? true : undefined
                                });
                            } else if ((0, _isapiroute.isAPIRoute)(page)) {
                                value = (0, _nextrouteloader.getRouteLoaderEntry)({
                                    kind: _routekind.RouteKind.PAGES_API,
                                    page,
                                    absolutePagePath: relativeRequest,
                                    preferredRegion: staticInfo == null ? void 0 : staticInfo.preferredRegion,
                                    middlewareConfig: (staticInfo == null ? void 0 : staticInfo.middleware) || {}
                                });
                            } else if (!(0, _utils.isMiddlewareFile)(page) && !(0, _isinternalcomponent.isInternalComponent)(relativeRequest) && !(0, _isinternalcomponent.isNonRoutePagesPage)(page) && !isInstrumentation) {
                                value = (0, _nextrouteloader.getRouteLoaderEntry)({
                                    kind: _routekind.RouteKind.PAGES,
                                    page,
                                    pages: this.pagesMapping,
                                    absolutePagePath: relativeRequest,
                                    preferredRegion: staticInfo == null ? void 0 : staticInfo.preferredRegion,
                                    middlewareConfig: (staticInfo == null ? void 0 : staticInfo.middleware) ?? {}
                                });
                            } else {
                                value = relativeRequest;
                            }
                            entrypoints[bundlePath] = (0, _entries.finalizeEntrypoint)({
                                compilerType: _constants1.COMPILER_NAMES.server,
                                name: bundlePath,
                                isServerComponent,
                                value,
                                hasAppDir
                            });
                        }
                    });
                }));
                if (!this.hasPagesRouterEntrypoints) {
                    delete entrypoints[_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN];
                    delete entrypoints['pages/_app'];
                    delete entrypoints['pages/_error'];
                    delete entrypoints['/_error'];
                    delete entrypoints['pages/_document'];
                }
                // Remove React Refresh entrypoint chunk as `app` doesn't require it.
                if (!this.hasPagesRouterEntrypoints) {
                    delete entrypoints[_constants1.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH];
                }
                if (!this.hasAppRouterEntrypoints) {
                    delete entrypoints[_constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP];
                }
                return entrypoints;
            };
        }
        // Enable building of client compilation before server compilation in development
        // @ts-ignore webpack 5
        this.activeWebpackConfigs.parallelism = 1;
        await Promise.all(Array.from((0, _webpackconfig.getCacheDirectories)(this.activeWebpackConfigs)).map(_cacheinvalidation.checkFileSystemCacheInvalidationAndCleanup));
        this.multiCompiler = (0, _getwebpackbundler.default)()(this.activeWebpackConfigs);
        // Copy over the filesystem so that it is shared between all compilers.
        const inputFileSystem = this.multiCompiler.compilers[0].inputFileSystem;
        for (const compiler of this.multiCompiler.compilers){
            compiler.inputFileSystem = inputFileSystem;
            // This is set for the initial compile. After that Watching class in webpack adds it.
            compiler.fsStartTime = Date.now();
            // Ensure NodeEnvironmentPlugin doesn't purge the inputFileSystem. Purging is handled in `done` below.
            compiler.hooks.beforeRun.intercept({
                register (tapInfo) {
                    if (tapInfo.name === 'NodeEnvironmentPlugin') {
                        return null;
                    }
                    return tapInfo;
                }
            });
        }
        this.multiCompiler.hooks.done.tap('NextjsHotReloader', ()=>{
            var _inputFileSystem_purge;
            inputFileSystem == null ? void 0 : (_inputFileSystem_purge = inputFileSystem.purge) == null ? void 0 : _inputFileSystem_purge.call(inputFileSystem);
        });
        (0, _output.watchCompilers)(this.multiCompiler.compilers[0], this.multiCompiler.compilers[1], this.multiCompiler.compilers[2]);
        // Watch for changes to client/server page files so we can tell when just
        // the server file changes and trigger a reload for GS(S)P pages
        const changedClientPages = new Set();
        const changedServerPages = new Set();
        const changedEdgeServerPages = new Set();
        const changedServerComponentPages = new Set();
        const changedCSSImportPages = new Set();
        const prevClientPageHashes = new Map();
        const prevServerPageHashes = new Map();
        const prevEdgeServerPageHashes = new Map();
        const prevCSSImportModuleHashes = new Map();
        const pageExtensionRegex = new RegExp(`\\.(?:${this.config.pageExtensions.join('|')})$`);
        const trackPageChanges = (pageHashMap, changedItems, serverComponentChangedItems)=>(stats)=>{
                try {
                    stats.entrypoints.forEach((entry, key)=>{
                        if (key.startsWith('pages/') || key.startsWith('app/') || (0, _utils.isMiddlewareFilename)(key)) {
                            // TODO this doesn't handle on demand loaded chunks
                            entry.chunks.forEach((chunk)=>{
                                if (chunk.id === key) {
                                    const modsIterable = stats.chunkGraph.getChunkModulesIterable(chunk);
                                    let hasCSSModuleChanges = false;
                                    let chunksHash = new _webpack.StringXor();
                                    let chunksHashServerLayer = new _webpack.StringXor();
                                    modsIterable.forEach((mod)=>{
                                        if (mod.resource && mod.resource.replace(/\\/g, '/').includes(key) && // Shouldn't match CSS modules, etc.
                                        pageExtensionRegex.test(mod.resource)) {
                                            var _mod_buildInfo_rsc, _mod_buildInfo;
                                            // use original source to calculate hash since mod.hash
                                            // includes the source map in development which changes
                                            // every time for both server and client so we calculate
                                            // the hash without the source map for the page module
                                            const hash = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)").createHash('sha1').update(mod.originalSource().buffer()).digest().toString('hex');
                                            if (mod.layer === _constants.WEBPACK_LAYERS.reactServerComponents && (mod == null ? void 0 : (_mod_buildInfo = mod.buildInfo) == null ? void 0 : (_mod_buildInfo_rsc = _mod_buildInfo.rsc) == null ? void 0 : _mod_buildInfo_rsc.type) !== 'client') {
                                                chunksHashServerLayer.add(hash);
                                            }
                                            chunksHash.add(hash);
                                        } else {
                                            var _mod_buildInfo_rsc1, _mod_buildInfo1;
                                            // for non-pages we can use the module hash directly
                                            const hash = stats.chunkGraph.getModuleHash(mod, chunk.runtime);
                                            if (mod.layer === _constants.WEBPACK_LAYERS.reactServerComponents && (mod == null ? void 0 : (_mod_buildInfo1 = mod.buildInfo) == null ? void 0 : (_mod_buildInfo_rsc1 = _mod_buildInfo1.rsc) == null ? void 0 : _mod_buildInfo_rsc1.type) !== 'client') {
                                                chunksHashServerLayer.add(hash);
                                            }
                                            chunksHash.add(hash);
                                            // Both CSS import changes from server and client
                                            // components are tracked.
                                            if (key.startsWith('app/') && /\.(css|scss|sass)$/.test(mod.resource || '')) {
                                                const resourceKey = mod.layer + ':' + mod.resource;
                                                const prevHash = prevCSSImportModuleHashes.get(resourceKey);
                                                if (prevHash && prevHash !== hash) {
                                                    hasCSSModuleChanges = true;
                                                }
                                                prevCSSImportModuleHashes.set(resourceKey, hash);
                                            }
                                        }
                                    });
                                    const prevHash = pageHashMap.get(key);
                                    const curHash = chunksHash.toString();
                                    if (prevHash && prevHash !== curHash) {
                                        changedItems.add(key);
                                    }
                                    pageHashMap.set(key, curHash);
                                    if (serverComponentChangedItems) {
                                        const serverKey = _constants.WEBPACK_LAYERS.reactServerComponents + ':' + key;
                                        const prevServerHash = pageHashMap.get(serverKey);
                                        const curServerHash = chunksHashServerLayer.toString();
                                        if (prevServerHash && prevServerHash !== curServerHash) {
                                            serverComponentChangedItems.add(key);
                                        }
                                        pageHashMap.set(serverKey, curServerHash);
                                    }
                                    if (hasCSSModuleChanges) {
                                        changedCSSImportPages.add(key);
                                    }
                                }
                            });
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
            };
        this.multiCompiler.compilers[0].hooks.emit.tap('NextjsHotReloaderForClient', trackPageChanges(prevClientPageHashes, changedClientPages));
        this.multiCompiler.compilers[1].hooks.emit.tap('NextjsHotReloaderForServer', trackPageChanges(prevServerPageHashes, changedServerPages, changedServerComponentPages));
        this.multiCompiler.compilers[2].hooks.emit.tap('NextjsHotReloaderForServer', trackPageChanges(prevEdgeServerPageHashes, changedEdgeServerPages, changedServerComponentPages));
        // This plugin watches for changes to _document.js and notifies the client side that it should reload the page
        this.multiCompiler.compilers[1].hooks.failed.tap('NextjsHotReloaderForServer', (err)=>{
            this.serverError = err;
            this.serverStats = null;
            this.serverChunkNames = undefined;
        });
        this.multiCompiler.compilers[2].hooks.done.tap('NextjsHotReloaderForServer', (stats)=>{
            this.serverError = null;
            this.edgeServerStats = stats;
        });
        this.multiCompiler.compilers[1].hooks.done.tap('NextjsHotReloaderForServer', (stats)=>{
            this.serverError = null;
            this.serverStats = stats;
            if (!this.pagesDir) {
                return;
            }
            const { compilation } = stats;
            // We only watch `_document` for changes on the server compilation
            // the rest of the files will be triggered by the client compilation
            const documentChunk = compilation.namedChunks.get('pages/_document');
            // If the document chunk can't be found we do nothing
            if (!documentChunk) {
                return;
            }
            // Initial value
            if (this.serverPrevDocumentHash === null) {
                this.serverPrevDocumentHash = documentChunk.hash || null;
                return;
            }
            // If _document.js didn't change we don't trigger a reload.
            if (documentChunk.hash === this.serverPrevDocumentHash) {
                return;
            }
            // As document chunk will change if new app pages are joined,
            // since react bundle is different it will effect the chunk hash.
            // So we diff the chunk changes, if there's only new app page chunk joins,
            // then we don't trigger a reload by checking pages/_document chunk change.
            if (this.appDir) {
                const chunkNames = new Set(compilation.namedChunks.keys());
                const diffChunkNames = (0, _utils.difference)(this.serverChunkNames || new Set(), chunkNames);
                if (diffChunkNames.length === 0 || diffChunkNames.every((chunkName)=>chunkName.startsWith('app/'))) {
                    return;
                }
                this.serverChunkNames = chunkNames;
            }
            this.serverPrevDocumentHash = documentChunk.hash || null;
            // Notify reload to reload the page, as _document.js was changed (different hash)
            this.send({
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                data: '_document has changed'
            });
        });
        this.multiCompiler.hooks.done.tap('NextjsHotReloaderForServer', (stats)=>{
            const reloadAfterInvalidation = this.reloadAfterInvalidation;
            this.reloadAfterInvalidation = false;
            const serverOnlyChanges = (0, _utils.difference)(changedServerPages, changedClientPages);
            const edgeServerOnlyChanges = (0, _utils.difference)(changedEdgeServerPages, changedClientPages);
            const pageChanges = serverOnlyChanges.concat(edgeServerOnlyChanges).filter((key)=>key.startsWith('pages/'));
            const middlewareChanges = [
                ...Array.from(changedEdgeServerPages),
                ...Array.from(changedServerPages)
            ].filter((name)=>(0, _utils.isMiddlewareFilename)(name));
            if (middlewareChanges.length > 0) {
                this.send({
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES
                });
            }
            if (pageChanges.length > 0) {
                this.send({
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ONLY_CHANGES,
                    pages: serverOnlyChanges.map((pg)=>(0, _denormalizepagepath.denormalizePagePath)(pg.slice('pages'.length)))
                });
            }
            if (changedServerComponentPages.size || changedCSSImportPages.size || reloadAfterInvalidation) {
                this.resetFetch();
                this.refreshServerComponents(stats.hash);
            }
            changedClientPages.clear();
            changedServerPages.clear();
            changedEdgeServerPages.clear();
            changedServerComponentPages.clear();
            changedCSSImportPages.clear();
        });
        this.multiCompiler.compilers[0].hooks.failed.tap('NextjsHotReloaderForClient', (err)=>{
            this.clientError = err;
            this.clientStats = null;
        });
        this.multiCompiler.compilers[0].hooks.done.tap('NextjsHotReloaderForClient', (stats)=>{
            this.clientError = null;
            this.clientStats = stats;
            const { compilation } = stats;
            const chunkNames = new Set([
                ...compilation.namedChunks.keys()
            ].filter((name)=>!!(0, _getroutefromentrypoint.default)(name)));
            if (this.prevChunkNames) {
                // detect chunks which have to be replaced with a new template
                // e.g, pages/index.js <-> pages/_error.js
                const addedPages = diff(chunkNames, this.prevChunkNames);
                const removedPages = diff(this.prevChunkNames, chunkNames);
                if (addedPages.size > 0) {
                    for (const addedPage of addedPages){
                        const page = (0, _getroutefromentrypoint.default)(addedPage);
                        this.send({
                            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ADDED_PAGE,
                            data: [
                                page
                            ]
                        });
                    }
                }
                if (removedPages.size > 0) {
                    for (const removedPage of removedPages){
                        const page = (0, _getroutefromentrypoint.default)(removedPage);
                        this.send({
                            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REMOVED_PAGE,
                            data: [
                                page
                            ]
                        });
                    }
                }
            }
            this.prevChunkNames = chunkNames;
        });
        this.webpackHotMiddleware = new _hotmiddleware.WebpackHotMiddleware(this.multiCompiler.compilers, this.versionInfo, this.devtoolsFrontendUrl, this.config, initialDevToolsConfig);
        let booted = false;
        this.watcher = await new Promise((resolve)=>{
            var _this_multiCompiler;
            const watcher = (_this_multiCompiler = this.multiCompiler) == null ? void 0 : _this_multiCompiler.watch(this.activeWebpackConfigs.map((config)=>config.watchOptions), (_err)=>{
                if (!booted) {
                    booted = true;
                    resolve(watcher);
                }
            });
        });
        this.onDemandEntries = (0, _ondemandentryhandler.onDemandEntryHandler)({
            hotReloader: this,
            multiCompiler: this.multiCompiler,
            pagesDir: this.pagesDir,
            appDir: this.appDir,
            rootDir: this.dir,
            nextConfig: this.config,
            ...this.config.onDemandEntries
        });
        this.middlewares = [
            (0, _middlewarewebpack.getOverlayMiddleware)({
                rootDirectory: this.dir,
                isSrcDir: this.isSrcDir,
                clientStats: ()=>this.clientStats,
                serverStats: ()=>this.serverStats,
                edgeServerStats: ()=>this.edgeServerStats
            }),
            (0, _middlewarewebpack.getSourceMapMiddleware)({
                clientStats: ()=>this.clientStats,
                serverStats: ()=>this.serverStats,
                edgeServerStats: ()=>this.edgeServerStats
            }),
            (0, _getnexterrorfeedbackmiddleware.getNextErrorFeedbackMiddleware)(this.telemetry),
            (0, _getdevoverlayfontmiddleware.getDevOverlayFontMiddleware)(),
            (0, _devindicatormiddleware.getDisableDevIndicatorMiddleware)(),
            (0, _restartdevservermiddleware.getRestartDevServerMiddleware)({
                telemetry: this.telemetry,
                webpackCacheDirectories: this.activeWebpackConfigs != null ? (0, _webpackconfig.getCacheDirectories)(this.activeWebpackConfigs) : undefined
            }),
            (0, _devtoolsconfigmiddleware.devToolsConfigMiddleware)({
                distDir: this.distDir,
                sendUpdateSignal: (data)=>{
                    var // which will be used for the next onHMR call.
                    _this_webpackHotMiddleware;
                    (_this_webpackHotMiddleware = this.webpackHotMiddleware) == null ? void 0 : _this_webpackHotMiddleware.updateDevToolsConfig(data);
                    this.send({
                        type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEVTOOLS_CONFIG,
                        data
                    });
                }
            }),
            ...this.config.experimental.mcpServer ? [
                (0, _getmcpmiddleware.getMcpMiddleware)({
                    projectPath: this.dir,
                    distDir: this.distDir,
                    nextConfig: this.config,
                    pagesDir: this.pagesDir,
                    appDir: this.appDir,
                    sendHmrMessage: (message)=>this.send(message),
                    getActiveConnectionCount: ()=>{
                        var _this_webpackHotMiddleware;
                        return ((_this_webpackHotMiddleware = this.webpackHotMiddleware) == null ? void 0 : _this_webpackHotMiddleware.getClientCount()) ?? 0;
                    },
                    getDevServerUrl: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_PRIVATE_ORIGIN
                })
            ] : []
        ];
        (0, _formaterrors.setStackFrameResolver)(async (request)=>{
            return (0, _middlewarewebpack.getOriginalStackFrames)({
                isServer: request.isServer,
                isEdgeServer: request.isEdgeServer,
                isAppDirectory: request.isAppDirectory,
                frames: request.frames,
                clientStats: ()=>this.clientStats,
                serverStats: ()=>this.serverStats,
                edgeServerStats: ()=>this.edgeServerStats,
                rootDirectory: this.dir
            });
        });
    }
    invalidate({ reloadAfterInvalidation } = {
        reloadAfterInvalidation: false
    }) {
        var _this_multiCompiler;
        // Cache the `reloadAfterInvalidation` flag, and use it to reload the page when compilation is done
        this.reloadAfterInvalidation = reloadAfterInvalidation;
        const outputPath = (_this_multiCompiler = this.multiCompiler) == null ? void 0 : _this_multiCompiler.outputPath;
        if (outputPath) {
            var _getInvalidator;
            (_getInvalidator = (0, _ondemandentryhandler.getInvalidator)(outputPath)) == null ? void 0 : _getInvalidator.invalidate();
        }
    }
    async getCompilationErrors(page) {
        var _this_clientStats, _this_serverStats, _this_edgeServerStats;
        const getErrors = ({ compilation })=>{
            var _failedPages_normalizedPage;
            const failedPages = erroredPages(compilation);
            const normalizedPage = (0, _normalizepathsep.normalizePathSep)(page);
            // If there is an error related to the requesting page we display it instead of the first error
            return ((_failedPages_normalizedPage = failedPages[normalizedPage]) == null ? void 0 : _failedPages_normalizedPage.length) > 0 ? failedPages[normalizedPage] : compilation.errors;
        };
        if (this.clientError) {
            return [
                this.clientError
            ];
        } else if (this.serverError) {
            return [
                this.serverError
            ];
        } else if ((_this_clientStats = this.clientStats) == null ? void 0 : _this_clientStats.hasErrors()) {
            return getErrors(this.clientStats);
        } else if ((_this_serverStats = this.serverStats) == null ? void 0 : _this_serverStats.hasErrors()) {
            return getErrors(this.serverStats);
        } else if ((_this_edgeServerStats = this.edgeServerStats) == null ? void 0 : _this_edgeServerStats.hasErrors()) {
            return getErrors(this.edgeServerStats);
        } else {
            return [];
        }
    }
    send(message) {
        this.webpackHotMiddleware.publish(message);
    }
    sendToClient(client, message) {
        this.webpackHotMiddleware.publishToClient(client, message);
    }
    sendToLegacyClients(message) {
        this.webpackHotMiddleware.publishToLegacyClients(message);
    }
    setCacheStatus(status, htmlRequestId) {
        var _this_webpackHotMiddleware;
        const client = (_this_webpackHotMiddleware = this.webpackHotMiddleware) == null ? void 0 : _this_webpackHotMiddleware.getClient(htmlRequestId);
        if (client !== undefined) {
            this.sendToClient(client, {
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CACHE_INDICATOR,
                state: status
            });
        } else {
            // If the client is not connected, store the status so that we can send it
            // when the client connects.
            this.cacheStatusesByRequestId.set(htmlRequestId, status);
        }
    }
    setReactDebugChannel(debugChannel, htmlRequestId, requestId) {
        var _this_webpackHotMiddleware;
        const client = (_this_webpackHotMiddleware = this.webpackHotMiddleware) == null ? void 0 : _this_webpackHotMiddleware.getClient(htmlRequestId);
        if (htmlRequestId === requestId) {
            // The debug channel is for the HTML request.
            if (client) {
                // If the client is connected, we can connect the debug channel for
                // the HTML request immediately.
                (0, _debugchannel.connectReactDebugChannel)(htmlRequestId, debugChannel, this.sendToClient.bind(this, client));
            } else {
                // Otherwise, we'll do that when the client connects and just store
                // the debug channel.
                (0, _debugchannel.setReactDebugChannelForHtmlRequest)(htmlRequestId, debugChannel);
            }
        } else if (client) {
            // The debug channel is for a subsequent request (e.g. client-side
            // navigation for server function call). If the client is not connected
            // anymore, we don't need to connect the debug channel.
            (0, _debugchannel.connectReactDebugChannel)(requestId, debugChannel, this.sendToClient.bind(this, client));
        }
    }
    async ensurePage({ page, clientOnly, appPaths, definition, isApp, url }) {
        return this.hotReloaderSpan.traceChild('ensure-page', {
            inputPage: page
        }).traceAsyncFn(async ()=>{
            var _this_onDemandEntries;
            // Make sure we don't re-build or dispose prebuilt pages
            if (page !== '/_error' && _constants1.BLOCKED_PAGES.indexOf(page) !== -1) {
                return;
            }
            const error = clientOnly ? this.clientError : this.serverError || this.clientError;
            if (error) {
                throw error;
            }
            return (_this_onDemandEntries = this.onDemandEntries) == null ? void 0 : _this_onDemandEntries.ensurePage({
                page,
                appPaths,
                definition,
                isApp,
                url
            });
        });
    }
    close() {
        var _this_webpackHotMiddleware;
        // Report MCP telemetry if MCP server is enabled
        (0, _mcptelemetrytracker.recordMcpTelemetry)(this.telemetry);
        (_this_webpackHotMiddleware = this.webpackHotMiddleware) == null ? void 0 : _this_webpackHotMiddleware.close();
    }
} //# sourceMappingURL=hot-reloader-webpack.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/turbopack-utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    AssetMapper: null,
    addMetadataIdToRoute: null,
    addRouteSuffix: null,
    handleEntrypoints: null,
    handlePagesErrorRoute: null,
    handleRouteType: null,
    hasEntrypointForKey: null,
    msToNs: null,
    normalizedPageToTurbopackStructureRoute: null,
    printNonFatalIssue: null,
    processTopLevelIssues: null,
    removeRouteSuffix: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AssetMapper: function() {
        return AssetMapper;
    },
    addMetadataIdToRoute: function() {
        return addMetadataIdToRoute;
    },
    addRouteSuffix: function() {
        return addRouteSuffix;
    },
    handleEntrypoints: function() {
        return handleEntrypoints;
    },
    handlePagesErrorRoute: function() {
        return handlePagesErrorRoute;
    },
    handleRouteType: function() {
        return handleRouteType;
    },
    hasEntrypointForKey: function() {
        return hasEntrypointForKey;
    },
    msToNs: function() {
        return msToNs;
    },
    normalizedPageToTurbopackStructureRoute: function() {
        return normalizedPageToTurbopackStructureRoute;
    },
    printNonFatalIssue: function() {
        return printNonFatalIssue;
    },
    processTopLevelIssues: function() {
        return processTopLevelIssues;
    },
    removeRouteSuffix: function() {
        return removeRouteSuffix;
    }
});
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _entrykey = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/entry-key.js [app-client] (ecmascript)");
const _ismetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/is-metadata-route.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/utils.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
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
const onceErrorSet = new Set();
/**
 * Check if given issue is a warning to be display only once.
 * This mimics behavior of get-page-static-info's warnOnce.
 * @param issue
 * @returns
 */ function shouldEmitOnceWarning(issue) {
    const { severity, title, stage } = issue;
    if (severity === 'warning' && title.value === 'Invalid page configuration') {
        if (onceErrorSet.has(issue)) {
            return false;
        }
        onceErrorSet.add(issue);
    }
    if (severity === 'warning' && stage === 'config' && (0, _utils.renderStyledStringToErrorAnsi)(issue.title).includes("can't be external")) {
        if (onceErrorSet.has(issue)) {
            return false;
        }
        onceErrorSet.add(issue);
    }
    return true;
}
function printNonFatalIssue(issue) {
    if ((0, _utils.isRelevantWarning)(issue) && shouldEmitOnceWarning(issue)) {
        _log.warn((0, _utils.formatIssue)(issue));
    }
}
function processTopLevelIssues(currentTopLevelIssues, result) {
    currentTopLevelIssues.clear();
    for (const issue of result.issues){
        const issueKey = (0, _utils.getIssueKey)(issue);
        currentTopLevelIssues.set(issueKey, issue);
    }
}
const MILLISECONDS_IN_NANOSECOND = BigInt(1000000);
function msToNs(ms) {
    return BigInt(Math.floor(ms)) * MILLISECONDS_IN_NANOSECOND;
}
async function handleRouteType({ dev, page, pathname, route, currentEntryIssues, entrypoints, manifestLoader, readyIds, devRewrites, productionRewrites, hooks, logErrors }) {
    const shouldCreateWebpackStats = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TURBOPACK_STATS != null;
    switch(route.type){
        case 'page':
            {
                const clientKey = (0, _entrykey.getEntryKey)('pages', 'client', page);
                const serverKey = (0, _entrykey.getEntryKey)('pages', 'server', page);
                try {
                    // In the best case scenario, Turbopack chunks document, app, page separately in that order,
                    // so it can happen that the chunks of document change, but the chunks of app and page
                    // don't. We still need to reload the page chunks in that case though, otherwise the version
                    // of the document or app component export from the pages template is stale.
                    let documentOrAppChanged = false;
                    if (entrypoints.global.app) {
                        const key = (0, _entrykey.getEntryKey)('pages', 'server', '_app');
                        const writtenEndpoint = await entrypoints.global.app.writeToDisk();
                        documentOrAppChanged ||= (hooks == null ? void 0 : hooks.handleWrittenEndpoint(key, writtenEndpoint, false)) ?? false;
                        (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, false, logErrors);
                    }
                    await manifestLoader.loadBuildManifest('_app');
                    await manifestLoader.loadPagesManifest('_app');
                    if (entrypoints.global.document) {
                        const key = (0, _entrykey.getEntryKey)('pages', 'server', '_document');
                        const writtenEndpoint = await entrypoints.global.document.writeToDisk();
                        documentOrAppChanged ||= (hooks == null ? void 0 : hooks.handleWrittenEndpoint(key, writtenEndpoint, false)) ?? false;
                        (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, false, logErrors);
                    }
                    await manifestLoader.loadPagesManifest('_document');
                    const writtenEndpoint = await route.htmlEndpoint.writeToDisk();
                    hooks == null ? void 0 : hooks.handleWrittenEndpoint(serverKey, writtenEndpoint, documentOrAppChanged);
                    const type = writtenEndpoint == null ? void 0 : writtenEndpoint.type;
                    await manifestLoader.loadClientBuildManifest(page);
                    await manifestLoader.loadBuildManifest(page);
                    await manifestLoader.loadPagesManifest(page);
                    if (type === 'edge') {
                        await manifestLoader.loadMiddlewareManifest(page, 'pages');
                    } else {
                        manifestLoader.deleteMiddlewareManifest(serverKey);
                    }
                    await manifestLoader.loadFontManifest('/_app', 'pages');
                    await manifestLoader.loadFontManifest(page, 'pages');
                    if (shouldCreateWebpackStats) {
                        await manifestLoader.loadWebpackStats(page, 'pages');
                    }
                    manifestLoader.writeManifests({
                        devRewrites,
                        productionRewrites,
                        entrypoints
                    });
                    (0, _utils.processIssues)(currentEntryIssues, serverKey, writtenEndpoint, false, logErrors);
                } finally{
                    if (dev) {
                        // TODO subscriptions should only be caused by the WebSocket connections
                        // otherwise we don't known when to unsubscribe and this leaking
                        hooks == null ? void 0 : hooks.subscribeToChanges(serverKey, false, route.dataEndpoint, ()=>{
                            // Report the next compilation again
                            readyIds == null ? void 0 : readyIds.delete(pathname);
                            return {
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ONLY_CHANGES,
                                pages: [
                                    page
                                ]
                            };
                        }, (e)=>{
                            return {
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                                data: `error in ${page} data subscription: ${e}`
                            };
                        });
                        hooks == null ? void 0 : hooks.subscribeToChanges(clientKey, false, route.htmlEndpoint, ()=>{
                            return {
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CLIENT_CHANGES
                            };
                        }, (e)=>{
                            return {
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                                data: `error in ${page} html subscription: ${e}`
                            };
                        });
                        if (entrypoints.global.document) {
                            hooks == null ? void 0 : hooks.subscribeToChanges((0, _entrykey.getEntryKey)('pages', 'server', '_document'), false, entrypoints.global.document, ()=>{
                                return {
                                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                                    data: '_document has changed (page route)'
                                };
                            }, (e)=>{
                                return {
                                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                                    data: `error in _document subscription (page route): ${e}`
                                };
                            });
                        }
                    }
                }
                break;
            }
        case 'page-api':
            {
                const key = (0, _entrykey.getEntryKey)('pages', 'server', page);
                const writtenEndpoint = await route.endpoint.writeToDisk();
                hooks == null ? void 0 : hooks.handleWrittenEndpoint(key, writtenEndpoint, false);
                const type = writtenEndpoint.type;
                await manifestLoader.loadPagesManifest(page);
                if (type === 'edge') {
                    await manifestLoader.loadMiddlewareManifest(page, 'pages');
                } else {
                    manifestLoader.deleteMiddlewareManifest(key);
                }
                manifestLoader.writeManifests({
                    devRewrites,
                    productionRewrites,
                    entrypoints
                });
                (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, true, logErrors);
                break;
            }
        case 'app-page':
            {
                const key = (0, _entrykey.getEntryKey)('app', 'server', page);
                const writtenEndpoint = await route.htmlEndpoint.writeToDisk();
                hooks == null ? void 0 : hooks.handleWrittenEndpoint(key, writtenEndpoint, false);
                if (dev) {
                    // TODO subscriptions should only be caused by the WebSocket connections
                    // otherwise we don't known when to unsubscribe and this leaking
                    hooks == null ? void 0 : hooks.subscribeToChanges(key, true, route.rscEndpoint, (change, hash)=>{
                        if (change.issues.some((issue)=>issue.severity === 'error')) {
                            // Ignore any updates that has errors
                            // There will be another update without errors eventually
                            return;
                        }
                        // Report the next compilation again
                        readyIds == null ? void 0 : readyIds.delete(pathname);
                        return {
                            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_COMPONENT_CHANGES,
                            hash
                        };
                    }, (e)=>{
                        return {
                            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                            data: `error in ${page} app-page subscription: ${e}`
                        };
                    });
                }
                const type = writtenEndpoint.type;
                if (type === 'edge') {
                    manifestLoader.loadMiddlewareManifest(page, 'app');
                } else {
                    manifestLoader.deleteMiddlewareManifest(key);
                }
                manifestLoader.loadBuildManifest(page, 'app');
                manifestLoader.loadAppPathsManifest(page);
                manifestLoader.loadActionManifest(page);
                manifestLoader.loadFontManifest(page, 'app');
                if (shouldCreateWebpackStats) {
                    manifestLoader.loadWebpackStats(page, 'app');
                }
                manifestLoader.writeManifests({
                    devRewrites,
                    productionRewrites,
                    entrypoints
                });
                (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, dev, logErrors);
                break;
            }
        case 'app-route':
            {
                const key = (0, _entrykey.getEntryKey)('app', 'server', page);
                const writtenEndpoint = await route.endpoint.writeToDisk();
                hooks == null ? void 0 : hooks.handleWrittenEndpoint(key, writtenEndpoint, false);
                const type = writtenEndpoint.type;
                manifestLoader.loadAppPathsManifest(page);
                if (type === 'edge') {
                    manifestLoader.loadMiddlewareManifest(page, 'app');
                } else {
                    manifestLoader.deleteMiddlewareManifest(key);
                }
                manifestLoader.writeManifests({
                    devRewrites,
                    productionRewrites,
                    entrypoints
                });
                (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, true, logErrors);
                break;
            }
        default:
            {
                throw Object.defineProperty(new Error(`unknown route type ${route.type} for ${page}`), "__NEXT_ERROR_CODE", {
                    value: "E316",
                    enumerable: false,
                    configurable: true
                });
            }
    }
}
class AssetMapper {
    /**
   * Overrides asset paths for a key and updates the mapping from path to key.
   *
   * @param key
   * @param assetPaths asset paths relative to the .next directory
   */ setPathsForKey(key, assetPaths) {
        this.delete(key);
        const newAssetPaths = new Set(assetPaths);
        this.entryMap.set(key, newAssetPaths);
        for (const assetPath of newAssetPaths){
            let assetPathKeys = this.assetMap.get(assetPath);
            if (!assetPathKeys) {
                assetPathKeys = new Set();
                this.assetMap.set(assetPath, assetPathKeys);
            }
            assetPathKeys.add(key);
        }
    }
    /**
   * Deletes the key and any asset only referenced by this key.
   *
   * @param key
   */ delete(key) {
        for (const assetPath of this.getAssetPathsByKey(key)){
            const assetPathKeys = this.assetMap.get(assetPath);
            assetPathKeys == null ? void 0 : assetPathKeys.delete(key);
            if (!(assetPathKeys == null ? void 0 : assetPathKeys.size)) {
                this.assetMap.delete(assetPath);
            }
        }
        this.entryMap.delete(key);
    }
    getAssetPathsByKey(key) {
        return Array.from(this.entryMap.get(key) ?? []);
    }
    getKeysByAsset(path) {
        return Array.from(this.assetMap.get(path) ?? []);
    }
    keys() {
        return this.entryMap.keys();
    }
    constructor(){
        this.entryMap = new Map();
        this.assetMap = new Map();
    }
}
function hasEntrypointForKey(entrypoints, key, assetMapper) {
    const { type, page } = (0, _entrykey.splitEntryKey)(key);
    switch(type){
        case 'app':
            return entrypoints.app.has(page);
        case 'pages':
            switch(page){
                case '_app':
                    return entrypoints.global.app != null;
                case '_document':
                    return entrypoints.global.document != null;
                case '_error':
                    return entrypoints.global.error != null;
                default:
                    return entrypoints.page.has(page);
            }
        case 'root':
            switch(page){
                case 'middleware':
                    return entrypoints.global.middleware != null;
                case 'instrumentation':
                    return entrypoints.global.instrumentation != null;
                default:
                    return false;
            }
        case 'assets':
            if (!assetMapper) {
                return false;
            }
            return assetMapper.getKeysByAsset(page).some((pageKey)=>hasEntrypointForKey(entrypoints, pageKey, assetMapper));
        default:
            {
                // validation that we covered all cases, this should never run.
                const _ = type;
                return false;
            }
    }
}
async function handleEntrypoints({ entrypoints, currentEntrypoints, currentEntryIssues, manifestLoader, devRewrites, logErrors, dev }) {
    currentEntrypoints.global.app = entrypoints.pagesAppEndpoint;
    currentEntrypoints.global.document = entrypoints.pagesDocumentEndpoint;
    currentEntrypoints.global.error = entrypoints.pagesErrorEndpoint;
    currentEntrypoints.global.instrumentation = entrypoints.instrumentation;
    currentEntrypoints.page.clear();
    currentEntrypoints.app.clear();
    for (const [pathname, route] of entrypoints.routes){
        switch(route.type){
            case 'page':
            case 'page-api':
                currentEntrypoints.page.set(pathname, route);
                break;
            case 'app-page':
                {
                    route.pages.forEach((page)=>{
                        currentEntrypoints.app.set(page.originalName, {
                            type: 'app-page',
                            ...page
                        });
                    });
                    break;
                }
            case 'app-route':
                {
                    currentEntrypoints.app.set(route.originalName, route);
                    break;
                }
            case 'conflict':
                _log.info(`skipping ${pathname} (${route.type})`);
                break;
            default:
                route;
        }
    }
    if (dev) {
        await handleEntrypointsDevCleanup({
            currentEntryIssues,
            currentEntrypoints,
            ...dev
        });
    }
    const { middleware, instrumentation } = entrypoints;
    // We check for explicit true/false, since it's initialized to
    // undefined during the first loop (middlewareChanges event is
    // unnecessary during the first serve)
    if (currentEntrypoints.global.middleware && !middleware) {
        const key = (0, _entrykey.getEntryKey)('root', 'server', 'middleware');
        // Went from middleware to no middleware
        await (dev == null ? void 0 : dev.hooks.unsubscribeFromChanges(key));
        currentEntryIssues.delete(key);
        dev.hooks.sendHmr('middleware', {
            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES
        });
    } else if (!currentEntrypoints.global.middleware && middleware) {
        // Went from no middleware to middleware
        dev.hooks.sendHmr('middleware', {
            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES
        });
    }
    currentEntrypoints.global.middleware = middleware;
    if (instrumentation) {
        const processInstrumentation = async (name, prop)=>{
            const prettyName = {
                nodeJs: 'Node.js',
                edge: 'Edge'
            };
            const finishBuilding = dev.hooks.startBuilding(`instrumentation ${prettyName[prop]}`, undefined, true);
            const key = (0, _entrykey.getEntryKey)('root', 'server', name);
            const writtenEndpoint = await instrumentation[prop].writeToDisk();
            dev.hooks.handleWrittenEndpoint(key, writtenEndpoint, false);
            (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, false, logErrors);
            finishBuilding();
        };
        await processInstrumentation('instrumentation.nodeJs', 'nodeJs');
        await processInstrumentation('instrumentation.edge', 'edge');
        await manifestLoader.loadMiddlewareManifest('instrumentation', 'instrumentation');
        manifestLoader.writeManifests({
            devRewrites,
            productionRewrites: undefined,
            entrypoints: currentEntrypoints
        });
        dev.serverFields.actualInstrumentationHookFile = '/instrumentation';
        await dev.hooks.propagateServerField('actualInstrumentationHookFile', dev.serverFields.actualInstrumentationHookFile);
    } else {
        dev.serverFields.actualInstrumentationHookFile = undefined;
        await dev.hooks.propagateServerField('actualInstrumentationHookFile', dev.serverFields.actualInstrumentationHookFile);
    }
    if (middleware) {
        const key = (0, _entrykey.getEntryKey)('root', 'server', 'middleware');
        const endpoint = middleware.endpoint;
        const triggerName = middleware.isProxy ? _constants.PROXY_FILENAME : _constants.MIDDLEWARE_FILENAME;
        async function processMiddleware() {
            var _manifestLoader_getMiddlewareManifest;
            const finishBuilding = dev.hooks.startBuilding(triggerName, undefined, true);
            const writtenEndpoint = await endpoint.writeToDisk();
            dev.hooks.handleWrittenEndpoint(key, writtenEndpoint, false);
            (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, false, logErrors);
            await manifestLoader.loadMiddlewareManifest('middleware', 'middleware');
            const middlewareConfig = (_manifestLoader_getMiddlewareManifest = manifestLoader.getMiddlewareManifest(key)) == null ? void 0 : _manifestLoader_getMiddlewareManifest.middleware['/'];
            if (dev && middlewareConfig) {
                dev.serverFields.middleware = {
                    match: null,
                    page: '/',
                    matchers: middlewareConfig.matchers
                };
            }
            finishBuilding();
        }
        await processMiddleware();
        if (dev) {
            dev == null ? void 0 : dev.hooks.subscribeToChanges(key, false, endpoint, async ()=>{
                const finishBuilding = dev.hooks.startBuilding(triggerName, undefined, true);
                await processMiddleware();
                await dev.hooks.propagateServerField('actualMiddlewareFile', dev.serverFields.actualMiddlewareFile);
                await dev.hooks.propagateServerField('middleware', dev.serverFields.middleware);
                manifestLoader.writeManifests({
                    devRewrites,
                    productionRewrites: undefined,
                    entrypoints: currentEntrypoints
                });
                finishBuilding == null ? void 0 : finishBuilding();
                return {
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES
                };
            }, ()=>{
                return {
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES
                };
            });
        }
    } else {
        manifestLoader.deleteMiddlewareManifest((0, _entrykey.getEntryKey)('root', 'server', 'middleware'));
        dev.serverFields.actualMiddlewareFile = undefined;
        dev.serverFields.middleware = undefined;
    }
    await dev.hooks.propagateServerField('actualMiddlewareFile', dev.serverFields.actualMiddlewareFile);
    await dev.hooks.propagateServerField('middleware', dev.serverFields.middleware);
}
async function handleEntrypointsDevCleanup({ currentEntryIssues, currentEntrypoints, assetMapper, changeSubscriptions, clients, clientStates, hooks }) {
    // this needs to be first as `hasEntrypointForKey` uses the `assetMapper`
    for (const key of assetMapper.keys()){
        if (!hasEntrypointForKey(currentEntrypoints, key, assetMapper)) {
            assetMapper.delete(key);
        }
    }
    for (const key of changeSubscriptions.keys()){
        // middleware is handled separately
        if (!hasEntrypointForKey(currentEntrypoints, key, assetMapper)) {
            await hooks.unsubscribeFromChanges(key);
        }
    }
    for (const [key] of currentEntryIssues){
        if (!hasEntrypointForKey(currentEntrypoints, key, assetMapper)) {
            currentEntryIssues.delete(key);
        }
    }
    for (const client of clients){
        const state = clientStates.get(client);
        if (!state) {
            continue;
        }
        for (const key of state.clientIssues.keys()){
            if (!hasEntrypointForKey(currentEntrypoints, key, assetMapper)) {
                state.clientIssues.delete(key);
            }
        }
        for (const id of state.subscriptions.keys()){
            if (!hasEntrypointForKey(currentEntrypoints, (0, _entrykey.getEntryKey)('assets', 'client', id), assetMapper)) {
                hooks.unsubscribeFromHmrEvents(client, id);
            }
        }
    }
}
async function handlePagesErrorRoute({ currentEntryIssues, entrypoints, manifestLoader, devRewrites, productionRewrites, logErrors, hooks }) {
    if (entrypoints.global.app) {
        const key = (0, _entrykey.getEntryKey)('pages', 'server', '_app');
        const writtenEndpoint = await entrypoints.global.app.writeToDisk();
        hooks.handleWrittenEndpoint(key, writtenEndpoint, false);
        hooks.subscribeToChanges(key, false, entrypoints.global.app, ()=>{
            // There's a special case for this in `../client/page-bootstrap.ts`.
            // https://github.com/vercel/next.js/blob/08d7a7e5189a835f5dcb82af026174e587575c0e/packages/next/src/client/page-bootstrap.ts#L69-L71
            return {
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CLIENT_CHANGES
            };
        }, ()=>{
            return {
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                data: '_app has changed (error route)'
            };
        });
        (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, false, logErrors);
    }
    await manifestLoader.loadBuildManifest('_app');
    await manifestLoader.loadPagesManifest('_app');
    await manifestLoader.loadFontManifest('_app');
    if (entrypoints.global.document) {
        const key = (0, _entrykey.getEntryKey)('pages', 'server', '_document');
        const writtenEndpoint = await entrypoints.global.document.writeToDisk();
        hooks.handleWrittenEndpoint(key, writtenEndpoint, false);
        hooks.subscribeToChanges(key, false, entrypoints.global.document, ()=>{
            return {
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                data: '_document has changed (error route)'
            };
        }, (e)=>{
            return {
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                data: `error in _document subscription (error route): ${e}`
            };
        });
        (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, false, logErrors);
    }
    await manifestLoader.loadPagesManifest('_document');
    if (entrypoints.global.error) {
        const key = (0, _entrykey.getEntryKey)('pages', 'server', '_error');
        const writtenEndpoint = await entrypoints.global.error.writeToDisk();
        hooks.handleWrittenEndpoint(key, writtenEndpoint, false);
        hooks.subscribeToChanges(key, false, entrypoints.global.error, ()=>{
            // There's a special case for this in `../client/page-bootstrap.ts`.
            // https://github.com/vercel/next.js/blob/08d7a7e5189a835f5dcb82af026174e587575c0e/packages/next/src/client/page-bootstrap.ts#L69-L71
            return {
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CLIENT_CHANGES
            };
        }, (e)=>{
            return {
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                data: `error in _error subscription: ${e}`
            };
        });
        (0, _utils.processIssues)(currentEntryIssues, key, writtenEndpoint, false, logErrors);
    }
    await manifestLoader.loadClientBuildManifest('_error');
    await manifestLoader.loadBuildManifest('_error');
    await manifestLoader.loadPagesManifest('_error');
    await manifestLoader.loadFontManifest('_error');
    manifestLoader.writeManifests({
        devRewrites,
        productionRewrites,
        entrypoints
    });
}
function removeRouteSuffix(route) {
    return route.replace(/\/route$/, '');
}
function addRouteSuffix(route) {
    return route + '/route';
}
function addMetadataIdToRoute(route) {
    return route + '/[__metadata_id__]';
}
function normalizedPageToTurbopackStructureRoute(route, ext) {
    let entrypointKey = route;
    if ((0, _ismetadataroute.isMetadataRoute)(entrypointKey)) {
        entrypointKey = entrypointKey.endsWith('/route') ? entrypointKey.slice(0, -'/route'.length) : entrypointKey;
        if (ext) {
            if (entrypointKey.endsWith('/[__metadata_id__]')) {
                entrypointKey = entrypointKey.slice(0, -'/[__metadata_id__]'.length);
            }
            if (entrypointKey.endsWith('/sitemap.xml') && ext !== '.xml') {
                // For dynamic sitemap route, remove the extension
                entrypointKey = entrypointKey.slice(0, -'.xml'.length);
            }
        }
        entrypointKey = entrypointKey + '/route';
    }
    return entrypointKey;
} //# sourceMappingURL=turbopack-utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-turbopack.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createHotReloaderTurbopack", {
    enumerable: true,
    get: function() {
        return createHotReloaderTurbopack;
    }
});
const _promises = (()=>{
    const e = new Error("Cannot find module 'fs/promises'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _url = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/native-url/index.js [app-client] (ecmascript)");
const _ws = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/ws/index.js [app-client] (ecmascript)"));
const _store = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/store.js [app-client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const _swc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _middlewareturbopack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/middleware-turbopack.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/utils.js [app-client] (ecmascript)");
const _requirecache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/require-cache.js [app-client] (ecmascript)");
const _renderserver = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/render-server.js [app-client] (ecmascript)");
const _denormalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/denormalize-page-path.js [app-client] (ecmascript)");
const _trace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/index.js [app-client] (ecmascript)");
const _turbopackutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/turbopack-utils.js [app-client] (ecmascript)");
const _setupdevbundler = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js [app-client] (ecmascript)");
const _manifestloader = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/manifest-loader.js [app-client] (ecmascript)");
const _ondemandentryhandler = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/on-demand-entry-handler.js [app-client] (ecmascript)");
const _entrykey = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/entry-key.js [app-client] (ecmascript)");
const _messages = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/messages.js [app-client] (ecmascript)");
const _encryptionutilsserver = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/app-render/encryption-utils-server.js [app-client] (ecmascript)");
const _apppageroutedefinition = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-definitions/app-page-route-definition.js [app-client] (ecmascript)");
const _apppaths = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-client] (ecmascript)");
const _utils2 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/utils.js [app-client] (ecmascript)");
const _ismetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/is-metadata-route.js [app-client] (ecmascript)");
const _patcherrorinspect = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/patch-error-inspect.js [app-client] (ecmascript)");
const _getnexterrorfeedbackmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/get-next-error-feedback-middleware.js [app-client] (ecmascript)");
const _utils3 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/utils.js [app-client] (ecmascript)");
const _getdevoverlayfontmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/font/get-dev-overlay-font-middleware.js [app-client] (ecmascript)");
const _devindicatorserverstate = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/dev-indicator-server-state.js [app-client] (ecmascript)");
const _devindicatormiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/dev-indicator-middleware.js [app-client] (ecmascript)");
const _restartdevservermiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/restart-dev-server-middleware.js [app-client] (ecmascript)");
const _compilationevents = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/compilation-events.js [app-client] (ecmascript)");
const _utils4 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-client] (ecmascript)");
const _receivelogs = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/receive-logs.js [app-client] (ecmascript)");
const _normalizepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/normalize-path.js [app-client] (ecmascript)");
const _devtoolsconfigmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/devtools-config-middleware.js [app-client] (ecmascript)");
const _debugchannel = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/debug-channel.js [app-client] (ecmascript)");
const _hotreloadersharedutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-shared-utils.js [app-client] (ecmascript)");
const _getmcpmiddleware = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/get-mcp-middleware.js [app-client] (ecmascript)");
const _geterrors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/tools/get-errors.js [app-client] (ecmascript)");
const _getpagemetadata = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/tools/get-page-metadata.js [app-client] (ecmascript)");
const _formaterrors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/tools/utils/format-errors.js [app-client] (ecmascript)");
const _mcptelemetrytracker = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/mcp/mcp-telemetry-tracker.js [app-client] (ecmascript)");
const _filelogger = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/browser-logs/file-logger.js [app-client] (ecmascript)");
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
const wsServer = new _ws.default.Server({
    noServer: true
});
const isTestMode = !!(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_TEST_MODE || ("TURBOPACK compile-time value", false) || __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DEBUG);
const sessionId = Math.floor(Number.MAX_SAFE_INTEGER * Math.random());
/**
 * Replaces turbopack:///[project] with the specified project in the `source` field.
 */ function rewriteTurbopackSources(projectRoot, sourceMap) {
    if ('sections' in sourceMap) {
        for (const section of sourceMap.sections){
            rewriteTurbopackSources(projectRoot, section.map);
        }
    } else {
        for(let i = 0; i < sourceMap.sources.length; i++){
            sourceMap.sources[i] = (0, _url.pathToFileURL)((0, _path.join)(projectRoot, sourceMap.sources[i].replace(/turbopack:\/\/\/\[project\]/, ''))).toString();
        }
    }
}
function getSourceMapFromTurbopack(project, projectRoot, sourceURL) {
    let sourceMapJson = null;
    try {
        sourceMapJson = project.getSourceMapSync(sourceURL);
    } catch (err) {}
    if (sourceMapJson === null) {
        return undefined;
    } else {
        const payload = JSON.parse(sourceMapJson);
        // The sourcemap from Turbopack is not yet written to disk so its `sources`
        // are not absolute paths yet. We need to rewrite them to be absolute paths.
        rewriteTurbopackSources(projectRoot, payload);
        return payload;
    }
}
async function createHotReloaderTurbopack(opts, serverFields, distDir, resetFetch, lockfile) {
    var _opts_nextConfig_turbopack, _nextConfig_watchOptions, _opts_nextConfig_experimental;
    const dev = true;
    const buildId = 'development';
    const { nextConfig, dir: projectPath } = opts;
    const bindings = (0, _swc.getBindingsSync)();
    // For the debugging purpose, check if createNext or equivalent next instance setup in test cases
    // works correctly. Normally `run-test` hides output so only will be visible when `--debug` flag is used.
    if (isTestMode) {
        ;
        (()=>{
            const e = new Error("Cannot find module 'console'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })().log('Creating turbopack project', {
            dir: projectPath,
            testMode: isTestMode
        });
    }
    const hasRewrites = opts.fsChecker.rewrites.afterFiles.length > 0 || opts.fsChecker.rewrites.beforeFiles.length > 0 || opts.fsChecker.rewrites.fallback.length > 0;
    const hotReloaderSpan = (0, _trace.trace)('hot-reloader', undefined, {
        version: "16.0.7"
    });
    // Ensure the hotReloaderSpan is flushed immediately as it's the parentSpan for all processing
    // of the current `next dev` invocation.
    hotReloaderSpan.stop();
    // Initialize log monitor for file logging
    // Enable logging by default in development mode
    const mcpServerEnabled = !!nextConfig.experimental.mcpServer;
    const fileLogger = (0, _filelogger.getFileLogger)();
    fileLogger.initialize(distDir, mcpServerEnabled);
    const encryptionKey = await (0, _encryptionutilsserver.generateEncryptionKeyBase64)({
        isBuild: false,
        distDir
    });
    // TODO: Implement
    let clientRouterFilters;
    if (nextConfig.experimental.clientRouterFilter) {
    // TODO this need to be set correctly for filesystem cache to work
    }
    const supportedBrowsers = (0, _utils4.getSupportedBrowsers)(projectPath, dev);
    const currentNodeJsVersion = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.node;
    const rootPath = ((_opts_nextConfig_turbopack = opts.nextConfig.turbopack) == null ? void 0 : _opts_nextConfig_turbopack.root) || opts.nextConfig.outputFileTracingRoot || projectPath;
    const project = await bindings.turbo.createProject({
        rootPath,
        projectPath: (0, _normalizepath.normalizePath)((0, _path.relative)(rootPath, projectPath) || '.'),
        distDir,
        nextConfig: opts.nextConfig,
        watch: {
            enable: dev,
            pollIntervalMs: (_nextConfig_watchOptions = nextConfig.watchOptions) == null ? void 0 : _nextConfig_watchOptions.pollIntervalMs
        },
        dev,
        env: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env,
        defineEnv: (0, _swc.createDefineEnv)({
            isTurbopack: true,
            clientRouterFilters,
            config: nextConfig,
            dev,
            distDir,
            projectPath,
            fetchCacheKeyPrefix: opts.nextConfig.experimental.fetchCacheKeyPrefix,
            hasRewrites,
            // TODO: Implement
            middlewareMatchers: undefined,
            rewrites: opts.fsChecker.rewrites
        }),
        buildId,
        encryptionKey,
        previewProps: opts.fsChecker.prerenderManifest.preview,
        browserslistQuery: supportedBrowsers.join(', '),
        noMangling: false,
        currentNodeJsVersion
    }, {
        persistentCaching: (0, _utils3.isFileSystemCacheEnabledForDev)(opts.nextConfig),
        memoryLimit: (_opts_nextConfig_experimental = opts.nextConfig.experimental) == null ? void 0 : _opts_nextConfig_experimental.turbopackMemoryLimit,
        isShortSession: false
    });
    (0, _compilationevents.backgroundLogCompilationEvents)(project, {
        eventTypes: [
            'StartupCacheInvalidationEvent',
            'TimingEvent'
        ]
    });
    (0, _patcherrorinspect.setBundlerFindSourceMapImplementation)(getSourceMapFromTurbopack.bind(null, project, projectPath));
    opts.onDevServerCleanup == null ? void 0 : opts.onDevServerCleanup.call(opts, async ()=>{
        (0, _patcherrorinspect.setBundlerFindSourceMapImplementation)(()=>undefined);
        await project.onExit();
        await (lockfile == null ? void 0 : lockfile.unlock());
    });
    const entrypointsSubscription = project.entrypointsSubscribe();
    const currentWrittenEntrypoints = new Map();
    const currentEntrypoints = {
        global: {
            app: undefined,
            document: undefined,
            error: undefined,
            middleware: undefined,
            instrumentation: undefined
        },
        page: new Map(),
        app: new Map()
    };
    const currentTopLevelIssues = new Map();
    const currentEntryIssues = new Map();
    const manifestLoader = new _manifestloader.TurbopackManifestLoader({
        buildId,
        distDir,
        encryptionKey
    });
    // Dev specific
    const changeSubscriptions = new Map();
    const serverPathState = new Map();
    const readyIds = new Set();
    let currentEntriesHandlingResolve;
    let currentEntriesHandling = new Promise((resolve)=>currentEntriesHandlingResolve = resolve);
    const assetMapper = new _turbopackutils.AssetMapper();
    function clearRequireCache(key, writtenEndpoint, { force } = {}) {
        if (force) {
            for (const { path, contentHash } of writtenEndpoint.serverPaths){
                // We ignore source maps
                if (path.endsWith('.map')) continue;
                const localKey = `${key}:${path}`;
                serverPathState.set(localKey, contentHash);
                serverPathState.set(path, contentHash);
            }
        } else {
            // Figure out if the server files have changed
            let hasChange = false;
            for (const { path, contentHash } of writtenEndpoint.serverPaths){
                // We ignore source maps
                if (path.endsWith('.map')) continue;
                const localKey = `${key}:${path}`;
                const localHash = serverPathState.get(localKey);
                const globalHash = serverPathState.get(path);
                if (localHash && localHash !== contentHash || globalHash && globalHash !== contentHash) {
                    hasChange = true;
                    serverPathState.set(localKey, contentHash);
                    serverPathState.set(path, contentHash);
                } else {
                    if (!localHash) {
                        serverPathState.set(localKey, contentHash);
                    }
                    if (!globalHash) {
                        serverPathState.set(path, contentHash);
                    }
                }
            }
            if (!hasChange) {
                return false;
            }
        }
        resetFetch();
        // Not available in:
        // - Pages Router (no server-side HMR)
        // - Edge Runtime (uses browser runtime which already disposes chunks individually)
        if (typeof __next__clear_chunk_cache__ === 'function') {
            __next__clear_chunk_cache__();
        }
        const serverPaths = writtenEndpoint.serverPaths.map(({ path: p })=>(0, _path.join)(distDir, p));
        for (const file of serverPaths){
            (0, _renderserver.clearModuleContext)(file);
            (0, _requirecache.deleteCache)(file);
        }
        return true;
    }
    const buildingIds = new Set();
    const startBuilding = (id, requestUrl, forceRebuild)=>{
        if (!forceRebuild && readyIds.has(id)) {
            return ()=>{};
        }
        if (buildingIds.size === 0) {
            _store.store.setState({
                loading: true,
                trigger: id,
                url: requestUrl
            }, true);
        }
        buildingIds.add(id);
        return function finishBuilding() {
            if (buildingIds.size === 0) {
                return;
            }
            readyIds.add(id);
            buildingIds.delete(id);
            if (buildingIds.size === 0) {
                hmrEventHappened = false;
                _store.store.setState({
                    loading: false
                }, true);
            }
        };
    };
    let hmrEventHappened = false;
    let hmrHash = 0;
    const clientsWithoutHtmlRequestId = new Set();
    const clientsByHtmlRequestId = new Map();
    const cacheStatusesByHtmlRequestId = new Map();
    const clientStates = new WeakMap();
    function sendToClient(client, message) {
        const data = typeof message.type === 'number' ? (0, _messages.createBinaryHmrMessageData)(message) : JSON.stringify(message);
        client.send(data);
    }
    function sendEnqueuedMessages() {
        for (const [, issueMap] of currentEntryIssues){
            if ([
                ...issueMap.values()
            ].filter((i)=>i.severity !== 'warning').length > 0) {
                // During compilation errors we want to delay the HMR events until errors are fixed
                return;
            }
        }
        for (const client of [
            ...clientsWithoutHtmlRequestId,
            ...clientsByHtmlRequestId.values()
        ]){
            const state = clientStates.get(client);
            if (!state) {
                continue;
            }
            for (const [, issueMap] of state.clientIssues){
                if ([
                    ...issueMap.values()
                ].filter((i)=>i.severity !== 'warning').length > 0) {
                    // During compilation errors we want to delay the HMR events until errors are fixed
                    return;
                }
            }
            for (const message of state.messages.values()){
                sendToClient(client, message);
            }
            state.messages.clear();
            if (state.turbopackUpdates.length > 0) {
                sendToClient(client, {
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_MESSAGE,
                    data: state.turbopackUpdates
                });
                state.turbopackUpdates.length = 0;
            }
        }
    }
    const sendEnqueuedMessagesDebounce = (0, _utils1.debounce)(sendEnqueuedMessages, 2);
    const sendHmr = (id, message)=>{
        for (const client of [
            ...clientsWithoutHtmlRequestId,
            ...clientsByHtmlRequestId.values()
        ]){
            var _clientStates_get;
            (_clientStates_get = clientStates.get(client)) == null ? void 0 : _clientStates_get.messages.set(id, message);
        }
        hmrEventHappened = true;
        sendEnqueuedMessagesDebounce();
    };
    function sendTurbopackMessage(payload) {
        // TODO(PACK-2049): For some reason we end up emitting hundreds of issues messages on bigger apps,
        //   a lot of which are duplicates.
        //   They are currently not handled on the client at all, so might as well not send them for now.
        payload.diagnostics = [];
        payload.issues = [];
        for (const client of [
            ...clientsWithoutHtmlRequestId,
            ...clientsByHtmlRequestId.values()
        ]){
            var _clientStates_get;
            (_clientStates_get = clientStates.get(client)) == null ? void 0 : _clientStates_get.turbopackUpdates.push(payload);
        }
        hmrEventHappened = true;
        sendEnqueuedMessagesDebounce();
    }
    async function subscribeToChanges(key, includeIssues, endpoint, createMessage, onError) {
        if (changeSubscriptions.has(key)) {
            return;
        }
        const { side } = (0, _entrykey.splitEntryKey)(key);
        const changedPromise = endpoint[`${side}Changed`](includeIssues);
        changeSubscriptions.set(key, changedPromise);
        try {
            const changed = await changedPromise;
            for await (const change of changed){
                (0, _utils3.processIssues)(currentEntryIssues, key, change, false, true);
                // TODO: Get an actual content hash from Turbopack.
                const message = await createMessage(change, String(++hmrHash));
                if (message) {
                    sendHmr(key, message);
                }
            }
        } catch (e) {
            changeSubscriptions.delete(key);
            const payload = await (onError == null ? void 0 : onError(e));
            if (payload) {
                sendHmr(key, payload);
            }
            return;
        }
        changeSubscriptions.delete(key);
    }
    async function unsubscribeFromChanges(key) {
        const subscription = await changeSubscriptions.get(key);
        if (subscription) {
            await (subscription.return == null ? void 0 : subscription.return.call(subscription));
            changeSubscriptions.delete(key);
        }
        currentEntryIssues.delete(key);
    }
    async function subscribeToHmrEvents(client, id) {
        const key = (0, _entrykey.getEntryKey)('assets', 'client', id);
        if (!(0, _turbopackutils.hasEntrypointForKey)(currentEntrypoints, key, assetMapper)) {
            // maybe throw an error / force the client to reload?
            return;
        }
        const state = clientStates.get(client);
        if (!state || state.subscriptions.has(id)) {
            return;
        }
        const subscription = project.hmrEvents(id);
        state.subscriptions.set(id, subscription);
        // The subscription will always emit once, which is the initial
        // computation. This is not a change, so swallow it.
        try {
            await subscription.next();
            for await (const data of subscription){
                (0, _utils3.processIssues)(state.clientIssues, key, data, false, true);
                if (data.type !== 'issues') {
                    sendTurbopackMessage(data);
                }
            }
        } catch (e) {
            // The client might be using an HMR session from a previous server, tell them
            // to fully reload the page to resolve the issue. We can't use
            // `hotReloader.send` since that would force every connected client to
            // reload, only this client is out of date.
            const reloadMessage = {
                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE,
                data: `error in HMR event subscription for ${id}: ${e}`
            };
            sendToClient(client, reloadMessage);
            client.close();
            return;
        }
    }
    function unsubscribeFromHmrEvents(client, id) {
        const state = clientStates.get(client);
        if (!state) {
            return;
        }
        const subscription = state.subscriptions.get(id);
        subscription == null ? void 0 : subscription.return();
        const key = (0, _entrykey.getEntryKey)('assets', 'client', id);
        state.clientIssues.delete(key);
    }
    async function handleEntrypointsSubscription() {
        for await (const entrypoints of entrypointsSubscription){
            if (!currentEntriesHandlingResolve) {
                currentEntriesHandling = new Promise((resolve)=>currentEntriesHandlingResolve = resolve);
            }
            // Always process issues/diagnostics, even if there are no entrypoints yet
            (0, _turbopackutils.processTopLevelIssues)(currentTopLevelIssues, entrypoints);
            // Certain crtical issues prevent any entrypoints from being constructed so return early
            if (!('routes' in entrypoints)) {
                (0, _utils4.printBuildErrors)(entrypoints, true);
                currentEntriesHandlingResolve();
                currentEntriesHandlingResolve = undefined;
                continue;
            }
            const routes = entrypoints.routes;
            const existingRoutes = [
                ...currentEntrypoints.app.keys(),
                ...currentEntrypoints.page.keys()
            ];
            const newRoutes = [
                ...routes.keys()
            ];
            const addedRoutes = newRoutes.filter((route)=>!currentEntrypoints.app.has(route) && !currentEntrypoints.page.has(route));
            const removedRoutes = existingRoutes.filter((route)=>!routes.has(route));
            await (0, _turbopackutils.handleEntrypoints)({
                entrypoints: entrypoints,
                currentEntrypoints,
                currentEntryIssues,
                manifestLoader,
                devRewrites: opts.fsChecker.rewrites,
                productionRewrites: undefined,
                logErrors: true,
                dev: {
                    assetMapper,
                    changeSubscriptions,
                    clients: [
                        ...clientsWithoutHtmlRequestId,
                        ...clientsByHtmlRequestId.values()
                    ],
                    clientStates,
                    serverFields,
                    hooks: {
                        handleWrittenEndpoint: (id, result, forceDeleteCache)=>{
                            currentWrittenEntrypoints.set(id, result);
                            return clearRequireCache(id, result, {
                                force: forceDeleteCache
                            });
                        },
                        propagateServerField: _setupdevbundler.propagateServerField.bind(null, opts),
                        sendHmr,
                        startBuilding,
                        subscribeToChanges,
                        unsubscribeFromChanges,
                        unsubscribeFromHmrEvents
                    }
                }
            });
            // Reload matchers when the files have been compiled
            await (0, _setupdevbundler.propagateServerField)(opts, 'reloadMatchers', undefined);
            if (addedRoutes.length > 0 || removedRoutes.length > 0) {
                // When the list of routes changes a new manifest should be fetched for Pages Router.
                hotReloader.send({
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEV_PAGES_MANIFEST_UPDATE,
                    data: [
                        {
                            devPagesManifest: true
                        }
                    ]
                });
            }
            for (const route of addedRoutes){
                hotReloader.send({
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ADDED_PAGE,
                    data: [
                        route
                    ]
                });
            }
            for (const route of removedRoutes){
                hotReloader.send({
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REMOVED_PAGE,
                    data: [
                        route
                    ]
                });
            }
            currentEntriesHandlingResolve();
            currentEntriesHandlingResolve = undefined;
        }
    }
    await (0, _promises.mkdir)((0, _path.join)(distDir, 'server'), {
        recursive: true
    });
    await (0, _promises.mkdir)((0, _path.join)(distDir, 'static', buildId), {
        recursive: true
    });
    await (0, _promises.writeFile)((0, _path.join)(distDir, 'package.json'), JSON.stringify({
        type: 'commonjs'
    }, null, 2));
    const middlewares = [
        (0, _middlewareturbopack.getOverlayMiddleware)({
            project,
            projectPath,
            isSrcDir: opts.isSrcDir
        }),
        (0, _middlewareturbopack.getSourceMapMiddleware)(project),
        (0, _getnexterrorfeedbackmiddleware.getNextErrorFeedbackMiddleware)(opts.telemetry),
        (0, _getdevoverlayfontmiddleware.getDevOverlayFontMiddleware)(),
        (0, _devindicatormiddleware.getDisableDevIndicatorMiddleware)(),
        (0, _restartdevservermiddleware.getRestartDevServerMiddleware)({
            telemetry: opts.telemetry,
            turbopackProject: project
        }),
        (0, _devtoolsconfigmiddleware.devToolsConfigMiddleware)({
            distDir,
            sendUpdateSignal: (data)=>{
                hotReloader.send({
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEVTOOLS_CONFIG,
                    data
                });
            }
        }),
        ...nextConfig.experimental.mcpServer ? [
            (0, _getmcpmiddleware.getMcpMiddleware)({
                projectPath,
                distDir,
                nextConfig,
                pagesDir: opts.pagesDir,
                appDir: opts.appDir,
                sendHmrMessage: (message)=>hotReloader.send(message),
                getActiveConnectionCount: ()=>clientsWithoutHtmlRequestId.size + clientsByHtmlRequestId.size,
                getDevServerUrl: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_PRIVATE_ORIGIN
            })
        ] : []
    ];
    (0, _formaterrors.setStackFrameResolver)(async (request)=>{
        return (0, _middlewareturbopack.getOriginalStackFrames)({
            project,
            projectPath,
            isServer: request.isServer,
            isEdgeServer: request.isEdgeServer,
            isAppDirectory: request.isAppDirectory,
            frames: request.frames
        });
    });
    let versionInfoCached;
    // This fetch, even though not awaited, is not kicked off eagerly because the first `fetch()` in
    // Node.js adds roughly 20ms main-thread blocking to load the SSL certificate cache
    // We don't want that blocking time to be in the hot path for the `ready in` logging.
    // Instead, the fetch is kicked off lazily when the first `getVersionInfoCached()` is called.
    const getVersionInfoCached = ()=>{
        if (!versionInfoCached) {
            versionInfoCached = (0, _hotreloadersharedutils.getVersionInfo)();
        }
        return versionInfoCached;
    };
    let devtoolsFrontendUrl;
    const nodeOptions = (0, _utils2.getParsedNodeOptions)();
    const nodeDebugType = (0, _utils2.getNodeDebugType)(nodeOptions);
    if (nodeDebugType) {
        const debugPort = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].debugPort;
        let debugInfo;
        try {
            // It requires to use 127.0.0.1 instead of localhost for server-side fetching.
            const debugInfoList = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((res)=>res.json());
            debugInfo = debugInfoList[0];
        } catch  {}
        if (debugInfo) {
            devtoolsFrontendUrl = debugInfo.devtoolsFrontendUrl;
        }
    }
    const hotReloader = {
        turbopackProject: project,
        activeWebpackConfigs: undefined,
        serverStats: null,
        edgeServerStats: null,
        async run (req, res, _parsedUrl) {
            var _req_url;
            // intercept page chunks request and ensure them with turbopack
            if ((_req_url = req.url) == null ? void 0 : _req_url.startsWith('/_next/static/chunks/pages/')) {
                const params = (0, _hotreloadersharedutils.matchNextPageBundleRequest)(req.url);
                if (params) {
                    const decodedPagePath = `/${params.path.map((param)=>decodeURIComponent(param)).join('/')}`;
                    const denormalizedPagePath = (0, _denormalizepagepath.denormalizePagePath)(decodedPagePath);
                    await hotReloader.ensurePage({
                        page: denormalizedPagePath,
                        clientOnly: false,
                        definition: undefined,
                        url: req.url
                    }).catch(console.error);
                }
            }
            for (const middleware of middlewares){
                let calledNext = false;
                await middleware(req, res, ()=>{
                    calledNext = true;
                });
                if (!calledNext) {
                    return {
                        finished: true
                    };
                }
            }
            // Request was not finished.
            return {
                finished: undefined
            };
        },
        // TODO: Figure out if socket type can match the NextJsHotReloaderInterface
        onHMR (req, socket, head, onUpgrade) {
            wsServer.handleUpgrade(req, socket, head, (client)=>{
                const clientIssues = new Map();
                const subscriptions = new Map();
                const htmlRequestId = req.url ? new URL(req.url, 'http://n').searchParams.get('id') : null;
                // Clients with a request ID are inferred App Router clients. If Cache
                // Components is not enabled, we consider those legacy clients. Pages
                // Router clients are also considered legacy clients. TODO: Maybe mark
                // clients as App Router / Pages Router clients explicitly, instead of
                // inferring it from the presence of a request ID.
                if (htmlRequestId) {
                    clientsByHtmlRequestId.set(htmlRequestId, client);
                    const enableCacheComponents = nextConfig.cacheComponents;
                    if (enableCacheComponents) {
                        onUpgrade(client, {
                            isLegacyClient: false
                        });
                        const cacheStatus = cacheStatusesByHtmlRequestId.get(htmlRequestId);
                        if (cacheStatus !== undefined) {
                            sendToClient(client, {
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CACHE_INDICATOR,
                                state: cacheStatus
                            });
                            cacheStatusesByHtmlRequestId.delete(htmlRequestId);
                        }
                    } else {
                        onUpgrade(client, {
                            isLegacyClient: true
                        });
                    }
                } else {
                    clientsWithoutHtmlRequestId.add(client);
                    onUpgrade(client, {
                        isLegacyClient: true
                    });
                }
                clientStates.set(client, {
                    clientIssues,
                    messages: new Map(),
                    turbopackUpdates: [],
                    subscriptions
                });
                client.on('close', ()=>{
                    // Remove active subscriptions
                    for (const subscription of subscriptions.values()){
                        subscription.return == null ? void 0 : subscription.return.call(subscription);
                    }
                    clientStates.delete(client);
                    if (htmlRequestId) {
                        clientsByHtmlRequestId.delete(htmlRequestId);
                        (0, _debugchannel.deleteReactDebugChannelForHtmlRequest)(htmlRequestId);
                    } else {
                        clientsWithoutHtmlRequestId.delete(client);
                    }
                });
                client.addEventListener('message', async ({ data })=>{
                    const parsedData = JSON.parse(typeof data !== 'string' ? data.toString() : data);
                    // Next.js messages
                    switch(parsedData.event){
                        case 'span-end':
                            {
                                hotReloaderSpan.manualTraceChild(parsedData.spanName, (0, _turbopackutils.msToNs)(parsedData.startTime), (0, _turbopackutils.msToNs)(parsedData.endTime), parsedData.attributes);
                                break;
                            }
                        case 'client-hmr-latency':
                            hotReloaderSpan.manualTraceChild(parsedData.event, (0, _turbopackutils.msToNs)(parsedData.startTime), (0, _turbopackutils.msToNs)(parsedData.endTime), {
                                updatedModules: parsedData.updatedModules,
                                page: parsedData.page,
                                isPageHidden: parsedData.isPageHidden
                            });
                            break;
                        case 'client-error':
                        case 'client-warning':
                        case 'client-success':
                        case 'server-component-reload-page':
                        case 'client-reload-page':
                        case 'client-removed-page':
                        case 'client-full-reload':
                            const { hadRuntimeError, dependencyChain } = parsedData;
                            if (hadRuntimeError) {
                                _log.warn(_messages.FAST_REFRESH_RUNTIME_RELOAD);
                            }
                            if (Array.isArray(dependencyChain) && typeof dependencyChain[0] === 'string') {
                                const cleanedModulePath = dependencyChain[0].replace(/^\[project\]/, '.').replace(/ \[.*\] \(.*\)$/, '');
                                _log.warn(`Fast Refresh had to perform a full reload when ${cleanedModulePath} changed. Read more: https://nextjs.org/docs/messages/fast-refresh-reload`);
                            }
                            break;
                        case 'client-added-page':
                            break;
                        case 'browser-logs':
                            {
                                if (nextConfig.experimental.browserDebugInfoInTerminal) {
                                    await (0, _receivelogs.receiveBrowserLogsTurbopack)({
                                        entries: parsedData.entries,
                                        router: parsedData.router,
                                        sourceType: parsedData.sourceType,
                                        project,
                                        projectPath,
                                        distDir,
                                        config: nextConfig.experimental.browserDebugInfoInTerminal
                                    });
                                }
                                break;
                            }
                        case 'client-file-logs':
                            {
                                // Always log to file regardless of terminal flag
                                await (0, _receivelogs.handleClientFileLogs)(parsedData.logs);
                                break;
                            }
                        case 'ping':
                            {
                                break;
                            }
                        case 'mcp-error-state-response':
                            {
                                (0, _geterrors.handleErrorStateResponse)(parsedData.requestId, parsedData.errorState, parsedData.url);
                                break;
                            }
                        case 'mcp-page-metadata-response':
                            {
                                (0, _getpagemetadata.handlePageMetadataResponse)(parsedData.requestId, parsedData.segmentTrieData, parsedData.url);
                                break;
                            }
                        default:
                            // Might be a Turbopack message...
                            if (!parsedData.type) {
                                throw Object.defineProperty(new Error(`unrecognized HMR message "${data}"`), "__NEXT_ERROR_CODE", {
                                    value: "E155",
                                    enumerable: false,
                                    configurable: true
                                });
                            }
                    }
                    // Turbopack messages
                    switch(parsedData.type){
                        case 'turbopack-subscribe':
                            subscribeToHmrEvents(client, parsedData.path);
                            break;
                        case 'turbopack-unsubscribe':
                            unsubscribeFromHmrEvents(client, parsedData.path);
                            break;
                        default:
                            if (!parsedData.event) {
                                throw Object.defineProperty(new Error(`unrecognized Turbopack HMR message "${data}"`), "__NEXT_ERROR_CODE", {
                                    value: "E492",
                                    enumerable: false,
                                    configurable: true
                                });
                            }
                    }
                });
                const turbopackConnectedMessage = {
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_CONNECTED,
                    data: {
                        sessionId
                    }
                };
                sendToClient(client, turbopackConnectedMessage);
                const errors = [];
                for (const entryIssues of currentEntryIssues.values()){
                    for (const issue of entryIssues.values()){
                        if (issue.severity !== 'warning') {
                            errors.push({
                                message: (0, _utils3.formatIssue)(issue)
                            });
                        } else {
                            (0, _turbopackutils.printNonFatalIssue)(issue);
                        }
                    }
                }
                if (_devindicatorserverstate.devIndicatorServerState.disabledUntil < Date.now()) {
                    _devindicatorserverstate.devIndicatorServerState.disabledUntil = 0;
                }
                ;
                (async function() {
                    const versionInfo = await getVersionInfoCached();
                    const devToolsConfig = await (0, _devtoolsconfigmiddleware.getDevToolsConfig)(distDir);
                    const syncMessage = {
                        type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SYNC,
                        errors,
                        warnings: [],
                        hash: '',
                        versionInfo,
                        debug: {
                            devtoolsFrontendUrl
                        },
                        devIndicator: _devindicatorserverstate.devIndicatorServerState,
                        devToolsConfig
                    };
                    sendToClient(client, syncMessage);
                    if (htmlRequestId) {
                        (0, _debugchannel.connectReactDebugChannelForHtmlRequest)(htmlRequestId, sendToClient.bind(null, client));
                    }
                })();
            });
        },
        send (action) {
            const payload = JSON.stringify(action);
            for (const client of [
                ...clientsWithoutHtmlRequestId,
                ...clientsByHtmlRequestId.values()
            ]){
                client.send(payload);
            }
        },
        sendToLegacyClients (action) {
            const payload = JSON.stringify(action);
            // Clients with a request ID are inferred App Router clients. If Cache
            // Components is not enabled, we consider those legacy clients. Pages
            // Router clients are also considered legacy clients. TODO: Maybe mark
            // clients as App Router / Pages Router clients explicitly, instead of
            // inferring it from the presence of a request ID.
            if (!nextConfig.cacheComponents) {
                for (const client of clientsByHtmlRequestId.values()){
                    client.send(payload);
                }
            }
            for (const client of clientsWithoutHtmlRequestId){
                client.send(payload);
            }
        },
        setCacheStatus (status, htmlRequestId) {
            // Legacy clients don't have Cache Components.
            const client = clientsByHtmlRequestId.get(htmlRequestId);
            if (client !== undefined) {
                sendToClient(client, {
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CACHE_INDICATOR,
                    state: status
                });
            } else {
                // If the client is not connected, store the status so that we can send it
                // when the client connects.
                cacheStatusesByHtmlRequestId.set(htmlRequestId, status);
            }
        },
        setReactDebugChannel (debugChannel, htmlRequestId, requestId) {
            const client = clientsByHtmlRequestId.get(htmlRequestId);
            if (htmlRequestId === requestId) {
                // The debug channel is for the HTML request.
                if (client) {
                    // If the client is connected, we can connect the debug channel for
                    // the HTML request immediately.
                    (0, _debugchannel.connectReactDebugChannel)(htmlRequestId, debugChannel, sendToClient.bind(null, client));
                } else {
                    // Otherwise, we'll do that when the client connects and just store
                    // the debug channel.
                    (0, _debugchannel.setReactDebugChannelForHtmlRequest)(htmlRequestId, debugChannel);
                }
            } else if (client) {
                // The debug channel is for a subsequent request (e.g. client-side
                // navigation for server function call). If the client is not connected
                // anymore, we don't need to connect the debug channel.
                (0, _debugchannel.connectReactDebugChannel)(requestId, debugChannel, sendToClient.bind(null, client));
            }
        },
        setHmrServerError (_error) {
        // Not implemented yet.
        },
        clearHmrServerError () {
        // Not implemented yet.
        },
        async start () {},
        async getCompilationErrors (page) {
            const appEntryKey = (0, _entrykey.getEntryKey)('app', 'server', page);
            const pagesEntryKey = (0, _entrykey.getEntryKey)('pages', 'server', page);
            const topLevelIssues = currentTopLevelIssues.values();
            const thisEntryIssues = currentEntryIssues.get(appEntryKey) ?? currentEntryIssues.get(pagesEntryKey);
            if (thisEntryIssues !== undefined && thisEntryIssues.size > 0) {
                // If there is an error related to the requesting page we display it instead of the first error
                return [
                    ...topLevelIssues,
                    ...thisEntryIssues.values()
                ].map((issue)=>{
                    const formattedIssue = (0, _utils3.formatIssue)(issue);
                    if (issue.severity === 'warning') {
                        (0, _turbopackutils.printNonFatalIssue)(issue);
                        return null;
                    } else if ((0, _utils3.isWellKnownError)(issue)) {
                        _log.error(formattedIssue);
                    }
                    return Object.defineProperty(new Error(formattedIssue), "__NEXT_ERROR_CODE", {
                        value: "E394",
                        enumerable: false,
                        configurable: true
                    });
                }).filter((error)=>error !== null);
            }
            // Otherwise, return all errors across pages
            const errors = [];
            for (const issue of topLevelIssues){
                if (issue.severity !== 'warning') {
                    errors.push(Object.defineProperty(new Error((0, _utils3.formatIssue)(issue)), "__NEXT_ERROR_CODE", {
                        value: "E394",
                        enumerable: false,
                        configurable: true
                    }));
                }
            }
            for (const entryIssues of currentEntryIssues.values()){
                for (const issue of entryIssues.values()){
                    if (issue.severity !== 'warning') {
                        const message = (0, _utils3.formatIssue)(issue);
                        errors.push(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                            value: "E394",
                            enumerable: false,
                            configurable: true
                        }));
                    } else {
                        (0, _turbopackutils.printNonFatalIssue)(issue);
                    }
                }
            }
            return errors;
        },
        async invalidate ({ reloadAfterInvalidation }) {
            if (reloadAfterInvalidation) {
                for (const [key, entrypoint] of currentWrittenEntrypoints){
                    clearRequireCache(key, entrypoint, {
                        force: true
                    });
                }
                await (0, _renderserver.clearAllModuleContexts)();
                this.send({
                    type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_COMPONENT_CHANGES,
                    hash: String(++hmrHash)
                });
            }
        },
        async buildFallbackError () {
        // Not implemented yet.
        },
        async ensurePage ({ page: inputPage, // clientOnly,
        appPaths, definition, isApp, url: requestUrl }) {
            // When there is no route definition this is an internal file not a route the user added.
            // Middleware and instrumentation are handled in turbpack-utils.ts handleEntrypoints instead.
            if (!definition) {
                if (inputPage === '/middleware') return;
                if (inputPage === '/src/middleware') return;
                if (inputPage === '/instrumentation') return;
                if (inputPage === '/src/instrumentation') return;
            }
            return hotReloaderSpan.traceChild('ensure-page', {
                inputPage
            }).traceAsyncFn(async ()=>{
                if (_constants.BLOCKED_PAGES.includes(inputPage) && inputPage !== '/_error') {
                    return;
                }
                await currentEntriesHandling;
                // TODO We shouldn't look into the filesystem again. This should use the information from entrypoints
                let routeDef = definition ?? await (0, _ondemandentryhandler.findPagePathData)(projectPath, inputPage, nextConfig.pageExtensions, opts.pagesDir, opts.appDir, !!nextConfig.experimental.globalNotFound);
                // If the route is actually an app page route, then we should have access
                // to the app route definition, and therefore, the appPaths from it.
                if (!appPaths && definition && (0, _apppageroutedefinition.isAppPageRouteDefinition)(definition)) {
                    appPaths = definition.appPaths;
                }
                let page = routeDef.page;
                if (appPaths) {
                    const normalizedPage = (0, _apppaths.normalizeAppPath)(page);
                    // filter out paths that are not exact matches (e.g. catchall)
                    const matchingAppPaths = appPaths.filter((path)=>(0, _apppaths.normalizeAppPath)(path) === normalizedPage);
                    // the last item in the array is the root page, if there are parallel routes
                    page = matchingAppPaths[matchingAppPaths.length - 1];
                }
                const pathname = (definition == null ? void 0 : definition.pathname) ?? inputPage;
                if (page === '/_error') {
                    let finishBuilding = startBuilding(pathname, requestUrl, false);
                    try {
                        await (0, _turbopackutils.handlePagesErrorRoute)({
                            currentEntryIssues,
                            entrypoints: currentEntrypoints,
                            manifestLoader,
                            devRewrites: opts.fsChecker.rewrites,
                            productionRewrites: undefined,
                            logErrors: true,
                            hooks: {
                                subscribeToChanges,
                                handleWrittenEndpoint: (id, result, forceDeleteCache)=>{
                                    currentWrittenEntrypoints.set(id, result);
                                    assetMapper.setPathsForKey(id, result.clientPaths);
                                    return clearRequireCache(id, result, {
                                        force: forceDeleteCache
                                    });
                                }
                            }
                        });
                    } finally{
                        finishBuilding();
                    }
                    return;
                }
                const isInsideAppDir = routeDef.bundlePath.startsWith('app/');
                const isEntryMetadataRouteFile = (0, _ismetadataroute.isMetadataRouteFile)(routeDef.filename.replace(opts.appDir || '', ''), nextConfig.pageExtensions, true);
                const normalizedAppPage = isEntryMetadataRouteFile ? (0, _turbopackutils.normalizedPageToTurbopackStructureRoute)(page, (0, _path.extname)(routeDef.filename)) : page;
                const route = isInsideAppDir ? currentEntrypoints.app.get(normalizedAppPage) : currentEntrypoints.page.get(page);
                if (!route) {
                    // TODO: why is this entry missing in turbopack?
                    if (page === '/middleware') return;
                    if (page === '/src/middleware') return;
                    if (page === '/proxy') return;
                    if (page === '/src/proxy') return;
                    if (page === '/instrumentation') return;
                    if (page === '/src/instrumentation') return;
                    throw new _utils.PageNotFoundError(`route not found ${page}`);
                }
                // We don't throw on ensureOpts.isApp === true for page-api
                // since this can happen when app pages make
                // api requests to page API routes.
                if (isApp && route.type === 'page') {
                    throw Object.defineProperty(new Error(`mis-matched route type: isApp && page for ${page}`), "__NEXT_ERROR_CODE", {
                        value: "E373",
                        enumerable: false,
                        configurable: true
                    });
                }
                const finishBuilding = startBuilding(pathname, requestUrl, false);
                try {
                    await (0, _turbopackutils.handleRouteType)({
                        dev,
                        page,
                        pathname,
                        route,
                        currentEntryIssues,
                        entrypoints: currentEntrypoints,
                        manifestLoader,
                        readyIds,
                        devRewrites: opts.fsChecker.rewrites,
                        productionRewrites: undefined,
                        logErrors: true,
                        hooks: {
                            subscribeToChanges,
                            handleWrittenEndpoint: (id, result, forceDeleteCache)=>{
                                currentWrittenEntrypoints.set(id, result);
                                assetMapper.setPathsForKey(id, result.clientPaths);
                                return clearRequireCache(id, result, {
                                    force: forceDeleteCache
                                });
                            }
                        }
                    });
                } finally{
                    finishBuilding();
                }
            });
        },
        close () {
            // Report MCP telemetry if MCP server is enabled
            (0, _mcptelemetrytracker.recordMcpTelemetry)(opts.telemetry);
            for (const wsClient of [
                ...clientsWithoutHtmlRequestId,
                ...clientsByHtmlRequestId.values()
            ]){
                // it's okay to not cleanly close these websocket connections, this is dev
                wsClient.terminate();
            }
            clientsWithoutHtmlRequestId.clear();
            clientsByHtmlRequestId.clear();
        }
    };
    handleEntrypointsSubscription().catch((err)=>{
        console.error(err);
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(1);
    });
    // Write empty manifests
    await currentEntriesHandling;
    await manifestLoader.writeManifests({
        devRewrites: opts.fsChecker.rewrites,
        productionRewrites: undefined,
        entrypoints: currentEntrypoints
    });
    async function handleProjectUpdates() {
        for await (const updateMessage of project.updateInfoSubscribe(30)){
            switch(updateMessage.updateType){
                case 'start':
                    {
                        hotReloader.send({
                            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILDING
                        });
                        break;
                    }
                case 'end':
                    {
                        sendEnqueuedMessages();
                        function addToErrorsMap(errorsMap, issueMap) {
                            for (const [key, issue] of issueMap){
                                if (issue.severity === 'warning') continue;
                                if (errorsMap.has(key)) continue;
                                const message = (0, _utils3.formatIssue)(issue);
                                errorsMap.set(key, {
                                    message,
                                    details: issue.detail ? (0, _utils3.renderStyledStringToErrorAnsi)(issue.detail) : undefined
                                });
                            }
                        }
                        function addErrors(errorsMap, issues) {
                            for (const issueMap of issues.values()){
                                addToErrorsMap(errorsMap, issueMap);
                            }
                        }
                        const errors = new Map();
                        addToErrorsMap(errors, currentTopLevelIssues);
                        addErrors(errors, currentEntryIssues);
                        for (const client of [
                            ...clientsWithoutHtmlRequestId,
                            ...clientsByHtmlRequestId.values()
                        ]){
                            const state = clientStates.get(client);
                            if (!state) {
                                continue;
                            }
                            const clientErrors = new Map(errors);
                            addErrors(clientErrors, state.clientIssues);
                            sendToClient(client, {
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILT,
                                hash: String(++hmrHash),
                                errors: [
                                    ...clientErrors.values()
                                ],
                                warnings: []
                            });
                        }
                        if (hmrEventHappened) {
                            const time = updateMessage.value.duration;
                            const timeMessage = time > 2000 ? `${Math.round(time / 100) / 10}s` : `${time}ms`;
                            _log.event(`Compiled in ${timeMessage}`);
                            hmrEventHappened = false;
                        }
                        break;
                    }
                default:
            }
        }
    }
    handleProjectUpdates().catch((err)=>{
        console.error(err);
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(1);
    });
    return hotReloader;
} //# sourceMappingURL=hot-reloader-turbopack.js.map
}),
]);

//# sourceMappingURL=661c0_next_dist_server_dev_c234e78c._.js.map