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

export const TextInput = styled('input', {
  backgroundColor: 'transparent !important',
  border: 'none',
  borderBottom: '1px solid #333',
  color: '#333',

  '&:-webkit-autofill, &:-internal-autofill-selected': {
    backgroundColor: 'transparent !important',
  },

  '&::placeholder': {
    color: '#333',
  },

  '& input:-webkit-autofill': {
    '-webkit-box-shadow': '0 0 0 30px white inset !important',
    '-webkit-text-fill-color': '#333 !important',
  },

});

export const TextAcount = styled('div', {
  color: '$gray400',
  '& > a': {
    color: '$ignite500',
  },
  '& > a:hover': {
    color: '$ignite300',
    textDecoration: 'underline',
  },
});

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

export const ShowPasswordButton = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  padding: '0 16px',
  backgroundColor: 'transparent',
  color: '$gray400',
  marginTop: '8px',
  borderRadius: '4px',
  border: '1px solid $gray400',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$ignite500',
    color: '#ffffff',
  },

  '&.active': {
    backgroundColor: '$gray500',
    color: '$gray100'
  }
});

export const FormError = styled('div', {


  [`${Text}`]: {
    color: '$gray400'
  },
  span: {
    color: '#FF4136'
  }

})