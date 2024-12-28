import { Route, Routes } from "react-router-dom";

import Test from "./pages/Test/Test";
import AdminLayout from "./layouts/AdminLayout";





function App() {

  return (
      <Routes>
        <Route path="/" element={<AdminLayout/>} >
          <Route path="" element={<Test/>} />
        </Route>
      </Routes>
  );
}

export default App;
