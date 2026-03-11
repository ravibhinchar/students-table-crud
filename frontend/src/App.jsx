import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileExcel, FaUserGraduate } from 'react-icons/fa';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Loading from './components/Loading';
import { exportToExcel } from './utils/exportExcel';

const API_URL = 'http://localhost:3000/students';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      showMessage('Failed to fetch students. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleCreateStudent = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      setStudents((prev) => [...prev, response.data]);
      showMessage('Student added successfully!');
    } catch (error) {
      showMessage('Failed to add student', 'error');
    }
  };

  const handleUpdateStudent = async (data) => {
    try {
      const response = await axios.put(`${API_URL}/${editingStudent.id}`, data);
      setStudents((prev) =>
        prev.map((student) => (student.id === editingStudent.id ? response.data : student))
      );
      setEditingStudent(null);
      showMessage('Student updated successfully!');
    } catch (error) {
      showMessage('Failed to update student', 'error');
    }
  };

  const handleSubmit = (data) => {
    if (editingStudent) {
      handleUpdateStudent(data);
    } else {
      handleCreateStudent(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setStudents((prev) => prev.filter((student) => student.id !== id));
        showMessage('Student deleted successfully!');
      } catch (error) {
        showMessage('Failed to delete student', 'error');
      }
    }
  };

  const handleExport = () => {
    if (students.length === 0) {
      showMessage('No data to export', 'error');
      return;
    }
    const dataToExport = students.map(({ id, name, email, age }) => ({
      ID: id,
      Name: name,
      Email: email,
      Age: age,
    }));
    exportToExcel(dataToExport, 'students_list.xlsx');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans selection:bg-indigo-200">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 animate-fade-in flex flex-col md:flex-row justify-between items-center bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <FaUserGraduate className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                Students Portal
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Manage your academic records beautifully.</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="group relative flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <FaFileExcel className="text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Export to Excel</span>
            <div className="absolute inset-0 rounded-xl bg-white mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
        </header>

        <div className={`fixed top-6 right-6 z-50 transition-all duration-500 transform ${message ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
          <div className={`px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 ${
            messageType === 'error' 
              ? 'bg-red-50/90 backdrop-blur-md border-red-200 text-red-800' 
              : 'bg-emerald-50/90 backdrop-blur-md border-emerald-200 text-emerald-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${messageType === 'error' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
            <p className="font-semibold text-sm">{message}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <StudentForm
              onSubmit={handleSubmit}
              initialData={editingStudent}
              onCancel={() => setEditingStudent(null)}
            />
          </div>
          
          <div className="lg:col-span-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            {loading ? (
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-96 flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              <StudentTable
                students={students}
                onEdit={setEditingStudent}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
