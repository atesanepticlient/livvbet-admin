import React from "react";
import Details from "./details";
type Params = Promise<{ id: string }>;
const AgentProfile = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return (
    <div>
      <Details id={id} />
    </div>
  );
};

export default AgentProfile;
