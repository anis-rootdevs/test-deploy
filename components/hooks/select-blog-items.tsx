import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface UseFilteredBlogPostsOptions {
  useAPI?: boolean;
  apiUrl?: string;
}

export const useFilteredBlogPosts = (
  initialData: any[] = [],
  { useAPI = false, apiUrl = "/api/posts" }: UseFilteredBlogPostsOptions = {}
) => {
  const [allPosts, setAllPosts] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch from API if enabled
  useEffect(() => {
    if (!useAPI) return;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setAllPosts(Array.isArray(data) ? data : data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setAllPosts(initialData); // Fallback to JSON if API fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [useAPI, apiUrl, initialData]);

  const filterByCategory = (categorySlug: string) => {
    if (!categorySlug || categorySlug.toLowerCase() === "all") {
      return allPosts;
    }

    return allPosts.filter((post) => {
      if (!post.category) return false;
      return post.category.toLowerCase() === categorySlug.toLowerCase();
    });
  };

  return {
    allPosts,
    filterByCategory,
    isLoading,
  };
};
