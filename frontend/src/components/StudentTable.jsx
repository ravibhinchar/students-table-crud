import { FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';

export default function StudentTable({ students, onEdit, onDelete }) {
  if (!students || students.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl p-12 text-center rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-24 h-24 mb-6 rounded-full bg-indigo-50 text-indigo-300 flex items-center justify-center">
          <FaUserCircle size={48} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Students Yet</h3>
        <p className="text-slate-500 max-w-sm">
          Get started by adding your first student using the form. They will appear here once saved.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student, index) => (
              <tr 
                key={student.id} 
                className="hover:bg-slate-50/80 transition-colors group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-50 flex items-center justify-center text-indigo-600 font-bold shadow-inner flex-shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 group-hover:scale-150 transition-transform duration-500 rounded-full"></div>
                      <span className="relative z-10">{student.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{student.name}</p>
                      <p className="text-xs text-slate-500 font-medium tracking-wide">ID: {String(student.id).substring(0,8)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={`mailto:${student.email}`} className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                    {student.email}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {student.age} yrs
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Edit Student"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Student"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
