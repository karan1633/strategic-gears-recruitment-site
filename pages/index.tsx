import { useEffect } from "react";
import { get_access_token } from "@/store/slices/token-slice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();

  const { token } = useSelector(get_access_token);

  useEffect(() => {
    if (token !== "") {
      router.push("/candidates");
    } else {
      router.push("/login");
    }
  }, []);

  return <></>;
}
