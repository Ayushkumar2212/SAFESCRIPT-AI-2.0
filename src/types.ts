/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen = 'welcome' | 'login' | 'dashboard' | 'vitals' | 'surgical_units' | 'analytics' | 'settings';

export interface StaffProfile {
  name: string;
  role: string;
  avatarUrl: string;
  email: string;
  initials: string;
}

export interface SurgicalUnit {
  id: string; // e.g. "OR-East Alpha"
  unitId: string; // e.g. "EA-402"
  status: 'IN-USE' | 'EMERGENCY' | 'AVAILABLE' | 'MAINTENANCE';
  currentProcedure?: string;
  surgeon?: string;
  surgeonAvatar?: string;
  specialty?: string;
  progress?: number; // percentage
  criticalSupportText?: string;
  estCompletion?: string;
  timeRemainingText?: string;
  patientId?: string;
  duration?: string;
  nextProcedure?: string;
  scheduledTime?: string;
}

export interface UrgentRequest {
  id: string;
  type: 'Blood Supply' | 'Staffing' | 'Asset Recovery' | 'Other';
  timeAgo: string;
  title: string;
  detail: string;
  severity: 'critical' | 'warning' | 'normal';
  actionLabel: string;
}

export interface LabResult {
  id: string;
  testName: string;
  time: string;
  value: string;
  status: 'Normal' | 'High' | 'Low';
}

export interface Medication {
  id: string;
  name: string;
  dose: string;
  route: string;
  frequency: string;
  nextDoseTimeText: string;
  status: 'Next Dose' | 'Administered';
  administeredTime?: string;
}

export interface ClinicalAlert {
  id: string;
  title: string;
  detail: string;
  timeAgo: string;
  severity: 'critical' | 'warning' | 'info';
  actionLabel?: string;
}
