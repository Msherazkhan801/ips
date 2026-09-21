import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { SchoolDataProvider } from '@/context/school-data-context';
import WhatsAppBubble from '@/components/whatsapp-bubble';

export const metadata: Metadata = {
  title: 'Iqra Public School Permoli | Modern Academic & Islamic Excellence',
  description: 'Welcome to Iqra Public School Permoli (IPS Permoli). Empowering students with modern science, computer education, and Islamic values from Kindergarten to Matric.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased selection:bg-school-500 selection:text-white">
        <AuthProvider>
          <SchoolDataProvider>
            {children}
            <WhatsAppBubble />
          </SchoolDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
