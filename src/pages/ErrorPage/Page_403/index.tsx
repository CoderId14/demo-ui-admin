import { Button, Result } from "antd";
import { ResultStatusType } from "antd/lib/result";
import { useNavigate } from "react-router-dom";
import { AppConst } from "@/app-const";

type Props = {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
};

function ErrorPage403({
  status = 403,
  title = "403",
  subTitle = AppConst.PAGE_403_MESSAGE,
}: Props) {
  const navigate = useNavigate();
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={() => navigate(AppConst.HOME_ADMIN_URL)}>
          Go Home
        </Button>
      }
    />
  );
}

export default ErrorPage403;
