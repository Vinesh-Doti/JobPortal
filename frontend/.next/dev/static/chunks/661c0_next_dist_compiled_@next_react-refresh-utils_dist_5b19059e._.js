(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/ReactRefreshWebpackPlugin.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Shared between webpack 4 and 5:
function injectRefreshFunctions(compilation, Template) {
    const hookVars = compilation.mainTemplate.hooks.localVars;
    hookVars.tap('ReactFreshWebpackPlugin', (source)=>Template.asString([
            source,
            '',
            '// noop fns to prevent runtime errors during initialization',
            'if (typeof self !== "undefined") {',
            Template.indent('self.$RefreshReg$ = function () {};'),
            Template.indent('self.$RefreshSig$ = function () {'),
            Template.indent(Template.indent('return function (type) {')),
            Template.indent(Template.indent(Template.indent('return type;'))),
            Template.indent(Template.indent('};')),
            Template.indent('};'),
            '}'
        ]));
}
function webpack4(compiler) {
    const { Template } = this;
    // Webpack 4 does not have a method to handle interception of module
    // execution.
    // The closest thing we have to emulating this is mimicking the behavior of
    // `strictModuleExceptionHandling` in `MainTemplate`:
    // https://github.com/webpack/webpack/blob/4c644bf1f7cb067c748a52614500e0e2182b2700/lib/MainTemplate.js#L200
    compiler.hooks.compilation.tap('ReactFreshWebpackPlugin', (compilation)=>{
        injectRefreshFunctions(compilation, Template);
        const hookRequire = compilation.mainTemplate.hooks.require;
        // @ts-ignore webpack 5 types compat
        hookRequire.tap('ReactFreshWebpackPlugin', (source)=>{
            // Webpack 4 evaluates module code on the following line:
            // ```
            // modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
            // ```
            // https://github.com/webpack/webpack/blob/4c644bf1f7cb067c748a52614500e0e2182b2700/lib/MainTemplate.js#L200
            const lines = source.split('\n');
            // @ts-ignore webpack 5 types compat
            const evalIndex = lines.findIndex((l)=>l.includes('modules[moduleId].call('));
            // Unable to find the module execution, that's OK:
            if (evalIndex === -1) {
                return source;
            }
            // Legacy CSS implementations will `eval` browser code in a Node.js
            // context to extract CSS. For backwards compatibility, we need to check
            // we're in a browser context before continuing.
            return Template.asString([
                ...lines.slice(0, evalIndex),
                `
        var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
        var cleanup = hasRefresh
          ? self.$RefreshInterceptModuleExecution$(moduleId)
          : function() {};
        try {
        `,
                lines[evalIndex],
                `
        } finally {
          cleanup();
        }
        `,
                ...lines.slice(evalIndex + 1)
            ]);
        });
    });
}
function webpack5(compiler) {
    const { RuntimeGlobals, RuntimeModule, Template } = this;
    class ReactRefreshRuntimeModule extends RuntimeModule {
        constructor(){
            super('react refresh', 5);
        }
        generate() {
            const { runtimeTemplate } = this.compilation;
            return Template.asString([
                `if (${RuntimeGlobals.interceptModuleExecution}) {`,
                `${RuntimeGlobals.interceptModuleExecution}.push(${runtimeTemplate.basicFunction('options', [
                    `${runtimeTemplate.supportsConst() ? 'const' : 'var'} originalFactory = options.factory;`,
                    `options.factory = ${runtimeTemplate.basicFunction('moduleObject, moduleExports, webpackRequire', [
                        // Legacy CSS implementations will `eval` browser code in a Node.js
                        // context to extract CSS. For backwards compatibility, we need to check
                        // we're in a browser context before continuing.
                        `${runtimeTemplate.supportsConst() ? 'const' : 'var'} hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;`,
                        `${runtimeTemplate.supportsConst() ? 'const' : 'var'} cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : ${runtimeTemplate.supportsArrowFunction() ? '() => {}' : 'function() {}'};`,
                        'try {',
                        Template.indent('originalFactory.call(this, moduleObject, moduleExports, webpackRequire);'),
                        '} finally {',
                        Template.indent(`cleanup();`),
                        '}'
                    ])}`
                ])})`,
                '}'
            ]);
        }
    }
    // @ts-ignore webpack 5 types compat
    compiler.hooks.compilation.tap('ReactFreshWebpackPlugin', (compilation)=>{
        injectRefreshFunctions(compilation, Template);
        compilation.hooks.additionalTreeRuntimeRequirements.tap('ReactFreshWebpackPlugin', (chunk)=>{
            compilation.addRuntimeModule(chunk, new ReactRefreshRuntimeModule());
        });
    });
}
class ReactFreshWebpackPlugin {
    constructor({ version, RuntimeGlobals, RuntimeModule, Template } = (()=>{
        const e = new Error("Cannot find module 'webpack'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })()){
        this.webpackMajorVersion = parseInt(version !== null && version !== void 0 ? version : '', 10);
        this.RuntimeGlobals = RuntimeGlobals;
        this.RuntimeModule = RuntimeModule;
        this.Template = Template;
    }
    apply(compiler) {
        switch(this.webpackMajorVersion){
            case 4:
                {
                    webpack4.call(this, compiler);
                    break;
                }
            case 5:
                {
                    webpack5.call(this, compiler);
                    break;
                }
            default:
                {
                    throw new Error(`ReactFreshWebpackPlugin does not support webpack v${this.webpackMajorVersion}.`);
                }
        }
    }
}
exports.default = ReactFreshWebpackPlugin; //# sourceMappingURL=ReactRefreshWebpackPlugin.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/internal/ReactRefreshModule.runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = default_1;
// This function gets unwrapped into global scope, which is why we don't invert
// if-blocks. Also, you cannot use `return`.
function default_1() {
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function() {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' && // No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = __webpack_module__.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = __webpack_module__.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, __webpack_module__.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                __webpack_module__.hot.dispose(function(data) {
                    data.prevSignature = self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                /*TURBOPACK member replacement*/ __turbopack_context__.g.importMeta.webpackHot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        __webpack_module__.hot.invalidate();
                    } else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            } else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    __webpack_module__.hot.invalidate();
                }
            }
        }
    })();
} //# sourceMappingURL=ReactRefreshModule.runtime.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/loader.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const ReactRefreshModule_runtime_1 = __importDefault(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/internal/ReactRefreshModule.runtime.js [app-client] (ecmascript)"));
let refreshModuleRuntime = ReactRefreshModule_runtime_1.default.toString();
refreshModuleRuntime = refreshModuleRuntime.slice(refreshModuleRuntime.indexOf('{') + 1, refreshModuleRuntime.lastIndexOf('}'))// Given that the import above executes the module we need to make sure it does not crash on `import.meta` not being allowed.
.replace('global.importMeta', 'import.meta');
let commonJsrefreshModuleRuntime = refreshModuleRuntime.replace('import.meta.webpackHot', 'module.hot');
const ReactRefreshLoader = function ReactRefreshLoader(source, inputSourceMap) {
    this.callback(null, `${source}\n\n;${// Account for commonjs not supporting `import.meta
    this.resourcePath.endsWith('.cjs') ? commonJsrefreshModuleRuntime : refreshModuleRuntime}`, inputSourceMap);
};
exports.default = ReactRefreshLoader; //# sourceMappingURL=loader.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/rspack-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const runtime_1 = __importDefault(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react-refresh/runtime.js [app-client] (ecmascript)"));
if (typeof self !== 'undefined') {
    var $RefreshInjected$ = '__reactRefreshInjected';
    // Only inject the runtime if it hasn't been injected
    if (!self[$RefreshInjected$]) {
        runtime_1.default.injectIntoGlobalHook(self);
        // Empty implementation to avoid "ReferenceError: variable is not defined" in module which didn't pass builtin:react-refresh-loader
        self.$RefreshSig$ = ()=>(type)=>type;
        self.$RefreshReg$ = ()=>{};
        // Mark the runtime as injected to prevent double-injection
        self[$RefreshInjected$] = true;
    }
} //# sourceMappingURL=rspack-runtime.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/internal/RspackReactRefresh.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createSignatureFunctionForTransform = exports.register = void 0;
exports.refresh = refresh;
const helpers_1 = __importDefault(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/internal/helpers.js [app-client] (ecmascript)"));
// Extracts exports from a webpack module object.
function getModuleExports(moduleId) {
    if (typeof moduleId === 'undefined') {
        // `moduleId` is unavailable, which indicates that this module is not in the cache,
        // which means we won't be able to capture any exports,
        // and thus they cannot be refreshed safely.
        // These are likely runtime or dynamically generated modules.
        return {};
    }
    var maybeModule = __webpack_require__.c[moduleId];
    if (typeof maybeModule === 'undefined') {
        // `moduleId` is available but the module in cache is unavailable,
        // which indicates the module is somehow corrupted (e.g. broken Webpack `module` globals).
        // We will warn the user (as this is likely a mistake) and assume they cannot be refreshed.
        console.warn('[React Refresh] Failed to get exports for module: ' + moduleId + '.');
        return {};
    }
    var exportsOrPromise = maybeModule.exports;
    if (typeof Promise !== 'undefined' && exportsOrPromise instanceof Promise) {
        return exportsOrPromise.then(function(exports1) {
            return exports1;
        });
    }
    return exportsOrPromise;
}
function executeRuntime(moduleExports, moduleId, webpackHot) {
    var _a, _b;
    helpers_1.default.registerExportsForReactRefresh(moduleExports, moduleId);
    if (webpackHot) {
        var isHotUpdate = !!webpackHot.data;
        var prevSignature = (_b = (_a = webpackHot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
        if (helpers_1.default.isReactRefreshBoundary(moduleExports)) {
            webpackHot.dispose(// Save the previous exports signature on update so we can compare the boundary
            // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
            function hotDisposeCallback(data) {
                data.prevSignature = helpers_1.default.getRefreshBoundarySignature(moduleExports);
            });
            webpackHot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevSignature !== null) {
                if (isHotUpdate) {
                    if (helpers_1.default.shouldInvalidateReactRefreshBoundary(prevSignature, helpers_1.default.getRefreshBoundarySignature(moduleExports))) {
                        webpackHot.invalidate();
                    } else {
                        helpers_1.default.scheduleUpdate();
                    }
                }
            }
        } else {
            if (isHotUpdate && prevSignature !== null) {
                webpackHot.invalidate();
            }
        }
    }
}
// Port from https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/loader/utils/getRefreshModuleRuntime.js#L29
function refresh(moduleId, webpackHot) {
    const currentExports = getModuleExports(moduleId);
    const fn = (exports1)=>{
        executeRuntime(exports1, moduleId, webpackHot);
    };
    if (typeof Promise !== 'undefined' && currentExports instanceof Promise) {
        currentExports.then(fn);
    } else {
        fn(currentExports);
    }
}
var runtime_1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react-refresh/runtime.js [app-client] (ecmascript)");
Object.defineProperty(exports, "register", {
    enumerable: true,
    get: function() {
        return runtime_1.register;
    }
});
Object.defineProperty(exports, "createSignatureFunctionForTransform", {
    enumerable: true,
    get: function() {
        return runtime_1.createSignatureFunctionForTransform;
    }
}); //# sourceMappingURL=RspackReactRefresh.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/ReactRefreshRspackPlugin.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const PLUGIN_NAME = 'ReactRefreshRspackPlugin';
class ReactRefreshRspackPlugin {
    apply(compiler) {
        new compiler.webpack.ProvidePlugin({
            $ReactRefreshRuntime$: "[project]/JobPortal/frontend/node_modules/next/dist/compiled/@next/react-refresh-utils/dist/internal/RspackReactRefresh.js [app-client] (ecmascript)"
        }).apply(compiler);
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation)=>{
            compilation.hooks.additionalTreeRuntimeRequirements.tap(PLUGIN_NAME, (_, runtimeRequirements)=>{
                runtimeRequirements.add(compiler.webpack.RuntimeGlobals.moduleCache);
            });
        });
    }
}
ReactRefreshRspackPlugin.loader = 'builtin:react-refresh-loader';
exports.default = ReactRefreshRspackPlugin; //# sourceMappingURL=ReactRefreshRspackPlugin.js.map
}),
]);

//# sourceMappingURL=661c0_next_dist_compiled_%40next_react-refresh-utils_dist_5b19059e._.js.map