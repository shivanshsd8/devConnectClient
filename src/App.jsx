import { BrowserRouter } from "react-router-dom";
import { DevconnectProvider } from "./context/DevconnectContext";
import RoutesWithContext from "./routes/RoutesWithContext";

function App() {

  return (
    <>
      <BrowserRouter>
        <DevconnectProvider>
          <RoutesWithContext />
        </DevconnectProvider>
      </BrowserRouter>
    </>
  )
}

export default App
