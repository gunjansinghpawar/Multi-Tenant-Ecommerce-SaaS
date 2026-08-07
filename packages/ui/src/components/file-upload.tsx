"use client"

import * as React from "react"
import { cn } from "@commercex/utils"
import { UploadCloud, File, X, AlertCircle, RefreshCcw, CheckCircle2 } from "lucide-react"
import { Button } from "./button"
import { ProgressBar } from "./loading-states"

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in bytes
  accept?: string // e.g. "image/*,.pdf"
  className?: string
}

export function FileUpload({
  onFilesSelected,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const validateFiles = (files: File[]) => {
    setError(null)
    if (files.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} file(s).`)
      return false
    }
    for (const file of files) {
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds the maximum size of ${Math.round(maxSize / 1024 / 1024)}MB.`)
        return false
      }
    }
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (validateFiles(droppedFiles)) {
      onFilesSelected(droppedFiles)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      if (validateFiles(selectedFiles)) {
        onFilesSelected(selectedFiles)
      }
    }
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
            : "border-muted-foreground/25 bg-card/50 hover:bg-card/80 hover:border-primary/50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          className="hidden"
          onChange={handleFileInput}
        />
        
        <div className="rounded-full bg-primary/10 p-4 mb-4 text-primary">
          <UploadCloud className="h-8 w-8" />
        </div>
        
        <h3 className="text-base font-semibold">Click to upload or drag and drop</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {accept ? `Supported files: ${accept}` : "All file types supported"}
          <br />
          Max file size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------------------------------
// File Upload Item (For listing uploaded files with status)
// ----------------------------------------------------------------------------

export interface FileItemProps {
  file: File
  progress?: number // 0-100
  status?: "uploading" | "success" | "error"
  errorMessage?: string
  onCancel?: () => void
  onRetry?: () => void
  onRemove?: () => void
}

export function FileUploadItem({
  file,
  progress = 0,
  status = "uploading",
  errorMessage,
  onCancel,
  onRetry,
  onRemove
}: FileItemProps) {
  const isImage = file.type.startsWith('image/')
  const objectUrl = React.useMemo(() => isImage ? URL.createObjectURL(file) : null, [file, isImage])
  
  React.useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [objectUrl])

  return (
    <div className={cn(
      "flex items-center gap-4 p-3 rounded-lg border bg-card transition-all",
      status === "error" && "border-destructive/50 bg-destructive/5"
    )}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border bg-muted overflow-hidden">
        {objectUrl ? (
          <img src={objectUrl} alt={file.name} className="h-full w-full object-cover" />
        ) : (
          <File className="h-6 w-6 text-muted-foreground" />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center min-w-0">
        <div className="flex items-center justify-between gap-4 mb-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <div className="flex items-center gap-2 shrink-0">
            {status === "error" && (
              <span className="text-xs font-medium text-destructive flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" /> Failed
              </span>
            )}
            {status === "success" && (
              <span className="text-xs font-medium text-emerald-500 flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Done
              </span>
            )}
            {status === "uploading" && (
              <span className="text-xs font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
            )}
          </div>
        </div>

        {status === "uploading" && (
          <ProgressBar value={progress} className="mt-1" />
        )}
        
        {status === "error" && errorMessage && (
          <p className="text-xs text-destructive truncate">{errorMessage}</p>
        )}
        
        {status !== "uploading" && status !== "error" && (
          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {status === "uploading" && onCancel && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        )}
        {status === "error" && onRetry && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={onRetry}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        )}
        {(status === "success" || status === "error") && onRemove && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
