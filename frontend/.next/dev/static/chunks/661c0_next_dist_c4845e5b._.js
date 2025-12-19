(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    setGlobal: null,
    traceGlobals: null,
    traceId: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    setGlobal: function() {
        return setGlobal;
    },
    traceGlobals: function() {
        return traceGlobals;
    },
    traceId: function() {
        return traceId;
    }
});
const _nodecrypto = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
let _traceGlobals = /*TURBOPACK member replacement*/ __turbopack_context__.g._traceGlobals;
if (!_traceGlobals) {
    _traceGlobals = new Map();
}
/*TURBOPACK member replacement*/ __turbopack_context__.g._traceGlobals = _traceGlobals;
const traceGlobals = _traceGlobals;
const setGlobal = (key, val)=>{
    traceGlobals.set(key, val);
};
const traceId = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.TRACE_ID || __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PRIVATE_TRACE_ID || (0, _nodecrypto.randomBytes)(8).toString('hex'); //# sourceMappingURL=shared.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/trace/report/to-telemetry.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-client] (ecmascript)");
const TRACE_EVENT_ACCESSLIST = new Map(Object.entries({
    'webpack-invalidated': 'WEBPACK_INVALIDATED'
}));
const reportToTelemetry = ({ name, duration })=>{
    const eventName = TRACE_EVENT_ACCESSLIST.get(name);
    if (!eventName) {
        return;
    }
    const telemetry = _shared.traceGlobals.get('telemetry');
    if (!telemetry) {
        return;
    }
    telemetry.record({
        eventName,
        payload: {
            durationInMicroseconds: duration
        }
    });
};
const _default = {
    flushAll: ()=>{},
    report: reportToTelemetry
}; //# sourceMappingURL=to-telemetry.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/trace/report/to-json.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    batcher: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    batcher: function() {
        return batcher;
    },
    default: function() {
        return _default;
    }
});
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-client] (ecmascript)");
const _fs = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function batcher(reportEvents) {
    const events = [];
    // Promise queue to ensure events are always sent on flushAll
    const queue = new Set();
    return {
        flushAll: async ()=>{
            await Promise.all(queue);
            if (events.length > 0) {
                await reportEvents(events);
                events.length = 0;
            }
        },
        report: (event)=>{
            events.push(event);
            if (events.length > 100) {
                const evts = events.slice();
                events.length = 0;
                const report = reportEvents(evts);
                queue.add(report);
                report.then(()=>queue.delete(report));
            }
        }
    };
}
let writeStream;
let batch;
const writeStreamOptions = {
    flags: 'a',
    encoding: 'utf8'
};
class RotatingWriteStream {
    constructor(file, sizeLimit){
        this.file = file;
        this.size = 0;
        this.sizeLimit = sizeLimit;
        this.createWriteStream();
    }
    createWriteStream() {
        this.writeStream = _fs.default.createWriteStream(this.file, writeStreamOptions);
    }
    // Recreate the file
    async rotate() {
        await this.end();
        try {
            _fs.default.unlinkSync(this.file);
        } catch (err) {
            // It's fine if the file does not exist yet
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        this.size = 0;
        this.createWriteStream();
        this.rotatePromise = undefined;
    }
    async write(data) {
        if (this.rotatePromise) await this.rotatePromise;
        this.size += data.length;
        if (this.size > this.sizeLimit) {
            await (this.rotatePromise = this.rotate());
        }
        if (!this.writeStream.write(data, 'utf8')) {
            if (this.drainPromise === undefined) {
                this.drainPromise = new Promise((resolve, _reject)=>{
                    this.writeStream.once('drain', ()=>{
                        this.drainPromise = undefined;
                        resolve();
                    });
                });
            }
            await this.drainPromise;
        }
    }
    end() {
        return new Promise((resolve)=>{
            this.writeStream.end(resolve);
        });
    }
}
function reportToJson(event) {
    const distDir = _shared.traceGlobals.get('distDir');
    const phase = _shared.traceGlobals.get('phase');
    if (!distDir || !phase) {
        return;
    }
    if (!batch) {
        batch = batcher(async (events)=>{
            if (!writeStream) {
                await _fs.default.promises.mkdir(distDir, {
                    recursive: true
                });
                const file = _path.default.join(distDir, 'trace');
                writeStream = new RotatingWriteStream(file, phase === _constants.PHASE_DEVELOPMENT_SERVER ? 52428800 : Infinity);
            }
            const eventsJson = JSON.stringify(events);
            try {
                await writeStream.write(eventsJson + '\n');
            } catch (err) {
                console.log(err);
            }
        });
    }
    batch.report({
        ...event,
        traceId: _shared.traceId
    });
}
const _default = {
    flushAll: (opts)=>batch ? batch.flushAll().then(()=>{
            const phase = _shared.traceGlobals.get('phase');
            // Only end writeStream when manually flushing in production
            if ((opts == null ? void 0 : opts.end) || phase !== _constants.PHASE_DEVELOPMENT_SERVER) {
                return writeStream.end();
            }
        }) : undefined,
    report: reportToJson
}; //# sourceMappingURL=to-json.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/trace/report/to-json-build.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-client] (ecmascript)");
const _fs = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _tojson = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/report/to-json.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let writeStream;
let batch;
const writeStreamOptions = {
    flags: 'a',
    encoding: 'utf8'
};
class RotatingWriteStream {
    constructor(file, sizeLimit){
        this.file = file;
        this.size = 0;
        this.sizeLimit = sizeLimit;
        this.createWriteStream();
    }
    createWriteStream() {
        this.writeStream = _fs.default.createWriteStream(this.file, writeStreamOptions);
    }
    // Recreate the file
    async rotate() {
        await this.end();
        try {
            _fs.default.unlinkSync(this.file);
        } catch (err) {
            // It's fine if the file does not exist yet
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        this.size = 0;
        this.createWriteStream();
        this.rotatePromise = undefined;
    }
    async write(data) {
        if (this.rotatePromise) await this.rotatePromise;
        this.size += data.length;
        if (this.size > this.sizeLimit) {
            await (this.rotatePromise = this.rotate());
        }
        if (!this.writeStream.write(data, 'utf8')) {
            if (this.drainPromise === undefined) {
                this.drainPromise = new Promise((resolve, _reject)=>{
                    this.writeStream.once('drain', ()=>{
                        this.drainPromise = undefined;
                        resolve();
                    });
                });
            }
            await this.drainPromise;
        }
    }
    end() {
        return new Promise((resolve)=>{
            this.writeStream.end(resolve);
        });
    }
}
const allowlistedEvents = new Set([
    'next-build',
    'run-turbopack',
    'run-webpack',
    'run-typescript',
    'run-eslint',
    'static-check',
    'collect-build-traces',
    'static-generation',
    'output-export-full-static-export',
    'adapter-handle-build-complete',
    'output-standalone',
    'telemetry-flush'
]);
function reportToJsonBuild(event) {
    if (!allowlistedEvents.has(event.name)) {
        return;
    }
    const distDir = _shared.traceGlobals.get('distDir');
    const phase = _shared.traceGlobals.get('phase');
    if (!distDir || !phase) {
        return;
    }
    // Only report in production builds
    if (phase !== _constants.PHASE_PRODUCTION_BUILD) {
        return;
    }
    if (!batch) {
        batch = (0, _tojson.batcher)(async (events)=>{
            if (!writeStream) {
                await _fs.default.promises.mkdir(distDir, {
                    recursive: true
                });
                const file = _path.default.join(distDir, 'trace-build');
                writeStream = new RotatingWriteStream(file, phase === _constants.PHASE_DEVELOPMENT_SERVER ? 52428800 : Infinity);
            }
            const eventsJson = JSON.stringify(events);
            try {
                await writeStream.write(eventsJson + '\n');
            } catch (err) {
                console.log(err);
            }
        });
    }
    batch.report({
        ...event,
        traceId: _shared.traceId
    });
}
const _default = {
    flushAll: (opts)=>batch ? batch.flushAll().then(()=>{
            const phase = _shared.traceGlobals.get('phase');
            // Only end writeStream when manually flushing in production
            if ((opts == null ? void 0 : opts.end) || phase !== _constants.PHASE_DEVELOPMENT_SERVER) {
                return writeStream.end();
            }
        }) : undefined,
    report: reportToJsonBuild
}; //# sourceMappingURL=to-json-build.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/trace/report/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "reporter", {
    enumerable: true,
    get: function() {
        return reporter;
    }
});
const _totelemetry = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/report/to-telemetry.js [app-client] (ecmascript)"));
const _tojson = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/report/to-json.js [app-client] (ecmascript)"));
const _tojsonbuild = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/report/to-json-build.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class MultiReporter {
    constructor(reporters){
        this.reporters = [];
        this.reporters = reporters;
    }
    async flushAll(opts) {
        await Promise.all(this.reporters.map((reporter)=>reporter.flushAll(opts)));
    }
    report(event) {
        this.reporters.forEach((reporter)=>reporter.report(event));
    }
}
const reporter = new MultiReporter([
    _tojson.default,
    _tojsonbuild.default,
    _totelemetry.default
]); //# sourceMappingURL=index.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/trace/trace.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Span: null,
    SpanStatus: null,
    clearTraceEvents: null,
    exportTraceState: null,
    flushAllTraces: null,
    getTraceEvents: null,
    initializeTraceState: null,
    recordTraceEvents: null,
    trace: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Span: function() {
        return Span;
    },
    SpanStatus: function() {
        return SpanStatus;
    },
    clearTraceEvents: function() {
        return clearTraceEvents;
    },
    exportTraceState: function() {
        return exportTraceState;
    },
    flushAllTraces: function() {
        return flushAllTraces;
    },
    getTraceEvents: function() {
        return getTraceEvents;
    },
    initializeTraceState: function() {
        return initializeTraceState;
    },
    recordTraceEvents: function() {
        return recordTraceEvents;
    },
    trace: function() {
        return trace;
    }
});
const _report = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/report/index.js [app-client] (ecmascript)");
const NUM_OF_MICROSEC_IN_NANOSEC = BigInt('1000');
const NUM_OF_MILLISEC_IN_NANOSEC = BigInt('1000000');
let count = 0;
const getId = ()=>{
    count++;
    return count;
};
let defaultParentSpanId;
let shouldSaveTraceEvents;
let savedTraceEvents = [];
const RECORD_SPAN_THRESHOLD_MS = parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_TRACE_SPAN_THRESHOLD_MS ?? '-1');
var SpanStatus = /*#__PURE__*/ function(SpanStatus) {
    SpanStatus["Started"] = "started";
    SpanStatus["Stopped"] = "stopped";
    return SpanStatus;
}({});
class Span {
    constructor({ name, parentId, attrs, startTime }){
        this.name = name;
        this.parentId = parentId ?? defaultParentSpanId;
        this.attrs = attrs ? {
            ...attrs
        } : {};
        this.status = "started";
        this.id = getId();
        this._start = startTime || __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hrtime.bigint();
        // hrtime cannot be used to reconstruct tracing span's actual start time
        // since it does not have relation to clock time:
        // `These times are relative to an arbitrary time in the past, and not related to the time of day and therefore not subject to clock drift`
        // https://nodejs.org/api/process.html#processhrtimetime
        // Capturing current datetime as additional metadata for external reconstruction.
        this.now = Date.now();
    }
    // Durations are reported as microseconds. This gives 1000x the precision
    // of something like Date.now(), which reports in milliseconds.
    // Additionally, ~285 years can be safely represented as microseconds as
    // a float64 in both JSON and JavaScript.
    stop(stopTime) {
        if (this.status === "stopped") {
            // Don't report the same span twice.
            // TODO: In the future this should throw as `.stop()` shouldn't be called multiple times.
            return;
        }
        const end = stopTime || __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hrtime.bigint();
        const duration = (end - this._start) / NUM_OF_MICROSEC_IN_NANOSEC;
        this.status = "stopped";
        if (duration > Number.MAX_SAFE_INTEGER) {
            throw Object.defineProperty(new Error(`Duration is too long to express as float64: ${duration}`), "__NEXT_ERROR_CODE", {
                value: "E513",
                enumerable: false,
                configurable: true
            });
        }
        const timestamp = this._start / NUM_OF_MICROSEC_IN_NANOSEC;
        const traceEvent = {
            name: this.name,
            duration: Number(duration),
            timestamp: Number(timestamp),
            id: this.id,
            parentId: this.parentId,
            tags: this.attrs,
            startTime: this.now
        };
        if (duration > RECORD_SPAN_THRESHOLD_MS * 1000) {
            _report.reporter.report(traceEvent);
            if (shouldSaveTraceEvents) {
                savedTraceEvents.push(traceEvent);
            }
        }
    }
    traceChild(name, attrs) {
        return new Span({
            name,
            parentId: this.id,
            attrs
        });
    }
    manualTraceChild(name, startTime, stopTime, attrs) {
        // We need to convert the time info to the same base as hrtime since that is used usually.
        const correction = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hrtime.bigint() - BigInt(Date.now()) * NUM_OF_MILLISEC_IN_NANOSEC;
        const span = new Span({
            name,
            parentId: this.id,
            attrs,
            startTime: startTime ? startTime + correction : __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hrtime.bigint()
        });
        span.stop(stopTime ? stopTime + correction : __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].hrtime.bigint());
    }
    getId() {
        return this.id;
    }
    setAttribute(key, value) {
        this.attrs[key] = value;
    }
    traceFn(fn) {
        try {
            return fn(this);
        } finally{
            this.stop();
        }
    }
    async traceAsyncFn(fn) {
        try {
            return await fn(this);
        } finally{
            this.stop();
        }
    }
}
const trace = (name, parentId, attrs)=>{
    return new Span({
        name,
        parentId,
        attrs
    });
};
const flushAllTraces = (opts)=>_report.reporter.flushAll(opts);
const exportTraceState = ()=>({
        defaultParentSpanId,
        lastId: count,
        shouldSaveTraceEvents
    });
