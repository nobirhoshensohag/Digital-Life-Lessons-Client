import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const usePremium = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    axiosInstance.get(`/users?email=${user.email}`).then((res) => {
      setIsPremium(res.data[0]?.isPremium || false);
    });
  }, [user?.email]);

  return isPremium;
};

export default usePremium;