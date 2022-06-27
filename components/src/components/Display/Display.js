import React, { useContext } from "react";
import { GlobalContext } from "@/store/GlobalState";
import Loading from "./Loading";
import Toast from "./Toast";

const Display = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { notify } = state;

  return (
    <>
      {notify.loading && <Loading />}

      <Toast content={{ title: "error", msg: notify.error }} />
    </>
  );
};

export default Display;
