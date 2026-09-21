'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Student, 
  FeePayment, 
  Certificate, 
  GalleryItem, 
  Notice, 
  Inquiry 
} from '@/types';
import { 
  DEFAULT_STUDENTS, 
  DEFAULT_PAYMENTS, 
  DEFAULT_GALLERY, 
  DEFAULT_CERTIFICATES, 
  DEFAULT_NOTICES, 
  DEFAULT_INQUIRIES 
} from '@/lib/default-data';
import { generateId, generateReceiptNumber } from '@/lib/utils';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc 
} from 'firebase/firestore';

interface SchoolDataContextType {
  // Data arrays
  students: Student[];
  payments: FeePayment[];
  gallery: GalleryItem[];
  certificates: Certificate[];
  notices: Notice[];
  inquiries: Inquiry[];
  
  // Computed stats
  totalRevenue: number;
  totalRemainingFee: number;
  totalExpectedFee: number;
  totalStudents: number;
  
  // Student Actions
  addStudent: (student: Omit<Student, 'id' | 'remainingFee' | 'feeStatus'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudentByRollNo: (rollNo: string) => Student | undefined;
  
  // Payment Actions
  recordPayment: (paymentData: {
    studentId: string;
    amount: number;
    paymentMethod: FeePayment['paymentMethod'];
    notes?: string;
  }) => FeePayment | null;
  getStudentPayments: (studentId: string) => FeePayment[];
  
  // Gallery Actions
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'uploadDate'>) => void;
  updateGalleryItem: (id: string, data: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  // Certificate Actions
  addCertificate: (cert: Omit<Certificate, 'id'>) => Certificate;
  deleteCertificate: (id: string) => void;
  
  // Notice Actions
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;
  
  // Inquiry Actions
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  
  // Reset demo data
  resetToDefaultData: () => void;
}

const SchoolDataContext = createContext<SchoolDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STUDENTS: 'ips_students_v1',
  PAYMENTS: 'ips_payments_v1',
  GALLERY: 'ips_gallery_v1',
  CERTIFICATES: 'ips_certificates_v1',
  NOTICES: 'ips_notices_v1',
  INQUIRIES: 'ips_inquiries_v1',
};

