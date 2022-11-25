import Modal, { ModalAction } from './modal';

export type ModalComponentType = typeof Modal & {
  Action: typeof ModalAction
};

(Modal as ModalComponentType).Action = ModalAction;

export default Modal as ModalComponentType;
