'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Link2, 
  Image as ImageIcon, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  HardDrive, 
  RefreshCw, 
  Info,
  Check,
  Copy,
  FileCheck
} from 'lucide-react';
import { 
  extractGoogleDriveFileId, 
  formatGoogleDriveImageUrl, 
  isGoogleDriveUrl,
  getGoogleDriveThumbnailUrl,
  isBase64DataUrl,
  getBase64SizeEstimate
} from '@/lib/drive-utils';

interface GoogleDriveImageInputProps {
  value: string;
  onChange: (formattedUrl: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  required?: boolean;
  className?: string;
}

export default function GoogleDriveImageInput({
  value,
  onChange,
  label = 'Image Source',
  placeholder = 'Paste Google Drive sharing link here...',
  helperText,
  aspectRatio = 'video',
  required = false,
  className = '',
}: GoogleDriveImageInputProps) {
  // Determine initial mode based on value
  const initialMode = isBase64DataUrl(value) 
    ? 'file' 
    : isGoogleDriveUrl(value) || !value 
    ? 'drive' 
    : 'url';

  const [activeTab, setActiveTab] = useState<'drive' | 'url' | 'file'>(initialMode);
  const [inputValue, setInputValue] = useState(value);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with prop when value changes from outside
  useEffect(() => {
    setInputValue(value);
    setImageError(false);
    setFallbackAttempted(false);
  }, [value]);

  const detectedFileId = extractGoogleDriveFileId(inputValue);
  const isDrive = isGoogleDriveUrl(inputValue) || Boolean(detectedFileId);
  const isBase64 = isBase64DataUrl(value);

  // Handle Google Drive Link Input
  const handleDriveInputChange = (rawText: string) => {
    setInputValue(rawText);
    setImageError(false);
    setFallbackAttempted(false);

    if (!rawText.trim()) {
      onChange('');
      return;
    }

    const fileId = extractGoogleDriveFileId(rawText);
    if (fileId) {
      const cdnUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
      onChange(cdnUrl);
    } else {
      onChange(rawText.trim());
    }
  };

  // Handle Direct URL Input
  const handleUrlInputChange = (rawText: string) => {
    setInputValue(rawText);
    setImageError(false);
    onChange(rawText.trim());
  };

  // Handle Local File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Warning for large files
    if (file.size > 2 * 1024 * 1024) {
      alert(`Note: Uploading large local files (${(file.size / (1024 * 1024)).toFixed(1)} MB) consumes browser and database storage. For best performance, consider pasting a Google Drive link.`);
    }

    const reader = new FileReader();
    setImageLoading(true);
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setInputValue(base64);
      setImageLoading(false);
      setImageError(false);
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  // Handle image error and try fallback URL
  const handleImageError = () => {
    if (detectedFileId && !fallbackAttempted) {
      setFallbackAttempted(true);
      const fallbackUrl = `https://drive.google.com/thumbnail?id=${detectedFileId}&sz=w1200`;
      onChange(fallbackUrl);
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const aspectClass = {
    video: 'aspect-[16/9] max-h-56',
    square: 'aspect-square max-h-48 max-w-48 mx-auto',
    portrait: 'aspect-[3/4] max-h-56 max-w-44 mx-auto',
    auto: 'min-h-40 max-h-60',
  }[aspectRatio];

  return (
    <div className={`space-y-3 ${className}`}>
      
      {/* Label and Storage Indicator */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {value && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
            isBase64 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-emerald-100 text-emerald-800'
          }`}>
            {isBase64 ? (
              <>⚠️ Base64 ({getBase64SizeEstimate(value)} DB Storage)</>
            ) : isDrive ? (
              <>✨ Google Drive CDN (0 KB DB Storage)</>
            ) : (
              <>🔗 Direct Web URL (0 KB DB Storage)</>
            )}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-100/80 p-1 rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('drive')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'drive'
              ? 'bg-white text-school-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5 text-school-600" />
          <span>Google Drive Link</span>
          <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
            Recommended
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'url'
              ? 'bg-white text-school-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Link2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Image URL / Path</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('file')}
          className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'file'
              ? 'bg-white text-school-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-3.5 h-3.5 text-slate-500" />
          <span>Local File</span>
        </button>
      </div>

      {/* Inputs Area */}
      <div>
        {activeTab === 'drive' && (
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder={placeholder}
                value={isBase64 ? '' : inputValue}
                onChange={(e) => handleDriveInputChange(e.target.value)}
                className="w-full pl-9 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-school-600 focus:bg-white outline-none"
              />
              <HardDrive className="w-4 h-4 text-school-600 absolute left-3 top-3" />
              
              {value && !isBase64 && (
                <div className="absolute right-2 top-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-1 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-md text-[10px] flex items-center gap-0.5"
                    title="Copy direct CDN link"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  {detectedFileId && (
                    <a
                      href={`https://drive.google.com/file/d/${detectedFileId}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 hover:bg-slate-200 text-slate-500 hover:text-school-700 rounded-md text-[10px]"
                      title="Open in Google Drive"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Drive Link Detection Badge & Instructions */}
            {detectedFileId ? (
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-[11px] text-emerald-900">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    <strong>Valid Google Drive Image Detected</strong> (ID: <code className="bg-emerald-100/80 px-1 py-0.5 rounded font-mono text-[10px]">{detectedFileId.slice(0, 12)}...</code>)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                  CDN Active
                </span>
              </div>
            ) : (
              <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold">How to use Google Drive photo links:</p>
                  <p className="text-slate-600 text-[10px] leading-relaxed">
                    1. In Google Drive, right-click your photo &rarr; click <strong>Share</strong> &rarr; change General Access to <strong>"Anyone with the link can view"</strong>.<br />
                    2. Copy the link and paste it above. It will instantly preview and upload at zero database cost!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'url' && (
          <div className="space-y-1.5">
            <div className="relative">
              <input
                type="text"
                placeholder="https://example.com/photo.jpg or /images/..."
                value={isBase64 ? '' : inputValue}
                onChange={(e) => handleUrlInputChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-school-600 focus:bg-white outline-none font-mono"
              />
              <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <p className="text-[10px] text-slate-400">
              Provide any direct image URL (Unsplash, HTTPS link, or public website folder path).
            </p>
          </div>
        )}

        {activeTab === 'file' && (
          <div className="space-y-1.5">
            <div className="border border-dashed border-slate-300 rounded-xl p-3 bg-slate-50 hover:bg-slate-100/80 transition-colors">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-school-900 file:text-white hover:file:bg-school-950 cursor-pointer"
              />
            </div>
            <p className="text-[10px] text-amber-700 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Note: Direct file uploads store base64 data in the browser. Using Google Drive links is strongly recommended for heavy galleries.
            </p>
          </div>
        )}
      </div>

      {/* Live Image Preview Card */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5" /> Live Image Preview
          </span>
          {value && (
            <button
              type="button"
              onClick={() => {
                setInputValue('');
                onChange('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="text-[10px] font-bold text-red-600 hover:text-red-800 hover:underline"
            >
              Clear Image
            </button>
          )}
        </div>

        <div className={`w-full rounded-2xl overflow-hidden bg-slate-100 border-2 ${
          imageError ? 'border-red-300 bg-red-50/50' : value ? 'border-emerald-300 shadow-sm' : 'border-dashed border-slate-200'
        } flex items-center justify-center relative group ${aspectClass}`}>
          
          {value && !imageError ? (
            <>
              <img
                src={value}
                alt="Preview"
                onLoad={() => {
                  setImageLoading(false);
                  setImageError(false);
                }}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-[10px] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Ready to Publish
                </span>
                <span className="text-slate-300 truncate max-w-[150px]">
                  {detectedFileId ? `Drive: ${detectedFileId.slice(0, 8)}...` : 'URL Link'}
                </span>
              </div>
            </>
          ) : imageError ? (
            <div className="p-4 text-center space-y-2 max-w-sm">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <div>
                <p className="text-xs font-bold text-red-800">Unable to load image preview</p>
                <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                  If this is a Google Drive link, please verify that General Access is set to <strong>"Anyone with the link can view"</strong>.
                </p>
              </div>
              {detectedFileId && (
                <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={`https://drive.google.com/file/d/${detectedFileId}/view`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 shadow-xs"
                  >
                    <span>Check Drive Permissions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setImageError(false);
                      const fallback = `https://drive.google.com/thumbnail?id=${detectedFileId}&sz=w1600`;
                      onChange(fallback);
                    }}
                    className="px-2.5 py-1 bg-school-900 text-white hover:bg-school-950 rounded-lg text-[10px] font-bold inline-flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry CDN</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-6 text-slate-400 space-y-1">
              <ImageIcon className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs font-medium text-slate-500">No image chosen</p>
              <p className="text-[10px] text-slate-400">Paste a Google Drive link or URL above</p>
            </div>
          )}
        </div>
      </div>

      {helperText && (
        <p className="text-[10px] text-slate-400">{helperText}</p>
      )}

    </div>
  );
}
