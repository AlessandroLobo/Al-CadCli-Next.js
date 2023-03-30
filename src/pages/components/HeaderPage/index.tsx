import { signIn, signOut } from "next-auth/react";
import { Header, HeaderInfo, HeaderTitle, NameAndEmail, ProfilePhoto, SignOutButton, ImageLogo, ReaderFindRegister, ReaderFindSeach } from "./styles";
import { Session } from 'next-auth';
import { useEffect, useState } from "react";

interface HomeProps {
  session?: Session | null;
}
const userCadImage = "/images/cadUser.png"

export const HeaderPage = ({ session }: HomeProps) => {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  const isOnRegisterPage = currentPage === '/registration';
  const isOnRegistrationSeachPage = currentPage === '/registrationSearch';
  const user = session?.user;
  console.log(session);
  return (
    <Header>
      <HeaderTitle>
        <ImageLogo src={userCadImage} alt="Imagem de usuário a ser cadastrado" />
        {session && isOnRegistrationSeachPage && (
          <ReaderFindSeach>
            <span>Pesquisa</span>
            <a href="/registration">Cadastro</a>
          </ReaderFindSeach>
        )}
        {session && isOnRegisterPage && (
          <ReaderFindRegister>
            <a href="/registrationSearch">Pesquisa</a>
            <span>Cadastro</span>
          </ReaderFindRegister>
        )}
      </HeaderTitle>
      <HeaderInfo>
        <NameAndEmail>
          <p>{user?.name}</p>
          {session ? (
            <SignOutButton onClick={() => signOut()}>Sign out</SignOutButton>
          ) : (
            <SignOutButton onClick={() => signIn()}>Login</SignOutButton>
          )}
        </NameAndEmail>
        <ProfilePhoto>
          {user?.image && (<img src={user?.image} style={{ borderRadius: '50%', maxWidth: '40px', maxHeight: '40px' }} alt="" />)}
        </ProfilePhoto>
      </HeaderInfo>
    </Header>
  );
};
