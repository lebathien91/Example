import { useState } from "react";

import Layout from "@/components/Layout";
import Editor from "@/components/Editor";

export default function Home() {
  const [body, setBody] = useState();
  return (
    <Layout>
      <Editor setBody={setBody} />
      <div className="content" dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  );
}
