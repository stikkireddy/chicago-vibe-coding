
export default function Home() {
  // Redirect to main-dashboard
  if (typeof window !== 'undefined') {
    window.location.href = '/main-dashboard';
    return null;
  }
  
  // Server-side redirect using Next.js redirect
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.location.href = '/main-dashboard';`
      }}
    />
  );
}
