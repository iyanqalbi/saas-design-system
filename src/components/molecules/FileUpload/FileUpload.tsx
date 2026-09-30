import { FileUp, X } from 'lucide-react'
import { useId, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { Text } from '../../atoms/Text'
import './FileUpload.css'

export interface FileUploadProps {
  label?: string
  hint?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  onFilesChange?: (files: File[]) => void
  className?: string
}

export function FileUpload({
  label = 'Upload files',
  hint = 'CSV, PNG, or PDF up to 10MB',
  accept,
  multiple = false,
  disabled = false,
  onFilesChange,
  className = '',
}: FileUploadProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)

  function commit(next: File[]) {
    setFiles(next)
    onFilesChange?.(next)
  }

  function handleFiles(list: FileList | null) {
    if (disabled || !list) return
    const next = multiple ? [...files, ...Array.from(list)] : Array.from(list).slice(0, 1)
    commit(next)
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files)
    event.target.value = ''
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  return (
    <div className={`file-upload ${disabled ? 'file-upload--disabled' : ''} ${className}`.trim()}>
      <div
        className={`file-upload__dropzone ${dragging && !disabled ? 'file-upload__dropzone--active' : ''}`}
        onDragEnter={(event) => {
          event.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <span className="file-upload__icon" aria-hidden>
          <FileUp size={20} />
        </span>
        <Text as="p" variant="bodySemibold">
          {label}
        </Text>
        <Text as="p" variant="muted">
          {hint}
        </Text>
        <Button size="sm" variant="ghost" disabled={disabled} onClick={() => inputRef.current?.click()}>
          Browse files
        </Button>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="file-upload__input"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onChange}
        />
      </div>

      {files.length > 0 ? (
        <ul className="file-upload__list">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.size}-${index}`} className="file-upload__item">
              <div>
                <Text as="p" variant="bodyMedium">
                  {file.name}
                </Text>
                <Text as="p" variant="muted" className="file-upload__size">
                  {(file.size / 1024).toFixed(1)} KB
                </Text>
              </div>
              <IconButton
                label={`Remove ${file.name}`}
                size="sm"
                tone="ghost"
                disabled={disabled}
                onClick={() => commit(files.filter((_, i) => i !== index))}
              >
                <X size={14} />
              </IconButton>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
