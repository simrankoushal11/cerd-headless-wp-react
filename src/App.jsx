import { Route, Router, Routes } from "react-router";
import "./App.css";
import TicketsAdd from "./components/TicketsAdd";
import TicketsLIst from "./components/TicketsLIst";
import TicketDetail from "./components/TicketDetail";
import TicketEdit from "./components/TicketEdit";

function App() {
  return (
    <>
      <div className="bg-image">
        <Routes>
          <Route path="/" element={<TicketsLIst />} />
          <Route path="/add" element={<TicketsAdd />} />
          <Route path="/edit/:id" element={<TicketEdit />} />
          <Route path="/detail/:id" element={<TicketDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
