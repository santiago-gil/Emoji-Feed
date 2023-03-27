import { type PropsWithChildren } from "react";

export const PageLayOut = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="custom-scrollbar h-full w-full overflow-y-auto border-x border-neutral-500 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};
