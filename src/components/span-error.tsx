export default function SpanError({ error }: { error?: string }) {
  return <>{error && <span className="text-red-500">{error}</span>}</>;
}
