import { useState, useRef, useEffect } from "react";
import { checkImage, imageUpload } from "@/utils/imageUpload";
const Editor = () => {
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
          const file = await loader.file;
          const check = checkImage(file);

          if (check) console.log(check);

          const image = await imageUpload(file);

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
            console.log(data);
          }}
        />
      ) : (
        <div>Editor Loadding... </div>
      )}
    </div>
  );
};

export default Editor;
