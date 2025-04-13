globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, b as createAstro, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_Bl5Wa4cQ.mjs';
import { j as jsxRuntimeExports, $ as $$Layout } from '../chunks/Layout_C2LeWnNg.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_ChVt_l-J.mjs';

const ArticleCard = ({ article_key, title, description, color, time }) => {
  const handleClick = () => {
    document.location.href = `/article?key=${article_key}`;
  };
  const getLabelSvg = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        className: "article-label",
        t: "1744445408526",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        width: "50",
        height: "50",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M832 64v960L530.3 812.8c-11-7.7-25.7-7.7-36.7 0L192 1024V64c0-35.4 28.7-64 64-64h512c35.3 0 64 28.6 64 64z",
            fill: color
          }
        )
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "article-card", onClick: handleClick, children: [
    getLabelSvg(),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "article-title", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "article-description", children: description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "article-time", children: time })
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const response = await fetch("http://post.laiweimin.cn/all.json");
  const data = await response.json();
  const catalogList = data.catalog;
  const cards = data.card;
  const url = new URL(Astro2.url);
  var catalog = url.searchParams.get("catalog");
  if (catalog === null) {
    console.log(catalog);
    catalog = "0";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<ul class="catalog"> <li><a href="/">Home</a></li> ${catalogList.map((catalogItem) => renderTemplate`<li> <a${addAttribute(`?catalog=${catalogItem.id}`, "href")}${addAttribute(`text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 3px; text-decoration-color: ${catalogItem.color};`, "style")}> ${catalogItem.name} </a> </li>`)} </ul> <div class="article-list" style="display: flex; flex-wrap: wrap; gap: 16px; margin: 0 16px;"> ${cards.filter((item) => catalog === "0" || item.catalog.toString() === catalog).map((item) => renderTemplate`${renderComponent($$result2, "ArticleCard", ArticleCard, { "article_key": item.key, "title": item.title, "description": item.summary, "color": catalogList[item.catalog - 1].color, "time": item.time, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/code/blog/src/components/article", "client:component-export": "default" })}`)} </div> ` })}`;
}, "C:/code/blog/src/pages/index.astro", void 0);

const $$file = "C:/code/blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
