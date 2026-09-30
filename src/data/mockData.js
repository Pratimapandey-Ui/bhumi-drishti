export const RISK_LEVELS = {
  LOW: { label: 'LOW', min: 0, max: 30, color: '#10B981', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  MEDIUM: { label: 'MEDIUM', min: 31, max: 60, color: '#F59E0B', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  HIGH: { label: 'HIGH', min: 61, max: 80, color: '#F97316', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  CRITICAL: { label: 'CRITICAL', min: 81, max: 100, color: '#EF4444', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
};

export const getRiskMeta = (score) => {
  if (score <= 30) return RISK_LEVELS.LOW;
  if (score <= 60) return RISK_LEVELS.MEDIUM;
  if (score <= 80) return RISK_LEVELS.HIGH;
  return RISK_LEVELS.CRITICAL;
};

export const MOCK_PROJECTS = [
  {
    projectId: "P001",
    projectName: "Delhi–Mumbai Expressway Expansion (Pkg-IV)",
    type: "Highway & Expressway",
    state: "Haryana",
    district: "Faridabad",
    landArea: "Sector 75A – Parcel P-104",
    totalAreaAcres: 142.5,
    affectedFamilies: 380,
    acquisitionStage: "Compensation & Award (Sec 23)",
    riskScore: 78,
    estimatedDelay: 47,
    delayRange: "35–55 days",
    budgetCr: 420,
    assessmentDate: "09 September 2026",
    reasons: [
      { name: "Disputed Land Title Registry", percentage: 34, impact: "High", desc: "Co-parcenary civil suit pending at Faridabad district court." },
      { name: "Compensation Dissatisfaction", percentage: 28, impact: "High", desc: "Farmers demanding 2024 revised circle rates over 2022 benchmarks." },
      { name: "Forest Clearance NOC", percentage: 18, impact: "Medium", desc: "Delay in compensatory afforestation land allotment in Aravallis." },
      { name: "Utility Relocation (HV Power lines)", percentage: 12, impact: "Medium", desc: "DHBVN estimate pending formal inter-departmental nod." },
      { name: "Gram Sabha Resolution Pending", percentage: 8, impact: "Low", desc: "Gram Panchayat quorum quorum awaited for non-agricultural plots." }
    ],
    actions: [
      { id: "act-1", priority: 1, title: "Special Lok Adalat for Title Conciliation", impact: "High", targetDept: "District Revenue & Legal Cell", status: "Pending", desc: "Fast-track joint verification with village Patwari and sub-divisional magistrate." },
      { id: "act-2", priority: 2, title: "Disburse 80% Provisional Compensation", impact: "High", targetDept: "Competent Authority for Land Acquisition (CALA)", status: "Pending", desc: "Deposit interim compensation in escrow accounts per Section 30." },
      { id: "act-3", priority: 3, title: "Fast-track Forest Stage-II Clearance", impact: "Medium", targetDept: "State MoEFCC Nodal Office", status: "Pending", desc: "Submit physical inspection compliance report on remaining 8.2 hectares." },
      { id: "act-4", priority: 4, title: "Empanel Joint Line-Agency Relocation Committee", impact: "Medium", targetDept: "DHBVN & NHAI Project Unit", status: "Initiated", desc: "Joint site survey to reroute 66kV transmission corridor." }
    ]
  },
  {
    projectId: "P002",
    projectName: "Western Dedicated Freight Corridor Rail Link",
    type: "Railways",
    state: "Haryana",
    district: "Gurugram",
    landArea: "Manesar Industrial Extension – Parcel M-12",
    totalAreaAcres: 88.0,
    affectedFamilies: 140,
    acquisitionStage: "Public Hearing & SIA (Sec 15)",
    riskScore: 48,
    estimatedDelay: 22,
    delayRange: "18–28 days",
    budgetCr: 310,
    assessmentDate: "05 September 2026",
    reasons: [
      { name: "Social Impact Assessment Review", percentage: 40, impact: "Medium", desc: "Objections filed by small MSME workshops." },
      { name: "Environmental Clearance Extension", percentage: 30, impact: "Medium", desc: "Acoustic buffer wall compliance report submitted." },
      { name: "Encroachment Verification", percentage: 20, impact: "Low", desc: "Demarcation of peri-urban unauthorized extensions." },
      { name: "Inter-departmental NoC", percentage: 10, impact: "Low", desc: "HSIIDC transfer of commercial frontage land." }
    ],
    actions: [
      { id: "act-201", priority: 1, title: "Organize Public Consultation Redressal Camp", impact: "High", targetDept: "District Administration", status: "Initiated", desc: "Resolve MSME rehabilitation queries with HSIIDC representatives." },
      { id: "act-202", priority: 2, title: "Joint Boundary DGPS Survey", impact: "Medium", targetDept: "Survey of India & DFRC", status: "Pending", desc: "Complete GPS benchmark pegging to dispel encroachment disputes." }
    ]
  },
  {
    projectId: "P003",
    projectName: "Kundli Logistics Hub Feeder Bypass",
    type: "Logistics Park",
    state: "Haryana",
    district: "Palwal",
    landArea: "Hodal-Bypass Link – Parcel H-09",
    totalAreaAcres: 210.4,
    affectedFamilies: 620,
    acquisitionStage: "Preliminary Notification (Sec 11)",
    riskScore: 88,
    estimatedDelay: 74,
    delayRange: "60–90 days",
    budgetCr: 580,
    assessmentDate: "08 September 2026",
    reasons: [
      { name: "Writ Petition in High Court", percentage: 45, impact: "High", desc: "Stay petition on multi-crop agricultural land conversion." },
      { name: "Genealogical Heirship Disputes", percentage: 25, impact: "High", desc: "Intestate succession claims spanning 3 generations." },
      { name: "Rate Parity with Adjacent Expressway", percentage: 20, impact: "Medium", desc: "Demanding 1.5x multiplication factor multiplier." },
      { name: "Survey Resistance", percentage: 10, impact: "Medium", desc: "Field staff restricted access to agricultural tracts." }
    ],
    actions: [
      { id: "act-301", priority: 1, title: "File Urgent High Court Vacate-Stay Application", impact: "High", targetDept: "Advocate General Office & NHAI Legal", status: "Pending", desc: "Submit public utility affidavit with expedited hearing request." },
      { id: "act-302", priority: 2, title: "Constitute Sub-Divisional Compensation Grievance Forum", impact: "High", targetDept: "SDM Palwal & CALA", status: "Pending", desc: "Offer fast-track adjudication for succession certificates." }
    ]
  },
  {
    projectId: "P004",
    projectName: "Jewar International Airport Aerocity Ring Link",
    type: "Aviation & Roadways",
    state: "Uttar Pradesh",
    district: "Gautam Buddha Nagar",
    landArea: "Jewar SEZ Belt – Parcel J-33",
    totalAreaAcres: 340.0,
    affectedFamilies: 810,
    acquisitionStage: "Possession & Land Handover (Sec 38)",
    riskScore: 92,
    estimatedDelay: 68,
    delayRange: "55–80 days",
    budgetCr: 1250,
    assessmentDate: "09 September 2026",
    reasons: [
      { name: "Rehabilitation & Resettlement (R&R) Plots", percentage: 38, impact: "High", desc: "Delay in developing Model R&R township with civic utilities." },
      { name: "Demolition & Structure Evaluation", percentage: 27, impact: "High", desc: "Re-valuation demands for tube-wells and tubewell structures." },
      { name: "Archaeological Clearance Delay", percentage: 20, impact: "Medium", desc: "Survey completed near historic brick kiln remnants." },
      { name: "Religious Structure Relocation", percentage: 15, impact: "Medium", desc: "Relocation consensus pending with village peace committee." }
    ],
    actions: [
      { id: "act-401", priority: 1, title: "Fast-Track Civic Handover at R&R Site", impact: "High", targetDept: "YEIDA Infrastructure Wing", status: "Pending", desc: "Ensure water, electricity and sewer line commissioning within 14 days." },
      { id: "act-402", priority: 2, title: "Deploy PWD Structural Valuer Special Bench", impact: "High", targetDept: "PWD & District Magistrate", status: "Initiated", desc: "Finalize spot-valuation settlement for disputed tube-well sheds." }
    ]
  },
  {
    projectId: "P005",
    projectName: "Kanpur Defence Industrial Corridor Node",
    type: "Defence & Manufacturing",
    state: "Uttar Pradesh",
    district: "Kanpur Nagar",
    landArea: "Chakeri Industrial Zone – Parcel K-04",
    totalAreaAcres: 190.0,
    affectedFamilies: 240,
    acquisitionStage: "Rehabilitation Scheme (Sec 19)",
    riskScore: 64,
    estimatedDelay: 38,
    delayRange: "30–45 days",
    budgetCr: 540,
    assessmentDate: "02 September 2026",
    reasons: [
      { name: "Gram Sabha Land Conversion NoC", percentage: 35, impact: "Medium", desc: "Inter-tier consolidation of grazing land." },
      { name: "Tenant Farmer Compensation Share", percentage: 30, impact: "Medium", desc: "Tenancy leaseholders dispute with land record owners." },
      { name: "Irrigation Canal Crossing Re-alignment", percentage: 20, impact: "Low", desc: "UP Irrigation Department technical approval timeline." },
      { name: "Record Digitization Discrepancies", percentage: 15, impact: "Low", desc: "Legacy paper maps mismatch with Bhulekh portal data." }
    ],
    actions: [
      { id: "act-501", priority: 1, title: "District Land Consolidation Special Camp", impact: "High", targetDept: "Consolidation Officer & Tehsildar", status: "Pending", desc: "Rectify Bhulekh digitised map boundaries on priority." }
    ]
  },
  {
    projectId: "P006",
    projectName: "Pune Ring Road Outer Bypass Phase 1",
    type: "Highway & Expressway",
    state: "Maharashtra",
    district: "Pune",
    landArea: "Haveli Taluka – Parcel H-88",
    totalAreaAcres: 260.0,
    affectedFamilies: 520,
    acquisitionStage: "Compensation & Award (Sec 23)",
    riskScore: 74,
    estimatedDelay: 42,
    delayRange: "32–50 days",
    budgetCr: 890,
    assessmentDate: "07 September 2026",
    reasons: [
      { name: "Dispute over Ready Reckoner Rates", percentage: 36, impact: "High", desc: "Landowners demand peri-urban indexation multipliers." },
      { name: "Joint Measurement Survey Resurvey", percentage: 31, impact: "Medium", desc: "Boundaries questioned due to fragmented hill-slope plots." },
      { name: "Irrigated Horticultural Tree Valuations", percentage: 21, impact: "Medium", desc: "Horticulture department verification delay." },
      { name: "Water Source Easement Claims", percentage: 12, impact: "Low", desc: "Rights of passage for village borewell pipelines." }
    ],
    actions: [
      { id: "act-601", priority: 1, title: "Convene Rate Harmonization Committee", impact: "High", targetDept: "MSRDC & District Collector", status: "Initiated", desc: "Review 10% administrative bonus for consent awards." }
    ]
  },
  {
    projectId: "P007",
    projectName: "Nagpur Multi-Modal Cargo Terminal",
    type: "Logistics Park",
    state: "Maharashtra",
    district: "Nagpur",
    landArea: "Butibori Industrial Hub – Parcel B-02",
    totalAreaAcres: 110.0,
    affectedFamilies: 95,
    acquisitionStage: "Preliminary Notification (Sec 11)",
    riskScore: 28,
    estimatedDelay: 9,
    delayRange: "5–15 days",
    budgetCr: 210,
    assessmentDate: "01 September 2026",
    reasons: [
      { name: "Routine Document Verification", percentage: 55, impact: "Low", desc: "Standard verification of 7/12 land extract documents." },
      { name: "Minor Drainage Culvert Realignment", percentage: 30, impact: "Low", desc: "Gram Panchayat request for canal passage." },
      { name: "Bank Account Validation", percentage: 15, impact: "Low", desc: "Aadhaar linking for direct benefit transfers." }
    ],
    actions: [
      { id: "act-701", priority: 1, title: "Bulk Aadhaar-DBT Validation Camp", impact: "Low", targetDept: "Lead District Bank & Tehsil Office", status: "Pending", desc: "Complete 100% direct account seeding for award disbursal." }
    ]
  },
  {
    projectId: "P008",
    projectName: "Dholera Special Investment Region (DSIR) Expressway Link",
    type: "Industrial Corridor",
    state: "Gujarat",
    district: "Ahmedabad",
    landArea: "Dholera Phase-II – Parcel D-19",
    totalAreaAcres: 410.0,
    affectedFamilies: 310,
    acquisitionStage: "Possession & Land Handover (Sec 38)",
    riskScore: 24,
    estimatedDelay: 8,
    delayRange: "4–12 days",
    budgetCr: 720,
    assessmentDate: "08 September 2026",
    reasons: [
      { name: "Tidal Silt Mitigation Survey", percentage: 40, impact: "Low", desc: "Drainage elevation alignment on coastal clay boundaries." },
      { name: "Pipeline Right-of-Way Coordination", percentage: 35, impact: "Low", desc: "GSPL gas pipeline crossing permission clearance." },
      { name: "Boundary Peg Marking", percentage: 25, impact: "Low", desc: "Physical concrete pillar demarcation." }
    ],
    actions: [
      { id: "act-801", priority: 1, title: "Coordinate GSPL Crossing Clearance", impact: "Low", targetDept: "Gujarat State Petroleum Corp & DSIR", status: "Initiated", desc: "Issue bilateral safety NOC for trenchless laying." }
    ]
  },
  {
    projectId: "P009",
    projectName: "Jaipur Outer Ring Road South Phase",
    type: "Highway & Expressway",
    state: "Rajasthan",
    district: "Jaipur",
    landArea: "Sanganer-Phagi Corridor – Parcel S-08",
    totalAreaAcres: 175.0,
    affectedFamilies: 290,
    acquisitionStage: "Compensation & Award (Sec 23)",
    riskScore: 56,
    estimatedDelay: 29,
    delayRange: "20–35 days",
    budgetCr: 390,
    assessmentDate: "06 September 2026",
    reasons: [
      { name: "Mandir Trust Land Title Clearance", percentage: 35, impact: "Medium", desc: "Devesthan Department permission required for temple lands." },
      { name: "Disputed Agricultural Encroachments", percentage: 32, impact: "Medium", desc: "Unregistered tenancy farming along right-of-way." },
      { name: "Groundwater Well Compensation", percentage: 21, impact: "Low", desc: "Tube-well yield assessment by Ground Water Dept." },
      { name: "Mutation Entry Delays", percentage: 12, impact: "Low", desc: "Pending mutation entries at Patwari circle." }
    ],
    actions: [
      { id: "act-901", priority: 1, title: "Devesthan Dept Inter-Ministerial Nod", impact: "Medium", targetDept: "Rajasthan Devasthan Dept & JDA", status: "Pending", desc: "Submit alternate land allotment proposal for temple trust." }
    ]
  },
  {
    projectId: "P010",
    projectName: "Bengaluru Peripheral Ring Road (PRR-Segment 3)",
    type: "Highway & Expressway",
    state: "Karnataka",
    district: "Bengaluru Urban",
    landArea: "Sarjapur-Whitefield Link – Parcel SW-101",
    totalAreaAcres: 295.0,
    affectedFamilies: 680,
    acquisitionStage: "Compensation & Award (Sec 23)",
    riskScore: 82,
    estimatedDelay: 58,
    delayRange: "45–70 days",
    budgetCr: 1650,
    assessmentDate: "09 September 2026",
    reasons: [
      { name: "TDR vs Cash Compensation Impasse", percentage: 42, impact: "High", desc: "Landowners rejecting Transferable Development Rights (TDR) certificates in favor of cash." },
      { name: "Urban Tech Park Frontage Disputes", percentage: 28, impact: "High", desc: "High-value commercial IT land litigation in Karnataka High Court." },
      { name: "Lake Buffer Zone Environmental Cordon", percentage: 18, impact: "Medium", desc: "National Green Tribunal (NGT) setback verification." },
      { name: "Joint Khata Mutation Issues", percentage: 12, impact: "Low", desc: "Multiple joint khata holders untraceable or residing overseas." }
    ],
    actions: [
      { id: "act-1001", priority: 1, title: "Cabinet Approval for Hybrid Compensation Policy", impact: "High", targetDept: "BDA & Karnataka Urban Dev Dept", status: "Pending", desc: "Offer 50% cash and 50% tradable TDR with floor support price." },
      { id: "act-1002", priority: 2, title: "Embassies Outreach for NRI Khata Holders", impact: "Medium", targetDept: "CALA & Revenue Special Cell", status: "Pending", desc: "Digital verification via consular authentication." }
    ]
  },
  {
    projectId: "P011",
    projectName: "Indore Metro Rail Viaduct Extension",
    type: "Urban Transit",
    state: "Madhya Pradesh",
    district: "Indore",
    landArea: "Bhanwar Kuan Corridor – Parcel BK-05",
    totalAreaAcres: 42.0,
    affectedFamilies: 180,
    acquisitionStage: "Public Hearing & SIA (Sec 15)",
    riskScore: 52,
    estimatedDelay: 25,
    delayRange: "18–32 days",
    budgetCr: 280,
    assessmentDate: "04 September 2026",
    reasons: [
      { name: "Commercial Shop Resettlement Package", percentage: 44, impact: "Medium", desc: "Dense market trader associations demand alternate shops in metro mall." },
      { name: "Underground Storm Drainage Utility Shifting", percentage: 32, impact: "Medium", desc: "Municipal Corporation trunk sewer relocation design." },
      { name: "Building Line Demarcation Objections", percentage: 24, impact: "Low", desc: "Joint measurement with Municipal Town Planning." }
    ],
    actions: [
      { id: "act-1101", priority: 1, title: "Finalize Dedicated Commercial Relocation Complex", impact: "Medium", targetDept: "MP Metro Rail Corp & Indore Municipal Corp", status: "Initiated", desc: "Allot priority shopping units in newly planned multi-level plaza." }
    ]
  },
  {
    projectId: "P012",
    projectName: "Bhopal Eco-Industrial Park",
    type: "Industrial Corridor",
    state: "Madhya Pradesh",
    district: "Bhopal",
    landArea: "Mandideep Outskirts – Parcel M-3",
    totalAreaAcres: 160.0,
    affectedFamilies: 110,
    acquisitionStage: "Preliminary Notification (Sec 11)",
    riskScore: 32,
    estimatedDelay: 12,
    delayRange: "8–18 days",
    budgetCr: 195,
    assessmentDate: "03 September 2026",
    reasons: [
      { name: "Pasture Land Exchange Permission", percentage: 50, impact: "Medium", desc: "District revenue approval to allocate alternate charagah." },
      { name: "High Tension Line Safety Buffer", percentage: 30, impact: "Low", desc: "MPPTCL tower clearance certification." },
      { name: "Routine SIA Report Endorsement", percentage: 20, impact: "Low", desc: "Expert group recommendations review." }
    ],
    actions: [
      { id: "act-1201", priority: 1, title: "Notify Alternate Grazing Land Allocation", impact: "Low", targetDept: "District Collector Bhopal", status: "Pending", desc: "Exchange 22 acres of revenue wasteland in adjoining village." }
    ]
  }
];

// Geospatial Mock Hierarchy & State/District Risk Summary
export const GEOSPATIAL_DATA = {
  national: {
    totalProjects: 128,
    highRiskProjects: 23,
    criticalProjects: 7,
    avgPredictedDelay: 31,
    states: [
      { id: 'HR', name: 'Haryana', riskScore: 71, riskLevel: 'HIGH', projectsCount: 18, avgDelay: 48, lat: 29.0588, lng: 76.0856 },
      { id: 'UP', name: 'Uttar Pradesh', riskScore: 84, riskLevel: 'CRITICAL', projectsCount: 32, avgDelay: 58, lat: 26.8467, lng: 80.9462 },
      { id: 'RJ', name: 'Rajasthan', riskScore: 56, riskLevel: 'MEDIUM', projectsCount: 16, avgDelay: 29, lat: 27.0238, lng: 74.2179 },
      { id: 'MH', name: 'Maharashtra', riskScore: 68, riskLevel: 'HIGH', projectsCount: 26, avgDelay: 44, lat: 19.7515, lng: 75.7139 },
      { id: 'GJ', name: 'Gujarat', riskScore: 26, riskLevel: 'LOW', projectsCount: 14, avgDelay: 11, lat: 22.2587, lng: 71.1924 },
      { id: 'MP', name: 'Madhya Pradesh', riskScore: 42, riskLevel: 'MEDIUM', projectsCount: 12, avgDelay: 21, lat: 22.9734, lng: 78.6569 },
      { id: 'KA', name: 'Karnataka', riskScore: 76, riskLevel: 'HIGH', projectsCount: 10, avgDelay: 49, lat: 15.3173, lng: 75.7139 }
    ]
  },
  stateDistricts: {
    "Haryana": [
      { name: "Faridabad", riskScore: 78, riskLevel: "HIGH", projectsCount: 6, avgDelay: 47, lat: 28.4089, lng: 77.3178 },
      { name: "Gurugram", riskScore: 48, riskLevel: "MEDIUM", projectsCount: 5, avgDelay: 22, lat: 28.4595, lng: 77.0266 },
      { name: "Palwal", riskScore: 88, riskLevel: "CRITICAL", projectsCount: 4, avgDelay: 74, lat: 28.1447, lng: 77.3260 },
      { name: "Hisar", riskScore: 28, riskLevel: "LOW", projectsCount: 2, avgDelay: 10, lat: 29.1492, lng: 75.7217 },
      { name: "Rohtak", riskScore: 54, riskLevel: "MEDIUM", projectsCount: 1, avgDelay: 26, lat: 28.8955, lng: 76.6066 }
    ],
    "Uttar Pradesh": [
      { name: "Gautam Buddha Nagar", riskScore: 92, riskLevel: "CRITICAL", projectsCount: 8, avgDelay: 68, lat: 28.3283, lng: 77.5453 },
      { name: "Kanpur Nagar", riskScore: 64, riskLevel: "HIGH", projectsCount: 7, avgDelay: 38, lat: 26.4499, lng: 80.3319 },
      { name: "Lucknow", riskScore: 58, riskLevel: "MEDIUM", projectsCount: 9, avgDelay: 28, lat: 26.8467, lng: 80.9462 },
      { name: "Varanasi", riskScore: 72, riskLevel: "HIGH", projectsCount: 8, avgDelay: 45, lat: 25.3176, lng: 82.9739 }
    ],
    "Maharashtra": [
      { name: "Pune", riskScore: 74, riskLevel: "HIGH", projectsCount: 12, avgDelay: 42, lat: 18.5204, lng: 73.8567 },
      { name: "Nagpur", riskScore: 28, riskLevel: "LOW", projectsCount: 6, avgDelay: 9, lat: 21.1458, lng: 79.0882 },
      { name: "Thane", riskScore: 86, riskLevel: "CRITICAL", projectsCount: 8, avgDelay: 62, lat: 19.2183, lng: 72.9781 }
    ],
    "Gujarat": [
      { name: "Ahmedabad", riskScore: 24, riskLevel: "LOW", projectsCount: 8, avgDelay: 8, lat: 23.0225, lng: 72.5714 },
      { name: "Surat", riskScore: 35, riskLevel: "MEDIUM", projectsCount: 6, avgDelay: 15, lat: 21.1702, lng: 72.8311 }
    ],
    "Rajasthan": [
      { name: "Jaipur", riskScore: 56, riskLevel: "MEDIUM", projectsCount: 10, avgDelay: 29, lat: 26.9124, lng: 75.7873 },
      { name: "Udaipur", riskScore: 42, riskLevel: "MEDIUM", projectsCount: 6, avgDelay: 20, lat: 24.5854, lng: 73.7125 }
    ],
    "Madhya Pradesh": [
      { name: "Indore", riskScore: 52, riskLevel: "MEDIUM", projectsCount: 6, avgDelay: 25, lat: 22.7196, lng: 75.8577 },
      { name: "Bhopal", riskScore: 32, riskLevel: "LOW", projectsCount: 6, avgDelay: 12, lat: 23.2599, lng: 77.4126 }
    ],
    "Karnataka": [
      { name: "Bengaluru Urban", riskScore: 82, riskLevel: "CRITICAL", projectsCount: 7, avgDelay: 58, lat: 12.9716, lng: 77.5946 },
      { name: "Belagavi", riskScore: 45, riskLevel: "MEDIUM", projectsCount: 3, avgDelay: 21, lat: 15.8497, lng: 74.4977 }
    ]
  }
};

export const NATIONAL_DELAY_FACTORS = [
  { name: 'Compensation & Circle Rate Disputes', value: 34, color: '#EF4444' },
  { name: 'Land Title & Succession Litigation', value: 26, color: '#F97316' },
  { name: 'Inter-Agency & Forest Clearance NOCs', value: 18, color: '#F59E0B' },
  { name: 'R&R / Rehabilitation Site Handover', value: 14, color: '#3B82F6' },
  { name: 'Survey Demarcation Resistance', value: 8, color: '#10B981' }
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: "Urgent: High Court Notice", project: "Jewar International Airport Aerocity", time: "18m ago", unread: true, type: "critical" },
  { id: 2, title: "Compensation Milestone Exceeded", project: "Delhi–Mumbai Expressway Pkg-IV", time: "1h ago", unread: true, type: "warning" },
  { id: 3, title: "Forest Clearances Stage-II Granted", project: "Nagpur Multi-Modal Cargo Terminal", time: "4h ago", unread: false, type: "success" },
  { id: 4, title: "Quarterly Audit Report Ready", project: "All Districts - National View", time: "1d ago", unread: false, type: "info" }
];

// FUTURE ML INTERFACE:
// Simply update this function to execute an async fetch:
// const res = await fetch(`/api/v1/predict?projectId=${projectId}`)
// return await res.json();
export const getRiskAssessment = async (projectId) => {
  // Simulate 1 second inference computation
  await new Promise((resolve) => setTimeout(resolve, 850));
  const found = MOCK_PROJECTS.find(p => p.projectId === projectId);
  return found || MOCK_PROJECTS[0];
};