import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts and pages
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Create, { createAction } from "./pages/Create";
import Profile from "./pages/Profile";
import GridView, { tasksLoader } from "./pages/Grid";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import UploadForm, { uploadFormAction } from "./pages/UploadForm";
import Patients, { patientsLoader } from "./pages/patients";

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="create" element={<Create />} action={createAction} />
      <Route path="profile" element={<Profile />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="grid" element={<GridView />} loader={tasksLoader} />
      <Route path="patients" element={<Patients />} loader={patientsLoader} />
      <Route
        path="uploadForm"
        element={<UploadForm />}
        action={uploadFormAction}
      />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
