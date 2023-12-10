import Container from "@/components/Container";
import MainLayout from "@/components/Layout/MainLayout";
import PermissionLayout from "@/components/Layout/PermissionLayout";
import ChainlinkDashboard from "@/components/Admin/ChainlinkDashboard";

const ChainlinkPage = () => {
  return (
    <MainLayout>
      <PermissionLayout>
        <Container>
          <ChainlinkDashboard />
        </Container>
      </PermissionLayout>
    </MainLayout>
  );
};

export default ChainlinkPage;
