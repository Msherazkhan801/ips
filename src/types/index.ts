export type FeeStatus = 'paid' | 'partial' | 'overdue' | 'pending';

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  section: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  admissionDate: string;
  photoUrl: string;
  bloodGroup: string;
  dob: string;
  status: 'active' | 'inactive' | 'graduated';
  totalFee: number;
  paidFee: number;
  remainingFee: number;
  dueDate: string;
  feeStatus: FeeStatus;
  
  // Marks & Academic Performance
  totalMarks?: number;
  obtainedMarks?: number;
  percentage?: number;
  gradePerformance?: string;
  examTerm?: string;
  attendancePercentage?: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  grade: string;
  amount: number;
  paymentMethod: 'cash' | 'bank_transfer' | 'card' | 'online';
  date: string;
  receiptNo: string;
  notes?: string;
  academicYear: string;
}

export type CertificateType =
  | 'academic_excellence'
  | 'completion'
  | 'sports'
  | 'character'
  | 'appreciation';

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  grade: string;
  title: string;
  type: CertificateType;
  issueDate: string;
  description: string;
  certificateNo: string;
  principalName: string;
  sealColor: string;
  honors?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'campus' | 'events' | 'sports' | 'academics' | 'arts';
  imageUrl: string;
  description: string;
  uploadDate: string;
  featured?: boolean;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'general' | 'exam' | 'holiday' | 'event' | 'admission';
  priority: 'normal' | 'high' | 'urgent';
  active: boolean;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gradeApplying: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'staff';
}
