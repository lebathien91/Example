import { useContext } from "react";

import Widget from "./Widget";
import SelectionBox from "./SelectionBox";
import Image from "@Images";

import { GlobalContext } from "@pages/_app";
import styles from "@styles/Sidebar.module.css";
const Sidebar = ({ selection }) => {
  const { global } = useContext(GlobalContext);
  const { defaultSeo, favicon } = global;
  const aboutMe = defaultSeo.metaDescription;

  return (
    <aside className={styles.sidebar}>
      <Widget title="Về tôi">
        <figure className="img-fluid">
          <Image image={favicon} width={700} height={700} alt="avatar" />
        </figure>
        <p>{aboutMe}</p>
      </Widget>
      <SelectionBox articles={selection} />
    </aside>
  );
};

export default Sidebar;
