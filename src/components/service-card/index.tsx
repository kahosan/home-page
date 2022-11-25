import { useEditServices } from '@/hooks/use-edit-services';

import type { ServiceData } from '@/types/service-card';

export default function ServiceCard(props: ServiceData) {
  const { editMode, handleDeleteService } = useEditServices();

  const { name, description, icon, path } = props;

  return (
    <div className="m-2 flex">
      <div
        className="flex-1 dark:bg-#1D1D1D bg-#E2E2E2 p-3 rd-2 position-relative max-w-80"
      >
        <div onClick={() => handleDeleteService(name)} className={`absolute top-1.5 right--2 i-carbon-trash-can transition-all ${editMode ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
        <a href={path} className="text-center opacity-animation-3 relative">
          <div className="flex justify-center items-center">
            <div className={`i-carbon-${icon.trim()} text-2xl mr-2`} />
            <p className="text-3.5">{name.toUpperCase()}</p>
          </div>
          <small className="mt-2 text-3 op-70 block">{description}</small>
        </a>
      </div>
    </div>
  );
}
