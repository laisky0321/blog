import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import { get, set } from 'idb-keyval';

export default function MD({ article_key }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      // 尝试从 IndexedDB 读取
      const cached = await get(article_key);
      if (cached) {
        setContent(cached);
        return;
      }

      // 如果本地没有，则远程获取并缓存
      const res = await fetch(`https://post.laiweimin.cn/${article_key}.md`);
      const text = await res.text();
      setContent(text);
      set(article_key, text); // 写入缓存
    };

    fetchContent();
  }, [article_key]);

const adjustedContent = `# 占位标题\n${content}`;

return( 
    <body className="article-wrapper"> 
            <div className="article-container"> 
                    <ReactMarkdown>{content}</ReactMarkdown> 
            </div> 
            {
            content && ( 
                    <div className="nav-container"> 
                            <MarkNav className="article-menu" source={adjustedContent} headingTopOffset={80} ordered={false} includeFirstHeading={true}/> 
                    </div> 
            )} 
    </body> 
) 
}
