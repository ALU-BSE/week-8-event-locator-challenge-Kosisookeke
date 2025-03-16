// js/data.js

// Load event data from localStorage or initialize with default data
window.eventData = JSON.parse(localStorage.getItem('events')) || [
    {
      id: 1,
      name: "Concert Night",
      date: "2023-11-15",
      location: "New York City",
      category: "music",
      description: "Join us for an unforgettable night of live music!"
    },
    {
      id: 2,
      name: "Marathon Run",
      date: "2023-11-20",
      location: "Los Angeles",
      category: "sports",
      description: "Participate in the annual city marathon."
    }
  ];
  
  // Function to generate unique IDs
  function generateUniqueId() {
    return window.eventData.length > 0 ? Math.max(...window.eventData.map(event => event.id)) + 1 : 1;
  }