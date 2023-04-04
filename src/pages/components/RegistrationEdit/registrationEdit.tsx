import { useState } from "react";
import { ModalInfo } from "../Modal/modalInfo";
import { RegistrationEditProps } from './types';

export function RegistrationEdit({ client, setModalOpen }: RegistrationEditProps) {
  const [modalOpen, setModalOpenState] = useState(true); // Renomeia aqui

  return (
    <>
      <ModalInfo isOpen={modalOpen} setIsOpen={() => {
        setModalOpenState(false);
        setModalOpen(false);
      }} backDropClose={true}>
        <h1>Esse é o modal edit</h1>
      </ModalInfo>
    </>
  )
}

export default RegistrationEdit;
