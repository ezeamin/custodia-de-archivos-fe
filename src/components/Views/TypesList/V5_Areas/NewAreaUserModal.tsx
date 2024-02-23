import { useModal } from '@/stores/useModal';

import { Alert, Modal } from '@/components/ui';

import { NewUserModalData } from '@/components/interface/views';

const NewAreaUserModal = () => {
  const { data } = useModal() as NewUserModalData;

  return (
    <Modal id="newAreaUser" title="Área creada!">
      <Alert type="success">
        El area fue creada correctamente. Así también, se generó un usuario para
        la misma. Se ha enviado un correo electrónico al responsable indicado,
        con las instrucciones para activar su cuenta.
      </Alert>
      <div className="divider" />
      <p>
        El usuario será un número de 8 dígitos, y la contraseña que se muestra a
        continuación será temporal. El responsable deberá cambiarla cuando se
        loguee por primera vez
      </p>
      <h2 className="mb-2 mt-3">
        Usuario: <b style={{ fontFamily: 'Arial' }}>{data?.username}</b>
      </h2>
      <h2>
        Contraseña: <b style={{ fontFamily: 'Arial' }}>{data?.password}</b>
      </h2>
    </Modal>
  );
};
export default NewAreaUserModal;
