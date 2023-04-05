import { ButtonModal, Container, ContainerButton, ContainerModal, ContainerText, CustomX, Overlay, TextModal } from "./styles"

interface ModalInfoProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backDropClose?: boolean;
}

export const ModalInfo = ({ children, isOpen, setIsOpen, backDropClose }: ModalInfoProps) => {
  if (!isOpen) return null;

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e) e.preventDefault();
    setIsOpen(false)
  }
  return (
    <>
      {isOpen && <Overlay onClick={handleBackDropClick} />}
      <Container>
        <ContainerModal>
          <ContainerButton>
            <ButtonModal type="button" >
              <CustomX type="button" onClick={() => setIsOpen(false)} />
            </ButtonModal>
          </ContainerButton>
          <ContainerText>
            {children}
          </ContainerText>
        </ContainerModal>
      </Container>
    </>
  )
}
