import { Route, BrowserRouter, Routes } from "react-router-dom";
import GeneratedTeamPage from "./pages/GeneratedTeamPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<GeneratedTeamPage />} />

        {/* Catch-All Route for 404 */}
        {/* <Route
          path="*"
          element={
            <h2 className="text-center text-red-500">404 - Page Not Found</h2>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
