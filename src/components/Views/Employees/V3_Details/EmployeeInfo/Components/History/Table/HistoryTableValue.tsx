import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Icon } from '@/components/ui';

const HistoryTableValue = (props: { value: unknown; isJSON?: boolean }) => {
  const { value, isJSON = false } = props;

  const handleJSONButtonClick = () => {
    // Open a new tab and display the JSON content
    const newTab = window.open('', '_blank');

    const data = JSON.parse(value as string);
    const pretty = JSON.stringify(data, null, 2);

    if (newTab) {
      // Set the content of the new tab
      newTab.document.write(`<pre>${pretty}</pre>`);
      newTab.document.close();
    }
  };

  const isLink = typeof value === 'string' && value?.includes('http');

  if (isLink) {
    return (
      <Link
        className="nowrap btn btn-outline btn-sm text-black hover:text-white dark:text-white dark:hover:text-black"
        target="_blank"
        to={value}
      >
        <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
        VER
      </Link>
    );
  }

  if (isJSON) {
    return (
      <button
        className="nowrap btn btn-outline btn-sm text-black hover:text-white dark:text-white dark:hover:text-black"
        type="button"
        onClick={handleJSONButtonClick}
      >
        <Icon iconComponent={<MdArrowOutward />} title="Navegar" />
        VER
      </button>
    );
  }

  if (typeof value === 'string') {
    return <p>{value}</p>;
  }

  return <p>N/A</p>;
};
export default HistoryTableValue;
