import Content from "./Contents";
import Sidebar from "./Sidebar";

const Main = ({ children }) => {
  return (
    <main className="main">
      <Sidebar />
      <Content>{children}</Content>
    </main>
  );
};

export default Main;
