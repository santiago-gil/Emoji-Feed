import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import { PageLayOut } from "~/components/layout";
import Image from "next/image";
import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postview";

export const generateSSGHelper = () =>
    createProxySSGHelpers({
        router: appRouter,
        ctx: { prisma, userId: null },
        transformer: superjson, // optional - adds superjson serialization
    });

    