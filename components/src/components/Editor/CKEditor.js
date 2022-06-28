import { useState, useRef, useEffect, useContext } from "react";

import { GlobalContext } from "@/store/GlobalState";
import { checkImage, uploadImage } from "@/utils/uploadImage";

const Editor = ({ setBody }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const editorRef = useRef();
  const [editorLoader, setEdiorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    setEdiorLoaded(true);
  }, []);

  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const uploadAdapter = (loader) => {
    return {
      upload: async () => {
        try {
          dispatch({ type: "NOTIFY", payload: { loading: true } });
          const file = await loader.file;

          const check = checkImage(file);
          console.log(check);
          if (check)
            return dispatch({ type: "NOTIFY", payload: { error: check } });

          const image = await uploadImage(file);

          dispatch({ type: "NOTIFY", payload: {} });

          return {
            default: image.url,
          };
        } catch (error) {
          console.log({ error: error.message });
          return {
            default: "/imageUrlDefault.jpg",
          };
        }
      },
    };
  };

  const uploadPlugin = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  };

  return (
    <div>
      {editorLoader ? (
        <CKEditor
          config={{
            extraPlugins: [uploadPlugin],
          }}
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBody(data);
          }}
        />
      ) : (
        <div>Editor Loadding... </div>
      )}
    </div>
  );
};

export default Editor;
