"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as Papa from "papaparse";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type ExportButtonsProps = {
  data: any[];
  filename?: string;
};

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  data,
  filename = "export",
}) => {
  const handleCSVExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    downloadBlob(blob, `${filename}.csv`);
  };

  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const handlePDFExport = () => {
    const doc = new jsPDF();
    const headers = Object.keys(data[0]);
    const rows = data.map((item) => Object.values(item));
    autoTable(doc, {
       head: [['Name', 'Age']],
       body: rows as (string | number)[][],
    });
    doc.save(`${filename}.pdf`);
  };

  const downloadBlob = (blob: Blob, name: string) => {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 my-4">
      <Button variant="outline" onClick={handleCSVExport}>
        <Download className="w-4 h-4 mr-2" />
        CSV
      </Button>
      <Button variant="outline" onClick={handleExcelExport}>
        <Download className="w-4 h-4 mr-2" />
        Excel
      </Button>
      <Button variant="outline" onClick={handlePDFExport}>
        <Download className="w-4 h-4 mr-2" />
        PDF
      </Button>
    </div>
  );
};
