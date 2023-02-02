import clsx from 'clsx';

import { useAtom } from 'jotai';

import { useEditServices } from 'src/hooks/use-edit-services';
import { themeAtom } from 'src/pages/_app';

import type { Service } from 'src/types/services';

export default function ServiceCard(props: Service) {
  const { isEdit, handleDeleteService } = useEditServices();
  const [themeType] = useAtom(themeAtom);

  const { name, description, icon, path } = props;

  return (
    <div className="m-2 flex">
      <div
        className={clsx('flex-1 p-3 rd-2 position-relative max-w-80', themeType === 'IDark' ? 'bg-#1D1D1D' : 'bg-#E2E2E2')}
      >
        <div onClick={() => handleDeleteService(name)} className={`absolute top-1.5 right--2 i-carbon-trash-can transition-all ${isEdit ? 'visible op-100' : 'invisible op-0'} cursor-pointer z999`} />
        <a href={path} className="text-center opacity-animation-3 relative color-inherit">
          <div className="flex justify-center items-center">
            <div className={`i-carbon-${icon.trim()} text-2xl mr-2`} />
            <p className="text-3.5 m-0">{name.toUpperCase()}</p>
          </div>
          <small className="mt-2 text-3 op-70 block">{description}</small>
        </a>
      </div>
    </div>
  );
}
