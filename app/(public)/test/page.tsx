"use client";

import { Button } from "@/components/ui/button";
import useStore from "@/store/useStore";
import useUserProfile from "@/store/useUserProfile";
import Link from "next/link";

const TestPage = () => {
  const { count, increment } = useStore();
  const { userData } = useUserProfile();
  console.log("test data", userData);

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-16">
      <h1>using for texting purpose</h1>
      <h2>count : {count}</h2>
      <Button onClick={increment}>Increment</Button>

      <h1 className="my-1 font-semibold">
        Login User Name : {userData?.data?.name}
      </h1>
      <h1 className="my-1 font-semibold">
        Login User Email : {userData?.data?.email}
      </h1>
      <Link href={`/admin/dashboard`}>
        <Button className="mt-5 cursor-pointer">Go To Dashboard</Button>
      </Link>
    </div>
  );
};

export default TestPage;
