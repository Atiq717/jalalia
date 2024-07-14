import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
    try {
      const response = await axios.get(
        "http://localhost/jalalia/php/get_timetable.php"
      );
      console.log("Fetched data:", response.data);
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
        name: "Maghrib",
        time: moment(`${date} ${timetableData.maghrib}`, "YYYY-MM-DD HH:mm:ss"),
      },
      {
        name: "Isha",
        time: moment(`${date} ${timetableData.isha}`, "YYYY-MM-DD HH:mm:ss"),
      },
      {
        name: "Jummah",
        time: moment(`${date} ${timetableData.jummah}`, "YYYY-MM-DD HH:mm:ss"),
      },
    ];

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
      <h1 className="text-center mb-4">
        Jalaia Sunni Masjid and Madrasha - Today
      </h1>
      <Row className="justify-content-center flex-grow-1 overflow-auto w-100 mb-4 scroll-container">
        <Col xs={12}>
          {Object.keys(timetable).length > 0 ? (
            <>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Fajr</Card.Title>
                  <Card.Text>
                    {moment(
                      `${timetable.date} ${timetable.fajr}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Dhuhr</Card.Title>
                  <Card.Text>
                    {moment(
                      `${timetable.date} ${timetable.dhuhr}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Asr</Card.Title>
                  <Card.Text>
                    {moment(
                      `${timetable.date} ${timetable.asr}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Maghrib</Card.Title>
                  <Card.Text>
                    {moment(
                      `${timetable.date} ${timetable.maghrib}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Isha</Card.Title>
                  <Card.Text>
                    {moment(
                      `${timetable.date} ${timetable.isha}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 prayer-card">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Title>Jummah</Card.Title>
                  <Card.Text>
                    {moment(
                      `${timetable.date} ${timetable.jummah}`,
                      "YYYY-MM-DD HH:mm:ss"
                    ).format("hh:mm A")}
                  </Card.Text>
                </Card.Body>
              </Card>
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
      <div className="fixed-bottom w-100 p-3 bg-light">
        <Card className="next-prayer-card mb-3">
          <Card.Body className="text-center">
            <Card.Title>Next Salah</Card.Title>
            <Card.Text className="display-4">{nextPrayer}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="countdown-card">
          <Card.Body className="text-center">
            <Card.Title>Time to Salah</Card.Title>
            <Card.Text className="display-4">
              {formatCountdown(countdown)}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
