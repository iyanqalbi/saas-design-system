import { X } from 'lucide-react'
import { useId, useState, type KeyboardEvent } from 'react'
import './TagInput.css'

export interface TagInputProps {
  label?: string
  value?: string[]
  defaultValue?: string[]
  placeholder?: string
  onValueChange?: (tags: string[]) => void
  className?: string
}

export function TagInput({
  label,
  value,
  defaultValue = [],
  placeholder = 'Add tag and press Enter',
  onValueChange,
  className = '',
}: TagInputProps) {
  const inputId = useId()
  const [internal, setInternal] = useState(defaultValue)
  const [draft, setDraft] = useState('')
  const tags = value ?? internal

  function commit(next: string[]) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  function addTag(raw: string) {
    const nextTag = raw.trim().replace(/,/g, '')
    if (!nextTag) return
    if (tags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
      setDraft('')
      return
    }
    commit([...tags, nextTag])
    setDraft('')
  }

  function removeTag(tag: string) {
    commit(tags.filter((item) => item !== tag))
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(draft)
    }
    if (event.key === 'Backspace' && !draft && tags.length > 0) {
      removeTag(tags[tags.length - 1]!)
    }
  }

  return (
    <div className={`tag-input ${className}`.trim()}>
      {label ? (
        <label className="tag-input__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className="tag-input__control">
        {tags.map((tag) => (
          <span key={tag} className="tag-input__chip">
            {tag}
            <button
              type="button"
              className="tag-input__remove"
              aria-label={`Remove ${tag}`}
              onClick={() => removeTag(tag)}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          id={inputId}
          className="tag-input__field"
          value={draft}
          placeholder={tags.length === 0 ? placeholder : ''}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addTag(draft)}
        />
      </div>
    </div>
  )
}
