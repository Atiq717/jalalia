import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Today.css";

// Ensure you import the environment variable correctly
const API_URL = process.env.REACT_APP_API_URL;

export default function Today() {
  const [timetable, setTimetable] = useState({});
  const [nextPrayer, setNextPrayer] = useState("");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    fetchTimetable();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);
    return () => clearInterval(interval);
  }, [timetable]);

  const fetchTimetable = async () => {
    console.log("API URL:", API_URL); // Debug: log the API URL to ensure it's being read correctly

    try {
      const response = await axios.get(API_URL);
      console.log("Fetched data:", response.data); // Debug: log the fetched data
      setTimetable(response.data);
      updateCountdown(response.data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  const updateCountdown = (timetableData = timetable) => {
    if (!timetableData || !timetableData.date) {
      console.log("No timetable data available for countdown update.");
      return;
    }

    const date = timetableData.date;
    const now = moment();
    const prayers = [
      {
        name: "Fajr",
        time: moment(`${date} ${timetableData.fajr}`, "YYYY-MM-DD HH:mm:ss"),
      },
      {
        name: "Dhuhr",
        time: moment(`${date} ${timetableData.dhuhr}`, "YYYY-MM-DD HH:mm:ss"),
      },
      {
        name: "Asr",
        time: moment(`${date} ${timetableData.asr}`, "YYYY-MM-DD HH:mm:ss"),
      },
      {
        name: "Sunset",
        time: moment(`${date} ${timetableData.sunset}`, "YYYY-MM-DD HH:mm:ss"),
      },
      {
        name: "Isha",
        time: moment(`${date} ${timetableData.isha}`, "YYYY-MM-DD HH:mm:ss"),
      },
    ];

    if (timetableData.jummah) {
      prayers.push({
        name: "Jummah",
        time: moment(`${date} ${timetableData.jummah}`, "YYYY-MM-DD HH:mm:ss"),
      });
    }

    if (timetableData.eid1) {
      prayers.push({
        name: "Eid 1",
        time: moment(`${date} ${timetableData.eid1}`, "YYYY-MM-DD HH:mm:ss"),
      });
    }

    if (timetableData.eid2) {
      prayers.push({
        name: "Eid 2",
        time: moment(`${date} ${timetableData.eid2}`, "YYYY-MM-DD HH:mm:ss"),
      });
    }

    for (let i = 0; i < prayers.length; i++) {
      if (now.isBefore(prayers[i].time)) {
        setNextPrayer(prayers[i].name);
        setCountdown(prayers[i].time.diff(now));
        break;
      }
    }
  };

  const formatCountdown = (milliseconds) => {
    const duration = moment.duration(milliseconds);
    return `${String(duration.hours()).padStart(2, "0")}:${String(
      duration.minutes()
    ).padStart(2, "0")}:${String(duration.seconds()).padStart(2, "0")}`;
  };

  return (
    <Container fluid className="app-container d-flex flex-column">
      <Row className="justify-content-center flex-grow-1 w-100 mb-4 scroll-container">
        <h2>
          {" "}
          {timetable.date &&
            moment(timetable.date, "YYYY-MM-DD").format("dddd Do MMMM YYYY")}
        </h2>
        <Col xs={12}>
          {Object.keys(timetable).length > 0 ? (
            <>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Fajr</Card.Title>
                  <Card.Text>
                    Beginning:{" "}
                    {moment(
                      `${timetable.date} ${timetable.fajr}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                    <br />
                    Jammah:{" "}
                    {moment(
                      `${timetable.date} ${timetable.fajr_jamah}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                    <br />
                    Sunrise:{" "}
                    {moment(
                      `${timetable.date} ${timetable.sunrise}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Dhuhr</Card.Title>
                  <Card.Text>
                    Beginning:{" "}
                    {moment(
                      `${timetable.date} ${timetable.dhuhr}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                    <br />
                    Jammah:{" "}
                    {moment(
                      `${timetable.date} ${timetable.dhuhr_jamah}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Asr</Card.Title>
                  <Card.Text>
                    Beginning:{" "}
                    {moment(
                      `${timetable.date} ${timetable.asr}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                    <br />
                    Jammah:{" "}
                    {moment(
                      `${timetable.date} ${timetable.asr_jamah}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Maghrib</Card.Title>
                  <Card.Text>
                    Sunset:{" "}
                    {moment(
                      `${timetable.date} ${timetable.sunset}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                    <br />
                    Jammah:{" "}
                    {moment(
                      `${timetable.date} ${timetable.maghrib_jamah}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Isha</Card.Title>
                  <Card.Text>
                    Beginning:{" "}
                    {moment(
                      `${timetable.date} ${timetable.isha}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                    <br />
                    Jammah:{" "}
                    {moment(
                      `${timetable.date} ${timetable.isha_jamah}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Friday - Jummah</Card.Title>
                  <Card.Text>
                    {moment(
                      `${timetable.date} ${timetable.jummah}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              {timetable.eid1 && (
                <Card className="mb-3 prayer-card">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Card.Title>Early Eid Jammah</Card.Title>
                    <Card.Text>
                      {moment(
                        `${timetable.date} ${timetable.eid1}`,
                        "YYYY-MM-DD HH:mm:ss"
                      ).format("hh:mm A")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
              {timetable.eid2 && (
                <Card className="mb-3 prayer-card">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Card.Title>Late Eid Jammah</Card.Title>
                    <Card.Text>
                      {moment(
                        `${timetable.date} ${timetable.eid2}`,
                        "YYYY-MM-DD HH:mm:ss"
                      ).format("hh:mm A")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <Card.Body>
                <Card.Text className="text-center">Loading...</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <div className="fixed-bottom w-100 p-3 m-0 bg-light">
        <Card className="next-prayer-card mb-3">
          <Card.Body className="text-center">
            <Card.Title>Next Salah</Card.Title>
            <Card.Text className="display-4">{nextPrayer}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="countdown-card">
          <Card.Body className="text-center">
            <Card.Title>Time to {nextPrayer}</Card.Title>
            <Card.Text className="display-4">
              {formatCountdown(countdown)}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
