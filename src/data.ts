/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SurgicalUnit, UrgentRequest, LabResult, Medication, ClinicalAlert, StaffProfile } from './types';

export const STAFF_PROFILES: StaffProfile[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief of Surgery",
    email: "sarah.chen@safescript.med",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg6Bx9cQq7JGQBIdEBUvivsFzhlobCWwTk7UgtuxBEbKem1mo6a03fnnHHg6-qqNXRdYtuk4shE6Rr-bEB7Hj5_f-tbm_0bYB_S-FTyriMNx663XfWhSCe-KU9shByZo4T54aEUR-1xmQZ-ekuOLQdlgYfBPlKOSrrJCDU5pNzuyHJDNSLaaQESmD5y6A6a06L2kCu07Ii1_s8vcK5jNRGVaiQU4_dN_G1wISHUvLtxi2R8pr2VBtKndJqWATpQeXd4RQjURKN4QM",
    initials: "SC"
  },
  {
    name: "Dr. Aris Thorne",
    role: "Chief Medical Officer",
    email: "aris.thorne@safescript.med",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmuTCZvsFMf_nQ7Dek1Xy_bBTyMfRPcXqTl_mbzM6EweLAwMpn0nqVj9fZvBT11ZLcQo88s1cAzOwmhZxnNveIxKlWHTugYzum8g8CJX1cjN29KISqP88v8TG6WxyRBIeRDpEDbB2FGFwC7j1t1olYclO2CQknGkuC-UswFwEoosxw-DY7Vr4H_O-KnmsvNz9ypnTOweBLb09sMNiuPGQlniyYD5VhvqociANlzpaztwy36qP5MsLaJQBbBYmLC4bO5HLSIHnzWW4",
    initials: "AT"
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Attending Physician",
    email: "elena.rodriguez@safescript.med",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCighteUspG4Y5JYq9g0NNv7ysLOysCb7wRd2f4HJRE7iejycE8NIRHgFqtybTC85UvlPEvBMNECyUdFtIjtOdg-zdzEqJIwCB3zl1fMXD-y2UHUB6oaF5lzE5-r3yUSByK6gYExgPMob7XHxFXo9w2X5qm3EOEXbb8PvEjR8TOukrdhbYUIPKXJWMoy9zbdaydykTlunKhflAEAgO2yTW3fDraayf5M9UuMkSpytetJr-2qboJnohZXZl4vbT01zZmn-d2RDHnMXA",
    initials: "ER"
  }
];

export const INITIAL_SURGICAL_UNITS: SurgicalUnit[] = [
  {
    id: "OR-East Alpha",
    unitId: "EA-402",
    status: "IN-USE",
    currentProcedure: "Laparoscopic Cholecystectomy",
    surgeon: "Dr. Marcus Vance",
    surgeonAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuASY29FVOWFDVf4gIkuKf6sUs3WnmT40lKAZ7dqs3k1Y-lIzkhc-lWxOMjHFc2q9imEgGc0xLPw4JiHBNurxRD7BzLVDpHpPd3Eextb7czwOf32qFJVNPFUffyPC6v47fqwv_wRv9xEoWZn_qQ_ZXECEyokdAh5iS3G9GATSrH2HN8ibE0dVEHGHHgoh4YTeDHQQtEN3a7Pbr_7r97tDNYLjCa8eQ2UKUmVprk47ua279cwCigD0CZXq8YaTY3CN1r7uTyOnJb5qEs",
    specialty: "General Surgery",
    progress: 65,
    estCompletion: "14:45",
    timeRemainingText: "32 mins remaining",
    patientId: "PT-9801",
    duration: "01:14:22"
  },
  {
    id: "OR-West Beta",
    unitId: "WB-101",
    status: "EMERGENCY",
    currentProcedure: "Multiple GSW - Thoracic Repair",
    surgeon: "Trauma Team A Red",
    surgeonAvatar: "", // empty so it renders emergency icon or medical services
    specialty: "Trauma Surgery",
    progress: 12,
    criticalSupportText: "Critical Support Requested: Blood/Vascular",
    estCompletion: "Critical Phase",
    timeRemainingText: "Trauma Protocol Active",
    patientId: "PT-7704",
    duration: "00:22:15"
  },
  {
    id: "OR-East Gamma",
    unitId: "EG-405",
    status: "AVAILABLE",
    currentProcedure: "Sanitization Complete",
    specialty: "Cardiovascular",
    nextProcedure: "Valve Replacement",
    scheduledTime: "14:00 PM"
  },
  {
    id: "OR-North Delta",
    unitId: "ND-202",
    status: "IN-USE",
    currentProcedure: "T-Cell Therapy Administration",
    surgeon: "Dr. Elena Rodriguez",
    surgeonAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCighteUspG4Y5JYq9g0NNv7ysLOysCb7wRd2f4HJRE7iejycE8NIRHgFqtybTC85UvlPEvBMNECyUdFtIjtOdg-zdzEqJIwCB3zl1fMXD-y2UHUB6oaF5lzE5-r3yUSByK6gYExgPMob7XHxFXo9w2X5qm3EOEXbb8PvEjR8TOukrdhbYUIPKXJWMoy9zbdaydykTlunKhflAEAgO2yTW3fDraayf5M9UuMkSpytetJr-2qboJnohZXZl4vbT01zZmn-d2RDHnMXA",
    specialty: "Immunotherapy",
    progress: 88,
    estCompletion: "13:10",
    timeRemainingText: "Post-Op Prep Starting in 10m",
    patientId: "PT-2033",
    duration: "01:52:00"
  },
  {
    id: "OR-South Epsilon",
    unitId: "SE-301",
    status: "IN-USE",
    currentProcedure: "Spinal Fusion (L4-L5)",
    surgeon: "Dr. Julian Thorne",
    specialty: "Orthopedic",
    progress: 34,
    estCompletion: "16:30",
    timeRemainingText: "Estimated Case End: 16:30",
    patientId: "PT-4921",
    duration: "02:10:45"
  },
  {
    id: "OR-Central Zeta",
    unitId: "CZ-001",
    status: "IN-USE",
    currentProcedure: "Craniotomy (Tumor Resection)",
    surgeon: "Dr. Sarah Chen",
    surgeonAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg6Bx9cQq7JGQBIdEBUvivsFzhlobCWwTk7UgtuxBEbKem1mo6a03fnnHHg6-qqNXRdYtuk4shE6Rr-bEB7Hj5_f-tbm_0bYB_S-FTyriMNx663XfWhSCe-KU9shByZo4T54aEUR-1xmQZ-ekuOLQdlgYfBPlKOSrrJCDU5pNzuyHJDNSLaaQESmD5y6A6a06L2kCu07Ii1_s8vcK5jNRGVaiQU4_dN_G1wISHUvLtxi2R8pr2VBtKndJqWATpQeXd4RQjURKN4QM",
    specialty: "Neurosurgery",
    progress: 50,
    estCompletion: "15:15",
    timeRemainingText: "Mid-procedure Imaging Pending",
    patientId: "PT-1104",
    duration: "03:40:12"
  },
  {
    id: "OR-01",
    unitId: "OR-01",
    status: "IN-USE",
    currentProcedure: "Appendectomy",
    surgeon: "Dr. Marcus Vance",
    specialty: "General Surgery",
    progress: 75,
    patientId: "PT-9801",
    duration: "01:14:22"
  },
  {
    id: "OR-02",
    unitId: "OR-02",
    status: "AVAILABLE",
    currentProcedure: "Ready",
    specialty: "Cardiovascular",
    nextProcedure: "Valve Replacement",
    scheduledTime: "14:00 PM"
  }
];

