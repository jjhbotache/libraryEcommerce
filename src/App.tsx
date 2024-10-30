import { RouterProvider } from "react-router-dom"
import { router } from "./router/Router"
import { Bounce, ToastContainer } from 'react-toastify';

function App() {

  return <>
    <ToastContainer
  position="bottom-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  transition={Bounce}
  >
  </ToastContainer>
    <RouterProvider router={router}/>
  </>
}

export default App
