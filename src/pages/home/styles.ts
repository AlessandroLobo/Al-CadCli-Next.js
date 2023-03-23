import { styled, Box, Heading, Text } from '@ignite-ui/react'



export const Header = styled('div', {
  borderRadius: 10,
  maxWidth: '95%',
  margin: '$4 auto $1',
  padding: '0 $4',
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'left',
  backgroundColor: '$gray800',
  height: '100px',
})

export const HeaderTitle = styled('div', {
  display: 'flex',
  textAlign: 'left',
  alignItems: 'center',
  paddingLeft: '20px',
  fontSize: '30px',

})

export const HeaderInfo = styled('div', {
  display: 'flex',
  gap: '10px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '20px',
});

export const NameAndEmail = styled('div', {
  textAlign: 'left',
});

export const SignOutButton = styled('div', {
  borderRadius: '8px',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  width: '100px',
  height: '30px',
  marginRight: '20px',
  color: '$gray400',

  '&:hover': {
    color: '$ignite300',
    cursor: 'pointer'
  },
})

export const ProfilePhoto = styled('div', {
  maxWidth: '50px',
  maxHeight: '50px',
});


export const Line = styled('div', {
  color: '$gray100',
  flexGrow: '1',
  height: '1px',
  backgroundColor: '$gray500',
})

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





export const FormError = styled('div', {


  [`${Text}`]: {
    color: '$gray400'
  },
  span: {
    color: '#FF4136'
  }

})