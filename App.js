import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Today from "./src/components/Today";
import AppNavigation from "./src/components/AppNavigation";

export default function App() {
  return (
    // <Container fluid className="app-container d-flex flex-column">
    <AppNavigation />
    // </Container>
  );
}