export const INITIAL_URGENT_REQUESTS: UrgentRequest[] = [
  {
    id: "req-1",
    type: "Blood Supply",
    timeAgo: "2m ago",
    title: "2 Units O-Negative",
    detail: "Destination: OR-West Beta (Trauma)",
    severity: "critical",
    actionLabel: "DISPATCH"
  },
  {
    id: "req-2",
    type: "Staffing",
    timeAgo: "12m ago",
    title: "Circulating Nurse Support",
    detail: "Required in: OR-South Epsilon",
    severity: "warning",
    actionLabel: "ASSIGN"
  },
  {
    id: "req-3",
    type: "Asset Recovery",
    timeAgo: "15m ago",
    title: "Biohazard Cleanup",
    detail: "Unit: OR-North Delta (Post-Op)",
    severity: "critical",
    actionLabel: "DISPATCH"
  }
];

export const INITIAL_LAB_RESULTS: LabResult[] = [
  {
    id: "lab-1",
    testName: "Potassium (K+)",
    time: "08:30 AM Today",
    value: "4.2",
    status: "Normal"
  },
  {
    id: "lab-2",
    testName: "Hemoglobin",
    time: "08:30 AM Today",
    value: "13.8",
    status: "Normal"
  },
  {
    id: "lab-3",
    testName: "Troponin I",
    time: "09:15 AM Today",
    value: "0.08",
    status: "High"
  }
];

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: "med-1",
    name: "Metoprolol",
    dose: "25mg",
    route: "Oral",
    frequency: "Twice Daily",
    nextDoseTimeText: "2:00 PM (In 3h)",
    status: "Next Dose"
  },
  {
    id: "med-2",
    name: "Lisinopril",
    dose: "10mg",
    route: "Oral",
    frequency: "Daily",
    nextDoseTimeText: "08:00 AM Today",
    status: "Administered",
    administeredTime: "08:00 AM"
  }
];

export const INITIAL_CLINICAL_ALERTS: ClinicalAlert[] = [
  {
    id: "alert-1",
    title: "Critical Supply Low: OR-01",
    detail: "Surgical suture kit inventory below threshold (2 units left).",
    timeAgo: "12 min ago",
    severity: "critical",
    actionLabel: "Reorder Now"
  },
  {
    id: "alert-2",
    title: "Staff Shift Handover",
    detail: "Nursing team Alpha successfully transitioned to Beta.",
    timeAgo: "45 min ago",
    severity: "info",
    actionLabel: "View Log"
  }
];
