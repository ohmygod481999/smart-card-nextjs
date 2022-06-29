// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: any;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log(req.cookies);

    res.status(200).json({ name: "data" });
}
