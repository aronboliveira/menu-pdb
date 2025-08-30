import { useEffect, useState } from "react";

export default function useMount(): boolean {
  const [isMounted, setMount] = useState<boolean>(false);
  useEffect(() => setMount(true), []);
  return isMounted;
}
