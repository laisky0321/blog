import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkNav from 'markdown-navbar';
import { get, set } from 'idb-keyval';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
// import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/github.css';

export default function MD({ article_key }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const cached = await get(article_key);
      if (cached && cached.expire && Date.now() < cached.expire) {
        setContent(cached);
        return;
      }

      const res = await fetch(`https://post.laiweimin.cn/${article_key}.md`);
      const text = await res.text();
      setContent(text);
      const expireMs = 60 * 60 * 1000;
      set(article_key, {
        text,
        time: Date.now(),
        expire: Date.now() + expireMs
      });
    };

    fetchContent();
  }, [article_key]);

  const adjustedContent = `# 占位标题\n${content.replace(/<[^>]+>/g, '')}`;  

  return (
    <div className="article-wrapper">
      <div className="markdown-body article-container">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [rehypeHighlight, { ignoreMissing: true }]
          ]}
          components={{
            // 自定义代码块渲染
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="code-block">
                  <div className="code-header">
                    <span className="language-tag">{match[1]}</span>
                  </div>
                  <pre className={className}>
                    <code {...props}>{children}</code>
                  </pre>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            // 自定义表格样式
            table({ children }) {
              return <div className="table-wrapper"><table>{children}</table></div>
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      
      {content && (
        <div className="nav-container">
          <MarkNav 
            className="article-menu github-nav"
            source={adjustedContent}
            headingTopOffset={80}
            ordered={false}
            includeFirstHeading={true}
            // 自定义导航样式
            renderers={{
              nav: ({ children }) => <div className="nav-inner">{children}</div>,
              item: ({ level, children }) => (
                <div className={`nav-item level-${level}`}>{children}</div>
              )
            }}
          />
        </div>
      )}
    </div>
  );
}