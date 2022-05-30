import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/libs/api";
import { useRouter } from "next/router";
import Editor from "@/components/Editor";

export default function NewDisease() {
  const router = useRouter();
  const [diseaseForm, setdiseaseForm] = useState({
    name: "",
    description: "",
    body: "",
  });

  const { name, description, body } = diseaseForm;

  const handeInput = (event) =>
    setdiseaseForm({
      ...diseaseForm,
      [event.target.name]: event.target.value,
      body: data,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify(diseaseForm),
    };
    try {
      const response = await fetchAPI(
        "http://localhost:5000/diseases/create",
        options
      );

      if (response.success) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const [data, setData] = useState();

  return (
    <Layout>
      <h2>Tạo mới Diseases</h2>
      <div className="table-responsive">
        <form>
          <div className="form-floating">
            <input
              type="name"
              className="form-control mb-3"
              name="name"
              id="floatingName"
              placeholder="kuchuoi"
              value={name}
              onChange={handeInput}
            />
            <label htmlFor="floatingName">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="description"
              id="floatingDescription"
              placeholder="description"
              value={description}
              onChange={handeInput}
            />
            <label htmlFor="floatingDescription">Description</label>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="floatingBody">
              Body
            </label>
            <Editor
              name="body"
              onChange={(data) => {
                setData(data);
              }}
              editorLoaded={editorLoaded}
            />
            {JSON.stringify(data)}
          </div>

          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Tạo bài mới
          </button>
        </form>
      </div>
    </Layout>
  );
}
