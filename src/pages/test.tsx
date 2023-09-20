import React from "react";

const TestPage = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-300">
      <section className="h-20 w-full bg-blue-500">Block 1</section>
      <section className="w-full grow bg-red-500">Block 2</section>
    </div>
  );
};

export default TestPage;
