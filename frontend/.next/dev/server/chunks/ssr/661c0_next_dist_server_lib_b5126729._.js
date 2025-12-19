module.exports = [
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Node in the doubly-linked list used for LRU tracking.
 * Each node represents a cache entry with bidirectional pointers.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LRUCache", {
    enumerable: true,
    get: function() {
        return LRUCache;
    }
});
class LRUNode {
    constructor(key, data, size){
        this.prev = null;
        this.next = null;
        this.key = key;
        this.data = data;
        this.size = size;
    }
}
/**
 * Sentinel node used for head/tail boundaries.
 * These nodes don't contain actual cache data but simplify list operations.
 */ class SentinelNode {
    constructor(){
        this.prev = null;
        this.next = null;
    }
}
class LRUCache {
    constructor(maxSize, calculateSize){
        this.cache = new Map();
        this.totalSize = 0;
        this.maxSize = maxSize;
        this.calculateSize = calculateSize;
        // Create sentinel nodes to simplify doubly-linked list operations
        // HEAD <-> TAIL (empty list)
        this.head = new SentinelNode();
        this.tail = new SentinelNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    /**
   * Adds a node immediately after the head (marks as most recently used).
   * Used when inserting new items or when an item is accessed.
   * PRECONDITION: node must be disconnected (prev/next should be null)
   */ addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        // head.next is always non-null (points to tail or another node)
        this.head.next.prev = node;
        this.head.next = node;
    }
    /**
   * Removes a node from its current position in the doubly-linked list.
   * Updates the prev/next pointers of adjacent nodes to maintain list integrity.
   * PRECONDITION: node must be connected (prev/next are non-null)
   */ removeNode(node) {
        // Connected nodes always have non-null prev/next
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    /**
   * Moves an existing node to the head position (marks as most recently used).
   * This is the core LRU operation - accessed items become most recent.
   */ moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    /**
   * Removes and returns the least recently used node (the one before tail).
   * This is called during eviction when the cache exceeds capacity.
   * PRECONDITION: cache is not empty (ensured by caller)
   */ removeTail() {
        const lastNode = this.tail.prev;
        // tail.prev is always non-null and always LRUNode when cache is not empty
        this.removeNode(lastNode);
        return lastNode;
    }
    /**
   * Sets a key-value pair in the cache.
   * If the key exists, updates the value and moves to head.
   * If new, adds at head and evicts from tail if necessary.
   *
   * Time Complexity:
   * - O(1) for uniform item sizes
   * - O(k) where k is the number of items evicted (can be O(N) for variable sizes)
   */ set(key, value) {
        const size = (this.calculateSize == null ? void 0 : this.calculateSize.call(this, value)) ?? 1;
        if (size > this.maxSize) {
            console.warn('Single item size exceeds maxSize');
            return;
        }
        const existing = this.cache.get(key);
        if (existing) {
            // Update existing node: adjust size and move to head (most recent)
            existing.data = value;
            this.totalSize = this.totalSize - existing.size + size;
            existing.size = size;
            this.moveToHead(existing);
        } else {
            // Add new node at head (most recent position)
            const newNode = new LRUNode(key, value, size);
            this.cache.set(key, newNode);
            this.addToHead(newNode);
            this.totalSize += size;
        }
        // Evict least recently used items until under capacity
        while(this.totalSize > this.maxSize && this.cache.size > 0){
            const tail = this.removeTail();
            this.cache.delete(tail.key);
            this.totalSize -= tail.size;
        }
    }
    /**
   * Checks if a key exists in the cache.
   * This is a pure query operation - does NOT update LRU order.
   *
   * Time Complexity: O(1)
   */ has(key) {
        return this.cache.has(key);
    }
    /**
   * Retrieves a value by key and marks it as most recently used.
   * Moving to head maintains the LRU property for future evictions.
   *
   * Time Complexity: O(1)
   */ get(key) {
        const node = this.cache.get(key);
        if (!node) return undefined;
        // Mark as most recently used by moving to head
        this.moveToHead(node);
        return node.data;
    }
    /**
   * Returns an iterator over the cache entries. The order is outputted in the
   * order of most recently used to least recently used.
   */ *[Symbol.iterator]() {
        let current = this.head.next;
        while(current && current !== this.tail){
            // Between head and tail, current is always LRUNode
            const node = current;
            yield [
                node.key,
                node.data
            ];
            current = current.next;
        }
    }
    /**
   * Removes a specific key from the cache.
   * Updates both the hash map and doubly-linked list.
   *
   * Time Complexity: O(1)
   */ remove(key) {
        const node = this.cache.get(key);
        if (!node) return;
        this.removeNode(node);
        this.cache.delete(key);
        this.totalSize -= node.size;
    }
    /**
   * Returns the number of items in the cache.
   */ get size() {
        return this.cache.size;
    }
    /**
   * Returns the current total size of all cached items.
   * This uses the custom size calculation if provided.
   */ get currentSize() {
        return this.totalSize;
    }
} //# sourceMappingURL=lru-cache.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/experimental/ppr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * If set to `incremental`, only those leaf pages that export
 * `experimental_ppr = true` will have partial prerendering enabled. If any
 * page exports this value as `false` or does not export it at all will not
 * have partial prerendering enabled. If set to a boolean, the options for
 * `experimental_ppr` will be ignored.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    checkIsAppPPREnabled: null,
    checkIsRoutePPREnabled: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    checkIsAppPPREnabled: function() {
        return checkIsAppPPREnabled;
    },
    checkIsRoutePPREnabled: function() {
        return checkIsRoutePPREnabled;
    }
});
function checkIsAppPPREnabled(config) {
    // If the config is undefined, partial prerendering is disabled.
    if (typeof config === 'undefined') return false;
    // If the config is a boolean, use it directly.
    if (typeof config === 'boolean') return config;
    // If the config is a string, it must be 'incremental' to enable partial
    // prerendering.
    if (config === 'incremental') return true;
    return false;
}
function checkIsRoutePPREnabled(config) {
    // If the config is undefined, partial prerendering is disabled.
    if (typeof config === 'undefined') return false;
    // If the config is a boolean, use it directly.
    if (typeof config === 'boolean') return config;
    return false;
} //# sourceMappingURL=ppr.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/source-maps.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    devirtualizeReactServerURL: null,
    filterStackFrameDEV: null,
    findApplicableSourceMapPayload: null,
    findSourceMapURLDEV: null,
    ignoreListAnonymousStackFramesIfSandwiched: null,
    sourceMapIgnoreListsEverything: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    devirtualizeReactServerURL: function() {
        return devirtualizeReactServerURL;
    },
    filterStackFrameDEV: function() {
        return filterStackFrameDEV;
    },
    findApplicableSourceMapPayload: function() {
        return findApplicableSourceMapPayload;
    },
    findSourceMapURLDEV: function() {
        return findSourceMapURLDEV;
    },
    ignoreListAnonymousStackFramesIfSandwiched: function() {
        return ignoreListAnonymousStackFramesIfSandwiched;
    },
    sourceMapIgnoreListsEverything: function() {
        return sourceMapIgnoreListsEverything;
    }
});
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-ssr] (ecmascript)");
function noSourceMap() {
    return undefined;
}
// Edge runtime does not implement `module`
const findSourceMap = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : __turbopack_context__.r("[externals]/module [external] (module, cjs)").findSourceMap;
function sourceMapIgnoreListsEverything(sourceMap) {
    return sourceMap.ignoreList !== undefined && sourceMap.sources.length === sourceMap.ignoreList.length;
}
function findApplicableSourceMapPayload(line0, column0, payload) {
    if ('sections' in payload) {
        if (payload.sections.length === 0) {
            return undefined;
        }
        // Sections must not overlap and must be sorted: https://tc39.es/source-map/#section-object
        // Therefore the last section that has an offset less than or equal to the frame is the applicable one.
        const sections = payload.sections;
        let left = 0;
        let right = sections.length - 1;
        let result = null;
        while(left <= right){
            // fast Math.floor
            const middle = ~~((left + right) / 2);
            const section = sections[middle];
            const offset = section.offset;
            if (offset.line < line0 || offset.line === line0 && offset.column <= column0) {
                result = section;
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return result === null ? undefined : result.map;
    } else {
        return payload;
    }
}
const didWarnAboutInvalidSourceMapDEV = new Set();
function filterStackFrameDEV(sourceURL, functionName, line1, column1) {
    if (sourceURL === '') {
        // The default implementation filters out <anonymous> stack frames
        // but we want to retain them because current Server Components and
        // built-in Components in parent stacks don't have source location.
        // Filter out frames that show up in Promises to get good names in React's
        // Server Request track until we come up with a better heuristic.
        return functionName !== 'new Promise';
    }
    if (sourceURL.startsWith('node:') || sourceURL.includes('node_modules')) {
        return false;
    }
    try {
        // Node.js loads source maps eagerly so this call is cheap.
        // TODO: ESM sourcemaps are O(1) but CommonJS sourcemaps are O(Number of CJS modules).
        // Make sure this doesn't adversely affect performance when CJS is used by Next.js.
        const sourceMap = findSourceMap(sourceURL);
        if (sourceMap === undefined) {
            // No source map assoicated.
            // TODO: Node.js types should reflect that `findSourceMap` can return `undefined`.
            return true;
        }
        const sourceMapPayload = findApplicableSourceMapPayload(line1 - 1, column1 - 1, sourceMap.payload);
        if (sourceMapPayload === undefined) {
            // No source map section applicable to the frame.
            return true;
        }
        return !sourceMapIgnoreListsEverything(sourceMapPayload);
    } catch (cause) {
        if ("TURBOPACK compile-time truthy", 1) {
            // TODO: Share cache with patch-error-inspect
            if (!didWarnAboutInvalidSourceMapDEV.has(sourceURL)) {
                didWarnAboutInvalidSourceMapDEV.add(sourceURL);
                // We should not log an actual error instance here because that will re-enter
                // this codepath during error inspection and could lead to infinite recursion.
                console.error(`${sourceURL}: Invalid source map. Only conformant source maps can be used to filter stack frames. Cause: ${cause}`);
            }
        }
        return true;
    }
}
const invalidSourceMap = Symbol('invalid-source-map');
const sourceMapURLs = new _lrucache.LRUCache(512 * 1024 * 1024, (url)=>url === invalidSourceMap ? 8 * 1024 : url.length);
function findSourceMapURLDEV(scriptNameOrSourceURL) {
    let sourceMapURL = sourceMapURLs.get(scriptNameOrSourceURL);
    if (sourceMapURL === undefined) {
        let sourceMapPayload;
        try {
            var _findSourceMap;
            sourceMapPayload = (_findSourceMap = findSourceMap(scriptNameOrSourceURL)) == null ? void 0 : _findSourceMap.payload;
        } catch (cause) {
            console.error(`${scriptNameOrSourceURL}: Invalid source map. Only conformant source maps can be used to find the original code. Cause: ${cause}`);
        }
        if (sourceMapPayload === undefined) {
            sourceMapURL = invalidSourceMap;
        } else {
            // TODO: Might be more efficient to extract the relevant section from Index Maps.
            // Unclear if that search is worth the smaller payload we have to stringify.
            const sourceMapJSON = JSON.stringify(sourceMapPayload);
            const sourceMapURLData = Buffer.from(sourceMapJSON, 'utf8').toString('base64');
            sourceMapURL = `data:application/json;base64,${sourceMapURLData}`;
        }
        sourceMapURLs.set(scriptNameOrSourceURL, sourceMapURL);
    }
    return sourceMapURL === invalidSourceMap ? null : sourceMapURL;
}
function devirtualizeReactServerURL(sourceURL) {
    if (sourceURL.startsWith('about://React/')) {
        // about://React/Server/file://<filename>?42 => file://<filename>
        const envIdx = sourceURL.indexOf('/', 'about://React/'.length);
        const suffixIdx = sourceURL.lastIndexOf('?');
        if (envIdx > -1 && suffixIdx > -1) {
            return decodeURI(sourceURL.slice(envIdx + 1, suffixIdx));
        }
    }
    return sourceURL;
}
function isAnonymousFrameLikelyJSNative(methodName) {
    // Anonymous frames can also be produced in React parent stacks either from
    // host components or Server Components. We don't want to ignore those.
    // This could hide user-space methods that are named like native JS methods but
    // should you really do that?
    return methodName.startsWith('JSON.') || // E.g. Promise.withResolves
    methodName.startsWith('Function.') || // various JS built-ins
    methodName.startsWith('Promise.') || methodName.startsWith('Array.') || methodName.startsWith('Set.') || methodName.startsWith('Map.');
}
function ignoreListAnonymousStackFramesIfSandwiched(frames, isAnonymousFrame, isIgnoredFrame, getMethodName, /** only passes frames for which `isAnonymousFrame` and their method is a native JS method or `isIgnoredFrame` return true */ ignoreFrame) {
    for(let i = 1; i < frames.length; i++){
        const currentFrame = frames[i];
        if (!(isAnonymousFrame(currentFrame) && isAnonymousFrameLikelyJSNative(getMethodName(currentFrame)))) {
            continue;
        }
        const previousFrameIsIgnored = isIgnoredFrame(frames[i - 1]);
        if (previousFrameIsIgnored && i < frames.length - 1) {
            let ignoreSandwich = false;
            let j = i + 1;
            for(j; j < frames.length; j++){
                const nextFrame = frames[j];
                const nextFrameIsAnonymous = isAnonymousFrame(nextFrame) && isAnonymousFrameLikelyJSNative(getMethodName(nextFrame));
                if (nextFrameIsAnonymous) {
                    continue;
                }
                const nextFrameIsIgnored = isIgnoredFrame(nextFrame);
                if (nextFrameIsIgnored) {
                    ignoreSandwich = true;
                    break;
                }
            }
            if (ignoreSandwich) {
                for(i; i < j; i++){
                    ignoreFrame(frames[i]);
                }
            }
        }
    }
} //# sourceMappingURL=source-maps.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/parse-stack.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseStack", {
    enumerable: true,
    get: function() {
        return parseStack;
    }
});
const _stacktraceparser = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/stacktrace-parser/stack-trace-parser.cjs.js [app-ssr] (ecmascript)");
const regexNextStatic = /\/_next(\/static\/.+)/;
function parseStack(stack, distDir = process.env.__NEXT_DIST_DIR) {
    if (!stack) return [];
    // throw away eval information that stacktrace-parser doesn't support
    // adapted from https://github.com/stacktracejs/error-stack-parser/blob/9f33c224b5d7b607755eb277f9d51fcdb7287e24/error-stack-parser.js#L59C33-L59C62
    stack = stack.split('\n').map((line)=>{
        if (line.includes('(eval ')) {
            line = line.replace(/eval code/g, 'eval').replace(/\(eval at [^()]* \(/, '(file://').replace(/\),.*$/g, ')');
        }
        return line;
    }).join('\n');
    const frames = (0, _stacktraceparser.parse)(stack);
    return frames.map((frame)=>{
        try {
            const url = new URL(frame.file);
            const res = regexNextStatic.exec(url.pathname);
            if (res) {
                var _distDir_replace;
                const effectiveDistDir = distDir == null ? void 0 : (_distDir_replace = distDir.replace(/\\/g, '/')) == null ? void 0 : _distDir_replace.replace(/\/$/, '');
                if (effectiveDistDir) {
                    frame.file = 'file://' + effectiveDistDir.concat(res.pop()) + url.search;
                }
            }
        } catch  {}
        return {
            file: frame.file,
            line1: frame.lineNumber,
            column1: frame.column,
            methodName: frame.methodName,
            arguments: frame.arguments
        };
    });
} //# sourceMappingURL=parse-stack.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/find-page-file.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createValidFileMatcher: null,
    findPageFile: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createValidFileMatcher: function() {
        return createValidFileMatcher;
    },
    findPageFile: function() {
        return findPageFile;
    }
});
const _fileexists = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/file-exists.js [app-ssr] (ecmascript)");
const _getpagepaths = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/get-page-paths.js [app-ssr] (ecmascript)");
const _nonnullable = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/non-nullable.js [app-ssr] (ecmascript)");
const _path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const _fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const _log = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-ssr] (ecmascript)");
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-ssr] (ecmascript)");
const _ismetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/is-metadata-route.js [app-ssr] (ecmascript)");
async function isTrueCasePagePath(pagePath, pagesDir) {
    const pageSegments = (0, _path.normalize)(pagePath).split(_path.sep).filter(Boolean);
    const segmentExistsPromises = pageSegments.map(async (segment, i)=>{
        const segmentParentDir = (0, _path.join)(pagesDir, ...pageSegments.slice(0, i));
        const parentDirEntries = await _fs.promises.readdir(segmentParentDir);
        return parentDirEntries.includes(segment);
    });
    return (await Promise.all(segmentExistsPromises)).every(Boolean);
}
async function findPageFile(pagesDir, normalizedPagePath, pageExtensions, isAppDir) {
    const pagePaths = (0, _getpagepaths.getPagePaths)(normalizedPagePath, pageExtensions, isAppDir);
    const [existingPath, ...others] = (await Promise.all(pagePaths.map(async (path)=>{
        const filePath = (0, _path.join)(pagesDir, path);
        try {
            return await (0, _fileexists.fileExists)(filePath) ? path : null;
        } catch (err) {
            var _err_code;
            if (!(err == null ? void 0 : (_err_code = err.code) == null ? void 0 : _err_code.includes('ENOTDIR'))) throw err;
        }
        return null;
    }))).filter(_nonnullable.nonNullable);
    if (!existingPath) {
        return null;
    }
    if (!await isTrueCasePagePath(existingPath, pagesDir)) {
        return null;
    }
    if (others.length > 0) {
        (0, _log.warn)(`Duplicate page detected. ${(0, _picocolors.cyan)((0, _path.join)('pages', existingPath))} and ${(0, _picocolors.cyan)((0, _path.join)('pages', others[0]))} both resolve to ${(0, _picocolors.cyan)(normalizedPagePath)}.`);
    }
    return existingPath;
}
function createValidFileMatcher(pageExtensions, appDirPath) {
    const getExtensionRegexString = (extensions)=>`(?:${extensions.join('|')})`;
    const validExtensionFileRegex = new RegExp('\\.' + getExtensionRegexString(pageExtensions) + '$');
    const leafOnlyPageFileRegex = new RegExp(`(^(page|route)|[\\\\/](page|route))\\.${getExtensionRegexString(pageExtensions)}$`);
    const leafOnlyRouteFileRegex = new RegExp(`(^route|[\\\\/]route)\\.${getExtensionRegexString(pageExtensions)}$`);
    const leafOnlyLayoutFileRegex = new RegExp(`(^(layout)|[\\\\/](layout))\\.${getExtensionRegexString(pageExtensions)}$`);
    const rootNotFoundFileRegex = new RegExp(`^not-found\\.${getExtensionRegexString(pageExtensions)}$`);
    const leafOnlyDefaultFileRegex = new RegExp(`(^(default)|[\\\\/](default))\\.${getExtensionRegexString(pageExtensions)}$`);
    /** TODO-METADATA: support other metadata routes
   *  regex for:
   *
   * /robots.txt|<ext>
   * /sitemap.xml|<ext>
   * /favicon.ico
   * /manifest.json|<ext>
   * <route>/icon.png|jpg|<ext>
   * <route>/apple-touch-icon.png|jpg|<ext>
   *
   */ /**
   * Match the file if it's a metadata route file, static: if the file is a static metadata file.
   * It needs to be a file which doesn't match the custom metadata routes e.g. `app/robots.txt/route.js`
   */ function isMetadataFile(filePath) {
        const appDirRelativePath = appDirPath ? filePath.replace(appDirPath, '') : filePath;
        return (0, _ismetadataroute.isMetadataRouteFile)(appDirRelativePath, pageExtensions, true);
    }
    // Determine if the file is leaf node page file or route file under layouts,
    // 'page.<extension>' | 'route.<extension>'
    function isAppRouterPage(filePath) {
        return leafOnlyPageFileRegex.test(filePath) || isMetadataFile(filePath);
    }
    // Determine if the file is leaf node route file under app directory
    function isAppRouterRoute(filePath) {
        return leafOnlyRouteFileRegex.test(filePath);
    }
    function isAppLayoutPage(filePath) {
        return leafOnlyLayoutFileRegex.test(filePath);
    }
    function isAppDefaultPage(filePath) {
        return leafOnlyDefaultFileRegex.test(filePath);
    }
    function isPageFile(filePath) {
        return validExtensionFileRegex.test(filePath) || isMetadataFile(filePath);
    }
    function isRootNotFound(filePath) {
        if (!appDirPath) {
            return false;
        }
        if (!filePath.startsWith(appDirPath + _path.sep)) {
            return false;
        }
        const rest = filePath.slice(appDirPath.length + 1);
        return rootNotFoundFileRegex.test(rest);
    }
    return {
        isPageFile,
        isAppRouterPage,
        isAppRouterRoute,
        isAppLayoutPage,
        isAppDefaultPage,
        isMetadataFile,
        isRootNotFound
    };
} //# sourceMappingURL=find-page-file.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/trace/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    AppRenderSpan: null,
    AppRouteRouteHandlersSpan: null,
    BaseServerSpan: null,
    LoadComponentsSpan: null,
    LogSpanAllowList: null,
    MiddlewareSpan: null,
    NextNodeServerSpan: null,
    NextServerSpan: null,
    NextVanillaSpanAllowlist: null,
    NodeSpan: null,
    RenderSpan: null,
    ResolveMetadataSpan: null,
    RouterSpan: null,
    StartServerSpan: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRenderSpan: function() {
        return AppRenderSpan;
    },
    AppRouteRouteHandlersSpan: function() {
        return AppRouteRouteHandlersSpan;
    },
    BaseServerSpan: function() {
        return BaseServerSpan;
    },
    LoadComponentsSpan: function() {
        return LoadComponentsSpan;
    },
    LogSpanAllowList: function() {
        return LogSpanAllowList;
    },
    MiddlewareSpan: function() {
        return MiddlewareSpan;
    },
    NextNodeServerSpan: function() {
        return NextNodeServerSpan;
    },
    NextServerSpan: function() {
        return NextServerSpan;
    },
    NextVanillaSpanAllowlist: function() {
        return NextVanillaSpanAllowlist;
    },
    NodeSpan: function() {
        return NodeSpan;
    },
    RenderSpan: function() {
        return RenderSpan;
    },
    ResolveMetadataSpan: function() {
        return ResolveMetadataSpan;
    },
    RouterSpan: function() {
        return RouterSpan;
    },
    StartServerSpan: function() {
        return StartServerSpan;
    }
});
var BaseServerSpan = /*#__PURE__*/ function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
    return BaseServerSpan;
}(BaseServerSpan || {});
var LoadComponentsSpan = /*#__PURE__*/ function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
    return LoadComponentsSpan;
}(LoadComponentsSpan || {});
var NextServerSpan = /*#__PURE__*/ function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getRequestHandlerWithMetadata"] = "NextServer.getRequestHandlerWithMetadata";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
    return NextServerSpan;
}(NextServerSpan || {});
var NextNodeServerSpan = /*#__PURE__*/ function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["createComponentTree"] = "NextNodeServer.createComponentTree";
    NextNodeServerSpan["clientComponentLoading"] = "NextNodeServer.clientComponentLoading";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["startResponse"] = "NextNodeServer.startResponse";
    // nested inner span, does not require parent scope name
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
    return NextNodeServerSpan;
}(NextNodeServerSpan || {});
var StartServerSpan = /*#__PURE__*/ function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
    return StartServerSpan;
}(StartServerSpan || {});
var RenderSpan = /*#__PURE__*/ function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
    return RenderSpan;
}(RenderSpan || {});
var AppRenderSpan = /*#__PURE__*/ function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
    return AppRenderSpan;
}(AppRenderSpan || {});
var RouterSpan = /*#__PURE__*/ function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
    return RouterSpan;
}(RouterSpan || {});
var NodeSpan = /*#__PURE__*/ function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
    return NodeSpan;
}(NodeSpan || {});
var AppRouteRouteHandlersSpan = /*#__PURE__*/ function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
    return AppRouteRouteHandlersSpan;
}(AppRouteRouteHandlersSpan || {});
var ResolveMetadataSpan = /*#__PURE__*/ function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
    return ResolveMetadataSpan;
}(ResolveMetadataSpan || {});
var MiddlewareSpan = /*#__PURE__*/ function(MiddlewareSpan) {
    MiddlewareSpan["execute"] = "Middleware.execute";
    return MiddlewareSpan;
}(MiddlewareSpan || {});
const NextVanillaSpanAllowlist = new Set([
    "Middleware.execute",
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule",
    "NextNodeServer.startResponse",
    "NextNodeServer.clientComponentLoading"
]);
const LogSpanAllowList = new Set([
    "NextNodeServer.findPageComponents",
    "NextNodeServer.createComponentTree",
    "NextNodeServer.clientComponentLoading"
]); //# sourceMappingURL=constants.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/trace/tracer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BubbledError: null,
    SpanKind: null,
    SpanStatusCode: null,
    getTracer: null,
    isBubbledError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BubbledError: function() {
        return BubbledError;
    },
    SpanKind: function() {
        return SpanKind;
    },
    SpanStatusCode: function() {
        return SpanStatusCode;
    },
    getTracer: function() {
        return getTracer;
    },
    isBubbledError: function() {
        return isBubbledError;
    }
});
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/trace/constants.js [app-ssr] (ecmascript)");
const _isthenable = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/is-thenable.js [app-ssr] (ecmascript)");
const NEXT_OTEL_PERFORMANCE_PREFIX = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    try {
        api = __turbopack_context__.r("[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)");
    } catch (err) {
        api = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/@opentelemetry/api/index.js [app-ssr] (ecmascript)");
    }
}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
class BubbledError extends Error {
    constructor(bubble, result){
        super(), this.bubble = bubble, this.result = result;
    }
}
function isBubbledError(error) {
    if (typeof error !== 'object' || error === null) return false;
    return error instanceof BubbledError;
}
const closeSpanWithError = (span, error)=>{
    if (isBubbledError(error) && error.bubble) {
        span.setAttribute('next.bubble', true);
    } else {
        if (error) {
            span.recordException(error);
            span.setAttribute('error.type', error.name);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey('next.rootSpanId');
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
const clientTraceDataSetter = {
    set (carrier, key, value) {
        carrier.push({
            key,
            value
        });
    }
};
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer('next.js', '0.0.1');
    }
    getContext() {
        return context;
    }
    getTracePropagationData() {
        const activeContext = context.active();
        const entries = [];
        propagation.inject(activeContext, entries, clientTraceDataSetter);
        return entries;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    withPropagatedContext(carrier, fn, getter) {
        const activeContext = context.active();
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === 'function' ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        const spanName = options.spanName ?? type;
        if (!_constants.NextVanillaSpanAllowlist.has(type) && process.env.NEXT_OTEL_VERBOSE !== '1' || options.hideSpan) {
            return fn();
        }
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        if (!spanContext) {
            spanContext = (context == null ? void 0 : context.active()) ?? ROOT_CONTEXT;
        }
        // Check if there's already a root span in the store for this trace
        // We are intentionally not checking whether there is an active context
        // from outside of nextjs to ensure that we can provide the same level
        // of telemetry when using a custom server
        const existingRootSpanId = spanContext.getValue(rootSpanIdKey);
        const isRootSpan = typeof existingRootSpanId !== 'number' || !rootSpanAttributesStore.has(existingRootSpanId);
        const spanId = getSpanId();
        options.attributes = {
            'next.span_name': spanName,
            'next.span_type': type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                let startTime;
                if (NEXT_OTEL_PERFORMANCE_PREFIX && type && _constants.LogSpanAllowList.has(type)) {
                    startTime = 'performance' in globalThis && 'measure' in performance ? globalThis.performance.now() : undefined;
                }
                let cleanedUp = false;
                const onCleanup = ()=>{
                    if (cleanedUp) return;
                    cleanedUp = true;
                    rootSpanAttributesStore.delete(spanId);
                    if (startTime) {
                        performance.measure(`${NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(type.split('.').pop() || '').replace(/[A-Z]/g, (match)=>'-' + match.toLowerCase())}`, {
                            start: startTime,
                            end: performance.now()
                        });
                    }
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                if (fn.length > 1) {
                    try {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    } catch (err) {
                        closeSpanWithError(span, err);
                        throw err;
                    } finally{
                        onCleanup();
                    }
                }
                try {
                    const result = fn(span);
                    if ((0, _isthenable.isThenable)(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!_constants.NextVanillaSpanAllowlist.has(name) && process.env.NEXT_OTEL_VERBOSE !== '1') {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === 'function' && typeof fn === 'function') {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === 'function') {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
    setRootSpanAttribute(key, value) {
        const spanId = context.active().getValue(rootSpanIdKey);
        const attributes = rootSpanAttributesStore.get(spanId);
        if (attributes && !attributes.has(key)) {
            attributes.set(key, value);
        }
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})(); //# sourceMappingURL=tracer.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/router-server-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    RouterServerContextSymbol: null,
    routerServerGlobal: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RouterServerContextSymbol: function() {
        return RouterServerContextSymbol;
    },
    routerServerGlobal: function() {
        return routerServerGlobal;
    }
});
const RouterServerContextSymbol = Symbol.for('@next/router-server-methods');
const routerServerGlobal = globalThis; //# sourceMappingURL=router-server-context.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/app-dir-module.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getComponentTypeModule: null,
    getLayoutOrPageModule: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getComponentTypeModule: function() {
        return getComponentTypeModule;
    },
    getLayoutOrPageModule: function() {
        return getLayoutOrPageModule;
    }
});
const _segment = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/segment.js [app-ssr] (ecmascript)");
async function getLayoutOrPageModule(loaderTree) {
    const { layout, page, defaultPage } = loaderTree[2];
    const isLayout = typeof layout !== 'undefined';
    const isPage = typeof page !== 'undefined';
    const isDefaultPage = typeof defaultPage !== 'undefined' && loaderTree[0] === _segment.DEFAULT_SEGMENT_KEY;
    let mod = undefined;
    let modType = undefined;
    let filePath = undefined;
    if (isLayout) {
        mod = await layout[0]();
        modType = 'layout';
        filePath = layout[1];
    } else if (isPage) {
        mod = await page[0]();
        modType = 'page';
        filePath = page[1];
    } else if (isDefaultPage) {
        mod = await defaultPage[0]();
        modType = 'page';
        filePath = defaultPage[1];
    }
    return {
        mod,
        modType,
        filePath
    };
}
async function getComponentTypeModule(loaderTree, moduleType) {
    const { [moduleType]: module1 } = loaderTree[2];
    if (typeof module1 !== 'undefined') {
        return await module1[0]();
    }
    return undefined;
} //# sourceMappingURL=app-dir-module.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/incremental-cache/file-system-cache.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return FileSystemCache;
    }
});
const _responsecache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/response-cache/index.js [app-ssr] (ecmascript)");
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/isomorphic/path.js [app-ssr] (ecmascript)"));
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-ssr] (ecmascript)");
const _tagsmanifestexternal = __turbopack_context__.r("[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)");
const _multifilewriter = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/multi-file-writer.js [app-ssr] (ecmascript)");
const _memorycacheexternal = __turbopack_context__.r("[externals]/next/dist/server/lib/incremental-cache/memory-cache.external.js [external] (next/dist/server/lib/incremental-cache/memory-cache.external.js, cjs)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class FileSystemCache {
    static #_ = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
    constructor(ctx){
        this.fs = ctx.fs;
        this.flushToDisk = ctx.flushToDisk;
        this.serverDistDir = ctx.serverDistDir;
        this.revalidatedTags = ctx.revalidatedTags;
        if (ctx.maxMemoryCacheSize) {
            if (!FileSystemCache.memoryCache) {
                if (FileSystemCache.debug) {
                    console.log('FileSystemCache: using memory store for fetch cache');
                }
                FileSystemCache.memoryCache = (0, _memorycacheexternal.getMemoryCache)(ctx.maxMemoryCacheSize);
            } else if (FileSystemCache.debug) {
                console.log('FileSystemCache: memory store already initialized');
            }
        } else if (FileSystemCache.debug) {
            console.log('FileSystemCache: not using memory store for fetch cache');
        }
    }
    resetRequestCache() {}
    async revalidateTag(tags, durations) {
        tags = typeof tags === 'string' ? [
            tags
        ] : tags;
        if (FileSystemCache.debug) {
            console.log('FileSystemCache: revalidateTag', tags, durations);
        }
        if (tags.length === 0) {
            return;
        }
        const now = Date.now();
        for (const tag of tags){
            const existingEntry = _tagsmanifestexternal.tagsManifest.get(tag) || {};
            if (durations) {
                // Use provided durations directly
                const updates = {
                    ...existingEntry
                };
                // mark as stale immediately
                updates.stale = now;
                if (durations.expire !== undefined) {
                    updates.expired = now + durations.expire * 1000 // Convert seconds to ms
                    ;
                }
                _tagsmanifestexternal.tagsManifest.set(tag, updates);
            } else {
                // Update expired field for immediate expiration (default behavior when no durations provided)
                _tagsmanifestexternal.tagsManifest.set(tag, {
                    ...existingEntry,
                    expired: now
                });
            }
        }
    }
    async get(...args) {
        var _FileSystemCache_memoryCache, _data_value, _data_value1, _data_value2, _data_value3;
        const [key, ctx] = args;
        const { kind } = ctx;
        let data = (_FileSystemCache_memoryCache = FileSystemCache.memoryCache) == null ? void 0 : _FileSystemCache_memoryCache.get(key);
        if (FileSystemCache.debug) {
            if (kind === _responsecache.IncrementalCacheKind.FETCH) {
                console.log('FileSystemCache: get', key, ctx.tags, kind, !!data);
            } else {
                console.log('FileSystemCache: get', key, kind, !!data);
            }
        }
        // let's check the disk for seed data
        if (!data && ("TURBOPACK compile-time value", "nodejs") !== 'edge') {
            try {
                if (kind === _responsecache.IncrementalCacheKind.APP_ROUTE) {
                    const filePath = this.getFilePath(`${key}.body`, _responsecache.IncrementalCacheKind.APP_ROUTE);
                    const fileData = await this.fs.readFile(filePath);
                    const { mtime } = await this.fs.stat(filePath);
                    const meta = JSON.parse(await this.fs.readFile(filePath.replace(/\.body$/, _constants.NEXT_META_SUFFIX), 'utf8'));
                    data = {
                        lastModified: mtime.getTime(),
                        value: {
                            kind: _responsecache.CachedRouteKind.APP_ROUTE,
                            body: fileData,
                            headers: meta.headers,
                            status: meta.status
                        }
                    };
                } else {
                    const filePath = this.getFilePath(kind === _responsecache.IncrementalCacheKind.FETCH ? key : `${key}.html`, kind);
                    const fileData = await this.fs.readFile(filePath, 'utf8');
                    const { mtime } = await this.fs.stat(filePath);
                    if (kind === _responsecache.IncrementalCacheKind.FETCH) {
                        var _data_value4;
                        const { tags, fetchIdx, fetchUrl } = ctx;
                        if (!this.flushToDisk) return null;
                        const lastModified = mtime.getTime();
                        const parsedData = JSON.parse(fileData);
                        data = {
                            lastModified,
                            value: parsedData
                        };
                        if (((_data_value4 = data.value) == null ? void 0 : _data_value4.kind) === _responsecache.CachedRouteKind.FETCH) {
                            var _data_value5;
                            const storedTags = (_data_value5 = data.value) == null ? void 0 : _data_value5.tags;
                            // update stored tags if a new one is being added
                            // TODO: remove this when we can send the tags
                            // via header on GET same as SET
                            if (!(tags == null ? void 0 : tags.every((tag)=>storedTags == null ? void 0 : storedTags.includes(tag)))) {
                                if (FileSystemCache.debug) {
                                    console.log('FileSystemCache: tags vs storedTags mismatch', tags, storedTags);
                                }
                                await this.set(key, data.value, {
                                    fetchCache: true,
                                    tags,
                                    fetchIdx,
                                    fetchUrl
                                });
                            }
                        }
                    } else if (kind === _responsecache.IncrementalCacheKind.APP_PAGE) {
                        // We try to load the metadata file, but if it fails, we don't
                        // error. We also don't load it if this is a fallback.
                        let meta;
                        try {
                            meta = JSON.parse(await this.fs.readFile(filePath.replace(/\.html$/, _constants.NEXT_META_SUFFIX), 'utf8'));
                        } catch  {}
                        let maybeSegmentData;
                        if (meta == null ? void 0 : meta.segmentPaths) {
                            // Collect all the segment data for this page.
                            // TODO: To optimize file system reads, we should consider creating
                            // separate cache entries for each segment, rather than storing them
                            // all on the page's entry. Though the behavior is
                            // identical regardless.
                            const segmentData = new Map();
                            maybeSegmentData = segmentData;
                            const segmentsDir = key + _constants.RSC_SEGMENTS_DIR_SUFFIX;
                            await Promise.all(meta.segmentPaths.map(async (segmentPath)=>{
                                const segmentDataFilePath = this.getFilePath(segmentsDir + segmentPath + _constants.RSC_SEGMENT_SUFFIX, _responsecache.IncrementalCacheKind.APP_PAGE);
                                try {
                                    segmentData.set(segmentPath, await this.fs.readFile(segmentDataFilePath));
                                } catch  {
                                // This shouldn't happen, but if for some reason we fail to
                                // load a segment from the filesystem, treat it the same as if
                                // the segment is dynamic and does not have a prefetch.
                                }
                            }));
                        }
                        let rscData;
                        if (!ctx.isFallback) {
                            rscData = await this.fs.readFile(this.getFilePath(`${key}${ctx.isRoutePPREnabled ? _constants.RSC_PREFETCH_SUFFIX : _constants.RSC_SUFFIX}`, _responsecache.IncrementalCacheKind.APP_PAGE));
                        }
                        data = {
                            lastModified: mtime.getTime(),
                            value: {
                                kind: _responsecache.CachedRouteKind.APP_PAGE,
                                html: fileData,
                                rscData,
                                postponed: meta == null ? void 0 : meta.postponed,
                                headers: meta == null ? void 0 : meta.headers,
                                status: meta == null ? void 0 : meta.status,
                                segmentData: maybeSegmentData
                            }
                        };
                    } else if (kind === _responsecache.IncrementalCacheKind.PAGES) {
                        let meta;
                        let pageData = {};
                        if (!ctx.isFallback) {
                            pageData = JSON.parse(await this.fs.readFile(this.getFilePath(`${key}${_constants.NEXT_DATA_SUFFIX}`, _responsecache.IncrementalCacheKind.PAGES), 'utf8'));
                        }
                        data = {
                            lastModified: mtime.getTime(),
                            value: {
                                kind: _responsecache.CachedRouteKind.PAGES,
                                html: fileData,
                                pageData,
                                headers: meta == null ? void 0 : meta.headers,
                                status: meta == null ? void 0 : meta.status
                            }
                        };
                    } else {
                        throw Object.defineProperty(new Error(`Invariant: Unexpected route kind ${kind} in file system cache.`), "__NEXT_ERROR_CODE", {
                            value: "E445",
                            enumerable: false,
                            configurable: true
                        });
                    }
                }
                if (data) {
                    var _FileSystemCache_memoryCache1;
                    (_FileSystemCache_memoryCache1 = FileSystemCache.memoryCache) == null ? void 0 : _FileSystemCache_memoryCache1.set(key, data);
                }
            } catch  {
                return null;
            }
        }
        if ((data == null ? void 0 : (_data_value = data.value) == null ? void 0 : _data_value.kind) === _responsecache.CachedRouteKind.APP_PAGE || (data == null ? void 0 : (_data_value1 = data.value) == null ? void 0 : _data_value1.kind) === _responsecache.CachedRouteKind.APP_ROUTE || (data == null ? void 0 : (_data_value2 = data.value) == null ? void 0 : _data_value2.kind) === _responsecache.CachedRouteKind.PAGES) {
            var _data_value_headers;
            const tagsHeader = (_data_value_headers = data.value.headers) == null ? void 0 : _data_value_headers[_constants.NEXT_CACHE_TAGS_HEADER];
            if (typeof tagsHeader === 'string') {
                const cacheTags = tagsHeader.split(',');
                // we trigger a blocking validation if an ISR page
                // had a tag revalidated, if we want to be a background
                // revalidation instead we return data.lastModified = -1
                if (cacheTags.length > 0 && (0, _tagsmanifestexternal.areTagsExpired)(cacheTags, data.lastModified)) {
                    if (FileSystemCache.debug) {
                        console.log('FileSystemCache: expired tags', cacheTags);
                    }
                    return null;
                }
            }
        } else if ((data == null ? void 0 : (_data_value3 = data.value) == null ? void 0 : _data_value3.kind) === _responsecache.CachedRouteKind.FETCH) {
            const combinedTags = ctx.kind === _responsecache.IncrementalCacheKind.FETCH ? [
                ...ctx.tags || [],
                ...ctx.softTags || []
            ] : [];
            // When revalidate tag is called we don't return stale data so it's
            // updated right away.
            if (combinedTags.some((tag)=>this.revalidatedTags.includes(tag))) {
                if (FileSystemCache.debug) {
                    console.log('FileSystemCache: was revalidated', combinedTags);
                }
                return null;
            }
            if ((0, _tagsmanifestexternal.areTagsExpired)(combinedTags, data.lastModified)) {
                if (FileSystemCache.debug) {
                    console.log('FileSystemCache: expired tags', combinedTags);
                }
                return null;
            }
        }
        return data ?? null;
    }
    async set(key, data, ctx) {
        var _FileSystemCache_memoryCache;
        (_FileSystemCache_memoryCache = FileSystemCache.memoryCache) == null ? void 0 : _FileSystemCache_memoryCache.set(key, {
            value: data,
            lastModified: Date.now()
        });
        if (FileSystemCache.debug) {
            console.log('FileSystemCache: set', key);
        }
        if (!this.flushToDisk || !data) return;
        // Create a new writer that will prepare to write all the files to disk
        // after their containing directory is created.
        const writer = new _multifilewriter.MultiFileWriter(this.fs);
        if (data.kind === _responsecache.CachedRouteKind.APP_ROUTE) {
            const filePath = this.getFilePath(`${key}.body`, _responsecache.IncrementalCacheKind.APP_ROUTE);
            writer.append(filePath, data.body);
            const meta = {
                headers: data.headers,
                status: data.status,
                postponed: undefined,
                segmentPaths: undefined
            };
            writer.append(filePath.replace(/\.body$/, _constants.NEXT_META_SUFFIX), JSON.stringify(meta, null, 2));
        } else if (data.kind === _responsecache.CachedRouteKind.PAGES || data.kind === _responsecache.CachedRouteKind.APP_PAGE) {
            const isAppPath = data.kind === _responsecache.CachedRouteKind.APP_PAGE;
            const htmlPath = this.getFilePath(`${key}.html`, isAppPath ? _responsecache.IncrementalCacheKind.APP_PAGE : _responsecache.IncrementalCacheKind.PAGES);
            writer.append(htmlPath, data.html);
            // Fallbacks don't generate a data file.
            if (!ctx.fetchCache && !ctx.isFallback) {
                writer.append(this.getFilePath(`${key}${isAppPath ? ctx.isRoutePPREnabled ? _constants.RSC_PREFETCH_SUFFIX : _constants.RSC_SUFFIX : _constants.NEXT_DATA_SUFFIX}`, isAppPath ? _responsecache.IncrementalCacheKind.APP_PAGE : _responsecache.IncrementalCacheKind.PAGES), isAppPath ? data.rscData : JSON.stringify(data.pageData));
            }
            if ((data == null ? void 0 : data.kind) === _responsecache.CachedRouteKind.APP_PAGE) {
                let segmentPaths;
                if (data.segmentData) {
                    segmentPaths = [];
                    const segmentsDir = htmlPath.replace(/\.html$/, _constants.RSC_SEGMENTS_DIR_SUFFIX);
                    for (const [segmentPath, buffer] of data.segmentData){
                        segmentPaths.push(segmentPath);
                        const segmentDataFilePath = segmentsDir + segmentPath + _constants.RSC_SEGMENT_SUFFIX;
                        writer.append(segmentDataFilePath, buffer);
                    }
                }
                const meta = {
                    headers: data.headers,
                    status: data.status,
                    postponed: data.postponed,
                    segmentPaths
                };
                writer.append(htmlPath.replace(/\.html$/, _constants.NEXT_META_SUFFIX), JSON.stringify(meta));
            }
        } else if (data.kind === _responsecache.CachedRouteKind.FETCH) {
            const filePath = this.getFilePath(key, _responsecache.IncrementalCacheKind.FETCH);
            writer.append(filePath, JSON.stringify({
                ...data,
                tags: ctx.fetchCache ? ctx.tags : []
            }));
        }
        // Wait for all FS operations to complete.
        await writer.wait();
    }
    getFilePath(pathname, kind) {
        switch(kind){
            case _responsecache.IncrementalCacheKind.FETCH:
                // we store in .next/cache/fetch-cache so it can be persisted
                // across deploys
                return _path.default.join(this.serverDistDir, '..', 'cache', 'fetch-cache', pathname);
            case _responsecache.IncrementalCacheKind.PAGES:
                return _path.default.join(this.serverDistDir, 'pages', pathname);
            case _responsecache.IncrementalCacheKind.IMAGE:
            case _responsecache.IncrementalCacheKind.APP_PAGE:
            case _responsecache.IncrementalCacheKind.APP_ROUTE:
                return _path.default.join(this.serverDistDir, 'app', pathname);
            default:
                throw Object.defineProperty(new Error(`Unexpected file path kind: ${kind}`), "__NEXT_ERROR_CODE", {
                    value: "E479",
                    enumerable: false,
                    configurable: true
                });
        }
    }
} //# sourceMappingURL=file-system-cache.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/to-route.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * This transforms a URL pathname into a route. It removes any trailing slashes
 * and the `/index` suffix.
 *
 * @param pathname - The URL path that needs to be optimized.
 * @returns - The route
 *
 * @example
 * // returns '/example'
 * toRoute('/example/index/');
 *
 * @example
 * // returns '/example'
 * toRoute('/example/');
 *
 * @example
 * // returns '/'
 * toRoute('/index/');
 *
 * @example
 * // returns '/'
 * toRoute('/');
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toRoute", {
    enumerable: true,
    get: function() {
        return toRoute;
    }
});
function toRoute(pathname) {
    return pathname.replace(/(?:\/index)?\/?$/, '') || '/';
} //# sourceMappingURL=to-route.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/decode-query-path-parameter.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Decodes a query path parameter.
 *
 * @param value - The value to decode.
 * @returns The decoded value.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "decodeQueryPathParameter", {
    enumerable: true,
    get: function() {
        return decodeQueryPathParameter;
    }
});
function decodeQueryPathParameter(value) {
    // When deployed to Vercel, the value may be encoded, so this attempts to
    // decode it and returns the original value if it fails.
    try {
        return decodeURIComponent(value);
    } catch  {
        return value;
    }
} //# sourceMappingURL=decode-query-path-parameter.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/incremental-cache/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    CacheHandler: null,
    IncrementalCache: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CacheHandler: function() {
        return CacheHandler;
    },
    IncrementalCache: function() {
        return IncrementalCache;
    }
});
const _responsecache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/response-cache/index.js [app-ssr] (ecmascript)");
const _filesystemcache = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/incremental-cache/file-system-cache.js [app-ssr] (ecmascript)"));
const _normalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js [app-ssr] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-ssr] (ecmascript)");
const _toroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/to-route.js [app-ssr] (ecmascript)");
const _sharedcachecontrolsexternal = __turbopack_context__.r("[externals]/next/dist/server/lib/incremental-cache/shared-cache-controls.external.js [external] (next/dist/server/lib/incremental-cache/shared-cache-controls.external.js, cjs)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _invarianterror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
const _serverutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/server-utils.js [app-ssr] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _detachedpromise = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/detached-promise.js [app-ssr] (ecmascript)");
const _tagsmanifestexternal = __turbopack_context__.r("[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class CacheHandler {
    // eslint-disable-next-line
    constructor(_ctx){}
    async get(_cacheKey, _ctx) {
        return {};
    }
    async set(_cacheKey, _data, _ctx) {}
    async revalidateTag(_tags, _durations) {}
    resetRequestCache() {}
}
class IncrementalCache {
    static #_ = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
    constructor({ fs, dev, flushToDisk, minimalMode, serverDistDir, requestHeaders, maxMemoryCacheSize, getPrerenderManifest, fetchCacheKeyPrefix, CurCacheHandler, allowedRevalidateHeaderKeys }){
        var _this_prerenderManifest_preview, _this_prerenderManifest;
        this.locks = new Map();
        this.hasCustomCacheHandler = Boolean(CurCacheHandler);
        const cacheHandlersSymbol = Symbol.for('@next/cache-handlers');
        const _globalThis = globalThis;
        if (!CurCacheHandler) {
            // if we have a global cache handler available leverage it
            const globalCacheHandler = _globalThis[cacheHandlersSymbol];
            if (globalCacheHandler == null ? void 0 : globalCacheHandler.FetchCache) {
                CurCacheHandler = globalCacheHandler.FetchCache;
                if (IncrementalCache.debug) {
                    console.log('IncrementalCache: using global FetchCache cache handler');
                }
            } else {
                if (fs && serverDistDir) {
                    if (IncrementalCache.debug) {
                        console.log('IncrementalCache: using filesystem cache handler');
                    }
                    CurCacheHandler = _filesystemcache.default;
                }
            }
        } else if (IncrementalCache.debug) {
            console.log('IncrementalCache: using custom cache handler', CurCacheHandler.name);
        }
        if (process.env.__NEXT_TEST_MAX_ISR_CACHE) {
            // Allow cache size to be overridden for testing purposes
            maxMemoryCacheSize = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10);
        }
        this.dev = dev;
        this.disableForTestmode = process.env.NEXT_PRIVATE_TEST_PROXY === 'true';
        // this is a hack to avoid Webpack knowing this is equal to this.minimalMode
        // because we replace this.minimalMode to true in production bundles.
        const minimalModeKey = 'minimalMode';
        this[minimalModeKey] = minimalMode;
        this.requestHeaders = requestHeaders;
        this.allowedRevalidateHeaderKeys = allowedRevalidateHeaderKeys;
        this.prerenderManifest = getPrerenderManifest();
        this.cacheControls = new _sharedcachecontrolsexternal.SharedCacheControls(this.prerenderManifest);
        this.fetchCacheKeyPrefix = fetchCacheKeyPrefix;
        let revalidatedTags = [];
        if (requestHeaders[_constants.PRERENDER_REVALIDATE_HEADER] === ((_this_prerenderManifest = this.prerenderManifest) == null ? void 0 : (_this_prerenderManifest_preview = _this_prerenderManifest.preview) == null ? void 0 : _this_prerenderManifest_preview.previewModeId)) {
            this.isOnDemandRevalidate = true;
        }
        if (minimalMode) {
            var _this_prerenderManifest_preview1, _this_prerenderManifest1;
            revalidatedTags = this.revalidatedTags = (0, _serverutils.getPreviouslyRevalidatedTags)(requestHeaders, (_this_prerenderManifest1 = this.prerenderManifest) == null ? void 0 : (_this_prerenderManifest_preview1 = _this_prerenderManifest1.preview) == null ? void 0 : _this_prerenderManifest_preview1.previewModeId);
        }
        if (CurCacheHandler) {
            this.cacheHandler = new CurCacheHandler({
                dev,
                fs,
                flushToDisk,
                serverDistDir,
                revalidatedTags,
                maxMemoryCacheSize,
                _requestHeaders: requestHeaders,
                fetchCacheKeyPrefix
            });
        }
    }
    calculateRevalidate(pathname, fromTime, dev, isFallback) {
        // in development we don't have a prerender-manifest
        // and default to always revalidating to allow easier debugging
        if (dev) return Math.floor(performance.timeOrigin + performance.now() - 1000);
        const cacheControl = this.cacheControls.get((0, _toroute.toRoute)(pathname));
        // if an entry isn't present in routes we fallback to a default
        // of revalidating after 1 second unless it's a fallback request.
        const initialRevalidateSeconds = cacheControl ? cacheControl.revalidate : isFallback ? false : 1;
        const revalidateAfter = typeof initialRevalidateSeconds === 'number' ? initialRevalidateSeconds * 1000 + fromTime : initialRevalidateSeconds;
        return revalidateAfter;
    }
    _getPathname(pathname, fetchCache) {
        return fetchCache ? pathname : (0, _normalizepagepath.normalizePagePath)(pathname);
    }
    resetRequestCache() {
        var _this_cacheHandler_resetRequestCache, _this_cacheHandler;
        (_this_cacheHandler = this.cacheHandler) == null ? void 0 : (_this_cacheHandler_resetRequestCache = _this_cacheHandler.resetRequestCache) == null ? void 0 : _this_cacheHandler_resetRequestCache.call(_this_cacheHandler);
    }
    async lock(cacheKey) {
        // Wait for any existing lock on this cache key to be released
        // This implements a simple queue-based locking mechanism
        while(true){
            const lock = this.locks.get(cacheKey);
            if (IncrementalCache.debug) {
                console.log('IncrementalCache: lock get', cacheKey, !!lock);
            }
            // If no lock exists, we can proceed to acquire it
            if (!lock) break;
            // Wait for the existing lock to be released before trying again
            await lock;
        }
        // Create a new detached promise that will represent this lock
        // The resolve function (unlock) will be returned to the caller
        const { resolve, promise } = new _detachedpromise.DetachedPromise();
        if (IncrementalCache.debug) {
            console.log('IncrementalCache: successfully locked', cacheKey);
        }
        // Store the lock promise in the locks map
        this.locks.set(cacheKey, promise);
        return ()=>{
            // Resolve the promise to release the lock.
            resolve();
            // Remove the lock from the map once it's released so that future gets
            // can acquire the lock.
            this.locks.delete(cacheKey);
        };
    }
    async revalidateTag(tags, durations) {
        var _this_cacheHandler;
        return (_this_cacheHandler = this.cacheHandler) == null ? void 0 : _this_cacheHandler.revalidateTag(tags, durations);
    }
    // x-ref: https://github.com/facebook/react/blob/2655c9354d8e1c54ba888444220f63e836925caa/packages/react/src/ReactFetch.js#L23
    async generateCacheKey(url, init = {}) {
        // this should be bumped anytime a fix is made to cache entries
        // that should bust the cache
        const MAIN_KEY_PREFIX = 'v3';
        const bodyChunks = [];
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        if (init.body) {
            // handle Uint8Array body
            if (init.body instanceof Uint8Array) {
                bodyChunks.push(decoder.decode(init.body));
                init._ogBody = init.body;
            } else if (typeof init.body.getReader === 'function') {
                const readableBody = init.body;
                const chunks = [];
                try {
                    await readableBody.pipeTo(new WritableStream({
                        write (chunk) {
                            if (typeof chunk === 'string') {
                                chunks.push(encoder.encode(chunk));
                                bodyChunks.push(chunk);
                            } else {
                                chunks.push(chunk);
                                bodyChunks.push(decoder.decode(chunk, {
                                    stream: true
                                }));
                            }
                        }
                    }));
                    // Flush the decoder.
                    bodyChunks.push(decoder.decode());
                    // Create a new buffer with all the chunks.
                    const length = chunks.reduce((total, arr)=>total + arr.length, 0);
                    const arrayBuffer = new Uint8Array(length);
                    // Push each of the chunks into the new array buffer.
                    let offset = 0;
                    for (const chunk of chunks){
                        arrayBuffer.set(chunk, offset);
                        offset += chunk.length;
                    }
                    ;
                    init._ogBody = arrayBuffer;
                } catch (err) {
                    console.error('Problem reading body', err);
                }
            } else if (typeof init.body.keys === 'function') {
                const formData = init.body;
                init._ogBody = init.body;
                for (const key of new Set([
                    ...formData.keys()
                ])){
                    const values = formData.getAll(key);
                    bodyChunks.push(`${key}=${(await Promise.all(values.map(async (val)=>{
                        if (typeof val === 'string') {
                            return val;
                        } else {
                            return await val.text();
                        }
                    }))).join(',')}`);
                }
            // handle blob body
            } else if (typeof init.body.arrayBuffer === 'function') {
                const blob = init.body;
                const arrayBuffer = await blob.arrayBuffer();
                bodyChunks.push(await blob.text());
                init._ogBody = new Blob([
                    arrayBuffer
                ], {
                    type: blob.type
                });
            } else if (typeof init.body === 'string') {
                bodyChunks.push(init.body);
                init._ogBody = init.body;
            }
        }
        const headers = typeof (init.headers || {}).keys === 'function' ? Object.fromEntries(init.headers) : Object.assign({}, init.headers);
        // w3c trace context headers can break request caching and deduplication
        // so we remove them from the cache key
        if ('traceparent' in headers) delete headers['traceparent'];
        if ('tracestate' in headers) delete headers['tracestate'];
        const cacheString = JSON.stringify([
            MAIN_KEY_PREFIX,
            this.fetchCacheKeyPrefix || '',
            url,
            init.method,
            headers,
            init.mode,
            init.redirect,
            init.credentials,
            init.referrer,
            init.referrerPolicy,
            init.integrity,
            init.cache,
            bodyChunks
        ]);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        {
            function bufferToHex(buffer) {
                return Array.prototype.map.call(new Uint8Array(buffer), (b)=>b.toString(16).padStart(2, '0')).join('');
            }
        /*TURBOPACK member replacement*/ } else {
            const crypto1 = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
            return crypto1.createHash('sha256').update(cacheString).digest('hex');
        }
    }
    async get(cacheKey, ctx) {
        var _this_cacheHandler, _cacheData_value;
        // Unlike other caches if we have a resume data cache, we use it even if
        // testmode would normally disable it or if requestHeaders say 'no-cache'.
        if (ctx.kind === _responsecache.IncrementalCacheKind.FETCH) {
            const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
            const resumeDataCache = workUnitStore ? (0, _workunitasyncstorageexternal.getRenderResumeDataCache)(workUnitStore) : null;
            if (resumeDataCache) {
                const memoryCacheData = resumeDataCache.fetch.get(cacheKey);
                if ((memoryCacheData == null ? void 0 : memoryCacheData.kind) === _responsecache.CachedRouteKind.FETCH) {
                    if (IncrementalCache.debug) {
                        console.log('IncrementalCache: rdc:hit', cacheKey);
                    }
                    return {
                        isStale: false,
                        value: memoryCacheData
                    };
                } else if (IncrementalCache.debug) {
                    console.log('IncrementalCache: rdc:miss', cacheKey);
                }
            } else {
                if (IncrementalCache.debug) {
                    console.log('IncrementalCache: rdc:no-resume-data');
                }
            }
        }
        // we don't leverage the prerender cache in dev mode
        // so that getStaticProps is always called for easier debugging
        if (this.disableForTestmode || this.dev && (ctx.kind !== _responsecache.IncrementalCacheKind.FETCH || this.requestHeaders['cache-control'] === 'no-cache')) {
            return null;
        }
        cacheKey = this._getPathname(cacheKey, ctx.kind === _responsecache.IncrementalCacheKind.FETCH);
        const cacheData = await ((_this_cacheHandler = this.cacheHandler) == null ? void 0 : _this_cacheHandler.get(cacheKey, ctx));
        if (ctx.kind === _responsecache.IncrementalCacheKind.FETCH) {
            var _cacheData_value1;
            if (!cacheData) {
                return null;
            }
            if (((_cacheData_value1 = cacheData.value) == null ? void 0 : _cacheData_value1.kind) !== _responsecache.CachedRouteKind.FETCH) {
                var _cacheData_value2;
                throw Object.defineProperty(new _invarianterror.InvariantError(`Expected cached value for cache key ${JSON.stringify(cacheKey)} to be a "FETCH" kind, got ${JSON.stringify((_cacheData_value2 = cacheData.value) == null ? void 0 : _cacheData_value2.kind)} instead.`), "__NEXT_ERROR_CODE", {
                    value: "E653",
                    enumerable: false,
                    configurable: true
                });
            }
            const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
            const combinedTags = [
                ...ctx.tags || [],
                ...ctx.softTags || []
            ];
            // if a tag was revalidated we don't return stale data
            if (combinedTags.some((tag)=>{
                var _this_revalidatedTags, _workStore_pendingRevalidatedTags;
                return ((_this_revalidatedTags = this.revalidatedTags) == null ? void 0 : _this_revalidatedTags.includes(tag)) || (workStore == null ? void 0 : (_workStore_pendingRevalidatedTags = workStore.pendingRevalidatedTags) == null ? void 0 : _workStore_pendingRevalidatedTags.some((item)=>item.tag === tag));
            })) {
                if (IncrementalCache.debug) {
                    console.log('IncrementalCache: expired tag', cacheKey);
                }
                return null;
            }
            // As we're able to get the cache entry for this fetch, and the prerender
            // resume data cache (RDC) is available, it must have been populated by a
            // previous fetch, but was not yet present in the in-memory cache. This
            // could be the case when performing multiple renders in parallel during
            // build time where we de-duplicate the fetch calls.
            //
            // We add it to the RDC so that the next fetch call will be able to use it
            // and it won't have to reach into the fetch cache implementation.
            const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
            if (workUnitStore) {
                const prerenderResumeDataCache = (0, _workunitasyncstorageexternal.getPrerenderResumeDataCache)(workUnitStore);
                if (prerenderResumeDataCache) {
                    if (IncrementalCache.debug) {
                        console.log('IncrementalCache: rdc:set', cacheKey);
                    }
                    prerenderResumeDataCache.fetch.set(cacheKey, cacheData.value);
                }
            }
            const revalidate = ctx.revalidate || cacheData.value.revalidate;
            const age = (performance.timeOrigin + performance.now() - (cacheData.lastModified || 0)) / 1000;
            let isStale = age > revalidate;
            const data = cacheData.value.data;
            if ((0, _tagsmanifestexternal.areTagsExpired)(combinedTags, cacheData.lastModified)) {
                return null;
            } else if ((0, _tagsmanifestexternal.areTagsStale)(combinedTags, cacheData.lastModified)) {
                isStale = true;
            }
            return {
                isStale,
                value: {
                    kind: _responsecache.CachedRouteKind.FETCH,
                    data,
                    revalidate
                }
            };
        } else if ((cacheData == null ? void 0 : (_cacheData_value = cacheData.value) == null ? void 0 : _cacheData_value.kind) === _responsecache.CachedRouteKind.FETCH) {
            throw Object.defineProperty(new _invarianterror.InvariantError(`Expected cached value for cache key ${JSON.stringify(cacheKey)} not to be a ${JSON.stringify(ctx.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", {
                value: "E652",
                enumerable: false,
                configurable: true
            });
        }
        let entry = null;
        const cacheControl = this.cacheControls.get((0, _toroute.toRoute)(cacheKey));
        let isStale;
        let revalidateAfter;
        if ((cacheData == null ? void 0 : cacheData.lastModified) === -1) {
            isStale = -1;
            revalidateAfter = -1 * _constants.CACHE_ONE_YEAR;
        } else {
            var _cacheData_value3, _cacheData_value4;
            const now = performance.timeOrigin + performance.now();
            const lastModified = (cacheData == null ? void 0 : cacheData.lastModified) || now;
            revalidateAfter = this.calculateRevalidate(cacheKey, lastModified, this.dev ?? false, ctx.isFallback);
            isStale = revalidateAfter !== false && revalidateAfter < now ? true : undefined;
            // If the stale time couldn't be determined based on the revalidation
            // time, we check if the tags are expired or stale.
            if (isStale === undefined && ((cacheData == null ? void 0 : (_cacheData_value3 = cacheData.value) == null ? void 0 : _cacheData_value3.kind) === _responsecache.CachedRouteKind.APP_PAGE || (cacheData == null ? void 0 : (_cacheData_value4 = cacheData.value) == null ? void 0 : _cacheData_value4.kind) === _responsecache.CachedRouteKind.APP_ROUTE)) {
                var _cacheData_value_headers;
                const tagsHeader = (_cacheData_value_headers = cacheData.value.headers) == null ? void 0 : _cacheData_value_headers[_constants.NEXT_CACHE_TAGS_HEADER];
                if (typeof tagsHeader === 'string') {
                    const cacheTags = tagsHeader.split(',');
                    if (cacheTags.length > 0) {
                        if ((0, _tagsmanifestexternal.areTagsExpired)(cacheTags, lastModified)) {
                            isStale = -1;
                        } else if ((0, _tagsmanifestexternal.areTagsStale)(cacheTags, lastModified)) {
                            isStale = true;
                        }
                    }
                }
            }
        }
        if (cacheData) {
            entry = {
                isStale,
                cacheControl,
                revalidateAfter,
                value: cacheData.value
            };
        }
        if (!cacheData && this.prerenderManifest.notFoundRoutes.includes(cacheKey)) {
            // for the first hit after starting the server the cache
            // may not have a way to save notFound: true so if
            // the prerender-manifest marks this as notFound then we
            // return that entry and trigger a cache set to give it a
            // chance to update in-memory entries
            entry = {
                isStale,
                value: null,
                cacheControl,
                revalidateAfter
            };
            this.set(cacheKey, entry.value, {
                ...ctx,
                cacheControl
            });
        }
        return entry;
    }
    async set(pathname, data, ctx) {
        // Even if we otherwise disable caching for testMode or if no fetchCache is
        // configured we still always stash results in the resume data cache if one
        // exists. This is because this is a transient in memory cache that
        // populates caches ahead of a dynamic render in dev mode to allow the RSC
        // debug info to have the right environment associated to it.
        if ((data == null ? void 0 : data.kind) === _responsecache.CachedRouteKind.FETCH) {
            const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
            const prerenderResumeDataCache = workUnitStore ? (0, _workunitasyncstorageexternal.getPrerenderResumeDataCache)(workUnitStore) : null;
            if (prerenderResumeDataCache) {
                if (IncrementalCache.debug) {
                    console.log('IncrementalCache: rdc:set', pathname);
                }
                prerenderResumeDataCache.fetch.set(pathname, data);
            }
        }
        if (this.disableForTestmode || this.dev && !ctx.fetchCache) return;
        pathname = this._getPathname(pathname, ctx.fetchCache);
        // FetchCache has upper limit of 2MB per-entry currently
        const itemSize = JSON.stringify(data).length;
        if (ctx.fetchCache && itemSize > 2 * 1024 * 1024 && // We ignore the size limit when custom cache handler is being used, as it
        // might not have this limit
        !this.hasCustomCacheHandler && // We also ignore the size limit when it's an implicit build-time-only
        // caching that the user isn't even aware of.
        !ctx.isImplicitBuildTimeCache) {
            const warningText = `Failed to set Next.js data cache for ${ctx.fetchUrl || pathname}, items over 2MB can not be cached (${itemSize} bytes)`;
            if (this.dev) {
                throw Object.defineProperty(new Error(warningText), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
            console.warn(warningText);
            return;
        }
        try {
            var _this_cacheHandler;
            if (!ctx.fetchCache && ctx.cacheControl) {
                this.cacheControls.set((0, _toroute.toRoute)(pathname), ctx.cacheControl);
            }
            await ((_this_cacheHandler = this.cacheHandler) == null ? void 0 : _this_cacheHandler.set(pathname, data, ctx));
        } catch (error) {
            console.warn('Failed to update prerender cache for', pathname, error);
        }
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/node-fs-methods.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nodeFs", {
    enumerable: true,
    get: function() {
        return nodeFs;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const nodeFs = {
    existsSync: _fs.default.existsSync,
    readFile: _fs.default.promises.readFile,
    readFileSync: _fs.default.readFileSync,
    writeFile: (f, d)=>_fs.default.promises.writeFile(f, d),
    mkdir: (dir)=>_fs.default.promises.mkdir(dir, {
            recursive: true
        }),
    stat: (f)=>_fs.default.promises.stat(f)
}; //# sourceMappingURL=node-fs-methods.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/cache-handlers/default.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * This is the default "use cache" handler it defaults to an in-memory store.
 * In-memory caches are fragile and should not use stale-while-revalidate
 * semantics on the caches because it's not worth warming up an entry that's
 * likely going to get evicted before we get to use it anyway. However, we also
 * don't want to reuse a stale entry for too long so stale entries should be
 * considered expired/missing in such cache handlers.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDefaultCacheHandler", {
    enumerable: true,
    get: function() {
        return createDefaultCacheHandler;
    }
});
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-ssr] (ecmascript)");
const _tagsmanifestexternal = __turbopack_context__.r("[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)");
function createDefaultCacheHandler(maxSize) {
    // If the max size is 0, return a cache handler that doesn't cache anything,
    // this avoids an unnecessary LRUCache instance and potential memory
    // allocation.
    if (maxSize === 0) {
        return {
            get: ()=>Promise.resolve(undefined),
            set: ()=>Promise.resolve(),
            refreshTags: ()=>Promise.resolve(),
            getExpiration: ()=>Promise.resolve(0),
            updateTags: ()=>Promise.resolve()
        };
    }
    const memoryCache = new _lrucache.LRUCache(maxSize, (entry)=>entry.size);
    const pendingSets = new Map();
    const debug = process.env.NEXT_PRIVATE_DEBUG_CACHE ? console.debug.bind(console, 'DefaultCacheHandler:') : undefined;
    return {
        async get (cacheKey) {
            const pendingPromise = pendingSets.get(cacheKey);
            if (pendingPromise) {
                debug == null ? void 0 : debug('get', cacheKey, 'pending');
                await pendingPromise;
            }
            const privateEntry = memoryCache.get(cacheKey);
            if (!privateEntry) {
                debug == null ? void 0 : debug('get', cacheKey, 'not found');
                return undefined;
            }
            const entry = privateEntry.entry;
            if (performance.timeOrigin + performance.now() > entry.timestamp + entry.revalidate * 1000) {
                // In-memory caches should expire after revalidate time because it is
                // unlikely that a new entry will be able to be used before it is dropped
                // from the cache.
                debug == null ? void 0 : debug('get', cacheKey, 'expired');
                return undefined;
            }
            let revalidate = entry.revalidate;
            if ((0, _tagsmanifestexternal.areTagsExpired)(entry.tags, entry.timestamp)) {
                debug == null ? void 0 : debug('get', cacheKey, 'had expired tag');
                return undefined;
            }
            if ((0, _tagsmanifestexternal.areTagsStale)(entry.tags, entry.timestamp)) {
                debug == null ? void 0 : debug('get', cacheKey, 'had stale tag');
                revalidate = -1;
            }
            const [returnStream, newSaved] = entry.value.tee();
            entry.value = newSaved;
            debug == null ? void 0 : debug('get', cacheKey, 'found', {
                tags: entry.tags,
                timestamp: entry.timestamp,
                expire: entry.expire,
                revalidate
            });
            return {
                ...entry,
                revalidate,
                value: returnStream
            };
        },
        async set (cacheKey, pendingEntry) {
            debug == null ? void 0 : debug('set', cacheKey, 'start');
            let resolvePending = ()=>{};
            const pendingPromise = new Promise((resolve)=>{
                resolvePending = resolve;
            });
            pendingSets.set(cacheKey, pendingPromise);
            const entry = await pendingEntry;
            let size = 0;
            try {
                const [value, clonedValue] = entry.value.tee();
                entry.value = value;
                const reader = clonedValue.getReader();
                for(let chunk; !(chunk = await reader.read()).done;){
                    size += Buffer.from(chunk.value).byteLength;
                }
                memoryCache.set(cacheKey, {
                    entry,
                    isErrored: false,
                    errorRetryCount: 0,
                    size
                });
                debug == null ? void 0 : debug('set', cacheKey, 'done');
            } catch (err) {
                // TODO: store partial buffer with error after we retry 3 times
                debug == null ? void 0 : debug('set', cacheKey, 'failed', err);
            } finally{
                resolvePending();
                pendingSets.delete(cacheKey);
            }
        },
        async refreshTags () {
        // Nothing to do for an in-memory cache handler.
        },
        async getExpiration (tags) {
            const expirations = tags.map((tag)=>{
                const entry = _tagsmanifestexternal.tagsManifest.get(tag);
                if (!entry) return 0;
                // Return the most recent timestamp (either expired or stale)
                return entry.expired || 0;
            });
            const expiration = Math.max(...expirations, 0);
            debug == null ? void 0 : debug('getExpiration', {
                tags,
                expiration
            });
            return expiration;
        },
        async updateTags (tags, durations) {
            const now = Math.round(performance.timeOrigin + performance.now());
            debug == null ? void 0 : debug('updateTags', {
                tags,
                timestamp: now
            });
            for (const tag of tags){
                // TODO: update file-system-cache?
                const existingEntry = _tagsmanifestexternal.tagsManifest.get(tag) || {};
                if (durations) {
                    // Use provided durations directly
                    const updates = {
                        ...existingEntry
                    };
                    // mark as stale immediately
                    updates.stale = now;
                    if (durations.expire !== undefined) {
                        updates.expired = now + durations.expire * 1000 // Convert seconds to ms
                        ;
                    }
                    _tagsmanifestexternal.tagsManifest.set(tag, updates);
                } else {
                    // Update expired field for immediate expiration (default behavior when no durations provided)
                    _tagsmanifestexternal.tagsManifest.set(tag, {
                        ...existingEntry,
                        expired: now
                    });
                }
            }
        }
    };
} //# sourceMappingURL=default.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lazy-result.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createLazyResult: null,
    isResolvedLazyResult: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createLazyResult: function() {
        return createLazyResult;
    },
    isResolvedLazyResult: function() {
        return isResolvedLazyResult;
    }
});
function createLazyResult(fn) {
    let pendingResult;
    const result = {
        then (onfulfilled, onrejected) {
            if (!pendingResult) {
                pendingResult = fn();
            }
            pendingResult.then((value)=>{
                result.value = value;
            }).catch(()=>{
            // The externally awaited result will be rejected via `onrejected`. We
            // don't need to handle it here. But we do want to avoid an unhandled
            // rejection.
            });
            return pendingResult.then(onfulfilled, onrejected);
        }
    };
    return result;
}
function isResolvedLazyResult(result) {
    return result.hasOwnProperty('value');
} //# sourceMappingURL=lazy-result.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    RESTART_EXIT_CODE: null,
    formatDebugAddress: null,
    formatNodeOptions: null,
    getFormattedNodeOptionsWithoutInspect: null,
    getMaxOldSpaceSize: null,
    getNodeDebugType: null,
    getNodeOptionsArgs: null,
    getParsedDebugAddress: null,
    getParsedNodeOptions: null,
    getParsedNodeOptionsWithoutInspect: null,
    parseValidPositiveInteger: null,
    printAndExit: null,
    tokenizeArgs: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RESTART_EXIT_CODE: function() {
        return RESTART_EXIT_CODE;
    },
    formatDebugAddress: function() {
        return formatDebugAddress;
    },
    formatNodeOptions: function() {
        return formatNodeOptions;
    },
    getFormattedNodeOptionsWithoutInspect: function() {
        return getFormattedNodeOptionsWithoutInspect;
    },
    getMaxOldSpaceSize: function() {
        return getMaxOldSpaceSize;
    },
    getNodeDebugType: function() {
        return getNodeDebugType;
    },
    getNodeOptionsArgs: function() {
        return getNodeOptionsArgs;
    },
    getParsedDebugAddress: function() {
        return getParsedDebugAddress;
    },
    getParsedNodeOptions: function() {
        return getParsedNodeOptions;
    },
    getParsedNodeOptionsWithoutInspect: function() {
        return getParsedNodeOptionsWithoutInspect;
    },
    parseValidPositiveInteger: function() {
        return parseValidPositiveInteger;
    },
    printAndExit: function() {
        return printAndExit;
    },
    tokenizeArgs: function() {
        return tokenizeArgs;
    }
});
const _nodeutil = __turbopack_context__.r("[externals]/node:util [external] (node:util, cjs)");
const _commander = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/commander/index.js [app-ssr] (ecmascript)");
function printAndExit(message, code = 1) {
    if (code === 0) {
        console.log(message);
    } else {
        console.error(message);
    }
    return process.exit(code);
}
const parseNodeArgs = (args)=>{
    const { values, tokens } = (0, _nodeutil.parseArgs)({
        args,
        strict: false,
        tokens: true
    });
    // For the `NODE_OPTIONS`, we support arguments with values without the `=`
    // sign. We need to parse them manually.
    let orphan = null;
    for(let i = 0; i < tokens.length; i++){
        const token = tokens[i];
        if (token.kind === 'option-terminator') {
            break;
        }
        // When we encounter an option, if it's value is undefined, we should check
        // to see if the following tokens are positional parameters. If they are,
        // then the option is orphaned, and we can assign it.
        if (token.kind === 'option') {
            orphan = typeof token.value === 'undefined' ? token : null;
            continue;
        }
        // If the token isn't a positional one, then we can't assign it to the found
        // orphaned option.
        if (token.kind !== 'positional') {
            orphan = null;
            continue;
        }
        // If we don't have an orphan, then we can skip this token.
        if (!orphan) {
            continue;
        }
        // If the token is a positional one, and it has a value, so add it to the
        // values object. If it already exists, append it with a space.
        if (orphan.name in values && typeof values[orphan.name] === 'string') {
            values[orphan.name] += ` ${token.value}`;
        } else {
            values[orphan.name] = token.value;
        }
    }
    return values;
};
const tokenizeArgs = (input)=>{
    let args = [];
    let isInString = false;
    let willStartNewArg = true;
    for(let i = 0; i < input.length; i++){
        let char = input[i];
        // Skip any escaped characters in strings.
        if (char === '\\' && isInString) {
            // Ensure we don't have an escape character at the end.
            if (input.length === i + 1) {
                throw Object.defineProperty(new Error('Invalid escape character at the end.'), "__NEXT_ERROR_CODE", {
                    value: "E168",
                    enumerable: false,
                    configurable: true
                });
            }
            // Skip the next character.
            char = input[++i];
        } else if (char === ' ' && !isInString) {
            willStartNewArg = true;
            continue;
        } else if (char === '"') {
            isInString = !isInString;
            continue;
        }
        // If we're starting a new argument, we should add it to the array.
        if (willStartNewArg) {
            args.push(char);
            willStartNewArg = false;
        } else {
            args[args.length - 1] += char;
        }
    }
    if (isInString) {
        throw Object.defineProperty(new Error('Unterminated string'), "__NEXT_ERROR_CODE", {
            value: "E208",
            enumerable: false,
            configurable: true
        });
    }
    return args;
};
const getNodeOptionsArgs = ()=>{
    if (!process.env.NODE_OPTIONS) return [];
    return tokenizeArgs(process.env.NODE_OPTIONS);
};
const formatDebugAddress = ({ host, port })=>{
    if (host) return `${host}:${port}`;
    return `${port}`;
};
const getParsedDebugAddress = (address)=>{
    if (!address || typeof address !== 'string') {
        return {
            host: undefined,
            port: 9229
        };
    }
    // The address is in the form of `[host:]port`. Let's parse the address.
    if (address.includes(':')) {
        const [host, port] = address.split(':');
        return {
            host,
            port: parseInt(port, 10)
        };
    }
    return {
        host: undefined,
        port: parseInt(address, 10)
    };
};
function formatNodeOptions(args) {
    return Object.entries(args).map(([key, value])=>{
        if (value === true) {
            return `--${key}`;
        }
        if (value) {
            return `--${key}=${// also escape any nested quotes.
            value.includes(' ') && !value.startsWith('"') ? JSON.stringify(value) : value}`;
        }
        return null;
    }).filter((arg)=>arg !== null).join(' ');
}
function getParsedNodeOptions() {
    const args = [
        ...process.execArgv,
        ...getNodeOptionsArgs()
    ];
    if (args.length === 0) return {};
    return parseNodeArgs(args);
}
function getParsedNodeOptionsWithoutInspect() {
    const args = getNodeOptionsArgs();
    if (args.length === 0) return {};
    const parsed = parseNodeArgs(args);
    // Remove inspect options.
    delete parsed.inspect;
    delete parsed['inspect-brk'];
    delete parsed['inspect_brk'];
    return parsed;
}
function getFormattedNodeOptionsWithoutInspect() {
    const args = getParsedNodeOptionsWithoutInspect();
    if (Object.keys(args).length === 0) return '';
    return formatNodeOptions(args);
}
function parseValidPositiveInteger(value) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || !isFinite(parsedValue) || parsedValue < 0) {
        throw new _commander.InvalidArgumentError(`'${value}' is not a non-negative number.`);
    }
    return parsedValue;
}
const RESTART_EXIT_CODE = 77;
function getNodeDebugType(nodeOptions) {
    if (nodeOptions.inspect) {
        return 'inspect';
    }
    if (nodeOptions['inspect-brk'] || nodeOptions['inspect_brk']) {
        return 'inspect-brk';
    }
}
function getMaxOldSpaceSize() {
    const args = getNodeOptionsArgs();
    if (args.length === 0) return;
    const parsed = parseNodeArgs(args);
    const size = parsed['max-old-space-size'] || parsed['max_old_space_size'];
    if (!size || typeof size !== 'string') return;
    return parseInt(size, 10);
} //# sourceMappingURL=utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/async-callback-set.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AsyncCallbackSet", {
    enumerable: true,
    get: function() {
        return AsyncCallbackSet;
    }
});
class AsyncCallbackSet {
    add(callback) {
        this.callbacks.push(callback);
    }
    async runAll() {
        if (!this.callbacks.length) {
            return;
        }
        const callbacks = this.callbacks;
        this.callbacks = [];
        await Promise.allSettled(callbacks.map(async (f)=>f()));
    }
    constructor(){
        this.callbacks = [];
    }
} //# sourceMappingURL=async-callback-set.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/mock-request.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    MockedRequest: null,
    MockedResponse: null,
    createRequestResponseMocks: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MockedRequest: function() {
        return MockedRequest;
    },
    MockedResponse: function() {
        return MockedResponse;
    },
    createRequestResponseMocks: function() {
        return createRequestResponseMocks;
    }
});
const _stream = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/stream [external] (stream, cjs)"));
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/web/utils.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class MockedRequest extends _stream.default.Readable {
    constructor({ url, headers, method, socket = null, readable }){
        super(), this.httpVersion = '1.0', this.httpVersionMajor = 1, this.httpVersionMinor = 0, // always returns false for the `encrypted` property and undefined for the
        // `remoteAddress` property.
        this.socket = new Proxy({}, {
            get: (_target, prop)=>{
                if (prop !== 'encrypted' && prop !== 'remoteAddress') {
                    throw Object.defineProperty(new Error('Method not implemented'), "__NEXT_ERROR_CODE", {
                        value: "E52",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (prop === 'remoteAddress') return undefined;
                // For this mock request, always ensure we just respond with the encrypted
                // set to false to ensure there's no odd leakages.
                return false;
            }
        });
        this.url = url;
        this.headers = headers;
        this.method = method;
        if (readable) {
            this.bodyReadable = readable;
            this.bodyReadable.on('end', ()=>this.emit('end'));
            this.bodyReadable.on('close', ()=>this.emit('close'));
        }
        if (socket) {
            this.socket = socket;
        }
    }
    get headersDistinct() {
        const headers = {};
        for (const [key, value] of Object.entries(this.headers)){
            if (!value) continue;
            headers[key] = Array.isArray(value) ? value : [
                value
            ];
        }
        return headers;
    }
    _read(size) {
        if (this.bodyReadable) {
            return this.bodyReadable._read(size);
        } else {
            this.emit('end');
            this.emit('close');
        }
    }
    /**
   * The `connection` property is just an alias for the `socket` property.
   *
   * @deprecated — since v13.0.0 - Use socket instead.
   */ get connection() {
        return this.socket;
    }
    // The following methods are not implemented as they are not used in the
    // Next.js codebase.
    get aborted() {
        throw Object.defineProperty(new Error('Method not implemented'), "__NEXT_ERROR_CODE", {
            value: "E52",
            enumerable: false,
            configurable: true
        });
    }
    get complete() {
        throw Object.defineProperty(new Error('Method not implemented'), "__NEXT_ERROR_CODE", {
            value: "E52",
            enumerable: false,
            configurable: true
        });
    }
    get trailers() {
        throw Object.defineProperty(new Error('Method not implemented'), "__NEXT_ERROR_CODE", {
            value: "E52",
            enumerable: false,
            configurable: true
        });
    }
    get trailersDistinct() {
        throw Object.defineProperty(new Error('Method not implemented'), "__NEXT_ERROR_CODE", {
            value: "E52",
            enumerable: false,
            configurable: true
        });
    }
    get rawTrailers() {
        throw Object.defineProperty(new Error('Method not implemented'), "__NEXT_ERROR_CODE", {
            value: "E52",
            enumerable: false,
            configurable: true
        });
    }
    get rawHeaders() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    setTimeout() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
}
class MockedResponse extends _stream.default.Writable {
    constructor(res = {}){
        super(), this.statusMessage = '', this.finished = false, this.headersSent = false, /**
   * A list of buffers that have been written to the response.
   *
   * @internal - used internally by Next.js
   */ this.buffers = [];
        this.statusCode = res.statusCode ?? 200;
        this.socket = res.socket ?? null;
        this.headers = res.headers ? (0, _utils.fromNodeOutgoingHttpHeaders)(res.headers) : new Headers();
        this.headPromise = new Promise((resolve)=>{
            this.headPromiseResolve = resolve;
        });
        // Attach listeners for the `finish`, `end`, and `error` events to the
        // `MockedResponse` instance.
        this.hasStreamed = new Promise((resolve, reject)=>{
            this.on('finish', ()=>resolve(true));
            this.on('end', ()=>resolve(true));
            this.on('error', (err)=>reject(err));
        }).then((val)=>{
            this.headPromiseResolve == null ? void 0 : this.headPromiseResolve.call(this);
            return val;
        });
        if (res.resWriter) {
            this.resWriter = res.resWriter;
        }
    }
    appendHeader(name, value) {
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (const v of values){
            this.headers.append(name, v);
        }
        return this;
    }
    /**
   * Returns true if the response has been sent, false otherwise.
   *
   * @internal - used internally by Next.js
   */ get isSent() {
        return this.finished || this.headersSent;
    }
    /**
   * The `connection` property is just an alias for the `socket` property.
   *
   * @deprecated — since v13.0.0 - Use socket instead.
   */ get connection() {
        return this.socket;
    }
    write(chunk) {
        if (this.resWriter) {
            return this.resWriter(chunk);
        }
        this.buffers.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        return true;
    }
    end() {
        this.finished = true;
        return super.end(...arguments);
    }
    /**
   * This method is a no-op because the `MockedResponse` instance is not
   * actually connected to a socket. This method is not specified on the
   * interface type for `ServerResponse` but is called by Node.js.
   *
   * @see https://github.com/nodejs/node/pull/7949
   */ _implicitHeader() {}
    _write(chunk, _encoding, callback) {
        this.write(chunk);
        // According to Node.js documentation, the callback MUST be invoked to
        // signal that the write completed successfully. If this callback is not
        // invoked, the 'finish' event will not be emitted.
        //
        // https://nodejs.org/docs/latest-v16.x/api/stream.html#writable_writechunk-encoding-callback
        callback();
    }
    writeHead(statusCode, statusMessage, headers) {
        if (!headers && typeof statusMessage !== 'string') {
            headers = statusMessage;
        } else if (typeof statusMessage === 'string' && statusMessage.length > 0) {
            this.statusMessage = statusMessage;
        }
        if (headers) {
            // When headers have been set with response.setHeader(), they will be
            // merged with any headers passed to response.writeHead(), with the
            // headers passed to response.writeHead() given precedence.
            //
            // https://nodejs.org/api/http.html#responsewriteheadstatuscode-statusmessage-headers
            //
            // For this reason, we need to only call `set` to ensure that this will
            // overwrite any existing headers.
            if (Array.isArray(headers)) {
                // headers may be an Array where the keys and values are in the same list.
                // It is not a list of tuples. So, the even-numbered offsets are key
                // values, and the odd-numbered offsets are the associated values. The
                // array is in the same format as request.rawHeaders.
                for(let i = 0; i < headers.length; i += 2){
                    // The header key is always a string according to the spec.
                    this.setHeader(headers[i], headers[i + 1]);
                }
            } else {
                for (const [key, value] of Object.entries(headers)){
                    // Skip undefined values
                    if (typeof value === 'undefined') continue;
                    this.setHeader(key, value);
                }
            }
        }
        this.statusCode = statusCode;
        this.headersSent = true;
        this.headPromiseResolve == null ? void 0 : this.headPromiseResolve.call(this);
        return this;
    }
    hasHeader(name) {
        return this.headers.has(name);
    }
    getHeader(name) {
        return this.headers.get(name) ?? undefined;
    }
    getHeaders() {
        return (0, _utils.toNodeOutgoingHttpHeaders)(this.headers);
    }
    getHeaderNames() {
        return Array.from(this.headers.keys());
    }
    setHeader(name, value) {
        if (Array.isArray(value)) {
            // Because `set` here should override any existing values, we need to
            // delete the existing values before setting the new ones via `append`.
            this.headers.delete(name);
            for (const v of value){
                this.headers.append(name, v);
            }
        } else if (typeof value === 'number') {
            this.headers.set(name, value.toString());
        } else {
            this.headers.set(name, value);
        }
        return this;
    }
    removeHeader(name) {
        this.headers.delete(name);
    }
    flushHeaders() {
    // This is a no-op because we don't actually have a socket to flush the
    // headers to.
    }
    // The following methods are not implemented as they are not used in the
    // Next.js codebase.
    get strictContentLength() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    writeEarlyHints() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    get req() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    assignSocket() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    detachSocket() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    writeContinue() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    writeProcessing() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    get upgrading() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    get chunkedEncoding() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    get shouldKeepAlive() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    get useChunkedEncodingByDefault() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    get sendDate() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    setTimeout() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    addTrailers() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
    setHeaders() {
        throw Object.defineProperty(new Error('Method not implemented.'), "__NEXT_ERROR_CODE", {
            value: "E41",
            enumerable: false,
            configurable: true
        });
    }
}
function createRequestResponseMocks({ url, headers = {}, method = 'GET', bodyReadable, resWriter, socket = null }) {
    return {
        req: new MockedRequest({
            url,
            headers,
            method,
            socket,
            readable: bodyReadable
        }),
        res: new MockedResponse({
            socket,
            resWriter
        })
    };
} //# sourceMappingURL=mock-request.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/etag.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * FNV-1a Hash implementation
 * @author Travis Webb (tjwebb) <me@traviswebb.com>
 *
 * Ported from https://github.com/tjwebb/fnv-plus/blob/master/index.js
 *
 * Simplified, optimized and add modified for 52 bit, which provides a larger hash space
 * and still making use of Javascript's 53-bit integer space.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    fnv1a52: null,
    generateETag: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fnv1a52: function() {
        return fnv1a52;
    },
    generateETag: function() {
        return generateETag;
    }
});
const fnv1a52 = (str)=>{
    const len = str.length;
    let i = 0, t0 = 0, v0 = 0x2325, t1 = 0, v1 = 0x8422, t2 = 0, v2 = 0x9ce4, t3 = 0, v3 = 0xcbf2;
    while(i < len){
        v0 ^= str.charCodeAt(i++);
        t0 = v0 * 435;
        t1 = v1 * 435;
        t2 = v2 * 435;
        t3 = v3 * 435;
        t2 += v0 << 8;
        t3 += v1 << 8;
        t1 += t0 >>> 16;
        v0 = t0 & 65535;
        t2 += t1 >>> 16;
        v1 = t1 & 65535;
        v3 = t3 + (t2 >>> 16) & 65535;
        v2 = t2 & 65535;
    }
    return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
const generateETag = (payload, weak = false)=>{
    const prefix = weak ? 'W/"' : '"';
    return prefix + fnv1a52(payload).toString(36) + payload.length.toString(36) + '"';
}; //# sourceMappingURL=etag.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/cache-control.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCacheControlHeader", {
    enumerable: true,
    get: function() {
        return getCacheControlHeader;
    }
});
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-ssr] (ecmascript)");
function getCacheControlHeader({ revalidate, expire }) {
    const swrHeader = typeof revalidate === 'number' && expire !== undefined && revalidate < expire ? `, stale-while-revalidate=${expire - revalidate}` : '';
    if (revalidate === 0) {
        return 'private, no-cache, no-store, max-age=0, must-revalidate';
    } else if (typeof revalidate === 'number') {
        return `s-maxage=${revalidate}${swrHeader}`;
    }
    return `s-maxage=${_constants.CACHE_ONE_YEAR}${swrHeader}`;
} //# sourceMappingURL=cache-control.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/is-ipv6.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Regex from `node/lib/internal/net.js`: https://github.com/nodejs/node/blob/9fc57006c27564ed7f75eee090eca86786508f51/lib/internal/net.js#L19-L29
// License included below:
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isIPv6", {
    enumerable: true,
    get: function() {
        return isIPv6;
    }
});
const v4Seg = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
const v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
const v6Seg = '(?:[0-9a-fA-F]{1,4})';
const IPv6Reg = new RegExp('^(' + `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` + `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` + `(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|` + `(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|` + `(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|` + `(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|` + `(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|` + `(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` + ')(%[0-9a-zA-Z-.:]{1,})?$');
function isIPv6(s) {
    return IPv6Reg.test(s);
} //# sourceMappingURL=is-ipv6.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/format-hostname.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatHostname", {
    enumerable: true,
    get: function() {
        return formatHostname;
    }
});
const _isipv6 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/is-ipv6.js [app-ssr] (ecmascript)");
function formatHostname(hostname) {
    return (0, _isipv6.isIPv6)(hostname) ? `[${hostname}]` : hostname;
} //# sourceMappingURL=format-hostname.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/i18n-provider.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "I18NProvider", {
    enumerable: true,
    get: function() {
        return I18NProvider;
    }
});
const _requestmeta = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/request-meta.js [app-ssr] (ecmascript)");
class I18NProvider {
    constructor(config){
        var _config_domains;
        this.config = config;
        if (!config.locales.length) {
            throw Object.defineProperty(new Error('Invariant: No locales provided'), "__NEXT_ERROR_CODE", {
                value: "E510",
                enumerable: false,
                configurable: true
            });
        }
        this.lowerCaseLocales = config.locales.map((locale)=>locale.toLowerCase());
        this.lowerCaseDomains = (_config_domains = config.domains) == null ? void 0 : _config_domains.map((domainLocale)=>{
            var _domainLocale_locales;
            const domain = domainLocale.domain.toLowerCase();
            return {
                defaultLocale: domainLocale.defaultLocale.toLowerCase(),
                hostname: domain.split(':', 1)[0],
                domain,
                locales: (_domainLocale_locales = domainLocale.locales) == null ? void 0 : _domainLocale_locales.map((locale)=>locale.toLowerCase()),
                http: domainLocale.http
            };
        });
    }
    /**
   * Detects the domain locale from the hostname and the detected locale if
   * provided.
   *
   * @param hostname The hostname to detect the domain locale from, this must be lowercased.
   * @param detectedLocale The detected locale to use if the hostname does not match.
   * @returns The domain locale if found, `undefined` otherwise.
   */ detectDomainLocale(hostname, detectedLocale) {
        if (!hostname || !this.lowerCaseDomains || !this.config.domains) return;
        if (detectedLocale) detectedLocale = detectedLocale.toLowerCase();
        for(let i = 0; i < this.lowerCaseDomains.length; i++){
            var // other domains locales.
            _domainLocale_locales;
            const domainLocale = this.lowerCaseDomains[i];
            if (domainLocale.hostname === hostname || ((_domainLocale_locales = domainLocale.locales) == null ? void 0 : _domainLocale_locales.some((locale)=>locale === detectedLocale))) {
                return this.config.domains[i];
            }
        }
        return;
    }
    /**
   * Pulls the pre-computed locale and inference results from the query
   * object.
   *
   * @param req the request object
   * @param pathname the pathname that could contain a locale prefix
   * @returns the locale analysis result
   */ fromRequest(req, pathname) {
        const detectedLocale = (0, _requestmeta.getRequestMeta)(req, 'locale');
        // If a locale was detected on the query, analyze the pathname to ensure
        // that the locale matches.
        if (detectedLocale) {
            const analysis = this.analyze(pathname);
            // If the analysis contained a locale we should validate it against the
            // query and strip it from the pathname.
            if (analysis.detectedLocale) {
                if (analysis.detectedLocale !== detectedLocale) {
                    console.warn(`The detected locale does not match the locale in the query. Expected to find '${detectedLocale}' in '${pathname}' but found '${analysis.detectedLocale}'}`);
                }
                pathname = analysis.pathname;
            }
        }
        return {
            pathname,
            detectedLocale,
            inferredFromDefault: (0, _requestmeta.getRequestMeta)(req, 'localeInferredFromDefault') ?? false
        };
    }
    /**
   * Analyzes the pathname for a locale and returns the pathname without it.
   *
   * @param pathname The pathname that could contain a locale prefix.
   * @param options The options to use when matching the locale.
   * @returns The matched locale and the pathname without the locale prefix
   *          (if any).
   */ analyze(pathname, options = {}) {
        let detectedLocale = options.defaultLocale;
        // By default, we assume that the default locale was inferred if there was
        // no detected locale.
        let inferredFromDefault = typeof detectedLocale === 'string';
        // The first segment will be empty, because it has a leading `/`. If
        // there is no further segment, there is no locale (or it's the default).
        const segments = pathname.split('/', 2);
        if (!segments[1]) return {
            detectedLocale,
            pathname,
            inferredFromDefault
        };
        // The second segment will contain the locale part if any.
        const segment = segments[1].toLowerCase();
        // See if the segment matches one of the locales. If it doesn't, there is
        // no locale (or it's the default).
        const index = this.lowerCaseLocales.indexOf(segment);
        if (index < 0) return {
            detectedLocale,
            pathname,
            inferredFromDefault
        };
        // Return the case-sensitive locale.
        detectedLocale = this.config.locales[index];
        inferredFromDefault = false;
        // Remove the `/${locale}` part of the pathname.
        pathname = pathname.slice(detectedLocale.length + 1) || '/';
        return {
            detectedLocale,
            pathname,
            inferredFromDefault
        };
    }
} //# sourceMappingURL=i18n-provider.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/match-next-data-pathname.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "matchNextDataPathname", {
    enumerable: true,
    get: function() {
        return matchNextDataPathname;
    }
});
const _pathmatch = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/path-match.js [app-ssr] (ecmascript)");
const matcher = (0, _pathmatch.getPathMatch)('/_next/data/:path*');
function matchNextDataPathname(pathname) {
    if (typeof pathname !== 'string') return false;
    return matcher(pathname);
} //# sourceMappingURL=match-next-data-pathname.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/server-action-request-meta.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getIsPossibleServerAction: null,
    getServerActionRequestMetadata: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getIsPossibleServerAction: function() {
        return getIsPossibleServerAction;
    },
    getServerActionRequestMetadata: function() {
        return getServerActionRequestMetadata;
    }
});
const _approuterheaders = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/components/app-router-headers.js [app-ssr] (ecmascript)");
function getServerActionRequestMetadata(req) {
    let actionId;
    let contentType;
    if (req.headers instanceof Headers) {
        actionId = req.headers.get(_approuterheaders.ACTION_HEADER) ?? null;
        contentType = req.headers.get('content-type');
    } else {
        actionId = req.headers[_approuterheaders.ACTION_HEADER] ?? null;
        contentType = req.headers['content-type'] ?? null;
    }
    const isURLEncodedAction = Boolean(req.method === 'POST' && contentType === 'application/x-www-form-urlencoded');
    const isMultipartAction = Boolean(req.method === 'POST' && (contentType == null ? void 0 : contentType.startsWith('multipart/form-data')));
    const isFetchAction = Boolean(actionId !== undefined && typeof actionId === 'string' && req.method === 'POST');
    const isPossibleServerAction = Boolean(isFetchAction || isURLEncodedAction || isMultipartAction);
    return {
        actionId,
        isURLEncodedAction,
        isMultipartAction,
        isFetchAction,
        isPossibleServerAction
    };
}
function getIsPossibleServerAction(req) {
    return getServerActionRequestMetadata(req).isPossibleServerAction;
} //# sourceMappingURL=server-action-request-meta.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/patch-set-header.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "patchSetHeaderWithCookieSupport", {
    enumerable: true,
    get: function() {
        return patchSetHeaderWithCookieSupport;
    }
});
const _requestmeta = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/request-meta.js [app-ssr] (ecmascript)");
function patchSetHeaderWithCookieSupport(req, res) {
    const setHeader = res.setHeader.bind(res);
    res.setHeader = (name, value)=>{
        // When renders /_error after page is failed, it could attempt to set
        // headers after headers.
        if ('headersSent' in res && res.headersSent) {
            return res;
        }
        if (name.toLowerCase() === 'set-cookie') {
            const middlewareValue = (0, _requestmeta.getRequestMeta)(req, 'middlewareCookie');
            if (!middlewareValue || !Array.isArray(value) || !value.every((item, idx)=>item === middlewareValue[idx])) {
                value = [
                    // TODO: (wyattjoh) find out why this is called multiple times resulting in duplicate cookies being added
                    ...new Set([
                        ...middlewareValue || [],
                        ...typeof value === 'string' ? [
                            value
                        ] : Array.isArray(value) ? value : []
                    ])
                ];
            }
        }
        return setHeader(name, value);
    };
} //# sourceMappingURL=patch-set-header.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/implicit-tags.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImplicitTags", {
    enumerable: true,
    get: function() {
        return getImplicitTags;
    }
});
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-ssr] (ecmascript)");
const _handlers = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/use-cache/handlers.js [app-ssr] (ecmascript)");
const _lazyresult = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lazy-result.js [app-ssr] (ecmascript)");
const getDerivedTags = (pathname)=>{
    const derivedTags = [
        `/layout`
    ];
    // we automatically add the current path segments as tags
    // for revalidatePath handling
    if (pathname.startsWith('/')) {
        const pathnameParts = pathname.split('/');
        for(let i = 1; i < pathnameParts.length + 1; i++){
            let curPathname = pathnameParts.slice(0, i).join('/');
            if (curPathname) {
                // all derived tags other than the page are layout tags
                if (!curPathname.endsWith('/page') && !curPathname.endsWith('/route')) {
                    curPathname = `${curPathname}${!curPathname.endsWith('/') ? '/' : ''}layout`;
                }
                derivedTags.push(curPathname);
            }
        }
    }
    return derivedTags;
};
/**
 * Creates a map with lazy results that fetch the expiration value for the given
 * tags and respective cache kind when they're awaited for the first time.
 */ function createTagsExpirationsByCacheKind(tags) {
    const expirationsByCacheKind = new Map();
    const cacheHandlers = (0, _handlers.getCacheHandlerEntries)();
    if (cacheHandlers) {
        for (const [kind, cacheHandler] of cacheHandlers){
            if ('getExpiration' in cacheHandler) {
                expirationsByCacheKind.set(kind, (0, _lazyresult.createLazyResult)(async ()=>cacheHandler.getExpiration(tags)));
            }
        }
    }
    return expirationsByCacheKind;
}
async function getImplicitTags(page, url, fallbackRouteParams) {
    const tags = new Set();
    // Add the derived tags from the page.
    const derivedTags = getDerivedTags(page);
    for (let tag of derivedTags){
        tag = `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}${tag}`;
        tags.add(tag);
    }
    // Add the tags from the pathname. If the route has unknown params, we don't
    // want to add the pathname as a tag, as it will be invalid.
    if (url.pathname && (!fallbackRouteParams || fallbackRouteParams.size === 0)) {
        const tag = `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}${url.pathname}`;
        tags.add(tag);
    }
    if (tags.has(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/`)) {
        tags.add(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/index`);
    }
    if (tags.has(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/index`)) {
        tags.add(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/`);
    }
    const tagsArray = Array.from(tags);
    return {
        tags: tagsArray,
        expirationsByCacheKind: createTagsExpirationsByCacheKind(tagsArray)
    };
} //# sourceMappingURL=implicit-tags.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/streaming-metadata.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isHtmlBotRequest: null,
    shouldServeStreamingMetadata: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isHtmlBotRequest: function() {
        return isHtmlBotRequest;
    },
    shouldServeStreamingMetadata: function() {
        return shouldServeStreamingMetadata;
    }
});
const _isbot = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/is-bot.js [app-ssr] (ecmascript)");
function shouldServeStreamingMetadata(userAgent, htmlLimitedBots) {
    const blockingMetadataUARegex = new RegExp(htmlLimitedBots || _isbot.HTML_LIMITED_BOT_UA_RE_STRING, 'i');
    // Only block metadata for HTML-limited bots
    if (userAgent && blockingMetadataUARegex.test(userAgent)) {
        return false;
    }
    return true;
}
function isHtmlBotRequest(req) {
    const ua = req.headers['user-agent'] || '';
    const botType = (0, _isbot.getBotType)(ua);
    return botType === 'html';
} //# sourceMappingURL=streaming-metadata.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/fix-mojibake.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// x-matched-path header can be decoded incorrectly
// and should only be utf8 characters so this fixes
// incorrectly encoded values
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fixMojibake", {
    enumerable: true,
    get: function() {
        return fixMojibake;
    }
});
function fixMojibake(input) {
    // Convert each character's char code to a byte
    const bytes = new Uint8Array(input.length);
    for(let i = 0; i < input.length; i++){
        bytes[i] = input.charCodeAt(i);
    }
    // Decode the bytes as proper UTF-8
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
} //# sourceMappingURL=fix-mojibake.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isPostpone", {
    enumerable: true,
    get: function() {
        return isPostpone;
    }
});
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
} //# sourceMappingURL=is-postpone.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/module-loader/node-module-loader.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NodeModuleLoader", {
    enumerable: true,
    get: function() {
        return NodeModuleLoader;
    }
});
class NodeModuleLoader {
    async load(id) {
        if ("TURBOPACK compile-time truthy", 1) {
            // Need to `await` to cover the case that route is marked ESM modules by ESM escalation.
            return await (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : (()=>{
                const e = new Error("Cannot find module as expression is too dynamic");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })());
        }
        //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=node-module-loader.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/trace/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getTracedMetadata", {
    enumerable: true,
    get: function() {
        return getTracedMetadata;
    }
});
function getTracedMetadata(traceData, clientTraceMetadata) {
    if (!clientTraceMetadata) return undefined;
    return traceData.filter(({ key })=>clientTraceMetadata.includes(key));
} //# sourceMappingURL=utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/decode-path-params.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "decodePathParams", {
    enumerable: true,
    get: function() {
        return decodePathParams;
    }
});
const _escapepathdelimiters = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/escape-path-delimiters.js [app-ssr] (ecmascript)"));
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * We only encode path delimiters for path segments from
 * getStaticPaths so we need to attempt decoding the URL
 * to match against and only escape the path delimiters
 * this allows non-ascii values to be handled e.g.
 * Japanese characters.
 * */ function decodePathParams(pathname) {
    // TODO: investigate adding this handling for non-SSG
    // pages so non-ascii names also work there.
    return pathname.split('/').map((seg)=>{
        try {
            seg = (0, _escapepathdelimiters.default)(decodeURIComponent(seg), true);
        } catch (_) {
            // An improperly encoded URL was provided
            throw Object.defineProperty(new _utils.DecodeError('Failed to decode path param(s).'), "__NEXT_ERROR_CODE", {
                value: "E539",
                enumerable: false,
                configurable: true
            });
        }
        return seg;
    }).join('/');
} //# sourceMappingURL=decode-path-params.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/cpu-profile.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const privateCpuProfileName = process.env.__NEXT_PRIVATE_CPU_PROFILE;
const isCpuProfileEnabled = process.env.NEXT_CPU_PROF || privateCpuProfileName;
if (isCpuProfileEnabled) {
    const { Session } = __turbopack_context__.r("[externals]/inspector [external] (inspector, cjs)");
    const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    const session = new Session();
    session.connect();
    session.post('Profiler.enable');
    session.post('Profiler.start');
    function saveProfile() {
        session.post('Profiler.stop', (error, param)=>{
            if (error) {
                console.error('Cannot generate CPU profiling:', error);
                return;
            }
            // Write profile to disk
            const filename = `${privateCpuProfileName || 'CPU.main'}.${Date.now()}.cpuprofile`;
            fs.writeFileSync(`./${filename}`, JSON.stringify(param.profile));
            process.exit(0);
        });
    }
    process.on('SIGINT', saveProfile);
    process.on('SIGTERM', saveProfile);
    process.on('exit', saveProfile);
} //# sourceMappingURL=cpu-profile.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/filesystem.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    buildCustomRoute: null,
    setupFsCheck: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    buildCustomRoute: function() {
        return buildCustomRoute;
    },
    setupFsCheck: function() {
        return setupFsCheck;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/path [external] (path, cjs)"));
const _promises = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/fs/promises [external] (fs/promises, cjs)"));
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-ssr] (ecmascript)"));
const _debug = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/debug/index.js [app-ssr] (ecmascript)"));
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-ssr] (ecmascript)");
const _loadcustomroutes = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/load-custom-routes.js [app-ssr] (ecmascript)"));
const _redirectstatus = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/redirect-status.js [app-ssr] (ecmascript)");
const _fileexists = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/file-exists.js [app-ssr] (ecmascript)");
const _recursivereaddir = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/recursive-readdir.js [app-ssr] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/index.js [app-ssr] (ecmascript)");
const _escaperegexp = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/escape-regexp.js [app-ssr] (ecmascript)");
const _pathmatch = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/path-match.js [app-ssr] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-regex.js [app-ssr] (ecmascript)");
const _routematcher = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-matcher.js [app-ssr] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-ssr] (ecmascript)");
const _normalizelocalepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [app-ssr] (ecmascript)");
const _removepathprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-ssr] (ecmascript)");
const _middlewareroutematcher = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/middleware-route-matcher.js [app-ssr] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-ssr] (ecmascript)");
const _normalizepathsep = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [app-ssr] (ecmascript)");
const _getmetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-ssr] (ecmascript)");
const _rsc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/normalizers/request/rsc.js [app-ssr] (ecmascript)");
const _prefetchrsc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/normalizers/request/prefetch-rsc.js [app-ssr] (ecmascript)");
const _encodeuripath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)");
const _ismetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/is-metadata-route.js [app-ssr] (ecmascript)");
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
const debug = (0, _debug.default)('next:router-server:filesystem');
const buildCustomRoute = (type, item, basePath, caseSensitive)=>{
    const restrictedRedirectPaths = [
        '/_next'
    ].map((p)=>basePath ? `${basePath}${p}` : p);
    let builtRegex = '';
    const match = (0, _pathmatch.getPathMatch)(item.source, {
        strict: true,
        removeUnnamedParams: true,
        regexModifier: (regex)=>{
            if (!item.internal) {
                regex = (0, _redirectstatus.modifyRouteRegex)(regex, type === 'redirect' ? restrictedRedirectPaths : undefined);
            }
            builtRegex = regex;
            return builtRegex;
        },
        sensitive: caseSensitive
    });
    return {
        ...item,
        regex: builtRegex,
        ...type === 'rewrite' ? {
            check: true
        } : {},
        match
    };
};
async function setupFsCheck(opts) {
    const getItemsLru = !opts.dev ? new _lrucache.LRUCache(1024 * 1024, function length(value) {
        if (!value) return 0;
        return (value.fsPath || '').length + value.itemPath.length + value.type.length;
    }) : undefined;
    // routes that have _next/data endpoints (SSG/SSP)
    const nextDataRoutes = new Set();
    const publicFolderItems = new Set();
    const nextStaticFolderItems = new Set();
    const legacyStaticFolderItems = new Set();
    const appFiles = new Set();
    const pageFiles = new Set();
    // Map normalized path to the file path. This is essential
    // for parallel and group routes as their original path
    // cannot be restored from the request path.
    // Example:
    // [normalized-path] -> [file-path]
    // /icon-<hash>.png -> .../app/@parallel/icon.png
    // /icon-<hash>.png -> .../app/(group)/icon.png
    // /icon.png -> .../app/icon.png
    const staticMetadataFiles = new Map();
    let dynamicRoutes = [];
    let middlewareMatcher = ()=>false;
    const distDir = _path.default.join(opts.dir, opts.config.distDir);
    const publicFolderPath = _path.default.join(opts.dir, 'public');
    const nextStaticFolderPath = _path.default.join(distDir, 'static');
    const legacyStaticFolderPath = _path.default.join(opts.dir, 'static');
    let customRoutes = {
        redirects: [],
        rewrites: {
            beforeFiles: [],
            afterFiles: [],
            fallback: []
        },
        headers: []
    };
    let buildId = 'development';
    let prerenderManifest;
    if (!opts.dev) {
        var _middlewareManifest_middleware_, _middlewareManifest_middleware;
        const buildIdPath = _path.default.join(opts.dir, opts.config.distDir, _constants.BUILD_ID_FILE);
        try {
            buildId = await _promises.default.readFile(buildIdPath, 'utf8');
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
            throw Object.defineProperty(new Error(`Could not find a production build in the '${opts.config.distDir}' directory. Try building your app with 'next build' before starting the production server. https://nextjs.org/docs/messages/production-start-no-build-id`), "__NEXT_ERROR_CODE", {
                value: "E427",
                enumerable: false,
                configurable: true
            });
        }
        try {
            for (const file of (await (0, _recursivereaddir.recursiveReadDir)(publicFolderPath))){
                // Ensure filename is encoded and normalized.
                publicFolderItems.add((0, _encodeuripath.encodeURIPath)((0, _normalizepathsep.normalizePathSep)(file)));
            }
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        try {
            for (const file of (await (0, _recursivereaddir.recursiveReadDir)(legacyStaticFolderPath))){
                // Ensure filename is encoded and normalized.
                legacyStaticFolderItems.add((0, _encodeuripath.encodeURIPath)((0, _normalizepathsep.normalizePathSep)(file)));
            }
            _log.warn(`The static directory has been deprecated in favor of the public directory. https://nextjs.org/docs/messages/static-dir-deprecated`);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        try {
            for (const file of (await (0, _recursivereaddir.recursiveReadDir)(nextStaticFolderPath))){
                // Ensure filename is encoded and normalized.
                nextStaticFolderItems.add(_path.default.posix.join('/_next/static', (0, _encodeuripath.encodeURIPath)((0, _normalizepathsep.normalizePathSep)(file))));
            }
        } catch (err) {
            if (opts.config.output !== 'standalone') throw err;
        }
        const routesManifestPath = _path.default.join(distDir, _constants.ROUTES_MANIFEST);
        const prerenderManifestPath = _path.default.join(distDir, _constants.PRERENDER_MANIFEST);
        const middlewareManifestPath = _path.default.join(distDir, 'server', _constants.MIDDLEWARE_MANIFEST);
        const functionsConfigManifestPath = _path.default.join(distDir, 'server', _constants.FUNCTIONS_CONFIG_MANIFEST);
        const pagesManifestPath = _path.default.join(distDir, 'server', _constants.PAGES_MANIFEST);
        const appRoutesManifestPath = _path.default.join(distDir, _constants.APP_PATH_ROUTES_MANIFEST);
        const routesManifest = JSON.parse(await _promises.default.readFile(routesManifestPath, 'utf8'));
        prerenderManifest = JSON.parse(await _promises.default.readFile(prerenderManifestPath, 'utf8'));
        const middlewareManifest = JSON.parse(await _promises.default.readFile(middlewareManifestPath, 'utf8').catch(()=>'{}'));
        const functionsConfigManifest = JSON.parse(await _promises.default.readFile(functionsConfigManifestPath, 'utf8').catch(()=>'{}'));
        const pagesManifest = JSON.parse(await _promises.default.readFile(pagesManifestPath, 'utf8'));
        const appRoutesManifest = JSON.parse(await _promises.default.readFile(appRoutesManifestPath, 'utf8').catch(()=>'{}'));
        for (const key of Object.keys(pagesManifest)){
            // ensure the non-locale version is in the set
            if (opts.config.i18n) {
                pageFiles.add((0, _normalizelocalepath.normalizeLocalePath)(key, opts.config.i18n.locales).pathname);
            } else {
                pageFiles.add(key);
            }
        }
        for (const key of Object.keys(appRoutesManifest)){
            appFiles.add(appRoutesManifest[key]);
        }
        const escapedBuildId = (0, _escaperegexp.escapeStringRegexp)(buildId);
        for (const route of routesManifest.dataRoutes){
            if ((0, _utils.isDynamicRoute)(route.page)) {
                const routeRegex = (0, _routeregex.getNamedRouteRegex)(route.page, {
                    prefixRouteKeys: true
                });
                dynamicRoutes.push({
                    ...route,
                    regex: routeRegex.re.toString(),
                    namedRegex: routeRegex.namedRegex,
                    routeKeys: routeRegex.routeKeys,
                    match: (0, _routematcher.getRouteMatcher)({
                        // TODO: fix this in the manifest itself, must also be fixed in
                        // upstream builder that relies on this
                        re: opts.config.i18n ? new RegExp(route.dataRouteRegex.replace(`/${escapedBuildId}/`, `/${escapedBuildId}/(?<nextLocale>[^/]+?)/`)) : new RegExp(route.dataRouteRegex),
                        groups: routeRegex.groups
                    })
                });
            }
            nextDataRoutes.add(route.page);
        }
        for (const route of routesManifest.dynamicRoutes){
            // If a route is marked as skipInternalRouting, it's not for the internal
            // router, and instead has been added to support external routers.
            if (route.skipInternalRouting) {
                continue;
            }
            dynamicRoutes.push({
                ...route,
                match: (0, _routematcher.getRouteMatcher)((0, _routeregex.getRouteRegex)(route.page))
            });
        }
        if ((_middlewareManifest_middleware = middlewareManifest.middleware) == null ? void 0 : (_middlewareManifest_middleware_ = _middlewareManifest_middleware['/']) == null ? void 0 : _middlewareManifest_middleware_.matchers) {
            var _middlewareManifest_middleware_1, _middlewareManifest_middleware1;
            middlewareMatcher = (0, _middlewareroutematcher.getMiddlewareRouteMatcher)((_middlewareManifest_middleware1 = middlewareManifest.middleware) == null ? void 0 : (_middlewareManifest_middleware_1 = _middlewareManifest_middleware1['/']) == null ? void 0 : _middlewareManifest_middleware_1.matchers);
        } else if (functionsConfigManifest == null ? void 0 : functionsConfigManifest.functions['/_middleware']) {
            middlewareMatcher = (0, _middlewareroutematcher.getMiddlewareRouteMatcher)(functionsConfigManifest.functions['/_middleware'].matchers ?? [
                {
                    regexp: '.*',
                    originalSource: '/:path*'
                }
            ]);
        }
        customRoutes = {
            redirects: routesManifest.redirects,
            rewrites: routesManifest.rewrites ? Array.isArray(routesManifest.rewrites) ? {
                beforeFiles: [],
                afterFiles: routesManifest.rewrites,
                fallback: []
            } : routesManifest.rewrites : {
                beforeFiles: [],
                afterFiles: [],
                fallback: []
            },
            headers: routesManifest.headers
        };
    } else {
        // dev handling
        customRoutes = await (0, _loadcustomroutes.default)(opts.config);
        prerenderManifest = {
            version: 4,
            routes: {},
            dynamicRoutes: {},
            notFoundRoutes: [],
            preview: {
                previewModeId: __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)").randomBytes(16).toString('hex'),
                previewModeSigningKey: __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)").randomBytes(32).toString('hex'),
                previewModeEncryptionKey: __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)").randomBytes(32).toString('hex')
            }
        };
    }
    const headers = customRoutes.headers.map((item)=>buildCustomRoute('header', item, opts.config.basePath, opts.config.experimental.caseSensitiveRoutes));
    const redirects = customRoutes.redirects.map((item)=>buildCustomRoute('redirect', item, opts.config.basePath, opts.config.experimental.caseSensitiveRoutes));
    const rewrites = {
        beforeFiles: customRoutes.rewrites.beforeFiles.map((item)=>buildCustomRoute('before_files_rewrite', item)),
        afterFiles: customRoutes.rewrites.afterFiles.map((item)=>buildCustomRoute('rewrite', item, opts.config.basePath, opts.config.experimental.caseSensitiveRoutes)),
        fallback: customRoutes.rewrites.fallback.map((item)=>buildCustomRoute('rewrite', item, opts.config.basePath, opts.config.experimental.caseSensitiveRoutes))
    };
    const { i18n } = opts.config;
    const handleLocale = (pathname, locales)=>{
        let locale;
        if (i18n) {
            const i18nResult = (0, _normalizelocalepath.normalizeLocalePath)(pathname, locales || i18n.locales);
            pathname = i18nResult.pathname;
            locale = i18nResult.detectedLocale;
        }
        return {
            locale,
            pathname
        };
    };
    debug('nextDataRoutes', nextDataRoutes);
    debug('dynamicRoutes', dynamicRoutes);
    debug('customRoutes', customRoutes);
    debug('publicFolderItems', publicFolderItems);
    debug('nextStaticFolderItems', nextStaticFolderItems);
    debug('pageFiles', pageFiles);
    debug('appFiles', appFiles);
    let ensureFn;
    const normalizers = {
        // Because we can't know if the app directory is enabled or not at this
        // stage, we assume that it is.
        rsc: new _rsc.RSCPathnameNormalizer(),
        prefetchRSC: opts.config.experimental.ppr ? new _prefetchrsc.PrefetchRSCPathnameNormalizer() : undefined
    };
    return {
        headers,
        rewrites,
        redirects,
        buildId,
        handleLocale,
        appFiles,
        pageFiles,
        staticMetadataFiles,
        dynamicRoutes,
        nextDataRoutes,
        exportPathMapRoutes: undefined,
        devVirtualFsItems: new Set(),
        prerenderManifest,
        middlewareMatcher: middlewareMatcher,
        ensureCallback (fn) {
            ensureFn = fn;
        },
        async getItem (itemPath) {
            const originalItemPath = itemPath;
            const itemKey = originalItemPath;
            const lruResult = getItemsLru == null ? void 0 : getItemsLru.get(itemKey);
            if (lruResult) {
                return lruResult;
            }
            const { basePath } = opts.config;
            const hasBasePath = (0, _pathhasprefix.pathHasPrefix)(itemPath, basePath);
            // Return null if path doesn't start with basePath
            if (basePath && !hasBasePath) {
                return null;
            }
            // Remove basePath if it exists.
            if (basePath && hasBasePath) {
                itemPath = (0, _removepathprefix.removePathPrefix)(itemPath, basePath) || '/';
            }
            // Simulate minimal mode requests by normalizing RSC and postponed
            // requests.
            if (opts.minimalMode) {
                var _normalizers_prefetchRSC;
                if ((_normalizers_prefetchRSC = normalizers.prefetchRSC) == null ? void 0 : _normalizers_prefetchRSC.match(itemPath)) {
                    itemPath = normalizers.prefetchRSC.normalize(itemPath, true);
                } else if (normalizers.rsc.match(itemPath)) {
                    itemPath = normalizers.rsc.normalize(itemPath, true);
                }
            }
            if (itemPath !== '/' && itemPath.endsWith('/')) {
                itemPath = itemPath.substring(0, itemPath.length - 1);
            }
            let decodedItemPath = itemPath;
            try {
                decodedItemPath = decodeURIComponent(itemPath);
            } catch  {}
            if (itemPath === '/_next/image') {
                return {
                    itemPath,
                    type: 'nextImage'
                };
            }
            if (opts.dev && (0, _ismetadataroute.isMetadataRouteFile)(itemPath, [], false)) {
                const fsPath = staticMetadataFiles.get(itemPath);
                if (fsPath) {
                    return {
                        // "nextStaticFolder" sets Cache-Control "no-store" on dev.
                        type: 'nextStaticFolder',
                        fsPath,
                        itemPath: fsPath
                    };
                }
            }
            const itemsToCheck = [
                [
                    this.devVirtualFsItems,
                    'devVirtualFsItem'
                ],
                [
                    nextStaticFolderItems,
                    'nextStaticFolder'
                ],
                [
                    legacyStaticFolderItems,
                    'legacyStaticFolder'
                ],
                [
                    publicFolderItems,
                    'publicFolder'
                ],
                [
                    appFiles,
                    'appFile'
                ],
                [
                    pageFiles,
                    'pageFile'
                ]
            ];
            for (let [items, type] of itemsToCheck){
                let locale;
                let curItemPath = itemPath;
                let curDecodedItemPath = decodedItemPath;
                const isDynamicOutput = type === 'pageFile' || type === 'appFile';
                if (i18n) {
                    var _i18n_domains;
                    const localeResult = handleLocale(itemPath, // default locale but no other locale
                    isDynamicOutput ? undefined : [
                        i18n == null ? void 0 : i18n.defaultLocale,
                        // default locales from domains need to be matched too
                        ...((_i18n_domains = i18n.domains) == null ? void 0 : _i18n_domains.map((item)=>item.defaultLocale)) || []
                    ]);
                    if (localeResult.pathname !== curItemPath) {
                        curItemPath = localeResult.pathname;
                        locale = localeResult.locale;
                        try {
                            curDecodedItemPath = decodeURIComponent(curItemPath);
                        } catch  {}
                    }
                }
                if (type === 'legacyStaticFolder') {
                    if (!(0, _pathhasprefix.pathHasPrefix)(curItemPath, '/static')) {
                        continue;
                    }
                    curItemPath = curItemPath.substring('/static'.length);
                    try {
                        curDecodedItemPath = decodeURIComponent(curItemPath);
                    } catch  {}
                }
                if (type === 'nextStaticFolder' && !(0, _pathhasprefix.pathHasPrefix)(curItemPath, '/_next/static')) {
                    continue;
                }
                const nextDataPrefix = `/_next/data/${buildId}/`;
                if (type === 'pageFile' && curItemPath.startsWith(nextDataPrefix) && curItemPath.endsWith('.json')) {
                    items = nextDataRoutes;
                    // remove _next/data/<build-id> prefix
                    curItemPath = curItemPath.substring(nextDataPrefix.length - 1);
                    // remove .json postfix
                    curItemPath = curItemPath.substring(0, curItemPath.length - '.json'.length);
                    const curLocaleResult = handleLocale(curItemPath);
                    curItemPath = curLocaleResult.pathname === '/index' ? '/' : curLocaleResult.pathname;
                    locale = curLocaleResult.locale;
                    try {
                        curDecodedItemPath = decodeURIComponent(curItemPath);
                    } catch  {}
                }
                let matchedItem = items.has(curItemPath);
                // check decoded variant as well
                if (!matchedItem && !opts.dev) {
                    matchedItem = items.has(curDecodedItemPath);
                    if (matchedItem) curItemPath = curDecodedItemPath;
                    else {
                        // x-ref: https://github.com/vercel/next.js/issues/54008
                        // There're cases that urls get decoded before requests, we should support both encoded and decoded ones.
                        // e.g. nginx could decode the proxy urls, the below ones should be treated as the same:
                        // decoded version: `/_next/static/chunks/pages/blog/[slug]-d4858831b91b69f6.js`
                        // encoded version: `/_next/static/chunks/pages/blog/%5Bslug%5D-d4858831b91b69f6.js`
                        try {
                            // encode the special characters in the path and retrieve again to determine if path exists.
                            const encodedCurItemPath = (0, _encodeuripath.encodeURIPath)(curItemPath);
                            matchedItem = items.has(encodedCurItemPath);
                        } catch  {}
                    }
                }
                if (matchedItem || opts.dev) {
                    let fsPath;
                    let itemsRoot;
                    switch(type){
                        case 'nextStaticFolder':
                            {
                                itemsRoot = nextStaticFolderPath;
                                curItemPath = curItemPath.substring('/_next/static'.length);
                                break;
                            }
                        case 'legacyStaticFolder':
                            {
                                itemsRoot = legacyStaticFolderPath;
                                break;
                            }
                        case 'publicFolder':
                            {
                                itemsRoot = publicFolderPath;
                                break;
                            }
                        case 'appFile':
                        case 'pageFile':
                        case 'nextImage':
                        case 'devVirtualFsItem':
                            {
                                break;
                            }
                        default:
                            {
                                ;
                                type;
                            }
                    }
                    if (itemsRoot && curItemPath) {
                        fsPath = _path.default.posix.join(itemsRoot, curItemPath);
                    }
                    // dynamically check fs in development so we don't
                    // have to wait on the watcher
                    if (!matchedItem && opts.dev) {
                        const isStaticAsset = [
                            'nextStaticFolder',
                            'publicFolder',
                            'legacyStaticFolder'
                        ].includes(type);
                        if (isStaticAsset && itemsRoot) {
                            let found = fsPath && await (0, _fileexists.fileExists)(fsPath, _fileexists.FileType.File);
                            if (!found) {
                                try {
                                    // In dev, we ensure encoded paths match
                                    // decoded paths on the filesystem so check
                                    // that variation as well
                                    const tempItemPath = decodeURIComponent(curItemPath);
                                    fsPath = _path.default.posix.join(itemsRoot, tempItemPath);
                                    found = await (0, _fileexists.fileExists)(fsPath, _fileexists.FileType.File);
                                } catch  {}
                                if (!found) {
                                    continue;
                                }
                            }
                        } else if (type === 'pageFile' || type === 'appFile') {
                            const isAppFile = type === 'appFile';
                            // Attempt to ensure the page/app file is compiled and ready
                            if (ensureFn) {
                                const ensureItemPath = isAppFile ? (0, _getmetadataroute.normalizeMetadataRoute)(curItemPath) : curItemPath;
                                try {
                                    await ensureFn({
                                        type,
                                        itemPath: ensureItemPath
                                    });
                                } catch (error) {
                                    continue;
                                }
                            }
                        } else {
                            continue;
                        }
                    }
                    // i18n locales aren't matched for app dir
                    if (type === 'appFile' && locale && locale !== (i18n == null ? void 0 : i18n.defaultLocale)) {
                        continue;
                    }
                    const itemResult = {
                        type,
                        fsPath,
                        locale,
                        itemsRoot,
                        itemPath: curItemPath
                    };
                    getItemsLru == null ? void 0 : getItemsLru.set(itemKey, itemResult);
                    return itemResult;
                }
            }
            getItemsLru == null ? void 0 : getItemsLru.set(itemKey, null);
            return null;
        },
        getDynamicRoutes () {
            // this should include data routes
            return this.dynamicRoutes;
        },
        getMiddlewareMatchers () {
            return this.middlewareMatcher;
        }
    };
} //# sourceMappingURL=filesystem.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/proxy-request.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "proxyRequest", {
    enumerable: true,
    get: function() {
        return proxyRequest;
    }
});
const _url = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/url [external] (url, cjs)"));
const _serverrouteutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/server-route-utils.js [app-ssr] (ecmascript)");
const _stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const _detachedpromise = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/detached-promise.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function proxyRequest(req, res, parsedUrl, upgradeHead, reqBody, proxyTimeout) {
    const { query } = parsedUrl;
    delete parsedUrl.query;
    parsedUrl.search = (0, _serverrouteutils.stringifyQuery)(req, query);
    const target = _url.default.format(parsedUrl);
    const HttpProxy = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/http-proxy/index.js [app-ssr] (ecmascript)");
    const proxy = new HttpProxy({
        target,
        changeOrigin: true,
        ignorePath: true,
        ws: true,
        // we limit proxy requests to 30s by default, in development
        // we don't time out WebSocket requests to allow proxying
        proxyTimeout: proxyTimeout === null ? undefined : proxyTimeout || 30000,
        headers: {
            'x-forwarded-host': req.headers.host || ''
        }
    });
    let finished = false;
    // http-proxy does not properly detect a client disconnect in newer
    // versions of Node.js. This is caused because it only listens for the
    // `aborted` event on the our request object, but it also fully reads
    // and closes the request object. Node **will not** fire `aborted` when
    // the request is already closed. Listening for `close` on our response
    // object will detect the disconnect, and we can abort the proxy's
    // connection.
    proxy.on('proxyReq', (proxyReq)=>{
        res.on('close', ()=>proxyReq.destroy());
    });
    proxy.on('proxyRes', (proxyRes)=>{
        if (res.destroyed) {
            proxyRes.destroy();
        } else {
            res.on('close', ()=>proxyRes.destroy());
        }
    });
    proxy.on('proxyRes', (proxyRes, innerReq, innerRes)=>{
        const cleanup = (err)=>{
            // cleanup event listeners to allow clean garbage collection
            proxyRes.removeListener('error', cleanup);
            proxyRes.removeListener('close', cleanup);
            innerRes.removeListener('error', cleanup);
            innerRes.removeListener('close', cleanup);
            // destroy all source streams to propagate the caught event backward
            innerReq.destroy(err);
            proxyRes.destroy(err);
        };
        proxyRes.once('error', cleanup);
        proxyRes.once('close', cleanup);
        innerRes.once('error', cleanup);
        innerRes.once('close', cleanup);
    });
    const detached = new _detachedpromise.DetachedPromise();
    proxy.on('error', (err)=>{
        console.error(`Failed to proxy ${target}`, err);
        if (!finished) {
            finished = true;
            detached.reject(err);
            if (!res.destroyed) {
                if (!(res instanceof _stream.Duplex)) {
                    res.statusCode = 500;
                }
                res.end('Internal Server Error');
            }
        }
    });
    // If upgrade head is present or the response is a Duplex stream, treat as
    // WebSocket request.
    if (upgradeHead || res instanceof _stream.Duplex) {
        proxy.on('proxyReqWs', (proxyReq)=>{
            proxyReq.on('close', ()=>{
                if (!finished) {
                    finished = true;
                    detached.resolve(true);
                }
            });
        });
        proxy.ws(req, res, upgradeHead);
        detached.resolve(true);
    } else {
        proxy.on('proxyReq', (proxyReq)=>{
            proxyReq.on('close', ()=>{
                if (!finished) {
                    finished = true;
                    detached.resolve(true);
                }
            });
        });
        proxy.web(req, res, {
            buffer: reqBody
        });
    }
    // When the proxy finishes proxying the request, shut down the proxy.
    return detached.promise.finally(()=>{
        proxy.close();
    });
} //# sourceMappingURL=proxy-request.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/server-ipc/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    actionsForbiddenHeaders: null,
    filterInternalHeaders: null,
    filterReqHeaders: null,
    ipcForbiddenHeaders: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    actionsForbiddenHeaders: function() {
        return actionsForbiddenHeaders;
    },
    filterInternalHeaders: function() {
        return filterInternalHeaders;
    },
    filterReqHeaders: function() {
        return filterReqHeaders;
    },
    ipcForbiddenHeaders: function() {
        return ipcForbiddenHeaders;
    }
});
const ipcForbiddenHeaders = [
    'accept-encoding',
    'keepalive',
    'keep-alive',
    'content-encoding',
    'transfer-encoding',
    // https://github.com/nodejs/undici/issues/1470
    'connection',
    // marked as unsupported by undici: https://github.com/nodejs/undici/blob/c83b084879fa0bb8e0469d31ec61428ac68160d5/lib/core/request.js#L354
    'expect'
];
const actionsForbiddenHeaders = [
    ...ipcForbiddenHeaders,
    'content-length',
    'set-cookie'
];
const filterReqHeaders = (headers, forbiddenHeaders)=>{
    // Some browsers are not matching spec and sending Content-Length: 0. This causes issues in undici
    // https://github.com/nodejs/undici/issues/2046
    if (headers['content-length'] && headers['content-length'] === '0') {
        delete headers['content-length'];
    }
    for (const [key, value] of Object.entries(headers)){
        if (forbiddenHeaders.includes(key) || !(Array.isArray(value) || typeof value === 'string')) {
            delete headers[key];
        }
    }
    return headers;
};
// These are headers that are only used internally and should
// not be honored from the external request
const INTERNAL_HEADERS = [
    'x-middleware-rewrite',
    'x-middleware-redirect',
    'x-middleware-set-cookie',
    'x-middleware-skip',
    'x-middleware-override-headers',
    'x-middleware-next',
    'x-now-route-matches',
    'x-matched-path'
];
const filterInternalHeaders = (headers)=>{
    for(const header in headers){
        if (INTERNAL_HEADERS.includes(header)) {
            delete headers[header];
        }
    }
}; //# sourceMappingURL=utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/resolve-routes.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getResolveRoutes", {
    enumerable: true,
    get: function() {
        return getResolveRoutes;
    }
});
const _url = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/url [external] (url, cjs)"));
const _nodepath = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)"));
const _debug = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/debug/index.js [app-ssr] (ecmascript)"));
const _bodystreams = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/body-streams.js [app-ssr] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/server-ipc/utils.js [app-ssr] (ecmascript)");
const _serverrouteutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/server-route-utils.js [app-ssr] (ecmascript)");
const _formathostname = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/format-hostname.js [app-ssr] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/web/utils.js [app-ssr] (ecmascript)");
const _pipereadable = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/pipe-readable.js [app-ssr] (ecmascript)");
const _gethostname = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/get-hostname.js [app-ssr] (ecmascript)");
const _redirectstatus = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/redirect-status.js [app-ssr] (ecmascript)");
const _utils2 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-ssr] (ecmascript)");
const _relativizeurl = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/relativize-url.js [app-ssr] (ecmascript)");
const _addpathprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-ssr] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-ssr] (ecmascript)");
const _detectdomainlocale = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js [app-ssr] (ecmascript)");
const _normalizelocalepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [app-ssr] (ecmascript)");
const _removepathprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-ssr] (ecmascript)");
const _nextdata = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/normalizers/request/next-data.js [app-ssr] (ecmascript)");
const _basepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/normalizers/request/base-path.js [app-ssr] (ecmascript)");
const _requestmeta = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/request-meta.js [app-ssr] (ecmascript)");
const _preparedestination = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/prepare-destination.js [app-ssr] (ecmascript)");
const _approuterheaders = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/components/app-router-headers.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug.default)('next:router-server:resolve-routes');
function getResolveRoutes(fsChecker, config, opts, renderServer, renderServerOpts, ensureMiddleware) {
    let routes = null;
    const calculateRoutes = ()=>{
        return [
            // _next/data with middleware handling
            {
                match: ()=>({}),
                name: 'middleware_next_data'
            },
            ...opts.minimalMode ? [] : fsChecker.headers,
            ...opts.minimalMode ? [] : fsChecker.redirects,
            // check middleware (using matchers)
            {
                match: ()=>({}),
                name: 'middleware'
            },
            ...opts.minimalMode ? [] : fsChecker.rewrites.beforeFiles,
            // check middleware (using matchers)
            {
                match: ()=>({}),
                name: 'before_files_end'
            },
            // we check exact matches on fs before continuing to
            // after files rewrites
            {
                match: ()=>({}),
                name: 'check_fs'
            },
            ...opts.minimalMode ? [] : fsChecker.rewrites.afterFiles,
            // we always do the check: true handling before continuing to
            // fallback rewrites
            {
                check: true,
                match: ()=>({}),
                name: 'after files check: true'
            },
            ...opts.minimalMode ? [] : fsChecker.rewrites.fallback
        ];
    };
    async function resolveRoutes({ req, res, isUpgradeReq, invokedOutputs }) {
        var _req_socket, _req_headers_xforwardedproto;
        let finished = false;
        let resHeaders = {};
        let matchedOutput = null;
        let parsedUrl = _url.default.parse(req.url || '', true);
        let didRewrite = false;
        const urlParts = (req.url || '').split('?', 1);
        const urlNoQuery = urlParts[0];
        // Refresh the routes every time in development mode, but only initialize them
        // once in production. We don't need to recompute these every time unless the routes
        // are changing like in development, and the performance can be costly.
        if (!routes || opts.dev) {
            routes = calculateRoutes();
        }
        // this normalizes repeated slashes in the path e.g. hello//world ->
        // hello/world or backslashes to forward slashes, this does not
        // handle trailing slash as that is handled the same as a next.config.js
        // redirect
        if (urlNoQuery == null ? void 0 : urlNoQuery.match(/(\\|\/\/)/)) {
            parsedUrl = _url.default.parse((0, _utils2.normalizeRepeatedSlashes)(req.url), true);
            return {
                parsedUrl,
                resHeaders,
                finished: true,
                statusCode: 308
            };
        }
        // TODO: inherit this from higher up
        const protocol = (req == null ? void 0 : (_req_socket = req.socket) == null ? void 0 : _req_socket.encrypted) || ((_req_headers_xforwardedproto = req.headers['x-forwarded-proto']) == null ? void 0 : _req_headers_xforwardedproto.includes('https')) ? 'https' : 'http';
        // When there are hostname and port we build an absolute URL
        const initUrl = config.experimental.trustHostHeader ? `https://${req.headers.host || 'localhost'}${req.url}` : opts.port ? `${protocol}://${(0, _formathostname.formatHostname)(opts.hostname || 'localhost')}:${opts.port}${req.url}` : req.url || '';
        (0, _requestmeta.addRequestMeta)(req, 'initURL', initUrl);
        (0, _requestmeta.addRequestMeta)(req, 'initQuery', {
            ...parsedUrl.query
        });
        (0, _requestmeta.addRequestMeta)(req, 'initProtocol', protocol);
        if (!isUpgradeReq) {
            const bodySizeLimit = config.experimental.proxyClientMaxBodySize;
            (0, _requestmeta.addRequestMeta)(req, 'clonableBody', (0, _bodystreams.getCloneableBody)(req, bodySizeLimit));
        }
        const maybeAddTrailingSlash = (pathname)=>{
            if (config.trailingSlash && !config.skipProxyUrlNormalize && !pathname.endsWith('/')) {
                return `${pathname}/`;
            }
            return pathname;
        };
        let domainLocale;
        let defaultLocale;
        let initialLocaleResult = undefined;
        if (config.i18n) {
            var _parsedUrl_pathname;
            const hadTrailingSlash = (_parsedUrl_pathname = parsedUrl.pathname) == null ? void 0 : _parsedUrl_pathname.endsWith('/');
            const hadBasePath = (0, _pathhasprefix.pathHasPrefix)(parsedUrl.pathname || '', config.basePath);
            let normalizedPath = parsedUrl.pathname || '/';
            if (config.basePath && (0, _pathhasprefix.pathHasPrefix)(normalizedPath, config.basePath)) {
                normalizedPath = (0, _removepathprefix.removePathPrefix)(normalizedPath, config.basePath);
            } else if (config.assetPrefix && (0, _pathhasprefix.pathHasPrefix)(normalizedPath, config.assetPrefix)) {
                normalizedPath = (0, _removepathprefix.removePathPrefix)(normalizedPath, config.assetPrefix);
            }
            initialLocaleResult = (0, _normalizelocalepath.normalizeLocalePath)(normalizedPath, config.i18n.locales);
            domainLocale = (0, _detectdomainlocale.detectDomainLocale)(config.i18n.domains, (0, _gethostname.getHostname)(parsedUrl, req.headers));
            defaultLocale = (domainLocale == null ? void 0 : domainLocale.defaultLocale) || config.i18n.defaultLocale;
            (0, _requestmeta.addRequestMeta)(req, 'defaultLocale', defaultLocale);
            (0, _requestmeta.addRequestMeta)(req, 'locale', initialLocaleResult.detectedLocale || defaultLocale);
            // ensure locale is present for resolving routes
            if (!initialLocaleResult.detectedLocale && !initialLocaleResult.pathname.startsWith('/_next/')) {
                parsedUrl.pathname = (0, _addpathprefix.addPathPrefix)(initialLocaleResult.pathname === '/' ? `/${defaultLocale}` : (0, _addpathprefix.addPathPrefix)(initialLocaleResult.pathname || '', `/${defaultLocale}`), hadBasePath ? config.basePath : '');
                if (hadTrailingSlash) {
                    parsedUrl.pathname = maybeAddTrailingSlash(parsedUrl.pathname);
                }
            }
        }
        const checkLocaleApi = (pathname)=>{
            if (config.i18n && pathname === urlNoQuery && (initialLocaleResult == null ? void 0 : initialLocaleResult.detectedLocale) && (0, _pathhasprefix.pathHasPrefix)(initialLocaleResult.pathname, '/api')) {
                return true;
            }
        };
        async function checkTrue() {
            const pathname = parsedUrl.pathname || '/';
            if (checkLocaleApi(pathname)) {
                return;
            }
            if (!(invokedOutputs == null ? void 0 : invokedOutputs.has(pathname))) {
                const output = await fsChecker.getItem(pathname);
                if (output) {
                    if (config.useFileSystemPublicRoutes || didRewrite || output.type !== 'appFile' && output.type !== 'pageFile') {
                        return output;
                    }
                }
            }
            const dynamicRoutes = fsChecker.getDynamicRoutes();
            let curPathname = parsedUrl.pathname;
            if (config.basePath) {
                if (!(0, _pathhasprefix.pathHasPrefix)(curPathname || '', config.basePath)) {
                    return;
                }
                curPathname = (curPathname == null ? void 0 : curPathname.substring(config.basePath.length)) || '/';
            }
            const localeResult = fsChecker.handleLocale(curPathname || '');
            for (const route of dynamicRoutes){
                // when resolving fallback: false the
                // render worker may return a no-fallback response
                // which signals we need to continue resolving.
                // TODO: optimize this to collect static paths
                // to use at the routing layer
                if (invokedOutputs == null ? void 0 : invokedOutputs.has(route.page)) {
                    continue;
                }
                const params = route.match(localeResult.pathname);
                if (params) {
                    const pageOutput = await fsChecker.getItem((0, _addpathprefix.addPathPrefix)(route.page, config.basePath || ''));
                    // i18n locales aren't matched for app dir
                    if ((pageOutput == null ? void 0 : pageOutput.type) === 'appFile' && (initialLocaleResult == null ? void 0 : initialLocaleResult.detectedLocale)) {
                        continue;
                    }
                    if (pageOutput && (curPathname == null ? void 0 : curPathname.startsWith('/_next/data'))) {
                        (0, _requestmeta.addRequestMeta)(req, 'isNextDataReq', true);
                    }
                    if (config.useFileSystemPublicRoutes || didRewrite) {
                        return pageOutput;
                    }
                }
            }
        }
        const normalizers = {
            basePath: config.basePath && config.basePath !== '/' ? new _basepath.BasePathPathnameNormalizer(config.basePath) : undefined,
            data: new _nextdata.NextDataPathnameNormalizer(fsChecker.buildId)
        };
        async function handleRoute(route) {
            let curPathname = parsedUrl.pathname || '/';
            if (config.i18n && route.internal) {
                const hadTrailingSlash = curPathname.endsWith('/');
                if (config.basePath) {
                    curPathname = (0, _removepathprefix.removePathPrefix)(curPathname, config.basePath);
                }
                const hadBasePath = curPathname !== parsedUrl.pathname;
                const localeResult = (0, _normalizelocalepath.normalizeLocalePath)(curPathname, config.i18n.locales);
                const isDefaultLocale = localeResult.detectedLocale === defaultLocale;
                if (isDefaultLocale) {
                    curPathname = localeResult.pathname === '/' && hadBasePath ? config.basePath : (0, _addpathprefix.addPathPrefix)(localeResult.pathname, hadBasePath ? config.basePath : '');
                } else if (hadBasePath) {
                    curPathname = curPathname === '/' ? config.basePath : (0, _addpathprefix.addPathPrefix)(curPathname, config.basePath);
                }
                if ((isDefaultLocale || hadBasePath) && hadTrailingSlash) {
                    curPathname = maybeAddTrailingSlash(curPathname);
                }
            }
            let params = route.match(curPathname);
            if ((route.has || route.missing) && params) {
                const hasParams = (0, _preparedestination.matchHas)(req, parsedUrl.query, route.has, route.missing);
                if (hasParams) {
                    Object.assign(params, hasParams);
                } else {
                    params = false;
                }
            }
            if (params) {
                if (fsChecker.exportPathMapRoutes && route.name === 'before_files_end') {
                    for (const exportPathMapRoute of fsChecker.exportPathMapRoutes){
                        const result = await handleRoute(exportPathMapRoute);
                        if (result) {
                            return result;
                        }
                    }
                }
                if (route.name === 'middleware_next_data' && parsedUrl.pathname) {
                    var _fsChecker_getMiddlewareMatchers;
                    if ((_fsChecker_getMiddlewareMatchers = fsChecker.getMiddlewareMatchers()) == null ? void 0 : _fsChecker_getMiddlewareMatchers.length) {
                        var _normalizers_basePath;
                        let normalized = parsedUrl.pathname;
                        // Remove the base path if it exists.
                        const hadBasePath = (_normalizers_basePath = normalizers.basePath) == null ? void 0 : _normalizers_basePath.match(parsedUrl.pathname);
                        if (hadBasePath && normalizers.basePath) {
                            normalized = normalizers.basePath.normalize(normalized, true);
                        }
                        let updated = false;
                        if (normalizers.data.match(normalized)) {
                            updated = true;
                            (0, _requestmeta.addRequestMeta)(req, 'isNextDataReq', true);
                            normalized = normalizers.data.normalize(normalized, true);
                        }
                        if (config.i18n) {
                            const curLocaleResult = (0, _normalizelocalepath.normalizeLocalePath)(normalized, config.i18n.locales);
                            if (curLocaleResult.detectedLocale) {
                                (0, _requestmeta.addRequestMeta)(req, 'locale', curLocaleResult.detectedLocale);
                            }
                        }
                        // If we updated the pathname, and it had a base path, re-add the
                        // base path.
                        if (updated) {
                            if (hadBasePath) {
                                normalized = normalized === '/' ? config.basePath : _nodepath.default.posix.join(config.basePath, normalized);
                            }
                            // Re-add the trailing slash (if required).
                            normalized = maybeAddTrailingSlash(normalized);
                            parsedUrl.pathname = normalized;
                        }
                    }
                }
                if (route.name === 'check_fs') {
                    const pathname = parsedUrl.pathname || '/';
                    if ((invokedOutputs == null ? void 0 : invokedOutputs.has(pathname)) || checkLocaleApi(pathname)) {
                        return;
                    }
                    const output = await fsChecker.getItem(pathname);
                    if (output && !(config.i18n && (initialLocaleResult == null ? void 0 : initialLocaleResult.detectedLocale) && (0, _pathhasprefix.pathHasPrefix)(pathname, '/api'))) {
                        if (config.useFileSystemPublicRoutes || didRewrite || output.type !== 'appFile' && output.type !== 'pageFile') {
                            matchedOutput = output;
                            if (output.locale) {
                                (0, _requestmeta.addRequestMeta)(req, 'locale', output.locale);
                            }
                            return {
                                parsedUrl,
                                resHeaders,
                                finished: true,
                                matchedOutput
                            };
                        }
                    }
                }
                if (!opts.minimalMode && route.name === 'middleware') {
                    const match = fsChecker.getMiddlewareMatchers();
                    let maybeDecodedPathname = parsedUrl.pathname || '/';
                    try {
                        maybeDecodedPathname = decodeURIComponent(maybeDecodedPathname);
                    } catch  {
                    /* non-fatal we can't decode so can't match it */ }
                    if ((match == null ? void 0 : match(parsedUrl.pathname, req, parsedUrl.query)) || (match == null ? void 0 : match(maybeDecodedPathname, req, parsedUrl.query))) {
                        if (ensureMiddleware) {
                            await ensureMiddleware(req.url);
                        }
                        const serverResult = await (renderServer == null ? void 0 : renderServer.initialize(renderServerOpts));
                        if (!serverResult) {
                            throw Object.defineProperty(new Error(`Failed to initialize render server "middleware"`), "__NEXT_ERROR_CODE", {
                                value: "E222",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        (0, _requestmeta.addRequestMeta)(req, 'invokePath', '');
                        (0, _requestmeta.addRequestMeta)(req, 'invokeOutput', '');
                        (0, _requestmeta.addRequestMeta)(req, 'invokeQuery', {});
                        (0, _requestmeta.addRequestMeta)(req, 'middlewareInvoke', true);
                        if (opts.dev) {
                            (0, _requestmeta.addRequestMeta)(req, 'devRequestTimingMiddlewareStart', process.hrtime.bigint());
                        }
                        debug('invoking middleware', req.url, req.headers);
                        let middlewareRes = undefined;
                        let bodyStream = undefined;
                        try {
                            try {
                                await serverResult.requestHandler(req, res, parsedUrl);
                            } catch (err) {
                                if (!('result' in err) || !('response' in err.result)) {
                                    throw err;
                                }
                                middlewareRes = err.result.response;
                                res.statusCode = middlewareRes.status;
                                if (middlewareRes.body) {
                                    bodyStream = middlewareRes.body;
                                } else if (middlewareRes.status) {
                                    bodyStream = new ReadableStream({
                                        start (controller) {
                                            controller.enqueue('');
                                            controller.close();
                                        }
                                    });
                                }
                            } finally{
                                if (opts.dev) {
                                    (0, _requestmeta.addRequestMeta)(req, 'devRequestTimingMiddlewareEnd', process.hrtime.bigint());
                                }
                            }
                        } catch (e) {
                            // If the client aborts before we can receive a response object
                            // (when the headers are flushed), then we can early exit without
                            // further processing.
                            if ((0, _pipereadable.isAbortError)(e)) {
                                return {
                                    parsedUrl,
                                    resHeaders,
                                    finished: true
                                };
                            }
                            throw e;
                        }
                        if (res.closed || res.finished || !middlewareRes) {
                            return {
                                parsedUrl,
                                resHeaders,
                                finished: true
                            };
                        }
                        const middlewareHeaders = (0, _utils1.toNodeOutgoingHttpHeaders)(middlewareRes.headers);
                        debug('middleware res', middlewareRes.status, middlewareHeaders);
                        if (middlewareHeaders['x-middleware-override-headers']) {
                            const overriddenHeaders = new Set();
                            let overrideHeaders = middlewareHeaders['x-middleware-override-headers'];
                            if (typeof overrideHeaders === 'string') {
                                overrideHeaders = overrideHeaders.split(',');
                            }
                            for (const key of overrideHeaders){
                                overriddenHeaders.add(key.trim());
                            }
                            delete middlewareHeaders['x-middleware-override-headers'];
                            // Delete headers.
                            for (const key of Object.keys(req.headers)){
                                if (!overriddenHeaders.has(key)) {
                                    delete req.headers[key];
                                }
                            }
                            // Update or add headers.
                            for (const key of overriddenHeaders.keys()){
                                const valueKey = 'x-middleware-request-' + key;
                                const newValue = middlewareHeaders[valueKey];
                                const oldValue = req.headers[key];
                                if (oldValue !== newValue) {
                                    req.headers[key] = newValue === null ? undefined : newValue;
                                }
                                delete middlewareHeaders[valueKey];
                            }
                        }
                        if (!middlewareHeaders['x-middleware-rewrite'] && !middlewareHeaders['x-middleware-next'] && !middlewareHeaders['location']) {
                            middlewareHeaders['x-middleware-refresh'] = '1';
                        }
                        delete middlewareHeaders['x-middleware-next'];
                        for (const [key, value] of Object.entries({
                            ...(0, _utils.filterReqHeaders)(middlewareHeaders, _utils.ipcForbiddenHeaders)
                        })){
                            if ([
                                'content-length',
                                'x-middleware-rewrite',
                                'x-middleware-redirect',
                                'x-middleware-refresh'
                            ].includes(key)) {
                                continue;
                            }
                            // for set-cookie, the header shouldn't be added to the response
                            // as it's only needed for the request to the middleware function.
                            if (key === 'x-middleware-set-cookie') {
                                req.headers[key] = value;
                                continue;
                            }
                            if (value) {
                                resHeaders[key] = value;
                                req.headers[key] = value;
                            }
                        }
                        if (middlewareHeaders['x-middleware-rewrite']) {
                            const value = middlewareHeaders['x-middleware-rewrite'];
                            const destination = (0, _relativizeurl.getRelativeURL)(value, initUrl);
                            resHeaders['x-middleware-rewrite'] = destination;
                            parsedUrl = _url.default.parse(destination, true);
                            if (parsedUrl.protocol) {
                                return {
                                    parsedUrl,
                                    resHeaders,
                                    finished: true
                                };
                            }
                            if (config.i18n) {
                                const curLocaleResult = (0, _normalizelocalepath.normalizeLocalePath)(parsedUrl.pathname || '', config.i18n.locales);
                                if (curLocaleResult.detectedLocale) {
                                    (0, _requestmeta.addRequestMeta)(req, 'locale', curLocaleResult.detectedLocale);
                                }
                            }
                        }
                        if (middlewareHeaders['location']) {
                            const value = middlewareHeaders['location'];
                            // Only process Location header as a redirect if it has a proper redirect status
                            // This prevents a Location header with non-redirect status from being treated as a redirect
                            const isRedirectStatus = _redirectstatus.allowedStatusCodes.has(middlewareRes.status);
                            if (isRedirectStatus) {
                                // Process as redirect: update parsedUrl and convert to relative URL
                                const rel = (0, _relativizeurl.getRelativeURL)(value, initUrl);
                                resHeaders['location'] = rel;
                                parsedUrl = _url.default.parse(rel, true);
                                return {
                                    parsedUrl,
                                    resHeaders,
                                    finished: true,
                                    statusCode: middlewareRes.status
                                };
                            } else {
                                // Not a redirect: just pass through the Location header
                                resHeaders['location'] = value;
                                return {
                                    parsedUrl,
                                    resHeaders,
                                    finished: true,
                                    bodyStream,
                                    statusCode: middlewareRes.status
                                };
                            }
                        }
                        if (middlewareHeaders['x-middleware-refresh']) {
                            return {
                                parsedUrl,
                                resHeaders,
                                finished: true,
                                bodyStream,
                                statusCode: middlewareRes.status
                            };
                        }
                    }
                }
                // handle redirect
                if (('statusCode' in route || 'permanent' in route) && route.destination) {
                    const { parsedDestination } = (0, _preparedestination.prepareDestination)({
                        appendParamsToQuery: false,
                        destination: route.destination,
                        params: params,
                        query: parsedUrl.query
                    });
                    const { query } = parsedDestination;
                    delete parsedDestination.query;
                    parsedDestination.search = (0, _serverrouteutils.stringifyQuery)(req, query);
                    parsedDestination.pathname = (0, _utils2.normalizeRepeatedSlashes)(parsedDestination.pathname);
                    return {
                        finished: true,
                        // @ts-expect-error custom ParsedUrl
                        parsedUrl: parsedDestination,
                        statusCode: (0, _redirectstatus.getRedirectStatus)(route)
                    };
                }
                // handle headers
                if (route.headers) {
                    const hasParams = Object.keys(params).length > 0;
                    for (const header of route.headers){
                        let { key, value } = header;
                        if (hasParams) {
                            key = (0, _preparedestination.compileNonPath)(key, params);
                            value = (0, _preparedestination.compileNonPath)(value, params);
                        }
                        if (key.toLowerCase() === 'set-cookie') {
                            if (!Array.isArray(resHeaders[key])) {
                                const val = resHeaders[key];
                                resHeaders[key] = typeof val === 'string' ? [
                                    val
                                ] : [];
                            }
                            ;
                            resHeaders[key].push(value);
                        } else {
                            resHeaders[key] = value;
                        }
                    }
                }
                // handle rewrite
                if (route.destination) {
                    var _config_experimental_clientParamParsingOrigins;
                    let rewriteParams = params;
                    const { parsedDestination } = (0, _preparedestination.prepareDestination)({
                        appendParamsToQuery: true,
                        destination: route.destination,
                        params: rewriteParams,
                        query: parsedUrl.query
                    });
                    // Check to see if this is a non-relative rewrite. If it is, we need
                    // to check to see if it's an allowed origin to receive the rewritten
                    // headers.
                    const parsedDestinationOrigin = parsedDestination.origin;
                    const isAllowedOrigin = parsedDestinationOrigin ? (_config_experimental_clientParamParsingOrigins = config.experimental.clientParamParsingOrigins) == null ? void 0 : _config_experimental_clientParamParsingOrigins.some((origin)=>new RegExp(origin).test(parsedDestinationOrigin)) : false;
                    // Set the rewrite headers only if this is a RSC request.
                    if (req.headers[_approuterheaders.RSC_HEADER] === '1' && (!parsedDestination.origin || isAllowedOrigin)) {
                        // We set the rewritten path and query headers on the response now
                        // that we know that the it's not an external rewrite.
                        if (parsedUrl.pathname !== parsedDestination.pathname) {
                            res.setHeader(_approuterheaders.NEXT_REWRITTEN_PATH_HEADER, parsedDestination.pathname);
                        }
                        if (parsedUrl.search !== parsedDestination.search) {
                            res.setHeader(_approuterheaders.NEXT_REWRITTEN_QUERY_HEADER, parsedDestination.search.slice(1));
                        }
                    }
                    if (parsedDestination.protocol) {
                        return {
                            // @ts-expect-error custom ParsedUrl
                            parsedUrl: parsedDestination,
                            finished: true
                        };
                    }
                    if (config.i18n) {
                        const curLocaleResult = (0, _normalizelocalepath.normalizeLocalePath)((0, _removepathprefix.removePathPrefix)(parsedDestination.pathname, config.basePath), config.i18n.locales);
                        if (curLocaleResult.detectedLocale) {
                            (0, _requestmeta.addRequestMeta)(req, 'locale', curLocaleResult.detectedLocale);
                        }
                    }
                    didRewrite = true;
                    parsedUrl.pathname = parsedDestination.pathname;
                    Object.assign(parsedUrl.query, parsedDestination.query);
                }
                // handle check: true
                if (route.check) {
                    const output = await checkTrue();
                    if (output) {
                        return {
                            parsedUrl,
                            resHeaders,
                            finished: true,
                            matchedOutput: output
                        };
                    }
                }
            }
        }
        for (const route of routes){
            const result = await handleRoute(route);
            if (result) {
                return result;
            }
        }
        return {
            finished,
            parsedUrl,
            resHeaders,
            matchedOutput
        };
    }
    return resolveRoutes;
} //# sourceMappingURL=resolve-routes.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/dev-bundler-service.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevBundlerService", {
    enumerable: true,
    get: function() {
        return DevBundlerService;
    }
});
const _lrucache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/lru-cache.js [app-ssr] (ecmascript)");
const _mockrequest = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/mock-request.js [app-ssr] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-ssr] (ecmascript)");
class DevBundlerService {
    constructor(bundler, handler){
        this.bundler = bundler;
        this.handler = handler;
        this.ensurePage = async (definition)=>{
            // TODO: remove after ensure is pulled out of server
            return await this.bundler.hotReloader.ensurePage(definition);
        };
        this.logErrorWithOriginalStack = this.bundler.logErrorWithOriginalStack.bind(this.bundler);
        this.appIsrManifestInner = new _lrucache.LRUCache(8000, function length() {
            return 16;
        });
    }
    async getFallbackErrorComponents(url) {
        await this.bundler.hotReloader.buildFallbackError();
        // Build the error page to ensure the fallback is built too.
        // TODO: See if this can be moved into hotReloader or removed.
        await this.bundler.hotReloader.ensurePage({
            page: '/_error',
            clientOnly: false,
            definition: undefined,
            url
        });
    }
    async getCompilationError(page) {
        const errors = await this.bundler.hotReloader.getCompilationErrors(page);
        if (!errors) return;
        // Return the very first error we found.
        return errors[0];
    }
    async revalidate({ urlPath, revalidateHeaders, opts: revalidateOpts }) {
        const mocked = (0, _mockrequest.createRequestResponseMocks)({
            url: urlPath,
            headers: revalidateHeaders
        });
        await this.handler(mocked.req, mocked.res);
        await mocked.res.hasStreamed;
        if (mocked.res.getHeader('x-nextjs-cache') !== 'REVALIDATED' && mocked.res.statusCode !== 200 && !(mocked.res.statusCode === 404 && revalidateOpts.unstable_onlyGenerated)) {
            throw Object.defineProperty(new Error(`Invalid response ${mocked.res.statusCode}`), "__NEXT_ERROR_CODE", {
                value: "E175",
                enumerable: false,
                configurable: true
            });
        }
        return {};
    }
    get appIsrManifest() {
        const serializableManifest = {};
        for (const [key, value] of this.appIsrManifestInner){
            serializableManifest[key] = value;
        }
        return serializableManifest;
    }
    setCacheStatus(status, htmlRequestId) {
        this.bundler.hotReloader.setCacheStatus(status, htmlRequestId);
    }
    setIsrStatus(key, value) {
        var // or App Router clients that have Cache Components disabled. The ISR
        // manifest is only used to inform the static indicator, which currently
        // does not provide useful information if Cache Components is enabled due to
        // its binary nature (i.e. it does not support showing info for partially
        // static pages).
        _this_bundler_hotReloader, _this_bundler;
        if (value === undefined) {
            this.appIsrManifestInner.remove(key);
        } else {
            this.appIsrManifestInner.set(key, value);
        }
        (_this_bundler = this.bundler) == null ? void 0 : (_this_bundler_hotReloader = _this_bundler.hotReloader) == null ? void 0 : _this_bundler_hotReloader.sendToLegacyClients({
            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ISR_MANIFEST,
            data: this.appIsrManifest
        });
    }
    setReactDebugChannel(debugChannel, htmlRequestId, requestId) {
        this.bundler.hotReloader.setReactDebugChannel(debugChannel, htmlRequestId, requestId);
    }
    close() {
        this.bundler.hotReloader.close();
    }
    triggerHMR(message) {
        this.bundler.hotReloader.send(message);
    }
} //# sourceMappingURL=dev-bundler-service.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/clone-response.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cloneResponse", {
    enumerable: true,
    get: function() {
        return cloneResponse;
    }
});
const noop = ()=>{};
let registry;
if (globalThis.FinalizationRegistry) {
    registry = new FinalizationRegistry((weakRef)=>{
        const stream = weakRef.deref();
        if (stream && !stream.locked) {
            stream.cancel('Response object has been garbage collected').then(noop);
        }
    });
}
function cloneResponse(original) {
    // If the response has no body, then we can just return the original response
    // twice because it's immutable.
    if (!original.body) {
        return [
            original,
            original
        ];
    }
    const [body1, body2] = original.body.tee();
    const cloned1 = new Response(body1, {
        status: original.status,
        statusText: original.statusText,
        headers: original.headers
    });
    Object.defineProperty(cloned1, 'url', {
        value: original.url,
        // How the original response.url behaves
        configurable: true,
        enumerable: true,
        writable: false
    });
    // The Fetch Standard allows users to skip consuming the response body by
    // relying on garbage collection to release connection resources.
    // https://github.com/nodejs/undici?tab=readme-ov-file#garbage-collection
    //
    // To cancel the stream you then need to cancel both resulting branches.
    // Teeing a stream will generally lock it for the duration, preventing other
    // readers from locking it.
    // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/tee
    // cloned2 is stored in a react cache and cloned for subsequent requests.
    // It is the original request, and is is garbage collected by a
    // FinalizationRegistry in Undici, but since we're tee-ing the stream
    // ourselves, we need to cancel clone1's stream (the response returned from
    // our dedupe fetch) when clone1 is reclaimed, otherwise we leak memory.
    if (registry && cloned1.body) {
        registry.register(cloned1, new WeakRef(cloned1.body));
    }
    const cloned2 = new Response(body2, {
        status: original.status,
        statusText: original.statusText,
        headers: original.headers
    });
    Object.defineProperty(cloned2, 'url', {
        value: original.url,
        // How the original response.url behaves
        configurable: true,
        enumerable: true,
        writable: false
    });
    return [
        cloned1,
        cloned2
    ];
} //# sourceMappingURL=clone-response.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/dedupe-fetch.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Based on https://github.com/facebook/react/blob/d4e78c42a94be027b4dc7ed2659a5fddfbf9bd4e/packages/react/src/ReactFetch.js
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDedupeFetch", {
    enumerable: true,
    get: function() {
        return createDedupeFetch;
    }
});
const _react = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _cloneresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/clone-response.js [app-ssr] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
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
const simpleCacheKey = '["GET",[],null,"follow",null,null,null,null]' // generateCacheKey(new Request('https://blank'));
;
// Headers that should not affect deduplication
// traceparent and tracestate are used for distributed tracing and should not affect cache keys
const headersToExcludeInCacheKey = new Set([
    'traceparent',
    'tracestate'
]);
function generateCacheKey(request) {
    // We pick the fields that goes into the key used to dedupe requests.
    // We don't include the `cache` field, because we end up using whatever
    // caching resulted from the first request.
    // Notably we currently don't consider non-standard (or future) options.
    // This might not be safe. TODO: warn for non-standard extensions differing.
    // IF YOU CHANGE THIS UPDATE THE simpleCacheKey ABOVE.
    const filteredHeaders = Array.from(request.headers.entries()).filter(([key])=>!headersToExcludeInCacheKey.has(key.toLowerCase()));
    return JSON.stringify([
        request.method,
        filteredHeaders,
        request.mode,
        request.redirect,
        request.credentials,
        request.referrer,
        request.referrerPolicy,
        request.integrity
    ]);
}
function createDedupeFetch(originalFetch) {
    const getCacheEntries = _react.cache((url)=>[]);
    return function dedupeFetch(resource, options) {
        if (options && options.signal) {
            // If we're passed a signal, then we assume that
            // someone else controls the lifetime of this object and opts out of
            // caching. It's effectively the opt-out mechanism.
            // Ideally we should be able to check this on the Request but
            // it always gets initialized with its own signal so we don't
            // know if it's supposed to override - unless we also override the
            // Request constructor.
            return originalFetch(resource, options);
        }
        // Normalize the Request
        let url;
        let cacheKey;
        if (typeof resource === 'string' && !options) {
            // Fast path.
            cacheKey = simpleCacheKey;
            url = resource;
        } else {
            // Normalize the request.
            // if resource is not a string or a URL (its an instance of Request)
            // then do not instantiate a new Request but instead
            // reuse the request as to not disturb the body in the event it's a ReadableStream.
            const request = typeof resource === 'string' || resource instanceof URL ? new Request(resource, options) : resource;
            if (request.method !== 'GET' && request.method !== 'HEAD' || request.keepalive) {
                // We currently don't dedupe requests that might have side-effects. Those
                // have to be explicitly cached. We assume that the request doesn't have a
                // body if it's GET or HEAD.
                // keepalive gets treated the same as if you passed a custom cache signal.
                return originalFetch(resource, options);
            }
            cacheKey = generateCacheKey(request);
            url = request.url;
        }
        const cacheEntries = getCacheEntries(url);
        for(let i = 0, j = cacheEntries.length; i < j; i += 1){
            const [key, promise] = cacheEntries[i];
            if (key === cacheKey) {
                return promise.then(()=>{
                    const response = cacheEntries[i][2];
                    if (!response) throw Object.defineProperty(new _invarianterror.InvariantError('No cached response'), "__NEXT_ERROR_CODE", {
                        value: "E579",
                        enumerable: false,
                        configurable: true
                    });
                    // We're cloning the response using this utility because there exists
                    // a bug in the undici library around response cloning. See the
                    // following pull request for more details:
                    // https://github.com/vercel/next.js/pull/73274
                    const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(response);
                    cacheEntries[i][2] = cloned2;
                    return cloned1;
                });
            }
        }
        // We pass the original arguments here in case normalizing the Request
        // doesn't include all the options in this environment.
        const promise = originalFetch(resource, options);
        const entry = [
            cacheKey,
            promise,
            null
        ];
        cacheEntries.push(entry);
        return promise.then((response)=>{
            // We're cloning the response using this utility because there exists
            // a bug in the undici library around response cloning. See the
            // following pull request for more details:
            // https://github.com/vercel/next.js/pull/73274
            const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(response);
            entry[2] = cloned2;
            return cloned1;
        });
    };
} //# sourceMappingURL=dedupe-fetch.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/patch-fetch.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NEXT_PATCH_SYMBOL: null,
    createPatchedFetcher: null,
    patchFetch: null,
    validateRevalidate: null,
    validateTags: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NEXT_PATCH_SYMBOL: function() {
        return NEXT_PATCH_SYMBOL;
    },
    createPatchedFetcher: function() {
        return createPatchedFetcher;
    },
    patchFetch: function() {
        return patchFetch;
    },
    validateRevalidate: function() {
        return validateRevalidate;
    },
    validateTags: function() {
        return validateTags;
    }
});
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/trace/constants.js [app-ssr] (ecmascript)");
const _tracer = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/trace/tracer.js [app-ssr] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-ssr] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
const _dedupefetch = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/dedupe-fetch.js [app-ssr] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _responsecache = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/response-cache/index.js [app-ssr] (ecmascript)");
const _cloneresponse = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/clone-response.js [app-ssr] (ecmascript)");
const _stagedrendering = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/app-render/staged-rendering.js [app-ssr] (ecmascript)");
const isEdgeRuntime = ("TURBOPACK compile-time value", "nodejs") === 'edge';
const NEXT_PATCH_SYMBOL = Symbol.for('next-patch');
function isFetchPatched() {
    return globalThis[NEXT_PATCH_SYMBOL] === true;
}
function validateRevalidate(revalidateVal, route) {
    try {
        let normalizedRevalidate = undefined;
        if (revalidateVal === false) {
            normalizedRevalidate = _constants1.INFINITE_CACHE;
        } else if (typeof revalidateVal === 'number' && !isNaN(revalidateVal) && revalidateVal > -1) {
            normalizedRevalidate = revalidateVal;
        } else if (typeof revalidateVal !== 'undefined') {
            throw Object.defineProperty(new Error(`Invalid revalidate value "${revalidateVal}" on "${route}", must be a non-negative number or false`), "__NEXT_ERROR_CODE", {
                value: "E179",
                enumerable: false,
                configurable: true
            });
        }
        return normalizedRevalidate;
    } catch (err) {
        // handle client component error from attempting to check revalidate value
        if (err instanceof Error && err.message.includes('Invalid revalidate')) {
            throw err;
        }
        return undefined;
    }
}
function validateTags(tags, description) {
    const validTags = [];
    const invalidTags = [];
    for(let i = 0; i < tags.length; i++){
        const tag = tags[i];
        if (typeof tag !== 'string') {
            invalidTags.push({
                tag,
                reason: 'invalid type, must be a string'
            });
        } else if (tag.length > _constants1.NEXT_CACHE_TAG_MAX_LENGTH) {
            invalidTags.push({
                tag,
                reason: `exceeded max length of ${_constants1.NEXT_CACHE_TAG_MAX_LENGTH}`
            });
        } else {
            validTags.push(tag);
        }
        if (validTags.length > _constants1.NEXT_CACHE_TAG_MAX_ITEMS) {
            console.warn(`Warning: exceeded max tag count for ${description}, dropped tags:`, tags.slice(i).join(', '));
            break;
        }
    }
    if (invalidTags.length > 0) {
        console.warn(`Warning: invalid tags passed to ${description}: `);
        for (const { tag, reason } of invalidTags){
            console.log(`tag: "${tag}" ${reason}`);
        }
    }
    return validTags;
}
function trackFetchMetric(workStore, ctx) {
    if (!workStore.shouldTrackFetchMetrics) {
        return;
    }
    workStore.fetchMetrics ??= [];
    workStore.fetchMetrics.push({
        ...ctx,
        end: performance.timeOrigin + performance.now(),
        idx: workStore.nextFetchId || 0
    });
}
async function createCachedPrerenderResponse(res, cacheKey, incrementalCacheContext, incrementalCache, revalidate, handleUnlock) {
    // We are prerendering at build time or revalidate time with cacheComponents so we
    // need to buffer the response so we can guarantee it can be read in a
    // microtask.
    const bodyBuffer = await res.arrayBuffer();
    const fetchedData = {
        headers: Object.fromEntries(res.headers.entries()),
        body: Buffer.from(bodyBuffer).toString('base64'),
        status: res.status,
        url: res.url
    };
    // We can skip setting the serverComponentsHmrCache because we aren't in dev
    // mode.
    if (incrementalCacheContext) {
        await incrementalCache.set(cacheKey, {
            kind: _responsecache.CachedRouteKind.FETCH,
            data: fetchedData,
            revalidate
        }, incrementalCacheContext);
    }
    await handleUnlock();
    // We return a new Response to the caller.
    return new Response(bodyBuffer, {
        headers: res.headers,
        status: res.status,
        statusText: res.statusText
    });
}
async function createCachedDynamicResponse(workStore, res, cacheKey, incrementalCacheContext, incrementalCache, serverComponentsHmrCache, revalidate, input, handleUnlock) {
    // We're cloning the response using this utility because there exists a bug in
    // the undici library around response cloning. See the following pull request
    // for more details: https://github.com/vercel/next.js/pull/73274
    const [cloned1, cloned2] = (0, _cloneresponse.cloneResponse)(res);
    // We are dynamically rendering including dev mode. We want to return the
    // response to the caller as soon as possible because it might stream over a
    // very long time.
    const cacheSetPromise = cloned1.arrayBuffer().then(async (arrayBuffer)=>{
        const bodyBuffer = Buffer.from(arrayBuffer);
        const fetchedData = {
            headers: Object.fromEntries(cloned1.headers.entries()),
            body: bodyBuffer.toString('base64'),
            status: cloned1.status,
            url: cloned1.url
        };
        serverComponentsHmrCache == null ? void 0 : serverComponentsHmrCache.set(cacheKey, fetchedData);
        if (incrementalCacheContext) {
            await incrementalCache.set(cacheKey, {
                kind: _responsecache.CachedRouteKind.FETCH,
                data: fetchedData,
                revalidate
            }, incrementalCacheContext);
        }
    }).catch((error)=>console.warn(`Failed to set fetch cache`, input, error)).finally(handleUnlock);
    const pendingRevalidateKey = `cache-set-${cacheKey}`;
    workStore.pendingRevalidates ??= {};
    if (pendingRevalidateKey in workStore.pendingRevalidates) {
        // there is already a pending revalidate entry that we need to await to
        // avoid race conditions
        await workStore.pendingRevalidates[pendingRevalidateKey];
    }
    workStore.pendingRevalidates[pendingRevalidateKey] = cacheSetPromise.finally(()=>{
        var _workStore_pendingRevalidates;
        // If the pending revalidate is not present in the store, then we have
        // nothing to delete.
        if (!((_workStore_pendingRevalidates = workStore.pendingRevalidates) == null ? void 0 : _workStore_pendingRevalidates[pendingRevalidateKey])) {
            return;
        }
        delete workStore.pendingRevalidates[pendingRevalidateKey];
    });
    return cloned2;
}
function createPatchedFetcher(originFetch, { workAsyncStorage, workUnitAsyncStorage }) {
    // Create the patched fetch function.
    const patched = async function fetch(input, init) {
        var _init_method, _init_next;
        let url;
        try {
            url = new URL(input instanceof Request ? input.url : input);
            url.username = '';
            url.password = '';
        } catch  {
            // Error caused by malformed URL should be handled by native fetch
            url = undefined;
        }
        const fetchUrl = (url == null ? void 0 : url.href) ?? '';
        const method = (init == null ? void 0 : (_init_method = init.method) == null ? void 0 : _init_method.toUpperCase()) || 'GET';
        // Do create a new span trace for internal fetches in the
        // non-verbose mode.
        const isInternal = (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) === true;
        const hideSpan = process.env.NEXT_OTEL_FETCH_DISABLED === '1';
        // We don't track fetch metrics for internal fetches
        // so it's not critical that we have a start time, as it won't be recorded.
        // This is to workaround a flaky issue where performance APIs might
        // not be available and will require follow-up investigation.
        const fetchStart = isInternal ? undefined : performance.timeOrigin + performance.now();
        const workStore = workAsyncStorage.getStore();
        const workUnitStore = workUnitAsyncStorage.getStore();
        let cacheSignal = workUnitStore ? (0, _workunitasyncstorageexternal.getCacheSignal)(workUnitStore) : null;
        if (cacheSignal) {
            cacheSignal.beginRead();
        }
        const result = (0, _tracer.getTracer)().trace(isInternal ? _constants.NextNodeServerSpan.internalFetch : _constants.AppRenderSpan.fetch, {
            hideSpan,
            kind: _tracer.SpanKind.CLIENT,
            spanName: [
                'fetch',
                method,
                fetchUrl
            ].filter(Boolean).join(' '),
            attributes: {
                'http.url': fetchUrl,
                'http.method': method,
                'net.peer.name': url == null ? void 0 : url.hostname,
                'net.peer.port': (url == null ? void 0 : url.port) || undefined
            }
        }, async ()=>{
            var _getRequestMeta;
            // If this is an internal fetch, we should not do any special treatment.
            if (isInternal) {
                return originFetch(input, init);
            }
            // If the workStore is not available, we can't do any
            // special treatment of fetch, therefore fallback to the original
            // fetch implementation.
            if (!workStore) {
                return originFetch(input, init);
            }
            // We should also fallback to the original fetch implementation if we
            // are in draft mode, it does not constitute a static generation.
            if (workStore.isDraftMode) {
                return originFetch(input, init);
            }
            const isRequestInput = input && typeof input === 'object' && typeof input.method === 'string';
            const getRequestMeta = (field)=>{
                // If request input is present but init is not, retrieve from input first.
                const value = init == null ? void 0 : init[field];
                return value || (isRequestInput ? input[field] : null);
            };
            let finalRevalidate = undefined;
            const getNextField = (field)=>{
                var _init_next, _init_next1, _input_next;
                return typeof (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next[field]) !== 'undefined' ? init == null ? void 0 : (_init_next1 = init.next) == null ? void 0 : _init_next1[field] : isRequestInput ? (_input_next = input.next) == null ? void 0 : _input_next[field] : undefined;
            };
            // RequestInit doesn't keep extra fields e.g. next so it's
            // only available if init is used separate
            const originalFetchRevalidate = getNextField('revalidate');
            let currentFetchRevalidate = originalFetchRevalidate;
            const tags = validateTags(getNextField('tags') || [], `fetch ${input.toString()}`);
            let revalidateStore;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'prerender':
                    case 'prerender-runtime':
                    // TODO: Stop accumulating tags in client prerender. (fallthrough)
                    case 'prerender-client':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'cache':
                    case 'private-cache':
                        revalidateStore = workUnitStore;
                        break;
                    case 'request':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            if (revalidateStore) {
                if (Array.isArray(tags)) {
                    // Collect tags onto parent caches or parent prerenders.
                    const collectedTags = revalidateStore.tags ?? (revalidateStore.tags = []);
                    for (const tag of tags){
                        if (!collectedTags.includes(tag)) {
                            collectedTags.push(tag);
                        }
                    }
                }
            }
            const implicitTags = workUnitStore == null ? void 0 : workUnitStore.implicitTags;
            let pageFetchCacheMode = workStore.fetchCache;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'unstable-cache':
                        // Inside unstable-cache we treat it the same as force-no-store on
                        // the page.
                        pageFetchCacheMode = 'force-no-store';
                        break;
                    case 'prerender':
                    case 'prerender-client':
                    case 'prerender-runtime':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'request':
                    case 'cache':
                    case 'private-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            const isUsingNoStore = !!workStore.isUnstableNoStore;
            let currentFetchCacheConfig = getRequestMeta('cache');
            let cacheReason = '';
            let cacheWarning;
            if (typeof currentFetchCacheConfig === 'string' && typeof currentFetchRevalidate !== 'undefined') {
                // If the revalidate value conflicts with the cache value, we should warn the user and unset the conflicting values.
                const isConflictingRevalidate = currentFetchCacheConfig === 'force-cache' && currentFetchRevalidate === 0 || // revalidate: >0 or revalidate: false and cache: no-store
                currentFetchCacheConfig === 'no-store' && (currentFetchRevalidate > 0 || currentFetchRevalidate === false);
                if (isConflictingRevalidate) {
                    cacheWarning = `Specified "cache: ${currentFetchCacheConfig}" and "revalidate: ${currentFetchRevalidate}", only one should be specified.`;
                    currentFetchCacheConfig = undefined;
                    currentFetchRevalidate = undefined;
                }
            }
            const hasExplicitFetchCacheOptOut = currentFetchCacheConfig === 'no-cache' || currentFetchCacheConfig === 'no-store' || // the fetch isn't explicitly caching and the segment level cache config signals not to cache
            // note: `pageFetchCacheMode` is also set by being in an unstable_cache context.
            pageFetchCacheMode === 'force-no-store' || pageFetchCacheMode === 'only-no-store';
            // If no explicit fetch cache mode is set, but dynamic = `force-dynamic` is set,
            // we shouldn't consider caching the fetch. This is because the `dynamic` cache
            // is considered a "top-level" cache mode, whereas something like `fetchCache` is more
            // fine-grained. Top-level modes are responsible for setting reasonable defaults for the
            // other configurations.
            const noFetchConfigAndForceDynamic = !pageFetchCacheMode && !currentFetchCacheConfig && !currentFetchRevalidate && workStore.forceDynamic;
            if (// which will signal the cache to not revalidate
            currentFetchCacheConfig === 'force-cache' && typeof currentFetchRevalidate === 'undefined') {
                currentFetchRevalidate = false;
            } else if (hasExplicitFetchCacheOptOut || noFetchConfigAndForceDynamic) {
                currentFetchRevalidate = 0;
            }
            if (currentFetchCacheConfig === 'no-cache' || currentFetchCacheConfig === 'no-store') {
                cacheReason = `cache: ${currentFetchCacheConfig}`;
            }
            finalRevalidate = validateRevalidate(currentFetchRevalidate, workStore.route);
            const _headers = getRequestMeta('headers');
            const initHeaders = typeof (_headers == null ? void 0 : _headers.get) === 'function' ? _headers : new Headers(_headers || {});
            const hasUnCacheableHeader = initHeaders.get('authorization') || initHeaders.get('cookie');
            const isUnCacheableMethod = ![
                'get',
                'head'
            ].includes(((_getRequestMeta = getRequestMeta('method')) == null ? void 0 : _getRequestMeta.toLowerCase()) || 'get');
            /**
         * We automatically disable fetch caching under the following conditions:
         * - Fetch cache configs are not set. Specifically:
         *    - A page fetch cache mode is not set (export const fetchCache=...)
         *    - A fetch cache mode is not set in the fetch call (fetch(url, { cache: ... }))
         *      or the fetch cache mode is set to 'default'
         *    - A fetch revalidate value is not set in the fetch call (fetch(url, { revalidate: ... }))
         * - OR the fetch comes after a configuration that triggered dynamic rendering (e.g., reading cookies())
         *   and the fetch was considered uncacheable (e.g., POST method or has authorization headers)
         */ const hasNoExplicitCacheConfig = pageFetchCacheMode == undefined && // eslint-disable-next-line eqeqeq
            (currentFetchCacheConfig == undefined || // when considering whether to opt into the default "no-cache" fetch semantics,
            // a "default" cache config should be treated the same as no cache config
            currentFetchCacheConfig === 'default') && // eslint-disable-next-line eqeqeq
            currentFetchRevalidate == undefined;
            let autoNoCache = Boolean((hasUnCacheableHeader || isUnCacheableMethod) && (revalidateStore == null ? void 0 : revalidateStore.revalidate) === 0);
            let isImplicitBuildTimeCache = false;
            if (!autoNoCache && hasNoExplicitCacheConfig) {
                // We don't enable automatic no-cache behavior during build-time
                // prerendering so that we can still leverage the fetch cache between
                // export workers.
                if (workStore.isBuildTimePrerendering) {
                    isImplicitBuildTimeCache = true;
                } else {
                    autoNoCache = true;
                }
            }
            // If we have no cache config, and we're in Dynamic I/O prerendering,
            // it'll be a dynamic call. We don't have to issue that dynamic call.
            if (hasNoExplicitCacheConfig && workUnitStore !== undefined) {
                switch(workUnitStore.type){
                    case 'prerender':
                    case 'prerender-runtime':
                    // While we don't want to do caching in the client scope we know the
                    // fetch will be dynamic for cacheComponents so we may as well avoid the
                    // call here. (fallthrough)
                    case 'prerender-client':
                        if (cacheSignal) {
                            cacheSignal.endRead();
                            cacheSignal = null;
                        }
                        return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                    case 'request':
                        if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                            if (cacheSignal) {
                                cacheSignal.endRead();
                                cacheSignal = null;
                            }
                            await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                        }
                        break;
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'cache':
                    case 'private-cache':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            switch(pageFetchCacheMode){
                case 'force-no-store':
                    {
                        cacheReason = 'fetchCache = force-no-store';
                        break;
                    }
                case 'only-no-store':
                    {
                        if (currentFetchCacheConfig === 'force-cache' || typeof finalRevalidate !== 'undefined' && finalRevalidate > 0) {
                            throw Object.defineProperty(new Error(`cache: 'force-cache' used on fetch for ${fetchUrl} with 'export const fetchCache = 'only-no-store'`), "__NEXT_ERROR_CODE", {
                                value: "E448",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        cacheReason = 'fetchCache = only-no-store';
                        break;
                    }
                case 'only-cache':
                    {
                        if (currentFetchCacheConfig === 'no-store') {
                            throw Object.defineProperty(new Error(`cache: 'no-store' used on fetch for ${fetchUrl} with 'export const fetchCache = 'only-cache'`), "__NEXT_ERROR_CODE", {
                                value: "E521",
                                enumerable: false,
                                configurable: true
                            });
                        }
                        break;
                    }
                case 'force-cache':
                    {
                        if (typeof currentFetchRevalidate === 'undefined' || currentFetchRevalidate === 0) {
                            cacheReason = 'fetchCache = force-cache';
                            finalRevalidate = _constants1.INFINITE_CACHE;
                        }
                        break;
                    }
                case 'default-cache':
                case 'default-no-store':
                case 'auto':
                case undefined:
                    break;
                default:
                    pageFetchCacheMode;
            }
            if (typeof finalRevalidate === 'undefined') {
                if (pageFetchCacheMode === 'default-cache' && !isUsingNoStore) {
                    finalRevalidate = _constants1.INFINITE_CACHE;
                    cacheReason = 'fetchCache = default-cache';
                } else if (pageFetchCacheMode === 'default-no-store') {
                    finalRevalidate = 0;
                    cacheReason = 'fetchCache = default-no-store';
                } else if (isUsingNoStore) {
                    finalRevalidate = 0;
                    cacheReason = 'noStore call';
                } else if (autoNoCache) {
                    finalRevalidate = 0;
                    cacheReason = 'auto no cache';
                } else {
                    // TODO: should we consider this case an invariant?
                    cacheReason = 'auto cache';
                    finalRevalidate = revalidateStore ? revalidateStore.revalidate : _constants1.INFINITE_CACHE;
                }
            } else if (!cacheReason) {
                cacheReason = `revalidate: ${finalRevalidate}`;
            }
            if (// `revalidate: 0` values
            !(workStore.forceStatic && finalRevalidate === 0) && // we don't consider autoNoCache to switch to dynamic for ISR
            !autoNoCache && // If the revalidate value isn't currently set or the value is less
            // than the current revalidate value, we should update the revalidate
            // value.
            revalidateStore && finalRevalidate < revalidateStore.revalidate) {
                // If we were setting the revalidate value to 0, we should try to
                // postpone instead first.
                if (finalRevalidate === 0) {
                    if (workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                if (cacheSignal) {
                                    cacheSignal.endRead();
                                    cacheSignal = null;
                                }
                                return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    if (cacheSignal) {
                                        cacheSignal.endRead();
                                        cacheSignal = null;
                                    }
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `revalidate: 0 fetch ${input} ${workStore.route}`);
                }
                // We only want to set the revalidate store's revalidate time if it
                // was explicitly set for the fetch call, i.e.
                // originalFetchRevalidate.
                if (revalidateStore && originalFetchRevalidate === finalRevalidate) {
                    revalidateStore.revalidate = finalRevalidate;
                }
            }
            const isCacheableRevalidate = typeof finalRevalidate === 'number' && finalRevalidate > 0;
            let cacheKey;
            const { incrementalCache } = workStore;
            let isHmrRefresh = false;
            let serverComponentsHmrCache;
            if (workUnitStore) {
                switch(workUnitStore.type){
                    case 'request':
                    case 'cache':
                    case 'private-cache':
                        isHmrRefresh = workUnitStore.isHmrRefresh ?? false;
                        serverComponentsHmrCache = workUnitStore.serverComponentsHmrCache;
                        break;
                    case 'prerender':
                    case 'prerender-client':
                    case 'prerender-runtime':
                    case 'prerender-ppr':
                    case 'prerender-legacy':
                    case 'unstable-cache':
                        break;
                    default:
                        workUnitStore;
                }
            }
            if (incrementalCache && (isCacheableRevalidate || serverComponentsHmrCache)) {
                try {
                    cacheKey = await incrementalCache.generateCacheKey(fetchUrl, isRequestInput ? input : init);
                } catch (err) {
                    console.error(`Failed to generate cache key for`, input);
                }
            }
            const fetchIdx = workStore.nextFetchId ?? 1;
            workStore.nextFetchId = fetchIdx + 1;
            let handleUnlock = ()=>{};
            const doOriginalFetch = async (isStale, cacheReasonOverride)=>{
                const requestInputFields = [
                    'cache',
                    'credentials',
                    'headers',
                    'integrity',
                    'keepalive',
                    'method',
                    'mode',
                    'redirect',
                    'referrer',
                    'referrerPolicy',
                    'window',
                    'duplex',
                    // don't pass through signal when revalidating
                    ...isStale ? [] : [
                        'signal'
                    ]
                ];
                if (isRequestInput) {
                    const reqInput = input;
                    const reqOptions = {
                        body: reqInput._ogBody || reqInput.body
                    };
                    for (const field of requestInputFields){
                        // @ts-expect-error custom fields
                        reqOptions[field] = reqInput[field];
                    }
                    input = new Request(reqInput.url, reqOptions);
                } else if (init) {
                    const { _ogBody, body, signal, ...otherInput } = init;
                    init = {
                        ...otherInput,
                        body: _ogBody || body,
                        signal: isStale ? undefined : signal
                    };
                }
                // add metadata to init without editing the original
                const clonedInit = {
                    ...init,
                    next: {
                        ...init == null ? void 0 : init.next,
                        fetchType: 'origin',
                        fetchIdx
                    }
                };
                return originFetch(input, clonedInit).then(async (res)=>{
                    if (!isStale && fetchStart) {
                        trackFetchMetric(workStore, {
                            start: fetchStart,
                            url: fetchUrl,
                            cacheReason: cacheReasonOverride || cacheReason,
                            cacheStatus: finalRevalidate === 0 || cacheReasonOverride ? 'skip' : 'miss',
                            cacheWarning,
                            status: res.status,
                            method: clonedInit.method || 'GET'
                        });
                    }
                    if (res.status === 200 && incrementalCache && cacheKey && (isCacheableRevalidate || serverComponentsHmrCache)) {
                        const normalizedRevalidate = finalRevalidate >= _constants1.INFINITE_CACHE ? _constants1.CACHE_ONE_YEAR : finalRevalidate;
                        const incrementalCacheConfig = isCacheableRevalidate ? {
                            fetchCache: true,
                            fetchUrl,
                            fetchIdx,
                            tags,
                            isImplicitBuildTimeCache
                        } : undefined;
                        switch(workUnitStore == null ? void 0 : workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                return createCachedPrerenderResponse(res, cacheKey, incrementalCacheConfig, incrementalCache, normalizedRevalidate, handleUnlock);
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering && workUnitStore.cacheSignal) {
                                    // We're filling caches for a staged render,
                                    // so we need to wait for the response to finish instead of streaming.
                                    return createCachedPrerenderResponse(res, cacheKey, incrementalCacheConfig, incrementalCache, normalizedRevalidate, handleUnlock);
                                }
                            // fallthrough
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                            case undefined:
                                return createCachedDynamicResponse(workStore, res, cacheKey, incrementalCacheConfig, incrementalCache, serverComponentsHmrCache, normalizedRevalidate, input, handleUnlock);
                            default:
                                workUnitStore;
                        }
                    }
                    // we had response that we determined shouldn't be cached so we return it
                    // and don't cache it. This also needs to unlock the cache lock we acquired.
                    await handleUnlock();
                    return res;
                }).catch((error)=>{
                    handleUnlock();
                    throw error;
                });
            };
            let cacheReasonOverride;
            let isForegroundRevalidate = false;
            let isHmrRefreshCache = false;
            if (cacheKey && incrementalCache) {
                let cachedFetchData;
                if (isHmrRefresh && serverComponentsHmrCache) {
                    cachedFetchData = serverComponentsHmrCache.get(cacheKey);
                    isHmrRefreshCache = true;
                }
                if (isCacheableRevalidate && !cachedFetchData) {
                    handleUnlock = await incrementalCache.lock(cacheKey);
                    const entry = workStore.isOnDemandRevalidate ? null : await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate: finalRevalidate,
                        fetchUrl,
                        fetchIdx,
                        tags,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags
                    });
                    if (hasNoExplicitCacheConfig && workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                // We sometimes use the cache to dedupe fetches that do not
                                // specify a cache configuration. In these cases we want to
                                // make sure we still exclude them from prerenders if
                                // cacheComponents is on so we introduce an artificial task boundary
                                // here.
                                await getTimeoutBoundary();
                                break;
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    if (entry) {
                        await handleUnlock();
                    } else {
                        // in dev, incremental cache response will be null in case the browser adds `cache-control: no-cache` in the request headers
                        // TODO: it seems like we also hit this after revalidates in dev?
                        cacheReasonOverride = 'cache-control: no-cache (hard refresh)';
                    }
                    if ((entry == null ? void 0 : entry.value) && entry.value.kind === _responsecache.CachedRouteKind.FETCH) {
                        // when stale and is revalidating we wait for fresh data
                        // so the revalidated entry has the updated data
                        if (workStore.isStaticGeneration && entry.isStale) {
                            isForegroundRevalidate = true;
                        } else {
                            if (entry.isStale) {
                                workStore.pendingRevalidates ??= {};
                                if (!workStore.pendingRevalidates[cacheKey]) {
                                    const pendingRevalidate = doOriginalFetch(true).then(async (response)=>({
                                            body: await response.arrayBuffer(),
                                            headers: response.headers,
                                            status: response.status,
                                            statusText: response.statusText
                                        })).finally(()=>{
                                        workStore.pendingRevalidates ??= {};
                                        delete workStore.pendingRevalidates[cacheKey || ''];
                                    });
                                    // Attach the empty catch here so we don't get a "unhandled
                                    // promise rejection" warning.
                                    pendingRevalidate.catch(console.error);
                                    workStore.pendingRevalidates[cacheKey] = pendingRevalidate;
                                }
                            }
                            cachedFetchData = entry.value.data;
                        }
                    }
                }
                if (cachedFetchData) {
                    if (fetchStart) {
                        trackFetchMetric(workStore, {
                            start: fetchStart,
                            url: fetchUrl,
                            cacheReason,
                            cacheStatus: isHmrRefreshCache ? 'hmr' : 'hit',
                            cacheWarning,
                            status: cachedFetchData.status || 200,
                            method: (init == null ? void 0 : init.method) || 'GET'
                        });
                    }
                    const response = new Response(Buffer.from(cachedFetchData.body, 'base64'), {
                        headers: cachedFetchData.headers,
                        status: cachedFetchData.status
                    });
                    Object.defineProperty(response, 'url', {
                        value: cachedFetchData.url
                    });
                    return response;
                }
            }
            if ((workStore.isStaticGeneration || ("TURBOPACK compile-time value", "development") === 'development' && ("TURBOPACK compile-time value", false) && workUnitStore && // eslint-disable-next-line no-restricted-syntax
            workUnitStore.type === 'request' && workUnitStore.stagedRendering) && init && typeof init === 'object') {
                const { cache } = init;
                // Delete `cache` property as Cloudflare Workers will throw an error
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                if (cache === 'no-store') {
                    // If enabled, we should bail out of static generation.
                    if (workUnitStore) {
                        switch(workUnitStore.type){
                            case 'prerender':
                            case 'prerender-client':
                            case 'prerender-runtime':
                                if (cacheSignal) {
                                    cacheSignal.endRead();
                                    cacheSignal = null;
                                }
                                return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                            case 'request':
                                if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                    if (cacheSignal) {
                                        cacheSignal.endRead();
                                        cacheSignal = null;
                                    }
                                    await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                }
                                break;
                            case 'prerender-ppr':
                            case 'prerender-legacy':
                            case 'cache':
                            case 'private-cache':
                            case 'unstable-cache':
                                break;
                            default:
                                workUnitStore;
                        }
                    }
                    (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `no-store fetch ${input} ${workStore.route}`);
                }
                const hasNextConfig = 'next' in init;
                const { next = {} } = init;
                if (typeof next.revalidate === 'number' && revalidateStore && next.revalidate < revalidateStore.revalidate) {
                    if (next.revalidate === 0) {
                        // If enabled, we should bail out of static generation.
                        if (workUnitStore) {
                            switch(workUnitStore.type){
                                case 'prerender':
                                case 'prerender-client':
                                case 'prerender-runtime':
                                    return (0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, 'fetch()');
                                case 'request':
                                    if (("TURBOPACK compile-time value", "development") === 'development' && workUnitStore.stagedRendering) {
                                        await workUnitStore.stagedRendering.waitForStage(_stagedrendering.RenderStage.Dynamic);
                                    }
                                    break;
                                case 'cache':
                                case 'private-cache':
                                case 'unstable-cache':
                                case 'prerender-legacy':
                                case 'prerender-ppr':
                                    break;
                                default:
                                    workUnitStore;
                            }
                        }
                        (0, _dynamicrendering.markCurrentScopeAsDynamic)(workStore, workUnitStore, `revalidate: 0 fetch ${input} ${workStore.route}`);
                    }
                    if (!workStore.forceStatic || next.revalidate !== 0) {
                        revalidateStore.revalidate = next.revalidate;
                    }
                }
                if (hasNextConfig) delete init.next;
            }
            // if we are revalidating the whole page via time or on-demand and
            // the fetch cache entry is stale we should still de-dupe the
            // origin hit if it's a cache-able entry
            if (cacheKey && isForegroundRevalidate) {
                const pendingRevalidateKey = cacheKey;
                workStore.pendingRevalidates ??= {};
                let pendingRevalidate = workStore.pendingRevalidates[pendingRevalidateKey];
                if (pendingRevalidate) {
                    const revalidatedResult = await pendingRevalidate;
                    return new Response(revalidatedResult.body, {
                        headers: revalidatedResult.headers,
                        status: revalidatedResult.status,
                        statusText: revalidatedResult.statusText
                    });
                }
                // We used to just resolve the Response and clone it however for
                // static generation with cacheComponents we need the response to be able to
                // be resolved in a microtask and cloning the response will never have
                // a body that can resolve in a microtask in node (as observed through
                // experimentation) So instead we await the body and then when it is
                // available we construct manually cloned Response objects with the
                // body as an ArrayBuffer. This will be resolvable in a microtask
                // making it compatible with cacheComponents.
                const pendingResponse = doOriginalFetch(true, cacheReasonOverride) // We're cloning the response using this utility because there
                // exists a bug in the undici library around response cloning.
                // See the following pull request for more details:
                // https://github.com/vercel/next.js/pull/73274
                .then(_cloneresponse.cloneResponse);
                pendingRevalidate = pendingResponse.then(async (responses)=>{
                    const response = responses[0];
                    return {
                        body: await response.arrayBuffer(),
                        headers: response.headers,
                        status: response.status,
                        statusText: response.statusText
                    };
                }).finally(()=>{
                    var _workStore_pendingRevalidates;
                    // If the pending revalidate is not present in the store, then
                    // we have nothing to delete.
                    if (!((_workStore_pendingRevalidates = workStore.pendingRevalidates) == null ? void 0 : _workStore_pendingRevalidates[pendingRevalidateKey])) {
                        return;
                    }
                    delete workStore.pendingRevalidates[pendingRevalidateKey];
                });
                // Attach the empty catch here so we don't get a "unhandled promise
                // rejection" warning
                pendingRevalidate.catch(()=>{});
                workStore.pendingRevalidates[pendingRevalidateKey] = pendingRevalidate;
                return pendingResponse.then((responses)=>responses[1]);
            } else {
                return doOriginalFetch(false, cacheReasonOverride);
            }
        });
        if (cacheSignal) {
            try {
                return await result;
            } finally{
                if (cacheSignal) {
                    cacheSignal.endRead();
                }
            }
        }
        return result;
    };
    // Attach the necessary properties to the patched fetch function.
    // We don't use this to determine if the fetch function has been patched,
    // but for external consumers to determine if the fetch function has been
    // patched.
    patched.__nextPatched = true;
    patched.__nextGetStaticStore = ()=>workAsyncStorage;
    patched._nextOriginalFetch = originFetch;
    globalThis[NEXT_PATCH_SYMBOL] = true;
    // Assign the function name also as a name property, so that it's preserved
    // even when mangling is enabled.
    Object.defineProperty(patched, 'name', {
        value: 'fetch',
        writable: false
    });
    return patched;
}
function patchFetch(options) {
    // If we've already patched fetch, we should not patch it again.
    if (isFetchPatched()) return;
    // Grab the original fetch function. We'll attach this so we can use it in
    // the patched fetch function.
    const original = (0, _dedupefetch.createDedupeFetch)(globalThis.fetch);
    // Set the global fetch to the patched fetch.
    globalThis.fetch = createPatchedFetcher(original, options);
}
let currentTimeoutBoundary = null;
function getTimeoutBoundary() {
    if (!currentTimeoutBoundary) {
        currentTimeoutBoundary = new Promise((r)=>{
            setTimeout(()=>{
                currentTimeoutBoundary = null;
                r();
            }, 0);
        });
    }
    return currentTimeoutBoundary;
} //# sourceMappingURL=patch-fetch.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/block-cross-site.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "blockCrossSite", {
    enumerable: true,
    get: function() {
        return blockCrossSite;
    }
});
const _url = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/url.js [app-ssr] (ecmascript)");
const _log = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-ssr] (ecmascript)");
const _csrfprotection = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/app-render/csrf-protection.js [app-ssr] (ecmascript)");
function warnOrBlockRequest(res, origin, mode) {
    const originString = origin ? `from ${origin}` : '';
    if (mode === 'warn') {
        (0, _log.warnOnce)(`Cross origin request detected ${originString} to /_next/* resource. In a future major version of Next.js, you will need to explicitly configure "allowedDevOrigins" in next.config to allow this.\nRead more: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins`);
        return false;
    }
    (0, _log.warnOnce)(`Blocked cross-origin request ${originString} to /_next/* resource. To allow this, configure "allowedDevOrigins" in next.config\nRead more: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins`);
    if ('statusCode' in res) {
        res.statusCode = 403;
    }
    res.end('Unauthorized');
    return true;
}
function isInternalDevEndpoint(req) {
    if (!req.url) return false;
    try {
        // TODO: We should standardize on a single prefix for this
        const isMiddlewareRequest = req.url.includes('/__nextjs');
        const isInternalAsset = req.url.includes('/_next');
        // Static media requests are excluded, as they might be loaded via CSS and would fail
        // CORS checks.
        const isIgnoredRequest = req.url.includes('/_next/image') || req.url.includes('/_next/static/media');
        return !isIgnoredRequest && (isInternalAsset || isMiddlewareRequest);
    } catch (err) {
        return false;
    }
}
const blockCrossSite = (req, res, allowedDevOrigins, hostname)=>{
    // in the future, these will be blocked by default when allowed origins aren't configured.
    // for now, we warn when allowed origins aren't configured
    const mode = typeof allowedDevOrigins === 'undefined' ? 'warn' : 'block';
    const allowedOrigins = [
        '*.localhost',
        'localhost',
        ...allowedDevOrigins || []
    ];
    if (hostname) {
        allowedOrigins.push(hostname);
    }
    // only process internal URLs/middleware
    if (!isInternalDevEndpoint(req)) {
        return false;
    }
    // block non-cors request from cross-site e.g. script tag on
    // different host
    if (req.headers['sec-fetch-mode'] === 'no-cors' && req.headers['sec-fetch-site'] === 'cross-site') {
        return warnOrBlockRequest(res, undefined, mode);
    }
    // ensure websocket requests from allowed origin
    const rawOrigin = req.headers['origin'];
    if (rawOrigin && rawOrigin !== 'null') {
        const parsedOrigin = (0, _url.parseUrl)(rawOrigin);
        if (parsedOrigin) {
            const originLowerCase = parsedOrigin.hostname.toLowerCase();
            if (!(0, _csrfprotection.isCsrfOriginAllowed)(originLowerCase, allowedOrigins)) {
                return warnOrBlockRequest(res, originLowerCase, mode);
            }
        }
    }
    return false;
}; //# sourceMappingURL=block-cross-site.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/chrome-devtools-workspace.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    handleChromeDevtoolsWorkspaceRequest: null,
    isChromeDevtoolsWorkspaceUrl: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleChromeDevtoolsWorkspaceRequest: function() {
        return handleChromeDevtoolsWorkspaceRequest;
    },
    isChromeDevtoolsWorkspaceUrl: function() {
        return isChromeDevtoolsWorkspaceUrl;
    }
});
const _crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const _fs = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)"));
const _path = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[externals]/path [external] (path, cjs)"));
const _cachedir = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/cache-dir.js [app-ssr] (ecmascript)");
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
// Keep the uuid in memory as it should never change during the lifetime of the server.
let workspaceUUID = null;
function isChromeDevtoolsWorkspaceUrl(url) {
    return url.pathname === '/.well-known/appspecific/com.chrome.devtools.json';
}
async function handleChromeDevtoolsWorkspaceRequest(response, opts, config) {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(await getChromeDevtoolsWorkspace(opts.dir, config.distDir), null, 2));
}
/**
 * For https://developer.chrome.com/docs/devtools/workspaces
 */ async function getChromeDevtoolsWorkspace(root, configDistDir) {
    if (workspaceUUID === null) {
        const distDir = _path.join(root, configDistDir);
        const cacheBaseDir = (0, _cachedir.getStorageDirectory)(distDir);
        if (cacheBaseDir === undefined) {
            workspaceUUID = (0, _crypto.randomUUID)();
        } else {
            const cachedUUIDPath = _path.join(cacheBaseDir, 'chrome-devtools-workspace-uuid');
            try {
                workspaceUUID = await _fs.promises.readFile(cachedUUIDPath, 'utf8');
            } catch  {
                // TODO: Why does this need to be v4 and not v5?
                // With v5 we could base it off of the `distDir` and `root` which would
                // allow us to persist the workspace across .next wipes.
                workspaceUUID = (0, _crypto.randomUUID)();
                try {
                    await _fs.promises.writeFile(cachedUUIDPath, workspaceUUID, 'utf8');
                } catch (cause) {
                    console.warn(Object.defineProperty(new Error('Failed to persist Chrome DevTools workspace UUID. The Chrome DevTools Workspace needs to be reconnected after the next page reload.', {
                        cause
                    }), "__NEXT_ERROR_CODE", {
                        value: "E708",
                        enumerable: false,
                        configurable: true
                    }));
                }
            }
        }
    }
    return {
        workspace: {
            uuid: workspaceUUID,
            root
        }
    };
} //# sourceMappingURL=chrome-devtools-workspace.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/build-data-route.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildDataRoute", {
    enumerable: true,
    get: function() {
        return buildDataRoute;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/isomorphic/path.js [app-ssr] (ecmascript)"));
const _normalizepagepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-page-path.js [app-ssr] (ecmascript)");
const _isdynamic = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [app-ssr] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-regex.js [app-ssr] (ecmascript)");
const _loadcustomroutes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/load-custom-routes.js [app-ssr] (ecmascript)");
const _escaperegexp = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/escape-regexp.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function buildDataRoute(page, buildId) {
    const pagePath = (0, _normalizepagepath.normalizePagePath)(page);
    const dataRoute = _path.default.posix.join('/_next/data', buildId, `${pagePath}.json`);
    let dataRouteRegex;
    let namedDataRouteRegex;
    let routeKeys;
    if ((0, _isdynamic.isDynamicRoute)(page)) {
        const routeRegex = (0, _routeregex.getNamedRouteRegex)(dataRoute, {
            prefixRouteKeys: true,
            includeSuffix: true,
            excludeOptionalTrailingSlash: true
        });
        dataRouteRegex = (0, _loadcustomroutes.normalizeRouteRegex)(routeRegex.re.source);
        namedDataRouteRegex = routeRegex.namedRegex;
        routeKeys = routeRegex.routeKeys;
    } else {
        dataRouteRegex = (0, _loadcustomroutes.normalizeRouteRegex)(new RegExp(`^${_path.default.posix.join('/_next/data', (0, _escaperegexp.escapeStringRegexp)(buildId), `${pagePath}\\.json`)}$`).source);
    }
    return {
        page,
        routeKeys,
        dataRouteRegex,
        namedDataRouteRegex
    };
} //# sourceMappingURL=build-data-route.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/typegen.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    generateLinkTypesFile: null,
    generateRouteTypesFile: null,
    generateValidatorFile: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    generateLinkTypesFile: function() {
        return generateLinkTypesFile;
    },
    generateRouteTypesFile: function() {
        return generateRouteTypesFile;
    },
    generateValidatorFile: function() {
        return generateValidatorFile;
    }
});
const _isdynamic = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [app-ssr] (ecmascript)");
function generateRouteTypes(routesManifest) {
    const appRoutes = Object.keys(routesManifest.appRoutes).sort();
    const pageRoutes = Object.keys(routesManifest.pageRoutes).sort();
    const layoutRoutes = Object.keys(routesManifest.layoutRoutes).sort();
    const redirectRoutes = Object.keys(routesManifest.redirectRoutes).sort();
    const rewriteRoutes = Object.keys(routesManifest.rewriteRoutes).sort();
    let result = '';
    // Generate AppRoutes union type (pages only)
    if (appRoutes.length > 0) {
        result += `type AppRoutes = ${appRoutes.map((route)=>JSON.stringify(route)).join(' | ')}\n`;
    } else {
        result += 'type AppRoutes = never\n';
    }
    // Generate AppRouteHandlerRoutes union type for route handlers
    const appRouteHandlerRoutes = Object.keys(routesManifest.appRouteHandlerRoutes).sort();
    const hasAppRouteHandlers = appRouteHandlerRoutes.length > 0;
    if (hasAppRouteHandlers) {
        result += `type AppRouteHandlerRoutes = ${appRouteHandlerRoutes.map((route)=>JSON.stringify(route)).join(' | ')}\n`;
    }
    // Generate PageRoutes union type
    if (pageRoutes.length > 0) {
        result += `type PageRoutes = ${pageRoutes.map((route)=>JSON.stringify(route)).join(' | ')}\n`;
    } else {
        result += 'type PageRoutes = never\n';
    }
    // Generate LayoutRoutes union type
    if (layoutRoutes.length > 0) {
        result += `type LayoutRoutes = ${layoutRoutes.map((route)=>JSON.stringify(route)).join(' | ')}\n`;
    } else {
        result += 'type LayoutRoutes = never\n';
    }
    // Generate RedirectRoutes union type
    if (redirectRoutes.length > 0) {
        result += `type RedirectRoutes = ${redirectRoutes.map((route)=>JSON.stringify(route)).join(' | ')}\n`;
    } else {
        result += 'type RedirectRoutes = never\n';
    }
    // Generate RewriteRoutes union type
    if (rewriteRoutes.length > 0) {
        result += `type RewriteRoutes = ${rewriteRoutes.map((route)=>JSON.stringify(route)).join(' | ')}\n`;
    } else {
        result += 'type RewriteRoutes = never\n';
    }
    // Only include AppRouteHandlerRoutes in Routes union if there are actual route handlers
    const routeUnionParts = [
        'AppRoutes',
        'PageRoutes',
        'LayoutRoutes',
        'RedirectRoutes',
        'RewriteRoutes'
    ];
    if (hasAppRouteHandlers) {
        routeUnionParts.push('AppRouteHandlerRoutes');
    }
    result += `type Routes = ${routeUnionParts.join(' | ')}\n`;
    return result;
}
function generateParamTypes(routesManifest) {
    const allRoutes = {
        ...routesManifest.appRoutes,
        ...routesManifest.appRouteHandlerRoutes,
        ...routesManifest.pageRoutes,
        ...routesManifest.layoutRoutes,
        ...routesManifest.redirectRoutes,
        ...routesManifest.rewriteRoutes
    };
    let paramTypes = 'interface ParamMap {\n';
    // Sort routes deterministically for consistent output
    const sortedRoutes = Object.entries(allRoutes).sort(([a], [b])=>a.localeCompare(b));
    for (const [route, routeInfo] of sortedRoutes){
        const { groups } = routeInfo;
        // For static routes (no dynamic segments), we can produce an empty parameter map.
        if (!(0, _isdynamic.isDynamicRoute)(route) || Object.keys(groups ?? {}).length === 0) {
            paramTypes += `  ${JSON.stringify(route)}: {}\n`;
            continue;
        }
        let paramType = '{';
        // Process each group based on its properties
        for (const [key, group] of Object.entries(groups)){
            const escapedKey = JSON.stringify(key);
            if (group.repeat) {
                // Catch-all parameters
                if (group.optional) {
                    paramType += ` ${escapedKey}?: string[];`;
                } else {
                    paramType += ` ${escapedKey}: string[];`;
                }
            } else {
                // Regular parameters
                if (group.optional) {
                    paramType += ` ${escapedKey}?: string;`;
                } else {
                    paramType += ` ${escapedKey}: string;`;
                }
            }
        }
        paramType += ' }';
        paramTypes += `  ${JSON.stringify(route)}: ${paramType}\n`;
    }
    paramTypes += '}\n';
    return paramTypes;
}
function generateLayoutSlotMap(routesManifest) {
    let slotMap = 'interface LayoutSlotMap {\n';
    // Sort routes deterministically for consistent output
    const sortedLayoutRoutes = Object.entries(routesManifest.layoutRoutes).sort(([a], [b])=>a.localeCompare(b));
    for (const [route, routeInfo] of sortedLayoutRoutes){
        if ('slots' in routeInfo) {
            const slots = routeInfo.slots.sort();
            if (slots.length > 0) {
                slotMap += `  ${JSON.stringify(route)}: ${slots.map((slot)=>JSON.stringify(slot)).join(' | ')}\n`;
            } else {
                slotMap += `  ${JSON.stringify(route)}: never\n`;
            }
        } else {
            slotMap += `  ${JSON.stringify(route)}: never\n`;
        }
    }
    slotMap += '}\n';
    return slotMap;
}
// Helper function to format routes to route types (matches the plugin logic exactly)
function formatRouteToRouteType(route) {
    const isDynamic = (0, _isdynamic.isDynamicRoute)(route);
    if (isDynamic) {
        route = route.split('/').map((part)=>{
            if (part.startsWith('[') && part.endsWith(']')) {
                if (part.startsWith('[...')) {
                    // /[...slug]
                    return `\${CatchAllSlug<T>}`;
                } else if (part.startsWith('[[...') && part.endsWith(']]')) {
                    // /[[...slug]]
                    return `\${OptionalCatchAllSlug<T>}`;
                }
                // /[slug]
                return `\${SafeSlug<T>}`;
            }
            return part;
        }).join('/');
    }
    return {
        isDynamic,
        routeType: route
    };
}
// Helper function to serialize route types (matches the plugin logic exactly)
function serializeRouteTypes(routeTypes) {
    // route collection is not deterministic, this makes the output of the file deterministic
    return routeTypes.sort().map((route)=>`\n    | \`${route}\``).join('');
}
function generateLinkTypesFile(routesManifest) {
    // Generate serialized static and dynamic routes for the internal namespace
    // Build a unified set of routes across app/pages/redirect/rewrite as well as
    // app route handlers and Pages Router API routes.
    const allRoutesSet = new Set([
        ...Object.keys(routesManifest.appRoutes),
        ...Object.keys(routesManifest.pageRoutes),
        ...Object.keys(routesManifest.redirectRoutes),
        ...Object.keys(routesManifest.rewriteRoutes),
        // Allow linking to App Route Handlers (e.g. `/logout/route.ts`)
        ...Object.keys(routesManifest.appRouteHandlerRoutes),
        // Allow linking to Pages Router API routes (e.g. `/api/*`)
        ...Array.from(routesManifest.pageApiRoutes)
    ]);
    const staticRouteTypes = [];
    const dynamicRouteTypes = [];
    // Process each route using the same logic as the plugin
    for (const route of allRoutesSet){
        const { isDynamic, routeType } = formatRouteToRouteType(route);
        if (isDynamic) {
            dynamicRouteTypes.push(routeType);
        } else {
            staticRouteTypes.push(routeType);
        }
    }
    const serializedStaticRouteTypes = serializeRouteTypes(staticRouteTypes);
    const serializedDynamicRouteTypes = serializeRouteTypes(dynamicRouteTypes);
    // If both StaticRoutes and DynamicRoutes are empty, fallback to type 'string & {}'.
    const routeTypesFallback = !serializedStaticRouteTypes && !serializedDynamicRouteTypes ? 'string & {}' : '';
    return `// This file is generated automatically by Next.js
// Do not edit this file manually

// Type definitions for Next.js routes

/**
 * Internal types used by the Next.js router and Link component.
 * These types are not meant to be used directly.
 * @internal
 */
declare namespace __next_route_internal_types__ {
  type SearchOrHash = \`?\${string}\` | \`#\${string}\`
  type WithProtocol = \`\${string}:\${string}\`

  type Suffix = '' | SearchOrHash

  type SafeSlug<S extends string> = S extends \`\${string}/\${string}\`
    ? never
    : S extends \`\${string}\${SearchOrHash}\`
    ? never
    : S extends ''
    ? never
    : S

  type CatchAllSlug<S extends string> = S extends \`\${string}\${SearchOrHash}\`
    ? never
    : S extends ''
    ? never
    : S

  type OptionalCatchAllSlug<S extends string> =
    S extends \`\${string}\${SearchOrHash}\` ? never : S

  type StaticRoutes = ${serializedStaticRouteTypes || 'never'}
  type DynamicRoutes<T extends string = string> = ${serializedDynamicRouteTypes || 'never'}

  type RouteImpl<T> = ${routeTypesFallback || `
    ${'| StaticRoutes'}
    | SearchOrHash
    | WithProtocol
    | \`\${StaticRoutes}\${SearchOrHash}\`
    | (T extends \`\${DynamicRoutes<infer _>}\${Suffix}\` ? T : never)
    `}
}

declare module 'next' {
  export { default } from 'next/types.js'
  export * from 'next/types.js'

  export type Route<T extends string = string> =
    __next_route_internal_types__.RouteImpl<T>
}

declare module 'next/link' {
  export { useLinkStatus } from 'next/dist/client/link.js'

  import type { LinkProps as OriginalLinkProps } from 'next/dist/client/link.js'
  import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'
  import type { UrlObject } from 'url'

  type LinkRestProps = Omit<
    Omit<
      DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      keyof OriginalLinkProps
    > &
      OriginalLinkProps,
    'href'
  >

  export type LinkProps<RouteInferType> = LinkRestProps & {
    /**
     * The path or URL to navigate to. This is the only required prop. It can also be an object.
     * @see https://nextjs.org/docs/api-reference/next/link
     */
    href: __next_route_internal_types__.RouteImpl<RouteInferType> | UrlObject
  }

  export default function Link<RouteType>(props: LinkProps<RouteType>): JSX.Element
}

declare module 'next/navigation' {
  export * from 'next/dist/client/components/navigation.js'

  import type { NavigateOptions, AppRouterInstance as OriginalAppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime.js'
  import type { RedirectType } from 'next/dist/client/components/redirect-error.js'
  
  interface AppRouterInstance extends OriginalAppRouterInstance {
    /**
     * Navigate to the provided href.
     * Pushes a new history entry.
     */
    push<RouteType>(href: __next_route_internal_types__.RouteImpl<RouteType>, options?: NavigateOptions): void
    /**
     * Navigate to the provided href.
     * Replaces the current history entry.
     */
    replace<RouteType>(href: __next_route_internal_types__.RouteImpl<RouteType>, options?: NavigateOptions): void
    /**
     * Prefetch the provided href.
     */
    prefetch<RouteType>(href: __next_route_internal_types__.RouteImpl<RouteType>): void
  }

  export function useRouter(): AppRouterInstance;
  
  /**
   * This function allows you to redirect the user to another URL. It can be used in
   * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
   * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
   * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
   *
   * - In a Server Component, this will insert a meta tag to redirect the user to the target page.
   * - In a Route Handler or Server Action, it will serve a 307/303 to the caller.
   * - In a Server Action, type defaults to 'push' and 'replace' elsewhere.
   *
   * Read more: [Next.js Docs: redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)
   */
  export function redirect<RouteType>(
    /** The URL to redirect to */
    url: __next_route_internal_types__.RouteImpl<RouteType>,
    type?: RedirectType
  ): never;
  
  /**
   * This function allows you to redirect the user to another URL. It can be used in
   * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
   * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
   * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
   *
   * - In a Server Component, this will insert a meta tag to redirect the user to the target page.
   * - In a Route Handler or Server Action, it will serve a 308/303 to the caller.
   *
   * Read more: [Next.js Docs: redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)
   */
  export function permanentRedirect<RouteType>(
    /** The URL to redirect to */
    url: __next_route_internal_types__.RouteImpl<RouteType>,
    type?: RedirectType
  ): never;
}

declare module 'next/form' {
  import type { FormProps as OriginalFormProps } from 'next/dist/client/form.js'

  type FormRestProps = Omit<OriginalFormProps, 'action'>

  export type FormProps<RouteInferType> = {
    /**
     * \`action\` can be either a \`string\` or a function.
     * - If \`action\` is a string, it will be interpreted as a path or URL to navigate to when the form is submitted.
     *   The path will be prefetched when the form becomes visible.
     * - If \`action\` is a function, it will be called when the form is submitted. See the [React docs](https://react.dev/reference/react-dom/components/form#props) for more.
     */
    action: __next_route_internal_types__.RouteImpl<RouteInferType> | ((formData: FormData) => void)
  } & FormRestProps

  export default function Form<RouteType>(props: FormProps<RouteType>): JSX.Element
}
`;
}
function generateValidatorFile(routesManifest) {
    const generateValidations = (paths, type, pathToRouteMap)=>paths.sort() // Only validate TypeScript files - JavaScript files have too many type inference limitations
        .filter((filePath)=>filePath.endsWith('.ts') || filePath.endsWith('.tsx')).filter(// (e.g. /manifest.webmanifest)
        (filePath)=>type !== 'AppPageConfig' || filePath.endsWith('page.ts') || filePath.endsWith('page.tsx')).map((filePath)=>{
            // Keep the file extension for TypeScript imports to support node16 module resolution
            const importPath = filePath;
            const route = pathToRouteMap == null ? void 0 : pathToRouteMap.get(filePath);
            const typeWithRoute = route && (type === 'AppPageConfig' || type === 'LayoutConfig' || type === 'RouteHandlerConfig') ? `${type}<${JSON.stringify(route)}>` : type;
            // NOTE: we previously used `satisfies` here, but it's not supported by TypeScript 4.8 and below.
            // If we ever raise the TS minimum version, we can switch back.
            return `// Validate ${filePath}
{
  type __IsExpected<Specific extends ${typeWithRoute}> = Specific
  const handler = {} as typeof import(${JSON.stringify(importPath.replace(/\.tsx?$/, '.js'))})
  type __Check = __IsExpected<typeof handler>
  // @ts-ignore
  type __Unused = __Check
}`;
        }).join('\n\n');
    // Use direct mappings from the manifest
    // Generate validations for different route types
    const appPageValidations = generateValidations(Array.from(routesManifest.appPagePaths).sort(), 'AppPageConfig', routesManifest.filePathToRoute);
    const appRouteHandlerValidations = generateValidations(Array.from(routesManifest.appRouteHandlers).sort(), 'RouteHandlerConfig', routesManifest.filePathToRoute);
    const pagesRouterPageValidations = generateValidations(Array.from(routesManifest.pagesRouterPagePaths).sort(), 'PagesPageConfig');
    const pagesApiRouteValidations = generateValidations(Array.from(routesManifest.pageApiRoutes).sort(), 'ApiRouteConfig');
    const layoutValidations = generateValidations(Array.from(routesManifest.layoutPaths).sort(), 'LayoutConfig', routesManifest.filePathToRoute);
    const hasAppRouteHandlers = Object.keys(routesManifest.appRouteHandlerRoutes).length > 0;
    // Build type definitions based on what's actually used
    let typeDefinitions = '';
    if (appPageValidations) {
        typeDefinitions += `type AppPageConfig<Route extends AppRoutes = AppRoutes> = {
  default: React.ComponentType<{ params: Promise<ParamMap[Route]> } & any> | ((props: { params: Promise<ParamMap[Route]> } & any) => React.ReactNode | Promise<React.ReactNode> | never | void | Promise<void>)
  generateStaticParams?: (props: { params: ParamMap[Route] }) => Promise<any[]> | any[]
  generateMetadata?: (
    props: { params: Promise<ParamMap[Route]> } & any,
    parent: ResolvingMetadata
  ) => Promise<any> | any
  generateViewport?: (
    props: { params: Promise<ParamMap[Route]> } & any,
    parent: ResolvingViewport
  ) => Promise<any> | any
  metadata?: any
  viewport?: any
}

`;
    }
    if (pagesRouterPageValidations) {
        typeDefinitions += `type PagesPageConfig = {
  default: React.ComponentType<any> | ((props: any) => React.ReactNode | Promise<React.ReactNode> | never | void)
  getStaticProps?: (context: any) => Promise<any> | any
  getStaticPaths?: (context: any) => Promise<any> | any
  getServerSideProps?: (context: any) => Promise<any> | any
  getInitialProps?: (context: any) => Promise<any> | any
  /**
   * Segment configuration for legacy Pages Router pages.
   * Validated at build-time by parsePagesSegmentConfig.
   */
  config?: {
    maxDuration?: number
    runtime?: 'edge' | 'experimental-edge' | 'nodejs' | string // necessary unless config is exported as const
    regions?: string[]
  }
}

`;
    }
    if (layoutValidations) {
        typeDefinitions += `type LayoutConfig<Route extends LayoutRoutes = LayoutRoutes> = {
  default: React.ComponentType<LayoutProps<Route>> | ((props: LayoutProps<Route>) => React.ReactNode | Promise<React.ReactNode> | never | void | Promise<void>)
  generateStaticParams?: (props: { params: ParamMap[Route] }) => Promise<any[]> | any[]
  generateMetadata?: (
    props: { params: Promise<ParamMap[Route]> } & any,
    parent: ResolvingMetadata
  ) => Promise<any> | any
  generateViewport?: (
    props: { params: Promise<ParamMap[Route]> } & any,
    parent: ResolvingViewport
  ) => Promise<any> | any
  metadata?: any
  viewport?: any
}

`;
    }
    if (appRouteHandlerValidations) {
        typeDefinitions += `type RouteHandlerConfig<Route extends AppRouteHandlerRoutes = AppRouteHandlerRoutes> = {
  GET?: (request: NextRequest, context: { params: Promise<ParamMap[Route]> }) => Promise<Response | void> | Response | void
  POST?: (request: NextRequest, context: { params: Promise<ParamMap[Route]> }) => Promise<Response | void> | Response | void
  PUT?: (request: NextRequest, context: { params: Promise<ParamMap[Route]> }) => Promise<Response | void> | Response | void
  PATCH?: (request: NextRequest, context: { params: Promise<ParamMap[Route]> }) => Promise<Response | void> | Response | void
  DELETE?: (request: NextRequest, context: { params: Promise<ParamMap[Route]> }) => Promise<Response | void> | Response | void
  HEAD?: (request: NextRequest, context: { params: Promise<ParamMap[Route]> }) => Promise<Response | void> | Response | void
  OPTIONS?: (request: NextRequest, context: { params: Promise<ParamMap[Route]> }) => Promise<Response | void> | Response | void
}

`;
    }
    if (pagesApiRouteValidations) {
        typeDefinitions += `type ApiRouteConfig = {
  default: (req: any, res: any) => ReturnType<NextApiHandler>
  config?: {
    api?: {
      bodyParser?: boolean | { sizeLimit?: string }
      responseLimit?: string | number | boolean
      externalResolver?: boolean
    }
    runtime?: 'edge' | 'experimental-edge' | 'nodejs' | string // necessary unless config is exported as const
    maxDuration?: number
  }
}

`;
    }
    // Build import statement based on what's actually needed
    const routeImports = [];
    // Only import AppRoutes if there are app pages
    if (appPageValidations) {
        routeImports.push('AppRoutes');
    }
    // Only import LayoutRoutes if there are layouts
    if (layoutValidations) {
        routeImports.push('LayoutRoutes');
    }
    // Only import ParamMap if there are routes that use it
    if (appPageValidations || layoutValidations || appRouteHandlerValidations) {
        routeImports.push('ParamMap');
    }
    if (hasAppRouteHandlers) {
        routeImports.push('AppRouteHandlerRoutes');
    }
    const routeImportStatement = routeImports.length > 0 ? `import type { ${routeImports.join(', ')} } from "./routes.js"` : '';
    const nextRequestImport = hasAppRouteHandlers ? "import type { NextRequest } from 'next/server.js'\n" : '';
    // Conditionally import types from next/types, merged into a single statement
    const nextTypes = [];
    if (pagesApiRouteValidations) {
        nextTypes.push('NextApiHandler');
    }
    if (appPageValidations || layoutValidations) {
        nextTypes.push('ResolvingMetadata', 'ResolvingViewport');
    }
    const nextTypesImport = nextTypes.length > 0 ? `import type { ${nextTypes.join(', ')} } from "next/types.js"\n` : '';
    return `// This file is generated automatically by Next.js
// Do not edit this file manually
// This file validates that all pages and layouts export the correct types

${routeImportStatement}
${nextTypesImport}${nextRequestImport}
${typeDefinitions}
${appPageValidations}

${appRouteHandlerValidations}

${pagesRouterPageValidations}

${pagesApiRouteValidations}

${layoutValidations}
`;
}
function generateRouteTypesFile(routesManifest) {
    const routeTypes = generateRouteTypes(routesManifest);
    const paramTypes = generateParamTypes(routesManifest);
    const layoutSlotMap = generateLayoutSlotMap(routesManifest);
    const hasAppRouteHandlers = Object.keys(routesManifest.appRouteHandlerRoutes).length > 0;
    // Build export statement based on what's actually generated
    const routeExports = [
        'AppRoutes',
        'PageRoutes',
        'LayoutRoutes',
        'RedirectRoutes',
        'RewriteRoutes',
        'ParamMap'
    ];
    if (hasAppRouteHandlers) {
        routeExports.push('AppRouteHandlerRoutes');
    }
    const exportStatement = `export type { ${routeExports.join(', ')} }`;
    const routeContextInterface = hasAppRouteHandlers ? `

  /**
   * Context for Next.js App Router route handlers
   * @example
   * \`\`\`tsx
   * export async function GET(request: NextRequest, context: RouteContext<'/api/users/[id]'>) {
   *   const { id } = await context.params
   *   return Response.json({ id })
   * }
   * \`\`\`
   */
  interface RouteContext<AppRouteHandlerRoute extends AppRouteHandlerRoutes> {
    params: Promise<ParamMap[AppRouteHandlerRoute]>
  }` : '';
    return `// This file is generated automatically by Next.js
// Do not edit this file manually

${routeTypes}

${paramTypes}

export type ParamsOf<Route extends Routes> = ParamMap[Route]

${layoutSlotMap}

${exportStatement}

declare global {
  /**
   * Props for Next.js App Router page components
   * @example
   * \`\`\`tsx
   * export default function Page(props: PageProps<'/blog/[slug]'>) {
   *   const { slug } = await props.params
   *   return <div>Blog post: {slug}</div>
   * }
   * \`\`\`
   */
  interface PageProps<AppRoute extends AppRoutes> {
    params: Promise<ParamMap[AppRoute]>
    searchParams: Promise<Record<string, string | string[] | undefined>>
  }

  /**
   * Props for Next.js App Router layout components
   * @example
   * \`\`\`tsx
   * export default function Layout(props: LayoutProps<'/dashboard'>) {
   *   return <div>{props.children}</div>
   * }
   * \`\`\`
   */
  type LayoutProps<LayoutRoute extends LayoutRoutes> = {
    params: Promise<ParamMap[LayoutRoute]>
    children: React.ReactNode
  } & {
    [K in LayoutSlotMap[LayoutRoute]]: React.ReactNode
  }${routeContextInterface}
}
`;
} //# sourceMappingURL=typegen.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/route-types-utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    convertCustomRouteSource: null,
    createRouteTypesManifest: null,
    extractRouteParams: null,
    writeRouteTypesManifest: null,
    writeValidatorFile: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    convertCustomRouteSource: function() {
        return convertCustomRouteSource;
    },
    createRouteTypesManifest: function() {
        return createRouteTypesManifest;
    },
    extractRouteParams: function() {
        return extractRouteParams;
    },
    writeRouteTypesManifest: function() {
        return writeRouteTypesManifest;
    },
    writeValidatorFile: function() {
        return writeValidatorFile;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/path [external] (path, cjs)"));
const _routeregex = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-regex.js [app-ssr] (ecmascript)");
const _fs = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)"));
const _typegen = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/typegen.js [app-ssr] (ecmascript)");
const _trytoparsepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/try-to-parse-path.js [app-ssr] (ecmascript)");
const _interceptionroutes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [app-ssr] (ecmascript)");
const _entryconstants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/entry-constants.js [app-ssr] (ecmascript)");
const _normalizepathsep = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function convertCustomRouteSource(source) {
    const parseResult = (0, _trytoparsepath.tryToParsePath)(source);
    if (parseResult.error || !parseResult.tokens) {
        // Fallback to original source if parsing fails
        return source.startsWith('/') ? [
            source
        ] : [
            '/' + source
        ];
    }
    const possibleNormalizedRoutes = [
        ''
    ];
    let slugCnt = 1;
    function append(suffix) {
        for(let i = 0; i < possibleNormalizedRoutes.length; i++){
            possibleNormalizedRoutes[i] += suffix;
        }
    }
    function fork(suffix) {
        const currentLength = possibleNormalizedRoutes.length;
        for(let i = 0; i < currentLength; i++){
            possibleNormalizedRoutes.push(possibleNormalizedRoutes[i] + suffix);
        }
    }
    for (const token of parseResult.tokens){
        if (typeof token === 'object') {
            // Make sure the slug is always named.
            const slug = token.name || (slugCnt++ === 1 ? 'slug' : `slug${slugCnt}`);
            if (token.modifier === '*') {
                append(`${token.prefix}[[...${slug}]]`);
            } else if (token.modifier === '+') {
                append(`${token.prefix}[...${slug}]`);
            } else if (token.modifier === '') {
                if (token.pattern === '[^\\/#\\?]+?') {
                    // A safe slug
                    append(`${token.prefix}[${slug}]`);
                } else if (token.pattern === '.*') {
                    // An optional catch-all slug
                    append(`${token.prefix}[[...${slug}]]`);
                } else if (token.pattern === '.+') {
                    // A catch-all slug
                    append(`${token.prefix}[...${slug}]`);
                } else {
                    // Other regex patterns are not supported. Skip this route.
                    return [];
                }
            } else if (token.modifier === '?') {
                if (/^[a-zA-Z0-9_/]*$/.test(token.pattern)) {
                    // An optional slug with plain text only, fork the route.
                    append(token.prefix);
                    fork(token.pattern);
                } else {
                    // Optional modifier `?` and regex patterns are not supported.
                    return [];
                }
            }
        } else if (typeof token === 'string') {
            append(token);
        }
    }
    // Ensure leading slash
    return possibleNormalizedRoutes.map((route)=>route.startsWith('/') ? route : '/' + route);
}
function extractRouteParams(route) {
    const regex = (0, _routeregex.getRouteRegex)(route);
    return regex.groups;
}
/**
 * Resolves an intercepting route to its canonical equivalent
 * Example: /gallery/test/(..)photo/[id] -> /gallery/photo/[id]
 */ function resolveInterceptingRoute(route) {
    // Reuse centralized interception route normalization logic
    try {
        if (!(0, _interceptionroutes.isInterceptionRouteAppPath)(route)) return route;
        const { interceptedRoute } = (0, _interceptionroutes.extractInterceptionRouteInformation)(route);
        return interceptedRoute;
    } catch  {
        // If parsing fails, fall back to the original route
        return route;
    }
}
async function createRouteTypesManifest({ dir, pageRoutes, appRoutes, appRouteHandlers, pageApiRoutes, layoutRoutes, slots, redirects, rewrites, validatorFilePath }) {
    // Helper function to calculate the correct relative path
    const getRelativePath = (filePath)=>{
        if (validatorFilePath) {
            // For validator generation, calculate path relative to validator directory
            return (0, _normalizepathsep.normalizePathSep)(_path.default.relative(_path.default.dirname(validatorFilePath), filePath));
        }
        // For other uses, calculate path relative to project directory
        return (0, _normalizepathsep.normalizePathSep)(_path.default.relative(dir, filePath));
    };
    const manifest = {
        appRoutes: {},
        pageRoutes: {},
        layoutRoutes: {},
        appRouteHandlerRoutes: {},
        redirectRoutes: {},
        rewriteRoutes: {},
        appRouteHandlers: new Set(appRouteHandlers.map(({ filePath })=>getRelativePath(filePath))),
        pageApiRoutes: new Set(pageApiRoutes.map(({ filePath })=>getRelativePath(filePath))),
        appPagePaths: new Set(appRoutes.map(({ filePath })=>getRelativePath(filePath))),
        pagesRouterPagePaths: new Set(pageRoutes.map(({ filePath })=>getRelativePath(filePath))),
        layoutPaths: new Set(layoutRoutes.map(({ filePath })=>getRelativePath(filePath))),
        filePathToRoute: new Map([
            ...appRoutes.map(({ route, filePath })=>[
                    getRelativePath(filePath),
                    resolveInterceptingRoute(route)
                ]),
            ...layoutRoutes.map(({ route, filePath })=>[
                    getRelativePath(filePath),
                    resolveInterceptingRoute(route)
                ]),
            ...appRouteHandlers.map(({ route, filePath })=>[
                    getRelativePath(filePath),
                    resolveInterceptingRoute(route)
                ]),
            ...pageRoutes.map(({ route, filePath })=>[
                    getRelativePath(filePath),
                    route
                ]),
            ...pageApiRoutes.map(({ route, filePath })=>[
                    getRelativePath(filePath),
                    route
                ])
        ])
    };
    // Process page routes
    for (const { route, filePath } of pageRoutes){
        manifest.pageRoutes[route] = {
            path: getRelativePath(filePath),
            groups: extractRouteParams(route)
        };
    }
    // Process layout routes (exclude internal app error/not-found layouts)
    for (const { route, filePath } of layoutRoutes){
        if (route === _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE || route === _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE) continue;
        // Use the resolved route (for interception routes, this gives us the canonical route)
        const resolvedRoute = resolveInterceptingRoute(route);
        if (!manifest.layoutRoutes[resolvedRoute]) {
            manifest.layoutRoutes[resolvedRoute] = {
                path: getRelativePath(filePath),
                groups: extractRouteParams(resolvedRoute),
                slots: []
            };
        }
    }
    // Process slots
    for (const slot of slots){
        if (manifest.layoutRoutes[slot.parent]) {
            manifest.layoutRoutes[slot.parent].slots.push(slot.name);
        }
    }
    // Process app routes (exclude internal app routes)
    for (const { route, filePath } of appRoutes){
        if (route === _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE || route === _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE) continue;
        // Don't include metadata routes or pages
        if (!filePath.endsWith('page.ts') && !filePath.endsWith('page.tsx') && !filePath.endsWith('.mdx') && !filePath.endsWith('.md')) {
            continue;
        }
        // Use the resolved route (for interception routes, this gives us the canonical route)
        const resolvedRoute = resolveInterceptingRoute(route);
        if (!manifest.appRoutes[resolvedRoute]) {
            manifest.appRoutes[resolvedRoute] = {
                path: getRelativePath(filePath),
                groups: extractRouteParams(resolvedRoute)
            };
        }
    }
    // Process app route handlers
    for (const { route, filePath } of appRouteHandlers){
        // Use the resolved route (for interception routes, this gives us the canonical route)
        const resolvedRoute = resolveInterceptingRoute(route);
        if (!manifest.appRouteHandlerRoutes[resolvedRoute]) {
            manifest.appRouteHandlerRoutes[resolvedRoute] = {
                path: getRelativePath(filePath),
                groups: extractRouteParams(resolvedRoute)
            };
        }
    }
    // Process redirects
    if (typeof redirects === 'function') {
        const rd = await redirects();
        for (const item of rd){
            const possibleRoutes = convertCustomRouteSource(item.source);
            for (const route of possibleRoutes){
                manifest.redirectRoutes[route] = {
                    path: route,
                    groups: extractRouteParams(route)
                };
            }
        }
    }
    // Process rewrites
    if (typeof rewrites === 'function') {
        const rw = await rewrites();
        const allSources = Array.isArray(rw) ? rw : [
            ...(rw == null ? void 0 : rw.beforeFiles) || [],
            ...(rw == null ? void 0 : rw.afterFiles) || [],
            ...(rw == null ? void 0 : rw.fallback) || []
        ];
        for (const item of allSources){
            const possibleRoutes = convertCustomRouteSource(item.source);
            for (const route of possibleRoutes){
                manifest.rewriteRoutes[route] = {
                    path: route,
                    groups: extractRouteParams(route)
                };
            }
        }
    }
    return manifest;
}
async function writeRouteTypesManifest(manifest, filePath, config) {
    const dirname = _path.default.dirname(filePath);
    if (!_fs.default.existsSync(dirname)) {
        await _fs.default.promises.mkdir(dirname, {
            recursive: true
        });
    }
    // Write the main routes.d.ts file
    await _fs.default.promises.writeFile(filePath, (0, _typegen.generateRouteTypesFile)(manifest));
    // Write the link.d.ts file if typedRoutes is enabled
    if (config.typedRoutes === true) {
        const linkTypesPath = _path.default.join(dirname, 'link.d.ts');
        await _fs.default.promises.writeFile(linkTypesPath, (0, _typegen.generateLinkTypesFile)(manifest));
    }
}
async function writeValidatorFile(manifest, filePath) {
    const dirname = _path.default.dirname(filePath);
    if (!_fs.default.existsSync(dirname)) {
        await _fs.default.promises.mkdir(dirname, {
            recursive: true
        });
    }
    await _fs.default.promises.writeFile(filePath, (0, _typegen.generateValidatorFile)(manifest));
} //# sourceMappingURL=route-types-utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/cache-life-type-utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    generateCacheLifeTypes: null,
    writeCacheLifeTypes: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    generateCacheLifeTypes: function() {
        return generateCacheLifeTypes;
    },
    writeCacheLifeTypes: function() {
        return writeCacheLifeTypes;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)"));
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/path [external] (path, cjs)"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * 60 // nevermind leap seconds
;
const DAY_IN_SECONDS = HOUR_IN_SECONDS * 24;
const WEEK_IN_SECONDS = DAY_IN_SECONDS * 7;
// Nevermind leap years, or you know, July
const MONTH_30_DAYS_IN_SECONDS = DAY_IN_SECONDS * 30;
function formatTimespan(seconds) {
    if (seconds > 0) {
        if (seconds === MONTH_30_DAYS_IN_SECONDS) {
            return '1 month';
        }
        if (seconds === WEEK_IN_SECONDS) {
            return '1 week';
        }
        if (seconds === DAY_IN_SECONDS) {
            return '1 day';
        }
        if (seconds === HOUR_IN_SECONDS) {
            return '1 hour';
        }
        if (seconds === MINUTE_IN_SECONDS) {
            return '1 minute';
        }
        if (seconds % MONTH_30_DAYS_IN_SECONDS === 0) {
            return seconds / MONTH_30_DAYS_IN_SECONDS + ' months';
        }
        if (seconds % 18144000 === 0) {
            return seconds / 18144000 + ' months';
        }
        if (seconds % WEEK_IN_SECONDS === 0) {
            return seconds / WEEK_IN_SECONDS + ' weeks';
        }
        if (seconds % DAY_IN_SECONDS === 0) {
            return seconds / DAY_IN_SECONDS + ' days';
        }
        if (seconds % HOUR_IN_SECONDS === 0) {
            return seconds / HOUR_IN_SECONDS + ' hours';
        }
        if (seconds % MINUTE_IN_SECONDS === 0) {
            return seconds / MINUTE_IN_SECONDS + ' minutes';
        }
    }
    return seconds + ' seconds';
}
function formatTimespanWithSeconds(seconds) {
    if (seconds === undefined) {
        return 'default';
    }
    if (seconds >= 0xfffffffe) {
        return 'never';
    }
    const text = seconds + ' seconds';
    const descriptive = formatTimespan(seconds);
    if (descriptive === text) {
        return text;
    }
    return text + ' (' + descriptive + ')';
}
function generateCacheLifeTypes(cacheLife) {
    let overloads = '';
    const profileNames = Object.keys(cacheLife);
    for(let i = 0; i < profileNames.length; i++){
        const profileName = profileNames[i];
        const profile = cacheLife[profileName];
        if (typeof profile !== 'object' || profile === null) {
            continue;
        }
        let description = '';
        if (profile.stale === undefined) {
            description += `
     * This cache may be stale on clients for the default stale time of the scope before checking with the server.`;
        } else if (profile.stale >= 0xfffffffe) {
            description += `
     * This cache may be stale on clients indefinitely before checking with the server.`;
        } else {
            description += `
     * This cache may be stale on clients for ${formatTimespan(profile.stale)} before checking with the server.`;
        }
        if (profile.revalidate !== undefined && profile.expire !== undefined && profile.revalidate >= profile.expire) {
            description += `
     * This cache will expire after ${formatTimespan(profile.expire)}. The next request will recompute it.`;
        } else {
            if (profile.revalidate === undefined) {
                description += `
     * It will inherit the default revalidate time of its scope since it does not define its own.`;
            } else if (profile.revalidate >= 0xfffffffe) {
            // Nothing to mention.
            } else {
                description += `
     * If the server receives a new request after ${formatTimespan(profile.revalidate)}, start revalidating new values in the background.`;
            }
            if (profile.expire === undefined) {
                description += `
     * It will inherit the default expiration time of its scope since it does not define its own.`;
            } else if (profile.expire >= 0xfffffffe) {
                description += `
     * It lives for the maximum age of the server cache. If this entry has no traffic for a while, it may serve an old value the next request.`;
            } else {
                description += `
     * If this entry has no traffic for ${formatTimespan(profile.expire)} it will expire. The next request will recompute it.`;
            }
        }
        overloads += `
    /**
     * Cache this \`"use cache"\` for a timespan defined by the \`${JSON.stringify(profileName)}\` profile.
     * \`\`\`
     *   stale:      ${formatTimespanWithSeconds(profile.stale)}
     *   revalidate: ${formatTimespanWithSeconds(profile.revalidate)}
     *   expire:     ${formatTimespanWithSeconds(profile.expire)}
     * \`\`\`
     * ${description}
     */
    export function cacheLife(profile: ${JSON.stringify(profileName)}): void
    `;
    }
    overloads += `
    /**
     * Cache this \`"use cache"\` using a custom timespan.
     * \`\`\`
     *   stale: ... // seconds
     *   revalidate: ... // seconds
     *   expire: ... // seconds
     * \`\`\`
     *
     * This is similar to Cache-Control: max-age=\`stale\`,s-max-age=\`revalidate\`,stale-while-revalidate=\`expire-revalidate\`
     *
     * If a value is left out, the lowest of other cacheLife() calls or the default, is used instead.
     */
    export function cacheLife(profile: {
      /**
       * This cache may be stale on clients for ... seconds before checking with the server.
       */
      stale?: number,
      /**
       * If the server receives a new request after ... seconds, start revalidating new values in the background.
       */
      revalidate?: number,
      /**
       * If this entry has no traffic for ... seconds it will expire. The next request will recompute it.
       */
      expire?: number
    }): void
  `;
    // Redefine the cacheLife() accepted arguments.
    return `// Type definitions for Next.js cacheLife configs

declare module 'next/cache' {
  export { unstable_cache } from 'next/dist/server/web/spec-extension/unstable-cache'
  export {
    updateTag,
    revalidateTag,
    revalidatePath,
    refresh,
  } from 'next/dist/server/web/spec-extension/revalidate'
  export { unstable_noStore } from 'next/dist/server/web/spec-extension/unstable-no-store'

  ${overloads}

  import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
  export { cacheTag }

  export const unstable_cacheTag: typeof cacheTag
  export const unstable_cacheLife: typeof cacheLife
}
`;
}
function writeCacheLifeTypes(cacheLifeConfig, filePath) {
    if (!cacheLifeConfig || Object.keys(cacheLifeConfig).length === 0) {
        return;
    }
    const dirname = _path.default.dirname(filePath);
    if (!_fs.default.existsSync(dirname)) {
        _fs.default.mkdirSync(dirname, {
            recursive: true
        });
    }
    const content = generateCacheLifeTypes(cacheLifeConfig);
    _fs.default.writeFileSync(filePath, content);
} //# sourceMappingURL=cache-life-type-utils.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/render-server.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    clearAllModuleContexts: null,
    clearModuleContext: null,
    getServerField: null,
    initialize: null,
    propagateServerField: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    clearAllModuleContexts: function() {
        return clearAllModuleContexts;
    },
    clearModuleContext: function() {
        return clearModuleContext;
    },
    getServerField: function() {
        return getServerField;
    },
    initialize: function() {
        return initialize;
    },
    propagateServerField: function() {
        return propagateServerField;
    }
});
const _next = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/next.js [app-ssr] (ecmascript)"));
const _interopdefault = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/interop-default.js [app-ssr] (ecmascript)");
const _formatdynamicimportpath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/format-dynamic-import-path.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let initializations = {};
let sandboxContext;
if ("TURBOPACK compile-time truthy", 1) {
    sandboxContext = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/web/sandbox/context.js [app-ssr] (ecmascript)");
}
function clearAllModuleContexts() {
    return sandboxContext == null ? void 0 : sandboxContext.clearAllModuleContexts();
}
function clearModuleContext(target) {
    return sandboxContext == null ? void 0 : sandboxContext.clearModuleContext(target);
}
async function getServerField(dir, field) {
    const initialization = await initializations[dir];
    if (!initialization) {
        throw Object.defineProperty(new Error('Invariant cant propagate server field, no app initialized'), "__NEXT_ERROR_CODE", {
            value: "E116",
            enumerable: false,
            configurable: true
        });
    }
    const { server } = initialization;
    let wrappedServer = server['server'] // NextServer.server is private
    ;
    return wrappedServer[field];
}
async function propagateServerField(dir, field, value) {
    const initialization = await initializations[dir];
    if (!initialization) {
        throw Object.defineProperty(new Error('Invariant cant propagate server field, no app initialized'), "__NEXT_ERROR_CODE", {
            value: "E116",
            enumerable: false,
            configurable: true
        });
    }
    const { server } = initialization;
    let wrappedServer = server['server'];
    const _field = field;
    if (wrappedServer) {
        if (typeof wrappedServer[_field] === 'function') {
            // @ts-expect-error
            await wrappedServer[_field].apply(wrappedServer, Array.isArray(value) ? value : []);
        } else {
            // @ts-expect-error
            wrappedServer[_field] = value;
        }
    }
}
async function initializeImpl(opts) {
    const type = process.env.__NEXT_PRIVATE_RENDER_WORKER;
    if (type) {
        process.title = 'next-render-worker-' + type;
    }
    let requestHandler;
    let upgradeHandler;
    const server = (0, _next.default)({
        ...opts,
        hostname: opts.hostname || 'localhost',
        customServer: false,
        httpServer: opts.server,
        port: opts.port
    }) // should return a NextServer when `customServer: false`
    ;
    // If we're in test mode and there's a debug cache entry handler available,
    // then use it to wrap the request handler instead of using the default one.
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        requestHandler = server.getRequestHandler();
        upgradeHandler = server.getUpgradeHandler();
    }
    await server.prepare(opts.serverFields);
    return {
        requestHandler,
        upgradeHandler,
        server,
        closeUpgraded () {
            var _opts_bundlerService;
            (_opts_bundlerService = opts.bundlerService) == null ? void 0 : _opts_bundlerService.close();
        }
    };
}
async function initialize(opts) {
    // if we already setup the server return as we only need to do
    // this on first worker boot
    if (initializations[opts.dir]) {
        return initializations[opts.dir];
    }
    return initializations[opts.dir] = initializeImpl(opts);
} //# sourceMappingURL=render-server.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/experimental/create-env-definitions.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createEnvDefinitions", {
    enumerable: true,
    get: function() {
        return createEnvDefinitions;
    }
});
const _nodepath = __turbopack_context__.r("[externals]/node:path [external] (node:path, cjs)");
const _promises = __turbopack_context__.r("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
async function createEnvDefinitions({ distDir, loadedEnvFiles }) {
    const envLines = [];
    const seenKeys = new Set();
    // env files are in order of priority
    for (const { path, env } of loadedEnvFiles){
        for(const key in env){
            if (!seenKeys.has(key)) {
                envLines.push(`      /** Loaded from \`${path}\` */`);
                envLines.push(`      ${key}?: string`);
                seenKeys.add(key);
            }
        }
    }
    const envStr = envLines.join('\n');
    const definitionStr = `// Type definitions for Next.js environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
${envStr}
    }
  }
}
export {}`;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        // we expect the types directory to already exist
        const envDtsPath = (0, _nodepath.join)(distDir, 'types', 'env.d.ts');
        await (0, _promises.writeFile)(envDtsPath, definitionStr, 'utf-8');
    } catch (e) {
        console.error('Failed to write env.d.ts:', e);
    }
} //# sourceMappingURL=create-env-definitions.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    propagateServerField: null,
    setupDevBundler: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    propagateServerField: function() {
        return propagateServerField;
    },
    setupDevBundler: function() {
        return setupDevBundler;
    }
});
const _swc = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/index.js [app-ssr] (ecmascript)");
const _installbindings = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/swc/install-bindings.js [app-ssr] (ecmascript)");
const _fs = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)"));
const _url = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/url [external] (url, cjs)"));
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/path [external] (path, cjs)"));
const _querystring = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/querystring [external] (querystring, cjs)"));
const _watchpack = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/watchpack/watchpack.js [app-ssr] (ecmascript)"));
const _findup = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/find-up/index.js [app-ssr] (ecmascript)"));
const _filesystem = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/filesystem.js [app-ssr] (ecmascript)");
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-ssr] (ecmascript)"));
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-ssr] (ecmascript)");
const _findpagefile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/find-page-file.js [app-ssr] (ecmascript)");
const _events = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/events/index.js [app-ssr] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/index.js [app-ssr] (ecmascript)");
const _sortbypageexts = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/sort-by-page-exts.js [app-ssr] (ecmascript)");
const _verifytypescriptsetup = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/verify-typescript-setup.js [app-ssr] (ecmascript)");
const _verifypartytownsetup = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/verify-partytown-setup.js [app-ssr] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-regex.js [app-ssr] (ecmascript)");
const _apppaths = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-ssr] (ecmascript)");
const _builddataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/build-data-route.js [app-ssr] (ecmascript)");
const _routematcher = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/route-matcher.js [app-ssr] (ecmascript)");
const _normalizepathsep = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [app-ssr] (ecmascript)");
const _createclientrouterfilter = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/create-client-router-filter.js [app-ssr] (ecmascript)");
const _absolutepathtopage = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/absolute-path-to-page.js [app-ssr] (ecmascript)");
const _generateinterceptionroutesrewrites = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/generate-interception-routes-rewrites.js [app-ssr] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-ssr] (ecmascript)");
const _middlewareroutematcher = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/middleware-route-matcher.js [app-ssr] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/utils.js [app-ssr] (ecmascript)");
const _shared1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/next-types-plugin/shared.js [app-ssr] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-ssr] (ecmascript)");
const _pagetypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/page-types.js [app-ssr] (ecmascript)");
const _encryptionutilsserver = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/app-render/encryption-utils-server.js [app-ssr] (ecmascript)");
const _ismetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/is-metadata-route.js [app-ssr] (ecmascript)");
const _getmetadataroute = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/metadata/get-metadata-route.js [app-ssr] (ecmascript)");
const _jsconfigpathsplugin = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/webpack/plugins/jsconfig-paths-plugin.js [app-ssr] (ecmascript)");
const _store = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/store.js [app-ssr] (ecmascript)");
const _utils2 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/utils.js [app-ssr] (ecmascript)");
const _defineenv = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/define-env.js [app-ssr] (ecmascript)");
const _internalerror = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/turbopack/internal-error.js [app-ssr] (ecmascript)");
const _normalizepath = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/normalize-path.js [app-ssr] (ecmascript)");
const _constants1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/constants.js [app-ssr] (ecmascript)");
const _routetypesutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/route-types-utils.js [app-ssr] (ecmascript)");
const _cachelifetypeutils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/cache-life-type-utils.js [app-ssr] (ecmascript)");
const _segment = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/segment.js [app-ssr] (ecmascript)");
const _ensureleadingslash = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js [app-ssr] (ecmascript)");
const _lockfile = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/lockfile.js [app-ssr] (ecmascript)");
const _magicidentifier = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/magic-identifier.js [app-ssr] (ecmascript)");
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
async function verifyTypeScript(opts) {
    const verifyResult = await (0, _verifytypescriptsetup.verifyTypeScriptSetup)({
        dir: opts.dir,
        distDir: opts.nextConfig.distDir,
        intentDirs: [
            opts.pagesDir,
            opts.appDir
        ].filter(Boolean),
        typeCheckPreflight: false,
        tsconfigPath: opts.nextConfig.typescript.tsconfigPath,
        disableStaticImages: opts.nextConfig.images.disableStaticImages,
        hasAppDir: !!opts.appDir,
        hasPagesDir: !!opts.pagesDir,
        isolatedDevBuild: opts.nextConfig.experimental.isolatedDevBuild
    });
    if (verifyResult.version) {
        return true;
    }
    return false;
}
async function propagateServerField(opts, field, args) {
    var _opts_renderServer_instance, _opts_renderServer;
    await ((_opts_renderServer = opts.renderServer) == null ? void 0 : (_opts_renderServer_instance = _opts_renderServer.instance) == null ? void 0 : _opts_renderServer_instance.propagateServerField(opts.dir, field, args));
}
async function startWatcher(opts) {
    const { nextConfig, appDir, pagesDir, dir, resetFetch } = opts;
    const { useFileSystemPublicRoutes } = nextConfig;
    const distDir = _path.default.join(opts.dir, opts.nextConfig.distDir);
    (0, _shared.setGlobal)('distDir', distDir);
    (0, _shared.setGlobal)('phase', _constants.PHASE_DEVELOPMENT_SERVER);
    let lockfile;
    if (opts.nextConfig.experimental.lockDistDir) {
        _fs.default.mkdirSync(distDir, {
            recursive: true
        });
        lockfile = await _lockfile.Lockfile.acquireWithRetriesOrExit(_path.default.join(distDir, 'lock'), 'next dev');
    }
    const validFileMatcher = (0, _findpagefile.createValidFileMatcher)(nextConfig.pageExtensions, appDir);
    const serverFields = {};
    // Update logging state once based on next.config.js when initializing
    _store.store.setState({
        logging: nextConfig.logging !== false
    });
    const hotReloader = opts.turbo ? await (async ()=>{
        const createHotReloaderTurbopack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-turbopack.js [app-ssr] (ecmascript)").createHotReloaderTurbopack;
        return await createHotReloaderTurbopack(opts, serverFields, distDir, resetFetch, lockfile);
    })() : await (async ()=>{
        const HotReloaderWebpack = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-webpack.js [app-ssr] (ecmascript)").default;
        return new HotReloaderWebpack(opts.dir, {
            isSrcDir: opts.isSrcDir,
            appDir,
            pagesDir,
            distDir,
            config: opts.nextConfig,
            buildId: 'development',
            encryptionKey: await (0, _encryptionutilsserver.generateEncryptionKeyBase64)({
                isBuild: false,
                distDir
            }),
            telemetry: opts.telemetry,
            rewrites: opts.fsChecker.rewrites,
            previewProps: opts.fsChecker.prerenderManifest.preview,
            resetFetch,
            lockfile,
            onDevServerCleanup: opts.onDevServerCleanup
        });
    })();
    await hotReloader.start();
    // have to write this after starting hot-reloader since that
    // cleans the dist dir
    const distTypesDir = _path.default.join(distDir, 'types');
    await (0, _routetypesutils.writeRouteTypesManifest)({
        appRoutes: {},
        pageRoutes: {},
        layoutRoutes: {},
        appRouteHandlerRoutes: {},
        redirectRoutes: {},
        rewriteRoutes: {},
        appPagePaths: new Set(),
        pagesRouterPagePaths: new Set(),
        layoutPaths: new Set(),
        appRouteHandlers: new Set(),
        pageApiRoutes: new Set(),
        filePathToRoute: new Map()
    }, _path.default.join(distTypesDir, 'routes.d.ts'), opts.nextConfig);
    const routesManifestPath = _path.default.join(distDir, _constants.ROUTES_MANIFEST);
    const routesManifest = {
        version: 3,
        caseSensitive: !!nextConfig.experimental.caseSensitiveRoutes,
        basePath: nextConfig.basePath,
        rewrites: opts.fsChecker.rewrites,
        redirects: opts.fsChecker.redirects,
        headers: opts.fsChecker.headers,
        i18n: nextConfig.i18n || undefined,
        skipProxyUrlNormalize: nextConfig.skipProxyUrlNormalize
    };
    await _fs.default.promises.writeFile(routesManifestPath, JSON.stringify(routesManifest));
    const prerenderManifestPath = _path.default.join(distDir, _constants.PRERENDER_MANIFEST);
    await _fs.default.promises.writeFile(prerenderManifestPath, JSON.stringify(opts.fsChecker.prerenderManifest, null, 2));
    if (opts.nextConfig.experimental.nextScriptWorkers) {
        await (0, _verifypartytownsetup.verifyPartytownSetup)(opts.dir, _path.default.join(distDir, _constants.CLIENT_STATIC_FILES_PATH));
    }
    opts.fsChecker.ensureCallback(async function ensure(item) {
        if (item.type === 'appFile' || item.type === 'pageFile') {
            await hotReloader.ensurePage({
                clientOnly: false,
                page: item.itemPath,
                isApp: item.type === 'appFile',
                definition: undefined
            });
        }
    });
    let resolved = false;
    let prevSortedRoutes = [];
    await new Promise(async (resolve, reject)=>{
        if (pagesDir) {
            // Watchpack doesn't emit an event for an empty directory
            _fs.default.readdir(pagesDir, (_, files)=>{
                if (files == null ? void 0 : files.length) {
                    return;
                }
                if (!resolved) {
                    resolve();
                    resolved = true;
                }
            });
        }
        const pages = pagesDir ? [
            pagesDir
        ] : [];
        const app = appDir ? [
            appDir
        ] : [];
        const directories = [
            ...pages,
            ...app
        ];
        const rootDir = pagesDir || appDir;
        const files = [
            ...(0, _utils1.getPossibleMiddlewareFilenames)(_path.default.join(rootDir, '..'), nextConfig.pageExtensions),
            ...(0, _utils1.getPossibleInstrumentationHookFilenames)(_path.default.join(rootDir, '..'), nextConfig.pageExtensions)
        ];
        let nestedMiddleware = [];
        const envFiles = [
            '.env.development.local',
            '.env.local',
            '.env.development',
            '.env'
        ].map((file)=>_path.default.join(dir, file));
        files.push(...envFiles);
        // tsconfig/jsconfig paths hot-reloading
        const tsconfigPaths = [
            _path.default.join(dir, 'tsconfig.json'),
            _path.default.join(dir, 'jsconfig.json')
        ];
        files.push(...tsconfigPaths);
        const wp = new _watchpack.default({
            // Watchpack default is 200ms which adds 200ms of dead time on bootup.
            aggregateTimeout: 5,
            ignored: (pathname)=>{
                return !files.some((file)=>file.startsWith(pathname)) && !directories.some((d)=>pathname.startsWith(d) || d.startsWith(pathname));
            }
        });
        const fileWatchTimes = new Map();
        let enabledTypeScript = await verifyTypeScript(opts);
        let previousClientRouterFilters;
        let previousConflictingPagePaths = new Set();
        const routeTypesFilePath = _path.default.join(distDir, 'types', 'routes.d.ts');
        const validatorFilePath = _path.default.join(distDir, 'types', 'validator.ts');
        let initialWatchTime = performance.now() + performance.timeOrigin;
        wp.on('aggregated', async ()=>{
            var _serverFields_middleware, _serverFields_middleware1;
            let writeEnvDefinitions = false;
            let typescriptStatusFromLastAggregation = enabledTypeScript;
            let middlewareMatchers;
            const routedPages = [];
            const knownFiles = wp.getTimeInfoEntries();
            const appPaths = {};
            const pageNameSet = new Set();
            const conflictingAppPagePaths = new Set();
            const appPageFilePaths = new Map();
            const pagesPageFilePaths = new Map();
            const appRouteHandlers = [];
            const pageApiRoutes = [];
            const pageRoutes = [];
            const appRoutes = [];
            const layoutRoutes = [];
            const slots = [];
            let envChange = false;
            let tsconfigChange = false;
            let conflictingPageChange = 0;
            let hasRootAppNotFound = false;
            const { appFiles, pageFiles, staticMetadataFiles } = opts.fsChecker;
            appFiles.clear();
            pageFiles.clear();
            staticMetadataFiles.clear();
            _shared1.devPageFiles.clear();
            const sortedKnownFiles = [
                ...knownFiles.keys()
            ].sort((0, _sortbypageexts.sortByPageExts)(nextConfig.pageExtensions));
            let proxyFilePath;
            let middlewareFilePath;
            for (const fileName of sortedKnownFiles){
                if (!files.includes(fileName) && !directories.some((d)=>fileName.startsWith(d))) {
                    continue;
                }
                const { name: fileBaseName, dir: fileDir } = _path.default.parse(fileName);
                const isAtConventionLevel = fileDir === dir || fileDir === _path.default.join(dir, 'src');
                if (isAtConventionLevel && fileBaseName === _constants1.MIDDLEWARE_FILENAME) {
                    middlewareFilePath = fileName;
                }
                if (isAtConventionLevel && fileBaseName === _constants1.PROXY_FILENAME) {
                    proxyFilePath = fileName;
                }
                if (middlewareFilePath) {
                    if (proxyFilePath) {
                        const cwd = process.cwd();
                        throw Object.defineProperty(new Error(`Both ${_constants1.MIDDLEWARE_FILENAME} file "./${_path.default.relative(cwd, middlewareFilePath)}" and ${_constants1.PROXY_FILENAME} file "./${_path.default.relative(cwd, proxyFilePath)}" are detected. Please use "./${_path.default.relative(cwd, proxyFilePath)}" only. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy`), "__NEXT_ERROR_CODE", {
                            value: "E900",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    _log.warnOnce(`The "${_constants1.MIDDLEWARE_FILENAME}" file convention is deprecated. Please use "${_constants1.PROXY_FILENAME}" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy`);
                }
                const meta = knownFiles.get(fileName);
                const watchTime = fileWatchTimes.get(fileName);
                const nextWatchTime = meta == null ? void 0 : meta.timestamp;
                // If the file is showing up for the first time or the meta.timestamp is changed since last time
                // Files that were created before we started watching are not considered changed.
                // If any file was created by Next.js while booting, we assume those changes
                // are handled in the bootstrap phase.
                // Files that existed before we booted should be handled during bootstrapping.
                const fileChanged = watchTime === undefined && (nextWatchTime === undefined || nextWatchTime >= initialWatchTime) || watchTime && watchTime !== nextWatchTime;
                fileWatchTimes.set(fileName, nextWatchTime);
                if (envFiles.includes(fileName)) {
                    if (fileChanged) {
                        envChange = true;
                    }
                    continue;
                }
                if (tsconfigPaths.includes(fileName)) {
                    if (fileName.endsWith('tsconfig.json')) {
                        enabledTypeScript = true;
                    }
                    if (fileChanged) {
                        tsconfigChange = true;
                    }
                    continue;
                }
                if ((meta == null ? void 0 : meta.accuracy) === undefined || !validFileMatcher.isPageFile(fileName)) {
                    continue;
                }
                const isAppPath = Boolean(appDir && (0, _normalizepathsep.normalizePathSep)(fileName).startsWith((0, _normalizepathsep.normalizePathSep)(appDir) + '/'));
                const isPagePath = Boolean(pagesDir && (0, _normalizepathsep.normalizePathSep)(fileName).startsWith((0, _normalizepathsep.normalizePathSep)(pagesDir) + '/'));
                const rootFile = (0, _absolutepathtopage.absolutePathToPage)(fileName, {
                    dir: dir,
                    extensions: nextConfig.pageExtensions,
                    keepIndex: false,
                    pagesType: _pagetypes.PAGE_TYPES.ROOT
                });
                if ((0, _utils1.isMiddlewareFile)(rootFile)) {
                    var _staticInfo_middleware;
                    const getStaticInfoIncludingLayouts = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/get-static-info-including-layouts.js [app-ssr] (ecmascript)").getStaticInfoIncludingLayouts;
                    const staticInfo = await getStaticInfoIncludingLayouts({
                        pageFilePath: fileName,
                        config: nextConfig,
                        appDir: appDir,
                        page: rootFile,
                        isDev: true,
                        isInsideAppDir: isAppPath,
                        pageExtensions: nextConfig.pageExtensions
                    });
                    if (nextConfig.output === 'export') {
                        _log.error('Middleware cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export');
                        continue;
                    }
                    serverFields.actualMiddlewareFile = rootFile;
                    await propagateServerField(opts, 'actualMiddlewareFile', serverFields.actualMiddlewareFile);
                    middlewareMatchers = ((_staticInfo_middleware = staticInfo.middleware) == null ? void 0 : _staticInfo_middleware.matchers) || [
                        {
                            regexp: '^/.*$',
                            originalSource: '/:path*'
                        }
                    ];
                    continue;
                }
                if ((0, _utils1.isInstrumentationHookFile)(rootFile)) {
                    serverFields.actualInstrumentationHookFile = rootFile;
                    await propagateServerField(opts, 'actualInstrumentationHookFile', serverFields.actualInstrumentationHookFile);
                    continue;
                }
                if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
                    enabledTypeScript = true;
                }
                if (!(isAppPath || isPagePath)) {
                    continue;
                }
                // Collect all current filenames for the TS plugin to use
                _shared1.devPageFiles.add(fileName);
                let pageName = (0, _absolutepathtopage.absolutePathToPage)(fileName, {
                    dir: isAppPath ? appDir : pagesDir,
                    extensions: nextConfig.pageExtensions,
                    keepIndex: isAppPath,
                    pagesType: isAppPath ? _pagetypes.PAGE_TYPES.APP : _pagetypes.PAGE_TYPES.PAGES
                });
                if (isAppPath && appDir && (0, _ismetadataroute.isMetadataRouteFile)(fileName.replace(appDir, ''), nextConfig.pageExtensions, true)) {
                    const getPageStaticInfo = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/analysis/get-page-static-info.js [app-ssr] (ecmascript)").getPageStaticInfo;
                    const staticInfo = await getPageStaticInfo({
                        pageFilePath: fileName,
                        nextConfig: {},
                        page: pageName,
                        isDev: true,
                        pageType: _pagetypes.PAGE_TYPES.APP
                    });
                    pageName = (0, _getmetadataroute.normalizeMetadataPageToRoute)(pageName, !!(staticInfo.generateSitemaps || staticInfo.generateImageMetadata));
                }
                if (!isAppPath && pageName.startsWith('/api/') && nextConfig.output === 'export') {
                    _log.error('API Routes cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export');
                    continue;
                }
                if (isAppPath) {
                    const isRootNotFound = validFileMatcher.isRootNotFound(fileName);
                    hasRootAppNotFound = true;
                    if (isRootNotFound) {
                        continue;
                    }
                    // Ignore files/directories starting with `_` in the app directory
                    if ((0, _normalizepathsep.normalizePathSep)(pageName).includes('/_')) {
                        continue;
                    }
                    // Record parallel route slots for layout typing
                    // May run multiple times (e.g. if a parallel route
                    // has both a layout and a page, and children) but that's fine
                    const segments = (0, _normalizepathsep.normalizePathSep)(pageName).split('/');
                    for(let i = segments.length - 1; i >= 0; i--){
                        const segment = segments[i];
                        if ((0, _segment.isParallelRouteSegment)(segment)) {
                            const parentPath = (0, _apppaths.normalizeAppPath)(segments.slice(0, i).join('/'));
                            const slotName = segment.slice(1);
                            // check if the slot already exists
                            if (slots.some((s)=>s.name === slotName && s.parent === parentPath)) continue;
                            slots.push({
                                name: slotName,
                                parent: parentPath
                            });
                            break;
                        }
                    }
                    // Record layouts
                    if (validFileMatcher.isAppLayoutPage(fileName)) {
                        layoutRoutes.push({
                            route: (0, _ensureleadingslash.ensureLeadingSlash)((0, _apppaths.normalizeAppPath)((0, _normalizepathsep.normalizePathSep)(pageName)).replace(/\/layout$/, '')),
                            filePath: fileName
                        });
                    }
                    if (!validFileMatcher.isAppRouterPage(fileName)) {
                        continue;
                    }
                    const originalPageName = pageName;
                    pageName = (0, _apppaths.normalizeAppPath)(pageName).replace(/%5F/g, '_');
                    if (!appPaths[pageName]) {
                        appPaths[pageName] = [];
                    }
                    appPaths[pageName].push(opts.turbo ? originalPageName.replace(/%5F/g, '_') : originalPageName);
                    if (useFileSystemPublicRoutes) {
                        // Static metadata files will be served from filesystem.
                        if (appDir && (0, _ismetadataroute.isStaticMetadataFile)(fileName.replace(appDir, ''))) {
                            staticMetadataFiles.set(pageName, fileName);
                        } else {
                            appFiles.add(pageName);
                        }
                    }
                    if (validFileMatcher.isAppRouterRoute(fileName)) {
                        appRouteHandlers.push({
                            route: (0, _normalizepathsep.normalizePathSep)(pageName),
                            filePath: fileName
                        });
                    } else {
                        appRoutes.push({
                            route: (0, _normalizepathsep.normalizePathSep)(pageName),
                            filePath: fileName
                        });
                    }
                    if (routedPages.includes(pageName)) {
                        continue;
                    }
                } else {
                    if (useFileSystemPublicRoutes) {
                        pageFiles.add(pageName);
                        // always add to nextDataRoutes for now but in future only add
                        // entries that actually use getStaticProps/getServerSideProps
                        opts.fsChecker.nextDataRoutes.add(pageName);
                    }
                    if (pageName.startsWith('/api/')) {
                        pageApiRoutes.push({
                            route: (0, _normalizepathsep.normalizePathSep)(pageName),
                            filePath: fileName
                        });
                    } else {
                        pageRoutes.push({
                            route: (0, _normalizepathsep.normalizePathSep)(pageName),
                            filePath: fileName
                        });
                    }
                }
                // Record pages
                if (isAppPath) {
                    appPageFilePaths.set(pageName, fileName);
                } else {
                    pagesPageFilePaths.set(pageName, fileName);
                }
                if (appDir && pageNameSet.has(pageName)) {
                    conflictingAppPagePaths.add(pageName);
                } else {
                    pageNameSet.add(pageName);
                }
                /**
         * If there is a middleware that is not declared in the root we will
         * warn without adding it so it doesn't make its way into the system.
         */ if (/[\\\\/]_middleware$/.test(pageName)) {
                    nestedMiddleware.push(pageName);
                    continue;
                }
                routedPages.push(pageName);
            }
            const numConflicting = conflictingAppPagePaths.size;
            conflictingPageChange = numConflicting - previousConflictingPagePaths.size;
            if (conflictingPageChange !== 0) {
                if (numConflicting > 0) {
                    let errorMessage = `Conflicting app and page file${numConflicting === 1 ? ' was' : 's were'} found, please remove the conflicting files to continue:\n`;
                    for (const p of conflictingAppPagePaths){
                        const appPath = _path.default.relative(dir, appPageFilePaths.get(p));
                        const pagesPath = _path.default.relative(dir, pagesPageFilePaths.get(p));
                        errorMessage += `  "${pagesPath}" - "${appPath}"\n`;
                    }
                    hotReloader.setHmrServerError(Object.defineProperty(new Error(errorMessage), "__NEXT_ERROR_CODE", {
                        value: "E394",
                        enumerable: false,
                        configurable: true
                    }));
                } else if (numConflicting === 0) {
                    hotReloader.clearHmrServerError();
                    await propagateServerField(opts, 'reloadMatchers', undefined);
                }
            }
            previousConflictingPagePaths = conflictingAppPagePaths;
            let clientRouterFilters;
            if (nextConfig.experimental.clientRouterFilter) {
                clientRouterFilters = (0, _createclientrouterfilter.createClientRouterFilter)(Object.keys(appPaths), nextConfig.experimental.clientRouterFilterRedirects ? (nextConfig._originalRedirects || []).filter((r)=>!r.internal) : [], nextConfig.experimental.clientRouterFilterAllowedRate);
                if (!previousClientRouterFilters || JSON.stringify(previousClientRouterFilters) !== JSON.stringify(clientRouterFilters)) {
                    envChange = true;
                    previousClientRouterFilters = clientRouterFilters;
                }
            }
            if (envChange || tsconfigChange) {
                if (envChange) {
                    writeEnvDefinitions = true;
                    await propagateServerField(opts, 'loadEnvConfig', [
                        {
                            dev: true,
                            forceReload: true
                        }
                    ]);
                }
                if (hotReloader.turbopackProject) {
                    var _opts_nextConfig_turbopack;
                    const hasRewrites = opts.fsChecker.rewrites.afterFiles.length > 0 || opts.fsChecker.rewrites.beforeFiles.length > 0 || opts.fsChecker.rewrites.fallback.length > 0;
                    const rootPath = ((_opts_nextConfig_turbopack = opts.nextConfig.turbopack) == null ? void 0 : _opts_nextConfig_turbopack.root) || opts.nextConfig.outputFileTracingRoot || opts.dir;
                    await hotReloader.turbopackProject.update({
                        defineEnv: (0, _swc.createDefineEnv)({
                            isTurbopack: true,
                            clientRouterFilters,
                            config: nextConfig,
                            dev: true,
                            distDir,
                            fetchCacheKeyPrefix: opts.nextConfig.experimental.fetchCacheKeyPrefix,
                            hasRewrites,
                            // TODO: Implement
                            middlewareMatchers: undefined,
                            projectPath: opts.dir,
                            rewrites: opts.fsChecker.rewrites
                        }),
                        rootPath,
                        projectPath: (0, _normalizepath.normalizePath)(_path.default.relative(rootPath, dir))
                    });
                } else {
                    var _hotReloader_activeWebpackConfigs;
                    let tsconfigResult;
                    // This is not relevant for Turbopack because tsconfig/jsconfig is handled internally.
                    if (tsconfigChange) {
                        try {
                            const loadJsConfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/load-jsconfig.js [app-ssr] (ecmascript)").default;
                            tsconfigResult = await loadJsConfig(dir, nextConfig);
                        } catch (_) {
                        /* do we want to log if there are syntax errors in tsconfig while editing? */ }
                    }
                    (_hotReloader_activeWebpackConfigs = hotReloader.activeWebpackConfigs) == null ? void 0 : _hotReloader_activeWebpackConfigs.forEach((config, idx)=>{
                        const isClient = idx === 0;
                        const isNodeServer = idx === 1;
                        const isEdgeServer = idx === 2;
                        const hasRewrites = opts.fsChecker.rewrites.afterFiles.length > 0 || opts.fsChecker.rewrites.beforeFiles.length > 0 || opts.fsChecker.rewrites.fallback.length > 0;
                        if (tsconfigChange) {
                            var _config_resolve_plugins, _config_resolve;
                            (_config_resolve = config.resolve) == null ? void 0 : (_config_resolve_plugins = _config_resolve.plugins) == null ? void 0 : _config_resolve_plugins.forEach((plugin)=>{
                                // look for the JsConfigPathsPlugin and update with
                                // the latest paths/baseUrl config
                                if (plugin instanceof _jsconfigpathsplugin.JsConfigPathsPlugin && tsconfigResult) {
                                    var _config_resolve_modules, _config_resolve, _jsConfig_compilerOptions;
                                    const { resolvedBaseUrl, jsConfig } = tsconfigResult;
                                    const currentResolvedBaseUrl = plugin.resolvedBaseUrl;
                                    const resolvedUrlIndex = (_config_resolve = config.resolve) == null ? void 0 : (_config_resolve_modules = _config_resolve.modules) == null ? void 0 : _config_resolve_modules.findIndex((item)=>item === (currentResolvedBaseUrl == null ? void 0 : currentResolvedBaseUrl.baseUrl));
                                    if (resolvedBaseUrl) {
                                        if (resolvedBaseUrl.baseUrl !== (currentResolvedBaseUrl == null ? void 0 : currentResolvedBaseUrl.baseUrl)) {
                                            // remove old baseUrl and add new one
                                            if (resolvedUrlIndex && resolvedUrlIndex > -1) {
                                                var _config_resolve_modules1, _config_resolve1;
                                                (_config_resolve1 = config.resolve) == null ? void 0 : (_config_resolve_modules1 = _config_resolve1.modules) == null ? void 0 : _config_resolve_modules1.splice(resolvedUrlIndex, 1);
                                            }
                                            // If the resolvedBaseUrl is implicit we only remove the previous value.
                                            // Only add the baseUrl if it's explicitly set in tsconfig/jsconfig
                                            if (!resolvedBaseUrl.isImplicit) {
                                                var _config_resolve_modules2, _config_resolve2;
                                                (_config_resolve2 = config.resolve) == null ? void 0 : (_config_resolve_modules2 = _config_resolve2.modules) == null ? void 0 : _config_resolve_modules2.push(resolvedBaseUrl.baseUrl);
                                            }
                                        }
                                    }
                                    if ((jsConfig == null ? void 0 : (_jsConfig_compilerOptions = jsConfig.compilerOptions) == null ? void 0 : _jsConfig_compilerOptions.paths) && resolvedBaseUrl) {
                                        Object.keys(plugin.paths).forEach((key)=>{
                                            delete plugin.paths[key];
                                        });
                                        Object.assign(plugin.paths, jsConfig.compilerOptions.paths);
                                        plugin.resolvedBaseUrl = resolvedBaseUrl;
                                    }
                                }
                            });
                        }
                        if (envChange) {
                            var _config_plugins;
                            (_config_plugins = config.plugins) == null ? void 0 : _config_plugins.forEach((plugin)=>{
                                // we look for the DefinePlugin definitions so we can
                                // update them on the active compilers
                                if (plugin && typeof plugin.definitions === 'object' && plugin.definitions.__NEXT_DEFINE_ENV) {
                                    const newDefine = (0, _defineenv.getDefineEnv)({
                                        isTurbopack: false,
                                        clientRouterFilters,
                                        config: nextConfig,
                                        dev: true,
                                        distDir,
                                        fetchCacheKeyPrefix: opts.nextConfig.experimental.fetchCacheKeyPrefix,
                                        hasRewrites,
                                        isClient,
                                        isEdgeServer,
                                        isNodeServer,
                                        middlewareMatchers: undefined,
                                        projectPath: opts.dir,
                                        rewrites: opts.fsChecker.rewrites
                                    });
                                    Object.keys(plugin.definitions).forEach((key)=>{
                                        if (!(key in newDefine)) {
                                            delete plugin.definitions[key];
                                        }
                                    });
                                    Object.assign(plugin.definitions, newDefine);
                                }
                            });
                        }
                    });
                }
                await hotReloader.invalidate({
                    reloadAfterInvalidation: envChange
                });
            }
            if (nestedMiddleware.length > 0) {
                _log.error(Object.defineProperty(new _utils1.NestedMiddlewareError(nestedMiddleware, dir, pagesDir || appDir), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                }).message);
                nestedMiddleware = [];
            }
            // Make sure to sort parallel routes to make the result deterministic.
            serverFields.appPathRoutes = Object.fromEntries(Object.entries(appPaths).map(([k, v])=>[
                    k,
                    v.sort()
                ]));
            await propagateServerField(opts, 'appPathRoutes', serverFields.appPathRoutes);
            // TODO: pass this to fsChecker/next-dev-server?
            serverFields.middleware = middlewareMatchers ? {
                match: null,
                page: '/',
                matchers: middlewareMatchers
            } : undefined;
            await propagateServerField(opts, 'middleware', serverFields.middleware);
            serverFields.hasAppNotFound = hasRootAppNotFound;
            opts.fsChecker.middlewareMatcher = ((_serverFields_middleware = serverFields.middleware) == null ? void 0 : _serverFields_middleware.matchers) ? (0, _middlewareroutematcher.getMiddlewareRouteMatcher)((_serverFields_middleware1 = serverFields.middleware) == null ? void 0 : _serverFields_middleware1.matchers) : undefined;
            const interceptionRoutes = (0, _generateinterceptionroutesrewrites.generateInterceptionRoutesRewrites)(Object.keys(appPaths), opts.nextConfig.basePath).map((item)=>(0, _filesystem.buildCustomRoute)('before_files_rewrite', item, opts.nextConfig.basePath, opts.nextConfig.experimental.caseSensitiveRoutes));
            opts.fsChecker.rewrites.beforeFiles.push(...interceptionRoutes);
            const exportPathMap = typeof nextConfig.exportPathMap === 'function' && await (nextConfig.exportPathMap == null ? void 0 : nextConfig.exportPathMap.call(nextConfig, {}, {
                dev: true,
                dir: opts.dir,
                outDir: null,
                distDir: distDir,
                buildId: 'development'
            })) || {};
            const exportPathMapEntries = Object.entries(exportPathMap || {});
            if (exportPathMapEntries.length > 0) {
                opts.fsChecker.exportPathMapRoutes = exportPathMapEntries.map(([key, value])=>(0, _filesystem.buildCustomRoute)('before_files_rewrite', {
                        source: key,
                        destination: `${value.page}${value.query ? '?' : ''}${_querystring.default.stringify(value.query)}`
                    }, opts.nextConfig.basePath, opts.nextConfig.experimental.caseSensitiveRoutes));
            }
            try {
                // we serve a separate manifest with all pages for the client in
                // dev mode so that we can match a page after a rewrite on the client
                // before it has been built and is populated in the _buildManifest
                const sortedRoutes = (0, _utils.getSortedRoutes)(routedPages);
                opts.fsChecker.dynamicRoutes = sortedRoutes.map((page)=>{
                    const regex = (0, _routeregex.getNamedRouteRegex)(page, {
                        prefixRouteKeys: true
                    });
                    return {
                        regex: regex.re.toString(),
                        namedRegex: regex.namedRegex,
                        routeKeys: regex.routeKeys,
                        match: (0, _routematcher.getRouteMatcher)(regex),
                        page
                    };
                });
                const dataRoutes = [];
                for (const page of sortedRoutes){
                    const route = (0, _builddataroute.buildDataRoute)(page, 'development');
                    const routeRegex = (0, _routeregex.getNamedRouteRegex)(route.page, {
                        prefixRouteKeys: true
                    });
                    dataRoutes.push({
                        ...route,
                        regex: routeRegex.re.toString(),
                        namedRegex: routeRegex.namedRegex,
                        routeKeys: routeRegex.routeKeys,
                        match: (0, _routematcher.getRouteMatcher)({
                            // TODO: fix this in the manifest itself, must also be fixed in
                            // upstream builder that relies on this
                            re: opts.nextConfig.i18n ? new RegExp(route.dataRouteRegex.replace(`/development/`, `/development/(?<nextLocale>[^/]+?)/`)) : new RegExp(route.dataRouteRegex),
                            groups: routeRegex.groups
                        })
                    });
                }
                opts.fsChecker.dynamicRoutes.unshift(...dataRoutes);
                // For Turbopack ADDED_PAGE and REMOVED_PAGE are implemented in hot-reloader-turbopack.ts
                // in order to avoid a race condition where ADDED_PAGE and REMOVED_PAGE are sent before Turbopack picked up the file change.
                if (!opts.turbo) {
                    // Reload the matchers. The filesystem would have been written to,
                    // and the matchers need to re-scan it to update the router.
                    // Reloading the matchers should happen before `ADDED_PAGE` or `REMOVED_PAGE` is sent over the websocket
                    // otherwise it sends the event too early.
                    await propagateServerField(opts, 'reloadMatchers', undefined);
                    if (!(prevSortedRoutes == null ? void 0 : prevSortedRoutes.every((val, idx)=>val === sortedRoutes[idx]))) {
                        const addedRoutes = sortedRoutes.filter((route)=>!prevSortedRoutes.includes(route));
                        const removedRoutes = prevSortedRoutes.filter((route)=>!sortedRoutes.includes(route));
                        // emit the change so clients fetch the update
                        hotReloader.send({
                            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEV_PAGES_MANIFEST_UPDATE,
                            data: [
                                {
                                    devPagesManifest: true
                                }
                            ]
                        });
                        addedRoutes.forEach((route)=>{
                            hotReloader.send({
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ADDED_PAGE,
                                data: [
                                    route
                                ]
                            });
                        });
                        removedRoutes.forEach((route)=>{
                            hotReloader.send({
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REMOVED_PAGE,
                                data: [
                                    route
                                ]
                            });
                        });
                    }
                }
                prevSortedRoutes = sortedRoutes;
                if (enabledTypeScript) {
                    var _nextConfig_experimental;
                    // Using === false to make the check clearer.
                    if (typescriptStatusFromLastAggregation === false) {
                        // we tolerate the error here as this is best effort
                        // and the manual install command will be shown
                        await verifyTypeScript(opts).then(()=>{
                            tsconfigChange = true;
                        }).catch(()=>{});
                    }
                    if (writeEnvDefinitions && ((_nextConfig_experimental = nextConfig.experimental) == null ? void 0 : _nextConfig_experimental.typedEnv)) {
                        // TODO: The call to propagateServerField 'loadEnvConfig' causes the env to be loaded twice on env file changes.
                        const loadEnvConfig = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@next/env/dist/index.js [app-ssr] (ecmascript)").loadEnvConfig;
                        const { loadedEnvFiles } = loadEnvConfig(dir, ("TURBOPACK compile-time value", "development") === 'development', undefined, true);
                        const createEnvDefinitions = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/experimental/create-env-definitions.js [app-ssr] (ecmascript)").createEnvDefinitions;
                        await createEnvDefinitions({
                            distDir,
                            loadedEnvFiles: [
                                ...loadedEnvFiles,
                                {
                                    path: nextConfig.configFileName,
                                    env: nextConfig.env,
                                    contents: ''
                                }
                            ]
                        });
                    }
                    const routeTypesManifest = await (0, _routetypesutils.createRouteTypesManifest)({
                        dir,
                        pageRoutes,
                        appRoutes,
                        layoutRoutes,
                        slots,
                        redirects: opts.nextConfig.redirects,
                        rewrites: opts.nextConfig.rewrites,
                        // Ensure relative paths in validator.ts are computed from validatorFilePath,
                        // matching behavior of build and CLI typegen.
                        validatorFilePath,
                        appRouteHandlers,
                        pageApiRoutes
                    });
                    await (0, _routetypesutils.writeRouteTypesManifest)(routeTypesManifest, routeTypesFilePath, opts.nextConfig);
                    await (0, _routetypesutils.writeValidatorFile)(routeTypesManifest, validatorFilePath);
                    // Generate cache-life types if cacheLife config exists
                    const cacheLifeFilePath = _path.default.join(distTypesDir, 'cache-life.d.ts');
                    (0, _cachelifetypeutils.writeCacheLifeTypes)(opts.nextConfig.cacheLife, cacheLifeFilePath);
                }
                if (!resolved) {
                    resolve();
                    resolved = true;
                }
            } catch (e) {
                if (!resolved) {
                    reject(e);
                    resolved = true;
                } else {
                    _log.warn('Failed to reload dynamic routes:', e);
                }
            }
        });
        wp.watch({
            directories: [
                dir
            ],
            startTime: 0
        });
    });
    const clientPagesManifestPath = `/_next/${_constants.CLIENT_STATIC_FILES_PATH}/development/${_constants.DEV_CLIENT_PAGES_MANIFEST}`;
    opts.fsChecker.devVirtualFsItems.add(clientPagesManifestPath);
    const devMiddlewareManifestPath = `/_next/${_constants.CLIENT_STATIC_FILES_PATH}/development/${_constants.DEV_CLIENT_MIDDLEWARE_MANIFEST}`;
    opts.fsChecker.devVirtualFsItems.add(devMiddlewareManifestPath);
    const devTurbopackMiddlewareManifestPath = `/_next/${_constants.CLIENT_STATIC_FILES_PATH}/development/${_constants.TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST}`;
    opts.fsChecker.devVirtualFsItems.add(devTurbopackMiddlewareManifestPath);
    async function requestHandler(req, res) {
        var _parsedUrl_pathname, _parsedUrl_pathname1, _parsedUrl_pathname2;
        const parsedUrl = _url.default.parse(req.url || '/');
        if ((_parsedUrl_pathname = parsedUrl.pathname) == null ? void 0 : _parsedUrl_pathname.includes(clientPagesManifestPath)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', _constants1.JSON_CONTENT_TYPE_HEADER);
            res.end(JSON.stringify({
                pages: prevSortedRoutes.filter((route)=>!opts.fsChecker.appFiles.has(route))
            }));
            return {
                finished: true
            };
        }
        if (((_parsedUrl_pathname1 = parsedUrl.pathname) == null ? void 0 : _parsedUrl_pathname1.includes(devMiddlewareManifestPath)) || ((_parsedUrl_pathname2 = parsedUrl.pathname) == null ? void 0 : _parsedUrl_pathname2.includes(devTurbopackMiddlewareManifestPath))) {
            var _serverFields_middleware;
            res.statusCode = 200;
            res.setHeader('Content-Type', _constants1.JSON_CONTENT_TYPE_HEADER);
            res.end(JSON.stringify(((_serverFields_middleware = serverFields.middleware) == null ? void 0 : _serverFields_middleware.matchers) || []));
            return {
                finished: true
            };
        }
        return {
            finished: false
        };
    }
    function logErrorWithOriginalStack(err, type) {
        if (err instanceof Error) {
            err.message = (0, _magicidentifier.deobfuscateText)(err.message);
        }
        if (err instanceof _utils2.ModuleBuildError) {
            // Errors that may come from issues from the user's code
            _log.error(err.message);
        } else if (err instanceof _internalerror.TurbopackInternalError) {
        // An internal Turbopack error that has been handled by next-swc, written
        // to disk and a simplified message shown to user on the Rust side.
        } else if (type === 'warning') {
            _log.warn(err);
        } else if (type === 'app-dir') {
            _log.error(err);
        } else if (type) {
            _log.error(`${type}:`, err);
        } else {
            _log.error(err);
        }
    }
    return {
        serverFields,
        hotReloader,
        requestHandler,
        logErrorWithOriginalStack,
        async ensureMiddleware (requestUrl) {
            if (!serverFields.actualMiddlewareFile) return;
            return hotReloader.ensurePage({
                page: serverFields.actualMiddlewareFile,
                clientOnly: false,
                definition: undefined,
                url: requestUrl
            });
        }
    };
}
async function setupDevBundler(opts) {
    var _opts_nextConfig_experimental;
    const isSrcDir = _path.default.relative(opts.dir, opts.pagesDir || opts.appDir || '').startsWith('src');
    await (0, _installbindings.installBindings)((_opts_nextConfig_experimental = opts.nextConfig.experimental) == null ? void 0 : _opts_nextConfig_experimental.useWasmBinary);
    const result = await startWatcher({
        ...opts,
        isSrcDir
    });
    opts.telemetry.record((0, _events.eventCliSession)(opts.nextConfig, {
        webpackVersion: 5,
        isSrcDir,
        turboFlag: !!opts.turbo,
        cliCommand: 'dev',
        appDir: !!opts.appDir,
        pagesDir: !!opts.pagesDir,
        isCustomServer: !!opts.isCustomServer,
        hasNowJson: !!await (0, _findup.default)('now.json', {
            cwd: opts.dir
        })
    }));
    // Track build features for dev server here:
    opts.telemetry.record({
        eventName: _events.EVENT_BUILD_FEATURE_USAGE,
        payload: {
            featureName: 'turbopackFileSystemCache',
            invocationCount: (0, _utils2.isFileSystemCacheEnabledForDev)(opts.nextConfig) ? 1 : 0
        }
    });
    return result;
} // Returns a trace rewritten through Turbopack's sourcemaps
 //# sourceMappingURL=setup-dev-bundler.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-server.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// this must come first as it includes require hooks
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "initialize", {
    enumerable: true,
    get: function() {
        return initialize;
    }
});
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/node-environment.js [app-ssr] (ecmascript)");
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/require-hook.js [app-ssr] (ecmascript)");
const _url = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/url [external] (url, cjs)"));
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/path [external] (path, cjs)"));
const _config = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/config.js [app-ssr] (ecmascript)"));
const _servestatic = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/serve-static.js [app-ssr] (ecmascript)");
const _debug = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/debug/index.js [app-ssr] (ecmascript)"));
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-ssr] (ecmascript)"));
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/utils.js [app-ssr] (ecmascript)");
const _findpagesdir = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/find-pages-dir.js [app-ssr] (ecmascript)");
const _filesystem = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/filesystem.js [app-ssr] (ecmascript)");
const _proxyrequest = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/proxy-request.js [app-ssr] (ecmascript)");
const _pipereadable = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/pipe-readable.js [app-ssr] (ecmascript)");
const _resolveroutes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/resolve-routes.js [app-ssr] (ecmascript)");
const _requestmeta = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/request-meta.js [app-ssr] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-ssr] (ecmascript)");
const _removepathprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [app-ssr] (ecmascript)");
const _compression = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/compression/index.js [app-ssr] (ecmascript)"));
const _nextrequest = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/web/spec-extension/adapters/next-request.js [app-ssr] (ecmascript)");
const _ispostpone = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)");
const _parseurl = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/parse-url.js [app-ssr] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-ssr] (ecmascript)");
const _redirectstatuscode = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)");
const _devbundlerservice = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/dev-bundler-service.js [app-ssr] (ecmascript)");
const _trace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/index.js [app-ssr] (ecmascript)");
const _ensureleadingslash = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js [app-ssr] (ecmascript)");
const _getnextpathnameinfo = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [app-ssr] (ecmascript)");
const _gethostname = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/get-hostname.js [app-ssr] (ecmascript)");
const _detectdomainlocale = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js [app-ssr] (ecmascript)");
const _mockrequest = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/mock-request.js [app-ssr] (ecmascript)");
const _hotreloadertypes = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/dev/hot-reloader-types.js [app-ssr] (ecmascript)");
const _normalizedassetprefix = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/normalized-asset-prefix.js [app-ssr] (ecmascript)");
const _patchfetch = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/patch-fetch.js [app-ssr] (ecmascript)");
const _utils1 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/server-ipc/utils.js [app-ssr] (ecmascript)");
const _blockcrosssite = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/block-cross-site.js [app-ssr] (ecmascript)");
const _shared = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-ssr] (ecmascript)");
const _nofallbackerrorexternal = __turbopack_context__.r("[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)");
const _routerservercontext = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/router-server-context.js [app-ssr] (ecmascript)");
const _chromedevtoolsworkspace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/chrome-devtools-workspace.js [app-ssr] (ecmascript)");
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
const debug = (0, _debug.default)('next:router-server:main');
const isNextFont = (pathname)=>pathname && /\/media\/[^/]+\.(woff|woff2|eot|ttf|otf)$/.test(pathname);
const requestHandlers = {};
async function initialize(opts) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const config = await (0, _config.default)(opts.dev ? _constants.PHASE_DEVELOPMENT_SERVER : _constants.PHASE_PRODUCTION_SERVER, opts.dir, {
        silent: false
    });
    let compress;
    if ((config == null ? void 0 : config.compress) !== false) {
        compress = (0, _compression.default)();
    }
    const fsChecker = await (0, _filesystem.setupFsCheck)({
        dev: opts.dev,
        dir: opts.dir,
        config,
        minimalMode: opts.minimalMode
    });
    const renderServer = {};
    let developmentBundler;
    let devBundlerService;
    let originalFetch = globalThis.fetch;
    if (opts.dev) {
        const { Telemetry } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/telemetry/storage.js [app-ssr] (ecmascript)");
        const telemetry = new Telemetry({
            distDir: _path.default.join(opts.dir, config.distDir)
        });
        _shared.traceGlobals.set('telemetry', telemetry);
        const { pagesDir, appDir } = (0, _findpagesdir.findPagesDir)(opts.dir);
        const { setupDevBundler } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js [app-ssr] (ecmascript)");
        const resetFetch = ()=>{
            globalThis.fetch = originalFetch;
            globalThis[_patchfetch.NEXT_PATCH_SYMBOL] = false;
        };
        const setupDevBundlerSpan = opts.startServerSpan ? opts.startServerSpan.traceChild('setup-dev-bundler') : (0, _trace.trace)('setup-dev-bundler');
        developmentBundler = await setupDevBundlerSpan.traceAsyncFn(()=>setupDevBundler({
                // Passed here but the initialization of this object happens below, doing the initialization before the setupDev call breaks.
                renderServer,
                appDir,
                pagesDir,
                telemetry,
                fsChecker,
                dir: opts.dir,
                nextConfig: config,
                isCustomServer: opts.customServer,
                turbo: !!("TURBOPACK compile-time value", true),
                port: opts.port,
                onDevServerCleanup: opts.onDevServerCleanup,
                resetFetch
            }));
        devBundlerService = new _devbundlerservice.DevBundlerService(developmentBundler, // reference to it.
        (req, res)=>{
            return requestHandlers[opts.dir](req, res);
        });
    }
    renderServer.instance = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/render-server.js [app-ssr] (ecmascript)");
    const requestHandlerImpl = async (req, res)=>{
        (0, _requestmeta.addRequestMeta)(req, 'relativeProjectDir', relativeProjectDir);
        // internal headers should not be honored by the request handler
        if (!process.env.NEXT_PRIVATE_TEST_HEADERS) {
            (0, _utils1.filterInternalHeaders)(req.headers);
        }
        if (!opts.minimalMode && config.i18n && config.i18n.localeDetection !== false) {
            var _this;
            const urlParts = (req.url || '').split('?', 1);
            let urlNoQuery = urlParts[0] || '';
            if (config.basePath) {
                urlNoQuery = (0, _removepathprefix.removePathPrefix)(urlNoQuery, config.basePath);
            }
            const pathnameInfo = (0, _getnextpathnameinfo.getNextPathnameInfo)(urlNoQuery, {
                nextConfig: config
            });
            const domainLocale = (0, _detectdomainlocale.detectDomainLocale)(config.i18n.domains, (0, _gethostname.getHostname)({
                hostname: urlNoQuery
            }, req.headers));
            const defaultLocale = (domainLocale == null ? void 0 : domainLocale.defaultLocale) || config.i18n.defaultLocale;
            const { getLocaleRedirect } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/i18n/get-locale-redirect.js [app-ssr] (ecmascript)");
            const parsedUrl = (0, _parseurl.parseUrl)((_this = req.url || '') == null ? void 0 : _this.replace(/^\/+/, '/'));
            const redirect = getLocaleRedirect({
                defaultLocale,
                domainLocale,
                headers: req.headers,
                nextConfig: config,
                pathLocale: pathnameInfo.locale,
                urlParsed: {
                    ...parsedUrl,
                    pathname: pathnameInfo.locale ? `/${pathnameInfo.locale}${urlNoQuery}` : urlNoQuery
                }
            });
            if (redirect) {
                res.setHeader('Location', redirect);
                res.statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect;
                res.end(redirect);
                return;
            }
        }
        if (compress) {
            // @ts-expect-error not express req/res
            compress(req, res, ()=>{});
        }
        req.on('error', (_err)=>{
        // TODO: log socket errors?
        });
        res.on('error', (_err)=>{
        // TODO: log socket errors?
        });
        const invokedOutputs = new Set();
        async function invokeRender(parsedUrl, invokePath, handleIndex, additionalRequestMeta) {
            var _fsChecker_getMiddlewareMatchers;
            // invokeRender expects /api routes to not be locale prefixed
            // so normalize here before continuing
            if (config.i18n && (0, _removepathprefix.removePathPrefix)(invokePath, config.basePath).startsWith(`/${(0, _requestmeta.getRequestMeta)(req, 'locale')}/api`)) {
                invokePath = fsChecker.handleLocale((0, _removepathprefix.removePathPrefix)(invokePath, config.basePath)).pathname;
            }
            if (req.headers['x-nextjs-data'] && ((_fsChecker_getMiddlewareMatchers = fsChecker.getMiddlewareMatchers()) == null ? void 0 : _fsChecker_getMiddlewareMatchers.length) && (0, _removepathprefix.removePathPrefix)(invokePath, config.basePath) === '/404') {
                res.setHeader('x-nextjs-matched-path', parsedUrl.pathname || '');
                res.statusCode = 404;
                res.setHeader('content-type', 'application/json');
                res.end('{}');
                return null;
            }
            if (!handlers) {
                throw Object.defineProperty(new Error('Failed to initialize render server'), "__NEXT_ERROR_CODE", {
                    value: "E90",
                    enumerable: false,
                    configurable: true
                });
            }
            (0, _requestmeta.addRequestMeta)(req, 'invokePath', invokePath);
            (0, _requestmeta.addRequestMeta)(req, 'invokeQuery', parsedUrl.query);
            (0, _requestmeta.addRequestMeta)(req, 'middlewareInvoke', false);
            for(const key in additionalRequestMeta || {}){
                (0, _requestmeta.addRequestMeta)(req, key, additionalRequestMeta[key]);
            }
            debug('invokeRender', req.url, req.headers);
            try {
                var _renderServer_instance;
                const initResult = await (renderServer == null ? void 0 : (_renderServer_instance = renderServer.instance) == null ? void 0 : _renderServer_instance.initialize(renderServerOpts));
                try {
                    await (initResult == null ? void 0 : initResult.requestHandler(req, res));
                } catch (err) {
                    if (err instanceof _nofallbackerrorexternal.NoFallbackError) {
                        await handleRequest(handleIndex + 1);
                        return;
                    }
                    throw err;
                }
                return;
            } catch (e) {
                // If the client aborts before we can receive a response object (when
                // the headers are flushed), then we can early exit without further
                // processing.
                if ((0, _pipereadable.isAbortError)(e)) {
                    return;
                }
                throw e;
            }
        }
        const handleRequest = async (handleIndex)=>{
            if (handleIndex > 5) {
                throw Object.defineProperty(new Error(`Attempted to handle request too many times ${req.url}`), "__NEXT_ERROR_CODE", {
                    value: "E283",
                    enumerable: false,
                    configurable: true
                });
            }
            // handle hot-reloader first
            if (developmentBundler) {
                if ((0, _blockcrosssite.blockCrossSite)(req, res, config.allowedDevOrigins, opts.hostname)) {
                    return;
                }
                const origUrl = req.url || '/';
                // both the basePath and assetPrefix need to be stripped from the URL
                // so that the development bundler can find the correct file
                if (config.basePath && (0, _pathhasprefix.pathHasPrefix)(origUrl, config.basePath)) {
                    req.url = (0, _removepathprefix.removePathPrefix)(origUrl, config.basePath);
                } else if (config.assetPrefix && (0, _pathhasprefix.pathHasPrefix)(origUrl, config.assetPrefix)) {
                    req.url = (0, _removepathprefix.removePathPrefix)(origUrl, config.assetPrefix);
                }
                const parsedUrl = _url.default.parse(req.url || '/');
                const hotReloaderResult = await developmentBundler.hotReloader.run(req, res, parsedUrl);
                if (hotReloaderResult.finished) {
                    return hotReloaderResult;
                }
                req.url = origUrl;
            }
            const { finished, parsedUrl, statusCode, resHeaders, bodyStream, matchedOutput } = await resolveRoutes({
                req,
                res,
                isUpgradeReq: false,
                signal: (0, _nextrequest.signalFromNodeResponse)(res),
                invokedOutputs
            });
            if (res.closed || res.finished) {
                return;
            }
            if (developmentBundler && (matchedOutput == null ? void 0 : matchedOutput.type) === 'devVirtualFsItem') {
                const origUrl = req.url || '/';
                if (config.basePath && (0, _pathhasprefix.pathHasPrefix)(origUrl, config.basePath)) {
                    req.url = (0, _removepathprefix.removePathPrefix)(origUrl, config.basePath);
                } else if (config.assetPrefix && (0, _pathhasprefix.pathHasPrefix)(origUrl, config.assetPrefix)) {
                    req.url = (0, _removepathprefix.removePathPrefix)(origUrl, config.assetPrefix);
                }
                if (resHeaders) {
                    for (const key of Object.keys(resHeaders)){
                        res.setHeader(key, resHeaders[key]);
                    }
                }
                const result = await developmentBundler.requestHandler(req, res);
                if (result.finished) {
                    return;
                }
                // TODO: throw invariant if we resolved to this but it wasn't handled?
                req.url = origUrl;
            }
            debug('requestHandler!', req.url, {
                matchedOutput,
                statusCode,
                resHeaders,
                bodyStream: !!bodyStream,
                parsedUrl: {
                    pathname: parsedUrl.pathname,
                    query: parsedUrl.query
                },
                finished
            });
            // apply any response headers from routing
            for (const key of Object.keys(resHeaders || {})){
                res.setHeader(key, resHeaders[key]);
            }
            // handle redirect
            if (!bodyStream && statusCode && statusCode > 300 && statusCode < 400) {
                const destination = _url.default.format(parsedUrl);
                res.statusCode = statusCode;
                res.setHeader('location', destination);
                if (statusCode === _redirectstatuscode.RedirectStatusCode.PermanentRedirect) {
                    res.setHeader('Refresh', `0;url=${destination}`);
                }
                return res.end(destination);
            }
            // handle middleware body response
            if (bodyStream) {
                res.statusCode = statusCode || 200;
                return await (0, _pipereadable.pipeToNodeResponse)(bodyStream, res);
            }
            if (finished && parsedUrl.protocol) {
                var _getRequestMeta;
                return await (0, _proxyrequest.proxyRequest)(req, res, parsedUrl, undefined, (_getRequestMeta = (0, _requestmeta.getRequestMeta)(req, 'clonableBody')) == null ? void 0 : _getRequestMeta.cloneBodyStream(), config.experimental.proxyTimeout);
            }
            if ((matchedOutput == null ? void 0 : matchedOutput.fsPath) && matchedOutput.itemPath) {
                if (opts.dev && (fsChecker.appFiles.has(matchedOutput.itemPath) || fsChecker.pageFiles.has(matchedOutput.itemPath))) {
                    res.statusCode = 500;
                    const message = `A conflicting public file and page file was found for path ${matchedOutput.itemPath} https://nextjs.org/docs/messages/conflicting-public-file-page`;
                    await invokeRender(parsedUrl, '/_error', handleIndex, {
                        invokeStatus: 500,
                        invokeError: Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                            value: "E394",
                            enumerable: false,
                            configurable: true
                        })
                    });
                    _log.error(message);
                    return;
                }
                if (!res.getHeader('cache-control') && matchedOutput.type === 'nextStaticFolder') {
                    if (opts.dev && !isNextFont(parsedUrl.pathname)) {
                        res.setHeader('Cache-Control', 'no-store, must-revalidate');
                    } else {
                        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                    }
                }
                if (!(req.method === 'GET' || req.method === 'HEAD')) {
                    res.setHeader('Allow', [
                        'GET',
                        'HEAD'
                    ]);
                    res.statusCode = 405;
                    return await invokeRender(_url.default.parse('/405', true), '/405', handleIndex, {
                        invokeStatus: 405
                    });
                }
                try {
                    return await (0, _servestatic.serveStatic)(req, res, matchedOutput.itemPath, {
                        root: matchedOutput.itemsRoot,
                        // Ensures that etags are not generated for static files when disabled.
                        etag: config.generateEtags
                    });
                } catch (err) {
                    /**
           * Hardcoded every possible error status code that could be thrown by "serveStatic" method
           * This is done by searching "this.error" inside "send" module's source code:
           * https://github.com/pillarjs/send/blob/master/index.js
           * https://github.com/pillarjs/send/blob/develop/index.js
           */ const POSSIBLE_ERROR_CODE_FROM_SERVE_STATIC = new Set([
                        // send module will throw 500 when header is already sent or fs.stat error happens
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L392
                        // Note: we will use Next.js built-in 500 page to handle 500 errors
                        // 500,
                        // send module will throw 404 when file is missing
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L421
                        // Note: we will use Next.js built-in 404 page to handle 404 errors
                        // 404,
                        // send module will throw 403 when redirecting to a directory without enabling directory listing
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L484
                        // Note: Next.js throws a different error (without status code) for directory listing
                        // 403,
                        // send module will throw 400 when fails to normalize the path
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L520
                        400,
                        // send module will throw 412 with conditional GET request
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L632
                        412,
                        // send module will throw 416 when range is not satisfiable
                        // https://github.com/pillarjs/send/blob/53f0ab476145670a9bdd3dc722ab2fdc8d358fc6/index.js#L669
                        416
                    ]);
                    let validErrorStatus = POSSIBLE_ERROR_CODE_FROM_SERVE_STATIC.has(err.statusCode);
                    // normalize non-allowed status codes
                    if (!validErrorStatus) {
                        ;
                        err.statusCode = 400;
                    }
                    if (typeof err.statusCode === 'number') {
                        const invokePath = `/${err.statusCode}`;
                        const invokeStatus = err.statusCode;
                        res.statusCode = err.statusCode;
                        return await invokeRender(_url.default.parse(invokePath, true), invokePath, handleIndex, {
                            invokeStatus
                        });
                    }
                    throw err;
                }
            }
            if (matchedOutput) {
                invokedOutputs.add(matchedOutput.itemPath);
                return await invokeRender(parsedUrl, parsedUrl.pathname || '/', handleIndex, {
                    invokeOutput: matchedOutput.itemPath
                });
            }
            if (opts.dev && (0, _chromedevtoolsworkspace.isChromeDevtoolsWorkspaceUrl)(parsedUrl)) {
                await (0, _chromedevtoolsworkspace.handleChromeDevtoolsWorkspaceRequest)(res, opts, config);
                return;
            }
            // 404 case
            res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            let realRequestPathname = parsedUrl.pathname ?? '';
            if (realRequestPathname) {
                if (config.basePath) {
                    realRequestPathname = (0, _removepathprefix.removePathPrefix)(realRequestPathname, config.basePath);
                }
                if (config.assetPrefix) {
                    realRequestPathname = (0, _removepathprefix.removePathPrefix)(realRequestPathname, config.assetPrefix);
                }
                if (config.i18n) {
                    realRequestPathname = (0, _removepathprefix.removePathPrefix)(realRequestPathname, '/' + ((0, _requestmeta.getRequestMeta)(req, 'locale') ?? ''));
                }
            }
            // For not found static assets, return plain text 404 instead of
            // full HTML 404 pages to save bandwidth.
            if (realRequestPathname.startsWith('/_next/static/')) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('Not Found');
                return null;
            }
            // Short-circuit favicon.ico serving so that the 404 page doesn't get built as favicon is requested by the browser when loading any route.
            if (opts.dev && !matchedOutput && parsedUrl.pathname === '/favicon.ico') {
                res.statusCode = 404;
                res.end('');
                return null;
            }
            const appNotFound = opts.dev ? developmentBundler == null ? void 0 : developmentBundler.serverFields.hasAppNotFound : await fsChecker.getItem(_constants.UNDERSCORE_NOT_FOUND_ROUTE);
            res.statusCode = 404;
            if (appNotFound) {
                return await invokeRender(parsedUrl, _constants.UNDERSCORE_NOT_FOUND_ROUTE, handleIndex, {
                    invokeStatus: 404
                });
            }
            await invokeRender(parsedUrl, '/404', handleIndex, {
                invokeStatus: 404
            });
        };
        try {
            await handleRequest(0);
        } catch (err) {
            try {
                let invokePath = '/500';
                let invokeStatus = '500';
                if (err instanceof _utils.DecodeError) {
                    invokePath = '/400';
                    invokeStatus = '400';
                } else {
                    console.error(err);
                }
                res.statusCode = Number(invokeStatus);
                return await invokeRender(_url.default.parse(invokePath, true), invokePath, 0, {
                    invokeStatus: res.statusCode
                });
            } catch (err2) {
                console.error(err2);
            }
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    };
    let requestHandler = requestHandlerImpl;
    if (config.experimental.testProxy) {
        // Intercept fetch and other testmode apis.
        const { wrapRequestHandlerWorker, interceptTestApis } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/experimental/testmode/server.js [app-ssr] (ecmascript)");
        requestHandler = wrapRequestHandlerWorker(requestHandler);
        interceptTestApis();
        // We treat the intercepted fetch as "original" fetch that should be reset to during HMR.
        originalFetch = globalThis.fetch;
    }
    requestHandlers[opts.dir] = requestHandler;
    const renderServerOpts = {
        port: opts.port,
        dir: opts.dir,
        hostname: opts.hostname,
        minimalMode: opts.minimalMode,
        dev: !!opts.dev,
        server: opts.server,
        serverFields: {
            ...(developmentBundler == null ? void 0 : developmentBundler.serverFields) || {},
            setIsrStatus: devBundlerService == null ? void 0 : devBundlerService.setIsrStatus.bind(devBundlerService)
        },
        experimentalTestProxy: !!config.experimental.testProxy,
        experimentalHttpsServer: !!opts.experimentalHttpsServer,
        bundlerService: devBundlerService,
        startServerSpan: opts.startServerSpan,
        quiet: opts.quiet,
        onDevServerCleanup: opts.onDevServerCleanup
    };
    renderServerOpts.serverFields.routerServerHandler = requestHandlerImpl;
    // pre-initialize workers
    const handlers = await renderServer.instance.initialize(renderServerOpts);
    // this must come after initialize of render server since it's
    // using initialized methods
    if (!_routerservercontext.routerServerGlobal[_routerservercontext.RouterServerContextSymbol]) {
        _routerservercontext.routerServerGlobal[_routerservercontext.RouterServerContextSymbol] = {};
    }
    const relativeProjectDir = _path.default.relative(process.cwd(), opts.dir);
    _routerservercontext.routerServerGlobal[_routerservercontext.RouterServerContextSymbol][relativeProjectDir] = {
        nextConfig: config,
        hostname: handlers.server.hostname,
        revalidate: handlers.server.revalidate.bind(handlers.server),
        render404: handlers.server.render404.bind(handlers.server),
        experimentalTestProxy: renderServerOpts.experimentalTestProxy,
        logErrorWithOriginalStack: opts.dev ? handlers.server.logErrorWithOriginalStack.bind(handlers.server) : (err)=>!opts.quiet && _log.error(err),
        setCacheStatus: config.cacheComponents ? devBundlerService == null ? void 0 : devBundlerService.setCacheStatus.bind(devBundlerService) : undefined,
        setIsrStatus: devBundlerService == null ? void 0 : devBundlerService.setIsrStatus.bind(devBundlerService),
        setReactDebugChannel: config.experimental.reactDebugChannel ? devBundlerService == null ? void 0 : devBundlerService.setReactDebugChannel.bind(devBundlerService) : undefined
    };
    const logError = async (type, err)=>{
        if ((0, _ispostpone.isPostpone)(err)) {
            // React postpones that are unhandled might end up logged here but they're
            // not really errors. They're just part of rendering.
            return;
        }
        if (type === 'unhandledRejection') {
            _log.error('unhandledRejection: ', err);
        } else if (type === 'uncaughtException') {
            _log.error('uncaughtException: ', err);
        }
    };
    process.on('uncaughtException', logError.bind(null, 'uncaughtException'));
    process.on('unhandledRejection', logError.bind(null, 'unhandledRejection'));
    const resolveRoutes = (0, _resolveroutes.getResolveRoutes)(fsChecker, config, opts, renderServer.instance, renderServerOpts, developmentBundler == null ? void 0 : developmentBundler.ensureMiddleware);
    const upgradeHandler = async (req, socket, head)=>{
        try {
            req.on('error', (_err)=>{
            // TODO: log socket errors?
            // console.error(_err);
            });
            socket.on('error', (_err)=>{
            // TODO: log socket errors?
            // console.error(_err);
            });
            if (opts.dev && developmentBundler && req.url) {
                if ((0, _blockcrosssite.blockCrossSite)(req, socket, config.allowedDevOrigins, opts.hostname)) {
                    return;
                }
                const { basePath, assetPrefix } = config;
                let hmrPrefix = basePath;
                // assetPrefix overrides basePath for HMR path
                if (assetPrefix) {
                    hmrPrefix = (0, _normalizedassetprefix.normalizedAssetPrefix)(assetPrefix);
                    if (URL.canParse(hmrPrefix)) {
                        // remove trailing slash from pathname
                        // return empty string if pathname is '/'
                        // to avoid conflicts with '/_next' below
                        hmrPrefix = new URL(hmrPrefix).pathname.replace(/\/$/, '');
                    }
                }
                const isHMRRequest = req.url.startsWith((0, _ensureleadingslash.ensureLeadingSlash)(`${hmrPrefix}/_next/webpack-hmr`));
                // only handle HMR requests if the basePath in the request
                // matches the basePath for the handler responding to the request
                if (isHMRRequest) {
                    return developmentBundler.hotReloader.onHMR(req, socket, head, (client, { isLegacyClient })=>{
                        if (isLegacyClient) {
                            // Only send the ISR manifest to legacy clients, i.e. Pages
                            // Router clients, or App Router clients that have Cache
                            // Components disabled. The ISR manifest is only used to inform
                            // the static indicator, which currently does not provide useful
                            // information if Cache Components is enabled due to its binary
                            // nature (i.e. it does not support showing info for partially
                            // static pages).
                            client.send(JSON.stringify({
                                type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ISR_MANIFEST,
                                data: (devBundlerService == null ? void 0 : devBundlerService.appIsrManifest) || {}
                            }));
                        }
                    });
                }
            }
            const res = new _mockrequest.MockedResponse({
                resWriter: ()=>{
                    throw Object.defineProperty(new Error('Invariant: did not expect response writer to be written to for upgrade request'), "__NEXT_ERROR_CODE", {
                        value: "E522",
                        enumerable: false,
                        configurable: true
                    });
                }
            });
            const { matchedOutput, parsedUrl } = await resolveRoutes({
                req,
                res,
                isUpgradeReq: true,
                signal: (0, _nextrequest.signalFromNodeResponse)(socket)
            });
            // TODO: allow upgrade requests to pages/app paths?
            // this was not previously supported
            if (matchedOutput) {
                return socket.end();
            }
            if (parsedUrl.protocol) {
                return await (0, _proxyrequest.proxyRequest)(req, socket, parsedUrl, head);
            }
        // If there's no matched output, we don't handle the request as user's
        // custom WS server may be listening on the same path.
        } catch (err) {
            console.error('Error handling upgrade request', err);
            socket.end();
        }
    };
    return {
        requestHandler,
        upgradeHandler,
        server: handlers.server,
        closeUpgraded () {
            var _developmentBundler_hotReloader;
            developmentBundler == null ? void 0 : (_developmentBundler_hotReloader = developmentBundler.hotReloader) == null ? void 0 : _developmentBundler_hotReloader.close();
        }
    };
} //# sourceMappingURL=router-server.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/app-info-log.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getStartServerInfo: null,
    logStartInfo: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getStartServerInfo: function() {
        return getStartServerInfo;
    },
    logStartInfo: function() {
        return logStartInfo;
    }
});
const _env = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/@next/env/dist/index.js [app-ssr] (ecmascript)");
const _inspector = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[externals]/inspector [external] (inspector, cjs)"));
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-ssr] (ecmascript)"));
const _picocolors = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/picocolors.js [app-ssr] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-ssr] (ecmascript)");
const _config = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/config.js [app-ssr] (ecmascript)"));
const _configschema = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/config-schema.js [app-ssr] (ecmascript)");
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
function logStartInfo({ networkUrl, appUrl, envInfo, experimentalFeatures, logBundler, cacheComponents }) {
    let versionSuffix = '';
    const parts = [];
    if (logBundler) {
        if ("TURBOPACK compile-time truthy", 1) {
            parts.push('Turbopack');
        } else //TURBOPACK unreachable
        ;
    }
    if (cacheComponents) {
        parts.push('Cache Components');
    }
    if (parts.length > 0) {
        versionSuffix = ` (${parts.join(', ')})`;
    }
    _log.bootstrap(`${(0, _picocolors.bold)((0, _picocolors.purple)(`${_log.prefixes.ready} Next.js ${"16.0.7"}`))}${versionSuffix}`);
    if (appUrl) {
        _log.bootstrap(`- Local:         ${appUrl}`);
    }
    if (networkUrl) {
        _log.bootstrap(`- Network:       ${networkUrl}`);
    }
    const inspectorUrl = _inspector.url();
    if (inspectorUrl) {
        // Could also parse this port from the inspector URL.
        // process.debugPort will always be defined even if the process is not being inspected.
        // The full URL seems noisy as far as I can tell.
        // Node.js will print the full URL anyway.
        const debugPort = process.debugPort;
        _log.bootstrap(`- Debugger port: ${debugPort}`);
    }
    if (envInfo == null ? void 0 : envInfo.length) _log.bootstrap(`- Environments: ${envInfo.join(', ')}`);
    if (experimentalFeatures == null ? void 0 : experimentalFeatures.length) {
        _log.bootstrap(`- Experiments (use with caution):`);
        for (const exp of experimentalFeatures){
            const isValid = Object.prototype.hasOwnProperty.call(_configschema.experimentalSchema, exp.key);
            if (isValid) {
                const symbol = typeof exp.value === 'boolean' ? exp.value === true ? (0, _picocolors.bold)('✓') : (0, _picocolors.bold)('⨯') : '·';
                const suffix = typeof exp.value === 'number' || typeof exp.value === 'string' ? `: ${JSON.stringify(exp.value)}` : '';
                const reason = exp.reason ? ` (${exp.reason})` : '';
                _log.bootstrap(`  ${symbol} ${exp.key}${suffix}${reason}`);
            } else {
                _log.bootstrap(`  ? ${(0, _picocolors.strikethrough)(exp.key)} (invalid experimental key)`);
            }
        }
    }
    // New line after the bootstrap info
    _log.info('');
}
async function getStartServerInfo({ dir, dev, debugPrerender }) {
    let experimentalFeatures = [];
    let cacheComponents = false;
    const config = await (0, _config.default)(dev ? _constants.PHASE_DEVELOPMENT_SERVER : _constants.PHASE_PRODUCTION_BUILD, dir, {
        reportExperimentalFeatures (features) {
            experimentalFeatures = features.sort(({ key: a }, { key: b })=>a.localeCompare(b));
        },
        debugPrerender,
        silent: false
    });
    cacheComponents = !!config.cacheComponents;
    // we need to reset env if we are going to create
    // the worker process with the esm loader so that the
    // initial env state is correct
    let envInfo = [];
    const { loadedEnvFiles } = (0, _env.loadEnvConfig)(dir, true, console, false);
    if (loadedEnvFiles.length > 0) {
        envInfo = loadedEnvFiles.map((f)=>f.path);
    }
    return {
        envInfo,
        experimentalFeatures,
        cacheComponents
    };
} //# sourceMappingURL=app-info-log.js.map
}),
"[project]/JobPortal/frontend/node_modules/next/dist/server/lib/start-server.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Start CPU profile if it wasn't already started.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getRequestHandlers: null,
    startServer: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRequestHandlers: function() {
        return getRequestHandlers;
    },
    startServer: function() {
        return startServer;
    }
});
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/cpu-profile.js [app-ssr] (ecmascript)");
const _getnetworkhost = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/get-network-host.js [app-ssr] (ecmascript)");
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/next.js [app-ssr] (ecmascript)");
__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/require-hook.js [app-ssr] (ecmascript)");
const _fs = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/fs [external] (fs, cjs)"));
const _v8 = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/v8 [external] (v8, cjs)"));
const _path = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/path [external] (path, cjs)"));
const _http = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/http [external] (http, cjs)"));
const _https = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/https [external] (https, cjs)"));
const _os = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[externals]/os [external] (os, cjs)"));
const _child_process = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)");
const _watchpack = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/watchpack/watchpack.js [app-ssr] (ecmascript)"));
const _log = /*#__PURE__*/ _interop_require_wildcard(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/build/output/log.js [app-ssr] (ecmascript)"));
const _debug = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/compiled/debug/index.js [app-ssr] (ecmascript)"));
const _utils = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/utils.js [app-ssr] (ecmascript)");
const _formathostname = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/format-hostname.js [app-ssr] (ecmascript)");
const _routerserver = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/router-server.js [app-ssr] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/shared/lib/constants.js [app-ssr] (ecmascript)");
const _appinfolog = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/app-info-log.js [app-ssr] (ecmascript)");
const _turbopackwarning = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/lib/turbopack-warning.js [app-ssr] (ecmascript)");
const _trace = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/index.js [app-ssr] (ecmascript)");
const _isipv6 = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/is-ipv6.js [app-ssr] (ecmascript)");
const _asynccallbackset = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/server/lib/async-callback-set.js [app-ssr] (ecmascript)");
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
if (performance.getEntriesByName('next-start').length === 0) {
    performance.mark('next-start');
}
const debug = (0, _debug.default)('next:start-server');
let startServerSpan;
/**
 * Get the process ID (PID) of the process using the specified port
 */ async function getProcessIdUsingPort(port) {
    const timeoutMs = 250;
    const processLookupController = new AbortController();
    const pidPromise = new Promise((resolve)=>{
        const handleError = (error)=>{
            debug('Failed to get process ID for port', port, error);
            resolve(null);
        };
        try {
            // Use lsof on Unix-like systems (macOS, Linux)
            if ("TURBOPACK compile-time truthy", 1) {
                (0, _child_process.exec)(`lsof -ti:${port} -sTCP:LISTEN`, {
                    signal: processLookupController.signal
                }, (error, stdout)=>{
                    if (error) {
                        handleError(error);
                        return;
                    }
                    // `-sTCP` will ensure there's only one port, clean up output
                    const pid = stdout.trim();
                    resolve(pid || null);
                });
            } else //TURBOPACK unreachable
            ;
        } catch (cause) {
            handleError(Object.defineProperty(new Error('Unexpected error during process lookup', {
                cause
            }), "__NEXT_ERROR_CODE", {
                value: "E713",
                enumerable: false,
                configurable: true
            }));
        }
    });
    const timeoutId = setTimeout(()=>{
        processLookupController.abort(`PID detection timed out after ${timeoutMs}ms for port ${port}.`);
    }, timeoutMs);
    pidPromise.finally(()=>clearTimeout(timeoutId));
    return pidPromise;
}
async function getRequestHandlers({ dir, port, isDev, onDevServerCleanup, server, hostname, minimalMode, keepAliveTimeout, experimentalHttpsServer, quiet }) {
    return (0, _routerserver.initialize)({
        dir,
        port,
        hostname,
        onDevServerCleanup,
        dev: isDev,
        minimalMode,
        server,
        keepAliveTimeout,
        experimentalHttpsServer,
        startServerSpan,
        quiet
    });
}
async function startServer(serverOptions) {
    const { dir, isDev, hostname, minimalMode, allowRetry, keepAliveTimeout, selfSignedCertificate } = serverOptions;
    let { port } = serverOptions;
    process.title = `next-server (v${"16.0.7"})`;
    let handlersReady = ()=>{};
    let handlersError = ()=>{};
    let handlersPromise = new Promise((resolve, reject)=>{
        handlersReady = resolve;
        handlersError = reject;
    });
    let requestHandler = async (req, res)=>{
        if (handlersPromise) {
            await handlersPromise;
            return requestHandler(req, res);
        }
        throw Object.defineProperty(new Error('Invariant request handler was not setup'), "__NEXT_ERROR_CODE", {
            value: "E287",
            enumerable: false,
            configurable: true
        });
    };
    let upgradeHandler = async (req, socket, head)=>{
        if (handlersPromise) {
            await handlersPromise;
            return upgradeHandler(req, socket, head);
        }
        throw Object.defineProperty(new Error('Invariant upgrade handler was not setup'), "__NEXT_ERROR_CODE", {
            value: "E290",
            enumerable: false,
            configurable: true
        });
    };
    let nextServer;
    // setup server listener as fast as possible
    if (selfSignedCertificate && !isDev) {
        throw Object.defineProperty(new Error('Using a self signed certificate is only supported with `next dev`.'), "__NEXT_ERROR_CODE", {
            value: "E128",
            enumerable: false,
            configurable: true
        });
    }
    async function requestListener(req, res) {
        try {
            if (handlersPromise) {
                await handlersPromise;
                handlersPromise = undefined;
            }
            await requestHandler(req, res);
        } catch (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
            _log.error(`Failed to handle request for ${req.url}`);
            console.error(err);
        } finally{
            if (isDev) {
                if (_v8.default.getHeapStatistics().used_heap_size > 0.8 * _v8.default.getHeapStatistics().heap_size_limit) {
                    _log.warn(`Server is approaching the used memory threshold, restarting...`);
                    (0, _trace.trace)('server-restart-close-to-memory-threshold', undefined, {
                        'memory.heapSizeLimit': String(_v8.default.getHeapStatistics().heap_size_limit),
                        'memory.heapUsed': String(_v8.default.getHeapStatistics().used_heap_size)
                    }).stop();
                    await (0, _trace.flushAllTraces)();
                    process.exit(_utils.RESTART_EXIT_CODE);
                }
            }
        }
    }
    const server = selfSignedCertificate ? _https.default.createServer({
        key: _fs.default.readFileSync(selfSignedCertificate.key),
        cert: _fs.default.readFileSync(selfSignedCertificate.cert)
    }, requestListener) : _http.default.createServer(requestListener);
    if (keepAliveTimeout) {
        server.keepAliveTimeout = keepAliveTimeout;
    }
    server.on('upgrade', async (req, socket, head)=>{
        try {
            await upgradeHandler(req, socket, head);
        } catch (err) {
            socket.destroy();
            _log.error(`Failed to handle request for ${req.url}`);
            console.error(err);
        }
    });
    let portRetryCount = 0;
    const originalPort = port;
    server.on('error', (err)=>{
        if (allowRetry && port && isDev && err.code === 'EADDRINUSE' && portRetryCount < 10) {
            port += 1;
            portRetryCount += 1;
            server.listen(port, hostname);
        } else {
            _log.error(`Failed to start server`);
            console.error(err);
            process.exit(1);
        }
    });
    let cleanupListeners = isDev ? new _asynccallbackset.AsyncCallbackSet() : undefined;
    await new Promise((resolve)=>{
        server.on('listening', async ()=>{
            const addr = server.address();
            const actualHostname = (0, _formathostname.formatHostname)(typeof addr === 'object' ? (addr == null ? void 0 : addr.address) || hostname || 'localhost' : addr);
            const formattedHostname = !hostname || actualHostname === '0.0.0.0' ? 'localhost' : actualHostname === '[::]' ? '[::1]' : (0, _formathostname.formatHostname)(hostname);
            port = typeof addr === 'object' ? (addr == null ? void 0 : addr.port) || port : port;
            if (portRetryCount) {
                const pid = await getProcessIdUsingPort(originalPort);
                if (pid) {
                    _log.warn(`Port ${originalPort} is in use by process ${pid}, using available port ${port} instead.`);
                } else {
                    _log.warn(`Port ${originalPort} is in use by an unknown process, using available port ${port} instead.`);
                }
            }
            const networkHostname = hostname ?? (0, _getnetworkhost.getNetworkHost)((0, _isipv6.isIPv6)(actualHostname) ? 'IPv6' : 'IPv4');
            const protocol = selfSignedCertificate ? 'https' : 'http';
            const networkUrl = networkHostname ? `${protocol}://${(0, _formathostname.formatHostname)(networkHostname)}:${port}` : null;
            const appUrl = `${protocol}://${formattedHostname}:${port}`;
            // Store the selected port to:
            // - expose it to render workers
            // - re-use it for automatic dev server restarts with a randomly selected port
            process.env.PORT = port + '';
            process.env.__NEXT_PRIVATE_ORIGIN = appUrl;
            // Set experimental HTTPS flag for metadata resolution
            if (selfSignedCertificate) {
                process.env.__NEXT_EXPERIMENTAL_HTTPS = '1';
            }
            // Only load env and config in dev to for logging purposes
            let envInfo;
            let experimentalFeatures;
            let cacheComponents;
            try {
                if (isDev) {
                    const startServerInfo = await (0, _appinfolog.getStartServerInfo)({
                        dir,
                        dev: isDev
                    });
                    envInfo = startServerInfo.envInfo;
                    cacheComponents = startServerInfo.cacheComponents;
                    experimentalFeatures = startServerInfo.experimentalFeatures;
                }
                (0, _appinfolog.logStartInfo)({
                    networkUrl,
                    appUrl,
                    envInfo,
                    experimentalFeatures,
                    cacheComponents,
                    logBundler: isDev
                });
                _log.event(`Starting...`);
                let cleanupStarted = false;
                let closeUpgraded = null;
                const cleanup = ()=>{
                    if (cleanupStarted) {
                        // We can get duplicate signals, e.g. when `ctrl+c` is used in an
                        // interactive shell (i.e. bash, zsh), the shell will recursively
                        // send SIGINT to children. The parent `next-dev` process will also
                        // send us SIGINT.
                        return;
                    }
                    cleanupStarted = true;
                    (async ()=>{
                        debug('start-server process cleanup');
                        // first, stop accepting new connections and finish pending requests,
                        // because they might affect `nextServer.close()` (e.g. by scheduling an `after`)
                        await new Promise((res)=>{
                            server.close((err)=>{
                                if (err) console.error(err);
                                res();
                            });
                            if (isDev) {
                                server.closeAllConnections();
                                closeUpgraded == null ? void 0 : closeUpgraded();
                            }
                        });
                        // now that no new requests can come in, clean up the rest
                        await Promise.all([
                            nextServer == null ? void 0 : nextServer.close().catch(console.error),
                            cleanupListeners == null ? void 0 : cleanupListeners.runAll().catch(console.error)
                        ]);
                        // Flush telemetry if this is a dev server
                        if (isDev) {
                            try {
                                const { traceGlobals } = __turbopack_context__.r("[project]/JobPortal/frontend/node_modules/next/dist/trace/shared.js [app-ssr] (ecmascript)");
                                const telemetry = traceGlobals.get('telemetry');
                                if (telemetry) {
                                    // Use flushDetached to avoid blocking process exit
                                    // Each process writes to a unique file (_events_${pid}.json)
                                    // to avoid race conditions with the parent process
                                    telemetry.flushDetached('dev', dir);
                                }
                            } catch (_) {
                            // Ignore telemetry errors during cleanup
                            }
                        }
                        debug('start-server process cleanup finished');
                        process.exit(0);
                    })();
                };
                // Make sure commands gracefully respect termination signals (e.g. from Docker)
                // Allow the graceful termination to be manually configurable
                if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
                    process.on('SIGINT', cleanup);
                    process.on('SIGTERM', cleanup);
                }
                const initResult = await getRequestHandlers({
                    dir,
                    port,
                    isDev,
                    onDevServerCleanup: cleanupListeners ? cleanupListeners.add.bind(cleanupListeners) : undefined,
                    server,
                    hostname,
                    minimalMode,
                    keepAliveTimeout,
                    experimentalHttpsServer: !!selfSignedCertificate
                });
                requestHandler = initResult.requestHandler;
                upgradeHandler = initResult.upgradeHandler;
                nextServer = initResult.server;
                closeUpgraded = initResult.closeUpgraded;
                const startServerProcessDuration = performance.mark('next-start-end') && performance.measure('next-start-duration', 'next-start', 'next-start-end').duration;
                handlersReady();
                const formatDurationText = startServerProcessDuration > 2000 ? `${Math.round(startServerProcessDuration / 100) / 10}s` : `${Math.round(startServerProcessDuration)}ms`;
                _log.event(`Ready in ${formatDurationText}`);
                if ("TURBOPACK compile-time truthy", 1) {
                    await (0, _turbopackwarning.validateTurboNextConfig)({
                        dir: serverOptions.dir,
                        isDev: serverOptions.isDev
                    });
                }
            } catch (err) {
                // fatal error if we can't setup
                handlersError();
                console.error(err);
                process.exit(1);
            }
            resolve();
        });
        server.listen(port, hostname);
    });
    if (isDev) {
        function watchConfigFiles(dirToWatch, onChange) {
            const wp = new _watchpack.default();
            wp.watch({
                files: _constants.CONFIG_FILES.map((file)=>_path.default.join(dirToWatch, file))
            });
            wp.on('change', onChange);
        }
        watchConfigFiles(dir, async (filename)=>{
            if (process.env.__NEXT_DISABLE_MEMORY_WATCHER) {
                _log.info(`Detected change, manual restart required due to '__NEXT_DISABLE_MEMORY_WATCHER' usage`);
                return;
            }
            _log.warn(`Found a change in ${_path.default.basename(filename)}. Restarting the server to apply the changes...`);
            process.exit(_utils.RESTART_EXIT_CODE);
        });
    }
}
if (process.env.NEXT_PRIVATE_WORKER && process.send) {
    process.addListener('message', async (msg)=>{
        if (msg && typeof msg === 'object' && msg.nextWorkerOptions && process.send) {
            startServerSpan = (0, _trace.trace)('start-dev-server', undefined, {
                cpus: String(_os.default.cpus().length),
                platform: _os.default.platform(),
                'memory.freeMem': String(_os.default.freemem()),
                'memory.totalMem': String(_os.default.totalmem()),
                'memory.heapSizeLimit': String(_v8.default.getHeapStatistics().heap_size_limit)
            });
            await startServerSpan.traceAsyncFn(()=>startServer(msg.nextWorkerOptions));
            const memoryUsage = process.memoryUsage();
            startServerSpan.setAttribute('memory.rss', String(memoryUsage.rss));
            startServerSpan.setAttribute('memory.heapTotal', String(memoryUsage.heapTotal));
            startServerSpan.setAttribute('memory.heapUsed', String(memoryUsage.heapUsed));
            process.send({
                nextServerReady: true,
                port: process.env.PORT
            });
        }
    });
    process.send({
        nextWorkerReady: true
    });
} //# sourceMappingURL=start-server.js.map
}),
];

//# sourceMappingURL=661c0_next_dist_server_lib_b5126729._.js.map