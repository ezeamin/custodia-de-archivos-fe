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
      <div className="divider" />
      <p>
        El usuario será el DNI del empleado, y la contraseña que se muestra a
        continuación será temporal. El empleado deberá cambiarla cuando se
        loguee por primera vez
      </p>
      <h2 className="mb-2 mt-3">
        Usuario: <b>{data?.username}</b>
      </h2>
      <h2>
        Contraseña: <b>{data?.password}</b>
      </h2>
    </Modal>
  );
};
export default NewUserModal;
