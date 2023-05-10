import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NowDetail() {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    console.log(id);
  }, []);
  return <div>NowDetail</div>;
}
