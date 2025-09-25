import React from 'react';
import { Download, FileText, Mail, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ExportPanel: React.FC = () => {
  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF report
    console.log('Exporting PDF report...');
  };

  const handleExportCSV = () => {
    // In a real app, this would export data to CSV
    console.log('Exporting CSV data...');
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Opening share dialog...');
  };

  const handlePrint = () => {
    // In a real app, this would open print dialog with optimized layout
    window.print();
  };

  const handleEmail = () => {
    // In a real app, this would open email composition with report
    console.log('Opening email composer...');
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handlePrint} className="cursor-pointer">
            <Printer className="mr-2 h-4 w-4" />
            Print Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleEmail} className="cursor-pointer">
            <Mail className="mr-2 h-4 w-4" />
            Email Report
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            Copy Share Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};