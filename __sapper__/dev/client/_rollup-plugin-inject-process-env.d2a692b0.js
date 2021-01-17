(function() {
    const env = {"WS_URL":"ws://localhost:7711/sub","HTTP_URL":"http://localhost:7711","HTTP_GRAPHQL_SUFFIX":"/graphql"};
    try {
        if (process) {
            process.env = Object.assign({}, process.env);
            Object.assign(process.env, env);
            return;
        }
    } catch (e) {} // avoid ReferenceError: process is not defined
    globalThis.process = { env:env };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3JvbGx1cC1wbHVnaW4taW5qZWN0LXByb2Nlc3MtZW52LmQyYTY5MmIwLmpzIiwic291cmNlcyI6W10sInNvdXJjZXNDb250ZW50IjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzsifQ==
