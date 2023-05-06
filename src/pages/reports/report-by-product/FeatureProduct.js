import { useEffect } from "react";
import { getFeature } from "../../../apis/report.api";

export const FeatureProduct = () => {
  const getFeatureProduct = async () => {
    const res = await getFeature();
    console.log("====res", res);
  };
  useEffect(() => {
    getFeatureProduct();
  }, []);
  return <div>FeatureProduct</div>;
};
