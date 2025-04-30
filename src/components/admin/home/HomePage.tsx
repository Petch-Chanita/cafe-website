import Dashboard from "../dashboard/DashboardCard";

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="z-0">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default HomePage;
