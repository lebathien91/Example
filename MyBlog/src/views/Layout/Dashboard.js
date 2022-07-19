import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard">
      <Header />
      <div className="flex">
        <Sidebar />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Dashboard;
