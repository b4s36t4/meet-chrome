import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import './Popup.css';
const Popup = () => {
  const [isTokenSave, setIsTokenSave] = useState()
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [sendUpdates, setSendUpdates] = useState(false);
  const [remindMinutes, setRemindMinutes] = useState(10)
  const [meetTitle, setMeetTitle] = useState("")
  const [error, setError] = useState(false)
  const [gmeetLink, setGMeetLink] = useState("");
  useEffect(() => {
    if (window) {
      const item = window.localStorage.getItem("token")
      if (item) {
        setIsTokenSave(true)
      }
    }
  }, [])
  const logOut = async () => {
    const token = localStorage.getItem("token")
    chrome.identity.removeCachedAuthToken({ token: token }, () => {
      localStorage.clear()
      window && window.location.reload()
    })
  }

  const random = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    return r
  }
  const createEvent = async () => {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      if (startTime === endTime || !meetTitle) return;
      const url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1"
      const body = {
        "start": {
          "dateTime": new Date(startTime).toISOString(),
          "timeZone": "Asia/Kolkata"
        },
        "end": {
          "dateTime": new Date(endTime).toISOString(),
          "timeZone": "Asia/Kolkata"
        },
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: { "type": "hangoutsMeet" },
            requestId: random()
          }
        },
        "guestsCanSeeOtherGuests": false,
        "reminders": {
          useDefault: false,
          overrides: [
            { "method": "popup", minutes: remindMinutes }
          ]
        },
        summary: meetTitle
      }
      try {
        const req = await axios.post(url, JSON.stringify(body), { headers: { "Authorization": `Bearer ${token}` } })
        console.log(req)
        if (req.status === 200) {
          const meetLink = req.data?.hangoutLink
          setGMeetLink(meetLink)
        }
      }
      catch (e) {
        console.log(e)
        setError(true);
        // logOut()
      }
    })
  }
  return (
    <div >
      {error && <p>There's been error, please log-out and login again to try again.</p>}
      {isTokenSave ?
        <div className='container'>
          {gmeetLink &&
            <div style={{ marginBottom: 20 }}>
              <p>Create New Meet Link</p>
              <pre style={{ fontWeight: "bold" }}>{gmeetLink}</pre>
            </div>}
          <h1>Create Your Meet Here</h1>
          <div style={{ marginTop: 20 }}>
            <input placeholder='Enter Meet Title' onChange={(e) => setMeetTitle(e.target.value)} className={"input"} />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginTop: 20, width: "100%" }}>
              <p>Start Time</p>
              <DateTimePicker clearIcon={null} minDate={new Date()} amPmAriaLabel={"AM/PM"}
                onChange={(e) => setStartTime(e)} value={startTime} />
            </div>
            <div style={{ marginTop: 20, width: "100%" }}>
              <p>End Time</p>
              <DateTimePicker required clearIcon={null} minDate={new Date()} amPmAriaLabel={"AM/PM"}
                onChange={(e) => setEndTime(e)} value={endTime} />
            </div>
          </div>
          <p style={{ marginTop: 10 }}>Time is 24 hour format</p>

          <div style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
            <input type={"checkbox"} onChange={() => setSendUpdates(!sendUpdates)} placeholder="Send Updates" />
            <p>Send Updates?</p>
          </div>
          <div>
            <p>Remind before in minutes</p>
            <input className='input' placeholder='remind before?' value={remindMinutes} onChange={(e) => setRemindMinutes(e.target.value)} type={"number"} max={40320} min={0} />
          </div>
          <div style={{ marginTop: 20 }}>
            <button onClick={createEvent} className='create_meet'>Create Meet</button>
          </div>
          <div style={{ marginTop: 20 }}>
            <button onClick={logOut} className='create_meet'>Log Out</button>
          </div>
        </div>
        : <button id="connect" className='create_meet' style={{ margin: "auto" }}>Connect your Google Account</button>}
    </div >
  );
};

export default Popup;
