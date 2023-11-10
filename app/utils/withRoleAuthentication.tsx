import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useUser, SignIn } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const Roles = {
  NODEJS_COURSE_PARTICIPANT: "nodeJSCourseParticipant",
}

export default function WithRoleAuthentication(
  role: string,
  redirectUrl: string,
  WrappedComponent: any,
) {
  return function WithRole(props: any) {
    const { isSignedIn, user } = useUser()
    const [displayClerkLogin, setDisplayClerkLogin] = useState(false)

    const publicMetadata = user?.publicMetadata
    const hasRole = publicMetadata ? publicMetadata[role] : false

    if (!isSignedIn) {
      return (
        <main className="flex h-screen flex-col items-center justify-between p-4 text-gray-900 antialiased">
          {displayClerkLogin ? (
            <CardContent className="text-2xl">
              <SignIn afterSignInUrl={redirectUrl} />
            </CardContent>
          ) : (
            <Card className="w-8/12">
              <CardHeader>
                <CardTitle>Authentification Requise</CardTitle>
                <CardDescription>Accès refusé</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl">
                Bonjour ! <br />
                Cet exercice fait partie de la formation NodeJS et je ne veux
                pas te spoiler.
                <br />
                {
                  "Si ton formateur à créé ton compte sur la plateforme d'authentification tu peux t'authentifier en cliquant"
                }
                <Button onClick={() => setDisplayClerkLogin(true)}>Ici</Button>
                <br />
                {
                  "En revanche, saches qu'il existe toutefois d'autres exercices totalement publics comme le kata Trivia."
                }
              </CardContent>
            </Card>
          )}
        </main>
      )
    }

    if (!hasRole) {
      return (
        <main className="flex h-screen flex-col items-center justify-between p-4 text-gray-900 antialiased">
          <Card className="w-8/12">
            <CardHeader>
              <CardTitle>Autorisations insuffisantes</CardTitle>
              <CardDescription>Accès refusé</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl">
              Tu sembles ne pas disposer des autorisations suffisantes pour
              accéder à cet exercice ! <br />
              Si tu fais partie de la formation NodeJS demande à ton formateur
              de faire le nécessaire.
            </CardContent>
          </Card>
        </main>
      )
    }

    return <WrappedComponent {...props} />
  }
}
