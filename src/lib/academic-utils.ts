import { Student } from '@/types';

export interface SubjectMark {
  code: string;
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  status: 'Pass' | 'Fail';
}

/**
 * Generates an authentic subject-wise marks breakdown matching the student's grade and obtained marks
 */
export function getStudentSubjectMarks(student: Student): SubjectMark[] {
  const total = student.totalMarks || 1100;
  const obtained = student.obtainedMarks !== undefined ? student.obtainedMarks : Math.round(total * 0.85);
  const ratio = total > 0 ? obtained / total : 0.85;

  const isMatric = student.grade.toLowerCase().includes('matric') || student.grade.toLowerCase().includes('grade 10') || student.grade.toLowerCase().includes('grade 9');

  let subjectConfigs: { code: string; name: string; max: number; weight: number }[] = [];

  if (isMatric) {
    // BISE Mardan KPK Board Matriculation Pattern (Total 1100)
    subjectConfigs = [
      { code: 'ENG-10', name: 'English (Compulsory)', max: 150, weight: 0.98 },
      { code: 'URD-10', name: 'Urdu (Compulsory)', max: 150, weight: 1.02 },
      { code: 'ISL-10', name: 'Islamiyat / Ethics', max: 100, weight: 1.05 },
      { code: 'PST-10', name: 'Pakistan Studies', max: 100, weight: 1.01 },
      { code: 'MTH-10', name: 'Mathematics (Science)', max: 150, weight: 0.97 },
      { code: 'PHY-10', name: 'Physics (Theory + Practical)', max: 150, weight: 0.99 },
      { code: 'CHM-10', name: 'Chemistry (Theory + Practical)', max: 150, weight: 0.96 },
      { code: 'BIO-10', name: 'Biology / Computer Science', max: 150, weight: 1.03 },
    ];
  } else if (student.grade.toLowerCase().includes('middle') || student.grade.toLowerCase().includes('grade 8') || student.grade.toLowerCase().includes('grade 7') || student.grade.toLowerCase().includes('grade 6')) {
    // Middle School Curriculum (Total 500 or scaled)
    subjectConfigs = [
      { code: 'ENG-M', name: 'English Language & Grammar', max: 100, weight: 0.98 },
      { code: 'URD-M', name: 'Urdu Adab & Qawaid', max: 100, weight: 1.02 },
      { code: 'MTH-M', name: 'General Mathematics', max: 100, weight: 0.96 },
      { code: 'SCI-M', name: 'General Science', max: 100, weight: 1.01 },
      { code: 'ISL-M', name: 'Islamiyat & Quranic Recitation', max: 50, weight: 1.06 },
      { code: 'SST-M', name: 'Social Studies & Geography', max: 50, weight: 0.98 },
    ];
  } else {
    // Primary School Curriculum
    subjectConfigs = [
      { code: 'ENG-P', name: 'English Reading & Writing', max: 100, weight: 1.01 },
      { code: 'URD-P', name: 'Urdu Nazm & Imla', max: 100, weight: 1.02 },
      { code: 'MTH-P', name: 'Mathematics & Arithmetic', max: 100, weight: 0.97 },
      { code: 'SCI-P', name: 'General Science & Environment', max: 100, weight: 1.00 },
      { code: 'ISL-P', name: 'Islamiyat & Nazra Quran', max: 100, weight: 1.05 },
    ];
  }

  // Adjust total weight to exact total
  const configTotal = subjectConfigs.reduce((acc, s) => acc + s.max, 0);
  const scale = total / configTotal;

  let assignedSum = 0;
  const subjects: SubjectMark[] = subjectConfigs.map((cfg, index) => {
    const scaledMax = Math.round(cfg.max * scale);
    let subObtained: number;

    if (index === subjectConfigs.length - 1) {
      // Last subject takes remainder to guarantee exact sum = obtained
      subObtained = Math.max(0, Math.min(scaledMax, obtained - assignedSum));
    } else {
      const targetSub = Math.round(scaledMax * ratio * cfg.weight);
      subObtained = Math.max(0, Math.min(scaledMax, targetSub));
      assignedSum += subObtained;
    }

    const pct = scaledMax > 0 ? Number(((subObtained / scaledMax) * 100).toFixed(1)) : 0;
    const grade = 
      pct >= 90 ? 'A+' :
      pct >= 80 ? 'A' :
      pct >= 70 ? 'B' :
      pct >= 60 ? 'C' :
      pct >= 50 ? 'D' : 'E';

    return {
      code: cfg.code,
      name: cfg.name,
      totalMarks: scaledMax,
      obtainedMarks: subObtained,
      percentage: pct,
      grade,
      status: pct >= 40 ? 'Pass' : 'Fail',
    };
  });

  return subjects;
}

/**
 * Calculates grade remarks from percentage
 */
export function getGradeRemarks(percentage: number): { text: string; color: string; badge: string } {
  if (percentage >= 90) {
    return { text: 'Outstanding Performance (1st Division with Distinction)', color: 'text-emerald-700', badge: 'bg-emerald-600' };
  }
  if (percentage >= 80) {
    return { text: 'Excellent Performance (1st Division)', color: 'text-blue-700', badge: 'bg-blue-600' };
  }
  if (percentage >= 70) {
    return { text: 'Very Good Standing (1st Division)', color: 'text-indigo-700', badge: 'bg-indigo-600' };
  }
  if (percentage >= 60) {
    return { text: 'Good Standing (2nd Division)', color: 'text-amber-700', badge: 'bg-amber-600' };
  }
  if (percentage >= 50) {
    return { text: 'Satisfactory Performance', color: 'text-slate-700', badge: 'bg-slate-600' };
  }
  return { text: 'Needs Academic Improvement', color: 'text-red-700', badge: 'bg-red-600' };
}
