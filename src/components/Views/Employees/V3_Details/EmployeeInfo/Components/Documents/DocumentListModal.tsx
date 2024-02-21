import DocumentItem from './DocumentItem';

import { useModal } from '@/stores/useModal';

import { Alert, Modal } from '@/components/ui';

import { DocumentListModalData } from '@/components/interface/views';

const DocumentListModal = () => {
  const { data } = useModal() as DocumentListModalData;

  if (!data) return null;

  return (
    <Modal className="p-1" id="folderModal" title="Documentos">
      {data?.documents?.length === 0 && (
        <Alert>
          No se encontraron documentos en esta carpeta. Puede agregar nuevos
          desde el botón "NUEVO DOCUMENTO" detrás de esta ventana.
        </Alert>
      )}
      {data?.documents?.map((doc) => <DocumentItem doc={doc} key={doc.id} />)}
    </Modal>
  );
};
export default DocumentListModal;
