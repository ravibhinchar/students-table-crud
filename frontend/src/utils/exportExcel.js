import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, fileName = 'students_data.xlsx') => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(dataBlob, fileName);
};
