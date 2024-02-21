import { useEffect, useState } from 'react';

import DocumentItem from './DocumentItem';

import { useZodForm } from '@/hooks';
import { useModal } from '@/stores/useModal';

import { Alert, Modal, TextInput } from '@/components/ui';

import { searchDocumentSchema } from '@/form-schemas/schemas/employees/searchDocumentSchema';

import { DocumentListModalData } from '@/components/interface/views';

const DocumentListModal = () => {
  const { data } = useModal() as DocumentListModalData;
  const { control, watch } = useZodForm(searchDocumentSchema);

  const searchValue = watch('query');

  const [filteredData, setFilteredData] = useState(data?.documents || []);

  // -------------------------------------------------
  // EFFECTS
  // -------------------------------------------------

  useEffect(() => {
    if (searchValue) {
      const filtered = data?.documents?.filter((doc) =>
        doc.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data?.documents || []);
    }
  }, [searchValue, data?.documents]);

  // -------------------------------------------------
  // RENDER
  // -------------------------------------------------

  if (!data) return null;

  return (
    <Modal className="p-1" id="folderModal" title="Documentos">
      {data.documents && data.documents.length === 0 ? (
        <Alert>
          No se encontraron documentos en esta carpeta. Puede agregar nuevos
          desde el botón &quot;NUEVO DOCUMENTO&quot; detrás de esta ventana.
        </Alert>
      ) : (
        <TextInput
          className="mb-4 mt-2 w-full"
          control={control}
          label="Buscar por nombre"
          name="query"
        />
      )}
      {filteredData.map((doc) => (
        <DocumentItem doc={doc} key={doc.id} />
      ))}
      {filteredData.length === 0 && searchValue && searchValue?.length > 0 && (
        <p className="mb-3 mt-10 text-center">No se encontraron resultados</p>
      )}
    </Modal>
  );
};
export default DocumentListModal;
