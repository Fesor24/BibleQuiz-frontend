import Home from "./pages/Home";
import Category from "./pages/Category";
import ThousandQuestions from "./pages/ThousandQuestions";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import RevisionQuestions from "./pages/RevisionQuestions";
import FesorQuestions from "./pages/FesorQuestions";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
// import Admin from "./pages/Admin";
import ThousandQSourceMessage from "./pages/ThousandQSourceMessage";
import FesorSourceMessage from "./pages/FesorSourceMessage";

function App() {
  // const ThousandQuestionsWithAuth = RequireAuth(ThousandQuestions);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="fesor-questions" element={<FesorQuestions />} />
        <Route path="fq-source" element={<FesorSourceMessage />} />
        <Route path="revise-questions" element={<RevisionQuestions />} />
        <Route path="thousand-questions" element={<ThousandQuestions />} />
        <Route path= "tq-source" element= {<ThousandQSourceMessage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="admin" element={<Admin/>}/> */}
      </Routes>
    </BrowserRouter>
  );

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/category",
  //     element: <Category />,
  //   },
  //   {
  //     path: "/thousand-questions",
  //     element: <ThousandQuestions />,
  //   },
  //   {
  //     path: "/revise-questions",
  //     element: <RevisionQuestions />
  //   },
  //   {
  //     path: "/fesor-questions",
  //     element: <FesorQuestions/>
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />
  //   }
  // ]);

  // return (
  //   <>
  //     <RouterProvider router={router} />
  //   </>
  // );
}

export default App;
