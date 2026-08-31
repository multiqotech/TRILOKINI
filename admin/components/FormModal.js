import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "./ImageUpload";
import ToggleSwitch from "./ToggleSwitch";
import MultiImageUpload from "./MultiImageUpload";
import { Plus, Trash2 } from "lucide-react";

export default function FormModal({ isOpen, onClose, title, fields, initialData = null, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        const defaultData = {};
        fields.forEach(field => {
          defaultData[field.name] = field.type === 'toggle' ? false : '';
        });
        setFormData(defaultData);
      }
    }
  }, [isOpen, initialData, fields]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required custom fields (like image) that don't use native HTML5 validation
    const missingRequired = fields.find(f => f.required && (formData[f.name] === undefined || formData[f.name] === null || formData[f.name] === ''));
    if (missingRequired) {
      alert(`Please fill out the required field: ${missingRequired.label}`);
      return;
    }

    setIsSubmitting(true);
    
    const sanitizedData = { ...formData };
    fields.forEach(field => {
      // Remove empty strings for number fields to prevent Mongoose cast errors
      if (field.type === 'number' && (sanitizedData[field.name] === '' || sanitizedData[field.name] === undefined)) {
        delete sanitizedData[field.name];
      }
    });

    try {
      await onSubmit(sanitizedData);
      onClose();
    } catch (error) {
      console.error("Form submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'white' }}>{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <form id="admin-form" onSubmit={handleSubmit} className="space-y-5">
                {fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {field.type === "textarea" ? (
                      <textarea
                        required={field.required}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full px-4 py-2 rounded-xl transition-all focus:outline-none focus:ring-1"
                        style={{ 
                          background: '#0f0f0f', 
                          border: '1px solid var(--border-color)', 
                          color: 'white',
                          minHeight: '100px',
                          '--tw-ring-color': 'var(--primary-teal)'
                        }}
                      />
                    ) : field.type === "select" ? (
                      <select
                        required={field.required}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-1"
                        style={{ 
                          background: '#0f0f0f', 
                          border: '1px solid var(--border-color)', 
                          color: 'white',
                          '--tw-ring-color': 'var(--primary-teal)'
                        }}
                      >
                        <option value="" disabled style={{ color: 'var(--text-muted)' }}>Select {field.label}</option>
                        {field.options?.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : field.type === "image" ? (
                      <div className="mt-1">
                        <ImageUpload 
                          value={formData[field.name]} 
                          onChange={(url) => handleChange(field.name, url)} 
                          aspectRatio={field.aspectRatio}
                        />
                      </div>
                    ) : field.type === "toggle" ? (
                      <div className="mt-2">
                         <ToggleSwitch 
                            checked={!!formData[field.name]} 
                            onChange={(checked) => handleChange(field.name, checked)} 
                         />
                      </div>
                    ) : field.type === "variants" ? (
                      <div className="mt-2 space-y-4">
                        {(formData[field.name] || []).map((variant, index) => (
                          <div key={index} className="p-4 rounded-xl border relative" style={{ borderColor: 'var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                            <button 
                              type="button" 
                              onClick={() => {
                                const newVariants = [...formData[field.name]];
                                newVariants.splice(index, 1);
                                handleChange(field.name, newVariants);
                              }}
                              className="absolute top-4 right-4 text-red-500 hover:text-red-400"
                            >
                              <Trash2 size={18} />
                            </button>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="text-xs text-gray-400">Color / Tone *</label>
                                <input
                                  type="text"
                                  required
                                  value={variant.color || ''}
                                  onChange={(e) => {
                                    const newVariants = [...formData[field.name]];
                                    newVariants[index].color = e.target.value;
                                    handleChange(field.name, newVariants);
                                  }}
                                  className="w-full mt-1 px-3 py-2 rounded-lg"
                                  style={{ background: '#0f0f0f', border: '1px solid var(--border-color)', color: 'white' }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs text-gray-400">Current Price *</label>
                                  <input
                                    type="number"
                                    required
                                    value={variant.currentPrice || ''}
                                    onChange={(e) => {
                                      const newVariants = [...formData[field.name]];
                                      newVariants[index].currentPrice = Number(e.target.value);
                                      handleChange(field.name, newVariants);
                                    }}
                                    className="w-full mt-1 px-3 py-2 rounded-lg"
                                    style={{ background: '#0f0f0f', border: '1px solid var(--border-color)', color: 'white' }}
                                  />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-400">Cut Price (Previous)</label>
                                  <input
                                    type="number"
                                    value={variant.previousPrice || ''}
                                    onChange={(e) => {
                                      const newVariants = [...formData[field.name]];
                                      newVariants[index].previousPrice = e.target.value ? Number(e.target.value) : undefined;
                                      handleChange(field.name, newVariants);
                                    }}
                                    className="w-full mt-1 px-3 py-2 rounded-lg"
                                    style={{ background: '#0f0f0f', border: '1px solid var(--border-color)', color: 'white' }}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-xs text-gray-400 mb-2 block">Images</label>
                                <MultiImageUpload 
                                  value={variant.images || []} 
                                  onChange={(urls) => {
                                    const newVariants = [...formData[field.name]];
                                    newVariants[index].images = urls;
                                    handleChange(field.name, newVariants);
                                  }} 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newVariants = [...(formData[field.name] || []), { color: '', images: [], currentPrice: '' }];
                            handleChange(field.name, newVariants);
                          }}
                          className="w-full py-3 rounded-xl border border-dashed flex items-center justify-center gap-2 text-sm transition-colors"
                          style={{ borderColor: 'var(--primary-teal)', color: 'var(--primary-teal)' }}
                        >
                          <Plus size={16} /> Add Variant
                        </button>
                      </div>
                    ) : field.type === "tags" ? (
                      <input
                        type="text"
                        required={field.required}
                        value={(formData[field.name] || []).join(', ')}
                        placeholder="e.g. trending, new (comma separated)"
                        onChange={(e) => handleChange(field.name, e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                        className="w-full px-4 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-1"
                        style={{ 
                          background: '#0f0f0f', 
                          border: '1px solid var(--border-color)', 
                          color: 'white',
                          '--tw-ring-color': 'var(--primary-teal)'
                        }}
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        required={field.required}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl transition-all focus:outline-none focus:ring-1"
                        style={{ 
                          background: '#0f0f0f', 
                          border: '1px solid var(--border-color)', 
                          color: 'white',
                          '--tw-ring-color': 'var(--primary-teal)'
                        }}
                      />
                    )}
                  </div>
                ))}
              </form>
            </div>
            
            <div className="p-6 flex justify-end gap-3" style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-medium transition-colors"
                style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="admin-form"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center min-w-[120px]"
                style={{ 
                  background: 'var(--primary-teal)', 
                  color: 'black',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  initialData ? "Save Changes" : "Create"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
