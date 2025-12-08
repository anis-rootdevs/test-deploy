const TestPage = async () => {
  const posts = await fetch("http://localhost:3000/posts", {
    cache: "force-cache",
    next: { revalidate: 30 },
  });
  const data = await posts.json();
  console.log(data, "data");
  return <div>{data?.length}</div>;
};

export default TestPage;
