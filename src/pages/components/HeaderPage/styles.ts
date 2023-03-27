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

export const ImageLogo = styled('img', {
  marginRight: '50px',
  width: '60px',
  height: '60px',
  filter: 'brightness(10000%)',
})


export const ReaderFindRegister = styled('div', {
  fontSize: '20px',
  marginRight: '50px',
  color: '$ignite300',

  // Adiciona margem direita para o texto "Pesquisa"
  '& > a': {
    marginRight: '30px',
    color: '$gray100',
    textDecoration: 'none',
    '&:hover': {
      color: '$ignite300',
      textDecoration: 'none',
    },
  },

  '& > span': {
    color: '$gray300',
  },
})


export const ReaderFindSeach = styled('div', {
  fontSize: '20px',
  marginRight: '50px',
  color: '$ignite300',
  gap: '80px',

  '& > span': {
    marginRight: '30px',
  },

  '& > a': {
    color: '$gray100',
    textDecoration: 'none',

  },
  '& > a:hover': {
    color: '$ignite300',
    textDecoration: 'none',
  },
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

export const ProfilePhoto = styled('div', {
  maxWidth: '50px',
  maxHeight: '50px',
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
