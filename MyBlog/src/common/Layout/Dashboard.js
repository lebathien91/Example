import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Dashboard = ({ children }) => {
  return (
    <>
      <Header />

      <Sidebar />
      <Main>{children}</Main>
    </>
  );
};

export default Dashboard;
