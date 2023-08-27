import { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';

export default function PdfReader() {
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('pdfFile', file);

    fetch('http://localhost:3000/dashboard/registro/facturas', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(data => {
        setText(data);
      });
  };

  const renderTable = () => {
    const lines = text.split('\n');
    const data = lines.map(line => {
      const parts = line.split(': ');
      return { key: parts[0], value: parts[1] };
    });

    return (
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Key</th>
            <th className="px-4 py-2 border-b">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{row.key}</td>
              <td className="border px-4 py-2">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        <FaFilePdf className="text-red-600 mr-2" />
        Lector de PDF
      </h1>
      <input type="file" onChange={handleFileChange} className="mb-4 p-2 border rounded" />
      {text && renderTable()}
    </div>
  );
};

