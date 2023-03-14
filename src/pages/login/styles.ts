import { styled, Box, Heading, Text } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4',
})

export const Header = styled('div', {
  padding: '0 $6',
  textAlign: 'center',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const LogimMenssage = styled('div', {
  gap: '10px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  [`> ${Text}`]: {
    color: '$gray200',
  },
})

export const Line = styled('div', {
  color: '$gray100',
  flexGrow: '1',
  height: '1px',
  backgroundColor: '$gray500',
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

export const ButtonContainer = styled('div', {
  padding: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const SocialButton = styled('button', {
  borderRadius: '8px',
  fontSize: '34px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  marginRight: '20px',
  backgroundColor: 'transparent',
  border: '1px solid',
  color: '$gray400',

  '&:hover': {
    backgroundColor: '$ignite500',
    color: '#ffffff',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
