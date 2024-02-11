// A Header bar with a logo and button to navigate to Entree and Sortie pages and on right Login/Logout button

import React, { useState } from "react";
import { Flex, Text, Image } from "@aws-amplify/ui-react";
import * as Auth from "aws-amplify/auth";
import Link from "next/link";

export default function HeaderNavBar() {
//   const [user, setUser] = useState<any>();
//   useState(() => {
//     Auth.getCurrentUser().then((user) => setUser(user));
//   }
//     );
//   const signOut = async () => {
//     try {
//       await Auth.signOut();
//       setUser(null);
//     } catch (error) {
//       console.log("error signing out: ", error);
//     }
//   };
//   const signIn = async () => {
//     try {
//       console.log("signing in");
//       const user = await Auth.signInWithRedirect();
//       setUser(user);
//     } catch (error) {
//       console.log("error signing in: ", error);
//     }
//   };
  return (
    <Flex
      gap="10px"
      direction="row"
      width="1440px"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      position="relative"
      boxShadow="0px 2px 6px rgba(0.05098039284348488, 0.10196078568696976, 0.14901961386203766, 0.15000000596046448)"
      padding="16px 32px 16px 32px"
      backgroundColor="rgba(255,255,255,1)"
    >
      <Flex
        gap="32px"
        direction="row"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        position="relative"
      >
        <Flex width="34.55px" height="30px" shrink="0" position="relative">

          <Image
  alt="Amplify logo"
  src="/peraline.png"
  display="block"
  position="absolute"
  top="0%"
  bottom="0%"
  left="0%"
  right="0%"
  backgroundColor="initial"
  height="30px"
  opacity="100%"
  onClick={() => alert('📸 Say cheese!')}
/>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(13,26,38,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          shrink="0"
          position="relative"
          whiteSpace="pre-wrap"
        >
          <Link href="/entree">Entrée</Link>
        </Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(13,26,38,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          shrink="0"
          position="relative"
          whiteSpace="pre-wrap"
        >
          <Link href="/sortie">Sortie</Link>
        </Text>
      </Flex>
    </Flex>
  );
}
