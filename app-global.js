// 1. Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4sMo_6YSgCdAoz3tCUeVmT84lUod9U4w",
  authDomain: "karyakram-db.firebaseapp.com",
  databaseURL: "https://karyakram-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "karyakram-db",
  storageBucket: "karyakram-db.firebasestorage.app",
  messagingSenderId: "757487909660",
  appId: "1:757487909660:web:40f023d513c699f34cd8d9",
  measurementId: "G-FHVRHWB1HJ"
};

// Initialize the app and database
initializeApp(firebaseConfig);
const db = getDatabase();

// 2. Tab Navigation Logic
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// 3. Dynamic Rows Logic
function addRow(tableId, colCount) {
    let table = document.getElementById(tableId);
    let row = table.insertRow(-1);
    for (let i = 0; i < colCount; i++) {
        let cell = row.insertCell(i);
        let input = document.createElement("input");
        
        if (tableId === 'taskTable' && i === 2) input.type = "date";
        else if ((tableId === 'incomeTable' || tableId === 'expenseTable') && i === 2) input.type = "number";
        else input.type = "text";
        
        input.className = "cell-input";
        cell.appendChild(input);
    }
}

// 4. Cloud Save Logic
function saveData() {
    window.saveData = saveData;
    let eventNameVal = document.getElementById('eventName').value;
    
    // Quick check to make sure they typed at least the name
    if (!eventNameVal) {
        alert("कृपया कम से कम कार्यक्रम का नाम दर्ज करें! (Please enter event name)");
        return;
    }

    let eventData = {
        eventName: eventNameVal,
        eventDate: document.getElementById('eventDate').value || "",
        eventLocation: document.getElementById('eventLocation').value || "",
        eventVenue: document.getElementById('eventVenue').value || "",
        eventAttendance: document.getElementById('eventAttendance').value || "",
        timestamp: new Date().toISOString()
    };

    // Push the data
  console.log
    db.ref('karyakram_events').push(eventData)
      .then(() => {
          console.log
          alert("डेटा सफलतापूर्वक क्लाउड पर सुरक्षित कर लिया गया है! (Saved to Cloud)");
          document.getElementById('eventName').value = "";
          document.getElementById('eventDate').value = "";
          document.getElementById('eventLocation').value = "";
          document.getElementById('eventVenue').value = "";
          document.getElementById('eventAttendance').value = "";
      })
      .catch((error) => {
          alert("Error: " + error.message);
      });
}

// 5. Offline Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered'))
            .catch(err => console.log('SW Failed', err));
    });
}

