import { ButtonModal, Container, ContainerButton, ContainerModal, ContainerText, CustomX, Overlay, TextModal } from "./styles"


export const ModalInfo = ({ children, isOpen, setIsOpen, backDropClose }) => {
  if (!isOpen) return null;

  const handleBackDropClick = (e) => {
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