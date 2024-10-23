export interface UploadResponse {
    message: string;
    data: {
      file_id: string;
      url: string;
      expiration: string;
      original_name: string;
    }
  }
  
  export interface FileUploadProps {
    onFileSelect: (file: File | null) => void;
    selectedFile: File | null;
  }
  
  export interface DurationSelectProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export interface ShareLinkProps {
    url: string;
  }
  