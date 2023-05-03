import { Button, Result } from "antd";
import { ResultStatusType } from "antd/lib/result";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppConst } from "@/app-const";

type Props = {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
};

function ErrorPage({
  status = 404,
  title = "404",
  subTitle = AppConst.PAGE_404_MESSAGE,
}: Props) {
  const navigate = useNavigate();
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      }
    />
  );
}

export default ErrorPage;
