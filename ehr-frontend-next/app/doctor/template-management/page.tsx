"use client";
import { FC, useState, useEffect } from 'react';
import { DataTable } from '@/components/tables/DataTable';
 import { Card } from '@/components/cards/Card';
 import { Modal } from '@/components/modals/Modal';
 import { TextInput } from '@/components/forms/inputs/TextInput';
 import { SelectInput } from '@/components/forms/inputs/SelectInput';
 import {fetchDoctors} from "@/services/doctors_service";
 import {fetchPatients} from "@/services/patients_service";
 //import { postComposition } from '../services/composition_service';
 import { fetchTemplates } from '@/services/template_service';
 import { UserList } from './userList';
 import { useRouter } from 'next/navigation';
 import { UploadTemplateModal } from '@/components/UploadTemplateModal';
 
interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    role: string;
    user: { id: string; 
      username:string;
    }
}

const AdminTemplateDashboard: React.FC = () => {
    const [users, setUsers] = useState([{}]); 
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);
    const [templates, setTemplates] = useState([{}]);
    const router = useRouter();

    const fetchData = async () => {
      const templates = await fetchTemplates();
      setTemplates(templates);
    }
  
    useEffect(() => {
        fetchData();
    }, []);


    return (
      <div className="p-16 space-y-12">
        <Card className="space-y-4 relative">
          <h2 className="text-xl font-semibold">Template Management</h2>
    

          <DataTable
            columns={[
              { key: 'name', label: 'Template Name' },
              { key: 'description', label: 'Description' },
              {
                key: 'actions',
                label: 'Actions',
                render: (row) => (
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      router.push(`/admin/form-builder/${row.templateId}/`)
                    }
                  >
                    View Form
                  </button>
                ),
              },
            ]}
            data={templates}
          />

          <div className="flex bottom-4 right-2 justify-end" >
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setOpenModal(true)}
            >
              +
            </button>

           
    
          </div>
        </Card>
    
        <UploadTemplateModal open={openModal} onClose={() => setOpenModal(false)} />
      </div>
    );
    
};

export default AdminTemplateDashboard;