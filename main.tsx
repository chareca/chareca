import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import DemoOne from "./demo"
import "./styles/globals.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DemoOne />
  </StrictMode>,
)
