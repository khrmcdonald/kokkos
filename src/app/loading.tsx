export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-cream to-cream-dark">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-sage/20 border-t-sage rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sage-light text-sm">Loading...</p>
      </div>
    </div>
  )
}