export function SchoolDataProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<FeePayment[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Initialize data from LocalStorage or Default Seed Data
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      const storedPayments = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      const storedGallery = localStorage.getItem(STORAGE_KEYS.GALLERY);
      const storedCertificates = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      const storedNotices = localStorage.getItem(STORAGE_KEYS.NOTICES);
      const storedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);

      setStudents(storedStudents ? JSON.parse(storedStudents) : DEFAULT_STUDENTS);
      setPayments(storedPayments ? JSON.parse(storedPayments) : DEFAULT_PAYMENTS);
      setGallery(storedGallery ? JSON.parse(storedGallery) : DEFAULT_GALLERY);
      setCertificates(storedCertificates ? JSON.parse(storedCertificates) : DEFAULT_CERTIFICATES);
      setNotices(storedNotices ? JSON.parse(storedNotices) : DEFAULT_NOTICES);
      setInquiries(storedInquiries ? JSON.parse(storedInquiries) : DEFAULT_INQUIRIES);
    } catch (e) {
      console.error("Error reading stored school data", e);
      setStudents(DEFAULT_STUDENTS);
      setPayments(DEFAULT_PAYMENTS);
      setGallery(DEFAULT_GALLERY);
      setCertificates(DEFAULT_CERTIFICATES);
      setNotices(DEFAULT_NOTICES);
      setInquiries(DEFAULT_INQUIRIES);
    } finally {
      setInitialized(true);
    }

    // Optional Firestore Sync
    if (isFirebaseConfigured && db) {
      const syncFromFirestore = async () => {
        try {
          const stuSnap = await getDocs(collection(db, "students"));
          if (!stuSnap.empty) {
            const list: Student[] = [];
            stuSnap.forEach(d => list.push(d.data() as Student));
            setStudents(list);
          }
        } catch (err) {
          console.warn("Firestore sync optional fallback:", err);
        }
      };
      syncFromFirestore();
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!initialized || typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [students, payments, gallery, certificates, notices, inquiries, initialized]);

  // Computed Financial Metrics
  const totalRevenue = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const totalExpectedFee = students.reduce((acc, s) => acc + Number(s.totalFee || 0), 0);
  const totalRemainingFee = students.reduce((acc, s) => acc + Number(s.remainingFee || 0), 0);
  const totalStudents = students.length;

  // Helper to calculate fee status
  const calculateFeeStatus = (total: number, paid: number, dueDate: string) => {
    const remaining = Math.max(0, total - paid);
    if (remaining === 0) return { remainingFee: 0, status: 'paid' as const };
    const isOverdue = new Date(dueDate) < new Date();
    if (paid > 0) return { remainingFee: remaining, status: isOverdue ? ('overdue' as const) : ('partial' as const) };
    return { remainingFee: remaining, status: isOverdue ? ('overdue' as const) : ('pending' as const) };
  };

  // Student CRUD
  const addStudent = (newStuData: Omit<Student, 'id' | 'remainingFee' | 'feeStatus'>) => {
    const { remainingFee, status } = calculateFeeStatus(newStuData.totalFee, newStuData.paidFee, newStuData.dueDate);
    const newStudent: Student = {
      ...newStuData,
      id: generateId('stu'),
      remainingFee,
      feeStatus: status,
    };
    setStudents(prev => [newStudent, ...prev]);

    // If initial payment was made, log a payment record
    if (newStudent.paidFee > 0) {
      const paymentRecord: FeePayment = {
        id: generateId('pay'),
        studentId: newStudent.id,
        studentName: newStudent.name,
        rollNo: newStudent.rollNo,
        grade: newStudent.grade,
        amount: newStudent.paidFee,
        paymentMethod: 'cash',
        date: new Date().toISOString().split('T')[0],
        receiptNo: generateReceiptNumber(),
        notes: 'Initial admission fee payment',
        academicYear: '2026-2027',
      };
      setPayments(prev => [paymentRecord, ...prev]);
    }

    if (isFirebaseConfigured && db) {
      try {
        setDoc(doc(db, "students", newStudent.id), newStudent);
      } catch (e) {
        console.warn("Firestore error:", e);
      }
    }
  };

  const updateStudent = (id: string, updatedFields: Partial<Student>) => {
    setStudents(prev =>
      prev.map(stu => {
        if (stu.id === id) {
          const merged = { ...stu, ...updatedFields };
          const { remainingFee, status } = calculateFeeStatus(merged.totalFee, merged.paidFee, merged.dueDate);
          return {
            ...merged,
            remainingFee,
            feeStatus: status,
          };
        }
        return stu;
      })
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    if (isFirebaseConfigured && db) {
      try {
        deleteDoc(doc(db, "students", id));
      } catch (e) {
        console.warn("Firestore error:", e);
      }
    }
  };

  const getStudentByRollNo = (rollNo: string) => {
    const cleanQuery = rollNo.trim().toLowerCase();
    return students.find(s => s.rollNo.toLowerCase() === cleanQuery);
  };

  // Fee Payment Recording
  const recordPayment = ({
    studentId,
    amount,
    paymentMethod,
    notes,
  }: {
    studentId: string;
    amount: number;
    paymentMethod: FeePayment['paymentMethod'];
    notes?: string;
  }): FeePayment | null => {
    const student = students.find(s => s.id === studentId);
    if (!student) return null;

    const newPaidFee = student.paidFee + amount;
    const { remainingFee, status } = calculateFeeStatus(student.totalFee, newPaidFee, student.dueDate);

    // Update student balance
    setStudents(prev =>
      prev.map(s =>
        s.id === studentId
          ? {
              ...s,
              paidFee: newPaidFee,
              remainingFee,
              feeStatus: status,
            }
          : s
      )
    );

    // Create payment entry
    const newPayment: FeePayment = {
      id: generateId('pay'),
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      grade: student.grade,
      amount,
      paymentMethod,
      date: new Date().toISOString().split('T')[0],
      receiptNo: generateReceiptNumber(),
      notes: notes || 'Tuition / Installment fee payment',
      academicYear: '2026-2027',
    };

    setPayments(prev => [newPayment, ...prev]);

    if (isFirebaseConfigured && db) {
      try {
        setDoc(doc(db, "payments", newPayment.id), newPayment);
      } catch (e) {
        console.warn("Firestore error:", e);
      }
    }

    return newPayment;
  };

  const getStudentPayments = (studentId: string) => {
    return payments.filter(p => p.studentId === studentId);
  };

  // Gallery Management
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id' | 'uploadDate'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: generateId('gal'),
      uploadDate: new Date().toISOString().split('T')[0],
    };
    setGallery(prev => [newItem, ...prev]);
    if (isFirebaseConfigured && db) {
      try {
        setDoc(doc(db, "gallery", newItem.id), newItem);
      } catch (e) {
        console.warn("Firestore error:", e);
      }
    }
  };

  const updateGalleryItem = (id: string, data: Partial<GalleryItem>) => {
    setGallery(prev =>
      prev.map(g => (g.id === id ? { ...g, ...data } : g))
    );
    if (isFirebaseConfigured && db) {
      try {
        const item = gallery.find(g => g.id === id);
        if (item) {
          setDoc(doc(db, "gallery", id), { ...item, ...data });
        }
      } catch (e) {
        console.warn("Firestore error:", e);
      }
    }
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    if (isFirebaseConfigured && db) {
      try {
        deleteDoc(doc(db, "gallery", id));
      } catch (e) {
        console.warn("Firestore error:", e);
      }
    }
  };

  // Certificate Management
  const addCertificate = (certData: Omit<Certificate, 'id'>): Certificate => {
    const newCert: Certificate = {
      ...certData,
      id: generateId('cert'),
    };
    setCertificates(prev => [newCert, ...prev]);
    return newCert;
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  // Notice Management
  const addNotice = (noticeData: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: generateId('not'),
      date: new Date().toISOString().split('T')[0],
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  // Inquiry Management
  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: generateId('inq'),
      date: new Date().toISOString().split('T')[0],
      status: 'new',
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const resetToDefaultData = () => {
    setStudents(DEFAULT_STUDENTS);
    setPayments(DEFAULT_PAYMENTS);
    setGallery(DEFAULT_GALLERY);
    setCertificates(DEFAULT_CERTIFICATES);
    setNotices(DEFAULT_NOTICES);
    setInquiries(DEFAULT_INQUIRIES);
  };

  return (
    <SchoolDataContext.Provider
      value={{
        students,
        payments,
        gallery,
        certificates,
        notices,
        inquiries,
        totalRevenue,
        totalRemainingFee,
        totalExpectedFee,
        totalStudents,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentByRollNo,
        recordPayment,
        getStudentPayments,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addCertificate,
        deleteCertificate,
        addNotice,
        deleteNotice,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToDefaultData,
      }}
    >
      {children}
    </SchoolDataContext.Provider>
  );
}

export function useSchoolData() {
  const context = useContext(SchoolDataContext);
  if (!context) {
    throw new Error('useSchoolData must be used within a SchoolDataProvider');
  }
  return context;
}
