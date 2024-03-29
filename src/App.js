import { useSearchParams, Routes, Route } from "react-router-dom";
import Resume from "./Resume";

export default function App() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const lang = searchParams.get("lang") || "";
  return (
      <Routes>
        <Route path="/" element={<Resume lang={lang} />} />
      </Routes>
  );
}
