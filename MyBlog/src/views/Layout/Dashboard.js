import Header from "./Header";
import Main from "./Main";

const Dashboard = ({ children }) => {
  return (
    <div className="Dashboard">
      <Header />
      <Main>{children}</Main>
    </div>
  );
};

export default Dashboard;
