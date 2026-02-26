export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="studio-theme" style={{ background: 'var(--color-studio-bg)', color: '#fff' }}>
      {children}
    </div>
  );
}
