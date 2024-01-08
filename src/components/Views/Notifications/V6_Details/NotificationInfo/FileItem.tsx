import { IoDocumentAttach } from 'react-icons/io5';

import { Button, Icon } from '@/components/ui';

import { openFile } from '@/utilities/utils';

import { NotificationFileItemProps } from '@/components/interface/views';

const FileItem = (props: NotificationFileItemProps) => {
  const { file } = props;

  const handleDownload = () => {
    openFile(file.url, file.name);
  };

  return (
    <article className="flex justify-between">
      <div className="flex items-center gap-2">
        <Icon
          iconComponent={<IoDocumentAttach size="1.5em" />}
          title="Archivo"
        />
        <p className="max-w-[10ch] md:max-w-none truncate">{file.name}</p>
      </div>
      <Button
        className="text-white"
        colorLight="btn-primary"
        onClick={handleDownload}
      >
        Abrir
      </Button>
    </article>
  );
};
export default FileItem;
