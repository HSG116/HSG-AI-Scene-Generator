import React, { useRef, useCallback } from 'react';
import { UploadedFile } from '../types';
import { UploadIcon, TrashIcon } from './IconComponents';

interface ImageUploaderProps {
  id: string;
  label?: string;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  onFileNameChange: (id: string, newName: string) => void;
  multiple?: boolean;
  nameInputPlaceholder: string;
  buttonText: string;
}

const readFileAsBase64 = (file: File): Promise<{ preview: string, base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve({ preview: result, base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, files, onFilesChange, onFileNameChange, multiple = false, nameInputPlaceholder, buttonText }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      const newFilesPromises = fileList.map(async (file: File) => {
        const { preview, base64, mimeType } = await readFileAsBase64(file);
        return {
          id: `${file.name}-${Date.now()}`,
          file,
          preview,
          base64,
          name: file.name.split('.')[0],
          mimeType,
        };
      });
      const newFiles = await Promise.all(newFilesPromises);
      onFilesChange(multiple ? [...files, ...newFiles] : [newFiles[0]]);
    }
  }, [files, multiple, onFilesChange]);

  const removeFile = (fileId: string) => {
    onFilesChange(files.filter(f => f.id !== fileId));
  };

  return (
    <div>
      {label && <h3 className="text-lg font-semibold mb-2 text-emerald-300">{label}</h3>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {files.map((file) => (
          <div key={file.id} className="relative animate-fade-in">
            <img src={file.preview} alt={file.name} className="w-full h-32 object-cover rounded-lg shadow-md" />
            <button
              onClick={() => removeFile(file.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-600/80 text-white rounded-full backdrop-blur-sm hover:bg-red-500 transition-all transform hover:scale-110"
              aria-label={`Remove ${file.name}`}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={file.name}
              onChange={(e) => onFileNameChange(file.id, e.target.value)}
              placeholder={nameInputPlaceholder}
              className="w-full mt-2 bg-slate-700 border border-slate-600 rounded-md p-2 text-xs text-center focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        ))}
      </div>
      {(multiple || files.length === 0) && (
         <label htmlFor={id} className="cursor-pointer flex items-center justify-center w-full p-4 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:bg-slate-800 hover:border-emerald-500 hover:text-emerald-400 transition-all">
            <UploadIcon className="w-6 h-6 me-2" />
            <span>{buttonText}</span>
            <input
              id={id}
              ref={inputRef}
              type="file"
              multiple={multiple}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;