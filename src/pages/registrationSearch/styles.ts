import { styled, Box, Heading } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 872,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Form = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const TextInputContainer = styled('div', {
  flex: '1',
  display: 'block',
  flexDirection: 'row',
  alignItems: 'center',
});

export const Text = styled('div', {
 paddingBottom: '$4'
});

export const FormError = styled('div', {

  [`${Text}`]: {
    color: '#ff3111'
  },
  span: {
    color: '#FF4136'
  }
})