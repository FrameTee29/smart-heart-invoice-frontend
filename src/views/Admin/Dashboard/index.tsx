import Container from "@/components/Container";
import Dashboard from "@/components/Admin/Dashboard";
import MainLayout from "@/components/Layout/MainLayout";
import AdminNavbar from "@/components/Admin/AdminNavbar";
import PermissionLayout from "@/components/Layout/PermissionLayout";

const DashboardPage = () => {
  return (
    <MainLayout>
      <PermissionLayout>
        <Container>
          <div className="text-4xl font-bold">Dashboard</div>
          <div className="mt-6 mb-12 flex w-full justify-end">
            <AdminNavbar />
          </div>

          <Dashboard />
        </Container>
      </PermissionLayout>
    </MainLayout>
  );
};

export default DashboardPage;
