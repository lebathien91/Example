import Content from "./Contents";
import Sidebar from "./Sidebar";

const Main = ({ children }) => {
  return (
    <main className="main">
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Content> {children}</Content>
        </div>
      </div>
    </main>
  );
};

export default Main;
