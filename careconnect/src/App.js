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
import { uploadFormAction } from "./pages/DocumentUploadForm";
import Patients, { patientsLoader } from "./pages/patients";
import ChatBox from "./pages/ChatBox";
import DocumentForm from "./pages/DocumentUploadForm";
import ViewReport, { reportLoader } from "./pages/ViewReport";
import TestUpload from "./pages/testUpload";

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="create" element={<Create />} action={createAction} />
      <Route path="profile" element={<Profile />} />
      <Route path="signup" element={<Signup />} />
      <Route path="testUpload" element={<TestUpload />} />
      <Route path="login" element={<Login />} />
      <Route path="chatbox" element={<ChatBox />} />
      <Route path="grid" element={<GridView />} loader={tasksLoader} />
      <Route path="patients" element={<Patients />} loader={patientsLoader} />
      <Route
        path="uploadform"
        element={<DocumentForm />}
        action={uploadFormAction}
      />
      <Route path="report" element={<ViewReport />} loader={reportLoader} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
