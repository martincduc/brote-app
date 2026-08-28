export default function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 30px 0', fontSize: 13, fontWeight: 600 }}>
      <div>9:41</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', opacity: .7 }}>
        <div style={{ width: 16, height: 9, borderRadius: 2, border: '1px solid currentColor' }} />
        <div style={{ width: 22, height: 10, borderRadius: 3, border: '1px solid currentColor', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 2, right: 7, background: 'currentColor', borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}
