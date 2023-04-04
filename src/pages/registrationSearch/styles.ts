import { styled, Box, Heading } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 872,
  margin: '$20 auto $4',
  padding: '0 $4',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    maxWidth: '100%',
    margin: '$20 auto',
    padding: '0 $2',
  }
});

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

export const ContainerList = styled('div', {
  width: '100%',
  maxWidth: '1120px',
  padding: '0 1.5rem',
  overflowX: 'auto',

  '@media screen and (max-width: 768px)': {
    /* Quando a largura da tela for menor ou igual a 768 pixels */
    maxWidth: '100%',
    margin: '$20 auto',
    padding: '0 $2',
    overflowX: 'auto',
  },
});

export const Tbody = styled('tbody', {
  // border: '1px solid red',
  margin: '0',
  width: '100%',
  height: '100%', /* Adiciona altura total */
  display: 'block', /* Define o elemento como bloco */
})

export const HeaderTitle = styled('table', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 .5rem',
  borderTopLeftRadius: '6px',
  borderBottomRightRadius: '6px',

  td: {
    height: '40px',
    padding: '0.05rem 1rem',
    background: '$gray600',
    verticalAlign: 'middle',

    '&:first-child': {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },

    '&:last-child': {
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
  },

})

type TableResultProps = {
  theme: {
    'gray-700': string;
  };
};

export const TableResult = styled('table', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 .5rem',
  borderTopLeftRadius: '6px',
  borderBottomRightRadius: '6px',

  td: {
    height: '60px',
    padding: '0.05rem 1rem',
    background: '$gray700',

    '&:first-child': {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },

    '&:last-child': {
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
  },
});



export const TextInputContainer = styled('div', {
  flex: '1',
  display: 'block',
  flexDirection: 'row',
  alignItems: 'center',
});

export const Text = styled('div', {
  paddingBottom: '$4'
});

export const Line = styled('div', {
  marginTop: '5px',
  marginBottom: '5px',
  color: '$gray100',
  flexGrow: '1',
  height: '1px',
  backgroundColor: '$gray500',
})

export const FormError = styled('div', {

  [`${Text}`]: {
    color: '#ff3111'
  },
  span: {
    color: '#FF4136'
  }
})