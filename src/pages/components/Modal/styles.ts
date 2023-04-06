import { styled, Box, Heading, Text } from '@ignite-ui/react'
import { X } from 'phosphor-react';

export const Container = styled('main', {
  maxWidth: 872,
  margin: '$20 auto $4',
  padding: '0 $4',
  // border: '1px solid red',
})

export const Overlay = styled('div', {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
  backdropFilter: 'blur(5px)', // define o efeito de desfoque
});


export const ContainerModal = styled('div', {
  display: 'block',
  justifyContent: 'center', // add this line
  alignItems: 'center', // add this line
  maxWidth: 872,
  width: '40rem',
  // height: '10rem',
  margin: '$20 auto $4',
  position: 'fixed',
  top: 'calc(50% - 280px)', // move o modal 100 pixels para cima
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  backgroundColor: '$gray700',
  border: 'none',
  borderRadius: '8px',
  // boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
  // border: '1px solid red',

});

export const ContainerButton = styled('div', {
  backgroundColor: 'transparent',
  color: '$gray100',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  border: 'none',
  position: 'absolute',
  // top: '1.8rem',
  // right: '1rem',
  width: '100%',
  height: '100%',
  // border: '1px solid red'
});


export const ButtonModal = styled('button', {
  color: '$ignite300',
  zIndex: 1002,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '3rem',
  height: '3rem',
  border: 'none',
  opacity: 0.8, // 80% de opacidade do elemento
  backgroundColor: 'transparent',
  
  // border: '1px solid red'

})

export const ContainerText = styled('div', {
  display: 'flex',
  backgroundColor: 'transparent',
  width: '100%',
  color: '$gray100',
  border: 'none',
  textAlign: 'center',
  height: '100%',
  // border: '1px solid red'
})

export const CustomX = styled(X, {
  fontSize: '4rem',

  '&:hover': {
    cursor: 'pointer',
    color: '#00ffb3',
  },
});

