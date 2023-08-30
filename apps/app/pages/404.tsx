import React from "react";

import Link from "next/link";
import Image from "next/image";

// layouts
import DefaultLayout from "layouts/default-layout";
// ui
import { SecondaryButton } from "components/ui";
// images
import Image404 from "public/404.svg";
// types
import type { NextPage } from "next";

const PageNotFound: NextPage = () => (
  <DefaultLayout>
    <div className="grid h-full place-items-center p-4">
      <div className="space-y-8 text-center">
        <div className="relative mx-auto h-60 w-60 lg:h-80 lg:w-80">
          <Image src={Image404} layout="fill" alt="404- Page not found" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">哎呀！出错了</h3>
          <p className="text-sm text-custom-text-200">
            抱歉，找不到您要查找的页面。该页面可能已被删除、更改名称或暂时不可用。
          </p>
        </div>
        <Link href="/">
          <a className="block">
            <SecondaryButton size="md">返回首页</SecondaryButton>
          </a>
        </Link>
      </div>
    </div>
  </DefaultLayout>
);

export default PageNotFound;
