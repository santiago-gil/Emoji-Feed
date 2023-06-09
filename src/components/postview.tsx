import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
dayjs.extend(relativeTime);

/**
 * Rather than define the type, it's what getAll responds
 */
type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div
      key={post.id}
      className=" flex gap-3 border-y border-neutral-500 p-4"
    >
      <Image
        src={author?.profileImageUrl}
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
        alt={`${author.username}'s profile picture`}
      />
      <div className="flex flex-col">
        <div className="flex text-neutral-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username}`}</span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">
              &nbsp;{`· ${dayjs(post.createdAt).fromNow()}`}
            </span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};
