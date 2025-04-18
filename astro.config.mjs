// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  output: 'server', // 确保使用服务端渲染
  adapter: cloudflare(), // 使用 Cloudflare 适配器
  devToolbar: { enabled: false }, // 关闭开发工具栏
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      ...(import.meta.env.PROD
        ? {
            alias: {
              "react-dom/server": "react-dom/server.edge",
            },
          }
        : {}),
    },
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': 'https://post.laiweimin.cn', // 或指定源如 https://a.com
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  }
});