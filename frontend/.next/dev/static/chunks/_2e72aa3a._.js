(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/JobPortal/frontend/node_modules/styled-jsx/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"name":"styled-jsx","version":"5.1.6","license":"MIT","repository":"vercel/styled-jsx","description":"Full CSS support for JSX without compromises","files":["dist","lib","global.d.ts","index.d.ts","index.js","babel.js","babel-test.js","style.js","style.d.ts","macro.js","macro.d.ts","css.js","css.d.ts","webpack.js","license.md"],"typings":"./index.d.ts","scripts":{"build-babel":"bunchee src/babel.js -f cjs -e babel-plugin-macros --runtime node -o dist/babel/index.js","build":"rm -rf dist && rm -rf out && yarn build-webpack && yarn build-index && yarn build-babel","build-webpack":"bunchee src/webpack.js -f cjs --runtime node -o dist/webpack/index.js","build-index":"bunchee src/index.js -f cjs --runtime node -o dist/index/index.js","test":"ava","test-types":"tsc --project tsconfig.json --noEmit","lint":"eslint ./src","format":"prettier --write \"./{src,test}/**/*.{js,css}\"","prepublishOnly":"yarn build && yarn test && yarn lint --quiet"},"husky":{"hooks":{"pre-commit":"pretty-quick --staged"}},"ava":{"require":["@babel/register"]},"eslintConfig":{"env":{"node":true,"browser":true,"es6":true},"extends":["eslint:recommended","prettier"],"parserOptions":{"ecmaVersion":11,"sourceType":"module"},"rules":{"no-empty":0,"capitalized-comments":0,"valid-jsdoc":0,"prefer-destructuring":0,"padding-line-between-statements":0}},"devDependencies":{"@babel/cli":"7.18.10","@babel/core":"7.12.3","@babel/plugin-proposal-object-rest-spread":"7.12.1","@babel/plugin-syntax-jsx":"7.14.5","@babel/plugin-transform-arrow-functions":"7.12.1","@babel/plugin-transform-modules-commonjs":"7.12.1","@babel/plugin-transform-runtime":"7.12.1","@babel/preset-env":"7.12.1","@babel/preset-react":"7.12.5","@babel/register":"7.12.1","@babel/runtime":"7.12.5","@babel/types":"7.15.0","@types/react":"18.3.3","ava":"4.3.1","babel-plugin-macros":"2.8.0","bunchee":"2.1.5","convert-source-map":"1.7.0","eslint":"7.32.0","eslint-config-prettier":"4.0.0","husky":"4.3.0","loader-utils":"1.4.2","prettier":"1.16.4","pretty-quick":"3.1.0","react":"17.0.1","react-dom":"17.0.1","semantic-release":"17.2.2","source-map":"0.7.3","string-hash":"1.1.3","stylis":"3.5.4","stylis-rule-sheet":"0.0.10","typescript":"~5.0.0"},"peerDependencies":{"react":">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"},"peerDependenciesMeta":{"@babel/core":{"optional":true},"babel-plugin-macros":{"optional":true}},"release":{"branches":["main","alpha","beta"]},"engines":{"node":">= 12.0.0"},"keywords":["babel-plugin-macros","vercel","zeit","css-in-js","css"],"dependencies":{"client-only":"0.0.1"}});}),
"[project]/JobPortal/frontend/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/client-only/index.js [app-client] (ecmascript)");
var React = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
        'default': e
    };
}
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isProd = typeof __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && ("TURBOPACK compile-time value", "development") === "production";
var isString = function(o) {
    return Object.prototype.toString.call(o) === "[object String]";
};
var StyleSheet = /*#__PURE__*/ function() {
    function StyleSheet(param) {
        var ref = param === void 0 ? {} : param, _name = ref.name, name = _name === void 0 ? "stylesheet" : _name, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
        invariant$1(isString(name), "`name` must be a string");
        this._name = name;
        this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
        invariant$1(typeof optimizeForSpeed === "boolean", "`optimizeForSpeed` must be a boolean");
        this._optimizeForSpeed = optimizeForSpeed;
        this._serverSheet = undefined;
        this._tags = [];
        this._injected = false;
        this._rulesCount = 0;
        var node = typeof window !== "undefined" && document.querySelector('meta[property="csp-nonce"]');
        this._nonce = node ? node.getAttribute("content") : null;
    }
    var _proto = StyleSheet.prototype;
    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
        invariant$1(typeof bool === "boolean", "`setOptimizeForSpeed` accepts a boolean");
        invariant$1(this._rulesCount === 0, "optimizeForSpeed cannot be when rules have already been inserted");
        this.flush();
        this._optimizeForSpeed = bool;
        this.inject();
    };
    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
        return this._optimizeForSpeed;
    };
    _proto.inject = function inject() {
        var _this = this;
        invariant$1(!this._injected, "sheet already injected");
        this._injected = true;
        if (typeof window !== "undefined" && this._optimizeForSpeed) {
            this._tags[0] = this.makeStyleTag(this._name);
            this._optimizeForSpeed = "insertRule" in this.getSheet();
            if (!this._optimizeForSpeed) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.");
                }
                this.flush();
                this._injected = true;
            }
            return;
        }
        this._serverSheet = {
            cssRules: [],
            insertRule: function(rule, index) {
                if (typeof index === "number") {
                    _this._serverSheet.cssRules[index] = {
                        cssText: rule
                    };
                } else {
                    _this._serverSheet.cssRules.push({
                        cssText: rule
                    });
                }
                return index;
            },
            deleteRule: function(index) {
                _this._serverSheet.cssRules[index] = null;
            }
        };
    };
    _proto.getSheetForTag = function getSheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        // this weirdness brought to you by firefox
        for(var i = 0; i < document.styleSheets.length; i++){
            if (document.styleSheets[i].ownerNode === tag) {
                return document.styleSheets[i];
            }
        }
    };
    _proto.getSheet = function getSheet() {
        return this.getSheetForTag(this._tags[this._tags.length - 1]);
    };
    _proto.insertRule = function insertRule(rule, index) {
        invariant$1(isString(rule), "`insertRule` accepts only strings");
        if (typeof window === "undefined") {
            if (typeof index !== "number") {
                index = this._serverSheet.cssRules.length;
            }
            this._serverSheet.insertRule(rule, index);
            return this._rulesCount++;
        }
        if (this._optimizeForSpeed) {
            var sheet = this.getSheet();
            if (typeof index !== "number") {
                index = sheet.cssRules.length;
            }
            // this weirdness for perf, and chrome's weird bug
            // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                return -1;
            }
        } else {
            var insertionPoint = this._tags[index];
            this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
        }
        return this._rulesCount++;
    };
    _proto.replaceRule = function replaceRule(index, rule) {
        if (this._optimizeForSpeed || typeof window === "undefined") {
            var sheet = typeof window !== "undefined" ? this.getSheet() : this._serverSheet;
            if (!rule.trim()) {
                rule = this._deletedRulePlaceholder;
            }
            if (!sheet.cssRules[index]) {
                // @TBD Should we throw an error?
                return index;
            }
            sheet.deleteRule(index);
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                // In order to preserve the indices we insert a deleteRulePlaceholder
                sheet.insertRule(this._deletedRulePlaceholder, index);
            }
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "old rule at index `" + index + "` not found");
            tag.textContent = rule;
        }
        return index;
    };
    _proto.deleteRule = function deleteRule(index) {
        if (typeof window === "undefined") {
            this._serverSheet.deleteRule(index);
            return;
        }
        if (this._optimizeForSpeed) {
            this.replaceRule(index, "");
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "rule at index `" + index + "` not found");
            tag.parentNode.removeChild(tag);
            this._tags[index] = null;
        }
    };
    _proto.flush = function flush() {
        this._injected = false;
        this._rulesCount = 0;
        if (typeof window !== "undefined") {
            this._tags.forEach(function(tag) {
                return tag && tag.parentNode.removeChild(tag);
            });
            this._tags = [];
        } else {
            // simpler on server
            this._serverSheet.cssRules = [];
        }
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        if (typeof window === "undefined") {
            return this._serverSheet.cssRules;
        }
        return this._tags.reduce(function(rules, tag) {
            if (tag) {
                rules = rules.concat(Array.prototype.map.call(_this.getSheetForTag(tag).cssRules, function(rule) {
                    return rule.cssText === _this._deletedRulePlaceholder ? null : rule;
                }));
            } else {
                rules.push(null);
            }
            return rules;
        }, []);
    };
    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
        if (cssString) {
            invariant$1(isString(cssString), "makeStyleTag accepts only strings as second parameter");
        }
        var tag = document.createElement("style");
        if (this._nonce) tag.setAttribute("nonce", this._nonce);
        tag.type = "text/css";
        tag.setAttribute("data-" + name, "");
        if (cssString) {
            tag.appendChild(document.createTextNode(cssString));
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        if (relativeToTag) {
            head.insertBefore(tag, relativeToTag);
        } else {
            head.appendChild(tag);
        }
        return tag;
    };
    _createClass(StyleSheet, [
        {
            key: "length",
            get: function get() {
                return this._rulesCount;
            }
        }
    ]);
    return StyleSheet;
}();
function invariant$1(condition, message) {
    if (!condition) {
        throw new Error("StyleSheet: " + message + ".");
    }
}
function hash(str) {
    var _$hash = 5381, i = str.length;
    while(i){
        _$hash = _$hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */ return _$hash >>> 0;
}
var stringHash = hash;
var sanitize = function(rule) {
    return rule.replace(/\/style/gi, "\\/style");
};
var cache = {};
/**
 * computeId
 *
 * Compute and memoize a jsx id from a basedId and optionally props.
 */ function computeId(baseId, props) {
    if (!props) {
        return "jsx-" + baseId;
    }
    var propsToString = String(props);
    var key = baseId + propsToString;
    if (!cache[key]) {
        cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
    }
    return cache[key];
}
/**
 * computeSelector
 *
 * Compute and memoize dynamic selectors.
 */ function computeSelector(id, css) {
    var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    // Sanitize SSR-ed CSS.
    // Client side code doesn't need to be sanitized since we use
    // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
    if (typeof window === "undefined") {
        css = sanitize(css);
    }
    var idcss = id + css;
    if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
    }
    return cache[idcss];
}
function mapRulesToStyle(cssRules, options) {
    if (options === void 0) options = {};
    return cssRules.map(function(args) {
        var id = args[0];
        var css = args[1];
        return /*#__PURE__*/ React__default["default"].createElement("style", {
            id: "__" + id,
            // Avoid warnings upon render with a key
            key: "__" + id,
            nonce: options.nonce ? options.nonce : undefined,
            dangerouslySetInnerHTML: {
                __html: css
            }
        });
    });
}
var StyleSheetRegistry = /*#__PURE__*/ function() {
    function StyleSheetRegistry(param) {
        var ref = param === void 0 ? {} : param, _styleSheet = ref.styleSheet, styleSheet = _styleSheet === void 0 ? null : _styleSheet, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
        this._sheet = styleSheet || new StyleSheet({
            name: "styled-jsx",
            optimizeForSpeed: optimizeForSpeed
        });
        this._sheet.inject();
        if (styleSheet && typeof optimizeForSpeed === "boolean") {
            this._sheet.setOptimizeForSpeed(optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    }
    var _proto = StyleSheetRegistry.prototype;
    _proto.add = function add(props) {
        var _this = this;
        if (undefined === this._optimizeForSpeed) {
            this._optimizeForSpeed = Array.isArray(props.children);
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        if (typeof window !== "undefined" && !this._fromServer) {
            this._fromServer = this.selectFromServer();
            this._instancesCounts = Object.keys(this._fromServer).reduce(function(acc, tagName) {
                acc[tagName] = 0;
                return acc;
            }, {});
        }
        var ref = this.getIdAndRules(props), styleId = ref.styleId, rules = ref.rules;
        // Deduping: just increase the instances count.
        if (styleId in this._instancesCounts) {
            this._instancesCounts[styleId] += 1;
            return;
        }
        var indices = rules.map(function(rule) {
            return _this._sheet.insertRule(rule);
        }) // Filter out invalid rules
        .filter(function(index) {
            return index !== -1;
        });
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
    };
    _proto.remove = function remove(props) {
        var _this = this;
        var styleId = this.getIdAndRules(props).styleId;
        invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
        this._instancesCounts[styleId] -= 1;
        if (this._instancesCounts[styleId] < 1) {
            var tagFromServer = this._fromServer && this._fromServer[styleId];
            if (tagFromServer) {
                tagFromServer.parentNode.removeChild(tagFromServer);
                delete this._fromServer[styleId];
            } else {
                this._indices[styleId].forEach(function(index) {
                    return _this._sheet.deleteRule(index);
                });
                delete this._indices[styleId];
            }
            delete this._instancesCounts[styleId];
        }
    };
    _proto.update = function update(props, nextProps) {
        this.add(nextProps);
        this.remove(props);
    };
    _proto.flush = function flush() {
        this._sheet.flush();
        this._sheet.inject();
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function(styleId) {
            return [
                styleId,
                _this._fromServer[styleId]
            ];
        }) : [];
        var cssRules = this._sheet.cssRules();
        return fromServer.concat(Object.keys(this._indices).map(function(styleId) {
            return [
                styleId,
                _this._indices[styleId].map(function(index) {
                    return cssRules[index].cssText;
                }).join(_this._optimizeForSpeed ? "" : "\n")
            ];
        }) // filter out empty rules
        .filter(function(rule) {
            return Boolean(rule[1]);
        }));
    };
    _proto.styles = function styles(options) {
        return mapRulesToStyle(this.cssRules(), options);
    };
    _proto.getIdAndRules = function getIdAndRules(props) {
        var css = props.children, dynamic = props.dynamic, id = props.id;
        if (dynamic) {
            var styleId = computeId(id, dynamic);
            return {
                styleId: styleId,
                rules: Array.isArray(css) ? css.map(function(rule) {
                    return computeSelector(styleId, rule);
                }) : [
                    computeSelector(styleId, css)
                ]
            };
        }
        return {
            styleId: computeId(id),
            rules: Array.isArray(css) ? css : [
                css
            ]
        };
    };
    /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */ _proto.selectFromServer = function selectFromServer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
        return elements.reduce(function(acc, element) {
            var id = element.id.slice(2);
            acc[id] = element;
            return acc;
        }, {});
    };
    return StyleSheetRegistry;
}();
function invariant(condition, message) {
    if (!condition) {
        throw new Error("StyleSheetRegistry: " + message + ".");
    }
}
var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
StyleSheetContext.displayName = "StyleSheetContext";
function createStyleRegistry() {
    return new StyleSheetRegistry();
}
function StyleRegistry(param) {
    var configuredRegistry = param.registry, children = param.children;
    var rootRegistry = React.useContext(StyleSheetContext);
    var ref = React.useState({
        "StyleRegistry.useState[ref]": function() {
            return rootRegistry || configuredRegistry || createStyleRegistry();
        }
    }["StyleRegistry.useState[ref]"]), registry = ref[0];
    return /*#__PURE__*/ React__default["default"].createElement(StyleSheetContext.Provider, {
        value: registry
    }, children);
}
function useStyleRegistry() {
    return React.useContext(StyleSheetContext);
}
// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
// https://github.com/reactwg/react-18/discussions/110
var useInsertionEffect = React__default["default"].useInsertionEffect || React__default["default"].useLayoutEffect;
var defaultRegistry = typeof window !== "undefined" ? createStyleRegistry() : undefined;
function JSXStyle(props) {
    var registry = defaultRegistry ? defaultRegistry : useStyleRegistry();
    // If `registry` does not exist, we do nothing here.
    if (!registry) {
        return null;
    }
    if (typeof window === "undefined") {
        registry.add(props);
        return null;
    }
    useInsertionEffect({
        "JSXStyle.useInsertionEffect": function() {
            registry.add(props);
            return ({
                "JSXStyle.useInsertionEffect": function() {
                    registry.remove(props);
                }
            })["JSXStyle.useInsertionEffect"];
        // props.children can be string[], will be striped since id is identical
        }
    }["JSXStyle.useInsertionEffect"], [
        props.id,
        String(props.dynamic)
    ]);
    return null;
}
JSXStyle.dynamic = function(info) {
    return info.map(function(tagInfo) {
        var baseId = tagInfo[0];
        var props = tagInfo[1];
        return computeId(baseId, props);
    }).join(" ");
};
exports.StyleRegistry = StyleRegistry;
exports.createStyleRegistry = createStyleRegistry;
exports.style = JSXStyle;
exports.useStyleRegistry = useStyleRegistry;
}),
"[project]/JobPortal/frontend/node_modules/styled-jsx/style.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)").style;
}),
"[project]/JobPortal/frontend/node_modules/styled-jsx/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)");
}),
"[project]/node_modules/safe-buffer/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src){
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
} else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
    } else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};
}),
"[project]/node_modules/string_decoder/lib/string_decoder.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/ var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-client] (ecmascript)").Buffer;
/*</replacement>*/ var isEncoding = Buffer.isEncoding || function(encoding) {
    encoding = '' + encoding;
    switch(encoding && encoding.toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
            return true;
        default:
            return false;
    }
};
function _normalizeEncoding(enc) {
    if (!enc) return 'utf8';
    var retried;
    while(true){
        switch(enc){
            case 'utf8':
            case 'utf-8':
                return 'utf8';
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return 'utf16le';
            case 'latin1':
            case 'binary':
                return 'latin1';
            case 'base64':
            case 'ascii':
            case 'hex':
                return enc;
            default:
                if (retried) return; // undefined
                enc = ('' + enc).toLowerCase();
                retried = true;
        }
    }
}
;
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
    return nenc || enc;
}
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case 'utf16le':
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
        case 'utf8':
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
        case 'base64':
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
        default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer.allocUnsafe(nb);
}
StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return '';
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
    } else {
        i = 0;
    }
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || '';
};
StringDecoder.prototype.end = utf8End;
// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
    if (byte <= 0x7F) return 0;
    else if (byte >> 5 === 0x06) return 2;
    else if (byte >> 4 === 0x0E) return 3;
    else if (byte >> 3 === 0x1E) return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd';
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return '\ufffd';
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString('utf8', i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString('utf8', i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + '\ufffd';
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString('utf16le', i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
    }
    return r;
}
function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString('base64', i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
    } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString('base64', i, buf.length - n);
}
function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : '';
}
}),
"[project]/JobPortal/frontend/node_modules/@next/env/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
(()=>{
    var e = {
        383: (e)=>{
            "use strict";
            function _searchLast(e, t) {
                const n = Array.from(e.matchAll(t));
                return n.length > 0 ? n.slice(-1)[0].index : -1;
            }
            function _interpolate(e, t, n) {
                const r = _searchLast(e, /(?!(?<=\\))\$/g);
                if (r === -1) return e;
                const o = e.slice(r);
                const s = /((?!(?<=\\))\${?([\w]+)(?::-([^}\\]*))?}?)/;
                const i = o.match(s);
                if (i != null) {
                    const [, r, o, s] = i;
                    return _interpolate(e.replace(r, t[o] || s || n.parsed[o] || ""), t, n);
                }
                return e;
            }
            function _resolveEscapeSequences(e) {
                return e.replace(/\\\$/g, "$");
            }
            function expand(e) {
                const t = e.ignoreProcessEnv ? {} : __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env;
                for(const n in e.parsed){
                    const r = Object.prototype.hasOwnProperty.call(t, n) ? t[n] : e.parsed[n];
                    e.parsed[n] = _resolveEscapeSequences(_interpolate(r, t, e));
                }
                for(const n in e.parsed){
                    t[n] = e.parsed[n];
                }
                return e;
            }
            e.exports.j = expand;
        },
        234: (e, t, n)=>{
            const r = n(147);
            const o = n(17);
            const s = n(37);
            const i = n(113);
            const c = n(803);
            const a = c.version;
            const p = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;
            function parse(e) {
                const t = {};
                let n = e.toString();
                n = n.replace(/\r\n?/gm, "\n");
                let r;
                while((r = p.exec(n)) != null){
                    const e = r[1];
                    let n = r[2] || "";
                    n = n.trim();
                    const o = n[0];
                    n = n.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");
                    if (o === '"') {
                        n = n.replace(/\\n/g, "\n");
                        n = n.replace(/\\r/g, "\r");
                    }
                    t[e] = n;
                }
                return t;
            }
            function _parseVault(e) {
                const t = _vaultPath(e);
                const n = l.configDotenv({
                    path: t
                });
                if (!n.parsed) {
                    throw new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);
                }
                const r = _dotenvKey(e).split(",");
                const o = r.length;
                let s;
                for(let e = 0; e < o; e++){
                    try {
                        const t = r[e].trim();
                        const o = _instructions(n, t);
                        s = l.decrypt(o.ciphertext, o.key);
                        break;
                    } catch (t) {
                        if (e + 1 >= o) {
                            throw t;
                        }
                    }
                }
                return l.parse(s);
            }
            function _log(e) {
                console.log(`[dotenv@${a}][INFO] ${e}`);
            }
            function _warn(e) {
                console.log(`[dotenv@${a}][WARN] ${e}`);
            }
            function _debug(e) {
                console.log(`[dotenv@${a}][DEBUG] ${e}`);
            }
            function _dotenvKey(e) {
                if (e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0) {
                    return e.DOTENV_KEY;
                }
                if (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DOTENV_KEY && __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DOTENV_KEY.length > 0) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DOTENV_KEY;
                }
                return "";
            }
            function _instructions(e, t) {
                let n;
                try {
                    n = new URL(t);
                } catch (e) {
                    if (e.code === "ERR_INVALID_URL") {
                        throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");
                    }
                    throw e;
                }
                const r = n.password;
                if (!r) {
                    throw new Error("INVALID_DOTENV_KEY: Missing key part");
                }
                const o = n.searchParams.get("environment");
                if (!o) {
                    throw new Error("INVALID_DOTENV_KEY: Missing environment part");
                }
                const s = `DOTENV_VAULT_${o.toUpperCase()}`;
                const i = e.parsed[s];
                if (!i) {
                    throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);
                }
                return {
                    ciphertext: i,
                    key: r
                };
            }
            function _vaultPath(e) {
                let t = o.resolve(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), ".env");
                if (e && e.path && e.path.length > 0) {
                    t = e.path;
                }
                return t.endsWith(".vault") ? t : `${t}.vault`;
            }
            function _resolveHome(e) {
                return e[0] === "~" ? o.join(s.homedir(), e.slice(1)) : e;
            }
            function _configVault(e) {
                _log("Loading env from encrypted .env.vault");
                const t = l._parseVault(e);
                let n = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env;
                if (e && e.processEnv != null) {
                    n = e.processEnv;
                }
                l.populate(n, t, e);
                return {
                    parsed: t
                };
            }
            function configDotenv(e) {
                let t = o.resolve(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), ".env");
                let n = "utf8";
                const s = Boolean(e && e.debug);
                if (e) {
                    if (e.path != null) {
                        t = _resolveHome(e.path);
                    }
                    if (e.encoding != null) {
                        n = e.encoding;
                    }
                }
                try {
                    const o = l.parse(r.readFileSync(t, {
                        encoding: n
                    }));
                    let s = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env;
                    if (e && e.processEnv != null) {
                        s = e.processEnv;
                    }
                    l.populate(s, o, e);
                    return {
                        parsed: o
                    };
                } catch (e) {
                    if (s) {
                        _debug(`Failed to load ${t} ${e.message}`);
                    }
                    return {
                        error: e
                    };
                }
            }
            function config(e) {
                const t = _vaultPath(e);
                if (_dotenvKey(e).length === 0) {
                    return l.configDotenv(e);
                }
                if (!r.existsSync(t)) {
                    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`);
                    return l.configDotenv(e);
                }
                return l._configVault(e);
            }
            function decrypt(e, t) {
                const n = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t.slice(-64), "hex");
                let r = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(e, "base64");
                const o = r.slice(0, 12);
                const s = r.slice(-16);
                r = r.slice(12, -16);
                try {
                    const e = i.createDecipheriv("aes-256-gcm", n, o);
                    e.setAuthTag(s);
                    return `${e.update(r)}${e.final()}`;
                } catch (e) {
                    const t = e instanceof RangeError;
                    const n = e.message === "Invalid key length";
                    const r = e.message === "Unsupported state or unable to authenticate data";
                    if (t || n) {
                        const e = "INVALID_DOTENV_KEY: It must be 64 characters long (or more)";
                        throw new Error(e);
                    } else if (r) {
                        const e = "DECRYPTION_FAILED: Please check your DOTENV_KEY";
                        throw new Error(e);
                    } else {
                        console.error("Error: ", e.code);
                        console.error("Error: ", e.message);
                        throw e;
                    }
                }
            }
            function populate(e, t, n = {}) {
                const r = Boolean(n && n.debug);
                const o = Boolean(n && n.override);
                if (typeof t !== "object") {
                    throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
                }
                for (const n of Object.keys(t)){
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        if (o === true) {
                            e[n] = t[n];
                        }
                        if (r) {
                            if (o === true) {
                                _debug(`"${n}" is already defined and WAS overwritten`);
                            } else {
                                _debug(`"${n}" is already defined and was NOT overwritten`);
                            }
                        }
                    } else {
                        e[n] = t[n];
                    }
                }
            }
            const l = {
                configDotenv: configDotenv,
                _configVault: _configVault,
                _parseVault: _parseVault,
                config: config,
                decrypt: decrypt,
                parse: parse,
                populate: populate
            };
            e.exports.configDotenv = l.configDotenv;
            e.exports._configVault = l._configVault;
            e.exports._parseVault = l._parseVault;
            e.exports.config = l.config;
            e.exports.decrypt = l.decrypt;
            e.exports.parse = l.parse;
            e.exports.populate = l.populate;
            e.exports = l;
        },
        113: (e)=>{
            "use strict";
            e.exports = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
        },
        147: (e)=>{
            "use strict";
            e.exports = (()=>{
                const e = new Error("Cannot find module 'fs'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })();
        },
        37: (e)=>{
            "use strict";
            e.exports = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/os-browserify/browser.js [app-client] (ecmascript)");
        },
        17: (e)=>{
            "use strict";
            e.exports = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
        },
        803: (e)=>{
            "use strict";
            e.exports = JSON.parse('{"name":"dotenv","version":"16.3.1","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://github.com/motdotla/dotenv?sponsor=1","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}');
        }
    };
    var t = {};
    function __nccwpck_require__(n) {
        var r = t[n];
        if (r !== undefined) {
            return r.exports;
        }
        var o = t[n] = {
            exports: {}
        };
        var s = true;
        try {
            e[n](o, o.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete t[n];
        }
        return o.exports;
    }
    (()=>{
        __nccwpck_require__.n = (e)=>{
            var t = e && e.__esModule ? ()=>e["default"] : ()=>e;
            __nccwpck_require__.d(t, {
                a: t
            });
            return t;
        };
    })();
    (()=>{
        __nccwpck_require__.d = (e, t)=>{
            for(var n in t){
                if (__nccwpck_require__.o(t, n) && !__nccwpck_require__.o(e, n)) {
                    Object.defineProperty(e, n, {
                        enumerable: true,
                        get: t[n]
                    });
                }
            }
        };
    })();
    (()=>{
        __nccwpck_require__.o = (e, t)=>Object.prototype.hasOwnProperty.call(e, t);
    })();
    (()=>{
        __nccwpck_require__.r = (e)=>{
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(e, "__esModule", {
                value: true
            });
        };
    })();
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/@next/env/dist") + "/";
    var n = {};
    (()=>{
        "use strict";
        __nccwpck_require__.r(n);
        __nccwpck_require__.d(n, {
            initialEnv: ()=>a,
            updateInitialEnv: ()=>updateInitialEnv,
            processEnv: ()=>processEnv,
            resetEnv: ()=>resetEnv,
            loadEnvConfig: ()=>loadEnvConfig
        });
        var e = __nccwpck_require__(147);
        var t = __nccwpck_require__.n(e);
        var r = __nccwpck_require__(17);
        var o = __nccwpck_require__.n(r);
        var s = __nccwpck_require__(234);
        var i = __nccwpck_require__.n(s);
        var c = __nccwpck_require__(383);
        let a = undefined;
        let p = undefined;
        let l = undefined;
        let u = [];
        let _ = [];
        function updateInitialEnv(e) {
            Object.assign(a || {}, e);
        }
        function replaceProcessEnv(e) {
            Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env).forEach((t)=>{
                if (!t.startsWith("__NEXT_PRIVATE")) {
                    if (e[t] === undefined || e[t] === "") {
                        delete __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env[t];
                    }
                }
            });
            Object.entries(e).forEach(([e, t])=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env[e] = t;
            });
        }
        function processEnv(e, t, n = console, o = false, i) {
            var p;
            if (!a) {
                a = Object.assign({}, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env);
            }
            if (!o && (__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_PROCESSED_ENV || e.length === 0)) {
                return [
                    __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env
                ];
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.__NEXT_PROCESSED_ENV = "true";
            const l = Object.assign({}, a);
            const u = {};
            for (const o of e){
                try {
                    let e = {};
                    e.parsed = s.parse(o.contents);
                    e = (0, c.j)(e);
                    if (e.parsed && !_.some((e)=>e.contents === o.contents && e.path === o.path)) {
                        i === null || i === void 0 ? void 0 : i(o.path);
                    }
                    for (const t of Object.keys(e.parsed || {})){
                        if (typeof u[t] === "undefined" && typeof l[t] === "undefined") {
                            u[t] = (p = e.parsed) === null || p === void 0 ? void 0 : p[t];
                        }
                    }
                    o.env = e.parsed || {};
                } catch (e) {
                    n.error(`Failed to load env from ${r.join(t || "", o.path)}`, e);
                }
            }
            return [
                Object.assign(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env, u),
                u
            ];
        }
        function resetEnv() {
            if (a) {
                replaceProcessEnv(a);
            }
        }
        function loadEnvConfig(t, n, o = console, s = false, i) {
            if (!a) {
                a = Object.assign({}, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env);
            }
            if (p && !s) {
                return {
                    combinedEnv: p,
                    parsedEnv: l,
                    loadedEnvFiles: u
                };
            }
            replaceProcessEnv(a);
            _ = u;
            u = [];
            const c = ("TURBOPACK compile-time value", "development") === "test";
            const d = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : n ? "development" : "production";
            const f = [
                `.env.${d}.local`,
                d !== "test" && `.env.local`,
                `.env.${d}`,
                ".env"
            ].filter(Boolean);
            for (const n of f){
                const s = r.join(t, n);
                try {
                    const t = e.statSync(s);
                    if (!t.isFile() && !t.isFIFO()) {
                        continue;
                    }
                    const r = e.readFileSync(s, "utf8");
                    u.push({
                        path: n,
                        contents: r,
                        env: {}
                    });
                } catch (e) {
                    if (e.code !== "ENOENT") {
                        o.error(`Failed to load env from ${n}`, e);
                    }
                }
            }
            [p, l] = processEnv(u, t, o, s, i);
            return {
                combinedEnv: p,
                parsedEnv: l,
                loadedEnvFiles: u
            };
        }
    })();
    module.exports = n;
})();
}),
"[project]/JobPortal/frontend/node_modules/detect-libc/lib/process.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2017 Lovell Fuller and others.
// SPDX-License-Identifier: Apache-2.0
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
const isLinux = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform === 'linux';
let report = null;
const getReport = ()=>{
    if (!report) {
        /* istanbul ignore next */ if (isLinux() && __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].report) //TURBOPACK unreachable
        ;
        else {
            report = {};
        }
    }
    return report;
};
module.exports = {
    isLinux,
    getReport
};
}),
"[project]/JobPortal/frontend/node_modules/detect-libc/lib/filesystem.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2017 Lovell Fuller and others.
// SPDX-License-Identifier: Apache-2.0
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
'use strict';
const fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const LDD_PATH = '/usr/bin/ldd';
const SELF_PATH = '/proc/self/exe';
const MAX_LENGTH = 2048;
/**
 * Read the content of a file synchronous
 *
 * @param {string} path
 * @returns {Buffer}
 */ const readFileSync = (path)=>{
    const fd = fs.openSync(path, 'r');
    const buffer = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].alloc(MAX_LENGTH);
    const bytesRead = fs.readSync(fd, buffer, 0, MAX_LENGTH, 0);
    fs.close(fd, ()=>{});
    return buffer.subarray(0, bytesRead);
};
/**
 * Read the content of a file
 *
 * @param {string} path
 * @returns {Promise<Buffer>}
 */ const readFile = (path)=>new Promise((resolve, reject)=>{
        fs.open(path, 'r', (err, fd)=>{
            if (err) {
                reject(err);
            } else {
                const buffer = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].alloc(MAX_LENGTH);
                fs.read(fd, buffer, 0, MAX_LENGTH, 0, (_, bytesRead)=>{
                    resolve(buffer.subarray(0, bytesRead));
                    fs.close(fd, ()=>{});
                });
            }
        });
    });
module.exports = {
    LDD_PATH,
    SELF_PATH,
    readFileSync,
    readFile
};
}),
"[project]/JobPortal/frontend/node_modules/detect-libc/lib/elf.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2017 Lovell Fuller and others.
// SPDX-License-Identifier: Apache-2.0
const interpreterPath = (elf)=>{
    if (elf.length < 64) {
        return null;
    }
    if (elf.readUInt32BE(0) !== 0x7F454C46) {
        // Unexpected magic bytes
        return null;
    }
    if (elf.readUInt8(4) !== 2) {
        // Not a 64-bit ELF
        return null;
    }
    if (elf.readUInt8(5) !== 1) {
        // Not little-endian
        return null;
    }
    const offset = elf.readUInt32LE(32);
    const size = elf.readUInt16LE(54);
    const count = elf.readUInt16LE(56);
    for(let i = 0; i < count; i++){
        const headerOffset = offset + i * size;
        const type = elf.readUInt32LE(headerOffset);
        if (type === 3) {
            const fileOffset = elf.readUInt32LE(headerOffset + 8);
            const fileSize = elf.readUInt32LE(headerOffset + 32);
            return elf.subarray(fileOffset, fileOffset + fileSize).toString().replace(/\0.*$/g, '');
        }
    }
    return null;
};
module.exports = {
    interpreterPath
};
}),
"[project]/JobPortal/frontend/node_modules/detect-libc/lib/detect-libc.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2017 Lovell Fuller and others.
// SPDX-License-Identifier: Apache-2.0
const childProcess = (()=>{
    const e = new Error("Cannot find module 'child_process'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const { isLinux, getReport } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/detect-libc/lib/process.js [app-client] (ecmascript)");
const { LDD_PATH, SELF_PATH, readFile, readFileSync } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/detect-libc/lib/filesystem.js [app-client] (ecmascript)");
const { interpreterPath } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/detect-libc/lib/elf.js [app-client] (ecmascript)");
let cachedFamilyInterpreter;
let cachedFamilyFilesystem;
let cachedVersionFilesystem;
const command = 'getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true';
let commandOut = '';
const safeCommand = ()=>{
    if (!commandOut) {
        return new Promise((resolve)=>{
            childProcess.exec(command, (err, out)=>{
                commandOut = err ? ' ' : out;
                resolve(commandOut);
            });
        });
    }
    return commandOut;
};
const safeCommandSync = ()=>{
    if (!commandOut) {
        try {
            commandOut = childProcess.execSync(command, {
                encoding: 'utf8'
            });
        } catch (_err) {
            commandOut = ' ';
        }
    }
    return commandOut;
};
/**
 * A String constant containing the value `glibc`.
 * @type {string}
 * @public
 */ const GLIBC = 'glibc';
/**
 * A Regexp constant to get the GLIBC Version.
 * @type {string}
 */ const RE_GLIBC_VERSION = /LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i;
/**
 * A String constant containing the value `musl`.
 * @type {string}
 * @public
 */ const MUSL = 'musl';
const isFileMusl = (f)=>f.includes('libc.musl-') || f.includes('ld-musl-');
const familyFromReport = ()=>{
    const report = getReport();
    if (report.header && report.header.glibcVersionRuntime) {
        return GLIBC;
    }
    if (Array.isArray(report.sharedObjects)) {
        if (report.sharedObjects.some(isFileMusl)) {
            return MUSL;
        }
    }
    return null;
};
const familyFromCommand = (out)=>{
    const [getconf, ldd1] = out.split(/[\r\n]+/);
    if (getconf && getconf.includes(GLIBC)) {
        return GLIBC;
    }
    if (ldd1 && ldd1.includes(MUSL)) {
        return MUSL;
    }
    return null;
};
const familyFromInterpreterPath = (path)=>{
    if (path) {
        if (path.includes('/ld-musl-')) {
            return MUSL;
        } else if (path.includes('/ld-linux-')) {
            return GLIBC;
        }
    }
    return null;
};
const getFamilyFromLddContent = (content)=>{
    content = content.toString();
    if (content.includes('musl')) {
        return MUSL;
    }
    if (content.includes('GNU C Library')) {
        return GLIBC;
    }
    return null;
};
const familyFromFilesystem = async ()=>{
    if (cachedFamilyFilesystem !== undefined) {
        return cachedFamilyFilesystem;
    }
    cachedFamilyFilesystem = null;
    try {
        const lddContent = await readFile(LDD_PATH);
        cachedFamilyFilesystem = getFamilyFromLddContent(lddContent);
    } catch (e) {}
    return cachedFamilyFilesystem;
};
const familyFromFilesystemSync = ()=>{
    if (cachedFamilyFilesystem !== undefined) {
        return cachedFamilyFilesystem;
    }
    cachedFamilyFilesystem = null;
    try {
        const lddContent = readFileSync(LDD_PATH);
        cachedFamilyFilesystem = getFamilyFromLddContent(lddContent);
    } catch (e) {}
    return cachedFamilyFilesystem;
};
const familyFromInterpreter = async ()=>{
    if (cachedFamilyInterpreter !== undefined) {
        return cachedFamilyInterpreter;
    }
    cachedFamilyInterpreter = null;
    try {
        const selfContent = await readFile(SELF_PATH);
        const path = interpreterPath(selfContent);
        cachedFamilyInterpreter = familyFromInterpreterPath(path);
    } catch (e) {}
    return cachedFamilyInterpreter;
};
const familyFromInterpreterSync = ()=>{
    if (cachedFamilyInterpreter !== undefined) {
        return cachedFamilyInterpreter;
    }
    cachedFamilyInterpreter = null;
    try {
        const selfContent = readFileSync(SELF_PATH);
        const path = interpreterPath(selfContent);
        cachedFamilyInterpreter = familyFromInterpreterPath(path);
    } catch (e) {}
    return cachedFamilyInterpreter;
};
/**
 * Resolves with the libc family when it can be determined, `null` otherwise.
 * @returns {Promise<?string>}
 */ const family = async ()=>{
    let family = null;
    if (isLinux()) {
        family = await familyFromInterpreter();
        if (!family) {
            family = await familyFromFilesystem();
            if (!family) {
                family = familyFromReport();
            }
            if (!family) {
                const out = await safeCommand();
                family = familyFromCommand(out);
            }
        }
    }
    return family;
};
/**
 * Returns the libc family when it can be determined, `null` otherwise.
 * @returns {?string}
 */ const familySync = ()=>{
    let family = null;
    if (isLinux()) {
        family = familyFromInterpreterSync();
        if (!family) {
            family = familyFromFilesystemSync();
            if (!family) {
                family = familyFromReport();
            }
            if (!family) {
                const out = safeCommandSync();
                family = familyFromCommand(out);
            }
        }
    }
    return family;
};
/**
 * Resolves `true` only when the platform is Linux and the libc family is not `glibc`.
 * @returns {Promise<boolean>}
 */ const isNonGlibcLinux = async ()=>isLinux() && await family() !== GLIBC;
/**
 * Returns `true` only when the platform is Linux and the libc family is not `glibc`.
 * @returns {boolean}
 */ const isNonGlibcLinuxSync = ()=>isLinux() && familySync() !== GLIBC;
const versionFromFilesystem = async ()=>{
    if (cachedVersionFilesystem !== undefined) {
        return cachedVersionFilesystem;
    }
    cachedVersionFilesystem = null;
    try {
        const lddContent = await readFile(LDD_PATH);
        const versionMatch = lddContent.match(RE_GLIBC_VERSION);
        if (versionMatch) {
            cachedVersionFilesystem = versionMatch[1];
        }
    } catch (e) {}
    return cachedVersionFilesystem;
};
const versionFromFilesystemSync = ()=>{
    if (cachedVersionFilesystem !== undefined) {
        return cachedVersionFilesystem;
    }
    cachedVersionFilesystem = null;
    try {
        const lddContent = readFileSync(LDD_PATH);
        const versionMatch = lddContent.match(RE_GLIBC_VERSION);
        if (versionMatch) {
            cachedVersionFilesystem = versionMatch[1];
        }
    } catch (e) {}
    return cachedVersionFilesystem;
};
const versionFromReport = ()=>{
    const report = getReport();
    if (report.header && report.header.glibcVersionRuntime) {
        return report.header.glibcVersionRuntime;
    }
    return null;
};
const versionSuffix = (s)=>s.trim().split(/\s+/)[1];
const versionFromCommand = (out)=>{
    const [getconf, ldd1, ldd2] = out.split(/[\r\n]+/);
    if (getconf && getconf.includes(GLIBC)) {
        return versionSuffix(getconf);
    }
    if (ldd1 && ldd2 && ldd1.includes(MUSL)) {
        return versionSuffix(ldd2);
    }
    return null;
};
/**
 * Resolves with the libc version when it can be determined, `null` otherwise.
 * @returns {Promise<?string>}
 */ const version = async ()=>{
    let version = null;
    if (isLinux()) {
        version = await versionFromFilesystem();
        if (!version) {
            version = versionFromReport();
        }
        if (!version) {
            const out = await safeCommand();
            version = versionFromCommand(out);
        }
    }
    return version;
};
/**
 * Returns the libc version when it can be determined, `null` otherwise.
 * @returns {?string}
 */ const versionSync = ()=>{
    let version = null;
    if (isLinux()) {
        version = versionFromFilesystemSync();
        if (!version) {
            version = versionFromReport();
        }
        if (!version) {
            const out = safeCommandSync();
            version = versionFromCommand(out);
        }
    }
    return version;
};
module.exports = {
    GLIBC,
    MUSL,
    family,
    familySync,
    isNonGlibcLinux,
    isNonGlibcLinuxSync,
    version,
    versionSync
};
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/debug.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
const debug = typeof __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] === 'object' && __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NODE_DEBUG && /\bsemver\b/i.test(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NODE_DEBUG) ? (...args)=>console.error('SEMVER', ...args) : ()=>{};
module.exports = debug;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/constants.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0';
const MAX_LENGTH = 256;
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16;
// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
const RELEASE_TYPES = [
    'major',
    'premajor',
    'minor',
    'preminor',
    'patch',
    'prepatch',
    'prerelease'
];
module.exports = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 0b001,
    FLAG_LOOSE: 0b010
};
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/re.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_LENGTH } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/constants.js [app-client] (ecmascript)");
const debug = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/debug.js [app-client] (ecmascript)");
exports = module.exports = {};
// The actual regexps go on exports.re
const re = exports.re = [];
const safeRe = exports.safeRe = [];
const src = exports.src = [];
const safeSrc = exports.safeSrc = [];
const t = exports.t = {};
let R = 0;
const LETTERDASHNUMBER = '[a-zA-Z0-9-]';
// Replace some greedy regex tokens to prevent regex dos issues. These regex are
// used internally via the safeRe object since all inputs in this library get
// normalized first to trim and collapse all extra whitespace. The original
// regexes are exported for userland consumption and lower level usage. A
// future breaking change could export the safer regex only with a note that
// all input should have extra whitespace removed.
const safeRegexReplacements = [
    [
        '\\s',
        1
    ],
    [
        '\\d',
        MAX_LENGTH
    ],
    [
        LETTERDASHNUMBER,
        MAX_SAFE_BUILD_LENGTH
    ]
];
const makeSafeRegex = (value)=>{
    for (const [token, max] of safeRegexReplacements){
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
};
const createToken = (name, value, isGlobal)=>{
    const safe = makeSafeRegex(value);
    const index = R++;
    debug(name, index, value);
    t[name] = index;
    src[index] = value;
    safeSrc[index] = safe;
    re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
    safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
};
// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.
createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
createToken('NUMERICIDENTIFIERLOOSE', '\\d+');
// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.
createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
// ## Main Version
// Three dot-separated numeric identifiers.
createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);
// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
// Non-numberic identifiers include numberic identifiers but can be longer.
// Therefore non-numberic identifiers must go first.
createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.
createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.
createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);
// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.
createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.
createToken('FULLPLAIN', `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
createToken('FULL', `^${src[t.FULLPLAIN]}$`);
// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);
createToken('GTLT', '((?:<|>)?=?)');
// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCEPLAIN', `${'(^|[^\\d])' + '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
createToken('COERCEFULL', src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?` + `(?:${src[t.BUILD]})?` + `(?:$|[^\\d])`);
createToken('COERCERTL', src[t.COERCE], true);
createToken('COERCERTLFULL', src[t.COERCEFULL], true);
// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)');
createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = '$1~';
createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)');
createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = '$1^';
createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = '$1$2$3';
// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);
// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*');
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/parse-options.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// parse out just the options we care about
const looseOption = Object.freeze({
    loose: true
});
const emptyOpts = Object.freeze({});
const parseOptions = (options)=>{
    if (!options) {
        return emptyOpts;
    }
    if (typeof options !== 'object') {
        return looseOption;
    }
    return options;
};
module.exports = parseOptions;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/identifiers.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const numeric = /^[0-9]+$/;
const compareIdentifiers = (a, b)=>{
    if (typeof a === 'number' && typeof b === 'number') {
        return a === b ? 0 : a < b ? -1 : 1;
    }
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b)=>compareIdentifiers(b, a);
module.exports = {
    compareIdentifiers,
    rcompareIdentifiers
};
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/semver.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const debug = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/debug.js [app-client] (ecmascript)");
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/constants.js [app-client] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/re.js [app-client] (ecmascript)");
const parseOptions = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/parse-options.js [app-client] (ecmascript)");
const { compareIdentifiers } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/identifiers.js [app-client] (ecmascript)");
class SemVer {
    constructor(version, options){
        options = parseOptions(options);
        if (version instanceof SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
                return version;
            } else {
                version = version.version;
            }
        } else if (typeof version !== 'string') {
            throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
            throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
        }
        debug('SemVer', version, options);
        this.options = options;
        this.loose = !!options.loose;
        // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
            throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        // these are actually numbers
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError('Invalid major version');
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
            throw new TypeError('Invalid minor version');
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
            throw new TypeError('Invalid patch version');
        }
        // numberify any prerelease numeric ids
        if (!m[4]) {
            this.prerelease = [];
        } else {
            this.prerelease = m[4].split('.').map((id)=>{
                if (/^[0-9]+$/.test(id)) {
                    const num = +id;
                    if (num >= 0 && num < MAX_SAFE_INTEGER) {
                        return num;
                    }
                }
                return id;
            });
        }
        this.build = m[5] ? m[5].split('.') : [];
        this.format();
    }
    format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
            this.version += `-${this.prerelease.join('.')}`;
        }
        return this.version;
    }
    toString() {
        return this.version;
    }
    compare(other) {
        debug('SemVer.compare', this.version, this.options, other);
        if (!(other instanceof SemVer)) {
            if (typeof other === 'string' && other === this.version) {
                return 0;
            }
            other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
            return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        if (this.major < other.major) {
            return -1;
        }
        if (this.major > other.major) {
            return 1;
        }
        if (this.minor < other.minor) {
            return -1;
        }
        if (this.minor > other.minor) {
            return 1;
        }
        if (this.patch < other.patch) {
            return -1;
        }
        if (this.patch > other.patch) {
            return 1;
        }
        return 0;
    }
    comparePre(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        // NOT having a prerelease is > having one
        if (this.prerelease.length && !other.prerelease.length) {
            return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
            return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
            return 0;
        }
        let i = 0;
        do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            debug('prerelease compare', i, a, b);
            if (a === undefined && b === undefined) {
                return 0;
            } else if (b === undefined) {
                return 1;
            } else if (a === undefined) {
                return -1;
            } else if (a === b) {
                continue;
            } else {
                return compareIdentifiers(a, b);
            }
        }while (++i)
    }
    compareBuild(other) {
        if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
            const a = this.build[i];
            const b = other.build[i];
            debug('build compare', i, a, b);
            if (a === undefined && b === undefined) {
                return 0;
            } else if (b === undefined) {
                return 1;
            } else if (a === undefined) {
                return -1;
            } else if (a === b) {
                continue;
            } else {
                return compareIdentifiers(a, b);
            }
        }while (++i)
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
        if (release.startsWith('pre')) {
            if (!identifier && identifierBase === false) {
                throw new Error('invalid increment argument: identifier is empty');
            }
            // Avoid an invalid semver results
            if (identifier) {
                const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
                if (!match || match[1] !== identifier) {
                    throw new Error(`invalid identifier: ${identifier}`);
                }
            }
        }
        switch(release){
            case 'premajor':
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor = 0;
                this.major++;
                this.inc('pre', identifier, identifierBase);
                break;
            case 'preminor':
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor++;
                this.inc('pre', identifier, identifierBase);
                break;
            case 'prepatch':
                // If this is already a prerelease, it will bump to the next version
                // drop any prereleases that might already exist, since they are not
                // relevant at this point.
                this.prerelease.length = 0;
                this.inc('patch', identifier, identifierBase);
                this.inc('pre', identifier, identifierBase);
                break;
            // If the input is a non-prerelease version, this acts the same as
            // prepatch.
            case 'prerelease':
                if (this.prerelease.length === 0) {
                    this.inc('patch', identifier, identifierBase);
                }
                this.inc('pre', identifier, identifierBase);
                break;
            case 'release':
                if (this.prerelease.length === 0) {
                    throw new Error(`version ${this.raw} is not a prerelease`);
                }
                this.prerelease.length = 0;
                break;
            case 'major':
                // If this is a pre-major version, bump up to the same major version.
                // Otherwise increment major.
                // 1.0.0-5 bumps to 1.0.0
                // 1.1.0 bumps to 2.0.0
                if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                    this.major++;
                }
                this.minor = 0;
                this.patch = 0;
                this.prerelease = [];
                break;
            case 'minor':
                // If this is a pre-minor version, bump up to the same minor version.
                // Otherwise increment minor.
                // 1.2.0-5 bumps to 1.2.0
                // 1.2.1 bumps to 1.3.0
                if (this.patch !== 0 || this.prerelease.length === 0) {
                    this.minor++;
                }
                this.patch = 0;
                this.prerelease = [];
                break;
            case 'patch':
                // If this is not a pre-release version, it will increment the patch.
                // If it is a pre-release it will bump up to the same patch version.
                // 1.2.0-5 patches to 1.2.0
                // 1.2.0 patches to 1.2.1
                if (this.prerelease.length === 0) {
                    this.patch++;
                }
                this.prerelease = [];
                break;
            // This probably shouldn't be used publicly.
            // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
            case 'pre':
                {
                    const base = Number(identifierBase) ? 1 : 0;
                    if (this.prerelease.length === 0) {
                        this.prerelease = [
                            base
                        ];
                    } else {
                        let i = this.prerelease.length;
                        while(--i >= 0){
                            if (typeof this.prerelease[i] === 'number') {
                                this.prerelease[i]++;
                                i = -2;
                            }
                        }
                        if (i === -1) {
                            // didn't increment anything
                            if (identifier === this.prerelease.join('.') && identifierBase === false) {
                                throw new Error('invalid increment argument: identifier already exists');
                            }
                            this.prerelease.push(base);
                        }
                    }
                    if (identifier) {
                        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                        let prerelease = [
                            identifier,
                            base
                        ];
                        if (identifierBase === false) {
                            prerelease = [
                                identifier
                            ];
                        }
                        if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                            if (isNaN(this.prerelease[1])) {
                                this.prerelease = prerelease;
                            }
                        } else {
                            this.prerelease = prerelease;
                        }
                    }
                    break;
                }
            default:
                throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
            this.raw += `+${this.build.join('.')}`;
        }
        return this;
    }
}
module.exports = SemVer;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/parse.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/semver.js [app-client] (ecmascript)");
const parse = (version, options, throwErrors = false)=>{
    if (version instanceof SemVer) {
        return version;
    }
    try {
        return new SemVer(version, options);
    } catch (er) {
        if (!throwErrors) {
            return null;
        }
        throw er;
    }
};
module.exports = parse;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/coerce.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/semver.js [app-client] (ecmascript)");
const parse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/parse.js [app-client] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/re.js [app-client] (ecmascript)");
const coerce = (version, options)=>{
    if (version instanceof SemVer) {
        return version;
    }
    if (typeof version === 'number') {
        version = String(version);
    }
    if (typeof version !== 'string') {
        return null;
    }
    options = options || {};
    let match = null;
    if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
    } else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)){
            if (!match || next.index + next[0].length !== match.index + match[0].length) {
                match = next;
            }
            coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        coerceRtlRegex.lastIndex = -1;
    }
    if (match === null) {
        return null;
    }
    const major = match[2];
    const minor = match[3] || '0';
    const patch = match[4] || '0';
    const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : '';
    const build = options.includePrerelease && match[6] ? `+${match[6]}` : '';
    return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
};
module.exports = coerce;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/compare.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SemVer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/semver.js [app-client] (ecmascript)");
const compare = (a, b, loose)=>new SemVer(a, loose).compare(new SemVer(b, loose));
module.exports = compare;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/gte.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/compare.js [app-client] (ecmascript)");
const gte = (a, b, loose)=>compare(a, b, loose) >= 0;
module.exports = gte;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/lrucache.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class LRUCache {
    constructor(){
        this.max = 1000;
        this.map = new Map();
    }
    get(key) {
        const value = this.map.get(key);
        if (value === undefined) {
            return undefined;
        } else {
            // Remove the key from the map and add it to the end
            this.map.delete(key);
            this.map.set(key, value);
            return value;
        }
    }
    delete(key) {
        return this.map.delete(key);
    }
    set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== undefined) {
            // If cache is full, delete the least recently used item
            if (this.map.size >= this.max) {
                const firstKey = this.map.keys().next().value;
                this.delete(firstKey);
            }
            this.map.set(key, value);
        }
        return this;
    }
}
module.exports = LRUCache;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/eq.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/compare.js [app-client] (ecmascript)");
const eq = (a, b, loose)=>compare(a, b, loose) === 0;
module.exports = eq;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/neq.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/compare.js [app-client] (ecmascript)");
const neq = (a, b, loose)=>compare(a, b, loose) !== 0;
module.exports = neq;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/gt.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/compare.js [app-client] (ecmascript)");
const gt = (a, b, loose)=>compare(a, b, loose) > 0;
module.exports = gt;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/lt.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/compare.js [app-client] (ecmascript)");
const lt = (a, b, loose)=>compare(a, b, loose) < 0;
module.exports = lt;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/lte.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const compare = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/compare.js [app-client] (ecmascript)");
const lte = (a, b, loose)=>compare(a, b, loose) <= 0;
module.exports = lte;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/cmp.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const eq = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/eq.js [app-client] (ecmascript)");
const neq = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/neq.js [app-client] (ecmascript)");
const gt = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/gt.js [app-client] (ecmascript)");
const gte = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/gte.js [app-client] (ecmascript)");
const lt = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/lt.js [app-client] (ecmascript)");
const lte = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/lte.js [app-client] (ecmascript)");
const cmp = (a, op, b, loose)=>{
    switch(op){
        case '===':
            if (typeof a === 'object') {
                a = a.version;
            }
            if (typeof b === 'object') {
                b = b.version;
            }
            return a === b;
        case '!==':
            if (typeof a === 'object') {
                a = a.version;
            }
            if (typeof b === 'object') {
                b = b.version;
            }
            return a !== b;
        case '':
        case '=':
        case '==':
            return eq(a, b, loose);
        case '!=':
            return neq(a, b, loose);
        case '>':
            return gt(a, b, loose);
        case '>=':
            return gte(a, b, loose);
        case '<':
            return lt(a, b, loose);
        case '<=':
            return lte(a, b, loose);
        default:
            throw new TypeError(`Invalid operator: ${op}`);
    }
};
module.exports = cmp;
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/comparator.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const ANY = Symbol('SemVer ANY');
// hoisted class for cyclic dependency
class Comparator {
    static get ANY() {
        return ANY;
    }
    constructor(comp, options){
        options = parseOptions(options);
        if (comp instanceof Comparator) {
            if (comp.loose === !!options.loose) {
                return comp;
            } else {
                comp = comp.value;
            }
        }
        comp = comp.trim().split(/\s+/).join(' ');
        debug('comparator', comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
            this.value = '';
        } else {
            this.value = this.operator + this.semver.version;
        }
        debug('comp', this);
    }
    parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
            throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== undefined ? m[1] : '';
        if (this.operator === '=') {
            this.operator = '';
        }
        // if it literally is just '>' or '' then allow anything.
        if (!m[2]) {
            this.semver = ANY;
        } else {
            this.semver = new SemVer(m[2], this.options.loose);
        }
    }
    toString() {
        return this.value;
    }
    test(version) {
        debug('Comparator.test', version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
            return true;
        }
        if (typeof version === 'string') {
            try {
                version = new SemVer(version, this.options);
            } catch (er) {
                return false;
            }
        }
        return cmp(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
        if (!(comp instanceof Comparator)) {
            throw new TypeError('a Comparator is required');
        }
        if (this.operator === '') {
            if (this.value === '') {
                return true;
            }
            return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === '') {
            if (comp.value === '') {
                return true;
            }
            return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        // Special cases where nothing can possibly be lower
        if (options.includePrerelease && (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
            return false;
        }
        if (!options.includePrerelease && (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
            return false;
        }
        // Same direction increasing (> or >=)
        if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
            return true;
        }
        // Same direction decreasing (< or <=)
        if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
            return true;
        }
        // same SemVer and both sides are inclusive (<= or >=)
        if (this.semver.version === comp.semver.version && this.operator.includes('=') && comp.operator.includes('=')) {
            return true;
        }
        // opposite directions less than
        if (cmp(this.semver, '<', comp.semver, options) && this.operator.startsWith('>') && comp.operator.startsWith('<')) {
            return true;
        }
        // opposite directions greater than
        if (cmp(this.semver, '>', comp.semver, options) && this.operator.startsWith('<') && comp.operator.startsWith('>')) {
            return true;
        }
        return false;
    }
}
module.exports = Comparator;
const parseOptions = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/parse-options.js [app-client] (ecmascript)");
const { safeRe: re, t } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/re.js [app-client] (ecmascript)");
const cmp = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/cmp.js [app-client] (ecmascript)");
const debug = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/debug.js [app-client] (ecmascript)");
const SemVer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/semver.js [app-client] (ecmascript)");
const Range = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/range.js [app-client] (ecmascript)");
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/range.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SPACE_CHARACTERS = /\s+/g;
// hoisted class for cyclic dependency
class Range {
    constructor(range, options){
        options = parseOptions(options);
        if (range instanceof Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
                return range;
            } else {
                return new Range(range.raw, options);
            }
        }
        if (range instanceof Comparator) {
            // just put it in the set and return
            this.raw = range.value;
            this.set = [
                [
                    range
                ]
            ];
            this.formatted = undefined;
            return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        // First reduce all whitespace as much as possible so we do not have to rely
        // on potentially slow regexes like \s*. This is then stored and used for
        // future error messages as well.
        this.raw = range.trim().replace(SPACE_CHARACTERS, ' ');
        // First, split on ||
        this.set = this.raw.split('||')// map the range to a 2d array of comparators
        .map((r)=>this.parseRange(r.trim()))// throw out any comparator lists that are empty
        // this generally means that it was not a valid range, which is allowed
        // in loose mode, but will still throw if the WHOLE range is invalid.
        .filter((c)=>c.length);
        if (!this.set.length) {
            throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        // if we have any that are not the null set, throw out null sets.
        if (this.set.length > 1) {
            // keep the first one, in case they're all null sets
            const first = this.set[0];
            this.set = this.set.filter((c)=>!isNullSet(c[0]));
            if (this.set.length === 0) {
                this.set = [
                    first
                ];
            } else if (this.set.length > 1) {
                // if we have any that are *, then the range is just *
                for (const c of this.set){
                    if (c.length === 1 && isAny(c[0])) {
                        this.set = [
                            c
                        ];
                        break;
                    }
                }
            }
        }
        this.formatted = undefined;
    }
    get range() {
        if (this.formatted === undefined) {
            this.formatted = '';
            for(let i = 0; i < this.set.length; i++){
                if (i > 0) {
                    this.formatted += '||';
                }
                const comps = this.set[i];
                for(let k = 0; k < comps.length; k++){
                    if (k > 0) {
                        this.formatted += ' ';
                    }
                    this.formatted += comps[k].toString().trim();
                }
            }
        }
        return this.formatted;
    }
    format() {
        return this.range;
    }
    toString() {
        return this.range;
    }
    parseRange(range) {
        // memoize range parsing for performance.
        // this is a very hot path, and fully deterministic.
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ':' + range;
        const cached = cache.get(memoKey);
        if (cached) {
            return cached;
        }
        const loose = this.options.loose;
        // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug('hyphen replace', range);
        // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug('comparator trim', range);
        // `~ 1.2.3` => `~1.2.3`
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug('tilde trim', range);
        // `^ 1.2.3` => `^1.2.3`
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug('caret trim', range);
        // At this point, the range is completely trimmed and
        // ready to be split into comparators.
        let rangeList = range.split(' ').map((comp)=>parseComparator(comp, this.options)).join(' ').split(/\s+/)// >=0.0.0 is equivalent to *
        .map((comp)=>replaceGTE0(comp, this.options));
        if (loose) {
            // in loose mode, throw out any that are not valid comparators
            rangeList = rangeList.filter((comp)=>{
                debug('loose invalid filter', comp, this.options);
                return !!comp.match(re[t.COMPARATORLOOSE]);
            });
        }
        debug('range list', rangeList);
        // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once
        const rangeMap = new Map();
        const comparators = rangeList.map((comp)=>new Comparator(comp, this.options));
        for (const comp of comparators){
            if (isNullSet(comp)) {
                return [
                    comp
                ];
            }
            rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has('')) {
            rangeMap.delete('');
        }
        const result = [
            ...rangeMap.values()
        ];
        cache.set(memoKey, result);
        return result;
    }
    intersects(range, options) {
        if (!(range instanceof Range)) {
            throw new TypeError('a Range is required');
        }
        return this.set.some((thisComparators)=>{
            return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators)=>{
                return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator)=>{
                    return rangeComparators.every((rangeComparator)=>{
                        return thisComparator.intersects(rangeComparator, options);
                    });
                });
            });
        });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
        if (!version) {
            return false;
        }
        if (typeof version === 'string') {
            try {
                version = new SemVer(version, this.options);
            } catch (er) {
                return false;
            }
        }
        for(let i = 0; i < this.set.length; i++){
            if (testSet(this.set[i], version, this.options)) {
                return true;
            }
        }
        return false;
    }
}
module.exports = Range;
const LRU = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/lrucache.js [app-client] (ecmascript)");
const cache = new LRU();
const parseOptions = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/parse-options.js [app-client] (ecmascript)");
const Comparator = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/comparator.js [app-client] (ecmascript)");
const debug = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/debug.js [app-client] (ecmascript)");
const SemVer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/semver.js [app-client] (ecmascript)");
const { safeRe: re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/re.js [app-client] (ecmascript)");
const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/internal/constants.js [app-client] (ecmascript)");
const isNullSet = (c)=>c.value === '<0.0.0-0';
const isAny = (c)=>c.value === '';
// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options)=>{
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while(result && remainingComparators.length){
        result = remainingComparators.every((otherComparator)=>{
            return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
    }
    return result;
};
// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options)=>{
    comp = comp.replace(re[t.BUILD], '');
    debug('comp', comp, options);
    comp = replaceCarets(comp, options);
    debug('caret', comp);
    comp = replaceTildes(comp, options);
    debug('tildes', comp);
    comp = replaceXRanges(comp, options);
    debug('xrange', comp);
    comp = replaceStars(comp, options);
    debug('stars', comp);
    return comp;
};
const isX = (id)=>!id || id.toLowerCase() === 'x' || id === '*';
// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
// ~0.0.1 --> >=0.0.1 <0.1.0-0
const replaceTildes = (comp, options)=>{
    return comp.trim().split(/\s+/).map((c)=>replaceTilde(c, options)).join(' ');
};
const replaceTilde = (comp, options)=>{
    const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr)=>{
        debug('tilde', comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
            ret = '';
        } else if (isX(m)) {
            ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
            // ~1.2 == >=1.2.0 <1.3.0-0
            ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
            debug('replaceTilde pr', pr);
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
            // ~1.2.3 == >=1.2.3 <1.3.0-0
            ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug('tilde return', ret);
        return ret;
    });
};
// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
// ^0.0.1 --> >=0.0.1 <0.0.2-0
// ^0.1.0 --> >=0.1.0 <0.2.0-0
const replaceCarets = (comp, options)=>{
    return comp.trim().split(/\s+/).map((c)=>replaceCaret(c, options)).join(' ');
};
const replaceCaret = (comp, options)=>{
    debug('caret', comp, options);
    const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    const z = options.includePrerelease ? '-0' : '';
    return comp.replace(r, (_, M, m, p, pr)=>{
        debug('caret', comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
            ret = '';
        } else if (isX(m)) {
            ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
            if (M === '0') {
                ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            } else {
                ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
            }
        } else if (pr) {
            debug('replaceCaret pr', pr);
            if (M === '0') {
                if (m === '0') {
                    ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
                } else {
                    ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
                }
            } else {
                ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
            }
        } else {
            debug('no pr');
            if (M === '0') {
                if (m === '0') {
                    ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
                } else {
                    ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
                }
            } else {
                ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
            }
        }
        debug('caret return', ret);
        return ret;
    });
};
const replaceXRanges = (comp, options)=>{
    debug('replaceXRanges', comp, options);
    return comp.split(/\s+/).map((c)=>replaceXRange(c, options)).join(' ');
};
const replaceXRange = (comp, options)=>{
    comp = comp.trim();
    const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr)=>{
        debug('xRange', comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === '=' && anyX) {
            gtlt = '';
        }
        // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value
        pr = options.includePrerelease ? '-0' : '';
        if (xM) {
            if (gtlt === '>' || gtlt === '<') {
                // nothing is allowed
                ret = '<0.0.0-0';
            } else {
                // nothing is forbidden
                ret = '*';
            }
        } else if (gtlt && anyX) {
            // we know patch is an x, because we have any x at all.
            // replace X with 0
            if (xm) {
                m = 0;
            }
            p = 0;
            if (gtlt === '>') {
                // >1 => >=2.0.0
                // >1.2 => >=1.3.0
                gtlt = '>=';
                if (xm) {
                    M = +M + 1;
                    m = 0;
                    p = 0;
                } else {
                    m = +m + 1;
                    p = 0;
                }
            } else if (gtlt === '<=') {
                // <=0.7.x is actually <0.8.0, since any 0.7.x should
                // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                gtlt = '<';
                if (xm) {
                    M = +M + 1;
                } else {
                    m = +m + 1;
                }
            }
            if (gtlt === '<') {
                pr = '-0';
            }
            ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
            ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
            ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug('xRange return', ret);
        return ret;
    });
};
// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options)=>{
    debug('replaceStars', comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[t.STAR], '');
};
const replaceGTE0 = (comp, options)=>{
    debug('replaceGTE0', comp, options);
    return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
};
// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
// TODO build?
const hyphenReplace = (incPr)=>($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr)=>{
        if (isX(fM)) {
            from = '';
        } else if (isX(fm)) {
            from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
        } else if (isX(fp)) {
            from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
        } else if (fpr) {
            from = `>=${from}`;
        } else {
            from = `>=${from}${incPr ? '-0' : ''}`;
        }
        if (isX(tM)) {
            to = '';
        } else if (isX(tm)) {
            to = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp)) {
            to = `<${tM}.${+tm + 1}.0-0`;
        } else if (tpr) {
            to = `<=${tM}.${tm}.${tp}-${tpr}`;
        } else if (incPr) {
            to = `<${tM}.${tm}.${+tp + 1}-0`;
        } else {
            to = `<=${to}`;
        }
        return `${from} ${to}`.trim();
    };
const testSet = (set, version, options)=>{
    for(let i = 0; i < set.length; i++){
        if (!set[i].test(version)) {
            return false;
        }
    }
    if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for(let i = 0; i < set.length; i++){
            debug(set[i].semver);
            if (set[i].semver === Comparator.ANY) {
                continue;
            }
            if (set[i].semver.prerelease.length > 0) {
                const allowed = set[i].semver;
                if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                    return true;
                }
            }
        }
        // Version has a -pre, but it's not one of the ones we like.
        return false;
    }
    return true;
};
}),
"[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/functions/satisfies.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Range = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/sharp/node_modules/semver/classes/range.js [app-client] (ecmascript)");
const satisfies = (version, range, options)=>{
    try {
        range = new Range(range, options);
    } catch (er) {
        return false;
    }
    return range.test(version);
};
module.exports = satisfies;
}),
"[project]/JobPortal/frontend/node_modules/@img/sharp-libvips-linux-x64/lib/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = ("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/@img/sharp-libvips-linux-x64/lib");
}),
"[project]/JobPortal/frontend/node_modules/@img/sharp-libvips-linux-x64/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"name":"@img/sharp-libvips-linux-x64","version":"1.2.4","description":"Prebuilt libvips and dependencies for use with sharp on Linux (glibc) x64","author":"Lovell Fuller <npm@lovell.info>","homepage":"https://sharp.pixelplumbing.com","repository":{"type":"git","url":"git+https://github.com/lovell/sharp-libvips.git","directory":"npm/linux-x64"},"license":"LGPL-3.0-or-later","funding":{"url":"https://opencollective.com/libvips"},"preferUnplugged":true,"publishConfig":{"access":"public"},"files":["lib","versions.json"],"type":"commonjs","exports":{"./lib":"./lib/index.js","./package":"./package.json","./versions":"./versions.json"},"config":{"glibc":">=2.26"},"os":["linux"],"libc":["glibc"],"cpu":["x64"]});}),
"[project]/JobPortal/frontend/node_modules/@img/sharp-libvips-linux-x64/versions.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"aom":"3.13.1","archive":"3.8.2","cairo":"1.18.4","cgif":"0.5.0","exif":"0.6.25","expat":"2.7.3","ffi":"3.5.2","fontconfig":"2.17.1","freetype":"2.14.1","fribidi":"1.0.16","glib":"2.86.1","harfbuzz":"12.1.0","heif":"1.20.2","highway":"1.3.0","imagequant":"2.4.1","lcms":"2.17","mozjpeg":"0826579","pango":"1.57.0","pixman":"0.46.4","png":"1.6.50","proxy-libintl":"0.5","rsvg":"2.61.2","spng":"0.7.4","tiff":"4.7.1","vips":"8.17.3","webp":"1.6.0","xml2":"2.15.1","zlib-ng":"2.2.5"});}),
"[project]/JobPortal/frontend/node_modules/@img/sharp-libvips-linuxmusl-x64/lib/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = ("TURBOPACK compile-time value", "/ROOT/JobPortal/frontend/node_modules/@img/sharp-libvips-linuxmusl-x64/lib");
}),
"[project]/JobPortal/frontend/node_modules/@img/sharp-libvips-linuxmusl-x64/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"name":"@img/sharp-libvips-linuxmusl-x64","version":"1.2.4","description":"Prebuilt libvips and dependencies for use with sharp on Linux (musl) x64","author":"Lovell Fuller <npm@lovell.info>","homepage":"https://sharp.pixelplumbing.com","repository":{"type":"git","url":"git+https://github.com/lovell/sharp-libvips.git","directory":"npm/linuxmusl-x64"},"license":"LGPL-3.0-or-later","funding":{"url":"https://opencollective.com/libvips"},"preferUnplugged":true,"publishConfig":{"access":"public"},"files":["lib","versions.json"],"type":"commonjs","exports":{"./lib":"./lib/index.js","./package":"./package.json","./versions":"./versions.json"},"config":{"musl":">=1.2.2"},"os":["linux"],"libc":["musl"],"cpu":["x64"]});}),
"[project]/JobPortal/frontend/node_modules/@img/sharp-libvips-linuxmusl-x64/versions.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"aom":"3.13.1","archive":"3.8.2","cairo":"1.18.4","cgif":"0.5.0","exif":"0.6.25","expat":"2.7.3","ffi":"3.5.2","fontconfig":"2.17.1","freetype":"2.14.1","fribidi":"1.0.16","glib":"2.86.1","harfbuzz":"12.1.0","heif":"1.20.2","highway":"1.3.0","imagequant":"2.4.1","lcms":"2.17","mozjpeg":"0826579","pango":"1.57.0","pixman":"0.46.4","png":"1.6.50","proxy-libintl":"0.5","rsvg":"2.61.2","spng":"0.7.4","tiff":"4.7.1","vips":"8.17.3","webp":"1.6.0","xml2":"2.15.1","zlib-ng":"2.2.5"});}),
"[project]/JobPortal/frontend/node_modules/@img/colour/color.cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// node_modules/color/index.js
var index_exports = {};
__export(index_exports, {
    default: ()=>index_default
});
module.exports = __toCommonJS(index_exports);
// node_modules/color-name/index.js
var color_name_default = {
    aliceblue: [
        240,
        248,
        255
    ],
    antiquewhite: [
        250,
        235,
        215
    ],
    aqua: [
        0,
        255,
        255
    ],
    aquamarine: [
        127,
        255,
        212
    ],
    azure: [
        240,
        255,
        255
    ],
    beige: [
        245,
        245,
        220
    ],
    bisque: [
        255,
        228,
        196
    ],
    black: [
        0,
        0,
        0
    ],
    blanchedalmond: [
        255,
        235,
        205
    ],
    blue: [
        0,
        0,
        255
    ],
    blueviolet: [
        138,
        43,
        226
    ],
    brown: [
        165,
        42,
        42
    ],
    burlywood: [
        222,
        184,
        135
    ],
    cadetblue: [
        95,
        158,
        160
    ],
    chartreuse: [
        127,
        255,
        0
    ],
    chocolate: [
        210,
        105,
        30
    ],
    coral: [
        255,
        127,
        80
    ],
    cornflowerblue: [
        100,
        149,
        237
    ],
    cornsilk: [
        255,
        248,
        220
    ],
    crimson: [
        220,
        20,
        60
    ],
    cyan: [
        0,
        255,
        255
    ],
    darkblue: [
        0,
        0,
        139
    ],
    darkcyan: [
        0,
        139,
        139
    ],
    darkgoldenrod: [
        184,
        134,
        11
    ],
    darkgray: [
        169,
        169,
        169
    ],
    darkgreen: [
        0,
        100,
        0
    ],
    darkgrey: [
        169,
        169,
        169
    ],
    darkkhaki: [
        189,
        183,
        107
    ],
    darkmagenta: [
        139,
        0,
        139
    ],
    darkolivegreen: [
        85,
        107,
        47
    ],
    darkorange: [
        255,
        140,
        0
    ],
    darkorchid: [
        153,
        50,
        204
    ],
    darkred: [
        139,
        0,
        0
    ],
    darksalmon: [
        233,
        150,
        122
    ],
    darkseagreen: [
        143,
        188,
        143
    ],
    darkslateblue: [
        72,
        61,
        139
    ],
    darkslategray: [
        47,
        79,
        79
    ],
    darkslategrey: [
        47,
        79,
        79
    ],
    darkturquoise: [
        0,
        206,
        209
    ],
    darkviolet: [
        148,
        0,
        211
    ],
    deeppink: [
        255,
        20,
        147
    ],
    deepskyblue: [
        0,
        191,
        255
    ],
    dimgray: [
        105,
        105,
        105
    ],
    dimgrey: [
        105,
        105,
        105
    ],
    dodgerblue: [
        30,
        144,
        255
    ],
    firebrick: [
        178,
        34,
        34
    ],
    floralwhite: [
        255,
        250,
        240
    ],
    forestgreen: [
        34,
        139,
        34
    ],
    fuchsia: [
        255,
        0,
        255
    ],
    gainsboro: [
        220,
        220,
        220
    ],
    ghostwhite: [
        248,
        248,
        255
    ],
    gold: [
        255,
        215,
        0
    ],
    goldenrod: [
        218,
        165,
        32
    ],
    gray: [
        128,
        128,
        128
    ],
    green: [
        0,
        128,
        0
    ],
    greenyellow: [
        173,
        255,
        47
    ],
    grey: [
        128,
        128,
        128
    ],
    honeydew: [
        240,
        255,
        240
    ],
    hotpink: [
        255,
        105,
        180
    ],
    indianred: [
        205,
        92,
        92
    ],
    indigo: [
        75,
        0,
        130
    ],
    ivory: [
        255,
        255,
        240
    ],
    khaki: [
        240,
        230,
        140
    ],
    lavender: [
        230,
        230,
        250
    ],
    lavenderblush: [
        255,
        240,
        245
    ],
    lawngreen: [
        124,
        252,
        0
    ],
    lemonchiffon: [
        255,
        250,
        205
    ],
    lightblue: [
        173,
        216,
        230
    ],
    lightcoral: [
        240,
        128,
        128
    ],
    lightcyan: [
        224,
        255,
        255
    ],
    lightgoldenrodyellow: [
        250,
        250,
        210
    ],
    lightgray: [
        211,
        211,
        211
    ],
    lightgreen: [
        144,
        238,
        144
    ],
    lightgrey: [
        211,
        211,
        211
    ],
    lightpink: [
        255,
        182,
        193
    ],
    lightsalmon: [
        255,
        160,
        122
    ],
    lightseagreen: [
        32,
        178,
        170
    ],
    lightskyblue: [
        135,
        206,
        250
    ],
    lightslategray: [
        119,
        136,
        153
    ],
    lightslategrey: [
        119,
        136,
        153
    ],
    lightsteelblue: [
        176,
        196,
        222
    ],
    lightyellow: [
        255,
        255,
        224
    ],
    lime: [
        0,
        255,
        0
    ],
    limegreen: [
        50,
        205,
        50
    ],
    linen: [
        250,
        240,
        230
    ],
    magenta: [
        255,
        0,
        255
    ],
    maroon: [
        128,
        0,
        0
    ],
    mediumaquamarine: [
        102,
        205,
        170
    ],
    mediumblue: [
        0,
        0,
        205
    ],
    mediumorchid: [
        186,
        85,
        211
    ],
    mediumpurple: [
        147,
        112,
        219
    ],
    mediumseagreen: [
        60,
        179,
        113
    ],
    mediumslateblue: [
        123,
        104,
        238
    ],
    mediumspringgreen: [
        0,
        250,
        154
    ],
    mediumturquoise: [
        72,
        209,
        204
    ],
    mediumvioletred: [
        199,
        21,
        133
    ],
    midnightblue: [
        25,
        25,
        112
    ],
    mintcream: [
        245,
        255,
        250
    ],
    mistyrose: [
        255,
        228,
        225
    ],
    moccasin: [
        255,
        228,
        181
    ],
    navajowhite: [
        255,
        222,
        173
    ],
    navy: [
        0,
        0,
        128
    ],
    oldlace: [
        253,
        245,
        230
    ],
    olive: [
        128,
        128,
        0
    ],
    olivedrab: [
        107,
        142,
        35
    ],
    orange: [
        255,
        165,
        0
    ],
    orangered: [
        255,
        69,
        0
    ],
    orchid: [
        218,
        112,
        214
    ],
    palegoldenrod: [
        238,
        232,
        170
    ],
    palegreen: [
        152,
        251,
        152
    ],
    paleturquoise: [
        175,
        238,
        238
    ],
    palevioletred: [
        219,
        112,
        147
    ],
    papayawhip: [
        255,
        239,
        213
    ],
    peachpuff: [
        255,
        218,
        185
    ],
    peru: [
        205,
        133,
        63
    ],
    pink: [
        255,
        192,
        203
    ],
    plum: [
        221,
        160,
        221
    ],
    powderblue: [
        176,
        224,
        230
    ],
    purple: [
        128,
        0,
        128
    ],
    rebeccapurple: [
        102,
        51,
        153
    ],
    red: [
        255,
        0,
        0
    ],
    rosybrown: [
        188,
        143,
        143
    ],
    royalblue: [
        65,
        105,
        225
    ],
    saddlebrown: [
        139,
        69,
        19
    ],
    salmon: [
        250,
        128,
        114
    ],
    sandybrown: [
        244,
        164,
        96
    ],
    seagreen: [
        46,
        139,
        87
    ],
    seashell: [
        255,
        245,
        238
    ],
    sienna: [
        160,
        82,
        45
    ],
    silver: [
        192,
        192,
        192
    ],
    skyblue: [
        135,
        206,
        235
    ],
    slateblue: [
        106,
        90,
        205
    ],
    slategray: [
        112,
        128,
        144
    ],
    slategrey: [
        112,
        128,
        144
    ],
    snow: [
        255,
        250,
        250
    ],
    springgreen: [
        0,
        255,
        127
    ],
    steelblue: [
        70,
        130,
        180
    ],
    tan: [
        210,
        180,
        140
    ],
    teal: [
        0,
        128,
        128
    ],
    thistle: [
        216,
        191,
        216
    ],
    tomato: [
        255,
        99,
        71
    ],
    turquoise: [
        64,
        224,
        208
    ],
    violet: [
        238,
        130,
        238
    ],
    wheat: [
        245,
        222,
        179
    ],
    white: [
        255,
        255,
        255
    ],
    whitesmoke: [
        245,
        245,
        245
    ],
    yellow: [
        255,
        255,
        0
    ],
    yellowgreen: [
        154,
        205,
        50
    ]
};
// node_modules/color-string/index.js
var reverseNames = /* @__PURE__ */ Object.create(null);
for(const name in color_name_default){
    if (Object.hasOwn(color_name_default, name)) {
        reverseNames[color_name_default[name]] = name;
    }
}
var cs = {
    to: {},
    get: {}
};
cs.get = function(string) {
    const prefix = string.slice(0, 3).toLowerCase();
    let value;
    let model;
    switch(prefix){
        case "hsl":
            {
                value = cs.get.hsl(string);
                model = "hsl";
                break;
            }
        case "hwb":
            {
                value = cs.get.hwb(string);
                model = "hwb";
                break;
            }
        default:
            {
                value = cs.get.rgb(string);
                model = "rgb";
                break;
            }
    }
    if (!value) {
        return null;
    }
    return {
        model,
        value
    };
};
cs.get.rgb = function(string) {
    if (!string) {
        return null;
    }
    const abbr = /^#([a-f\d]{3,4})$/i;
    const hex = /^#([a-f\d]{6})([a-f\d]{2})?$/i;
    const rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[\s,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/;
    const per = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[\s,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/;
    const keyword = /^(\w+)$/;
    let rgb = [
        0,
        0,
        0,
        1
    ];
    let match;
    let i;
    let hexAlpha;
    if (match = string.match(hex)) {
        hexAlpha = match[2];
        match = match[1];
        for(i = 0; i < 3; i++){
            const i2 = i * 2;
            rgb[i] = Number.parseInt(match.slice(i2, i2 + 2), 16);
        }
        if (hexAlpha) {
            rgb[3] = Number.parseInt(hexAlpha, 16) / 255;
        }
    } else if (match = string.match(abbr)) {
        match = match[1];
        hexAlpha = match[3];
        for(i = 0; i < 3; i++){
            rgb[i] = Number.parseInt(match[i] + match[i], 16);
        }
        if (hexAlpha) {
            rgb[3] = Number.parseInt(hexAlpha + hexAlpha, 16) / 255;
        }
    } else if (match = string.match(rgba)) {
        for(i = 0; i < 3; i++){
            rgb[i] = Number.parseInt(match[i + 1], 10);
        }
        if (match[4]) {
            rgb[3] = match[5] ? Number.parseFloat(match[4]) * 0.01 : Number.parseFloat(match[4]);
        }
    } else if (match = string.match(per)) {
        for(i = 0; i < 3; i++){
            rgb[i] = Math.round(Number.parseFloat(match[i + 1]) * 2.55);
        }
        if (match[4]) {
            rgb[3] = match[5] ? Number.parseFloat(match[4]) * 0.01 : Number.parseFloat(match[4]);
        }
    } else if (match = string.match(keyword)) {
        if (match[1] === "transparent") {
            return [
                0,
                0,
                0,
                0
            ];
        }
        if (!Object.hasOwn(color_name_default, match[1])) {
            return null;
        }
        rgb = color_name_default[match[1]];
        rgb[3] = 1;
        return rgb;
    } else {
        return null;
    }
    for(i = 0; i < 3; i++){
        rgb[i] = clamp(rgb[i], 0, 255);
    }
    rgb[3] = clamp(rgb[3], 0, 1);
    return rgb;
};
cs.get.hsl = function(string) {
    if (!string) {
        return null;
    }
    const hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    const match = string.match(hsl);
    if (match) {
        const alpha = Number.parseFloat(match[4]);
        const h = (Number.parseFloat(match[1]) % 360 + 360) % 360;
        const s = clamp(Number.parseFloat(match[2]), 0, 100);
        const l = clamp(Number.parseFloat(match[3]), 0, 100);
        const a = clamp(Number.isNaN(alpha) ? 1 : alpha, 0, 1);
        return [
            h,
            s,
            l,
            a
        ];
    }
    return null;
};
cs.get.hwb = function(string) {
    if (!string) {
        return null;
    }
    const hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*[\s,]\s*([+-]?[\d.]+)%\s*[\s,]\s*([+-]?[\d.]+)%\s*(?:[\s,]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    const match = string.match(hwb);
    if (match) {
        const alpha = Number.parseFloat(match[4]);
        const h = (Number.parseFloat(match[1]) % 360 + 360) % 360;
        const w = clamp(Number.parseFloat(match[2]), 0, 100);
        const b = clamp(Number.parseFloat(match[3]), 0, 100);
        const a = clamp(Number.isNaN(alpha) ? 1 : alpha, 0, 1);
        return [
            h,
            w,
            b,
            a
        ];
    }
    return null;
};
cs.to.hex = function(...rgba) {
    return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
};
cs.to.rgb = function(...rgba) {
    return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
};
cs.to.rgb.percent = function(...rgba) {
    const r = Math.round(rgba[0] / 255 * 100);
    const g = Math.round(rgba[1] / 255 * 100);
    const b = Math.round(rgba[2] / 255 * 100);
    return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r + "%, " + g + "%, " + b + "%)" : "rgba(" + r + "%, " + g + "%, " + b + "%, " + rgba[3] + ")";
};
cs.to.hsl = function(...hsla) {
    return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
};
cs.to.hwb = function(...hwba) {
    let a = "";
    if (hwba.length >= 4 && hwba[3] !== 1) {
        a = ", " + hwba[3];
    }
    return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
};
cs.to.keyword = function(...rgb) {
    return reverseNames[rgb.slice(0, 3)];
};
function clamp(number_, min, max) {
    return Math.min(Math.max(min, number_), max);
}
function hexDouble(number_) {
    const string_ = Math.round(number_).toString(16).toUpperCase();
    return string_.length < 2 ? "0" + string_ : string_;
}
var color_string_default = cs;
// node_modules/color-convert/conversions.js
var reverseKeywords = {};
for (const key of Object.keys(color_name_default)){
    reverseKeywords[color_name_default[key]] = key;
}
var convert = {
    rgb: {
        channels: 3,
        labels: "rgb"
    },
    hsl: {
        channels: 3,
        labels: "hsl"
    },
    hsv: {
        channels: 3,
        labels: "hsv"
    },
    hwb: {
        channels: 3,
        labels: "hwb"
    },
    cmyk: {
        channels: 4,
        labels: "cmyk"
    },
    xyz: {
        channels: 3,
        labels: "xyz"
    },
    lab: {
        channels: 3,
        labels: "lab"
    },
    oklab: {
        channels: 3,
        labels: [
            "okl",
            "oka",
            "okb"
        ]
    },
    lch: {
        channels: 3,
        labels: "lch"
    },
    oklch: {
        channels: 3,
        labels: [
            "okl",
            "okc",
            "okh"
        ]
    },
    hex: {
        channels: 1,
        labels: [
            "hex"
        ]
    },
    keyword: {
        channels: 1,
        labels: [
            "keyword"
        ]
    },
    ansi16: {
        channels: 1,
        labels: [
            "ansi16"
        ]
    },
    ansi256: {
        channels: 1,
        labels: [
            "ansi256"
        ]
    },
    hcg: {
        channels: 3,
        labels: [
            "h",
            "c",
            "g"
        ]
    },
    apple: {
        channels: 3,
        labels: [
            "r16",
            "g16",
            "b16"
        ]
    },
    gray: {
        channels: 1,
        labels: [
            "gray"
        ]
    }
};
var conversions_default = convert;
var LAB_FT = (6 / 29) ** 3;
function srgbNonlinearTransform(c) {
    const cc = c > 31308e-7 ? 1.055 * c ** (1 / 2.4) - 0.055 : c * 12.92;
    return Math.min(Math.max(0, cc), 1);
}
function srgbNonlinearTransformInv(c) {
    return c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92;
}
for (const model of Object.keys(convert)){
    if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
    }
    const { channels, labels } = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", {
        value: channels
    });
    Object.defineProperty(convert[model], "labels", {
        value: labels
    });
}
convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    switch(max){
        case min:
            {
                h = 0;
                break;
            }
        case r:
            {
                h = (g - b) / delta;
                break;
            }
        case g:
            {
                h = 2 + (b - r) / delta;
                break;
            }
        case b:
            {
                h = 4 + (r - g) / delta;
                break;
            }
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
        h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
        s = 0;
    } else if (l <= 0.5) {
        s = delta / (max + min);
    } else {
        s = delta / (2 - max - min);
    }
    return [
        h,
        s * 100,
        l * 100
    ];
};
convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
        h = 0;
        s = 0;
    } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        switch(v){
            case r:
                {
                    h = bdif - gdif;
                    break;
                }
            case g:
                {
                    h = 1 / 3 + rdif - bdif;
                    break;
                }
            case b:
                {
                    h = 2 / 3 + gdif - rdif;
                    break;
                }
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return [
        h * 360,
        s * 100,
        v * 100
    ];
};
convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [
        h,
        w * 100,
        b * 100
    ];
};
convert.rgb.oklab = function(rgb) {
    const r = srgbNonlinearTransformInv(rgb[0] / 255);
    const g = srgbNonlinearTransformInv(rgb[1] / 255);
    const b = srgbNonlinearTransformInv(rgb[2] / 255);
    const lp = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const mp = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const sp = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    const l = 0.2104542553 * lp + 0.793617785 * mp - 0.0040720468 * sp;
    const aa = 1.9779984951 * lp - 2.428592205 * mp + 0.4505937099 * sp;
    const bb = 0.0259040371 * lp + 0.7827717662 * mp - 0.808675766 * sp;
    return [
        l * 100,
        aa * 100,
        bb * 100
    ];
};
convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [
        c * 100,
        m * 100,
        y * 100,
        k * 100
    ];
};
function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
}
convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
        return reversed;
    }
    let currentClosestDistance = Number.POSITIVE_INFINITY;
    let currentClosestKeyword;
    for (const keyword of Object.keys(color_name_default)){
        const value = color_name_default[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
        }
    }
    return currentClosestKeyword;
};
convert.keyword.rgb = function(keyword) {
    return color_name_default[keyword];
};
convert.rgb.xyz = function(rgb) {
    const r = srgbNonlinearTransformInv(rgb[0] / 255);
    const g = srgbNonlinearTransformInv(rgb[1] / 255);
    const b = srgbNonlinearTransformInv(rgb[2] / 255);
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
    const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
    return [
        x * 100,
        y * 100,
        z * 100
    ];
};
convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > LAB_FT ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > LAB_FT ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > LAB_FT ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [
        l,
        a,
        b
    ];
};
convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t3;
    let value;
    if (s === 0) {
        value = l * 255;
        return [
            value,
            value,
            value
        ];
    }
    const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const t1 = 2 * l - t2;
    const rgb = [
        0,
        0,
        0
    ];
    for(let i = 0; i < 3; i++){
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
            t3++;
        }
        if (t3 > 1) {
            t3--;
        }
        if (6 * t3 < 1) {
            value = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
            value = t2;
        } else if (3 * t3 < 2) {
            value = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
            value = t1;
        }
        rgb[i] = value * 255;
    }
    return rgb;
};
convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [
        h,
        sv * 100,
        v * 100
    ];
};
convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch(hi){
        case 0:
            {
                return [
                    v,
                    t,
                    p
                ];
            }
        case 1:
            {
                return [
                    q,
                    v,
                    p
                ];
            }
        case 2:
            {
                return [
                    p,
                    v,
                    t
                ];
            }
        case 3:
            {
                return [
                    p,
                    q,
                    v
                ];
            }
        case 4:
            {
                return [
                    t,
                    p,
                    v
                ];
            }
        case 5:
            {
                return [
                    v,
                    p,
                    q
                ];
            }
    }
};
convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [
        h,
        sl * 100,
        l * 100
    ];
};
convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
        f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch(i){
        default:
        case 6:
        case 0:
            {
                r = v;
                g = n;
                b = wh;
                break;
            }
        case 1:
            {
                r = n;
                g = v;
                b = wh;
                break;
            }
        case 2:
            {
                r = wh;
                g = v;
                b = n;
                break;
            }
        case 3:
            {
                r = wh;
                g = n;
                b = v;
                break;
            }
        case 4:
            {
                r = n;
                g = wh;
                b = v;
                break;
            }
        case 5:
            {
                r = v;
                g = wh;
                b = n;
                break;
            }
    }
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
    g = x * -0.969266 + y * 1.8760108 + z * 0.041556;
    b = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;
    r = srgbNonlinearTransform(r);
    g = srgbNonlinearTransform(g);
    b = srgbNonlinearTransform(b);
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > LAB_FT ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > LAB_FT ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > LAB_FT ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [
        l,
        a,
        b
    ];
};
convert.xyz.oklab = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    const lp = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
    const mp = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
    const sp = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z);
    const l = 0.2104542553 * lp + 0.793617785 * mp - 0.0040720468 * sp;
    const a = 1.9779984951 * lp - 2.428592205 * mp + 0.4505937099 * sp;
    const b = 0.0259040371 * lp + 0.7827717662 * mp - 0.808675766 * sp;
    return [
        l * 100,
        a * 100,
        b * 100
    ];
};
convert.oklab.oklch = function(oklab) {
    return convert.lab.lch(oklab);
};
convert.oklab.xyz = function(oklab) {
    const ll = oklab[0] / 100;
    const a = oklab[1] / 100;
    const b = oklab[2] / 100;
    const l = (0.999999998 * ll + 0.396337792 * a + 0.215803758 * b) ** 3;
    const m = (1.000000008 * ll - 0.105561342 * a - 0.063854175 * b) ** 3;
    const s = (1.000000055 * ll - 0.089484182 * a - 1.291485538 * b) ** 3;
    const x = 1.227013851 * l - 0.55779998 * m + 0.281256149 * s;
    const y = -0.040580178 * l + 1.11225687 * m - 0.071676679 * s;
    const z = -0.076381285 * l - 0.421481978 * m + 1.58616322 * s;
    return [
        x * 100,
        y * 100,
        z * 100
    ];
};
convert.oklab.rgb = function(oklab) {
    const ll = oklab[0] / 100;
    const aa = oklab[1] / 100;
    const bb = oklab[2] / 100;
    const l = (ll + 0.3963377774 * aa + 0.2158037573 * bb) ** 3;
    const m = (ll - 0.1055613458 * aa - 0.0638541728 * bb) ** 3;
    const s = (ll - 0.0894841775 * aa - 1.291485548 * bb) ** 3;
    const r = srgbNonlinearTransform(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s);
    const g = srgbNonlinearTransform(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s);
    const b = srgbNonlinearTransform(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s);
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
convert.oklch.oklab = function(oklch) {
    return convert.lch.lab(oklch);
};
convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > LAB_FT ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > LAB_FT ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > LAB_FT ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [
        x,
        y,
        z
    ];
};
convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
        h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [
        l,
        c,
        h
    ];
};
convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [
        l,
        a,
        b
    ];
};
convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
        return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
        ansi += 60;
    }
    return ansi;
};
convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};
convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
        if (r < 8) {
            return 16;
        }
        if (r > 248) {
            return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
};
convert.ansi16.rgb = function(args) {
    args = args[0];
    let color = args % 10;
    if (color === 0 || color === 7) {
        if (args > 50) {
            color += 3.5;
        }
        color = color / 10.5 * 255;
        return [
            color,
            color,
            color
        ];
    }
    const mult = (Math.trunc(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [
        r,
        g,
        b
    ];
};
convert.ansi256.rgb = function(args) {
    args = args[0];
    if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [
            c,
            c,
            c
        ];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [
        r,
        g,
        b
    ];
};
convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".slice(string.length) + string;
};
convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);
    if (!match) {
        return [
            0,
            0,
            0
        ];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
        colorString = [
            ...colorString
        ].map((char)=>char + char).join("");
    }
    const integer = Number.parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [
        r,
        g,
        b
    ];
};
convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let hue;
    const grayscale = chroma < 1 ? min / (1 - chroma) : 0;
    if (chroma <= 0) {
        hue = 0;
    } else if (max === r) {
        hue = (g - b) / chroma % 6;
    } else if (max === g) {
        hue = 2 + (b - r) / chroma;
    } else {
        hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [
        hue * 360,
        chroma * 100,
        grayscale * 100
    ];
};
convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
    }
    return [
        hsl[0],
        c * 100,
        f * 100
    ];
};
convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
        f = (v - c) / (1 - c);
    }
    return [
        hsv[0],
        c * 100,
        f * 100
    ];
};
convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
        return [
            g * 255,
            g * 255,
            g * 255
        ];
    }
    const pure = [
        0,
        0,
        0
    ];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch(Math.floor(hi)){
        case 0:
            {
                pure[0] = 1;
                pure[1] = v;
                pure[2] = 0;
                break;
            }
        case 1:
            {
                pure[0] = w;
                pure[1] = 1;
                pure[2] = 0;
                break;
            }
        case 2:
            {
                pure[0] = 0;
                pure[1] = 1;
                pure[2] = v;
                break;
            }
        case 3:
            {
                pure[0] = 0;
                pure[1] = w;
                pure[2] = 1;
                break;
            }
        case 4:
            {
                pure[0] = v;
                pure[1] = 0;
                pure[2] = 1;
                break;
            }
        default:
            {
                pure[0] = 1;
                pure[1] = 0;
                pure[2] = w;
            }
    }
    mg = (1 - c) * g;
    return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
    ];
};
convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
        f = c / v;
    }
    return [
        hcg[0],
        f * 100,
        v * 100
    ];
};
convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
        s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
    }
    return [
        hcg[0],
        s * 100,
        l * 100
    ];
};
convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [
        hcg[0],
        (v - c) * 100,
        (1 - v) * 100
    ];
};
convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
        g = (v - c) / (1 - c);
    }
    return [
        hwb[0],
        c * 100,
        g * 100
    ];
};
convert.apple.rgb = function(apple) {
    return [
        apple[0] / 65535 * 255,
        apple[1] / 65535 * 255,
        apple[2] / 65535 * 255
    ];
};
convert.rgb.apple = function(rgb) {
    return [
        rgb[0] / 255 * 65535,
        rgb[1] / 255 * 65535,
        rgb[2] / 255 * 65535
    ];
};
convert.gray.rgb = function(args) {
    return [
        args[0] / 100 * 255,
        args[0] / 100 * 255,
        args[0] / 100 * 255
    ];
};
convert.gray.hsl = function(args) {
    return [
        0,
        0,
        args[0]
    ];
};
convert.gray.hsv = convert.gray.hsl;
convert.gray.hwb = function(gray) {
    return [
        0,
        100,
        gray[0]
    ];
};
convert.gray.cmyk = function(gray) {
    return [
        0,
        0,
        0,
        gray[0]
    ];
};
convert.gray.lab = function(gray) {
    return [
        gray[0],
        0,
        0
    ];
};
convert.gray.hex = function(gray) {
    const value = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (value << 16) + (value << 8) + value;
    const string = integer.toString(16).toUpperCase();
    return "000000".slice(string.length) + string;
};
convert.rgb.gray = function(rgb) {
    const value = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [
        value / 255 * 100
    ];
};
// node_modules/color-convert/route.js
function buildGraph() {
    const graph = {};
    const models2 = Object.keys(conversions_default);
    for(let { length } = models2, i = 0; i < length; i++){
        graph[models2[i]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null
        };
    }
    return graph;
}
function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [
        fromModel
    ];
    graph[fromModel].distance = 0;
    while(queue.length > 0){
        const current = queue.pop();
        const adjacents = Object.keys(conversions_default[current]);
        for(let { length } = adjacents, i = 0; i < length; i++){
            const adjacent = adjacents[i];
            const node = graph[adjacent];
            if (node.distance === -1) {
                node.distance = graph[current].distance + 1;
                node.parent = current;
                queue.unshift(adjacent);
            }
        }
    }
    return graph;
}
function link(from, to) {
    return function(args) {
        return to(from(args));
    };
}
function wrapConversion(toModel, graph) {
    const path = [
        graph[toModel].parent,
        toModel
    ];
    let fn = conversions_default[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while(graph[cur].parent){
        path.unshift(graph[cur].parent);
        fn = link(conversions_default[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
}
function route(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models2 = Object.keys(graph);
    for(let { length } = models2, i = 0; i < length; i++){
        const toModel = models2[i];
        const node = graph[toModel];
        if (node.parent === null) {
            continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
}
var route_default = route;
// node_modules/color-convert/index.js
var convert2 = {};
var models = Object.keys(conversions_default);
function wrapRaw(fn) {
    const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
            return arg0;
        }
        if (arg0.length > 1) {
            args = arg0;
        }
        return fn(args);
    };
    if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
}
function wrapRounded(fn) {
    const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
            return arg0;
        }
        if (arg0.length > 1) {
            args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
            for(let { length } = result, i = 0; i < length; i++){
                result[i] = Math.round(result[i]);
            }
        }
        return result;
    };
    if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
}
for (const fromModel of models){
    convert2[fromModel] = {};
    Object.defineProperty(convert2[fromModel], "channels", {
        value: conversions_default[fromModel].channels
    });
    Object.defineProperty(convert2[fromModel], "labels", {
        value: conversions_default[fromModel].labels
    });
    const routes = route_default(fromModel);
    const routeModels = Object.keys(routes);
    for (const toModel of routeModels){
        const fn = routes[toModel];
        convert2[fromModel][toModel] = wrapRounded(fn);
        convert2[fromModel][toModel].raw = wrapRaw(fn);
    }
}
var color_convert_default = convert2;
// node_modules/color/index.js
var skippedModels = [
    // To be honest, I don't really feel like keyword belongs in color convert, but eh.
    "keyword",
    // Gray conflicts with some method names, and has its own method defined.
    "gray",
    // Shouldn't really be in color-convert either...
    "hex"
];
var hashedModelKeys = {};
for (const model of Object.keys(color_convert_default)){
    hashedModelKeys[[
        ...color_convert_default[model].labels
    ].sort().join("")] = model;
}
var limiters = {};
function Color(object, model) {
    if (!(this instanceof Color)) {
        return new Color(object, model);
    }
    if (model && model in skippedModels) {
        model = null;
    }
    if (model && !(model in color_convert_default)) {
        throw new Error("Unknown model: " + model);
    }
    let i;
    let channels;
    if (object == null) {
        this.model = "rgb";
        this.color = [
            0,
            0,
            0
        ];
        this.valpha = 1;
    } else if (object instanceof Color) {
        this.model = object.model;
        this.color = [
            ...object.color
        ];
        this.valpha = object.valpha;
    } else if (typeof object === "string") {
        const result = color_string_default.get(object);
        if (result === null) {
            throw new Error("Unable to parse color from string: " + object);
        }
        this.model = result.model;
        channels = color_convert_default[this.model].channels;
        this.color = result.value.slice(0, channels);
        this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
    } else if (object.length > 0) {
        this.model = model || "rgb";
        channels = color_convert_default[this.model].channels;
        const newArray = Array.prototype.slice.call(object, 0, channels);
        this.color = zeroArray(newArray, channels);
        this.valpha = typeof object[channels] === "number" ? object[channels] : 1;
    } else if (typeof object === "number") {
        this.model = "rgb";
        this.color = [
            object >> 16 & 255,
            object >> 8 & 255,
            object & 255
        ];
        this.valpha = 1;
    } else {
        this.valpha = 1;
        const keys = Object.keys(object);
        if ("alpha" in object) {
            keys.splice(keys.indexOf("alpha"), 1);
            this.valpha = typeof object.alpha === "number" ? object.alpha : 0;
        }
        const hashedKeys = keys.sort().join("");
        if (!(hashedKeys in hashedModelKeys)) {
            throw new Error("Unable to parse color from object: " + JSON.stringify(object));
        }
        this.model = hashedModelKeys[hashedKeys];
        const { labels } = color_convert_default[this.model];
        const color = [];
        for(i = 0; i < labels.length; i++){
            color.push(object[labels[i]]);
        }
        this.color = zeroArray(color);
    }
    if (limiters[this.model]) {
        channels = color_convert_default[this.model].channels;
        for(i = 0; i < channels; i++){
            const limit = limiters[this.model][i];
            if (limit) {
                this.color[i] = limit(this.color[i]);
            }
        }
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha));
    if (Object.freeze) {
        Object.freeze(this);
    }
}
Color.prototype = {
    toString () {
        return this.string();
    },
    toJSON () {
        return this[this.model]();
    },
    string (places) {
        let self = this.model in color_string_default.to ? this : this.rgb();
        self = self.round(typeof places === "number" ? places : 1);
        const arguments_ = self.valpha === 1 ? self.color : [
            ...self.color,
            this.valpha
        ];
        return color_string_default.to[self.model](...arguments_);
    },
    percentString (places) {
        const self = this.rgb().round(typeof places === "number" ? places : 1);
        const arguments_ = self.valpha === 1 ? self.color : [
            ...self.color,
            this.valpha
        ];
        return color_string_default.to.rgb.percent(...arguments_);
    },
    array () {
        return this.valpha === 1 ? [
            ...this.color
        ] : [
            ...this.color,
            this.valpha
        ];
    },
    object () {
        const result = {};
        const { channels } = color_convert_default[this.model];
        const { labels } = color_convert_default[this.model];
        for(let i = 0; i < channels; i++){
            result[labels[i]] = this.color[i];
        }
        if (this.valpha !== 1) {
            result.alpha = this.valpha;
        }
        return result;
    },
    unitArray () {
        const rgb = this.rgb().color;
        rgb[0] /= 255;
        rgb[1] /= 255;
        rgb[2] /= 255;
        if (this.valpha !== 1) {
            rgb.push(this.valpha);
        }
        return rgb;
    },
    unitObject () {
        const rgb = this.rgb().object();
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        if (this.valpha !== 1) {
            rgb.alpha = this.valpha;
        }
        return rgb;
    },
    round (places) {
        places = Math.max(places || 0, 0);
        return new Color([
            ...this.color.map(roundToPlace(places)),
            this.valpha
        ], this.model);
    },
    alpha (value) {
        if (value !== void 0) {
            return new Color([
                ...this.color,
                Math.max(0, Math.min(1, value))
            ], this.model);
        }
        return this.valpha;
    },
    // Rgb
    red: getset("rgb", 0, maxfn(255)),
    green: getset("rgb", 1, maxfn(255)),
    blue: getset("rgb", 2, maxfn(255)),
    hue: getset([
        "hsl",
        "hsv",
        "hsl",
        "hwb",
        "hcg"
    ], 0, (value)=>(value % 360 + 360) % 360),
    saturationl: getset("hsl", 1, maxfn(100)),
    lightness: getset("hsl", 2, maxfn(100)),
    saturationv: getset("hsv", 1, maxfn(100)),
    value: getset("hsv", 2, maxfn(100)),
    chroma: getset("hcg", 1, maxfn(100)),
    gray: getset("hcg", 2, maxfn(100)),
    white: getset("hwb", 1, maxfn(100)),
    wblack: getset("hwb", 2, maxfn(100)),
    cyan: getset("cmyk", 0, maxfn(100)),
    magenta: getset("cmyk", 1, maxfn(100)),
    yellow: getset("cmyk", 2, maxfn(100)),
    black: getset("cmyk", 3, maxfn(100)),
    x: getset("xyz", 0, maxfn(95.047)),
    y: getset("xyz", 1, maxfn(100)),
    z: getset("xyz", 2, maxfn(108.833)),
    l: getset("lab", 0, maxfn(100)),
    a: getset("lab", 1),
    b: getset("lab", 2),
    keyword (value) {
        if (value !== void 0) {
            return new Color(value);
        }
        return color_convert_default[this.model].keyword(this.color);
    },
    hex (value) {
        if (value !== void 0) {
            return new Color(value);
        }
        return color_string_default.to.hex(...this.rgb().round().color);
    },
    hexa (value) {
        if (value !== void 0) {
            return new Color(value);
        }
        const rgbArray = this.rgb().round().color;
        let alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
        if (alphaHex.length === 1) {
            alphaHex = "0" + alphaHex;
        }
        return color_string_default.to.hex(...rgbArray) + alphaHex;
    },
    rgbNumber () {
        const rgb = this.rgb().color;
        return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
    },
    luminosity () {
        const rgb = this.rgb().color;
        const lum = [];
        for (const [i, element] of rgb.entries()){
            const chan = element / 255;
            lum[i] = chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
        }
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },
    contrast (color2) {
        const lum1 = this.luminosity();
        const lum2 = color2.luminosity();
        if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
        }
        return (lum2 + 0.05) / (lum1 + 0.05);
    },
    level (color2) {
        const contrastRatio = this.contrast(color2);
        if (contrastRatio >= 7) {
            return "AAA";
        }
        return contrastRatio >= 4.5 ? "AA" : "";
    },
    isDark () {
        const rgb = this.rgb().color;
        const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 1e4;
        return yiq < 128;
    },
    isLight () {
        return !this.isDark();
    },
    negate () {
        const rgb = this.rgb();
        for(let i = 0; i < 3; i++){
            rgb.color[i] = 255 - rgb.color[i];
        }
        return rgb;
    },
    lighten (ratio) {
        const hsl = this.hsl();
        hsl.color[2] += hsl.color[2] * ratio;
        return hsl;
    },
    darken (ratio) {
        const hsl = this.hsl();
        hsl.color[2] -= hsl.color[2] * ratio;
        return hsl;
    },
    saturate (ratio) {
        const hsl = this.hsl();
        hsl.color[1] += hsl.color[1] * ratio;
        return hsl;
    },
    desaturate (ratio) {
        const hsl = this.hsl();
        hsl.color[1] -= hsl.color[1] * ratio;
        return hsl;
    },
    whiten (ratio) {
        const hwb = this.hwb();
        hwb.color[1] += hwb.color[1] * ratio;
        return hwb;
    },
    blacken (ratio) {
        const hwb = this.hwb();
        hwb.color[2] += hwb.color[2] * ratio;
        return hwb;
    },
    grayscale () {
        const rgb = this.rgb().color;
        const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
        return Color.rgb(value, value, value);
    },
    fade (ratio) {
        return this.alpha(this.valpha - this.valpha * ratio);
    },
    opaquer (ratio) {
        return this.alpha(this.valpha + this.valpha * ratio);
    },
    rotate (degrees) {
        const hsl = this.hsl();
        let hue = hsl.color[0];
        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;
        hsl.color[0] = hue;
        return hsl;
    },
    mix (mixinColor, weight) {
        if (!mixinColor || !mixinColor.rgb) {
            throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
        }
        const color1 = mixinColor.rgb();
        const color2 = this.rgb();
        const p = weight === void 0 ? 0.5 : weight;
        const w = 2 * p - 1;
        const a = color1.alpha() - color2.alpha();
        const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
        const w2 = 1 - w1;
        return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
    }
};
for (const model of Object.keys(color_convert_default)){
    if (skippedModels.includes(model)) {
        continue;
    }
    const { channels } = color_convert_default[model];
    Color.prototype[model] = function(...arguments_) {
        if (this.model === model) {
            return new Color(this);
        }
        if (arguments_.length > 0) {
            return new Color(arguments_, model);
        }
        return new Color([
            ...assertArray(color_convert_default[this.model][model].raw(this.color)),
            this.valpha
        ], model);
    };
    Color[model] = function(...arguments_) {
        let color = arguments_[0];
        if (typeof color === "number") {
            color = zeroArray(arguments_, channels);
        }
        return new Color(color, model);
    };
}
function roundTo(number, places) {
    return Number(number.toFixed(places));
}
function roundToPlace(places) {
    return function(number) {
        return roundTo(number, places);
    };
}
function getset(model, channel, modifier) {
    model = Array.isArray(model) ? model : [
        model
    ];
    for (const m of model){
        (limiters[m] ||= [])[channel] = modifier;
    }
    model = model[0];
    return function(value) {
        let result;
        if (value !== void 0) {
            if (modifier) {
                value = modifier(value);
            }
            result = this[model]();
            result.color[channel] = value;
            return result;
        }
        result = this[model]().color[channel];
        if (modifier) {
            result = modifier(result);
        }
        return result;
    };
}
function maxfn(max) {
    return function(v) {
        return Math.max(0, Math.min(max, v));
    };
}
function assertArray(value) {
    return Array.isArray(value) ? value : [
        value
    ];
}
function zeroArray(array, length) {
    for(let i = 0; i < length; i++){
        if (typeof array[i] !== "number") {
            array[i] = 0;
        }
    }
    return array;
}
var index_default = Color;
}),
"[project]/JobPortal/frontend/node_modules/@img/colour/index.cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@img/colour/color.cjs [app-client] (ecmascript)").default;
}),
"[project]/JobPortal/frontend/node_modules/picocolors/picocolors.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var x = String;
var create = function() {
    return {
        isColorSupported: false,
        reset: x,
        bold: x,
        dim: x,
        italic: x,
        underline: x,
        inverse: x,
        hidden: x,
        strikethrough: x,
        black: x,
        red: x,
        green: x,
        yellow: x,
        blue: x,
        magenta: x,
        cyan: x,
        white: x,
        gray: x,
        bgBlack: x,
        bgRed: x,
        bgGreen: x,
        bgYellow: x,
        bgBlue: x,
        bgMagenta: x,
        bgCyan: x,
        bgWhite: x,
        blackBright: x,
        redBright: x,
        greenBright: x,
        yellowBright: x,
        blueBright: x,
        magentaBright: x,
        cyanBright: x,
        whiteBright: x,
        bgBlackBright: x,
        bgRedBright: x,
        bgGreenBright: x,
        bgYellowBright: x,
        bgBlueBright: x,
        bgMagentaBright: x,
        bgCyanBright: x,
        bgWhiteBright: x
    };
};
module.exports = create();
module.exports.createColors = create;
}),
"[project]/JobPortal/frontend/node_modules/nanoid/non-secure/index.cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
// References to the same file (works both for gzip and brotli):
// `'use`, `andom`, and `rict'`
// References to the brotli default dictionary:
// `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let customAlphabet = (alphabet, defaultSize = 21)=>{
    return (size = defaultSize)=>{
        let id = '';
        // A compact alternative for `for (var i = 0; i < step; i++)`.
        let i = size | 0;
        while(i--){
            // `| 0` is more compact and faster than `Math.floor()`.
            id += alphabet[Math.random() * alphabet.length | 0];
        }
        return id;
    };
};
let nanoid = (size = 21)=>{
    let id = '';
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    let i = size | 0;
    while(i--){
        // `| 0` is more compact and faster than `Math.floor()`.
        id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
};
module.exports = {
    nanoid,
    customAlphabet
};
}),
"[project]/JobPortal/frontend/node_modules/@swc/helpers/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"name\":\"@swc/helpers\",\"packageManager\":\"yarn@4.0.2\",\"version\":\"0.5.15\",\"description\":\"External helpers for the swc project.\",\"module\":\"esm/index.js\",\"main\":\"cjs/index.cjs\",\"sideEffects\":false,\"scripts\":{\"build\":\"zx ./scripts/build.js\",\"prepack\":\"zx ./scripts/build.js\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/swc-project/swc.git\"},\"publishConfig\":{\"registry\":\"https://registry.npmjs.org/\",\"access\":\"public\"},\"keywords\":[\"swc\",\"helpers\"],\"author\":\"강동윤 <kdy1997.dev@gmail.com>\",\"license\":\"Apache-2.0\",\"bugs\":{\"url\":\"https://github.com/swc-project/swc/issues\"},\"homepage\":\"https://swc.rs\",\"type\":\"module\",\"devDependencies\":{\"@ast-grep/napi\":\"^0.3.1\",\"dprint\":\"^0.35.3\",\"magic-string\":\"^0.30.0\",\"zx\":\"^7.2.1\"},\"dependencies\":{\"tslib\":\"^2.8.0\"},\"exports\":{\"./package.json\":\"./package.json\",\"./esm/*\":\"./esm/*\",\"./cjs/*\":\"./cjs/*\",\"./src/*\":\"./src/*\",\".\":{\"import\":\"./esm/index.js\",\"default\":\"./cjs/index.cjs\"},\"./_\":{\"import\":\"./esm/index.js\",\"default\":\"./cjs/index.cjs\"},\"./_/_apply_decorated_descriptor\":{\"import\":\"./esm/_apply_decorated_descriptor.js\",\"default\":\"./cjs/_apply_decorated_descriptor.cjs\"},\"./_/_apply_decs_2203_r\":{\"import\":\"./esm/_apply_decs_2203_r.js\",\"default\":\"./cjs/_apply_decs_2203_r.cjs\"},\"./_/_array_like_to_array\":{\"import\":\"./esm/_array_like_to_array.js\",\"default\":\"./cjs/_array_like_to_array.cjs\"},\"./_/_array_with_holes\":{\"import\":\"./esm/_array_with_holes.js\",\"default\":\"./cjs/_array_with_holes.cjs\"},\"./_/_array_without_holes\":{\"import\":\"./esm/_array_without_holes.js\",\"default\":\"./cjs/_array_without_holes.cjs\"},\"./_/_assert_this_initialized\":{\"import\":\"./esm/_assert_this_initialized.js\",\"default\":\"./cjs/_assert_this_initialized.cjs\"},\"./_/_async_generator\":{\"import\":\"./esm/_async_generator.js\",\"default\":\"./cjs/_async_generator.cjs\"},\"./_/_async_generator_delegate\":{\"import\":\"./esm/_async_generator_delegate.js\",\"default\":\"./cjs/_async_generator_delegate.cjs\"},\"./_/_async_iterator\":{\"import\":\"./esm/_async_iterator.js\",\"default\":\"./cjs/_async_iterator.cjs\"},\"./_/_async_to_generator\":{\"import\":\"./esm/_async_to_generator.js\",\"default\":\"./cjs/_async_to_generator.cjs\"},\"./_/_await_async_generator\":{\"import\":\"./esm/_await_async_generator.js\",\"default\":\"./cjs/_await_async_generator.cjs\"},\"./_/_await_value\":{\"import\":\"./esm/_await_value.js\",\"default\":\"./cjs/_await_value.cjs\"},\"./_/_call_super\":{\"import\":\"./esm/_call_super.js\",\"default\":\"./cjs/_call_super.cjs\"},\"./_/_check_private_redeclaration\":{\"import\":\"./esm/_check_private_redeclaration.js\",\"default\":\"./cjs/_check_private_redeclaration.cjs\"},\"./_/_class_apply_descriptor_destructure\":{\"import\":\"./esm/_class_apply_descriptor_destructure.js\",\"default\":\"./cjs/_class_apply_descriptor_destructure.cjs\"},\"./_/_class_apply_descriptor_get\":{\"import\":\"./esm/_class_apply_descriptor_get.js\",\"default\":\"./cjs/_class_apply_descriptor_get.cjs\"},\"./_/_class_apply_descriptor_set\":{\"import\":\"./esm/_class_apply_descriptor_set.js\",\"default\":\"./cjs/_class_apply_descriptor_set.cjs\"},\"./_/_class_apply_descriptor_update\":{\"import\":\"./esm/_class_apply_descriptor_update.js\",\"default\":\"./cjs/_class_apply_descriptor_update.cjs\"},\"./_/_class_call_check\":{\"import\":\"./esm/_class_call_check.js\",\"default\":\"./cjs/_class_call_check.cjs\"},\"./_/_class_check_private_static_access\":{\"import\":\"./esm/_class_check_private_static_access.js\",\"default\":\"./cjs/_class_check_private_static_access.cjs\"},\"./_/_class_check_private_static_field_descriptor\":{\"import\":\"./esm/_class_check_private_static_field_descriptor.js\",\"default\":\"./cjs/_class_check_private_static_field_descriptor.cjs\"},\"./_/_class_extract_field_descriptor\":{\"import\":\"./esm/_class_extract_field_descriptor.js\",\"default\":\"./cjs/_class_extract_field_descriptor.cjs\"},\"./_/_class_name_tdz_error\":{\"import\":\"./esm/_class_name_tdz_error.js\",\"default\":\"./cjs/_class_name_tdz_error.cjs\"},\"./_/_class_private_field_destructure\":{\"import\":\"./esm/_class_private_field_destructure.js\",\"default\":\"./cjs/_class_private_field_destructure.cjs\"},\"./_/_class_private_field_get\":{\"import\":\"./esm/_class_private_field_get.js\",\"default\":\"./cjs/_class_private_field_get.cjs\"},\"./_/_class_private_field_init\":{\"import\":\"./esm/_class_private_field_init.js\",\"default\":\"./cjs/_class_private_field_init.cjs\"},\"./_/_class_private_field_loose_base\":{\"import\":\"./esm/_class_private_field_loose_base.js\",\"default\":\"./cjs/_class_private_field_loose_base.cjs\"},\"./_/_class_private_field_loose_key\":{\"import\":\"./esm/_class_private_field_loose_key.js\",\"default\":\"./cjs/_class_private_field_loose_key.cjs\"},\"./_/_class_private_field_set\":{\"import\":\"./esm/_class_private_field_set.js\",\"default\":\"./cjs/_class_private_field_set.cjs\"},\"./_/_class_private_field_update\":{\"import\":\"./esm/_class_private_field_update.js\",\"default\":\"./cjs/_class_private_field_update.cjs\"},\"./_/_class_private_method_get\":{\"import\":\"./esm/_class_private_method_get.js\",\"default\":\"./cjs/_class_private_method_get.cjs\"},\"./_/_class_private_method_init\":{\"import\":\"./esm/_class_private_method_init.js\",\"default\":\"./cjs/_class_private_method_init.cjs\"},\"./_/_class_private_method_set\":{\"import\":\"./esm/_class_private_method_set.js\",\"default\":\"./cjs/_class_private_method_set.cjs\"},\"./_/_class_static_private_field_destructure\":{\"import\":\"./esm/_class_static_private_field_destructure.js\",\"default\":\"./cjs/_class_static_private_field_destructure.cjs\"},\"./_/_class_static_private_field_spec_get\":{\"import\":\"./esm/_class_static_private_field_spec_get.js\",\"default\":\"./cjs/_class_static_private_field_spec_get.cjs\"},\"./_/_class_static_private_field_spec_set\":{\"import\":\"./esm/_class_static_private_field_spec_set.js\",\"default\":\"./cjs/_class_static_private_field_spec_set.cjs\"},\"./_/_class_static_private_field_update\":{\"import\":\"./esm/_class_static_private_field_update.js\",\"default\":\"./cjs/_class_static_private_field_update.cjs\"},\"./_/_class_static_private_method_get\":{\"import\":\"./esm/_class_static_private_method_get.js\",\"default\":\"./cjs/_class_static_private_method_get.cjs\"},\"./_/_construct\":{\"import\":\"./esm/_construct.js\",\"default\":\"./cjs/_construct.cjs\"},\"./_/_create_class\":{\"import\":\"./esm/_create_class.js\",\"default\":\"./cjs/_create_class.cjs\"},\"./_/_create_for_of_iterator_helper_loose\":{\"import\":\"./esm/_create_for_of_iterator_helper_loose.js\",\"default\":\"./cjs/_create_for_of_iterator_helper_loose.cjs\"},\"./_/_create_super\":{\"import\":\"./esm/_create_super.js\",\"default\":\"./cjs/_create_super.cjs\"},\"./_/_decorate\":{\"import\":\"./esm/_decorate.js\",\"default\":\"./cjs/_decorate.cjs\"},\"./_/_defaults\":{\"import\":\"./esm/_defaults.js\",\"default\":\"./cjs/_defaults.cjs\"},\"./_/_define_enumerable_properties\":{\"import\":\"./esm/_define_enumerable_properties.js\",\"default\":\"./cjs/_define_enumerable_properties.cjs\"},\"./_/_define_property\":{\"import\":\"./esm/_define_property.js\",\"default\":\"./cjs/_define_property.cjs\"},\"./_/_dispose\":{\"import\":\"./esm/_dispose.js\",\"default\":\"./cjs/_dispose.cjs\"},\"./_/_export_star\":{\"import\":\"./esm/_export_star.js\",\"default\":\"./cjs/_export_star.cjs\"},\"./_/_extends\":{\"import\":\"./esm/_extends.js\",\"default\":\"./cjs/_extends.cjs\"},\"./_/_get\":{\"import\":\"./esm/_get.js\",\"default\":\"./cjs/_get.cjs\"},\"./_/_get_prototype_of\":{\"import\":\"./esm/_get_prototype_of.js\",\"default\":\"./cjs/_get_prototype_of.cjs\"},\"./_/_identity\":{\"import\":\"./esm/_identity.js\",\"default\":\"./cjs/_identity.cjs\"},\"./_/_inherits\":{\"import\":\"./esm/_inherits.js\",\"default\":\"./cjs/_inherits.cjs\"},\"./_/_inherits_loose\":{\"import\":\"./esm/_inherits_loose.js\",\"default\":\"./cjs/_inherits_loose.cjs\"},\"./_/_initializer_define_property\":{\"import\":\"./esm/_initializer_define_property.js\",\"default\":\"./cjs/_initializer_define_property.cjs\"},\"./_/_initializer_warning_helper\":{\"import\":\"./esm/_initializer_warning_helper.js\",\"default\":\"./cjs/_initializer_warning_helper.cjs\"},\"./_/_instanceof\":{\"import\":\"./esm/_instanceof.js\",\"default\":\"./cjs/_instanceof.cjs\"},\"./_/_interop_require_default\":{\"import\":\"./esm/_interop_require_default.js\",\"default\":\"./cjs/_interop_require_default.cjs\"},\"./_/_interop_require_wildcard\":{\"import\":\"./esm/_interop_require_wildcard.js\",\"default\":\"./cjs/_interop_require_wildcard.cjs\"},\"./_/_is_native_function\":{\"import\":\"./esm/_is_native_function.js\",\"default\":\"./cjs/_is_native_function.cjs\"},\"./_/_is_native_reflect_construct\":{\"import\":\"./esm/_is_native_reflect_construct.js\",\"default\":\"./cjs/_is_native_reflect_construct.cjs\"},\"./_/_iterable_to_array\":{\"import\":\"./esm/_iterable_to_array.js\",\"default\":\"./cjs/_iterable_to_array.cjs\"},\"./_/_iterable_to_array_limit\":{\"import\":\"./esm/_iterable_to_array_limit.js\",\"default\":\"./cjs/_iterable_to_array_limit.cjs\"},\"./_/_iterable_to_array_limit_loose\":{\"import\":\"./esm/_iterable_to_array_limit_loose.js\",\"default\":\"./cjs/_iterable_to_array_limit_loose.cjs\"},\"./_/_jsx\":{\"import\":\"./esm/_jsx.js\",\"default\":\"./cjs/_jsx.cjs\"},\"./_/_new_arrow_check\":{\"import\":\"./esm/_new_arrow_check.js\",\"default\":\"./cjs/_new_arrow_check.cjs\"},\"./_/_non_iterable_rest\":{\"import\":\"./esm/_non_iterable_rest.js\",\"default\":\"./cjs/_non_iterable_rest.cjs\"},\"./_/_non_iterable_spread\":{\"import\":\"./esm/_non_iterable_spread.js\",\"default\":\"./cjs/_non_iterable_spread.cjs\"},\"./_/_object_destructuring_empty\":{\"import\":\"./esm/_object_destructuring_empty.js\",\"default\":\"./cjs/_object_destructuring_empty.cjs\"},\"./_/_object_spread\":{\"import\":\"./esm/_object_spread.js\",\"default\":\"./cjs/_object_spread.cjs\"},\"./_/_object_spread_props\":{\"import\":\"./esm/_object_spread_props.js\",\"default\":\"./cjs/_object_spread_props.cjs\"},\"./_/_object_without_properties\":{\"import\":\"./esm/_object_without_properties.js\",\"default\":\"./cjs/_object_without_properties.cjs\"},\"./_/_object_without_properties_loose\":{\"import\":\"./esm/_object_without_properties_loose.js\",\"default\":\"./cjs/_object_without_properties_loose.cjs\"},\"./_/_possible_constructor_return\":{\"import\":\"./esm/_possible_constructor_return.js\",\"default\":\"./cjs/_possible_constructor_return.cjs\"},\"./_/_read_only_error\":{\"import\":\"./esm/_read_only_error.js\",\"default\":\"./cjs/_read_only_error.cjs\"},\"./_/_set\":{\"import\":\"./esm/_set.js\",\"default\":\"./cjs/_set.cjs\"},\"./_/_set_prototype_of\":{\"import\":\"./esm/_set_prototype_of.js\",\"default\":\"./cjs/_set_prototype_of.cjs\"},\"./_/_skip_first_generator_next\":{\"import\":\"./esm/_skip_first_generator_next.js\",\"default\":\"./cjs/_skip_first_generator_next.cjs\"},\"./_/_sliced_to_array\":{\"import\":\"./esm/_sliced_to_array.js\",\"default\":\"./cjs/_sliced_to_array.cjs\"},\"./_/_sliced_to_array_loose\":{\"import\":\"./esm/_sliced_to_array_loose.js\",\"default\":\"./cjs/_sliced_to_array_loose.cjs\"},\"./_/_super_prop_base\":{\"import\":\"./esm/_super_prop_base.js\",\"default\":\"./cjs/_super_prop_base.cjs\"},\"./_/_tagged_template_literal\":{\"import\":\"./esm/_tagged_template_literal.js\",\"default\":\"./cjs/_tagged_template_literal.cjs\"},\"./_/_tagged_template_literal_loose\":{\"import\":\"./esm/_tagged_template_literal_loose.js\",\"default\":\"./cjs/_tagged_template_literal_loose.cjs\"},\"./_/_throw\":{\"import\":\"./esm/_throw.js\",\"default\":\"./cjs/_throw.cjs\"},\"./_/_to_array\":{\"import\":\"./esm/_to_array.js\",\"default\":\"./cjs/_to_array.cjs\"},\"./_/_to_consumable_array\":{\"import\":\"./esm/_to_consumable_array.js\",\"default\":\"./cjs/_to_consumable_array.cjs\"},\"./_/_to_primitive\":{\"import\":\"./esm/_to_primitive.js\",\"default\":\"./cjs/_to_primitive.cjs\"},\"./_/_to_property_key\":{\"import\":\"./esm/_to_property_key.js\",\"default\":\"./cjs/_to_property_key.cjs\"},\"./_/_ts_add_disposable_resource\":{\"import\":\"./esm/_ts_add_disposable_resource.js\",\"default\":\"./cjs/_ts_add_disposable_resource.cjs\"},\"./_/_ts_decorate\":{\"import\":\"./esm/_ts_decorate.js\",\"default\":\"./cjs/_ts_decorate.cjs\"},\"./_/_ts_dispose_resources\":{\"import\":\"./esm/_ts_dispose_resources.js\",\"default\":\"./cjs/_ts_dispose_resources.cjs\"},\"./_/_ts_generator\":{\"import\":\"./esm/_ts_generator.js\",\"default\":\"./cjs/_ts_generator.cjs\"},\"./_/_ts_metadata\":{\"import\":\"./esm/_ts_metadata.js\",\"default\":\"./cjs/_ts_metadata.cjs\"},\"./_/_ts_param\":{\"import\":\"./esm/_ts_param.js\",\"default\":\"./cjs/_ts_param.cjs\"},\"./_/_ts_values\":{\"import\":\"./esm/_ts_values.js\",\"default\":\"./cjs/_ts_values.cjs\"},\"./_/_type_of\":{\"import\":\"./esm/_type_of.js\",\"default\":\"./cjs/_type_of.cjs\"},\"./_/_unsupported_iterable_to_array\":{\"import\":\"./esm/_unsupported_iterable_to_array.js\",\"default\":\"./cjs/_unsupported_iterable_to_array.cjs\"},\"./_/_update\":{\"import\":\"./esm/_update.js\",\"default\":\"./cjs/_update.cjs\"},\"./_/_using\":{\"import\":\"./esm/_using.js\",\"default\":\"./cjs/_using.cjs\"},\"./_/_using_ctx\":{\"import\":\"./esm/_using_ctx.js\",\"default\":\"./cjs/_using_ctx.cjs\"},\"./_/_wrap_async_generator\":{\"import\":\"./esm/_wrap_async_generator.js\",\"default\":\"./cjs/_wrap_async_generator.cjs\"},\"./_/_wrap_native_super\":{\"import\":\"./esm/_wrap_native_super.js\",\"default\":\"./cjs/_wrap_native_super.cjs\"},\"./_/_write_only_error\":{\"import\":\"./esm/_write_only_error.js\",\"default\":\"./cjs/_write_only_error.cjs\"},\"./_/index\":{\"import\":\"./esm/index.js\",\"default\":\"./cjs/index.cjs\"}}}"));}),
]);

//# sourceMappingURL=_2e72aa3a._.js.map