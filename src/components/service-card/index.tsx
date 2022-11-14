import type { ServiceCardProps } from '@/types/service-card';
import { useEditServices } from '@/hooks/use-edit-services';

export default function ServiceCard(props: ServiceCardProps) {
  const { edit } = useEditServices();

  const { name, description, icon, path } = props;

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    alert('网页无法读写文件，绞尽脑汁中...');
  };

  return (
    <div className="m-2">
      <div
        className="dark:bg-#1D1D1D bg-#E2E2E2 p-3 rd-2 position-relative max-w-80 lt-md:w-full"
      >
        <div onClick={() => handleDelete()} className={`absolute top-1.5 right--2 i-carbon-trash-can transition-all ${edit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
        <a href={path} className="text-center opacity-animation-3">
          <div className="flex justify-center items-center">
            <div className={`i-carbon-${icon} text-2xl mr-2`} />
            <p className="text-0.9rem">{name.toUpperCase()}</p>
          </div>
          <small className="my-2 text-12px op-70 block">{description}</small>
        </a>
      </div>
    </div>
  );
}
