import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LocationDetail() {
  const router = useRouter();
  const id = router.query.index;
  useEffect(() => {
    console.log(id);
  }, []);
  return <div>LocationDetail</div>;
}
