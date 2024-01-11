import FileItem from './FileItem';

import { Modal } from '@/components/ui';

import { NotificationInfoContentProps } from '@/components/interface/views';

const FilesModal = (props: NotificationInfoContentProps) => {
  const { data } = props;

  return (
    <Modal id="filesModal" title="Archivos adjuntos">
      <div className="flex flex-col gap-3">
        {data.files?.map((file) => <FileItem file={file} key={file.id} />)}
      </div>
    </Modal>
  );
};
export default FilesModal;
