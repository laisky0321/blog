// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_astro/*",
    "/img/avatar.webp",
    "/img/down.svg",
    "/img/favicon.ico",
    "/img/logo.webp",
    "/img/snoopy.png",
    "/img/up.svg",
    "/style/article.css",
    "/style/article_dark.css",
    "/style/deliver.css",
    "/style/deliver_dark.css",
    "/style/layout.css",
    "/style/layout_dark.css"
  ]
};

// ../../Users/lwm03/AppData/Roaming/npm/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\code\\blog\\.wrangler\\tmp\\pages-CD2sV2\\bundledWorker-0.6955985641966957.mjs";
import { isRoutingRuleMatch } from "C:\\Users\\lwm03\\AppData\\Roaming\\npm\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "C:\\code\\blog\\.wrangler\\tmp\\pages-CD2sV2\\bundledWorker-0.6955985641966957.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=4nog5i41hg2.js.map
