import Button from "../../components/Button";
import LogoutButton from "../../components/LogoutButton";

function CompanyHeader() {
  return (
    <>
      <Button to="/company/info" variation="primary">
        <span>info</span>
      </Button>
      <Button to="/company/create" variation="primary">
        <span className="flex items-center justify-between space-x-1">
          create
        </span>
      </Button>
      <LogoutButton />
    </>
  );
}

export default CompanyHeader;
