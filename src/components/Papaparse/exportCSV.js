import { saveAs } from "file-saver";
import Papa from "papaparse";

const exportToCSV = (data, filename = "contacts.csv") => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};

export default exportToCSV;
