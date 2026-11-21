/**
 * The book’s 7.5% motif: a static line with exactly 7.5% marked in coral.
 * It illustrates an idea. It is not data, a counter or a progress indicator, so it
 * has no axis, no labels and no animation.
 */
export function ConceptBar({ label }: { label: string }) {
  return (
    <div className="concept-bar" role="img" aria-label={label}>
      <span className="concept-bar__mark" />
    </div>
  )
}
