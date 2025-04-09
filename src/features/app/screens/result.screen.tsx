import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { authAxios } from "../../../utils/axios";

const ResultScreen = () => {
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await authAxios.get(`/test/result/${id}`).then((res) => {
          console.log(res.data.result);
        });
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  return <div>ResultScreen</div>;
};

export default ResultScreen;
