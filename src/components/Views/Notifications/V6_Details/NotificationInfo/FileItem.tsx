import { IoDocumentAttach } from 'react-icons/io5';

import { Button, Icon } from '@/components/ui';

import { NotificationFileItemProps } from '@/components/interface/views';

const FileItem = (props: NotificationFileItemProps) => {
  const { file } = props;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = file.url;
    a.target = '_blank';
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
