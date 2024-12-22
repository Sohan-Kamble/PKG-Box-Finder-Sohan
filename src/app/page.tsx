'use client'
import { useState } from "react";
import { parseCSV, findBestContainers } from "@/utils/csvUtils";
import FileUploader from "@/components/FileUploader";
import ContainerResults from "@/components/ContainerResults";
import AdminAuthModal from "@/components/AdminAuthModal";

export default function ContainerPage() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({
    length: 0,
    width: 0,
    height: 0,
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleFileUpload = async (file: File) => {
    const data = await parseCSV(file);
    setCsvData(data);
  };

  const handleFindContainers = () => {
    if (!csvData.length) return alert("Please upload a CSV file first!");
    const bestContainers = findBestContainers(csvData, dimensions);
    setResults(bestContainers);
  };

  const switchToAdminMode = () => {
    setIsAuthModalOpen(true); // Open the authentication modal
  };

  const handleAdminAuth = (isAuthenticated: boolean) => {
    setIsAuthModalOpen(false);
    if (isAuthenticated) {
      setIsAdmin(true);
    } else {
      alert("Authentication failed!");
    }
  };

  return (
    <main>
      <h1>Container Finder</h1>
      <button onClick={switchToAdminMode}>
        {isAdmin ? "Switch to User Mode" : "Switch to Admin Mode"}
      </button>

      {isAdmin && <p>Admin Mode Enabled</p>}
      <FileUploader onFileUpload={handleFileUpload} />
      <div>
        <h2>Enter Dimensions</h2>
        <input
          type="number"
          placeholder="Length"
          onChange={(e) =>
            setDimensions({ ...dimensions, length: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Width"
          onChange={(e) =>
            setDimensions({ ...dimensions, width: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Height"
          onChange={(e) =>
            setDimensions({ ...dimensions, height: Number(e.target.value) })
          }
        />
        <button onClick={handleFindContainers}>Find Best Containers</button>
      </div>
      <ContainerResults results={results} />

      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAdminAuth}
      />
    </main>
  );
}
