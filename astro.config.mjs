// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  output: 'server', // 确保使用服务端渲染
  adapter: cloudflare(),
  devToolbar: { enabled: false }, // 关闭开发工具栏
  server: {
    headers: {
      'Access-Control-Allow-Origin': 'https://post.laiweimin.cn', // 或指定源如 https://a.com
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  }
});