const initializeTraceState = (state)=>{
    count = state.lastId;
    defaultParentSpanId = state.defaultParentSpanId;
    shouldSaveTraceEvents = state.shouldSaveTraceEvents;
};
function getTraceEvents() {
    return savedTraceEvents;
}
function recordTraceEvents(events) {
    for (const traceEvent of events){
        _report.reporter.report(traceEvent);
        if (traceEvent.id > count) {
            count = traceEvent.id + 1;
        }
    }
    if (shouldSaveTraceEvents) {
        savedTraceEvents.push(...events);
    }
}
const clearTraceEvents = ()=>savedTraceEvents = []; //# sourceMappingURL=trace.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/trace/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Span: null,
    SpanStatus: null,
    exportTraceState: null,
    flushAllTraces: null,
    getTraceEvents: null,
    initializeTraceState: null,
    recordTraceEvents: null,
    setGlobal: null,
    trace: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Span: function() {
        return _trace.Span;
    },
    SpanStatus: function() {
        return _trace.SpanStatus;
    },
    exportTraceState: function() {
        return _trace.exportTraceState;
    },
    flushAllTraces: function() {
        return _trace.flushAllTraces;
    },
    getTraceEvents: function() {
        return _trace.getTraceEvents;
    },
    initializeTraceState: function() {
        return _trace.initializeTraceState;
    },
    recordTraceEvents: function() {
        return _trace.recordTraceEvents;
    },
    setGlobal: function() {
        return _shared.setGlobal;
    },
    trace: function() {
        return _trace.trace;
    }
});
const _trace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/trace.js [app-client] (ecmascript)");
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-client] (ecmascript)"); //# sourceMappingURL=index.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/flush-telemetry.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "flushTelemetry", {
    enumerable: true,
    get: function() {
        return flushTelemetry;
    }
});
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-client] (ecmascript)");
async function flushTelemetry() {
    let telemetry = _shared.traceGlobals.get('telemetry');
    if (telemetry) {
        await telemetry.flush();
    }
} //# sourceMappingURL=flush-telemetry.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/swc-load-failure.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "eventSwcLoadFailure", {
    enumerable: true,
    get: function() {
        return eventSwcLoadFailure;
    }
});
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-client] (ecmascript)");
const _packagejson = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/package.json (json)");
const EVENT_PLUGIN_PRESENT = 'NEXT_SWC_LOAD_FAILURE';
async function eventSwcLoadFailure(event) {
    const telemetry = _shared.traceGlobals.get('telemetry');
    // can't continue if telemetry isn't set
    if (!telemetry) return;
    let glibcVersion;
    let installedSwcPackages;
    try {
        var _process_report;
        // @ts-ignore
        glibcVersion = (_process_report = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].report) == null ? void 0 : _process_report.getReport().header.glibcVersionRuntime;
    } catch  {}
    try {
        const pkgNames = Object.keys(_packagejson.optionalDependencies || {}).filter((pkg)=>pkg.startsWith('@next/swc'));
        const installedPkgs = [];
        for (const pkg of pkgNames){
            try {
                const { version } = (()=>{
                    const e = new Error("Cannot find module 'unknown'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                })();
                installedPkgs.push(`${pkg}@${version}`);
            } catch  {}
        }
        if (installedPkgs.length > 0) {
            installedSwcPackages = installedPkgs.sort().join(',');
        }
    } catch  {}
    telemetry.record({
        eventName: EVENT_PLUGIN_PRESENT,
        payload: {
            nextVersion: _packagejson.version,
            glibcVersion,
            installedSwcPackages,
            arch: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].arch,
            platform: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform,
            nodeVersion: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.node,
            wasm: event == null ? void 0 : event.wasm,
            nativeBindingsErrorCode: event == null ? void 0 : event.nativeBindingsErrorCode
        }
    });
    // ensure this event is flushed before process exits
    await telemetry.flush();
} //# sourceMappingURL=swc-load-failure.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/version.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "eventCliSession", {
    enumerable: true,
    get: function() {
        return eventCliSession;
    }
});
const EVENT_VERSION = 'NEXT_CLI_SESSION_STARTED';
function eventCliSession(nextConfig, event) {
    var _nextConfig_experimental_staleTimes, _nextConfig_experimental_staleTimes1, _nextConfig_reactCompiler, _nextConfig_reactCompiler1;
    // This should be an invariant, if it fails our build tooling is broken.
    if (typeof "16.0.7" !== 'string') {
        return [];
    }
    const { images, i18n } = nextConfig || {};
    const payload = {
        nextVersion: "16.0.7",
        nodeVersion: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].version,
        cliCommand: event.cliCommand,
        isSrcDir: event.isSrcDir,
        hasNowJson: event.hasNowJson,
        isCustomServer: event.isCustomServer,
        hasNextConfig: nextConfig.configOrigin !== 'default',
        buildTarget: 'default',
        hasWebpackConfig: typeof (nextConfig == null ? void 0 : nextConfig.webpack) === 'function',
        hasBabelConfig: false,
        imageEnabled: !!images,
        imageFutureEnabled: !!images,
        basePathEnabled: !!(nextConfig == null ? void 0 : nextConfig.basePath),
        i18nEnabled: !!i18n,
        locales: (i18n == null ? void 0 : i18n.locales) ? i18n.locales.join(',') : null,
        localeDomainsCount: (i18n == null ? void 0 : i18n.domains) ? i18n.domains.length : null,
        localeDetectionEnabled: !i18n ? null : i18n.localeDetection !== false,
        imageDomainsCount: (images == null ? void 0 : images.domains) ? images.domains.length : null,
        imageRemotePatternsCount: (images == null ? void 0 : images.remotePatterns) ? images.remotePatterns.length : null,
        imageLocalPatternsCount: (images == null ? void 0 : images.localPatterns) ? images.localPatterns.length : null,
        imageSizes: (images == null ? void 0 : images.imageSizes) ? images.imageSizes.join(',') : null,
        imageQualities: (images == null ? void 0 : images.qualities) ? images.qualities.join(',') : null,
        imageLoader: images == null ? void 0 : images.loader,
        imageFormats: (images == null ? void 0 : images.formats) ? images.formats.join(',') : null,
        nextConfigOutput: (nextConfig == null ? void 0 : nextConfig.output) || null,
        trailingSlashEnabled: !!(nextConfig == null ? void 0 : nextConfig.trailingSlash),
        reactStrictMode: !!(nextConfig == null ? void 0 : nextConfig.reactStrictMode),
        webpackVersion: event.webpackVersion || null,
        turboFlag: event.turboFlag || false,
        isRspack: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_RSPACK !== undefined,
        appDir: event.appDir,
        pagesDir: event.pagesDir,
        staticStaleTime: ((_nextConfig_experimental_staleTimes = nextConfig.experimental.staleTimes) == null ? void 0 : _nextConfig_experimental_staleTimes.static) ?? null,
        dynamicStaleTime: ((_nextConfig_experimental_staleTimes1 = nextConfig.experimental.staleTimes) == null ? void 0 : _nextConfig_experimental_staleTimes1.dynamic) ?? null,
        reactCompiler: Boolean(nextConfig.reactCompiler),
        reactCompilerCompilationMode: typeof nextConfig.reactCompiler !== 'boolean' ? ((_nextConfig_reactCompiler = nextConfig.reactCompiler) == null ? void 0 : _nextConfig_reactCompiler.compilationMode) ?? null : null,
        reactCompilerPanicThreshold: typeof nextConfig.reactCompiler !== 'boolean' ? ((_nextConfig_reactCompiler1 = nextConfig.reactCompiler) == null ? void 0 : _nextConfig_reactCompiler1.panicThreshold) ?? null : null
    };
    return [
        {
            eventName: EVENT_VERSION,
            payload
        }
    ];
} //# sourceMappingURL=version.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/build.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ERROR_THROWN_EVENT: null,
    EVENT_BUILD_FEATURE_USAGE: null,
    EVENT_MCP_TOOL_USAGE: null,
    EVENT_NAME_PACKAGE_USED_IN_GET_SERVER_SIDE_PROPS: null,
    eventBuildCompleted: null,
    eventBuildFailed: null,
    eventBuildFeatureUsage: null,
    eventBuildOptimize: null,
    eventErrorThrown: null,
    eventLintCheckCompleted: null,
    eventMcpToolUsage: null,
    eventPackageUsedInGetServerSideProps: null,
    eventTypeCheckCompleted: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ERROR_THROWN_EVENT: function() {
        return ERROR_THROWN_EVENT;
    },
    EVENT_BUILD_FEATURE_USAGE: function() {
        return EVENT_BUILD_FEATURE_USAGE;
    },
    EVENT_MCP_TOOL_USAGE: function() {
        return EVENT_MCP_TOOL_USAGE;
    },
    EVENT_NAME_PACKAGE_USED_IN_GET_SERVER_SIDE_PROPS: function() {
        return EVENT_NAME_PACKAGE_USED_IN_GET_SERVER_SIDE_PROPS;
    },
    eventBuildCompleted: function() {
        return eventBuildCompleted;
    },
    eventBuildFailed: function() {
        return eventBuildFailed;
    },
    eventBuildFeatureUsage: function() {
        return eventBuildFeatureUsage;
    },
    eventBuildOptimize: function() {
        return eventBuildOptimize;
    },
    eventErrorThrown: function() {
        return eventErrorThrown;
    },
    eventLintCheckCompleted: function() {
        return eventLintCheckCompleted;
    },
    eventMcpToolUsage: function() {
        return eventMcpToolUsage;
    },
    eventPackageUsedInGetServerSideProps: function() {
        return eventPackageUsedInGetServerSideProps;
    },
    eventTypeCheckCompleted: function() {
        return eventTypeCheckCompleted;
    }
});
const _errortelemetryutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/error-telemetry-utils.js [app-client] (ecmascript)");
const REGEXP_DIRECTORY_DUNDER = /[\\/]__[^\\/]+(?<![\\/]__(?:tests|mocks))__[\\/]/i;
const REGEXP_DIRECTORY_TESTS = /[\\/]__(tests|mocks)__[\\/]/i;
const REGEXP_FILE_TEST = /\.(?:spec|test)\.[^.]+$/i;
const EVENT_TYPE_CHECK_COMPLETED = 'NEXT_TYPE_CHECK_COMPLETED';
function eventTypeCheckCompleted(event) {
    return {
        eventName: EVENT_TYPE_CHECK_COMPLETED,
        payload: event
    };
}
const EVENT_LINT_CHECK_COMPLETED = 'NEXT_LINT_CHECK_COMPLETED';
function eventLintCheckCompleted(event) {
    return {
        eventName: EVENT_LINT_CHECK_COMPLETED,
        payload: event
    };
}
const EVENT_BUILD_COMPLETED = 'NEXT_BUILD_COMPLETED';
function eventBuildCompleted(pagePaths, event) {
    return {
        eventName: EVENT_BUILD_COMPLETED,
        payload: {
            ...event,
            totalPageCount: pagePaths.length,
            hasDunderPages: pagePaths.some((path)=>REGEXP_DIRECTORY_DUNDER.test(path)),
            hasTestPages: pagePaths.some((path)=>REGEXP_DIRECTORY_TESTS.test(path) || REGEXP_FILE_TEST.test(path)),
            totalAppPagesCount: event.totalAppPagesCount
        }
    };
}
const EVENT_BUILD_FAILED = 'NEXT_BUILD_FAILED';
function eventBuildFailed(event) {
    return {
        eventName: EVENT_BUILD_FAILED,
        payload: event
    };
}
const EVENT_BUILD_OPTIMIZED = 'NEXT_BUILD_OPTIMIZED';
function eventBuildOptimize(pagePaths, event) {
    return {
        eventName: EVENT_BUILD_OPTIMIZED,
        payload: {
            ...event,
            totalPageCount: pagePaths.length,
            hasDunderPages: pagePaths.some((path)=>REGEXP_DIRECTORY_DUNDER.test(path)),
            hasTestPages: pagePaths.some((path)=>REGEXP_DIRECTORY_TESTS.test(path) || REGEXP_FILE_TEST.test(path)),
            totalAppPagesCount: event.totalAppPagesCount,
            staticAppPagesCount: event.staticAppPagesCount,
            serverAppPagesCount: event.serverAppPagesCount,
            edgeRuntimeAppCount: event.edgeRuntimeAppCount,
            edgeRuntimePagesCount: event.edgeRuntimePagesCount,
            isRspack: __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_RSPACK !== undefined
        }
    };
}
const EVENT_BUILD_FEATURE_USAGE = 'NEXT_BUILD_FEATURE_USAGE';
function eventBuildFeatureUsage(usages) {
    return usages.map(({ featureName, invocationCount })=>({
            eventName: EVENT_BUILD_FEATURE_USAGE,
            payload: {
                featureName,
                invocationCount
            }
        }));
}
const EVENT_NAME_PACKAGE_USED_IN_GET_SERVER_SIDE_PROPS = 'NEXT_PACKAGE_USED_IN_GET_SERVER_SIDE_PROPS';
function eventPackageUsedInGetServerSideProps(packagesUsedInServerSideProps) {
    return packagesUsedInServerSideProps.map((packageName)=>({
            eventName: EVENT_NAME_PACKAGE_USED_IN_GET_SERVER_SIDE_PROPS,
            payload: {
                package: packageName
            }
        }));
}
const EVENT_MCP_TOOL_USAGE = 'NEXT_MCP_TOOL_USAGE';
function eventMcpToolUsage(usages) {
    return usages.map(({ featureName, invocationCount })=>({
            eventName: EVENT_MCP_TOOL_USAGE,
            payload: {
                toolName: featureName,
                invocationCount
            }
        }));
}
const ERROR_THROWN_EVENT = 'NEXT_ERROR_THROWN';
function eventErrorThrown(error, anonymizedLocation) {
    return {
        eventName: ERROR_THROWN_EVENT,
        payload: {
            errorCode: (0, _errortelemetryutils.extractNextErrorCode)(error) || 'Unknown',
            location: anonymizedLocation
        }
    };
} //# sourceMappingURL=build.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/plugins.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "eventNextPlugins", {
    enumerable: true,
    get: function() {
        return eventNextPlugins;
    }
});
const _findup = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/find-up/index.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const EVENT_PLUGIN_PRESENT = 'NEXT_PACKAGE_DETECTED';
async function eventNextPlugins(dir) {
    try {
        const packageJsonPath = await (0, _findup.default)('package.json', {
            cwd: dir
        });
        if (!packageJsonPath) {
            return [];
        }
        const { dependencies = {}, devDependencies = {} } = (()=>{
            const e = new Error("Cannot find module as expression is too dynamic");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })();
        const deps = {
            ...devDependencies,
            ...dependencies
        };
        return Object.keys(deps).reduce((events, plugin)=>{
            const version = deps[plugin];
            // Don't add deps without a version set
            if (!version) {
                return events;
            }
            events.push({
                eventName: EVENT_PLUGIN_PRESENT,
                payload: {
                    packageName: plugin,
                    packageVersion: version
                }
            });
            return events;
        }, []);
    } catch (_) {
        return [];
    }
} //# sourceMappingURL=plugins.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    EVENT_MCP_TOOL_USAGE: null,
    eventMcpToolUsage: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    EVENT_MCP_TOOL_USAGE: function() {
        return _build.EVENT_MCP_TOOL_USAGE;
    },
    eventMcpToolUsage: function() {
        return _build.eventMcpToolUsage;
    }
});
0 && __export(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/version.js [app-client] (ecmascript)")) && __export(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/build.js [app-client] (ecmascript)")) && __export(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/plugins.js [app-client] (ecmascript)"));
_export_star(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/version.js [app-client] (ecmascript)"), exports);
const _build = _export_star(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/build.js [app-client] (ecmascript)"), exports);
_export_star(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/plugins.js [app-client] (ecmascript)"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
} //# sourceMappingURL=index.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/detached-flush.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _fs = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _storage = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/storage.js [app-client] (ecmascript)");
const _config = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/config.js [app-client] (ecmascript)"));
const _getprojectdir = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/get-project-dir.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(async ()=>{
    const args = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].argv
    ];
    const eventsFile = args.pop();
    let dir = args.pop();
    const mode = args.pop();
    if (!dir || mode !== 'dev') {
        throw Object.defineProperty(new Error(`Invalid flags should be run as node detached-flush dev ./path-to/project [eventsFile]`), "__NEXT_ERROR_CODE", {
            value: "E908",
            enumerable: false,
            configurable: true
        });
    }
    dir = (0, _getprojectdir.getProjectDir)(dir);
    const config = await (0, _config.default)(_constants.PHASE_DEVELOPMENT_SERVER, dir);
    const distDir = _path.default.join(dir, config.distDir || '.next');
    // Support both old format (no eventsFile arg) and new format (with eventsFile arg)
    const eventsPath = _path.default.join(distDir, eventsFile && !eventsFile.includes('/') ? eventsFile : '_events.json');
    let events;
    try {
        events = JSON.parse(_fs.default.readFileSync(eventsPath, 'utf8'));
    } catch (err) {
        if (err.code === 'ENOENT') {
            // no events to process we can exit now
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(0);
        }
        throw err;
    }
    const telemetry = new _storage.Telemetry({
        distDir
    });
    await telemetry.record(events);
    await telemetry.flush();
    // finished flushing events clean-up
    _fs.default.unlinkSync(eventsPath);
// Don't call process.exit() here - let Node.js exit naturally after
// all pending work completes (e.g., setTimeout in debug telemetry)
})(); //# sourceMappingURL=detached-flush.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/anonymous-meta.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAnonymousMeta", {
    enumerable: true,
    get: function() {
        return getAnonymousMeta;
    }
});
const _isdocker = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/is-docker/index.js [app-client] (ecmascript)"));
const _iswsl = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/is-wsl/index.js [app-client] (ecmascript)"));
const _os = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/os-browserify/browser.js [app-client] (ecmascript)"));
const _ciinfo = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/ci-info.js [app-client] (ecmascript)"));
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
let traits;
function getAnonymousMeta() {
    if (traits) {
        return traits;
    }
    const cpus = _os.default.cpus() || [];
    const { NOW_REGION } = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env;
    traits = {
        // Software information
        systemPlatform: _os.default.platform(),
        systemRelease: _os.default.release(),
        systemArchitecture: _os.default.arch(),
        // Machine information
        cpuCount: cpus.length,
        cpuModel: cpus.length ? cpus[0].model : null,
        cpuSpeed: cpus.length ? cpus[0].speed : null,
        memoryInMb: Math.trunc(_os.default.totalmem() / Math.pow(1024, 2)),
        // Environment information
        isDocker: (0, _isdocker.default)(),
        isNowDev: NOW_REGION === 'dev1',
        isWsl: _iswsl.default,
        isCI: _ciinfo.isCI,
        ciName: _ciinfo.isCI && _ciinfo.name || null,
        nextVersion: "16.0.7"
    };
    return traits;
} //# sourceMappingURL=anonymous-meta.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/post-telemetry-payload.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "postNextTelemetryPayload", {
    enumerable: true,
    get: function() {
        return postNextTelemetryPayload;
    }
});
const _asyncretry = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/async-retry/index.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function postNextTelemetryPayload(payload, signal) {
    if (!signal && 'timeout' in AbortSignal) {
        signal = AbortSignal.timeout(5000);
    }
    return (0, _asyncretry.default)(()=>fetch('https://telemetry.nextjs.org/api/v1/record', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'content-type': 'application/json'
            },
            signal
        }).then((res)=>{
            if (!res.ok) {
                const err = Object.defineProperty(new Error(res.statusText), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
                err.response = res;
                throw err;
            }
        }), {
        minTimeout: 500,
        retries: 1,
        factor: 1
    }).catch(()=>{
    // We swallow errors when telemetry cannot be sent
    }) // Ensure promise is voided
    .then(()=>{}, ()=>{});
} //# sourceMappingURL=post-telemetry-payload.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/project-id.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRawProjectId", {
    enumerable: true,
    get: function() {
        return getRawProjectId;
    }
});
const _child_process = (()=>{
    const e = new Error("Cannot find module 'child_process'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
// Q: Why does Next.js need a project ID? Why is it looking at my git remote?
// A:
// Next.js' telemetry is and always will be completely anonymous. Because of
// this, we need a way to differentiate different projects to track feature
// usage accurately. For example, to prevent a feature from appearing to be
// constantly `used` and then `unused` when switching between local projects.
// To reiterate,
// we **never** can read your actual git remote. The value is hashed one-way
// with random salt data, making it impossible for us to reverse or try to
// guess the remote by re-computing hashes.
async function _getProjectIdByGit() {
    try {
        let resolve, reject;
        const promise = new Promise((res, rej)=>{
            resolve = res;
            reject = rej;
        });
        (0, _child_process.exec)(`git config --local --get remote.origin.url`, {
            timeout: 1000,
            windowsHide: true
        }, (error, stdout)=>{
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
        return String(await promise).trim();
    } catch (_) {
        return null;
    }
}
async function getRawProjectId() {
    return await _getProjectIdByGit() || __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REPOSITORY_URL || __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd();
} //# sourceMappingURL=project-id.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/storage.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Telemetry", {
    enumerable: true,
    get: function() {
        return Telemetry;
    }
});
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _conf = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/conf/index.js [app-client] (ecmascript)"));
const _crypto = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
const _isdocker = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/is-docker/index.js [app-client] (ecmascript)"));
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _anonymousmeta = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/anonymous-meta.js [app-client] (ecmascript)");
const _ciinfo = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/ci-info.js [app-client] (ecmascript)"));
const _posttelemetrypayload = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/post-telemetry-payload.js [app-client] (ecmascript)");
const _projectid = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/project-id.js [app-client] (ecmascript)");
const _ponyfill = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/@edge-runtime/ponyfill/index.js [app-client] (ecmascript)");
const _fs = /*#__PURE__*/ _interop_require_default((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
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
// This is the key that stores whether or not telemetry is enabled or disabled.
const TELEMETRY_KEY_ENABLED = 'telemetry.enabled';
// This is the key that specifies when the user was informed about anonymous
// telemetry collection.
const TELEMETRY_KEY_NOTIFY_DATE = 'telemetry.notifiedAt';
// This is a quasi-persistent identifier used to dedupe recurring events. It's
// generated from random data and completely anonymous.
const TELEMETRY_KEY_ID = `telemetry.anonymousId`;
// This is the cryptographic salt that is included within every hashed value.
// This salt value is never sent to us, ensuring privacy and the one-way nature
// of the hash (prevents dictionary lookups of pre-computed hashes).
// See the `oneWayHash` function.
const TELEMETRY_KEY_SALT = `telemetry.salt`;
function getStorageDirectory(distDir) {
    const isLikelyEphemeral = _ciinfo.isCI || (0, _isdocker.default)();
    if (isLikelyEphemeral) {
        return _path.default.join(distDir, 'cache');
    }
    return undefined;
}
class Telemetry {
    constructor({ distDir }){
        this.notify = ()=>{
            if (this.isDisabled || !this.conf) {
                return;
            }
            // The end-user has already been notified about our telemetry integration. We
            // don't need to constantly annoy them about it.
            // We will re-inform users about the telemetry if significant changes are
            // ever made.
            if (this.conf.get(TELEMETRY_KEY_NOTIFY_DATE, '')) {
                return;
            }
            this.conf.set(TELEMETRY_KEY_NOTIFY_DATE, Date.now().toString());
            console.log(`${(0, _picocolors.magenta)((0, _picocolors.bold)('Attention'))}: Next.js now collects completely anonymous telemetry regarding usage.`);
            console.log(`This information is used to shape Next.js' roadmap and prioritize features.`);
            console.log(`You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:`);
            console.log((0, _picocolors.cyan)('https://nextjs.org/telemetry'));
            console.log();
        };
        this.setEnabled = (_enabled)=>{
            const enabled = !!_enabled;
            this.conf && this.conf.set(TELEMETRY_KEY_ENABLED, enabled);
            return this.conf && this.conf.path;
        };
        this.oneWayHash = (payload)=>{
            const hash = (0, _crypto.createHash)('sha256');
            // Always prepend the payload value with salt. This ensures the hash is truly
            // one-way.
            hash.update(this.salt);
            // Update is an append operation, not a replacement. The salt from the prior
            // update is still present!
            hash.update(payload);
            return hash.digest('hex');
        };
        this.record = (_events, deferred)=>{
            const prom = (deferred ? // submitRecord which will then be cancelled
            new Promise((resolve)=>resolve({
                    isFulfilled: true,
                    isRejected: false,
                    value: _events
                })) : this.submitRecord(_events)).then((value)=>({
                    isFulfilled: true,
                    isRejected: false,
                    value
                })).catch((reason)=>({
                    isFulfilled: false,
                    isRejected: true,
                    reason
                })) // Acts as `Promise#finally` because `catch` transforms the error
            .then((res)=>{
                // Clean up the event to prevent unbounded `Set` growth
                if (!deferred) {
                    this.queue.delete(prom);
                }
                return res;
            });
            prom._events = Array.isArray(_events) ? _events : [
                _events
            ];
            prom._controller = prom._controller;
            // Track this `Promise` so we can flush pending events
            this.queue.add(prom);
            return prom;
        };
        this.flush = async ()=>{
            return Promise.all(this.queue).catch(()=>null);
        };
        // writes current events to disk and spawns separate
        // detached process to submit the records without blocking
        // the main process from exiting
        this.flushDetached = (mode, dir)=>{
            const allEvents = [];
            this.queue.forEach((item)=>{
                try {
                    var _item__controller;
                    (_item__controller = item._controller) == null ? void 0 : _item__controller.abort();
                    allEvents.push(...item._events);
                } catch (_) {
                // if we fail to abort ignore this event
                }
            });
            if (allEvents.length === 0) {
                // No events to flush
                return;
            }
            _fs.default.mkdirSync(this.distDir, {
                recursive: true
            });
            // Use unique filename per process to avoid race conditions between parent/child
            const eventsFile = `_events_${__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pid}.json`;
            _fs.default.writeFileSync(_path.default.join(this.distDir, eventsFile), JSON.stringify(allEvents));
            // Note: cross-spawn is not used here as it causes
            // a new command window to appear when we don't want it to
            const child_process = (()=>{
                const e = new Error("Cannot find module 'child_process'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })();
            // we use spawnSync when debugging to ensure logs are piped
            // correctly to stdout/stderr
            const spawn = this.NEXT_TELEMETRY_DEBUG ? child_process.spawnSync : child_process.spawn;
            spawn(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].execPath, [
                "[project]/JobPortal/frontend/node_modules/next/dist/telemetry/detached-flush.js [app-client] (ecmascript)",
                mode,
                dir,
                eventsFile
            ], {
                detached: !this.NEXT_TELEMETRY_DEBUG,
                windowsHide: true,
                shell: false,
                ...this.NEXT_TELEMETRY_DEBUG ? {
                    stdio: 'inherit'
                } : {}
            });
        };
        this.submitRecord = async (_events)=>{
            let events;
            if (Array.isArray(_events)) {
                events = _events;
            } else {
                events = [
                    _events
                ];
            }
            if (events.length < 1) {
                return Promise.resolve();
            }
            if (this.NEXT_TELEMETRY_DEBUG) {
                // Return a promise that resolves after logging to ensure the output
                // is captured before the process exits (e.g., during flushDetached)
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        // Print to standard error to simplify selecting the output
                        events.forEach(({ eventName, payload })=>console.error(`[telemetry] ` + JSON.stringify({
                                eventName,
                                payload
                            }, null, 2)));
                        resolve(undefined);
                    }, 100);
                });
            }
            // Skip recording telemetry if the feature is disabled
            if (this.isDisabled) {
                return Promise.resolve();
            }
            const postController = new _ponyfill.AbortController();
            const res = (0, _posttelemetrypayload.postNextTelemetryPayload)({
                context: {
                    anonymousId: this.anonymousId,
                    projectId: await this.getProjectId(),
                    sessionId: this.sessionId
                },
                meta: (0, _anonymousmeta.getAnonymousMeta)(),
                events: events.map(({ eventName, payload })=>({
                        eventName,
                        fields: payload
                    }))
            }, postController.signal);
            res._controller = postController;
            return res;
        };
        // Read in the constructor so that .env can be loaded before reading
        const { NEXT_TELEMETRY_DISABLED, NEXT_TELEMETRY_DEBUG } = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env;
        this.NEXT_TELEMETRY_DISABLED = NEXT_TELEMETRY_DISABLED;
        this.NEXT_TELEMETRY_DEBUG = NEXT_TELEMETRY_DEBUG;
        this.distDir = distDir;
        const storageDirectory = getStorageDirectory(distDir);
        try {
            // `conf` incorrectly throws a permission error during initialization
            // instead of waiting for first use. We need to handle it, otherwise the
            // process may crash.
            this.conf = new _conf.default({
                projectName: 'nextjs',
                cwd: storageDirectory
            });
        } catch (_) {
            this.conf = null;
        }
        this.sessionId = (0, _crypto.randomBytes)(32).toString('hex');
        this.queue = new Set();
        this.notify();
    }
    get anonymousId() {
        const val = this.conf && this.conf.get(TELEMETRY_KEY_ID);
        if (val) {
            return val;
        }
        const generated = (0, _crypto.randomBytes)(32).toString('hex');
        this.conf && this.conf.set(TELEMETRY_KEY_ID, generated);
        return generated;
    }
    get salt() {
        const val = this.conf && this.conf.get(TELEMETRY_KEY_SALT);
        if (val) {
            return val;
        }
        const generated = (0, _crypto.randomBytes)(16).toString('hex');
        this.conf && this.conf.set(TELEMETRY_KEY_SALT, generated);
        return generated;
    }
    get isDisabled() {
        if (!!this.NEXT_TELEMETRY_DISABLED || !this.conf) {
            return true;
        }
        return this.conf.get(TELEMETRY_KEY_ENABLED, true) === false;
    }
    get isEnabled() {
        return !this.NEXT_TELEMETRY_DISABLED && !!this.conf && this.conf.get(TELEMETRY_KEY_ENABLED, true) !== false;
    }
    async getProjectId() {
        this.loadProjectId = this.loadProjectId || (0, _projectid.getRawProjectId)();
        return this.oneWayHash(await this.loadProjectId);
    }
} //# sourceMappingURL=storage.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/error-feedback.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    eventErrorFeedback: null,
    eventNameErrorFeedback: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    eventErrorFeedback: function() {
        return eventErrorFeedback;
    },
    eventNameErrorFeedback: function() {
        return eventNameErrorFeedback;
    }
});
const eventNameErrorFeedback = 'NEXT_ERROR_FEEDBACK';
function eventErrorFeedback(event) {
    return {
        eventName: eventNameErrorFeedback,
        payload: event
    };
} //# sourceMappingURL=error-feedback.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/shared.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getOriginalCodeFrame: null,
    ignoreListAnonymousStackFramesIfSandwiched: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getOriginalCodeFrame: function() {
        return getOriginalCodeFrame;
    },
    ignoreListAnonymousStackFramesIfSandwiched: function() {
        return ignoreListAnonymousStackFramesIfSandwiched;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _codeframe = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/babel/code-frame.js [app-client] (ecmascript)");
const _isinternal = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/is-internal.js [app-client] (ecmascript)"));
const _sourcemaps = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/source-maps.js [app-client] (ecmascript)");
function ignoreListAnonymousStackFramesIfSandwiched(responses) {
    (0, _sourcemaps.ignoreListAnonymousStackFramesIfSandwiched)(responses, (response)=>{
        return response.status === 'fulfilled' && response.value.originalStackFrame !== null && response.value.originalStackFrame.file === '<anonymous>';
    }, (response)=>{
        return response.status === 'fulfilled' && response.value.originalStackFrame !== null && response.value.originalStackFrame.ignored === true;
    }, (response)=>{
        return response.status === 'fulfilled' && response.value.originalStackFrame !== null ? response.value.originalStackFrame.methodName : '';
    }, (response)=>{
        ;
        response.value.originalStackFrame.ignored = true;
    });
}
function getOriginalCodeFrame(frame, source, colors = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stdout.isTTY) {
    if (!source || (0, _isinternal.default)(frame.file)) {
        return null;
    }
    return (0, _codeframe.codeFrameColumns)(source, {
        start: {
            // 1-based, but -1 means start line without highlighting
            line: frame.line1 ?? -1,
            // 1-based, but 0 means whole line without column highlighting
            column: frame.column1 ?? 0
        }
    }, {
        forceColor: colors
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=shared.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/dev-overlay.shim.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    dispatcher: null,
    renderAppDevOverlay: null,
    renderPagesDevOverlay: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    dispatcher: function() {
        return dispatcher;
    },
    renderAppDevOverlay: function() {
        return renderAppDevOverlay;
    },
    renderPagesDevOverlay: function() {
        return renderPagesDevOverlay;
    }
});
function renderAppDevOverlay() {
    throw Object.defineProperty(new Error("Next DevTools: Can't render in this environment. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
        value: "E697",
        enumerable: false,
        configurable: true
    });
}
function renderPagesDevOverlay() {
    throw Object.defineProperty(new Error("Next DevTools: Can't render in this environment. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
        value: "E697",
        enumerable: false,
        configurable: true
    });
}
const dispatcher = new Proxy({}, {
    get: (_, prop)=>{
        return ()=>{
            throw Object.defineProperty(new Error(`Next DevTools: Can't dispatch ${String(prop)} in this environment. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
                value: "E698",
                enumerable: false,
                configurable: true
            });
        };
    }
});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=dev-overlay.shim.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/react-18-hydration-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getHydrationWarningType: null,
    isHydrationError: null,
    isHydrationWarning: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getHydrationWarningType: function() {
        return getHydrationWarningType;
    },
    isHydrationError: function() {
        return isHydrationError;
    },
    isHydrationWarning: function() {
        return isHydrationWarning;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _iserror = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)"));
function isHydrationError(error) {
    return (0, _iserror.default)(error) && (error.message === 'Hydration failed because the initial UI does not match what was rendered on the server.' || error.message === 'Text content does not match server-rendered HTML.');
}
function isHydrationWarning(message) {
    return isHtmlTagsWarning(message) || isTextInTagsMismatchWarning(message) || isTextWarning(message);
}
// https://github.com/facebook/react/blob/main/packages/react-dom/src/__tests__/ReactDOMHydrationDiff-test.js used as a reference
const htmlTagsWarnings = new Set([
    'Warning: Expected server HTML to contain a matching <%s> in <%s>.%s',
    'Warning: Did not expect server HTML to contain a <%s> in <%s>.%s'
]);
const textAndTagsMismatchWarnings = new Set([
    'Warning: Expected server HTML to contain a matching text node for "%s" in <%s>.%s',
    'Warning: Did not expect server HTML to contain the text node "%s" in <%s>.%s'
]);
const textWarnings = new Set([
    'Warning: Text content did not match. Server: "%s" Client: "%s"%s'
]);
const getHydrationWarningType = (message)=>{
    if (typeof message !== 'string') {
        // TODO: Doesn't make sense to treat no message as a hydration error message.
        // We should bail out somewhere earlier.
        return 'text';
    }
    const normalizedMessage = message.startsWith('Warning: ') ? message : `Warning: ${message}`;
    if (isHtmlTagsWarning(normalizedMessage)) return 'tag';
    if (isTextInTagsMismatchWarning(normalizedMessage)) return 'text-in-tag';
    return 'text';
};
const isHtmlTagsWarning = (message)=>typeof message === 'string' && htmlTagsWarnings.has(message);
const isTextInTagsMismatchWarning = (msg)=>typeof msg === 'string' && textAndTagsMismatchWarnings.has(msg);
const isTextWarning = (msg)=>typeof msg === 'string' && textWarnings.has(msg);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=react-18-hydration-error.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/react-19-hydration-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXTJS_HYDRATION_ERROR_LINK: null,
    REACT_HYDRATION_ERROR_LINK: null,
    getHydrationErrorStackInfo: null,
    isErrorMessageWithComponentStackDiff: null,
    isHydrationError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXTJS_HYDRATION_ERROR_LINK: function() {
        return NEXTJS_HYDRATION_ERROR_LINK;
    },
    REACT_HYDRATION_ERROR_LINK: function() {
        return REACT_HYDRATION_ERROR_LINK;
    },
    getHydrationErrorStackInfo: function() {
        return getHydrationErrorStackInfo;
    },
    isErrorMessageWithComponentStackDiff: function() {
        return isErrorMessageWithComponentStackDiff;
    },
    isHydrationError: function() {
        return isHydrationError;
    }
});
const REACT_HYDRATION_ERROR_LINK = 'https://react.dev/link/hydration-mismatch';
const NEXTJS_HYDRATION_ERROR_LINK = 'https://nextjs.org/docs/messages/react-hydration-error';
/**
 * Only React 19+ contains component stack diff in the error message
 */ const errorMessagesWithComponentStackDiff = [
    /^In HTML, (.+?) cannot be a child of <(.+?)>\.(.*)\nThis will cause a hydration error\.(.*)/,
    /^In HTML, (.+?) cannot be a descendant of <(.+?)>\.\nThis will cause a hydration error\.(.*)/,
    /^In HTML, text nodes cannot be a child of <(.+?)>\.\nThis will cause a hydration error\./,
    /^In HTML, whitespace text nodes cannot be a child of <(.+?)>\. Make sure you don't have any extra whitespace between tags on each line of your source code\.\nThis will cause a hydration error\./
];
function isHydrationError(error) {
    return isErrorMessageWithComponentStackDiff(error.message) || /Hydration failed because the server rendered (text|HTML) didn't match the client\./.test(error.message) || /A tree hydrated but some attributes of the server rendered HTML didn't match the client properties./.test(error.message);
}
function isErrorMessageWithComponentStackDiff(msg) {
    return errorMessagesWithComponentStackDiff.some((regex)=>regex.test(msg));
}
function getHydrationErrorStackInfo(error) {
    const errorMessage = error.message;
    if (isErrorMessageWithComponentStackDiff(errorMessage)) {
        const [message, diffLog = ''] = errorMessage.split('\n\n');
        const diff = diffLog.trim();
        return {
            message: diff === '' ? errorMessage.trim() : message.trim(),
            diff,
            notes: null
        };
    }
    const [message, maybeComponentStackDiff] = errorMessage.split(`${REACT_HYDRATION_ERROR_LINK}`);
    const trimmedMessage = message.trim();
    // React built-in hydration diff starts with a newline
    if (maybeComponentStackDiff !== undefined && maybeComponentStackDiff.length > 1) {
        const diffs = [];
        maybeComponentStackDiff.split('\n').forEach((line)=>{
            if (line.trim() === '') return;
            if (!line.trim().startsWith('at ')) {
                diffs.push(line);
            }
        });
        const [displayedMessage, ...notes] = trimmedMessage.split('\n\n');
        return {
            message: displayedMessage,
            diff: diffs.join('\n'),
            notes: notes.join('\n\n') || null
        };
    } else {
        const [displayedMessage, ...notes] = trimmedMessage.split('\n\n');
        return {
            message: displayedMessage,
            diff: null,
            notes: notes.join('\n\n')
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=react-19-hydration-error.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/pages/hydration-error-state.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    attachHydrationErrorState: null,
    getSquashedHydrationErrorDetails: null,
    storeHydrationErrorStateFromConsoleArgs: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    attachHydrationErrorState: function() {
        return attachHydrationErrorState;
    },
    getSquashedHydrationErrorDetails: function() {
        return getSquashedHydrationErrorDetails;
    },
    storeHydrationErrorStateFromConsoleArgs: function() {
        return storeHydrationErrorStateFromConsoleArgs;
    }
});
const _react18hydrationerror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/react-18-hydration-error.js [app-client] (ecmascript)");
const _react19hydrationerror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/react-19-hydration-error.js [app-client] (ecmascript)");
// We only need this for React 18 or hydration console errors in React 19.
// Once we surface console.error in the dev overlay in pages router, we should only
// use this for React 18.
let hydrationErrorState = {};
const squashedHydrationErrorDetails = new WeakMap();
function getSquashedHydrationErrorDetails(error) {
    return squashedHydrationErrorDetails.has(error) ? squashedHydrationErrorDetails.get(error) : null;
}
function attachHydrationErrorState(error) {
    if (!(0, _react18hydrationerror.isHydrationError)(error) && !(0, _react19hydrationerror.isHydrationError)(error)) {
        return;
    }
    let parsedHydrationErrorState = {};
    // If there's any extra information in the error message to display,
    // append it to the error message details property
    if (hydrationErrorState.warning) {
        // The patched console.error found hydration errors logged by React
        // Append the logged warning to the error message
        parsedHydrationErrorState = {
            // It contains the warning, component stack, server and client tag names
            ...hydrationErrorState
        };
        // Consume the cached hydration diff.
        // This is only required for now when we still squashed the hydration diff log into hydration error.
        // Once the all error is logged to dev overlay in order, this will go away.
        if (hydrationErrorState.reactOutputComponentDiff) {
            parsedHydrationErrorState.reactOutputComponentDiff = hydrationErrorState.reactOutputComponentDiff;
        }
        squashedHydrationErrorDetails.set(error, parsedHydrationErrorState);
    }
}
function storeHydrationErrorStateFromConsoleArgs(...args) {
    let [message, firstContent, secondContent, ...rest] = args;
    if ((0, _react18hydrationerror.isHydrationWarning)(message)) {
        // Some hydration warnings has 4 arguments, some has 3, fallback to the last argument
        // when the 3rd argument is not the component stack but an empty string
        // For some warnings, there's only 1 argument for template.
        // The second argument is the diff or component stack.
        if (args.length === 3) {
            secondContent = '';
        }
        const warning = message.replace(/Warning: /, '').replace('%s', firstContent).replace('%s', secondContent) // remove the last %s from the message
        .replace(/%s/g, '');
        const lastArg = (rest[rest.length - 1] || '').trim();
        hydrationErrorState.reactOutputComponentDiff = generateHydrationDiffReact18(message, firstContent, secondContent, lastArg);
        hydrationErrorState.warning = warning;
    } else if ((0, _react19hydrationerror.isErrorMessageWithComponentStackDiff)(message)) {
        // Some hydration warnings has 4 arguments, some has 3, fallback to the last argument
        // when the 3rd argument is not the component stack but an empty string
        // For some warnings, there's only 1 argument for template.
        // The second argument is the diff or component stack.
        if (args.length === 3) {
            secondContent = '';
        }
        const warning = message.replace('%s', firstContent).replace('%s', secondContent) // remove the last %s from the message
        .replace(/%s/g, '');
        const lastArg = (args[args.length - 1] || '').trim();
        hydrationErrorState.reactOutputComponentDiff = lastArg;
        hydrationErrorState.warning = warning;
    }
}
/*
 * Some hydration errors in React 18 does not have the diff in the error message.
 * Instead it has the error stack trace which is component stack that we can leverage.
 * Will parse the diff from the error stack trace
 *  e.g.
 *  Warning: Expected server HTML to contain a matching <div> in <p>.
 *    at div
 *    at p
 *    at div
 *    at div
 *    at Page
 *  output:
 *    <Page>
 *      <div>
 *        <p>
 *  >       <div>
 *
 */ function generateHydrationDiffReact18(message, firstContent, secondContent, lastArg) {
    const componentStack = lastArg;
    let firstIndex = -1;
    let secondIndex = -1;
    const hydrationWarningType = (0, _react18hydrationerror.getHydrationWarningType)(message);
    // at div\n at Foo\n at Bar (....)\n -> [div, Foo]
    const components = componentStack.split('\n') // .reverse()
    .map((line, index)=>{
        // `<space>at <component> (<location>)` -> `at <component> (<location>)`
        line = line.trim();
        // extract `<space>at <component>` to `<<component>>`
        // e.g. `  at Foo` -> `<Foo>`
        const [, component, location] = /at (\w+)( \((.*)\))?/.exec(line) || [];
        // If there's no location then it's user-land stack frame
        if (!location) {
            if (component === firstContent && firstIndex === -1) {
                firstIndex = index;
            } else if (component === secondContent && secondIndex === -1) {
                secondIndex = index;
            }
        }
        return location ? '' : component;
    }).filter(Boolean).reverse();
    let diff = '';
    for(let i = 0; i < components.length; i++){
        const component = components[i];
        const matchFirstContent = hydrationWarningType === 'tag' && i === components.length - firstIndex - 1;
        const matchSecondContent = hydrationWarningType === 'tag' && i === components.length - secondIndex - 1;
        if (matchFirstContent || matchSecondContent) {
            const spaces = ' '.repeat(Math.max(i * 2 - 2, 0) + 2);
            diff += `> ${spaces}<${component}>\n`;
        } else {
            const spaces = ' '.repeat(i * 2 + 2);
            diff += `${spaces}<${component}>\n`;
        }
    }
    if (hydrationWarningType === 'text') {
        const spaces = ' '.repeat(components.length * 2);
        diff += `+ ${spaces}"${firstContent}"\n`;
        diff += `- ${spaces}"${secondContent}"\n`;
    } else if (hydrationWarningType === 'text-in-tag') {
        const spaces = ' '.repeat(components.length * 2);
        diff += `> ${spaces}<${secondContent}>\n`;
        diff += `>   ${spaces}"${firstContent}"\n`;
    }
    return diff;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hydration-error-state.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-error-boundary.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PagesDevOverlayErrorBoundary", {
    enumerable: true,
    get: function() {
        return PagesDevOverlayErrorBoundary;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
class PagesDevOverlayErrorBoundary extends _react.default.PureComponent {
    static getDerivedStateFromError(error) {
        return {
            error
        };
    }
    // Explicit type is needed to avoid the generated `.d.ts` having a wide return type that could be specific to the `@types/react` version.
    render() {
        // The component has to be unmounted or else it would continue to error
        return this.state.error ? null : this.props.children;
    }
    constructor(...args){
        super(...args), this.state = {
            error: null
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=pages-dev-overlay-error-boundary.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PagesDevOverlayBridge: null,
    register: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PagesDevOverlayBridge: function() {
        return PagesDevOverlayBridge;
    },
    register: function() {
        return register;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _nextdevtools = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/next-devtools/index.js (raw)");
const _hydrationerrorstate = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/pages/hydration-error-state.js [app-client] (ecmascript)");
const _router = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/router.js [app-client] (ecmascript)");
const _stitchederror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/app/errors/stitched-error.js [app-client] (ecmascript)");
const _onrecoverableerror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/react-client-callbacks/on-recoverable-error.js [app-client] (ecmascript)");
const _pagesdevoverlayerrorboundary = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-error-boundary.js [app-client] (ecmascript)");
const _forwardlogs = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/app/forward-logs.js [app-client] (ecmascript)");
const usePagesDevOverlayBridge = ()=>{
    _react.default.useInsertionEffect({
        "usePagesDevOverlayBridge.useInsertionEffect": ()=>{
            // NDT uses a different React instance so it's not technically a state update
            // scheduled from useInsertionEffect.
            (0, _nextdevtools.renderPagesDevOverlay)(_stitchederror.getOwnerStack, _hydrationerrorstate.getSquashedHydrationErrorDetails, _onrecoverableerror.isRecoverableError);
        }
    }["usePagesDevOverlayBridge.useInsertionEffect"], []);
    _react.default.useEffect({
        "usePagesDevOverlayBridge.useEffect": ()=>{
            const { handleStaticIndicator } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/dev/hot-reloader/pages/hot-reloader-pages.js [app-client] (ecmascript)");
            _router.Router.events.on('routeChangeComplete', handleStaticIndicator);
            return ({
                "usePagesDevOverlayBridge.useEffect": function() {
                    _router.Router.events.off('routeChangeComplete', handleStaticIndicator);
                }
            })["usePagesDevOverlayBridge.useEffect"];
        }
    }["usePagesDevOverlayBridge.useEffect"], []);
};
function PagesDevOverlayBridge({ children }) {
    usePagesDevOverlayBridge();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_pagesdevoverlayerrorboundary.PagesDevOverlayErrorBoundary, {
        children: children
    });
}
let isRegistered = false;
function handleError(error) {
    if (!error || !(error instanceof Error) || typeof error.stack !== 'string') {
        // A non-error was thrown, we don't have anything to show. :-(
        return;
    }
    (0, _hydrationerrorstate.attachHydrationErrorState)(error);
    // Skip ModuleBuildError and ModuleNotFoundError, as it will be sent through onBuildError callback.
    // This is to avoid same error as different type showing up on client to cause flashing.
    if (error.name !== 'ModuleBuildError' && error.name !== 'ModuleNotFoundError') {
        _nextdevtools.dispatcher.onUnhandledError(error);
    }
}
let origConsoleError = console.error;
function nextJsHandleConsoleError(...args) {
    // See https://github.com/facebook/react/blob/d50323eb845c5fde0d720cae888bf35dedd05506/packages/react-reconciler/src/ReactFiberErrorLogger.js#L78
    const maybeError = ("TURBOPACK compile-time truthy", 1) ? args[1] : "TURBOPACK unreachable";
    (0, _hydrationerrorstate.storeHydrationErrorStateFromConsoleArgs)(...args);
    // TODO: Surfaces non-errors logged via `console.error`.
    handleError(maybeError);
    (0, _forwardlogs.forwardErrorLog)(args);
    origConsoleError.apply(window.console, args);
}
function onUnhandledError(event) {
    const error = event?.error;
    handleError(error);
    if (error) {
        (0, _forwardlogs.forwardUnhandledError)(error);
    }
}
function onUnhandledRejection(ev) {
    const reason = ev?.reason;
    if (!reason || !(reason instanceof Error) || typeof reason.stack !== 'string') {
        // A non-error was thrown, we don't have anything to show. :-(
        return;
    }
    _nextdevtools.dispatcher.onUnhandledRejection(reason);
    (0, _forwardlogs.logUnhandledRejection)(reason);
}
function register() {
    if (isRegistered) {
        return;
    }
    isRegistered = true;
    try {
        Error.stackTraceLimit = 50;
    } catch  {}
    (0, _forwardlogs.initializeDebugLogForwarding)('pages');
    window.addEventListener('error', onUnhandledError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    window.console.error = nextJsHandleConsoleError;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=pages-dev-overlay-setup.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/launch-editor.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * MIT License
 *
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    escapeApplescriptStringFragment: null,
    launchEditor: null,
    openFileInEditor: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    escapeApplescriptStringFragment: function() {
        return escapeApplescriptStringFragment;
    },
    launchEditor: function() {
        return launchEditor;
    },
    openFileInEditor: function() {
        return openFileInEditor;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-client] (ecmascript)");
const _child_process = /*#__PURE__*/ _interop_require_default._((()=>{
    const e = new Error("Cannot find module 'child_process'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _fs = /*#__PURE__*/ _interop_require_default._((()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _promises = /*#__PURE__*/ _interop_require_default._((()=>{
    const e = new Error("Cannot find module 'fs/promises'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _os = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/os-browserify/browser.js [app-client] (ecmascript)"));
const _path = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _url = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/native-url/index.js [app-client] (ecmascript)");
const _shellquote = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/shell-quote/index.js [app-client] (ecmascript)"));
function isTerminalEditor(editor) {
    switch(editor){
        case 'vi':
        case 'vim':
        case 'nvim':
        case 'emacs':
        case 'nano':
            {
                return true;
            }
        default:
            {}
    }
    return false;
}
// Map from full process name to binary that starts the process
// We can't just re-use full process name, because it will spawn a new instance
// of the app every time
const COMMON_EDITORS_MACOS = {
    '/Applications/Atom.app/Contents/MacOS/Atom': 'atom',
    '/Applications/Atom Beta.app/Contents/MacOS/Atom Beta': '/Applications/Atom Beta.app/Contents/MacOS/Atom Beta',
    '/Applications/Brackets.app/Contents/MacOS/Brackets': 'brackets',
    '/Applications/Sublime Text.app/Contents/MacOS/Sublime Text': '/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl',
    '/Applications/Sublime Text Dev.app/Contents/MacOS/Sublime Text': '/Applications/Sublime Text Dev.app/Contents/SharedSupport/bin/subl',
    '/Applications/Sublime Text 2.app/Contents/MacOS/Sublime Text 2': '/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl',
    '/Applications/Visual Studio Code.app/Contents/MacOS/Electron': '/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code',
    '/Applications/Visual Studio Code - Insiders.app/Contents/MacOS/Electron': '/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin/code',
    '/Applications/VSCodium.app/Contents/MacOS/Electron': '/Applications/VSCodium.app/Contents/Resources/app/bin/code',
    '/Applications/AppCode.app/Contents/MacOS/appcode': '/Applications/AppCode.app/Contents/MacOS/appcode',
    '/Applications/CLion.app/Contents/MacOS/clion': '/Applications/CLion.app/Contents/MacOS/clion',
    '/Applications/IntelliJ IDEA.app/Contents/MacOS/idea': '/Applications/IntelliJ IDEA.app/Contents/MacOS/idea',
    '/Applications/PhpStorm.app/Contents/MacOS/phpstorm': '/Applications/PhpStorm.app/Contents/MacOS/phpstorm',
    '/Applications/PyCharm.app/Contents/MacOS/pycharm': '/Applications/PyCharm.app/Contents/MacOS/pycharm',
    '/Applications/PyCharm CE.app/Contents/MacOS/pycharm': '/Applications/PyCharm CE.app/Contents/MacOS/pycharm',
    '/Applications/RubyMine.app/Contents/MacOS/rubymine': '/Applications/RubyMine.app/Contents/MacOS/rubymine',
    '/Applications/WebStorm.app/Contents/MacOS/webstorm': '/Applications/WebStorm.app/Contents/MacOS/webstorm',
    '/Applications/MacVim.app/Contents/MacOS/MacVim': 'mvim',
    '/Applications/GoLand.app/Contents/MacOS/goland': '/Applications/GoLand.app/Contents/MacOS/goland',
    '/Applications/Rider.app/Contents/MacOS/rider': '/Applications/Rider.app/Contents/MacOS/rider',
    '/Applications/Cursor.app/Contents/MacOS/Cursor': '/Applications/Cursor.app/Contents/MacOS/Cursor'
};
const COMMON_EDITORS_LINUX = {
    atom: 'atom',
    Brackets: 'brackets',
    code: 'code',
    'code-insiders': 'code-insiders',
    vscodium: 'vscodium',
    emacs: 'emacs',
    gvim: 'gvim',
    'idea.sh': 'idea',
    'phpstorm.sh': 'phpstorm',
    'pycharm.sh': 'pycharm',
    'rubymine.sh': 'rubymine',
    sublime_text: 'sublime_text',
    vim: 'vim',
    nvim: 'nvim',
    'webstorm.sh': 'webstorm',
    'goland.sh': 'goland',
    'rider.sh': 'rider'
};
const COMMON_EDITORS_WIN = [
    'Brackets.exe',
    'Code.exe',
    'Code - Insiders.exe',
    'VSCodium.exe',
    'atom.exe',
    'sublime_text.exe',
    'notepad++.exe',
    'clion.exe',
    'clion64.exe',
    'idea.exe',
    'idea64.exe',
    'phpstorm.exe',
    'phpstorm64.exe',
    'pycharm.exe',
    'pycharm64.exe',
    'rubymine.exe',
    'rubymine64.exe',
    'webstorm.exe',
    'webstorm64.exe',
    'goland.exe',
    'goland64.exe',
    'rider.exe',
    'rider64.exe'
];
// Transpiled version of: /^([A-Za-z]:[/\\])?[\p{L}0-9/.\-_\\]+$/u
// Non-transpiled version requires support for Unicode property regex. Allows
// alphanumeric characters, periods, dashes, slashes, and underscores.
const WINDOWS_FILE_NAME_ACCESS_LIST = /^([A-Za-z]:[/\\])?(?:[\x2D-9A-Z\\_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDF00-\uDF1C\uDF27\uDF30-\uDF45]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFF1]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D])+$/;
function getArgumentsForLineNumber(editor, fileName, line1, column1) {
    const editorBasename = _path.default.basename(editor).replace(/\.(exe|cmd|bat)$/i, '');
    switch(editorBasename){
        case 'atom':
        case 'Atom':
        case 'Atom Beta':
        case 'subl':
        case 'sublime':
        case 'sublime_text':
            {
                return [
                    fileName + ':' + line1 + ':' + column1
                ];
            }
        case 'wstorm':
        case 'charm':
            {
                return [
                    fileName + ':' + line1
                ];
            }
        case 'notepad++':
            {
                return [
                    '-n' + line1,
                    '-c' + column1,
                    fileName
                ];
            }
        case 'vim':
        case 'nvim':
        case 'mvim':
        case 'joe':
        case 'gvim':
            {
                return [
                    '+' + line1,
                    fileName
                ];
            }
        case 'emacs':
        case 'emacsclient':
            {
                return [
                    '+' + line1 + ':' + column1,
                    fileName
                ];
            }
        case 'rmate':
        case 'mate':
        case 'mine':
            {
                return [
                    '--line',
                    line1.toString(),
                    fileName
                ];
            }
        case 'code':
        case 'Code':
        case 'Cursor':
        case 'code-insiders':
        case 'Code - Insiders':
        case 'vscodium':
        case 'VSCodium':
            {
                return [
                    '-g',
                    fileName + ':' + line1 + ':' + column1
                ];
            }
        case 'appcode':
        case 'clion':
        case 'clion64':
        case 'idea':
        case 'idea64':
        case 'phpstorm':
        case 'phpstorm64':
        case 'pycharm':
        case 'pycharm64':
        case 'rubymine':
        case 'rubymine64':
        case 'webstorm':
        case 'webstorm64':
        case 'goland':
        case 'goland64':
        case 'rider':
        case 'rider64':
            {
                return [
                    '--line',
                    line1.toString(),
                    fileName
                ];
            }
        default:
            {
                // For all others, drop the lineNumber until we have
                // a mapping above, since providing the lineNumber incorrectly
                // can result in errors or confusing behavior.
                return [
                    fileName
                ];
            }
    }
}
function guessEditor() {
    // Explicit config always wins
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_EDITOR) {
        return _shellquote.default.parse(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_EDITOR);
    }
    // We can find out which editor is currently running by:
    // `ps x` on macOS and Linux
    // `Get-Process` on Windows
    try {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    } catch (error) {
    // Ignore...
    }
    // Last resort, use old skool env vars
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VISUAL) {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VISUAL
        ];
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.EDITOR) {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.EDITOR
        ];
    }
    return [];
}
function printInstructions(fileName, errorMessage) {
    console.log();
    console.log((0, _picocolors.red)('Could not open ' + _path.default.basename(fileName) + ' in the editor.'));
    if (errorMessage) {
        if (errorMessage[errorMessage.length - 1] !== '.') {
            errorMessage += '.';
        }
        console.log((0, _picocolors.red)('The editor process exited with an error: ' + errorMessage));
    }
    console.log();
    console.log('To set up the editor integration, add something like ' + (0, _picocolors.cyan)('REACT_EDITOR=atom') + ' to the ' + (0, _picocolors.green)('.env.local') + ' file in your project folder ' + 'and restart the development server.');
    console.log();
}
function escapeApplescriptStringFragment(input) {
    // The only two special characters in a quoted applescript string are
    // backslash and double quote. Both are escaped with a preceeding backslash.
    //
    // Some whitespace characters (like newlines) can be escaped (as `\n`), but
    // aren't required to be escaped (so we're not bothering to do that).
    //
    // https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_classes.html#//apple_ref/doc/uid/TP40000983-CH1g-BBCIAHJF:~:text=Special%20String%20Characters
    return input.replaceAll(/[\\"]/g, (original)=>`\\${original}`);
}
function launchEditor(fileName, line1, column1) {
    if (!_fs.default.existsSync(fileName)) {
        return;
    }
    // Sanitize lineNumber to prevent malicious use on win32
    // via: https://github.com/nodejs/node/blob/c3bb4b1aa5e907d489619fb43d233c3336bfc03d/lib/child_process.js#L333
    // and it should be a positive integer
    if (!(Number.isInteger(line1) && line1 > 0)) {
        return;
    }
    // colNumber is optional, but should be a positive integer too
    // default is 1
    if (!(Number.isInteger(column1) && column1 > 0)) {
        column1 = 1;
    }
    let [editor, ...args] = guessEditor();
    if (!editor) {
        printInstructions(fileName, null);
        return;
    }
    if (editor.toLowerCase() === 'none') {
        return;
    }
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform === 'linux' && fileName.startsWith('/mnt/') && /Microsoft/i.test(_os.default.release())) //TURBOPACK unreachable
    ;
    // cmd.exe on Windows is vulnerable to RCE attacks given a file name of the
    // form "C:\Users\myusername\Downloads\& curl 172.21.93.52". Use an access list
    // to validate user-provided file names. This doesn't cover the entire range
    // of valid file names but should cover almost all of them in practice.
    if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform === 'win32' && !WINDOWS_FILE_NAME_ACCESS_LIST.test(fileName.trim())) //TURBOPACK unreachable
    ;
    if (line1) {
        args = args.concat(getArgumentsForLineNumber(editor, fileName, line1, column1));
    } else {
        args.push(fileName);
    }
    let p = undefined;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else if (isTerminalEditor(editor)) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            printInstructions(fileName, 'Terminal editors can only be used on macOS.');
        }
    } else {
        p = _child_process.default.spawn(editor, args, {
            stdio: 'inherit'
        });
    }
    if (p) {
        p.on('exit', function(errorCode) {
            if (errorCode) {
                printInstructions(fileName, '(code ' + errorCode + ')');
            }
        });
        p.on('error', function(error) {
            printInstructions(fileName, error.message);
        });
    }
}
async function openFileInEditor(file, line1, column1, nextRootDirectory) {
    let filePath;
    if (file.startsWith('file://')) {
        try {
            filePath = (0, _url.fileURLToPath)(file);
        } catch (error) {
            return {
                found: false,
                error
            };
        }
    } else if (_path.default.isAbsolute(file)) {
        filePath = file;
    } else {
        filePath = _path.default.join(nextRootDirectory, file);
    }
    const result = {
        found: false,
        error: null
    };
    const existed = await _promises.default.access(filePath, _fs.default.constants.F_OK).then(()=>true, ()=>false);
    if (existed) {
        try {
            launchEditor(filePath, line1, column1);
            result.found = true;
        } catch (err) {
            result.error = err;
        }
    }
    return result;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=launch-editor.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/middleware-response.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "middlewareResponse", {
    enumerable: true,
    get: function() {
        return middlewareResponse;
    }
});
const _util = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/util/util.js [app-client] (ecmascript)");
const middlewareResponse = {
    noContent (res) {
        res.statusCode = 204;
        res.end('No Content');
    },
    badRequest (res) {
        res.statusCode = 400;
        res.end('Bad Request');
    },
    notFound (res) {
        res.statusCode = 404;
        res.end('Not Found');
    },
    methodNotAllowed (res) {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    },
    internalServerError (res, error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end(error !== undefined ? (0, _util.inspect)(error, {
            colors: false
        }) : 'Internal Server Error');
    },
    json (res, data) {
        res.setHeader('Content-Type', 'application/json').end(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(data)));
    },
    jsonString (res, data) {
        res.setHeader('Content-Type', 'application/json').end(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(data));
    }
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=middleware-response.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/webpack-module-path.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatFrameSourceFile: null,
    isWebpackInternalResource: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatFrameSourceFile: function() {
        return formatFrameSourceFile;
    },
    isWebpackInternalResource: function() {
        return isWebpackInternalResource;
    }
});
const replacementRegExes = [
    /^webpack-internal:\/\/\/(\([\w-]+\)\/)?/,
    /^(webpack:\/\/\/|webpack:\/\/(_N_E\/)?)(\([\w-]+\)\/)?/
];
function isWebpackInternalResource(file) {
    for (const regex of replacementRegExes){
        if (regex.test(file)) return true;
        file = file.replace(regex, '');
    }
    return false;
}
function formatFrameSourceFile(file) {
    for (const regex of replacementRegExes){
        file = file.replace(regex, '');
    }
    return file;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=webpack-module-path.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/get-next-error-feedback-middleware.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getNextErrorFeedbackMiddleware", {
    enumerable: true,
    get: function() {
        return getNextErrorFeedbackMiddleware;
    }
});
const _errorfeedback = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/error-feedback.js [app-client] (ecmascript)");
const _middlewareresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/middleware-response.js [app-client] (ecmascript)");
function getNextErrorFeedbackMiddleware(telemetry) {
    return async function(req, res, next) {
        const { pathname, searchParams } = new URL(`http://n${req.url}`);
        if (pathname !== '/__nextjs_error_feedback') {
            return next();
        }
        try {
            const errorCode = searchParams.get('errorCode');
            const wasHelpful = searchParams.get('wasHelpful');
            if (!errorCode || !wasHelpful) {
                return _middlewareresponse.middlewareResponse.badRequest(res);
            }
            await telemetry.record((0, _errorfeedback.eventErrorFeedback)({
                errorCode,
                wasHelpful: wasHelpful === 'true'
            }));
            return _middlewareresponse.middlewareResponse.noContent(res);
        } catch (error) {
            return _middlewareresponse.middlewareResponse.internalServerError(res);
        }
    };
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-next-error-feedback-middleware.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/font/get-dev-overlay-font-middleware.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDevOverlayFontMiddleware", {
    enumerable: true,
    get: function() {
        return getDevOverlayFontMiddleware;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _path = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _promises = /*#__PURE__*/ _interop_require_wildcard._((()=>{
    const e = new Error("Cannot find module 'fs/promises'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})());
const _fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _log = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _middlewareresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/middleware-response.js [app-client] (ecmascript)");
const FONT_PREFIX = '/__nextjs_font/';
const VALID_FONTS = [
    'geist-latin-ext.woff2',
    'geist-mono-latin-ext.woff2',
    'geist-latin.woff2',
    'geist-mono-latin.woff2'
];
const FONT_HEADERS = {
    'Content-Type': 'font/woff2',
    'Cache-Control': 'public, max-age=31536000, immutable'
};
function getDevOverlayFontMiddleware() {
    return async function devOverlayFontMiddleware(req, res, next) {
        try {
            const { pathname } = new URL(`http://n${req.url}`);
            if (!pathname.startsWith(FONT_PREFIX)) {
                return next();
            }
            const fontFile = pathname.replace(FONT_PREFIX, '');
            if (!VALID_FONTS.includes(fontFile)) {
                return _middlewareresponse.middlewareResponse.notFound(res);
            }
            const fontPath = _path.default.resolve(("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/next/dist/next-devtools/server/font"), fontFile);
            const fileExists = await checkFileExists(fontPath);
            if (!fileExists) {
                return _middlewareresponse.middlewareResponse.notFound(res);
            }
            const fontData = await _promises.readFile(fontPath);
            Object.entries(FONT_HEADERS).forEach(([key, value])=>{
                res.setHeader(key, value);
            });
            res.end(fontData);
        } catch (err) {
            _log.error('Failed to serve font:', err instanceof Error ? err.message : err);
            return _middlewareresponse.middlewareResponse.internalServerError(res);
        }
    };
}
async function checkFileExists(filePath) {
    try {
        await _promises.access(filePath, _fs.constants.F_OK);
        return true;
    } catch  {
        return false;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-dev-overlay-font-middleware.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/dev-indicator-middleware.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDisableDevIndicatorMiddleware", {
    enumerable: true,
    get: function() {
        return getDisableDevIndicatorMiddleware;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _middlewareresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/middleware-response.js [app-client] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-client] (ecmascript)"));
const _devindicatorserverstate = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/dev-indicator-server-state.js [app-client] (ecmascript)");
const DISABLE_DEV_INDICATOR_PREFIX = '/__nextjs_disable_dev_indicator';
const COOLDOWN_TIME_MS = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_DEV_INDICATOR_COOLDOWN_MS ? parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_DEV_INDICATOR_COOLDOWN_MS) : 1000 * 60 * 60 * 24;
function getDisableDevIndicatorMiddleware() {
    return async function disableDevIndicatorMiddleware(req, res, next) {
        try {
            const { pathname } = new URL(`http://n${req.url}`);
            if (!pathname.startsWith(DISABLE_DEV_INDICATOR_PREFIX)) {
                return next();
            }
            if (req.method !== 'POST') {
                return _middlewareresponse.middlewareResponse.methodNotAllowed(res);
            }
            _devindicatorserverstate.devIndicatorServerState.disabledUntil = Date.now() + COOLDOWN_TIME_MS;
            return _middlewareresponse.middlewareResponse.noContent(res);
        } catch (err) {
            _log.error('Failed to disable the dev indicator:', err instanceof Error ? err.message : err);
            return _middlewareresponse.middlewareResponse.internalServerError(res);
        }
    };
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=dev-indicator-middleware.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/restart-dev-server-middleware.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRestartDevServerMiddleware", {
    enumerable: true,
    get: function() {
        return getRestartDevServerMiddleware;
    }
});
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/utils.js [app-client] (ecmascript)");
const _middlewareresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/middleware-response.js [app-client] (ecmascript)");
const _cacheinvalidation = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/cache-invalidation.js [app-client] (ecmascript)");
const EVENT_DEV_OVERLAY_RESTART_SERVER = 'DEV_OVERLAY_RESTART_SERVER';
function getRestartDevServerMiddleware({ telemetry, turbopackProject, webpackCacheDirectories }) {
    /**
   * Some random value between 1 and Number.MAX_SAFE_INTEGER (inclusive). The same value is returned
   * on every call to `__nextjs_server_status` until the server is restarted.
   *
   * Can be used to determine if two server status responses are from the same process or a
   * different (restarted) process.
   */ const executionId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
    async function handleRestartRequest(req, res, searchParams) {
        if (req.method !== 'POST') {
            return _middlewareresponse.middlewareResponse.methodNotAllowed(res);
        }
        const shouldInvalidateFileSystemCache = searchParams.has('invalidateFileSystemCache');
        if (shouldInvalidateFileSystemCache) {
            if (webpackCacheDirectories != null) {
                await Promise.all(Array.from(webpackCacheDirectories).map(_cacheinvalidation.invalidateFileSystemCache));
            }
            if (turbopackProject != null) {
                await turbopackProject.invalidateFileSystemCache();
            }
        }
        telemetry.record({
            eventName: EVENT_DEV_OVERLAY_RESTART_SERVER,
            payload: {
                invalidateFileSystemCache: shouldInvalidateFileSystemCache
            }
        });
        // TODO: Use flushDetached
        await telemetry.flush();
        // do this async to try to give the response a chance to send
        // it's not really important if it doesn't though
        setTimeout(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].exit(_utils.RESTART_EXIT_CODE);
        }, 0);
        return _middlewareresponse.middlewareResponse.noContent(res);
    }
    async function handleServerStatus(req, res) {
        if (req.method !== 'GET') {
            return _middlewareresponse.middlewareResponse.methodNotAllowed(res);
        }
        return _middlewareresponse.middlewareResponse.json(res, {
            executionId
        });
    }
    return async function(req, res, next) {
        const { pathname, searchParams } = new URL(`http://n${req.url}`);
        switch(pathname){
            case '/__nextjs_restart_dev':
                return await handleRestartRequest(req, res, searchParams);
            case '/__nextjs_server_status':
                return await handleServerStatus(req, res);
            default:
                return next();
        }
    };
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=restart-dev-server-middleware.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/devtools-config-schema.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "devToolsConfigSchema", {
    enumerable: true,
    get: function() {
        return devToolsConfigSchema;
    }
});
const _zod = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/zod/index.cjs [app-client] (ecmascript)");
const devToolsConfigSchema = _zod.z.object({
    theme: _zod.z.enum([
        'light',
        'dark',
        'system'
    ]).optional(),
    disableDevIndicator: _zod.z.boolean().optional(),
    devToolsPosition: _zod.z.enum([
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
    ]).optional(),
    devToolsPanelPosition: _zod.z.record(_zod.z.string(), _zod.z.enum([
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
    ])).optional(),
    devToolsPanelSize: _zod.z.record(_zod.z.string(), _zod.z.object({
        width: _zod.z.number(),
        height: _zod.z.number()
    })).optional(),
    scale: _zod.z.number().optional(),
    hideShortcut: _zod.z.string().nullable().optional()
});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=devtools-config-schema.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/deepmerge.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deepMerge", {
    enumerable: true,
    get: function() {
        return deepMerge;
    }
});
function deepMerge(target, source) {
    if (!source || typeof source !== 'object' || Array.isArray(source)) {
        return source;
    }
    if (!target || typeof target !== 'object' || Array.isArray(target)) {
        return source;
    }
    const result = {
        ...target
    };
    for(const key in source){
        const sourceValue = source[key];
        const targetValue = target[key];
        if (sourceValue !== undefined) {
            if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue) && targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
                result[key] = deepMerge(targetValue, sourceValue);
            } else {
                result[key] = sourceValue;
            }
        }
    }
    return result;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=deepmerge.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/devtools-config-middleware.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    devToolsConfigMiddleware: null,
    getDevToolsConfig: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    devToolsConfigMiddleware: function() {
        return devToolsConfigMiddleware;
    },
    getDevToolsConfig: function() {
        return getDevToolsConfig;
    }
});
const _fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _promises = (()=>{
    const e = new Error("Cannot find module 'fs/promises'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _path = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const _middlewareresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/server/middleware-response.js [app-client] (ecmascript)");
const _devtoolsconfigschema = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/devtools-config-schema.js [app-client] (ecmascript)");
const _deepmerge = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/shared/deepmerge.js [app-client] (ecmascript)");
const DEVTOOLS_CONFIG_FILENAME = 'next-devtools-config.json';
const DEVTOOLS_CONFIG_MIDDLEWARE_ENDPOINT = '/__nextjs_devtools_config';
function devToolsConfigMiddleware({ distDir, sendUpdateSignal }) {
    const configPath = (0, _path.join)(distDir, 'cache', DEVTOOLS_CONFIG_FILENAME);
    return async function devToolsConfigMiddlewareHandler(req, res, next) {
        const { pathname } = new URL(`http://n${req.url}`);
        if (pathname !== DEVTOOLS_CONFIG_MIDDLEWARE_ENDPOINT) {
            return next();
        }
        if (req.method !== 'POST') {
            return _middlewareresponse.middlewareResponse.methodNotAllowed(res);
        }
        const currentConfig = await getDevToolsConfig(distDir);
        const chunks = [];
        for await (const chunk of req){
            chunks.push(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(chunk));
        }
        let body = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat(chunks).toString('utf8');
        try {
            body = JSON.parse(body);
        } catch (error) {
            console.error('[Next.js DevTools] Invalid config body passed:', error);
            return _middlewareresponse.middlewareResponse.badRequest(res);
        }
        const validation = _devtoolsconfigschema.devToolsConfigSchema.safeParse(body);
        if (!validation.success) {
            console.error('[Next.js DevTools] Invalid config passed:', validation.error.message);
            return _middlewareresponse.middlewareResponse.badRequest(res);
        }
        const newConfig = (0, _deepmerge.deepMerge)(currentConfig, validation.data);
        await (0, _promises.writeFile)(configPath, JSON.stringify(newConfig, null, 2));
        sendUpdateSignal(newConfig);
        return _middlewareresponse.middlewareResponse.noContent(res);
    };
}
async function getDevToolsConfig(distDir) {
    const configPath = (0, _path.join)(distDir, 'cache', DEVTOOLS_CONFIG_FILENAME);
    if (!(0, _fs.existsSync)(configPath)) {
        await (0, _promises.mkdir)((0, _path.dirname)(configPath), {
            recursive: true
        });
        await (0, _promises.writeFile)(configPath, JSON.stringify({}));
        return {};
    }
    return JSON.parse(await (0, _promises.readFile)(configPath, 'utf8'));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=devtools-config-middleware.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/export/helpers/create-incremental-cache.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createIncrementalCache", {
    enumerable: true,
    get: function() {
        return createIncrementalCache;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _incrementalcache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/incremental-cache/index.js [app-client] (ecmascript)");
const _ciinfo = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/ci-info.js [app-client] (ecmascript)");
const _nodefsmethods = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/node-fs-methods.js [app-client] (ecmascript)");
const _interopdefault = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/interop-default.js [app-client] (ecmascript)");
const _formatdynamicimportpath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/format-dynamic-import-path.js [app-client] (ecmascript)");
const _handlers = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/use-cache/handlers.js [app-client] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function createIncrementalCache({ cacheHandler, cacheMaxMemorySize, fetchCacheKeyPrefix, distDir, dir, flushToDisk, cacheHandlers, requestHeaders }) {
    // Custom cache handler overrides.
    let CacheHandler;
    if (cacheHandler) {
        CacheHandler = (0, _interopdefault.interopDefault)(await Promise.resolve().then(()=>{
            const e = new Error("Cannot find module as expression is too dynamic");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        }).then((mod)=>mod.default || mod));
    }
    if (cacheHandlers && (0, _handlers.initializeCacheHandlers)(cacheMaxMemorySize)) {
        for (const [kind, handler] of Object.entries(cacheHandlers)){
            if (!handler) continue;
            (0, _handlers.setCacheHandler)(kind, (0, _interopdefault.interopDefault)(await Promise.resolve().then(()=>{
                const e = new Error("Cannot find module as expression is too dynamic");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            }).then((mod)=>mod.default || mod)));
        }
    }
    const incrementalCache = new _incrementalcache.IncrementalCache({
        dev: false,
        requestHeaders: requestHeaders || {},
        flushToDisk,
        maxMemoryCacheSize: cacheMaxMemorySize,
        fetchCacheKeyPrefix,
        getPrerenderManifest: ()=>({
                version: 4,
                routes: {},
                dynamicRoutes: {},
                preview: {
                    previewModeEncryptionKey: '',
                    previewModeId: '',
                    previewModeSigningKey: ''
                },
                notFoundRoutes: []
            }),
        fs: _nodefsmethods.nodeFs,
        serverDistDir: _path.default.join(distDir, 'server'),
        CurCacheHandler: CacheHandler,
        minimalMode: _ciinfo.hasNextSupport
    });
    globalThis.__incrementalCache = incrementalCache;
    return incrementalCache;
} //# sourceMappingURL=create-incremental-cache.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/export/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hasCustomExportOutput", {
    enumerable: true,
    get: function() {
        return hasCustomExportOutput;
    }
});
function hasCustomExportOutput(config) {
    // In the past, a user had to run "next build" to generate
    // ".next" (or whatever the distDir) followed by "next export"
    // to generate "out" (or whatever the outDir). However, when
    // "output: export" is configured, "next build" does both steps.
    // So the user-configured distDir is actually the outDir.
    // We'll do some custom logic when meeting this condition.
    // e.g.
    // Will set config.distDir to .next to make sure the manifests
    // are still reading from temporary .next directory.
    return config.output === 'export' && config.distDir !== '.next';
} //# sourceMappingURL=utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/cli/next-test.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    SUPPORTED_TEST_RUNNERS_LIST: null,
    nextTest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    SUPPORTED_TEST_RUNNERS_LIST: function() {
        return SUPPORTED_TEST_RUNNERS_LIST;
    },
    nextTest: function() {
        return nextTest;
    }
});
const _fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const _getprojectdir = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/get-project-dir.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/utils.js [app-client] (ecmascript)");
const _config = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/config.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _hasnecessarydependencies = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/has-necessary-dependencies.js [app-client] (ecmascript)");
const _installdependencies = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/install-dependencies.js [app-client] (ecmascript)");
const _findup = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/find-up/index.js [app-client] (ecmascript)"));
const _findpagesdir = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/find-pages-dir.js [app-client] (ecmascript)");
const _verifytypescriptsetup = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/verify-typescript-setup.js [app-client] (ecmascript)");
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"));
const _crossspawn = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/cross-spawn/index.js [app-client] (ecmascript)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const SUPPORTED_TEST_RUNNERS_LIST = [
    'playwright'
];
const requiredPackagesByTestRunner = {
    playwright: [
        {
            file: 'playwright',
            pkg: '@playwright/test',
            exportsRestrict: false
        }
    ]
};
async function nextTest(directory, testRunnerArgs = [], options = {}) {
    // The following mess is in order to support an existing Next.js CLI pattern of optionally, passing a project `directory` as the first argument to execute the command on.
    // This is problematic for `next test` because as a wrapper around a test runner's `test` command, it needs to pass through any additional arguments and options.
    // Thus, `directory` could either be a valid Next.js project directory (that the user intends to run `next test` on), or it is the first argument for the test runner.
    // Unfortunately, since many test runners support passing a path (to a test file or directory containing test files), we must check if `directory` is both a valid path and a valid Next.js project.
    let baseDir, nextConfig;
    try {
        // if directory is `undefined` or a valid path this will succeed.
        baseDir = (0, _getprojectdir.getProjectDir)(directory, false);
    } catch (err) {
        // if that failed, then `directory` is not a valid path, so it must have meant to be the first item for `testRunnerArgs`
        // @ts-expect-error directory is a string here since `getProjectDir` will succeed if its undefined
        testRunnerArgs.unshift(directory);
        // intentionally set baseDir to the resolved '.' path
        baseDir = (0, _getprojectdir.getProjectDir)();
    }
    try {
        // but, `baseDir` might not be a Next.js project directory, it could be a path-like argument for the test runner (i.e. `playwright test test/foo.spec.js`)
        // if this succeeds, it means that `baseDir` is a Next.js project directory
        nextConfig = await (0, _config.default)(_constants.PHASE_PRODUCTION_BUILD, baseDir);
    } catch (err) {
        // if it doesn't, then most likely `baseDir` is not a Next.js project directory
        // @ts-expect-error directory is a string here since `getProjectDir` will succeed if its undefined
        testRunnerArgs.unshift(directory);
        // intentionally set baseDir to the resolved '.' path
        baseDir = (0, _getprojectdir.getProjectDir)();
        nextConfig = await (0, _config.default)(_constants.PHASE_PRODUCTION_BUILD, baseDir) // let this error bubble up if the `basePath` is still not a valid Next.js project
        ;
    }
    // set the test runner. priority is CLI option > next config > default 'playwright'
    const configuredTestRunner = (options == null ? void 0 : options.testRunner) ?? // --test-runner='foo'
    nextConfig.experimental.defaultTestRunner ?? // { experimental: { defaultTestRunner: 'foo' }}
    'playwright';
    if (!nextConfig.experimental.testProxy) {
        return (0, _utils.printAndExit)(`\`next experimental-test\` requires the \`experimental.testProxy: true\` configuration option.`);
    }
    // execute test runner specific function
    switch(configuredTestRunner){
        case 'playwright':
            return runPlaywright(baseDir, nextConfig, testRunnerArgs);
        default:
            return (0, _utils.printAndExit)(`Test runner ${configuredTestRunner} is not supported.`);
    }
}
async function checkRequiredDeps(baseDir, testRunner) {
    const deps = (0, _hasnecessarydependencies.hasNecessaryDependencies)(baseDir, requiredPackagesByTestRunner[testRunner]);
    if (deps.missing.length > 0) {
        await (0, _installdependencies.installDependencies)(baseDir, deps.missing, true);
        const playwright = (0, _crossspawn.default)(_path.default.join(baseDir, 'node_modules', '.bin', 'playwright'), [
            'install'
        ], {
            cwd: baseDir,
            shell: false,
            stdio: 'inherit',
            env: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env
            }
        });
        return new Promise((resolve, reject)=>{
            playwright.on('close', (c)=>resolve(c));
            playwright.on('error', (err)=>reject(err));
        });
    }
}
async function runPlaywright(baseDir, nextConfig, testRunnerArgs) {
    await checkRequiredDeps(baseDir, 'playwright');
    const playwrightConfigFile = await (0, _findup.default)([
        'playwright.config.js',
        'playwright.config.ts'
    ], {
        cwd: baseDir
    });
    if (!playwrightConfigFile) {
        const { pagesDir, appDir } = (0, _findpagesdir.findPagesDir)(baseDir);
        const { version: typeScriptVersion } = await (0, _verifytypescriptsetup.verifyTypeScriptSetup)({
            dir: baseDir,
            distDir: nextConfig.distDir,
            intentDirs: [
                pagesDir,
                appDir
            ].filter(Boolean),
            typeCheckPreflight: false,
            tsconfigPath: nextConfig.typescript.tsconfigPath,
            disableStaticImages: nextConfig.images.disableStaticImages,
            hasAppDir: !!appDir,
            hasPagesDir: !!pagesDir,
            isolatedDevBuild: nextConfig.experimental.isolatedDevBuild
        });
        const isUsingTypeScript = !!typeScriptVersion;
        const playwrightConfigFilename = isUsingTypeScript ? 'playwright.config.ts' : 'playwright.config.js';
        (0, _fs.writeFileSync)(_path.default.join(baseDir, playwrightConfigFilename), defaultPlaywrightConfig(isUsingTypeScript));
        return (0, _utils.printAndExit)(`Successfully generated ${playwrightConfigFilename}. Create your first test and then run \`next experimental-test\`.`, 0);
    } else {
        const playwright = (0, _crossspawn.default)(_path.default.join(baseDir, 'node_modules', '.bin', 'playwright'), [
            'test',
            ...testRunnerArgs
        ], {
            cwd: baseDir,
            shell: false,
            stdio: 'inherit',
            env: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env
            }
        });
        return new Promise((resolve, reject)=>{
            playwright.on('close', (c)=>resolve(c));
            playwright.on('error', (err)=>reject(err));
        });
    }
}
function defaultPlaywrightConfig(typescript) {
    const comment = `/*
 * Specify any additional Playwright config options here.
 * They will be merged with Next.js' default Playwright config.
 * You can access the default config by importing \`defaultPlaywrightConfig\` from \`'next/experimental/testmode/playwright'\`.
 */`;
    return typescript ? `import { defineConfig } from 'next/experimental/testmode/playwright';\n\n${comment}\nexport default defineConfig({});` : `const { defineConfig } = require('next/experimental/testmode/playwright');\n\n${comment}\nmodule.exports = defineConfig({});`;
} //# sourceMappingURL=next-test.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/context.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getTestReqInfo: null,
    withRequest: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getTestReqInfo: function() {
        return getTestReqInfo;
    },
    withRequest: function() {
        return withRequest;
    }
});
const _nodeasync_hooks = (()=>{
    const e = new Error("Cannot find module 'node:async_hooks': Unsupported external type Url for commonjs reference");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const testStorage = new _nodeasync_hooks.AsyncLocalStorage();
function extractTestInfoFromRequest(req, reader) {
    const proxyPortHeader = reader.header(req, 'next-test-proxy-port');
    if (!proxyPortHeader) {
        return undefined;
    }
    const url = reader.url(req);
    const proxyPort = Number(proxyPortHeader);
    const testData = reader.header(req, 'next-test-data') || '';
    return {
        url,
        proxyPort,
        testData
    };
}
function withRequest(req, reader, fn) {
    const testReqInfo = extractTestInfoFromRequest(req, reader);
    if (!testReqInfo) {
        return fn();
    }
    return testStorage.run(testReqInfo, fn);
}
function getTestReqInfo(req, reader) {
    const testReqInfo = testStorage.getStore();
    if (testReqInfo) {
        return testReqInfo;
    }
    if (req && reader) {
        return extractTestInfoFromRequest(req, reader);
    }
    return undefined;
} //# sourceMappingURL=context.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/fetch.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    handleFetch: null,
    interceptFetch: null,
    reader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleFetch: function() {
        return handleFetch;
    },
    interceptFetch: function() {
        return interceptFetch;
    },
    reader: function() {
        return reader;
    }
});
const _context = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/context.js [app-client] (ecmascript)");
const reader = {
    url (req) {
        return req.url;
    },
    header (req, name) {
        return req.headers.get(name);
    }
};
function getTestStack() {
    let stack = (new Error().stack ?? '').split('\n');
    // Skip the first line and find first non-empty line.
    for(let i = 1; i < stack.length; i++){
        if (stack[i].length > 0) {
            stack = stack.slice(i);
            break;
        }
    }
    // Filter out franmework lines.
    stack = stack.filter((f)=>!f.includes('/next/dist/'));
    // At most 5 lines.
    stack = stack.slice(0, 5);
    // Cleanup some internal info and trim.
    stack = stack.map((s)=>s.replace('webpack-internal:///(rsc)/', '').trim());
    return stack.join('    ');
}
async function buildProxyRequest(testData, request) {
    const { url, method, headers, body, cache, credentials, integrity, mode, redirect, referrer, referrerPolicy } = request;
    return {
        testData,
        api: 'fetch',
        request: {
            url,
            method,
            headers: [
                ...Array.from(headers),
                [
                    'next-test-stack',
                    getTestStack()
                ]
            ],
            body: body ? __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(await request.arrayBuffer()).toString('base64') : null,
            cache,
            credentials,
            integrity,
            mode,
            redirect,
            referrer,
            referrerPolicy
        }
    };
}
function buildResponse(proxyResponse) {
    const { status, headers, body } = proxyResponse.response;
    return new Response(body ? __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(body, 'base64') : null, {
        status,
        headers: new Headers(headers)
    });
}
async function handleFetch(originalFetch, request) {
    const testInfo = (0, _context.getTestReqInfo)(request, reader);
    if (!testInfo) {
        // Passthrough non-test requests.
        return originalFetch(request);
    }
    const { testData, proxyPort } = testInfo;
    const proxyRequest = await buildProxyRequest(testData, request);
    const resp = await originalFetch(`http://localhost:${proxyPort}`, {
        method: 'POST',
        body: JSON.stringify(proxyRequest),
        next: {
            // @ts-ignore
            internal: true
        }
    });
    if (!resp.ok) {
        throw Object.defineProperty(new Error(`Proxy request failed: ${resp.status}`), "__NEXT_ERROR_CODE", {
            value: "E146",
            enumerable: false,
            configurable: true
        });
    }
    const proxyResponse = await resp.json();
    const { api } = proxyResponse;
    switch(api){
        case 'continue':
            return originalFetch(request);
        case 'abort':
        case 'unhandled':
            throw Object.defineProperty(new Error(`Proxy request aborted [${request.method} ${request.url}]`), "__NEXT_ERROR_CODE", {
                value: "E145",
                enumerable: false,
                configurable: true
            });
        case 'fetch':
            return buildResponse(proxyResponse);
        default:
            return api;
    }
}
function interceptFetch(originalFetch) {
    /*TURBOPACK member replacement*/ __turbopack_context__.g.fetch = function testFetch(input, init) {
        var _init_next;
        // Passthrough internal requests.
        // @ts-ignore
        if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
            return originalFetch(input, init);
        }
        return handleFetch(originalFetch, new Request(input, init));
    };
    return ()=>{
        /*TURBOPACK member replacement*/ __turbopack_context__.g.fetch = originalFetch;
    };
} //# sourceMappingURL=fetch.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/httpget.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "interceptHttpGet", {
    enumerable: true,
    get: function() {
        return interceptHttpGet;
    }
});
const _ClientRequest = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/@mswjs/interceptors/ClientRequest/index.js [app-client] (ecmascript)");
const _fetch = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/fetch.js [app-client] (ecmascript)");
function interceptHttpGet(originalFetch) {
    const clientRequestInterceptor = new _ClientRequest.ClientRequestInterceptor();
    clientRequestInterceptor.on('request', async ({ request })=>{
        const response = await (0, _fetch.handleFetch)(originalFetch, request);
        request.respondWith(response);
    });
    clientRequestInterceptor.apply();
    // Cleanup.
    return ()=>{
        clientRequestInterceptor.dispose();
    };
} //# sourceMappingURL=httpget.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/server.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    interceptTestApis: null,
    wrapRequestHandlerNode: null,
    wrapRequestHandlerWorker: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandlerNode: function() {
        return wrapRequestHandlerNode;
    },
    wrapRequestHandlerWorker: function() {
        return wrapRequestHandlerWorker;
    }
});
const _context = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/context.js [app-client] (ecmascript)");
const _fetch = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/fetch.js [app-client] (ecmascript)");
const _httpget = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/httpget.js [app-client] (ecmascript)");
const reader = {
    url (req) {
        return req.url ?? '';
    },
    header (req, name) {
        const h = req.headers[name];
        if (h === undefined || h === null) {
            return null;
        }
        if (typeof h === 'string') {
            return h;
        }
        return h[0] ?? null;
    }
};
function interceptTestApis() {
    const originalFetch = /*TURBOPACK member replacement*/ __turbopack_context__.g.fetch;
    const restoreFetch = (0, _fetch.interceptFetch)(originalFetch);
    const restoreHttpGet = (0, _httpget.interceptHttpGet)(originalFetch);
    // Cleanup.
    return ()=>{
        restoreFetch();
        restoreHttpGet();
    };
}
function wrapRequestHandlerWorker(handler) {
    return (req, res)=>(0, _context.withRequest)(req, reader, ()=>handler(req, res));
}
function wrapRequestHandlerNode(handler) {
    return (req, res, parsedUrl)=>(0, _context.withRequest)(req, reader, ()=>handler(req, res, parsedUrl));
} //# sourceMappingURL=server.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/server-edge.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    interceptTestApis: null,
    wrapRequestHandler: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandler: function() {
        return wrapRequestHandler;
    }
});
const _context = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/context.js [app-client] (ecmascript)");
const _fetch = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/fetch.js [app-client] (ecmascript)");
function interceptTestApis() {
    return (0, _fetch.interceptFetch)(/*TURBOPACK member replacement*/ __turbopack_context__.g.fetch);
}
function wrapRequestHandler(handler) {
    return (req, fn)=>(0, _context.withRequest)(req, _fetch.reader, ()=>handler(req, fn));
} //# sourceMappingURL=server-edge.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/trusted-types.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Stores the Trusted Types Policy. Starts as undefined and can be set to null
 * if Trusted Types is not supported in the browser.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "__unsafeCreateTrustedScriptURL", {
    enumerable: true,
    get: function() {
        return __unsafeCreateTrustedScriptURL;
    }
});
let policy;
/**
 * Getter for the Trusted Types Policy. If it is undefined, it is instantiated
 * here or set to null if Trusted Types is not supported in the browser.
 */ function getPolicy() {
    if (typeof policy === 'undefined' && typeof window !== 'undefined') {
        policy = window.trustedTypes?.createPolicy('nextjs', {
            createHTML: (input)=>input,
            createScript: (input)=>input,
            createScriptURL: (input)=>input
        }) || null;
    }
    return policy;
}
function __unsafeCreateTrustedScriptURL(url) {
    return getPolicy()?.createScriptURL(url) || url;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=trusted-types.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/request-idle-callback.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    cancelIdleCallback: null,
    requestIdleCallback: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cancelIdleCallback: function() {
        return cancelIdleCallback;
    },
    requestIdleCallback: function() {
        return requestIdleCallback;
    }
});
const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/route-loader.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createRouteLoader: null,
    getClientBuildManifest: null,
    isAssetError: null,
    markAssetError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createRouteLoader: function() {
        return createRouteLoader;
    },
    getClientBuildManifest: function() {
        return getClientBuildManifest;
    },
    isAssetError: function() {
        return isAssetError;
    },
    markAssetError: function() {
        return markAssetError;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _getassetpathfromroute = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/get-asset-path-from-route.js [app-client] (ecmascript)"));
const _trustedtypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/trusted-types.js [app-client] (ecmascript)");
const _requestidlecallback = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/request-idle-callback.js [app-client] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/deployment-id.js [app-client] (ecmascript)");
const _encodeuripath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/encode-uri-path.js [app-client] (ecmascript)");
// 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.
const MS_MAX_IDLE_DELAY = 3800;
function withFuture(key, map, generator) {
    let entry = map.get(key);
    if (entry) {
        if ('future' in entry) {
            return entry.future;
        }
        return Promise.resolve(entry);
    }
    let resolver;
    const prom = new Promise((resolve)=>{
        resolver = resolve;
    });
    map.set(key, {
        resolve: resolver,
        future: prom
    });
    return generator ? generator().then((value)=>{
        resolver(value);
        return value;
    }).catch((err)=>{
        map.delete(key);
        throw err;
    }) : prom;
}
const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR');
function markAssetError(err) {
    return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}
function isAssetError(err) {
    return err && ASSET_LOAD_ERROR in err;
}
function hasPrefetch(link) {
    try {
        link = document.createElement('link');
        return(// with relList.support
        !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch'));
    } catch  {
        return false;
    }
}
const canPrefetch = hasPrefetch();
const getAssetQueryString = ()=>{
    return (0, _deploymentid.getDeploymentIdQueryOrEmptyString)();
};
function prefetchViaDom(href, as, link) {
    return new Promise((resolve, reject)=>{
        const selector = `
      link[rel="prefetch"][href^="${href}"],
      link[rel="preload"][href^="${href}"],
      script[src^="${href}"]`;
        if (document.querySelector(selector)) {
            return resolve();
        }
        link = document.createElement('link');
        // The order of property assignment here is intentional:
        if (as) link.as = as;
        link.rel = `prefetch`;
        link.crossOrigin = ("TURBOPACK compile-time value", void 0);
        link.onload = resolve;
        link.onerror = ()=>reject(markAssetError(Object.defineProperty(new Error(`Failed to prefetch: ${href}`), "__NEXT_ERROR_CODE", {
                value: "E268",
                enumerable: false,
                configurable: true
            })));
        // `href` should always be last:
        link.href = href;
        document.head.appendChild(link);
    });
}
function appendScript(src, script) {
    return new Promise((resolve, reject)=>{
        script = document.createElement('script');
        // The order of property assignment here is intentional.
        // 1. Setup success/failure hooks in case the browser synchronously
        //    executes when `src` is set.
        script.onload = resolve;
        script.onerror = ()=>reject(markAssetError(Object.defineProperty(new Error(`Failed to load script: ${src}`), "__NEXT_ERROR_CODE", {
                value: "E74",
                enumerable: false,
                configurable: true
            })));
        // 2. Configure the cross-origin attribute before setting `src` in case the
        //    browser begins to fetch.
        script.crossOrigin = ("TURBOPACK compile-time value", void 0);
        // 3. Finally, set the source and inject into the DOM in case the child
        //    must be appended for fetching to start.
        script.src = src;
        document.body.appendChild(script);
    });
}
// We wait for pages to be built in dev before we start the route transition
// timeout to prevent an un-necessary hard navigation in development.
let devBuildPromise;
// Resolve a promise that times out after given amount of milliseconds.
function resolvePromiseWithTimeout(p, ms, err) {
    return new Promise((resolve, reject)=>{
        let cancelled = false;
        p.then((r)=>{
            // Resolved, cancel the timeout
            cancelled = true;
            resolve(r);
        }).catch(reject);
        // We wrap these checks separately for better dead-code elimination in
        // production bundles.
        if ("TURBOPACK compile-time truthy", 1) {
            ;
            (devBuildPromise || Promise.resolve()).then(()=>{
                (0, _requestidlecallback.requestIdleCallback)(()=>setTimeout(()=>{
                        if (!cancelled) {
                            reject(err);
                        }
                    }, ms));
            });
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    });
}
function getClientBuildManifest() {
    if (self.__BUILD_MANIFEST) {
        return Promise.resolve(self.__BUILD_MANIFEST);
    }
    const onBuildManifest = new Promise((resolve)=>{
        // Mandatory because this is not concurrent safe:
        const cb = self.__BUILD_MANIFEST_CB;
        self.__BUILD_MANIFEST_CB = ()=>{
            resolve(self.__BUILD_MANIFEST);
            cb && cb();
        };
    });
    return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(Object.defineProperty(new Error('Failed to load client build manifest'), "__NEXT_ERROR_CODE", {
        value: "E273",
        enumerable: false,
        configurable: true
    })));
}
function getFilesForRoute(assetPrefix, route) {
    if ("TURBOPACK compile-time truthy", 1) {
        const scriptUrl = assetPrefix + '/_next/static/chunks/pages' + (0, _encodeuripath.encodeURIPath)((0, _getassetpathfromroute.default)(route, '.js')) + getAssetQueryString();
        return Promise.resolve({
            scripts: [
                (0, _trustedtypes.__unsafeCreateTrustedScriptURL)(scriptUrl)
            ],
            // Styles are handled by `style-loader` in development:
            css: []
        });
    }
    //TURBOPACK unreachable
    ;
}
function createRouteLoader(assetPrefix) {
    const entrypoints = new Map();
    const loadedScripts = new Map();
    const styleSheets = new Map();
    const routes = new Map();
    function maybeExecuteScript(src) {
        // With HMR we might need to "reload" scripts when they are
        // disposed and readded. Executing scripts twice has no functional
        // differences
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            return appendScript(src);
        }
    }
    function fetchStyleSheet(href) {
        let prom = styleSheets.get(href);
        if (prom) {
            return prom;
        }
        styleSheets.set(href, prom = fetch(href, {
            credentials: 'same-origin'
        }).then((res)=>{
            if (!res.ok) {
                throw Object.defineProperty(new Error(`Failed to load stylesheet: ${href}`), "__NEXT_ERROR_CODE", {
                    value: "E189",
                    enumerable: false,
                    configurable: true
                });
            }
            return res.text().then((text)=>({
                    href: href,
                    content: text
                }));
        }).catch((err)=>{
            throw markAssetError(err);
        }));
        return prom;
    }
    return {
        whenEntrypoint (route) {
            return withFuture(route, entrypoints);
        },
        onEntrypoint (route, execute) {
            ;
            (execute ? Promise.resolve().then(()=>execute()).then((exports1)=>({
                    component: exports1 && exports1.default || exports1,
                    exports: exports1
                }), (err)=>({
                    error: err
                })) : Promise.resolve(undefined)).then((input)=>{
                const old = entrypoints.get(route);
                if (old && 'resolve' in old) {
                    if (input) {
                        entrypoints.set(route, input);
                        old.resolve(input);
                    }
                } else {
                    if (input) {
                        entrypoints.set(route, input);
                    } else {
                        entrypoints.delete(route);
                    }
                    // when this entrypoint has been resolved before
                    // the route is outdated and we want to invalidate
                    // this cache entry
                    routes.delete(route);
                }
            });
        },
        loadRoute (route, prefetch) {
            return withFuture(route, routes, ()=>{
                let devBuildPromiseResolve;
                if ("TURBOPACK compile-time truthy", 1) {
                    devBuildPromise = new Promise((resolve)=>{
                        devBuildPromiseResolve = resolve;
                    });
                }
                return resolvePromiseWithTimeout(getFilesForRoute(assetPrefix, route).then(({ scripts, css })=>{
                    return Promise.all([
                        entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)),
                        Promise.all(css.map(fetchStyleSheet))
                    ]);
                }).then((res)=>{
                    return this.whenEntrypoint(route).then((entrypoint)=>({
                            entrypoint,
                            styles: res[1]
                        }));
                }), MS_MAX_IDLE_DELAY, markAssetError(Object.defineProperty(new Error(`Route did not complete loading: ${route}`), "__NEXT_ERROR_CODE", {
                    value: "E12",
                    enumerable: false,
                    configurable: true
                }))).then(({ entrypoint, styles })=>{
                    const res = Object.assign({
                        styles: styles
                    }, entrypoint);
                    return 'error' in entrypoint ? entrypoint : res;
                }).catch((err)=>{
                    if (prefetch) {
                        // we don't want to cache errors during prefetch
                        throw err;
                    }
                    return {
                        error: err
                    };
                }).finally(()=>devBuildPromiseResolve?.());
            });
        },
        prefetch (route) {
            // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
            // License: Apache 2.0
            let cn;
            if (cn = navigator.connection) {
                // Don't prefetch if using 2G or if Save-Data is enabled.
                if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
            }
            return getFilesForRoute(assetPrefix, route).then((output)=>Promise.all(canPrefetch ? output.scripts.map((script)=>prefetchViaDom(script.toString(), 'script')) : [])).then(()=>{
                (0, _requestidlecallback.requestIdleCallback)(()=>this.loadRoute(route, true).catch(()=>{}));
            }).catch(()=>{});
        }
    };
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=route-loader.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/script.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    handleClientScriptLoad: null,
    initScriptLoader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    handleClientScriptLoad: function() {
        return handleClientScriptLoad;
    },
    initScriptLoader: function() {
        return initScriptLoader;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"));
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [app-client] (ecmascript)");
const _setattributesfromprops = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/set-attributes-from-props.js [app-client] (ecmascript)");
const _requestidlecallback = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/request-idle-callback.js [app-client] (ecmascript)");
const ScriptCache = new Map();
const LoadCache = new Set();
const insertStylesheets = (stylesheets)=>{
    // Case 1: Styles for afterInteractive/lazyOnload with appDir injected via handleClientScriptLoad
    //
    // Using ReactDOM.preinit to feature detect appDir and inject styles
    // Stylesheets might have already been loaded if initialized with Script component
    // Re-inject styles here to handle scripts loaded via handleClientScriptLoad
    // ReactDOM.preinit handles dedup and ensures the styles are loaded only once
    if (_reactdom.default.preinit) {
        stylesheets.forEach((stylesheet)=>{
            _reactdom.default.preinit(stylesheet, {
                as: 'style'
            });
        });
        return;
    }
    // Case 2: Styles for afterInteractive/lazyOnload with pages injected via handleClientScriptLoad
    //
    // We use this function to load styles when appdir is not detected
    // TODO: Use React float APIs to load styles once available for pages dir
    if (typeof window !== 'undefined') {
        let head = document.head;
        stylesheets.forEach((stylesheet)=>{
            let link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = stylesheet;
            head.appendChild(link);
        });
    }
};
const loadScript = (props)=>{
    const { src, id, onLoad = ()=>{}, onReady = null, dangerouslySetInnerHTML, children = '', strategy = 'afterInteractive', onError, stylesheets } = props;
    const cacheKey = id || src;
    // Script has already loaded
    if (cacheKey && LoadCache.has(cacheKey)) {
        return;
    }
    // Contents of this script are already loading/loaded
    if (ScriptCache.has(src)) {
        LoadCache.add(cacheKey);
        // It is possible that multiple `next/script` components all have same "src", but has different "onLoad"
        // This is to make sure the same remote script will only load once, but "onLoad" are executed in order
        ScriptCache.get(src).then(onLoad, onError);
        return;
    }
    /** Execute after the script first loaded */ const afterLoad = ()=>{
        // Run onReady for the first time after load event
        if (onReady) {
            onReady();
        }
        // add cacheKey to LoadCache when load successfully
        LoadCache.add(cacheKey);
    };
    const el = document.createElement('script');
    const loadPromise = new Promise((resolve, reject)=>{
        el.addEventListener('load', function(e) {
            resolve();
            if (onLoad) {
                onLoad.call(this, e);
            }
            afterLoad();
        });
        el.addEventListener('error', function(e) {
            reject(e);
        });
    }).catch(function(e) {
        if (onError) {
            onError(e);
        }
    });
    if (dangerouslySetInnerHTML) {
        // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
        el.innerHTML = dangerouslySetInnerHTML.__html || '';
        afterLoad();
    } else if (children) {
        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        afterLoad();
    } else if (src) {
        el.src = src;
        // do not add cacheKey into LoadCache for remote script here
        // cacheKey will be added to LoadCache when it is actually loaded (see loadPromise above)
        ScriptCache.set(src, loadPromise);
    }
    (0, _setattributesfromprops.setAttributesFromProps)(el, props);
    if (strategy === 'worker') {
        el.setAttribute('type', 'text/partytown');
    }
    el.setAttribute('data-nscript', strategy);
    // Load styles associated with this script
    if (stylesheets) {
        insertStylesheets(stylesheets);
    }
    document.body.appendChild(el);
};
function handleClientScriptLoad(props) {
    const { strategy = 'afterInteractive' } = props;
    if (strategy === 'lazyOnload') {
        window.addEventListener('load', ()=>{
            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
        });
    } else {
        loadScript(props);
    }
}
function loadLazyScript(props) {
    if (document.readyState === 'complete') {
        (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
    } else {
        window.addEventListener('load', ()=>{
            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
        });
    }
}
function addBeforeInteractiveToCache() {
    const scripts = [
        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
        ...document.querySelectorAll('[data-nscript="beforePageRender"]')
    ];
    scripts.forEach((script)=>{
        const cacheKey = script.id || script.getAttribute('src');
        LoadCache.add(cacheKey);
    });
}
function initScriptLoader(scriptLoaderItems) {
    scriptLoaderItems.forEach(handleClientScriptLoad);
    addBeforeInteractiveToCache();
}
/**
 * Load a third-party scripts in an optimized way.
 *
 * Read more: [Next.js Docs: `next/script`](https://nextjs.org/docs/app/api-reference/components/script)
 */ function Script(props) {
    const { id, src = '', onLoad = ()=>{}, onReady = null, strategy = 'afterInteractive', onError, stylesheets, ...restProps } = props;
    // Context is available only during SSR
    let { updateScripts, scripts, getIsSsr, appDir, nonce } = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    // if a nonce is explicitly passed to the script tag, favor that over the automatic handling
    nonce = restProps.nonce || nonce;
    /**
   * - First mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script hasn't loaded yet (not in LoadCache)
   *      onReady is skipped, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. hasLoadScriptEffectCalled.current is false, loadScript executes
   *      Once the script is loaded, the onLoad and onReady will be called by then
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   *
   * - Second mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script has already loaded (found in LoadCache)
   *      onReady is called, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. The script is already loaded, loadScript bails out
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   */ const hasOnReadyEffectCalled = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        const cacheKey = id || src;
        if (!hasOnReadyEffectCalled.current) {
            // Run onReady if script has loaded before but component is re-mounted
            if (onReady && cacheKey && LoadCache.has(cacheKey)) {
                onReady();
            }
            hasOnReadyEffectCalled.current = true;
        }
    }, [
        onReady,
        id,
        src
    ]);
    const hasLoadScriptEffectCalled = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        if (!hasLoadScriptEffectCalled.current) {
            if (strategy === 'afterInteractive') {
                loadScript(props);
            } else if (strategy === 'lazyOnload') {
                loadLazyScript(props);
            }
            hasLoadScriptEffectCalled.current = true;
        }
    }, [
        props,
        strategy
    ]);
    if (strategy === 'beforeInteractive' || strategy === 'worker') {
        if (updateScripts) {
            scripts[strategy] = (scripts[strategy] || []).concat([
                {
                    id,
                    src,
                    onLoad,
                    onReady,
                    onError,
                    ...restProps,
                    nonce
                }
            ]);
            updateScripts(scripts);
        } else if (getIsSsr && getIsSsr()) {
            // Script has already loaded during SSR
            LoadCache.add(id || src);
        } else if (getIsSsr && !getIsSsr()) {
            loadScript({
                ...props,
                nonce
            });
        }
    }
    // For the app directory, we need React Float to preload these scripts.
    if (appDir) {
        // Injecting stylesheets here handles beforeInteractive and worker scripts correctly
        // For other strategies injecting here ensures correct stylesheet order
        // ReactDOM.preinit handles loading the styles in the correct order,
        // also ensures the stylesheet is loaded only once and in a consistent manner
        //
        // Case 1: Styles for beforeInteractive/worker with appDir - handled here
        // Case 2: Styles for beforeInteractive/worker with pages dir - Not handled yet
        // Case 3: Styles for afterInteractive/lazyOnload with appDir - handled here
        // Case 4: Styles for afterInteractive/lazyOnload with pages dir - handled in insertStylesheets function
        if (stylesheets) {
            stylesheets.forEach((styleSrc)=>{
                _reactdom.default.preinit(styleSrc, {
                    as: 'style'
                });
            });
        }
        // Before interactive scripts need to be loaded by Next.js' runtime instead
        // of native <script> tags, because they no longer have `defer`.
        if (strategy === 'beforeInteractive') {
            if (!src) {
                // For inlined scripts, we put the content in `children`.
                if (restProps.dangerouslySetInnerHTML) {
                    // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
                    restProps.children = restProps.dangerouslySetInnerHTML.__html;
                    delete restProps.dangerouslySetInnerHTML;
                }
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                            0,
                            {
                                ...restProps,
                                id
                            }
                        ])})`
                    }
                });
            } else {
                // @ts-ignore
                _reactdom.default.preload(src, restProps.integrity ? {
                    as: 'script',
                    integrity: restProps.integrity,
                    nonce,
                    crossOrigin: restProps.crossOrigin
                } : {
                    as: 'script',
                    nonce,
                    crossOrigin: restProps.crossOrigin
                });
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                            src,
                            {
                                ...restProps,
                                id
                            }
                        ])})`
                    }
                });
            }
        } else if (strategy === 'afterInteractive') {
            if (src) {
                // @ts-ignore
                _reactdom.default.preload(src, restProps.integrity ? {
                    as: 'script',
                    integrity: restProps.integrity,
                    nonce,
                    crossOrigin: restProps.crossOrigin
                } : {
                    as: 'script',
                    nonce,
                    crossOrigin: restProps.crossOrigin
                });
            }
        }
    }
    return null;
}
Object.defineProperty(Script, '__nextScript', {
    value: true
});
const _default = Script;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=script.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/detect-domain-locale.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "detectDomainLocale", {
    enumerable: true,
    get: function() {
        return detectDomainLocale;
    }
});
const detectDomainLocale = (...args)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=detect-domain-locale.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/add-locale.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addLocale", {
    enumerable: true,
    get: function() {
        return addLocale;
    }
});
const _normalizetrailingslash = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/normalize-trailing-slash.js [app-client] (ecmascript)");
const addLocale = (path, ...args)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return path;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-locale.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/remove-locale.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeLocale", {
    enumerable: true,
    get: function() {
        return removeLocale;
    }
});
const _parsepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-client] (ecmascript)");
function removeLocale(path, locale) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return path;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=remove-locale.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/resolve-href.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveHref", {
    enumerable: true,
    get: function() {
        return resolveHref;
    }
});
const _querystring = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)");
const _formaturl = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _omit = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/omit.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _normalizetrailingslash = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/normalize-trailing-slash.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/index.js [app-client] (ecmascript)");
const _interpolateas = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js [app-client] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-regex.js [app-client] (ecmascript)");
const _routematcher = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-matcher.js [app-client] (ecmascript)");
function resolveHref(router, href, resolveAs) {
    // we use a dummy base url for relative urls
    let base;
    let urlAsString = typeof href === 'string' ? href : (0, _formaturl.formatWithValidation)(href);
    // repeated slashes and backslashes in the URL are considered
    // invalid and will never match a Next.js page/file
    // https://www.rfc-editor.org/rfc/rfc3986.html#section-3.1
    const urlProtoMatch = urlAsString.match(/^[a-z][a-z0-9+.-]*:\/\//i);
    const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
    const urlParts = urlAsStringNoProto.split('?', 1);
    if ((urlParts[0] || '').match(/(\/\/|\\)/)) {
        console.error(`Invalid href '${urlAsString}' passed to next/router in page: '${router.pathname}'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.`);
        const normalizedUrl = (0, _utils.normalizeRepeatedSlashes)(urlAsStringNoProto);
        urlAsString = (urlProtoMatch ? urlProtoMatch[0] : '') + normalizedUrl;
    }
    // Return because it cannot be routed by the Next.js router
    if (!(0, _islocalurl.isLocalURL)(urlAsString)) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
    try {
        let baseBase = urlAsString.startsWith('#') ? router.asPath : router.pathname;
        // If the provided href is only a query string, it is safer to use the asPath
        // considering rewrites.
        if (urlAsString.startsWith('?')) {
            baseBase = router.asPath;
            // However, if is a dynamic route, we need to use the pathname to preserve the
            // query interpolation and rewrites (router.pathname will look like "/[slug]").
            if ((0, _utils1.isDynamicRoute)(router.pathname)) {
                baseBase = router.pathname;
                const routeRegex = (0, _routeregex.getRouteRegex)(router.pathname);
                const match = (0, _routematcher.getRouteMatcher)(routeRegex)(router.asPath);
                // For dynamic routes, if asPath doesn't match the pathname regex, it is a rewritten path.
                // In this case, should use asPath to preserve the current URL.
                if (!match) {
                    baseBase = router.asPath;
                }
            // Note: There is an edge case where the pathname is dynamic, and also a rewrite path to the same segment.
            // E.g. in "/[slug]" path, rewrite "/foo" -> "/bar"
            // In this case, it will be treated as a non-rewritten path and possibly interpolate the query string.
            // E.g., "/any?slug=foo" will become the content of "/foo", not rewritten as "/bar"
            // This is currently a trade-off of not resolving rewrite paths on every Router/Link call,
            // but using a lighter route regex pattern check.
            }
        }
        base = new URL(baseBase, 'http://n');
    } catch (_) {
        // fallback to / for invalid asPath values e.g. //
        base = new URL('/', 'http://n');
    }
    try {
        const finalUrl = new URL(urlAsString, base);
        finalUrl.pathname = (0, _normalizetrailingslash.normalizePathTrailingSlash)(finalUrl.pathname);
        let interpolatedAs = '';
        if ((0, _utils1.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
            const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
            const { result, params } = (0, _interpolateas.interpolateAs)(finalUrl.pathname, finalUrl.pathname, query);
            if (result) {
                interpolatedAs = (0, _formaturl.formatWithValidation)({
                    pathname: result,
                    hash: finalUrl.hash,
                    query: (0, _omit.omit)(query, params)
                });
            }
        }
        // if the origin didn't change, it means we received a relative href
        const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
        return resolveAs ? [
            resolvedHref,
            interpolatedAs || resolvedHref
        ] : resolvedHref;
    } catch (_) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=resolve-href.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/with-router.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return withRouter;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _router = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/router.js [app-client] (ecmascript)");
function withRouter(ComposedComponent) {
    function WithRouterWrapper(props) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(ComposedComponent, {
            router: (0, _router.useRouter)(),
            ...props
        });
    }
    WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
    WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;
    if ("TURBOPACK compile-time truthy", 1) {
        const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
        WithRouterWrapper.displayName = `withRouter(${name})`;
    }
    return WithRouterWrapper;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=with-router.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/router.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* global window */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Router: null,
    createRouter: null,
    default: null,
    makePublicRouterInstance: null,
    useRouter: null,
    withRouter: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Router: function() {
        return _router.default;
    },
    createRouter: function() {
        return createRouter;
    },
    // Export the singletonRouter and this is the public API.
    default: function() {
        return _default;
    },
    makePublicRouterInstance: function() {
        return makePublicRouterInstance;
    },
    useRouter: function() {
        return useRouter;
    },
    withRouter: function() {
        return _withrouter.default;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _router = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/router.js [app-client] (ecmascript)"));
const _routercontextsharedruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)");
const _iserror = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)"));
const _withrouter = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/with-router.js [app-client] (ecmascript)"));
const singletonRouter = {
    router: null,
    readyCallbacks: [],
    ready (callback) {
        if (this.router) return callback();
        if (typeof window !== 'undefined') {
            this.readyCallbacks.push(callback);
        }
    }
};
// Create public properties and methods of the router in the singletonRouter
const urlPropertyFields = [
    'pathname',
    'route',
    'query',
    'asPath',
    'components',
    'isFallback',
    'basePath',
    'locale',
    'locales',
    'defaultLocale',
    'isReady',
    'isPreview',
    'isLocaleDomain',
    'domainLocales'
];
const routerEvents = [
    'routeChangeStart',
    'beforeHistoryChange',
    'routeChangeComplete',
    'routeChangeError',
    'hashChangeStart',
    'hashChangeComplete'
];
const coreMethodFields = [
    'push',
    'replace',
    'reload',
    'back',
    'prefetch',
    'beforePopState'
];
// Events is a static property on the router, the router doesn't have to be initialized to use it
Object.defineProperty(singletonRouter, 'events', {
    get () {
        return _router.default.events;
    }
});
function getRouter() {
    if (!singletonRouter.router) {
        const message = 'No router instance found.\n' + 'You should only use "next/router" on the client side of your app.\n';
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return singletonRouter.router;
}
urlPropertyFields.forEach((field)=>{
    // Here we need to use Object.defineProperty because we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    Object.defineProperty(singletonRouter, field, {
        get () {
            const router = getRouter();
            return router[field];
        }
    });
});
coreMethodFields.forEach((field)=>{
    // We don't really know the types here, so we add them later instead
    ;
    singletonRouter[field] = (...args)=>{
        const router = getRouter();
        return router[field](...args);
    };
});
routerEvents.forEach((event)=>{
    singletonRouter.ready(()=>{
        _router.default.events.on(event, (...args)=>{
            const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
            const _singletonRouter = singletonRouter;
            if (_singletonRouter[eventField]) {
                try {
                    _singletonRouter[eventField](...args);
                } catch (err) {
                    console.error(`Error when running the Router event: ${eventField}`);
                    console.error((0, _iserror.default)(err) ? `${err.message}\n${err.stack}` : err + '');
                }
            }
        });
    });
});
const _default = singletonRouter;
function useRouter() {
    const router = _react.default.useContext(_routercontextsharedruntime.RouterContext);
    if (!router) {
        throw Object.defineProperty(new Error('NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted'), "__NEXT_ERROR_CODE", {
            value: "E509",
            enumerable: false,
            configurable: true
        });
    }
    return router;
}
function createRouter(...args) {
    singletonRouter.router = new _router.default(...args);
    singletonRouter.readyCallbacks.forEach((cb)=>cb());
    singletonRouter.readyCallbacks = [];
    return singletonRouter.router;
}
function makePublicRouterInstance(router) {
    const scopedRouter = router;
    const instance = {};
    for (const property of urlPropertyFields){
        if (typeof scopedRouter[property] === 'object') {
            instance[property] = Object.assign(Array.isArray(scopedRouter[property]) ? [] : {}, scopedRouter[property]) // makes sure query is not stateful
            ;
            continue;
        }
        instance[property] = scopedRouter[property];
    }
    // Events is a static property on the router, the router doesn't have to be initialized to use it
    instance.events = _router.default.events;
    coreMethodFields.forEach((field)=>{
        instance[field] = (...args)=>{
            return scopedRouter[field](...args);
        };
    });
    return instance;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/dev/hot-reloader/pages/websocket.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    addMessageListener: null,
    connectHMR: null,
    sendMessage: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    addMessageListener: function() {
        return addMessageListener;
    },
    connectHMR: function() {
        return connectHMR;
    },
    sendMessage: function() {
        return sendMessage;
    }
});
const _forwardlogs = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/app/forward-logs.js [app-client] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const _getsocketurl = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/dev/hot-reloader/get-socket-url.js [app-client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)");
let source;
const messageCallbacks = [];
function addMessageListener(callback) {
    messageCallbacks.push(callback);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
let reconnections = 0;
let reloading = false;
let serverSessionId = null;
function connectHMR(options) {
    let timer;
    function init() {
        if (source) source.close();
        function handleOnline() {
            _forwardlogs.logQueue.onSocketReady(source);
            reconnections = 0;
            window.console.log('[HMR] connected');
        }
        function handleMessage(event) {
            // While the page is reloading, don't respond to any more messages.
            // On reconnect, the server may send an empty list of changes if it was restarted.
            if (reloading) {
                return;
            }
            const message = JSON.parse(event.data);
            if (message.type === _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_CONNECTED) {
                if (serverSessionId !== null && serverSessionId !== message.data.sessionId) {
                    // Either the server's session id has changed and it's a new server, or
                    // it's been too long since we disconnected and we should reload the page.
                    // There could be 1) unhandled server errors and/or 2) stale content.
                    // Perform a hard reload of the page.
                    window.location.reload();
                    reloading = true;
                    return;
                }
                serverSessionId = message.data.sessionId;
            }
            for (const messageCallback of messageCallbacks){
                messageCallback(message);
            }
        }
        function handleDisconnect() {
            source.onerror = null;
            source.onclose = null;
            source.close();
            reconnections++;
            // After 25 reconnects we'll want to reload the page as it indicates the dev server is no longer running.
            if (reconnections > _constants.WEB_SOCKET_MAX_RECONNECTIONS) {
                reloading = true;
                window.location.reload();
                return;
            }
            clearTimeout(timer);
            // Try again after 5 seconds
            timer = setTimeout(init, reconnections > 5 ? 5000 : 1000);
        }
        const url = (0, _getsocketurl.getSocketUrl)(options.assetPrefix);
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onclose = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=websocket.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/dev/hot-reloader/pages/hot-reloader-pages.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// TODO: Remove use of `any` type.
/**
 * MIT License
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */ /// <reference types="webpack/module.d.ts" />
// This file is a modified version of the Create React App HMR dev client that
// can be found here:
// https://github.com/facebook/create-react-app/blob/v3.4.1/packages/react-dev-utils/webpackHotDevClient.js
/// <reference types="webpack/module.d.ts" />
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    handleStaticIndicator: null,
    performFullReload: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return connect;
    },
    handleStaticIndicator: function() {
        return handleStaticIndicator;
    },
    performFullReload: function() {
        return performFullReload;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _nextdevtools = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/next-devtools/index.js (raw)");
const _pagesdevoverlaysetup = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup.js [app-client] (ecmascript)");
const _stripansi = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/strip-ansi/index.js [app-client] (ecmascript)"));
const _websocket = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/dev/hot-reloader/pages/websocket.js [app-client] (ecmascript)");
const _formatwebpackmessages = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/format-webpack-messages.js [app-client] (ecmascript)"));
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)");
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/dev/hot-reloader/shared.js [app-client] (ecmascript)");
const _runtimeerrorhandler = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/dev/runtime-error-handler.js [app-client] (ecmascript)");
const _reporthmrlatency = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/dev/report-hmr-latency.js [app-client] (ecmascript)"));
const _turbopackhotreloadercommon = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/dev/hot-reloader/turbopack-hot-reloader-common.js [app-client] (ecmascript)");
window.__nextDevClientId = Math.round(Math.random() * 100 + Date.now());
let customHmrEventHandler;
let turbopackMessageListeners = [];
function connect() {
    (0, _pagesdevoverlaysetup.register)();
    (0, _websocket.addMessageListener)((message)=>{
        try {
            processMessage(message);
        } catch (err) {
            (0, _shared.reportInvalidHmrMessage)(message, err);
        }
    });
    return {
        subscribeToHmrEvent (handler) {
            customHmrEventHandler = handler;
        },
        onUnrecoverableError () {
            _runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError = true;
        },
        addTurbopackMessageListener (cb) {
            turbopackMessageListeners.push(cb);
        },
        sendTurbopackMessage (msg) {
            (0, _websocket.sendMessage)(msg);
        },
        handleUpdateError (err) {
            performFullReload(err);
        }
    };
}
// Remember some state related to hot module replacement.
var isFirstCompilation = true;
var mostRecentCompilationHash = null;
var hasCompileErrors = false;
function clearOutdatedErrors() {
    // Clean up outdated compile errors, if any.
    if (typeof console !== 'undefined' && typeof console.clear === 'function') {
        if (hasCompileErrors) {
            console.clear();
        }
    }
}
// Successful compilation.
function handleSuccess() {
    clearOutdatedErrors();
    hasCompileErrors = false;
    if ("TURBOPACK compile-time truthy", 1) {
        const hmrUpdate = turbopackHmr.onBuilt();
        if (hmrUpdate != null) {
            (0, _reporthmrlatency.default)(_websocket.sendMessage, [
                ...hmrUpdate.updatedModules
            ], hmrUpdate.startMsSinceEpoch, hmrUpdate.endMsSinceEpoch, hmrUpdate.hasUpdates);
        }
        _nextdevtools.dispatcher.onBuildOk();
    } else //TURBOPACK unreachable
    ;
    isFirstCompilation = false;
}
// Compilation with warnings (e.g. ESLint).
function handleWarnings(warnings) {
    clearOutdatedErrors();
    const isHotUpdate = !isFirstCompilation;
    isFirstCompilation = false;
    hasCompileErrors = false;
    function printWarnings() {
        // Print warnings to the console.
        const formatted = (0, _formatwebpackmessages.default)({
            warnings: warnings,
            errors: []
        });
        if (typeof console !== 'undefined' && typeof console.warn === 'function') {
            for(let i = 0; i < formatted.warnings?.length; i++){
                if (i === 5) {
                    console.warn('There were more warnings in other files.\n' + 'You can find a complete log in the terminal.');
                    break;
                }
                console.warn((0, _stripansi.default)(formatted.warnings[i]));
            }
        }
    }
    printWarnings();
    // Attempt to apply hot updates or reload.
    if (isHotUpdate) {
        tryApplyUpdatesWebpack();
    }
}
// Compilation with errors (e.g. syntax error or missing modules).
function handleErrors(errors) {
    clearOutdatedErrors();
    isFirstCompilation = false;
    hasCompileErrors = true;
    // "Massage" webpack messages.
    var formatted = (0, _formatwebpackmessages.default)({
        errors: errors,
        warnings: []
    });
    // Only show the first error.
    _nextdevtools.dispatcher.onBuildError(formatted.errors[0]);
    // Also log them to the console.
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        for(var i = 0; i < formatted.errors.length; i++){
            console.error((0, _stripansi.default)(formatted.errors[i]));
        }
    }
    // Do not attempt to reload now.
    // We will reload on next success instead.
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
let webpackStartMsSinceEpoch = null;
const turbopackHmr = ("TURBOPACK compile-time truthy", 1) ? new _turbopackhotreloadercommon.TurbopackHmr() : "TURBOPACK unreachable";
let isrManifest = {};
// There is a newer version of the code available.
function handleAvailableHash(hash) {
    // Update last known compilation hash.
    mostRecentCompilationHash = hash;
}
function handleStaticIndicator() {
    if ("TURBOPACK compile-time truthy", 1) {
        const routeInfo = window.next.router.components[window.next.router.pathname];
        const pageComponent = routeInfo?.Component;
        const appComponent = window.next.router.components['/_app']?.Component;
        const isDynamicPage = Boolean(pageComponent?.getInitialProps) || Boolean(routeInfo?.__N_SSP);
        const hasAppGetInitialProps = Boolean(appComponent?.getInitialProps) && appComponent?.getInitialProps !== appComponent?.origGetInitialProps;
        const isPageStatic = isrManifest[window.location.pathname] || !isDynamicPage && !hasAppGetInitialProps;
        _nextdevtools.dispatcher.onStaticIndicator(isPageStatic ? 'static' : 'dynamic');
    }
}
/** Handles messages from the server for the Pages Router. */ function processMessage(message) {
    switch(message.type){
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ISR_MANIFEST:
            {
                isrManifest = message.data;
                handleStaticIndicator();
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILDING:
            {
                _nextdevtools.dispatcher.buildingIndicatorShow();
                if ("TURBOPACK compile-time truthy", 1) {
                    turbopackHmr.onBuilding();
                } else //TURBOPACK unreachable
                ;
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILT:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SYNC:
            {
                _nextdevtools.dispatcher.buildingIndicatorHide();
                if (message.hash) handleAvailableHash(message.hash);
                const { errors, warnings } = message;
                // Is undefined when it's a 'built' event
                if ('versionInfo' in message) _nextdevtools.dispatcher.onVersionInfo(message.versionInfo);
                if ('devIndicator' in message) _nextdevtools.dispatcher.onDevIndicator(message.devIndicator);
                if ('devToolsConfig' in message) _nextdevtools.dispatcher.onDevToolsConfig(message.devToolsConfig);
                const hasErrors = Boolean(errors && errors.length);
                if (hasErrors) {
                    (0, _websocket.sendMessage)(JSON.stringify({
                        event: 'client-error',
                        errorCount: errors.length,
                        clientId: window.__nextDevClientId
                    }));
                    return handleErrors(errors);
                }
                // NOTE: Turbopack does not currently send warnings
                const hasWarnings = Boolean(warnings && warnings.length);
                if (hasWarnings) {
                    (0, _websocket.sendMessage)(JSON.stringify({
                        event: 'client-warning',
                        warningCount: warnings.length,
                        clientId: window.__nextDevClientId
                    }));
                    return handleWarnings(warnings);
                }
                (0, _websocket.sendMessage)(JSON.stringify({
                    event: 'client-success',
                    clientId: window.__nextDevClientId
                }));
                return handleSuccess();
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_COMPONENT_CHANGES:
            {
                turbopackHmr?.onServerComponentChanges();
                if (hasCompileErrors || _runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
                    window.location.reload();
                }
                return;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ERROR:
            {
                const { errorJSON } = message;
                if (errorJSON) {
                    const errorObject = JSON.parse(errorJSON);
                    const error = Object.defineProperty(new Error(errorObject.message), "__NEXT_ERROR_CODE", {
                        value: "E394",
                        enumerable: false,
                        configurable: true
                    });
                    error.stack = errorObject.stack;
                    handleErrors([
                        error
                    ]);
                }
                return;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_CONNECTED:
            {
                for (const listener of turbopackMessageListeners){
                    listener({
                        type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_CONNECTED,
                        data: message.data
                    });
                }
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_MESSAGE:
            {
                turbopackHmr.onTurbopackMessage(message);
                _nextdevtools.dispatcher.onBeforeRefresh();
                for (const listener of turbopackMessageListeners){
                    listener({
                        type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_MESSAGE,
                        data: message.data
                    });
                }
                if (_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
                    console.warn(_shared.REACT_REFRESH_FULL_RELOAD_FROM_ERROR);
                    performFullReload(null);
                }
                _nextdevtools.dispatcher.onRefresh();
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ADDED_PAGE:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REMOVED_PAGE:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEV_PAGES_MANIFEST_UPDATE:
            if (customHmrEventHandler) {
                customHmrEventHandler(message);
            }
            break;
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEVTOOLS_CONFIG:
            _nextdevtools.dispatcher.onDevToolsConfig(message.data);
            break;
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CACHE_INDICATOR:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK:
            break;
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CLIENT_CHANGES:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ONLY_CHANGES:
            break;
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REQUEST_CURRENT_ERROR_STATE:
            {
                const errorState = (0, _nextdevtools.getSerializedOverlayState)();
                const response = {
                    event: _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER.MCP_ERROR_STATE_RESPONSE,
                    requestId: message.requestId,
                    errorState,
                    url: window.location.href
                };
                (0, _websocket.sendMessage)(JSON.stringify(response));
                break;
            }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REQUEST_PAGE_METADATA:
            {
                const segmentTrieData = (0, _nextdevtools.getSegmentTrieData)();
                const response = {
                    event: _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER.MCP_PAGE_METADATA_RESPONSE,
                    requestId: message.requestId,
                    segmentTrieData,
                    url: window.location.href
                };
                (0, _websocket.sendMessage)(JSON.stringify(response));
                return;
            }
        default:
            message;
    }
}
// Is there a newer version of this code available?
function isUpdateAvailable() {
    /* globals __webpack_hash__ */ // __webpack_hash__ is the hash of the current compilation.
    // It's a global variable injected by Webpack.
    return mostRecentCompilationHash !== __webpack_hash__;
}
// Webpack disallows updates in other states.
function canApplyUpdates() {
    return module.hot.status() === 'idle';
}
function afterApplyUpdates(fn) {
    if (canApplyUpdates()) {
        fn();
    } else {
        function handler(status) {
            if (status === 'idle') {
                module.hot.removeStatusHandler(handler);
                fn();
            }
        }
        module.hot.addStatusHandler(handler);
    }
}
// Attempt to update code on the fly, fall back to a hard reload.
function tryApplyUpdatesWebpack() {
    if (!module.hot) {
        // HotModuleReplacementPlugin is not in Webpack configuration.
        console.error('HotModuleReplacementPlugin is not in Webpack configuration.');
        // window.location.reload();
        return;
    }
    if (!isUpdateAvailable() || !canApplyUpdates()) {
        _nextdevtools.dispatcher.onBuildOk();
        return;
    }
    function handleApplyUpdates(err, updatedModules) {
        if (err || _runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError || updatedModules == null) {
            if (err) {
                console.warn(_shared.REACT_REFRESH_FULL_RELOAD);
            } else if (_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
                console.warn(_shared.REACT_REFRESH_FULL_RELOAD_FROM_ERROR);
            }
            performFullReload(err);
            return;
        }
        _nextdevtools.dispatcher.onBuildOk();
        if (isUpdateAvailable()) {
            // While we were updating, there was a new update! Do it again.
            tryApplyUpdatesWebpack();
            return;
        }
        _nextdevtools.dispatcher.onRefresh();
        (0, _reporthmrlatency.default)(_websocket.sendMessage, updatedModules, webpackStartMsSinceEpoch, Date.now());
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    // https://webpack.js.org/api/hot-module-replacement/#check
    module.hot.check(/* autoApply */ false).then((updatedModules)=>{
        if (updatedModules == null) {
            return null;
        }
        // We should always handle an update, even if updatedModules is empty (but
        // non-null) for any reason. That's what webpack would normally do:
        // https://github.com/webpack/webpack/blob/3aa6b6bc3a64/lib/hmr/HotModuleReplacement.runtime.js#L296-L298
        _nextdevtools.dispatcher.onBeforeRefresh();
        // https://webpack.js.org/api/hot-module-replacement/#apply
        return module.hot.apply();
    }).then((updatedModules)=>{
        handleApplyUpdates(null, updatedModules);
    }, (err)=>{
        handleApplyUpdates(err, null);
    });
}
function performFullReload(err) {
    const stackTrace = err && (err.stack && err.stack.split('\n').slice(0, 5).join('\n') || err.message || err + '');
    (0, _websocket.sendMessage)(JSON.stringify({
        event: 'client-full-reload',
        stackTrace,
        hadRuntimeError: !!_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError,
        dependencyChain: err ? err.dependencyChain : undefined
    }));
    window.location.reload();
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hot-reloader-pages.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/components/styles/access-error-styles.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "styles", {
    enumerable: true,
    get: function() {
        return styles;
    }
});
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        display: 'inline-block'
    },
    h1: {
        display: 'inline-block',
        margin: '0 20px 0 0',
        padding: '0 23px 0 0',
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: 'top',
        lineHeight: '49px'
    },
    h2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '49px',
        margin: 0
    }
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=access-error-styles.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/components/http-access-fallback/error-fallback.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HTTPAccessErrorFallback", {
    enumerable: true,
    get: function() {
        return HTTPAccessErrorFallback;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _accesserrorstyles = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/components/styles/access-error-styles.js [app-client] (ecmascript)");
function HTTPAccessErrorFallback({ status, message }) {
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("title", {
                children: `${status}: ${message}`
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                style: _accesserrorstyles.styles.error,
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("style", {
                            dangerouslySetInnerHTML: {
                                /* Minified CSS from
                body { margin: 0; color: #000; background: #fff; }
                .next-error-h1 {
                  border-right: 1px solid rgba(0, 0, 0, .3);
                }

                @media (prefers-color-scheme: dark) {
                  body { color: #fff; background: #000; }
                  .next-error-h1 {
                    border-right: 1px solid rgba(255, 255, 255, .3);
                  }
                }
              */ __html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}`
                            }
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("h1", {
                            className: "next-error-h1",
                            style: _accesserrorstyles.styles.h1,
                            children: status
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                            style: _accesserrorstyles.styles.desc,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)("h2", {
                                style: _accesserrorstyles.styles.h2,
                                children: message
                            })
                        })
                    ]
                })
            })
        ]
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=error-fallback.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/components/builtin/global-not-found.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _errorfallback = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/components/http-access-fallback/error-fallback.js [app-client] (ecmascript)");
function GlobalNotFound() {
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("html", {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("body", {
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorfallback.HTTPAccessErrorFallback, {
                status: 404,
                message: 'This page could not be found.'
            })
        })
    });
}
const _default = GlobalNotFound;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=global-not-found.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/components/builtin/app-error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        lineHeight: '48px'
    },
    h1: {
        display: 'inline-block',
        margin: '0 20px 0 0',
        paddingRight: 23,
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: 'top'
    },
    h2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '28px'
    },
    wrap: {
        display: 'inline-block'
    }
};
/* CSS minified from
body { margin: 0; color: #000; background: #fff; }
.next-error-h1 {
  border-right: 1px solid rgba(0, 0, 0, .3);
}
@media (prefers-color-scheme: dark) {
  body { color: #fff; background: #000; }
  .next-error-h1 {
    border-right: 1px solid rgba(255, 255, 255, .3);
  }
}
*/ const themeCss = `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}
@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}`;
function AppError() {
    const errorMessage = 'Internal Server Error.';
    const title = `500: ${errorMessage}`;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("html", {
        id: "__next_error__",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("head", {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("title", {
                    children: title
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("body", {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    style: styles.error,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        style: styles.desc,
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("style", {
                                dangerouslySetInnerHTML: {
                                    __html: themeCss
                                }
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("h1", {
                                className: "next-error-h1",
                                style: styles.h1,
                                children: "500"
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                style: styles.wrap,
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("h2", {
                                    style: styles.h2,
                                    children: errorMessage
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}
const _default = AppError;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-error.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/client/components/noop-head.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return NoopHead;
    }
});
function NoopHead() {
    return null;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=noop-head.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/pages/_document.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/// <reference types="webpack/module.d.ts" />
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Head: null,
    Html: null,
    Main: null,
    NextScript: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Head: function() {
        return Head;
    },
    Html: function() {
        return Html;
    },
    Main: function() {
        return Main;
    },
    NextScript: function() {
        return NextScript;
    },
    /**
 * `Document` component handles the initial `document` markup and renders only on the server side.
 * Commonly used for implementing server side rendering for `css-in-js` libraries.
 */ default: function() {
        return Document;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-client] (ecmascript)");
const _getpagefiles = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/get-page-files.js [app-client] (ecmascript)");
const _htmlescape = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/htmlescape.js [app-client] (ecmascript)");
const _iserror = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)"));
const _htmlcontextsharedruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/html-context.shared-runtime.js [app-client] (ecmascript)");
const _encodeuripath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/encode-uri-path.js [app-client] (ecmascript)");
const _tracer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/trace/tracer.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/trace/utils.js [app-client] (ecmascript)");
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
/** Set of pages that have triggered a large data warning on production mode. */ const largePageDataWarnings = new Set();
function getDocumentFiles(buildManifest, pathname) {
    const sharedFiles = (0, _getpagefiles.getPageFiles)(buildManifest, '/_app');
    const pageFiles = (0, _getpagefiles.getPageFiles)(buildManifest, pathname);
    return {
        sharedFiles,
        pageFiles,
        allFiles: [
            ...new Set([
                ...sharedFiles,
                ...pageFiles
            ])
        ]
    };
}
function getPolyfillScripts(context, props) {
    // polyfills.js has to be rendered as nomodule without async
    // It also has to be the first script to load
    const { assetPrefix, buildManifest, assetQueryString, disableOptimizedLoading, crossOrigin } = context;
    return buildManifest.polyfillFiles.filter((polyfill)=>polyfill.endsWith('.js') && !polyfill.endsWith('.module.js')).map((polyfill)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
            defer: !disableOptimizedLoading,
            nonce: props.nonce,
            crossOrigin: props.crossOrigin || crossOrigin,
            noModule: true,
            src: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(polyfill)}${assetQueryString}`
        }, polyfill));
}
function hasComponentProps(child) {
    return !!child && !!child.props;
}
function getDynamicChunks(context, props, files) {
    const { dynamicImports, assetPrefix, isDevelopment, assetQueryString, disableOptimizedLoading, crossOrigin } = context;
    return dynamicImports.map((file)=>{
        if (!file.endsWith('.js') || files.allFiles.includes(file)) return null;
        return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
            async: !isDevelopment && disableOptimizedLoading,
            defer: !disableOptimizedLoading,
            src: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(file)}${assetQueryString}`,
            nonce: props.nonce,
            crossOrigin: props.crossOrigin || crossOrigin
        }, file);
    });
}
function getScripts(context, props, files) {
    var _buildManifest_lowPriorityFiles;
    const { assetPrefix, buildManifest, isDevelopment, assetQueryString, disableOptimizedLoading, crossOrigin } = context;
    const normalScripts = files.allFiles.filter((file)=>file.endsWith('.js'));
    const lowPriorityScripts = (_buildManifest_lowPriorityFiles = buildManifest.lowPriorityFiles) == null ? void 0 : _buildManifest_lowPriorityFiles.filter((file)=>file.endsWith('.js'));
    return [
        ...normalScripts,
        ...lowPriorityScripts
    ].map((file)=>{
        return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
            src: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(file)}${assetQueryString}`,
            nonce: props.nonce,
            async: !isDevelopment && disableOptimizedLoading,
            defer: !disableOptimizedLoading,
            crossOrigin: props.crossOrigin || crossOrigin
        }, file);
    });
}
function getPreNextWorkerScripts(context, props) {
    const { assetPrefix, scriptLoader, crossOrigin, nextScriptWorkers } = context;
    // disable `nextScriptWorkers` in edge runtime
    if (!nextScriptWorkers || ("TURBOPACK compile-time value", "") === 'edge') return null;
    try {
        // @ts-expect-error: Prevent webpack from processing this require
        let { partytownSnippet } = __non_webpack_require__('@builder.io/partytown/integration');
        const children = Array.isArray(props.children) ? props.children : [
            props.children
        ];
        // Check to see if the user has defined their own Partytown configuration
        const userDefinedConfig = children.find((child)=>{
            var _child_props_dangerouslySetInnerHTML, _child_props;
            return hasComponentProps(child) && (child == null ? void 0 : (_child_props = child.props) == null ? void 0 : (_child_props_dangerouslySetInnerHTML = _child_props.dangerouslySetInnerHTML) == null ? void 0 : _child_props_dangerouslySetInnerHTML.__html.length) && 'data-partytown-config' in child.props;
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                !userDefinedConfig && /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    "data-partytown-config": "",
                    dangerouslySetInnerHTML: {
                        __html: `
            partytown = {
              lib: "${assetPrefix}/_next/static/~partytown/"
            };
          `
                    }
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    "data-partytown": "",
                    dangerouslySetInnerHTML: {
                        __html: partytownSnippet()
                    }
                }),
                (scriptLoader.worker || []).map((file, index)=>{
                    const { strategy, src, children: scriptChildren, dangerouslySetInnerHTML, ...scriptProps } = file;
                    let srcProps = {};
                    if (src) {
                        // Use external src if provided
                        srcProps.src = src;
                    } else if (dangerouslySetInnerHTML && dangerouslySetInnerHTML.__html) {
                        // Embed inline script if provided with dangerouslySetInnerHTML
                        srcProps.dangerouslySetInnerHTML = {
                            __html: dangerouslySetInnerHTML.__html
                        };
                    } else if (scriptChildren) {
                        // Embed inline script if provided with children
                        srcProps.dangerouslySetInnerHTML = {
                            __html: typeof scriptChildren === 'string' ? scriptChildren : Array.isArray(scriptChildren) ? scriptChildren.join('') : ''
                        };
                    } else {
                        throw Object.defineProperty(new Error('Invalid usage of next/script. Did you forget to include a src attribute or an inline script? https://nextjs.org/docs/messages/invalid-script'), "__NEXT_ERROR_CODE", {
                            value: "E82",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    return /*#__PURE__*/ (0, _react.createElement)("script", {
                        ...srcProps,
                        ...scriptProps,
                        type: "text/partytown",
                        key: src || index,
                        nonce: props.nonce,
                        "data-nscript": "worker",
                        crossOrigin: props.crossOrigin || crossOrigin
                    });
                })
            ]
        });
    } catch (err) {
        if ((0, _iserror.default)(err) && err.code !== 'MODULE_NOT_FOUND') {
            console.warn(`Warning: ${err.message}`);
        }
        return null;
    }
}
function getPreNextScripts(context, props) {
    const { scriptLoader, disableOptimizedLoading, crossOrigin } = context;
    const webWorkerScripts = getPreNextWorkerScripts(context, props);
    const beforeInteractiveScripts = (scriptLoader.beforeInteractive || []).filter((script)=>script.src).map((file, index)=>{
        const { strategy, ...scriptProps } = file;
        return /*#__PURE__*/ (0, _react.createElement)("script", {
            ...scriptProps,
            key: scriptProps.src || index,
            defer: scriptProps.defer ?? !disableOptimizedLoading,
            nonce: scriptProps.nonce || props.nonce,
            "data-nscript": "beforeInteractive",
            crossOrigin: props.crossOrigin || crossOrigin
        });
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            webWorkerScripts,
            beforeInteractiveScripts
        ]
    });
}
function getHeadHTMLProps(props) {
    const { crossOrigin, nonce, ...restProps } = props;
    // This assignment is necessary for additional type checking to avoid unsupported attributes in <head>
    const headProps = restProps;
    return headProps;
}
function getNextFontLinkTags(nextFontManifest, dangerousAsPath, assetPrefix = '') {
    if (!nextFontManifest) {
        return {
            preconnect: null,
            preload: null
        };
    }
    const appFontsEntry = nextFontManifest.pages['/_app'];
    const pageFontsEntry = nextFontManifest.pages[dangerousAsPath];
    const preloadedFontFiles = Array.from(new Set([
        ...appFontsEntry ?? [],
        ...pageFontsEntry ?? []
    ]));
    // If no font files should preload but there's an entry for the path, add a preconnect tag.
    const preconnectToSelf = !!(preloadedFontFiles.length === 0 && (appFontsEntry || pageFontsEntry));
    return {
        preconnect: preconnectToSelf ? /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
            "data-next-font": nextFontManifest.pagesUsingSizeAdjust ? 'size-adjust' : '',
            rel: "preconnect",
            href: "/",
            crossOrigin: "anonymous"
        }) : null,
        preload: preloadedFontFiles ? preloadedFontFiles.map((fontFile)=>{
            const ext = /\.(woff|woff2|eot|ttf|otf)$/.exec(fontFile)[1];
            return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                rel: "preload",
                href: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(fontFile)}`,
                as: "font",
                type: `font/${ext}`,
                crossOrigin: "anonymous",
                "data-next-font": fontFile.includes('-s') ? 'size-adjust' : ''
            }, fontFile);
        }) : null
    };
}
class Head extends _react.default.Component {
    static #_ = this.contextType = _htmlcontextsharedruntime.HtmlContext;
    getCssLinks(files) {
        const { assetPrefix, assetQueryString, dynamicImports, dynamicCssManifest, crossOrigin, optimizeCss } = this.context;
        const cssFiles = files.allFiles.filter((f)=>f.endsWith('.css'));
        const sharedFiles = new Set(files.sharedFiles);
        // Unmanaged files are CSS files that will be handled directly by the
        // webpack runtime (`mini-css-extract-plugin`).
        let unmanagedFiles = new Set([]);
        let localDynamicCssFiles = Array.from(new Set(dynamicImports.filter((file)=>file.endsWith('.css'))));
        if (localDynamicCssFiles.length) {
            const existing = new Set(cssFiles);
            localDynamicCssFiles = localDynamicCssFiles.filter((f)=>!(existing.has(f) || sharedFiles.has(f)));
            unmanagedFiles = new Set(localDynamicCssFiles);
            cssFiles.push(...localDynamicCssFiles);
        }
        let cssLinkElements = [];
        cssFiles.forEach((file)=>{
            const isSharedFile = sharedFiles.has(file);
            const isUnmanagedFile = unmanagedFiles.has(file);
            const isFileInDynamicCssManifest = dynamicCssManifest.has(file);
            if (!optimizeCss) {
                cssLinkElements.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    nonce: this.props.nonce,
                    rel: "preload",
                    href: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(file)}${assetQueryString}`,
                    as: "style",
                    crossOrigin: this.props.crossOrigin || crossOrigin
                }, `${file}-preload`));
            }
            cssLinkElements.push(/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                nonce: this.props.nonce,
                rel: "stylesheet",
                href: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(file)}${assetQueryString}`,
                crossOrigin: this.props.crossOrigin || crossOrigin,
                "data-n-g": isUnmanagedFile ? undefined : isSharedFile ? '' : undefined,
                "data-n-p": isSharedFile || isUnmanagedFile || isFileInDynamicCssManifest ? undefined : ''
            }, file));
        });
        return cssLinkElements.length === 0 ? null : cssLinkElements;
    }
    getPreloadDynamicChunks() {
        const { dynamicImports, assetPrefix, assetQueryString, crossOrigin } = this.context;
        return dynamicImports.map((file)=>{
            if (!file.endsWith('.js')) {
                return null;
            }
            return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                rel: "preload",
                href: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(file)}${assetQueryString}`,
                as: "script",
                nonce: this.props.nonce,
                crossOrigin: this.props.crossOrigin || crossOrigin
            }, file);
        }) // Filter out nulled scripts
        .filter(Boolean);
    }
    getPreloadMainLinks(files) {
        const { assetPrefix, assetQueryString, scriptLoader, crossOrigin } = this.context;
        const preloadFiles = files.allFiles.filter((file)=>{
            return file.endsWith('.js');
        });
        return [
            ...(scriptLoader.beforeInteractive || []).map((file)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    nonce: this.props.nonce,
                    rel: "preload",
                    href: file.src,
                    as: "script",
                    crossOrigin: this.props.crossOrigin || crossOrigin
                }, file.src)),
            ...preloadFiles.map((file)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    nonce: this.props.nonce,
                    rel: "preload",
                    href: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(file)}${assetQueryString}`,
                    as: "script",
                    crossOrigin: this.props.crossOrigin || crossOrigin
                }, file))
        ];
    }
    getBeforeInteractiveInlineScripts() {
        const { scriptLoader } = this.context;
        const { nonce, crossOrigin } = this.props;
        return (scriptLoader.beforeInteractive || []).filter((script)=>!script.src && (script.dangerouslySetInnerHTML || script.children)).map((file, index)=>{
            const { strategy, children, dangerouslySetInnerHTML, src, ...scriptProps } = file;
            let html = '';
            if (dangerouslySetInnerHTML && dangerouslySetInnerHTML.__html) {
                html = dangerouslySetInnerHTML.__html;
            } else if (children) {
                html = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
            }
            return /*#__PURE__*/ (0, _react.createElement)("script", {
                ...scriptProps,
                dangerouslySetInnerHTML: {
                    __html: html
                },
                key: scriptProps.id || index,
                nonce: nonce,
                "data-nscript": "beforeInteractive",
                crossOrigin: crossOrigin || ("TURBOPACK compile-time value", void 0)
            });
        });
    }
    getDynamicChunks(files) {
        return getDynamicChunks(this.context, this.props, files);
    }
    getPreNextScripts() {
        return getPreNextScripts(this.context, this.props);
    }
    getScripts(files) {
        return getScripts(this.context, this.props, files);
    }
    getPolyfillScripts() {
        return getPolyfillScripts(this.context, this.props);
    }
    render() {
        const { styles, __NEXT_DATA__, dangerousAsPath, headTags, unstable_runtimeJS, unstable_JsPreload, disableOptimizedLoading, optimizeCss, assetPrefix, nextFontManifest } = this.context;
        const disableRuntimeJS = unstable_runtimeJS === false;
        const disableJsPreload = unstable_JsPreload === false || !disableOptimizedLoading;
        this.context.docComponentsRendered.Head = true;
        let { head } = this.context;
        let cssPreloads = [];
        let otherHeadElements = [];
        if (head) {
            head.forEach((child)=>{
                if (child && child.type === 'link' && child.props['rel'] === 'preload' && child.props['as'] === 'style') {
                    cssPreloads.push(child);
                } else {
                    if (child) {
                        otherHeadElements.push(/*#__PURE__*/ _react.default.cloneElement(child, {
                            'data-next-head': ''
                        }));
                    }
                }
            });
            head = cssPreloads.concat(otherHeadElements);
        }
        let children = _react.default.Children.toArray(this.props.children).filter(Boolean);
        // show a warning if Head contains <title> (only in development)
        if ("TURBOPACK compile-time truthy", 1) {
            children = _react.default.Children.map(children, (child)=>{
                var _child_props;
                const isReactHelmet = child == null ? void 0 : (_child_props = child.props) == null ? void 0 : _child_props['data-react-helmet'];
                if (!isReactHelmet) {
                    var _child_props1;
                    if ((child == null ? void 0 : child.type) === 'title') {
                        console.warn("Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title");
                    } else if ((child == null ? void 0 : child.type) === 'meta' && (child == null ? void 0 : (_child_props1 = child.props) == null ? void 0 : _child_props1.name) === 'viewport') {
                        console.warn("Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta");
                    }
                }
                return child;
            // @types/react bug. Returned value from .map will not be `null` if you pass in `[null]`
            });
            if (this.props.crossOrigin) console.warn('Warning: `Head` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
        }
        const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page);
        const nextFontLinkTags = getNextFontLinkTags(nextFontManifest, dangerousAsPath, assetPrefix);
        const tracingMetadata = (0, _utils.getTracedMetadata)((0, _tracer.getTracer)().getTracePropagationData(), this.context.experimentalClientTraceMetadata);
        const traceMetaTags = (tracingMetadata || []).map(({ key, value }, index)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
                name: key,
                content: value
            }, `next-trace-data-${index}`));
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)("head", {
            ...getHeadHTMLProps(this.props),
            children: [
                this.context.isDevelopment && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("style", {
                            "data-next-hide-fouc": true,
                            dangerouslySetInnerHTML: {
                                __html: `body{display:none}`
                            }
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("noscript", {
                            "data-next-hide-fouc": true,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)("style", {
                                dangerouslySetInnerHTML: {
                                    __html: `body{display:block}`
                                }
                            })
                        })
                    ]
                }),
                head,
                children,
                nextFontLinkTags.preconnect,
                nextFontLinkTags.preload,
                this.getBeforeInteractiveInlineScripts(),
                !optimizeCss && this.getCssLinks(files),
                !optimizeCss && /*#__PURE__*/ (0, _jsxruntime.jsx)("noscript", {
                    "data-n-css": this.props.nonce ?? ''
                }),
                !disableRuntimeJS && !disableJsPreload && this.getPreloadDynamicChunks(),
                !disableRuntimeJS && !disableJsPreload && this.getPreloadMainLinks(files),
                !disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(),
                !disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(),
                !disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files),
                !disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files),
                optimizeCss && this.getCssLinks(files),
                optimizeCss && /*#__PURE__*/ (0, _jsxruntime.jsx)("noscript", {
                    "data-n-css": this.props.nonce ?? ''
                }),
                this.context.isDevelopment && // this element is used to mount development styles so the
                // ordering matches production
                // (by default, style-loader injects at the bottom of <head />)
                /*#__PURE__*/ (0, _jsxruntime.jsx)("noscript", {
                    id: "__next_css__DO_NOT_USE__"
                }),
                traceMetaTags,
                styles || null,
                /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, {}, ...headTags || [])
            ]
        });
    }
}
function handleDocumentScriptLoaderItems(scriptLoader, __NEXT_DATA__, props) {
    var _children_find_props, _children_find, _children_find_props1, _children_find1;
    if (!props.children) return;
    const scriptLoaderItems = [];
    const children = Array.isArray(props.children) ? props.children : [
        props.children
    ];
    const headChildren = (_children_find = children.find((child)=>child.type === Head)) == null ? void 0 : (_children_find_props = _children_find.props) == null ? void 0 : _children_find_props.children;
    const bodyChildren = (_children_find1 = children.find((child)=>child.type === 'body')) == null ? void 0 : (_children_find_props1 = _children_find1.props) == null ? void 0 : _children_find_props1.children;
    // Scripts with beforeInteractive can be placed inside Head or <body> so children of both needs to be traversed
    const combinedChildren = [
        ...Array.isArray(headChildren) ? headChildren : [
            headChildren
        ],
        ...Array.isArray(bodyChildren) ? bodyChildren : [
            bodyChildren
        ]
    ];
    _react.default.Children.forEach(combinedChildren, (child)=>{
        var _child_type;
        if (!child) return;
        // When using the `next/script` component, register it in script loader.
        if ((_child_type = child.type) == null ? void 0 : _child_type.__nextScript) {
            if (child.props.strategy === 'beforeInteractive') {
                scriptLoader.beforeInteractive = (scriptLoader.beforeInteractive || []).concat([
                    {
                        ...child.props
                    }
                ]);
                return;
            } else if ([
                'lazyOnload',
                'afterInteractive',
                'worker'
            ].includes(child.props.strategy)) {
                scriptLoaderItems.push(child.props);
                return;
            } else if (typeof child.props.strategy === 'undefined') {
                scriptLoaderItems.push({
                    ...child.props,
                    strategy: 'afterInteractive'
                });
                return;
            }
        }
    });
    __NEXT_DATA__.scriptLoader = scriptLoaderItems;
}
class NextScript extends _react.default.Component {
    static #_ = this.contextType = _htmlcontextsharedruntime.HtmlContext;
    getDynamicChunks(files) {
        return getDynamicChunks(this.context, this.props, files);
    }
    getPreNextScripts() {
        return getPreNextScripts(this.context, this.props);
    }
    getScripts(files) {
        return getScripts(this.context, this.props, files);
    }
    getPolyfillScripts() {
        return getPolyfillScripts(this.context, this.props);
    }
    static getInlineScriptSource(context) {
        const { __NEXT_DATA__, largePageDataBytes } = context;
        try {
            const data = JSON.stringify(__NEXT_DATA__);
            if (largePageDataWarnings.has(__NEXT_DATA__.page)) {
                return (0, _htmlescape.htmlEscapeJsonString)(data);
            }
            const bytes = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(data).byteLength;
            const prettyBytes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/pretty-bytes.js [app-client] (ecmascript)").default;
            if (largePageDataBytes && bytes > largePageDataBytes) {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                console.warn(`Warning: data for page "${__NEXT_DATA__.page}"${__NEXT_DATA__.page === context.dangerousAsPath ? '' : ` (path "${context.dangerousAsPath}")`} is ${prettyBytes(bytes)} which exceeds the threshold of ${prettyBytes(largePageDataBytes)}, this amount of data can reduce performance.\nSee more info here: https://nextjs.org/docs/messages/large-page-data`);
            }
            return (0, _htmlescape.htmlEscapeJsonString)(data);
        } catch (err) {
            if ((0, _iserror.default)(err) && err.message.indexOf('circular structure') !== -1) {
                throw Object.defineProperty(new Error(`Circular structure in "getInitialProps" result of page "${__NEXT_DATA__.page}". https://nextjs.org/docs/messages/circular-structure`), "__NEXT_ERROR_CODE", {
                    value: "E490",
                    enumerable: false,
                    configurable: true
                });
            }
            throw err;
        }
    }
    render() {
        const { assetPrefix, buildManifest, unstable_runtimeJS, docComponentsRendered, assetQueryString, disableOptimizedLoading, crossOrigin } = this.context;
        const disableRuntimeJS = unstable_runtimeJS === false;
        docComponentsRendered.NextScript = true;
        if ("TURBOPACK compile-time truthy", 1) {
            if (this.props.crossOrigin) console.warn('Warning: `NextScript` attribute `crossOrigin` is deprecated. https://nextjs.org/docs/messages/doc-crossorigin-deprecated');
        }
        const files = getDocumentFiles(this.context.buildManifest, this.context.__NEXT_DATA__.page);
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                !disableRuntimeJS && buildManifest.devFiles ? buildManifest.devFiles.map((file)=>/*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                        src: `${assetPrefix}/_next/${(0, _encodeuripath.encodeURIPath)(file)}${assetQueryString}`,
                        nonce: this.props.nonce,
                        crossOrigin: this.props.crossOrigin || crossOrigin
                    }, file)) : null,
                disableRuntimeJS ? null : /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    id: "__NEXT_DATA__",
                    type: "application/json",
                    nonce: this.props.nonce,
                    crossOrigin: this.props.crossOrigin || crossOrigin,
                    dangerouslySetInnerHTML: {
                        __html: NextScript.getInlineScriptSource(this.context)
                    }
                }),
                disableOptimizedLoading && !disableRuntimeJS && this.getPolyfillScripts(),
                disableOptimizedLoading && !disableRuntimeJS && this.getPreNextScripts(),
                disableOptimizedLoading && !disableRuntimeJS && this.getDynamicChunks(files),
                disableOptimizedLoading && !disableRuntimeJS && this.getScripts(files)
            ]
        });
    }
}
function Html(props) {
    const { docComponentsRendered, locale, scriptLoader, __NEXT_DATA__ } = (0, _htmlcontextsharedruntime.useHtmlContext)();
    docComponentsRendered.Html = true;
    handleDocumentScriptLoaderItems(scriptLoader, __NEXT_DATA__, props);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("html", {
        ...props,
        lang: props.lang || locale || undefined
    });
}
function Main() {
    const { docComponentsRendered } = (0, _htmlcontextsharedruntime.useHtmlContext)();
    docComponentsRendered.Main = true;
    // @ts-ignore
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("next-js-internal-body-render-target", {});
}
class Document extends _react.default.Component {
    /**
   * `getInitialProps` hook returns the context object with the addition of `renderPage`.
   * `renderPage` callback executes `React` rendering logic synchronously to support server-rendering wrappers
   */ static getInitialProps(ctx) {
        return ctx.defaultGetInitialProps(ctx);
    }
    render() {
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(Html, {
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Head, {
                    nonce: this.props.nonce
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsxs)("body", {
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(Main, {}),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(NextScript, {
                            nonce: this.props.nonce
                        })
                    ]
                })
            ]
        });
    }
}
// Add a special property to the built-in `Document` component so later we can
// identify if a user customized `Document` is used or not.
const InternalFunctionDocument = function InternalFunctionDocument() {
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(Html, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(Head, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("body", {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(Main, {}),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(NextScript, {})
                ]
            })
        ]
    });
};
Document[_constants.NEXT_BUILTIN_DOCUMENT] = InternalFunctionDocument; //# sourceMappingURL=_document.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/pages/_app.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return App;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
/**
 * `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
 * This allows for keeping state between navigation, custom error handling, injecting additional data.
 */ async function appGetInitialProps({ Component, ctx }) {
    const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
    return {
        pageProps
    };
}
class App extends _react.default.Component {
    static{
        this.origGetInitialProps = appGetInitialProps;
    }
    static{
        this.getInitialProps = appGetInitialProps;
    }
    render() {
        const { Component, pageProps } = this.props;
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
            ...pageProps
        });
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=_app.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/pages/_error.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, /**
 * `Error` component used for handling errors.
 */ "default", {
    enumerable: true,
    get: function() {
        return Error;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _head = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)"));
const statusCodes = {
    400: 'Bad Request',
    404: 'This page could not be found',
    405: 'Method Not Allowed',
    500: 'Internal Server Error'
};
function _getInitialProps({ req, res, err }) {
    const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
    let hostname;
    if (typeof window !== 'undefined') {
        hostname = window.location.hostname;
    } else if (req) {
        const { getRequestMeta } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/request-meta.js [app-client] (ecmascript)");
        const initUrl = getRequestMeta(req, 'initURL');
        if (initUrl) {
            const url = new URL(initUrl);
            hostname = url.hostname;
        }
    }
    return {
        statusCode,
        hostname
    };
}
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        lineHeight: '48px'
    },
    h1: {
        display: 'inline-block',
        margin: '0 20px 0 0',
        paddingRight: 23,
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: 'top'
    },
    h2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '28px'
    },
    wrap: {
        display: 'inline-block'
    }
};
class Error extends _react.default.Component {
    static{
        this.displayName = 'ErrorPage';
    }
    static{
        this.getInitialProps = _getInitialProps;
    }
    static{
        this.origGetInitialProps = _getInitialProps;
    }
    render() {
        const { statusCode, withDarkMode = true } = this.props;
        const title = this.props.title || statusCodes[statusCode] || 'An unexpected error has occurred';
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
            style: styles.error,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_head.default, {
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)("title", {
                        children: statusCode ? `${statusCode}: ${title}` : 'Application error: a client-side exception has occurred'
                    })
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                    style: styles.desc,
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("style", {
                            dangerouslySetInnerHTML: {
                                /* CSS minified from
                body { margin: 0; color: #000; background: #fff; }
                .next-error-h1 {
                  border-right: 1px solid rgba(0, 0, 0, .3);
                }

                ${
                  withDarkMode
                    ? `@media (prefers-color-scheme: dark) {
                  body { color: #fff; background: #000; }
                  .next-error-h1 {
                    border-right: 1px solid rgba(255, 255, 255, .3);
                  }
                }`
                    : ''
                }
               */ __html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}${withDarkMode ? '@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}' : ''}`
                            }
                        }),
                        statusCode ? /*#__PURE__*/ (0, _jsxruntime.jsx)("h1", {
                            className: "next-error-h1",
                            style: styles.h1,
                            children: statusCode
                        }) : null,
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                            style: styles.wrap,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("h2", {
                                style: styles.h2,
                                children: [
                                    this.props.title || statusCode ? title : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                        children: [
                                            "Application error: a client-side exception has occurred",
                                            ' ',
                                            Boolean(this.props.hostname) && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                                children: [
                                                    "while loading ",
                                                    this.props.hostname
                                                ]
                                            }),
                                            ' ',
                                            "(see the browser console for more information)"
                                        ]
                                    }),
                                    "."
                                ]
                            })
                        })
                    ]
                })
            ]
        });
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=_error.js.map
}),
]);

//# sourceMappingURL=661c0_next_dist_c4845e5b._.js.map