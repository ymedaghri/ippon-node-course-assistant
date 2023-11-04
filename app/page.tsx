import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-4 text-gray-900 antialiased">
      <Card className="w-8/12">
        <CardHeader>
          <CardTitle>Assistant Formation</CardTitle>
          <CardDescription>NodeJS</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl">
          Vous trouverez dans cet assistant les exercices mentionnés dans la
          formation sous la rubrique &quot;Exercices&quot; de la barre de menu.
        </CardContent>
      </Card>
    </main>
  )
}
