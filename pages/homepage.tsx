import {Include} from "@tinkerable/internal/v1/include"
import {Link} from "@tinkerable/internal/v1/components"
import {useMetadataQuery, useFileMetadata} from "@tinkerable/internal/v1/hooks"
import { useCallback, useMemo } from "react";

export type Metadata = Record<string, any>;
export type FilesMetadata = Record<string, Metadata>;

export const ArticleCard = ({ path }: { path: string }) => {
  const metadata = useFileMetadata(path);
  return (
    metadata && (
      <article className="post-card">
        <div className="post-meta">
          {metadata.tags && metadata.tags.length > 0 && (
            <span className="tag">{metadata.tags.join(", ")}</span>
          )}
          {metadata.date && <span>{metadata.date}</span>}
          {metadata.readtime && <span>{metadata.readtime}</span>}
        </div>
        <h2>{metadata.title ?? path}</h2>
        {metadata.excerpt && <p>{metadata.excerpt}</p>}
        <Link href={path}>Read More →</Link>
      </article>
    )
  );
};

export const Articles = () => {
  const queryFn = useCallback(
    (filesMetadata: FilesMetadata) =>
      Object.entries(filesMetadata)
        .filter(([, metadata]) => metadata?.tags?.length > 0)
        .map(([path]) => path),
    []
  );
  const results = useMetadataQuery(queryFn);
  const articleCards = useMemo(() => {
    if (!results || !results.result) {
      return null;
    }
    return results.result.map((path:string) => <ArticleCard key={path} path={path} />);
  }, [results]);
  const renderedArticles = useMemo(() => {
    return (
      <section className="posts-grid" style={{ gridColumn: 1 }}>
        {articleCards}
      </section>
    );
  }, [results]);
  return renderedArticles;
};

const Hompage = () => {
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "3rem",
        alignItems: "start",
      }}
    >
      <Articles />

      <aside className="sidebar">
        <h3>Popular Posts</h3>
        <Include filename="/pages/popular_posts.mdx" baseModule={module}/>

        <h3 style={{ marginTop: "2rem" }}>Categories</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <span className="tag" style={{ cursor: "pointer" }}>
            Technology
          </span>
          <span className="tag" style={{ cursor: "pointer" }}>
            Design
          </span>
          <span className="tag" style={{ cursor: "pointer" }}>
            Lifestyle
          </span>
          <span className="tag" style={{ cursor: "pointer" }}>
            Reviews
          </span>
          <span className="tag" style={{ cursor: "pointer" }}>
            Tutorials
          </span>
        </div>
      </aside>
    </main>
  );
};

export default Hompage;
