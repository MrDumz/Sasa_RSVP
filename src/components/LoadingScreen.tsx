import { CloudPup } from "./CloudPup";

export function LoadingScreen({ leaving }: { leaving: boolean }) {
  return (
    <div className={`loading-screen ${leaving ? "loading-screen--leaving" : ""}`} role="status" aria-live="polite">
      <div className="loading-rainbow" aria-hidden="true" />
      <span className="loading-star star-a" aria-hidden="true">✦</span>
      <span className="loading-star star-b" aria-hidden="true">✧</span>
      <span className="loading-star star-c" aria-hidden="true">✦</span>
      <CloudPup compact className="loading-pup" />
      <p>Sprinkling a little birthday magic...</p>
      <div className="loading-dots" aria-hidden="true"><i /><i /><i /></div>
    </div>
  );
}