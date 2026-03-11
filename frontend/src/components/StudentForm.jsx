import { useState, useEffect } from 'react';

export default function StudentForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        age: initialData.age || '',
      });
    } else {
      setFormData({ name: '', email: '', age: '' });
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = 'Age must be a positive number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const submissionData = {
        ...formData,
        age: Number(formData.age)
      };
      onSubmit(submissionData);
      if (!initialData) {
        setFormData({ name: '', email: '', age: '' });
      }
    }
  };

  return (
    <div className="relative group p-[2px] rounded-[26px] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-[24px] h-full border border-slate-200/60 group-hover:border-transparent transition-colors duration-500">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            {initialData ? 'Edit Details' : 'New Admission'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {initialData ? 'Update student information below' : 'Enter student details carefully'}
          </p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 ml-1 block">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 ${
              errors.name 
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 hover:bg-slate-50'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500 inline-block"></span>{errors.name}</p>}
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 ml-1 block">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@school.edu"
            className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 ${
              errors.email 
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 hover:bg-slate-50'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500 inline-block"></span>{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700 ml-1 block">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="18"
            className={`w-full px-4 py-3 bg-slate-50/50 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 ${
              errors.age 
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 hover:bg-slate-50'
            }`}
          />
          {errors.age && <p className="text-red-500 text-xs font-medium mt-1.5 ml-1 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500 inline-block"></span>{errors.age}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            {initialData ? 'Save Changes' : 'Enroll Student'}
          </button>
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      </div>
    </div>
  );
}
