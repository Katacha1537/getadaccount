import { Flex, Text, Button, Avatar } from '@chakra-ui/react'
import { useState } from 'react'
import { FacebookLoginButton } from 'react-social-login-buttons'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { facebookApi } from './service/facebookApi'

export default function App() {
  const [session, setSession] = useState(false)
  const [accountFacebook, setAccountFacebook] = useState(false)
  const [adAccounts, setAdAccount] = useState([])

  const logOutSession = () => {
    setSession(false)
  }

  function getAccountsFacebook() {
    facebookApi.get(`me?fields=id,name,adaccounts{business_name,name}&access_token=${accountFacebook.accessToken}`)
      .then((response) => {
        const adsAccounts = response.data.adaccounts.data
        setAdAccount(adsAccounts)
        console;
        console.log(adsAccounts)
      })
  }

  return (
    <Flex direction="column" justify="center" align="center" h="100vh" background="gray.900">

      <Text color="white" fontSize="20" mb="5" fontWeight="700">GetAccounts</Text>
      {
        session ? (<>
          <Button onClick={logOutSession} background="red.500" color="whiteAlpha.900" fontWeight="700">Fazer Log Out</Button>
          <Flex direction="column" mt="5" maxWidth="720" mb="8">
            <Flex>
              <Avatar name={accountFacebook.name} src={accountFacebook.picture.data.url} mr="3" />
              <Text color="white">{accountFacebook.name}</Text>
            </Flex>
            <Text mt="3" color="white"><strong>Token:</strong> {accountFacebook.accessToken}</Text>
            <Button onClick={getAccountsFacebook} background="green.500" color="whiteAlpha.900" mt="4">Buscar Contas de Anuncio</Button>

            {
              adAccounts.map(adaccount => (
                <Flex id={adaccount.id} direction="column" mt="5">
                  <Text color="white"><strong>Nome BM:</strong> {adaccount.business_name}</Text>
                  <Text color="white"><strong>Nome Conta de Anuncio:</strong> {adaccount.name}</Text>
                  <Text color="white"><strong>Id Conta Anuncio:</strong> {adaccount.id}</Text>
                </Flex>
              ))
            }


          </Flex>
        </>
        )
          :
          (
            <LoginSocialFacebook
              appId='1445241209543990'
              scope='email, pages_show_list, ads_management, business_management, instagram_basic, instagram_content_publish, pages_read_engagement, public_profile'
              onResolve={(response) => {
                console.log(response)
                setSession(true)
                setAccountFacebook(response.data)
              }}
              onReject={(error) => {
                console.log(error)
              }}
            >
              <FacebookLoginButton />
            </LoginSocialFacebook>
          )
      }


    </Flex>
  )
}

