import { useState } from "react";
import { Pencil, Trash2, Search, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function DataTable({ columns, data, onEdit, onDelete, onToggle, toggleField = "isActive", onReorder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    return Object.values(item).some(
      (val) => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    
    // Swap items in the local state array for visual feedback? Or just wait for drop.
    // Easiest is to wait for drop for the actual reorder callback.
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (onReorder && draggedItemIndex !== null && draggedItemIndex !== targetIndex) {
      onReorder(draggedItemIndex, targetIndex, paginatedData);
    }
    setDraggedItemIndex(null);
  };

  return (
    <div 
      className="rounded-2xl flex flex-col overflow-hidden shadow-lg"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
    >
      {/* Table Header/Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-opacity-50 transition-colors"
            style={{ 
              background: '#0f0f0f', 
              borderColor: 'var(--border-color)', 
              color: 'white',
              '--tw-ring-color': 'var(--primary-teal)'
            }}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Showing {paginatedData.length} of {filteredData.length} entries
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
              {!!onReorder && (
                <th className="px-4 py-4 w-10"></th>
              )}
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-4 font-semibold text-sm uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider text-right" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody style={{ color: '#e5e7eb' }}>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={row._id || rowIndex} 
                  className="transition-colors hover:bg-white/5"
                  style={{ 
                    borderBottom: '1px solid var(--border-color)',
                    cursor: onReorder ? 'grab' : 'default',
                    opacity: draggedItemIndex === rowIndex ? 0.5 : 1
                  }}
                  draggable={!!onReorder}
                  onDragStart={(e) => handleDragStart(e, rowIndex)}
                  onDragOver={(e) => handleDragOver(e, rowIndex)}
                  onDrop={(e) => handleDrop(e, rowIndex)}
                >
                  {!!onReorder && (
                    <td className="px-4 py-4 text-center align-middle" style={{ color: 'var(--text-muted)' }}>
                      <div className="flex flex-col gap-1 cursor-grab opacity-50 hover:opacity-100">
                        <div className="w-4 h-0.5 bg-current rounded"></div>
                        <div className="w-4 h-0.5 bg-current rounded"></div>
                        <div className="w-4 h-0.5 bg-current rounded"></div>
                      </div>
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-sm align-middle">
                      {col.render ? col.render(row[col.key], row) : (
                        col.key === toggleField && onToggle ? (
                           row[col.key] ? "Yes" : "No"
                        ) : (
                          <div className="max-w-xs truncate" title={row[col.key]}>
                            {row[col.key]}
                          </div>
                        )
                      )}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right align-middle">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-2 rounded-lg transition-colors group"
                            style={{ background: 'rgba(0, 180, 216, 0.1)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-teal)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0, 180, 216, 0.1)'}
                            title="Edit"
                          >
                            <Pencil size={16} className="text-[#00b4d8] group-hover:text-black transition-colors" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this item?")) {
                                onDelete(row._id);
                              }
                            }}
                            className="p-2 rounded-lg transition-colors group"
                            style={{ background: 'rgba(239, 68, 68, 0.1)' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#ef4444'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-red-500 group-hover:text-white transition-colors" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-6 py-12 text-center"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Search size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">No results found</p>
                    {searchTerm && (
                      <p className="text-sm mt-1">Try adjusting your search query</p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)' }}>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#0f0f0f', border: '1px solid var(--border-color)', color: 'white' }}
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-9 h-9 rounded-lg text-sm font-medium transition-colors"
                  style={{ 
                    background: currentPage === i + 1 ? 'var(--primary-teal)' : '#0f0f0f',
                    color: currentPage === i + 1 ? 'black' : 'white',
                    border: currentPage === i + 1 ? 'none' : '1px solid var(--border-color)'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#0f0f0f', border: '1px solid var(--border-color)', color: 'white' }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
