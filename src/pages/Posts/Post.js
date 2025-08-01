import React from "react";

import styles from "./Post.module.css";
import { useParams } from "react-router-dom";

import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument("posts", id);
  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title}></img>
          <p>{post.body}</p>
          <h3>Este poste trata sobre:</h3>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
