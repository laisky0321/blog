globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as createComponent, b as createAstro, e as addAttribute, f as renderHead, r as renderComponent, h as renderSlot, d as renderTemplate } from './astro/server_Bl5Wa4cQ.mjs';
import { b as reactExports } from './_@astro-renderers_ChVt_l-J.mjs';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;
	{
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

const About = () => {
  const [isDropdownOpen, setIsDropdownOpen] = reactExports.useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: toggleDropdown, style: { cursor: "pointer" }, children: [
    isDropdownOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "dropdown",
        style: {
          position: "absolute",
          top: "50px",
          right: "5px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
          padding: "10px",
          zIndex: 1e3
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "About Me" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "山川是不卷收的画卷，日月为你掌灯伴读。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Email: laiweimin0321@gmail.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "GitHub: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/laisky0321", target: "_blank", rel: "noopener noreferrer", children: "laisky0321" })
          ] })
        ]
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "about", style: { display: "flex", alignItems: "center", marginRight: "10px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/img/avatar.webp",
          alt: "Avatar",
          style: { borderRadius: "50%", width: "36px", height: "36px", marginRight: "5px" }
        }
      ),
      isDropdownOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/img/down.svg",
          style: { width: "24px", height: "24px", transform: "scale(1, -1)", transformOrigin: "center" }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/img/down.svg",
          style: { width: "24px", height: "24px" }
        }
      )
    ] })
  ] });
};

const DarkModeToggle = ({ DarkModeinit }) => {
  const [isDarkMode, setIsDarkMode] = reactExports.useState(DarkModeinit);
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    window.location.reload();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "flex", alignItems: "center", cursor: "pointer", marginRight: "10px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        checked: isDarkMode,
        onChange: toggleDarkMode,
        style: { display: "none" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          width: "50px",
          height: "25px",
          background: isDarkMode ? "#1f1f1f" : "#ccc",
          borderRadius: "25px",
          position: "relative",
          transition: "background 0.3s"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              position: "absolute",
              top: "2px",
              left: isDarkMode ? "26px" : "2px",
              width: "21px",
              height: "21px",
              background: "#fff",
              borderRadius: "50%",
              transition: "left 0.3s"
            }
          }
        )
      }
    )
  ] });
};

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const theme = Astro2.cookies.get("theme")?.value || "light";
  const cssFile1 = theme === "dark" ? "/style/layout_dark.css" : "/style/layout.css";
  const cssFile2 = theme === "dark" ? "/style/article_dark.css" : "/style/article.css";
  const cssFile3 = theme === "dark" ? "/style/deliver_dark.css" : "/style/deliver.css";
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/img/favicon.ico"><link rel="stylesheet"${addAttribute(cssFile1, "href")}><!-- 添加主题样式表 --><link rel="stylesheet"${addAttribute(cssFile2, "href")}><!-- 添加文章主题样式表 --><link rel="stylesheet"${addAttribute(cssFile3, "href")}><!-- 添加交付主题样式表 --><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>小赖的网站</title>${renderHead()}</head> <body> <header> <nav class="head"> <div class="logo"> <img src="/img/logo.webp" alt="Astro Basics Logo"> </div> <img src="/img/snoopy.png" width="80" alt="Snoopy" class="snoopy"> <div class="other"> ${renderComponent($$result, "DarkModeToggle", DarkModeToggle, { "DarkModeinit": theme === "dark", "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/code/blog/src/components/theme", "client:component-export": "default" })} ${renderComponent($$result, "About", About, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/code/blog/src/components/about", "client:component-export": "default" })} </div> </nav> </header> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/code/blog/src/layouts/Layout.astro", void 0);

export { $$Layout as $, jsxRuntimeExports as j };
