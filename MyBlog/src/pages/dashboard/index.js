import DashboardPage from "@/Pages/Dashboard";

const Dashboard = ({ data }) => {
  return <DashboardPage data={data} />;
};

export default Dashboard;

export async function getServerSideProps() {
  return {
    props: {
      data: "DashboardPage",
    },
  };
}
