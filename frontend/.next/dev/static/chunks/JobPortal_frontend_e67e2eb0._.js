(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/JobPortal/frontend/context/globalContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalContextProvider",
    ()=>GlobalContextProvider,
    "useGlobalContext",
    ()=>useGlobalContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.baseURL = "http://localhost:8000";
__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.withCredentials = true;
const GlobalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
const GlobalContextProvider = ({ children })=>{
    _s();
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [auth0User, setAuth0User] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userProfile, setUserProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalContextProvider.useEffect": ()=>{
            const checkAuth = {
                "GlobalContextProvider.useEffect.checkAuth": async ()=>{
                    setLoading(true);
                    try {
                        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/v1/check-auth");
                        setIsAuthenticated(res.data.isAuthenticated);
                        setAuth0User(res.data.user);
                        setLoading(false);
                    } catch (error) {
                        console.log("Error checking auth", error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["GlobalContextProvider.useEffect.checkAuth"];
            checkAuth();
        }
    }["GlobalContextProvider.useEffect"], []);
    const getUserProfile = async (id)=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/v1/user/${id}`);
            setUserProfile(res.data);
        } catch (error) {
            console.log("Error getting user profile", error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalContextProvider.useEffect": ()=>{
            if (isAuthenticated && auth0User) {
                getUserProfile(auth0User.sub);
            }
        }
    }["GlobalContextProvider.useEffect"], [
        isAuthenticated,
        auth0User
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalContext.Provider, {
        value: {
            isAuthenticated,
            auth0User,
            userProfile,
            getUserProfile,
            loading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/JobPortal/frontend/context/globalContext.js",
        lineNumber: 43,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GlobalContextProvider, "9HM3TE7mcG9XrKESFXy9aES+3ds=");
_c = GlobalContextProvider;
const useGlobalContext = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(GlobalContext);
};
_s1(useGlobalContext, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "GlobalContextProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/JobPortal/frontend/providers/ContextProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$context$2f$globalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/context/globalContext.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/context/'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
function ContextProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$context$2f$globalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlobalContextProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(JobsContextProvider, {
            children: children
        }, void 0, false, {
            fileName: "[project]/JobPortal/frontend/providers/ContextProvider.tsx",
            lineNumber: 11,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/JobPortal/frontend/providers/ContextProvider.tsx",
        lineNumber: 10,
        columnNumber: 11
    }, this);
}
_c = ContextProvider;
const __TURBOPACK__default__export__ = ContextProvider;
var _c;
__turbopack_context__.k.register(_c, "ContextProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=JobPortal_frontend_e67e2eb0._.js.map