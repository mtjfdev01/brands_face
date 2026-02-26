'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useBoxStore } from '@/store/useBoxStore';

const MAX_SIZE = 2048;

function resizeImage(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width <= MAX_SIZE && img.height <= MAX_SIZE) {
        resolve(dataUrl);
        return;
      }
      const scale = Math.min(MAX_SIZE / img.width, MAX_SIZE / img.height);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = dataUrl;
  });
}

export default function UploadTexture() {
  const {
    texture,
    setTexture,
    fitToFace,
    setFitToFace,
    cloneToAllSides,
    setCloneToAllSides,
    cloneWithFinish,
    setCloneWithFinish,
  } = useBoxStore();

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        const resized = await resizeImage(dataUrl);
        setPreview(resized);
        setTexture(resized);
      };
      reader.readAsDataURL(file);
    },
    [setTexture]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = () => {
    setTexture(null);
    setPreview(null);
    setFileName('');
    setCloneToAllSides(false);
    setCloneWithFinish(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Artwork Upload
      </h3>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? 'border-accent bg-accent/10 scale-[1.02]'
            : 'border-gray-600 hover:border-gray-400 hover:bg-surface/50'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-24 object-contain rounded-lg"
            />
            <p className="text-xs text-gray-400 truncate">{fileName}</p>
          </div>
        ) : (
          <div className="py-4">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-400">
              {isDragActive ? 'Drop image here' : 'Drop artwork or click'}
            </p>
            <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 2048px</p>
          </div>
        )}
      </div>

      {/* Controls when texture is applied */}
      {texture && (
        <div className="space-y-3">
          {/* Fit-to-face toggle */}
          <ToggleSwitch
            label="Fit to face"
            checked={fitToFace}
            onChange={setFitToFace}
          />

          {/* Clone artwork to all sides */}
          <ToggleSwitch
            label="Clone to all sides"
            checked={cloneToAllSides}
            onChange={(v) => {
              setCloneToAllSides(v);
              if (!v) setCloneWithFinish(false);
            }}
          />

          {/* Clone with finish effect */}
          <ToggleSwitch
            label="Clone with finish"
            checked={cloneWithFinish}
            onChange={setCloneWithFinish}
            disabled={!cloneToAllSides && !cloneWithFinish}
          />

          {/* Remove button */}
          <button
            onClick={handleRemove}
            className="w-full py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10
              rounded-lg transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
          >
            Remove Artwork
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toggle Switch                                                      */
/* ------------------------------------------------------------------ */
function ToggleSwitch({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer group ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
          disabled={disabled}
        />
        <div
          className={`w-9 h-5 rounded-full transition-colors duration-200 ${
            checked ? 'bg-accent' : 'bg-gray-600'
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-y-0.5 ${
              checked ? 'translate-x-[18px]' : 'translate-x-0.5'
            }`}
          />
        </div>
      </div>
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}
