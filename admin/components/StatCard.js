export default function StatCard({ title, value, icon: Icon, color, subtitle = "Live data" }) {
  return (
    <div 
      className="rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{ 
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: '500' }}>
          {title}
        </h3>
        {Icon && (
          <div 
            className="flex items-center justify-center p-2 rounded-full"
            style={{ 
              border: '1px solid var(--primary-teal)',
              background: 'rgba(0, 180, 216, 0.05)'
            }}
          >
            <Icon size={20} style={{ color: 'var(--primary-teal)' }} strokeWidth={1.5} />
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="text-4xl font-bold tracking-tight mb-2" style={{ color: 'white' }}>
          {value}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}
