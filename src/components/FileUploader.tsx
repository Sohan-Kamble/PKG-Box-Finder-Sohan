interface FileUploaderProps {
    onFileUpload: (file: File) => void;
  }
  
  export default function FileUploader({ onFileUpload }: FileUploaderProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileUpload(file);
      }
    };
  
    return (
      <div>
        <h2>Upload CSV File</h2>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
    );
  }
  