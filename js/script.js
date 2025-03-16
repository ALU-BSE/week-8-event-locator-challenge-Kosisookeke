document.addEventListener('DOMContentLoaded', () => {
    // Load event data
    let events = window.eventData;
  
    // Handle event creation on index.html
    document.getElementById('createEventForm')?.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Get form values
      const name = document.getElementById('eventName').value.trim();
      const date = document.getElementById('eventDate').value;
      const location = document.getElementById('eventLocation').value.trim();
      const category = document.getElementById('eventCategory').value;
      const description = document.getElementById('eventDescription').value.trim();
  
      // Validate inputs
      if (!name || !date || !location || !category || !description) {
        alert("Please fill in all fields.");
        return;
      }
  
      // Create new event object
      const newEvent = {
        id: generateUniqueId(),
        name,
        date,
        location,
        category,
        description
      };
  
      // Add new event to eventData
      window.eventData.push(newEvent);
  
      // Save updated eventData to localStorage
      localStorage.setItem('events', JSON.stringify(window.eventData));
  
      // Display success message
      const successMessage = document.getElementById('successMessage');
      successMessage.classList.remove('d-none');
  
      // Clear the form
      document.getElementById('createEventForm').reset();
  
      // Optionally, redirect to events.html after a delay
      setTimeout(() => {
        window.location.href = 'events.html';
      }, 2000); // Redirect after 2 seconds
    });
  
    // Populate event list on events.html
    function populateEventList() {
      // Load event data from localStorage
      const eventData = JSON.parse(localStorage.getItem('events')) || [];
  
      console.log('Loaded event data:', eventData); // Debug log
  
      const eventList = document.getElementById('eventList');
      const noEventsMessage = document.getElementById('noEventsMessage');
  
      if (!eventList) {
        console.error('Element with id "eventList" not found.');
        return;
      }
  
      if (!noEventsMessage) {
        console.error('Element with id "noEventsMessage" not found.');
        return;
      }
  
      // Clear existing content
      eventList.innerHTML = '';
  
      if (eventData.length === 0) {
        // Show no events message if no events exist
        noEventsMessage.classList.remove('d-none');
        return;
      }
  
      // Hide no events message if events exist
      noEventsMessage.classList.add('d-none');
  
      // Generate event cards
      eventData.forEach(event => {
        console.log('Processing event:', event); // Debug log
  
        const card = `
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        `;
        eventList.innerHTML += card;
      });
  
      console.log('Event list populated.'); // Debug log
    }
  
    // Call the function if we're on the events.html page
    if (window.location.pathname.includes('events.html')) {
      populateEventList();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Populate event list on events.html
    function populateEventList(filteredEvents = null) {
      // Load event data from localStorage
      const eventData = JSON.parse(localStorage.getItem('events')) || [];
  
      console.log('Loaded event data:', eventData); // Debug log
  
      const eventList = document.getElementById('eventList');
      const noEventsMessage = document.getElementById('noEventsMessage');
  
      if (!eventList || !noEventsMessage) {
        console.error('Required elements not found in the DOM.');
        return;
      }
  
      // Use filteredEvents if provided, otherwise use all events
      const eventsToShow = filteredEvents || eventData;
  
      // Clear existing content
      eventList.innerHTML = '';
  
      if (eventsToShow.length === 0) {
        // Show no events message if no events match the filter
        noEventsMessage.classList.remove('d-none');
        return;
      }
  
      // Hide no events message if events exist
      noEventsMessage.classList.add('d-none');
  
      // Generate event cards
      eventsToShow.forEach(event => {
        const card = `
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        `;
        eventList.innerHTML += card;
      });
  
      console.log('Event list populated.'); // Debug log
    }
  
    // Filter events based on date and category
    function filterEvents() {
      const dateFilter = document.getElementById('dateFilter').value;
      const categoryFilter = document.getElementById('categoryFilter').value;
  
      // Load event data from localStorage
      const eventData = JSON.parse(localStorage.getItem('events')) || [];
  
      // Apply filters
      const filteredEvents = eventData.filter(event => {
        const matchesDate = !dateFilter || event.date === dateFilter;
        const matchesCategory = !categoryFilter || event.category === categoryFilter;
        return matchesDate && matchesCategory;
      });
  
      // Repopulate the event list with filtered results
      populateEventList(filteredEvents);
    }
  
    // Initial population of events
    if (window.location.pathname.includes('events.html')) {
      populateEventList();
  
      // Add event listeners for filters
      document.getElementById('dateFilter')?.addEventListener('change', filterEvents);
      document.getElementById('categoryFilter')?.addEventListener('change', filterEvents);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Populate event details on event-details.html
    if (window.location.pathname.includes('event-details.html')) {
      // Load event data from localStorage
      const eventData = JSON.parse(localStorage.getItem('events')) || [];
  
      // Get the event ID from the URL query string
      const urlParams = new URLSearchParams(window.location.search);
      const eventId = parseInt(urlParams.get('id'));
  
      // Find the event with the matching ID
      const event = eventData.find(e => e.id === eventId);
  
      const eventDetailsDiv = document.getElementById('eventDetails');
      const noEventMessageDiv = document.getElementById('noEventMessage');
  
      if (!event) {
        // Show "No event found" message if the event doesn't exist
        noEventMessageDiv.classList.remove('d-none');
        return;
      }
  
      // Hide "No event found" message
      noEventMessageDiv.classList.add('d-none');
  
      // Populate event details
      eventDetailsDiv.innerHTML = `
        <img src="https://picsum.photos/150" class="card-img-top" alt="${event.name}">
        <div class="card-body">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text"><strong>Date:</strong> ${event.date}</p>
          <p class="card-text"><strong>Location:</strong> ${event.location}</p>
          <p class="card-text"><strong>Category:</strong> ${event.category}</p>
          <p class="card-text">${event.description}</p>
          <a href="events.html" class="btn btn-secondary">Back to Events</a>
        </div>
      `;
      eventDetailsDiv.classList.remove('d-none');
    }
  });