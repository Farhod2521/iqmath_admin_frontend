import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const backHome = () => {
    navigate("/home/dashboard", { replace: true });
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("notfound")}
      extra={
        <Button type="primary" onClick={backHome}>
          Bosh sahifa
        </Button>
      }
    />
  );
}
export default NotFound;
