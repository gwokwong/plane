import type { NextApiRequest, NextApiResponse } from "next";

// jitsu
import { createClient } from "@jitsu/nextjs";
import { convertCookieStringToObject } from "lib/cookie";

const jitsu = createClient({
  key: process.env.TRACKER_ACCESS_KEY || "",
  tracking_host: "https://t.jitsu.com",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventName, user, extra } = req.body;

  if (!eventName) {
    return res.status(400).json({ message: "错误请求" });
  }

  if (!user) return res.status(401).json({ message: "未经授权" });

  // TODO: cache user info

  jitsu
    .id({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      display_name: user?.display_name,
    })
    .then(() => {
      jitsu.track(eventName, {
        ...extra,
      });
    });

  res.status(200).json({ message: "成功" });
}
