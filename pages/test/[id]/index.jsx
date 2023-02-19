import React from "react";
import { axiosClient } from "../../../libraries/axiosClient";

export default function CategoriyDetails({ category }) {
  return <div>{<h1>{category.name}</h1>}</div>;
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const categories = await axiosClient.get("/categories");

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = categories.map((category) => ({
    params: { id: category._id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const category = await axiosClient(`/categories/${params.id}`);

  // Pass post data to the page via props
  return { props: { category } };
}
