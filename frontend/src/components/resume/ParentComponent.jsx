import React from "react";
import ModernTemplate from "./ModernTemplate";
import CreativeTemplate from "./CreativeTemplate";
import MedicalTemplate from "./MedicalTemplate";

const ParentComponent = ({ data, selectedTemplate }) => {
  return (
    <div>
      {data && selectedTemplate === 'modern' && <ModernTemplate data={data} />}
      {data && selectedTemplate === 'creative' && <CreativeTemplate data={data} />}
      {data && selectedTemplate === 'medical' && <MedicalTemplate data={data} />}
    </div>
  );
};

export default ParentComponent;