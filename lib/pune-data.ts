// Pune Smart City Project Data
export const puneSmartCityData = {
  city: {
    name: "Pune",
    state: "Maharashtra",
    population: "7,400,000+",
    area: "729 km²",
    mayor: "Murlidhar Mohol",
    commissioner: "Vikram Kumar",
    smartCityMissionStartYear: 2016,
    projectBudget: "₹2,289 Crores",
    completedProjects: 45,
    ongoingProjects: 28,
    upcomingProjects: 15
  },

  areas: [
    { id: 1, name: "Aundh", zone: "North", population: 125000, type: "Residential" },
    { id: 2, name: "Koregaon Park", zone: "Central", population: 89000, type: "Mixed" },
    { id: 3, name: "Kothrud", zone: "West", population: 142000, type: "Residential" },
    { id: 4, name: "Hinjewadi", zone: "West", population: 95000, type: "IT Hub" },
    { id: 5, name: "Hadapsar", zone: "East", population: 178000, type: "Industrial" },
    { id: 6, name: "Wakad", zone: "Northwest", population: 112000, type: "Residential" },
    { id: 7, name: "Baner", zone: "West", population: 98000, type: "Mixed" },
    { id: 8, name: "Shivajinagar", zone: "Central", population: 156000, type: "Commercial" },
    { id: 9, name: "Pimpri", zone: "North", population: 201000, type: "Industrial" },
    { id: 10, name: "Chinchwad", zone: "North", population: 195000, type: "Industrial" }
  ],

  residents: [
    { id: 1, name: "Rajesh Patil", area: "Aundh", contact: "+91 9876543210", registered: "2024-01-15", status: "Active" },
    { id: 2, name: "Priya Deshmukh", area: "Koregaon Park", contact: "+91 9876543211", registered: "2024-02-20", status: "Active" },
    { id: 3, name: "Amit Kulkarni", area: "Kothrud", contact: "+91 9876543212", registered: "2024-03-10", status: "Active" },
    { id: 4, name: "Sneha Joshi", area: "Hinjewadi", contact: "+91 9876543213", registered: "2024-01-25", status: "Active" },
    { id: 5, name: "Vikram Sharma", area: "Hadapsar", contact: "+91 9876543214", registered: "2024-04-05", status: "Active" },
    { id: 6, name: "Meera Rao", area: "Wakad", contact: "+91 9876543215", registered: "2024-02-14", status: "Active" },
    { id: 7, name: "Sandeep Pawar", area: "Baner", contact: "+91 9876543216", registered: "2024-03-20", status: "Active" },
    { id: 8, name: "Anita Deshpande", area: "Shivajinagar", contact: "+91 9876543217", registered: "2024-01-30", status: "Active" }
  ],

  water: {
    dailySupply: "1,450 MLD",
    sources: ["Khadakwasla Dam", "Panshet Dam", "Varasgaon Dam", "Temghar Dam"],
    treatment: {
      capacity: "1,680 MLD",
      plants: [
        { name: "Parvati Water Treatment Plant", capacity: "450 MLD", status: "Operational" },
        { name: "Khadakwasla Treatment Plant", capacity: "380 MLD", status: "Operational" },
        { name: "Bhama Askhed Water Plant", capacity: "850 MLD", status: "Operational" }
      ]
    },
    distribution: {
      pipelines: "5,200 km",
      connections: "485,000+",
      smartMeters: "125,000",
      leakageReduction: "18%"
    },
    consumption: [
      { area: "Aundh", usage: 45, quality: 95, pressure: 85 },
      { area: "Koregaon Park", usage: 38, quality: 96, pressure: 88 },
      { area: "Kothrud", usage: 52, quality: 94, pressure: 82 },
      { area: "Hinjewadi", usage: 41, quality: 95, pressure: 86 },
      { area: "Hadapsar", usage: 58, quality: 93, pressure: 80 }
    ]
  },

  energy: {
    capacity: "2,850 MW",
    totalCapacity: "2,850 MW",
    sources: {
      grid: "65%",
      solar: "20%",
      wind: "10%",
      other: "5%"
    },
    solarProjects: [
      { name: "PMC Rooftop Solar", capacity: "25 MW", status: "Operational", location: "PMC Property", annualGeneration: "35 GWh" },
      { name: "Hinjewadi Solar Park", capacity: "50 MW", status: "Operational", location: "Hinjewadi", annualGeneration: "72 GWh" },
      { name: "Kothrud Solar Installation", capacity: "15 MW", status: "Under Construction", location: "Kothrud", annualGeneration: "21 GWh" }
    ],
    consumption: [
      { area: "Aundh", usage: 180, saved: 45, peakDemand: 220, efficiency: 92 },
      { area: "Koregaon Park", usage: 150, saved: 38, peakDemand: 185, efficiency: 95 },
      { area: "Kothrud", usage: 195, saved: 42, peakDemand: 230, efficiency: 89 },
      { area: "Hinjewadi", usage: 280, saved: 65, peakDemand: 340, efficiency: 91 },
      { area: "Hadapsar", usage: 245, saved: 52, peakDemand: 290, efficiency: 88 }
    ],
    smartMeters: "285,000",
    streetLights: {
      total: "185,000",
      led: "142,000",
      smart: "95,000",
      energySaved: "42%"
    }
  },

  waste: {
    dailyGeneration: "2,100 tonnes",
    segregation: "68%",
    facilities: [
      { name: "Uruli Devachi Processing Plant", capacity: "1000 TPD", type: "Composting" },
      { name: "Phursungi Waste Processing", capacity: "600 TPD", type: "Recycling" },
      { name: "Hadapsar Transfer Station", capacity: "500 TPD", type: "Transfer" }
    ],
    collection: {
      vehicles: 850,
      routes: 420,
      coverage: "95%",
      gpsEnabled: 720
    },
    recycling: {
      plastic: "45%",
      paper: "62%",
      metal: "78%",
      organic: "55%"
    }
  },

  security: {
    cctvCameras: 4500,
    smartPoles: 850,
    commandCenters: 3,
    emergencyResponse: "< 8 minutes",
    policeStations: 45,
    fireStations: 28,
    incidents: [
      { type: "Traffic Violation", count: 245, trend: "down" },
      { type: "Parking Issues", count: 189, trend: "up" },
      { type: "Public Safety", count: 67, trend: "stable" },
      { type: "Emergency Calls", count: 423, trend: "down" }
    ],
    coverage: {
      Aundh: 95,
      "Koregaon Park": 92,
      Kothrud: 88,
      Hinjewadi: 85,
      Hadapsar: 82
    }
  },

  transportation: {
    buses: {
      total: 2850,
      electric: 450,
      routes: 380,
      dailyPassengers: "3.2 million"
    },
    metro: {
      lines: 2,
      stations: 33,
      length: "54.5 km",
      dailyRidership: "450,000"
    },
    smartParking: {
      locations: 85,
      slots: 42000,
      occupancy: "72%"
    },
    trafficSignals: {
      total: 850,
      smart: 420,
      adaptive: 180
    }
  },

  maintenance: [
    { id: 1, type: "Road", location: "FC Road", priority: "High", status: "In Progress", reportedDate: "2026-01-20" },
    { id: 2, type: "Water Pipeline", location: "Aundh", priority: "Critical", status: "Scheduled", reportedDate: "2026-01-25" },
    { id: 3, type: "Street Light", location: "Kothrud", priority: "Medium", status: "Completed", reportedDate: "2026-01-15" },
    { id: 4, type: "Drainage", location: "Hadapsar", priority: "High", status: "In Progress", reportedDate: "2026-01-22" },
    { id: 5, type: "Traffic Signal", location: "Shivajinagar", priority: "Critical", status: "Pending", reportedDate: "2026-01-28" }
  ],

  alerts: [
    { id: 1, type: "critical", title: "High Water Pressure Alert", area: "Kothrud", time: "2 hours ago", description: "Pressure exceeds normal range" },
    { id: 2, type: "warning", title: "Traffic Congestion", area: "FC Road", time: "30 mins ago", description: "Heavy traffic reported" },
    { id: 3, type: "info", title: "Scheduled Maintenance", area: "Aundh", time: "1 hour ago", description: "Water supply maintenance planned" },
    { id: 4, type: "success", title: "Solar Panel Installation Complete", area: "Hinjewadi", time: "3 hours ago", description: "New 15MW capacity added" },
    { id: 5, type: "warning", title: "Waste Collection Delay", area: "Hadapsar", time: "45 mins ago", description: "Vehicle breakdown reported" }
  ],

  payments: [
    { id: 1, resident: "Rajesh Patil", type: "Property Tax", amount: 12500, dueDate: "2026-03-31", status: "Paid" },
    { id: 2, resident: "Priya Deshmukh", type: "Water Bill", amount: 850, dueDate: "2026-02-15", status: "Pending" },
    { id: 3, resident: "Amit Kulkarni", type: "Property Tax", amount: 15200, dueDate: "2026-03-31", status: "Overdue" },
    { id: 4, resident: "Sneha Joshi", type: "Electricity Bill", amount: 3200, dueDate: "2026-02-10", status: "Paid" },
    { id: 5, resident: "Vikram Sharma", type: "Water Bill", amount: 920, dueDate: "2026-02-15", status: "Pending" }
  ],

  projects: [
    {
      id: 1,
      name: "Smart Road Network",
      category: "Infrastructure",
      budget: "₹450 Crores",
      status: "Ongoing",
      progress: 65,
      startDate: "2024-03-15",
      expectedCompletion: "2026-12-31",
      description: "Development of 200 km smart roads with IoT sensors and adaptive traffic management"
    },
    {
      id: 2,
      name: "Integrated Command & Control Center",
      category: "Smart Governance",
      budget: "₹280 Crores",
      status: "Completed",
      progress: 100,
      startDate: "2023-06-01",
      expectedCompletion: "2025-11-30",
      description: "24x7 monitoring and management of city services"
    },
    {
      id: 3,
      name: "Public WiFi Network",
      category: "Digital Connectivity",
      budget: "₹120 Crores",
      status: "Ongoing",
      progress: 78,
      startDate: "2024-01-10",
      expectedCompletion: "2026-06-30",
      description: "Free WiFi hotspots across 500 locations"
    },
    {
      id: 4,
      name: "Smart Water Management",
      category: "Water",
      budget: "₹380 Crores",
      status: "Ongoing",
      progress: 55,
      startDate: "2024-04-20",
      expectedCompletion: "2027-03-31",
      description: "Advanced water distribution system with smart metering"
    },
    {
      id: 5,
      name: "Solar City Initiative",
      category: "Energy",
      budget: "₹320 Crores",
      status: "Ongoing",
      progress: 42,
      startDate: "2024-08-15",
      expectedCompletion: "2027-12-31",
      description: "Installation of solar panels on government buildings and public spaces"
    }
  ],

  environment: {
    airQuality: {
      aqi: 125,
      category: "Moderate",
      pm25: 65,
      pm10: 142
    },
    greenCover: "45%",
    parks: 450,
    trees: "2.5 million",
    waterBodies: 28
  }
};

export type Area = typeof puneSmartCityData.areas[0];
export type Resident = typeof puneSmartCityData.residents[0];
export type MaintenanceItem = typeof puneSmartCityData.maintenance[0];
export type Alert = typeof puneSmartCityData.alerts[0];
export type Payment = typeof puneSmartCityData.payments[0];
export type Project = typeof puneSmartCityData.projects[0];
