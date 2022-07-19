import React, { useContext } from "react";
import { GlobalContext } from "@/store/GlobalState";
import Loading from "./Loading";
import Toast from "./Toast";
import Modal from "./Modal";

const Notify = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { notify } = state;

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          type="error"
          content={{ title: "Lỗi", msg: notify.error }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
        />
      )}
      {notify.success && (
        <Toast
          type="success"
          content={{ title: "Thành công", msg: notify.success }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
        />
      )}
      {notify.modal && <Modal />}
    </>
  );
};

export default Notify;
