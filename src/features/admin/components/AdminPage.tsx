"use client"

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { PapersForm } from "@/features/admin/components/PapersForm";
import { SubjectsForm } from "@/features/admin/components/SubjectsForm";
import { BranchesForm } from "@/features/admin/components/BranchesForm";
import { CollegesForm } from "@/features/admin/components/CollegesForm";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('papers');
  const [open, setOpen] = useState(true)

  const renderForm = () => {
    switch (activeSection) {
      case 'papers':
        return <PapersForm />;
      case 'subjects':
        return <SubjectsForm />;
      case 'branches':
        return <BranchesForm />;
      case 'colleges':
        return <CollegesForm />;
      default:
        return <PapersForm />;
    }
  };

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="min-h-screen w-full">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main>
            <SidebarInset>
            <div className="p-4 md:p-6 md:ml-64">
                <div className="flex flex-row items-center gap-2">
                 <SidebarTrigger className="lg:hidden" size={"lg"}/>
                <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
                </div>
                <p className="text-muted-foreground mb-6 ">
                    Manage {activeSection} and view existing data
                </p>
                
                <div className="">
                    {renderForm()}
                </div>
            </div>
            </SidebarInset>
        </main>

      </div>
    </SidebarProvider>
  );
}

export default AdminPage;