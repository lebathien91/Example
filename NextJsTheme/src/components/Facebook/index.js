import { FacebookProvider, Comments, CommentsCount } from "react-facebook";
import { DOMAIN, APP_ID_FACEBOOK } from "next.config";

export default function Facebook({ href, isComments, isCommentsCount }) {
  const link = DOMAIN + "/" + href;
  return (
    <FacebookProvider appId={APP_ID_FACEBOOK} language="vi_VN">
      {isComments && <Comments href={link} width="100%" />}
      {isCommentsCount && <CommentsCount href={link} orderBy="reverse_time" />}
    </FacebookProvider>
  );
}
