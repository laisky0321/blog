import { get, set } from 'idb-keyval';

const ArticleCard = ({ article_key, title, description, color, time }) => {
    const handleClick = () => {
        document.location.href = `/article?key=${article_key}`;
    };

    const handleMouseHover = async () => {
              const cached = await get(article_key);
              if (!cached) {
                const res = await fetch(`https://post.laiweimin.cn/${article_key}.md`);
                const text = await res.text();
                const expireMs = 60 * 60 * 1000;
                set(article_key, {
                    text,
                    time: Date.now(),
                    expire: Date.now() + expireMs
                });
              }
      
    };

    const getLabelSvg = () => {
        return (
            <svg
                className="article-label"
                t="1744445408526"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
            >
                <path
                    d="M832 64v960L530.3 812.8c-11-7.7-25.7-7.7-36.7 0L192 1024V64c0-35.4 28.7-64 64-64h512c35.3 0 64 28.6 64 64z"
                    fill={color}
                ></path>
            </svg>
        );
    };

    return (
        <div className="article-card" onClick={handleClick} onMouseEnter={handleMouseHover}>
            {getLabelSvg()}
            <h2 className="article-title">{title}</h2>
            <p className="article-description">{description}</p>
            <p className="article-time">{time}</p>
        </div>
    );
};

export default ArticleCard;