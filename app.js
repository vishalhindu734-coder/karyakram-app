// Tab Navigation
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

// Add dynamic rows to tables
function addRow(tableId, colCount) {
    let table = document.getElementById(tableId);
    let row = table.insertRow(-1);
    for (let i = 0; i < colCount; i++) {
        let cell = row.insertCell(i);
        let input = document.createElement("input");
        
        // Handle specific inputs like dates/numbers if needed
        if (tableId === 'taskTable' && i === 2) input.type = "date";
        else if ((tableId === 'incomeTable' || tableId === 'expenseTable') && i === 2) input.type = "number";
        else input.type = "text";
        
        input.className = "cell-input";
        cell.appendChild(input);
    }
}

// Simple Offline Save logic using LocalStorage
function saveData() {
    // In a real PWA, you would iterate through inputs and save to LocalStorage or IndexedDB
    let overviewData = {
        eventName: document.getElementById('eventName').value,
        eventLocation: document.getElementById('eventLocation').value
    };
    localStorage.setItem('rss_event_data', JSON.stringify(overviewData));
    alert("डेटा सफलतापूर्वक सुरक्षित कर लिया गया है! (Data Saved Offline)");
}

// Register Service Worker for Offline PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Failed', err));
    });
}

