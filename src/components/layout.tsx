/* eslint-disable @typescript-eslint/no-misused-promises */
import { PropsWithChildren } from "react";
import Header from "./header";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen w-full flex-col">
      <Header />
      <div className="m-auto flex w-full flex-1 flex-col border-x  border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};
