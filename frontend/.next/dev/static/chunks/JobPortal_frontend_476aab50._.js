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
    // input state
    const [jobTitle, setJobTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [jobDescription, setJobDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [salary, setSalary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeEmployementTypes, setActiveEmployementTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [salaryType, setSalaryType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Year");
    const [negotiable, setNegotiable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [skills, setSkills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [location, setLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        country: "",
        city: "",
        address: ""
    });
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
    //handle input data
    const handleTitleChange = (e)=>{
        setJobTitle(e.target.value.trimStart());
    };
    const handleDescriptionChange = (e)=>{
        setJobDescription(e.target.value.trimStart());
    };
    const handleSalaryChange = (e)=>{
        setSalary(e.target.value);
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
            loading,
            jobTitle,
            jobDescription,
            salary,
            activeEmployementTypes,
            salaryType,
            negotiable,
            tags,
            skills,
            location,
            handleTitleChange,
            handleDescriptionChange,
            handleSalaryChange,
            setActiveEmployementTypes,
            setJobDescription,
            setSalaryType,
            setNegotiable,
            setTags,
            setSkills,
            setLocation
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/JobPortal/frontend/context/globalContext.js",
        lineNumber: 70,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GlobalContextProvider, "R+RawMn2DkNZ3muRdyuwWdF5bXc=");
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
"[project]/JobPortal/frontend/context/jobContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JobsContextProvider",
    ()=>JobsContextProvider,
    "useJobsContext",
    ()=>useJobsContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$context$2f$globalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/context/globalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
const JobsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.baseURL = "http://localhost:8000";
__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.withCredentials = true;
const JobsContextProvider = ({ children })=>{
    _s();
    const { userProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$context$2f$globalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalContext"])();
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userJobs, setUserJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        tags: "",
        location: "",
        title: ""
    });
    //filters
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fullTime: false,
        partTime: false,
        internship: false,
        fullStack: false,
        backend: false,
        frontend: false,
        devOps: false,
        uiUx: false
    });
    const [minSalary, setMinSalary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30000);
    const [maxSalary, setMaxSalary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(120000);
    const getJobs = async ()=>{
        setLoading(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/v1/jobs");
            setJobs(res.data);
        } catch (error) {
            console.log("Error getting Jobs", error);
        } finally{
            setLoading(false);
        }
    };
    const createJob = async (jobData)=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/v1/jobs", jobData);
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Job created successsfully");
            setJobs((prevJobs)=>[
                    res.data,
                    ...prevJobs
                ]);
            // Update user jobs
            if (userProfile._id) {
                setUserJobs((prevUserJobs)=>[
                        res.data,
                        ...prevUserJobs
                    ]);
            }
        } catch (error) {
            console.log("Error creating Job", error);
        }
    };
    const getUserJobs = async (userId)=>{
        setLoading(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/v1/jobs/user/" + userId);
            setUserJobs(res.data);
            setLoading(false);
        } catch (error) {
            console.log("Error getting user Jobs", error);
        } finally{
            setLoading(false);
        }
    };
    const searchJobs = async (tags, location, title)=>{
        try {
            //build query String
            const query = new URLSearchParams();
            if (tags) query.append("tags", tags);
            if (location) query.append("location", location);
            if (title) query.append("title", title);
            //send the request
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/v1/jobs/search?${query.toString()}`);
            //set jobs to the response data
            setJobs(res.data);
            setLoading(false);
        } catch (error) {
            console.log("Error searching jobs", error);
        } finally{
            setLoading(false);
        }
    };
    //get job by ID
    const getJobById = async (id)=>{
        setLoading(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/v1/jobs/${id}`);
            setLoading(false);
            return res.data;
        } catch (error) {
            console.log("Error getting job by Id", error);
        } finally{
            setLoading(false);
        }
    };
    //like a job
    const likeJob = async (jobId)=>{
        try {
            const res = __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/v1/jobs/like/${jobId}`);
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Job liked Sucessfully");
            getJobs();
        } catch (error) {
            console.log("Error liking Job", error);
        }
    };
    //apply to a job
    const applyToJob = async (jobId)=>{
        const job = jobs.find((job)=>job._id === jobId);
        if (job && job.applicants.includes(userProfile._id)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("You have already applied to this job");
            return;
        }
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/v1/jobs/apply/${jobId}`);
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Applied to job successfully");
        } catch (error) {
            console.log("Error applying to job", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.response.data.message);
        }
    };
    //delete a job
    const deleteJob = async (jobId)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/v1/jobs/${jobId}`);
            setJobs((prevJobs)=>prevJobs.filter((job)=>job._id !== jobId));
            setUserJobs((prevJobs)=>prevJobs.filter((job)=>job._id !== jobId));
            __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Job deleted successfully");
        } catch (error) {
            console.log("Error deleting job", error);
        }
    };
    //
    const handleSearchChange = (searchName, value)=>{
        setSearchQuery((prev)=>({
                ...prev,
                [searchName]: value
            }));
    };
    const handleFilterChange = (filterName)=>{
        setFilters((prev)=>({
                ...prev,
                [filterName]: !prev[filterName]
            }));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JobsContextProvider.useEffect": ()=>{
            getJobs();
        }
    }["JobsContextProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JobsContextProvider.useEffect": ()=>{
            if (userProfile._id) {
                getUserJobs(userProfile._id);
            }
        }
    }["JobsContextProvider.useEffect"], [
        userProfile
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(JobsContext.Provider, {
        value: {
            jobs,
            loading,
            createJob,
            userJobs,
            searchJobs,
            getJobById,
            likeJob,
            applyToJob,
            deleteJob,
            handleSearchChange,
            searchQuery,
            setSearchQuery,
            handleFilterChange,
            filters,
            minSalary,
            setMinSalary,
            maxSalary,
            setMaxSalary,
            setFilters
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/JobPortal/frontend/context/jobContext.js",
        lineNumber: 175,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
};
_s(JobsContextProvider, "i4T1+7hCs+58/vT02q81q8t5OjA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$context$2f$globalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobalContext"]
    ];
});
_c = JobsContextProvider;
const useJobsContext = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(JobsContext);
};
_s1(useJobsContext, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "JobsContextProvider");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$context$2f$jobContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/JobPortal/frontend/context/jobContext.js [app-client] (ecmascript)");
"use client";
;
;
;
function ContextProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$context$2f$globalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlobalContextProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$JobPortal$2f$frontend$2f$context$2f$jobContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JobsContextProvider"], {
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

//# sourceMappingURL=JobPortal_frontend_476aab50._.js.map