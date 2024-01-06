import FileItem from './FileItem';

import { Modal } from '@/components/ui';

import { NotificationInfoContentProps } from '@/components/interface/views';

const FilesModal = (props: NotificationInfoContentProps) => {
  const { data } = props;

  return (
    <Modal title="Archivos adjuntos">
      {data.files?.map((file) => <FileItem file={file} key={file.id} />)}
    </Modal>
  );
};
export default FilesModal;
