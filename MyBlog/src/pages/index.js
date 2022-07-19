import HomePage from "@/Pages/Home";

export default function Home({ data }) {
  return <HomePage data={data} />;
}

export async function getServerSideProps() {
  return {
    props: {
      data: "HomePage",
    },
  };
}
