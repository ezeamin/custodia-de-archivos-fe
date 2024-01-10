import { useModal } from '@/stores/useModal';

import { Alert, Modal } from '@/components/ui';

import { NewUserModalData } from '@/components/interface/views';

const NewUserModal = () => {
  const { data } = useModal() as NewUserModalData;

  return (
    <Modal id="newUser" title="Usuario creado!">
      <Alert type="success">
        El usuario ha sido creado correctamente. Se ha enviado un correo
        electrónico al empleado con las instrucciones para activar su cuenta.
      </Alert>
      <h2 className="mt-3 mb-2">
        Usuario: <b>{data?.data?.username}</b>
      </h2>
      <h2>
        Contraseña: <b>{data?.data?.password}</b>
      </h2>
    </Modal>
  );
};
export default NewUserModal;
