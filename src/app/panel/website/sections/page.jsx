import React from "react";
import EmptyPage from "../../../../components/EmptyPage";
import Input from "../../../../components/dashboard/Input";
function page() {
  return (
    <EmptyPage buttonTitle={"Create Section"} title={"Create Section"}>
      <Input label="Name" placeholder="name" />
    </EmptyPage>
  );
}

export default page;
